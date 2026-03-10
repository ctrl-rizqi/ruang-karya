<?php

namespace App\Http\Requests\Major;

use Illuminate\Foundation\Http\FormRequest;

class StoreMajorRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255', 'unique:majors,name'],
            'code' => ['required', 'string', 'max:20', 'unique:majors,code'],
        ];
    }
}
