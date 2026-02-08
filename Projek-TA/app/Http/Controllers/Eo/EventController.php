<?php

namespace App\Http\Controllers\Eo;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class 

EventController extends Controller
{
    public function index()
    {
        $events = Event::where('eo_id', Auth::id())
            ->latest()
            ->get();

        return Inertia::render('eo/manage-event', [
            'events' => $events,
        ]);
    }

public function store(Request $request)
{
    $validated = $request->validate([
        'title' => 'required|string|max:255',
        'description' => 'nullable|string',
        'start_date' => 'required|date',
        'end_date' => 'required|date|after_or_equal:start_date',
        'location' => 'required|string|max:255',
    ]);

    Event::create([
        ...$validated,
        'eo_id' => Auth::id(),
        'status' => 'draft',
    ]);

    return redirect()->back()->with('success', 'Event berhasil dibuat');
}
    public function update(Request $request, Event $event)
    {
        abort_if($event->eo_id !== Auth::id(), 403);

        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'location' => 'required|string|max:255',
            'status' => 'in:draft,published',
        ]);

        $event->update([
            'title' => $request->title,
            'description' => $request->description,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'location' => $request->location,
            'status' => $request->status,
        ]);

        return back()->with('success', 'Event diperbarui');
    }

    public function destroy(Event $event)
    {
        abort_if($event->eo_id !== Auth::id(), 403);

        $event->delete();

        return back()->with('success', 'Event dihapus');
    }
}