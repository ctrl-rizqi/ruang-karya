import { Head, Link } from '@inertiajs/react';
import {
    Calendar,
    ExternalLink,
    Grid,
    MapPin,
    Share2,
    Sparkles,
    Trophy,
    Image as ImageIcon,
    Video,
    FileText,
    Link as LinkIcon,
    ChevronLeft,
    School,
    BookOpen,
    Quote,
    Instagram,
    Facebook,
    Linkedin,
    MessageCircle,
    Phone,
    Heart,
    Star,
    ChevronRight,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LikeButton } from '@/components/like-button';
import { Separator } from '@/components/ui/separator';

type Karya = {
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
    created_at: string;
};

type PortfolioShowProps = {
    student: {
        id: number;
        nisn: string;
        name: string;
        avatar: string;
        gender: string | null;
        phone: string | null;
        birth_place: string | null;
        birth_date: string | null;
        address: string | null;
        bio: string | null;
        skills: string[];
        achievements: string[];
        interests: string[];
        social_link: string | null;
        instagram: string | null;
        facebook: string | null;
        tiktok: string | null;
        linkedin: string | null;
        classroom: string | null;
        major: string | null;
    };
    karyas: Karya[];
};

export default function PortfolioShow({ student, karyas }: PortfolioShowProps) {
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

    return (
        <div className="min-h-screen bg-[#FDFDFC] font-sans text-[#1b1b18] selection:bg-blue-100 selection:text-blue-900">
            <Head title={`Portofolio - ${student.name}`} />

            {/* Public Header */}
            <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
                    <Link href="/" className="group flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white shadow-lg shadow-blue-500/20 transition-transform group-hover:scale-110">
                            <School className="size-4" />
                        </div>
                        <span className="text-sm font-black tracking-tight text-[#003366] uppercase">
                            Ruang Karya
                        </span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <Button
                            asChild
                            variant="ghost"
                            size="sm"
                            className="hidden rounded-xl text-[10px] font-bold tracking-widest uppercase md:flex"
                        >
                            <Link href="/daftar-siswa">
                                Jelajahi Siswa Lain
                            </Link>
                        </Button>
                        <Button
                            asChild
                            size="sm"
                            className="h-9 rounded-xl bg-[#003366] text-[10px] font-bold tracking-widest text-white uppercase hover:bg-[#002244]"
                        >
                            <Link href="/login">Masuk Portal</Link>
                        </Button>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-6xl px-6 py-12 lg:py-20">
                <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
                    {/* Left Sidebar: Student Info */}
                    <div className="space-y-8 lg:col-span-4">
                        <Card className="overflow-hidden rounded-[2.5rem] border-none bg-white shadow-[0_20px_50px_rgba(0,51,102,0.04)]">
                            <div className="h-24 bg-linear-to-br from-blue-600 to-indigo-700" />
                            <CardContent className="-mt-12 px-8 pb-10 text-center">
                                <Avatar className="mx-auto mb-6 size-32 rounded-2xl border-4 border-white shadow-xl">
                                    <AvatarImage
                                        src={student.avatar}
                                        className="bg-cover"
                                    />
                                    <AvatarFallback className="bg-blue-50 text-3xl font-bold text-blue-600">
                                        {initials}
                                    </AvatarFallback>
                                </Avatar>
                                <h1 className="mb-2 text-2xl font-black tracking-tight">
                                    {student.name}
                                </h1>
                                <div className="mb-8 flex flex-col gap-2">
                                    <Badge
                                        variant="secondary"
                                        className="mx-auto w-fit border-none bg-blue-50 px-3 py-1 text-[10px] font-black tracking-widest text-blue-600 uppercase"
                                    >
                                        Verified Student
                                    </Badge>
                                    <div className="flex items-center justify-center gap-2 text-xs font-bold tracking-widest text-muted-foreground uppercase">
                                        <BookOpen className="size-3.5" />{' '}
                                        {student.major || 'Umum'}
                                    </div>
                                </div>

                                <Separator className="mb-8 opacity-50" />

                                <div className="space-y-4 text-left">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[10px] font-black tracking-[0.2em] text-gray-400 uppercase">
                                            Identitas
                                        </span>
                                        <span className="flex items-center gap-2 text-sm font-bold">
                                            <Trophy className="size-4 text-orange-400" />{' '}
                                            NISN: {student.nisn}
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[10px] font-black tracking-[0.2em] text-gray-400 uppercase">
                                            Kelahiran
                                        </span>
                                        <span className="flex items-center gap-2 text-sm font-bold">
                                            <Calendar className="size-4 text-emerald-500" />
                                            {student.birth_place
                                                ? `${student.birth_place}, `
                                                : ''}
                                            {student.birth_date
                                                ? new Date(
                                                      student.birth_date,
                                                  ).toLocaleDateString(
                                                      'id-ID',
                                                      {
                                                          day: 'numeric',
                                                          month: 'long',
                                                          year: 'numeric',
                                                      },
                                                  )
                                                : '-'}
                                        </span>
                                    </div>
                                    {student.classroom && (
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[10px] font-black tracking-[0.2em] text-gray-400 uppercase">
                                                Kelas
                                            </span>
                                            <span className="flex items-center gap-2 text-sm font-bold">
                                                <School className="size-4 text-blue-600" />{' '}
                                                {student.classroom}
                                            </span>
                                        </div>
                                    )}
                                    {student.address && (
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[10px] font-black tracking-[0.2em] text-gray-400 uppercase">
                                                Domisili
                                            </span>
                                            <span className="flex items-center gap-2 text-sm font-bold">
                                                <MapPin className="size-4 text-rose-500" />{' '}
                                                {student.address}
                                            </span>
                                        </div>
                                    )}
                                    {student.phone && (
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[10px] font-black tracking-[0.2em] text-gray-400 uppercase">
                                                Kontak
                                            </span>
                                            <span className="flex items-center gap-2 text-sm font-bold">
                                                <Phone className="size-4 text-indigo-500" />{' '}
                                                {student.phone}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-10 flex items-center justify-center gap-3">
                                    {student.instagram && (
                                        <a
                                            href={student.instagram}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex size-10 items-center justify-center rounded-2xl bg-gray-50 text-muted-foreground transition-all hover:bg-pink-50 hover:text-pink-600"
                                        >
                                            <Instagram className="size-5" />
                                        </a>
                                    )}
                                    {student.facebook && (
                                        <a
                                            href={student.facebook}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex size-10 items-center justify-center rounded-2xl bg-gray-50 text-muted-foreground transition-all hover:bg-blue-50 hover:text-blue-600"
                                        >
                                            <Facebook className="size-5" />
                                        </a>
                                    )}
                                    {student.linkedin && (
                                        <a
                                            href={student.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex size-10 items-center justify-center rounded-2xl bg-gray-50 text-muted-foreground transition-all hover:bg-blue-50 hover:text-blue-700"
                                        >
                                            <Linkedin className="size-5" />
                                        </a>
                                    )}
                                    {student.tiktok && (
                                        <a
                                            href={student.tiktok}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex size-10 items-center justify-center rounded-2xl bg-gray-50 text-muted-foreground transition-all hover:bg-gray-100 hover:text-black"
                                        >
                                            <MessageCircle className="size-5" />
                                        </a>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Skills Card */}
                        {student.skills.length > 0 && (
                            <Card className="rounded-[2.5rem] border-none bg-white p-8 shadow-[0_20px_50px_rgba(0,51,102,0.04)]">
                                <h3 className="mb-6 flex items-center gap-2 text-sm font-black tracking-widest uppercase">
                                    <Star className="size-4 text-yellow-500" />{' '}
                                    Technical Skills
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {student.skills.map((skill) => (
                                        <Badge
                                            key={skill}
                                            variant="outline"
                                            className="rounded-xl border-gray-100 bg-gray-50/50 px-3 py-1 text-xs font-bold tracking-wider text-muted-foreground uppercase"
                                        >
                                            {skill}
                                        </Badge>
                                    ))}
                                </div>
                            </Card>
                        )}

                        {/* Achievements Card */}
                        {student.achievements.length > 0 && (
                            <Card className="rounded-[2.5rem] border-none bg-white p-8 shadow-[0_20px_50px_rgba(0,51,102,0.04)]">
                                <h3 className="mb-6 flex items-center gap-2 text-sm font-black tracking-widest uppercase">
                                    <Trophy className="size-4 text-orange-400" />{' '}
                                    Achievements
                                </h3>
                                <div className="space-y-4">
                                    {student.achievements.map((achievement) => (
                                        <div
                                            key={achievement}
                                            className="flex gap-3"
                                        >
                                            <div className="mt-1.5 size-2 shrink-0 rounded-full bg-orange-400" />
                                            <p className="text-sm leading-relaxed font-bold text-muted-foreground">
                                                {achievement}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        )}
                    </div>

                    {/* Right Side: Bio & Karya Feed */}
                    <div className="space-y-12 lg:col-span-8">
                        {/* Bio Section */}
                        <section>
                            <div className="mb-6 inline-flex items-center gap-2 text-[10px] font-black tracking-[0.2em] text-blue-600 uppercase">
                                <Quote className="size-3" /> Professional Bio
                            </div>
                            <div className="rounded-[3rem] border border-gray-50 bg-white p-10 shadow-[0_20px_50px_rgba(0,51,102,0.04)]">
                                <p className="text-xl leading-relaxed font-medium text-muted-foreground italic">
                                    {student.bio ||
                                        `Halo! Saya adalah siswa yang antusias dalam belajar hal-hal baru dan ingin berbagi inspirasi melalui karya-karya saya di platform Ruang Karya. Berfokus pada kompetensi ${student.major || ''} untuk membangun masa depan yang lebih baik.`}
                                </p>
                            </div>
                        </section>

                        {/* Interests Section */}
                        {student.interests.length > 0 && (
                            <section>
                                <div className="mb-6 inline-flex items-center gap-2 text-[10px] font-black tracking-[0.2em] text-blue-600 uppercase">
                                    <Heart className="size-3" /> Area of
                                    Interest
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    {student.interests.map((interest) => (
                                        <div
                                            key={interest}
                                            className="rounded-full bg-blue-50 px-6 py-3 text-sm font-black tracking-widest text-blue-600 uppercase"
                                        >
                                            {interest}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        <Separator className="opacity-50" />

                        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                            <div>
                                <div className="mb-2 inline-flex items-center gap-2 text-[10px] font-black tracking-[0.2em] text-blue-600 uppercase">
                                    <Grid className="size-3" /> Creative
                                    Portfolio
                                </div>
                                <h2 className="text-4xl font-black tracking-tight">
                                    Koleksi Karya
                                </h2>
                            </div>
                            <div className="text-right">
                                <span className="text-3xl font-black text-[#003366]">
                                    {karyas.length}
                                </span>
                                <span className="ml-2 text-[10px] font-black tracking-widest text-gray-400 uppercase">
                                    Total Project
                                </span>
                            </div>
                        </div>

                        {karyas.length === 0 ? (
                            <div className="flex flex-col items-center justify-center rounded-[3rem] border-2 border-dashed border-gray-100 bg-gray-50/50 py-32 text-center">
                                <Sparkles className="mb-6 size-16 text-blue-200" />
                                <h3 className="mb-2 text-xl font-bold text-gray-400 italic">
                                    Belum ada karya yang dipublikasikan.
                                </h3>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                                {karyas.map((karya) => (
                                    <Card
                                        key={karya.id}
                                        className="group overflow-hidden rounded-[2.5rem] border-none bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(0,51,102,0.08)]"
                                    >
                                        <div className="relative aspect-16/10 overflow-hidden bg-gray-50">
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
                                                    <span className="mt-2 text-6xl font-black text-blue-100">
                                                        {karya.title[0]}
                                                    </span>
                                                </div>
                                            )}

                                            <div className="absolute top-4 left-4">
                                                <div className="flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-[10px] font-black tracking-widest text-blue-600 uppercase shadow-sm backdrop-blur-md">
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
                                        </div>
                                        <CardContent className="p-8">
                                            <h3 className="mb-3 line-clamp-1 text-xl leading-tight font-black transition-colors group-hover:text-blue-600">
                                                {karya.title}
                                            </h3>
                                            <p className="mb-8 line-clamp-2 text-sm leading-relaxed font-medium text-muted-foreground">
                                                {karya.description ||
                                                    'Sebuah perwujudan ide kreatif yang diekspresikan dengan penuh dedikasi.'}
                                            </p>
                                            <div className="flex items-center justify-between border-t border-gray-50 pt-6">
                                                <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                                                    <Calendar className="size-3.5" />
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
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <LikeButton
                                                        karyaId={karya.id}
                                                        likesCount={
                                                            karya.likes_count
                                                        }
                                                        isLiked={karya.is_liked}
                                                        only={['karyas']}
                                                        className="h-8 px-3 text-[10px] font-bold"
                                                    />
                                                    <div className="flex items-center gap-1 text-[10px] font-black tracking-widest text-blue-600 uppercase">
                                                        Detail{' '}
                                                        <ChevronRight className="size-3" />
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <footer className="mt-20 border-t border-gray-100 bg-white py-12">
                <div className="mx-auto max-w-7xl px-6 text-center">
                    <p className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase">
                        © 2026 {student.name} • Didukung oleh Ruang Karya
                        Platform
                    </p>
                </div>
            </footer>
        </div>
    );
}
