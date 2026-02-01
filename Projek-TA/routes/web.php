<?php

use App\Http\Controllers\TicketController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('dashboard', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::get('/login', function () {
    return inertia('auth/login');
})->name('login');

Route::get('/event/{id}', function ($id) {
    return inertia('event/detail_event', ['id' => $id]);
});

Route::post('/ticket/buy/{event}', [TicketController::class, 'buy'])
    ->middleware('auth')
    ->name('ticket.buy');

Route::get('/dashboard', function () {
    return Inertia::render('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');
Route::post('/logout', action: function (Request $request) {
    Auth::logout();

    $request->session()->invalidate();
    $request->session()->regenerateToken();

    return redirect()->route('home');
})->middleware('auth')->name('logout');

require __DIR__ . '/settings.php';