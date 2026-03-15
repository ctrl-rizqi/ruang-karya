<?php

namespace App\Http\Controllers\Student;

use App\Enums\UserRole;
use App\Http\Controllers\Controller;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class StudentProfileController extends Controller
{
    public function index(): Response
    {
        $students = User::query()
            ->where('role', UserRole::Siswa)
            ->orderBy('name')
            ->paginate(10)
            ->withQueryString()
            ->through(fn (User $student): array => [
                'id' => $student->id,
                'nisn' => $student->nisn,
                'name' => $student->name,
                'birth_date' => $student->birth_date?->toDateString(),
                'address' => $student->address,
                'social_link' => $student->social_link,
                'instagram' => $student->instagram,
                'facebook' => $student->facebook,
                'tiktok' => $student->tiktok,
                'linkedin' => $student->linkedin,
            ]);

        return Inertia::render('student/profiles/index', [
            'students' => $students,
        ]);
    }

    public function show(User $student): Response
    {
        abort_unless($student->role === UserRole::Siswa, 404);

        $karyas = $student->karyas()
            ->latest()
            ->limit(10)
            ->get()
            ->map(fn ($karya): array => [
                'id' => $karya->id,
                'title' => $karya->title,
                'description' => $karya->description,
                'content' => $karya->content,
                'created_at' => $karya->created_at?->toDateTimeString(),
            ])
            ->values();

        return Inertia::render('student/profiles/show', [
            'student' => [
                'id' => $student->id,
                'nisn' => $student->nisn,
                'name' => $student->name,
                'birth_date' => $student->birth_date?->toDateString(),
                'address' => $student->address,
                'social_link' => $student->social_link,
                'instagram' => $student->instagram,
                'facebook' => $student->facebook,
                'tiktok' => $student->tiktok,
                'linkedin' => $student->linkedin,
            ],
            'karyas' => $karyas,
        ]);
    }
}
