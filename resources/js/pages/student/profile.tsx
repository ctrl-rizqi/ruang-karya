import { Head, useForm, usePage, Link } from '@inertiajs/react';
import {
    AtSign,
    Calendar,
    Globe,
    Lock,
    MapPin,
    Save,
    User,
    UserCircle,
    Trophy,
    ExternalLink,
    Camera,
    X
} from 'lucide-react';
import { useState,  useRef } from 'react';
import type {SubmitEvent} from 'react';
import InputError from '@/components/input-error';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import StudentLayout from '@/layouts/student-layout';

type StudentProfileProps = {
    student: {
        nisn: string | null;
        name: string;
        birth_date: string | null;
        address: string | null;
        social_link: string | null;
        avatar: string;
    };
};

export default function StudentProfile({ student }: StudentProfileProps) {
    const { auth } = usePage().props;
    const fileInput = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const form = useForm({
        name: student.name,
        birth_date: student.birth_date ?? '',
        address: student.address ?? '',
        social_link: student.social_link ?? '',
        avatar: null as File | null,
        _method: 'PATCH',
    });

    const initials = student.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            form.setData('avatar', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const clearPreview = () => {
        setPreview(null);
        form.setData('avatar', null);
        if (fileInput.current) fileInput.current.value = '';
    };

/**
 * Submit the form with the updated profile data.
 * The form data will be sent as multipart/form-data
 * and the _method field will be spoofed to 'PATCH'
 * to update the profile data.
 * On success, the preview will be cleared and the file input will be reset.
 */

    const submit = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Use post with _method spoofing for multipart/form-data
        form.post('/siswa/profile', {
            forceFormData: true,
            onSuccess: () => {
                setPreview(null);
                if (fileInput.current) fileInput.current.value = '';
            },
        });
    };

    return (
        <StudentLayout>
            <Head title="Pengaturan Profil" />

            <div className="mx-auto max-w-4xl px-4 py-8">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Left Sidebar - Profile Summary */}
                    <div className="md:w-1/3 space-y-6">
                        <Card className="border-none shadow-sm bg-white dark:bg-[#161615] rounded-4xl overflow-hidden">
                            <CardContent className="p-8 text-center">
                                <div className="relative inline-block mb-6 group">
                                    <Avatar className="size-32 border-4 border-blue-50 dark:border-blue-900/20 overflow-hidden">
                                        <AvatarImage src={preview || student.avatar} />
                                        <AvatarFallback className="text-3xl font-bold bg-blue-50 text-blue-600">{initials}</AvatarFallback>
                                    </Avatar>

                                    <button
                                        type="button"
                                        onClick={() => fileInput.current?.click()}
                                        className="absolute inset-0 bg-black/40 text-white flex flex-col items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                                    >
                                        <Camera className="size-6 mb-1" />
                                        <span className="text-[10px] font-bold uppercase tracking-widest">Update Foto</span>
                                    </button>

                                    {preview && (
                                        <Button
                                            size="icon"
                                            variant="destructive"
                                            onClick={clearPreview}
                                            className="absolute -top-2 -right-2 rounded-full size-8 shadow-lg border-2 border-white dark:border-[#161615]"
                                        >
                                            <X className="size-4" />
                                        </Button>
                                    )}

                                    <input
                                        type="file"
                                        ref={fileInput}
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />
                                </div>
                                <h2 className="text-xl font-bold mb-1 line-clamp-1">{student.name}</h2>
                                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-6">Student Account</p>

                                <div className="space-y-3 pt-6 border-t border-gray-50 dark:border-white/5">
                                    <div className="flex items-center gap-3 text-sm text-muted-foreground text-left">
                                        <AtSign className="size-4 text-blue-600 shrink-0" />
                                        <span className="truncate">{auth.user.email}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-muted-foreground text-left">
                                        <Lock className="size-4 text-orange-400 shrink-0" />
                                        <span>NISN: {student.nisn ?? 'Not set'}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="p-6 bg-blue-600 rounded-4xl text-white shadow-xl shadow-blue-500/20">
                            <h3 className="font-bold mb-2 flex items-center gap-2 text-sm uppercase tracking-widest">
                                <Trophy className="size-4" /> Tips Profil
                            </h3>
                            <p className="text-xs text-blue-100 leading-relaxed">
                                Foto profil yang profesional membantu karyamu lebih dipercaya oleh kurator dan audiens!.
                            </p>

                            <p className="text-xs text-blue-100 leading-relaxed">Ukuran sempurna untuk foto profil adalah 1:1.</p>
                        </div>
                    </div>

                    {/* Right Content - Form */}
                    <div className="flex-1 space-y-6">
                        <form onSubmit={submit} className="space-y-6">
                            <Card className="border-none shadow-sm bg-white dark:bg-[#161615] rounded-4xl">
                                <CardHeader className="px-8 pt-8 pb-4">
                                    <CardTitle className="text-xl font-bold flex items-center gap-3">
                                        <UserCircle className="size-6 text-blue-600" /> Informasi Dasar
                                    </CardTitle>
                                    <CardDescription>Detail utama identitas kamu di platform ini.</CardDescription>
                                </CardHeader>
                                <CardContent className="p-8 pt-0 space-y-6">
                                    <div className="grid gap-6 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Nama Lengkap</Label>
                                            <div className="relative mt-2">
                                                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                                                <Input
                                                    id="name"
                                                    className="pl-10 h-12 rounded-xl bg-gray-50/50 border-transparent focus:bg-white transition-all dark:bg-accent/50 dark:focus:bg-accent/40"
                                                    placeholder="Nama lengkap kamu"
                                                    value={form.data.name}
                                                    onChange={(e) => form.setData('name', e.target.value)}
                                                />
                                            </div>
                                            <InputError message={form.errors.name} />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="birth_date" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Tanggal Lahir</Label>
                                            <div className="relative mt-2">
                                                <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                                                <Input
                                                    id="birth_date"
                                                    type="date"
                                                    className="pl-10 h-12 rounded-xl bg-gray-50/50 border-transparent focus:bg-white transition-all dark:bg-accent/50 dark:focus:bg-accent/40"
                                                    value={form.data.birth_date}
                                                    onChange={(e) => form.setData('birth_date', e.target.value)}
                                                />
                                            </div>
                                            <InputError message={form.errors.birth_date} />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="address" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Alamat / Bio Singkat</Label>
                                        <div className="relative mt-2">
                                            <MapPin className="absolute left-3.5 top-4 size-4 text-muted-foreground" />
                                            <Input
                                                id="address"
                                                className="pl-10 h-12 rounded-xl bg-gray-50/50 border-transparent focus:bg-white transition-all dark:bg-accent/50 dark:focus:bg-accent/40"
                                                placeholder="Edinburgh, Scotland"
                                                value={form.data.address}
                                                onChange={(e) => form.setData('address', e.target.value)}
                                            />
                                        </div>
                                        <InputError message={form.errors.address} />
                                    </div>

                                    <InputError message={form.errors.avatar} />
                                </CardContent>
                            </Card>

                            <Card className="border-none shadow-sm bg-white dark:bg-[#161615] rounded-4xl">
                                <CardHeader className="px-8 pt-8 pb-4">
                                    <CardTitle className="text-xl font-bold flex items-center gap-3">
                                        <Globe className="size-6 text-indigo-600" /> Kehadiran Online
                                    </CardTitle>
                                    <CardDescription>Tautkan akun media sosial atau portfolio kamu.</CardDescription>
                                </CardHeader>
                                <CardContent className="p-8 pt-0 space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="social_link" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Link Website / Social Media</Label>
                                        <div className="relative mt-2">
                                            <ExternalLink className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                                            <Input
                                                id="social_link"
                                                type="url"
                                                className="pl-10 h-12 rounded-xl bg-gray-50/50 border-transparent focus:bg-white transition-all dark:bg-accent/50 dark:focus:bg-accent/40"
                                                placeholder="https://instagram.com/username"
                                                value={form.data.social_link}
                                                onChange={(e) => form.setData('social_link', e.target.value)}
                                            />
                                        </div>
                                        <InputError message={form.errors.social_link} />
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="flex items-center justify-end gap-4 pt-4">
                                <Button asChild variant="ghost" className="rounded-xl h-12 px-6">
                                    <Link href="/siswa">Batal</Link>
                                </Button>
                                <Button
                                    disabled={form.processing}
                                    type="submit"
                                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-12 px-10 shadow-xl shadow-blue-500/20 transition-all hover:scale-105"
                                >
                                    {form.processing ? 'Menyimpan...' : (
                                        <span className="flex items-center gap-2 uppercase tracking-widest text-xs font-bold"><Save className="size-4" /> Simpan Perubahan</span>
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
