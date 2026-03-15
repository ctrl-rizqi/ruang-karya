<?php

namespace App\Http\Controllers\Dashboard;

use App\Enums\UserRole;
use App\Http\Controllers\Controller;
use App\Http\Requests\Users\StoreUserRequest;
use App\Http\Requests\Users\UpdateUserRequest;
use App\Models\Classroom;
use App\Models\Major;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function index(Request $request): Response
    {
        $name = trim((string) $request->query('name', ''));
        $nisn = trim((string) $request->query('nisn', ''));
        $classroomId = $request->query('classroom_id', '');
        $majorId = $request->query('major_id', '');
        $roleOptions = UserRole::authenticationValues();
        $role = strtoupper(trim((string) $request->query('role', '')));

        if (! in_array($role, $roleOptions, true)) {
            $role = '';
        }

        $users = User::query()
            ->with(['classroom', 'major'])
            ->whereIn('role', [UserRole::Guru, UserRole::Siswa])
            ->when($name !== '', fn ($query) => $query->where('name', 'like', "%{$name}%"))
            ->when($nisn !== '', fn ($query) => $query->where('nisn', 'like', "%{$nisn}%"))
            ->when($classroomId !== '', fn ($query) => $query->where('classroom_id', $classroomId))
            ->when($majorId !== '', fn ($query) => $query->where('major_id', $majorId))
            ->when($role !== '', fn ($query) => $query->where('role', $role))
            ->orderBy('name')
            ->paginate(10)
            ->withQueryString()
            ->through(fn (User $user): array => $this->userData($user));

        return Inertia::render('dashboard/users/index', [
            'users' => $users,
            'filters' => [
                'name' => $name,
                'nisn' => $nisn,
                'role' => $role,
                'classroom_id' => $classroomId,
                'major_id' => $majorId,
            ],
            'roleOptions' => $roleOptions,
            'classrooms' => Classroom::orderBy('name')->get(['id', 'name']),
            'majors' => Major::orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('dashboard/users/form', [
            'mode' => 'create',
            'user' => null,
            'roleOptions' => UserRole::authenticationValues(),
            'classrooms' => Classroom::orderBy('name')->get(['id', 'name']),
            'majors' => Major::orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function store(StoreUserRequest $request): RedirectResponse
    {
        $attributes = $request->validated();
        $role = UserRole::from($attributes['role']);

        User::create([
            'role' => $role,
            'nisn' => $attributes['nisn'],
            'name' => $attributes['name'],
            'email' => $this->emailFromIdentity($attributes['nisn'], $role),
            'password' => $attributes['password'],
            'classroom_id' => $attributes['classroom_id'] ?? null,
            'major_id' => $attributes['major_id'] ?? null,
            'gender' => $attributes['gender'] ?? null,
            'phone' => $attributes['phone'] ?? null,
            'birth_place' => $attributes['birth_place'] ?? null,
            'birth_date' => $attributes['birth_date'] ?? null,
            'address' => $attributes['address'] ?? null,
            'bio' => $attributes['bio'] ?? null,
            'skills' => $attributes['skills'] ?? null,
            'achievements' => $attributes['achievements'] ?? null,
            'interests' => $attributes['interests'] ?? null,
            'social_link' => $attributes['social_link'] ?? null,
            'instagram' => $attributes['instagram'] ?? null,
            'facebook' => $attributes['facebook'] ?? null,
            'tiktok' => $attributes['tiktok'] ?? null,
            'linkedin' => $attributes['linkedin'] ?? null,
        ]);

        return to_route('dashboard.users.index')->with('status', 'user-created');
    }

    public function edit(User $user): Response
    {
        $this->ensureManageableUser($user);

        return Inertia::render('dashboard/users/form', [
            'mode' => 'edit',
            'user' => $this->userData($user),
            'roleOptions' => UserRole::authenticationValues(),
            'classrooms' => Classroom::orderBy('name')->get(['id', 'name']),
            'majors' => Major::orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function update(UpdateUserRequest $request, User $user): RedirectResponse
    {
        $this->ensureManageableUser($user);

        $attributes = $request->validated();
        $password = $attributes['password'] ?? null;
        $role = UserRole::from($attributes['role']);

        unset($attributes['password']);

        $user->fill([
            ...$attributes,
            'role' => $role,
            'email' => $this->emailFromIdentity($attributes['nisn'], $role),
        ]);

        if ($password) {
            $user->password = $password;
        }

        $user->save();

        return to_route('dashboard.users.index')->with('status', 'user-updated');
    }

    public function destroy(User $user): RedirectResponse
    {
        $this->ensureManageableUser($user);

        $user->delete();

        return to_route('dashboard.users.index')->with('status', 'user-deleted');
    }

    private function userData(User $user): array
    {
        return [
            'id' => $user->id,
            'role' => $user->role->value,
            'nisn' => $user->nisn,
            'name' => $user->name,
            'gender' => $user->gender,
            'phone' => $user->phone,
            'birth_place' => $user->birth_place,
            'birth_date' => $user->birth_date?->toDateString(),
            'address' => $user->address,
            'bio' => $user->bio,
            'skills' => $user->skills ?? [],
            'achievements' => $user->achievements ?? [],
            'interests' => $user->interests ?? [],
            'social_link' => $user->social_link,
            'instagram' => $user->instagram,
            'facebook' => $user->facebook,
            'tiktok' => $user->tiktok,
            'linkedin' => $user->linkedin,
            'classroom_id' => $user->classroom_id,
            'major_id' => $user->major_id,
            'classroom_name' => $user->classroom?->name,
            'major_name' => $user->major?->name,
        ];
    }

    private function ensureManageableUser(User $user): void
    {
        abort_unless(in_array($user->role, [UserRole::Guru, UserRole::Siswa], true), 404);
    }

    private function emailFromIdentity(string $nisn, UserRole $role): string
    {
        return sprintf('%s@%s.ruangkarya.local', $nisn, strtolower($role->value));
    }
}
