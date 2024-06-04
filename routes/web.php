<?php

use App\Http\Controllers\Back\ActiveStudentsController;
use App\Http\Controllers\Back\StudentController;
use App\Models\ActiveStudents;
use App\Models\Students;
use App\Models\Teachers;
use Illuminate\Support\Facades\Route;


Route::prefix("/admin")->group(function () {

    Route::get("/", function() {
        return view("pages.index", [
            "students" => Students::all(),
            "teachers" => Teachers::all(),
            "activeStudent" => ActiveStudents::all(),
        ]);
    })->name("admin");

    Route::controller(StudentController::class)->prefix("/student")->group(function() {
        Route::get("/", "index")->name("admin.student.index");
        Route::post("/", "create")->name("admin.student.create");
        Route::put("/{id}", "update")->name("admin.student.update");
        Route::delete("/{id}", "delete")->name("admin.student.delete");
    });


    Route::controller(ActiveStudentsController::class)->prefix("/student/active-student")->group(function() {
        Route::get("/", "index")->name("admin.active-student.index");
        Route::post("/", "create")->name("admin.active-student.create");
        Route::put("/{id}", "update")->name("admin.active-student.update");
        Route::delete("/{id}", "delete")->name("admin.active-student.delete");
    });




});

Route::get('/', function () {
    return view('welcome');
});
