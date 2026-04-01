import { X, Receipt, User, Mail, CreditCard, Calendar as CalendarIcon } from 'lucide-react';
import { useEffect } from 'react';

// Mendefinisikan struktur data Order yang diterima Modal
export interface OrderDetail {
    id: number;
    invoice: string;
    total_price: number;
    payment_method: string;
    created_at: string;
    user: {
        username: string;
        email: string;
        full_name: string;
    };
    event: {
        title: string;
    };
}

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    order: OrderDetail | null;
}

export default function CustomerDetailModal({ isOpen, onClose, order }: ModalProps) {
    // Menutup modal dengan tombol ESC
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    if (!isOpen || !order) return null;

    // Fungsi format Uang
    const formatRp = (amount: number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
    };

    // Fungsi format Tanggal
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Latar Belakang Gelap (Backdrop) */}
            <div 
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" 
                onClick={onClose}
            ></div>

            {/* Kotak Modal Utama */}
            <div className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl transition-all">
                
                {/* Header Modal */}
                <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-6 py-4">
                    <h3 className="text-lg font-bold text-slate-800">Detail Pembelian</h3>
                    <button 
                        onClick={onClose}
                        className="rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-600"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Konten Modal */}
                <div className="p-6 space-y-6">
                    {/* Ringkasan Transaksi */}
                    <div className="flex items-center justify-between rounded-xl bg-indigo-50 p-4 border border-indigo-100">
                        <div>
                            <p className="text-xs font-semibold text-indigo-500 uppercase tracking-wider">Total Pembayaran</p>
                            <p className="mt-1 text-2xl font-black text-indigo-700">{formatRp(order.total_price)}</p>
                        </div>
                        <div className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
                            Berhasil
                        </div>
                    </div>

                    {/* Data Rinci */}
                    <div className="grid gap-5 text-sm">
                        <div className="grid grid-cols-3 gap-2 border-b border-slate-100 pb-3">
                            <span className="text-slate-500 flex items-center gap-2"><Receipt size={16} /> Invoice</span>
                            <span className="col-span-2 font-semibold text-slate-900">{order.invoice}</span>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-2 border-b border-slate-100 pb-3">
                            <span className="text-slate-500 flex items-center gap-2"><CalendarIcon size={16} /> Tanggal</span>
                            <span className="col-span-2 font-medium text-slate-900">{formatDate(order.created_at)} WIB</span>
                        </div>

                        <div className="grid grid-cols-3 gap-2 border-b border-slate-100 pb-3">
                            <span className="text-slate-500 flex items-center gap-2"><CreditCard size={16} /> Metode</span>
                            <span className="col-span-2 font-medium text-slate-900 uppercase">{order.payment_method}</span>
                        </div>

                        <div className="grid grid-cols-3 gap-2 border-b border-slate-100 pb-3">
                            <span className="text-slate-500 flex items-center gap-2"><User size={16} /> Pembeli</span>
                            <div className="col-span-2">
                                <p className="font-bold text-slate-900">{order.user.full_name}</p>
                                <p className="text-xs text-slate-500 mt-0.5">Username: @{order.user.username}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                            <span className="text-slate-500 flex items-center gap-2"><Mail size={16} /> Email</span>
                            <span className="col-span-2 font-medium text-slate-900">{order.user.email}</span>
                        </div>
                    </div>
                </div>

                {/* Footer Modal */}
                <div className="border-t border-slate-100 bg-slate-50 px-6 py-4 flex justify-end">
                    <button 
                        onClick={onClose}
                        className="rounded-lg bg-slate-800 px-6 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-slate-700"
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    );
}