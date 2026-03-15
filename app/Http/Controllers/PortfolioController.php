<?php

namespace App\Http\Controllers;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class PortfolioController extends Controller
{
    public function show(User $user): Response
    {
        abort_unless($user->role === UserRole::Siswa, 404);

        $karyas = $user->karyas()
            ->latest()
            ->get()
            ->map(fn ($karya) => [
                'id' => $karya->id,
                'title' => $karya->title,
                'description' => $karya->description,
                'content' => $karya->content,
                'media_type' => $karya->media_type,
                'media_url' => $karya->media_url,
                'media_path' => $karya->media_path ? Storage::disk('public')->url($karya->media_path) : null,
                'status' => $karya->status,
                'created_at' => $karya->created_at?->toDateTimeString(),
            ]);

        return Inertia::render('portfolio/show', [
            'student' => [
                'id' => $user->id,
                'nisn' => $user->nisn,
                'name' => $user->name,
                'avatar' => $user->avatar,
                'birth_date' => $user->birth_date?->toDateString(),
                'address' => $user->address,
                'social_link' => $user->social_link,
                'classroom' => $user->classroom?->name,
                'major' => $user->major?->name,
            ],
            'karyas' => $karyas,
        ]);
    }
}
