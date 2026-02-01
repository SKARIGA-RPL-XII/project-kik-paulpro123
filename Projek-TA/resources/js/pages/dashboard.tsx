import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
const events = [
    {
        id: 1,
        title: 'TECHNOFEST 7.0',
        date: '15 Nov 2025 • 02:00',
        location: 'Stadion Maguwoharjo • Sleman, DI Yogyakarta',
        price: 'Mulai Rp 57.000',
        image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800',
    },
    {
        id: 2,
        title: 'HIPHOP NIGHT Yogyakarta',
        date: '29 Nov 2025 • 21:00',
        location: 'JNM • Jogjakarta, DI Yogyakarta',
        price: 'Mulai Rp 15.000',
        image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
    },
    {
        id: 3,
        title: 'ORKESTRA vol.8',
        date: '13 Dec 2025 • 00:00',
        location: 'Parking area Kyai Langgeng Ecopark • Magelang',
        price: 'Mulai Rp 40.000',
        image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800',
    },
    {
        id: 4,
        title: 'JOGJABEACH ARENA',
        date: '19 Dec 2025 • 19:00',
        location: 'Parangtritis • Bantul, DI Yogyakarta',
        price: 'Mulai Rp 85.000',
        image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800',
    },
    {
        id: 5,
        title: 'Premium Concert',
        date: '30 Dec 2025 • 20:00',
        location: 'Jogja Expo Center, DI Yogyakarta',
        price: 'Mulai Rp 120.000',
        image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800',
    },
];

export default function Dashboard() {
    return (
        <AppLayout>
            <Head title="Dashboard" />

            <div className="min-h-screen w-full bg-white">
                <div className="mx-auto max-w-7xl px-6 py-8">
                    <div className="mb-10 flex justify-center">
                        <div className="relative w-full max-w-3xl">
                            <input
                                type="text"
                                placeholder="Cari event impianmu..."
                                className="w-full rounded-full bg-gray-100 px-6 py-4 pl-14 text-base text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                            <svg
                                className="absolute top-1/2 left-5 h-5 w-5 -translate-y-1/2 text-gray-400"
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
                        </div>
                    </div>

                    <div className="mb-5 flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900">
                                Official Event
                            </h2>
                            <p className="text-sm text-gray-500">
                                Event yang bisa beli tiket lewat Eventime
                            </p>
                        </div>

                        <button className="text-sm font-medium text-blue-600 hover:underline">
                            Lihat Semua →
                        </button>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {events.map((event) => (
                            <Link key={event.id} href={`/event/${event.id}`}>
                                <div className="overflow-hidden rounded-xl border bg-white transition hover:shadow-lg">
                                    <div className="relative h-44">
                                        <img
                                            src={event.image}
                                            alt={event.title}   
                                            className="h-full w-full object-cover"
                                        />

                                        <span className="absolute top-3 right-3 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                                            RESMI
                                        </span>

                                        <span className="absolute bottom-3 left-3 rounded-full bg-yellow-400 px-3 py-1 text-xs font-semibold text-gray-900">
                                            {event.price}
                                        </span>
                                    </div>

                                    <div className="space-y-2 p-4">
                                        <h3 className="line-clamp-2 font-semibold text-gray-900">
                                            {event.title}
                                        </h3>

                                        <p className="text-sm text-gray-500">
                                            📅 {event.date}
                                        </p>

                                        <p className="line-clamp-2 text-sm text-gray-500">
                                            📍 {event.location}
                                        </p>
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
