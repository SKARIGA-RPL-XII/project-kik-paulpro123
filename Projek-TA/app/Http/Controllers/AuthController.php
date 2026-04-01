<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\CustomerDetail;
use Inertia\Controller;
use Inertia\Inertia;

class AuthController extends Controller
{
    // ==========================================
    // 1. TAMPILAN HALAMAN (GET)
    // ==========================================
    public function showLogin()
    {
        return Inertia::render('auth/login');
    }

    public function showRegisterUser()
    {
        return Inertia::render('auth/register-user'); // Sesuaikan dengan nama file React Anda
    }

    public function showRegisterEo()
    {
        return Inertia::render('auth/register-eo');
    }

    // ==========================================
    // 2. LOGIKA PROSES (POST)
    // ==========================================

    // Proses Login (Dipakai oleh Admin, EO, dan User)
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            $user = Auth::user();

            // Jika EO atau Admin, lempar ke dashboard
            if ($user->role === 'admin') {
                return redirect()->route('admin.dashboard');
            } elseif ($user->role === 'eo') {
                return redirect()->route('eo.dashboard');
            }

            // Jika User Biasa: Cek apakah ada URL titipan (intended). 
            // Jika tidak ada, lempar ke beranda (home)
            return redirect()->intended(route('home'));
        }

        return back()->withErrors([
            'email' => 'Email atau password yang Anda masukkan salah.',
        ])->onlyInput('email');
    }

    // Proses Register Pembeli (User)
    public function registerUser(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255', // Ini jadi username
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        // 1. Buat data di tabel users
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'user',
            'status' => 'active',
        ]);

        // 2. Buat relasi kosong di customer_details agar tidak error
        CustomerDetail::create([
            'user_id' => $user->id,
            'full_name' => $request->name, // Jadikan nama lengkap sementara
        ]);

        // 3. Login otomatis
        Auth::login($user);

        // 4. Lempar ke halaman Event (jika sebelumnya ngeklik event) atau ke Home
        return redirect()->intended(route('home'));
    }

    // Proses Register Event Organizer (EO)
    public function registerEo(Request $request)
    {
        // Pastikan validasinya sesuai dengan form React Anda
        $request->validate([
            'organizer_name' => 'required|string|max:255',
            'pic_name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'phone' => 'required|string|max:20',
            'password' => 'required|confirmed|min:8',
        ]);

        // Ambil data User biasa yang sedang login saat ini
        $parentUser = $request->user();

        // Buat Akun EO Baru yang terikat ke User tersebut
        User::create([
            'name' => $request->organizer_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'eo',
            'status' => 'pending',
            'parent_user_id' => $parentUser->id, // 👈 Ini kunci utamanya!
        ]);

        // Logout user saat ini agar mereka bisa login pakai akun EO yang baru
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        // Redirect ke halaman login dengan pesan sukses
        return redirect()->route('login')
            ->with('success', 'Akun EO berhasil dibuat. Silakan login menggunakan email EO Anda.');
    }
    // Proses Logout
    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('home');
    }
}