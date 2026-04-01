<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\Eo\EventController;
use App\Http\Controllers\Eo\EoTicketController;
use App\Http\Controllers\Eo\EoOrderController;
use App\Http\Controllers\Eo\EoDashboardController;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\PaymentProviderController;
use App\Http\Controllers\Admin\AdminTransactionController;
use App\Http\Controllers\Admin\AdminChatbotController;
use App\Http\Controllers\User\CheckoutController;
use App\Http\Controllers\User\SummaryController;
use App\Http\Controllers\User\UserController;
use App\Http\Controllers\User\PaymentController;
use App\Http\Controllers\User\UserTicketController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

// ==========================================
// 1. PUBLIC ROUTES & RUTE JEMBATAN
// ==========================================
Route::get('/', [UserController::class, 'index'])->name('home');
Route::get('/events/{event}', [UserController::class, 'show'])->name('user.events.show');

// Rute Jembatan (Klik Event -> Register -> Balik ke Event)
Route::get('/go-to-event/{id}', function ($id) {
    session(['url.intended' => "/events/{$id}"]);
    return redirect()->route('register'); 
})->name('event.redirect');


// ==========================================
// 2. GUEST AUTHENTICATION (BELUM LOGIN)
// ==========================================
Route::middleware('guest')->group(function () {
    // Tampilan Form
    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
    Route::get('/register', [AuthController::class, 'showRegisterUser'])->name('register');

    // Proses Submit Data
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'registerUser']);
});


// ==========================================
// 3. LOGIKA DASHBOARD & USER UMUM (SUDAH LOGIN)
// ==========================================
Route::middleware(['auth', 'verified'])->group(function () {
    
    // Proses Logout
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
    
    // Polisi Lalu Lintas Role (Distributor Dashboard)
    Route::get('/dashboard', function () {
        $user = Auth::user();

        if ($user->role === 'eo') {
            return Inertia::render('eo/dashboard', ['status' => $user->status]);
        }
        if ($user->role === 'admin') {
            return Inertia::render('admin/dashboard');
        }

        return app(UserController::class)->index(); // Default User
    })->name('dashboard');

    // ==========================================
    // PENDAFTARAN EO (WAJIB LOGIN SEBAGAI USER DULU)
    // ==========================================
    Route::get('/register/eo', [AuthController::class, 'showRegisterEo'])->name('register.eo.form');
    Route::post('/register/eo', [AuthController::class, 'registerEo'])->name('register.eo');

    // User Tiket
    Route::get('/tickets', [UserTicketController::class, 'index']);
    Route::get('/tickets/{id}', [UserTicketController::class, 'show']);

    // Checkout & Pembayaran (User)
    Route::prefix('checkout')->group(function () {
        Route::get('/customer', [CheckoutController::class, 'customer']);
        Route::post('/customer', [CheckoutController::class, 'storeCustomer']);
        Route::get('/summary', [SummaryController::class, 'summary']);
    });

    Route::post('/checkout', [CheckoutController::class, 'checkout']);
    Route::post('/checkout/create-order', [CheckoutController::class, 'createOrder']);
    Route::get('/checkout/payment/{id}', [PaymentController::class, 'paymentPage']);
    Route::post('/checkout/verify-payment', [PaymentController::class, 'verify']);
    Route::get('/checkout/success', [PaymentController::class, 'success']);
    Route::get('/checkout/failed/{orderId}', [PaymentController::class, 'failed'])->name('checkout.failed');
});


