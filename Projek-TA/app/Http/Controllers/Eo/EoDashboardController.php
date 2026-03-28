<?php

namespace App\Http\Controllers\Eo;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\Event;
use App\Models\Order;
use App\Models\Ticket;
use App\Models\EoPaymentMethod;
use Inertia\Inertia;
use Carbon\Carbon;

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
        $totalVisitors = Event::where('eo_id', $eoId)->sum('views');

        // 3. Ambil Semua Order yang Sukses untuk Pendapatan
        $successfulOrders = Order::whereHas('event', function ($query) use ($eoId) {
            $query->where('eo_id', $eoId);
        })->where('status', 'success')->get();

        $totalRevenue = $successfulOrders->sum('total_price');

        // 4. Hitung Total Tiket Terjual
        $ticketsSold = DB::table('order_items')
            ->join('orders', 'order_items.order_id', '=', 'orders.id')
            ->join('events', 'orders.event_id', '=', 'events.id')
            ->where('events.eo_id', $eoId)
            ->where('orders.status', 'success')
            ->sum('order_items.qty');

        // 5. AMBIL EVENT MENDATANG (STATUS: PUBLISHED)
        $upcomingEvents = Event::with('tickets')
            ->where('eo_id', $eoId)
            ->where('status', 'published') // Hanya ambil yang published
            ->latest() // Urutkan dari yang terbaru
            ->take(3) // Ambil 3 event saja untuk di dashboard
            ->get()
            ->map(function ($event) {
                // Hitung tiket terjual vs kapasitas untuk event ini
                $ticketsTotal = $event->tickets->sum('kuota');
                $ticketsSold = $event->tickets->sum('sold');
                
                // Hitung pendapatan khusus event ini
                $revenue = Order::where('event_id', $event->id)
                    ->where('status', 'success')
                    ->sum('total_price');

                // Format data agar persis seperti yang diminta React UI
                return [
                    'id' => $event->id,
                    'title' => $event->title,
                    'date' => Carbon::parse($event->start_date)->format('d M Y'),
                    'time' => Carbon::parse($event->start_date)->format('H:i') . ' WIB',
                    'location' => $event->location,
                    'tickets' => "{$ticketsSold}/{$ticketsTotal}",
                    'revenue' => 'Rp ' . number_format($revenue, 0, ',', '.'),
                    'status' => $event->status,
                ];
            });

        return Inertia::render('eo/dashboard', [
            'status' => $user->status ?? 'active',
            'has_payment_method' => $hasPaymentMethod,
            'total_events' => $totalEvents,
            'tickets_sold' => (int) $ticketsSold,
            'total_revenue' => $totalRevenue,
            'total_visitors' => $totalVisitors,
            'upcoming_events' => $upcomingEvents, 
        ]);
    }
}