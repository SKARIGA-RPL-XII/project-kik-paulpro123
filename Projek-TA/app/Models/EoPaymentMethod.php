<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EoPaymentMethod extends Model
{
    protected $fillable = ['user_id', 'provider_name', 'account_number', 'account_name'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}