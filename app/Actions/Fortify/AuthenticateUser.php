<?php

namespace App\Actions\Fortify;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Laravel\Fortify\Fortify;

class AuthenticateUser
{
    public function __invoke(Request $request): ?User
    {
        $usernameField = Fortify::username();

        $user = User::query()
            ->where($usernameField, $request->input($usernameField))
            ->first();

        if (! $user || ! Hash::check((string) $request->input('password'), $user->password)) {
            return null;
        }

        $userRole = $user->role instanceof UserRole
            ? $user->role
            : UserRole::tryFrom((string) $user->role);

        if (! $userRole?->canAuthenticate()) {
            throw ValidationException::withMessages([
                $usernameField => [trans('auth.failed')],
            ]);
        }

        return $user;
    }
}
