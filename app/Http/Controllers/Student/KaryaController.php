<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Http\Requests\Student\StoreKaryaRequest;
use App\Http\Requests\Student\UpdateKaryaRequest;
use App\Models\Karya;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class KaryaController extends Controller
{
    public function index(Request $request): Response
    {
        $karyas = Karya::with('user')
            ->when($request->search, function ($query, $search) {
                $query->whereHas('user', function ($query) use ($search) {
                    $query->where('name', 'like', "%{$search}%");
                });
            })
            ->withCount('likes')
            ->withExists([
                'likes as is_liked' => fn ($query) => $query->where('users.id', auth()->id()),
            ])
            ->latest()
            ->paginate(10)
            ->withQueryString()
            ->through(fn (Karya $karya): array => [
                ...$this->karyaData($karya),
                'is_owner' => $karya->user_id === auth()->id(),
            ]);

        return Inertia::render('student/karya/index', [
            'karyas' => $karyas,
            'filters' => $request->only(['search']),
        ]);
    }
    public function create(): Response
    {
        return Inertia::render('student/karya/form', [
            'mode' => 'create',
            'karya' => null,
        ]);
    }

    public function store(StoreKaryaRequest $request): RedirectResponse
    {
        $data = $request->validated();

        if ($request->hasFile('file')) {
            $path = $request->file('file')->store('karyas', 'public');
            $data['media_path'] = $path;
            $data['media_size'] = $request->file('file')->getSize();
        }

        Karya::create([
            ...$data,
            'user_id' => $request->user()->id,
            'status' => 'pending',
        ]);

        return to_route('student.karya.index')->with('status', 'karya-created');
    }

    public function edit(Karya $karya): Response
    {
        $this->ensureOwnedKarya($karya);
        $karya->load('user');

        return Inertia::render('student/karya/form', [
            'mode' => 'edit',
            'karya' => $this->karyaData($karya),
        ]);
    }

    public function update(UpdateKaryaRequest $request, Karya $karya): RedirectResponse
    {
        $this->ensureOwnedKarya($karya);

        $data = $request->validated();

        if ($request->hasFile('file')) {
            if ($karya->media_path) {
                Storage::disk('public')->delete($karya->media_path);
            }

            $path = $request->file('file')->store('karyas', 'public');
            $data['media_path'] = $path;
            $data['media_size'] = $request->file('file')->getSize();
        }

        $karya->fill($data);
        $karya->save();

        return to_route('student.karya.index')->with('status', 'karya-updated');
    }

    public function destroy(Karya $karya): RedirectResponse
    {
        $this->ensureOwnedKarya($karya);

        if ($karya->media_path) {
            Storage::disk('public')->delete($karya->media_path);
        }

        $karya->delete();

        return to_route('student.karya.index')->with('status', 'karya-deleted');
    }

    private function ensureOwnedKarya(Karya $karya): void
    {
        abort_unless($karya->user_id === auth()->id(), 404);
    }

    private function karyaData(Karya $karya): array
    {
        return [
            'id' => $karya->id,
            'user' => [
                'name' => $karya->user->name,
                'avatar' => $karya->user->avatar,
                'nisn' => $karya->user->nisn,
            ],
            'title' => $karya->title,
            'description' => $karya->description,
            'content' => $karya->content,
            'media_type' => $karya->media_type,
            'media_url' => $karya->media_url,
            'media_path' => $karya->media_path ? Storage::disk('public')->url($karya->media_path) : null,
            'media_size' => $karya->media_size,
            'status' => $karya->status,
            'likes_count' => $karya->likes_count ?? 0,
            'is_liked' => (bool) $karya->is_liked,
            'created_at' => $karya->created_at?->toDateTimeString(),
        ];
    }
}
