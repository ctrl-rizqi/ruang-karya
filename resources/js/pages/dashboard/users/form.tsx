import { Head, Link, useForm } from '@inertiajs/react';
import { format } from 'date-fns';
import {
    AtSign,
    ChevronLeft,
    GraduationCap,
    Lock,
    Phone,
    Save,
    School,
    Share2,
    ShieldCheck,
    Sparkles,
    User,
    UserPlus,
    X,
} from 'lucide-react';
import type { SubmitEvent } from 'react';
import { useState } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';

type UserRole = 'GURU' | 'SISWA';
type GenderOption = 'L' | 'P';
type ListField = 'skills' | 'achievements' | 'interests';

type UserFormData = {
    id: number;
    role: UserRole;
    nisn: string;
    name: string;
    gender: GenderOption | null;
    phone: string | null;
    birth_place: string | null;
    birth_date: string | null;
    address: string | null;
    bio: string | null;
    skills: string[];
    achievements: string[];
    interests: string[];
    social_link: string | null;
    instagram: string | null;
    facebook: string | null;
    tiktok: string | null;
    linkedin: string | null;
    classroom_id: number | null;
    major_id: number | null;
};

type Option = {
    id: number;
    name: string;
};

type UserFormProps = {
    mode: 'create' | 'edit';
    user: UserFormData | null;
    roleOptions: UserRole[];
    classrooms: Option[];
    majors: Option[];
};

