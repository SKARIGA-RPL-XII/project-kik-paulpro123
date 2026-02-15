<?php
namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Event;
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
        abort_if($event->status !== 'published', 404);

        $event->load([
            'images',
            'tickets' => function ($query) {
                $query->where('status', 'active')
                    ->whereColumn('kuota', '>', 'sold')
                    ->orderBy('price', 'asc');
            }
        ]);

        return inertia('user/detail_event', [
            'event' => $event,
        ]);
    }
}