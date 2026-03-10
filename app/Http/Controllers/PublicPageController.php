<?php

namespace App\Http\Controllers;

use App\Enums\UserRole;
use App\Models\User;
use App\Models\WebSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PublicPageController extends Controller
{
    public function about(): Response
    {
        $webSetting = WebSetting::query()->first();

        return Inertia::render('about', [
            'webSetting' => [
                'site_title' => $webSetting?->site_title ?? config('app.name'),
                'site_logo_url' => $webSetting?->site_logo_url,
                'site_tagline' => $webSetting?->site_tagline,
                'site_description' => $webSetting?->site_description,
            ],
            'developer' => [
                'name' => 'Tim Ruang Karya Dev',
                'role' => 'Fullstack Developer Team',
                'email' => 'dev@ruangkarya.local',
            ],
            'purpose' => 'Ruang Karya dibuat untuk membantu siswa menampilkan karya terbaiknya dalam satu platform portfolio sekolah.',
            'vision' => 'Menjadi ruang digital sekolah yang mendorong kreativitas, kolaborasi, dan apresiasi karya siswa.',
            'missions' => [
                'Memudahkan siswa memposting dan mengelola karya.',
                'Menyediakan profil siswa yang informatif dan mudah diakses.',
                'Membangun budaya saling mengapresiasi karya di lingkungan sekolah.',
            ],
        ]);
    }

    public function studentDirectory(Request $request): Response
    {
        $name = trim((string) $request->query('name', ''));
        $nisn = trim((string) $request->query('nisn', ''));
        $studentClass = trim((string) $request->query('student_class', ''));
        $major = trim((string) $request->query('major', ''));

        $students = User::query()
            ->where('role', UserRole::Siswa)
            ->when($name !== '', fn ($query) => $query->where('name', 'like', "%{$name}%"))
            ->when($nisn !== '', fn ($query) => $query->where('nisn', 'like', "%{$nisn}%"))
            ->when($studentClass !== '', fn ($query) => $query->where('student_class', 'like', "%{$studentClass}%"))
            ->when($major !== '', fn ($query) => $query->where('major', 'like', "%{$major}%"))
            ->orderBy('name')
            ->paginate(10)
            ->withQueryString()
            ->through(fn (User $student): array => [
                'id' => $student->id,
                'nisn' => $student->nisn,
                'name' => $student->name,
                'student_class' => $student->student_class,
                'major' => $student->major,
            ]);

        return Inertia::render('student-directory', [
            'students' => $students,
            'filters' => [
                'name' => $name,
                'nisn' => $nisn,
                'student_class' => $studentClass,
                'major' => $major,
            ],
        ]);
    }
}
