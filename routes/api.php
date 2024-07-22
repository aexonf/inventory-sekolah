<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\HistoryLoanController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ScanQRLoanController;
use App\Http\Controllers\ActiveStudentsController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\StudentsController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ItemsController;
use App\Http\Controllers\TemporaryController;
use App\Http\Controllers\UserImportController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix("/v1")->group(function () {
    Route::get('/students', [StudentsController::class, 'index']);

    // Route::apiResource('temporary', TemporaryController::class);

    // Route::post('/import-users', [UserImportController::class, 'import'])->name('import-users');

    Route::controller(TemporaryController::class)->middleware('auth:sanctum')->prefix("/temporary")->group(function () {
        Route::get("/", "index");
        Route::post("/", "create");
        Route::put("/{id}", "update");
        Route::delete("/{id}", "delete");
    });

    Route::controller(TeacherController::class)->middleware('auth:sanctum')->prefix("/teachers")->group(function () {
        Route::get("/", "index");
        Route::post("/", "create");
        Route::post("/{id}", "update");
        Route::delete("/{id}", "delete");
    });

    Route::controller(CategoryController::class)->middleware('auth:sanctum')->prefix("/categories")->group(function () {
        Route::get("/", "index");
        Route::post("/", "create");
        Route::get("/{id}", "show");
        Route::post("/{id}", "update");
        Route::delete("/{id}", "delete");
    });

    Route::controller(ItemsController::class)->middleware('auth:sanctum')->prefix("/items")->group(function () {
        Route::get("/", "index");
        Route::post("/", "create");
        Route::post("/{id}", "update");
        Route::delete("/{id}", "delete");
    });

    // Route::get('/teachers', [TeacherController::class, 'index']);

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
