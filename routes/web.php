<?php

use App\Http\Controllers\Back\ActiveStudentsController;
use App\Http\Controllers\Back\CategoryController;
use App\Http\Controllers\Back\ItemsController;
use App\Http\Controllers\Back\LoanController;
use App\Http\Controllers\Back\QRCodeController;
use App\Http\Controllers\Back\SettingController;
use App\Http\Controllers\Back\StudentController;
use App\Http\Controllers\Back\TeacherController;
use App\Models\ActiveStudents;
use App\Models\Students;
use App\Models\Teachers;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::prefix("/admin")->group(function () {

    Route::get("/", function () {
        return view("pages.index", [
            "students" => Students::all(),
            "teachers" => Teachers::all(),
            "activeStudent" => ActiveStudents::all(),
        ]);
    })->name("admin");

    Route::controller(StudentController::class)->prefix("/student")->group(function () {
        Route::get("/", "index")->name("admin.student.index");
        Route::post("/", "create")->name("admin.student.create");
        Route::put("/{id}", "update")->name("admin.student.update");
        Route::delete("/{id}", "delete")->name("admin.student.delete");
    });


    Route::controller(ActiveStudentsController::class)->prefix("/student/active-student")->group(function () {
        Route::get("/", "index")->name("admin.active-student.index");
        Route::post("/", "create")->name("admin.active-student.create");
        Route::put("/{id}", "update")->name("admin.active-student.update");
        Route::delete("/{id}", "delete")->name("admin.active-student.delete");
        // generate QR
        Route::get("/{id}/qr-code", "printQR")->name("admin.active-student.qr-code");
    });

    Route::controller(TeacherController::class)->prefix("/teacher")->group(function () {
        Route::get("/", "index")->name("admin.teacher.index");
        Route::post("/", "create")->name("admin.teacher.create");
        Route::put("/{id}", "update")->name("admin.teacher.update");
        Route::delete("/{id}", "delete")->name("admin.teacher.delete");
    });


    Route::controller(ItemsController::class)->prefix("/item")->group(function () {
        Route::get("/", "index")->name("admin.item.index");
        Route::post("/", "create")->name("admin.item.create");
        Route::put("/{id}", "update")->name("admin.item.update");
        Route::delete("/{id}", "delete")->name("admin.item.delete");
        // Generate QR
        Route::get("{id}/qr-code", "printQR")->name("admin.item.qr-code");
    });

    Route::controller(CategoryController::class)->prefix("/item/category")->group(function () {
        Route::get("/", "index")->name("admin.category.index");
        Route::post("/", "create")->name("admin.category.create");
        Route::put("/{id}", "update")->name("admin.category.update");
        Route::delete("/{id}", "delete")->name("admin.category.delete");
    });


    Route::controller(SettingController::class)->prefix("/setting")->group(function () {
        Route::get("/", "index")->name("admin.setting.index");
        Route::post("/", "create")->name("admin.setting.create");
        Route::put("/{id}", "update")->name("admin.setting.update");
        Route::delete("/{id}", "delete")->name("admin.setting.delete");
    });

    Route::controller(LoanController::class)->prefix("/loan")->group(function () {
        // Route::get("/", "index")->name("admin.loan.index");
        // Route::post("/", "create")->name("admin.loan.create");
        // Route::put("/{id}", "update")->name("admin.loan.update");
        // Route::delete("/{id}", "delete")->name("admin.loan.delete");
        Route::get("/notif", "notif")->name("admin.loan.notif");
    });


    Route::controller(QRCodeController::class)->prefix("/qr-code")->group(function () {
        Route::get("/", "index")->name("admin.qr-code.index");
    });

});

Route::get('/', function () {
    return Inertia::render('Home');
});



