<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Items extends Model
{
    use HasFactory;

    protected $table = "items";

    protected $guarded = [];

    /**
     * Get the category that owns the item.
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Categories::class, 'categories_id');
    }

}
