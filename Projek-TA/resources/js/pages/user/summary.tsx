import AppLayout from '@/layouts/app-layout';
import { usePage, router } from '@inertiajs/react';
import { useState } from 'react';
import PaymentModal from '@/components/payment-modal';

const PAYMENT_OPTIONS = {
    va: [
        { id: 'BCA', label: 'BCA Virtual Account', color: '#003087' },
        { id: 'Mandiri', label: 'Mandiri Virtual Account', color: '#003087' },
        { id: 'BNI', label: 'BNI Virtual Account', color: '#e46c0a' },
        { id: 'BRI', label: 'BRI Virtual Account', color: '#0070ba' },
    ],
    ewallet: [
        { id: 'Dana', label: 'DANA', color: '#118EEA' },
        { id: 'ShopeePay', label: 'ShopeePay', color: '#EE4D2D' },
        { id: 'GoPay', label: 'GoPay', color: '#00AED6' },
        { id: 'OVO', label: 'OVO', color: '#4C3494' },
        { id: 'LinkAja', label: 'LinkAja', color: '#E82529' },
    ],
};

const BANK_INITIALS: Record<string, string> = {
    BCA: 'BCA',
    Mandiri: 'MDR',
    BNI: 'BNI',
    BRI: 'BRI',
    Dana: 'DN',
    ShopeePay: 'SP',
    GoPay: 'GP',
    OVO: 'OVO',
    LinkAja: 'LA',
};

function PaymentBadge({ method }: { method: string }) {
    if (method === 'eo_manual') {
        return (
            <span className="inline-flex h-7 items-center rounded-lg bg-gray-700 px-2.5 text-xs font-bold text-white">
                MANUAL
            </span>
        );
    }

    const color =
        [...PAYMENT_OPTIONS.va, ...PAYMENT_OPTIONS.ewallet].find(
            (p) => p.id === method,
        )?.color ?? '#14b8a6';

    return (
        <span
            className="inline-flex h-7 items-center rounded-lg px-2.5 text-xs font-bold text-white"
            style={{ backgroundColor: color }}
        >
            {BANK_INITIALS[method] ?? method}
        </span>
    );
}

