import { Link, usePage } from '@inertiajs/react';
import {
    Bell,
    Compass,
    Home,
    Plus,
    Search,
    School,
    User as UserIcon,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { StudentMenuContent } from '@/components/student-menu-content';
import { useInitials } from '@/hooks/use-initials';
import { cn } from '@/lib/utils';
import type { User } from '@/types';

interface StudentLayoutProps {
    children: React.ReactNode;
}

export default function StudentLayout({ children }: StudentLayoutProps) {
    const { auth } = usePage().props as {
        auth?: {
            user?: User | null;
        };
    };
    const user = auth?.user ?? null;
    const getInitials = useInitials();
    const url = usePage().url;

    return (
        <div className="min-h-screen bg-[#FDFDFC] font-sans text-[#1b1b18] selection:bg-blue-100 selection:text-blue-900 dark:bg-[#050505] dark:text-[#EDEDEC]">
            {/* Youthful Top Navigation */}
            <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md dark:border-white/5 dark:bg-[#050505]/80">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
                    {/* Logo */}
                    <Link
                        href="/siswa"
                        className="group flex items-center gap-2.5"
                    >
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-500/20 transition-transform group-hover:scale-105">
                            <School className="size-5" />
                        </div>
                        <div className="hidden flex-col sm:flex">
                            <span className="text-sm leading-none font-black tracking-tight uppercase">
                                Ruang Karya
                            </span>
                            <span className="text-[9px] font-bold tracking-[0.2em] text-blue-600 uppercase">
                                Student Hub
                            </span>
                        </div>
                    </Link>


                    {/* Right Actions */}
                    <div className="flex items-center gap-2 md:gap-4">
                        <NavLink
                            href="/siswa"
                            active={url === '/siswa'}
                            icon={Home}
                        >
                            Feed
                        </NavLink>
                        <NavLink
                            href="/siswa/karya"
                            active={url.startsWith('/siswa/karya')}
                            icon={Compass}
                        >
                            Inspirasi
                        </NavLink>

                        <div className="mx-1 hidden h-6 w-px bg-gray-100 sm:block dark:bg-white/5" />

                        <Button
                            asChild
                            className="hidden h-10 gap-2 rounded-full bg-blue-600 px-5 text-xs font-bold tracking-widest text-white uppercase shadow-lg shadow-blue-500/20 hover:bg-blue-700 sm:flex"
                        >
                            <Link href="/siswa/karya/create">
                                <Plus className="size-4" /> Karya
                            </Link>
                        </Button>

                        {user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        className="size-10 rounded-2xl border border-gray-100 p-0.5 hover:bg-transparent dark:border-white/5"
                                    >
                                        <Avatar className="size-full overflow-hidden rounded-[0.9rem] border-2 border-white shadow-sm dark:border-[#050505]">
                                            <AvatarImage
                                                src={user.avatar ?? undefined}
                                                alt={user.name ?? 'User'}
                                            />
                                            <AvatarFallback className="bg-blue-50 text-xs font-bold text-blue-600">
                                                {getInitials(
                                                    user.name ?? 'User',
                                                )}
                                            </AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="mt-2 w-56 rounded-2xl border-gray-100 shadow-xl dark:border-white/5"
                                    align="end"
                                >
                                    <StudentMenuContent user={user} />
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <Button
                                asChild
                                className="h-10 rounded-full bg-blue-600 px-5 text-xs font-bold tracking-widest text-white uppercase hover:bg-blue-700"
                            >
                                <Link href="/login">Masuk</Link>
                            </Button>
                        )}
                    </div>
                </div>
            </header>

            {/* Mobile Navigation (Bottom Bar) */}
            <div className="pb-safe fixed right-0 bottom-0 left-0 z-50 border-t border-gray-100 bg-white/90 px-6 backdrop-blur-xl md:hidden dark:border-white/5 dark:bg-[#050505]/90">
                <div className="flex h-16 items-center justify-around">
                    <MobileNavLink
                        href="/siswa"
                        active={url === '/siswa'}
                        icon={Home}
                    />
                    <MobileNavLink
                        href="/siswa/karya"
                        active={url.startsWith('/siswa/karya')}
                        icon={Compass}
                    />
                    <Link
                        href="/siswa/karya/create"
                        className="-mt-8 flex size-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-xl shadow-blue-500/40"
                    >
                        <Plus className="size-6" />
                    </Link>
                    <MobileNavLink
                        href="/siswa/profile"
                        active={url === '/siswa/profile'}
                        icon={UserIcon}
                    />
                    <button
                        type="button"
                        className="flex flex-col items-center justify-center text-muted-foreground"
                    >
                        <Bell className="size-6" />
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <main className="pb-24 md:pb-12">{children}</main>
        </div>
    );
}

function NavLink({
    href,
    active,
    icon: Icon,
    children,
}: {
    href: string;
    active: boolean;
    icon: any;
    children: React.ReactNode;
}) {
    return (
        <Link
            href={href}
            className={cn(
                'group flex items-center gap-2.5 rounded-full px-5 py-2.5 text-xs font-bold tracking-[0.15em] uppercase transition-all',
                active
                    ? 'bg-blue-50 text-blue-600 shadow-sm shadow-blue-500/5 dark:bg-blue-900/20'
                    : 'text-muted-foreground hover:bg-gray-50 hover:text-foreground dark:hover:bg-white/5',
            )}
        >
            <Icon
                className={cn(
                    'size-4 transition-transform group-hover:scale-110',
                    active ? 'stroke-[2.5px]' : 'stroke-2',
                )}
            />
            {children}
        </Link>
    );
}

function MobileNavLink({
    href,
    active,
    icon: Icon,
}: {
    href: string;
    active: boolean;
    icon: any;
}) {
    return (
        <Link
            href={href}
            className={cn(
                'flex flex-col items-center justify-center gap-1',
                active ? 'text-blue-600' : 'text-muted-foreground',
            )}
        >
            <Icon className={cn('size-6', active && 'stroke-[2.5px]')} />
        </Link>
    );
}
