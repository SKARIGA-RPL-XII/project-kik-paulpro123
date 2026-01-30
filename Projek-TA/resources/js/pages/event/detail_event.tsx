import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

const event = {
    id: 1,
    title: 'ORKESTRA vol.8',
    date: '13 Desember 2025 • 00:00',
    location: 'Parking Area Kyai Langgeng Ecopark, Magelang',
    price: 'Rp 40.000',
    image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1200',
    description: `
ORKESTRA vol.8 adalah konser musik tahunan yang menampilkan
perpaduan musik orkestra modern dan tradisional.

Nikmati pengalaman musik megah dengan tata cahaya spektakuler
dan penampilan musisi terbaik Indonesia.
    `,
};

export default function EventDetail() {
    return (
        <AppLayout>
            <Head title={event.title} />

            <div className="min-h-screen bg-white">
                <div className="relative h-[380px] w-full">
                    <img
                        src={event.image}
                        alt={event.title}
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                </div>

                {/* CONTENT */}
                <div className="mx-auto max-w-5xl px-6 py-8">
                    {/* Title */}
                    <h1 className="mb-2 text-3xl font-bold text-gray-900">
                        {event.title}
                    </h1>

                    {/* Meta */}
                    <div className="mb-6 space-y-2 text-gray-600">
                        <p>📅 {event.date}</p>
                        <p>📍 {event.location}</p>
                    </div>

                    {/* Price Box */}
                    <div className="mb-8 flex items-center justify-between rounded-xl border bg-gray-50 p-5">
                        <div>
                            <p className="text-sm text-gray-500">
                                Harga Tiket
                            </p>
                            <p className="text-2xl font-semibold text-gray-900">
                                {event.price}
                            </p>
                        </div>

                        <button className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700">
                            Beli Tiket
                        </button>
                    </div>

                    <div>
                        <h2 className="mb-3 text-xl font-semibold text-gray-900">
                            Deskripsi Event
                        </h2>
                        <p className="whitespace-pre-line leading-relaxed text-gray-700">
                            {event.description}
                        </p>
                    </div>

                    {/* Back */}
                    <div className="mt-10">
                        <Link
                            href="/"
                            className="text-sm font-medium text-blue-600 hover:underline"
                        >
                            ← Kembali ke Dashboard
                        </Link>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}