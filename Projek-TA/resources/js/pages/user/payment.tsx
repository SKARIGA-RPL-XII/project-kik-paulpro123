import AppLayout from '@/layouts/app-layout';
import { usePage, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Payment() {
    const { order, event } = usePage().props as any;

    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const REKENING = '1234567890';

    function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
        const f = e.target.files?.[0] ?? null;
        setFile(f);
        if (f) setPreview(URL.createObjectURL(f));
        else setPreview(null);
    }

    function copyRekening() {
        navigator.clipboard.writeText(REKENING);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    function submitPayment() {
        if (!file) {
            alert('Upload bukti pembayaran terlebih dahulu');
            return;
        }
        setLoading(true);
        const formData = new FormData();
        formData.append('order_id', order.id);
        formData.append('payment_proof', file);
        router.post('/checkout/verify-payment', formData, {
            forceFormData: true,
            onFinish: () => setLoading(false),
        });
    }

    return (
        <AppLayout>
            <div className="min-h-screen bg-white p-6">
                <div className="mb-6">
                    <p className="mb-1 text-xs font-semibold tracking-widest text-teal-500 uppercase">
                        Langkah 3 dari 3
                    </p>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Pembayaran
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Selesaikan pembayaran untuk mendapatkan tiket Anda.
                    </p>
                </div>

                <div className="space-y-4">
                    <div className="space-y-4 rounded-2xl border border-gray-200 bg-gray-50 p-5">
                        <div>
                            <p className="mb-1 text-xs font-semibold tracking-widest text-gray-400 uppercase">
                                Invoice
                            </p>
                            <p className="font-mono text-base font-bold tracking-wide text-gray-900">
                                {order.invoice}
                            </p>
                        </div>
                        <div className="border-t border-gray-200" />
                        <div>
                            <p className="mb-1 text-xs font-semibold tracking-widest text-gray-400 uppercase">
                                Event
                            </p>
                            <p className="font-semibold text-gray-900">
                                {event?.title}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4 rounded-2xl border border-gray-200 bg-gray-50 p-5">
                        <div>
                            <p className="mb-1 text-xs font-semibold tracking-widest text-gray-400 uppercase">
                                Total Pembayaran
                            </p>    
                            <p className="text-2xl font-bold text-teal-600">
                                Rp {order.total_price.toLocaleString()}
                            </p>
                        </div>
                        <div className="border-t border-gray-200" />
                        <div>
                            <p className="mb-1 text-xs font-semibold tracking-widest text-gray-400 uppercase">
                                Metode Pembayaran
                            </p>
                            <p className="font-semibold text-gray-900">
                                {order.payment_method}
                            </p>
                        </div>
                    </div>

                    {/* ── REKENING TUJUAN ── */}
                    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                        <p className="mb-3 text-xs font-semibold tracking-widest text-gray-400 uppercase">
                            Rekening Tujuan
                        </p>
                        <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3">
                            <div>
                                <p className="font-mono text-lg font-bold tracking-widest text-gray-900">
                                    {REKENING}
                                </p>
                                <p className="mt-0.5 text-xs text-gray-500">
                                    a.n Event Organizer
                                </p>
                            </div>
                            <button
                                onClick={copyRekening}
                                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                                    copied
                                        ? 'bg-teal-100 text-teal-700'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                {copied ? (
                                    <>
                                        <svg
                                            className="h-3.5 w-3.5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeWidth="2.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                        Tersalin
                                    </>
                                ) : (
                                    <>
                                        <svg
                                            className="h-3.5 w-3.5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <rect
                                                x="9"
                                                y="9"
                                                width="13"
                                                height="13"
                                                rx="2"
                                                stroke="currentColor"
                                                strokeWidth="1.8"
                                            />
                                            <path
                                                stroke="currentColor"
                                                strokeWidth="1.8"
                                                strokeLinecap="round"
                                                d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
                                            />
                                        </svg>
                                        Salin
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* ── UPLOAD BUKTI ── */}
                    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                        <p className="mb-3 text-xs font-semibold tracking-widest text-gray-400 uppercase">
                            Upload Bukti Pembayaran
                        </p>

                        {/* Drop zone */}
                        <label
                            className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-6 transition ${
                                file
                                    ? 'border-teal-400 bg-teal-50'
                                    : 'border-gray-200 bg-white hover:border-teal-300 hover:bg-teal-50/40'
                            }`}
                        >
                            <input
                                type="file"
                                accept="image/*,.pdf"
                                onChange={handleFile}
                                className="hidden"
                            />

                            {preview ? (
                                <img
                                    src={preview}
                                    alt="preview"
                                    className="max-h-48 rounded-lg object-contain shadow"
                                />
                            ) : (
                                <svg
                                    className="h-9 w-9 text-gray-300"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 16V4m0 0-3 3m3-3 3 3M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"
                                    />
                                </svg>
                            )}

                            <div className="text-center">
                                {file ? (
                                    <>
                                        <p className="text-sm font-semibold text-teal-700">
                                            {file.name}
                                        </p>
                                        <p className="mt-0.5 text-xs text-teal-500">
                                            Klik untuk ganti file
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <p className="text-sm font-semibold text-gray-600">
                                            Klik untuk upload
                                        </p>
                                        <p className="mt-0.5 text-xs text-gray-400">
                                            PNG, JPG, atau PDF · Maks. 5MB
                                        </p>
                                    </>
                                )}
                            </div>
                        </label>
                    </div>

                    <button
                        onClick={submitPayment}
                        disabled={!file || loading}
                        className={`flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold text-white transition ${
                            file && !loading
                                ? 'bg-teal-500 hover:bg-teal-600 active:bg-teal-700'
                                : 'cursor-not-allowed bg-gray-200 text-gray-400'
                        }`}
                    >
                        {loading ? (
                            <>
                                <svg
                                    className="h-4 w-4 animate-spin"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v4l3-3-3-3V4a10 10 0 100 20v-4l-3 3 3 3v-2a8 8 0 01-8-8z"
                                    />
                                </svg>
                                Memverifikasi...
                            </>
                        ) : (
                            <>
                                Konfirmasi Pembayaran
                                <svg
                                    width="18"
                                    height="18"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2.5"
                                        d="M5 12h14M13 6l6 6-6 6"
                                    />
                                </svg>
                            </>
                        )}
                    </button>
                </div>
            </div>

            {loading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="flex flex-col items-center gap-4 rounded-2xl bg-white px-10 py-8 shadow-2xl">
                        <svg
                            className="h-10 w-10 animate-spin text-teal-500"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-20"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            />
                            <path
                                className="opacity-80"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                            />
                        </svg>
                        <div className="text-center">
                            <p className="font-bold text-gray-900">
                                Memverifikasi Pembayaran
                            </p>
                            <p className="mt-1 text-sm text-gray-500">
                                Mohon tunggu sebentar...
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
