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
        Schema::create('recaptcha_logs', function (Blueprint $table) {
            $table->id();
            $table->string('remote_ip');
            $table->boolean('success');
            $table->text('error_codes')->nullable();
            $table->string('hostname')->nullable();
            $table->string('challenge_ts')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('recaptcha_logs');
    }
};
