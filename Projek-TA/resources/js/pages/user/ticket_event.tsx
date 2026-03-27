import { Head, usePage, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

export default function TicketPage() {
    const { orders } = usePage().props as any;

    return (
        <AppLayout>
            {' '}
            <Head title="My Tickets" />
            <div className="min-h-screen bg-white">
                <div className="mx-auto max-w-5xl space-y-6 p-4 pb-20">
                    <h1 className="text-2xl font-semibold">My Tickets</h1>

                    <div className="grid gap-4 sm:grid-cols-2">
                        {orders.map((order: any) =>
                            order.order_items.map((item: any) => (
                                <div
                                    key={item.id}
                                    className="rounded-xl border bg-white p-4 shadow-sm"
                                >
                                    {/* EVENT NAME */}
                                    <h2 className="text-lg font-semibold text-neutral-900">
                                        {order.event?.title}
                                    </h2>

                                    {/* TICKET NAME */}
                                    <p className="mt-1 text-sm font-medium text-teal-600">
                                        🎟 {item.ticket?.name}
                                    </p>

                                    {/* EVENT INFO */}
                                    <div className="mt-2 text-sm text-neutral-600">
                                        <p>📅 {order.event?.date}</p>
                                        <p>📍 {order.event?.location}</p>
                                    </div>

                                    {/* STATUS + ACTION */}
                                    <div className="mt-4 flex items-center justify-between">
                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-medium ${
                                                order.status === 'paid'
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-yellow-100 text-yellow-700'
                                            }`}
                                        >
                                            {order.status}
                                        </span>

                                        <Link
                                            href={`/tickets/${item.id}`}
                                            className="text-sm font-semibold text-neutral-800 hover:text-black hover:underline"
                                        >
                                            View Detail
                                        </Link>
                                    </div>
                                </div>
                            )),
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
