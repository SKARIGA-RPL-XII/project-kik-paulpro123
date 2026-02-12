<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'eo_id',
        'title',
        'description',
        'start_date',
        'end_date',
        'location',
        'status',
    ];
    protected $casts = [
        'start_date' => 'datetime',
        'end_date' => 'datetime',
    ];

    public function eo()
    {
        return $this->belongsTo(User::class, 'eo_id');
    }

    public function images()
    {
        return $this->hasMany(EventImage::class);
    }
    public function tickets()
    {
        return $this->hasMany(Ticket::class);
    }
}