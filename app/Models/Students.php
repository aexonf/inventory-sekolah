<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Students extends Model
{
    use HasFactory;

    protected $table = 'students';


    protected $guarded = [];


    /**
     * Get the user that owns the Students
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(): HasOne
    {
        return $this->HasOne(User::class);
    }

    public function activeStudents()
    {
        return $this->hasMany(ActiveStudents::class, 'student_id', 'id');
    }
}
