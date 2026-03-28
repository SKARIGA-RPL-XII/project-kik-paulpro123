<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;
use Inertia\Inertia;

class AdminTransactionController extends Controller
{
    public function index()
    {
        // Tarik SEMUA data pesanan di platform, lengkap dengan relasi terdalam
        $orders = Order::with(['user.customerDetail', 'event.eo'])
            ->latest() // Urutkan dari transaksi terbaru
            ->get()
            ->map(function ($order) {
                return [
                    'id' => $order->id,
                    'invoice' => $order->invoice ?? 'INV-' . $order->id,
                    'total_price' => $order->total_price,
                    'payment_method' => $order->payment_method ?? 'Transfer/VA',
                    // Path untuk menampilkan gambar bukti bayar (Asumsi tersimpan di folder storage/app/public)
                    'payment_proof' => $order->payment_proof ? asset('storage/' . $order->payment_proof) : null,
                    'status' => $order->status,
                    'created_at' => $order->created_at,
                    'user' => [
                        'username' => $order->user->name ?? '-',
                        'email' => $order->user->email ?? '-',
                        // Data Private (Hanya Admin yang bisa lihat ini dengan lengkap)
                        'full_name' => $order->user->customerDetail->full_name ?? 'Data belum diisi',
                        'phone' => $order->user->customerDetail->phone ?? '-',
                        'gender' => $order->user->customerDetail->gender ?? '-',
                        'birth_date' => $order->user->customerDetail->birth_date ?? '-',
                    ],
                    'event' => [
                        'title' => $order->event->title ?? '-',
                        'eo_name' => $order->event->eo->name ?? '-', // Nama Penyelenggara Acara
                    ],
                ];
            });

        return Inertia::render('admin/transaction-list', [
            'orders' => $orders
        ]);
    }
}