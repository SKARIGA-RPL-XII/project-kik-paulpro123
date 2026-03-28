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

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function event()
    {
        return $this->belongsTo(Event::class);
    }
    
    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }
}