import { Head, Link, useForm } from '@inertiajs/react';
import { 
    Edit, 
    Filter, 
    Plus, 
    Search, 
    Trash2, 
    X,
    GraduationCap
} from 'lucide-react';
import type { SubmitEvent } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';

type UserItem = {
    id: number;
    role: string;
    nisn: string;
    name: string;
    classroom_name: string | null;
    major_name: string | null;
};

type Option = {
    id: number;
    name: string;
};

type StudentUsersIndexProps = {
    users: {
        data: UserItem[];
        links: {
            url: string | null;
            label: string;
            active: boolean;
        }[];
    };
    filters: {
        name: string;
        nisn: string;
        role: string;
        classroom_id: string;
        major_id: string;
    };
    roleOptions: string[];
    classrooms: Option[];
    majors: Option[];
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
    },
    {
        title: 'Manajemen Users',
        href: '/dashboard/users',
    },
];

export default function StudentUsersIndex({
    users,
    filters,
    roleOptions,
    classrooms,
    majors,
}: StudentUsersIndexProps) {
    const filterForm = useForm({
        name: filters.name ?? '',
        nisn: filters.nisn ?? '',
        role: filters.role ?? '',
        classroom_id: filters.classroom_id ?? '',
        major_id: filters.major_id ?? '',
    });

    const submit = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        filterForm.get('/dashboard/users', {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    const reset = () => {
        filterForm.setData({
            name: '',
            nisn: '',
            role: '',
            classroom_id: '',
            major_id: '',
        });
        filterForm.get('/dashboard/users');
    };

    const paginationLabel = (label: string): string => {
        return label
            .replace(/<[^>]*>/g, '')
            .replaceAll('&laquo;', '')
            .replaceAll('&raquo;', '');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manajemen Users" />

            <div className="p-6 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div>
                        <h1 className="text-3xl font-black tracking-tight">Manajemen Users</h1>
                        <p className="text-muted-foreground mt-1 text-sm font-medium">Kelola akses guru dan data dasar siswa sekolah.</p>
                    </div>
                    <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-12 px-6 shadow-lg shadow-blue-500/20">
                        <Link href="/dashboard/users/create">
                            <Plus className="mr-2 size-5" /> Tambah User Baru
                        </Link>
                    </Button>
                </div>

                {/* Filters */}
                <Card className="border-none shadow-sm bg-white dark:bg-[#161615] rounded-4xl mb-8 overflow-hidden">
                    <CardContent className="p-8">
                        <form onSubmit={submit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                                <div className="md:col-span-4 relative">
                                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Cari nama..."
                                        className="pl-10 h-11 rounded-xl bg-gray-50/50 border-transparent focus:bg-white"
                                        value={filterForm.data.name}
                                        onChange={(e) => filterForm.setData('name', e.target.value)}
                                    />
                                </div>
                                <div className="md:col-span-3 relative">
                                    <GraduationCap className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                                    <Input
                                        placeholder="NISN"
                                        className="pl-10 h-11 rounded-xl bg-gray-50/50 border-transparent focus:bg-white"
                                        value={filterForm.data.nisn}
                                        onChange={(e) => filterForm.setData('nisn', e.target.value)}
                                    />
                                </div>
                                <div className="md:col-span-3">
                                    <select
                                        className="flex h-11 w-full rounded-xl border-none bg-gray-50/50 px-3 py-1 text-sm focus:bg-white outline-none transition-all"
                                        value={filterForm.data.role}
                                        onChange={(e) => filterForm.setData('role', e.target.value)}
                                    >
                                        <option value="">Semua Role</option>
                                        {roleOptions.map((role) => (
                                            <option key={role} value={role}>{role}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="md:col-span-2">
                                    <Button type="submit" variant="secondary" className="w-full h-11 rounded-xl font-bold uppercase tracking-widest text-[10px]">
                                        <Filter className="mr-2 size-3" /> Filter
                                    </Button>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-gray-50 dark:border-white/5">
                                <div className="flex items-center gap-2">
                                    <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Kelas:</Label>
                                    <select
                                        className="h-9 rounded-lg border-none bg-gray-50/50 px-3 text-xs focus:bg-white outline-none"
                                        value={filterForm.data.classroom_id}
                                        onChange={(e) => filterForm.setData('classroom_id', e.target.value)}
                                    >
                                        <option value="">Semua Kelas</option>
                                        {classrooms.map((c) => (
                                            <option key={c.id} value={c.id}>{c.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Jurusan:</Label>
                                    <select
                                        className="h-9 rounded-lg border-none bg-gray-50/50 px-3 text-xs focus:bg-white outline-none"
                                        value={filterForm.data.major_id}
                                        onChange={(e) => filterForm.setData('major_id', e.target.value)}
                                    >
                                        <option value="">Semua Jurusan</option>
                                        {majors.map((m) => (
                                            <option key={m.id} value={m.id}>{m.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <Button type="button" variant="ghost" onClick={reset} className="ml-auto text-[10px] font-bold uppercase tracking-widest text-rose-500 hover:text-rose-600 rounded-lg">
                                    <X className="mr-2 size-3" /> Reset Filter
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Table */}
                <div className="bg-white dark:bg-[#161615] rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-gray-50 dark:border-white/5 bg-gray-50/30 dark:bg-white/5">
                                    <th className="px-6 py-5 text-left font-bold uppercase tracking-[0.2em] text-[10px] text-muted-foreground">User</th>
                                    <th className="px-6 py-5 text-left font-bold uppercase tracking-[0.2em] text-[10px] text-muted-foreground">Identity</th>
                                    <th className="px-6 py-5 text-left font-bold uppercase tracking-[0.2em] text-[10px] text-muted-foreground">Role</th>
                                    <th className="px-6 py-5 text-left font-bold uppercase tracking-[0.2em] text-[10px] text-muted-foreground">Class / Major</th>
                                    <th className="px-6 py-5 text-right font-bold uppercase tracking-[0.2em] text-[10px] text-muted-foreground">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 dark:divide-white/5">
                                {users.data.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-20 text-center text-muted-foreground italic font-medium">
                                            Tidak ada user ditemukan.
                                        </td>
                                    </tr>
                                ) : (
                                    users.data.map((user) => (
                                        <tr key={user.id} className="group hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="size-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                                                        {user.name.charAt(0)}
                                                    </div>
                                                    <span className="font-bold text-[#1b1b18] dark:text-white">{user.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-xs">NISN: {user.nisn}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <Badge variant={user.role === 'GURU' ? 'default' : 'secondary'} className="rounded-lg px-2 py-0.5 text-[9px] font-black tracking-widest uppercase">
                                                    {user.role}
                                                </Badge>
                                            </td>
                                            <td className="px-6 py-4">
                                                {user.role === 'SISWA' ? (
                                                    <div className="flex items-center gap-2">
                                                        <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-600 text-[10px] font-bold">{user.classroom_name || '-'}</span>
                                                        <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-600 text-[10px] font-bold">{user.major_name || '-'}</span>
                                                    </div>
                                                ) : (
                                                    <span className="text-gray-300">-</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Button asChild size="icon" variant="ghost" className="size-9 rounded-xl hover:bg-blue-50 hover:text-blue-600">
                                                        <Link href={`/dashboard/users/${user.id}/edit`}>
                                                            <Edit className="size-4" />
                                                        </Link>
                                                    </Button>
                                                    <Button 
                                                        size="icon" 
                                                        variant="ghost" 
                                                        className="size-9 rounded-xl hover:bg-rose-50 hover:text-rose-600"
                                                        onClick={() => {
                                                            if(confirm(`Hapus user ${user.name}?`)) {
                                                                // Handle delete
                                                            }
                                                        }}
                                                    >
                                                        <Trash2 className="size-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination */}
                {users.links.length > 3 && (
                    <div className="mt-10 flex justify-center gap-2">
                        {users.links.map((link, i) => (
                            <Button
                                asChild={Boolean(link.url)}
                                key={i}
                                size="sm"
                                variant={link.active ? 'default' : 'ghost'}
                                className={cn(
                                    "h-9 min-w-9 rounded-xl font-bold text-xs",
                                    link.active ? "bg-blue-600 shadow-md shadow-blue-500/20" : "text-muted-foreground"
                                )}
                            >
                                {link.url ? (
                                    <Link href={link.url}>{paginationLabel(link.label)}</Link>
                                ) : (
                                    <span>{paginationLabel(link.label)}</span>
                                )}
                            </Button>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
