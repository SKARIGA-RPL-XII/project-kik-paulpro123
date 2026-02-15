import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { useState } from 'react';

interface Ticket {
    id: number;
    name: string;
    price: number;
    kuota: number;
    sold: number;
}

interface EventImage {
    id: number;
    image: string;
}

interface Event {
    id: number;
    title: string;
    description: string;
    location: string;
    start_date: string;
    images: EventImage[];
    tickets: Ticket[];
}

export default function EventDetail() {
    const { event } = usePage<{ event: Event }>().props;
    const [current, setCurrent] = useState(0);

    const images =
        event.images?.length > 0
            ? event.images.map((img) => `/storage/${img.image}`)
            : ['https://via.placeholder.com/800x800?text=No+Image'];

    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    return (
        <AppLayout>
            <Head title={event.title} />

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
                
                * {
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
                }
                
                .minimal-shadow {
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04);
                }
                
                .minimal-shadow-lg {
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04);
                }
            `}</style>

            <div className="min-h-screen bg-white">
                <div className="mx-auto max-w-6xl px-6 py-12">
                    <div className="flex flex-col gap-12 lg:flex-row">
                        {/* LEFT SIDE - CONTENT */}
                        <div className="flex-1">
                            {/* Carousel - Compact & Clean */}
                            <div className="minimal-shadow-lg group relative mb-8 aspect-[3/2] w-full max-w-xl overflow-hidden rounded-lg bg-neutral-100">
                                <img
                                    src={images[current]}
                                    alt="Event"
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                                />

                                {/* Navigation - Minimal */}
                                {images.length > 1 && (
                                    <>
                                        <button
                                            onClick={prevSlide}
                                            className="minimal-shadow absolute top-1/2 left-3 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 opacity-0 transition-opacity group-hover:opacity-100"
                                        >
                                            <svg
                                                className="h-5 w-5 text-neutral-800"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M15 19l-7-7 7-7"
                                                />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={nextSlide}
                                            className="minimal-shadow absolute top-1/2 right-3 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 opacity-0 transition-opacity group-hover:opacity-100"
                                        >
                                            <svg
                                                className="h-5 w-5 text-neutral-800"
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
                                    </>
                                )}

                                {/* Minimal Dots */}
                                {images.length > 1 && (
                                    <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
                                        {images.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() =>
                                                    setCurrent(index)
                                                }
                                                className={`h-1 rounded-full transition-all ${
                                                    current === index
                                                        ? 'w-6 bg-neutral-800'
                                                        : 'w-1 bg-neutral-400 hover:bg-neutral-600'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Title - Clean Typography */}
                            <div className="mb-10">
                                <h1 className="mb-6 text-4xl leading-tight font-bold tracking-tight text-neutral-900">
                                    {event.title}
                                </h1>

                                {/* Meta Info - Minimal */}
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-neutral-600">
                                        <svg
                                            className="h-5 w-5 text-neutral-400"
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
                                        <span className="text-sm font-medium">
                                            {new Date(
                                                event.start_date,
                                            ).toLocaleDateString('id-ID', {
                                                weekday: 'long',
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric',
                                            })}{' '}
                                            •{' '}
                                            {new Date(
                                                event.start_date,
                                            ).toLocaleTimeString('id-ID', {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}{' '}
                                            WIB
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-3 text-neutral-600">
                                        <svg
                                            className="h-5 w-5 text-neutral-400"
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
                                        <span className="text-sm font-medium">
                                            {event.location}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Description - Clean */}
                            <div className="mb-10">
                                <h2 className="mb-4 text-xl font-semibold text-neutral-900">
                                    Tentang Event
                                </h2>
                                <p className="text-[15px] leading-relaxed whitespace-pre-line text-neutral-600">
                                    {event.description}
                                </p>
                            </div>

                            {/* Back Link */}
                            <div className="border-t border-neutral-200 pt-8">
                                <Link
                                    href="/dashboard"
                                    className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900"
                                >
                                    <svg
                                        className="h-4 w-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                        />
                                    </svg>
                                    Kembali ke Dashboard
                                </Link>
                            </div>
                        </div>

                        {/* RIGHT SIDE - TICKET SECTION */}
                        <div className="w-full lg:w-[380px]">
                            <div className="sticky top-6">
                                <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-6">
                                    {/* Header - Simple */}
                                    <div className="mb-6">
                                        <h2 className="text-lg font-semibold text-neutral-900">
                                            Tiket Tersedia
                                        </h2>
                                    </div>

                                    {/* Ticket List */}
                                    {event.tickets.length === 0 ? (
                                        <div className="py-10 text-center">
                                            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-neutral-200">
                                                <svg
                                                    className="h-7 w-7 text-neutral-400"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                                                    />
                                                </svg>
                                            </div>
                                            <p className="text-sm text-neutral-500">
                                                Tiket belum tersedia
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="space-y-3">
                                            {event.tickets.map((ticket) => {
                                                const kuota = ticket.kuota ?? 0;
                                                const sold = ticket.sold ?? 0;
                                                const sisa = kuota - sold;

                                                return (
                                                    <div
                                                        key={ticket.id}
                                                        className="rounded-lg border border-neutral-200 bg-white p-5 transition-all hover:border-neutral-300"
                                                    >
                                                        <div className="mb-4 flex items-start justify-between">
                                                            <div>
                                                                <h3 className="mb-1 font-semibold text-neutral-900">
                                                                    {
                                                                        ticket.name
                                                                    }
                                                                </h3>
                                                                <p className="text-xs text-neutral-500">
                                                                    {sisa > 0
                                                                        ? `${sisa} tiket tersisa`
                                                                        : 'Sold out'}
                                                                </p>
                                                            </div>
                                                            <div className="text-right">
                                                                <p className="text-xl font-bold text-neutral-900">
                                                                    Rp{' '}
                                                                    {ticket.price.toLocaleString(
                                                                        'id-ID',
                                                                    )}
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <Link
                                                            href={`/ticket/buy/${ticket.id}`}
                                                            method="post"
                                                            as="button"
                                                            disabled={sisa <= 0}
                                                            className={`w-full rounded-lg py-2.5 text-sm font-semibold transition-all ${
                                                                sisa > 0
                                                                    ? 'bg-neutral-900 text-white hover:bg-neutral-800'
                                                                    : 'cursor-not-allowed bg-neutral-200 text-neutral-400'
                                                            }`}
                                                        >
                                                            {sisa > 0
                                                                ? 'Beli Tiket'
                                                                : 'Sold Out'}
                                                        </Link>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}

                                    {/* Footer Note */}
                                    <div className="mt-6 border-t border-neutral-200 pt-6">
                                        <div className="flex items-center gap-2 text-xs text-neutral-500">
                                            <svg
                                                className="h-4 w-4"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            <span>
                                                Transaksi aman & terpercaya
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
