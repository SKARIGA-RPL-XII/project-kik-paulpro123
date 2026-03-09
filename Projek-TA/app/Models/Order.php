<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'invoice',
        'user_id',
        'event_id',
        'qty',
        'total_price',
        'payment_method',
        'payment_proof',
        'status',
    ];
}