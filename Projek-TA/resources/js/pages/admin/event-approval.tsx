import { Head, router, usePage } from '@inertiajs/react';
import EOLayout from '@/layouts/admin-layout';
import { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';
import AdminLayout from '@/layouts/admin-layout';

interface Event {
    id: number;
    title: string;
    location: string;
    description: string | null;
    start_date: string;
    end_date: string;
    eo: {
        id: number;
        name: string;
        email: string;
    };
    status: 'draft' | 'published' | 'rejected';
}

export default function EventApproval() {
    const { events: initialEvents = [] } = usePage<{ events?: Event[] }>()
        .props;

    const [events, setEvents] = useState<Event[]>(initialEvents);

    useEffect(() => {
        setEvents(initialEvents);
    }, [initialEvents]);
    const [loadingId, setLoadingId] = useState<number | null>(null);

    const publishEvent = (id: number) => {
        if (!confirm('Publish event ini?')) return;

        setLoadingId(id);

        router.patch(
            `/admin/events/${id}/publish`,
            {},
            {
                preserveScroll: true,
                preserveState: true,
                replace: true,
                onSuccess: () => {
                    setEvents((prev) =>
                        prev.map((e) =>
                            e.id === id ? { ...e, status: 'published' } : e,
                        ),
                    );
                },
                onFinish: () => setLoadingId(null),
            },
        );
    };

    const rejectEvent = (id: number) => {
        if (!confirm('Tolak event ini?')) return;

        setLoadingId(id);

        router.patch(
            `/admin/events/${id}/reject`,
            {},
            {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => {
                    setEvents((prev) =>
                        prev.map((e) =>
                            e.id === id ? { ...e, status: 'draft' } : e,
                        ),
                    );
                },
                onFinish: () => setLoadingId(null),
            },
        );
    };
    type Tab = 'draft' | 'published' | 'rejected';

    const [activeTab, setActiveTab] = useState<Tab>('draft');
    const filteredEvents = events.filter((event) => event.status === activeTab);

    return (
        <AdminLayout title="Verifkasi Event">
            <Head title="Verifikasi Event" />

            <div className="px-8 py-6">
                <h1 className="mb-6 text-2xl font-bold text-slate-800">
                    Event Pending Approval
                </h1>

                <div className="mb-6 flex gap-2">
                    {(['draft', 'published', 'rejected'] as Tab[]).map(
                        (tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                                    activeTab === tab
                                        ? 'bg-slate-900 text-white'
                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                } `}
                            >
                                {tab.toUpperCase()}
                            </button>
                        ),
                    )}
                </div>

                {filteredEvents.length === 0 ? (
                    <div className="rounded-xl border border-slate-200 bg-white p-16 text-center">
                        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                            <Calendar className="h-7 w-7 text-slate-400" />
                        </div>
                        <p className="font-medium text-slate-600">
                            Tidak ada event yang menunggu verifikasi
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredEvents.filter(Boolean).map((event) => (
                            <div
                                key={event.id}
                                className="flex justify-between rounded-lg border border-slate-200 bg-white p-4 transition hover:shadow-md"
                            >
                                <div className="flex flex-1 flex-col gap-1">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-lg font-semibold text-slate-900">
                                            {event.title}
                                        </h2>
                                        <span
                                            className={`text-xs font-medium ${
                                                event.status === 'published'
                                                    ? 'text-emerald-700'
                                                    : 'text-amber-700'
                                            }`}
                                        >
                                            {event.status}
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                                        <div className="flex items-center gap-1.5">
                                            <MapPin className="h-4 w-4" />
                                            <span>{event.location}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Calendar className="h-4 w-4" />
                                            <span>
                                                {new Date(
                                                    event.start_date,
                                                ).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Clock className="h-4 w-4" />
                                            <span>
                                                {new Date(
                                                    event.start_date,
                                                ).toLocaleTimeString([], {
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })}
                                            </span>
                                        </div>
                                    </div>
                                    <p className="mt-2 line-clamp-2 text-sm text-slate-600">
                                        {event.description || '-'}
                                    </p>
                                    <p className="mt-1 text-xs text-slate-400">
                                        EO: {event.eo.name} ({event.eo.email})
                                    </p>
                                </div>

                                <div className="ml-4 flex flex-col gap-2">
                                    {event.status === 'draft' ? (
                                        <>
                                            <button
                                                disabled={
                                                    loadingId === event.id
                                                }
                                                onClick={() =>
                                                    publishEvent(event.id)
                                                }
                                                className="rounded bg-emerald-600 px-3 py-1 text-white transition hover:bg-emerald-500 disabled:opacity-50"
                                            >
                                                {loadingId === event.id
                                                    ? 'Loading...'
                                                    : 'Publish'}
                                            </button>

                                            <button
                                                disabled={
                                                    loadingId === event.id
                                                }
                                                onClick={() =>
                                                    rejectEvent(event.id)
                                                }
                                                className="rounded bg-red-600 px-3 py-1 text-white transition hover:bg-red-500 disabled:opacity-50"
                                            >
                                                {loadingId === event.id
                                                    ? 'Loading...'
                                                    : 'Reject'}
                                            </button>
                                        </>
                                    ) : (
                                        <span className="text-xs text-slate-400 italic">
                                            Event sudah diproses
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
