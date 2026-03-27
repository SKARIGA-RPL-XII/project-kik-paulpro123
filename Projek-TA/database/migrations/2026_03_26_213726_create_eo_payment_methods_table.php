<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('eo_payment_methods', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('provider_name'); 
            $table->string('account_number');
            $table->string('account_name');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('eo_payment_methods');
    }
};