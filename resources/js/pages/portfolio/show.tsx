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
    ChevronRight
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white shadow-lg shadow-blue-500/20 transition-transform group-hover:scale-110">
                            <School className="size-4" />
                        </div>
                        <span className="text-sm font-black uppercase tracking-tight text-[#003366]">Ruang Karya</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <Button asChild variant="ghost" size="sm" className="rounded-xl font-bold uppercase tracking-widest text-[10px] hidden md:flex">
                            <Link href="/daftar-siswa">Jelajahi Siswa Lain</Link>
                        </Button>
                        <Button asChild size="sm" className="rounded-xl bg-[#003366] text-white hover:bg-[#002244] font-bold uppercase tracking-widest text-[10px] h-9">
                            <Link href="/login">Masuk Portal</Link>
                        </Button>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-6xl px-6 py-12 lg:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    
                    {/* Left Sidebar: Student Info */}
                    <div className="lg:col-span-4 space-y-8">
                        <Card className="border-none shadow-[0_20px_50px_rgba(0,51,102,0.04)] bg-white rounded-[2.5rem] overflow-hidden">
                            <div className="h-24 bg-linear-to-br from-blue-600 to-indigo-700" />
                            <CardContent className="px-8 pb-10 -mt-12 text-center">
                                <Avatar className="size-32 border-4 border-white shadow-xl rounded-2xl mx-auto mb-6">
                                    <AvatarImage src={student.avatar} className="bg-cover" />
                                    <AvatarFallback className="text-3xl font-bold bg-blue-50 text-blue-600">{initials}</AvatarFallback>
                                </Avatar>
                                <h1 className="text-2xl font-black tracking-tight mb-2">{student.name}</h1>
                                <div className="flex flex-col gap-2 mb-8">
                                    <Badge variant="secondary" className="w-fit mx-auto bg-blue-50 text-blue-600 border-none text-[10px] font-black uppercase tracking-widest px-3 py-1">
                                        Verified Student
                                    </Badge>
                                    <div className="flex items-center justify-center gap-2 text-muted-foreground text-xs font-bold uppercase tracking-widest">
                                        <BookOpen className="size-3.5" /> {student.major || 'Umum'}
                                    </div>
                                </div>

                                <Separator className="mb-8 opacity-50" />

                                <div className="space-y-4 text-left">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Identitas</span>
                                        <span className="text-sm font-bold flex items-center gap-2"><Trophy className="size-4 text-orange-400" /> NISN: {student.nisn}</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Kelahiran</span>
                                        <span className="text-sm font-bold flex items-center gap-2">
                                            <Calendar className="size-4 text-emerald-500" /> 
                                            {student.birth_place ? `${student.birth_place}, ` : ''} 
                                            {student.birth_date ? new Date(student.birth_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '-'}
                                        </span>
                                    </div>
                                    {student.classroom && (
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Kelas</span>
                                            <span className="text-sm font-bold flex items-center gap-2"><School className="size-4 text-blue-600" /> {student.classroom}</span>
                                        </div>
                                    )}
                                    {student.address && (
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Domisili</span>
                                            <span className="text-sm font-bold flex items-center gap-2"><MapPin className="size-4 text-rose-500" /> {student.address}</span>
                                        </div>
                                    )}
                                    {student.phone && (
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Kontak</span>
                                            <span className="text-sm font-bold flex items-center gap-2"><Phone className="size-4 text-indigo-500" /> {student.phone}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center justify-center gap-3 mt-10">
                                    {student.instagram && (
                                        <a href={student.instagram} target="_blank" className="size-10 rounded-2xl bg-gray-50 flex items-center justify-center text-muted-foreground hover:text-pink-600 hover:bg-pink-50 transition-all">
                                            <Instagram className="size-5" />
                                        </a>
                                    )}
                                    {student.facebook && (
                                        <a href={student.facebook} target="_blank" className="size-10 rounded-2xl bg-gray-50 flex items-center justify-center text-muted-foreground hover:text-blue-600 hover:bg-blue-50 transition-all">
                                            <Facebook className="size-5" />
                                        </a>
                                    )}
                                    {student.linkedin && (
                                        <a href={student.linkedin} target="_blank" className="size-10 rounded-2xl bg-gray-50 flex items-center justify-center text-muted-foreground hover:text-blue-700 hover:bg-blue-50 transition-all">
                                            <Linkedin className="size-5" />
                                        </a>
                                    )}
                                    {student.tiktok && (
                                        <a href={student.tiktok} target="_blank" className="size-10 rounded-2xl bg-gray-50 flex items-center justify-center text-muted-foreground hover:text-black hover:bg-gray-100 transition-all">
                                            <MessageCircle className="size-5" />
                                        </a>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Skills Card */}
                        {student.skills.length > 0 && (
                            <Card className="border-none shadow-[0_20px_50px_rgba(0,51,102,0.04)] bg-white rounded-[2.5rem] p-8">
                                <h3 className="text-sm font-black uppercase tracking-widest mb-6 flex items-center gap-2">
                                    <Star className="size-4 text-yellow-500" /> Technical Skills
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {student.skills.map((skill, i) => (
                                        <Badge key={i} variant="outline" className="bg-gray-50/50 border-gray-100 text-xs py-1 px-3 rounded-xl font-bold text-muted-foreground uppercase tracking-wider">
                                            {skill}
                                        </Badge>
                                    ))}
                                </div>
                            </Card>
                        )}

                        {/* Achievements Card */}
                        {student.achievements.length > 0 && (
                            <Card className="border-none shadow-[0_20px_50px_rgba(0,51,102,0.04)] bg-white rounded-[2.5rem] p-8">
                                <h3 className="text-sm font-black uppercase tracking-widest mb-6 flex items-center gap-2">
                                    <Trophy className="size-4 text-orange-400" /> Achievements
                                </h3>
                                <div className="space-y-4">
                                    {student.achievements.map((achievement, i) => (
                                        <div key={i} className="flex gap-3">
                                            <div className="size-2 rounded-full bg-orange-400 mt-1.5 shrink-0" />
                                            <p className="text-sm font-bold text-muted-foreground leading-relaxed">{achievement}</p>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        )}
                    </div>

                    {/* Right Side: Bio & Karya Feed */}
                    <div className="lg:col-span-8 space-y-12">
                        {/* Bio Section */}
                        <section>
                            <div className="mb-6 inline-flex items-center gap-2 text-[10px] font-black tracking-[0.2em] text-blue-600 uppercase">
                                <Quote className="size-3" /> Professional Bio
                            </div>
                            <div className="p-10 bg-white shadow-[0_20px_50px_rgba(0,51,102,0.04)] rounded-[3rem] border border-gray-50">
                                <p className="text-xl font-medium leading-relaxed italic text-muted-foreground">
                                    {student.bio || `Halo! Saya adalah siswa yang antusias dalam belajar hal-hal baru dan ingin berbagi inspirasi melalui karya-karya saya di platform Ruang Karya. Berfokus pada kompetensi ${student.major || ''} untuk membangun masa depan yang lebih baik.`}
                                </p>
                            </div>
                        </section>

                        {/* Interests Section */}
                        {student.interests.length > 0 && (
                            <section>
                                <div className="mb-6 inline-flex items-center gap-2 text-[10px] font-black tracking-[0.2em] text-blue-600 uppercase">
                                    <Heart className="size-3" /> Area of Interest
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    {student.interests.map((interest, i) => (
                                        <div key={i} className="px-6 py-3 bg-blue-50 text-blue-600 rounded-full text-sm font-black uppercase tracking-widest">
                                            {interest}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        <Separator className="opacity-50" />

                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div>
                                <div className="mb-2 inline-flex items-center gap-2 text-[10px] font-black tracking-[0.2em] text-blue-600 uppercase">
                                    <Grid className="size-3" /> Creative Portfolio
                                </div>
                                <h2 className="text-4xl font-black tracking-tight">Koleksi Karya</h2>
                            </div>
                            <div className="text-right">
                                <span className="text-3xl font-black text-[#003366]">{karyas.length}</span>
                                <span className="ml-2 text-[10px] font-black uppercase tracking-widest text-gray-400">Total Project</span>
                            </div>
                        </div>

                        {karyas.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-32 text-center bg-gray-50/50 rounded-[3rem] border-2 border-dashed border-gray-100">
                                <Sparkles className="size-16 text-blue-200 mb-6" />
                                <h3 className="text-xl font-bold mb-2 text-gray-400 italic">Belum ada karya yang dipublikasikan.</h3>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {karyas.map((karya) => (
                                    <Card key={karya.id} className="group overflow-hidden border-none shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_60px_rgba(0,51,102,0.08)] hover:-translate-y-2 transition-all duration-500 bg-white rounded-[2.5rem]">
                                        <div className="aspect-16/10 bg-gray-50 relative overflow-hidden">
                                            {karya.media_type === 'image' && karya.media_path ? (
                                                <img src={karya.media_path} className="size-full object-cover group-hover:scale-110 transition-transform duration-700" alt={karya.title} />
                                            ) : (
                                                <div className="size-full flex flex-col items-center justify-center group-hover:scale-110 transition-transform duration-700 select-none">
                                                    {mediaIcons[karya.media_type as keyof typeof mediaIcons] || mediaIcons.link}
                                                    <span className="text-blue-100 font-black text-6xl mt-2">{karya.title[0]}</span>
                                                </div>
                                            )}
                                            
                                            <div className="absolute top-4 left-4">
                                                <div className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-black uppercase tracking-widest text-blue-600 shadow-sm flex items-center gap-1.5">
                                                    {karya.media_type === 'link' ? <LinkIcon className="size-3" /> : (karya.media_type === 'video' ? <Video className="size-3" /> : (karya.media_type === 'document' ? <FileText className="size-3" /> : <ImageIcon className="size-3" />))}
                                                    {karya.media_type}
                                                </div>
                                            </div>
                                        </div>
                                        <CardContent className="p-8">
                                            <h3 className="font-black text-xl leading-tight mb-3 group-hover:text-blue-600 transition-colors line-clamp-1">{karya.title}</h3>
                                            <p className="text-sm text-muted-foreground line-clamp-2 mb-8 leading-relaxed font-medium">
                                                {karya.description || "Sebuah perwujudan ide kreatif yang diekspresikan dengan penuh dedikasi."}
                                            </p>
                                            <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                                                <div className="flex items-center gap-2 text-muted-foreground text-[10px] font-bold uppercase tracking-widest">
                                                    <Calendar className="size-3.5" />
                                                    {new Date(karya.created_at).toLocaleDateString('id-ID', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                </div>
                                                <div className="flex items-center gap-1 text-blue-600 text-[10px] font-black uppercase tracking-widest">
                                                    Detail <ChevronRight className="size-3" />
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

            <footer className="border-t border-gray-100 py-12 bg-white mt-20">
                <div className="mx-auto max-w-7xl px-6 text-center">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                        © 2026 {student.name} • Didukung oleh Ruang Karya Platform
                    </p>
                </div>
            </footer>
        </div>
    );
}
