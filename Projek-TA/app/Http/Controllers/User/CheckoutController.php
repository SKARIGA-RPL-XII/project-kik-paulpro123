<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\CustomerDetail;
use App\Models\Ticket;
use App\Models\Order;

class CheckoutController extends Controller
{
    public function checkout(Request $request)
    {
        $tickets = [];

        foreach ($request->tickets as $item) {

            $ticket = Ticket::find($item['id']);

            $tickets[] = [
                'id' => $ticket->id,
                'name' => $ticket->name,
                'price' => $ticket->price,
                'qty' => $item['qty'],
                'event_id' => $ticket->event_id
            ];
        }

        session([
            'checkout_ticket' => $tickets
        ]);

        return redirect('/checkout/customer');
    }

    public function customer(Request $request)
    {
        return inertia('user/customer', [
            'tickets' => $request->tickets,
            'total' => $request->total,
            'event_id' => $request->event_id,
        ]);
    }

    // SAVE CUSTOMER
    public function storeCustomer(Request $request)
    {
        $request->validate([
            'full_name' => 'required',
            'phone' => 'required',
            'gender' => 'required',
            'birth_date' => 'required'
        ]);

        CustomerDetail::updateOrCreate(
            ['user_id' => Auth::id()],
            [
                'full_name' => $request->full_name,
                'phone' => $request->phone,
                'gender' => $request->gender,
                'birth_date' => $request->birth_date,
            ]
        );

        session([
            'checkout_customer' => [
                'full_name' => $request->full_name,
                'phone' => $request->phone,
                'email' => Auth::user()->email
            ]
        ]);

        return redirect('/checkout/summary');
    }
    public function createOrder(Request $request)
{
    $invoice = 'INV-' . date('Ymd') . '-' . rand(100,999);

    $order = Order::create([
        'invoice' => $invoice,
        'event_id' => $request->event_id,
        'user_id' => Auth::id(),
        'total_price' => $request->total_price,
        'payment_method' => $request->payment_method,
        'status' => 'pending'
    ]);

    return redirect('/checkout/payment/' . $order->id);
}
}