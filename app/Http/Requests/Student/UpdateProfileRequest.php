<?php

namespace App\Http\Requests\Student;

use App\Enums\UserRole;
use Illuminate\Foundation\Http\FormRequest;

class UpdateProfileRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->role === UserRole::Siswa;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'birth_date' => ['nullable', 'date'],
            'address' => ['nullable', 'string', 'max:1000'],
            'social_link' => ['nullable', 'url', 'max:255'],
        ];
    }
}
