<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Students;
use Illuminate\Http\Request;

class StudentsController extends Controller
{
    public function index()
    {
        try {
            $students = Students::all();

            // Format data for response
            $data = $students->map(function ($student) {
                return [
                    "id" => $student->id,
                    "user_id" => $student->user_id,
                    "id_number" => $student->id_number,
                    "name" => $student->name,
                    "address" => $student->address,
                    "phone_number" => $student->phone_number,
                    "created_at" => $student->created_at,
                    "updated_at" => $student->updated_at,
                ];
            });

            return response()->json([
                "status" => "success",
                "message" => "Students fetched successfully",
                "data" => $data
            ]);
        } catch (\Exception $e) {
            return response()->json([
                "status" => "error",
                "message" => "An error occurred while fetching students.",
                "error" => $e->getMessage()
            ], 500);
        }
    }
}
