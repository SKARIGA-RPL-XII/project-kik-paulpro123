<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\CustomerDetail;
use App\Models\Event;

class SummaryController extends Controller
{
    public function summary()
    {
        $ticket = session('checkout_ticket');
        $customerSession = session('checkout_customer');

        if (!$ticket || !$customerSession) {
            return redirect('/dashboard');
        }

        $customerDetail = CustomerDetail::where('user_id', Auth::id())->first();

        $customer = [
            'full_name' => $customerDetail->full_name ?? '-',
            'phone' => $customerDetail->phone ?? '-',
            'email' => Auth::user()->email ?? '-'
        ];

        $eventModel = Event::with('images')->find($ticket[0]['event_id']);

        $event = [
            'title' => $eventModel->title ?? '-',
            'image' => optional($eventModel->images->first())->image
        ];

        return inertia('user/summary', [
            'ticket' => $ticket,
            'customer' => $customer,
            'event' => $event
        ]);
    }
}