<?php

namespace App\Http\Controllers\Back;

use App\Http\Controllers\Controller;
use App\Models\Items;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ItemsController extends Controller
{

    public function index(Request $request) {
        $itemsQuery = Items::query();

        if ($request->has("status")) {
            $itemsQuery->where("status", $request->status);
        }else {
            $itemsQuery->where("status", "available");
        }

        $items = $itemsQuery->get();

        return view("pages.items.index", [
            "items" => $items
        ]);
    }

    public function create(Request $request) {
        $request->validate([
            "item_number" => "required",
            "name" => "required",
            "stock" => "required",
            "image" => "image|mimes:jpeg,png,jpg,gif,svg",
            "description" => "required",
        ]);

        $image = null;

        if ($request->hasFile('image')) {
            $rand = Str::random(8);
            $file_name = $rand . "-" . $request->file('image')->getClientOriginalName();
            $request->file('image')->move('storage/upload/items/', $file_name);
            $image = $file_name;
        }

        $item = Items::create([
            "item_number" => $request->item_number,
            "name" => $request->name,
            "stock" => $request->stock,
            "description" => $request->description,
            "category_id" => $request->category,
            "image" => $image,
            "status" => "availabel"
        ]);

        if ($item) {
            return redirect()->back()->with("success", "Data saved successfully");
        }

        return redirect()->back()->with("error", "Something went wrong");
    }


    public function update($id, Request $request) {
        $findItem = Items::find($id);

        if(!$findItem) {
            return redirect()->back()->with("error", "Item not found");
        }

        $image = null;

        if ($request->hasFile('image')) {
            $rand = Str::random(8);
            $file_name = $rand . "-" . $request->file('image')->getClientOriginalName();
            $request->file('image')->move('storage/upload/items/', $file_name);
            $image = $file_name;
        }

        $updateItem = $findItem->update([
            "item_number" => $request->item_number,
            "name" => $request->name,
            "stock" => $request->stock,
            "description" => $request->description,
            "category_id" => $request->category,
            "image" => $image
        ]);

        if ($updateItem) {
            return redirect()->back()->with("success", "Item updated successfully");
        }

        return redirect()->back()->with("error", "Something went wrong");

    }

    public function delete($id) {
        $findItem = Items::find($id);

        $delete = $findItem->delete();

        if($delete) {
            return redirect()->back()->with("success", "Item deleted successfully");
        }

        return redirect()->back()-with("error", "Something went wrong");
    }



}
