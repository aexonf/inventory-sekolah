<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Temporary extends Model
{
    use HasFactory;

    protected $table = 'temporary';
    protected $fillable = [
        'user_id',
        'item_id',
        'name',
        'class',
        'number_id',
        'phone',

    ];

    public $timestamps = true;

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function item()
    {
        return $this->belongsTo(Items::class);
    }
}

