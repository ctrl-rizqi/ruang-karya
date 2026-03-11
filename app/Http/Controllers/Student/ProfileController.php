<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Http\Requests\Student\UpdateProfileRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
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
                'avatar' => $student->avatar,
            ],
        ]);
    }

    public function update(UpdateProfileRequest $request): RedirectResponse
    {
        $student = $request->user();
        $data = $request->validated();

        if ($request->hasFile('avatar')) {
            // Delete old avatar if exists
            if ($student->avatar_url) {
                Storage::disk('public')->delete($student->avatar_url);
            }

            $path = $request->file('avatar')->store('avatars', 'public');
            $data['avatar_url'] = $path;
        }

        $student->update($data);

        return to_route('student.profile.edit')->with('status', 'profile-updated');
    }
}
