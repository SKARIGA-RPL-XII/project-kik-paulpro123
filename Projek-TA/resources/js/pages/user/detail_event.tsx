import { Head, Link, usePage, router } from '@inertiajs/react';
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
    const [qty, setQty] = useState<Record<number, number>>({});

    const images =
        event.images?.length > 0
            ? event.images.map((img) => `/storage/${img.image}`)
            : ['https://via.placeholder.com/800x800?text=No+Image'];

    // LOGIKA CAROUSEL
    const nextSlide = () => setCurrent((prev) => (prev + 1) % images.length);
    const prevSlide = () =>
        setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));

    const updateQty = (id: number, val: number, max: number) => {
        setQty((prev) => {
            const currentVal = prev[id] ?? 0;
            const next = currentVal + val;
            if (next < 0) return { ...prev, [id]: 0 };
            if (next > max) return prev;
            return { ...prev, [id]: next };
        });
    };

    const total = event.tickets.reduce(
        (sum, t) => sum + (qty[t.id] ?? 0) * Number(t.price),
        0,
    );

    return (
        <AppLayout>
            <Head title={event.title} />

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
                * { font-family: 'Plus Jakarta Sans', sans-serif; }
                .card-shadow { box-shadow: 0 10px 30px -10px rgba(0,0,0,0.06); }
                .ribbon-sale {
                    position: absolute; top: 8px; right: -32px;
                    background: #f43f5e; color: white;
                    padding: 2px 35px; transform: rotate(45deg);
                    font-size: 9px; font-weight: 800;
                }
            `}</style>

            <div className="min-h-screen bg-linear-to-br from-slate-50 via-gray-100 to-indigo-50 pb-20">
                <div className="mx-auto max-w-6xl px-4 py-6">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
                        {/* LEFT COLUMN */}
                        <div className="flex-1 space-y-6">
                            {/* Header Logo */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-[10px] font-bold tracking-tighter text-white">
                                        BOZZ
                                    </div>
                                    <span className="font-bold text-black">
                                        Bozz Event
                                    </span>
                                </div>
                                <span className="rounded-md bg-orange-50 px-2.5 py-1 text-[11px] font-bold tracking-wider text-orange-500 uppercase">
                                    Music - Festival
                                </span>
                            </div>

                            <div className="group relative aspect-21/10 overflow-hidden rounded-2xl bg-neutral-200 shadow-sm">
                                <img
                                    src={images[current]}
                                    alt={event.title}
                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />

                                {images.length > 1 && (
                                    <>
                                        <button
                                            onClick={prevSlide}
                                            className="absolute top-1/2 left-4 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white opacity-0 backdrop-blur-sm transition-all group-hover:opacity-100 hover:bg-black/60"
                                            aria-label="Previous slide"
                                        >
                                            <svg
                                                className="h-6 w-6"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={3}
                                                    d="M15 19l-7-7 7-7"
                                                />
                                            </svg>
                                        </button>

                                        {/* Tombol Kanan - Z-index ditambah dan warna dipertegas */}
                                        <button
                                            onClick={nextSlide}
                                            className="absolute top-1/2 right-4 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white opacity-0 backdrop-blur-sm transition-all group-hover:opacity-100 hover:bg-black/60"
                                            aria-label="Next slide"
                                        >
                                            <svg
                                                className="h-6 w-6"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={3}
                                                    d="M9 5l7 7-7 7"
                                                />
                                            </svg>
                                        </button>

                                        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
                                            {images.map((_, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() =>
                                                        setCurrent(i)
                                                    }
                                                    className={`h-1.5 rounded-full transition-all ${
                                                        current === i
                                                            ? 'w-6 bg-white shadow-md'
                                                            : 'w-2 bg-white/50'
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Informasi Event & Deskripsi */}
                            <div className="card-shadow rounded-2xl border border-neutral-100 bg-white p-6">
                                <h1 className="mb-4 text-2xl font-extrabold text-neutral-900">
                                    {event.title}
                                </h1>

                                <div className="mb-8 space-y-3">
                                    <div className="flex items-center gap-3 text-neutral-500">
                                        <svg
                                            className="h-4 w-4 text-neutral-400"
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
                                        </svg>
                                        <span className="text-sm font-medium">
                                            {event.location}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3 text-neutral-500">
                                        <svg
                                            className="h-4 w-4 text-neutral-400"
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
                                </div>

                                <div className="border-t border-neutral-100 pt-6">
                                    <h3 className="mb-3 text-sm font-bold tracking-tight text-neutral-900 uppercase">
                                        Deskripsi Event
                                    </h3>
                                    <p className="text-[14px] leading-relaxed whitespace-pre-line text-neutral-600">
                                        {event.description}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN - SIDEBAR TIKET */}
                        <div className="w-full lg:w-85">
                            <div className="card-shadow sticky top-6 rounded-2xl border border-neutral-100 bg-white p-5">
                                <div className="mb-5 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-bold text-neutral-800">
                                            Beli Tiket
                                        </span>
                                        <span className="text-sm">🎫</span>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    {event.tickets.map((ticket) => {
                                        const currentQty = qty[ticket.id] ?? 0;
                                        const isSale =
                                            ticket.name
                                                .toLowerCase()
                                                .includes('berdua') ||
                                            ticket.name
                                                .toLowerCase()
                                                .includes('berempat');

                                        return (
                                            <div
                                                key={ticket.id}
                                                className="relative overflow-hidden rounded-xl border border-neutral-100 bg-white p-4 transition-colors hover:border-teal-200"
                                            >
                                                {isSale && (
                                                    <div className="ribbon-sale text-center">
                                                        SALE
                                                    </div>
                                                )}

                                                <div className="flex items-center justify-between">
                                                    <div className="pr-4">
                                                        <h4 className="mb-1 text-[12px] leading-tight font-bold text-neutral-800">
                                                            {ticket.name}
                                                        </h4>
                                                        <p className="mb-1 text-[10px] text-neutral-400">
                                                            Max capacity per
                                                            ticket applies
                                                        </p>
                                                        <p className="text-sm font-bold text-neutral-800">
                                                            Rp{' '}
                                                            {Number(
                                                                ticket.price,
                                                            ).toLocaleString(
                                                                'id-ID',
                                                            )}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-2.5 rounded-lg bg-neutral-100 p-1.5">
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                updateQty(
                                                                    ticket.id,
                                                                    -1,
                                                                    ticket.kuota -
                                                                        ticket.sold,
                                                                )
                                                            }
                                                            className="flex h-7 w-7 items-center justify-center rounded-md bg-teal-500 text-white shadow-sm transition-all hover:bg-teal-600 active:scale-90"
                                                        >
                                                            <span className="text-lg leading-none font-bold">
                                                                −
                                                            </span>
                                                        </button>
                                                        <span className="w-6 text-center text-sm font-extrabold text-neutral-900">
                                                            {currentQty}
                                                        </span>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                updateQty(
                                                                    ticket.id,
                                                                    1,
                                                                    ticket.kuota -
                                                                        ticket.sold,
                                                                )
                                                            }
                                                            className="flex h-7 w-7 items-center justify-center rounded-md bg-teal-500 text-white shadow-sm transition-all hover:bg-teal-600 active:scale-90"
                                                        >
                                                            <span className="text-lg leading-none font-bold">
                                                                +
                                                            </span>
                                                        </button>
                                                    </div>{' '}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="mt-5 flex items-center justify-between border-t border-dashed pt-4">
                                    <span className="text-xs font-bold text-teal-600 uppercase">
                                        Total :
                                    </span>
                                    <span className="text-xl font-black tracking-tight text-neutral-900">
                                        Rp {total.toLocaleString('id-ID')}
                                    </span>
                                </div>

                                <button
                                    type="button"
                                    disabled={total === 0}
                                    onClick={() => {
                                        const selectedTickets = event.tickets
                                            .filter((t) => (qty[t.id] ?? 0) > 0)
                                            .map((t) => ({
                                                id: t.id,
                                                name: t.name,
                                                price: t.price,
                                                qty: qty[t.id],
                                            }));

                                        if (selectedTickets.length > 0) {
                                            router.post('/checkout', {
                                                tickets: selectedTickets,
                                            });
                                        }
                                    }}
                                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#2db3a6] py-3.5 text-xs font-bold text-white transition-all hover:bg-[#259e92] disabled:cursor-not-allowed disabled:bg-neutral-200"
                                >
                                    Lanjutkan
                                </button>
                            </div>

                            <Link
                                href="/dashboard"
                                className="mt-4 block text-center text-[11px] font-bold tracking-widest text-neutral-400 uppercase hover:text-neutral-600"
                            >
                                ← Kembali ke dashboard
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
