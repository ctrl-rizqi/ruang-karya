import { Head, Link } from '@inertiajs/react';
import { 
    ChevronRight, 
    MapPin, 
    Search, 
    Sparkles, 
    Users 
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import StudentLayout from '@/layouts/student-layout';
import { cn } from '@/lib/utils';

type StudentItem = {
    id: number;
    nisn: string | null;
    name: string;
    birth_date: string | null;
    address: string | null;
    social_link: string | null;
};

type StudentProfilesIndexProps = {
    students: {
        data: StudentItem[];
        links: {
            url: string | null;
            label: string;
            active: boolean;
        }[];
    };
};

export default function StudentProfilesIndex({
    students,
}: StudentProfilesIndexProps) {
    const paginationLabel = (label: string): string => {
        return label
            .replace(/<[^>]*>/g, '')
            .replaceAll('&laquo;', '')
            .replaceAll('&raquo;', '');
    };

    return (
        <StudentLayout>
            <Head title="Temukan Teman - Ruang Karya" />

            <div className="mx-auto max-w-6xl px-4 py-8">
                {/* Header */}
                <div className="mb-12 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
                        <Users className="size-3" /> Komunitas Kreatif
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Temukan Teman Berbakat</h1>
                    <p className="text-muted-foreground max-w-xl mx-auto text-lg font-medium">
                        Jelajahi profil siswa lain, lihat karya mereka, dan mari berkolaborasi dalam menciptakan inspirasi.
                    </p>
                </div>

                {/* Search Bar */}
                <div className="max-w-2xl mx-auto mb-16">
                    <div className="relative group">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 size-5 text-muted-foreground group-focus-within:text-blue-600 transition-colors" />
                        <input 
                            type="text" 
                            placeholder="Cari nama siswa atau NISN..." 
                            className="w-full h-16 pl-14 pr-6 bg-white dark:bg-[#161615] border-2 border-gray-100 dark:border-white/5 rounded-4xl shadow-xl shadow-blue-500/5 focus:border-blue-600 focus:ring-0 transition-all text-lg font-medium placeholder:font-normal"
                        />
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {students.data.length === 0 ? (
                        <div className="col-span-full py-24 text-center">
                            <p className="text-muted-foreground italic font-medium">Belum ada data siswa untuk ditampilkan.</p>
                        </div>
                    ) : (
                        students.data.map((student) => (
                            <Card key={student.id} className="group border-none shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 bg-white dark:bg-[#161615] rounded-[2.5rem] overflow-hidden">
                                <CardContent className="p-8">
                                    <div className="flex flex-col items-center text-center">
                                        <div className="relative mb-6">
                                            <Avatar className="size-24 rounded-3xl border-4 border-blue-50 dark:border-blue-900/20 group-hover:scale-110 transition-transform duration-500">
                                                <AvatarImage src={`https://i.pravatar.cc/150?u=${student.name}`} />
                                                <AvatarFallback className="bg-blue-50 text-blue-600 font-bold text-xl uppercase">
                                                    {student.name.charAt(0)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="absolute -bottom-2 -right-2 size-8 rounded-2xl bg-white dark:bg-black shadow-lg flex items-center justify-center">
                                                <Sparkles className="size-4 text-blue-600" />
                                            </div>
                                        </div>

                                        <h3 className="text-xl font-bold mb-1 group-hover:text-blue-600 transition-colors">{student.name}</h3>
                                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-4">NISN: {student.nisn ?? '-'}</p>
                                        
                                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-8">
                                            <MapPin className="size-3.5 text-blue-600" />
                                            <span className="truncate max-w-45">{student.address || 'Edinburgh, Scotland'}</span>
                                        </div>

                                        <Button asChild variant="outline" className="w-full rounded-2xl h-12 border-gray-100 dark:border-white/5 hover:bg-blue-600 hover:border-blue-600 hover:text-white group/btn transition-all">
                                            <Link href={`/siswa/profiles/${student.id}`} prefetch>
                                                Lihat Profil <ChevronRight className="ml-2 size-4 transition-transform group-hover/btn:translate-x-1" />
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
