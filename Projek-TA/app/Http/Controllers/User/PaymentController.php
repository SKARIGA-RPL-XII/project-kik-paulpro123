<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB; // TAMBAHAN: Untuk transaksi database aman
use App\Models\Event;
use App\Models\Order;
use App\Models\Ticket; // TAMBAHAN: Jika Anda butuh update stok tiket
use Inertia\Inertia;
use Exception; // TAMBAHAN: Untuk menangkap error

class PaymentController extends Controller
{

    public function paymentPage($id)
    {
        $order = Order::findOrFail($id);
        $event = Event::find($order->event_id);

        return Inertia::render('user/payment', [
            'order' => $order,
            'event' => $event
        ]);
    }

    public function verify(Request $request)
    {
        // 1. Validasi hanya butuh order_id (Upload gambar ditiadakan)
        $request->validate([
            'order_id' => 'required|exists:orders,id'
        ]);

        try {
            // 2. Gunakan DB::transaction agar proses update status aman dari bentrok (Race Condition)
            DB::transaction(function () use ($request) {

                $order = Order::where('id', $request->order_id)
                    ->where('status', 'pending')
                    ->lockForUpdate() // Kunci data pesanan sementara diproses
                    ->firstOrFail();

                // 3. SIMULASI OTOMATIS: Anggap uang sudah divalidasi oleh sistem
                $order->status = 'success';
                $order->payment_method = 'Simulated Auto-Transfer'; // Atau sesuaikan dengan nama method Anda
                $order->payment_proof = null; // Kosongkan karena sudah tidak perlu bukti gambar
                $order->save();

                // 4. LOGIKA TAMBAH TIKET TERJUAL (Menggunakan tabel order_items)
                $orderItems = DB::table('order_items') // Sesuaikan nama tabel Anda jika berbeda (misal: orders_item)
                    ->where('order_id', $order->id)
                    ->get();

                foreach ($orderItems as $item) {
                    // Kunci row tiket ini dan tambahkan jumlah 'sold' sesuai 'quantity' yang dibeli
                    $ticket = Ticket::where('id', $item->ticket_id)->lockForUpdate()->first();

                    if ($ticket) {
                        $ticket->increment('sold', $item->quantity);
                    }
                }
            });

            // 5. Langsung lemparkan ke halaman sukses (tanpa delay/sleep)
            return redirect('/checkout/success');

        } catch (Exception $e) {
            return redirect('/checkout/failed')->withErrors(['error' => 'Gagal memproses pembayaran.']);
        }
    }

    public function success()
    {
        $order = Order::with('event')
            ->where('user_id', Auth::id())
            ->latest()
            ->first();

        return Inertia::render('user/success', [
            'order' => $order,
            'event' => $order->event
        ]);
    }

    public function failed()
    {
        return Inertia::render('user/failed');
    }
}