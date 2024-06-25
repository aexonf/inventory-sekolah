<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LoanHistoryItemResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "name" => $this->item ? $this->item->name : null,
            "description_item" => $this->item->description,
            "category" => $this->item->category->name,
            "loan_date" => $this->loan_date,
            "return_date" => $this->return_date,
            "status" => $this->status,
        ];
    }
}
