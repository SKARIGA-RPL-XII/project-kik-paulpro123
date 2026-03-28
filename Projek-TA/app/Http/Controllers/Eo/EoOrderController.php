<?php

namespace App\Http\Controllers\Eo;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Order;
use Inertia\Inertia;

class EoOrderController extends Controller
{
    public function customerList()
    {
        $orders = Order::with(['user.customerDetail', 'event'])
            ->whereHas('event', function ($query) {
                $query->where('eo_id', Auth::id());
            })
            ->where('status', 'success')
            ->latest()
            ->get()
            ->map(function ($order) {
                return [
                    'id' => $order->id,
                    'invoice' => $order->invoice ?? 'INV-' . $order->id,
                    'total_price' => $order->total_price,
                    'payment_method' => $order->payment_method ?? 'Transfer/VA',
                    'status' => $order->status,
                    'created_at' => $order->created_at,
                    'user' => [
                        'username' => $order->user->name ?? '-',
                        'email' => $order->user->email ?? '-',
                        'full_name' => $order->user->customerDetail->full_name ?? 'Data belum diisi',
                    ],
                    'event' => [
                        'title' => $order->event->title ?? '-',
                    ],
                ];
            });

        return Inertia::render('eo/customer-list', [
            'orders' => $orders
        ]);
    }

    public function paymentIndex()
    {
        $methods = \App\Models\EoPaymentMethod::where('user_id', Auth::id())->latest()->get();
        // Mengarah ke eo/payment-settings
        return Inertia::render('eo/payment-settings', [
            'methods' => $methods
        ]);
    }

    public function paymentCreate()
    {
        $availableProviders = \App\Models\PaymentProvider::where('is_active', true)->get();
        // Mengarah ke eo/payment-form
        return Inertia::render('eo/payment-form', [
            'availableProviders' => $availableProviders
        ]);
    }

    public function paymentStore(Request $request)
    {
        $validated = $request->validate([
            'provider_name' => 'required|string',
            'account_number' => 'required|string',
            'account_name' => 'required|string',
        ]);

        \App\Models\EoPaymentMethod::create([
            'user_id' => Auth::id(),
            'provider_name' => $validated['provider_name'],
            'account_number' => $validated['account_number'],
            'account_name' => $validated['account_name'],
        ]);

        return redirect()->route('eo.payment-methods.index')->with('success', 'Metode pembayaran ditambahkan.');
    }

    public function paymentEdit($id)
    {
        $method = \App\Models\EoPaymentMethod::where('user_id', Auth::id())->findOrFail($id);
        $availableProviders = \App\Models\PaymentProvider::where('is_active', true)->get();

        // Mengarah ke eo/payment-form
        return Inertia::render('eo/payment-form', [
            'paymentMethod' => $method,
            'availableProviders' => $availableProviders
        ]);
    }

    public function paymentUpdate(Request $request, $id)
    {
        $method = \App\Models\EoPaymentMethod::where('user_id', Auth::id())->findOrFail($id);

        $validated = $request->validate([
            'provider_name' => 'required|string',
            'account_number' => 'required|string',
            'account_name' => 'required|string',
        ]);

        $method->update($validated);

        return redirect()->route('eo.payment-methods.index')->with('success', 'Metode pembayaran diperbarui.');
    }

    public function paymentDestroy($id)
    {
        $method = \App\Models\EoPaymentMethod::where('user_id', Auth::id())->findOrFail($id);
        $method->delete();

        return back()->with('success', 'Metode pembayaran dihapus.');
    }
}