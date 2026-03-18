<?php

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class GuruSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $teachers = [
            [
                'name' => 'Guru Pengampu',
                'email' => 'guru@ruangkarya.local',
                'nisn' => '1234567890',
                'role' => UserRole::Guru,
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'Admin Ruang Karya',
                'email' => 'admin@ruangkarya.local',
                'nisn' => '1112223334',
                'role' => UserRole::Guru,
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'Koordinator Produk Kreatif',
                'email' => 'koordinator@ruangkarya.local',
                'nisn' => '5556667778',
                'role' => UserRole::Guru,
                'password' => Hash::make('password'),
            ],
        ];

        foreach ($teachers as $teacher) {
            User::firstOrCreate(
                ['email' => $teacher['email']],
                $teacher
            );
        }
    }
}
