<?php

namespace App\Http\Controllers\Back;

use App\Http\Controllers\Controller;
use App\Models\Categories;
use Illuminate\Http\Request;

class CategoryController extends Controller
{

    public function index()
    {
        $categories = Categories::all();

        return view("pages.category.index", [
            "categories" => $categories
        ]);
    }

    public function create(Request $request)
    {
        $request->validate([
            "name" => "required",
        ]);


        $created = Categories::create([
            "name" => $request->name,
        ]);

        if ($created) {
            return redirect()->back()->with("success", "Successfully created category");
        }

        return redirect()->back()->with("error", "Something went wrong");
    }


    public function update($id, Request $request)
    {
        $categoriesUpdated = Categories::find($id);

        if (!$categoriesUpdated) {
            return redirect()->back()->with("error", "Category not found");
        }


        $updated = $categoriesUpdated->update([
            "name" => $request->name,
        ]);

        if ($updated) {
            return redirect()->back()->with("success", "Category updated successfully");
        }

        return redirect()->back()->with("error", "Updated category failed");
    }


    public function delete($id)
    {
        $categoriesUpdated = Categories::find($id);

        if (!$categoriesUpdated) {
            return redirect()->back()->with("error", "Category not found");
        }

        $delete = Categories::destroy($id);

        if ($delete) {
            return redirect()->back()->with("success", "Category deleted successfully");
        }

        return redirect()->back()->with("error", "Deleted category failed");
    }
}
