<?php

use App\Http\Controllers\Dashboard\ClassroomController;
use App\Http\Controllers\Dashboard\KaryaController as DashboardKaryaController;
use App\Http\Controllers\Dashboard\MajorController;
use App\Http\Controllers\Dashboard\UserController;
use App\Http\Controllers\Dashboard\WebSettingController;
use App\Http\Controllers\KaryaLikeController;
use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\PublicPageController;
use App\Http\Controllers\Student\HomeController;
use App\Http\Controllers\Student\KaryaController;
use App\Http\Controllers\Student\ProfileController;
use App\Http\Controllers\Student\StudentProfileController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::get('tentang', [PublicPageController::class, 'about'])->name('about');
Route::get('daftar-siswa', [PublicPageController::class, 'studentDirectory'])->name('student-directory');
Route::get('p/{user:nisn}', [PortfolioController::class, 'show'])->name('portfolio.show');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::post('karya/{karya}/like', [KaryaLikeController::class, 'toggle'])->name('karya.like.toggle');
});

Route::middleware(['auth', 'verified', 'role:GURU'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    Route::get('dashboard/users', [UserController::class, 'index'])->name('dashboard.users.index');
    Route::get('dashboard/users/create', [UserController::class, 'create'])->name('dashboard.users.create');
    Route::post('dashboard/users', [UserController::class, 'store'])->name('dashboard.users.store');
    Route::get('dashboard/users/{user}/edit', [UserController::class, 'edit'])->name('dashboard.users.edit');
    Route::put('dashboard/users/{user}', [UserController::class, 'update'])->name('dashboard.users.update');
    Route::delete('dashboard/users/{user}', [UserController::class, 'destroy'])->name('dashboard.users.destroy');

    Route::get('dashboard/web-settings', [WebSettingController::class, 'edit'])->name('dashboard.web-settings.edit');
    Route::patch('dashboard/web-settings', [WebSettingController::class, 'update'])->name('dashboard.web-settings.update');

    Route::resource('dashboard/classrooms', ClassroomController::class)->names([
        'index' => 'dashboard.classrooms.index',
        'store' => 'dashboard.classrooms.store',
        'update' => 'dashboard.classrooms.update',
        'destroy' => 'dashboard.classrooms.destroy',
    ])->only(['index', 'store', 'update', 'destroy']);

    Route::resource('dashboard/majors', MajorController::class)->names([
        'index' => 'dashboard.majors.index',
        'store' => 'dashboard.majors.store',
        'update' => 'dashboard.majors.update',
        'destroy' => 'dashboard.majors.destroy',
    ])->only(['index', 'store', 'update', 'destroy']);

    Route::get('dashboard/karyas', [DashboardKaryaController::class, 'index'])->name('dashboard.karyas.index');
    Route::get('dashboard/karyas/{karya}', [DashboardKaryaController::class, 'show'])->name('dashboard.karyas.show');
    Route::patch('dashboard/karyas/{karya}/status', [DashboardKaryaController::class, 'updateStatus'])->name('dashboard.karyas.status');
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
