<?php

namespace App\Http\Requests\Users;

use App\Enums\UserRole;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateUserRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'nisn' => ['required', 'string', 'max:20', Rule::unique('users', 'nisn')->ignore($this->user)],
            'role' => ['required', Rule::in(UserRole::authenticationValues())],
            'password' => ['nullable', 'string', 'min:8'],
            'classroom_id' => ['nullable', 'exists:classrooms,id'],
            'major_id' => ['nullable', 'exists:majors,id'],
            'birth_date' => ['nullable', 'date'],
            'address' => ['nullable', 'string'],
            'social_link' => ['nullable', 'string', 'max:255'],
        ];
    }
}
