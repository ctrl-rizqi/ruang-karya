import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
                <section className="rounded-xl border border-sidebar-border/70 p-6 dark:border-sidebar-border">
                    <h2 className="text-lg font-semibold">Manajemen Users</h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Kelola daftar user, ubah data, dan hapus akun user.
                    </p>
                    <Button asChild className="mt-4" variant="outline">
                        <Link href="/dashboard/users" prefetch>
                            Lihat Daftar Users
                        </Link>
                    </Button>
                </section>

                <section className="rounded-xl border border-sidebar-border/70 p-6 dark:border-sidebar-border">
                    <h2 className="text-lg font-semibold">Input User Baru</h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Tambahkan user baru dengan role, NISN, nama, dan
                        password.
                    </p>
                    <Button asChild className="mt-4" variant="outline">
                        <Link href="/dashboard/users/create" prefetch>
                            Buka Form User
                        </Link>
                    </Button>
                </section>

                <section className="rounded-xl border border-sidebar-border/70 p-6 dark:border-sidebar-border">
                    <h2 className="text-lg font-semibold">Pengaturan Web</h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Ubah judul situs, logo, tagline, dan deskripsi global.
                    </p>
                    <Button asChild className="mt-4">
                        <Link href="/dashboard/web-settings" prefetch>
                            Buka Pengaturan
                        </Link>
                    </Button>
                </section>
            </div>
        </AppLayout>
    );
}
