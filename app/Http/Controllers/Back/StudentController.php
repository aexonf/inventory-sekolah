<?php

namespace App\Http\Controllers\Back;

use App\Http\Controllers\Controller;
use App\Imports\StudentImport;
use App\Models\Students;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Validator;
use Maatwebsite\Excel\Facades\Excel;

class StudentController extends Controller
{

    public function index() {
        return view("pages.student.index", [
            "students" => Students::all()
        ]);
    }

    public function create(Request $request) {
        $validators = Validator::make($request->all(), [
            "username" => "required",
            "name" => "required",
            "password" => "required",
            "email" => "required",
            "address" => "required",
            "phone_number" => "required",
            "status" => "required",
            "id_number" => "required",
        ]);

        if ($validators->fails()) {
            return redirect()->back()->with("error", "Something went wrong". $validators->errors());
        }


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
            "name" => $request->name,
            "address" => $request->address,
            "phone_number" => $request->phone_number,
            "id_number" => $request->id_number,
        ]);

        if ($student) {
            return redirect()->back()->with("success", "Data saved successfully");
        }

        return redirect()->back()->with("error", "Something went wrong");

    }

    public function update(Request $request, $id)
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
            "name" => $request->name,
            "address" => $request->address,
            "phone_number" => $request->phone_number,
            "id_number" => $request->id_number,
        ]);
        // mengudate data user
        $user->update([
            "username" => $request->username,
            "password" => Hash::make($request->password),
            "email" => $request->email,
            "role" => "student",
            "status" => $request->status,
        ]);

        if ($student || $user) {
            Session::flash("success", "data berhasil di update");
            return redirect()->back();
        }

        Session::flash("error", "data gagal di update");
        return redirect()->back();
    }

    public function delete($id)
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
