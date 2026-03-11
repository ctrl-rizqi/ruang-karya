import { Head, Link, useForm } from '@inertiajs/react';
import {
    AtSign,
    ChevronLeft,
    GraduationCap,
    Lock,
    MapPin,
    Save,
    School,
    Share2,
    ShieldCheck,
    Sparkles,
    User,
    UserPlus
} from 'lucide-react';
import type { SubmitEvent } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';

type UserRole = 'GURU' | 'SISWA';

type UserFormData = {
    id: number;
    role: UserRole;
    nisn: string;
    name: string;
    birth_date: string | null;
    address: string | null;
    social_link: string | null;
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

export default function UserForm({ mode, user, roleOptions, classrooms, majors }: UserFormProps) {
    const isEditMode = mode === 'edit' && user !== null;

    const form = useForm({
        role: user?.role ?? 'SISWA',
        nisn: user?.nisn ?? '',
        name: user?.name ?? '',
        password: '',
        password_confirmation: '',
        birth_date: user?.birth_date ?? '',
        address: user?.address ?? '',
        social_link: user?.social_link ?? '',
        classroom_id: user?.classroom_id ?? '',
        major_id: user?.major_id ?? '',
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

    const submit = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (isEditMode && user) {
            form.post(`/dashboard/users/${user.id}`, {
                onSuccess: () => form.reset('password', 'password_confirmation'),
            });
            return;
        }

        form.post('/dashboard/users');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isEditMode ? 'Edit User' : 'Tambah User'} />

            <div className="mx-auto max-w-5xl px-6 py-10">
                {/* Header Section */}
                <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <Button asChild variant="ghost" size="sm" className="mb-4 -ml-2 text-muted-foreground hover:text-foreground rounded-xl group">
                            <Link href="/dashboard/users" className="flex items-center gap-1">
                                <ChevronLeft className="size-4 transition-transform group-hover:-translate-x-1" /> Kembali ke Daftar
                            </Link>
                        </Button>
                        <div className="flex items-center gap-3">
                            <div className="size-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-xl shadow-blue-500/20">
                                {isEditMode ? <User className="size-6" /> : <UserPlus className="size-6" />}
                            </div>
                            <div>
                                <h1 className="text-3xl font-black tracking-tight">{isEditMode ? 'Edit Identitas User' : 'Daftarkan User Baru'}</h1>
                                <p className="text-muted-foreground mt-1">Lengkapi informasi dasar untuk memberikan akses platform.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <form onSubmit={submit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-8 space-y-8">
                        {/* Core Identity Card */}
                        <Card className="border-none shadow-sm bg-white dark:bg-[#161615] rounded-[2.5rem]">
                            <CardHeader className="px-8 pt-8">
                                <CardTitle className="text-lg font-bold flex items-center gap-3">
                                    <AtSign className="size-5 text-blue-600" /> Identitas Akun
                                </CardTitle>
                                <CardDescription>Informasi primer yang digunakan untuk login dan identifikasi sistem.</CardDescription>
                            </CardHeader>
                            <CardContent className="p-8 pt-4 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2 flex flex-col gap-1.2">
                                        <Label htmlFor="role" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Tipe Akun / Role</Label>
                                        <Select
                                            value={form.data.role}
                                            onValueChange={(value) => form.setData('role', value as UserRole)}
                                        >
                                            <SelectTrigger id="role" className="h-12 w-full rounded-xl border-none bg-gray-50/50 px-4 text-sm font-bold focus:bg-white outline-none ring-offset-background transition-all shadow-none">
                                                <SelectValue placeholder="Pilih Role" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {roleOptions.map((option) => (
                                                    <SelectItem key={option} value={option}>{option}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <InputError message={form.errors.role} />
                                    </div>

                                    <div className="space-y-2 flex flex-col gap-1.2">
                                        <Label htmlFor="nisn" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">NISN / Identitas</Label>
                                        <Input
                                            id="nisn"
                                            placeholder="Contoh: 0098765432"
                                            className="rounded-xl bg-gray-50/50 border-transparent focus:bg-white transition-all font-mono dark:bg-accent/50 dark:focus:bg-accent"
                                            value={form.data.nisn}
                                            onChange={(e) => form.setData('nisn', e.target.value)}
                                        />
                                        <InputError message={form.errors.nisn} />
                                    </div>
                                </div>

                                <div className="space-y-2 flex flex-col gap-1.2">
                                    <Label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Nama Lengkap</Label>
                                    <Input
                                        id="name"
                                        placeholder="Nama lengkap sesuai data sekolah"
                                        className="rounded-xl bg-gray-50/50 border-transparent focus:bg-white transition-all font-bold dark:bg-accent/50 dark:focus:bg-accent"
                                        value={form.data.name}
                                        onChange={(e) => form.setData('name', e.target.value)}
                                    />
                                    <InputError message={form.errors.name} />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Academic Details - Conditional */}
                        {form.data.role === 'SISWA' && (
                            <Card className="border-none shadow-sm bg-white dark:bg-[#161615] rounded-[2.5rem] animate-in fade-in zoom-in-95 duration-300">
                                <CardHeader className="px-8 pt-8">
                                    <CardTitle className="text-lg font-bold flex items-center gap-3">
                                        <GraduationCap className="size-5 text-indigo-600" /> Detail Akademik
                                    </CardTitle>
                                    <CardDescription>Penempatan kelas dan jurusan untuk filter karya serta profil.</CardDescription>
                                </CardHeader>
                                <CardContent className="p-8 pt-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="classroom_id" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Pilih Kelas</Label>
                                            <Select
                                                value={form.data.classroom_id?.toString() || 'none'}
                                                onValueChange={(value) => form.setData('classroom_id', value === 'none' ? '' : value)}
                                            >
                                                <SelectTrigger id="classroom_id" className="h-12 w-full rounded-xl border-none bg-gray-50/50 px-4 text-sm outline-none focus:bg-white transition-all shadow-none">
                                                    <SelectValue placeholder="Pilih Kelas" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="none">Pilih Kelas</SelectItem>
                                                    {classrooms.map((c) => (
                                                        <SelectItem key={c.id} value={c.id.toString()}>{c.name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <InputError message={form.errors.classroom_id} />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="major_id" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Pilih Jurusan</Label>
                                            <Select
                                                value={form.data.major_id?.toString() || 'none'}
                                                onValueChange={(value) => form.setData('major_id', value === 'none' ? '' : value)}
                                            >
                                                <SelectTrigger id="major_id" className="h-12 w-full rounded-xl border-none bg-gray-50/50 px-4 text-sm outline-none focus:bg-white transition-all shadow-none">
                                                    <SelectValue placeholder="Pilih Jurusan" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="none">Pilih Jurusan</SelectItem>
                                                    {majors.map((m) => (
                                                        <SelectItem key={m.id} value={m.id.toString()}>{m.name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <InputError message={form.errors.major_id} />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Security Card */}
                        <Card className="border-none shadow-sm bg-white dark:bg-[#161615] rounded-[2.5rem]">
                            <CardHeader className="px-8 pt-8">
                                <CardTitle className="text-lg font-bold flex items-center gap-3">
                                    <ShieldCheck className="size-5 text-rose-600" /> Keamanan & Akses
                                </CardTitle>
                                <CardDescription>Tentukan password awal untuk akun ini.</CardDescription>
                            </CardHeader>
                            <CardContent className="p-8 pt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2 flex flex-col gap-1.2">
                                    <Label htmlFor="password" title="Password" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Password</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder="Minimal 8 karakter"
                                            className="pl-10 rounded-xl bg-gray-50/50 border-transparent focus:bg-white transition-all dark:bg-accent/50 dark:focus:bg-accent"
                                            value={form.data.password}
                                            onChange={(e) => form.setData('password', e.target.value)}
                                        />
                                    </div>
                                    <InputError message={form.errors.password} />
                                </div>

                                <div className="space-y-2 flex flex-col gap-1.2">
                                    <Label htmlFor="password_confirmation" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Ulangi Password</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                                        <Input
                                            id="password_confirmation"
                                            type="password"
                                            placeholder="Konfirmasi password"
                                            className="pl-10 rounded-xl bg-gray-50/50 border-transparent focus:bg-white transition-all dark:bg-accent/50 dark:focus:bg-accent"
                                            value={form.data.password_confirmation}
                                            onChange={(e) => form.setData('password_confirmation', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Optional Info Section - Accordion like feel */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 px-2">
                                <Sparkles className="size-4 text-orange-400" />
                                <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground">Profil Tambahan (Opsional)</h3>
                            </div>

                            <Card className="border-none shadow-sm bg-white dark:bg-[#161615] rounded-[2.5rem]">
                                <CardContent className="p-8 space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2 flex flex-col gap-1.2">
                                            <Label htmlFor="birth_date" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Tanggal Lahir</Label>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Input
                                                        id="birth_date"
                                                        
                                                        className="rounded-xl bg-gray-50/50 border-transparent focus:bg-white transition-all dark:bg-accent/50 dark:focus:bg-accent"
                                                        value={form.data.birth_date}
                                                        onChange={(e) => form.setData('birth_date', e.target.value)}
                                                    />
                                                </PopoverTrigger>
                                                <PopoverContent>
                                                    <Calendar mode='single' captionLayout='dropdown' 
                                                    selected={form.data.birth_date ? new Date(form.data.birth_date) : undefined}
                                                    onSelect={(date) => {
                                                        if (date) {
                                                            form.setData('birth_date', date.toISOString().split('T')[0]);
                                                        }
                                                    }}
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <InputError message={form.errors.birth_date} />
                                        </div>

                                        <div className="space-y-2 flex flex-col gap-1.2">
                                            <Label htmlFor="social_link" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Media Sosial (URL)</Label>
                                            <div className="relative">
                                                <Share2 className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                                                <Input
                                                    id="social_link"
                                                    type="url"
                                                    placeholder="https://instagram.com/..."
                                                    className="pl-10 rounded-xl bg-gray-50/50 border-transparent focus:bg-white transition-all dark:bg-accent/50 dark:focus:bg-accent"
                                                    value={form.data.social_link}
                                                    onChange={(e) => form.setData('social_link', e.target.value)}
                                                />
                                            </div>
                                            <InputError message={form.errors.social_link} />
                                        </div>
                                    </div>

                                    <div className="space-y-2 flex flex-col gap-1.2">
                                        <Label htmlFor="address" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Alamat / Bio</Label>
                                        <div className="relative">
                                            <MapPin className="absolute left-3.5 top-4 size-4 text-muted-foreground" />
                                            <textarea
                                                id="address"
                                                placeholder="Berikan deskripsi singkat atau alamat domisili"
                                                className="min-h-24 w-full rounded-xl bg-gray-50/50 border-none focus:bg-white transition-all p-4 pl-10 text-sm resize-none dark:bg-accent/50 dark:focus:bg-accent"
                                                value={form.data.address}
                                                onChange={(e) => form.setData('address', e.target.value)}
                                            />
                                        </div>
                                        <InputError message={form.errors.address} />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="flex items-center justify-end gap-4 pt-4">
                            <Button asChild variant="ghost" className="rounded-xl h-12 px-8">
                                <Link href="/dashboard/users">Batalkan</Link>
                            </Button>
                            <Button
                                disabled={form.processing}
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl h-14 px-10 shadow-xl shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                            >
                                {form.processing ? 'Sedang Memproses...' : (
                                    <span className="flex items-center gap-2 uppercase tracking-widest text-xs font-black">
                                        {isEditMode ? 'Perbarui Data User' : 'Simpan User Baru'} <Save className="size-4" />
                                    </span>
                                )}
                            </Button>
                        </div>
                    </div>

                    {/* Sidebar Tips */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="p-8 bg-blue-600 rounded-[2.5rem] text-white shadow-xl shadow-blue-500/20">
                            <h3 className="font-bold mb-4 flex items-center gap-2 uppercase tracking-widest text-xs">
                                <Sparkles className="size-4 text-blue-200" /> Tips Pendaftaran
                            </h3>
                            <div className="space-y-4 text-sm text-blue-100 leading-relaxed">
                                <p>1. <strong>Email Otomatis</strong>: Sistem akan menggenerate email unik berdasarkan NISN untuk login siswa.</p>
                                <p>2. <strong>Role Guru</strong>: Role ini memberikan akses penuh ke dashboard admin dan manajemen master data.</p>
                                <p>3. <strong>Data Opsional</strong>: Siswa dapat melengkapi bio dan media sosial mereka sendiri setelah akun berhasil dibuat.</p>
                            </div>
                            <div className="mt-8 h-1 w-12 bg-white/30 rounded-full" />
                        </div>

                        <Card className="border-none shadow-sm bg-white dark:bg-[#161615] rounded-[2.5rem]">
                            <CardHeader className="p-8 pb-4 text-center">
                                <div className="mx-auto size-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
                                    <School className="size-6" />
                                </div>
                                <CardTitle className="text-sm font-bold uppercase tracking-widest">Master Data</CardTitle>
                            </CardHeader>
                            <CardContent className="p-8 pt-0 text-center">
                                <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                                    Jika kelas atau jurusan yang dicari tidak tersedia, silakan tambahkan terlebih dahulu melalui menu Master Data.
                                </p>
                                <div className="flex flex-col gap-2">
                                    <Button asChild variant="outline" size="sm" className="rounded-xl text-[10px] font-bold uppercase tracking-widest">
                                        <Link href="/dashboard/classrooms">Manajemen Kelas</Link>
                                    </Button>
                                    <Button asChild variant="outline" size="sm" className="rounded-xl text-[10px] font-bold uppercase tracking-widest">
                                        <Link href="/dashboard/majors">Manajemen Jurusan</Link>
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
