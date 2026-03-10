import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';

type Student = {
    id: number;
    nisn: string;
    name: string;
    birth_date: string | null;
    address: string | null;
    social_link: string | null;
};

type StudentFormProps = {
    mode: 'create' | 'edit';
    student: Student | null;
};

export default function StudentForm({ mode, student }: StudentFormProps) {
    const isEditMode = mode === 'edit' && student !== null;

    const form = useForm({
        nisn: student?.nisn ?? '',
        name: student?.name ?? '',
        password: '',
        password_confirmation: '',
        birth_date: student?.birth_date ?? '',
        address: student?.address ?? '',
        social_link: student?.social_link ?? '',
    });

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
        {
            title: 'Siswa',
            href: '/dashboard/students',
        },
        {
            title: isEditMode ? 'Edit Siswa' : 'Tambah Siswa',
            href: isEditMode
                ? `/dashboard/students/${student.id}/edit`
                : '/dashboard/students/create',
        },
    ];

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (isEditMode) {
            form.put(`/dashboard/students/${student.id}`);

            return;
        }

        form.post('/dashboard/students');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isEditMode ? 'Edit Siswa' : 'Tambah Siswa'} />

            <div className="p-4">
                <section className="mx-auto max-w-3xl rounded-xl border border-sidebar-border/70 p-6 dark:border-sidebar-border">
                    <h1 className="text-lg font-semibold">
                        {isEditMode ? 'Edit Siswa' : 'Tambah Siswa'}
                    </h1>
                    <p className="mt-2 mb-6 text-sm text-muted-foreground">
                        Field wajib: NISN, nama, password. Untuk mode edit,
                        password boleh dikosongkan.
                    </p>

                    <form
                        className="grid gap-4 md:grid-cols-2"
                        onSubmit={submit}
                    >
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
                                    : 'Simpan Siswa'}
                            </Button>
                            <Button asChild type="button" variant="outline">
                                <Link href="/dashboard/students" prefetch>
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
