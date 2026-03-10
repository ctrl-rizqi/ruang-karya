<?php

namespace App\Http\Requests\Students;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class UpdateStudentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->role === UserRole::Guru;
    }

    public function rules(): array
    {
        $student = $this->route('student');

        return [
            'nisn' => ['required', 'digits:10', Rule::unique(User::class, 'nisn')->ignore($student?->id)],
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
