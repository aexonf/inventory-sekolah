<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProfileResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    public function profile()
    {
        $user = Auth::user();
        
        if (!$user) {
            return response()->json([
                "status" => "error",
                "message" => "User is not authenticated."
            ], 401);
        }

        $user = User::with('student.activeStudents')->where("id", $user->id)->first();

        // Check the user's role
        if ($user->role === 'admin' || $user->role === 'teacher') {
            return $this->getProfileData($user);
        }

        // If the user's role is student, check if they are an active student
        if ($user->role === 'student') {
            $lastActiveStudent = $user->student->activeStudents()->latest()->first();

            if (!$user->student || !$lastActiveStudent) {
                return response()->json([
                    "status" => "error",
                    "message" => "User is not an active student. Please register as an active student."
                ], 403);
            }

            return $this->getProfileData($user, $lastActiveStudent);
        }

        return response()->json([
            "status" => "error",
            "message" => "Unauthorized access."
        ], 403);
    }

    private function getProfileData($user, $lastActiveStudent = null)
    {
        // Default values for non-student roles
        $data = [
            "id" => $user->id,
            "name" => $user->username,
            "id_number" => null,
            "address" => null,
            "phone_number" => null,
            "email" => $user->email,
            "status" => $user->status,
            "class" => null,
            "generation" => null,
            "school_year" => null,
        ];

        // Override values if user is a student and has an active student record
        if ($lastActiveStudent) {
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
        }

        // Convert the array to an object to prevent the "Attempt to read property \"id\" on array" error
        $data = (object)$data;

        return response()->json([
            "status" => "success",
            "message" => "Profile fetched successfully",
            "data" => new ProfileResource($data)
        ]);
    }
}
