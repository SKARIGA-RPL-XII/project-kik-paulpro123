<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules\Password;

class ProfileController extends Controller
{
    // 1. Fungsi untuk Update Username, HP, dan Foto Profil
    public function updateProfile(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        // Validasi input dari React
        $request->validate([
            'name' => 'required|string|max:255', // Di UI namanya Username, di DB tetap name
            'phone' => 'nullable|string|max:20',
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg|max:2048', // Maksimal 2MB
        ]);

        // Update data teks
        $user->name = $request->name;
        $user->phone = $request->phone;

        // Tangani Upload Foto Jika User Memilih Foto Baru
        if ($request->hasFile('avatar')) {
            // Hapus foto lama dari server agar storage tidak penuh
            if ($user->avatar && Storage::disk('public')->exists($user->avatar)) {
                Storage::disk('public')->delete($user->avatar);
            }

            // Simpan foto baru ke folder storage/app/public/avatars
            $path = $request->file('avatar')->store('avatars', 'public');
            $user->avatar = $path;
        }

        $user->save();

        // Mengembalikan response ke Inertia (otomatis refresh data di UI)
        return back()->with('success', 'Profil berhasil diperbarui!');
    }

    // 2. Fungsi untuk Update Password
    public function updatePassword(Request $request)
    {
        $validated = $request->validate([
            'current_password' => ['required', 'current_password'],
            'password' => ['required', 'confirmed', Password::defaults()], // Harus sama dengan password_confirmation
        ]);

        $request->user()->update([
            'password' => Hash::make($validated['password']),
        ]);

        return back()->with('success', 'Password berhasil diubah!');
    }
}