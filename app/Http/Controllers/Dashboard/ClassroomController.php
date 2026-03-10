<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Classroom\StoreClassroomRequest;
use App\Http\Requests\Classroom\UpdateClassroomRequest;
use App\Models\Classroom;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ClassroomController extends Controller
{
    public function index(Request $request): Response
    {
        $search = trim((string) $request->query('search', ''));

        $classrooms = Classroom::query()
            ->when($search !== '', fn ($query) => $query->where('name', 'like', "%{$search}%"))
            ->orderBy('name')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('dashboard/classrooms/index', [
            'classrooms' => $classrooms,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    public function store(StoreClassroomRequest $request): RedirectResponse
    {
        Classroom::create($request->validated());

        return to_route('dashboard.classrooms.index')->with('status', 'classroom-created');
    }

    public function update(UpdateClassroomRequest $request, Classroom $classroom): RedirectResponse
    {
        $classroom->update($request->validated());

        return to_route('dashboard.classrooms.index')->with('status', 'classroom-updated');
    }

    public function destroy(Classroom $classroom): RedirectResponse
    {
        $classroom->delete();

        return to_route('dashboard.classrooms.index')->with('status', 'classroom-deleted');
    }
}
