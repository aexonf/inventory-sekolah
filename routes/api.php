<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\HistoryLoanController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ScanQRLoanController;
use App\Http\Controllers\ActiveStudentsController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\StudentsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::prefix("/v1")->group(function () {
    Route::get('/students', [StudentsController::class, 'index']);

    Route::get('/teachers', [TeacherController::class, 'index']);

    Route::get('/active-students', [ActiveStudentsController::class, 'index']);

    Route::controller(ScanQRLoanController::class)->middleware('auth:sanctum')->prefix("/scan-qr")->group(function () {
        Route::post("/loan", "loan");
    });

    Route::controller(AuthController::class)->prefix("/auth")->group(function () {
        Route::post("/login", "login");
        Route::post("/register", "register");
    });

    Route::controller(ProfileController::class)->middleware('auth:sanctum')->prefix("/profile")->group(function () {
        Route::get("/", "profile");
    });

    Route::controller(HistoryLoanController::class)->middleware('auth:sanctum')->prefix("/history")->group(function () {
        Route::get("/", "index");
    });

});
