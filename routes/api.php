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
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\UserImportController;

use App\Http\Controllers\TestUserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TestingUploadController;

Route::post('/upload-json', [ItemsController::class, 'import']);


Route::post('/import-users', [TestUserController::class, 'import']);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/test', function (Request $request) {
    return response()->json(['message' => $request], 200);
});


Route::prefix("/v1")->group(function () {
    Route::get('/students', [StudentsController::class, 'index']);

     Route::controller(NotificationController::class)->middleware('auth:sanctum')->prefix("/notification")->group(function () {
        Route::get("/", "index");
        Route::post("/borrow", "borrowItem");
        Route::post("/return", "returnItem");
        Route::delete("/{id}", "delete");
    });

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
        Route::post("/{id}/available", "updateAvailable");
        Route::delete("/{id}", "delete");
       // Route::post("/import", "import");
    });

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
