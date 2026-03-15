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
        Schema::table('users', function (Blueprint $table) {
            $table->string('gender', 1)->nullable()->after('role'); // L/P
            $table->string('phone')->nullable()->after('email');
            $table->string('birth_place')->nullable()->after('birth_date');
            $table->text('bio')->nullable()->after('social_link');
            $table->json('skills')->nullable()->after('bio');
            $table->json('achievements')->nullable()->after('skills');
            $table->json('interests')->nullable()->after('achievements');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['gender', 'phone', 'birth_place', 'bio', 'skills', 'achievements', 'interests']);
        });
    }
};
