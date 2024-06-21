<?php

namespace App\Http\Resources;

use App\Models\ActiveStudents;
use App\Models\Items;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ScanQRLoanResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $activeStudent = ActiveStudents::with("student")->find($this->active_student_id);
        $item = Items::with("category")->find($this->item_id);
        return [
            "id" => $this->id,
            "student" => $activeStudent->student,
            "item" => $item,
            "loan_date" => $this->loan_date,
            "retrun_date" => $this->return_date,
            "teacher" => $this->teacher,
            "status" => $this->status,
        ];
    }
}
