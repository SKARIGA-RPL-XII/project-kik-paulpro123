<?php

namespace App\Http\Controllers\Eo;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TicketController extends Controller
{
    public function index(Event $event)
    {
        abort_if($event->eo_id !== Auth::id(), 403);

        return Inertia::render('eo/manage-ticket', [
            'event' => $event->load('tickets'),
        ]);
    }

    public function store(Request $request, Event $event)
    {
        abort_if($event->eo_id !== Auth::id(), 403);

        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'price' => 'required|numeric|min:0',
            'kuota' => 'required|integer|min:1',
        ]);

        $event->tickets()->create([
            'name' => $validated['name'],
            'price' => $validated['price'],
            'kuota' => $validated['kuota'],
            'sold' => 0,
            'status' => 'active',
        ]);

        return back()->with('success', 'Ticket berhasil ditambahkan');
    }

    public function update(Request $request, Ticket $ticket)
    {
        abort_if($ticket->event->eo_id !== Auth::id(), 403);

        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'price' => 'required|numeric|min:0',
            'kuota' => 'required|integer|min:' . $ticket->sold,
            'status' => 'required|in:active,inactive',
        ]);

        $ticket->update($validated);

        return back()->with('success', 'Ticket berhasil diupdate');
    }

    public function destroy(Ticket $ticket)
    {
        abort_if($ticket->event->eo_id !== Auth::id(), 403);

        if ($ticket->sold > 0) {
            return back()->withErrors([
                'ticket' => 'Ticket sudah memiliki penjualan',
            ]);
        }

        $ticket->delete();

        return back()->with('success', 'Ticket berhasil dihapus');
    }
}