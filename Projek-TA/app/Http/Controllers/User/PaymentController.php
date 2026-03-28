<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\Event;
use App\Models\Order;
use App\Models\Ticket;
use Inertia\Inertia;
use Exception;

class PaymentController extends Controller
{

    public function paymentPage($orderId)
    {
        $order = Order::findOrFail($orderId);
        $event = Event::findOrFail($order->event_id);
        $paymentInfo = \App\Models\EoPaymentMethod::where('user_id', $event->eo_id)
            ->where('provider_name', $order->payment_method)
            ->first();

        return Inertia::render('user/payment', [
            'order' => $order,
            'event' => $event,
            'payment_info' => $paymentInfo
        ]);
    }

   public function verify(Request $request)
    {
        $request->validate([
            'order_id' => 'required|exists:orders,id',
            'payment_proof' => 'required|file|mimes:jpg,jpeg,png,webp,pdf|max:5120',
        ]);

        try {
            DB::transaction(function () use ($request) {
                
                $order = Order::where('id', $request->order_id)
                    ->where('status', 'pending')
                    ->lockForUpdate() 
                    ->firstOrFail();

                $path = $request->file('payment_proof')->store('payment_proofs', 'public');

                $order->payment_proof = $path;
                $order->status = 'success';
                $order->save();

                $orderItems = DB::table('order_items')
                    ->where('order_id', $order->id)
                    ->get();

                foreach ($orderItems as $item) {
                    $ticket = Ticket::where('id', $item->ticket_id)->lockForUpdate()->first();
                    if ($ticket) {
                        $ticket->increment('sold', $item->qty); 
                    }
                }
            });

            return redirect('/checkout/success');

        } catch (Exception $e) {
            return redirect('/checkout/failed/' . $request->order_id);
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
        $order = Order::with('event')
            ->where('user_id', Auth::id())
            ->latest()
            ->first();

        return Inertia::render('user/failed', [
            'order' => $order,
            'event' => $order ? $order->event : null
        ]);
    }
}