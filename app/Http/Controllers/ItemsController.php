<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Categories;
use App\Models\Items;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class ItemsController extends Controller
{

  public function index(Request $request)
    {
        $itemsQuery = Items::query();

        if ($request->has("status")) {
            $itemsQuery->where("status", $request->status);
        } else {
            $itemsQuery->where("status", "available");
        }

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
            "stock" => "required",
            "image" => "nullable|image|mimes:jpeg,png,jpg,gif,svg",
            "description" => "required",
            "category" => "required"
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
            "stock" => $request->stock,
            "description" => $request->description,
            "categories_id" => $request->category,
            "image" => $image,
            "status" => "available"
        ]);

        if ($item) {
            return response()->json(["message" => "Data saved successfully"], 201);
        }

        return response()->json(["message" => "Something went wrong"], 500);
    }

   public function update($id, Request $request)
{
    $request->validate([
        "id_number" => "required",
        "name" => "required",
        "stock" => "required",
        "description" => "required",
        "categories_id" => "required",
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
        "stock" => $request->stock,
        "description" => $request->description,
        "categories_id" => $categoryFind->id,
        "image" => $image
    ]);

    if ($updateItem) {
        return response()->json(["message" => "Item updated successfully"], 200);
    }

    return response()->json(["message" => "Something went wrong"], 500);
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
