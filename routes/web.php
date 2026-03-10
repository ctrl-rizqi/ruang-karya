<?php

use App\Http\Controllers\Dashboard\StudentController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified', 'role:GURU'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    Route::get('dashboard/students', [StudentController::class, 'index'])->name('dashboard.students.index');
    Route::get('dashboard/students/create', [StudentController::class, 'create'])->name('dashboard.students.create');
    Route::post('dashboard/students', [StudentController::class, 'store'])->name('dashboard.students.store');
    Route::get('dashboard/students/{student}/edit', [StudentController::class, 'edit'])->name('dashboard.students.edit');
    Route::put('dashboard/students/{student}', [StudentController::class, 'update'])->name('dashboard.students.update');
    Route::delete('dashboard/students/{student}', [StudentController::class, 'destroy'])->name('dashboard.students.destroy');
});

require __DIR__.'/settings.php';
