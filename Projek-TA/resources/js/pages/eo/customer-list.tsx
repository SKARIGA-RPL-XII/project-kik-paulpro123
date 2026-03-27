import { Head } from '@inertiajs/react';
import EOLayout from '@/layouts/eo-layout';
interface Order {
    id: number;
    invoice: string;
    total_price: number;
    status: string;
    created_at: string;
    user: {
        name: string;
        email: string;
    };
    event: {
        title: string;
    };
}

export default function CustomerList({ orders }: { orders: Order[] }) {
    return (
        <EOLayout>
            <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
                <Head title="Daftar Pelanggan" />

                <div className="mx-auto max-w-7xl">
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-gray-900">
                            Daftar Pelanggan
                        </h1>
                        <p className="text-sm text-gray-600">
                            Daftar pengguna yang telah berhasil membeli tiket
                            acara Anda.
                        </p>
                    </div>

                    <div className="overflow-hidden rounded-lg bg-white shadow">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                            Invoice / Tanggal
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                            Pelanggan
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                            Acara
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                            Total Pendapatan
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {orders.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={5}
                                                className="px-6 py-10 text-center text-gray-500"
                                            >
                                                Belum ada pelanggan yang membeli
                                                tiket.
                                            </td>
                                        </tr>
                                    ) : (
                                        orders.map((order) => (
                                            <tr
                                                key={order.id}
                                                className="transition-colors hover:bg-gray-50"
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="font-medium text-gray-900">
                                                        {order.invoice ||
                                                            `INV-${order.id}`}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {new Date(
                                                            order.created_at,
                                                        ).toLocaleDateString(
                                                            'id-ID',
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {order.user?.name ||
                                                            '-'}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {order.user?.email ||
                                                            '-'}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">
                                                        {order.event?.title ||
                                                            '-'}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-semibold text-green-600">
                                                        Rp{' '}
                                                        {order.total_price.toLocaleString(
                                                            'id-ID',
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs leading-5 font-semibold text-green-800">
                                                        Berhasil
                                                    </span>
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
        </EOLayout>
    );
}
