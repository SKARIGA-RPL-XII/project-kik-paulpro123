<?php

namespace App\Http\Controllers\EO;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class RegisterEOController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'organizer_name' => 'required|string|max:255',
            'pic_name'       => 'required|string|max:255',
            'email'          => 'required|email|unique:users,email',
            'phone'          => 'required|string|max:20',
            'password'       => 'required|confirmed|min:8',
        ]);

        $parentUser = $request->user();

        // ✅ CREATE AKUN EO BARU
        User::create([
            'name'           => $request->organizer_name,
            'email'          => $request->email,
            'password'       => Hash::make($request->password),
            'role'           => 'eo',
            'status'         => 'pending',
            'parent_user_id' => $parentUser->id,
        ]);

        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        // ✅ REDIRECT KE LOGIN
        return redirect()->route('login')
            ->with('success', 'Akun EO berhasil dibuat. Silakan login sebagai EO.');
    }
}