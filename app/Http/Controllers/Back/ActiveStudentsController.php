<?php

namespace App\Http\Controllers\Back;

use App\Http\Controllers\Controller;
use App\Models\ActiveStudents;
use App\Models\Settings;
use App\Models\Students;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Maatwebsite\Excel\Facades\Excel;

class ActiveStudentsController extends Controller
{

    public function index() {
        $setting = Settings::first();
        $activeStudentFind = ActiveStudents::where("school_year", $setting->school_year)->get();

        return view("pages.active-student.index",[
            "active_students" => $activeStudentFind
        ]);
    }

     public function create(Request $request)
    {
        $validasi = $request->validate([
            "school_year" => "required",
            "generation" => "required",
            "class" => "required",
        ]);

        $student_id = Students::where("nis", $request->id_number)->first();

        if ($student_id == null) {
            Session::flash("error", "Siswa dengan NIS $request->id_number tidak di temukan!");
            return redirect()->back();
        }
        $validasi["student_id"] = $student_id->id;

        $res = ActiveStudents::create($validasi);
        if ($res) {
            Session::flash("success", "Data berhasil masuk ke database");
            return redirect()->back();
        }

        Session::flash("error", "Data gagal masuk ke database!");
        return redirect()->back();
    }

    public function update(Request $request, $id)
    {
        $activeStudent = ActiveStudents::findOrFail($id);

        if ($request->id_number != null) {
            $student_id = Students::where("id_number", $request->id_number)->first();

            if ($student_id == null) {
                Session::flash("error", "Siswa dengan NIS $request->id_number tidak di temukan!");
                return redirect()->back();
            }

            $res = $activeStudent->update([
                "school_year" => $request->school_year,
                "generation" => $request->generation,
                "class" => $request->class,
                "student_id" => $student_id->id
            ]);
        }

        $res = $activeStudent->update([
            "school_year" => $request->school_year,
            "generation" => $request->generation,
            "class" => $request->class,
        ]);

        if ($res) {
            Session::flash("success", "Data berhasil di update");
            return redirect()->back();
        }

        Session::flash("error", "Data gagal di update");
        return redirect()->back();
    }




    public function delete($id)
    {
        $activeStudent = ActiveStudents::findOrFail($id);
        $activeStudent->delete();

        if ($activeStudent) {
            Session::flash("success", "Siswa active berhasil di hapus");
            return redirect()->back();
        }
        Session::flash("success", "Siswa active gagal di hapus");
        return redirect()->back();
    }


}
