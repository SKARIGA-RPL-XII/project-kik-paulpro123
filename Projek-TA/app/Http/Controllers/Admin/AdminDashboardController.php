<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\Event;
use App\Models\Order;
use Inertia\Inertia;
use Carbon\Carbon;

class AdminDashboardController extends Controller
{
    public function index()
    {
        // 1. Hitung Pengguna & EO
        $totalUsers = User::where('role', 'user')->count();
        $totalEos = User::where('role', 'eo')->where('status', 'active')->count();
        $pendingEos = User::where('role', 'eo')->where('status', 'pending')->count();

        // 2. Hitung Event
        $totalEvents = Event::count();
        $pendingEvents = Event::where('status', 'pending')->count(); 

        // 3. Hitung Finansial & Tiket Global
        $totalRevenue = Order::where('status', 'success')->sum('total_price');
        $totalTicketsSold = DB::table('order_items')
            ->join('orders', 'order_items.order_id', '=', 'orders.id')
            ->where('orders.status', 'success')
            ->sum('order_items.qty');

        // 📊 4. LOGIKA CHART: Pendapatan Platform 7 Hari Terakhir
        $revenueData = [];
        for ($i = 6; $i >= 0; $i--) {
            $date = Carbon::now()->subDays($i)->format('Y-m-d');
            $displayDate = Carbon::now()->subDays($i)->format('d M');

            // Hitung SEMUA order sukses di platform pada hari tersebut
            $dailyRevenue = Order::where('status', 'success')
                ->whereDate('updated_at', $date)
                ->sum('total_price');

            $revenueData[] = [
                'date' => $displayDate,
                'revenue' => (int) $dailyRevenue,
            ];
        }

        // 5. Ambil 5 Event Terlaris (Leaderboard)
        $topEvents = DB::table('orders')
            ->join('events', 'orders.event_id', '=', 'events.id')
            ->join('users', 'events.eo_id', '=', 'users.id')
            ->select('events.id', 'events.title', 'users.name as eo_name', DB::raw('SUM(orders.total_price) as revenue'))
            ->where('orders.status', 'success')
            ->groupBy('events.id', 'events.title', 'users.name')
            ->orderByDesc('revenue')
            ->limit(5)
            ->get();

        // 6. Ambil 5 Transaksi Sukses Terbaru
        $recentTransactions = DB::table('orders')
            ->join('events', 'orders.event_id', '=', 'events.id')
            ->join('users', 'orders.user_id', '=', 'users.id')
            ->select('orders.invoice', 'users.name as buyer_name', 'events.title as event_title', 'orders.total_price', 'orders.updated_at')
            ->where('orders.status', 'success')
            ->orderByDesc('orders.updated_at')
            ->limit(5)
            ->get()
            ->map(function ($tx) {
                $tx->date_formatted = Carbon::parse($tx->updated_at)->diffForHumans();
                return $tx;
            });

        return Inertia::render('admin/dashboard', [
            'total_users' => $totalUsers,
            'total_eos' => $totalEos,
            'pending_eos' => $pendingEos,
            'total_events' => $totalEvents,
            'pending_events' => $pendingEvents,
            'total_revenue' => $totalRevenue,
            'total_tickets_sold' => (int) $totalTicketsSold,
            'top_events' => $topEvents,
            'recent_transactions' => $recentTransactions,
            'revenue_data' => $revenueData, // 👈 Lempar data grafik ke React
        ]);
    }
}