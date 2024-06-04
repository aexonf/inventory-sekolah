<?php

use App\Http\Controllers\Back\ActiveStudentsController;
use App\Http\Controllers\Back\CategoryController;
use App\Http\Controllers\Back\ItemsController;
use App\Http\Controllers\Back\StudentController;
use App\Http\Controllers\Back\TeacherController;
use App\Models\ActiveStudents;
use App\Models\Students;
use App\Models\Teachers;
use Illuminate\Support\Facades\Route;


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
    });

    Route::controller(CategoryController::class)->prefix("/item/category")->group(function () {
        Route::get("/", "index")->name("admin.category.index");
        Route::post("/", "create")->name("admin.category.create");
        Route::put("/{id}", "update")->name("admin.category.update");
        Route::delete("/{id}", "delete")->name("admin.category.delete");
    });


});

Route::get('/', function () {
    return view('welcome');
});
