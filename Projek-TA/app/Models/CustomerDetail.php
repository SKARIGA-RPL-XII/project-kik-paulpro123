<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CustomerDetail extends Model
{
    protected $fillable = [
        'user_id',
        'full_name',
        'phone',
        'gender',
        'birth_date'
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
