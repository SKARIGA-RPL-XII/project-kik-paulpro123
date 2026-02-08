<?php 
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class EoApproved
{
    public function handle(Request $request, Closure $next)
    {
        $user = request()->user();

        if ($user->role === 'eo' && $user->status !== 'active') {
            abort(403, 'Akun EO belum diverifikasi admin');
        }

        return $next($request);
    }
}