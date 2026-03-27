import { Head, router, usePage, useForm } from '@inertiajs/react';
import EOLayout from '@/layouts/eo-layout';
import { ArrowLeft } from 'lucide-react';
import { FormEventHandler } from 'react';

interface ProviderFromAdmin {
    id: number;
    name: string;
    type: string;
}

interface PaymentMethod {
    id?: number;
    provider_name: string;
    account_number: string;
    account_name: string;
}

export default function PaymentForm() {
    const { paymentMethod, availableProviders } = usePage<{
        paymentMethod?: PaymentMethod;
        availableProviders: ProviderFromAdmin[];
    }>().props;

    const isEdit = !!paymentMethod;

    const { data, setData, post, put, processing } = useForm({
        provider_name: paymentMethod?.provider_name ?? '',
        account_number: paymentMethod?.account_number ?? '',
        account_name: paymentMethod?.account_name ?? '',
    });

    // Filter data untuk OptGroup
    const banks = availableProviders.filter(p => p.type === 'VA' || p.type === 'Bank');
    const wallets = availableProviders.filter(p => p.type === 'E-Wallet');

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (isEdit) {
            put(`/eo/payment-methods/${paymentMethod.id}`);
        } else {
            post('/eo/payment-methods');
        }
    };

    return (
        <EOLayout>
            <Head title={isEdit ? 'Edit Pembayaran' : 'Tambah Pembayaran'} />

            <div className="bg-liniear-to-br min-h-screen from-slate-50 via-white to-slate-50/50 p-6 md:p-10">
                {/* HEADER */}
                <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1.5">
                        <h1 className="bg-liniear-to-r from-slate-900 to-slate-700 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
                            {isEdit ? 'Edit Rekening/Wallet' : 'Tambah Rekening/Wallet'}
                        </h1>
                        <p className="text-sm font-medium text-slate-500">
                            {isEdit
                                ? 'Perbarui informasi metode pembayaran Anda'
                                : 'Lengkapi detail untuk menambahkan metode pembayaran baru'}
                        </p>
                    </div>

                    <button
                        onClick={() => router.visit('/eo/payment-methods')}
                        className="group inline-flex items-center justify-center gap-2.5 rounded-2xl border-2 border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:border-slate-300 hover:bg-slate-50 hover:shadow-md active:scale-95"
                    >
                        <ArrowLeft className="h-4.5 w-4.5 transition-transform group-hover:-translate-x-1" />
                        Kembali
                    </button>
                </div>

                {/* FORM CARD */}
                <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl border border-slate-200/60 bg-white/80 shadow-xl shadow-slate-200/50 backdrop-blur-sm">
                    <form onSubmit={submit} className="space-y-8 p-8 md:p-10">
                        
                        {/* SELECT PROVIDER */}
                        <div className="space-y-3">
                            <label className="block text-sm font-bold tracking-wide text-slate-700 uppercase">
                                Pilih Bank / E-Wallet
                            </label>
                            <select
                                value={data.provider_name}
                                onChange={(e) => setData('provider_name', e.target.value)}
                                className="w-full rounded-xl border-2 border-slate-200 bg-white px-5 py-3.5 text-sm font-medium text-slate-900 shadow-sm transition-all duration-200 focus:border-slate-900 focus:ring-4 focus:ring-slate-900/10 focus:outline-none"
                                required
                            >
                                <option value="" disabled>Pilih metode yang tersedia...</option>
                                
                                {/* OPTGROUP UNTUK BANK */}
                                {banks.length > 0 && (
                                    <optgroup label="BANK / VIRTUAL ACCOUNT">
                                        {banks.map(bank => (
                                            <option key={bank.id} value={bank.name}>{bank.name}</option>
                                        ))}
                                    </optgroup>
                                )}

                                {/* OPTGROUP UNTUK E-WALLET */}
                                {wallets.length > 0 && (
                                    <optgroup label="E-WALLET">
                                        {wallets.map(wallet => (
                                            <option key={wallet.id} value={wallet.name}>{wallet.name}</option>
                                        ))}
                                    </optgroup>
                                )}
                            </select>
                        </div>

                        {/* ACCOUNT NUMBER */}
                        <div className="space-y-3">
                            <label className="block text-sm font-bold tracking-wide text-slate-700 uppercase">
                                Nomor Rekening / Handphone
                            </label>
                            <input
                                type="text"
                                value={data.account_number}
                                onChange={(e) => setData('account_number', e.target.value)}
                                className="w-full rounded-xl border-2 border-slate-200 bg-white px-5 py-3.5 text-sm font-medium text-slate-900 placeholder-slate-400 shadow-sm transition-all duration-200 focus:border-slate-900 focus:ring-4 focus:ring-slate-900/10 focus:outline-none"
                                placeholder="Contoh: 08123456789 atau 1234567890"
                                required
                            />
                        </div>

                        {/* ACCOUNT NAME */}
                        <div className="space-y-3">
                            <label className="block text-sm font-bold tracking-wide text-slate-700 uppercase">
                                Nama Pemilik Rekening
                            </label>
                            <input
                                type="text"
                                value={data.account_name}
                                onChange={(e) => setData('account_name', e.target.value)}
                                className="w-full rounded-xl border-2 border-slate-200 bg-white px-5 py-3.5 text-sm font-medium text-slate-900 placeholder-slate-400 shadow-sm transition-all duration-200 focus:border-slate-900 focus:ring-4 focus:ring-slate-900/10 focus:outline-none"
                                placeholder="Masukkan nama sesuai identitas rekening"
                                required
                            />
                        </div>

                        {/* SUBMIT BUTTON */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="group bg-liniear-to-r relative w-full overflow-hidden rounded-2xl from-slate-900 to-slate-800 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-slate-900/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-slate-900/40 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            <span className="relative z-10">
                                {processing ? 'Menyimpan...' : (isEdit ? 'Update Rekening' : 'Simpan Rekening Baru')}
                            </span>
                            <div className="bg-liniear-to-r absolute inset-0 z-0 from-slate-800 to-slate-700 opacity-0 transition-opacity group-hover:opacity-100" />
                        </button>
                    </form>
                </div>
            </div>
        </EOLayout>
    );
}