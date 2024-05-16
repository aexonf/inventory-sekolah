<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('active_student', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('student_id');

            $table->foreign('student_id')->references('id')->on('students')->onDelete("cascade")->onUpdate("cascade");

            $table->string("class");
            $table->string("generation");
            $table->string("school_year");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('active_student');
    }
};
