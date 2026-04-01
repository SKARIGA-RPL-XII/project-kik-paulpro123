<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

// 👇 IMPORT MODEL DATABASE ANDA DI SINI
use App\Models\User;
use App\Models\Event;
use App\Models\Order;

class AdminChatbotController extends Controller
{
    public function chat(Request $request)
    {
        // Validasi input pesan dari React
        $request->validate([~
            'message' => 'required|string'
        ]);

        $userMessage = $request->message;
        $apiKey = env('GEMINI_API_KEY');

        if (!$apiKey) {
            return response()->json(['reply' => 'Error: GEMINI_API_KEY belum dipasang di file .env!'], 200);
        }

        try {
            // ==========================================================
            // 1. AMBIL DATA REAL-TIME DARI DATABASE (CONTEXT INJECTION)
            // ==========================================================
            $totalUsers = User::where('role', 'user')->count();
            $pendingEos = User::where('role', 'eo')->where('status', 'pending')->count();
            $pendingEvents = Event::where('status', 'pending')->count();
            $totalRevenue = Order::where('status', 'success')->sum('total_price');
            
            // Format angka menjadi Rupiah agar AI membacanya dengan cantik
            $formattedRevenue = "Rp " . number_format($totalRevenue, 0, ',', '.');

            // ==========================================================
            // 2. RACIK SYSTEM PROMPT (BUKU PINTAR UNTUK AI)
            // ==========================================================
            $systemPrompt = "Kamu adalah 'Min-Tiket', asisten AI senior khusus untuk Super Admin di platform e-ticketing. 
            Gaya bicaramu asyik, santai, dan profesional. Sering gunakan sapaan 'Bosku' atau 'Siap Bos!'.
            
            🚨 BERIKUT ADALAH DATA REAL-TIME PLATFORM SAAT INI:
            - Total Pengguna (Pembeli): {$totalUsers} orang
            - Total Pendapatan Sukses: {$formattedRevenue}
            - EO Menunggu Verifikasi: {$pendingEos} akun
            - Event Menunggu Moderasi: {$pendingEvents} event
            
            Aturan Mutlak: 
            1. Jika Admin bertanya soal statistik/data, JAWAB BERDASARKAN DATA DI ATAS. Jangan pernah mengarang angka.
            2. Jika ada EO atau Event yang menunggu, ingatkan Admin untuk segera memeriksanya.
            3. Jawab dengan ringkas dan to the point.";

            // ==========================================================
            // 3. TEMBAK KE GOOGLE GEMINI (Menggunakan versi 2.5-flash)
            // ==========================================================
            /** @var \Illuminate\Http\Client\Response $response */
            $response = Http::withoutVerifying()->withHeaders([
                'Content-Type' => 'application/json',
            ])->post("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={$apiKey}", [
                "contents" => [
                    [
                        "parts" => [
                            // Menggabungkan Konteks Database + Pertanyaan Admin
                            ["text" => $systemPrompt . "\n\nAdmin bertanya: " . $userMessage]
                        ]
                    ]
                ]
            ]);

            // Jika Google membalas dengan status sukses
            if ($response->successful()) {
                $data = $response->json();
                $aiReply = $data['candidates'][0]['content']['parts'][0]['text'] ?? "Maaf Bosku, saya agak nge-blank.";

                return response()->json([
                    'status' => 'success',
                    'reply' => $aiReply
                ], 200);
            }

            // Jika Google menolak
            $googleError = $response->body();
            Log::error('Gemini API Error: ' . $googleError);
            return response()->json([
                'reply' => "🤖 GOOGLE MENOLAK! Ini alasannya:\n\n" . $googleError
            ], 200);

        } catch (\Exception $e) {
            // Jika ada error internal / query database gagal
            Log::error('Chatbot Exception: ' . $e->getMessage());
            return response()->json([
                'reply' => "🚨 LARAVEL ERROR:\n\n" . $e->getMessage()
            ], 200);
        }
    }
}