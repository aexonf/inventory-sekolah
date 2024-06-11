<?php

namespace App\Http\Controllers\Back;

use App\Http\Controllers\Controller;
use App\Mail\BorrowingMail;
use App\Models\ActiveStudents;
use App\Models\Loans;
use App\Models\Settings;
use App\Models\User;
use App\Notifications\EmailNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Notification;
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


    public function notif()
    {

        $user = User::first();

        if (!$user) {
            dd('User not found!');
        }

        $project = [
            'greeting' => 'Hi '.$user->name.',',
            'body' => 'This is the project assigned to you.',
            'thanks' => 'Thank you this is from codeanddeploy.com',
            'actionText' => 'View Project',
            'actionURL' => url('/'),
            'id' => 57
        ];

        // Send the notification to the dynamically fetched email
        $user->notify(new EmailNotification($project));
        // Notification::route('admin.loan.notif', "avinfajar6@gmail.com")->notify(new EmailNotification($project));
        dd('Notification sent!');
    }


}
