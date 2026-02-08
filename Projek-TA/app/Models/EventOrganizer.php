<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EventOrganizer extends Model
{
    protected $table = 'event_organizers';
    protected $fillable = [
        'user_id',
        'company_name',
        'phone',
        'address',
        'verification_status'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}