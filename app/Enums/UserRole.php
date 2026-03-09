<?php

namespace App\Enums;

enum UserRole: string
{
    case Admin = 'ADMIN';
    case Guru = 'GURU';
    case Siswa = 'SISWA';

    public function canAuthenticate(): bool
    {
        return in_array($this, [self::Guru, self::Siswa], true);
    }

    public static function authenticationValues(): array
    {
        return array_map(
            fn (self $role): string => $role->value,
            array_filter(self::cases(), fn (self $role): bool => $role->canAuthenticate()),
        );
    }
}
