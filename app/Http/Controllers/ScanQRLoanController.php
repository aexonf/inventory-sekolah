<?php

namespace App\Http\Controllers;

use App\Http\Resources\ScanQRLoanResource;
use App\Models\Loans;
use Illuminate\Http\Request;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;

/**
 * ScanQRLoanController handles the loan process for students.
 */
class ScanQRLoanController extends Controller
{
    /**
     * Process a loan request for a student.
     *
     * This method validates the request data, checks if the student has an active status,
     * and if the student does not have an existing loan. It then creates a new loan
     * record and returns a success response with the loan details.
     *
     * @param Request $request The request object containing the item ID.
     * @return JsonResponse The response object containing the loan status and details.
     */
    public function loan(Request $request): JsonResponse
    {
        $user = User::with('student.activeStudents')->where("id", auth()->user()->id)->first();
        $lastActiveStudent = $user->student->activeStudents()->latest()->first();
        // Check if the user has a student relationship and if the student is active
        if (!$user->student || !$user->student->activeStudents()->exists()) {
            return response()->json([
                "status" => "error",
                "message" => "User is not a student or is not active. Please register as an active student with the admin.",
                "data" => null
            ], 403);
        }

        // Validate the request data
        $validatedData = $request->validate([
            'item_id' => 'required|exists:items,id',
        ]);

        // Check if the student already has an active loan
        $check = Loans::where("active_student_id", $lastActiveStudent->id)->latest()->first();
        if ($check && ($check->return_date == null || $check->return_date == " ")){
            return response()->json([
                "status" => "error",
                "message" => "Student has already loaned an item",
                "data" => null
            ]);
        }

        $create_loan = Loans::create([
            "item_id" => $validatedData['item_id'],
            "active_student_id" => $lastActiveStudent->id,
            "loan_date" => Carbon::now()->format('Y-m-d H:i:s'),
            "return_date" => null,
            "teacher_id" => null,
            "status" => "borrowed",
        ]);

        if (!$create_loan) {
            abort(500, "Failed to create loan");
        }

        return response()->json([
            "status" => "success",
            "message" => "Successfully loaned an item",
            "data" => new ScanQRLoanResource($create_loan)
        ], 200);
    }
}

