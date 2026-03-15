import { Head, Link, useForm } from '@inertiajs/react';
import { 
    ChevronLeft, 
    Clock,
    CheckCircle2,
    Image as ImageIcon,
    Video,
    FileText,
    Link as LinkIcon,
    ExternalLink,
    User,
    Calendar,
    Sparkles
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import { cn } from '@/lib/utils';

type TeacherKaryaShowProps = {
    karya: {
        id: number;
        user: {
            name: string;
        };
        title: string;
        description: string | null;
        content: string;
        media_type: string;
        media_url: string | null;
        media_path: string | null;
        status: string;
        created_at: string;
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
    {
        title: 'Detail Karya',
        href: '#',
    },
];

export default function TeacherKaryaShow({ karya }: TeacherKaryaShowProps) {
    const statusForm = useForm({
        status: karya.status === 'pending' ? 'reviewed' : 'pending',
    });

    const toggleStatus = () => {
        statusForm.patch(`/dashboard/karyas/${karya.id}/status`);
    };

    const mediaIcons = {
        image: <ImageIcon className="size-5" />,
        video: <Video className="size-5" />,
        document: <FileText className="size-5" />,
        link: <LinkIcon className="size-5" />,
    };

    const statusBadges = {
        pending: <Badge variant="secondary" className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-none text-[10px] font-bold uppercase tracking-widest px-3 py-1 flex items-center gap-1.5"><Clock className="size-3.5" /> Pending Review</Badge>,
        reviewed: <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none text-[10px] font-bold uppercase tracking-widest px-3 py-1 flex items-center gap-1.5"><CheckCircle2 className="size-3.5" /> Reviewed</Badge>,
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Detail Karya: ${karya.title}`} />

            <div className="p-6 max-w-5xl mx-auto">
                <div className="mb-8">
                    <Button asChild variant="ghost" size="sm" className="mb-4 text-muted-foreground hover:text-foreground group rounded-xl">
                        <Link href="/dashboard/karyas" className="flex items-center gap-1">
                            <ChevronLeft className="size-4 transition-transform group-hover:-translate-x-1" /> Kembali ke Daftar
                        </Link>
                    </Button>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="size-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/20">
                                {mediaIcons[karya.media_type as keyof typeof mediaIcons] || <Sparkles className="size-7" />}
                            </div>
                            <div>
                                <h1 className="text-3xl font-black tracking-tight">{karya.title}</h1>
                                <div className="flex items-center gap-3 mt-1 text-muted-foreground font-medium text-sm">
                                    <span className="flex items-center gap-1"><User className="size-3.5" /> {karya.user.name}</span>
                                    <span className="size-1 rounded-full bg-gray-300" />
                                    <span className="flex items-center gap-1"><Calendar className="size-3.5" /> {karya.created_at}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            {statusBadges[karya.status as keyof typeof statusBadges] || statusBadges.pending}
                            <Button 
                                onClick={toggleStatus}
                                disabled={statusForm.processing}
                                variant={karya.status === 'pending' ? 'default' : 'outline'}
                                className={karya.status === 'pending' ? 'bg-blue-600 hover:bg-blue-700 text-white rounded-xl' : 'rounded-xl'}
                            >
                                {karya.status === 'pending' ? 'Tandai Selesai Review' : 'Kembalikan ke Pending'}
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        {/* Media Section */}
                        <Card className="border-none shadow-sm bg-white dark:bg-[#161615] rounded-3xl overflow-hidden">
                            <CardHeader className="p-6 pb-0">
                                <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Media Content</CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="aspect-video bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/10 flex items-center justify-center overflow-hidden">
                                    {karya.media_type === 'image' && karya.media_path ? (
                                        <img src={karya.media_path} className="size-full object-contain" alt={karya.title} />
                                    ) : karya.media_type === 'link' && karya.media_url ? (
                                        <div className="flex flex-col items-center text-center p-8">
                                            <LinkIcon className="size-12 text-blue-500 mb-4" />
                                            <p className="font-bold text-lg mb-2">Tautan Eksternal</p>
                                            <p className="text-sm text-muted-foreground mb-6 break-all max-w-sm">{karya.media_url}</p>
                                            <Button asChild variant="outline" className="rounded-xl px-6">
                                                <a href={karya.media_url} target="_blank" rel="noopener noreferrer">
                                                    Buka Link <ExternalLink className="ml-2 size-4" />
                                                </a>
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center text-center p-8">
                                            {mediaIcons[karya.media_type as keyof typeof mediaIcons]}
                                            <p className="font-bold mt-4 uppercase tracking-widest text-xs opacity-40">File: {karya.media_type}</p>
                                            {karya.media_path && (
                                                <Button asChild variant="outline" className="mt-6 rounded-xl">
                                                    <a href={karya.media_path} target="_blank" rel="noopener noreferrer">
                                                        Download File
                                                    </a>
                                                </Button>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Content Section */}
                        <Card className="border-none shadow-sm bg-white dark:bg-[#161615] rounded-3xl overflow-hidden">
                            <CardHeader className="p-6 pb-0">
                                <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Deskripsi & Isi Karya</CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 space-y-6">
                                <div>
                                    <h3 className="font-bold text-lg mb-2">Deskripsi Singkat</h3>
                                    <p className="text-muted-foreground leading-relaxed">{karya.description || 'Tidak ada deskripsi.'}</p>
                                </div>
                                <div className="pt-6 border-t border-gray-50 dark:border-white/5">
                                    <h3 className="font-bold text-lg mb-4">Isi Detail</h3>
                                    <div className="prose prose-sm dark:prose-invert max-w-none text-[#1b1b18] dark:text-gray-300 leading-loose">
                                        {karya.content.split('\n').map((line, i) => (
                                            <p key={i}>{line}</p>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <Card className="border-none shadow-sm bg-white dark:bg-[#161615] rounded-3xl overflow-hidden">
                            <CardHeader className="p-6">
                                <CardTitle className="text-sm font-bold uppercase tracking-widest">Feedback Guru</CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 pt-0">
                                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-900/30">
                                    <p className="text-xs text-blue-900/70 dark:text-blue-100/70 leading-relaxed italic">
                                        "Fitur feedback personal akan segera tersedia untuk memberikan bimbingan yang lebih baik bagi siswa."
                                    </p>
                                </div>
                                <div className="mt-6 space-y-4">
                                    <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest opacity-40">
                                        <span>Status Tinjauan</span>
                                        <span>{karya.status === 'reviewed' ? 'Selesai' : 'Menunggu'}</span>
                                    </div>
                                    <div className="w-full h-2 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                                        <div className={cn(
                                            "h-full transition-all duration-1000",
                                            karya.status === 'reviewed' ? "w-full bg-emerald-500" : "w-1/4 bg-amber-500"
                                        )} />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="p-8 bg-linear-to-br from-blue-600 to-indigo-700 rounded-3xl text-white shadow-xl">
                            <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                                <Sparkles className="size-5" /> Quick Action
                            </h3>
                            <p className="text-sm text-blue-50 leading-relaxed mb-6">
                                Tandai karya ini jika sudah memenuhi kriteria penilaian untuk memberikan apresiasi kepada siswa.
                            </p>
                            <Button 
                                onClick={toggleStatus}
                                disabled={statusForm.processing}
                                className="w-full bg-white text-blue-600 hover:bg-blue-50 rounded-xl font-bold uppercase tracking-widest text-xs"
                            >
                                {karya.status === 'reviewed' ? 'Batalkan Review' : 'Selesaikan Review'}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
