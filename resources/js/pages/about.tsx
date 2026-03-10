import StudentLayout from '@/layouts/student-layout';
import { Head } from '@inertiajs/react';
import { 
    Info, 
    Target, 
    Rocket, 
    ListChecks, 
    Mail, 
    Sparkles,
    Github,
    Instagram,
    Users
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type TeamMember = {
    name: string;
    role: string;
    email: string;
    avatar: string;
};

type AboutProps = {
    webSetting: {
        site_title: string;
        site_logo_url: string | null;
        site_tagline: string | null;
        site_description: string | null;
    };
    team: TeamMember[];
    purpose: string;
    vision: string;
    missions: string[];
};

export default function About({
    webSetting,
    team,
    purpose,
    vision,
    missions,
}: AboutProps) {
    return (
        <StudentLayout>
            <Head title={`Tentang ${webSetting.site_title}`} />

            <div className="mx-auto max-w-6xl px-6 py-12 lg:py-20">
                {/* Header Section */}
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
                        <Info className="size-3" /> Get to know us
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
                        Tentang <span className="text-blue-600">{webSetting.site_title}</span>
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
                        {webSetting.site_tagline || 'Platform inspiratif untuk mewadahi kreativitas tanpa batas bagi setiap siswa.'}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
                    {/* Main Content */}
                    <div className="lg:col-span-8 space-y-12">
                        {/* Purpose Section */}
                        <section className="relative">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="size-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/20">
                                    <Target className="size-5" />
                                </div>
                                <h2 className="text-2xl font-bold tracking-tight">Tujuan Kami</h2>
                            </div>
                            <p className="text-muted-foreground text-lg leading-relaxed bg-white dark:bg-[#161615] p-8 rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-sm">
                                {purpose}
                            </p>
                        </section>

                        {/* Vision & Mission Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <Card className="border-none shadow-sm bg-linear-to-br from-indigo-600 to-blue-700 text-white rounded-[2.5rem] overflow-hidden">
                                <CardContent className="p-8">
                                    <div className="size-10 rounded-xl bg-white/20 text-white flex items-center justify-center mb-6 backdrop-blur-md">
                                        <Rocket className="size-5" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-4">Visi</h3>
                                    <p className="text-blue-50 leading-relaxed font-medium italic">
                                        &ldquo;{vision}&rdquo;
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="border-none shadow-sm bg-white dark:bg-[#161615] rounded-[2.5rem] border border-gray-100 dark:border-white/5">
                                <CardContent className="p-8">
                                    <div className="size-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
                                        <ListChecks className="size-5" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-4">Misi Kami</h3>
                                    <ul className="space-y-4">
                                        {missions.map((mission, index) => (
                                            <li key={index} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                                                <div className="size-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                                                <span>{mission}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Sidebar / Extra Info */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="p-8 bg-blue-600 rounded-[2.5rem] text-white shadow-xl shadow-blue-500/20">
                            <h3 className="font-bold mb-4 flex items-center gap-2 uppercase tracking-widest text-xs">
                                <Sparkles className="size-4 text-blue-200" /> Student First
                            </h3>
                            <p className="text-blue-50 text-sm leading-relaxed mb-6">
                                Kami percaya bahwa setiap siswa memiliki potensi unik yang layak untuk mendapatkan panggung dan apresiasi yang tepat.
                            </p>
                            <div className="h-1 w-12 bg-white/30 rounded-full" />
                        </div>

                        <div className="p-8 bg-[#1b1b18] text-white rounded-[2.5rem] shadow-xl">
                            <h4 className="font-bold mb-3 flex items-center gap-2">
                                <Rocket className="size-4 text-blue-400" /> Versi Beta
                            </h4>
                            <p className="text-xs text-gray-400 leading-relaxed">
                                Ruang Karya saat ini dalam tahap pengembangan aktif. Bagikan masukanmu untuk membantu kami tumbuh lebih baik!
                            </p>
                        </div>
                    </div>
                </div>

                {/* Team Section */}
                <section>
                    <div className="flex flex-col items-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
                            <Users className="size-3" /> Professional Team
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black tracking-tight">Meet Our Team</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                        {team.map((member, index) => (
                            <Card key={index} className="group border-none shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 bg-white dark:bg-[#161615] rounded-4xl overflow-hidden">
                                <CardContent className="p-6 text-center">
                                    <div className="relative mb-6 mx-auto w-fit">
                                        <Avatar className="size-20 rounded-2xl border-4 border-blue-50 dark:border-blue-900/20 group-hover:scale-110 transition-transform duration-500">
                                            <AvatarImage src={member.avatar} />
                                            <AvatarFallback className="bg-blue-50 text-blue-600 font-bold uppercase">
                                                {member.name.charAt(0)}
                                            </AvatarFallback>
                                        </Avatar>
                                    </div>

                                    <h3 className="text-sm font-black mb-1 group-hover:text-blue-600 transition-colors line-clamp-1">{member.name}</h3>
                                    <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mb-4 line-clamp-1">{member.role}</p>
                                    
                                    <div className="flex justify-center gap-3 pt-4 border-t border-gray-50 dark:border-white/5">
                                        <div className="size-8 rounded-xl bg-gray-50 dark:bg-white/5 flex items-center justify-center text-muted-foreground hover:text-blue-600 hover:bg-blue-50 transition-all cursor-pointer">
                                            <Mail className="size-3.5" />
                                        </div>
                                        <div className="size-8 rounded-xl bg-gray-50 dark:bg-white/5 flex items-center justify-center text-muted-foreground hover:text-blue-600 hover:bg-blue-50 transition-all cursor-pointer">
                                            <Github className="size-3.5" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>
            </div>
        </StudentLayout>
    );
}
