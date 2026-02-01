<?php

namespace App\Http\Responses;

use Illuminate\Support\Facades\Auth;
use Laravel\Fortify\Contracts\RegisterResponse as RegisterResponseContract;

class RegisterResponse implements RegisterResponseContract
{
    public function toResponse($request)
    {
        // Logout user yang baru saja auto-login
        Auth::logout();

        // Redirect ke halaman login
        return redirect()->route('login');
    }
}