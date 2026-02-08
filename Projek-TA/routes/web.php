<?php
use App\Http\Controllers\Eo\RegisterEOController;
use App\Http\Controllers\Eo\EventController;
use App\Http\Controllers\Admin\AdminController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Laravel\Fortify\Features;

// Public Routes
Route::get('/', function () {
    return Inertia::render('dashboard', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

// Login
Route::middleware('guest')->get('/login', function () {
    return Inertia::render('auth/login');
})->name('login');

// Login 3 Role
Route::middleware(['auth', 'verified'])->group(function () {

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

    // User Routes
    Route::get('/user', function () {
        return Inertia::render('user/ticket_event');
    })->name('tickets');

    Route::get('/user/{id}', function ($id) {
        return Inertia::render('user/detail_event', [
            'id' => $id,
        ]);
    });

    // Register EO Routes
    Route::get('/register/eo', function () {
        return Inertia::render('auth/register-eo');
    })->name('register.eo.form');

    Route::post('/register/eo', [RegisterEOController::class, 'store'])
        ->name('register.eo');
});

// EO Routes
Route::middleware(['auth', 'verified', 'role:eo'])
    ->prefix('eo')
    ->name('eo.')
    ->group(function () {

        Route::get('/manage-event', [EventController::class, 'index'])->name('events.index');
        Route::post('/manage-event', [EventController::class, 'store'])->name('events.store');
        Route::put('/manage-event{event}', [EventController::class, 'update'])->name('events.update');
        Route::delete('/manage-event{event}', [EventController::class, 'destroy'])->name('events.destroy');

    });

// Admin Routes
Route::middleware(['auth', 'role:admin'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {

        Route::get('/dashboard', function () {
            return Inertia::render('admin/dashboard');
        })->name('dashboard');

        Route::get('/manage-akun', [AdminController::class, 'index'])
            ->name('accounts');


        Route::get('/akun-approval', [AdminController::class, 'eoApproval'])
            ->name('accounts.approval');

        Route::post('/eo/{eo}/approve', [AdminController::class, 'approveEO'])
            ->name('eo.approve');

        Route::post('/eo/{eo}/reject', [AdminController::class, 'rejectEO'])
            ->name('eo.reject');
    });

// Logout
Route::post('/logout', function (Request $request) {
    Auth::logout();

    $request->session()->invalidate();
    $request->session()->regenerateToken();

    return redirect()->route('home');
})->middleware('auth')->name('logout');

// Setinggs
require __DIR__ . '/settings.php';