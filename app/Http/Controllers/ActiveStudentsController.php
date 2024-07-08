<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\ActiveStudents;
use App\Models\Students;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ActiveStudentsController extends Controller
{
    public function index(Request $request)
    {
        try {
            $activeStudents = ActiveStudents::all();

            return response()->json([
                "status" => "success",
                "message" => "Active students fetched successfully",
                "data" => $activeStudents
            ]);
        } catch (\Exception $e) {
            return response()->json([
                "status" => "error",
                "message" => "An error occurred while fetching active students.",
                "error" => $e->getMessage()
            ], 500);
        }
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'school_year' => 'required',
            'generation' => 'required',
            'class' => 'required',
            'id_number' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                "status" => "error",
                "message" => $validator->errors()->all(),
            ], 400);
        }

        try {
            $student = Students::where('id_number', $request->id_number)->first();

            if (!$student) {
                return response()->json([
                    "status" => "error",
                    "message" => "Student with ID number {$request->id_number} not found!",
                ], 404);
            }

            $activeStudent = ActiveStudents::create([
                'school_year' => $request->school_year,
                'generation' => $request->generation,
                'class' => $request->class,
                'student_id' => $student->id,
            ]);

            return response()->json([
                "status" => "success",
                "message" => "Active student created successfully",
                "data" => $activeStudent
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                "status" => "error",
                "message" => "An error occurred while creating active student.",
                "error" => $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'school_year' => 'required',
            'generation' => 'required',
            'class' => 'required',
            'id_number' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                "status" => "error",
                "message" => $validator->errors()->all(),
            ], 400);
        }

        try {
            $activeStudent = ActiveStudents::find($id);

            if (!$activeStudent) {
                return response()->json([
                    "status" => "error",
                    "message" => "Active student not found.",
                ], 404);
            }

            $student = Students::where('id_number', $request->id_number)->first();

            if (!$student) {
                return response()->json([
                    "status" => "error",
                    "message" => "Student with ID number {$request->id_number} not found!",
                ], 404);
            }

            $activeStudent->update([
                'school_year' => $request->school_year,
                'generation' => $request->generation,
                'class' => $request->class,
                'student_id' => $student->id,
            ]);

            return response()->json([
                "status" => "success",
                "message" => "Active student updated successfully",
                "data" => $activeStudent
            ]);
        } catch (\Exception $e) {
            return response()->json([
                "status" => "error",
                "message" => "An error occurred while updating active student.",
                "error" => $e->getMessage()
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $activeStudent = ActiveStudents::find($id);

            if (!$activeStudent) {
                return response()->json([
                    "status" => "error",
                    "message" => "Active student not found.",
                ], 404);
            }

            $activeStudent->delete();

            return response()->json([
                "status" => "success",
                "message" => "Active student deleted successfully",
            ]);
        } catch (\Exception $e) {
            return response()->json([
                "status" => "error",
                "message" => "An error occurred while deleting active student.",
                "error" => $e->getMessage()
            ], 500);
        }
    }
}
