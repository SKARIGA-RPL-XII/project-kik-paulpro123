import { Head, usePage, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

export default function TicketDetail() {
    const { ticket } = usePage().props as any;

    return (
        <AppLayout>
            <Head title="Ticket Detail" />

            <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
                <div className="w-full max-w-md rounded-2xl border bg-white p-6 shadow-sm">
                    {/* QR PLACEHOLDER */}
                    <div className="mb-6 flex justify-center">
                        <div className="flex h-40 w-40 items-center justify-center rounded-xl border border-dashed text-gray-400">
                            QR CODE
                        </div>
                    </div>

                    {/* EVENT NAME */}
                    <h1 className="text-center text-xl font-bold text-gray-900">
                        {ticket.order?.event?.title}
                    </h1>

                    {/* TICKET NAME */}
                    <p className="mt-1 text-center text-sm font-medium text-teal-600">
                        🎟 {ticket.ticket?.name} (x{ticket.quantity})
                    </p>

                    {/* INFO BOX */}
                    <div className="mt-6 space-y-4 rounded-xl border bg-gray-50 p-4">
                        <div>
                            <p className="text-xs text-gray-400">Invoice</p>
                            <p className="font-mono text-sm font-semibold text-gray-900">
                                {ticket.order?.invoice}
                            </p>
                        </div>

                        <div className="border-t" />

                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-gray-400">Status</p>
                                <span
                                    className={`mt-1 inline-block rounded-full px-3 py-1 text-xs font-medium ${
                                        ticket.order?.status === 'paid'
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-yellow-100 text-yellow-700'
                                    }`}
                                >
                                    {ticket.order?.status}
                                </span>
                            </div>
                        </div>

                        <div className="border-t" />

                        <div>
                            <p className="text-xs text-gray-400">
                                Tanggal Event
                            </p>
                            <p className="text-sm font-semibold text-gray-900">
                                {ticket.order?.event?.date}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-gray-400">Lokasi</p>
                            <p className="text-sm font-semibold text-gray-900">
                                {ticket.order?.event?.location}
                            </p>
                        </div>
                    </div>

                    {/* BUTTON */}
                    <Link
                        href="/tickets"
                        className="mt-6 block w-full rounded-xl bg-teal-500 py-3 text-center text-sm font-semibold text-white transition hover:bg-teal-600"
                    >
                        ← Kembali ke Tiket
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
}
