<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\Event;
use App\Models\Order;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    public function index()
    {
        // 1. Hitung Pengguna & EO
        $totalUsers = User::where('role', 'user')->count();
        $totalEos = User::where('role', 'eo')->where('status', 'active')->count(); // Hanya yang aktif
        $pendingEos = User::where('role', 'eo')->where('status', 'pending')->count();

        // 2. Hitung Event (Total & Pending Approval)
        $totalEvents = Event::count();
        // Asumsi status event yang belum disetujui adalah 'pending' atau 'draft', sesuaikan jika berbeda
        $pendingEvents = Event::where('status', 'pending')->count(); 

        // 3. Hitung Finansial & Tiket Global
        $totalRevenue = Order::where('status', 'success')->sum('total_price');
        $totalTicketsSold = DB::table('order_items')
            ->join('orders', 'order_items.order_id', '=', 'orders.id')
            ->where('orders.status', 'success')
            ->sum('order_items.qty');

        // 4. Ambil 5 Event Terlaris (Leaderboard) berdasarkan Pendapatan
        // Menggunakan DB raw query agar ringan dan cepat
        $topEvents = DB::table('orders')
            ->join('events', 'orders.event_id', '=', 'events.id')
            ->join('users', 'events.eo_id', '=', 'users.id') // Ambil nama EO
            ->select('events.id', 'events.title', 'users.name as eo_name', DB::raw('SUM(orders.total_price) as revenue'))
            ->where('orders.status', 'success')
            ->groupBy('events.id', 'events.title', 'users.name')
            ->orderByDesc('revenue')
            ->limit(5)
            ->get();

        // 5. Ambil 5 Transaksi Sukses Terbaru (Real-time Feed)
        $recentTransactions = DB::table('orders')
            ->join('events', 'orders.event_id', '=', 'events.id')
            ->join('users', 'orders.user_id', '=', 'users.id')
            ->select('orders.invoice', 'users.name as buyer_name', 'events.title as event_title', 'orders.total_price', 'orders.updated_at')
            ->where('orders.status', 'success')
            ->orderByDesc('orders.updated_at')
            ->limit(5)
            ->get()
            ->map(function ($tx) {
                // Format tanggal menjadi lebih bersahabat (misal: "2 jam yang lalu" atau format tanggal biasa)
                $tx->date_formatted = \Carbon\Carbon::parse($tx->updated_at)->diffForHumans();
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
        ]);
    }
}