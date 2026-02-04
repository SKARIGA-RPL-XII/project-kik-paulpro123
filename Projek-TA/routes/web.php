<?php

use App\Http\Controllers\EO\RegisterEOController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Laravel\Fortify\Features;

/*
|--------------------------------------------------------------------------
| PUBLIC
|--------------------------------------------------------------------------
*/
Route::get('/', function () {
    return Inertia::render('dashboard', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

/*
|--------------------------------------------------------------------------
| LOGIN (VIEW ONLY – TIDAK MERUSAK FORTIFY)
|--------------------------------------------------------------------------
*/
Route::middleware('guest')->get('/login', function () {
    return Inertia::render('auth/login');
})->name('login');

/*
|--------------------------------------------------------------------------
| USER & EO AREA (AUTH)
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'verified'])->group(function () {

    /**
     * 🔑 DASHBOARD (ROLE AWARE)
     * - user  -> dashboard (lama, tidak rusak)
     * - eo    -> eo/dashboard
     * - admin -> admin/dashboard
     */
    Route::get('/dashboard', function () {
        $user = Auth::user();

        if ($user->role === 'eo') {
            return Inertia::render('eo/dashboard', [
                'status' => $user->status,
            ]);
        }

        if ($user->role === 'admin') {
            return Inertia::render('admin/dashboard');
        }

        // DEFAULT USER (TIDAK DIUBAH)
        return Inertia::render('dashboard');
    })->name('dashboard');

    /*
    |--------------------------------------------------------------------------
    | USER ROUTE (AMAN)
    |--------------------------------------------------------------------------
    */
    Route::get('/user', function () {
        return Inertia::render('user/ticket_event');
    })->name('tickets');

    Route::get('/user/{id}', function ($id) {
        return Inertia::render('user/detail_event', [
            'id' => $id,
        ]);
    });

    /*
    |--------------------------------------------------------------------------
    | REGISTER EO (USER → CREATE EO ACCOUNT)
    |--------------------------------------------------------------------------
    */
    Route::get('/register/eo', function () {
        return Inertia::render('auth/register-eo');
    })->name('register.eo.form');

    Route::post('/register/eo', [RegisterEOController::class, 'store'])
        ->name('register.eo');
});

/*
|--------------------------------------------------------------------------
| LOGOUT
|--------------------------------------------------------------------------
*/
Route::post('/logout', function (Request $request) {
    Auth::logout();

    $request->session()->invalidate();
    $request->session()->regenerateToken();

    return redirect()->route('home');
})->middleware('auth')->name('logout');

/*
|--------------------------------------------------------------------------
| SETTINGS
|--------------------------------------------------------------------------
*/
require __DIR__ . '/settings.php';