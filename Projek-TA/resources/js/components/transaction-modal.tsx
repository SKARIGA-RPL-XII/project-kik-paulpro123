import {
    X,
    Receipt,
    User,
    Users,
    Mail,
    CreditCard,
    Calendar as CalendarIcon,
    Phone,
    FileImage,
    ShieldCheck,
    Eye,
} from 'lucide-react';
import { useEffect, useState } from 'react';

export interface AdminOrderDetail {
    id: number;
    invoice: string;
    total_price: number;
    payment_method: string;
    payment_proof: string | null;
    status: string;
    created_at: string;
    user: {
        username: string;
        email: string;
        full_name: string;
        phone: string;
        gender: string;
        birth_date: string;
    };
    event: {
        title: string;
        eo_name: string;
    };
}

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    order: AdminOrderDetail | null;
}

export default function AdminTransactionModal({
    isOpen,
    onClose,
    order,
}: ModalProps) {
    // State untuk mengontrol Modal Gambar (Lightbox)
    const [isImageExpanded, setIsImageExpanded] = useState(false);

    // Fungsi tutup modal yang juga mereset state gambar
    const handleCloseModal = () => {
        setIsImageExpanded(false);
        onClose();
    };

    // Logika tombol ESC di keyboard
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                if (isImageExpanded) {
                    setIsImageExpanded(false); // Tutup gambar dulu jika sedang terbuka
                } else {
                    handleCloseModal(); // Jika gambar tidak terbuka, tutup modal utama
                }
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isImageExpanded, onClose]);

    if (!isOpen || !order) return null;

    const formatRp = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const formatDate = (dateString: string, includeTime = true) => {
        if (!dateString || dateString === '-') return '-';
        const options: Intl.DateTimeFormatOptions = {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        };
        if (includeTime) {
            options.hour = '2-digit';
            options.minute = '2-digit';
        }
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    return (
        <>
            {/* --- MODAL UTAMA --- */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
                {/* Backdrop Hitam Transparan */}
                <div
                    className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
                    onClick={handleCloseModal}
                ></div>

                {/* Kotak Konten */}
                <div className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden overflow-y-auto rounded-2xl bg-white shadow-2xl transition-all">
                    {/* Header Sticky */}
                    <div className="sticky top-0 z-10 flex shrink-0 items-center justify-between border-b border-slate-100 bg-slate-800 px-6 py-4 text-white">
                        <div className="flex items-center gap-2">
                            <ShieldCheck
                                size={20}
                                className="text-emerald-400"
                            />
                            <h3 className="text-lg font-bold">
                                Riwayat Transaksi
                            </h3>
                        </div>
                        <button
                            onClick={handleCloseModal}
                            className="rounded-full p-2 text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Body */}
                    <div className="flex-1 space-y-6 p-6">
                        {/* Info Harga & Event */}
                        <div className="flex flex-col justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 p-5 sm:flex-row">
                            <div>
                                <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                                    Nominal Pembayaran
                                </p>
                                <p className="mt-1 text-3xl font-black text-slate-800">
                                    {formatRp(order.total_price)}
                                </p>
                                <span
                                    className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-bold ${order.status === 'success' ? 'bg-emerald-100 text-emerald-700' : order.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}
                                >
                                    Status: {order.status.toUpperCase()}
                                </span>
                            </div>
                            <div className="border-t border-slate-200 pt-4 text-left sm:border-t-0 sm:border-l sm:pt-0 sm:pl-4 sm:text-right">
                                <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                                    Event & Penyelenggara
                                </p>
                                <p className="mt-1 line-clamp-1 text-sm font-bold text-indigo-700">
                                    {order.event.title}
                                </p>
                                <p className="mt-1 text-sm text-slate-600">
                                    {order.event.eo_name}
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {/* Kolom Kiri: Data Privat Pembeli */}
                            <div className="space-y-4">
                                <h4 className="border-b pb-2 font-bold text-slate-800">
                                    Data Privat Pembeli
                                </h4>
                                <div className="grid gap-3 text-sm">
                                    <div>
                                         <Users
                                            size={14}
                                            className="text-slate-400"
                                        />
                                        <span className="text-xs text-slate-500">
                                            Nama Lengkap & Username
                                        </span>
                                        <p className="font-bold text-slate-900">
                                            {order.user.full_name}{' '}
                                            <span className="font-normal text-slate-500">
                                                (@{order.user.username})
                                            </span>
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Phone
                                            size={14}
                                            className="text-slate-400"
                                        />
                                        <span className="font-medium text-slate-800">
                                            {order.user.phone}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Mail
                                            size={14}
                                            className="text-slate-400"
                                        />
                                        <span className="font-medium text-slate-800">
                                            {order.user.email}
                                        </span>
                                    </div>
                                    <div className="mt-2 grid grid-cols-2 gap-4">
                                        <div>
                                            <CalendarIcon
                                            size={14}
                                            className="text-slate-400"
                                        />
                                            <span className="text-xs text-slate-500">
                                                Tgl Lahir
                                            </span>
                                            <p className="font-medium text-slate-800">
                                                {formatDate(
                                                    order.user.birth_date,
                                                    false,
                                                )}
                                            </p>
                                        </div>
                                        <div>
                                            <User
                                            size={14}
                                            className="text-slate-400"
                                        />
                                            <span className="text-xs text-slate-500">
                                                Gender
                                            </span>
                                            <p className="font-medium text-slate-800 capitalize">
                                                {order.user.gender}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Kolom Kanan: Bukti Pembayaran */}
                            <div className="space-y-4">
                                <h4 className="border-b pb-2 font-bold text-slate-800">
                                    Bukti Pembayaran
                                </h4>
                                <div className="mb-3 grid gap-3 text-sm">
                                    <div>
                                        <Receipt
                                            size={14}
                                            className="text-slate-400"
                                        />
                                        <span className="text-xs text-slate-500">
                                            Invoice
                                        </span>
                                        <p className="font-bold text-slate-900">
                                            {order.invoice}
                                        </p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div>
                                            <CreditCard
                                            size={14}
                                            className="text-slate-400"
                                        />
                                            <span className="text-xs text-slate-500">
                                                Metode
                                            </span>
                                            <p className="font-bold text-slate-900 uppercase">
                                                {order.payment_method}
                                            </p>
                                        </div>
                                        <div>
                                            <span className="text-xs text-slate-500">
                                                Tanggal
                                            </span>
                                            <p className="font-medium text-slate-900">
                                                {formatDate(order.created_at)}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Area Gambar Thumbnail */}
                                <div className="flex h-40 items-center justify-center rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 p-2">
                                    {order.payment_proof ? (
                                        <div
                                            onClick={() =>
                                                setIsImageExpanded(true)
                                            }
                                            className="group relative block h-full w-full cursor-pointer overflow-hidden rounded"
                                        >
                                            <img
                                                src={order.payment_proof}
                                                alt="Bukti Pembayaran"
                                                className="h-full max-h-36 w-full object-cover object-top"
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center bg-slate-900/60 opacity-0 transition-all duration-200 group-hover:opacity-100">
                                                <span className="flex items-center gap-2 text-sm font-bold text-white">
                                                    <Eye size={16} /> Perbesar
                                                    Gambar
                                                </span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center text-slate-400">
                                            <FileImage className="mx-auto mb-1 h-8 w-8 opacity-50" />
                                            <p className="text-xs">
                                                Tidak ada bukti gambar
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex shrink-0 justify-end border-t border-slate-100 bg-slate-50 px-6 py-4">
                        <button
                            onClick={handleCloseModal}
                            className="rounded-lg bg-slate-800 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-slate-700"
                        >
                            Tutup Panel
                        </button>
                    </div>
                </div>
            </div>

            {/* --- LIGHTBOX: MODAL GAMBAR FULL --- */}
            {isImageExpanded && order.payment_proof && (
                <div
                    className="fixed inset-0 z-60 flex items-center justify-center bg-slate-900/95 p-4 backdrop-blur-md transition-all duration-300 sm:p-8"
                    onClick={() => setIsImageExpanded(false)}
                >
                    {/* Tombol Tutup Silang di pojok kanan atas */}
                    <button
                        onClick={() => setIsImageExpanded(false)}
                        className="absolute top-4 right-4 z-10 rounded-full bg-white/10 p-2.5 text-white transition-colors hover:bg-white/25 sm:top-6 sm:right-6"
                        title="Tutup Gambar (ESC)"
                    >
                        <X size={24} />
                    </button>

                    {/* Gambar Full Size */}
                    <img
                        src={order.payment_proof}
                        alt="Bukti Pembayaran Penuh"
                        className="max-h-full max-w-full rounded-xl object-contain shadow-2xl ring-1 ring-white/10"
                        onClick={(e) => e.stopPropagation()} // Mencegah modal tertutup jika gambarnya sendiri yang diklik
                    />
                </div>
            )}
        </>
    );
}
