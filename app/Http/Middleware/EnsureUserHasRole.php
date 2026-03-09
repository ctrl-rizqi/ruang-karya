<?php

namespace App\Http\Middleware;

use BackedEnum;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserHasRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string ...$roles): Response
    {
        $user = $request->user();
        $userRole = $user?->role;

        if ($userRole instanceof BackedEnum) {
            $userRole = $userRole->value;
        }

        if (! $user || ! in_array((string) $userRole, $roles, true)) {
            abort(403);
        }

        return $next($request);
    }
}
