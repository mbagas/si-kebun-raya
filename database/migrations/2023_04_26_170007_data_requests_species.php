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
    //
      Schema::create('data_requests_species', function (Blueprint $table) {
        $table->id();
        $table->unsignedBigInteger('data_request_id');
        $table->unsignedBigInteger('species_id');
        $table->timestamps();
      });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
    //
      Schema::dropIfExists('plots');
    }
};
