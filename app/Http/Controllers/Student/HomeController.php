<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Karya;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        $student = auth()->user();

        $karyaCount = Karya::query()
            ->where('user_id', $student->id)
            ->count();

        $recentKarya = Karya::query()
            ->where('user_id', $student->id)
            ->withCount('likes')
            ->withExists([
                'likes as is_liked' => fn ($query) => $query->where('users.id', $student->id),
            ])
            ->latest()
            ->limit(6)
            ->get()
            ->map(fn (Karya $karya) => [
                'id' => $karya->id,
                'title' => $karya->title,
                'description' => $karya->description,
                'media_type' => $karya->media_type,
                'media_url' => $karya->media_url,
                'media_path' => $karya->media_path ? Storage::disk('public')->url($karya->media_path) : null,
                'status' => $karya->status,
                'likes_count' => $karya->likes_count,
                'is_liked' => (bool) $karya->is_liked,
                'created_at' => $karya->created_at?->toDateTimeString(),
            ]);

        return Inertia::render('student/home', [
            'karyaCount' => $karyaCount,
            'recentKarya' => $recentKarya,
            'student' => [
                'name' => $student->name,
                'email' => $student->email,
                'nisn' => $student->nisn,
                'gender' => $student->gender,
                'phone' => $student->phone,
                'birth_place' => $student->birth_place,
                'birth_date' => $student->birth_date?->toDateString(),
                'address' => $student->address,
                'bio' => $student->bio,
                'skills' => $student->skills ?? [],
                'achievements' => $student->achievements ?? [],
                'interests' => $student->interests ?? [],
                'social_link' => $student->social_link,
                'instagram' => $student->instagram,
                'facebook' => $student->facebook,
                'tiktok' => $student->tiktok,
                'linkedin' => $student->linkedin,
                'avatar' => $student->avatar,
            ],
        ]);
    }
}
