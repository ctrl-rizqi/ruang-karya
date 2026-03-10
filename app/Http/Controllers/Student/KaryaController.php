<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Http\Requests\Student\StoreKaryaRequest;
use App\Http\Requests\Student\UpdateKaryaRequest;
use App\Models\Karya;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class KaryaController extends Controller
{
    public function index(): Response
    {
        $karyas = Karya::query()
            ->where('user_id', auth()->id())
            ->latest()
            ->paginate(10)
            ->withQueryString()
            ->through(fn (Karya $karya): array => $this->karyaData($karya));

        return Inertia::render('student/karya/index', [
            'karyas' => $karyas,
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
        Karya::create([
            ...$request->validated(),
            'user_id' => $request->user()->id,
        ]);

        return to_route('student.karya.index')->with('status', 'karya-created');
    }

    public function edit(Karya $karya): Response
    {
        $this->ensureOwnedKarya($karya);

        return Inertia::render('student/karya/form', [
            'mode' => 'edit',
            'karya' => $this->karyaData($karya),
        ]);
    }

    public function update(UpdateKaryaRequest $request, Karya $karya): RedirectResponse
    {
        $this->ensureOwnedKarya($karya);

        $karya->fill($request->validated());
        $karya->save();

        return to_route('student.karya.index')->with('status', 'karya-updated');
    }

    public function destroy(Karya $karya): RedirectResponse
    {
        $this->ensureOwnedKarya($karya);

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
            'title' => $karya->title,
            'description' => $karya->description,
            'content' => $karya->content,
            'created_at' => $karya->created_at?->toDateTimeString(),
        ];
    }
}
