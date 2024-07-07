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

        $activeStudents = ActiveStudents::all();

        return response()->json([
            'success' => true,
            'data' => $activeStudents,
        ]);
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
                'success' => false,
                'message' => $validator->errors()->all(),
            ], 400);
        }


        $student = Students::where('id_number', $request->id_number)->first();

        if (!$student) {
            return response()->json([
                'success' => false,
                'message' => "Siswa dengan NIS {$request->id_number} tidak ditemukan!",
            ], 404);
        }


        $activeStudent = ActiveStudents::create([
            'school_year' => $request->school_year,
            'generation' => $request->generation,
            'class' => $request->class,
            'student_id' => $student->id,
        ]);

        return response()->json([
            'success' => true,
            'data' => $activeStudent,
            'message' => 'Data ActiveStudent berhasil disimpan.',
        ], 201);
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
                'success' => false,
                'message' => $validator->errors()->all(),
            ], 400);
        }

        $activeStudent = ActiveStudents::find($id);

        if (!$activeStudent) {
            return response()->json([
                'success' => false,
                'message' => 'Data ActiveStudent tidak ditemukan.',
            ], 404);
        }

        // Cari siswa berdasarkan id_number
        $student = Students::where('id_number', $request->id_number)->first();

        if (!$student) {
            return response()->json([
                'success' => false,
                'message' => "Siswa dengan NIS {$request->id_number} tidak ditemukan!",
            ], 404);
        }


        $activeStudent->update([
            'school_year' => $request->school_year,
            'generation' => $request->generation,
            'class' => $request->class,
            'student_id' => $student->id,
        ]);

        return response()->json([
            'success' => true,
            'data' => $activeStudent,
            'message' => 'Data ActiveStudent berhasil diupdate.',
        ]);
    }

    public function destroy($id)
    {
        $activeStudent = ActiveStudents::find($id);

        if (!$activeStudent) {
            return response()->json([
                'success' => false,
                'message' => 'Data ActiveStudent tidak ditemukan.',
            ], 404);
        }

        $activeStudent->delete();

        return response()->json([
            'success' => true,
            'message' => 'Data ActiveStudent berhasil dihapus.',
        ]);
    }
}
