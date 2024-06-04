<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Teachers extends Model
{
    use HasFactory;

    protected $table = "teachers";

    protected $guarded = [];


    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
