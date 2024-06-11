<?php

namespace App\Http\Controllers\Back;

use App\Http\Controllers\Controller;
use App\Models\Settings;
use Illuminate\Http\Request;

class SettingController extends Controller
{

    public function index() {
        $setting = Settings::first();
        return view("pages.setting.index", compact("setting"));
    }


    public function create(Request $request) {
       $validasi =  $request->validate([
            "name" => "required",
            "school_year" => "required"
        ]);


        $create = Settings::create([
            "name" => $validasi["name"],
            "school_year" => $validasi["school_year"],
        ]);

        if ($create) {
            return redirect()->back()->with("success", "Successfuly store setting data");
        }

        return redirect()->back()->with("error", "Failed to store setting data");
    }

    public function update($id, Request $request) {
        $findSettingByID = Settings::first();

        if (!$findSettingByID) {
            return redirect()->back()->with("error", "Setting not found");
        }


        $update = $findSettingByID->update([
            "name" => $request->name,
            "school_year" => $request->school_year,
        ]);

        if ($update) {
            return redirect()->back()->with("success", "Successfuly update setting data");
        }

        return redirect()->back()->with("error", "Failed to update setting data");
    }

    public function delete($id) {
        $delete = Settings::find($id)->destroy($id);

        if ($delete) {
            return redirect()->back()->with("success", "Successfuly delete setting data");
        }

        return redirect()->back()->with("error", "Failed to delete setting data");
    }

}
