import { Head } from '@inertiajs/react';
import { useState } from 'react'; // 👈 Import useState
import EOLayout from '@/layouts/eo-layout';
import { Eye } from 'lucide-react'; // 👈 Import Ikon tambahan
import CustomerDetailModal, { OrderDetail } from '@/components/customer-modal'; // 👈 Import Modal yang baru dibuat (Sesuaikan path jika beda folder)

export default function CustomerList({ orders }: { orders: OrderDetail[] }) {
    
    // State untuk mengontrol Modal
    const [selectedOrder, setSelectedOrder] = useState<OrderDetail | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fungsi untuk membuka Modal
    const openModal = (order: OrderDetail) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

    return (
        <EOLayout>
            <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
                <Head title="Daftar Pelanggan" />

                <div className="mx-auto max-w-7xl">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-slate-900">Daftar Pelanggan</h1>
                        <p className="text-sm text-slate-600 mt-1">
                            Daftar pengguna yang telah berhasil membeli tiket acara Anda. Klik pada baris pelanggan untuk melihat detail.
                        </p>
                    </div>

                    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-slate-200 text-sm text-left">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th className="px-6 py-4 font-semibold text-slate-600">Invoice & Tanggal</th>
                                        <th className="px-6 py-4 font-semibold text-slate-600">Pembeli</th>
                                        <th className="px-6 py-4 font-semibold text-slate-600">Acara</th>
                                        <th className="px-6 py-4 font-semibold text-slate-600 text-right">Pendapatan</th>
                                        <th className="px-6 py-4 font-semibold text-slate-600 text-center">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 bg-white">
                                    {orders.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                                                Belum ada pelanggan yang membeli tiket.
                                            </td>
                                        </tr>
                                    ) : (
                                        orders.map((order) => (
                                            <tr
                                                key={order.id}
                                                // Baris bisa di-klik untuk membuka modal
                                                onClick={() => openModal(order)} 
                                                className="group cursor-pointer transition-colors hover:bg-indigo-50/50"
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="font-bold text-slate-900">{order.invoice}</div>
                                                    <div className="text-xs text-slate-500 mt-0.5">
                                                        {new Date(order.created_at).toLocaleDateString('id-ID')}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {/* Menampilkan Username dan Full Name */}
                                                    <div className="font-semibold text-slate-900">{order.user.full_name}</div>
                                                    <div className="text-xs text-slate-500 mt-0.5">{order.user.username}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-slate-700 max-wxs truncate" title={order.event.title}>
                                                        {order.event.title}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                                    <div className="font-bold text-emerald-600">
                                                        Rp {order.total_price.toLocaleString('id-ID')}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                                    {/* Tombol visual agar user tahu baris ini bisa diklik */}
                                                    <button className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-indigo-600 shadow-sm ring-1 ring-inset ring-slate-200 transition-all group-hover:bg-indigo-600 group-hover:text-white group-hover:ring-indigo-600">
                                                        <Eye size={14} /> Detail
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Render Modal di luar Table */}
            <CustomerDetailModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                order={selectedOrder} 
            />
            
        </EOLayout>
    );
}