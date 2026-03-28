import { Head, router, usePage } from '@inertiajs/react';
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

type Tab = 'draft' | 'published' | 'rejected';

export default function EventApproval() {
    const { events: initialEvents = [] } = usePage<{ events?: Event[] }>().props;
    const [events, setEvents] = useState<Event[]>(initialEvents);
    const [loadingId, setLoadingId] = useState<number | null>(null);
    const [activeTab, setActiveTab] = useState<Tab>('draft');

    // Selalu sinkronkan data saat ada perubahan dari server (misal: setelah tombol publish diklik)
    useEffect(() => {
        setEvents(initialEvents);
    }, [initialEvents]);

    const publishEvent = (id: number) => {
        if (!confirm('Publish event ini?')) return;

        setLoadingId(id);
        router.patch(
            `/admin/events/${id}/publish`,
            {},
            {
                preserveScroll: true,
                preserveState: true,
                // Kita tidak perlu update state manual di onSuccess karena useEffect di atas
                // akan otomatis menangkap data terbaru yang dikirim balik oleh Inertia
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
                onFinish: () => setLoadingId(null),
            },
        );
    };

    // Filter data berdasarkan tab yang sedang aktif
    const filteredEvents = events.filter((event) => event.status === activeTab);

    return (
        <AdminLayout title="Verifkasi Event">
            <Head title="Verifikasi Event" />

            <div className="px-8 py-6">
                <h1 className="mb-6 text-2xl font-bold text-slate-800">
                    Moderasi Event
                </h1>

                {/* TAB NAVIGATION */}
                <div className="mb-6 flex gap-2 border-b border-slate-200 pb-4">
                    {(['draft', 'published', 'rejected'] as Tab[]).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                                activeTab === tab
                                    ? tab === 'published' ? 'bg-emerald-600 text-white' 
                                    : tab === 'rejected' ? 'bg-red-600 text-white' 
                                    : 'bg-slate-900 text-white'
                                : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                            }`}
                        >
                            {tab.toUpperCase()}
                            <span className="ml-2 rounded-full bg-white/20 px-2 py-0.5 text-xs">
                                {events.filter(e => e.status === tab).length}
                            </span>
                        </button>
                    ))}
                </div>

                {filteredEvents.length === 0 ? (
                    <div className="rounded-xl border border-slate-200 bg-white p-16 text-center">
                        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                            <Calendar className="h-7 w-7 text-slate-400" />
                        </div>
                        <p className="font-medium text-slate-600">
                            Tidak ada event dengan status {activeTab}
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredEvents.map((event) => (
                            <div
                                key={event.id}
                                className="flex justify-between rounded-xl border border-slate-200 bg-white p-5 transition hover:shadow-md"
                            >
                                <div className="flex flex-1 flex-col gap-1">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-lg font-bold text-slate-900">
                                            {event.title}
                                        </h2>
                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-bold ${
                                                event.status === 'published'
                                                    ? 'bg-emerald-100 text-emerald-700'
                                                    : event.status === 'rejected'
                                                    ? 'bg-red-100 text-red-700'
                                                    : 'bg-amber-100 text-amber-700'
                                            }`}
                                        >
                                            {event.status.toUpperCase()}
                                        </span>
                                    </div>
                                    
                                    <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-slate-500">
                                        <div className="flex items-center gap-1.5">
                                            <MapPin className="h-4 w-4" />
                                            <span>{event.location}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Calendar className="h-4 w-4" />
                                            <span>
                                                {new Date(event.start_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric'})}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Clock className="h-4 w-4" />
                                            <span>
                                                {new Date(event.start_date).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <p className="mt-3 line-clamp-2 text-sm text-slate-600">
                                        {event.description || 'Tidak ada deskripsi'}
                                    </p>
                                    
                                    <div className="mt-4 inline-block rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-500 border border-slate-100">
                                        <span className="font-semibold text-slate-700">Penyelenggara:</span> {event.eo.name} ({event.eo.email})
                                    </div>
                                </div>

                                {/* Tombol Aksi HANYA muncul jika status masih DRAFT */}
                                {event.status === 'draft' && (
                                    <div className="ml-6 flex flex-col gap-2 border-l border-slate-100 pl-6 justify-center">
                                        <button
                                            disabled={loadingId === event.id}
                                            onClick={() => publishEvent(event.id)}
                                            className="w-32 rounded-lg bg-emerald-600 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-500 disabled:opacity-50"
                                        >
                                            {loadingId === event.id ? 'Loading...' : 'Setujui (Publish)'}
                                        </button>

                                        <button
                                            disabled={loadingId === event.id}
                                            onClick={() => rejectEvent(event.id)}
                                            className="w-32 rounded-lg bg-red-50 py-2.5 text-sm font-bold text-red-600 transition hover:bg-red-100 disabled:opacity-50"
                                        >
                                            {loadingId === event.id ? 'Loading...' : 'Tolak Event'}
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}