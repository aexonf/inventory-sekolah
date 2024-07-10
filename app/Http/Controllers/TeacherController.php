<?php

namespace App\Http\Controllers;

use App\Models\Teachers;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class TeacherController extends Controller
{
    public function index()
    {
        try {
            $teachers = Teachers::all();

            return response()->json([
                "status" => "success",
                "message" => "Teachers fetched successfully",
                "data" => $teachers
            ]);
        } catch (\Exception $e) {
            return response()->json([
                "status" => "error",
                "message" => "An error occurred while fetching teachers.",
                "error" => $e->getMessage()
            ], 500);
        }
    }

    public function create(Request $request)
    {
        $request->validate([
            "id_number" => "required|numeric",
            "name" => "required",
            "status" => "required",
            "username" => "required",
            "password" => "required",
            "email" => "required|email",
            "image" => "nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048"
        ]);

        try {
            $user = User::create([
                "username" => $request->username,
                "password" => Hash::make($request->password),
                "role" => "teacher",
                "status" => $request->status,
                "email" => $request->email,
            ]);

            $imageName = "";
            if ($request->hasFile('image')) {
                $rand = Str::random(8);
                $fileName = $rand . "-" . $request->file('image')->getClientOriginalName();
                $request->file('image')->storeAs('public/upload/teacher', $fileName);
                $imageName = $fileName;
            }

            $teacher = Teachers::create([
                "id_number" => $request->id_number,
                "name" => $request->name,
                "user_id" => $user->id,
                "image" => $imageName,
            ]);

            return response()->json([
                "status" => "success",
                "message" => "Teacher created successfully",
                "data" => $teacher
            ]);
        } catch (\Exception $e) {
            return response()->json([
                "status" => "error",
                "message" => "An error occurred while creating the teacher.",
                "error" => $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            "id_number" => "required|numeric",
            "name" => "required",
            "image" => "nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048"
        ]);

        try {
            $teacher = Teachers::findOrFail($id);

            if ($request->hasFile('image')) {
                if ($teacher->image && Storage::exists('public/upload/teacher/' . $teacher->image)) {
                    Storage::delete('public/upload/teacher/' . $teacher->image);
                }

                $rand = Str::random(8);
                $fileName = $rand . "-" . $request->file('image')->getClientOriginalName();
                $request->file('image')->storeAs('public/upload/teacher', $fileName);
                $teacher->image = $fileName;
            }

            $teacher->update([
                "id_number" => $request->id_number,
                "name" => $request->name,
                "image" => $teacher->image,
            ]);

            return response()->json([
                "status" => "success",
                "message" => "Teacher updated successfully",
                "data" => $teacher
            ]);
        } catch (\Exception $e) {
            return response()->json([
                "status" => "error",
                "message" => "An error occurred while updating the teacher.",
                "error" => $e->getMessage()
            ], 500);
        }
    }


    public function delete($id)
    {
        try {
            $teacher = Teachers::findOrFail($id);
            $user = User::findOrFail($teacher->user_id);

            if ($teacher->image && Storage::exists('public/upload/teacher/' . $teacher->image)) {
                Storage::delete('public/upload/teacher/' . $teacher->image);
            }

            $teacher->delete();
            $user->delete();

            return response()->json([
                "status" => "success",
                "message" => "Teacher deleted successfully"
            ]);
        } catch (\Exception $e) {
            return response()->json([
                "status" => "error",
                "message" => "An error occurred while deleting the teacher.",
                "error" => $e->getMessage()
            ], 500);
        }
    }
}
