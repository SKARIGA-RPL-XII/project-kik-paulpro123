import { Head, Link, router } from '@inertiajs/react';
import { Trash2, Plus, CreditCard, Wallet, CheckCircle2, XCircle } from 'lucide-react';
import AdminLayout from "@/layouts/admin-layout";

interface Provider {
    id: number;
    name: string;
    type: 'VA' | 'E-Wallet';
    is_active: boolean;
}

export default function PaymentProviders({ providers = [] }: { providers: Provider[] }) {
    
    const toggleStatus = (provider: Provider) => {
        router.put(`/admin/payment-providers/${provider.id}`, {
            is_active: !provider.is_active,
        }, {
            preserveScroll: true,
        });
    };

    const deleteProvider = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus metode pembayaran ini? EO yang menggunakannya mungkin akan terdampak.')) {
            router.delete(`/admin/payment-providers/${id}`, {
                preserveScroll: true,
            });
        }
    };

    return (
        <AdminLayout>
            <Head title="Kelola Metode Pembayaran" />

            <div className="bg-liniear-to-br min-h-screen from-slate-50 via-white to-slate-50/50 p-6 md:p-10">
                <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1.5">
                        <h1 className="bg-liniear-to-r from-slate-900 to-slate-700 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
                            Master Metode Pembayaran
                        </h1>
                        <p className="text-sm font-medium text-slate-500">
                            Kelola daftar Bank dan E-Wallet resmi yang bisa digunakan oleh Event Organizer.
                        </p>
                    </div>

                    <Link
                        href="/admin/payment-providers/create"
                        className="group inline-flex items-center justify-center gap-2.5 rounded-2xl bg-slate-900 px-6 py-3 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:bg-slate-800 hover:shadow-xl active:scale-95"
                    >
                        <Plus className="h-4.5 w-4.5" />
                        Tambah Baru
                    </Link>
                </div>

                <div className="mx-auto overflow-hidden rounded-3xl border border-slate-200/60 bg-white/80 shadow-xl shadow-slate-200/50 backdrop-blur-sm">
                    {providers.length === 0 ? (
                        <div className="flex flex-col items-center justify-center p-16 text-center">
                            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
                                <Wallet className="h-10 w-10 text-slate-400" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900">Belum Ada Metode Pembayaran</h3>
                            <p className="mt-2 max-w-sm text-sm text-slate-500">
                                Silakan tambahkan bank atau e-wallet baru agar EO dapat mengatur rekening mereka.
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-slate-600">
                                <thead className="bg-slate-50/80 text-xs font-bold text-slate-700 uppercase tracking-wider">
                                    <tr>
                                        <th className="px-6 py-5">Nama Bank / Wallet</th>
                                        <th className="px-6 py-5">Jenis</th>
                                        <th className="px-6 py-5">Status</th>
                                        <th className="px-6 py-5 text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200/60">
                                    {providers.map((provider) => (
                                        <tr key={provider.id} className="transition-colors hover:bg-slate-50/50">
                                            <td className="px-6 py-4 font-semibold text-slate-900 flex items-center gap-3">
                                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${provider.type === 'VA' ? 'bg-blue-100 text-blue-600' : 'bg-teal-100 text-teal-600'}`}>
                                                    {provider.type === 'VA' ? <CreditCard className="w-5 h-5" /> : <Wallet className="w-5 h-5" />}
                                                </div>
                                                {provider.name}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-xs font-bold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md uppercase tracking-wider">
                                                    {provider.type}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                {provider.is_active ? (
                                                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">
                                                        <CheckCircle2 className="w-3.5 h-3.5" /> Aktif
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-500 bg-rose-50 px-2.5 py-1 rounded-md border border-rose-100">
                                                        <XCircle className="w-3.5 h-3.5" /> Non-aktif
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-3">
                                                    {/* Toggle Button */}
                                                    <button 
                                                        onClick={() => toggleStatus(provider)}
                                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${provider.is_active ? 'bg-emerald-500' : 'bg-slate-300'}`}
                                                    >
                                                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${provider.is_active ? 'translate-x-6' : 'translate-x-1'}`} />
                                                    </button>

                                                    <div className="w-px h-6 bg-slate-200 mx-1"></div>

                                                    {/* Delete Button */}
                                                    <button
                                                        onClick={() => deleteProvider(provider.id)}
                                                        className="rounded-lg p-2 text-rose-500 hover:bg-rose-50 transition"
                                                        title="Hapus Permanen"
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
        </AdminLayout>
    );
}