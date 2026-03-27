import { useState } from 'react';

// ─── Brand Logos (TETAP SAMA) ───────────────────────────────────────────────────────────────
function LogoBCA() {
    return (
        <svg
            viewBox="0 0 80 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-auto"
        >
            {' '}
            <rect width="80" height="32" rx="4" fill="#003087" />{' '}
            <text
                x="40"
                y="22"
                textAnchor="middle"
                fill="white"
                fontSize="14"
                fontWeight="bold"
                fontFamily="Arial, sans-serif"
            >
                BCA
            </text>{' '}
        </svg>
    );
}
function LogoMandiri() {
    return (
        <svg
            viewBox="0 0 100 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-auto"
        >
            {' '}
            <rect width="100" height="32" rx="4" fill="#003087" />{' '}
            <text
                x="50"
                y="22"
                textAnchor="middle"
                fill="#F5A623"
                fontSize="12"
                fontWeight="bold"
                fontFamily="Arial, sans-serif"
            >
                mandiri
            </text>{' '}
        </svg>
    );
}
function LogoBNI() {
    return (
        <svg
            viewBox="0 0 70 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-auto"
        >
            {' '}
            <rect width="70" height="32" rx="4" fill="#E46C0A" />{' '}
            <text
                x="35"
                y="22"
                textAnchor="middle"
                fill="white"
                fontSize="14"
                fontWeight="bold"
                fontFamily="Arial, sans-serif"
            >
                BNI
            </text>{' '}
        </svg>
    );
}
function LogoBRI() {
    return (
        <svg
            viewBox="0 0 70 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-auto"
        >
            {' '}
            <rect width="70" height="32" rx="4" fill="#0070BA" />{' '}
            <text
                x="35"
                y="22"
                textAnchor="middle"
                fill="white"
                fontSize="14"
                fontWeight="bold"
                fontFamily="Arial, sans-serif"
            >
                BRI
            </text>{' '}
        </svg>
    );
}
function LogoDana() {
    return (
        <svg
            viewBox="0 0 80 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-auto"
        >
            {' '}
            <rect width="80" height="32" rx="16" fill="#118EEA" />{' '}
            <text
                x="40"
                y="22"
                textAnchor="middle"
                fill="white"
                fontSize="14"
                fontWeight="bold"
                fontFamily="Arial, sans-serif"
            >
                DANA
            </text>{' '}
        </svg>
    );
}
function LogoShopeePay() {
    return (
        <svg
            viewBox="0 0 110 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-auto"
        >
            {' '}
            <rect width="110" height="32" rx="4" fill="#EE4D2D" />{' '}
            <text
                x="55"
                y="22"
                textAnchor="middle"
                fill="white"
                fontSize="11"
                fontWeight="bold"
                fontFamily="Arial, sans-serif"
            >
                ShopeePay
            </text>{' '}
        </svg>
    );
}
function LogoGoPay() {
    return (
        <svg
            viewBox="0 0 80 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-auto"
        >
            {' '}
            <rect width="80" height="32" rx="16" fill="#00AED6" />{' '}
            <text
                x="40"
                y="22"
                textAnchor="middle"
                fill="white"
                fontSize="13"
                fontWeight="bold"
                fontFamily="Arial, sans-serif"
            >
                GoPay
            </text>{' '}
        </svg>
    );
}
function LogoOVO() {
    return (
        <svg
            viewBox="0 0 70 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-auto"
        >
            {' '}
            <rect width="70" height="32" rx="16" fill="#4C3494" />{' '}
            <text
                x="35"
                y="22"
                textAnchor="middle"
                fill="white"
                fontSize="13"
                fontWeight="bold"
                fontFamily="Arial, sans-serif"
            >
                ovo
            </text>{' '}
        </svg>
    );
}
function LogoLinkAja() {
    return (
        <svg
            viewBox="0 0 90 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-auto"
        >
            {' '}
            <rect width="90" height="32" rx="16" fill="#E82529" />{' '}
            <text
                x="45"
                y="22"
                textAnchor="middle"
                fill="white"
                fontSize="12"
                fontWeight="bold"
                fontFamily="Arial, sans-serif"
            >
                LinkAja
            </text>{' '}
        </svg>
    );
}

// ─── Icons ───────────────────────────────────────────
function IconVA() {
    return (
        <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
            {' '}
            <rect
                x="2"
                y="5"
                width="20"
                height="14"
                rx="3"
                stroke="currentColor"
                strokeWidth="1.8"
            />{' '}
            <path
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                d="M2 10h20"
            />{' '}
            <path
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                d="M6 15h4"
            />{' '}
        </svg>
    );
}
function IconEWallet() {
    return (
        <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
            {' '}
            <path
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 7H3a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1Z"
            />{' '}
            <path
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                d="M16 12h2"
            />{' '}
            <path
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                d="M3 7V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v1"
            />{' '}
        </svg>
    );
}

