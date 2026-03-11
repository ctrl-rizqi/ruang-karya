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
    UserPlus
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
        birth_date: string | null;
        address: string | null;
        social_link: string | null;
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

    return (
        <StudentLayout>
            <Head title={`Profil ${student.name} - Ruang Karya`} />

            <div className="mx-auto max-w-5xl">
                {/* Profile Header (Similar to home but slightly different actions) */}
                <div className="relative overflow-hidden bg-white dark:bg-[#0a0a0a] rounded-b-[3rem] shadow-sm border-x border-b border-gray-100 dark:border-white/5">
                    {/* Cover Photo */}
                    <div className="h-64 w-full bg-linear-to-br from-indigo-600 via-blue-600 to-emerald-500 relative">
                        <div className="absolute inset-0 bg-black/10" />
                    </div>

                    {/* Profile Info Section */}
                    <div className="px-8 pb-10">
                        <div className="relative flex flex-col md:flex-row md:items-end justify-between -mt-20 md:-mt-24 gap-8">
                            <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
                                <div className="relative group">
                                    <Avatar className="size-32 md:size-40 border-8 border-white dark:border-[#0a0a0a] shadow-2xl rounded-[2.5rem]">
                                        <AvatarImage src={`https://i.pravatar.cc/150?u=${student.name}`} />
                                        <AvatarFallback className="text-4xl font-bold bg-blue-50 text-blue-600">{initials}</AvatarFallback>
                                    </Avatar>
                                    <div className="absolute bottom-3 right-3 size-8 rounded-full bg-green-500 border-4 border-white dark:border-[#0a0a0a]" title="Online" />
                                </div>
                                <div className="mb-2">
                                    <div className="flex items-center gap-3">
                                        <h1 className="text-3xl md:text-4xl font-black tracking-tight">{student.name}</h1>
                                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-600 shadow-sm">
                                            <Sparkles className="size-3.5 fill-current" />
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-x-6 gap-y-2 mt-3 text-sm text-muted-foreground font-bold uppercase tracking-widest">
                                        <span className="flex items-center gap-2">
                                            <Trophy className="size-4 text-orange-400" /> NISN: {student.nisn ?? '-'}
                                        </span>
                                        <span className="flex items-center gap-2 text-blue-600">
                                            <MapPin className="size-4" /> {student.address || 'Edinburgh, UK'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 mb-2">
                                <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl h-12 px-8 shadow-xl shadow-blue-500/20 font-bold uppercase tracking-widest text-xs gap-2 transition-all hover:scale-105 active:scale-95">
                                    <UserPlus className="size-4" /> Ikuti
                                </Button>
                                <Button variant="outline" size="icon" className="rounded-2xl border-gray-100 dark:border-white/5 size-12 hover:bg-gray-50 dark:hover:bg-white/5">
                                    <MessageSquare className="size-5 text-gray-400" />
                                </Button>
                                <Button variant="outline" size="icon" className="rounded-2xl border-gray-100 dark:border-white/5 size-12 hover:bg-gray-50 dark:hover:bg-white/5">
                                    <Share2 className="size-5 text-gray-400" />
                                </Button>
                            </div>
                        </div>

                        {/* Stats Bar */}
                        <div className="mt-12 flex gap-12 border-t border-gray-100 dark:border-white/5 pt-8 px-2">
                            <div className="flex flex-col">
                                <span className="text-2xl font-black">{karyas.length}</span>
                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Karya</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-2xl font-black">2.4k</span>
                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Views</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-2xl font-black">842</span>
                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Appreciation</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="px-8 py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Sidebar info */}
                        <div className="lg:col-span-4 space-y-8">
                            <section className="p-8 bg-white dark:bg-[#161615] rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-white/5">
                                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 mb-6 flex items-center gap-2">
                                    <Calendar className="size-4" /> Info Personal
                                </h3>
                                <div className="space-y-6">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Tanggal Lahir</span>
                                        <span className="text-sm font-bold">{student.birth_date ? new Date(student.birth_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '-'}</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Alamat</span>
                                        <span className="text-sm font-bold leading-relaxed">{student.address || '-'}</span>
                                    </div>
                                    {student.social_link && (
                                        <div className="pt-4">
                                            <a 
                                                href={student.social_link} 
                                                target="_blank" 
                                                className="flex items-center justify-between p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 hover:bg-blue-100 transition-all group"
                                            >
                                                <span className="text-xs font-bold uppercase tracking-widest">Social Media</span>
                                                <ExternalLink className="size-4 transition-transform group-hover:scale-110" />
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </section>

                            <div className="p-8 bg-linear-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] text-white shadow-xl shadow-blue-500/20">
                                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-blue-100 mb-4 flex items-center gap-2">
                                    <Sparkles className="size-4" /> Achievement
                                </h3>
                                <p className="text-lg font-bold leading-relaxed mb-6">"Menjadi bagian dari kurator seni digital sekolah sejak 2023."</p>
                                <div className="flex gap-2">
                                    <Badge className="bg-white/20 text-white border-none font-bold text-[8px] uppercase tracking-widest">Top 10 contributor</Badge>
                                </div>
                            </div>
                        </div>

                        {/* Main Feed */}
                        <div className="lg:col-span-8">
                            <div className="flex items-center gap-3 mb-10">
                                <Grid className="size-5 text-blue-600" />
                                <h2 className="text-xl font-black uppercase tracking-widest">Karya Terkini</h2>
                                <div className="h-px bg-gray-100 dark:bg-white/5 flex-1 ml-4" />
                            </div>

                            {karyas.length === 0 ? (
                                <div className="py-20 text-center bg-gray-50/50 dark:bg-white/5 rounded-[3rem] border-2 border-dashed border-gray-100 dark:border-white/10">
                                    <p className="text-muted-foreground italic font-medium">Siswa ini belum membagikan karya apapun.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {karyas.map((karya) => (
                                        <Card key={karya.id} className="group overflow-hidden border-none shadow-sm hover:shadow-2xl transition-all duration-500 bg-white dark:bg-[#161615] rounded-4xl">
                                            <div className="aspect-video bg-linear-to-br from-gray-50 to-blue-50 dark:from-white/5 dark:to-blue-900/10 flex items-center justify-center relative overflow-hidden">
                                                <span className="text-4xl font-black text-blue-100 dark:text-blue-900 group-hover:scale-110 transition-transform duration-700 select-none">
                                                    {karya.title[0]}
                                                </span>
                                                <div className="absolute top-4 right-4">
                                                    <Badge className="bg-white/90 backdrop-blur-md text-blue-600 border-none font-bold text-[8px] uppercase tracking-widest py-1 px-3">
                                                        Student Work
                                                    </Badge>
                                                </div>
                                            </div>
                                            <CardContent className="p-6">
                                                <h3 className="font-bold text-lg leading-tight mb-3 group-hover:text-blue-600 transition-colors line-clamp-1">{karya.title}</h3>
                                                <p className="text-sm text-muted-foreground line-clamp-2 mb-6 leading-relaxed">
                                                    {karya.description || "Sebuah perwujudan ide kreatif yang diekspresikan dengan penuh dedikasi."}
                                                </p>
                                                <div className="flex items-center justify-between pt-5 border-t border-gray-50 dark:border-white/5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                                                    <span>{karya.created_at ? new Date(karya.created_at).toLocaleDateString('id-ID') : '-'}</span>
                                                    <div className="flex items-center gap-3">
                                                        <span className="flex items-center gap-1"><MessageSquare className="size-3" /> 8</span>
                                                        <span className="flex items-center gap-1"><Share2 className="size-3" /> 2</span>
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
