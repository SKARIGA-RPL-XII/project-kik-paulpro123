import AppLayout from '@/layouts/app-layout';
import { Link } from '@inertiajs/react';

export default function PaymentFailed() {
    return (
        <AppLayout>
            {' '}
            <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
                {' '}
                <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
                    ```
                    {/* Icon */}
                    <div className="mb-5 flex justify-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                            <svg
                                className="h-8 w-8 text-red-500"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 6l12 12M6 18L18 6"
                                />
                            </svg>
                        </div>
                    </div>
                    {/* Title */}
                    <h1 className="text-xl font-bold text-gray-900">
                        Pembayaran Gagal
                    </h1>
                    {/* Description */}
                    <p className="mt-2 text-sm text-gray-500">
                        Maaf, pembayaran Anda tidak dapat diproses. Silakan coba
                        kembali atau lakukan pembayaran ulang.
                    </p>
                    {/* Divider */}
                    <div className="my-6 border-t border-gray-100"></div>
                    {/* Buttons */}
                    <div className="flex flex-col gap-3">
                        <Link
                            href="/user"
                            className="rounded-xl bg-teal-500 py-3 text-sm font-semibold text-white transition hover:bg-teal-600"
                        >
                            Kembali ke Event
                        </Link>

                        <Link
                            href="/checkout/payment"
                            className="rounded-xl border border-gray-200 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
                        >
                            Coba Pembayaran Lagi
                        </Link>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
