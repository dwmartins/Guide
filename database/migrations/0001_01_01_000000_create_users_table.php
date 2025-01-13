<?php

use App\Services\JWTManager;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100);
            $table->string('lastName', 100)->nullable();
            $table->string('email')->unique();
            $table->string('password');
            $table->text('token');
            $table->enum('active', ['Y', 'N'])->default('Y')->nullable();
            $table->string('role', 100);
            $table->longText('description')->nullable();
            $table->string('phone', 100)->nullable();
            $table->date('dateOfBirth')->nullable();
            $table->string('address', 255)->nullable();
            $table->string('complement', 255)->nullable();
            $table->string('city', 100)->nullable();
            $table->string('zipCode', 20)->nullable();
            $table->string('state', 100)->nullable();
            $table->string('country', 100)->nullable();
            $table->string('photo', 255)->nullable();
            $table->enum('acceptsEmails', ['Y', 'N'])->default('Y')->nullable();
            $table->enum('publishContactInfo', ['Y', 'N'])->default('N')->nullable();
            $table->timestamps();  // created_at, updated_at
        });

        DB::table('users')->insert([
            'name' => env('ADMIN_NAME', 'Administrador'),
            'email' => env('ADMIN_EMAIL', 'admin@example.com'),
            'password' => Hash::make(env('ADMIN_PASSWORD', 'password123')),
            'token' => JWTManager::newCrypto(),
            'role' => 'support',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
