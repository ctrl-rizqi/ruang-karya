import { Head } from '@inertiajs/react';
import {
    Calendar,
    ExternalLink,
    Grid,
    MapPin,
    MessageSquare,
    Share2,
    Sparkles,
    Trophy,
    UserPlus,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import StudentLayout from '@/layouts/student-layout';

type KaryaItem = {
    id: number;
    title: string;
    description: string | null;
    content: string;
    created_at: string | null;
};

type StudentProfileShowProps = {
    student: {
        id: number;
        nisn: string | null;
        name: string;
        gender: 'L' | 'P' | null;
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
    };
    karyas: KaryaItem[];
};

export default function StudentProfileShow({
    student,
    karyas,
}: StudentProfileShowProps) {
    const initials = student.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase();

    const socialLinks = [
        { label: 'Instagram', url: student.instagram },
        { label: 'Facebook', url: student.facebook },
        { label: 'TikTok', url: student.tiktok },
        { label: 'LinkedIn', url: student.linkedin },
    ].filter((item): item is { label: string; url: string } =>
        Boolean(item.url),
    );

    return (
        <StudentLayout>
            <Head title={`Profil ${student.name} - Ruang Karya`} />

            <div className="mx-auto max-w-5xl">
                {/* Profile Header (Similar to home but slightly different actions) */}
                <div className="relative overflow-hidden rounded-b-[3rem] border-x border-b border-gray-100 bg-white shadow-sm dark:border-white/5 dark:bg-[#0a0a0a]">
                    {/* Cover Photo */}
                    <div className="relative h-64 w-full bg-linear-to-br from-indigo-600 via-blue-600 to-emerald-500">
                        <div className="absolute inset-0 bg-black/10" />
                    </div>

                    {/* Profile Info Section */}
                    <div className="px-8 pb-10">
                        <div className="relative -mt-20 flex flex-col justify-between gap-8 md:-mt-24 md:flex-row md:items-end">
                            <div className="flex flex-col items-start gap-6 md:flex-row md:items-end">
                                <div className="group relative">
                                    <Avatar className="size-32 rounded-[2.5rem] border-8 border-white shadow-2xl md:size-40 dark:border-[#0a0a0a]">
                                        <AvatarImage
                                            src={`https://i.pravatar.cc/150?u=${student.name}`}
                                        />
                                        <AvatarFallback className="bg-blue-50 text-4xl font-bold text-blue-600">
                                            {initials}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div
                                        className="absolute right-3 bottom-3 size-8 rounded-full border-4 border-white bg-green-500 dark:border-[#0a0a0a]"
                                        title="Online"
                                    />
                                </div>
                                <div className="mb-2">
                                    <div className="flex items-center gap-3">
                                        <h1 className="text-3xl font-black tracking-tight md:text-4xl">
                                            {student.name}
                                        </h1>
                                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-600 shadow-sm">
                                            <Sparkles className="size-3.5 fill-current" />
                                        </div>
                                    </div>
                                    <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm font-bold tracking-widest text-muted-foreground uppercase">
                                        <span className="flex items-center gap-2">
                                            <Trophy className="size-4 text-orange-400" />{' '}
                                            NISN: {student.nisn ?? '-'}
                                        </span>
                                        <span className="flex items-center gap-2 text-blue-600">
                                            <MapPin className="size-4" />{' '}
                                            {student.address || 'Edinburgh, UK'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-2 flex gap-3">
                                <Button className="h-12 gap-2 rounded-2xl bg-blue-600 px-8 text-xs font-bold tracking-widest text-white uppercase shadow-xl shadow-blue-500/20 transition-all hover:scale-105 hover:bg-blue-700 active:scale-95">
                                    <UserPlus className="size-4" /> Ikuti
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="size-12 rounded-2xl border-gray-100 hover:bg-gray-50 dark:border-white/5 dark:hover:bg-white/5"
                                >
                                    <MessageSquare className="size-5 text-gray-400" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="size-12 rounded-2xl border-gray-100 hover:bg-gray-50 dark:border-white/5 dark:hover:bg-white/5"
                                >
                                    <Share2 className="size-5 text-gray-400" />
                                </Button>
                            </div>
                        </div>

                        {/* Stats Bar */}
                        <div className="mt-12 flex gap-12 border-t border-gray-100 px-2 pt-8 dark:border-white/5">
                            <div className="flex flex-col">
                                <span className="text-2xl font-black">
                                    {karyas.length}
                                </span>
                                <span className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase">
                                    Karya
                                </span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-2xl font-black">
                                    2.4k
                                </span>
                                <span className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase">
                                    Views
                                </span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-2xl font-black">842</span>
                                <span className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase">
                                    Appreciation
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="px-8 py-12">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
                        {/* Sidebar info */}
                        <div className="space-y-8 lg:col-span-4">
                            <section className="rounded-[2.5rem] border border-gray-100 bg-white p-8 shadow-sm dark:border-white/5 dark:bg-[#161615]">
                                <h3 className="mb-6 flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-blue-600 uppercase">
                                    <Calendar className="size-4" /> Info
                                    Personal
                                </h3>
                                <div className="space-y-6">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                                            Tanggal Lahir
                                        </span>
                                        <span className="text-sm font-bold">
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
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                                            Alamat
                                        </span>
                                        <span className="text-sm leading-relaxed font-bold">
                                            {student.address || '-'}
                                        </span>
                                    </div>
                                    <div className="space-y-3 pt-4">
                                        {socialLinks.map((item) => (
                                            <a
                                                key={item.label}
                                                href={item.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group flex items-center justify-between rounded-2xl bg-blue-50 p-4 text-blue-600 transition-all hover:bg-blue-100 dark:bg-blue-900/20"
                                            >
                                                <span className="text-xs font-bold tracking-widest uppercase">
                                                    {item.label}
                                                </span>
                                                <ExternalLink className="size-4 transition-transform group-hover:scale-110" />
                                            </a>
                                        ))}
                                        {student.social_link && (
                                            <a
                                                href={student.social_link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group flex items-center justify-between rounded-2xl bg-blue-50 p-4 text-blue-600 transition-all hover:bg-blue-100 dark:bg-blue-900/20"
                                            >
                                                <span className="text-xs font-bold tracking-widest uppercase">
                                                    Website
                                                </span>
                                                <ExternalLink className="size-4 transition-transform group-hover:scale-110" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </section>

                            <div className="rounded-[2.5rem] bg-linear-to-br from-blue-600 to-indigo-700 p-8 text-white shadow-xl shadow-blue-500/20">
                                <h3 className="mb-4 flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-blue-100 uppercase">
                                    <Sparkles className="size-4" /> Achievement
                                </h3>
                                <p className="mb-6 text-lg leading-relaxed font-bold">
                                    "Menjadi bagian dari kurator seni digital
                                    sekolah sejak 2023."
                                </p>
                                <div className="flex gap-2">
                                    <Badge className="border-none bg-white/20 text-[8px] font-bold tracking-widest text-white uppercase">
                                        Top 10 contributor
                                    </Badge>
                                </div>
                            </div>
                        </div>

                        {/* Main Feed */}
                        <div className="lg:col-span-8">
                            <div className="mb-10 flex items-center gap-3">
                                <Grid className="size-5 text-blue-600" />
                                <h2 className="text-xl font-black tracking-widest uppercase">
                                    Karya Terkini
                                </h2>
                                <div className="ml-4 h-px flex-1 bg-gray-100 dark:bg-white/5" />
                            </div>

                            {karyas.length === 0 ? (
                                <div className="rounded-[3rem] border-2 border-dashed border-gray-100 bg-gray-50/50 py-20 text-center dark:border-white/10 dark:bg-white/5">
                                    <p className="font-medium text-muted-foreground italic">
                                        Siswa ini belum membagikan karya apapun.
                                    </p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                                    {karyas.map((karya) => (
                                        <Card
                                            key={karya.id}
                                            className="group overflow-hidden rounded-4xl border-none bg-white shadow-sm transition-all duration-500 hover:shadow-2xl dark:bg-[#161615]"
                                        >
                                            <div className="relative flex aspect-video items-center justify-center overflow-hidden bg-linear-to-br from-gray-50 to-blue-50 dark:from-white/5 dark:to-blue-900/10">
                                                <span className="text-4xl font-black text-blue-100 transition-transform duration-700 select-none group-hover:scale-110 dark:text-blue-900">
                                                    {karya.title[0]}
                                                </span>
                                                <div className="absolute top-4 right-4">
                                                    <Badge className="border-none bg-white/90 px-3 py-1 text-[8px] font-bold tracking-widest text-blue-600 uppercase backdrop-blur-md">
                                                        Student Work
                                                    </Badge>
                                                </div>
                                            </div>
                                            <CardContent className="p-6">
                                                <h3 className="mb-3 line-clamp-1 text-lg leading-tight font-bold transition-colors group-hover:text-blue-600">
                                                    {karya.title}
                                                </h3>
                                                <p className="mb-6 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                                                    {karya.description ||
                                                        'Sebuah perwujudan ide kreatif yang diekspresikan dengan penuh dedikasi.'}
                                                </p>
                                                <div className="flex items-center justify-between border-t border-gray-50 pt-5 text-[10px] font-bold tracking-widest text-muted-foreground uppercase dark:border-white/5">
                                                    <span>
                                                        {karya.created_at
                                                            ? new Date(
                                                                  karya.created_at,
                                                              ).toLocaleDateString(
                                                                  'id-ID',
                                                              )
                                                            : '-'}
                                                    </span>
                                                    <div className="flex items-center gap-3">
                                                        <span className="flex items-center gap-1">
                                                            <MessageSquare className="size-3" />{' '}
                                                            8
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <Share2 className="size-3" />{' '}
                                                            2
                                                        </span>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </StudentLayout>
    );
}
