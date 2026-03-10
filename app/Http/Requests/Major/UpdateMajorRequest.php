<?php

namespace App\Http\Requests\Major;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateMajorRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name' => [
                'required', 
                'string', 
                'max:255', 
                Rule::unique('majors', 'name')->ignore($this->route('major')),
            ],
            'code' => [
                'required', 
                'string', 
                'max:20', 
                Rule::unique('majors', 'code')->ignore($this->route('major')),
            ],
        ];
    }
}
