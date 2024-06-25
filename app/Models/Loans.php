<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Laravel\Sanctum\HasApiTokens;

class Loans extends Model
{
    use HasFactory, HasApiTokens;

    protected $guarded = [];
    protected $table = 'loans';

    public function item(): BelongsTo
    {
        return $this->belongsTo(Items::class);
    }


    public function activeStudents(): BelongsTo
    {
        return $this->belongsTo(ActiveStudents::class);
    }

}
