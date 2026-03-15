<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Karya;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class KaryaController extends Controller
{
    public function index(Request $request): Response
    {
        $karyas = Karya::with('user')
            ->latest()
            ->when($request->search, fn ($query, $search) => $query->where('title', 'like', "%{$search}%"))
            ->paginate(10)
            ->withQueryString()
            ->through(fn (Karya $karya) => [
                'id' => $karya->id,
                'user' => [
                    'name' => $karya->user->name,
                ],
                'title' => $karya->title,
                'media_type' => $karya->media_type,
                'status' => $karya->status,
                'created_at' => $karya->created_at?->diffForHumans(),
            ]);

        return Inertia::render('dashboard/karya/index', [
            'karyas' => $karyas,
            'filters' => $request->only(['search']),
        ]);
    }

    public function show(Karya $karya): Response
    {
        $karya->load('user');

        return Inertia::render('dashboard/karya/show', [
            'karya' => [
                'id' => $karya->id,
                'user' => [
                    'name' => $karya->user->name,
                ],
                'title' => $karya->title,
                'description' => $karya->description,
                'content' => $karya->content,
                'media_type' => $karya->media_type,
                'media_url' => $karya->media_url,
                'media_path' => $karya->media_path ? Storage::disk('public')->url($karya->media_path) : null,
                'status' => $karya->status,
                'created_at' => $karya->created_at?->format('d M Y H:i'),
            ],
        ]);
    }

    public function updateStatus(Request $request, Karya $karya)
    {
        $request->validate([
            'status' => 'required|in:pending,reviewed',
        ]);

        $karya->update([
            'status' => $request->status,
        ]);

        return back()->with('status', 'status-updated');
    }
}
