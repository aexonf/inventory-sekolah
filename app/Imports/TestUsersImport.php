<?php

// app/Imports/UsersImport.php
namespace App\Imports;
use Illuminate\Support\Facades\Log;


use App\Models\TestingUpload; 
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class TestUsersImport implements ToModel
{
    public function model(array $row)
    {
           Log::info('Uploaded file:', ['jj'=> $row]);
       $user = TestingUpload::where('name', $row[0])->first();

        if ($user) {
            $user->update([
                'name' => $row[0],
            ]);

           

            return $user;
        } else {
           
            return new TestingUpload([
                'name' => $row[0],
            ]);
        }
    }
}
