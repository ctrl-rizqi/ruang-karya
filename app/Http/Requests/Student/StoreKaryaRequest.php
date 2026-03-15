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
            'media_type' => ['required', 'string', 'in:image,video,document,link'],
            'media_url' => ['required_if:media_type,link', 'nullable', 'url', 'max:2000'],
            'file' => [
                'required_unless:media_type,link',
                'nullable',
                'file',
                function ($attribute, $value, $fail) {
                    $type = $this->input('media_type');
                    if ($type === 'image' && ! in_array($value->getMimeType(), ['image/jpeg', 'image/png', 'image/webp'])) {
                        $fail('The file must be an image (jpeg, png, webp).');
                    }
                    if ($type === 'video' && ! in_array($value->getMimeType(), ['video/mp4', 'video/quicktime', 'video/x-msvideo'])) {
                        $fail('The file must be a video (mp4, mov, avi).');
                    }
                    if ($type === 'document' && ! in_array($value->getMimeType(), ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'])) {
                        $fail('The file must be a document (pdf, doc, docx).');
                    }

                    // Size validation
                    if ($type === 'image' && $value->getSize() > 5 * 1024 * 1024) {
                        $fail('The image may not be greater than 5MB.');
                    }
                    if ($type === 'video' && $value->getSize() > 100 * 1024 * 1024) {
                        $fail('The video may not be greater than 100MB.');
                    }
                    if ($type === 'document' && $value->getSize() > 20 * 1024 * 1024) {
                        $fail('The document may not be greater than 20MB.');
                    }
                },
            ],
        ];
    }
}
