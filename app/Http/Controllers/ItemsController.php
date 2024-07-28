<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Categories;
use App\Models\Items;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class ItemsController extends Controller
{

  public function index(Request $request)
    {
        $itemsQuery = Items::query();

        $items = $itemsQuery->get();

        return response()->json([
            "status" => "success",
            "data" => $items,
        ]);
    }

    public function create(Request $request)
    {
        $request->validate([
            "id_number" => "required",
            "name" => "required",
            "image" => "nullable|image|mimes:jpeg,png,jpg,gif,svg",
            "description" => "nullable|string",
            "category" => "nullable|numeric"
        ]);

        $image = null;

        if ($request->hasFile('image')) {
            $rand = Str::random(8);
            $file_name = $rand . "-" . $request->file('image')->getClientOriginalName();
            $request->file('image')->move('storage/upload/items/', $file_name);
            $image = $file_name;
        }

        $item = Items::create([
            "id_number" => $request->id_number,
            "name" => $request->name,
            "description" => $request->description ?? null,
            "categories_id" => $request->category ?? null,
            "image" => $image ?? null,
            "status" => "available"
        ]);

        if ($item) {
            return response()->json(["message" => "Data saved successfully"], 201);
        }

        return response()->json(["message" => "Something went wrong"], 500);
    }

  public function import(Request $request)
    {
        $request->validate([
            "data" => "required|array",
            'data.*.number_id' => 'required|string',
            'data.*.name' => 'required|string',
        ]);
 Log::info('Uploaded file:', ['itemData' => $request]);
        $items = $request->input('data');
 
        foreach ($items as $itemData) {
             Log::info('Uploaded file:', ['itemData' => $itemData]);
            $item = Items::create([
                "id_number" => $itemData['number_id'],
                "name" => $itemData['name'],
                "description" =>  null,
                "categories_id" =>null,
                "image" => null, // Asumsikan tidak ada image untuk import data dari excel
                "status" => "available"
            ]);

            if (!$item) {
                Log::error('Failed to create item:', ['itemData' => $itemData]);
                return response()->json(["message" => "Something went wrong"], 500);

            }
        }

        return response()->json(["message" => "Data imported successfully"], 201);
    }
   public function update($id, Request $request)
{
    $request->validate([
        "id_number" => "required",
        "name" => "required",
        "description" => "required",
        "categories_id" => "nullable|required",
        "status" => "required|in:available,not_available,lost,damaged",
        "image" => "image|mimes:jpeg,png,jpg,gif,svg"
    ]);

    $categoryFind = Categories::find($request->categories_id);
    $findItem = Items::find($id);

    if (!$findItem) {
        return response()->json(["message" => "Item not found"], 404);
    }

    if (!$categoryFind) {
        return response()->json(["message" => "Category not found"], 404);
    }

// Check if the current status is 'not_available'
    $status = $findItem->status == 'not_available' ? 'not_available' : $request->status;

    $image = $findItem->image;

    if ($request->hasFile('image')) {
        $rand = Str::random(8);
        $file_name = $rand . "-" . $request->file('image')->getClientOriginalName();
        $existingFilePath = 'storage/upload/items/' . $findItem->image;
        if (File::exists($existingFilePath)) {
            File::delete($existingFilePath);
        }
        $request->file('image')->move('storage/upload/items/', $file_name);
        $image = $file_name;
    }

    $updateItem = $findItem->update([
        "id_number" => $request->id_number,
        "name" => $request->name,
         "status" => $status,
        "description" => $request->description,
        "categories_id" => $categoryFind->id,
        "image" => $image
    ]);

    if ($updateItem) {
        return response()->json(["message" => "Item updated successfully"], 200);
    }

    return response()->json(["message" => "Something went wrong"], 500);
}


  public function updateAvailable($id, Request $request)
    {
        $request->validate([
            "status" => "required|string"
        ]);

        $findItem = Items::find($id);

        if (!$findItem) {
            return response()->json(["message" => "Item not found"], 404);
        }

        $findItem->status = $request->status;
        $findItem->save();

        return response()->json(["message" => "Item status updated successfully", "item" => $findItem], 200);
    }

    public function delete($id)
    {
        $findItem = Items::find($id);

        if (!$findItem) {
            return response()->json(["message" => "Item not found"], 404);
        }

        $delete = $findItem->delete();

        if ($delete) {
            return response()->json(["message" => "Item deleted successfully"], 200);
        }

        return response()->json(["message" => "Something went wrong"], 500);
    }

    public function printQR($id)
    {
        $findItem = Items::with("category")->where("id", $id)->first();

        if (!$findItem) {
            return response()->json(["message" => "Item not found"], 404);
        }

        $pdf = Pdf::loadView('pages.items.printQR', [
            "item" => $findItem
        ]);

        return $pdf->download($findItem->name . "-" . $findItem->id_number . ".pdf");
    }
}
