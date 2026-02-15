<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Ticket;
use App\Models\Order;

class OrderController extends Controller
{
    public function store(Request $request)
{
    $ticket = Ticket::findOrFail($request->ticket_id);

    Order::create([
        'user_id' => Auth::id(),
        'ticket_id' => $ticket->id,
        'total_price' => $ticket->price,
        'payment_method' => $request->payment_method,
        'status' => 'pending'
    ]);

    return redirect('/payment-info');
}
}
