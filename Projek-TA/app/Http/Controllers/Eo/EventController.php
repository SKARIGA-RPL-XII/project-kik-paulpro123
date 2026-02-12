<?php

namespace App\Http\Controllers\Eo;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
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
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'required|date|after_or_equal:now',
            'end_date' => 'required|date|after:start_date',
            'location' => 'required|string|max:255',
            'images' => 'nullable|array|max:3',
            'images.*' => 'image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $validator->after(function ($validator) use ($request) {
            $start = Carbon::parse($request->start_date);
            $end = Carbon::parse($request->end_date);

            if ($start->diffInMinutes($end) < 120) {
                $validator->errors()->add(
                    'end_date',
                    'Durasi event minimal 120 menit (2 jam).'
                );
            }
        });

        $validated = $validator->validate();

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
        return redirect()->route('eo.events.index')->with('success', 'Event berhasil dibuat');
    }

    public function update(Request $request, Event $event)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'required|date|after_or_equal:now',
            'end_date' => 'required|date|after:start_date',
            'location' => 'required|string|max:255',
            'images' => 'nullable|array|max:3',
            'images.*' => 'image|mimes:jpg,jpeg,png,webp|max:2048',
            'existing_images' => 'nullable|array',
        ]);

        $validator->after(function ($validator) use ($request) {
            $start = Carbon::parse($request->start_date);
            $end = Carbon::parse($request->end_date);

            if ($start->diffInMinutes($end) < 120) {
                $validator->errors()->add(
                    'end_date',
                    'Durasi event minimal 120 menit (2 jam).'
                );
            }
        });

        $validated = $validator->validate();

        $event->update([
            'title' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'start_date' => Carbon::parse($validated['start_date']),
            'end_date' => Carbon::parse($validated['end_date']),
            'location' => $validated['location'],
        ]);

        $existingImageIds = $request->existing_images ?? [];

        // Hapus gambar lama yang tidak dipertahankan
        foreach ($event->images as $image) {
            if (!in_array($image->id, $existingImageIds)) {
                Storage::disk('public')->delete($image->image);
                $image->delete();
            }
        }

        $currentImageCount = $event->images()->count();

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {

                // Batasi maksimal 3 gambar
                if ($currentImageCount >= 3) {
                    break;
                }

                $path = $image->store('event-images', 'public');

                $event->images()->create([
                    'image' => $path,
                ]);

                $currentImageCount++;
            }
        }
        return redirect()->route('eo.events.index')->with('success', 'Event berhasil diperbarui');
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