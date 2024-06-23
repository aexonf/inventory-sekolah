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
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            "id_number" => "required|integer",
            "address" => "required|string",
            "phone_number" => "required|string",
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Check if the ID number already exists in the database
        $cek = Students::where("id_number", $request->id_number)->first();
        if ($cek) {
            return response()->json([
                "status" => "error",
                "message" => "ID number already exists"
            ], 422);
        }

        // Create a new user
        $user = User::create([
            "username" => $request->username,
            "email" => $request->email,
            "password" => Hash::make($request->password),
            "role" => "student",
        ]);
        if ($user) {
            // Create a new student associated with the user
            $student = Students::create([
                "id_number" => $request->id_number,
                "address" => $request->address,
                "phone_number" => $request->phone_number,
                "name" => $request->username,
                "user_id" => $user->id,
            ]);

            // If student creation is successful, return success response
            if ($student) {
                return response()->json([
                    "status" => "success",
                    "message" => "Registration successful"
                ]);
            }
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
        $validatedData = $request->validate([
            'email' => 'email|max:255',
            'username' => 'string|max:255',
            'password' => 'required|string|min:8',
        ]);

        // Attempt to find the user by email or username
        $cek = User::where("email", $request->email)->orWhere("username", $request->username)->first();

        // Check if user exists and password is correct
        if ($cek) {
            if (Hash::check($request->password, $cek->password)) {
                $token = $cek->createToken($request->username)->plainTextToken;
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
