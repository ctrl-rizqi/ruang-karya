import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import { Head, Link, router, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';

type Student = {
    id: number;
    nisn: string;
    name: string;
    birth_date: string | null;
    address: string | null;
    social_link: string | null;
};

type StudentIndexProps = {
    students: {
        data: Student[];
        links: {
            url: string | null;
            label: string;
            active: boolean;
        }[];
    };
    filters: {
        name: string;
        nisn: string;
    };
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
    },
    {
        title: 'Siswa',
        href: '/dashboard/students',
    },
];

export default function StudentIndex({ students, filters }: StudentIndexProps) {
    const filterForm = useForm({
        name: filters.name ?? '',
        nisn: filters.nisn ?? '',
    });

    const applyFilters = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        filterForm.get('/dashboard/students', {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    const resetFilters = () => {
        filterForm.setData({
            name: '',
            nisn: '',
        });

        router.get(
            '/dashboard/students',
            {},
            { preserveState: true, preserveScroll: true, replace: true },
        );
    };

    const deleteStudent = (student: Student) => {
        if (!window.confirm(`Hapus siswa ${student.name}?`)) {
            return;
        }

        router.delete(`/dashboard/students/${student.id}`, {
            preserveScroll: true,
        });
    };

    const paginationLabel = (label: string): string => {
        return label
            .replace(/<[^>]*>/g, '')
            .replaceAll('&laquo;', '<<')
            .replaceAll('&raquo;', '>>');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Siswa" />

            <div className="space-y-4 p-4">
                <section className="flex items-center justify-between rounded-xl border border-sidebar-border/70 p-4 dark:border-sidebar-border">
                    <div>
                        <h1 className="text-lg font-semibold">Daftar Siswa</h1>
                        <p className="text-sm text-muted-foreground">
                            Kelola data siswa dari dashboard.
                        </p>
                    </div>

                    <Button asChild>
                        <Link href="/dashboard/students/create" prefetch>
                            Tambah Siswa
                        </Link>
                    </Button>
                </section>

                <section className="rounded-xl border border-sidebar-border/70 p-4 dark:border-sidebar-border">
                    <form
                        className="mb-4 grid gap-3 md:grid-cols-3"
                        onSubmit={applyFilters}
                    >
                        <Input
                            placeholder="Filter nama"
                            value={filterForm.data.name}
                            onChange={(event) =>
                                filterForm.setData('name', event.target.value)
                            }
                        />
                        <Input
                            placeholder="Filter NISN"
                            value={filterForm.data.nisn}
                            onChange={(event) =>
                                filterForm.setData('nisn', event.target.value)
                            }
                        />
                        <div className="flex gap-2">
                            <Button
                                disabled={filterForm.processing}
                                type="submit"
                                variant="outline"
                            >
                                Terapkan
                            </Button>
                            <Button
                                disabled={filterForm.processing}
                                onClick={resetFilters}
                                type="button"
                                variant="ghost"
                            >
                                Reset
                            </Button>
                        </div>
                    </form>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[760px] border-collapse text-sm">
                            <thead>
                                <tr className="border-b">
                                    <th className="px-3 py-2 text-left font-medium">
                                        NISN
                                    </th>
                                    <th className="px-3 py-2 text-left font-medium">
                                        Nama
                                    </th>
                                    <th className="px-3 py-2 text-left font-medium">
                                        Tanggal Lahir
                                    </th>
                                    <th className="px-3 py-2 text-left font-medium">
                                        Alamat
                                    </th>
                                    <th className="px-3 py-2 text-left font-medium">
                                        Media Sosial
                                    </th>
                                    <th className="px-3 py-2 text-left font-medium">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.data.length === 0 && (
                                    <tr>
                                        <td
                                            className="px-3 py-4 text-muted-foreground"
                                            colSpan={6}
                                        >
                                            Belum ada data siswa.
                                        </td>
                                    </tr>
                                )}

                                {students.data.map((student) => (
                                    <tr className="border-b" key={student.id}>
                                        <td className="px-3 py-2">
                                            {student.nisn}
                                        </td>
                                        <td className="px-3 py-2">
                                            {student.name}
                                        </td>
                                        <td className="px-3 py-2">
                                            {student.birth_date ?? '-'}
                                        </td>
                                        <td className="px-3 py-2">
                                            {student.address ?? '-'}
                                        </td>
                                        <td className="px-3 py-2">
                                            {student.social_link ?? '-'}
                                        </td>
                                        <td className="px-3 py-2">
                                            <div className="flex gap-2">
                                                <Button
                                                    asChild
                                                    size="sm"
                                                    type="button"
                                                    variant="outline"
                                                >
                                                    <Link
                                                        href={`/dashboard/students/${student.id}/edit`}
                                                        prefetch
                                                    >
                                                        Edit
                                                    </Link>
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    type="button"
                                                    variant="destructive"
                                                    onClick={() =>
                                                        deleteStudent(student)
                                                    }
                                                >
                                                    Hapus
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                        {students.links.map((link) => (
                            <Button
                                asChild={Boolean(link.url)}
                                key={`${link.label}-${link.url ?? 'no-url'}`}
                                size="sm"
                                variant={link.active ? 'default' : 'outline'}
                            >
                                {link.url ? (
                                    <Link href={link.url} preserveScroll>
                                        {paginationLabel(link.label)}
                                    </Link>
                                ) : (
                                    <span>{paginationLabel(link.label)}</span>
                                )}
                            </Button>
                        ))}
                    </div>
                </section>
            </div>
        </AppLayout>
    );
}
