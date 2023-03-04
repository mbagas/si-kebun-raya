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
        Schema::create('species', function (Blueprint $table) {
          $table->id();
          $table->string('collection_number')->nullable();
          $table->string('access_number')->nullable();
          $table->string('collector_number')->nullable();
          $table->string('name')->nullable();
          $table->string('local_name')->nullable();
          $table->bigInteger('family_id')->nullable();
          $table->bigInteger('petak_id')->nullable();
          $table->datetime('planting_date')->nullable();
          $table->string('planter')->nullable();
          $table->string('collection_origin')->nullable();
          $table->integer('amount_in_nurseries')->nullable();
          $table->integer('amount_in_field')->nullable();
          $table->integer('total')->nullable();
          $table->boolean('genus_exist')->nullable();
          $table->boolean('type_exist')->nullable();
          $table->boolean('sp_exist')->nullable();
          $table->string('planting_coordinate')->nullable();
          $table->string('image')->nullable();
          $table->text('description')->nullable();
          $table->text('benefit')->nullable();
          $table->bigInteger('user_id');
          $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('species');
    }
};
