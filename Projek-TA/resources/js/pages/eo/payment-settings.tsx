import { Head, Link, router } from '@inertiajs/react';
import EOLayout from '@/layouts/eo-layout';
import { Plus, Edit, Trash2, CreditCard } from 'lucide-react';

interface PaymentMethod {
    id: number;
    provider_name: string;
    account_number: string;
    account_name: string;
}

export default function PaymentSettings({ methods }: { methods: PaymentMethod[] }) {
    const deleteMethod = (id: number) => {
        if (confirm('Yakin ingin menghapus metode pembayaran ini?')) {
            router.delete(`/eo/payment-methods/${id}`);
        }
    };

    return (
        <EOLayout>
            <Head title="Metode Pembayaran" />
            <div className="bg-liniear-to-br min-h-screen from-slate-50 via-white to-slate-50/50 p-6 md:p-10">
                
                <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1.5">
                        <h1 className="bg-liniear-to-r from-slate-900 to-slate-700 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
                            Metode Pembayaran
                        </h1>
                        <p className="text-sm font-medium text-slate-500">
                            Kelola daftar rekening dan e-wallet untuk menerima pembayaran tiket.
                        </p>
                    </div>

                    <Link
                        href="/eo/payment-methods/create"
                        className="group inline-flex items-center justify-center gap-2.5 rounded-2xl bg-slate-900 px-6 py-3 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:bg-slate-800 hover:shadow-xl active:scale-95"
                    >
                        <Plus className="h-4.5 w-4.5" />
                        Tambah Rekening/Wallet
                    </Link>
                </div>

                <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-slate-200/60 bg-white/80 shadow-xl shadow-slate-200/50 backdrop-blur-sm">
                    {methods.length === 0 ? (
                        <div className="flex flex-col items-center justify-center p-16 text-center">
                            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
                                <CreditCard className="h-10 w-10 text-slate-400" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900">Belum Ada Metode Pembayaran</h3>
                            <p className="mt-2 max-w-sm text-sm text-slate-500">
                                Anda belum menambahkan rekening atau e-wallet. Silakan tambah baru agar pembeli dapat melakukan checkout.
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-slate-600">
                                <thead className="bg-slate-50/80 text-xs font-bold text-slate-700 uppercase tracking-wider">
                                    <tr>
                                        <th className="px-6 py-5">Bank / Wallet</th>
                                        <th className="px-6 py-5">No. Rekening / HP</th>
                                        <th className="px-6 py-5">Atas Nama</th>
                                        <th className="px-6 py-5 text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200/60">
                                    {methods.map((method) => (
                                        <tr key={method.id} className="transition-colors hover:bg-slate-50/50">
                                            <td className="px-6 py-4 font-semibold text-slate-900">
                                                {method.provider_name}
                                            </td>
                                            <td className="px-6 py-4 font-mono">{method.account_number}</td>
                                            <td className="px-6 py-4">{method.account_name}</td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end gap-3">
                                                    <Link
                                                        href={`/eo/payment-methods/${method.id}/edit`}
                                                        className="rounded-lg p-2 text-indigo-600 hover:bg-indigo-50 transition"
                                                    >
                                                        <Edit className="h-5 w-5" />
                                                    </Link>
                                                    <button
                                                        onClick={() => deleteMethod(method.id)}
                                                        className="rounded-lg p-2 text-rose-500 hover:bg-rose-50 transition"
                                                    >
                                                        <Trash2 className="h-5 w-5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </EOLayout>
    );
}