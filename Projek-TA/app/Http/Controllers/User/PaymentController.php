<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;
use Inertia\Inertia;

class PaymentController extends Controller
{

    public function paymentPage($id)
    {
        $order = Order::findOrFail($id);

        return Inertia::render('user/payment', [
            'order' => $order
        ]);
    }

    public function verify(Request $request)
    {
        $request->validate([
            'order_id' => 'required',
            'payment_proof' => 'required|image|mimes:jpg,jpeg,png|max:2048'
        ]);

        $order = Order::find($request->order_id);

        if (!$order) {
            return redirect('/checkout/failed');
        }

        // simpan bukti pembayaran
        $path = $request->file('payment_proof')->store('payment_proofs', 'public');

        $order->payment_proof = $path;
        $order->status = 'verifying';
        $order->save();

        // simulasi verifikasi
        sleep(2);

        if ($order->total_price > 0) {

            $order->status = 'success';
            $order->save();

            return redirect('/checkout/success');

        } else {

            $order->status = 'failed';
            $order->save();

            return redirect('/checkout/failed');
        }
    }

    public function success()
    {
        return Inertia::render('user/success');
    }

    public function failed()
    {
        return Inertia::render('user/payment-failed');
    }
}