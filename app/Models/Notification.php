<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;

    // Definisikan atribut yang dapat diisi
    protected $fillable = [
        'item_id',
        'user_id',
        'status',
        'borrowed_at',
        'returned_at',
    ];

    // Definisikan relasi dengan model lain
    public function item()
    {
        return $this->belongsTo(Items::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
