<?php

namespace App\Http\Controllers\Eo;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB; // 👈 Wajib ditambahkan untuk Query Join
use App\Models\Event;
use App\Models\Order;
use App\Models\EoPaymentMethod;
use Inertia\Inertia;

class EoDashboardController extends Controller
{
    public function index()
    {
        $eoId = Auth::id();
        $user = Auth::user();

        // 1. Cek Metode Pembayaran
        $hasPaymentMethod = EoPaymentMethod::where('user_id', $eoId)->exists();

        // 2. Hitung Total Event
        $totalEvents = Event::where('eo_id', $eoId)->count();

        // 3. Ambil Semua Order yang Sukses untuk Pendapatan
        $successfulOrders = Order::whereHas('event', function ($query) use ($eoId) {
            $query->where('eo_id', $eoId);
        })->where('status', 'success')->get();

        $totalRevenue = $successfulOrders->sum('total_price');

        // 4. HITUNG TIKET TERJUAL DARI TABEL order_items (QUERY JOIN)
        // Kita gabungkan order_items -> orders -> events untuk mencari tiket milik EO ini
        $ticketsSold = DB::table('order_items')
            ->join('orders', 'order_items.order_id', '=', 'orders.id')
            ->join('events', 'orders.event_id', '=', 'events.id')
            ->where('events.eo_id', $eoId)
            ->where('orders.status', 'success') // Hanya hitung yang pembayarannya sukses
            ->sum('order_items.qty'); // Jumlahkan kolom qty

        // 5. Alert Pesanan Menunggu Verifikasi
        $pendingVerifications = Order::whereHas('event', function ($q) use ($eoId) {
            $q->where('eo_id', $eoId);
        })->where('status', 'pending')->count();

        // Kirim semua data ke React
        return Inertia::render('eo/dashboard', [
            'status' => $user->status ?? 'active',
            'has_payment_method' => $hasPaymentMethod,
            'total_events' => $totalEvents,
            'tickets_sold' => (int) $ticketsSold, // 👈 Hasilnya pasti akurat!
            'total_revenue' => $totalRevenue,
            'pending_verifications' => $pendingVerifications, 
        ]);
    }
}