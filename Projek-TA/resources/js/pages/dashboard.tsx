import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { usePage } from '@inertiajs/react';

interface EventImage {
    id: number;
    image: string;
}

interface Event {
    id: number;
    title: string;
    location: string;
    start_date: string;
    images: EventImage[];
    tickets_min_price: number | null;
}

export default function Dashboard() {
    const { events = [] } = usePage<{ events: Event[] }>().props;
    return (
        <AppLayout>
            <Head title="Dashboard" />

            <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
                <div className="mx-auto max-w-7xl px-6 py-12">
                    {/* Hero Section with Search */}
                    <div className="mb-12 text-center">
                        <h1 className="mb-3 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-4xl font-bold text-transparent">
                            Temukan Event Terbaik
                        </h1>
                        <p className="mb-8 text-gray-600">
                            Jelajahi berbagai event menarik di sekitarmu
                        </p>

                        <div className="relative mx-auto w-full max-w-3xl">
                            <input
                                type="text"
                                placeholder="Cari event impianmu..."
                                className="w-full rounded-2xl border-2 border-gray-200 bg-white px-6 py-5 pl-14 text-base text-gray-900 shadow-lg transition-all duration-300 placeholder:text-gray-400 focus:border-blue-500 focus:shadow-xl focus:ring-4 focus:ring-blue-100 focus:outline-none"
                            />
                            <svg
                                className="absolute top-1/2 left-5 h-6 w-6 -translate-y-1/2 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-gray-900/5 ring-inset"></div>
                        </div>
                    </div>

                    {/* Section Header */}
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <h2 className="mb-1 text-2xl font-bold text-gray-900">
                                Official Event
                            </h2>
                            <p className="flex items-center gap-2 text-sm text-gray-600">
                                <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500"></span>
                                Event yang bisa beli tiket lewat Eventime
                            </p>
                        </div>

                        <button className="group flex items-center gap-2 rounded-full bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-blue-700 hover:shadow-lg">
                            Lihat Semua
                            <svg
                                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Event Cards Grid */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {events.map((event, index) => (
                            <Link
                                key={event.id}
                                href={`/events/${event.id}`}
                                className="group"
                                style={{
                                    animationDelay: `${index * 100}ms`,
                                }}
                            >
                                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                                    {/* Image Container */}
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={
                                                event.images?.length > 0
                                                    ? `/storage/${event.images[0].image}`
                                                    : 'https://via.placeholder.com/400x300?text=No+Image'
                                            }
                                            alt={event.title}
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />

                                        {/* Gradient Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

                                        {/* Official Badge */}
                                        <span className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-blue-600 px-3 py-1.5 text-xs font-bold text-white shadow-lg backdrop-blur-sm">
                                            <svg
                                                className="h-3 w-3"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            RESMI
                                        </span>

                                        {/* Price Badge */}
<span className="absolute bottom-3 left-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 px-4 py-1.5 text-xs font-bold text-gray-900 shadow-lg">
    {event.tickets_min_price
        ? `Mulai Rp ${Number(event.tickets_min_price).toLocaleString('id-ID')}`
        : 'Gratis'}
</span>
                                    </div>

                                    {/* Card Content */}
                                    <div className="space-y-3 p-5">
                                        <h3 className="line-clamp-2 text-lg font-bold text-gray-900 transition-colors duration-300 group-hover:text-blue-600">
                                            {event.title}
                                        </h3>

                                        <div className="space-y-2">
                                            <p className="flex items-start gap-2 text-sm text-gray-600">
                                                <svg
                                                    className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-500"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                    />
                                                </svg>
                                                <span>
                                                    {new Date(
                                                        event.start_date,
                                                    ).toLocaleDateString(
                                                        'id-ID',
                                                        {
                                                            day: 'numeric',
                                                            month: 'short',
                                                            year: 'numeric',
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                            timeZone:
                                                                'Asia/Jakarta',
                                                        },
                                                    )}
                                                </span>
                                            </p>

                                            <p className="flex items-start gap-2 text-sm text-gray-600">
                                                <svg
                                                    className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-500"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                    />
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                                    />
                                                </svg>
                                                <span className="line-clamp-2">
                                                    {event.location}
                                                </span>
                                            </p>
                                        </div>

                                        {/* CTA Button */}
                                        <button className="mt-4 w-full rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:shadow-lg">
                                            Lihat Detail
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
