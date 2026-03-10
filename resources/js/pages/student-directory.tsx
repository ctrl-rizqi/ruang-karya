import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';

type StudentDirectoryProps = {
    students: {
        data: {
            id: number;
            nisn: string | null;
            name: string;
            student_class: string | null;
            major: string | null;
        }[];
        links: {
            url: string | null;
            label: string;
            active: boolean;
        }[];
    };
    filters: {
        name: string;
        nisn: string;
        student_class: string;
        major: string;
    };
};

export default function StudentDirectory({
    students,
    filters,
}: StudentDirectoryProps) {
    const filterForm = useForm({
        name: filters.name ?? '',
        nisn: filters.nisn ?? '',
        student_class: filters.student_class ?? '',
        major: filters.major ?? '',
    });

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        filterForm.get('/daftar-siswa', {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    const reset = () => {
        filterForm.setData({
            name: '',
            nisn: '',
            student_class: '',
            major: '',
        });

        filterForm.get('/daftar-siswa', {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    const paginationLabel = (label: string): string => {
        return label
            .replace(/<[^>]*>/g, '')
            .replaceAll('&laquo;', '<<')
            .replaceAll('&raquo;', '>>');
    };

    return (
        <>
            <Head title="Daftar Siswa" />

            <main className="mx-auto max-w-6xl space-y-4 p-6">
                <section className="rounded-xl border border-sidebar-border/70 p-6 dark:border-sidebar-border">
                    <h1 className="text-2xl font-semibold">Daftar Siswa</h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Cari siswa berdasarkan nama, NISN, kelas, dan jurusan.
                    </p>
                </section>

                <section className="rounded-xl border border-sidebar-border/70 p-4 dark:border-sidebar-border">
                    <form
                        className="grid gap-3 md:grid-cols-5"
                        onSubmit={submit}
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
                        <Input
                            placeholder="Filter Kelas"
                            value={filterForm.data.student_class}
                            onChange={(event) =>
                                filterForm.setData(
                                    'student_class',
                                    event.target.value,
                                )
                            }
                        />
                        <Input
                            placeholder="Filter Jurusan"
                            value={filterForm.data.major}
                            onChange={(event) =>
                                filterForm.setData('major', event.target.value)
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
                                onClick={reset}
                                type="button"
                                variant="ghost"
                            >
                                Reset
                            </Button>
                        </div>
                    </form>
                </section>

                <section className="rounded-xl border border-sidebar-border/70 p-4 dark:border-sidebar-border">
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
                                        Kelas
                                    </th>
                                    <th className="px-3 py-2 text-left font-medium">
                                        Jurusan
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.data.length === 0 && (
                                    <tr>
                                        <td
                                            className="px-3 py-4 text-muted-foreground"
                                            colSpan={4}
                                        >
                                            Tidak ada siswa ditemukan.
                                        </td>
                                    </tr>
                                )}

                                {students.data.map((student) => (
                                    <tr className="border-b" key={student.id}>
                                        <td className="px-3 py-2">
                                            {student.nisn ?? '-'}
                                        </td>
                                        <td className="px-3 py-2">
                                            {student.name}
                                        </td>
                                        <td className="px-3 py-2">
                                            {student.student_class ?? '-'}
                                        </td>
                                        <td className="px-3 py-2">
                                            {student.major ?? '-'}
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
            </main>
        </>
    );
}
