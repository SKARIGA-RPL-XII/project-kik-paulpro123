import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { useState } from 'react';

interface Ticket {
    id: number;
    name: string;
    price: number;
    quantity: number;
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
        setCurrent((prev) =>
            prev === 0 ? images.length - 1 : prev - 1,
        );
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
                <div className="max-w-6xl mx-auto px-6 py-12">
                    
                    <div className="flex flex-col lg:flex-row gap-12">
                        
                        {/* LEFT SIDE - CONTENT */}
                        <div className="flex-1">
                            
                            {/* Carousel - Compact & Clean */}
                            <div className="relative w-full max-w-xl aspect-[3/2] bg-neutral-100 rounded-lg overflow-hidden mb-8 minimal-shadow-lg group">
                                <img
                                    src={images[current]}
                                    alt="Event"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                                />

                                {/* Navigation - Minimal */}
                                {images.length > 1 && (
                                    <>
                                        <button
                                            onClick={prevSlide}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/95 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity minimal-shadow"
                                        >
                                            <svg className="w-5 h-5 text-neutral-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={nextSlide}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/95 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity minimal-shadow"
                                        >
                                            <svg className="w-5 h-5 text-neutral-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </>
                                )}

                                {/* Minimal Dots */}
                                {images.length > 1 && (
                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                                        {images.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setCurrent(index)}
                                                className={`h-1 rounded-full transition-all ${
                                                    current === index
                                                        ? 'bg-neutral-800 w-6'
                                                        : 'bg-neutral-400 w-1 hover:bg-neutral-600'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Title - Clean Typography */}
                            <div className="mb-10">
                                <h1 className="text-4xl font-bold text-neutral-900 mb-6 tracking-tight leading-tight">
                                    {event.title}
                                </h1>

                                {/* Meta Info - Minimal */}
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-neutral-600">
                                        <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <span className="text-sm font-medium">
                                            {new Date(event.start_date).toLocaleDateString('id-ID', {
                                                weekday: 'long',
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric',
                                            })} • {new Date(event.start_date).toLocaleTimeString('id-ID', {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })} WIB
                                        </span>
                                    </div>
                                    
                                    <div className="flex items-center gap-3 text-neutral-600">
                                        <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <span className="text-sm font-medium">{event.location}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Description - Clean */}
                            <div className="mb-10">
                                <h2 className="text-xl font-semibold mb-4 text-neutral-900">
                                    Tentang Event
                                </h2>
                                <p className="text-neutral-600 leading-relaxed text-[15px] whitespace-pre-line">
                                    {event.description}
                                </p>
                            </div>

                            {/* Back Link */}
                            <div className="pt-8 border-t border-neutral-200">
                                <Link
                                    href="/dashboard"
                                    className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    Kembali ke Dashboard
                                </Link>
                            </div>
                        </div>

                        {/* RIGHT SIDE - TICKET SECTION */}
                        <div className="w-full lg:w-[380px]">
                            <div className="sticky top-6">
                                <div className="bg-neutral-50 rounded-xl p-6 border border-neutral-200">
                                    
                                    {/* Header - Simple */}
                                    <div className="mb-6">
                                        <h2 className="text-lg font-semibold text-neutral-900">
                                            Tiket Tersedia
                                        </h2>
                                    </div>

                                    {/* Ticket List */}
                                    {event.tickets.length === 0 ? (
                                        <div className="text-center py-10">
                                            <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-neutral-200 flex items-center justify-center">
                                                <svg className="w-7 h-7 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                                                </svg>
                                            </div>
                                            <p className="text-sm text-neutral-500">
                                                Tiket belum tersedia
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="space-y-3">
                                            {event.tickets.map((ticket) => (
                                                <div
                                                    key={ticket.id}
                                                    className="bg-white border border-neutral-200 rounded-lg p-5 hover:border-neutral-300 transition-all"
                                                >
                                                    <div className="flex justify-between items-start mb-4">
                                                        <div>
                                                            <h3 className="font-semibold text-neutral-900 mb-1">
                                                                {ticket.name}
                                                            </h3>
                                                            <p className="text-xs text-neutral-500">
                                                                {ticket.quantity > 0 ? `${ticket.quantity} tiket tersisa` : 'Sold out'}
                                                            </p>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-xl font-bold text-neutral-900">
                                                                Rp {ticket.price.toLocaleString('id-ID')}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <Link
                                                        href={`/ticket/buy/${ticket.id}`}
                                                        method="post"
                                                        as="button"
                                                        disabled={ticket.quantity <= 0}
                                                        className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-all ${
                                                            ticket.quantity > 0
                                                                ? 'bg-neutral-900 text-white hover:bg-neutral-800'
                                                                : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                                                        }`}
                                                    >
                                                        {ticket.quantity > 0 ? 'Beli Tiket' : 'Sold Out'}
                                                    </Link>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Footer Note */}
                                    <div className="mt-6 pt-6 border-t border-neutral-200">
                                        <div className="flex items-center gap-2 text-xs text-neutral-500">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            <span>Transaksi aman & terpercaya</span>
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