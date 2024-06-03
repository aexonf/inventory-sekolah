<?php

namespace App\Http\Controllers\Back;

use App\Http\Controllers\Controller;
use App\Models\Teachers;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Str;

class TeacherController extends Controller
{
    public function create(Request $request)
    {
        $validasi = $request->validate([
            "id_number" => "required|numeric",
            "name" => "required",
            "status" => "required",
            "username" => "required",
            "password" => "required",
            "role" => "required",
            "image" => "image|mimes:jpeg,png,jpg,gif,svg"
        ]);


        $user = User::create([
            "username" => $validasi["username"],
            "password" => Hash::make($validasi["password"]),
            "role" => "teacher",
        ]);


        if ($request->hasFile('image')) {
            $rand = Str::random(8);
            $file_name = $rand . "-" . $request->file('image')->getClientOriginalName();
            $request->file('image')->move('storage/upload/teacher/', $file_name);
            $validasi["image"] = $file_name;
        } else {
            $validasi["image"] = null;
        }


        // deafault role guru
        if ($request->role == null) {
            $teacher = Teachers::create([
                "id_number" => $validasi["id_number"],
                "name" => $validasi["name"],
                "status" => $validasi["status"],
                "role" => "guru",
                "user_id" => $user->id,
                "image" => $validasi["image"] != null ? $validasi["image"] : "",
            ]);
        }

        $teacher = Teachers::create([
            "id_number" => $validasi["id_number"],
            "name" => $validasi["name"],
            "status" => $validasi["status"],
            "role" => $validasi["role"],
            "user_id" => $user->id,
            "image" => $validasi["image"] != null ? $validasi["image"] : "",
        ]);

        // mengecek jika data berhail masuk ke database

        // jika success
        if ($teacher) {
            Session::flash("success", "data berhasil masuk ke database");
            return redirect()->back();
        }

        // jka error
        Session::flash("error", "data gagal masuk ke database");
        return redirect()->back();
    }



    // function untuk update guru
    public function update(Request $request, $id)
    {
        /*
        1. mencari id teacher dari request parameters
        2. mencari id usersnya
        3. update
        */
        $teacher = Teachers::where("id", $id)->first();
        $user = User::where("id", $teacher->user_id)->first();

        if ($request->hasFile('image')) {
            $rand = Str::random(8);
            $file_name = $rand . "-" . $request->file('image')->getClientOriginalName();
            $request->file('image')->move('storage/upload/teacher/', $file_name);
            $teacher->image = $file_name;
        }

        //mengupdate teacher
        $teacher->update([
            "id_number" => $request->id_number,
            "name" => $request->name,
            "status" => $request->status,
            "role" => $request->role,
            "image" => $teacher->image,
        ]);
        // mengudate data user
        $user->update([
            "username" => $request->username,
            "password" => Hash::make($request->password),
        ]);

        if ($teacher || $user) {
            Session::flash("success", "data berhasil di update");
            return redirect()->back();
        }

        Session::flash("error", "data gagal di update");
        return redirect()->back();
    }

    public function delete($id)
    {
        /*
        1. mencari id teacher dari request parameters
        2. mencari id usersnya
        3. delete
        */
        $teacher = Teachers::where("id", $id)->first();
        $user = User::where("id", $teacher->user_id)->first();

        //mengupdate teacher
        $teacher->delete();
        // mengudate data user
        $user->delete();

        if ($teacher || $user) {
            Session::flash("success", "data berhasil di hapus");
            return redirect()->back();
        }

        Session::flash("error", "data gagal di hapus");
        return redirect()->back();
    }
}
