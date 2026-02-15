<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
    'user_id',
    'ticket_id',
    'total_price',
    'payment_method',
    'status',
    ];
}
