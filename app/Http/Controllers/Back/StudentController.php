<?php

namespace App\Http\Controllers\Back;

use App\Http\Controllers\Controller;
use App\Imports\StudentImport;
use App\Models\Students;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
use Maatwebsite\Excel\Facades\Excel;

class StudentController extends Controller
{


    public function create(Request $request) {
        $request->validate([
            "username" => "required",
            "name" => "required",
            "password" => "required",
            "email" => "required",
        ]);


        // create student and user
        $user = User::create([
            "username" => $request->username,
            "password" => Hash::make($request->password),
            "email" => $request->email,
            "role" => "student",
            "status" => "active"
        ]);

        $student = Students::create([
            "user_id" => $user->id,
            "name" => $request->name
        ]);

        if ($student) {
            return redirect()->back()->with("success", "Data saved successfully");
        }

        return redirect()->back()->with("error", "Something went wrong");

    }

    public function updateStudent(Request $request, $id)
    {
        /*
      1. mencari id student dari request parameters
      2. mencari id usersnya
      3. update
      */
        $student = Students::where("id", $id)->first();
        $user = User::where("id", $student->user_id)->first();

        //mengupdate student
        $student->update([
            "id_number" => $request->id_number,
            "name" => $request->name,
            "status" => $request->status,
            "role" => $request->role,
        ]);
        // mengudate data user
        $user->update([
            "username" => $request->username,
            "password" => Hash::make($request->password),
        ]);

        if ($student || $user) {
            Session::flash("success", "data berhasil di update");
            return redirect()->back();
        }

        Session::flash("error", "data gagal di update");
        return redirect()->back();
    }

    public function deleteStudent($id)
    {
        /*
      1. mencari id student dari request parameters
      2. mencari id usersnya
      3. delete
      */
        $student = Students::where("id", $id)->first();
        $user = User::where("id", $student->user_id)->first();

        //mengupdate student
        $student->delete();
        // mengudate data user
        $user->delete();

        if ($student || $user) {
            Session::flash("success", "data berhasil di hapus");
            return redirect()->back();
        }

        Session::flash("error", "data gagal di hapus");
        return redirect()->back();
    }

    public function import()
    {
        try {
            Excel::import(new StudentImport, request()->file('students_import'));

            return redirect()->route('student.view')->with('success', 'Data Siswa berhasil diimport!');
        } catch (\Throwable $e) {
            dd($e->getMessage());
            return redirect()->route('student.view')->with('error', "Data Siswa gagal diimport!");
        }
    }



}
