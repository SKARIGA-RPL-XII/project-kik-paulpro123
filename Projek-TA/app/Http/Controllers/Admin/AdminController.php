<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\User;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/manage-akun', [
            'users' => User::whereIn('role', ['user', 'eo'])
                ->with('eventOrganizer')
                ->latest()
                ->get()
        ]);
    }
    public function eoApproval()
    {
        $eoRequests = User::query()
            ->where('role', 'eo')
            ->where('status', 'pending')
            ->latest()
            ->get()
            ->map(fn($eo) => [
                'id' => $eo->id,
                'company_name' => $eo->name,
                'user' => [
                    'name' => $eo->name,
                    'email' => $eo->email,
                ],
            ]);

        return Inertia::render('admin/akun-approval', [
            'eoRequests' => $eoRequests,
        ]);
    }
    public function approveEO(User $eo)
    {
        abort_if($eo->role !== 'eo', 404);

        $eo->update([
            'status' => 'active',
        ]);

        return back()->with('success', 'EO berhasil disetujui');
    }
    public function rejectEO(User $eo)
    {
        abort_if($eo->role !== 'eo', 404);

        $eo->update([
            'status' => 'rejected',
        ]);

        return back()->with('error', 'EO ditolak');
    }
    public function publish(Event $event)
    {
        $event->update([
            'status' => 'published',
        ]);

        return inertia::location(url()->previous());
    }
    public function reject(Event $event){
    $event->update(['status' => 'rejected']); 

    return inertia::location(url()->previous());
    }
    public function eventApproval()
    {
        $events = Event::with('eo')
            ->latest()
            ->get();

        return Inertia::render('admin/event-approval', [
            'events' => $events,
        ]);
    }
}