<?php

namespace App\Http\Responses;

use App\Enums\UserRole;
use Illuminate\Http\Request;
use Laravel\Fortify\Contracts\RegisterResponse as RegisterResponseContract;

class RegisterResponse implements RegisterResponseContract
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

        if ($role instanceof UserRole && $role === UserRole::Siswa) {
            return route('student.home');
        }

        return route('home');
    }
}
