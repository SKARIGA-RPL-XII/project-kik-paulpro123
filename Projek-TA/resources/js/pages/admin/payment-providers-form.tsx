import { Head, useForm, router } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { CreditCard, Wallet, ArrowLeft } from 'lucide-react';
import AdminLayout from "@/layouts/admin-layout";

export default function PaymentProviderForm() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        type: 'VA', 
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/admin/payment-providers');
    };

    return (
        <AdminLayout>
            <Head title="Tambah Metode Pembayaran" />

            <div className="bg-liniear-to-br min-h-screen from-slate-50 via-white to-slate-50/50 p-6 md:p-10">
                <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between mx-auto max-w-3xl">
                    <div className="space-y-1.5">
                        <h1 className="bg-liniear-to-r from-slate-900 to-slate-700 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
                            Tambah Metode Baru
                        </h1>
                        <p className="text-sm font-medium text-slate-500">
                            Tambahkan Bank atau E-Wallet baru ke dalam sistem master.
                        </p>
                    </div>

                    <button
                        onClick={() => router.visit('/admin/payment-providers')}
                        className="group inline-flex items-center justify-center gap-2.5 rounded-2xl border-2 border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:border-slate-300 hover:bg-slate-50 hover:shadow-md active:scale-95"
                    >
                        <ArrowLeft className="h-4.5 w-4.5 transition-transform group-hover:-translate-x-1" />
                        Kembali
                    </button>
                </div>

                <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl border border-slate-200/60 bg-white/80 shadow-xl shadow-slate-200/50 backdrop-blur-sm">
                    <form onSubmit={submit} className="space-y-8 p-8 md:p-10">
                        
                        <div className="space-y-3">
                            <label className="block text-sm font-bold tracking-wide text-slate-700 uppercase">
                                Nama Bank / Wallet
                            </label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="w-full rounded-xl border-2 border-slate-200 bg-white px-5 py-3.5 text-sm font-medium text-slate-900 placeholder-slate-400 shadow-sm transition-all duration-200 focus:border-slate-900 focus:ring-4 focus:ring-slate-900/10 focus:outline-none"
                                placeholder="Contoh: BCA, Mandiri, Dana..."
                                required
                            />
                            {errors.name && <p className="mt-1 text-xs font-bold text-rose-500">{errors.name}</p>}
                        </div>

                        <div className="space-y-3">
                            <label className="block text-sm font-bold tracking-wide text-slate-700 uppercase">
                                Jenis Pembayaran
                            </label>
                            <div className="grid grid-cols-2 gap-4">
                                <label className={`flex flex-col items-center justify-center gap-3 border-2 rounded-2xl p-6 cursor-pointer transition-all duration-200 ${data.type === 'VA' ? 'bg-indigo-50 border-indigo-600 text-indigo-700 shadow-md' : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50 hover:border-slate-300'}`}>
                                    <input type="radio" name="type" value="VA" checked={data.type === 'VA'} onChange={(e) => setData('type', e.target.value)} className="sr-only" />
                                    <CreditCard className={`w-8 h-8 ${data.type === 'VA' ? 'text-indigo-600' : 'text-slate-400'}`} />
                                    <span className="text-sm font-bold">Bank / Virtual Account</span>
                                </label>
                                <label className={`flex flex-col items-center justify-center gap-3 border-2 rounded-2xl p-6 cursor-pointer transition-all duration-200 ${data.type === 'E-Wallet' ? 'bg-teal-50 border-teal-500 text-teal-700 shadow-md' : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50 hover:border-slate-300'}`}>
                                    <input type="radio" name="type" value="E-Wallet" checked={data.type === 'E-Wallet'} onChange={(e) => setData('type', e.target.value)} className="sr-only" />
                                    <Wallet className={`w-8 h-8 ${data.type === 'E-Wallet' ? 'text-teal-600' : 'text-slate-400'}`} />
                                    <span className="text-sm font-bold">E-Wallet</span>
                                </label>
                            </div>
                            {errors.type && <p className="mt-1 text-xs font-bold text-rose-500">{errors.type}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="group bg-liniear-to-r relative w-full overflow-hidden rounded-2xl from-slate-900 to-slate-800 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-slate-900/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-slate-900/40 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            <span className="relative z-10">
                                {processing ? 'Menyimpan...' : 'Simpan Metode Baru'}
                            </span>
                            <div className="bg-liniear-to-r absolute inset-0 z-0 from-slate-800 to-slate-700 opacity-0 transition-opacity group-hover:opacity-100" />
                        </button>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}