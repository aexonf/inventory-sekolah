<?php

namespace App\Http\Controllers;

use App\Models\TestUser;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\TestUsersImport;

class TestUserController extends Controller
{
    public function showUploadForm()
    {
        return inertia('UploadForm'); // Pastikan Anda telah membuat komponen UploadForm di frontend
    }

    public function uploadExcel(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:xlsx,xls,csv',
        ]);

        Excel::import(new TestUsersImport, $request->file('file'));

        return redirect()->back()->with('success', 'File uploaded successfully!');
    }
}
