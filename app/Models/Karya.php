<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Karya extends Model
{
    /** @use HasFactory<\Database\Factories\KaryaFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'description',
        'content',
        'media_type',
        'media_url',
        'media_path',
        'media_size',
        'status',
    ];

    protected $casts = [
        'is_liked' => 'boolean',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function likes(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'karya_likes')->withTimestamps();
    }
}
