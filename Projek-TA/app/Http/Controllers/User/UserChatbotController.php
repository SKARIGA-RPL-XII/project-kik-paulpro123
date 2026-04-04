<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller; // Wajib di-import karena beda folder
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use App\Models\Event; // Pastikan model ini sesuai dengan punyamu

class UserChatbotController extends Controller
{
    public function ask(Request $request)
    {
        // Validasi input
        $request->validate(['message' => 'required|string']);
        $userMessage = $request->message;
        $apiKey = env('GEMINI_API_KEY');

        if (!$apiKey) {
            return response()->json(['reply' => 'Sistem bot sedang maintenance (API Key belum di-set).'], 200);
        }

        try {
            // ==========================================================
            // 1. AMBIL DATA EVENT AKTIF
            // ==========================================================
            $events = Event::where('status', 'active')->get();
            $eventDataString = "";
            
            if ($events->isEmpty()) {
                $eventDataString = "Saat ini tidak ada event yang tersedia.";
            } else {
                foreach ($events as $event) {
                    $eventDataString .= "- " . $event->name . " | Jadwal: " . $event->date . " | Harga: Rp" . number_format($event->price, 0, ',', '.') . "\n";
                }
            }

            // ==========================================================
            // 2. PANDUAN SISTEM (FAQ) UNTUK USER
            // ==========================================================
            $systemGuide = "
            PANDUAN SISTEM UNTUK PENGGUNA:
            1. Cara Beli Tiket: Pilih event di Beranda, klik 'Beli Tiket', pilih jumlah, lalu bayar.
            2. Metode Pembayaran: Transfer Bank dan E-Wallet.
            3. Lokasi E-Ticket: Setelah bayar, e-ticket ada di menu 'Tiket Saya' di dashboard.
            4. Refund: Tiket tidak bisa di-refund kecuali event dibatalkan.
            5. Lupa Password: Gunakan tombol 'Lupa Password' di halaman login.
            6. Kontak Admin: Jika ada error, hubungi WA 0812-XXXX-XXXX.
            ";

            // ==========================================================
            // 3. RACIK SYSTEM PROMPT
            // ==========================================================
            $systemPrompt = "
            Anda adalah Asisten Support (Customer Service) yang ramah untuk platform e-ticketing.
            
            Aturan menjawab:
            - Jika ditanya cara penggunaan aplikasi, jawab berdasarkan [PANDUAN SISTEM].
            - Jika ditanya info event atau harga, jawab berdasarkan [DATA EVENT].
            - Jawab dengan singkat, sopan, dan gunakan sapaan 'Halo Kak!'.
            - Jika pertanyaan di luar konteks e-ticketing atau tidak ada di data, arahkan untuk menghubungi WA Admin.

            [PANDUAN SISTEM]
            $systemGuide

            [DATA EVENT]
            $eventDataString
            ";

            // ==========================================================
            // 4. TEMBAK KE GOOGLE GEMINI (Sama seperti Admin, pakai 1.5-flash / 2.5-flash)
            // ==========================================================
            /** @var \Illuminate\Http\Client\Response $response */
            $response = Http::withoutVerifying()->withHeaders([
                'Content-Type' => 'application/json',
            ])->post("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={$apiKey}", [
                "contents" => [
                    [
                        "parts" => [
                            ["text" => $systemPrompt . "\n\nPertanyaan User: " . $userMessage]
                        ]
                    ]
                ]
            ]);

            if ($response->successful()) {
                $data = $response->json();
                $aiReply = $data['candidates'][0]['content']['parts'][0]['text'] ?? "Maaf Kak, bot sedang bingung.";
                
                return response()->json([
                    'status' => 'success',
                    'reply' => $aiReply
                ], 200);
            }

            // Jika API menolak (limit, dll)
            Log::error('Gemini API Error (User): ' . $response->body());
            return response()->json([
                'reply' => 'Maaf Kak, sistem antrean bot sedang penuh. Coba beberapa saat lagi ya!'
            ], 200);

        } catch (\Exception $e) {
            Log::error('Chatbot User Exception: ' . $e->getMessage());
            return response()->json([
                'reply' => 'Maaf Kak, terjadi kendala pada server kami.'
            ], 200);
        }
    }
}