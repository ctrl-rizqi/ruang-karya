import { Head, Link, router, useForm } from '@inertiajs/react';
import {
    Calendar,
    Edit,
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
    Clock,
    Eye,
    ChevronRight,
    ExternalLink,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { LikeButton } from '@/components/like-button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import StudentLayout from '@/layouts/student-layout';
import { cn } from '@/lib/utils';
import { useInitials } from '@/hooks/use-initials';
import type { SubmitEvent } from 'react';

type KaryaItem = {
    id: number;
    user: {
        name: string;
        avatar: string;
        nisn: string;
    };
    title: string;
    description: string | null;
    content: string;
    media_type: string;
    media_url: string | null;
    media_path: string | null;
    status: string;
    likes_count: number;
    is_liked: boolean;
    is_owner: boolean;
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
    filters: {
        search: string;
    };
};

export default function StudentKaryaIndex({ 
    karyas,
    filters,
}: StudentKaryaIndexProps) {
    const getInitials = useInitials();
    
    const searchForm = useForm({
        search: filters.search ?? '',
    });

    const handleSearch = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        searchForm.get('/siswa/karya', {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };
    
    const deleteKarya = (karya: KaryaItem) => {
        if (
            !window.confirm(
                `Hapus karya "${karya.title}"? Tindakan ini tidak dapat dibatalkan.`,
            )
        ) {
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
        image: <ImageIcon className="size-4" />,
        video: <Video className="size-4" />,
        document: <FileText className="size-4" />,
        link: <LinkIcon className="size-4" />,
    };

    const statusBadges = {
        pending: (
            <Badge
                variant="secondary"
                className="flex items-center gap-1 border-none bg-amber-100 px-2 py-0.5 text-[9px] font-bold tracking-widest text-amber-700 uppercase hover:bg-amber-100"
            >
                <Clock className="size-3" /> Pending
            </Badge>
        ),
        reviewed: (
            <Badge
                variant="secondary"
                className="flex items-center gap-1 border-none bg-emerald-100 px-2 py-0.5 text-[9px] font-bold tracking-widest text-emerald-700 uppercase hover:bg-emerald-100"
            >
                <CheckCircle2 className="size-3" /> Reviewed
            </Badge>
        ),
    };

    return (
        <StudentLayout>
            <Head title="Koleksi Karya Saya" />

            <div className="mx-auto max-w-5xl px-4 py-8 pb-20">
                {/* Header Section */}
                <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
                    <div>
                        <div className="mb-2 flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-blue-600 uppercase">
                            <Sparkles className="size-4" /> Global Inspiration
                        </div>
                        <h1 className="text-4xl font-black tracking-tight text-[#1b1b18] dark:text-white">
                            Inspirasi Karya
                        </h1>
                        <p className="mt-1 text-base font-medium text-muted-foreground">
                            Jelajahi dan temukan ide kreatif dari seluruh siswa.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button
                            asChild
                            className="h-12 rounded-2xl bg-blue-600 px-8 text-xs font-bold tracking-widest text-white uppercase shadow-xl shadow-blue-500/20 transition-all hover:bg-blue-700 hover:scale-105 active:scale-95"
                        >
                            <Link href="/siswa/karya/create" prefetch>
                                <Plus className="mr-2 size-5" /> Posting Karya
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="mb-12 relative">
                    <form onSubmit={handleSearch} className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Cari berdasarkan nama siswa..."
                            className="h-14 w-full rounded-2xl border-none bg-white px-12 text-sm shadow-sm transition-all focus:ring-2 focus:ring-blue-500/10 dark:bg-[#161615] dark:text-white"
                            value={searchForm.data.search}
                            onChange={(e) => searchForm.setData('search', e.target.value)}
                        />
                        {searchForm.data.search && (
                            <button 
                                type="button"
                                onClick={() => {
                                    searchForm.setData('search', '');
                                    router.get('/siswa/karya', {}, { replace: true, preserveState: true });
                                }}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-blue-600 hover:text-blue-700"
                            >
                                Reset
                            </button>
                        )}
                    </form>
                </div>

                {/* Grid Content */}
                {karyas.data.length === 0 ? (
                    <Card className="border-dashed border-2 border-gray-100 dark:border-white/10 bg-transparent rounded-[3rem] p-24 text-center">
                        <div className="flex flex-col items-center">
                            <div className="size-20 rounded-3xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 mb-6">
                                <Plus className="size-10" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Belum ada karya nih!</h3>
                            <p className="text-muted-foreground max-w-xs mx-auto mb-8">Ayo mulai pamerkan karya kerenmu kepada dunia.</p>
                            <Button asChild variant="outline" className="h-12 px-10 rounded-xl border-blue-200 text-blue-600 font-bold hover:bg-blue-50">
                                <Link href="/siswa/karya/create">Mulai Sekarang</Link>
                            </Button>
                        </div>
                    </Card>
                ) : (
                    <div className="space-y-8">
                        {karyas.data.map((karya) => (
                            <Card
                                key={karya.id}
                                className="group overflow-hidden rounded-2xl border-none bg-white shadow-sm transition-all duration-500 hover:shadow-xl dark:bg-[#161615]"
                            >
                                <CardHeader className="p-6 pb-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="size-10 rounded-xl border-2 border-white shadow-sm dark:border-white/5">
                                                <AvatarImage src={karya.user.avatar} alt={karya.user.name} />
                                                <AvatarFallback className="bg-blue-50 text-blue-600 text-xs font-bold uppercase">
                                                    {getInitials(karya.user.name)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h4 className="font-bold text-sm">{karya.user.name}</h4>
                                                <div className="flex items-center gap-2 mt-0.5">
                                                    <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
                                                       {karya.created_at ? new Date(karya.created_at).toLocaleDateString('id-ID', { month: 'short', day: 'numeric', year: 'numeric' }) : '-'}
                                                    </span>
                                                    <span className="size-1 rounded-full bg-gray-300 dark:bg-white/20" />
                                                    <div className="flex items-center gap-1 text-[10px] text-blue-600 font-bold uppercase tracking-widest">
                                                        {mediaIcons[karya.media_type as keyof typeof mediaIcons] || mediaIcons.link}
                                                        {karya.media_type}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center gap-3">
                                            {statusBadges[karya.status as keyof typeof statusBadges] || statusBadges.pending}
                                            {karya.is_owner && (
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button size="icon" variant="ghost" className="size-9 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5">
                                                            <MoreVertical className="size-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="w-48 rounded-2xl p-2 shadow-2xl border-gray-100 dark:border-white/5">
                                                        <DropdownMenuItem asChild className="rounded-xl focus:bg-blue-50 focus:text-blue-600">
                                                            <Link href={`/siswa/karya/${karya.id}/edit`}>
                                                                <Edit className="mr-3 size-4" /> Edit Karya
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="rounded-xl focus:bg-red-50 focus:text-red-600" onClick={() => deleteKarya(karya)}>
                                                            <Trash2 className="mr-3 size-4" /> Hapus Permanen
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            )}
                                        </div>
                                    </div>
                                </CardHeader>
                                
                                <CardContent className="p-6 pt-0 space-y-5">
                                    <div className="space-y-2">
                                        <h3 className="text-2xl font-black leading-tight text-[#1b1b18] dark:text-white group-hover:text-blue-600 transition-colors">
                                            {karya.title}
                                        </h3>
                                        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                                            {karya.description || 'Sebuah perwujudan ide kreatif yang diekspresikan dengan penuh dedikasi.'}
                                        </p>
                                    </div>

                                    {karya.media_url && (
                                        <a 
                                            href={karya.media_url} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50/50 dark:bg-white/5 border border-gray-100 dark:border-white/5 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors group/link-box"
                                        >
                                            <div className="size-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 shrink-0 group-hover/link-box:scale-110 transition-transform">
                                                <LinkIcon className="size-6" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-0.5">External Resource</p>
                                                <p className="text-sm font-medium truncate text-muted-foreground">{karya.media_url}</p>
                                            </div>
                                            <ExternalLink className="size-4 text-gray-300 group-hover/link-box:text-blue-600 transition-colors" />
                                        </a>
                                    )}

                                    {karya.media_type === 'image' && karya.media_path && (
                                        <div className="aspect-video relative rounded-3xl overflow-hidden bg-gray-50 dark:bg-white/5 border border-gray-50 dark:border-white/5">
                                            <img 
                                                src={karya.media_path} 
                                                alt={karya.title} 
                                                className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        </div>
                                    )}
                                </CardContent>
                                
                                <CardFooter className="p-6 pt-0 flex justify-between items-center">
                                    <div className="flex items-center gap-6">
                                        <LikeButton
                                            karyaId={karya.id}
                                            likesCount={karya.likes_count}
                                            isLiked={karya.is_liked}
                                            only={['karyas']}
                                            className="h-10 px-5 rounded-xl font-bold bg-transparent border-gray-100 dark:border-white/5 text-xs hover:bg-pink-50 hover:text-pink-600"
                                        />
                                        <div className="flex items-center gap-2 text-muted-foreground hover:text-blue-600 transition-colors cursor-pointer">
                                            <Share2 className="size-4" />
                                            <span className="text-xs font-bold tracking-widest uppercase">Share</span>
                                        </div>
                                    </div>
                                    
                                    <Link 
                                        href={`/p/${karya.user.nisn}`} // Or detail page if exists
                                        className="h-10 px-5 rounded-xl bg-blue-50 text-blue-600 text-xs font-bold flex items-center gap-2 transition-all hover:bg-blue-600 hover:text-white"
                                    >
                                        Lihat Portfolio <ChevronRight className="size-4" />
                                    </Link>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {karyas.links.length > 3 && (
                    <div className="mt-16 flex justify-center items-center gap-2">
                        {karyas.links.map((link, i) => (
                            <Button
                                asChild={Boolean(link.url)}
                                key={i}
                                size="sm"
                                variant={link.active ? 'default' : 'ghost'}
                                className={cn(
                                    "h-12 min-w-12 rounded-2xl font-bold text-sm transition-all",
                                    link.active 
                                        ? "bg-blue-600 text-white shadow-xl shadow-blue-500/20" 
                                        : "text-muted-foreground hover:bg-white hover:text-blue-600 shadow-sm border border-gray-100 dark:border-white/5 dark:bg-[#161615]"
                                )}
                            >
                                {link.url ? (
                                    <Link href={link.url} preserveScroll>{paginationLabel(link.label)}</Link>
                                ) : (
                                    <span>{paginationLabel(link.label)}</span>
                                )}
                            </Button>
                        ))}
                    </div>
                )}
            </div>
        </StudentLayout>
    );
}
