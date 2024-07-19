<?php

namespace App\Http\Controllers;

use App\Models\Temporary;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TemporaryController extends Controller
{
    public function index()
    {
        try {
            $temporaries = Temporary::all();

            return response()->json([
                "status" => "success",
                "message" => "Temporaries fetched successfully",
                "data" => $temporaries
            ]);
        } catch (\Exception $e) {
            return response()->json([
                "status" => "error",
                "message" => "An error occurred while fetching temporaries.",
                "error" => $e->getMessage()
            ], 500);
        }
    }

    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'number_id' => 'required|string|max:255',
            'phone' => 'required|string|max:255',
            'student_class' => 'required|string|max:255',
            'level' => 'required|string|max:255',
            'item_name' => 'required|string|max:255',
            'item_id' => 'required|string|max:255',
            'item_number_id' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                "status" => "error",
                "message" => "Validation error",
                "errors" => $validator->errors()
            ], 422);
        }

        try {
            $temporary = Temporary::create($request->all());

            return response()->json([
                "status" => "success",
                "message" => "Temporary created successfully",
                "data" => $temporary
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                "status" => "error",
                "message" => "An error occurred while creating the temporary.",
                "error" => $e->getMessage()
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $temporary = Temporary::findOrFail($id);

            return response()->json([
                "status" => "success",
                "message" => "Temporary fetched successfully",
                "data" => $temporary
            ]);
        } catch (\Exception $e) {
            return response()->json([
                "status" => "error",
                "message" => "An error occurred while fetching the temporary.",
                "error" => $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'number_id' => 'sometimes|required|string|max:255',
            'phone' => 'sometimes|required|string|max:255',
            'student_class' => 'sometimes|required|string|max:255',
            'level' => 'sometimes|required|string|max:255',
            'item_name' => 'sometimes|required|string|max:255',
            'item_id' => 'sometimes|required|string|max:255',
            'item_number_id' => 'sometimes|required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                "status" => "error",
                "message" => "Validation error",
                "errors" => $validator->errors()
            ], 422);
        }

        try {
            $temporary = Temporary::findOrFail($id);
            $temporary->update($request->all());

            return response()->json([
                "status" => "success",
                "message" => "Temporary updated successfully",
                "data" => $temporary
            ]);
        } catch (\Exception $e) {
            return response()->json([
                "status" => "error",
                "message" => "An error occurred while updating the temporary.",
                "error" => $e->getMessage()
            ], 500);
        }
    }

    public function delete($id)
    {
        try {
            $temporary = Temporary::findOrFail($id);
            $temporary->delete();

            return response()->json([
                "status" => "success",
                "message" => "Temporary deleted successfully"
            ]);
        } catch (\Exception $e) {
            return response()->json([
                "status" => "error",
                "message" => "An error occurred while deleting the temporary.",
                "error" => $e->getMessage()
            ], 500);
        }
    }
}
