import { Head, Link } from '@inertiajs/react';
import {
    Calendar,
    Edit,
    ExternalLink,
    Grid,
    Info,
    MapPin,
    MessageSquare,
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
    CheckCircle2
} from 'lucide-react';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
    };
};

export default function StudentHome({ karyaCount, recentKarya, student }: StudentHomeProps) {
    const [activeTab, setActiveTab] = useState<'karya' | 'about'>('karya');
    const [copied, setCopied] = useState(false);

    const publicUrl = `${window.location.origin}/p/${student.nisn}`;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(publicUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
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
        pending: <Badge variant="secondary" className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-none text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 flex items-center gap-1"><Clock className="size-3" /> Pending</Badge>,
        reviewed: <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 flex items-center gap-1"><CheckCircle2 className="size-3" /> Reviewed</Badge>,
    };

    return (
        <StudentLayout>
            <Head title={`Profil ${student.name}`} />

            <div className="mx-auto max-w-5xl">
                {/* Profile Header */}
                <div className="relative overflow-hidden bg-white dark:bg-[#0a0a0a] rounded-b-3xl shadow-sm border-x border-b border-gray-100 dark:border-white/5">
                    {/* Cover Photo */}
                    <div className="h-2 w-full bg-linear-to-r from-blue-600 via-indigo-500 to-purple-600 relative">
                        <div className="absolute inset-0 bg-black/10" />
                        {/* Share Button */}
                        <div className="absolute top-4 right-4 flex gap-2 z-20">
                            <a href={publicUrl} target="_blank" rel="noopener noreferrer" className='px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 transition-all flex items-center gap-1'>
                                <Share2 className="mr-2 size-4" /> Share
                            </a>
                        </div>
                    </div>

                    {/* Profile Info Section */}
                    <div className="px-6 pb-6">
                        <div className="relative flex flex-col md:flex-row md:items-end justify-between mt-3 gap-6">
                            <div className="flex flex-col md:flex-row items-start md:items-end gap-4">
                                <div className="relative group">
                                    <Avatar className="size-24 md:size-32 border-4 border-white dark:border-[#0a0a0a] shadow-xl rounded-2xl transition-transform group-hover:scale-105 duration-300">
                                        <AvatarImage src={student.avatar} className="bg-cover" />
                                        <AvatarFallback className="text-2xl font-bold bg-blue-50 text-blue-600">{initials}</AvatarFallback>
                                    </Avatar>
                                    <div className="absolute bottom-2 right-2 size-6 rounded-full bg-green-500 border-2 border-white dark:border-[#0a0a0a] ring-4 ring-green-500/20 animate-pulse" title="Online" />
                                </div>
                                <div className="mb-2">
                                    <div className="flex items-center gap-2">
                                        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{student.name}</h1>
                                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-blue-600 shadow-sm" title="Verified Scholar">
                                            <Sparkles className="size-3 fill-current" />
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-muted-foreground font-medium">
                                        {student.nisn && (
                                            <span className="flex items-center gap-1.5">
                                                <Trophy className="size-3.5 text-orange-400" /> NISN: {student.nisn}
                                            </span>
                                        )}
                                        {student.address && (
                                            <span className="flex items-center gap-1.5 text-blue-600">
                                                <MapPin className="size-3.5" /> {student.address}
                                            </span>
                                        )}
                                        {student.birth_date && (
                                            <span className="flex items-center gap-1.5">
                                                <Calendar className="size-3.5" /> Lahir: {new Date(student.birth_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                            </span>
                                        )}
                                    </div>
                                    
                                </div>
                            </div>

                            <div className="flex gap-2 mb-2">
                                <Button asChild variant="outline" className="rounded-xl border-gray-200 h-11 px-5">
                                    <Link href="/siswa/profile">
                                        <Edit className="mr-2 size-4" /> Edit Profil
                                    </Link>
                                </Button>
                                <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-11 px-5 shadow-lg shadow-blue-500/20">
                                    <Link href="/siswa/karya/create">
                                        <Plus className="mr-2 size-4" /> Posting Karya
                                    </Link>
                                </Button>
                                <Button variant="ghost" size="icon" className="rounded-xl border border-gray-100 size-11">
                                    <MoreHorizontal className="size-5 text-gray-400" />
                                </Button>
                            </div>
                        </div>

                        {/* Stats Bar */}
                        <div className="mt-8 flex gap-8 border-t border-gray-100 dark:border-white/5 pt-6 px-2">
                            <div className="flex flex-col">
                                <span className="text-xl font-bold">{karyaCount}</span>
                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Karya</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xl font-bold">{recentKarya.filter(k => k.status === 'reviewed').length}</span>
                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Reviewed</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xl font-bold">{recentKarya.filter(k => k.media_type === 'link').length}</span>
                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Links</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="px-6 py-8">
                    <div className="flex items-center justify-between mb-8 border-b border-gray-100 dark:border-white/5">
                        <div className="flex gap-8">
                            <button
                                onClick={() => setActiveTab('karya')}
                                className={cn(
                                    "pb-4 flex items-center gap-2 font-bold text-xs uppercase tracking-[0.2em] transition-all relative",
                                    activeTab === 'karya' ? "text-blue-600" : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                <Grid className="size-4" /> Feed Karya
                                {activeTab === 'karya' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />}
                            </button>
                            <button
                                onClick={() => setActiveTab('about')}
                                className={cn(
                                    "pb-4 flex items-center gap-2 font-bold text-xs uppercase tracking-[0.2em] transition-all relative",
                                    activeTab === 'about' ? "text-blue-600" : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                <Info className="size-4" /> Tentang Saya
                                {activeTab === 'about' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />}
                            </button>
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {activeTab === 'karya' ? (
                            recentKarya.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {recentKarya.map((karya) => (
                                        <Card key={karya.id} className="group overflow-hidden border-none shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-500 bg-white dark:bg-[#161615] rounded-3xl">
                                            <div className="aspect-4/3 bg-gray-50 dark:bg-[#222] relative overflow-hidden">
                                                {karya.media_type === 'image' && karya.media_path ? (
                                                    <img src={karya.media_path} className="size-full object-cover group-hover:scale-110 transition-transform duration-700" alt={karya.title} />
                                                ) : (
                                                    <div className="size-full flex flex-col items-center justify-center group-hover:scale-110 transition-transform duration-700 select-none">
                                                        {mediaIcons[karya.media_type as keyof typeof mediaIcons] || mediaIcons.link}
                                                        <span className="text-blue-200 dark:text-blue-900 font-black text-5xl mt-2">{karya.title[0]}</span>
                                                    </div>
                                                )}

                                                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-5">
                                                    <div className="flex items-center gap-4 text-white text-xs font-bold uppercase tracking-wider">
                                                        <span className="flex items-center gap-1.5"><MessageSquare className="size-4" /> 12</span>
                                                        <span className="flex items-center gap-1.5"><Share2 className="size-4" /> 5</span>
                                                    </div>
                                                </div>

                                                <div className="absolute top-4 left-4">
                                                    <div className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest text-blue-600 shadow-sm flex items-center gap-1.5">
                                                        {karya.media_type === 'link' ? <LinkIcon className="size-3" /> : (karya.media_type === 'video' ? <Video className="size-3" /> : (karya.media_type === 'document' ? <FileText className="size-3" /> : <ImageIcon className="size-3" />))}
                                                        {karya.media_type}
                                                    </div>
                                                </div>
                                                <div className="absolute top-4 right-4">
                                                    {statusBadges[karya.status as keyof typeof statusBadges]}
                                                </div>
                                            </div>
                                            <CardContent className="p-6">
                                                <h3 className="font-bold text-lg leading-tight mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">{karya.title}</h3>
                                                <p className="text-sm text-muted-foreground line-clamp-2 mb-6 leading-relaxed">
                                                    {karya.description || "Inspirasi baru yang dituangkan dalam sebuah karya kreatif yang bermakna."}
                                                </p>
                                                <div className="flex items-center justify-between pt-5 border-t border-gray-50 dark:border-white/5">
                                                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                                                        {new Date(karya.created_at).toLocaleDateString('id-ID', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                    </span>
                                                    <Link href={`/siswa/karya/${karya.id}/edit`} className="text-xs font-bold text-blue-600 hover:text-blue-700 uppercase tracking-widest flex items-center gap-1 group/link">
                                                        Manage <Edit className="size-3 transition-transform group-hover/link:scale-110" />
                                                    </Link>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-24 text-center bg-gray-50/50 dark:bg-white/5 rounded-[3rem] border-2 border-dashed border-gray-100 dark:border-white/10">
                                    <div className="size-24 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-8 relative">
                                        <Sparkles className="size-12 text-blue-600" />
                                        <div className="absolute -top-2 -right-2 size-8 rounded-full bg-purple-100 flex items-center justify-center animate-bounce">
                                            <Plus className="size-4 text-purple-600" />
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-bold mb-3">Mulai petualanganmu!</h3>
                                    <p className="text-muted-foreground max-w-sm mb-10 leading-relaxed font-medium">
                                        Ruang ini masih kosong. Ayo buat karya pertamamu dan tunjukkan kepada dunia bakat luar biasanmu!
                                    </p>
                                    <Button asChild className="bg-[#1b1b18] hover:bg-black text-white rounded-2xl h-14 px-10 shadow-xl shadow-black/10 transition-all hover:scale-105 active:scale-95">
                                        <Link href="/siswa/karya/create">
                                            <Plus className="mr-2 size-5" /> Buat Karya Pertama
                                        </Link>
                                    </Button>
                                </div>
                            )
                        ) : (
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                <div className="lg:col-span-2 space-y-8">
                                    <section className="p-8 bg-white dark:bg-[#161615] rounded-4xl shadow-sm border border-gray-100 dark:border-white/5">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="size-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                                                <User className="size-5" />
                                            </div>
                                            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">Biodata Diri</h3>
                                        </div>
                                        <p className="text-muted-foreground leading-relaxed text-lg italic">
                                            "{student.address || "Halo! Saya adalah siswa yang antusias dalam belajar hal-hal baru dan ingin berbagi inspirasi melalui karya-karya saya di platform Ruang Karya."}"
                                        </p>
                                    </section>

                                    <section className="p-8 bg-linear-to-br from-blue-600 to-indigo-700 rounded-4xl shadow-xl text-white">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="size-10 rounded-2xl bg-white/20 text-white flex items-center justify-center backdrop-blur-md">
                                                <Trophy className="size-5" />
                                            </div>
                                            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-blue-100">Visi & Semangat</h3>
                                        </div>
                                        <p className="text-xl font-bold leading-relaxed mb-4">
                                            "Terus bereksperimen, belajar dari kegagalan, dan pantang menyerah sebelum menjadi versi terbaik diri sendiri."
                                        </p>
                                        <div className="h-1 w-20 bg-white/30 rounded-full" />
                                    </section>
                                </div>

                                <div className="space-y-8">
                                    <section className="p-8 bg-white dark:bg-[#161615] rounded-4xl shadow-sm border border-gray-100 dark:border-white/5">
                                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-6">Connect With Me</h3>
                                        <div className="space-y-4">
                                            {student.social_link ? (
                                                <a
                                                    href={student.social_link}
                                                    target="_blank"
                                                    className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 dark:bg-white/5 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all group"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className="size-8 rounded-full bg-white dark:bg-black flex items-center justify-center shadow-sm">
                                                            <ExternalLink className="size-4 text-blue-600" />
                                                        </div>
                                                        <span className="text-sm font-bold">Website / Social</span>
                                                    </div>
                                                    <Share2 className="size-4 text-gray-300 group-hover:text-blue-600" />
                                                </a>
                                            ) : (
                                                <div className="text-center py-4">
                                                    <p className="text-sm text-muted-foreground italic mb-4">Belum ada tautan sosial.</p>
                                                    <Button asChild variant="link" size="sm" className="text-blue-600">
                                                        <Link href="/siswa/profile">Tambah Sekarang</Link>
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    </section>

                                    <section className="p-8 bg-white dark:bg-[#161615] rounded-4xl shadow-sm border border-gray-100 dark:border-white/5">
                                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-6">Informasi Akun</h3>
                                        <div className="space-y-6">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Email Terverifikasi</span>
                                                <span className="text-sm font-bold truncate">{student.email}</span>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Status Keanggotaan</span>
                                                <div className="flex items-center gap-2">
                                                    <div className="size-2 rounded-full bg-green-500 ring-4 ring-green-500/20" />
                                                    <span className="text-sm font-bold">Siswa Aktif</span>
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

function User(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </svg>
    );
}
