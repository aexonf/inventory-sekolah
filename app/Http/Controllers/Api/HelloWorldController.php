<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

class HelloWorldController extends Controller
{
    /**
     * Return a Hello World message.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(): JsonResponse
    {
        return response()->json(['message' => 'Hello World'], 200);
    }
}
