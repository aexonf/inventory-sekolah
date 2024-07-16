<?php

namespace App\Http\Controllers;

use App\Models\Temporary;
use Illuminate\Http\Request;

class TemporaryController extends Controller
{
    public function index()
    {
        $temporary = Temporary::all();
        return response()->json([
            'status' => 'success',
            'message' => 'Temporaries retrieved successfully',
            'data' => $temporary
        ]);
    }

    public function create(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'item_id' => 'required|exists:items,id',
            'name' => 'nullable|string',
            'class' => 'nullable|string',
            'number_id' => 'nullable|string',
            'phone' => 'nullable|string',
        ]);

        $temporary = Temporary::create($request->all());

        return response()->json([
            'status' => 'success',
            'message' => 'Temporary created successfully',
            'data' => $temporary
        ], 201);
    }

    public function show($id)
    {
        $temporary = Temporary::with('user', 'item')->findOrFail($id);
        return response()->json([
            'status' => 'success',
            'message' => 'Temporary retrieved successfully',
            'data' => $temporary
        ]);
    }

    public function update(Request $request, $id)
    {
        $temporary = Temporary::find($id);

        $request->validate([
            'user_id' => 'required|exists:users,id',
            'item_id' => 'required|exists:items,id',
            'name' => 'nullable|string',
            'class' => 'nullable|string',
            'number_id' => 'nullable|string',
            'phone' => 'nullable|string',
            // 'user_id' => 'required|exists:users,id',
            // 'item_id' => 'required|exists:items,id',
            // 'borrow_date' => 'required|date',
            // 'return_date' => 'nullable|date',
        ]);

        $temporary->update($request->all());

        return response()->json([
            'status' => 'success',
            'message' => 'Temporary updated successfully',
            'data' => $temporary
        ]);
    }

    public function delete($id)
    {
        $temporary = Temporary::find($id);

        if (!$temporary) {
            return response()->json([
                "status" => "error",
                "message" => "Category not found"
            ], 404);
        }

        $temporary->delete();

        return response()->json([
            "status" => "success",
            "message" => "Category deleted successfully"
        ]);
    }
}
