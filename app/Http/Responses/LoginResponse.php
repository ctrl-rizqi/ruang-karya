<?php

namespace App\Http\Responses;

use App\Enums\UserRole;
use Illuminate\Http\Request;
use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;

class LoginResponse implements LoginResponseContract
{
    public function toResponse($request)
    {
        return redirect()->intended($this->resolveRedirectPath($request));
    }

    private function resolveRedirectPath(Request $request): string
    {
        $role = $request->user()?->role;

        if ($role instanceof UserRole && $role === UserRole::Guru) {
            return route('dashboard');
        }

        return route('home');
    }
}
