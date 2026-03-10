<?php

use App\Http\Controllers\Dashboard\UserController;
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

require __DIR__.'/settings.php';
