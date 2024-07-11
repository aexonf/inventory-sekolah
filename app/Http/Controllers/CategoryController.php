<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Categories;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Categories::all();
        return response()->json([
            "status" => "success",
            "data" => $categories
        ]);
    }

    public function create(Request $request)
    {
        $request->validate([
            "name" => "required",
        ]);

        $category = Categories::create([
            "name" => $request->name,
        ]);

        if ($category) {
            return response()->json([
                "status" => "success",
                "message" => "Successfully created category",
                "data" => $category
            ], 201);
        }

        return response()->json([
            "status" => "error",
            "message" => "Something went wrong"
        ], 500);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            "name" => "required",
        ]);

        $category = Categories::find($id);

        if (!$category) {
            return response()->json([
                "status" => "error",
                "message" => "Category not found"
            ], 404);
        }

        $category->update([
            "name" => $request->name,
        ]);

        return response()->json([
            "status" => "success",
            "message" => "Category updated successfully",
            "data" => $category
        ]);
    }

    public function show($id)
    {
        $category = Categories::find($id);

        if (!$category) {
            return response()->json([
                "status" => "error",
                "message" => "Category not found"
            ], 404);
        }

        return response()->json([
            "status" => "success",
            "data" => $category
        ]);
    }

    public function delete($id)
    {
        $category = Categories::find($id);

        if (!$category) {
            return response()->json([
                "status" => "error",
                "message" => "Category not found"
            ], 404);
        }

        $category->delete();

        return response()->json([
            "status" => "success",
            "message" => "Category deleted successfully"
        ]);
    }
}
