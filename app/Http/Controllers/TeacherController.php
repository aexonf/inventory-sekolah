<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Teachers;
use Illuminate\Http\Request;

class TeacherController extends Controller
{
    public function index()
    {
        try {
            $teachers = Teachers::all();

            // Format data for response
            $data = $teachers->map(function ($teacher) {
                return [
                    "id" => $teacher->id,
                    "user_id" => $teacher->user_id,
                    "id_number" => $teacher->id_number,
                    "name" => $teacher->name,
                    "created_at" => $teacher->created_at,
                    "updated_at" => $teacher->updated_at,
                    "image" => $teacher->image,
                ];
            });

            return response()->json([
                "status" => "success",
                "message" => "Teachers fetched successfully",
                "data" => $data
            ]);
        } catch (\Exception $e) {
            return response()->json([
                "status" => "error",
                "message" => "An error occurred while fetching teachers.",
                "error" => $e->getMessage()
            ], 500);
        }
    }
}
