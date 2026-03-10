<?php

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Models\Classroom;
use App\Models\Major;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Seed Majors
        $majors = [
            ['name' => 'Rekayasa Perangkat Lunak', 'code' => 'RPL'],
            ['name' => 'Teknik Komputer dan Jaringan', 'code' => 'TKJ'],
            ['name' => 'Multimedia', 'code' => 'MM'],
            ['name' => 'Desain Komunikasi Visual', 'code' => 'DKV'],
        ];

        foreach ($majors as $major) {
            Major::firstOrCreate(['code' => $major['code']], $major);
        }

        // Seed Classrooms
        $classrooms = ['X RPL 1', 'XI RPL 1', 'XII RPL 1', 'X TKJ 1', 'XI TKJ 1', 'XII TKJ 1'];
        foreach ($classrooms as $classroom) {
            Classroom::firstOrCreate(['name' => $classroom]);
        }

        // Create Admin/Teacher
        User::firstOrCreate(
            ['email' => 'guru@ruangkarya.local'],
            [
                'name' => 'Guru Pengampu',
                'nisn' => '1234567890',
                'role' => UserRole::Guru,
                'password' => Hash::make('password'),
            ]
        );

        // Create Student
        User::firstOrCreate(
            ['email' => 'siswa@ruangkarya.local'],
            [
                'name' => 'Siswa Kreatif',
                'nisn' => '0987654321',
                'role' => UserRole::Siswa,
                'classroom_id' => Classroom::first()->id,
                'major_id' => Major::first()->id,
                'password' => Hash::make('password'),
            ]
        );
    }
}
