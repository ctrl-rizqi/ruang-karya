export type User = {
    id: number;
    name: string;
    email: string;
    role: 'GURU' | 'SISWA';
    nisn?: string | null;
    birth_date?: string | null;
    address?: string | null;
    social_link?: string | null;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
};

export type Auth = {
    user: User;
};

export type TwoFactorSetupData = {
    svg: string;
    url: string;
};

export type TwoFactorSecretKey = {
    secretKey: string;
};
