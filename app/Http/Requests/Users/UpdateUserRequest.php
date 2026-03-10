<?php

namespace App\Http\Requests\Users;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class UpdateUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->role === UserRole::Guru;
    }

    public function rules(): array
    {
        $user = $this->route('user');

        return [
            'role' => ['required', Rule::enum(UserRole::class)],
            'nisn' => ['required', 'digits:10', Rule::unique(User::class, 'nisn')->ignore($user?->id)],
            'name' => ['required', 'string', 'max:255'],
            'password' => ['nullable', 'string', Password::default(), 'confirmed'],
            'birth_date' => ['nullable', 'date'],
            'address' => ['nullable', 'string', 'max:1000'],
            'social_link' => ['nullable', 'url', 'max:255'],
        ];
    }

    protected function prepareForValidation(): void
    {
        if ($this->input('password') === '') {
            $this->merge(['password' => null]);
        }
    }
}
