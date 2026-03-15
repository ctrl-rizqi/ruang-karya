import { Head, Link, router } from '@inertiajs/react';
import { 
    Calendar, 
    Edit, 
    MessageSquare, 
    MoreVertical, 
    Plus, 
    Search, 
    Share2, 
    Sparkles, 
    Trash2,
    Image as ImageIcon,
    Video,
    FileText,
    Link as LinkIcon,
    CheckCircle2,
    Clock
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import StudentLayout from '@/layouts/student-layout';
import { cn } from '@/lib/utils';

type KaryaItem = {
    id: number;
    title: string;
    description: string | null;
    content: string;
    media_type: string;
    media_url: string | null;
    media_path: string | null;
    status: string;
    created_at: string | null;
};

type StudentKaryaIndexProps = {
    karyas: {
        data: KaryaItem[];
        links: {
            url: string | null;
            label: string;
            active: boolean;
        }[];
    };
};

export default function StudentKaryaIndex({ karyas }: StudentKaryaIndexProps) {
    const deleteKarya = (karya: KaryaItem) => {
        if (!window.confirm(`Hapus karya "${karya.title}"? Tindakan ini tidak dapat dibatalkan.`)) {
            return;
        }

        router.delete(`/siswa/karya/${karya.id}`);
    };

    const paginationLabel = (label: string): string => {
        return label
            .replace(/<[^>]*>/g, '')
            .replaceAll('&laquo;', '')
            .replaceAll('&raquo;', '');
    };

    const mediaIcons = {
        image: <ImageIcon className="size-8 opacity-20" />,
        video: <Video className="size-8 opacity-20" />,
        document: <FileText className="size-8 opacity-20" />,
        link: <LinkIcon className="size-8 opacity-20" />,
    };

    const statusBadges = {
        pending: <Badge variant="secondary" className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-none text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 flex items-center gap-1"><Clock className="size-3" /> Pending</Badge>,
        reviewed: <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 flex items-center gap-1"><CheckCircle2 className="size-3" /> Reviewed</Badge>,
    };

    return (
        <StudentLayout>
            <Head title="Koleksi Karya Saya" />

            <div className="mx-auto max-w-6xl px-4 py-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div>
                        <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-[0.2em] mb-2">
                            <Sparkles className="size-4" /> Portfolio Creative
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight">Koleksi Karya Saya</h1>
                        <p className="text-muted-foreground mt-1">Kelola dan pamerkan seluruh inspirasi terbaikmu.</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative hidden md:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                            <input 
                                type="text" 
                                placeholder="Cari karya..." 
                                className="pl-10 pr-4 py-2 bg-gray-50 dark:bg-white/5 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 transition-all w-64"
                            />
                        </div>
                        <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-11 px-6 shadow-lg shadow-blue-500/20 transition-all active:scale-95">
                            <Link href="/siswa/karya/create" prefetch>
                                <Plus className="mr-2 size-5" /> Posting Karya
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Grid Content */}
                {karyas.data.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 text-center bg-gray-50/50 dark:bg-white/5 rounded-[3rem] border-2 border-dashed border-gray-100 dark:border-white/10">
                        <div className="size-20 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-6">
                            <Plus className="size-10 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Belum ada karya nih!</h3>
                        <p className="text-muted-foreground max-w-xs mb-8">
                            Ayo mulai isi koleksimu dengan karya-karya keren yang menginspirasi.
                        </p>
                        <Button asChild variant="outline" className="rounded-xl px-8 border-gray-200">
                            <Link href="/siswa/karya/create">Mulai Sekarang</Link>
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {karyas.data.map((karya) => (
                            <Card key={karya.id} className="group overflow-hidden border-none shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 bg-white dark:bg-[#161615] rounded-4xl">
                                <div className="aspect-16/10 bg-linear-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 relative overflow-hidden">
                                    {karya.media_type === 'image' && karya.media_path ? (
                                        <img src={karya.media_path} className="size-full object-cover group-hover:scale-110 transition-transform duration-700" alt={karya.title} />
                                    ) : (
                                        <div className="size-full flex flex-col items-center justify-center group-hover:scale-110 transition-transform duration-700 select-none">
                                            {mediaIcons[karya.media_type as keyof typeof mediaIcons] || mediaIcons.link}
                                            <span className="text-blue-200 dark:text-blue-900 font-black text-6xl mt-2">{karya.title[0]}</span>
                                        </div>
                                    )}
                                    <div className="absolute top-4 right-4">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button size="icon" variant="secondary" className="rounded-xl size-9 bg-white/80 dark:bg-black/40 backdrop-blur-md border-none shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <MoreVertical className="size-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="rounded-xl border-gray-100 p-2 min-w-40 shadow-xl">
                                                <DropdownMenuItem asChild className="rounded-lg focus:bg-blue-50 focus:text-blue-600">
                                                    <Link href={`/siswa/karya/${karya.id}/edit`}>
                                                        <Edit className="mr-2 size-4" /> Edit Karya
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="rounded-lg focus:bg-gray-50 focus:text-foreground">
                                                    <Share2 className="mr-2 size-4" /> Share Karya
                                                </DropdownMenuItem>
                                                <DropdownMenuItem 
                                                    onClick={() => deleteKarya(karya)}
                                                    className="rounded-lg focus:bg-rose-50 focus:text-rose-600 text-rose-500"
                                                >
                                                    <Trash2 className="mr-2 size-4" /> Hapus
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                    <div className="absolute top-4 left-4">
                                        {statusBadges[karya.status as keyof typeof statusBadges] || statusBadges.pending}
                                    </div>
                                    <div className="absolute bottom-4 left-4">
                                        <Badge className="bg-blue-600/90 hover:bg-blue-600 text-white border-none text-[10px] font-bold uppercase tracking-widest px-3 py-1 backdrop-blur-sm flex items-center gap-1.5">
                                            {karya.media_type === 'link' ? <LinkIcon className="size-3" /> : (karya.media_type === 'video' ? <Video className="size-3" /> : (karya.media_type === 'document' ? <FileText className="size-3" /> : <ImageIcon className="size-3" />))}
                                            {karya.media_type}
                                        </Badge>
                                    </div>
                                </div>
                                <CardContent className="p-7">
                                    <h3 className="font-bold text-xl leading-tight mb-3 group-hover:text-blue-600 transition-colors line-clamp-1">{karya.title}</h3>
                                    <p className="text-sm text-muted-foreground line-clamp-2 mb-6 leading-relaxed min-h-10">
                                        {karya.description || "Sebuah perwujudan ide kreatif yang diekspresikan dengan penuh dedikasi."}
                                    </p>
                                    <div className="flex items-center justify-between pt-6 border-t border-gray-50 dark:border-white/5">
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <Calendar className="size-3.5" />
                                            <span className="text-[10px] font-bold uppercase tracking-widest">
                                                {karya.created_at ? new Date(karya.created_at).toLocaleDateString('id-ID', { month: 'short', day: 'numeric', year: 'numeric' }) : '-'}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center gap-1.5 text-muted-foreground">
                                                <MessageSquare className="size-3.5" />
                                                <span className="text-[10px] font-bold">12</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-muted-foreground">
                                                <Share2 className="size-3.5" />
                                                <span className="text-[10px] font-bold">5</span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {karyas.links.length > 3 && (
                    <div className="mt-16 flex justify-center gap-2">
                        {karyas.links.map((link, i) => {
                            // Skip first/last labels if they are standard Laravel ones
                            if (i === 0 || i === karyas.links.length - 1) return null;
                            
                            return (
                                <Button
                                    asChild={Boolean(link.url)}
                                    key={i}
                                    size="icon"
                                    variant={link.active ? 'default' : 'ghost'}
                                    className={cn(
                                        "size-10 rounded-xl font-bold text-xs transition-all",
                                        link.active ? "bg-blue-600 shadow-lg shadow-blue-500/20" : "text-muted-foreground hover:bg-gray-100 dark:hover:bg-white/5"
                                    )}
                                >
                                    {link.url ? (
                                        <Link href={link.url} preserveScroll>
                                            {paginationLabel(link.label)}
                                        </Link>
                                    ) : (
                                        <span>{paginationLabel(link.label)}</span>
                                    )}
                                </Button>
                            );
                        })}
                    </div>
                )}
            </div>
        </StudentLayout>
    );
}