export default function Summary() {
    const pageProps = usePage().props as any;

    const ticket = pageProps.ticket ?? {};
    const customer = pageProps.customer ?? {};
    const event = pageProps.event ?? {};

    const eoPaymentMethods = pageProps.eo_payment_methods ?? [];

    const [paymentMethod, setPaymentMethod] = useState('');
    const [showModal, setShowModal] = useState(false);

    const subtotal =
        ticket?.reduce((sum: number, t: any) => sum + t.price * t.qty, 0) ?? 0;
    const adminFee = 7950;
    const internetFee = 4000;
    const total = subtotal + adminFee + internetFee;

    const closeModal = () => {
        setShowModal(false);
    };

    function processPayment() {
        if (!paymentMethod) {
            alert('Pilih metode pembayaran terlebih dahulu');
            return;
        }

        router.post('/checkout/create-order', {
            payment_method: paymentMethod,
            total_price: total,
            event_id: event?.id,
            tickets: ticket,
        });
    }

    const getPaymentLabel = (method: string) => {
        const found = [...PAYMENT_OPTIONS.va, ...PAYMENT_OPTIONS.ewallet].find(
            (p) => p.id === method,
        );
        return found?.label;
    };

    return (
        <AppLayout>
            <div className="min-h-screen bg-white p-6">
                {/* Header */}
                <div className="mb-6 flex items-start justify-between">
                    <div>
                        <p className="mb-1 text-xs font-semibold tracking-widest text-teal-500 uppercase">
                            Langkah 2 dari 3
                        </p>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Ringkasan Pesanan
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Periksa kembali pesanan Anda sebelum melanjutkan.
                        </p>
                    </div>
                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50"
                    >
                        <svg
                            width="16"
                            height="16"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                        Kembali
                    </button>
                </div>

                <div className="w-full space-y-4">
                    {/* EVENT */}
                    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                        <p className="mb-3 text-xs font-semibold tracking-widest text-gray-400 uppercase">
                            Detail Event
                        </p>
                        <div className="flex items-start gap-4">
                            <img
                                src={
                                    event?.image
                                        ? `/storage/${event.image}`
                                        : 'https://via.placeholder.com/400x300?text=No+Image'
                                }
                                className="h-20 w-20 shrink-0 rounded-xl border border-gray-200 object-cover"
                            />
                            <div className="flex flex-col gap-1">
                                <p className="text-base leading-snug font-semibold text-gray-900">
                                    {event?.title || '-'}
                                </p>
                                <span className="inline-flex items-center gap-1.5 text-sm text-gray-500">
                                    <svg
                                        className="h-4 w-4 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M15 5v2m-6-2v2M3 9h18M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2Z"
                                        />
                                    </svg>
                                    {ticket?.map((t: any) => (
                                        <div
                                            key={t.id}
                                            className="flex items-center gap-2"
                                        >
                                            <span>{t.name}</span>
                                            <span className="rounded-full px-2 py-0.5 text-xs font-semibold text-gray-600">
                                                x{t.qty}
                                            </span>
                                        </div>
                                    ))}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* CUSTOMER */}
                    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                        <p className="mb-3 text-xs font-semibold tracking-widest text-gray-400 uppercase">
                            Data Pembeli
                        </p>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2.5">
                                <svg
                                    className="h-4 w-4 shrink-0 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Zm-4 7a7 7 0 0 0-7 7h14a7 7 0 0 0-7-7Z"
                                    />
                                </svg>
                                <span className="text-sm text-gray-700">
                                    {customer?.full_name || '-'}
                                </span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <svg
                                    className="h-4 w-4 shrink-0 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M3 5a2 2 0 0 1 2-2h3.28a1 1 0 0 1 .948.684l1.498 4.493a1 1 0 0 1-.502 1.21l-2.257 1.13a11.042 11.042 0 0 0 5.516 5.516l1.13-2.257a1 1 0 0 1 1.21-.502l4.493 1.498A1 1 0 0 1 21 17v3a2 2 0 0 1-2 2h-1C9.716 22 2 14.284 2 5V4a2 2 0 0 1 2-2"
                                    />
                                </svg>
                                <span className="text-sm text-gray-700">
                                    {customer?.phone || '-'}
                                </span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <svg
                                    className="h-4 w-4 shrink-0 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2Z"
                                    />
                                </svg>
                                <span className="text-sm text-gray-700">
                                    {customer?.email || '-'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* PAYMENT METHOD */}
                    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                        <p className="mb-3 text-xs font-semibold tracking-widest text-gray-400 uppercase">
                            Metode Pembayaran
                        </p>
                        <button
                            onClick={() => setShowModal(true)}
                            className="flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm transition hover:border-teal-400 hover:ring-2 hover:ring-teal-100"
                        >
                            {paymentMethod ? (
                                <span className="flex items-center gap-2.5 font-medium text-gray-900">
                                    <PaymentBadge method={paymentMethod} />
                                    {getPaymentLabel(paymentMethod)}
                                </span>
                            ) : (
                                <span className="text-gray-400">
                                    Pilih metode pembayaran
                                </span>
                            )}
                            <svg
                                className="h-4 w-4 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* DETAIL PEMBAYARAN */}
                    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                        <p className="mb-3 text-xs font-semibold tracking-widest text-gray-400 uppercase">
                            Detail Pembayaran
                        </p>
                        <div className="space-y-2.5">
                            <div className="flex justify-between text-sm text-gray-600">
                                <span>Subtotal</span>
                                <span className="font-medium text-gray-800">
                                    Rp{subtotal.toLocaleString()}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-600">
                                <span>Admin Fee</span>
                                <span className="font-medium text-gray-800">
                                    Rp{adminFee.toLocaleString()}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-600">
                                <span>Internet Fee</span>
                                <span className="font-medium text-gray-800">
                                    Rp{internetFee.toLocaleString()}
                                </span>
                            </div>
                            <div className="flex justify-between border-t border-gray-200 pt-3">
                                <span className="font-bold text-gray-900">
                                    Grand Total
                                </span>
                                <span className="text-base font-bold text-teal-600">
                                    Rp{total.toLocaleString()}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* SUBMIT */}
                    <button
                        onClick={processPayment}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-500 py-3.5 text-sm font-bold text-white transition hover:bg-teal-600 active:bg-teal-700"
                    >
                        Proses Pembayaran
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
                    </button>
                </div>
            </div>

            <PaymentModal
                show={showModal}
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
                closeModal={closeModal}
                eoPaymentMethods={eoPaymentMethods}
            />
        </AppLayout>
    );
}
