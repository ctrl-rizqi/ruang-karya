<?php

namespace App\Http\Controllers\Dashboard;

use App\Enums\UserRole;
use App\Http\Controllers\Controller;
use App\Http\Requests\Users\StoreUserRequest;
use App\Http\Requests\Users\UpdateUserRequest;
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
        $roleOptions = UserRole::authenticationValues();
        $role = strtoupper(trim((string) $request->query('role', '')));

        if (! in_array($role, $roleOptions, true)) {
            $role = '';
        }

        $users = User::query()
            ->whereIn('role', [UserRole::Guru, UserRole::Siswa])
            ->when($name !== '', fn ($query) => $query->where('name', 'like', "%{$name}%"))
            ->when($nisn !== '', fn ($query) => $query->where('nisn', 'like', "%{$nisn}%"))
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
            ],
            'roleOptions' => $roleOptions,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('dashboard/users/form', [
            'mode' => 'create',
            'user' => null,
            'roleOptions' => UserRole::authenticationValues(),
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
            'birth_date' => $attributes['birth_date'] ?? null,
            'address' => $attributes['address'] ?? null,
            'social_link' => $attributes['social_link'] ?? null,
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
            'birth_date' => $user->birth_date?->toDateString(),
            'address' => $user->address,
            'social_link' => $user->social_link,
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
