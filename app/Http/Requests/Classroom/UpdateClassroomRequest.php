<?php

namespace App\Http\Requests\Classroom;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateClassroomRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name' => [
                'required', 
                'string', 
                'max:255', 
                Rule::unique('classrooms', 'name')->ignore($this->route('classroom')),
            ],
        ];
    }
}
