<?php

namespace App\Http\Controllers\Dashboard;

use App\Enums\UserRole;
use App\Http\Controllers\Controller;
use App\Http\Requests\Students\StoreStudentRequest;
use App\Http\Requests\Students\UpdateStudentRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class StudentController extends Controller
{
    public function index(Request $request): Response
    {
        $name = trim((string) $request->query('name', ''));
        $nisn = trim((string) $request->query('nisn', ''));

        $students = User::query()
            ->where('role', UserRole::Siswa)
            ->when($name !== '', fn ($query) => $query->where('name', 'like', "%{$name}%"))
            ->when($nisn !== '', fn ($query) => $query->where('nisn', 'like', "%{$nisn}%"))
            ->orderBy('name')
            ->paginate(10)
            ->withQueryString()
            ->through(fn (User $student): array => $this->studentData($student));

        return Inertia::render('dashboard/students/index', [
            'students' => $students,
            'filters' => [
                'name' => $name,
                'nisn' => $nisn,
            ],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('dashboard/students/form', [
            'mode' => 'create',
            'student' => null,
        ]);
    }

    public function store(StoreStudentRequest $request): RedirectResponse
    {
        $attributes = $request->validated();

        User::create([
            'nisn' => $attributes['nisn'],
            'name' => $attributes['name'],
            'email' => $this->emailFromNisn($attributes['nisn']),
            'role' => UserRole::Siswa,
            'password' => $attributes['password'],
            'birth_date' => $attributes['birth_date'] ?? null,
            'address' => $attributes['address'] ?? null,
            'social_link' => $attributes['social_link'] ?? null,
        ]);

        return to_route('dashboard.students.index')->with('status', 'student-created');
    }

    public function edit(User $student): Response
    {
        $this->ensureStudent($student);

        return Inertia::render('dashboard/students/form', [
            'mode' => 'edit',
            'student' => $this->studentData($student),
        ]);
    }

    public function update(UpdateStudentRequest $request, User $student): RedirectResponse
    {
        $this->ensureStudent($student);

        $attributes = $request->validated();
        $password = $attributes['password'] ?? null;

        unset($attributes['password']);

        $student->fill([
            ...$attributes,
            'email' => $this->emailFromNisn($attributes['nisn']),
            'role' => UserRole::Siswa,
        ]);

        if ($password) {
            $student->password = $password;
        }

        $student->save();

        return to_route('dashboard.students.index')->with('status', 'student-updated');
    }

    public function destroy(User $student): RedirectResponse
    {
        $this->ensureStudent($student);

        $student->delete();

        return to_route('dashboard.students.index')->with('status', 'student-deleted');
    }

    private function studentData(User $student): array
    {
        return [
            'id' => $student->id,
            'nisn' => $student->nisn,
            'name' => $student->name,
            'birth_date' => $student->birth_date?->toDateString(),
            'address' => $student->address,
            'social_link' => $student->social_link,
        ];
    }

    private function ensureStudent(User $student): void
    {
        abort_unless($student->role === UserRole::Siswa, 404);
    }

    private function emailFromNisn(string $nisn): string
    {
        return sprintf('%s@siswa.ruangkarya.local', $nisn);
    }
}
