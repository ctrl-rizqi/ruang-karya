<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Major\StoreMajorRequest;
use App\Http\Requests\Major\UpdateMajorRequest;
use App\Models\Major;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MajorController extends Controller
{
    public function index(Request $request): Response
    {
        $search = trim((string) $request->query('search', ''));

        $majors = Major::query()
            ->when($search !== '', fn ($query) => $query->where('name', 'like', "%{$search}%")->orWhere('code', 'like', "%{$search}%"))
            ->orderBy('name')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('dashboard/majors/index', [
            'majors' => $majors,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    public function store(StoreMajorRequest $request): RedirectResponse
    {
        Major::create($request->validated());

        return to_route('dashboard.majors.index')->with('status', 'major-created');
    }

    public function update(UpdateMajorRequest $request, Major $major): RedirectResponse
    {
        $major->update($request->validated());

        return to_route('dashboard.majors.index')->with('status', 'major-updated');
    }

    public function destroy(Major $major): RedirectResponse
    {
        $major->delete();

        return to_route('dashboard.majors.index')->with('status', 'major-deleted');
    }
}
