import { Head, Link, router } from '@inertiajs/react';
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
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { LikeButton } from '@/components/like-button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
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
    likes_count: number;
    is_liked: boolean;
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
        image: <ImageIcon className="size-8 opacity-20" />,
        video: <Video className="size-8 opacity-20" />,
        document: <FileText className="size-8 opacity-20" />,
        link: <LinkIcon className="size-8 opacity-20" />,
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

            <div className="mx-auto max-w-6xl px-4 py-8">
                {/* Header Section */}
                <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
                    <div>
                        <div className="mb-2 flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-blue-600 uppercase">
                            <Sparkles className="size-4" /> Portfolio Creative
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            Koleksi Karya Saya
                        </h1>
                        <p className="mt-1 text-muted-foreground">
                            Kelola dan pamerkan seluruh inspirasi terbaikmu.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative hidden md:block">
                            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Cari karya..."
                                className="w-64 rounded-xl border-none bg-gray-50 py-2 pr-4 pl-10 text-sm transition-all focus:ring-2 focus:ring-blue-500/20 dark:bg-white/5"
                            />
                        </div>
                        <Button
                            asChild
                            className="h-11 rounded-xl bg-blue-600 px-6 text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-700 active:scale-95"
                        >
                            <Link href="/siswa/karya/create" prefetch>
                                <Plus className="mr-2 size-5" /> Posting Karya
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Grid Content */}
                {karyas.data.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-[3rem] border-2 border-dashed border-gray-100 bg-gray-50/50 py-24 text-center dark:border-white/10 dark:bg-white/5">
                        <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/20">
                            <Plus className="size-10 text-blue-600" />
                        </div>
                        <h3 className="mb-2 text-xl font-bold">
                            Belum ada karya nih!
                        </h3>
                        <p className="mb-8 max-w-xs text-muted-foreground">
                            Ayo mulai isi koleksimu dengan karya-karya keren
                            yang menginspirasi.
                        </p>
                        <Button
                            asChild
                            variant="outline"
                            className="rounded-xl border-gray-200 px-8"
                        >
                            <Link href="/siswa/karya/create">
                                Mulai Sekarang
                            </Link>
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {karyas.data.map((karya) => (
                            <Card
                                key={karya.id}
                                className="group overflow-hidden rounded-4xl border-none bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] dark:bg-[#161615]"
                            >
                                <div className="relative aspect-16/10 overflow-hidden bg-linear-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10">
                                    {karya.media_type === 'image' &&
                                    karya.media_path ? (
                                        <img
                                            src={karya.media_path}
                                            className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            alt={karya.title}
                                        />
                                    ) : (
                                        <div className="flex size-full flex-col items-center justify-center transition-transform duration-700 select-none group-hover:scale-110">
                                            {mediaIcons[
                                                karya.media_type as keyof typeof mediaIcons
                                            ] || mediaIcons.link}
                                            <span className="mt-2 text-6xl font-black text-blue-200 dark:text-blue-900">
                                                {karya.title[0]}
                                            </span>
                                        </div>
                                    )}
                                    <div className="absolute top-4 right-4">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    size="icon"
                                                    variant="secondary"
                                                    className="size-9 rounded-xl border-none bg-white/80 opacity-0 shadow-sm backdrop-blur-md transition-opacity group-hover:opacity-100 dark:bg-black/40"
                                                >
                                                    <MoreVertical className="size-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent
                                                align="end"
                                                className="min-w-40 rounded-xl border-gray-100 p-2 shadow-xl"
                                            >
                                                <DropdownMenuItem
                                                    asChild
                                                    className="rounded-lg focus:bg-blue-50 focus:text-blue-600"
                                                >
                                                    <Link
                                                        href={`/siswa/karya/${karya.id}/edit`}
                                                    >
                                                        <Edit className="mr-2 size-4" />{' '}
                                                        Edit Karya
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="rounded-lg focus:bg-gray-50 focus:text-foreground">
                                                    <Share2 className="mr-2 size-4" />{' '}
                                                    Share Karya
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        deleteKarya(karya)
                                                    }
                                                    className="rounded-lg text-rose-500 focus:bg-rose-50 focus:text-rose-600"
                                                >
                                                    <Trash2 className="mr-2 size-4" />{' '}
                                                    Hapus
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                    <div className="absolute top-4 left-4">
                                        {statusBadges[
                                            karya.status as keyof typeof statusBadges
                                        ] || statusBadges.pending}
                                    </div>
                                    <div className="absolute bottom-4 left-4">
                                        <Badge className="flex items-center gap-1.5 border-none bg-blue-600/90 px-3 py-1 text-[10px] font-bold tracking-widest text-white uppercase backdrop-blur-sm hover:bg-blue-600">
                                            {karya.media_type === 'link' ? (
                                                <LinkIcon className="size-3" />
                                            ) : karya.media_type === 'video' ? (
                                                <Video className="size-3" />
                                            ) : karya.media_type ===
                                              'document' ? (
                                                <FileText className="size-3" />
                                            ) : (
                                                <ImageIcon className="size-3" />
                                            )}
                                            {karya.media_type}
                                        </Badge>
                                    </div>
                                </div>
                                <CardContent className="p-7">
                                    <h3 className="mb-3 line-clamp-1 text-xl leading-tight font-bold transition-colors group-hover:text-blue-600">
                                        {karya.title}
                                    </h3>
                                    <p className="mb-6 line-clamp-2 min-h-10 text-sm leading-relaxed text-muted-foreground">
                                        {karya.description ||
                                            'Sebuah perwujudan ide kreatif yang diekspresikan dengan penuh dedikasi.'}
                                    </p>
                                    <div className="flex items-center justify-between border-t border-gray-50 pt-6 dark:border-white/5">
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <Calendar className="size-3.5" />
                                            <span className="text-[10px] font-bold tracking-widest uppercase">
                                                {karya.created_at
                                                    ? new Date(
                                                          karya.created_at,
                                                      ).toLocaleDateString(
                                                          'id-ID',
                                                          {
                                                              month: 'short',
                                                              day: 'numeric',
                                                              year: 'numeric',
                                                          },
                                                      )
                                                    : '-'}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <LikeButton
                                                karyaId={karya.id}
                                                likesCount={karya.likes_count}
                                                isLiked={karya.is_liked}
                                                only={['karyas']}
                                                className="h-8 px-3 text-[10px] font-bold"
                                            />
                                            <div className="flex items-center gap-1.5 text-muted-foreground">
                                                <Share2 className="size-3.5" />
                                                <span className="text-[10px] font-bold">
                                                    5
                                                </span>
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
                            if (i === 0 || i === karyas.links.length - 1)
                                return null;

                            return (
                                <Button
                                    asChild={Boolean(link.url)}
                                    key={`${link.label}-${link.url ?? 'no-url'}`}
                                    size="icon"
                                    variant={link.active ? 'default' : 'ghost'}
                                    className={cn(
                                        'size-10 rounded-xl text-xs font-bold transition-all',
                                        link.active
                                            ? 'bg-blue-600 shadow-lg shadow-blue-500/20'
                                            : 'text-muted-foreground hover:bg-gray-100 dark:hover:bg-white/5',
                                    )}
                                >
                                    {link.url ? (
                                        <Link href={link.url} preserveScroll>
                                            {paginationLabel(link.label)}
                                        </Link>
                                    ) : (
                                        <span>
                                            {paginationLabel(link.label)}
                                        </span>
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
