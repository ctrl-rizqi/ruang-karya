import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserMenuContent } from '@/components/user-menu-content';
import { Link, usePage } from '@inertiajs/react';
import { 
    Bell, 
    Compass, 
    Home, 
    Plus, 
    Search, 
    School
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useInitials } from '@/hooks/use-initials';

interface StudentLayoutProps {
    children: React.ReactNode;
}

export default function StudentLayout({ children }: StudentLayoutProps) {
    const { auth } = usePage().props;
    const getInitials = useInitials();
    const url = usePage().url;

    return (
        <div className="min-h-screen bg-[#FDFDFC] dark:bg-[#050505] text-[#1b1b18] dark:text-[#EDEDEC] font-sans selection:bg-blue-100 selection:text-blue-900">
            {/* Youthful Top Navigation */}
            <header className="sticky top-0 z-50 w-full border-b border-gray-100 dark:border-white/5 bg-white/80 dark:bg-[#050505]/80 backdrop-blur-md">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
                    {/* Logo */}
                    <Link href="/siswa" className="flex items-center gap-2.5 group">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
                            <School className="size-5" />
                        </div>
                        <div className="flex-col hidden sm:flex">
                            <span className="text-sm font-black tracking-tight leading-none uppercase">Ruang Karya</span>
                            <span className="text-[9px] font-bold tracking-[0.2em] text-blue-600 uppercase">Student Hub</span>
                        </div>
                    </Link>

                    {/* Desktop Center Navigation */}
                    <nav className="hidden md:flex items-center gap-1">
                        <NavLink href="/siswa" active={url === '/siswa'} icon={Home}>Feed</NavLink>
                        <NavLink href="/siswa/karya" active={url.startsWith('/siswa/karya')} icon={Compass}>Inspirasi</NavLink>
                    </nav>

                    {/* Right Actions */}
                    <div className="flex items-center gap-2 md:gap-4">
                        <Button size="icon" variant="ghost" className="rounded-full size-10 hover:bg-gray-100 dark:hover:bg-white/5 text-muted-foreground hover:text-foreground">
                            <Search className="size-5" />
                        </Button>
                        <Button size="icon" variant="ghost" className="rounded-full size-10 hover:bg-gray-100 dark:hover:bg-white/5 text-muted-foreground hover:text-foreground relative">
                            <Bell className="size-5" />
                            <span className="absolute top-2.5 right-2.5 size-2 rounded-full bg-rose-500 border-2 border-white dark:border-[#050505]" />
                        </Button>
                        
                        <div className="h-6 w-px bg-gray-100 dark:bg-white/5 mx-1 hidden sm:block" />

                        <Button asChild className="hidden sm:flex bg-blue-600 hover:bg-blue-700 text-white rounded-full h-10 px-5 shadow-lg shadow-blue-500/20 text-xs font-bold uppercase tracking-widest gap-2">
                            <Link href="/siswa/karya/create">
                                <Plus className="size-4" /> Karya
                            </Link>
                        </Button>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="size-10 rounded-2xl p-0.5 border border-gray-100 dark:border-white/5 hover:bg-transparent">
                                    <Avatar className="size-full rounded-[0.9rem] overflow-hidden border-2 border-white dark:border-[#050505] shadow-sm">
                                        <AvatarImage src={`https://i.pravatar.cc/150?u=${auth.user.email}`} alt={auth.user.name} />
                                        <AvatarFallback className="bg-blue-50 text-blue-600 font-bold text-xs">
                                            {getInitials(auth.user.name)}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56 mt-2 rounded-2xl border-gray-100 dark:border-white/5 shadow-xl" align="end">
                                <UserMenuContent user={auth.user} />
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </header>

            {/* Mobile Navigation (Bottom Bar) */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 dark:bg-[#050505]/90 backdrop-blur-xl border-t border-gray-100 dark:border-white/5 px-6 pb-safe">
                <div className="flex items-center justify-around h-16">
                    <MobileNavLink href="/siswa" active={url === '/siswa'} icon={Home} />
                    <MobileNavLink href="/siswa/karya" active={url.startsWith('/siswa/karya')} icon={Compass} />
                    <Link href="/siswa/karya/create" className="flex items-center justify-center size-12 -mt-8 rounded-2xl bg-blue-600 text-white shadow-xl shadow-blue-500/40">
                        <Plus className="size-6" />
                    </Link>
                    <MobileNavLink href="/siswa/profile" active={url === '/siswa/profile'} icon={User} />
                    <button className="flex flex-col items-center justify-center text-muted-foreground">
                        <Bell className="size-6" />
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <main className="pb-24 md:pb-12">
                {children}
            </main>
        </div>
    );
}

function NavLink({ href, active, icon: Icon, children }: { href: string, active: boolean, icon: any, children: React.ReactNode }) {
    return (
        <Link 
            href={href}
            className={cn(
                "flex items-center gap-2.5 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-[0.15em] transition-all group",
                active 
                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 shadow-sm shadow-blue-500/5" 
                    : "text-muted-foreground hover:bg-gray-50 dark:hover:bg-white/5 hover:text-foreground"
            )}
        >
            <Icon className={cn("size-4 transition-transform group-hover:scale-110", active ? "stroke-[2.5px]" : "stroke-2")} />
            {children}
        </Link>
    );
}

function MobileNavLink({ href, active, icon: Icon }: { href: string, active: boolean, icon: any }) {
    return (
        <Link 
            href={href}
            className={cn(
                "flex flex-col items-center justify-center gap-1",
                active ? "text-blue-600" : "text-muted-foreground"
            )}
        >
            <Icon className={cn("size-6", active && "stroke-[2.5px]")} />
        </Link>
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
