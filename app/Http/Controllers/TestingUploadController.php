<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TestingUpload;

class TestingUploadController extends Controller
{
    /**
 
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function upload(Request $request)
    {
        // Validasi data
        $request->validate([
            'data' => 'required|array',
            'data.*.name' => 'required|string', 
        ]);

     
        $data = $request->input('data');

        foreach ($data as $item) {
            TestingUpload::create([
                'name' => $item['name'],
            ]);
        }

        return response()->json(['message' => 'Data uploaded successfully.'], 200);
    }
}
