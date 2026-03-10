import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import { Head, Link, router, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';

type UserRow = {
    id: number;
    role: 'GURU' | 'SISWA';
    nisn: string;
    name: string;
    birth_date: string | null;
    address: string | null;
    social_link: string | null;
};

type UserIndexProps = {
    users: {
        data: UserRow[];
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
        title: 'Users',
        href: '/dashboard/users',
    },
];

export default function UserIndex({ users, filters }: UserIndexProps) {
    const filterForm = useForm({
        name: filters.name ?? '',
        nisn: filters.nisn ?? '',
    });

    const applyFilters = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        filterForm.get('/dashboard/users', {
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
            '/dashboard/users',
            {},
            { preserveState: true, preserveScroll: true, replace: true },
        );
    };

    const deleteUser = (user: UserRow) => {
        if (!window.confirm(`Hapus user ${user.name}?`)) {
            return;
        }

        router.delete(`/dashboard/users/${user.id}`, {
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
            <Head title="Users" />

            <div className="space-y-4 p-4">
                <section className="flex items-center justify-between rounded-xl border border-sidebar-border/70 p-4 dark:border-sidebar-border">
                    <div>
                        <h1 className="text-lg font-semibold">Daftar Users</h1>
                        <p className="text-sm text-muted-foreground">
                            Kelola data user role GURU dan SISWA dari dashboard.
                        </p>
                    </div>

                    <Button asChild>
                        <Link href="/dashboard/users/create" prefetch>
                            Tambah User
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
                        <table className="w-full min-w-190 border-collapse text-sm">
                            <thead>
                                <tr className="border-b">
                                    <th className="px-3 py-2 text-left font-medium">
                                        Role
                                    </th>
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
                                {users.data.length === 0 && (
                                    <tr>
                                        <td
                                            className="px-3 py-4 text-muted-foreground"
                                            colSpan={7}
                                        >
                                            Belum ada data user.
                                        </td>
                                    </tr>
                                )}

                                {users.data.map((user) => (
                                    <tr className="border-b" key={user.id}>
                                        <td className="px-3 py-2">
                                            {user.role}
                                        </td>
                                        <td className="px-3 py-2">
                                            {user.nisn}
                                        </td>
                                        <td className="px-3 py-2">
                                            {user.name}
                                        </td>
                                        <td className="px-3 py-2">
                                            {user.birth_date ?? '-'}
                                        </td>
                                        <td className="px-3 py-2">
                                            {user.address ?? '-'}
                                        </td>
                                        <td className="px-3 py-2">
                                            {user.social_link ?? '-'}
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
                                                        href={`/dashboard/users/${user.id}/edit`}
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
                                                        deleteUser(user)
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
                        {users.links.map((link) => (
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
