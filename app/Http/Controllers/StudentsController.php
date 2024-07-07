<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Students;

class StudentsController extends Controller
{
    public function index()
    {
        $teachers = Students::all();
        return response()->json($teachers);
    }
}
