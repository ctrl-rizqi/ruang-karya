import { Head, Link, useForm, usePage } from '@inertiajs/react';
import {
    AtSign,
    Camera,
    ExternalLink,
    Globe,
    Lock,
    MapPin,
    Save,
    ShieldCheck,
    Sparkles,
    Trophy,
    User,
    UserCircle,
    X,
} from 'lucide-react';
import { format } from 'date-fns';
import { useRef, useState } from 'react';
import type { ChangeEvent, SubmitEvent } from 'react';
import InputError from '@/components/input-error';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import StudentLayout from '@/layouts/student-layout';

type StudentProfileProps = {
    student: {
        nisn: string | null;
        name: string;
        gender: 'L' | 'P' | null;
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
        avatar: string;
    };
};

type ListField = 'skills' | 'achievements' | 'interests';

export default function StudentProfile({ student }: StudentProfileProps) {
    const { auth } = usePage().props as {
        auth?: {
            user?: {
                email?: string;
            } | null;
        };
    };

    const fileInput = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [drafts, setDrafts] = useState<Record<ListField, string>>({
        skills: '',
        achievements: '',
        interests: '',
    });

    const form = useForm({
        name: student.name,
        gender: student.gender ?? '',
        phone: student.phone ?? '',
        birth_place: student.birth_place ?? '',
        birth_date: student.birth_date ?? '',
        address: student.address ?? '',
        bio: student.bio ?? '',
        skills: student.skills ?? [],
        achievements: student.achievements ?? [],
        interests: student.interests ?? [],
        social_link: student.social_link ?? '',
        instagram: student.instagram ?? '',
        facebook: student.facebook ?? '',
        tiktok: student.tiktok ?? '',
        linkedin: student.linkedin ?? '',
        avatar: null as File | null,
        current_password: '',
        password: '',
        password_confirmation: '',
        _method: 'PATCH',
    });

    const initials = student.name
        .split(' ')
        .map((namePart) => namePart[0])
        .join('')
        .toUpperCase();

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        form.setData('avatar', file);

        const reader = new FileReader();

        reader.onloadend = () => {
            if (typeof reader.result === 'string') {
                setPreview(reader.result);
            }
        };

        reader.readAsDataURL(file);
    };

    const clearPreview = () => {
        setPreview(null);
        form.setData('avatar', null);

        if (fileInput.current) {
            fileInput.current.value = '';
        }
    };

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

        form.post('/siswa/profile', {
            forceFormData: true,
            onSuccess: () => {
                setPreview(null);
                form.reset('current_password', 'password', 'password_confirmation');

                if (fileInput.current) {
                    fileInput.current.value = '';
                }
            },
        });
    };

    return (
        <StudentLayout>
            <Head title="Pengaturan Profil" />

            <div className="mx-auto max-w-5xl px-4 py-8">
                <div className="flex flex-col gap-8 md:flex-row">
                    <div className="space-y-6 md:w-1/3">
                        <Card className="overflow-hidden rounded-4xl border-none bg-white shadow-sm dark:bg-[#161615]">
                            <CardContent className="p-8 text-center">
                                <div className="group relative mb-6 inline-block">
                                    <Avatar className="size-32 overflow-hidden border-4 border-blue-50 dark:border-blue-900/20">
                                        <AvatarImage
                                            src={preview || student.avatar}
                                        />
                                        <AvatarFallback className="bg-blue-50 text-3xl font-bold text-blue-600">
                                            {initials}
                                        </AvatarFallback>
                                    </Avatar>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            fileInput.current?.click()
                                        }
                                        className="absolute inset-0 flex cursor-pointer flex-col items-center justify-center rounded-full bg-black/40 text-white opacity-0 transition-opacity group-hover:opacity-100"
                                    >
                                        <Camera className="mb-1 size-6" />
                                        <span className="text-[10px] font-bold tracking-widest uppercase">
                                            Update Foto
                                        </span>
                                    </button>

                                    {preview ? (
                                        <Button
                                            size="icon"
                                            variant="destructive"
                                            onClick={clearPreview}
                                            className="absolute -top-2 -right-2 size-8 rounded-full border-2 border-white shadow-lg dark:border-[#161615]"
                                        >
                                            <X className="size-4" />
                                        </Button>
                                    ) : null}

                                    <input
                                        type="file"
                                        ref={fileInput}
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />
                                </div>

                                <h2 className="mb-1 line-clamp-1 text-xl font-bold">
                                    {student.name}
                                </h2>
                                <p className="mb-6 text-xs font-bold tracking-widest text-muted-foreground uppercase">
                                    Student Account
                                </p>

                                <div className="space-y-3 border-t border-gray-50 pt-6 text-left dark:border-white/5">
                                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                        <AtSign className="size-4 shrink-0 text-blue-600" />
                                        <span className="truncate">
                                            {auth?.user?.email ?? '-'}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                        <Lock className="size-4 shrink-0 text-orange-400" />
                                        <span>
                                            NISN: {student.nisn ?? 'Not set'}
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="rounded-4xl bg-blue-600 p-6 text-white shadow-xl shadow-blue-500/20">
                            <h3 className="mb-2 flex items-center gap-2 text-sm font-bold tracking-widest uppercase">
                                <Trophy className="size-4" /> Tips Profil
                            </h3>
                            <p className="text-xs leading-relaxed text-blue-100">
                                Lengkapi bio, skill, dan prestasi agar
                                portofolio kamu terlihat lebih profesional saat
                                dilihat pembimbing atau industri.
                            </p>
                        </div>
                    </div>

                    <div className="flex-1 space-y-6">
                        <form onSubmit={submit} className="space-y-6">
                            <Card className="rounded-4xl border-none bg-white shadow-sm dark:bg-[#161615]">
                                <CardHeader className="px-8 pt-8 pb-4">
                                    <CardTitle className="flex items-center gap-3 text-xl font-bold">
                                        <UserCircle className="size-6 text-blue-600" />{' '}
                                        Informasi Dasar
                                    </CardTitle>
                                    <CardDescription>
                                        Identitas dasar dan data biodata utama
                                        profil siswa.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6 p-8 pt-0">
                                    <div className="grid gap-6 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label
                                                htmlFor="name"
                                                className="ml-1 text-xs font-bold tracking-widest text-muted-foreground uppercase"
                                            >
                                                Nama Lengkap
                                            </Label>
                                            <div className="relative">
                                                <User className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
                                                <Input
                                                    id="name"
                                                    className="rounded-xl border-transparent bg-gray-50/50 pl-10 transition-all focus:bg-white dark:bg-accent/50 dark:focus:bg-accent/40"
                                                    value={form.data.name}
                                                    onChange={(event) =>
                                                        form.setData(
                                                            'name',
                                                            event.target.value,
                                                        )
                                                    }
                                                />
                                            </div>
                                            <InputError
                                                message={form.errors.name}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label
                                                htmlFor="gender"
                                                className="ml-1 text-xs font-bold tracking-widest text-muted-foreground uppercase"
                                            >
                                                Jenis Kelamin
                                            </Label>
                                            <Select
                                                value={form.data.gender}
                                                onValueChange={(value) =>
                                                    form.setData(
                                                        'gender',
                                                        value as 'L' | 'P' | '',
                                                    )
                                                }
                                            >
                                                <SelectTrigger
                                                    id="gender"
                                                    className="h-10 rounded-xl border-transparent bg-gray-50/50 transition-all focus:bg-white dark:bg-accent/50 dark:focus:bg-accent/40"
                                                >
                                                    <SelectValue placeholder="Pilih jenis kelamin" />
                                                </SelectTrigger>
                                                <SelectContent>
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
                                                htmlFor="birth_place"
                                                className="ml-1 text-xs font-bold tracking-widest text-muted-foreground uppercase"
                                            >
                                                Tempat Lahir
                                            </Label>
                                            <Input
                                                id="birth_place"
                                                className="rounded-xl border-transparent bg-gray-50/50 transition-all focus:bg-white dark:bg-accent/50 dark:focus:bg-accent/40"
                                                value={form.data.birth_place}
                                                onChange={(event) =>
                                                    form.setData(
                                                        'birth_place',
                                                        event.target.value,
                                                    )
                                                }
                                            />
                                            <InputError
                                                message={
                                                    form.errors.birth_place
                                                }
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label
                                                htmlFor="phone"
                                                className="ml-1 text-xs font-bold tracking-widest text-muted-foreground uppercase"
                                            >
                                                Nomor WhatsApp
                                            </Label>
                                            <Input
                                                id="phone"
                                                className="rounded-xl border-transparent bg-gray-50/50 transition-all focus:bg-white dark:bg-accent/50 dark:focus:bg-accent/40"
                                                placeholder="08xxxxxxxxxx"
                                                value={form.data.phone}
                                                onChange={(event) =>
                                                    form.setData(
                                                        'phone',
                                                        event.target.value,
                                                    )
                                                }
                                            />
                                            <InputError
                                                message={form.errors.phone}
                                            />
                                        </div>

                                        <div className="space-y-2 md:col-span-2">
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
                                                        value={
                                                            form.data.birth_date
                                                        }
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
                                            <div className="relative">
                                                <MapPin className="absolute top-4 left-3.5 size-4 text-muted-foreground" />
                                                <Input
                                                    id="address"
                                                    className="h-12 rounded-xl border-transparent bg-gray-50/50 pl-10 transition-all focus:bg-white dark:bg-accent/50 dark:focus:bg-accent/40"
                                                    value={form.data.address}
                                                    onChange={(event) =>
                                                        form.setData(
                                                            'address',
                                                            event.target.value,
                                                        )
                                                    }
                                                />
                                            </div>
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
                                                className="min-h-28 rounded-xl border-transparent bg-gray-50/50 transition-all focus:bg-white dark:bg-accent/50 dark:focus:bg-accent/40"
                                                placeholder="Ceritakan dirimu secara singkat, fokus pada ketertarikan dan tujuan belajarmu."
                                                value={form.data.bio}
                                                onChange={(event) =>
                                                    form.setData(
                                                        'bio',
                                                        event.target.value,
                                                    )
                                                }
                                            />
                                            <InputError
                                                message={form.errors.bio}
                                            />
                                        </div>
                                    </div>

                                    <InputError message={form.errors.avatar} />
                                </CardContent>
                            </Card>

                            <Card className="rounded-4xl border-none bg-white shadow-sm dark:bg-[#161615]">
                                <CardHeader className="px-8 pt-8 pb-4">
                                    <CardTitle className="flex items-center gap-3 text-xl font-bold">
                                        <Sparkles className="size-6 text-indigo-600" />{' '}
                                        Profil Profesional
                                    </CardTitle>
                                    <CardDescription>
                                        Tambahkan keahlian, prestasi, dan minat
                                        agar profil lebih kuat.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6 p-8 pt-0">
                                    {(
                                        [
                                            {
                                                field: 'skills',
                                                label: 'Skills',
                                                placeholder:
                                                    'Contoh: UI Design, Public Speaking, Laravel',
                                                error: form.errors.skills,
                                            },
                                            {
                                                field: 'achievements',
                                                label: 'Prestasi',
                                                placeholder:
                                                    'Contoh: Juara 1 LKS tingkat kota',
                                                error: form.errors.achievements,
                                            },
                                            {
                                                field: 'interests',
                                                label: 'Bidang Minat',
                                                placeholder:
                                                    'Contoh: Data Science, Videografi, Animasi',
                                                error: form.errors.interests,
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
                                                className="space-y-3"
                                            >
                                                <Label
                                                    htmlFor={field}
                                                    className="ml-1 text-xs font-bold tracking-widest text-muted-foreground uppercase"
                                                >
                                                    {label}
                                                </Label>
                                                <div className="flex flex-col gap-3 sm:flex-row">
                                                    <Input
                                                        id={field}
                                                        className="rounded-xl border-transparent bg-gray-50/50 transition-all focus:bg-white dark:bg-accent/50 dark:focus:bg-accent/40"
                                                        placeholder={
                                                            placeholder
                                                        }
                                                        value={drafts[field]}
                                                        onChange={(event) => {
                                                            const value =
                                                                event.target
                                                                    .value;

                                                            setDrafts(
                                                                (
                                                                    currentDrafts,
                                                                ) => ({
                                                                    ...currentDrafts,
                                                                    [field]:
                                                                        value,
                                                                }),
                                                            );
                                                        }}
                                                        onKeyDown={(event) => {
                                                            if (
                                                                event.key ===
                                                                'Enter'
                                                            ) {
                                                                event.preventDefault();
                                                                addListItem(
                                                                    field,
                                                                );
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

                            <Card className="rounded-4xl border-none bg-white shadow-sm dark:bg-[#161615]">
                                <CardHeader className="px-8 pt-8 pb-4">
                                    <CardTitle className="flex items-center gap-3 text-xl font-bold">
                                        <ShieldCheck className="size-6 text-orange-500" />{' '}
                                        Keamanan Akun
                                    </CardTitle>
                                    <CardDescription>
                                        Perbarui kata sandi Anda untuk menjaga keamanan akun. Kosongkan jika tidak ingin mengubah.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4 p-8 pt-0">
                                    <div className="space-y-2">
                                        <Label
                                            htmlFor="current_password"
                                            className="ml-1 text-xs font-bold tracking-widest text-muted-foreground uppercase"
                                        >
                                            Kata Sandi Saat Ini
                                        </Label>
                                        <div className="relative">
                                            <Lock className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
                                            <Input
                                                id="current_password"
                                                type="password"
                                                autoComplete="current-password"
                                                className="h-12 rounded-xl border-transparent bg-gray-50/50 pl-10 transition-all focus:bg-white dark:bg-accent/50 dark:focus:bg-accent/40"
                                                value={form.data.current_password}
                                                onChange={(event) =>
                                                    form.setData(
                                                        'current_password',
                                                        event.target.value,
                                                    )
                                                }
                                            />
                                        </div>
                                        <InputError
                                            message={form.errors.current_password}
                                        />
                                    </div>

                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label
                                                htmlFor="password"
                                                className="ml-1 text-xs font-bold tracking-widest text-muted-foreground uppercase"
                                            >
                                                Kata Sandi Baru
                                            </Label>
                                            <div className="relative">
                                                <Lock className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
                                                <Input
                                                    id="password"
                                                    type="password"
                                                    autoComplete="new-password"
                                                    className="h-12 rounded-xl border-transparent bg-gray-50/50 pl-10 transition-all focus:bg-white dark:bg-accent/50 dark:focus:bg-accent/40"
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
                                                Konfirmasi Kata Sandi
                                            </Label>
                                            <div className="relative">
                                                <Lock className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
                                                <Input
                                                    id="password_confirmation"
                                                    type="password"
                                                    autoComplete="new-password"
                                                    className="h-12 rounded-xl border-transparent bg-gray-50/50 pl-10 transition-all focus:bg-white dark:bg-accent/50 dark:focus:bg-accent/40"
                                                    value={form.data.password_confirmation}
                                                    onChange={(event) =>
                                                        form.setData(
                                                            'password_confirmation',
                                                            event.target.value,
                                                        )
                                                    }
                                                />
                                            </div>
                                            <InputError
                                                message={form.errors.password_confirmation}
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="rounded-4xl border-none bg-white shadow-sm dark:bg-[#161615]">
                                <CardHeader className="px-8 pt-8 pb-4">
                                    <CardTitle className="flex items-center gap-3 text-xl font-bold">
                                        <Globe className="size-6 text-indigo-600" />{' '}
                                        Kehadiran Online
                                    </CardTitle>
                                    <CardDescription>
                                        Tautkan akun media sosial atau portfolio
                                        kamu.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="p-8 pt-0">
                                    <div className="grid gap-4 md:grid-cols-2">
                                        {(
                                            [
                                                {
                                                    field: 'instagram',
                                                    label: 'Instagram',
                                                    placeholder:
                                                        'https://instagram.com/username',
                                                    error: form.errors
                                                        .instagram,
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
                                                    <div className="relative mt-2">
                                                        <ExternalLink className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
                                                        <Input
                                                            id={field}
                                                            type="url"
                                                            className="h-12 rounded-xl border-transparent bg-gray-50/50 pl-10 transition-all focus:bg-white dark:bg-accent/50 dark:focus:bg-accent/40"
                                                            placeholder={
                                                                placeholder
                                                            }
                                                            value={
                                                                form.data[field]
                                                            }
                                                            onChange={(event) =>
                                                                form.setData(
                                                                    field,
                                                                    event.target
                                                                        .value,
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                    <InputError
                                                        message={error}
                                                    />
                                                </div>
                                            ),
                                        )}
                                        <div className="space-y-2 md:col-span-2">
                                            <Label
                                                htmlFor="social_link"
                                                className="ml-1 text-xs font-bold tracking-widest text-muted-foreground uppercase"
                                            >
                                                Link Website Personal (Opsional)
                                            </Label>
                                            <div className="relative mt-2">
                                                <AtSign className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
                                                <Input
                                                    id="social_link"
                                                    type="url"
                                                    className="h-12 rounded-xl border-transparent bg-gray-50/50 pl-10 transition-all focus:bg-white dark:bg-accent/50 dark:focus:bg-accent/40"
                                                    placeholder="https://my-portfolio.dev"
                                                    value={
                                                        form.data.social_link
                                                    }
                                                    onChange={(event) =>
                                                        form.setData(
                                                            'social_link',
                                                            event.target.value,
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <InputError
                                            message={form.errors.social_link}
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="flex items-center justify-end gap-4 pt-4">
                                <Button
                                    asChild
                                    variant="ghost"
                                    className="h-12 rounded-xl px-6"
                                >
                                    <Link href="/siswa">Batal</Link>
                                </Button>
                                <Button
                                    disabled={form.processing}
                                    type="submit"
                                    className="h-12 rounded-xl bg-blue-600 px-10 text-white shadow-xl shadow-blue-500/20 transition-all hover:scale-105 hover:bg-blue-700"
                                >
                                    {form.processing ? (
                                        'Menyimpan...'
                                    ) : (
                                        <span className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase">
                                            <Save className="size-4" /> Simpan
                                            Perubahan
                                        </span>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </StudentLayout>
    );
}
