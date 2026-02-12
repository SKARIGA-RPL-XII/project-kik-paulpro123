import { Head, router, usePage } from '@inertiajs/react';
import EOLayout from '@/layouts/eo-layout';
import {
    Calendar,
    MapPin,
    Clock,
    Edit3,
    Plus,
    Ticket,
    Trash2,
} from 'lucide-react';

interface EventImage {
    id: number;
    image: string;
}

interface Event {
    id: number;
    title: string;
    location: string;
    start_date: string;
    end_date: string;
    status: 'draft' | 'published' | 'rejected';
    images: EventImage[];
}

export default function ManageEvent() {
    const { events = [] } = usePage<{ events: Event[] }>().props;
    const formatDateTime = (dateString: string) => {
        const date = new Date(dateString);

        return new Intl.DateTimeFormat('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        }).format(date);
    };

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);

        return new Intl.DateTimeFormat('id-ID', {
            timeZone: 'Asia/Jakarta',
            hour: '2-digit',
            minute: '2-digit',
        }).format(date);
    };

    return (
        <EOLayout>
            <Head title="Kelola Event" />

            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50/50 p-6 md:p-10">
                {/* HEADER */}
                <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1.5">
                        <h1 className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
                            Event Management
                        </h1>
                        <p className="text-sm font-medium text-slate-500">
                            Kelola dan pantau semua event kamu dengan mudah
                        </p>
                    </div>

                    <button
                        onClick={() => router.get('/eo/manage-event/create')}
                        className="group inline-flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-slate-900/30 active:scale-[0.98]"
                    >
                        <Plus className="h-4.5 w-4.5 transition-transform group-hover:rotate-90" />
                        Create New Event
                    </button>
                </div>

                {/* EMPTY STATE */}
                {events.length === 0 ? (
                    <div className="rounded-3xl border border-slate-200/60 bg-white/80 p-20 text-center shadow-sm backdrop-blur-sm">
                        <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-100 to-slate-50">
                            <Calendar className="h-10 w-10 text-slate-400" />
                        </div>
                        <h3 className="mb-2 text-xl font-semibold text-slate-800">
                            Belum ada event
                        </h3>
                        <p className="text-sm text-slate-500">
                            Buat event pertama kamu dan mulai kelola dengan
                            mudah
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {events.map((event) => (
                            <div
                                key={event.id}
                                className="group relative overflow-hidden rounded-3xl border border-slate-200/60 bg-white/80 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-slate-300/80 hover:shadow-xl hover:shadow-slate-200/50"
                            >
                                <div className="flex items-center justify-between gap-6 p-6">
                                    {/* LEFT SECTION */}
                                    <div className="flex flex-1 gap-6">
                                        {/* IMAGE SLIDER */}
                                        <div className="relative w-28 shrink-0">
                                            {event.images?.length > 0 ? (
                                                <div className="scrollbar-hide flex snap-x snap-mandatory overflow-x-auto">
                                                    {event.images.map((img) => (
                                                        <div
                                                            key={img.id}
                                                            className="relative shrink-0 snap-center"
                                                        >
                                                            <img
                                                                src={`/storage/${img.image}`}
                                                                className="h-24 w-24 rounded-2xl border-2 border-slate-100 object-cover shadow-md transition-transform duration-300 group-hover:border-slate-200 group-hover:shadow-lg"
                                                                alt="Event"
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50">
                                                    <span className="text-xs font-medium text-slate-400">
                                                        No Image
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* INFO */}
                                        <div className="min-w-0 flex-1 space-y-3">
                                            {/* Title + Status */}
                                            <div className="flex items-start gap-3">
                                                <h3 className="flex-1 truncate text-lg leading-tight font-bold text-slate-900 transition-colors group-hover:text-blue-600">
                                                    {event.title}
                                                </h3>

                                                <span
                                                    className={`inline-flex shrink-0 items-center rounded-full px-3.5 py-1.5 text-xs font-bold tracking-wide uppercase shadow-sm ${
                                                        event.status ===
                                                        'published'
                                                            ? 'bg-gradient-to-r from-emerald-50 to-emerald-100/80 text-emerald-700 ring-1 ring-emerald-200/50'
                                                            : event.status ===
                                                                'rejected'
                                                              ? 'bg-gradient-to-r from-red-50 to-red-100/80 text-red-700 ring-1 ring-red-200/50'
                                                              : 'bg-gradient-to-r from-amber-50 to-amber-100/80 text-amber-700 ring-1 ring-amber-200/50'
                                                    }`}
                                                >
                                                    {event.status}
                                                </span>
                                            </div>

                                            {/* Meta Info */}
                                            <div className="flex flex-wrap items-center gap-6 text-sm">
                                                <div className="flex items-center gap-2.5 font-medium text-slate-600">
                                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100">
                                                        <MapPin className="h-4 w-4 text-slate-600" />
                                                    </div>
                                                    <span className="truncate">
                                                        {event.location}
                                                    </span>
                                                </div>

                                                <div className="flex items-center gap-2.5 font-medium text-slate-600">
                                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100">
                                                        <Calendar className="h-4 w-4 text-slate-600" />
                                                    </div>
                                                    {formatDateTime(
                                                        event.start_date,
                                                    )}
                                                </div>

                                                <div className="flex items-center gap-2.5 font-medium text-slate-600">
                                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100">
                                                        <Clock className="h-4 w-4 text-slate-600" />
                                                    </div>
                                                    {formatTime(
                                                        event.start_date,
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* RIGHT ACTION */}
                                    <div className="flex shrink-0 items-center gap-2.5">
                                        <button
                                            onClick={() =>
                                                router.get(
                                                    `/eo/events/${event.id}/tickets`,
                                                )
                                            }
                                            className="group/btn inline-flex items-center gap-2 rounded-xl bg-blue-50 px-4 py-2.5 text-xs font-bold text-blue-700 transition-all duration-200 hover:bg-blue-100 hover:shadow-md active:scale-95"
                                        >
                                            <Ticket className="h-4 w-4 transition-transform group-hover/btn:rotate-12" />
                                            Ticket
                                        </button>

                                        <button
                                            onClick={() =>
                                                router.get(
                                                    `/eo/manage-event/${event.id}/edit`,
                                                )
                                            }
                                            className="group/btn inline-flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2.5 text-xs font-bold text-slate-700 transition-all duration-200 hover:bg-slate-200 hover:shadow-md active:scale-95"
                                        >
                                            <Edit3 className="h-4 w-4 transition-transform group-hover/btn:rotate-12" />
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => {
                                                if (
                                                    confirm(
                                                        'Yakin ingin menghapus event ini?',
                                                    )
                                                ) {
                                                    router.delete(
                                                        `/eo/manage-event/${event.id}`,
                                                    );
                                                }
                                            }}
                                            className="group/btn inline-flex items-center gap-2 rounded-xl bg-red-50 px-4 py-2.5 text-xs font-bold text-red-600 transition-all duration-200 hover:bg-red-100 hover:shadow-md active:scale-95"
                                        >
                                            <Trash2 className="h-4 w-4 transition-transform group-hover/btn:scale-110" />
                                            Hapus
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </EOLayout>
    );
}
