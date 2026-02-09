<?php

namespace App\Http\Controllers\Eo;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Carbon\Carbon;
use App\Models\EventImage;

class EventController extends Controller
{
    public function index()
    {
        $events = Event::where('eo_id', Auth::id())
            ->with('images')
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
            'images' => 'nullable|array|max:3',
            'images.*' => 'image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $event = Event::create([
            'eo_id' => Auth::id(),
            'title' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'start_date' => Carbon::parse($validated['start_date']),
            'end_date' => Carbon::parse($validated['end_date']),
            'location' => $validated['location'],
            'status' => 'draft',
        ]);

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('event-images', 'public');

                $event->images()->create([
                    'image' => $path,
                ]);
            }
        }

        return back()->with('success', 'Event berhasil dibuat');
    }

    public function update(Request $request, Event $event)
    {
        $event->update($request->only([
            'title',
            'description',
            'location',
            'start_date',
            'end_date',
        ]));

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('event-images', 'public');

                $event->images()->create([
                    'image' => $path,
                ]);
            }
        }

        return back();
    }

    public function destroy(Event $event)
    {
        foreach ($event->images as $image) {
            Storage::disk('public')->delete($image->image);
        }

        $event->images()->delete();
        $event->delete();

        return back();
    }

    public function destroyImage(EventImage $image)
    {
        Storage::disk('public')->delete($image->image);
        $image->delete();

        return back();
    }
}