// ─── Data ──────────────────────────────────────────────────────────────────────
const PAYMENT_OPTIONS = {
    va: [
        { id: 'BCA', label: 'BCA Virtual Account', Logo: LogoBCA },
        { id: 'Mandiri', label: 'Mandiri Virtual Account', Logo: LogoMandiri },
        { id: 'BNI', label: 'BNI Virtual Account', Logo: LogoBNI },
        { id: 'BRI', label: 'BRI Virtual Account', Logo: LogoBRI },
    ],
    ewallet: [
        { id: 'Dana', label: 'DANA', Logo: LogoDana },
        { id: 'ShopeePay', label: 'ShopeePay', Logo: LogoShopeePay },
        { id: 'GoPay', label: 'GoPay', Logo: LogoGoPay },
        { id: 'OVO', label: 'OVO', Logo: LogoOVO },
        { id: 'LinkAja', label: 'LinkAja', Logo: LogoLinkAja },
    ],
};

// ─── Props ─────────────────────────────────────────────────────────────────────

// Tipe data baru untuk menampung BANYAK metode pembayaran milik EO
interface EoPaymentMethod {
    provider_name: string; // Contoh: 'BCA', 'Dana', 'Mandiri'
    account_number: string;
    account_name: string;
}

interface Props {
    show: boolean;
    paymentMethod: string;
    setPaymentMethod: (method: string) => void;
    closeModal: () => void;
    eoPaymentMethods?: EoPaymentMethod[]; // Array berisi daftar bank/wallet yang sudah di-input EO
}

// ─── Component ─────────────────────────────────────────────────────────────────

