<?php

namespace App\Http\Controllers\Back;

use App\Http\Controllers\Controller;
use App\Models\Teachers;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Str;

class TeacherController extends Controller
{
    public function index(Request $request) {
        $teachers = Teachers::all();

        return view("pages.teacher.index", compact("teachers"));
    }

    public function create(Request $request)
    {
        // $validasi = $request->validate([
        //     "id_number" => "required|numeric",
        //     "name" => "required",
        //     "status" => "required",
        //     "username" => "required",
        //     "password" => "required",
        //     "image" => "required|image|mimes:jpeg,png,jpg,gif,svg"
        // ]);


        $user = User::create([
            "username" => $request->username,
            "password" => Hash::make($request->password),
            "role" => "teacher",
            "status" => $request->status,
            "email" => $request->email,
        ]);


        $imageName = "";
        if ($request->hasFile('image')) {
            $rand = Str::random(8);
            $file_name = $rand . "-" . $request->file('image')->getClientOriginalName();
            $request->file('image')->move('storage/upload/teacher/', $file_name);
            $imageName = $file_name;
        } else {
            $imageName = null;
        }


        $teacher = Teachers::create([
            "id_number" => $request->id_number,
            "name" => $request->name,
            "user_id" => $user->id,
            "image" => $request->hasFile('image') ? $imageName : "",
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
            // Check if there is an existing image and delete it
            if ($teacher->image && file_exists('storage/upload/teacher/' . $teacher->image)) {
                unlink('storage/upload/teacher/' . $teacher->image);
            }

            $rand = Str::random(8);
            $file_name = $rand . "-" . $request->file('image')->getClientOriginalName();
            $request->file('image')->move('storage/upload/teacher/', $file_name);
            $teacher->image = $file_name;
        }

        //mengupdate teacher
        $teacher->update([
            "id_number" => $request->id_number,
            "name" => $request->name,
            "image" => $teacher->image,
        ]);
        // mengudate data user
        $user->update([
            "username" => $request->username,
            "password" => Hash::make($request->password),
            "status" => $request->status,
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
