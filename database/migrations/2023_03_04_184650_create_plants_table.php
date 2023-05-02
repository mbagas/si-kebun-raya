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
        Schema::create('plants', function (Blueprint $table) {
          $table->id();
          $table->string('access_number')->nullable();
          $table->bigInteger('species_id')->nullable();
          $table->string('coordinate')->nullable();
          $table->string('status')->nullable();
          $table->string('image')->nullable();
          $table->string('planter')->nullable();
          $table->date('planting_date')->nullable();
          $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('plants');
    }
};
