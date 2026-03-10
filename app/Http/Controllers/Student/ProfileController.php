<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Http\Requests\Student\UpdateProfileRequest;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    public function edit(): Response
    {
        $student = auth()->user();

        return Inertia::render('student/profile', [
            'student' => [
                'nisn' => $student->nisn,
                'name' => $student->name,
                'birth_date' => $student->birth_date?->toDateString(),
                'address' => $student->address,
                'social_link' => $student->social_link,
            ],
        ]);
    }

    public function update(UpdateProfileRequest $request): RedirectResponse
    {
        $student = $request->user();

        $student->fill($request->validated());
        $student->save();

        return to_route('student.profile.edit')->with('status', 'profile-updated');
    }
}
