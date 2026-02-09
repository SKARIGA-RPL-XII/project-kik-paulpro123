import { Head, router, usePage } from '@inertiajs/react';
import { Ticket } from 'lucide-react';
import { useState } from 'react';
import EOLayout from '@/layouts/eo-layout';
import { Calendar, MapPin, Plus, Clock, Edit3 } from 'lucide-react';

interface Event {
    id: number;
    title: string;
    location: string;
    description: string | null;
    start_date: string;
    end_date: string;
    status: 'draft' | 'published' | 'rejected';
    images: EventImage[];
}

interface EventImage {
    id: number;
    image: string;
}

export default function ManageEvent() {
    const { events = [] } = usePage<{ events?: Event[] }>().props;

    const [form, setForm] = useState({
        title: '',
        description: '',
        start_date: '',
        end_date: '',
        location: '',
        images: [] as File[],
    });
    const [editingId, setEditingId] = useState<number | null>(null);
    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        const data = new FormData();
        data.append('title', form.title);
        data.append('description', form.description);
        data.append('location', form.location);
        data.append('start_date', form.start_date);
        data.append('end_date', form.end_date);

        form.images.forEach((file, i) => {
            data.append(`images[${i}]`, file);
        });

        if (editingId) {
            data.append('_method', 'PUT');

            router.post(`/eo/manage-event/${editingId}`, data, {
                preserveScroll: true,
                forceFormData: true,
                onSuccess: resetForm,
            });
        } else {
            router.post('/eo/manage-event', data, {
                preserveScroll: true,
                forceFormData: true,
                onSuccess: resetForm,
            });
        }
    };

    const resetForm = () => {
        setEditingId(null);
        setForm({
            title: '',
            description: '',
            start_date: '',
            end_date: '',
            location: '',
            images: [],
        });
    };

    const [existingImages, setExistingImages] = useState<EventImage[]>([]);
    const deleteImage = (id: number) => {
        if (!confirm('Hapus gambar ini?')) return;

        router.delete(`/eo/event-image/${id}`, {
            preserveScroll: true,
            onSuccess: () => {
                setExistingImages((prev) =>
                    prev.filter((img) => img.id !== id),
                );
            },
        });
    };

    const toDatetimeLocal = (date: string) => {
        const d = new Date(date);
        const pad = (n: number) => n.toString().padStart(2, '0');

        return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
    };

    return (
        <EOLayout>
            <Head title="Kelola Event" />

            <div className="-m-6">
                {/* Minimalist Header */}
                <div className="border-b border-slate-700 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-1.5 rounded-full bg-gradient-to-b from-blue-400 to-cyan-400"></div>
                            <div>
                                <h1 className="text-xl font-semibold text-white">
                                    Events
                                </h1>
                                <p className="mt-0.5 text-xs text-slate-400">
                                    Manage your events
                                </p>
                            </div>
                        </div>
                        <div className="rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-1.5">
                            <span className="text-xs text-slate-300">
                                {events.length} Total
                            </span>
                        </div>
                    </div>
                </div>

                {/* Form Section */}
                <div className="border-b border-slate-200 bg-white px-8 py-6">
                    <div className="max-w-4xl">
                        <div className="mb-5 flex items-center gap-2">
                            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50">
                                <Plus className="h-4 w-4 text-blue-600" />
                            </div>
                            <h2 className="text-base font-semibold text-slate-800">
                                {editingId ? 'Edit Event' : 'New Event'}
                            </h2>
                        </div>

                        <form onSubmit={submit} className="space-y-4">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                {/* Event Title */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium tracking-wide text-slate-600 uppercase">
                                        Event Title *
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Tech Conference 2024"
                                        value={form.title}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                title: e.target.value,
                                            })
                                        }
                                        className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 transition-all outline-none placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                                        required
                                    />
                                </div>

                                {/* Location */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium tracking-wide text-slate-600 uppercase">
                                        Location *
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Jakarta Convention Center"
                                        value={form.location}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                location: e.target.value,
                                            })
                                        }
                                        className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 transition-all outline-none placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                                        required
                                    />
                                </div>

                                {/* Start Date */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium tracking-wide text-slate-600 uppercase">
                                        Start Date & Time *
                                    </label>
                                    <input
                                        type="datetime-local"
                                        value={form.start_date}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                start_date: e.target.value,
                                            })
                                        }
                                        className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 transition-all outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                                        required
                                    />
                                </div>

                                {/* End Date */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium tracking-wide text-slate-600 uppercase">
                                        End Date & Time *
                                    </label>
                                    <input
                                        type="datetime-local"
                                        value={form.end_date}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                end_date: e.target.value,
                                            })
                                        }
                                        className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 transition-all outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Description */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium tracking-wide text-slate-600 uppercase">
                                    Description
                                </label>
                                <textarea
                                    placeholder="Tell us about your event..."
                                    value={form.description}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            description: e.target.value,
                                        })
                                    }
                                    rows={3}
                                    className="w-full resize-none rounded-lg border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 transition-all outline-none placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                                />
                            </div>

                            {/* Gambar Event */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium tracking-wide text-slate-600 uppercase">
                                    Gambar Event (1–3)
                                </label>

                                <div className="flex gap-3">
                                    <label className="flex h-32 w-24 cursor-pointer items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 hover:border-blue-400 hover:bg-blue-50">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            hidden
                                            onChange={(e) => {
                                                const files = Array.from(
                                                    e.target.files ?? [],
                                                ).slice(0, 3);
                                                setForm({
                                                    ...form,
                                                    images: files,
                                                });
                                            }}
                                        />
                                        <Plus className="h-5 w-5 text-slate-400" />
                                    </label>

                                    {form.images.map((file, i) => (
                                        <img
                                            key={i}
                                            src={URL.createObjectURL(file)}
                                            className="h-32 w-24 rounded-lg object-cover shadow"
                                        />
                                    ))}
                                </div>

                                <p className="text-xs text-slate-400">
                                    Maksimal 3 gambar (JPG, PNG, WEBP)
                                </p>
                            </div>

                            {editingId && existingImages.length > 0 && (
                                <div className="flex gap-2 pt-2">
                                    {existingImages.map((img) => (
                                        <div key={img.id} className="relative">
                                            <img
                                                src={`/storage/${img.image}`}
                                                className="h-24 w-16 rounded-md border object-cover"
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    deleteImage(img.id)
                                                }
                                                className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-red-600 text-xs text-white"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="flex justify-end pt-2">
                                <button
                                    type="submit"
                                    className="flex items-center gap-2 rounded-lg bg-slate-900 px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-slate-800"
                                >
                                    <Plus className="h-4 w-4" />
                                    {editingId
                                        ? 'Update Event'
                                        : 'Create Event'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Events List */}
                <div className="min-h-screen bg-slate-50 px-8 py-6">
                    <div className="max-w-4xl">
                        {events.length === 0 ? (
                            <div className="rounded-xl border border-slate-200 bg-white p-16 text-center">
                                <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                                    <Calendar className="h-7 w-7 text-slate-400" />
                                </div>
                                <p className="font-medium text-slate-600">
                                    No events created yet
                                </p>
                                <p className="mt-1 text-sm text-slate-400">
                                    Start by creating your first event above
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {events.map((event) => (
                                    <div
                                        key={event.id}
                                        className="group cursor-pointer border border-slate-200 bg-white transition-all hover:border-slate-300 hover:shadow-md"
                                    >
                                        <div className="flex items-center justify-between p-4">
                                            {/* Left Content */}
                                            <div className="flex min-w-0 flex-1 gap-4">
                                                {/* Image Slider */}
                                                <div className="relative w-[60px] overflow-hidden">
                                                    {(event.images ?? [])
                                                        .length > 0 ? (
                                                        <div className="scrollbar-hide flex snap-x snap-mandatory overflow-x-auto">
                                                            {event.images
                                                                .slice(0, 5)
                                                                .map((img) => (
                                                                    <img
                                                                        key={
                                                                            img.id
                                                                        }
                                                                        src={`/storage/${img.image}`}
                                                                        alt={
                                                                            event.title
                                                                        }
                                                                        className="h-14 w-14 shrink-0 snap-center rounded-md border object-cover"
                                                                    />
                                                                ))}
                                                        </div>
                                                    ) : (
                                                        <div className="flex h-14 w-14 items-center justify-center rounded-md bg-slate-100 text-xs text-slate-400">
                                                            No Image
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Event Info */}
                                                <div className="min-w-0 flex-1">
                                                    <div className="mb-1 flex items-center gap-2">
                                                        <h3 className="truncate text-sm font-semibold text-slate-900 group-hover:text-blue-600">
                                                            {event.title}
                                                        </h3>
                                                        <span
                                                            className={`rounded px-2 py-0.5 text-xs font-medium ${
                                                                event.status ===
                                                                'published'
                                                                    ? 'border border-emerald-200 bg-emerald-50 text-emerald-700'
                                                                    : event.status ===
                                                                        'rejected'
                                                                      ? 'border border-red-200 bg-red-50 text-red-700'
                                                                      : 'border border-amber-200 bg-amber-50 text-amber-700'
                                                            }`}
                                                        >
                                                            {event.status}
                                                        </span>
                                                    </div>

                                                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                                                        <div className="flex items-center gap-1.5">
                                                            <MapPin className="h-3.5 w-3.5" />
                                                            <span>
                                                                {event.location}
                                                            </span>
                                                        </div>

                                                        <div className="flex items-center gap-1.5">
                                                            <Calendar className="h-3.5 w-3.5" />
                                                            <span>
                                                                {new Date(
                                                                    event.start_date,
                                                                ).toLocaleDateString(
                                                                    'en-US',
                                                                    {
                                                                        month: 'short',
                                                                        day: 'numeric',
                                                                        year: 'numeric',
                                                                    },
                                                                )}
                                                            </span>
                                                        </div>

                                                        <div className="flex items-center gap-1.5">
                                                            <Clock className="h-3.5 w-3.5" />
                                                            <span>
                                                                {new Date(
                                                                    event.start_date,
                                                                ).toLocaleTimeString(
                                                                    'en-US',
                                                                    {
                                                                        hour: '2-digit',
                                                                        minute: '2-digit',
                                                                    },
                                                                )}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Right Action */}
                                            <div className="flex items-center gap-2">
                                                {/* Kelola Ticket */}
                                                <button
                                                    onClick={() =>
                                                        router.get(
                                                            `/eo/events/${event.id}/tickets`,
                                                        )
                                                    }
                                                    className="flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 transition hover:bg-blue-100"
                                                >
                                                    <Ticket className="h-3.5 w-3.5" />
                                                    Ticket
                                                </button>

                                                {/* Edit */}
                                                <button
                                                    onClick={() => {
                                                        setEditingId(event.id);
                                                        setForm({
                                                            title: event.title,
                                                            description:
                                                                event.description ??
                                                                '',
                                                            start_date:
                                                                toDatetimeLocal(
                                                                    event.start_date,
                                                                ),
                                                            end_date:
                                                                toDatetimeLocal(
                                                                    event.end_date,
                                                                ),
                                                            location:
                                                                event.location,
                                                            images: [],
                                                        });
                                                        setExistingImages(
                                                            event.images ?? [],
                                                        );
                                                        window.scrollTo({
                                                            top: 0,
                                                            behavior: 'smooth',
                                                        });
                                                    }}
                                                    className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-600 transition-all hover:bg-slate-100 hover:text-slate-900"
                                                >
                                                    <Edit3 className="h-3.5 w-3.5" />
                                                    Edit
                                                </button>

                                                {/* Hapus */}
                                                <button
                                                    onClick={() => {
                                                        if (
                                                            confirm(
                                                                'Hapus event ini?',
                                                            )
                                                        ) {
                                                            router.delete(
                                                                `/eo/manage-event/${event.id}`,
                                                                {
                                                                    preserveScroll: true,
                                                                },
                                                            );
                                                        }
                                                    }}
                                                    className="rounded-lg px-3 py-1.5 text-xs font-medium text-red-600 transition-all hover:bg-red-50"
                                                >
                                                    Hapus
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </EOLayout>
    );
}
