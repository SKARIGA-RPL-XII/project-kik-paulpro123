import AppLayout from '@/layouts/app-layout';
import { Link, usePage } from '@inertiajs/react';

export default function Success() {
    const { order, event } = usePage().props as any;

    return (
        <AppLayout>
            <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
                <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
                    <div className="mb-4 flex justify-center">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
                            <svg
                                className="h-7 w-7 text-green-600"
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
                        </div>
                    </div>

                    {/* TITLE */}
                    <h1 className="text-xl font-bold text-gray-900">
                        Pembayaran Berhasil
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Tiket kamu sudah aktif 🎉
                    </p>

                    {/* INFO BOX */}
                    <div className="mt-6 space-y-3 rounded-xl border border-gray-200 bg-gray-50 p-4 text-left">
                        <div>
                            <p className="text-xs text-gray-400">Invoice</p>
                            <p className="font-mono text-sm font-semibold text-gray-900">
                                {order.invoice}
                            </p>
                        </div>

                        <div className="border-t" />

                        <div>
                            <p className="text-xs text-gray-400">Event</p>
                            <p className="text-sm font-semibold text-gray-900">
                                {event?.title}
                            </p>
                        </div>

                        <div className="border-t" />

                        <div>
                            <p className="text-xs text-gray-400">Total</p>
                            <p className="text-sm font-bold text-teal-600">
                                Rp {order.total_price.toLocaleString()}
                            </p>
                        </div>
                    </div>

                    {/* BUTTONS */}
                    <div className="mt-6 flex flex-col gap-3">
                        <Link
                            href="/tickets"
                            className="rounded-xl bg-teal-500 py-3 text-sm font-semibold text-white transition hover:bg-teal-600"
                        >
                            Lihat Tiket Saya
                        </Link>

                        <Link
                            href={`/events/${event?.id}`}
                            className="rounded-xl border border-gray-200 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
                        >
                            Kembali ke Event
                        </Link>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
