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
     * @return \Illuminate\Http\JsonResponse
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

        // If validation fails, return error response
        if ($validasi->fails()) {
            return response()->json([
                "status" => "error",
                "message" => "Validation failed",
                "errors" => $validasi->errors()
            ], 422);
        }
        $validasi["role"] = "student";

        // Check if the ID number already exists in the database
        $cek = Students::where("id_number", $validasi["id_number"])->first();
        if ($cek) {
            return response()->json([
                "status" => "error",
                "message" => "ID number already exists"
            ], 422);
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

        // If student creation is successful, return success response
        if ($student) {
            return response()->json([
                "status" => "success",
                "message" => "Registration successful"
            ]);
        }

        // If student creation fails, return error response
        return response()->json([
            "status" => "error",
            "message" => "Registration failed"
        ], 422);
    }


    /**
     * Handle the login request.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
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
                $token = $cek->createToken('username')->plainTextToken;
                // Return success response with token
                return response()->json([
                    "status" => "success",
                    "message" => "Login successful",
                    "token" => $token
                ]);
            }
        }

        // Return error response on failure
        return response()->json([
            "status" => "error",
            "message" => "Login failed"
        ], 422);
    }

}
