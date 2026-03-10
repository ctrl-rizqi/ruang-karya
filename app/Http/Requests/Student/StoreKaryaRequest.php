<?php

namespace App\Http\Requests\Student;

use App\Enums\UserRole;
use Illuminate\Foundation\Http\FormRequest;

class StoreKaryaRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->role === UserRole::Siswa;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:2000'],
            'content' => ['required', 'string', 'max:10000'],
        ];
    }
}
