<?php

use App\Http\Controllers\Dashboard\UserController;
use App\Http\Controllers\Student\HomeController;
use App\Http\Controllers\Student\KaryaController;
use App\Http\Controllers\Student\ProfileController;
use App\Http\Controllers\Student\StudentProfileController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified', 'role:GURU'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    Route::get('dashboard/users', [UserController::class, 'index'])->name('dashboard.users.index');
    Route::get('dashboard/users/create', [UserController::class, 'create'])->name('dashboard.users.create');
    Route::post('dashboard/users', [UserController::class, 'store'])->name('dashboard.users.store');
    Route::get('dashboard/users/{user}/edit', [UserController::class, 'edit'])->name('dashboard.users.edit');
    Route::put('dashboard/users/{user}', [UserController::class, 'update'])->name('dashboard.users.update');
    Route::delete('dashboard/users/{user}', [UserController::class, 'destroy'])->name('dashboard.users.destroy');
});

Route::middleware(['auth', 'verified', 'role:SISWA'])->group(function () {
    Route::get('siswa', [HomeController::class, 'index'])->name('student.home');

    Route::get('siswa/profile', [ProfileController::class, 'edit'])->name('student.profile.edit');
    Route::patch('siswa/profile', [ProfileController::class, 'update'])->name('student.profile.update');

    Route::get('siswa/karya', [KaryaController::class, 'index'])->name('student.karya.index');
    Route::get('siswa/karya/create', [KaryaController::class, 'create'])->name('student.karya.create');
    Route::post('siswa/karya', [KaryaController::class, 'store'])->name('student.karya.store');
    Route::get('siswa/karya/{karya}/edit', [KaryaController::class, 'edit'])->name('student.karya.edit');
    Route::put('siswa/karya/{karya}', [KaryaController::class, 'update'])->name('student.karya.update');
    Route::delete('siswa/karya/{karya}', [KaryaController::class, 'destroy'])->name('student.karya.destroy');

    Route::get('siswa/profiles', [StudentProfileController::class, 'index'])->name('student.profiles.index');
    Route::get('siswa/profiles/{student}', [StudentProfileController::class, 'show'])->name('student.profiles.show');
});

require __DIR__.'/settings.php';
