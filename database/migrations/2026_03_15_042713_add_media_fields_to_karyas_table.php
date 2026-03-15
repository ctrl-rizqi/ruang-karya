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
        Schema::table('karyas', function (Blueprint $table) {
            $table->string('media_type')->default('link')->after('description'); // image, video, document, link
            $table->string('media_url')->nullable()->after('media_type');
            $table->string('media_path')->nullable()->after('media_url');
            $table->unsignedBigInteger('media_size')->nullable()->after('media_path');
            $table->string('status')->default('pending')->after('media_size'); // pending, reviewed
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('karyas', function (Blueprint $table) {
            $table->dropColumn(['media_type', 'media_url', 'media_path', 'media_size', 'status']);
        });
    }
};
