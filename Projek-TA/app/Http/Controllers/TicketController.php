<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TicketController extends Controller
{
    public function buy($eventId)
    {
        // sementara test dulu
        return "User login, lanjut beli tiket event ID: " . $eventId;
    }
}
