import { Head } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '@/layouts/admin-layout';
import { Eye, Search, ShieldCheck } from 'lucide-react';
import AdminTransactionModal, {
    AdminOrderDetail,
} from '@/components/transaction-modal';

export default function TransactionList({
    orders,
}: {
    orders: AdminOrderDetail[];
}) {
    const [selectedOrder, setSelectedOrder] = useState<AdminOrderDetail | null>(
        null,
    );
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const openModal = (order: AdminOrderDetail) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

    // Fitur pencarian cepat (Invoice / Nama User / Nama EO)
    const filteredOrders = orders.filter(
        (order) =>
            order.invoice.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.user.full_name
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            order.event.eo_name
                .toLowerCase()
                .includes(searchTerm.toLowerCase()),
    );

    return (
        <AdminLayout title="Riwayat Transaksi Global">
            <div className="space-y-6 p-6 lg:p-8">
                <Head title="Manajemen Transaksi" />

                {/* Header */}
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100">
                                <ShieldCheck className="h-6 w-6 text-indigo-600" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900">
                                    Riwayat Transaksi Global
                                </h2>
                                <p className="text-sm text-slate-600">
                                    Audit seluruh aliran dana dari pembeli ke
                                    Event Organizer.
                                </p>
                            </div>
                        </div>

                        {/* Search Bar */}
                        <div className="relative w-full sm:w-72">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <Search className="h-4 w-4 text-slate-400" />
                            </div>
                            <input
                                type="text"
                                className="block w-full rounded-lg border-0 py-2 pl-10 text-slate-900 shadow-sm ring-1 ring-slate-300 ring-inset placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-600 focus:ring-inset sm:text-sm sm:leading-6"
                                placeholder="Cari invoice, pembeli, atau EO..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Tabel Transaksi */}
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="px-6 py-4 font-semibold text-slate-600">
                                        Invoice & Tanggal
                                    </th>
                                    <th className="px-6 py-4 font-semibold text-slate-600">
                                        Pembeli
                                    </th>
                                    <th className="px-6 py-4 font-semibold text-slate-600">
                                        Event & EO
                                    </th>
                                    <th className="px-6 py-4 text-right font-semibold text-slate-600">
                                        Nominal (Rp)
                                    </th>
                                    <th className="px-6 py-4 text-center font-semibold text-slate-600">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 text-center font-semibold text-slate-600">
                                        Audit
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 bg-white">
                                {filteredOrders.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={6}
                                            className="px-6 py-12 text-center text-slate-500"
                                        >
                                            Tidak ditemukan data transaksi yang
                                            sesuai.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredOrders.map((order) => (
                                        <tr
                                            key={order.id}
                                            onClick={() => openModal(order)}
                                            className="group cursor-pointer transition-colors hover:bg-slate-50"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="font-bold text-slate-900">
                                                    {order.invoice}
                                                </div>
                                                <div className="mt-0.5 text-xs text-slate-500">
                                                    {new Date(
                                                        order.created_at,
                                                    ).toLocaleDateString(
                                                        'id-ID',
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="font-semibold text-slate-900">
                                                    {order.user.full_name}
                                                </div>
                                                <div className="mt-0.5 text-xs text-slate-500">
                                                    @{order.user.username}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="max-w-37.5 truncate font-medium text-slate-900">
                                                    {order.event.title}
                                                </div>
                                                <div className="mt-0.5 text-xs text-indigo-600">
                                                    EO: {order.event.eo_name}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right whitespace-nowrap">
                                                <div className="font-bold text-slate-800">
                                                    {order.total_price.toLocaleString(
                                                        'id-ID',
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center whitespace-nowrap">
                                                <span
                                                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                                                        order.status ===
                                                        'success'
                                                            ? 'bg-emerald-100 text-emerald-800'
                                                            : order.status ===
                                                                'pending'
                                                              ? 'bg-amber-100 text-amber-800'
                                                              : 'bg-red-100 text-red-800'
                                                    }`}
                                                >
                                                    {order.status.toUpperCase()}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center whitespace-nowrap">
                                                <button className="inline-flex items-center gap-1.5 rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-slate-700">
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

            {/* Panggil Modal Terpisah */}
            <AdminTransactionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                order={selectedOrder}
            />
        </AdminLayout>
    );
}
