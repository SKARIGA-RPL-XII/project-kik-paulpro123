<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\EventOrganizer;
use Illuminate\Support\Facades\DB;
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
        ->map(fn ($eo) => [
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
}