import { Head, Link, usePage } from '@inertiajs/react';
import { dashboard, login, register } from '@/routes';
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
    Search,
    User,
    LogOut,
    Plus,
    School,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface WelcomeProps {
    canRegister?: boolean;
}

export default function Welcome({ canRegister = true }: WelcomeProps) {
    const { auth } = usePage().props;

    return (
        <div className="min-h-screen bg-[#FDFDFC] font-sans text-[#1b1b18] selection:bg-blue-100 selection:text-blue-900">
            <Head title="St. Andrews Academy Showcase">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600|instrument-serif:400,400i"
                    rel="stylesheet"
                />
            </Head>

            {/* Navigation */}
            <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
                    <div className="flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#003366] text-white">
                            <School className="size-6" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-lg leading-none font-bold tracking-tight text-[#003366]">
                                ST. ANDREWS
                            </span>
                            <span className="text-[10px] font-medium tracking-[0.2em] text-gray-400 uppercase">
                                Academy Showcase
                            </span>
                        </div>
                    </div>

                    <nav className="hidden items-center gap-8 text-sm font-medium text-gray-500 md:flex">
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
                            Daftar Siswa
                        </Link>
                        <Link
                            href="#"
                            className="transition-colors hover:text-[#003366]"
                        >
                            Alumni
                        </Link>
                        <Link
                            href="#"
                            className="transition-colors hover:text-[#003366]"
                        >
                            Exhibitions
                        </Link>
                    </nav>

                    <div className="flex items-center gap-4">
                        {auth.user ? (
                            <Button asChild variant="ghost" size="sm">
                                <Link href={dashboard()}>Dashboard</Link>
                            </Button>
                        ) : (
                            <Link
                                href={login()}
                                className="text-sm font-medium text-gray-500 hover:text-[#003366]"
                            >
                                School ID Login
                            </Link>
                        )}
                        <Button
                            asChild
                            className="rounded-lg bg-[#1b1b18] px-6 text-white hover:bg-black"
                        >
                            <Link href={auth.user ? dashboard() : register()}>
                                {auth.user
                                    ? 'Submit Portfolio'
                                    : 'Join Academy'}{' '}
                                <ArrowUpRight className="ml-2 size-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </header>

            <main>
                {/* Hero Section */}
                <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
                    <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
                        <div className="lg:col-span-8">
                            <div className="mb-6 flex items-center gap-2 text-sm font-medium text-blue-600">
                                <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                                Official Student Gallery • Class of 2024
                            </div>
                            <h1 className="mb-8 font-serif text-6xl leading-[1.1] text-[#1b1b18] lg:text-7xl">
                                The Future of <br />
                                <span className="font-normal text-[#003366] italic">
                                    St. Andrews
                                </span>{' '}
                                Excellence
                            </h1>
                            <p className="mb-10 max-w-xl text-lg leading-relaxed text-gray-500">
                                An exclusive digital archives showcasing the
                                innovative works of St. Andrews Academy
                                students. From Grade 9 foundations to Grade 12
                                capstone projects, we celebrate academic rigor
                                and creative passion.
                            </p>
                            <div className="flex flex-wrap items-center gap-4">
                                <Button
                                    asChild
                                    size="lg"
                                    className="h-14 rounded-xl bg-[#003366] px-8 text-white hover:bg-[#002244]"
                                >
                                    <Link
                                        href={auth.user ? dashboard() : login()}
                                    >
                                        Upload via Student Portal{' '}
                                        <Plus className="ml-2 size-5" />
                                    </Link>
                                </Button>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="h-14 rounded-xl border-gray-200 px-8"
                                >
                                    View All Departments
                                </Button>
                            </div>

                            {/* Verification Badge */}
                            <div className="mt-16 flex items-center gap-4">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3].map((i) => (
                                        <Avatar
                                            key={i}
                                            className="size-10 border-2 border-white"
                                        >
                                            <AvatarImage
                                                src={`https://i.pravatar.cc/150?u=${i}`}
                                            />
                                            <AvatarFallback>U</AvatarFallback>
                                        </Avatar>
                                    ))}
                                    <div className="flex size-10 items-center justify-center rounded-full border-2 border-white bg-gray-100 text-[10px] font-bold text-gray-400">
                                        +850
                                    </div>
                                </div>
                                <p className="text-xs font-medium text-gray-400">
                                    Verified access for St. Andrews Academy
                                    students and faculty only
                                </p>
                            </div>
                        </div>

                        {/* Academy Profile Card */}
                        <div className="lg:col-span-4">
                            <Card className="overflow-hidden rounded-2xl border-none bg-white shadow-[0_20px_50px_rgba(0,0,0,0.04)]">
                                <CardContent className="p-8">
                                    <div className="flex flex-col gap-6">
                                        <div>
                                            <h3 className="mb-4 text-[10px] font-bold tracking-[0.2em] text-blue-600 uppercase">
                                                Academy Profile
                                            </h3>
                                            <div className="flex items-start gap-3 text-gray-500">
                                                <MapPin className="size-5 shrink-0 text-gray-300" />
                                                <span className="text-sm">
                                                    Edinburgh, United Kingdom
                                                </span>
                                            </div>
                                        </div>

                                        <div className="relative border-t border-gray-100 pt-6">
                                            <Quote className="absolute -top-3 left-0 size-6 bg-white text-blue-50" />
                                            <p className="text-sm leading-relaxed text-gray-500 italic">
                                                "To inspire excellence,
                                                cultivate curiosity, and empower
                                                students to lead with integrity
                                                in a global community."
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-y-6 border-t border-gray-100 pt-6">
                                            <div>
                                                <p className="mb-1 text-[10px] tracking-wider text-gray-400 uppercase">
                                                    Founded
                                                </p>
                                                <p className="font-bold text-[#1b1b18]">
                                                    1842
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="mb-1 text-[10px] tracking-wider text-gray-400 uppercase">
                                                    Enrollment
                                                </p>
                                                <p className="font-bold text-[#1b1b18]">
                                                    1,200 Students
                                                </p>
                                            </div>
                                            <div>
                                                <p className="mb-1 text-[10px] tracking-wider text-gray-400 uppercase">
                                                    Exhibition Cycle
                                                </p>
                                                <p className="font-bold text-[#1b1b18]">
                                                    Termly Showcase
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* Category Grid */}
                <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
                        <CategoryCard
                            icon={Palette}
                            label="Visual Arts"
                            color="bg-blue-50 text-blue-600"
                        />
                        <CategoryCard
                            icon={Microscope}
                            label="STEM Projects"
                            color="bg-orange-50 text-orange-600"
                        />
                        <CategoryCard
                            icon={Scale}
                            label="Humanities"
                            color="bg-emerald-50 text-emerald-600"
                        />
                        <CategoryCard
                            icon={Music}
                            label="Performance"
                            color="bg-rose-50 text-rose-600"
                        />
                        <CategoryCard
                            icon={Dumbbell}
                            label="Athletics"
                            color="bg-sky-50 text-sky-600"
                        />
                    </div>
                </section>

                {/* Featured Projects */}
                <section className="bg-gray-50/50 py-24">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
                            <div>
                                <h2 className="mb-4 font-serif text-4xl text-[#1b1b18]">
                                    Featured Grade 12 Projects
                                </h2>
                                <p className="text-gray-500">
                                    Senior capstone projects representing the
                                    pinnacle of our academic year.
                                </p>
                            </div>
                            <div className="flex gap-2 rounded-lg border border-gray-100 bg-white p-1">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 rounded-md text-xs font-medium"
                                >
                                    All Grades
                                </Button>
                                <Button
                                    size="sm"
                                    className="h-8 rounded-md bg-[#003366] text-xs font-medium text-white hover:bg-[#002244]"
                                >
                                    Seniors
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 rounded-md text-xs font-medium text-gray-400"
                                >
                                    Award Winners
                                </Button>
                            </div>
                        </div>

                        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                            <ProjectCard
                                title="EcoFlow: Product Identity"
                                category="Design Technology"
                                grade="Grade 12"
                                image="https://images.unsplash.com/photo-1586717791821-3f44a563de4c?q=80&w=800&auto=format&fit=crop"
                                likes="Top Merit"
                            />
                            <ProjectCard
                                title="Synthetics of Nature"
                                category="Fine Arts Honors"
                                grade="Grade 11"
                                image="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop"
                                likes="840"
                            />
                            <ProjectCard
                                title="Nebula: Open-Source Engine"
                                category="Computer Science AP"
                                grade="Grade 12"
                                image="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop"
                                likes="3.4k"
                            />
                        </div>

                        <div className="flex justify-center">
                            <Button
                                variant="outline"
                                className="h-12 rounded-xl border-gray-200 px-8 text-sm font-medium"
                            >
                                Load More Student Work
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Empowering Section */}
                <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
                    <div className="grid grid-cols-1 items-center gap-20 lg:grid-cols-2">
                        <div>
                            <h2 className="mb-12 font-serif text-5xl leading-tight text-[#1b1b18]">
                                Empowering <br />
                                <span className="font-normal text-[#003366] italic">
                                    St. Andrews Scholars
                                </span>
                            </h2>
                            <div className="space-y-10">
                                <StepItem
                                    number="1"
                                    title="School ID Authentication"
                                    description="Use your official academy credentials to log in. Our ecosystem is restricted to verified students, staff, and alumni."
                                />
                                <StepItem
                                    number="2"
                                    title="Tag Your Department"
                                    description="Categorize your work by Grade level and Department (Arts, STEM, Humanities) to ensure it reaches the right faculty evaluators."
                                />
                                <StepItem
                                    number="3"
                                    title="Build Your Academic Legacy"
                                    description="Your showcase profile serves as a digital transcript of your creative growth, ready for university applications."
                                />
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute -inset-4 -z-10 rounded-3xl bg-blue-50/50" />
                            <Card className="overflow-hidden rounded-2xl border-none bg-white shadow-[0_40px_100px_rgba(0,0,0,0.08)]">
                                <CardContent className="p-10">
                                    <div className="flex flex-col gap-8">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="flex size-10 items-center justify-center rounded-full bg-gray-100">
                                                    <User className="size-5 text-gray-400" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <div className="mb-2 h-2 w-24 rounded-full bg-gray-100" />
                                                    <div className="h-2 w-16 rounded-full bg-gray-50" />
                                                </div>
                                            </div>
                                            <Badge
                                                variant="secondary"
                                                className="border-none bg-blue-50 text-[10px] tracking-wider text-blue-600 uppercase"
                                            >
                                                Verified Student
                                            </Badge>
                                        </div>
                                        <div className="flex aspect-video items-center justify-center rounded-xl border-2 border-dashed border-gray-100 bg-gray-50">
                                            <Plus className="size-8 text-gray-300" />
                                        </div>
                                        <div className="space-y-4">
                                            <div className="h-3 w-full rounded-full bg-gray-100" />
                                            <div className="h-3 w-3/4 rounded-full bg-gray-50" />
                                        </div>
                                        <Button className="h-12 w-full rounded-lg bg-[#003366] hover:bg-[#002244]">
                                            Submit for Review
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* Top Students */}
                <section className="relative overflow-hidden bg-[#050505] py-24 text-white">
                    <div className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-blue-900/10 to-transparent" />
                    <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mb-16 flex items-end justify-between">
                            <div>
                                <h3 className="mb-4 text-[10px] font-bold tracking-[0.2em] text-blue-400 uppercase">
                                    Scholarship
                                </h3>
                                <h2 className="mb-4 font-serif text-4xl">
                                    Top Students of the Month
                                </h2>
                            </div>
                            <Button
                                variant="link"
                                className="group text-gray-400 hover:text-white"
                            >
                                View all merit recipients{' '}
                                <ChevronRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                            <StudentCard
                                name="Alex Rivera"
                                focus="Architectural Design"
                                grade="Grade 12"
                            />
                            <StudentCard
                                name="Elena Chen"
                                focus="UX Design"
                                grade="Grade 11"
                            />
                            <StudentCard
                                name="Marcus Thorne"
                                focus="Engineering"
                                grade="Grade 12"
                            />
                            <StudentCard
                                name="Sarah Jenkins"
                                focus="Creative Writing"
                                grade="Grade 10"
                            />
                        </div>
                    </div>
                </section>

                {/* Ready to join */}
                <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
                    <div className="relative overflow-hidden rounded-[2.5rem] bg-[#003366] px-8 py-24 text-center text-white lg:px-16">
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
                            <h2 className="mb-8 font-serif text-5xl lg:text-6xl">
                                Ready to join the <br />
                                <span className="italic">
                                    academy archives?
                                </span>
                            </h2>
                            <p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed font-medium text-blue-100 opacity-80">
                                Exclusively for St. Andrews Academy students.
                                Log in with your <br /> school ID to begin
                                documenting your journey.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Button
                                    asChild
                                    size="lg"
                                    className="h-14 rounded-xl bg-white px-10 font-bold text-[#003366] hover:bg-blue-50"
                                >
                                    <Link href={login()}>
                                        Login with School ID
                                    </Link>
                                </Button>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="h-14 rounded-xl border-white/20 bg-white/10 px-10 font-bold text-white backdrop-blur-sm hover:bg-white/20"
                                >
                                    Visitor Access
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="border-t border-gray-100 pt-24 pb-12">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mb-20 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
                        <div className="lg:col-span-4">
                            <div className="mb-6 flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#003366] text-white">
                                    <School className="size-5" />
                                </div>
                                <span className="text-lg font-bold text-[#003366]">
                                    ST. ANDREWS
                                </span>
                            </div>
                            <p className="mb-8 max-w-sm text-sm leading-relaxed text-gray-400">
                                The official creative archives of St. Andrews
                                Academy, Edinburgh. Dedicated to showcasing the
                                best of our student body.
                            </p>
                            <div className="flex gap-4">
                                <SocialIcon icon={Eye} />
                                <SocialIcon icon={Heart} />
                                <SocialIcon icon={MapPin} />
                            </div>
                        </div>

                        <div className="lg:col-span-2">
                            <h4 className="mb-6 text-sm font-bold">
                                Departments
                            </h4>
                            <ul className="space-y-4 text-sm text-gray-400">
                                <li>
                                    <Link
                                        href="#"
                                        className="transition-colors hover:text-blue-600"
                                    >
                                        Visual Arts
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="transition-colors hover:text-blue-600"
                                    >
                                        Science & Tech
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="transition-colors hover:text-blue-600"
                                    >
                                        Classical Studies
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="transition-colors hover:text-blue-600"
                                    >
                                        Music Conservatory
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div className="lg:col-span-2">
                            <h4 className="mb-6 text-sm font-bold">Academy</h4>
                            <ul className="space-y-4 text-sm text-gray-400">
                                <li>
                                    <Link
                                        href="#"
                                        className="transition-colors hover:text-blue-600"
                                    >
                                        Our History
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="transition-colors hover:text-blue-600"
                                    >
                                        Campus Life
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="transition-colors hover:text-blue-600"
                                    >
                                        Student Council
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="transition-colors hover:text-blue-600"
                                    >
                                        Events Calendar
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div className="lg:col-span-4">
                            <h4 className="mb-6 text-sm font-bold">
                                Resources
                            </h4>
                            <ul className="space-y-4 text-sm text-gray-400">
                                <li>
                                    <Link
                                        href="#"
                                        className="transition-colors hover:text-blue-600"
                                    >
                                        Submission Guide
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="transition-colors hover:text-blue-600"
                                    >
                                        Teacher Portal
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="transition-colors hover:text-blue-600"
                                    >
                                        Parent Portal
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="transition-colors hover:text-blue-600"
                                    >
                                        IT Help Desk
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-between gap-6 border-t border-gray-100 pt-12 text-[10px] font-medium tracking-wider text-gray-400 uppercase md:flex-row">
                        <p>
                            © 2024 St. Andrews Academy. For internal educational
                            use only.
                        </p>
                        <div className="flex gap-8">
                            <Link href="#" className="hover:text-blue-600">
                                Academy Ethics
                            </Link>
                            <Link href="#" className="hover:text-blue-600">
                                Privacy Policy
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
            <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-2xl">
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