export default function UserForm({
    mode,
    user,
    roleOptions,
    classrooms,
    majors,
}: UserFormProps) {
    const isEditMode = mode === 'edit' && user !== null;
    const [drafts, setDrafts] = useState<Record<ListField, string>>({
        skills: '',
        achievements: '',
        interests: '',
    });

    const form = useForm({
        role: user?.role ?? 'SISWA',
        nisn: user?.nisn ?? '',
        name: user?.name ?? '',
        password: '',
        password_confirmation: '',
        gender: user?.gender ?? '',
        phone: user?.phone ?? '',
        birth_place: user?.birth_place ?? '',
        birth_date: user?.birth_date ?? '',
        address: user?.address ?? '',
        bio: user?.bio ?? '',
        skills: user?.skills ?? [],
        achievements: user?.achievements ?? [],
        interests: user?.interests ?? [],
        social_link: user?.social_link ?? '',
        instagram: user?.instagram ?? '',
        facebook: user?.facebook ?? '',
        tiktok: user?.tiktok ?? '',
        linkedin: user?.linkedin ?? '',
        classroom_id: user?.classroom_id?.toString() ?? '',
        major_id: user?.major_id?.toString() ?? '',
        _method: isEditMode ? 'PUT' : 'POST',
    });

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
        {
            title: 'Manajemen Users',
            href: '/dashboard/users',
        },
        {
            title: isEditMode ? 'Edit Profil User' : 'Tambah User Baru',
            href:
                isEditMode && user
                    ? `/dashboard/users/${user.id}/edit`
                    : '/dashboard/users/create',
        },
    ];

    const addListItem = (field: ListField) => {
        const value = drafts[field].trim();

        if (!value) {
            return;
        }

        if (form.data[field].includes(value)) {
            setDrafts((currentDrafts) => ({
                ...currentDrafts,
                [field]: '',
            }));

            return;
        }

        form.setData(field, [...form.data[field], value]);
        setDrafts((currentDrafts) => ({
            ...currentDrafts,
            [field]: '',
        }));
    };

    const removeListItem = (field: ListField, index: number) => {
        form.setData(
            field,
            form.data[field].filter((_, listIndex) => listIndex !== index),
        );
    };

    const submit = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (isEditMode && user) {
            form.post(`/dashboard/users/${user.id}`, {
                onSuccess: () =>
                    form.reset('password', 'password_confirmation'),
            });

            return;
        }

        form.post('/dashboard/users');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isEditMode ? 'Edit User' : 'Tambah User'} />

            <div className="mx-auto max-w-5xl px-6 py-10">
                <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
                    <div>
                        <Button
                            asChild
                            variant="ghost"
                            size="sm"
                            className="group mb-4 -ml-2 rounded-xl text-muted-foreground hover:text-foreground"
                        >
                            <Link
                                href="/dashboard/users"
                                className="flex items-center gap-1"
                            >
                                <ChevronLeft className="size-4 transition-transform group-hover:-translate-x-1" />{' '}
                                Kembali ke Daftar
                            </Link>
                        </Button>
                        <div className="flex items-center gap-3">
                            <div className="flex size-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-xl shadow-blue-500/20">
                                {isEditMode ? (
                                    <User className="size-6" />
                                ) : (
                                    <UserPlus className="size-6" />
                                )}
                            </div>
                            <div>
                                <h1 className="text-3xl font-black tracking-tight">
                                    {isEditMode
                                        ? 'Edit Identitas User'
                                        : 'Daftarkan User Baru'}
                                </h1>
                                <p className="mt-1 text-muted-foreground">
                                    Lengkapi data pengguna beserta profil
                                    profesionalnya.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <form
                    onSubmit={submit}
                    className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12"
                >
                    <div className="space-y-8 lg:col-span-8">
                        <Card className="rounded-[2.5rem] border-none bg-white shadow-sm dark:bg-[#161615]">
                            <CardHeader className="px-8 pt-8">
                                <CardTitle className="flex items-center gap-3 text-lg font-bold">
                                    <AtSign className="size-5 text-blue-600" />{' '}
                                    Identitas Akun
                                </CardTitle>
                                <CardDescription>
                                    Informasi primer untuk login dan
                                    identifikasi sistem.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6 p-8 pt-4">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label
                                            htmlFor="role"
                                            className="ml-1 text-xs font-bold tracking-widest text-muted-foreground uppercase"
                                        >
                                            Tipe Akun / Role
                                        </Label>
                                        <Select
                                            value={form.data.role}
                                            onValueChange={(value) =>
                                                form.setData(
                                                    'role',
                                                    value as UserRole,
                                                )
                                            }
                                        >
                                            <SelectTrigger
                                                id="role"
                                                className="h-12 w-full rounded-xl border-none bg-gray-50/50 px-4 text-sm font-bold shadow-none transition-all outline-none focus:bg-white"
                                            >
                                                <SelectValue placeholder="Pilih Role" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {roleOptions.map((option) => (
                                                    <SelectItem
                                                        key={option}
                                                        value={option}
                                                    >
                                                        {option}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <InputError
                                            message={form.errors.role}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label
                                            htmlFor="nisn"
                                            className="ml-1 text-xs font-bold tracking-widest text-muted-foreground uppercase"
                                        >
                                            NISN / Identitas
                                        </Label>
                                        <Input
                                            id="nisn"
                                            placeholder="Contoh: 0098765432"
                                            className="rounded-xl border-transparent bg-gray-50/50 font-mono transition-all focus:bg-white dark:bg-accent/50 dark:focus:bg-accent"
                                            value={form.data.nisn}
                                            onChange={(event) =>
                                                form.setData(
                                                    'nisn',
                                                    event.target.value,
                                                )
                                            }
                                        />
                                        <InputError
                                            message={form.errors.nisn}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label
                                        htmlFor="name"
                                        className="ml-1 text-xs font-bold tracking-widest text-muted-foreground uppercase"
                                    >
                                        Nama Lengkap
                                    </Label>
                                    <Input
                                        id="name"
                                        placeholder="Nama lengkap sesuai data sekolah"
                                        className="rounded-xl border-transparent bg-gray-50/50 font-bold transition-all focus:bg-white dark:bg-accent/50 dark:focus:bg-accent"
                                        value={form.data.name}
                                        onChange={(event) =>
                                            form.setData(
                                                'name',
                                                event.target.value,
                                            )
                                        }
                                    />
                                    <InputError message={form.errors.name} />
                                </div>
                            </CardContent>
                        </Card>

                        {form.data.role === 'SISWA' ? (
                            <Card className="animate-in rounded-[2.5rem] border-none bg-white shadow-sm duration-300 zoom-in-95 fade-in dark:bg-[#161615]">
                                <CardHeader className="px-8 pt-8">
                                    <CardTitle className="flex items-center gap-3 text-lg font-bold">
                                        <GraduationCap className="size-5 text-indigo-600" />{' '}
                                        Detail Akademik
                                    </CardTitle>
                                    <CardDescription>
                                        Penempatan kelas dan jurusan untuk
                                        siswa.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="p-8 pt-4">
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label
                                                htmlFor="classroom_id"
                                                className="ml-1 text-xs font-bold tracking-widest text-muted-foreground uppercase"
                                            >
                                                Pilih Kelas
                                            </Label>
                                            <Select
                                                value={
                                                    form.data.classroom_id ||
                                                    'none'
                                                }
                                                onValueChange={(value) =>
                                                    form.setData(
                                                        'classroom_id',
                                                        value === 'none'
                                                            ? ''
                                                            : value,
                                                    )
                                                }
                                            >
                                                <SelectTrigger
                                                    id="classroom_id"
                                                    className="h-12 w-full rounded-xl border-none bg-gray-50/50 px-4 text-sm shadow-none transition-all outline-none focus:bg-white"
                                                >
                                                    <SelectValue placeholder="Pilih Kelas" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="none">
                                                        Pilih Kelas
                                                    </SelectItem>
                                                    {classrooms.map(
                                                        (classroom) => (
                                                            <SelectItem
                                                                key={
                                                                    classroom.id
                                                                }
                                                                value={classroom.id.toString()}
                                                            >
                                                                {classroom.name}
                                                            </SelectItem>
                                                        ),
                                                    )}
                                                </SelectContent>
                                            </Select>
                                            <InputError
                                                message={
                                                    form.errors.classroom_id
                                                }
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label
                                                htmlFor="major_id"
                                                className="ml-1 text-xs font-bold tracking-widest text-muted-foreground uppercase"
                                            >
                                                Pilih Jurusan
                                            </Label>
                                            <Select
                                                value={
                                                    form.data.major_id || 'none'
                                                }
                                                onValueChange={(value) =>
                                                    form.setData(
                                                        'major_id',
                                                        value === 'none'
                                                            ? ''
                                                            : value,
                                                    )
                                                }
                                            >
                                                <SelectTrigger
                                                    id="major_id"
                                                    className="h-12 w-full rounded-xl border-none bg-gray-50/50 px-4 text-sm shadow-none transition-all outline-none focus:bg-white"
                                                >
                                                    <SelectValue placeholder="Pilih Jurusan" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="none">
                                                        Pilih Jurusan
                                                    </SelectItem>
                                                    {majors.map((major) => (
                                                        <SelectItem
                                                            key={major.id}
                                                            value={major.id.toString()}
                                                        >
                                                            {major.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <InputError
                                                message={form.errors.major_id}
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ) : null}

                        <Card className="rounded-[2.5rem] border-none bg-white shadow-sm dark:bg-[#161615]">
                            <CardHeader className="px-8 pt-8">
                                <CardTitle className="flex items-center gap-3 text-lg font-bold">
                                    <Sparkles className="size-5 text-orange-500" />{' '}
                                    Profil Tambahan
                                </CardTitle>
                                <CardDescription>
                                    Data personal untuk memperkaya tampilan
                                    profil siswa.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6 p-8 pt-4">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label
                                            htmlFor="gender"
                                            className="ml-1 text-xs font-bold tracking-widest text-muted-foreground uppercase"
                                        >
                                            Jenis Kelamin
                                        </Label>
                                        <Select
                                            value={form.data.gender || 'none'}
                                            onValueChange={(value) =>
                                                form.setData(
                                                    'gender',
                                                    value === 'none'
                                                        ? ''
                                                        : (value as GenderOption),
                                                )
                                            }
                                        >
                                            <SelectTrigger
                                                id="gender"
                                                className="h-12 w-full rounded-xl border-none bg-gray-50/50 px-4 text-sm shadow-none transition-all outline-none focus:bg-white"
                                            >
                                                <SelectValue placeholder="Pilih jenis kelamin" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="none">
                                                    Tidak diisi
                                                </SelectItem>
                                                <SelectItem value="L">
                                                    Laki-laki
                                                </SelectItem>
                                                <SelectItem value="P">
                                                    Perempuan
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <InputError
                                            message={form.errors.gender}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label
                                            htmlFor="phone"
                                            className="ml-1 text-xs font-bold tracking-widest text-muted-foreground uppercase"
                                        >
                                            Nomor WhatsApp
                                        </Label>
                                        <div className="relative">
                                            <Phone className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
                                            <Input
                                                id="phone"
                                                className="rounded-xl border-transparent bg-gray-50/50 pl-10 transition-all focus:bg-white dark:bg-accent/50 dark:focus:bg-accent"
                                                placeholder="08xxxxxxxxxx"
                                                value={form.data.phone}
                                                onChange={(event) =>
                                                    form.setData(
                                                        'phone',
                                                        event.target.value,
                                                    )
                                                }
                                            />
                                        </div>
                                        <InputError
                                            message={form.errors.phone}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label
                                            htmlFor="birth_place"
                                            className="ml-1 text-xs font-bold tracking-widest text-muted-foreground uppercase"
                                        >
                                            Tempat Lahir
                                        </Label>
                                        <Input
                                            id="birth_place"
                                            className="rounded-xl border-transparent bg-gray-50/50 transition-all focus:bg-white dark:bg-accent/50 dark:focus:bg-accent"
                                            value={form.data.birth_place}
                                            onChange={(event) =>
                                                form.setData(
                                                    'birth_place',
                                                    event.target.value,
                                                )
                                            }
                                        />
                                        <InputError
                                            message={form.errors.birth_place}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label
                                            htmlFor="birth_date"
                                            className="ml-1 text-xs font-bold tracking-widest text-muted-foreground uppercase"
                                        >
                                            Tanggal Lahir
                                        </Label>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Input
                                                    id="birth_date"
                                                    readOnly
                                                    className="cursor-pointer rounded-xl border-transparent bg-gray-50/50 transition-all focus:bg-white dark:bg-accent/50 dark:focus:bg-accent"
                                                    value={form.data.birth_date}
                                                />
                                            </PopoverTrigger>
                                            <PopoverContent
                                                className="w-auto p-0"
                                                align="start"
                                            >
                                                <Calendar
                                                    mode="single"
                                                    captionLayout="dropdown"
                                                    selected={
                                                        form.data.birth_date
                                                            ? new Date(
                                                                  form.data
                                                                      .birth_date,
                                                              )
                                                            : undefined
                                                    }
                                                    onSelect={(date) => {
                                                        if (date) {
                                                            form.setData(
                                                                'birth_date',
                                                                format(
                                                                    date,
                                                                    'yyyy-MM-dd',
                                                                ),
                                                            );
                                                        }
                                                    }}
                                                    disabled={(date) =>
                                                        date > new Date() ||
                                                        date <
                                                            new Date(
                                                                '1900-01-01',
                                                            )
                                                    }
                                                    autoFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <InputError
                                            message={form.errors.birth_date}
                                        />
                                    </div>

                                    <div className="space-y-2 md:col-span-2">
                                        <Label
                                            htmlFor="address"
                                            className="ml-1 text-xs font-bold tracking-widest text-muted-foreground uppercase"
                                        >
                                            Alamat
                                        </Label>
                                        <Input
                                            id="address"
                                            className="rounded-xl border-transparent bg-gray-50/50 transition-all focus:bg-white dark:bg-accent/50 dark:focus:bg-accent"
                                            value={form.data.address}
                                            onChange={(event) =>
                                                form.setData(
                                                    'address',
                                                    event.target.value,
                                                )
                                            }
                                        />
                                        <InputError
                                            message={form.errors.address}
                                        />
                                    </div>

                                    <div className="space-y-2 md:col-span-2">
                                        <Label
                                            htmlFor="bio"
                                            className="ml-1 text-xs font-bold tracking-widest text-muted-foreground uppercase"
                                        >
                                            Bio Singkat
                                        </Label>
                                        <Textarea
                                            id="bio"
                                            className="min-h-24 rounded-xl border-transparent bg-gray-50/50 transition-all focus:bg-white dark:bg-accent/50 dark:focus:bg-accent"
                                            value={form.data.bio}
                                            onChange={(event) =>
                                                form.setData(
                                                    'bio',
                                                    event.target.value,
                                                )
                                            }
                                        />
                                        <InputError message={form.errors.bio} />
                                    </div>

                                    {(
                                        [
                                            {
                                                field: 'instagram',
                                                label: 'Instagram',
                                                placeholder:
                                                    'https://instagram.com/username',
                                                error: form.errors.instagram,
                                            },
                                            {
                                                field: 'facebook',
                                                label: 'Facebook',
                                                placeholder:
                                                    'https://facebook.com/username',
                                                error: form.errors.facebook,
                                            },
                                            {
                                                field: 'tiktok',
                                                label: 'TikTok',
                                                placeholder:
                                                    'https://tiktok.com/@username',
                                                error: form.errors.tiktok,
                                            },
                                            {
                                                field: 'linkedin',
                                                label: 'LinkedIn',
                                                placeholder:
                                                    'https://linkedin.com/in/username',
                                                error: form.errors.linkedin,
                                            },
                                        ] as const
                                    ).map(
                                        ({
                                            field,
                                            label,
                                            placeholder,
                                            error,
                                        }) => (
                                            <div
                                                key={field}
                                                className="space-y-2"
                                            >
                                                <Label
                                                    htmlFor={field}
                                                    className="ml-1 text-xs font-bold tracking-widest text-muted-foreground uppercase"
                                                >
                                                    {label}
                                                </Label>
                                                <div className="relative">
                                                    <Share2 className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
                                                    <Input
                                                        id={field}
                                                        type="url"
                                                        className="rounded-xl border-transparent bg-gray-50/50 pl-10 transition-all focus:bg-white dark:bg-accent/50 dark:focus:bg-accent"
                                                        placeholder={
                                                            placeholder
                                                        }
                                                        value={form.data[field]}
                                                        onChange={(event) =>
                                                            form.setData(
                                                                field,
                                                                event.target
                                                                    .value,
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <InputError message={error} />
                                            </div>
                                        ),
                                    )}

                                    <div className="space-y-2 md:col-span-2">
                                        <Label
                                            htmlFor="social_link"
                                            className="ml-1 text-xs font-bold tracking-widest text-muted-foreground uppercase"
                                        >
                                            Website Personal (URL)
                                        </Label>
                                        <div className="relative">
                                            <Share2 className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
                                            <Input
                                                id="social_link"
                                                type="url"
                                                className="rounded-xl border-transparent bg-gray-50/50 pl-10 transition-all focus:bg-white dark:bg-accent/50 dark:focus:bg-accent"
                                                placeholder="https://myportfolio.dev"
                                                value={form.data.social_link}
                                                onChange={(event) =>
                                                    form.setData(
                                                        'social_link',
                                                        event.target.value,
                                                    )
                                                }
                                            />
                                        </div>
                                        <InputError
                                            message={form.errors.social_link}
                                        />
                                    </div>
                                </div>

                                {(
                                    [
                                        {
                                            field: 'skills',
                                            label: 'Skills',
                                            placeholder:
                                                'Contoh: Laravel, Figma, Public Speaking',
                                            error: form.errors.skills,
                                        },
                                        {
                                            field: 'achievements',
                                            label: 'Prestasi',
                                            placeholder:
                                                'Contoh: Juara LKS Tingkat Kota',
                                            error: form.errors.achievements,
                                        },
                                        {
                                            field: 'interests',
                                            label: 'Bidang Minat',
                                            placeholder:
                                                'Contoh: Data Science, Fotografi',
                                            error: form.errors.interests,
                                        },
                                    ] as const
                                ).map(
                                    ({ field, label, placeholder, error }) => (
                                        <div key={field} className="space-y-3">
                                            <Label
                                                htmlFor={field}
                                                className="ml-1 text-xs font-bold tracking-widest text-muted-foreground uppercase"
                                            >
                                                {label}
                                            </Label>
                                            <div className="flex flex-col gap-3 sm:flex-row">
                                                <Input
                                                    id={field}
                                                    className="rounded-xl border-transparent bg-gray-50/50 transition-all focus:bg-white dark:bg-accent/50 dark:focus:bg-accent"
                                                    placeholder={placeholder}
                                                    value={drafts[field]}
                                                    onChange={(event) => {
                                                        const value =
                                                            event.target.value;

                                                        setDrafts(
                                                            (
                                                                currentDrafts,
                                                            ) => ({
                                                                ...currentDrafts,
                                                                [field]: value,
                                                            }),
                                                        );
                                                    }}
                                                    onKeyDown={(event) => {
                                                        if (
                                                            event.key ===
                                                            'Enter'
                                                        ) {
                                                            event.preventDefault();
                                                            addListItem(field);
                                                        }
                                                    }}
                                                />
                                                <Button
                                                    type="button"
                                                    variant="secondary"
                                                    className="rounded-xl"
                                                    onClick={() =>
                                                        addListItem(field)
                                                    }
                                                >
                                                    Tambah
                                                </Button>
                                            </div>

                                            {form.data[field].length > 0 ? (
                                                <div className="flex flex-wrap gap-2">
                                                    {form.data[field].map(
                                                        (item, index) => (
                                                            <span
                                                                key={`${field}-${item}`}
                                                                className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-100"
                                                            >
                                                                {item}
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        removeListItem(
                                                                            field,
                                                                            index,
                                                                        )
                                                                    }
                                                                    className="text-blue-400 hover:text-blue-700 dark:text-blue-200"
                                                                >
                                                                    <X className="size-3" />
                                                                </button>
                                                            </span>
                                                        ),
                                                    )}
                                                </div>
                                            ) : null}

                                            <InputError message={error} />
                                        </div>
                                    ),
                                )}
                            </CardContent>
                        </Card>

                        <Card className="rounded-[2.5rem] border-none bg-white shadow-sm dark:bg-[#161615]">
                            <CardHeader className="px-8 pt-8">
                                <CardTitle className="flex items-center gap-3 text-lg font-bold">
                                    <ShieldCheck className="size-5 text-rose-600" />{' '}
                                    Keamanan & Akses
                                </CardTitle>
                                <CardDescription>
                                    Tentukan password awal atau ubah password
                                    pengguna.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="grid grid-cols-1 gap-6 p-8 pt-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="password"
                                        className="ml-1 text-xs font-bold tracking-widest text-muted-foreground uppercase"
                                    >
                                        Password
                                    </Label>
                                    <div className="relative">
                                        <Lock className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder="Minimal 8 karakter"
                                            className="rounded-xl border-transparent bg-gray-50/50 pl-10 transition-all focus:bg-white dark:bg-accent/50 dark:focus:bg-accent"
                                            value={form.data.password}
                                            onChange={(event) =>
                                                form.setData(
                                                    'password',
                                                    event.target.value,
                                                )
                                            }
                                        />
                                    </div>
                                    <InputError
                                        message={form.errors.password}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label
                                        htmlFor="password_confirmation"
                                        className="ml-1 text-xs font-bold tracking-widest text-muted-foreground uppercase"
                                    >
                                        Ulangi Password
                                    </Label>
                                    <div className="relative">
                                        <Lock className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
                                        <Input
                                            id="password_confirmation"
                                            type="password"
                                            placeholder="Konfirmasi password"
                                            className="rounded-xl border-transparent bg-gray-50/50 pl-10 transition-all focus:bg-white dark:bg-accent/50 dark:focus:bg-accent"
                                            value={
                                                form.data.password_confirmation
                                            }
                                            onChange={(event) =>
                                                form.setData(
                                                    'password_confirmation',
                                                    event.target.value,
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="flex items-center justify-end gap-4 pt-4">
                            <Button
                                asChild
                                variant="ghost"
                                className="h-12 rounded-xl px-8"
                            >
                                <Link href="/dashboard/users">Batalkan</Link>
                            </Button>
                            <Button
                                disabled={form.processing}
                                type="submit"
                                className="h-14 rounded-2xl bg-blue-600 px-10 text-white shadow-xl shadow-blue-500/20 transition-all hover:scale-[1.02] hover:bg-blue-700 active:scale-[0.98]"
                            >
                                {form.processing ? (
                                    'Sedang Memproses...'
                                ) : (
                                    <span className="flex items-center gap-2 text-xs font-black tracking-widest uppercase">
                                        {isEditMode
                                            ? 'Perbarui Data User'
                                            : 'Simpan User Baru'}{' '}
                                        <Save className="size-4" />
                                    </span>
                                )}
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-8 lg:col-span-4">
                        <div className="rounded-[2.5rem] bg-blue-600 p-8 text-white shadow-xl shadow-blue-500/20">
                            <h3 className="mb-4 flex items-center gap-2 text-xs font-bold tracking-widest uppercase">
                                <Sparkles className="size-4 text-blue-200" />{' '}
                                Tips Pendaftaran
                            </h3>
                            <div className="space-y-4 text-sm leading-relaxed text-blue-100">
                                <p>
                                    1. Role menentukan level akses dashboard.
                                    Pastikan role sesuai fungsi pengguna.
                                </p>
                                <p>
                                    2. Data profil tambahan membantu halaman
                                    publik siswa terlihat lebih informatif.
                                </p>
                                <p>
                                    3. Skills dan prestasi bisa diisi oleh guru,
                                    lalu disempurnakan oleh siswa.
                                </p>
                            </div>
                            <div className="mt-8 h-1 w-12 rounded-full bg-white/30" />
                        </div>

                        <Card className="rounded-[2.5rem] border-none bg-white shadow-sm dark:bg-[#161615]">
                            <CardHeader className="p-8 pb-4 text-center">
                                <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                                    <School className="size-6" />
                                </div>
                                <CardTitle className="text-sm font-bold tracking-widest uppercase">
                                    Master Data
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-8 pt-0 text-center">
                                <p className="mb-6 text-xs leading-relaxed text-muted-foreground">
                                    Jika kelas atau jurusan belum tersedia,
                                    tambahkan dulu melalui menu Master Data.
                                </p>
                                <div className="flex flex-col gap-2">
                                    <Button
                                        asChild
                                        variant="outline"
                                        size="sm"
                                        className="rounded-xl text-[10px] font-bold tracking-widest uppercase"
                                    >
                                        <Link href="/dashboard/classrooms">
                                            Manajemen Kelas
                                        </Link>
                                    </Button>
                                    <Button
                                        asChild
                                        variant="outline"
                                        size="sm"
                                        className="rounded-xl text-[10px] font-bold tracking-widest uppercase"
                                    >
                                        <Link href="/dashboard/majors">
                                            Manajemen Jurusan
                                        </Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
