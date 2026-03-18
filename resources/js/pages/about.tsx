import { Head } from '@inertiajs/react';
import {
    Info,
    Target,
    Rocket,
    ListChecks,
    Sparkles,
    Users,
    ChevronRight,
    Quote
} from 'lucide-react';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
    Dialog, 
    DialogContent, 
    DialogHeader, 
    DialogTitle,
    DialogDescription 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import StudentLayout from '@/layouts/student-layout';
import { ItemMember } from '@/const/member';

type AboutProps = {
    webSetting?: {
        site_title: string;
        site_logo_url: string | null;
        site_tagline: string | null;
        site_description: string | null;
    };
    purpose?: string;
    vision?: string;
    missions?: string[];
};

type Member = typeof ItemMember[number];

export default function About({
    webSetting,
    purpose = 'Ruang Karya dibuat untuk membantu siswa menampilkan karya terbaiknya dalam satu platform portfolio sekolah.',
    vision = 'Menjadi ruang digital sekolah yang mendorong kreativitas, kolaborasi, dan apresiasi karya siswa.',
    missions = [],
}: AboutProps) {
    const [selectedMember, setSelectedMember] = useState<Member | null>(null);

    const siteTitle = webSetting?.site_title ?? 'Ruang Karya';
    const siteTagline =
        webSetting?.site_tagline ||
        'Platform inspiratif untuk mewadahi kreativitas tanpa batas bagi setiap siswa.';

    return (
        <StudentLayout>
            <Head title={`Tentang ${siteTitle}`} />

            <div className="mx-auto max-w-6xl px-6 py-12 lg:py-20">
                {/* Header Section */}
                <div className="mb-20 text-center">
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-[10px] font-bold tracking-[0.2em] text-blue-600 uppercase dark:bg-blue-900/20">
                        <Info className="size-3" /> Get to know us
                    </div>
                    <h1 className="mb-6 text-4xl font-black tracking-tight md:text-6xl">
                        Tentang{' '}
                        <span className="text-blue-600">{siteTitle}</span>
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg leading-relaxed font-medium text-muted-foreground md:text-xl">
                        {siteTagline}
                    </p>
                </div>

                <div className="mb-24 grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
                    {/* Main Content */}
                    <div className="space-y-12 lg:col-span-8">
                        {/* Purpose Section */}
                        <section className="relative">
                            <div className="mb-6 flex items-center gap-3">
                                <div className="flex size-10 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-500/20">
                                    <Target className="size-5" />
                                </div>
                                <h2 className="text-2xl font-bold tracking-tight">
                                    Tujuan Kami
                                </h2>
                            </div>
                            <p className="rounded-[2.5rem] border border-gray-100 bg-white p-8 text-lg leading-relaxed text-muted-foreground shadow-sm dark:border-white/5 dark:bg-[#161615]">
                                {purpose}
                            </p>
                        </section>

                        {/* Vision & Mission Section */}
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                            <Card className="overflow-hidden rounded-[2.5rem] border-none bg-linear-to-br from-indigo-600 to-blue-700 text-white shadow-sm">
                                <CardContent className="p-8">
                                    <div className="mb-6 flex size-10 items-center justify-center rounded-xl bg-white/20 text-white backdrop-blur-md">
                                        <Rocket className="size-5" />
                                    </div>
                                    <h3 className="mb-4 text-xl font-bold">
                                        Visi
                                    </h3>
                                    <p className="leading-relaxed font-medium text-blue-50 italic">
                                        &ldquo;{vision}&rdquo;
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="rounded-[2.5rem] border border-none border-gray-100 bg-white shadow-sm dark:border-white/5 dark:bg-[#161615]">
                                <CardContent className="p-8">
                                    <div className="mb-6 flex size-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                        <ListChecks className="size-5" />
                                    </div>
                                    <h3 className="mb-4 text-xl font-bold">
                                        Misi Kami
                                    </h3>
                                    <ul className="space-y-4">
                                        {missions.map((mission) => (
                                            <li
                                                key={mission}
                                                className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                                            >
                                                <div className="mt-2 size-1.5 shrink-0 rounded-full bg-blue-600" />
                                                <span>{mission}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Sidebar / Extra Info */}
                    <div className="space-y-8 lg:col-span-4">
                        <div className="rounded-[2.5rem] bg-blue-600 p-8 text-white shadow-xl shadow-blue-500/20">
                            <h3 className="mb-4 flex items-center gap-2 text-xs font-bold tracking-widest uppercase">
                                <Sparkles className="size-4 text-blue-200" />{' '}
                                Student First
                            </h3>
                            <p className="mb-6 text-sm leading-relaxed text-blue-50">
                                Kami percaya bahwa setiap siswa memiliki potensi
                                unik yang layak untuk mendapatkan panggung dan
                                apresiasi yang tepat.
                            </p>
                            <div className="h-1 w-12 rounded-full bg-white/30" />
                        </div>

                        <div className="rounded-[2.5rem] bg-[#1b1b18] p-8 text-white shadow-xl">
                            <h4 className="mb-3 flex items-center gap-2 font-bold">
                                <Rocket className="size-4 text-blue-400" />{' '}
                                Versi Beta
                            </h4>
                            <p className="text-xs leading-relaxed text-gray-400">
                                Ruang Karya saat ini dalam tahap pengembangan
                                aktif. Bagikan masukanmu untuk membantu kami
                                tumbuh lebih baik!
                            </p>
                        </div>
                    </div>
                </div>

                {/* Team Section */}
                <section>
                    <div className="mb-16 flex flex-col items-center">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-[10px] font-bold tracking-[0.2em] text-blue-600 uppercase dark:bg-blue-900/20">
                            <Users className="size-3" /> Professional Team
                        </div>
                        <h2 className="text-3xl font-black tracking-tight md:text-4xl">
                            Meet Our Team
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
                        {ItemMember.map((member) => {
                            const memberName = member.name?.trim() || 'Unknown Member';
                            const memberRole = member.title?.trim() || 'Unknown Role';

                            return (
                                <Card
                                    key={member.id}
                                    className="group cursor-pointer overflow-hidden rounded-2xl border-none bg-white shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 dark:bg-[#161615] p-0"
                                    onClick={() => setSelectedMember(member)}
                                >
                                    <div className="relative w-full overflow-hidden">
                                        <img 
                                            src={member.img} 
                                            alt={memberName} 
                                            className="aspect-square w-full bg-top bg-cover bg-no-repeat object-top object-cover rounded-2xl border-4 border-blue-50 transition-transform duration-500 group-hover:scale-110 dark:border-blue-900/20" 
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center bg-blue-600/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                            <Button variant="secondary" size="sm" className="rounded-full font-bold uppercase tracking-widest text-[10px]">
                                                Lihat Detail
                                            </Button>
                                        </div>
                                    </div>
                                    <CardContent className="text-center p-4">
                                        <h3 className="mb-1 line-clamp-1 text-sm font-black transition-colors group-hover:text-blue-600">
                                            {memberName}
                                        </h3>
                                        <p className="mb-0 line-clamp-1 text-[9px] font-bold tracking-widest text-muted-foreground uppercase">
                                            {memberRole}
                                        </p>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </section>

                {/* Team Member Dialog */}
                <Dialog open={!!selectedMember} onOpenChange={(open) => !open && setSelectedMember(null)}>
                    <DialogContent className="rounded-xl sm:max-w-3xl h-screen md:h-auto p-0 overflow-hidden border-none bg-white dark:bg-[#161615]">
                        {selectedMember && (
                            <div className="flex flex-col md:flex-row h-full">
                                <div className="md:w-2/4 h-[40%] md:h-auto relative md:flex-1 overflow-hidden">
                                    <img 
                                        src={selectedMember.img} 
                                        alt={selectedMember.name} 
                                        className="h-full w-full object-cover object-top" 
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                                    <div className="absolute bottom-6 left-6 right-6 text-white">
                                        <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-[8px] font-bold tracking-widest uppercase backdrop-blur-md">
                                            {selectedMember.title}
                                        </div>
                                        <h3 className="text-xl font-black leading-tight">
                                            {selectedMember.name}
                                        </h3>
                                    </div>
                                </div>
                                <div className="flex-1 p-8 md:p-12 md:w-2/4 relative overflow-y-auto max-h-[80vh]">
                                    <Quote className="absolute top-8 right-8 size-12 text-blue-50 opacity-10 dark:text-blue-900" />
                                    <DialogHeader className="mb-8 text-left">
                                        <DialogTitle className="text-2xl font-black text-blue-600">Profil Pendidik</DialogTitle>
                                        <DialogDescription className="text-xs font-bold uppercase tracking-widest opacity-60">
                                            Membangun Generasi Kreatif & Kompeten
                                        </DialogDescription>
                                    </DialogHeader>
                                    
                                    <div className="prose prose-sm dark:prose-invert max-w-none">
                                        {selectedMember.description.split('\n').map((paragraph, idx) => (
                                            paragraph.trim() && (
                                                <p key={idx} className="mb-4 text-muted-foreground leading-relaxed text-sm">
                                                    {paragraph.trim()}
                                                </p>
                                            )
                                        ))}
                                    </div>

                                    <div className="mt-10 pt-8 border-t border-gray-50 dark:border-white/5 flex items-center justify-between">
                                        <div className="flex items-center gap-3 text-blue-600">
                                            <Sparkles className="size-5" />
                                            <span className="text-xs font-bold uppercase tracking-widest">Inspirasi Pagi</span>
                                        </div>
                                        <Button 
                                            onClick={() => setSelectedMember(null)}
                                            className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 font-bold uppercase tracking-widest text-[10px]"
                                        >
                                            Tutup Profil
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </StudentLayout>
    );
}
