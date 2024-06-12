<?php

namespace App\Http\Controllers;

use App\Models\Students;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

/**
 * Class AuthController
 * @package App\Http\Controllers
 *
 * Controller for handling user authentication and registration.
 */
class AuthController extends Controller
{
    /**
     * Register a new user.
     *
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function register(Request $request) {
        // Validate the incoming request data
        $validasi = Validator::make($request->all(), [
            'username' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            "id_number" => "required|integer",
            "address" => "required|string",
            "phone_number" => "required|string",
        ]);

        // If validation fails, redirect back to the registration page with errors and input data
        if ($validasi->fails()) {
            return redirect('/register')->back()->withErrors($validasi)->withInput();
        }
        $validasi["role"] = "student";

        // Check if the ID number already exists in the database
        $cek = Students::where("id_number", $validasi["id_number"])->first();
        if ($cek) {
            return redirect('/register')->back()->with('failed', 'ID number already exists');
        }

        // Create a new user
        $user = User::create([
            "username" => $validasi["username"],
            "email" => $validasi["email"],
            "password" => Hash::make($validasi["password"]),
            "role" => $validasi["role"],
        ]);

        // Create a new student associated with the user
        $student = Students::create([
            "id_number" => $validasi["id_number"],
            "address" => $validasi["address"],
            "phone_number" => $validasi["phone_number"],
            "name" => $validasi["name"],
            "user_id" => $user->id,
        ]);

        // If student creation is successful, redirect to the login page with a success message
        if ($student) {
            return redirect('/login')->with('success', 'Registration successful');
        }

        // If student creation fails, redirect back to the registration page with a failure message
        return redirect('/register')->back()->with('failed', 'Registration failed');
    }


    /**
     * Handle the login request.
     *
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function login(Request $request) {
        // Validate the request data
        $validasi = Validator::make($request->all(), [
            'email' => 'email|max:255',
            'username' => 'string|max:255',
            'password' => 'required|string|min:8',
        ]);

        // Attempt to find the user by email or username
        $cek = User::where("email", $validasi["email"])->orWhere("username", $validasi["username"])->first();

        // Check if user exists and password is correct
        if ($cek) {
            if (Hash::check($validasi["password"], $cek->password)) {
                // Redirect to home page on successful login
                return redirect('/')->with("success", "Login Success");
            }
        }

        // Redirect back to login page on failure
        return redirect('/login')->back()->with("failed", "Login Failed");
    }

}
