<?php

namespace App\Http\Controllers;

use App\Enums\UserRole;
use App\Models\Classroom;
use App\Models\Karya;
use App\Models\Major;
use App\Models\User;
use App\Models\WebSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Fortify\Features;

class PublicPageController extends Controller
{
    public function index(): Response
    {
        $featuredKaryas = Karya::with(['user.major'])
            ->where('status', 'reviewed')
            ->withCount('likes')
            ->orderByDesc('likes_count')
            ->limit(3)
            ->get()
            ->map(fn (Karya $karya) => [
                'id' => $karya->id,
                'title' => $karya->title,
                'media_type' => $karya->media_type,
                'media_path' => $karya->media_path ? Storage::disk('public')->url($karya->media_path) : null,
                'likes_count' => $karya->likes_count,
                'user' => [
                    'name' => $karya->user->name,
                    'major' => $karya->user->major?->name,
                    'nisn' => $karya->user->nisn,
                ],
            ]);

        return Inertia::render('welcome', [
            'featuredKaryas' => $featuredKaryas,
            'canRegister' => Features::enabled(Features::registration()),
        ]);
    }

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
            'team' => [
                [
                    'name' => 'Alex Rivera',
                    'role' => 'Lead Developer',
                    'email' => 'alex@ruangkarya.local',
                    'avatar' => 'https://i.pravatar.cc/150?u=alex',
                ],
                [
                    'name' => 'Elena Chen',
                    'role' => 'UI/UX Designer',
                    'email' => 'elena@ruangkarya.local',
                    'avatar' => 'https://i.pravatar.cc/150?u=elena',
                ],
                [
                    'name' => 'Marcus Thorne',
                    'role' => 'Backend Engineer',
                    'email' => 'marcus@ruangkarya.local',
                    'avatar' => 'https://i.pravatar.cc/150?u=marcus',
                ],
                [
                    'name' => 'Sarah Jenkins',
                    'role' => 'Frontend Specialist',
                    'email' => 'sarah@ruangkarya.local',
                    'avatar' => 'https://i.pravatar.cc/150?u=sarah',
                ],
                [
                    'name' => 'David Miller',
                    'role' => 'Product Manager',
                    'email' => 'david@ruangkarya.local',
                    'avatar' => 'https://i.pravatar.cc/150?u=david',
                ],
            ],
            'purpose' => 'Ruang Karya dibuat untuk membantu siswa menampilkan karya terbaiknya dalam satu platform portfolio sekolah.',
            'vision' => 'Menjadi ruang digital sekolah yang mendorong kreativitas, kolaborasi, dan apresiasi karya siswa.',
            'missions' => [
                'Memudahkan siswa memposting and mengelola karya.',
                'Menyediakan profil siswa yang informatif dan mudah diakses.',
                'Membangun budaya saling mengapresiasi karya di lingkungan sekolah.',
            ],
        ]);
    }

    public function studentDirectory(Request $request): Response
    {
        $name = trim((string) $request->query('name', ''));
        $nisn = trim((string) $request->query('nisn', ''));
        $classroomId = $request->query('classroom_id', '');
        $majorId = $request->query('major_id', '');

        $students = User::query()
            ->with(['classroom', 'major'])
            ->where('role', UserRole::Siswa)
            ->when($name !== '', fn ($query) => $query->where('name', 'like', "%{$name}%"))
            ->when($nisn !== '', fn ($query) => $query->where('nisn', 'like', "%{$nisn}%"))
            ->when($classroomId !== '', fn ($query) => $query->where('classroom_id', $classroomId))
            ->when($majorId !== '', fn ($query) => $query->where('major_id', $majorId))
            ->orderBy('name')
            ->paginate(12)
            ->withQueryString()
            ->through(fn (User $student): array => [
                'id' => $student->id,
                'nisn' => $student->nisn,
                'name' => $student->name,
                'avatar' => $student->avatar,
                'student_class' => $student->classroom?->name,
                'major' => $student->major?->name,
                'address' => $student->address,
                'bio' => $student->bio,
                'skills' => $student->skills ?? [],
                'socials' => [
                    'instagram' => $student->instagram,
                    'facebook' => $student->facebook,
                    'tiktok' => $student->tiktok,
                    'linkedin' => $student->linkedin,
                ],
            ]);

        return Inertia::render('student-directory', [
            'students' => $students,
            'filters' => [
                'name' => $name,
                'nisn' => $nisn,
                'classroom_id' => $classroomId,
                'major_id' => $majorId,
            ],
            'classrooms' => Classroom::orderBy('name')->get(['id', 'name']),
            'majors' => Major::orderBy('name')->get(['id', 'name']),
        ]);
    }
}
