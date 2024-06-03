<?php

namespace App\Http\Controllers\Back;

use App\Http\Controllers\Controller;
use App\Models\ActiveStudents;
use App\Models\Loans;
use App\Models\Settings;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class LoanController extends Controller
{

    public function index() {
        $setting = Settings::first();
        $loanFind = Loans::where("teacher_id", auth()->user()->teacher->id)->get();
        $activeStudentFind = ActiveStudents::where("school_year", $setting->school_year)->get();
        return view("", compact("loanFind"));
    }

    public function create(Request $request) {

        $validasi = Validator::make($request->all(), [
            "active_student_id" => "required",
            "item_id" => "required",
            "status" => "required",
        ]);

        if ($validasi->fails()) {
            return redirect()->back()->withErrors($validasi->errors());
        }


        $create = Loans::create([
            "active_student_id" => $validasi["active_student_id"],
            "item_id" => $validasi["item_id"],
            "status" => $validasi["status"],
            "loan_date" => now(),
            "return_date" => $request->return_date,
            "teacher_id" => auth()->user()->teacher->id,
        ]);

        if ($create) {
            return redirect()->back()->with("success", "Successfuly create loan");
        }

        return redirect()->back()->with("error", "Failed to create loan");
    }

    public function update($id, Request $request) {
        $loanFind = Loans::find($id);

        if (!$loanFind) {
            return redirect()->back()->with("error", "Loan not found");
        }

        $updateLoan = Loans::update([
            "active_student_id" => $request->active_student_id,
            "item_id" => $request->item_id,
            "status" => $request->status,
            "loan_date" => $request->loan_date,
            "return_date" => $request->return_date,
        ]);

        if ($updateLoan) {
            return redirect()->back()->with("success", "Successfuly update loan");
        }

        return redirect()->back()->with("error", "Failed to update loan");
    }


    public function delete($id) {
        $loanFind = Loans::find($id);

        if (!$loanFind) {
            return redirect()->back()->with("error", "Loan not found");
        }

       $delete =  $loanFind->delete();

       if ($delete) {
           return redirect()->back()->with("success", "Successfuly delete loan");
       }

       return redirect()->back()->with("error", "Failed to delete loan");
    }

}
