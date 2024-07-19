<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Temporary extends Model
{
    use HasFactory;

    protected $table = 'temporary';

    protected $fillable = [
        'name',
        'number_id',
        'phone',
        'student_class',
        'level',
        'item_name',
        'item_id',
        'item_number_id',
    ];
}
