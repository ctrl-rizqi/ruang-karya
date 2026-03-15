import { Head, Link, useForm } from '@inertiajs/react';
import { 
    Search, 
    Users, 
    X, 
    ChevronRight, 
    GraduationCap, 
    BookOpen,
    MapPin,
    Sparkles,
    Instagram,
    Linkedin,
    MessageCircle
} from 'lucide-react';
import type { FormEvent } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import StudentLayout from '@/layouts/student-layout';
import { cn } from '@/lib/utils';

type StudentItem = {
    id: number;
    nisn: string | null;
    name: string;
    avatar: string;
    student_class: string | null;
    major: string | null;
    address: string | null;
    bio: string | null;
    skills: string[];
    socials: {
        instagram: string | null;
        facebook: string | null;
        tiktok: string | null;
        linkedin: string | null;
    };
};

type StudentDirectoryProps = {
    students: {
        data: StudentItem[];
        links: {
            url: string | null;
            label: string;
            active: boolean;
        }[];
    };
    filters: {
        name: string;
        nisn: string;
        classroom_id: string;
        major_id: string;
    };
    classrooms: { id: number; name: string }[];
    majors: { id: number; name: string }[];
};

export default function StudentDirectory({
    students,
    filters,
    classrooms,
    majors,
}: StudentDirectoryProps) {
    const filterForm = useForm({
        name: filters.name ?? '',
        nisn: filters.nisn ?? '',
        classroom_id: filters.classroom_id ?? '',
        major_id: filters.major_id ?? '',
    });

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        filterForm.get('/daftar-siswa', {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    const reset = () => {
        filterForm.setData({
            name: '',
            nisn: '',
            classroom_id: '',
            major_id: '',
        });

        filterForm.get('/daftar-siswa', {
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

    return (
        <StudentLayout>
            <Head title="Direktori Siswa - Ruang Karya" />

            <div className="mx-auto max-w-6xl px-6 py-12">
                {/* Header */}
                <div className="mb-12">
                    <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-[0.2em] mb-4">
                        <Users className="size-4" /> Student Community
                    </div>
                    <h1 className="text-4xl font-black tracking-tight mb-2">Direktori Siswa</h1>
                    <p className="text-muted-foreground text-lg font-medium">Jelajahi profil dan temukan inspirasi dari teman-temanmu.</p>
                </div>

                {/* Search & Filter Section */}
                <section className="bg-white dark:bg-[#161615] p-8 rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-xl shadow-blue-500/5 mb-12">
                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                            <div className="md:col-span-5 relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
                                <Input
                                    placeholder="Cari nama siswa..."
                                    className="h-14 pl-12 rounded-2xl bg-gray-50/50 border-transparent focus:bg-white transition-all text-base dark:bg-accent/50 dark:focus:bg-accent"
                                    value={filterForm.data.name}
                                    onChange={(e) => filterForm.setData('name', e.target.value)}
                                />
                            </div>
                            <div className="md:col-span-3 relative">
                                <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
                                <Input
                                    placeholder="NISN"
                                    className="h-14 pl-12 rounded-2xl bg-gray-50/50 border-transparent focus:bg-white transition-all dark:bg-accent/50 dark:focus:bg-accent"
                                    value={filterForm.data.nisn}
                                    onChange={(e) => filterForm.setData('nisn', e.target.value)}
                                />
                            </div>
                            <div className="md:col-span-2 relative">
                                <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground z-10" />
                                <select
                                    className="w-full h-14 pl-12 rounded-2xl bg-gray-50/50 border-transparent focus:bg-white transition-all text-sm outline-none appearance-none"
                                    value={filterForm.data.classroom_id}
                                    onChange={(e) => filterForm.setData('classroom_id', e.target.value)}
                                >
                                    <option value="">Semua Kelas</option>
                                    {classrooms.map((c) => (
                                        <option key={c.id} value={c.id}>{c.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="md:col-span-2">
                                <Button 
                                    type="submit" 
                                    className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02]"
                                >
                                    Filter
                                </Button>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-50 dark:border-white/5">
                            <div className="flex items-center gap-2">
                                <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground mr-2">Jurusan:</Label>
                                <select
                                    className="h-10 px-4 rounded-xl bg-gray-50/50 border-transparent focus:bg-white text-xs outline-none"
                                    value={filterForm.data.major_id}
                                    onChange={(e) => filterForm.setData('major_id', e.target.value)}
                                >
                                    <option value="">Semua Jurusan</option>
                                    {majors.map((m) => (
                                        <option key={m.id} value={m.id}>{m.name}</option>
                                    ))}
                                </select>
                            </div>
                            <button 
                                type="button" 
                                onClick={reset}
                                className="text-xs font-bold uppercase tracking-widest text-rose-500 hover:text-rose-600 transition-colors flex items-center gap-2"
                            >
                                <X className="size-4" /> Reset Filter
                            </button>
                        </div>
                    </form>
                </section>

                {/* Results Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {students.data.length === 0 ? (
                        <div className="col-span-full py-32 text-center bg-gray-50/50 dark:bg-white/5 rounded-[3rem] border-2 border-dashed border-gray-100 dark:border-white/10">
                            <Users className="size-16 mx-auto text-gray-200 mb-6" />
                            <h3 className="text-xl font-bold mb-2">Yah, tidak ada hasil...</h3>
                            <p className="text-muted-foreground max-w-xs mx-auto">Coba ubah filter pencarianmu untuk menemukan teman yang lain.</p>
                        </div>
                    ) : (
                        students.data.map((student) => (
                            <Card key={student.id} className="group border-none shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 bg-white dark:bg-[#161615] rounded-[2.5rem] overflow-hidden flex flex-col">
                                <CardContent className="p-8 flex-1 flex flex-col">
                                    <div className="flex flex-col items-center text-center">
                                        <div className="relative mb-6">
                                            <Avatar className="size-24 rounded-3xl border-4 border-blue-50 dark:border-blue-900/20 group-hover:scale-110 transition-transform duration-500">
                                                <AvatarImage src={student.avatar} className="object-cover" />
                                                <AvatarFallback className="bg-blue-50 text-blue-600 font-bold text-xl uppercase">
                                                    {student.name.charAt(0)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="absolute -bottom-2 -right-2 size-8 rounded-2xl bg-white dark:bg-black shadow-lg flex items-center justify-center">
                                                <Sparkles className="size-4 text-blue-600" />
                                            </div>
                                        </div>

                                        <h3 className="text-xl font-black mb-1 group-hover:text-blue-600 transition-colors line-clamp-1">{student.name}</h3>
                                        <div className="flex items-center gap-2 mb-4">
                                            <Badge variant="secondary" className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 text-[9px] font-black uppercase tracking-widest border-none">
                                                {student.student_class || '-'}
                                            </Badge>
                                            <Badge variant="secondary" className="bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 text-[9px] font-black uppercase tracking-widest border-none">
                                                {student.major || '-'}
                                            </Badge>
                                        </div>
                                        
                                        <p className="text-xs text-muted-foreground line-clamp-2 mb-6 min-h-10 font-medium leading-relaxed italic">
                                            {student.bio || `Halo! Saya siswa ${student.major || ''} yang berfokus pada pengembangan diri dan karya kreatif.`}
                                        </p>

                                        {student.skills.length > 0 && (
                                            <div className="flex flex-wrap justify-center gap-1.5 mb-6">
                                                {student.skills.slice(0, 3).map((skill, idx) => (
                                                    <Badge key={idx} variant="outline" className="text-[8px] font-bold uppercase tracking-wider py-0 px-2 text-muted-foreground border-gray-100">
                                                        {skill}
                                                    </Badge>
                                                ))}
                                                {student.skills.length > 3 && (
                                                    <span className="text-[8px] font-bold text-muted-foreground">+{student.skills.length - 3}</span>
                                                )}
                                            </div>
                                        )}

                                        <div className="flex items-center justify-center gap-3 mb-8">
                                            {student.socials.instagram && (
                                                <a href={student.socials.instagram} target="_blank" className="size-8 rounded-xl bg-gray-50 dark:bg-white/5 flex items-center justify-center text-muted-foreground hover:text-pink-600 hover:bg-pink-50 transition-all">
                                                    <Instagram className="size-4" />
                                                </a>
                                            )}
                                            {student.socials.linkedin && (
                                                <a href={student.socials.linkedin} target="_blank" className="size-8 rounded-xl bg-gray-50 dark:bg-white/5 flex items-center justify-center text-muted-foreground hover:text-blue-700 hover:bg-blue-50 transition-all">
                                                    <Linkedin className="size-4" />
                                                </a>
                                            )}
                                            {student.socials.tiktok && (
                                                <a href={student.socials.tiktok} target="_blank" className="size-8 rounded-xl bg-gray-50 dark:bg-white/5 flex items-center justify-center text-muted-foreground hover:text-black hover:bg-gray-100 transition-all">
                                                    <MessageCircle className="size-4" />
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    <div className="mt-auto">
                                        <Button asChild className="w-full rounded-2xl h-12 bg-gray-50 dark:bg-white/5 text-[#1b1b18] dark:text-white hover:bg-[#003366] hover:text-white group/btn transition-all shadow-none border-none font-bold uppercase tracking-widest text-[10px]">
                                            <Link href={`/p/${student.nisn}`} prefetch>
                                                Lihat Portofolio <ChevronRight className="ml-2 size-4 transition-transform group-hover/btn:translate-x-1" />
                                            </Link>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>

                {/* Pagination */}
                {students.links.length > 3 && (
                    <div className="mt-20 flex justify-center gap-3">
                        {students.links.map((link, i) => {
                            if (i === 0 || i === students.links.length - 1) return null;
                            return (
                                <Button
                                    asChild={Boolean(link.url)}
                                    key={i}
                                    size="icon"
                                    variant={link.active ? 'default' : 'ghost'}
                                    className={cn(
                                        "size-12 rounded-2xl font-bold text-sm transition-all",
                                        link.active ? "bg-blue-600 shadow-xl shadow-blue-500/20 scale-110" : "text-muted-foreground hover:bg-white dark:hover:bg-white/5 shadow-sm border border-gray-100 dark:border-white/5"
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
