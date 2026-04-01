import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react';
import axios from 'axios';

interface Message {
    role: 'user' | 'bot';
    content: string;
}

export default function AdminChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const [messages, setMessages] = useState<Message[]>([
        { role: 'bot', content: 'Halo Bos! Saya Min-Tiket 🤖. Ada data transaksi atau EO yang perlu saya analisis hari ini?' }
    ]);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll yang AMAN (hanya berjalan kalau chat sedang terbuka)
    useEffect(() => {
        if (isOpen && messagesEndRef.current) {
            // Menggunakan setTimeout kecil agar DOM selesai dirender dulu sebelum di-scroll
            setTimeout(() => {
                messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    }, [messages, isOpen]);

    const sendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await axios.post('/admin/chat', { message: userMessage });
            setMessages(prev => [...prev, { role: 'bot', content: response.data.reply }]);
        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, { role: 'bot', content: 'Waduh, koneksi ke otak saya terputus. Coba refresh halaman ya.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ zIndex: 9999 }} className="fixed bottom-6 right-6 flex flex-col items-end">
            
            {/* 👇 Jendela Chat hanya di-render (diciptakan) JIKA tombol diklik 👇 */}
            {isOpen && (
                <div className="w-96 max-w-[calc(100vw-3rem)] h-125 max-h-[calc(100vh-6rem)] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden mb-4 animate-in slide-in-from-bottom-5 fade-in duration-300 border border-slate-200">
                    {/* Header Chat */}
                    <div className="bg-emerald-600 p-4 flex items-center justify-between text-white shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="bg-white/20 p-2 rounded-lg">
                                <Bot size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-sm">Min-Tiket AI</h3>
                                <p className="text-xs text-emerald-100">Asisten Super Admin</p>
                            </div>
                        </div>
                        <button 
                            onClick={() => setIsOpen(false)}
                            className="p-2 hover:bg-white/20 rounded-full transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Area Pesan */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
                                <div className={`shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${msg.role === 'user' ? 'bg-indigo-100 text-indigo-600' : 'bg-emerald-100 text-emerald-600'}`}>
                                    {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                                </div>
                                <div className={`p-3 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-sm shadow-sm' : 'bg-white border border-slate-200 text-slate-700 rounded-tl-sm shadow-sm'}`}>
                                    <div className="whitespace-pre-wrap">{msg.content}</div>
                                </div>
                            </div>
                        ))}
                        
                        {/* Indikator Mengetik */}
                        {isLoading && (
                            <div className="flex gap-3 max-w-[85%]">
                                <div className="shrink-0 h-8 w-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                                    <Bot size={16} />
                                </div>
                                <div className="p-4 bg-white border border-slate-200 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-1">
                                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Area Input */}
                    <div className="p-3 bg-white border-t border-slate-100 shrink-0">
                        <form onSubmit={sendMessage} className="flex items-center gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ketik perintah..."
                                className="flex-1 bg-slate-100 border-transparent focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 rounded-full px-4 py-2.5 text-sm transition-all"
                                disabled={isLoading}
                            />
                            <button
                                type="submit"
                                disabled={!input.trim() || isLoading}
                                className="p-2.5 rounded-full bg-emerald-600 text-white disabled:bg-slate-300 disabled:cursor-not-allowed hover:bg-emerald-700 transition-colors shrink-0"
                            >
                                {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Tombol Floating Pembuka Chat */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="p-4 rounded-full bg-emerald-600 text-white shadow-xl transition-all duration-300 hover:bg-emerald-700 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-emerald-300 animate-in zoom-in duration-300"
                >
                    <MessageCircle size={28} />
                </button>
            )}

        </div>
    );
}