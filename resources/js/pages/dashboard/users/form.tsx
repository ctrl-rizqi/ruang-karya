import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';

type UserRole = 'GURU' | 'SISWA';

type UserFormData = {
    id: number;
    role: UserRole;
    nisn: string;
    name: string;
    birth_date: string | null;
    address: string | null;
    social_link: string | null;
    student_class: string | null;
    major: string | null;
};

type UserFormProps = {
    mode: 'create' | 'edit';
    user: UserFormData | null;
    roleOptions: UserRole[];
};

export default function UserForm({ mode, user, roleOptions }: UserFormProps) {
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
        student_class: user?.student_class ?? '',
        major: user?.major ?? '',
    });

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
        {
            title: 'Users',
            href: '/dashboard/users',
        },
        {
            title: isEditMode ? 'Edit User' : 'Tambah User',
            href:
                isEditMode && user
                    ? `/dashboard/users/${user.id}/edit`
                    : '/dashboard/users/create',
        },
    ];

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (isEditMode && user) {
            form.put(`/dashboard/users/${user.id}`);

            return;
        }

        form.post('/dashboard/users');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isEditMode ? 'Edit User' : 'Tambah User'} />

            <div className="p-4">
                <section className="mx-auto max-w-3xl rounded-xl border border-sidebar-border/70 p-6 dark:border-sidebar-border">
                    <h1 className="text-lg font-semibold">
                        {isEditMode ? 'Edit User' : 'Tambah User'}
                    </h1>
                    <p className="mt-2 mb-6 text-sm text-muted-foreground">
                        Kelola user dengan role GURU atau SISWA. Field wajib:
                        role, NISN, nama, dan password.
                    </p>

                    <form
                        className="grid gap-4 md:grid-cols-2"
                        onSubmit={submit}
                    >
                        <div className="grid gap-2">
                            <Label htmlFor="role">Role</Label>
                            <select
                                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                id="role"
                                value={form.data.role}
                                onChange={(event) =>
                                    form.setData(
                                        'role',
                                        event.target.value as UserRole,
                                    )
                                }
                            >
                                {roleOptions.map((roleOption) => (
                                    <option key={roleOption} value={roleOption}>
                                        {roleOption}
                                    </option>
                                ))}
                            </select>
                            <InputError message={form.errors.role} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="nisn">NISN</Label>
                            <Input
                                id="nisn"
                                maxLength={10}
                                value={form.data.nisn}
                                onChange={(event) =>
                                    form.setData('nisn', event.target.value)
                                }
                            />
                            <InputError message={form.errors.nisn} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="name">Nama</Label>
                            <Input
                                id="name"
                                value={form.data.name}
                                onChange={(event) =>
                                    form.setData('name', event.target.value)
                                }
                            />
                            <InputError message={form.errors.name} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={form.data.password}
                                onChange={(event) =>
                                    form.setData('password', event.target.value)
                                }
                            />
                            <InputError message={form.errors.password} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password_confirmation">
                                Konfirmasi Password
                            </Label>
                            <Input
                                id="password_confirmation"
                                type="password"
                                value={form.data.password_confirmation}
                                onChange={(event) =>
                                    form.setData(
                                        'password_confirmation',
                                        event.target.value,
                                    )
                                }
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="birth_date">Tanggal Lahir</Label>
                            <Input
                                id="birth_date"
                                type="date"
                                value={form.data.birth_date}
                                onChange={(event) =>
                                    form.setData(
                                        'birth_date',
                                        event.target.value,
                                    )
                                }
                            />
                            <InputError message={form.errors.birth_date} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="student_class">Kelas</Label>
                            <Input
                                id="student_class"
                                value={form.data.student_class}
                                onChange={(event) =>
                                    form.setData(
                                        'student_class',
                                        event.target.value,
                                    )
                                }
                            />
                            <InputError message={form.errors.student_class} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="major">Jurusan</Label>
                            <Input
                                id="major"
                                value={form.data.major}
                                onChange={(event) =>
                                    form.setData('major', event.target.value)
                                }
                            />
                            <InputError message={form.errors.major} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="social_link">
                                Link Media Sosial
                            </Label>
                            <Input
                                id="social_link"
                                type="url"
                                value={form.data.social_link}
                                onChange={(event) =>
                                    form.setData(
                                        'social_link',
                                        event.target.value,
                                    )
                                }
                            />
                            <InputError message={form.errors.social_link} />
                        </div>

                        <div className="grid gap-2 md:col-span-2">
                            <Label htmlFor="address">Alamat</Label>
                            <Input
                                id="address"
                                value={form.data.address}
                                onChange={(event) =>
                                    form.setData('address', event.target.value)
                                }
                            />
                            <InputError message={form.errors.address} />
                        </div>

                        <div className="flex gap-2 md:col-span-2">
                            <Button disabled={form.processing} type="submit">
                                {isEditMode
                                    ? 'Simpan Perubahan'
                                    : 'Simpan User'}
                            </Button>
                            <Button asChild type="button" variant="outline">
                                <Link href="/dashboard/users" prefetch>
                                    Kembali
                                </Link>
                            </Button>
                        </div>
                    </form>
                </section>
            </div>
        </AppLayout>
    );
}
