<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProfileResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ProfileController extends Controller
{

    public function profile(){

        $user = User::with('student.activeStudents')->where("id", auth()->user()->id)->first();
        $lastActiveStudent = $user->student->activeStudents()->latest()->first();
        // Check if the user has a student relationship and if the student is active
        if (!$user->student || !$user->student->activeStudents()->exists()) {
            return response()->json([
                "status" => "error",
                "message" => "User is not a student or is not active. Please register as an active student."
            ], 403);
        }

        $data = [
            "id" => $lastActiveStudent->id,
            "name" => $user->student->name,
            "id_number" => $user->student->id_number,
            "address" => $user->student->address,
            "phone_number" => $user->student->phone_number,
            "email" => $user->email,
            "status" => $user->status,
            "class" => $lastActiveStudent->class,
            "generation" => $lastActiveStudent->generation,
            "school_year" => $lastActiveStudent->school_year
        ];

        // Convert the array to an object to prevent the "Attempt to read property \"id\" on array" error
        $data = (object)$data;

        return response()->json([
            "status" => "success",
            "message" => "Profile fetched successfully",
            "data" => new ProfileResource($data)
        ]);
    }

}
