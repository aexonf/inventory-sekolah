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

    public function index(Request $request) {
        $setting = Settings::first();
        $activeStudentQuery = ActiveStudents::query();
        if ($setting){
            $activeStudentQuery->where("school_year", $setting->school_year);
        }else {

            if ($request->has("school_year")) {
                $activeStudentQuery->where("school_year", $request->school_year);
            }else {
                $currentYear = date('Y');
                $previousYear = $currentYear + 1;
                $schoolYear = "{$previousYear}/{$currentYear}";

                $activeStudentQuery->where("school_year", $schoolYear);
            }
        }

        $activeStudentFind = $activeStudentQuery->get();

        return view("pages.active-student.index",[
            "active_students" => $activeStudentFind,
            "request" => $request
        ]);
    }

     public function create(Request $request)
    {
        $validasi = $request->validate([
            "school_year" => "required",
            "generation" => "required",
            "class" => "required",
        ]);

        $student_id = Students::where("id_number", $request->id_number)->first();

        if ($student_id == null) {
            Session::flash("error", "Siswa dengan NIS $request->id_number tidak di temukan!");
            return redirect()->back();
        }

        $res = ActiveStudents::create([
            "school_year" => $validasi['school_year'],
            "generation" => $validasi['generation'],
            "class" => $validasi['class'],
            "student_id" => $student_id->id
        ]);
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
