import { Head, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import EOLayout from '@/layouts/eo-layout';
import { ArrowLeft, Upload, X } from 'lucide-react';

interface EventImage {
    id: number;
    image: string;
}

interface Event {
    id: number;
    title: string;
    description: string | null;
    start_date: string;
    end_date: string;
    location: string;
    images?: EventImage[];
}

export default function EventForm() {
    const { event } = usePage<{ event?: Event }>().props;
    const isEdit = !!event;

    const [form, setForm] = useState({
        title: event?.title ?? '',
        description: event?.description ?? '',
        start_date: event?.start_date ? event.start_date.slice(0, 16) : '',
        end_date: event?.end_date ? event.end_date.slice(0, 16) : '',
        location: event?.location ?? '',
        images: [] as File[],
    });

    const [existingImages, setExistingImages] = useState<EventImage[]>(
        event?.images ?? [],
    );

    const [previews, setPreviews] = useState<string[]>(
        event?.images?.map((img) => `/storage/${img.image}`) ?? [],
    );

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const remainingSlots = 3 - previews.length;
        const filesToAdd = files.slice(0, remainingSlots);

        if (filesToAdd.length > 0) {
            const newPreviews = filesToAdd.map((file) =>
                URL.createObjectURL(file),
            );
            setPreviews([...previews, ...newPreviews]);
            setForm({ ...form, images: [...form.images, ...filesToAdd] });
        }

        e.target.value = '';
    };

    const removeImage = (index: number) => {
        if (index < existingImages.length) {
            // hapus gambar lama
            setExistingImages(existingImages.filter((_, i) => i !== index));
        } else {
            // hapus gambar baru
            const newIndex = index - existingImages.length;
            setForm({
                ...form,
                images: form.images.filter((_, i) => i !== newIndex),
            });
        }

        setPreviews(previews.filter((_, i) => i !== index));
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        const start = new Date(form.start_date);
        const end = new Date(form.end_date);
        const now = new Date();

        if (start < now) {
            alert('Start date tidak boleh kurang dari waktu sekarang.');
            return;
        }

        if (end <= start) {
            alert('End date harus lebih dari start date.');
            return;
        }

        const diffMinutes = (end.getTime() - start.getTime()) / 60000;

        if (diffMinutes < 120) {
            alert('Durasi event minimal 120 menit (2 jam).');
            return;
        }

        if (isEdit) {
            router.post(
                `/eo/manage-event/${event?.id}`,
                {
                    ...form,
                    _method: 'put',
                    existing_images: existingImages.map((img) => img.id),
                },
                {
                    forceFormData: true,
                },
            );
        }
    };

    return (
        <EOLayout>
            <Head title={isEdit ? 'Edit Event' : 'Create Event'} />

            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50/50 p-6 md:p-10">
                {/* HEADER */}
                <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1.5">
                        <h1 className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
                            {isEdit ? 'Edit Event' : 'Create New Event'}
                        </h1>
                        <p className="text-sm font-medium text-slate-500">
                            {isEdit
                                ? 'Perbarui informasi event kamu'
                                : 'Lengkapi detail untuk membuat event baru'}
                        </p>
                    </div>

                    <button
                        onClick={() => window.history.back()}
                        className="group inline-flex items-center justify-center gap-2.5 rounded-2xl border-2 border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:border-slate-300 hover:bg-slate-50 hover:shadow-md active:scale-95"
                    >
                        <ArrowLeft className="h-4.5 w-4.5 transition-transform group-hover:-translate-x-1" />
                        Kembali
                    </button>
                </div>

                {/* FORM CARD */}
                <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl border border-slate-200/60 bg-white/80 shadow-xl shadow-slate-200/50 backdrop-blur-sm">
                    <form onSubmit={submit} className="space-y-8 p-8 md:p-10">
                        {/* IMAGE UPLOAD */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <label className="block text-sm font-bold tracking-wide text-slate-700 uppercase">
                                    Event Images
                                </label>
                                <span className="text-xs font-semibold text-slate-500">
                                    {previews.length} / 3 images
                                </span>
                            </div>

                            {/* Preview Grid */}
                            {previews.length > 0 && (
                                <div className="grid grid-cols-3 gap-4">
                                    {previews.map((preview, index) => (
                                        <div
                                            key={index}
                                            className="group relative overflow-hidden rounded-2xl"
                                        >
                                            <img
                                                src={preview}
                                                alt={`Preview ${index + 1}`}
                                                className="h-40 w-full rounded-2xl border-2 border-slate-200 object-cover shadow-lg transition-transform group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeImage(index)
                                                    }
                                                    className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-bold text-slate-900 shadow-lg transition-transform hover:scale-105 active:scale-95"
                                                >
                                                    <X className="h-4 w-4" />
                                                    Remove
                                                </button>
                                            </div>
                                            {/* Image number badge */}
                                            <div className="absolute top-3 left-3 flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900/80 text-xs font-bold text-white backdrop-blur-sm">
                                                {index + 1}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Upload Button */}
                            {previews.length < 3 && (
                                <label className="group relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50/50 p-12 transition-all duration-300 hover:border-slate-400 hover:bg-slate-100/50">
                                    <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-100 to-slate-50 shadow-md transition-transform group-hover:scale-110">
                                        <Upload className="h-10 w-10 text-slate-400" />
                                    </div>
                                    <p className="mb-2 text-sm font-semibold text-slate-700">
                                        Click to upload event image
                                        {previews.length > 0 && 's'}
                                    </p>
                                    <p className="text-xs text-slate-500">
                                        PNG, JPG, WEBP up to 10MB •{' '}
                                        {3 - previews.length} slot
                                        {3 - previews.length > 1
                                            ? 's'
                                            : ''}{' '}
                                        remaining
                                    </p>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={handleImageChange}
                                        className="absolute inset-0 cursor-pointer opacity-0"
                                    />
                                </label>
                            )}

                            {previews.length === 3 && (
                                <div className="rounded-xl bg-emerald-50 p-4 text-center">
                                    <p className="text-sm font-semibold text-emerald-700">
                                        ✓ Maximum images uploaded (3/3)
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* TITLE */}
                        <div className="space-y-3">
                            <label className="block text-sm font-bold tracking-wide text-slate-700 uppercase">
                                Event Title
                            </label>
                            <input
                                type="text"
                                value={form.title}
                                onChange={(e) =>
                                    setForm({ ...form, title: e.target.value })
                                }
                                className="w-full rounded-xl border-2 border-slate-200 bg-white px-5 py-3.5 text-sm font-medium text-slate-900 placeholder-slate-400 shadow-sm transition-all duration-200 focus:border-slate-900 focus:ring-4 focus:ring-slate-900/10 focus:outline-none"
                                placeholder="e.g., Tech Conference 2024"
                                required
                            />
                        </div>

                        {/* LOCATION */}
                        <div className="space-y-3">
                            <label className="block text-sm font-bold tracking-wide text-slate-700 uppercase">
                                Location
                            </label>
                            <input
                                type="text"
                                value={form.location}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        location: e.target.value,
                                    })
                                }
                                className="w-full rounded-xl border-2 border-slate-200 bg-white px-5 py-3.5 text-sm font-medium text-slate-900 placeholder-slate-400 shadow-sm transition-all duration-200 focus:border-slate-900 focus:ring-4 focus:ring-slate-900/10 focus:outline-none"
                                placeholder="e.g., Jakarta Convention Center"
                                required
                            />
                        </div>

                        {/* DATE GRID */}
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div className="space-y-3">
                                <label className="block text-sm font-bold tracking-wide text-slate-700 uppercase">
                                    Start Date & Time
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
                                    className="w-full rounded-xl border-2 border-slate-200 bg-white px-5 py-3.5 text-sm font-medium text-slate-900 shadow-sm transition-all duration-200 focus:border-slate-900 focus:ring-4 focus:ring-slate-900/10 focus:outline-none"
                                    required
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="block text-sm font-bold tracking-wide text-slate-700 uppercase">
                                    End Date & Time
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
                                    className="w-full rounded-xl border-2 border-slate-200 bg-white px-5 py-3.5 text-sm font-medium text-slate-900 shadow-sm transition-all duration-200 focus:border-slate-900 focus:ring-4 focus:ring-slate-900/10 focus:outline-none"
                                    required
                                />
                            </div>
                        </div>

                        {/* DESCRIPTION */}
                        <div className="space-y-3">
                            <label className="block text-sm font-bold tracking-wide text-slate-700 uppercase">
                                Description
                            </label>
                            <textarea
                                rows={5}
                                value={form.description ?? ''}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        description: e.target.value,
                                    })
                                }
                                className="w-full resize-none rounded-xl border-2 border-slate-200 bg-white px-5 py-3.5 text-sm font-medium text-slate-900 placeholder-slate-400 shadow-sm transition-all duration-200 focus:border-slate-900 focus:ring-4 focus:ring-slate-900/10 focus:outline-none"
                                placeholder="Tell people what your event is about, what they can expect, and why they should attend..."
                            />
                        </div>

                        {/* SUBMIT */}
                        <button
                            type="submit"
                            className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-slate-900/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-slate-900/40 active:scale-[0.98]"
                        >
                            <span className="relative z-10">
                                {isEdit ? 'Update Event' : 'Create Event'}
                            </span>
                            <div className="absolute inset-0 -z-0 bg-gradient-to-r from-slate-800 to-slate-700 opacity-0 transition-opacity group-hover:opacity-100" />
                        </button>
                    </form>
                </div>
            </div>
        </EOLayout>
    );
}
