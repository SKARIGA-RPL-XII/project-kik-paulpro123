<?php
namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\EoPaymentMethod;
use Laravel\Fortify\Features;

class UserController extends Controller
{
    public function index()
    {
        $events = Event::where('status', 'published')
            ->where('start_date', '>=', now())
            ->with('images')
            ->withMin([
                'tickets as lowest_price' => function ($query) {
                    $query->where('status', 'active')
                        ->whereColumn('kuota', '>', 'sold');
                }
            ], 'price')
            ->latest()
            ->get();

        return inertia('dashboard', [
            'events' => $events,
            'canregister' => Features::enabled((Features::registration())),
        ]);
    }
    public function show(Event $event)
    {
        // 1. Pastikan event sudah di-publish
        abort_if($event->status !== 'published', 404);

        // 2. LOGIKA PENCATATAN PENGUNJUNG (VIEWS)
        // Buat kunci sesi unik berdasarkan ID event
        $sessionKey = 'viewed_event_' . $event->id;

        // Cek apakah di sesi browser ini user sudah pernah melihat event ini
        if (!session()->has($sessionKey)) {
            $event->increment('views'); // Tambah +1 di database
            session()->put($sessionKey, true); // Tandai di sesi agar tidak dihitung ganda saat di-refresh
        }

        $event->load([
            'images',
            'tickets' => function ($query) {
                $query->where('status', 'active')
                    ->whereColumn('kuota', '>', 'sold')
                    ->orderBy('price', 'asc');
            }
        ]);

        $isPaymentReady = EoPaymentMethod::where('user_id', $event->eo_id)->exists();

        return inertia('user/detail_event', [
            'event' => $event,
            'is_payment_ready' => $isPaymentReady,
        ]);
    }
    public function events()
    {
        return $this->index();
    }
}