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
        Schema::create('data_requests', function (Blueprint $table) {
          $table->id();
          $table->string('name')->nullable();
          $table->string('institute')->nullable();
          $table->string('email')->nullable();
          $table->text('reason')->nullable();
          $table->bigInteger('family_id')->nullable();
          $table->string('type')->nullable();
          $table->string('status')->nullable();
          $table->text('decline_reason')->nullable();
          $table->string('token')->nullable();
          

          $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('data_requests');
    }
};
