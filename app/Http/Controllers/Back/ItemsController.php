<?php

namespace App\Http\Controllers\Back;

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
        $category = Categories::all();

        if ($request->has("status")) {
            $itemsQuery->where("status", $request->status);
        } else {
            $itemsQuery->where("status", "available");
        }

        $items = $itemsQuery->get();

        return view("pages.items.index", [
            "items" => $items,
            "categories" => $category,
        ]);
    }

    public function create(Request $request)
    {
        // $request->validate([
        //     "item_number" => "required",
        //     "name" => "required",
        //     "stock" => "required",
        //     "image" => "image|mimes:jpeg,png,jpg,gif,svg",
        //     "description" => "required",
        // ]);

        $image = null;

        if ($request->hasFile('image')) {
            $rand = Str::random(8);
            $file_name = $rand . "-" . $request->file('image')->getClientOriginalName();
            $request->file('image')->move('storage/upload/items/', $file_name);
            $image = $file_name;
        }

        if (!isset($request->category)) {
            return redirect()->back()->with("error", "Please select category before create item");
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
            return redirect()->back()->with("success", "Data saved successfully");
        }

        return redirect()->back()->with("error", "Something went wrong");
    }


    public function update($id, Request $request)
    {
        $categoryFind = Categories::where("name", $request->category)->first();
        $findItem = Items::find($id);

        if (!$findItem) {
            return redirect()->back()->with("error", "Item not found");
        }

        $image = null;

        if ($request->hasFile('image')) {
            $rand = Str::random(8);
            $file_name = $rand . "-" . $request->file('image')->getClientOriginalName();
            $existingFilePath = 'storage/upload/items/' . $findItem->image;
            if (File::exists($existingFilePath)) {
                File::delete($existingFilePath);
            } else {
                $request->file('image')->move('storage/upload/items/', $file_name);
                $image = $file_name;
            }
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
            return redirect()->back()->with("success", "Item updated successfully");
        }

        return redirect()->back()->with("error", "Something went wrong");
    }

    public function delete($id)
    {
        $findItem = Items::find($id);

        $delete = $findItem->delete();

        if ($delete) {
            return redirect()->back()->with("success", "Item deleted successfully");
        }

        return redirect()->back() - with("error", "Something went wrong");
    }

    public function printQR($id)
    {
        $findItem = Items::with("category")->where("id", $id)->first();

        $pdf = Pdf::loadView('pages.items.printQR', [
            "item" => $findItem
        ]);

        return $pdf->download($findItem->name . "-" . $findItem->id_number . ".pdf");
    }
}
