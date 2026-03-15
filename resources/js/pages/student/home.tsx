import { Head, Link } from '@inertiajs/react';
import {
    Calendar,
    User,
    Edit,
    ExternalLink,
    Grid,
    Info,
    MapPin,
    MoreHorizontal,
    Plus,
    Share2,
    Sparkles,
    Trophy,
    Copy,
    Check,
    Image as ImageIcon,
    Video,
    FileText,
    Link as LinkIcon,
    Clock,
    CheckCircle2,
} from 'lucide-react';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LikeButton } from '@/components/like-button';
import StudentLayout from '@/layouts/student-layout';
import { cn } from '@/lib/utils';

type Karya = {
    id: number;
    title: string;
    description: string | null;
    media_type: string;
    media_url: string | null;
    media_path: string | null;
    status: string;
    likes_count: number;
    is_liked: boolean;
    created_at: string;
};

type StudentHomeProps = {
    karyaCount: number;
    recentKarya: Karya[];
    student: {
        name: string;
        email: string;
        nisn: string | null;
        birth_date: string | null;
        address: string | null;
        social_link: string | null;
        avatar: string;
        bio: string | null;
    };
};

export default function StudentHome({
    karyaCount,
    recentKarya,
    student,
}: StudentHomeProps) {
    const [activeTab, setActiveTab] = useState<'karya' | 'about'>('karya');
    const [copied, setCopied] = useState(false);

    const publicUrl = `${window.location.origin}/p/${student.nisn}`;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(publicUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator
                .share({
                    title: `Portofolio ${student.name} - Ruang Karya`,
                    text: `Lihat portofolio karya kreatif saya di Ruang Karya!`,
                    url: publicUrl,
                })
                .catch(() => {});
        } else {
            copyToClipboard();
        }
    };

    const initials = student.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase();

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
            <Head title={`Profil ${student.name}`} />

            <div className="mx-auto max-w-5xl">
                {/* Profile Header */}
                <div className="relative overflow-hidden rounded-b-3xl border-x border-b border-gray-100 bg-white shadow-sm dark:border-white/5 dark:bg-[#0a0a0a]">
                    {/* Cover Photo */}
                    <div className="relative h-2 w-full bg-linear-to-r from-blue-600 via-indigo-500 to-purple-600">
                        <div className="absolute inset-0 bg-black/10" />
                    </div>

                    {/* Profile Info Section */}
                    <div className="px-6 pb-6">
                        <div className="relative mt-3 flex flex-col justify-between gap-6 md:flex-row md:items-end">
                            <div className="flex flex-col items-start gap-4 md:flex-row md:items-end">
                                <div className="group relative">
                                    <Avatar className="size-24 rounded-2xl border-4 border-white shadow-xl transition-transform duration-300 group-hover:scale-105 md:size-32 dark:border-[#0a0a0a]">
                                        <AvatarImage
                                            src={student.avatar}
                                            className="bg-cover"
                                        />
                                        <AvatarFallback className="bg-blue-50 text-2xl font-bold text-blue-600">
                                            {initials}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div
                                        className="absolute right-2 bottom-2 size-6 animate-pulse rounded-full border-2 border-white bg-green-500 ring-4 ring-green-500/20 dark:border-[#0a0a0a]"
                                        title="Online"
                                    />
                                </div>
                                <div className="mb-2">
                                    <div className="flex items-center gap-2">
                                        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                                            {student.name}
                                        </h1>
                                        <div
                                            className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-blue-600 shadow-sm"
                                            title="Verified Scholar"
                                        >
                                            <Sparkles className="size-3 fill-current" />
                                        </div>
                                    </div>
                                    <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm font-medium text-muted-foreground">
                                        {student.nisn && (
                                            <span className="flex items-center gap-1.5">
                                                <Trophy className="size-3.5 text-orange-400" />{' '}
                                                NISN: {student.nisn}
                                            </span>
                                        )}
                                        {student.address && (
                                            <span className="flex items-center gap-1.5 text-blue-600">
                                                <MapPin className="size-3.5" />{' '}
                                                {student.address}
                                            </span>
                                        )}
                                        {student.birth_date && (
                                            <span className="flex items-center gap-1.5">
                                                <Calendar className="size-3.5" />{' '}
                                                Lahir:{' '}
                                                {new Date(
                                                    student.birth_date,
                                                ).toLocaleDateString('id-ID', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric',
                                                })}
                                            </span>
                                        )}
                                    </div>

                                    
                                </div>
                            </div>

                            <div className="mb-2 flex gap-2">
                                <Button
                                    asChild
                                    variant="outline"
                                    className="h-11 rounded-xl border-gray-200 px-5"
                                >
                                    <Link href="/siswa/profile">
                                        <Edit className="mr-2 size-4" /> Edit
                                        Profil
                                    </Link>
                                </Button>
                                <Button
                                    asChild
                                    className="h-11 rounded-xl bg-blue-600 px-5 text-white shadow-lg shadow-blue-500/20 hover:bg-blue-700"
                                >
                                    <Link href="/siswa/karya/create">
                                        <Plus className="mr-2 size-4" /> Posting
                                        Karya
                                    </Link>
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="size-11 rounded-xl border border-gray-100"
                                >
                                    <MoreHorizontal className="size-5 text-gray-400" />
                                </Button>
                            </div>
                        </div>

                        {/* Stats Bar */}
                        <div className="mt-8 flex gap-8 border-t border-gray-100 px-2 pt-6 dark:border-white/5">
                            <div className="flex flex-col">
                                <span className="text-xl font-bold">
                                    {karyaCount}
                                </span>
                                <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                                    Karya
                                </span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xl font-bold">
                                    {
                                        recentKarya.filter(
                                            (k) => k.status === 'reviewed',
                                        ).length
                                    }
                                </span>
                                <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                                    Reviewed
                                </span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xl font-bold">
                                    {
                                        recentKarya.filter(
                                            (k) => k.media_type === 'link',
                                        ).length
                                    }
                                </span>
                                <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                                    Links
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="px-6 py-8">
                    <div className="mb-8 flex items-center justify-between border-b border-gray-100 dark:border-white/5">
                        <div className="flex gap-8">
                            <button
                                type="button"
                                onClick={() => setActiveTab('karya')}
                                className={cn(
                                    'relative flex items-center gap-2 pb-4 text-xs font-bold tracking-[0.2em] uppercase transition-all',
                                    activeTab === 'karya'
                                        ? 'text-blue-600'
                                        : 'text-muted-foreground hover:text-foreground',
                                )}
                            >
                                <Grid className="size-4" /> Feed Karya
                                {activeTab === 'karya' && (
                                    <div className="absolute right-0 bottom-0 left-0 h-0.5 rounded-full bg-blue-600" />
                                )}
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveTab('about')}
                                className={cn(
                                    'relative flex items-center gap-2 pb-4 text-xs font-bold tracking-[0.2em] uppercase transition-all',
                                    activeTab === 'about'
                                        ? 'text-blue-600'
                                        : 'text-muted-foreground hover:text-foreground',
                                )}
                            >
                                <Info className="size-4" /> Tentang Saya
                                {activeTab === 'about' && (
                                    <div className="absolute right-0 bottom-0 left-0 h-0.5 rounded-full bg-blue-600" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div className="animate-in duration-500 fade-in slide-in-from-bottom-4">
                        {activeTab === 'karya' ? (
                            recentKarya.length > 0 ? (
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    {recentKarya.map((karya) => (
                                        <Card
                                            key={karya.id}
                                            className="group overflow-hidden rounded-3xl border-none bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] dark:bg-[#161615]"
                                        >
                                            <div className="relative aspect-4/3 overflow-hidden bg-gray-50 dark:bg-[#222]">
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
                                                        <span className="mt-2 text-5xl font-black text-blue-200 dark:text-blue-900">
                                                            {karya.title[0]}
                                                        </span>
                                                    </div>
                                                )}

                                                <div className="absolute top-4 left-4">
                                                    <div className="flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold tracking-widest text-blue-600 uppercase shadow-sm backdrop-blur-md">
                                                        {karya.media_type ===
                                                        'link' ? (
                                                            <LinkIcon className="size-3" />
                                                        ) : karya.media_type ===
                                                          'video' ? (
                                                            <Video className="size-3" />
                                                        ) : karya.media_type ===
                                                          'document' ? (
                                                            <FileText className="size-3" />
                                                        ) : (
                                                            <ImageIcon className="size-3" />
                                                        )}
                                                        {karya.media_type}
                                                    </div>
                                                </div>
                                                <div className="absolute top-4 right-4">
                                                    {
                                                        statusBadges[
                                                            karya.status as keyof typeof statusBadges
                                                        ]
                                                    }
                                                </div>
                                            </div>
                                            <CardContent className="p-6">
                                                <h3 className="mb-2 line-clamp-1 text-lg leading-tight font-bold transition-colors group-hover:text-blue-600">
                                                    {karya.title}
                                                </h3>
                                                <p className="mb-6 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                                                    {karya.description ||
                                                        'Inspirasi baru yang dituangkan dalam sebuah karya kreatif yang bermakna.'}
                                                </p>
                                                <div className="flex items-center justify-between border-t border-gray-50 pt-5 dark:border-white/5">
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                                                            {new Date(
                                                                karya.created_at,
                                                            ).toLocaleDateString(
                                                                'id-ID',
                                                                {
                                                                    month: 'short',
                                                                    day: 'numeric',
                                                                    year: 'numeric',
                                                                },
                                                            )}
                                                        </span>
                                                        <LikeButton
                                                            karyaId={karya.id}
                                                            likesCount={
                                                                karya.likes_count
                                                            }
                                                            isLiked={
                                                                karya.is_liked
                                                            }
                                                            only={[
                                                                'recentKarya',
                                                            ]}
                                                            className="h-8 px-3 text-[10px] font-bold"
                                                        />
                                                    </div>
                                                    <Link
                                                        href={`/siswa/karya/${karya.id}/edit`}
                                                        className="group/link flex items-center gap-1 text-xs font-bold tracking-widest text-blue-600 uppercase hover:text-blue-700"
                                                    >
                                                        Manage{' '}
                                                        <Edit className="size-3 transition-transform group-hover/link:scale-110" />
                                                    </Link>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center rounded-[3rem] border-2 border-dashed border-gray-100 bg-gray-50/50 py-24 text-center dark:border-white/10 dark:bg-white/5">
                                    <div className="relative mb-8 flex size-24 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/20">
                                        <Sparkles className="size-12 text-blue-600" />
                                        <div className="absolute -top-2 -right-2 flex size-8 animate-bounce items-center justify-center rounded-full bg-purple-100">
                                            <Plus className="size-4 text-purple-600" />
                                        </div>
                                    </div>
                                    <h3 className="mb-3 text-2xl font-bold">
                                        Mulai petualanganmu!
                                    </h3>
                                    <p className="mb-10 max-w-sm leading-relaxed font-medium text-muted-foreground">
                                        Ruang ini masih kosong. Ayo buat karya
                                        pertamamu dan tunjukkan kepada dunia
                                        bakat luar biasanmu!
                                    </p>
                                    <Button
                                        asChild
                                        className="h-14 rounded-2xl bg-[#1b1b18] px-10 text-white shadow-xl shadow-black/10 transition-all hover:scale-105 hover:bg-black active:scale-95"
                                    >
                                        <Link href="/siswa/karya/create">
                                            <Plus className="mr-2 size-5" />{' '}
                                            Buat Karya Pertama
                                        </Link>
                                    </Button>
                                </div>
                            )
                        ) : (
                            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                                <div className="space-y-8 lg:col-span-2">
                                    <section className="rounded-4xl border border-gray-100 bg-white p-8 shadow-sm dark:border-white/5 dark:bg-[#161615]">
                                        <div className="mb-6 flex items-center gap-3">
                                            <div className="flex size-10 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                                                <User className="size-5" />
                                            </div>
                                            <h3 className="text-sm font-bold tracking-[0.2em] text-blue-600 uppercase">
                                                Biodata Diri
                                            </h3>
                                        </div>
                                        <p className="text-lg leading-relaxed text-muted-foreground italic">
                                            "
                                            {student.bio ||
                                                'Halo! Saya adalah siswa yang antusias dalam belajar hal-hal baru dan ingin berbagi inspirasi melalui karya-karya saya di platform Ruang Karya.'}
                                            "
                                        </p>
                                    </section>

                                    <section className="rounded-4xl bg-linear-to-br from-blue-600 to-indigo-700 p-8 text-white shadow-xl">
                                        <div className="mb-6 flex items-center gap-3">
                                            <div className="flex size-10 items-center justify-center rounded-2xl bg-white/20 text-white backdrop-blur-md">
                                                <Trophy className="size-5" />
                                            </div>
                                            <h3 className="text-sm font-bold tracking-[0.2em] text-blue-100 uppercase">
                                                Visi & Semangat
                                            </h3>
                                        </div>
                                        <p className="mb-4 text-xl leading-relaxed font-bold">
                                            "Terus bereksperimen, belajar dari
                                            kegagalan, dan pantang menyerah
                                            sebelum menjadi versi terbaik diri
                                            sendiri."
                                        </p>
                                        <div className="h-1 w-20 rounded-full bg-white/30" />
                                    </section>
                                </div>

                                <div className="space-y-8">
                                    <section className="rounded-4xl border border-gray-100 bg-white p-8 shadow-sm dark:border-white/5 dark:bg-[#161615]">
                                        <h3 className="mb-6 text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase">
                                            Connect With Me
                                        </h3>
                                        <div className="space-y-4">
                                            {student.social_link ? (
                                                <a
                                                    href={student.social_link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="group flex items-center justify-between rounded-2xl bg-gray-50 p-4 transition-all hover:bg-blue-50 dark:bg-white/5 dark:hover:bg-blue-900/20"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex size-8 items-center justify-center rounded-full bg-white shadow-sm dark:bg-black">
                                                            <ExternalLink className="size-4 text-blue-600" />
                                                        </div>
                                                        <span className="text-sm font-bold">
                                                            Website / Social
                                                        </span>
                                                    </div>
                                                    <Share2 className="size-4 text-gray-300 group-hover:text-blue-600" />
                                                </a>
                                            ) : (
                                                <div className="py-4 text-center">
                                                    <p className="mb-4 text-sm text-muted-foreground italic">
                                                        Belum ada tautan sosial.
                                                    </p>
                                                    <Button
                                                        asChild
                                                        variant="link"
                                                        size="sm"
                                                        className="text-blue-600"
                                                    >
                                                        <Link href="/siswa/profile">
                                                            Tambah Sekarang
                                                        </Link>
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    </section>

                                    <section className="rounded-4xl border border-gray-100 bg-white p-8 shadow-sm dark:border-white/5 dark:bg-[#161615]">
                                        <h3 className="mb-6 text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase">
                                            Informasi Akun
                                        </h3>
                                        <div className="space-y-6">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                                                    Email Terverifikasi
                                                </span>
                                                <span className="truncate text-sm font-bold">
                                                    {student.email}
                                                </span>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                                                    Status Keanggotaan
                                                </span>
                                                <div className="flex items-center gap-2">
                                                    <div className="size-2 rounded-full bg-green-500 ring-4 ring-green-500/20" />
                                                    <span className="text-sm font-bold">
                                                        Siswa Aktif
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </StudentLayout>
    );
}