// ==========================================
// 4. EVENT ORGANIZER (EO) ROUTES
// ==========================================
Route::middleware(['auth', 'verified', 'role:eo'])
    ->prefix('eo')
    ->name('eo.')
    ->group(function () {
        Route::get('/dashboard', [EoDashboardController::class, 'index'])->name('dashboard');

        // Form Event
        Route::get('/manage-event/create', function () {
            return Inertia::render('eo/event-form');
        });
        Route::get('/manage-event/{event}/edit', function (\App\Models\Event $event) {
            return Inertia::render('eo/event-form', ['event' => $event->load('images')]);
        });

        // Kelola Event
        Route::get('/manage-event', [EventController::class, 'index'])->name('events.index');
        Route::post('/manage-event', [EventController::class, 'store'])->name('events.store');
        Route::put('/manage-event/{event}', [EventController::class, 'update'])->name('events.update');
        Route::delete('/manage-event/{event}', [EventController::class, 'destroy'])->name('events.destroy');
        Route::delete('/event-image/{image}', [EventController::class, 'destroyImage'])->name('events.images.destroy');

        // Kelola Ticket
        Route::get('/events/{event}/tickets', [EoTicketController::class, 'index'])->name('events.tickets.index');
        Route::post('/events/{event}/tickets', [EoTicketController::class, 'store'])->name('events.tickets.store');
        Route::put('/tickets/{ticket}', [EoTicketController::class, 'update'])->name('tickets.update');
        Route::delete('/tickets/{ticket}', [EoTicketController::class, 'destroy'])->name('tickets.destroy');

        // Kelola Customer list
        Route::get('/customers', [EoOrderController::class, 'customerList'])->name('customers.index');

        // Payment Settings
        Route::get('/payment-methods', [EoOrderController::class, 'paymentIndex'])->name('payment-methods.index');
        Route::get('/payment-methods/create', [EoOrderController::class, 'paymentCreate'])->name('payment-methods.create');
        Route::post('/payment-methods', [EoOrderController::class, 'paymentStore'])->name('payment-methods.store');
        Route::get('/payment-methods/{id}/edit', [EoOrderController::class, 'paymentEdit'])->name('payment-methods.edit');
        Route::put('/payment-methods/{id}', [EoOrderController::class, 'paymentUpdate'])->name('payment-methods.update');
        Route::delete('/payment-methods/{id}', [EoOrderController::class, 'paymentDestroy'])->name('payment-methods.destroy');
    });


// ==========================================
// 5. ADMIN ROUTES
// ==========================================
Route::middleware(['auth', 'role:admin'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {
        // Dashboard Admin
        Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');
        
        // Kelola Akun
        Route::get('/manage-akun', [AdminController::class, 'index'])->name('accounts');

        // Verifikasi EO
        Route::get('/akun-approval', [AdminController::class, 'eoApproval'])->name('accounts.approval');
        Route::post('/eo/{eo}/approve', [AdminController::class, 'approveEO'])->name('eo.approve');
        Route::post('/eo/{eo}/reject', [AdminController::class, 'rejectEO'])->name('eo.reject');

        // Verifikasi Event
        Route::get('/event-approval', [AdminController::class, 'eventApproval'])->name('events.index');
        Route::patch('/events/{event}/publish', [AdminController::class, 'publish'])->name('events.publish');
        Route::patch('/events/{event}/reject', [AdminController::class, 'reject'])->name('events.reject');

        // Kelola Metode Pembayaran Global
        Route::get('/payment-providers', [PaymentProviderController::class, 'index'])->name('payment-providers.index');
        Route::get('/payment-providers/create', [PaymentProviderController::class, 'create'])->name('payment-providers.create');
        Route::post('/payment-providers', [PaymentProviderController::class, 'store'])->name('payment-providers.store');
        Route::put('/payment-providers/{paymentProvider}', [PaymentProviderController::class, 'update'])->name('payment-providers.update');
        Route::delete('/payment-providers/{paymentProvider}', [PaymentProviderController::class, 'destroy'])->name('payment-providers.destroy');

        // Transaksi Global
        Route::get('/transactions', [AdminTransactionController::class, 'index'])->name('admin.transactions');

        // Chatbot AI
        Route::post('/chat', [AdminChatbotController::class, 'chat'])->name('chat');
    });

// Settings Bawaan Fortify/Lainnya
require __DIR__ . '/settings.php';