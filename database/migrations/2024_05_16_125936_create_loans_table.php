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
        Schema::create('loans', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('active_student_id');

            $table->foreign('active_student_id')->references('id')->on('active_student')->onDelete("cascade")->onUpdate("cascade");

            $table->unsignedBigInteger('item_id');

            $table->foreign('item_id')->references('id')->on('items')->onDelete("cascade")->onUpdate("cascade");

            $table->string("loan_date");
            $table->string("return_date");

            $table->unsignedBigInteger('teacher_id');

            $table->foreign('teacher_id')->references('id')->on('teachers')->onDelete("cascade")->onUpdate("cascade");

            $table->enum("status", ["returned", "borrowed"]);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('loans');
    }
};
