import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

interface Message {
    sender: 'user' | 'bot';
    text: string;
}

interface ChatbotProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function UserChatbot({ isOpen, onClose }: ChatbotProps) {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        { sender: 'bot', text: 'Halo Kak! 👋 Ada yang bisa dibantu terkait event atau pembelian tiket hari ini?' }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll saat ada pesan baru
    useEffect(() => {
        if (isOpen) {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isOpen]);

    const sendMessage = async (textToSend: string) => {
        if (!textToSend.trim()) return;

        setMessages(prev => [...prev, { sender: 'user', text: textToSend }]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await axios.post('/chatbot/ask', { message: textToSend });
            setMessages(prev => [...prev, { sender: 'bot', text: response.data.reply }]);
        } catch (error) {
            setMessages(prev => [...prev, { sender: 'bot', text: 'Maaf Kak, terjadi kesalahan jaringan. Coba lagi ya!' }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') sendMessage(input);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed bottom-6 right-6 w-80 md:w-96 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 flex flex-col overflow-hidden">
            {/* Header Kotak Chat */}
            <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
                <div>
                    <h3 className="font-bold text-lg">Pusat Bantuan</h3>
                    <p className="text-xs text-blue-200">Asisten E-Ticketing</p>
                </div>
                <button onClick={onClose} className="text-white hover:text-gray-200 focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {/* Area Pesan */}
            <div className="p-4 h-72 overflow-y-auto bg-gray-50 flex flex-col gap-3 text-sm">
                {messages.map((msg, index) => (
                    <div key={index} className={`p-3 rounded-xl max-w-[85%] shadow-sm ${
                        msg.sender === 'user'
                        ? 'bg-blue-600 text-white self-end rounded-tr-none'
                        : 'bg-white border border-gray-200 text-gray-800 self-start rounded-tl-none whitespace-pre-wrap'
                    }`}>
                        {msg.text}
                    </div>
                ))}

                {/* Tombol Tanya Cepat */}
                {messages.length === 1 && (
                    <div className="flex flex-wrap gap-2 mt-1">
                        <button onClick={() => sendMessage('Bagaimana cara beli tiket?')} className="bg-blue-50 text-blue-600 border border-blue-200 px-3 py-1.5 rounded-full text-xs hover:bg-blue-100 transition">Cara Beli Tiket</button>
                        <button onClick={() => sendMessage('Di mana e-ticket saya?')} className="bg-blue-50 text-blue-600 border border-blue-200 px-3 py-1.5 rounded-full text-xs hover:bg-blue-100 transition">Cek E-Ticket</button>
                    </div>
                )}

                {isLoading && <div className="text-gray-400 text-xs italic self-start ml-2">Asisten sedang mengetik...</div>}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Pesan — FIXED: background putih, border jelas, teks gelap */}
            <div className="p-3 bg-white border-t border-gray-200 flex gap-2 items-center">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full bg-white text-gray-900 placeholder-gray-400 border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none p-2.5 rounded-lg text-sm transition"
                    placeholder="Ketik pesan..."
                    disabled={isLoading}
                />
                <button
                    onClick={() => sendMessage(input)}
                    disabled={isLoading || !input.trim()}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white p-2.5 rounded-lg transition flex-shrink-0"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                    </svg>
                </button>
            </div>
        </div>
    );
}