export default function PaymentModal({
    show,
    paymentMethod,
    setPaymentMethod,
    closeModal,
    eoPaymentMethods = [],
}: Props) {
    const [paymentType, setPaymentType] = useState('');

    const handleClose = () => {
        closeModal();
        setPaymentType('');
    };

    // Fungsi sakti untuk mengecek apakah ID bank/wallet ini sudah disetting oleh EO
    const isConfigured = (providerId: string) => {
        return eoPaymentMethods.some(
            (method) => method.provider_name === providerId,
        );
    };

    if (!show) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
            style={{
                backgroundColor: 'rgba(0,0,0,0.5)',
                backdropFilter: 'blur(4px)',
            }}
            onClick={(e) => {
                if (e.target === e.currentTarget) handleClose();
            }}
        >
            <style>{`
                @keyframes slideUp { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
                .fade-in { animation: fadeIn 0.2s ease forwards; }
            `}</style>

            <div
                className="w-full bg-white shadow-2xl sm:w-105 sm:rounded-2xl"
                style={{
                    borderRadius: '24px 24px 0 0',
                    animation: 'slideUp 0.28s cubic-bezier(0.32, 0.72, 0, 1)',
                }}
            >
                <div className="flex justify-center pt-3 pb-1 sm:hidden">
                    <div className="h-1 w-10 rounded-full bg-gray-200" />
                </div>

                {/* ── Header ── */}
                <div className="flex items-center gap-3 border-b border-gray-100 px-5 pt-4 pb-4">
                    {paymentType && (
                        <button
                            onClick={() => setPaymentType('')}
                            className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 transition hover:bg-gray-200"
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
                        </button>
                    )}
                    <div className="flex-1">
                        <h2 className="text-base font-bold text-gray-900">
                            {!paymentType && 'Pilih Metode Pembayaran'}
                            {paymentType === 'va' && 'Virtual Account'}
                            {paymentType === 'ewallet' && 'E-Wallet'}
                        </h2>
                        {!paymentType && (
                            <p className="mt-0.5 text-xs text-gray-400">
                                Pilih jenis pembayaran yang diinginkan
                            </p>
                        )}
                    </div>
                    <button
                        onClick={handleClose}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-gray-200"
                    >
                        <svg
                            width="14"
                            height="14"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                d="M6 6l12 12M6 18L18 6"
                            />
                        </svg>
                    </button>
                </div>

                {/* ── Body ── */}
                <div className="p-5 pb-6">
                    {/* STEP 1 — Pilih jenis */}
                    {!paymentType && (
                        <div className="space-y-3 fade-in">
                            <button
                                onClick={() => setPaymentType('va')}
                                className="group flex w-full items-center gap-4 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-4 text-left transition hover:border-teal-400 hover:bg-teal-50"
                            >
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600 transition group-hover:bg-blue-200">
                                    <IconVA />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-semibold text-gray-900">
                                        Virtual Account
                                    </p>
                                    <div className="mt-1.5 flex items-center gap-2">
                                        <LogoBCA />
                                        <LogoMandiri />
                                        <LogoBNI />
                                        <LogoBRI />
                                    </div>
                                </div>
                                <svg
                                    className="h-4 w-4 shrink-0 text-gray-300 transition group-hover:text-teal-500"
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

                            <button
                                onClick={() => setPaymentType('ewallet')}
                                className="group flex w-full items-center gap-4 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-4 text-left transition hover:border-teal-400 hover:bg-teal-50"
                            >
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-100 text-teal-600 transition group-hover:bg-teal-200">
                                    <IconEWallet />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-semibold text-gray-900">
                                        E-Wallet
                                    </p>
                                    <div className="mt-1.5 flex flex-wrap items-center gap-2">
                                        <LogoDana />
                                        <LogoShopeePay />
                                        <LogoGoPay />
                                        <LogoOVO />
                                        <LogoLinkAja />
                                    </div>
                                </div>
                                <svg
                                    className="h-4 w-4 shrink-0 text-gray-300 transition group-hover:text-teal-500"
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
                    )}

                    {/* STEP 2 — Virtual Account */}
                    {paymentType === 'va' && (
                        <div className="max-h-[60vh] space-y-2 overflow-y-auto fade-in">
                            {PAYMENT_OPTIONS.va.map(({ id, label, Logo }) => {
                                const configured = isConfigured(id);
                                return (
                                    <button
                                        key={id}
                                        onClick={() => {
                                            if (configured) {
                                                setPaymentMethod(id);
                                                handleClose();
                                            }
                                        }}
                                        disabled={!configured}
                                        className={`flex w-full items-center gap-4 rounded-xl border px-4 py-3.5 transition ${
                                            configured
                                                ? paymentMethod === id
                                                    ? 'border-teal-400 bg-teal-50 ring-2 ring-teal-100'
                                                    : 'cursor-pointer border-gray-200 bg-white hover:border-teal-300 hover:bg-teal-50'
                                                : 'cursor-not-allowed border-gray-200 bg-gray-50 opacity-50 grayscale'
                                        }`}
                                    >
                                        <div className="flex h-9 w-16 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white px-1 shadow-sm">
                                            <Logo />
                                        </div>
                                        <div className="flex flex-1 flex-col text-left">
                                            <span
                                                className={`text-sm font-medium ${!configured ? 'text-gray-500 line-through decoration-gray-400' : 'text-gray-800'}`}
                                            >
                                                {label}
                                            </span>
                                            {/* Validasi Teks Peringatan jika belum disetting EO */}
                                            {!configured && (
                                                <span className="mt-0.5 text-[10px] font-medium text-red-500 italic">
                                                    metode belum disetting
                                                    pembuat
                                                </span>
                                            )}
                                        </div>
                                        {paymentMethod === id && configured && (
                                            <svg
                                                className="h-5 w-5 shrink-0 text-teal-500"
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
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    )}

                    {/* STEP 3 — E-Wallet */}
                    {paymentType === 'ewallet' && (
                        <div className="max-h-[60vh] space-y-2 overflow-y-auto fade-in">
                            {PAYMENT_OPTIONS.ewallet.map(
                                ({ id, label, Logo }) => {
                                    const configured = isConfigured(id);
                                    return (
                                        <button
                                            key={id}
                                            onClick={() => {
                                                if (configured) {
                                                    setPaymentMethod(id);
                                                    handleClose();
                                                }
                                            }}
                                            disabled={!configured}
                                            className={`flex w-full items-center gap-4 rounded-xl border px-4 py-3.5 transition ${
                                                configured
                                                    ? paymentMethod === id
                                                        ? 'border-teal-400 bg-teal-50 ring-2 ring-teal-100'
                                                        : 'cursor-pointer border-gray-200 bg-white hover:border-teal-300 hover:bg-teal-50'
                                                    : 'cursor-not-allowed border-gray-200 bg-gray-50 opacity-50 grayscale'
                                            }`}
                                        >
                                            <div className="flex h-9 w-16 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white px-1 shadow-sm">
                                                <Logo />
                                            </div>
                                            <div className="flex flex-1 flex-col text-left">
                                                <span
                                                    className={`text-sm font-medium ${!configured ? 'text-gray-500 line-through decoration-gray-400' : 'text-gray-800'}`}
                                                >
                                                    {label}
                                                </span>
                                                {/* Validasi Teks Peringatan jika belum disetting EO */}
                                                {!configured && (
                                                    <span className="mt-0.5 text-[10px] font-medium text-red-500 italic">
                                                        metode belum disetting
                                                        pembuat
                                                    </span>
                                                )}
                                            </div>
                                            {paymentMethod === id &&
                                                configured && (
                                                    <svg
                                                        className="h-5 w-5 shrink-0 text-teal-500"
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
                                                )}
                                        </button>
                                    );
                                },
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}