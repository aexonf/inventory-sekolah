<?php

namespace App\Imports;

use App\Models\TestUser;
use Illuminate\Support\Facades\Hash;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class TestUsersImport implements ToModel, WithHeadingRow
{
    public function model(array $row)
    {
        return new TestUser([
            'username' => $row['username'],
            'password' => Hash::make($row['password']),
        ]);
    }
}
