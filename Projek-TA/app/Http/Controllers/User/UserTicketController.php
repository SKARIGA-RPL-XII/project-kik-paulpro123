<?php
namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class UserTicketController extends Controller
{
    public function index()
    {
        $orders = Order::with(['event', 'orderItems.ticket'])
            ->where('user_id', Auth::id())
            ->latest()
            ->get();

        return Inertia::render('user/ticket_event', [
            'orders' => $orders
        ]);
    }
    public function show($id)
    {
        $ticket = \App\Models\OrderItem::with(['order.event', 'ticket'])
            ->whereHas('order', function ($q) {
                $q->where('user_id', Auth::id());
            })
            ->findOrFail($id);

        return Inertia::render('user/ticket_detail', [
            'ticket' => $ticket
        ]);
    }
}