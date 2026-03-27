<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PaymentProvider;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaymentProviderController extends Controller
{
    public function index()
    {
        $providers = PaymentProvider::latest()->get();
        return Inertia::render('admin/payment-providers', [
            'providers' => $providers
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/payment-providers-form');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:50',
            'type' => 'required|in:VA,E-Wallet',
        ]);

        PaymentProvider::create($validated);
        return redirect()->route('admin.payment-providers.index')->with('success', 'Metode pembayaran ditambahkan.');
    }

    public function update(Request $request, PaymentProvider $paymentProvider)
    {
        // Fungsi ini sekarang murni hanya untuk Toggle Active/Inactive
        $paymentProvider->update([
            'is_active' => $request->is_active
        ]);
        return back()->with('success', 'Status metode pembayaran diubah.');
    }

    public function destroy(PaymentProvider $paymentProvider)
    {
        $paymentProvider->delete();
        return back()->with('success', 'Metode pembayaran dihapus.');
    }
}