<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddRoleParentStatusToUsersTable extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->enum('role', ['user', 'eo', 'admin'])
                ->default('user')
                ->after('password');

            $table->unsignedBigInteger('parent_user_id')
                ->nullable()
                ->after('role');

            $table->enum('status', ['active', 'pending'])
                ->default('active')
                ->after('parent_user_id');

            $table->foreign('parent_user_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['parent_user_id']);
            $table->dropColumn(['role', 'parent_user_id', 'status']);
        });
    }
}