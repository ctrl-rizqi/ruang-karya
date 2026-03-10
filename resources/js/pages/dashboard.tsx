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

            <div className="grid gap-4 p-4 md:grid-cols-2">
                <section className="rounded-xl border border-sidebar-border/70 p-6 dark:border-sidebar-border">
                    <h2 className="text-lg font-semibold">Manajemen Siswa</h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Kelola daftar siswa, ubah data, dan hapus akun siswa.
                    </p>
                    <Button asChild className="mt-4">
                        <Link href="/dashboard/students" prefetch>
                            Lihat Daftar Siswa
                        </Link>
                    </Button>
                </section>

                <section className="rounded-xl border border-sidebar-border/70 p-6 dark:border-sidebar-border">
                    <h2 className="text-lg font-semibold">Input Siswa Baru</h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Tambahkan siswa baru dengan NISN, nama, dan password.
                    </p>
                    <Button asChild className="mt-4" variant="outline">
                        <Link href="/dashboard/students/create" prefetch>
                            Buka Form Siswa
                        </Link>
                    </Button>
                </section>
            </div>
        </AppLayout>
    );
}
