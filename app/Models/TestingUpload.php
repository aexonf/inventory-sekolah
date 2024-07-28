<?php

// app/Models/TestingUpload.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TestingUpload extends Model
{
    use HasFactory;

    protected $fillable = ['name'];
}
