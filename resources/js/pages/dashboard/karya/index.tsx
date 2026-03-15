import { Head, Link, useForm } from '@inertiajs/react';
import { 
    Eye, 
    Search, 
    Sparkles, 
    Clock,
    CheckCircle2,
    Image as ImageIcon,
    Video,
    FileText,
    Link as LinkIcon
} from 'lucide-react';
import type { SubmitEvent } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';

type KaryaItem = {
    id: number;
    user: {
        name: string;
    };
    title: string;
    media_type: string;
    status: string;
    created_at: string;
};

type TeacherKaryaIndexProps = {
    karyas: {
        data: KaryaItem[];
        links: {
            url: string | null;
            label: string;
            active: boolean;
        }[];
    };
    filters: {
        search: string;
    };
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
    },
    {
        title: 'Review Karya Siswa',
        href: '/dashboard/karyas',
    },
];

export default function TeacherKaryaIndex({
    karyas,
    filters,
}: TeacherKaryaIndexProps) {
    const filterForm = useForm({
        search: filters.search ?? '',
    });

    const submit = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        filterForm.get('/dashboard/karyas', {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    const paginationLabel = (label: string): string => {
        return label
            .replace(/<[^>]*>/g, '')
            .replaceAll('&laquo;', '')
            .replaceAll('&raquo;', '');
    };

    const mediaIcons = {
        image: <ImageIcon className="size-4" />,
        video: <Video className="size-4" />,
        document: <FileText className="size-4" />,
        link: <LinkIcon className="size-4" />,
    };

    const statusBadges = {
        pending: <Badge variant="secondary" className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-none text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 flex items-center gap-1"><Clock className="size-3" /> Pending</Badge>,
        reviewed: <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 flex items-center gap-1"><CheckCircle2 className="size-3" /> Reviewed</Badge>,
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Review Karya Siswa" />

            <div className="p-6 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div>
                        <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-[0.2em] mb-2">
                            <Sparkles className="size-4" /> Student Portfolio
                        </div>
                        <h1 className="text-3xl font-black tracking-tight">Review Karya Siswa</h1>
                        <p className="text-muted-foreground mt-1 text-sm font-medium">Tinjau dan berikan feedback pada karya-karya kreatif siswa.</p>
                    </div>
                </div>

                {/* Filters */}
                <Card className="border-none shadow-sm bg-white dark:bg-[#161615] rounded-2xl mb-8 overflow-hidden">
                    <CardContent className="p-6">
                        <form onSubmit={submit} className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                                <Input
                                    placeholder="Cari judul karya..."
                                    className="pl-10 rounded-xl bg-gray-50/50 border-transparent focus:bg-white dark:bg-accent/50 dark:focus:bg-accent"
                                    value={filterForm.data.search}
                                    onChange={(e) => filterForm.setData('search', e.target.value)}
                                />
                            </div>
                            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-8 font-bold uppercase tracking-widest text-[10px]">
                                Cari Karya
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Table */}
                <div className="bg-white dark:bg-[#161615] rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-gray-50 dark:border-white/5 bg-gray-50/30 dark:bg-white/5">
                                    <th className="px-6 py-5 text-left font-bold uppercase tracking-[0.2em] text-[10px] text-muted-foreground">Siswa</th>
                                    <th className="px-6 py-5 text-left font-bold uppercase tracking-[0.2em] text-[10px] text-muted-foreground">Judul Karya</th>
                                    <th className="px-6 py-5 text-left font-bold uppercase tracking-[0.2em] text-[10px] text-muted-foreground">Tipe</th>
                                    <th className="px-6 py-5 text-left font-bold uppercase tracking-[0.2em] text-[10px] text-muted-foreground">Status</th>
                                    <th className="px-6 py-5 text-left font-bold uppercase tracking-[0.2em] text-[10px] text-muted-foreground">Waktu</th>
                                    <th className="px-6 py-5 text-right font-bold uppercase tracking-[0.2em] text-[10px] text-muted-foreground">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 dark:divide-white/5">
                                {karyas.data.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-20 text-center text-muted-foreground italic font-medium">
                                            Belum ada karya siswa yang diajukan.
                                        </td>
                                    </tr>
                                ) : (
                                    karyas.data.map((karya) => (
                                        <tr key={karya.id} className="group hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors">
                                            <td className="px-6 py-4">
                                                <span className="font-bold text-[#1b1b18] dark:text-white">{karya.user.name}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="font-medium">{karya.title}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                                                    {mediaIcons[karya.media_type as keyof typeof mediaIcons]}
                                                    {karya.media_type}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                {statusBadges[karya.status as keyof typeof statusBadges] || statusBadges.pending}
                                            </td>
                                            <td className="px-6 py-4 text-xs text-muted-foreground uppercase font-bold tracking-widest">
                                                {karya.created_at}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <Button asChild size="icon" variant="ghost" className="size-9 rounded-xl hover:bg-blue-50 hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Link href={`/dashboard/karyas/${karya.id}`}>
                                                        <Eye className="size-4" />
                                                    </Link>
                                                </Button>
                                            </td>
                                        </tr>
                                    )
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination */}
                {karyas.links.length > 3 && (
                    <div className="mt-10 flex justify-center gap-2">
                        {karyas.links.map((link, i) => (
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
