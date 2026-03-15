import { Head, Link } from '@inertiajs/react';
import { ChevronRight, MapPin, Search, Sparkles, Users } from 'lucide-react';
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
    instagram: string | null;
    facebook: string | null;
    tiktok: string | null;
    linkedin: string | null;
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
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-[10px] font-bold tracking-[0.2em] text-blue-600 uppercase dark:bg-blue-900/20">
                        <Users className="size-3" /> Komunitas Kreatif
                    </div>
                    <h1 className="mb-4 text-4xl font-black tracking-tight md:text-5xl">
                        Temukan Teman Berbakat
                    </h1>
                    <p className="mx-auto max-w-xl text-lg font-medium text-muted-foreground">
                        Jelajahi profil siswa lain, lihat karya mereka, dan mari
                        berkolaborasi dalam menciptakan inspirasi.
                    </p>
                </div>

                {/* Search Bar */}
                <div className="mx-auto mb-16 max-w-2xl">
                    <div className="group relative">
                        <Search className="absolute top-1/2 left-5 size-5 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-blue-600" />
                        <input
                            type="text"
                            placeholder="Cari nama siswa atau NISN..."
                            className="h-16 w-full rounded-4xl border-2 border-gray-100 bg-white pr-6 pl-14 text-lg font-medium shadow-xl shadow-blue-500/5 transition-all placeholder:font-normal focus:border-blue-600 focus:ring-0 dark:border-white/5 dark:bg-[#161615]"
                        />
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {students.data.length === 0 ? (
                        <div className="col-span-full py-24 text-center">
                            <p className="font-medium text-muted-foreground italic">
                                Belum ada data siswa untuk ditampilkan.
                            </p>
                        </div>
                    ) : (
                        students.data.map((student) => (
                            <Card
                                key={student.id}
                                className="group overflow-hidden rounded-[2.5rem] border-none bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl dark:bg-[#161615]"
                            >
                                <CardContent className="p-8">
                                    <div className="flex flex-col items-center text-center">
                                        <div className="relative mb-6">
                                            <Avatar className="size-24 rounded-3xl border-4 border-blue-50 transition-transform duration-500 group-hover:scale-110 dark:border-blue-900/20">
                                                <AvatarImage
                                                    src={`https://i.pravatar.cc/150?u=${student.name}`}
                                                />
                                                <AvatarFallback className="bg-blue-50 text-xl font-bold text-blue-600 uppercase">
                                                    {student.name.charAt(0)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="absolute -right-2 -bottom-2 flex size-8 items-center justify-center rounded-2xl bg-white shadow-lg dark:bg-black">
                                                <Sparkles className="size-4 text-blue-600" />
                                            </div>
                                        </div>

                                        <h3 className="mb-1 text-xl font-bold transition-colors group-hover:text-blue-600">
                                            {student.name}
                                        </h3>
                                        <p className="mb-4 text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                                            NISN: {student.nisn ?? '-'}
                                        </p>

                                        <div className="mb-8 flex items-center gap-1.5 text-sm text-muted-foreground">
                                            <MapPin className="size-3.5 text-blue-600" />
                                            <span className="max-w-45 truncate">
                                                {student.address ||
                                                    'Edinburgh, Scotland'}
                                            </span>
                                        </div>

                                        <Button
                                            asChild
                                            variant="outline"
                                            className="group/btn h-12 w-full rounded-2xl border-gray-100 transition-all hover:border-blue-600 hover:bg-blue-600 hover:text-white dark:border-white/5"
                                        >
                                            <Link
                                                href={`/siswa/profiles/${student.id}`}
                                                prefetch
                                            >
                                                Lihat Profil{' '}
                                                <ChevronRight className="ml-2 size-4 transition-transform group-hover/btn:translate-x-1" />
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
                            if (i === 0 || i === students.links.length - 1)
                                return null;

                            const paginationKey = `${link.label}-${link.url ?? 'disabled'}`;

                            return (
                                <Button
                                    asChild={Boolean(link.url)}
                                    key={paginationKey}
                                    size="icon"
                                    variant={link.active ? 'default' : 'ghost'}
                                    className={cn(
                                        'size-12 rounded-2xl text-sm font-bold transition-all',
                                        link.active
                                            ? 'scale-110 bg-blue-600 shadow-xl shadow-blue-500/20'
                                            : 'border border-gray-100 text-muted-foreground shadow-sm hover:bg-white dark:border-white/5 dark:hover:bg-white/5',
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
