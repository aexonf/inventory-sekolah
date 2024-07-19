<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTemporaryTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('temporary', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('number_id');
            $table->string('phone');
            $table->string('student_class');
            $table->string('level');
            $table->string('item_name');
            $table->string('item_id');
            $table->string('item_number_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('temporary');
    }
}
