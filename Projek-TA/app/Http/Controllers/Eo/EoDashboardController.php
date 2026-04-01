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

        // 📊 5. LOGIKA CHART: Ambil Pendapatan 7 Hari Terakhir
        $salesData = [];
        for ($i = 6; $i >= 0; $i--) {
            // Mundur dari 6 hari yang lalu sampai hari ini
            $date = Carbon::now()->subDays($i)->format('Y-m-d');
            $displayDate = Carbon::now()->subDays($i)->format('d M'); // Cth: 12 Ags

            $dailyRevenue = Order::whereHas('event', function ($q) use ($eoId) {
                    $q->where('eo_id', $eoId);
                })
                ->where('status', 'success')
                ->whereDate('updated_at', $date) // Ambil yang sukses di tanggal tersebut
                ->sum('total_price');

            $salesData[] = [
                'date' => $displayDate,
                'revenue' => (int) $dailyRevenue,
            ];
        }

        // 6. AMBIL EVENT MENDATANG (STATUS: PUBLISHED)
        $upcomingEvents = Event::with('tickets')
            ->where('eo_id', $eoId)
            ->where('status', 'published')
            ->latest()
            ->take(3)
            ->get()
            ->map(function ($event) {
                $ticketsTotal = $event->tickets->sum('kuota');
                $ticketsSold = $event->tickets->sum('sold');
                
                $revenue = Order::where('event_id', $event->id)
                    ->where('status', 'success')
                    ->sum('total_price');

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
            'sales_data' => $salesData, // 👈 Lempar data grafik ke React
        ]);
    }
}