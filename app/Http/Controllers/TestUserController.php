<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Imports\TestUsersImport;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\Log;

class TestUserController extends Controller
{
    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:xlsx,xls',
        ]);

        Log::info('Uploaded file:', ['file' => $request->file('file')]);

        try {
            Excel::import(new TestUsersImport, $request->file('file'));
            return response()->json(['message' => 'Import successful'], 200);
        } catch (\Exception $e) {
            Log::error('Import failed: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to import data: ' . $e->getMessage()], 500);
        }
    }
}
