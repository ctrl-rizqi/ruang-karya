import { Head, Link, usePage } from '@inertiajs/react';
import {
    MapPin,
    Quote,
    Palette,
    Microscope,
    Scale,
    Music,
    Dumbbell,
    ArrowUpRight,
    Heart,
    Eye,
    ChevronRight,
    User,
    Plus,
    School,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { dashboard, login, register } from '@/routes';
import student from '@/routes/student';

const ItemJurusan = [
    {
        id: 1,
        name: 'Broadcast',
        img: '/assets/BROADCAST.png',
    },
    {
        id: 2,
        name: 'DKV',
        img: '/assets/DKV.png',
    },
    {
        id: 3,
        name: 'Perkantoran',
        img: '/assets/MP.png',
    },
    {
        id: 4,
        name: 'Bisnis Digital',
        img: '/assets/BD.png',
    },
    {
        id: 5,
        name: 'Akuntansi',
        img: '/assets/AK.png',
    },
    {
        id: 6,
        name: 'Kuliner',
        img: '/assets/KLR.png',
    }
]

interface WelcomeProps {
    webSetting: {
        site_title: string;
        site_logo_url: string | null;
        site_tagline: string | null;
        site_description: string | null;
    };
}

export default function Welcome({ webSetting }: WelcomeProps) {
    const { auth } = usePage().props;

    const sponsors = [
        { id: 1, name: 'Sponsor 1', logo: '/assets/sponsor-placeholder.png' },
        { id: 2, name: 'Sponsor 2', logo: '/assets/sponsor-placeholder.png' },
        { id: 3, name: 'Sponsor 3', logo: '/assets/sponsor-placeholder.png' },
        { id: 4, name: 'Sponsor 4', logo: '/assets/sponsor-placeholder.png' },
        { id: 5, name: 'Sponsor 5', logo: '/assets/sponsor-placeholder.png' },
    ];

    return (
        <div className="min-h-screen bg-[#FDFDFC] font-sans text-[#1b1b18] selection:bg-blue-100 selection:text-blue-900">
            <Head title={`${webSetting.site_title} - ${webSetting.site_tagline}`}>
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600|instrument-serif:400,400i"
                    rel="stylesheet"
                />
            </Head>

            {/* Navigation */}
            <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
                    <div className="flex items-center gap-6">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg overflow-hidden border border-gray-100">
                            {webSetting.site_logo_url ? (
                                <img src={"/storage/" + webSetting.site_logo_url} alt={webSetting.site_title} className="size-full object-cover" />
                            ) : (
                                <School className="size-6 text-blue-600" />
                            )}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-lg leading-none font-black tracking-tight text-[#003366] uppercase">
                                {webSetting.site_title}
                            </span>
                            <span className="text-[9px] font-bold tracking-[0.2em] text-blue-600/60 uppercase mt-1">
                                {webSetting.site_tagline}
                            </span>
                        </div>
                        <nav className="hidden items-center gap-8 text-xs font-bold uppercase tracking-widest text-gray-400 md:flex ml-4">
                            <Link
                                href="/tentang"
                                className="transition-colors hover:text-[#003366]"
                            >
                                Tentang
                            </Link>
                            <Link
                                href="/daftar-siswa"
                                className="transition-colors hover:text-[#003366]"
                            >
                                Direktori Siswa
                            </Link>
                        </nav>
                    </div>


                    <div className="flex items-center gap-4">
                        {auth.user ? (
                            <Button asChild variant="ghost" size="sm" className="font-bold uppercase tracking-widest text-[10px]">
                                <Link
                                    href={
                                        auth.user.role === 'SISWA'
                                            ? student.home()
                                            : dashboard()
                                    }
                                >
                                    {auth.user.role === 'SISWA'
                                        ? 'Beranda Siswa'
                                        : 'Dashboard Guru'}
                                </Link>
                            </Button>
                        ) : (
                            <Link
                                href={login()}
                                className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-[#003366]"
                            >
                                Masuk Portal
                            </Link>
                        )}
                        <Button
                            asChild
                            className="rounded-xl bg-[#003366] px-6 text-white hover:bg-[#002244] shadow-lg shadow-blue-900/20 font-bold uppercase tracking-widest text-[10px] h-11"
                        >
                            <Link
                                href={
                                    auth.user
                                        ? auth.user.role === 'SISWA'
                                            ? student.home()
                                            : dashboard()
                                        : register()
                                }
                            >
                                {auth.user
                                    ? 'Kirim Karya'
                                    : 'Daftar Sekarang'}{' '}
                                <ArrowUpRight className="ml-2 size-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </header>

            <main>
                {/* Hero Section */}
                <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
                    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
                        <div className="lg:col-span-7">
                            <div className="mb-6 flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-blue-600 uppercase">
                                <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
                                Galeri Resmi Karya Siswa • {webSetting.site_title}
                            </div>
                            <h1 className="mb-8 font-serif text-6xl leading-[1.1] text-[#1b1b18] lg:text-8xl">
                                Merayakan <br />
                                <span className="font-normal text-[#003366] italic">
                                    Kreativitas
                                </span>{' '}
                                Tanpa Batas
                            </h1>
                            <p className="mb-10 max-w-xl text-lg leading-relaxed text-gray-500 font-medium">
                                {webSetting.site_description || "Wadah digital untuk mendokumentasikan, memamerkan, dan merayakan setiap pencapaian kreatif siswa-siswi terbaik kami."}
                            </p>
                            <div className="flex flex-wrap items-center gap-4">
                                <Button
                                    asChild
                                    size="lg"
                                    className="h-14 rounded-2xl bg-[#003366] px-8 text-white hover:bg-[#002244] shadow-xl shadow-blue-900/20 font-bold uppercase tracking-widest text-xs"
                                >
                                    <Link
                                        href={
                                            auth.user
                                                ? auth.user.role === 'SISWA'
                                                    ? student.home()
                                                    : dashboard()
                                                : login()
                                        }
                                    >
                                        Mulai Posting Karya{' '}
                                        <Plus className="ml-2 size-5" />
                                    </Link>
                                </Button>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="h-14 rounded-2xl border-gray-200 px-8 font-bold uppercase tracking-widest text-xs"
                                >
                                    Jelajahi Jurusan
                                </Button>
                            </div>

                            <div className="mt-16 flex items-center gap-4">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3, 4].map((i) => (
                                        <Avatar
                                            key={i}
                                            className="size-10 border-4 border-white shadow-sm"
                                        >
                                            <AvatarImage
                                                src={`https://i.pravatar.cc/150?u=school${i}`}
                                            />
                                            <AvatarFallback>S</AvatarFallback>
                                        </Avatar>
                                    ))}
                                    <div className="flex size-10 items-center justify-center rounded-full border-4 border-white bg-blue-50 text-[10px] font-black text-blue-600 shadow-sm">
                                        +500
                                    </div>
                                </div>
                                <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                                    Siswa Terverifikasi Telah Bergabung
                                </p>
                            </div>
                        </div>

                        <div className="lg:col-span-5 relative">
                            <div className="absolute -inset-4 bg-blue-600/5 rounded-[3rem] -z-10 blur-2xl" />
                            <Card className="overflow-hidden rounded-[2.5rem] border-none bg-white shadow-[0_30px_100px_rgba(0,51,102,0.08)] relative">
                                <div className="aspect-square relative">
                                    <img 
                                        src="https://images.unsplash.com/photo-1523050335392-93851179ae22?q=80&w=1000&auto=format&fit=crop" 
                                        className="size-full object-cover" 
                                        alt="School Atmosphere" 
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-[#003366]/80 via-transparent to-transparent" />
                                    <div className="absolute bottom-8 left-8 right-8 text-white">
                                        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-[8px] font-bold tracking-widest uppercase backdrop-blur-md">
                                            Visi Sekolah
                                        </div>
                                        <p className="text-lg font-medium leading-relaxed italic">
                                            "Mencetak generasi yang kompeten, kreatif, dan berakhlak mulia di era digital."
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* Jurusan Section */}
                <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8 border-t border-gray-100">
                    <div className="mb-16 flex flex-col items-center text-center">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-[10px] font-bold tracking-[0.2em] text-blue-600 uppercase">
                            Explore Departments
                        </div>
                        <h2 className="text-4xl font-black tracking-tight text-[#1b1b18]">
                            Pilih Berdasarkan Jurusan
                        </h2>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
                        {ItemJurusan.map((jurusan) => (
                            <div key={jurusan.id} className="group cursor-pointer flex flex-col items-center">
                                <div className="mb-4 size-24 rounded-3xl bg-white shadow-sm border border-gray-100 p-4 transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-2 group-hover:border-blue-100 flex items-center justify-center overflow-hidden">
                                    <img src={jurusan.img} alt={jurusan.name} className="size-full object-contain transition-transform duration-500 group-hover:scale-110" />
                                </div>
                                <span className="text-[10px] font-black tracking-widest text-[#1b1b18] uppercase text-center group-hover:text-blue-600 transition-colors">
                                    {jurusan.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Featured Projects */}
                <section className="bg-[#003366]/2 py-24">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
                            <div>
                                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-100/50 px-4 py-1.5 text-[10px] font-bold tracking-[0.2em] text-blue-700 uppercase">
                                    Featured Works
                                </div>
                                <h2 className="mb-4 font-serif text-5xl text-[#1b1b18]">
                                    Karya Unggulan Siswa
                                </h2>
                                <p className="text-gray-500 font-medium">
                                    Inspirasi terbaik yang telah melalui proses kurasi guru pembimbing.
                                </p>
                            </div>
                            
                        </div>

                        <div className="mb-16 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
                            <ProjectCard
                                title="EcoFlow: Identitas Produk"
                                category="Desain Komunikasi Visual"
                                grade="Kelas XII"
                                image="https://images.unsplash.com/photo-1586717791821-3f44a563de4c?q=80&w=800&auto=format&fit=crop"
                                likes="Prestasi Utama"
                            />
                            <ProjectCard
                                title="Sintesis Alam dalam Lensa"
                                category="Fotografi Broadcast"
                                grade="Kelas XI"
                                image="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop"
                                likes="840"
                            />
                            <ProjectCard
                                title="Nebula: Sistem Kasir Digital"
                                category="Pengembangan Perangkat Lunak"
                                grade="Kelas XII"
                                image="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop"
                                likes="3.4k"
                            />
                        </div>

                        <div className="flex justify-center">
                            <Button
                                variant="outline"
                                className="h-14 rounded-2xl border-gray-200 px-10 text-xs font-bold uppercase tracking-widest hover:bg-white hover:shadow-xl transition-all"
                            >
                                Lihat Semua Karya Siswa
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Sponsor Section */}
                <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8 border-t border-gray-100">
                    <div className="flex flex-col items-center">
                        <p className="mb-10 text-[10px] font-bold tracking-[0.3em] text-gray-400 uppercase">
                            Bekerjasama Dengan Industri
                        </p>
                        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-40 grayscale transition-all hover:grayscale-0">
                            {sponsors.map((sponsor) => (
                                <div key={sponsor.id} className="h-12 flex items-center justify-center transition-transform hover:scale-110">
                                    {/* Replace src with your actual sponsor logo paths */}
                                    <img 
                                        src={sponsor.logo} 
                                        alt={sponsor.name} 
                                        className="h-full object-contain"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = `https://placehold.co/200x80/f3f4f6/9ca3af?text=${sponsor.name}`;
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Empowering Section */}
                <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8 bg-white">
                    <div className="grid grid-cols-1 items-center gap-20 lg:grid-cols-2">
                        <div>
                            <h2 className="mb-12 font-serif text-6xl leading-tight text-[#1b1b18]">
                                Membangun <br />
                                <span className="font-normal text-[#003366] italic">
                                    Portofolio Masa Depan
                                </span>
                            </h2>
                            <div className="space-y-10">
                                <StepItem
                                    number="1"
                                    title="Autentikasi Akun Sekolah"
                                    description="Masuk menggunakan NISN dan password yang telah didaftarkan pihak sekolah. Sistem ini eksklusif untuk komunitas internal."
                                />
                                <StepItem
                                    number="2"
                                    title="Pilih Kategori Karya"
                                    description="Tentukan jenis media (Video, Gambar, Dokumen) dan hubungkan dengan jurusanmu agar dapat dikurasi oleh guru pembimbing."
                                />
                                <StepItem
                                    number="3"
                                    title="Bangun Jejak Akademik"
                                    description="Profil galerimu berfungsi sebagai transkrip digital perjalanan kreatif yang siap digunakan untuk melamar pekerjaan atau kuliah."
                                />
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute -inset-10 bg-indigo-50/50 rounded-[4rem] -z-10 blur-3xl" />
                            <Card className="overflow-hidden rounded-[2.5rem] border-none bg-white shadow-[0_40px_100px_rgba(0,51,102,0.1)]">
                                <CardContent className="p-10">
                                    <div className="flex flex-col gap-8">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="flex size-12 items-center justify-center rounded-2xl bg-blue-50">
                                                    <User className="size-6 text-blue-600" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <div className="mb-2 h-2.5 w-32 rounded-full bg-gray-100" />
                                                    <div className="h-2 w-20 rounded-full bg-gray-50" />
                                                </div>
                                            </div>
                                            <Badge
                                                variant="secondary"
                                                className="border-none bg-emerald-50 text-[9px] font-black tracking-widest text-emerald-600 uppercase px-3 py-1"
                                            >
                                                Siswa Aktif
                                            </Badge>
                                        </div>
                                        <div className="flex aspect-video items-center justify-center rounded-3xl border-2 border-dashed border-blue-100 bg-blue-50/30 transition-colors hover:bg-blue-50/50 cursor-pointer">
                                            <div className="flex flex-col items-center gap-2">
                                                <Plus className="size-10 text-blue-400" />
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400">Upload Karya Baru</span>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="h-3 w-full rounded-full bg-gray-100" />
                                            <div className="h-3 w-3/4 rounded-full bg-gray-50" />
                                        </div>
                                        <Button className="h-14 w-full rounded-2xl bg-[#003366] hover:bg-[#002244] shadow-lg shadow-blue-900/20 font-bold uppercase tracking-widest text-xs">
                                            Ajukan Untuk Tinjauan
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* Top Students */}
                {/* <section className="relative overflow-hidden bg-[#050505] py-32 text-white">
                    <div className="absolute top-0 right-0 h-full w-1/2 bg-linear-to-l from-[#003366]/20 to-transparent" />
                    <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
                            <div>
                                <h3 className="mb-4 text-[10px] font-black tracking-[0.3em] text-blue-400 uppercase">
                                    Prestasi Siswa
                                </h3>
                                <h2 className="font-serif text-5xl lg:text-6xl">
                                    Siswa Berprestasi <br /> Bulan Ini
                                </h2>
                            </div>
                            <Button
                                variant="link"
                                className="group text-gray-400 hover:text-white p-0 h-auto font-bold uppercase tracking-widest text-[10px]"
                            >
                                Lihat semua penerima prestasi{' '}
                                <ChevronRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                            <StudentCard
                                name="Bhima Erlangga"
                                focus="Manajemen Perkantoran"
                                grade="Kelas XII"
                            />
                            <StudentCard
                                name="Deri Candra"
                                focus="Desain Komunikasi Visual"
                                grade="Kelas XI"
                            />
                            <StudentCard
                                name="Muhimatul Aliyah"
                                focus="Kuliner"
                                grade="Kelas XII"
                            />
                            <StudentCard
                                name="Qori’atul Khusna"
                                focus="Bisnis Digital"
                                grade="Kelas X"
                            />
                        </div>
                    </div>
                </section> */}

                {/* Ready to join */}
                <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
                    <div className="relative overflow-hidden rounded-[3rem] bg-[#003366] px-8 py-32 text-center text-white lg:px-16 shadow-2xl shadow-blue-900/40">
                        {/* Decorative background curves */}
                        <svg
                            className="absolute inset-0 size-full opacity-10"
                            viewBox="0 0 1440 400"
                            preserveAspectRatio="none"
                            aria-hidden="true"
                            focusable="false"
                        >
                            <path
                                d="M0 200 C 200 100, 400 300, 600 200 C 800 100, 1000 300, 1200 200 C 1400 100, 1600 300, 1800 200"
                                stroke="white"
                                strokeWidth="2"
                                fill="none"
                            />
                            <path
                                d="M0 250 C 200 150, 400 350, 600 250 C 800 150, 1000 350, 1200 250 C 1400 150, 1600 350, 1800 250"
                                stroke="white"
                                strokeWidth="2"
                                fill="none"
                            />
                        </svg>

                        <div className="relative z-10">
                            <h2 className="mb-8 font-serif text-6xl lg:text-7xl">
                                Siap memamerkan <br />
                                <span className="italic">
                                    karyamu sendiri?
                                </span>
                            </h2>
                            <p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed font-medium text-blue-100 opacity-80">
                                Khusus untuk siswa-siswi {webSetting.site_title}.
                                Masuk dengan akun sekolahmu untuk mulai <br /> 
                                menginspirasi dunia sekarang juga.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Button
                                    asChild
                                    size="lg"
                                    className="h-16 rounded-2xl bg-white px-12 font-black uppercase tracking-widest text-xs text-[#003366] hover:bg-blue-50 shadow-xl"
                                >
                                    <Link href={login()}>
                                        Masuk Sekarang
                                    </Link>
                                </Button>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="h-16 rounded-2xl border-white/20 bg-white/10 px-12 font-black uppercase tracking-widest text-xs text-white backdrop-blur-sm hover:bg-white/20"
                                >
                                    Akses Pengunjung
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="border-t border-gray-100 pt-24 pb-12 bg-white">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mb-20 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
                        <div className="lg:col-span-4">
                            <div className="mb-6 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#003366] text-white overflow-hidden shadow-lg shadow-blue-900/20">
                                    {webSetting.site_logo_url ? (
                                        <img src={"/storage/" + webSetting.site_logo_url} alt={webSetting.site_title} className="size-full object-cover" />
                                    ) : (
                                        <School className="size-6" />
                                    )}
                                </div>
                                <span className="text-xl font-black text-[#003366] uppercase tracking-tight">
                                    {webSetting.site_title}
                                </span>
                            </div>
                            <p className="mb-8 max-w-sm text-sm font-medium leading-relaxed text-gray-400">
                                {webSetting.site_description || "Platform galeri karya siswa yang berfokus pada pengembangan bakat dan kreativitas dalam ekosistem pendidikan modern."}
                            </p>
                            <div className="flex gap-4">
                                <SocialIcon icon={Eye} />
                                <SocialIcon icon={Heart} />
                                <SocialIcon icon={MapPin} />
                            </div>
                        </div>

                        <div className="lg:col-span-2">
                            <h4 className="mb-6 text-[10px] font-black uppercase tracking-[0.2em] text-[#1b1b18]">
                                Daftar Jurusan
                            </h4>
                            <ul className="space-y-4 text-xs font-bold text-gray-400">
                                {ItemJurusan.slice(0, 4).map(j => (
                                    <li key={j.id}>
                                        <Link href="#" className="transition-colors hover:text-blue-600">
                                            {j.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="lg:col-span-2">
                            <h4 className="mb-6 text-[10px] font-black uppercase tracking-[0.2em] text-[#1b1b18]">
                                Lembaga
                            </h4>
                            <ul className="space-y-4 text-xs font-bold text-gray-400">
                                <li>
                                    <Link href="/tentang" className="transition-colors hover:text-blue-600">
                                        Profil Sekolah
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="transition-colors hover:text-blue-600">
                                        Visi & Misi
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/daftar-siswa" className="transition-colors hover:text-blue-600">
                                        Data Siswa
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="transition-colors hover:text-blue-600">
                                        Kontak Kami
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div className="lg:col-span-4">
                            <h4 className="mb-6 text-[10px] font-black uppercase tracking-[0.2em] text-[#1b1b18]">
                                Bantuan
                            </h4>
                            <ul className="space-y-4 text-xs font-bold text-gray-400">
                                <li>
                                    <Link href="#" className="transition-colors hover:text-blue-600">
                                        Panduan Kirim Karya
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="transition-colors hover:text-blue-600">
                                        Portal Pengajar
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="transition-colors hover:text-blue-600">
                                        Kebijakan Privasi
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="transition-colors hover:text-blue-600">
                                        Syarat & Ketentuan
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-between gap-6 border-t border-gray-100 pt-12 text-[9px] font-bold tracking-[0.2em] text-gray-400 uppercase md:flex-row">
                        <p>
                            © 2026 {webSetting.site_title}. Dikembangkan untuk ekosistem pendidikan Indonesia.
                        </p>
                        <div className="flex gap-8">
                            <Link href="#" className="hover:text-blue-600">
                                Etika Akademik
                            </Link>
                            <Link href="#" className="hover:text-blue-600">
                                Help Desk
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

function CategoryCard({
    icon: Icon,
    label,
    color,
}: {
    icon: any;
    label: string;
    color: string;
}) {
    return (
        <div
            className={`flex cursor-pointer flex-col items-center justify-center gap-4 rounded-2xl p-8 transition-all hover:scale-105 ${color.split(' ')[0]}`}
        >
            <Icon className={`size-6 ${color.split(' ')[1]}`} />
            <span className="text-xs font-bold tracking-widest text-[#1b1b18] uppercase">
                {label}
            </span>
        </div>
    );
}

function ProjectCard({
    title,
    category,
    grade,
    image,
    likes,
}: {
    title: string;
    category: string;
    grade: string;
    image: string;
    likes: string;
}) {
    return (
        <div className="group cursor-pointer">
            <div className="relative mb-6 aspect-4/3 overflow-hidden rounded-2xl">
                <img
                    src={image}
                    alt={title}
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4">
                    <Badge className="flex items-center gap-1.5 border-none bg-white/90 px-3 py-1 text-[10px] font-bold text-[#1b1b18] shadow-sm backdrop-blur-md hover:bg-white/90">
                        {likes === 'Top Merit' ? (
                            <Quote className="size-3 fill-orange-400 text-orange-400" />
                        ) : (
                            <Heart className="size-3 fill-rose-500 text-rose-500" />
                        )}
                        {likes}
                    </Badge>
                </div>
            </div>
            <div className="flex flex-col">
                <div className="mb-2 flex items-center justify-between">
                    <h4 className="text-xl font-medium text-[#1b1b18] transition-colors group-hover:text-[#003366]">
                        {title}
                    </h4>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium tracking-widest text-gray-400 uppercase">
                    <span>{grade}</span>
                    <span className="size-1 rounded-full bg-gray-200" />
                    <span>{category}</span>
                </div>
            </div>
        </div>
    );
}

function StepItem({
    number,
    title,
    description,
}: {
    number: string;
    title: string;
    description: string;
}) {
    return (
        <div className="flex gap-6">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-blue-600">
                {number}
            </div>
            <div className="flex flex-col pt-1">
                <h4 className="mb-2 text-lg font-bold text-[#1b1b18]">
                    {title}
                </h4>
                <p className="max-w-sm text-sm leading-relaxed text-gray-400">
                    {description}
                </p>
            </div>
        </div>
    );
}

function StudentCard({
    name,
    focus,
    grade,
}: {
    name: string;
    focus: string;
    grade: string;
}) {
    return (
        <Card className="group cursor-pointer rounded-2xl border-none bg-white/5 transition-colors hover:bg-white/10">
            <CardContent className="p-6">
                <div className="flex flex-col gap-6">
                    <Avatar className="size-16 rounded-2xl border border-white/10 transition-colors group-hover:border-blue-500/50">
                        <AvatarImage
                            src={`https://i.pravatar.cc/150?u=${name}`}
                        />
                        <AvatarFallback>{name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h4 className="mb-1 text-lg font-bold">{name}</h4>
                        <p className="mb-4 text-xs font-medium tracking-widest text-gray-500 uppercase">
                            {grade} <span className="mx-1">•</span> {focus}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <Badge
                                variant="outline"
                                className="border-none bg-white/5 px-2 text-[8px] tracking-wider text-gray-400 uppercase"
                            >
                                Dean's List
                            </Badge>
                            <Badge
                                variant="outline"
                                className="border-none bg-blue-500/10 px-2 text-[8px] tracking-wider text-blue-400 uppercase"
                            >
                                Art Merit
                            </Badge>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function SocialIcon({ icon: Icon }: { icon: any }) {
    return (
        <div className="flex size-8 cursor-pointer items-center justify-center rounded-full border border-gray-100 text-gray-300 transition-all hover:border-blue-100 hover:bg-blue-50 hover:text-[#003366]">
            <Icon className="size-4" />
        </div>
    );
}
