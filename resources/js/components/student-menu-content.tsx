import { Link, router } from '@inertiajs/react';
import { LogOut, User as UserIcon, Palette, Briefcase } from 'lucide-react';
import {
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { logout } from '@/routes';
import type { User } from '@/types';

type Props = {
    user: User;
};

export function StudentMenuContent({ user }: Props) {
    const getInitials = useInitials();
    const cleanup = useMobileNavigation();

    const handleLogout = () => {
        cleanup();
    };

    return (
        <>
            <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-3 px-2 py-2 text-left">
                    <Avatar className="h-10 w-10 overflow-hidden rounded-xl border-2 border-blue-50 shadow-sm dark:border-blue-900/20">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="bg-blue-50 text-xs font-bold text-blue-600 dark:bg-blue-900/30">
                            {getInitials(user.name)}
                        </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-black text-blue-600 dark:text-blue-400">{user.name}</span>
                        <span className="truncate text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
                           {user.nisn ? `NISN: ${user.nisn}` : 'Student'}
                        </span>
                    </div>
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-blue-50 dark:bg-blue-900/10" />
            <DropdownMenuGroup>
                <DropdownMenuItem asChild className="cursor-pointer rounded-lg focus:bg-blue-50 focus:text-blue-600 dark:focus:bg-blue-900/20">
                    <Link
                        className="flex w-full items-center py-2"
                        href="/siswa/profile"
                        onClick={cleanup}
                    >
                        <UserIcon className="mr-3 size-4 text-blue-500" />
                        <span className="font-semibold text-xs">Profil Saya</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer rounded-lg focus:bg-blue-50 focus:text-blue-600 dark:focus:bg-blue-900/20">
                    <Link
                        className="flex w-full items-center py-2"
                        href="/siswa/karya"
                        onClick={cleanup}
                    >
                        <Palette className="mr-3 size-4 text-blue-500" />
                        <span className="font-semibold text-xs">Karya Saya</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer rounded-lg focus:bg-blue-50 focus:text-blue-600 dark:focus:bg-blue-900/20">
                    <Link
                        className="flex w-full items-center py-2"
                        href={`/p/${user.nisn}`}
                        onClick={cleanup}
                    >
                        <Briefcase className="mr-3 size-4 text-blue-500" />
                        <span className="font-semibold text-xs">Lihat Portfolio</span>
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-blue-50 dark:bg-blue-900/10" />
            <DropdownMenuItem asChild>
                <Link
                    className="flex w-full cursor-pointer items-center py-2 text-red-500 focus:bg-red-50 focus:text-red-600 dark:focus:bg-red-900/20"
                    href={logout()}
                    as="button"
                    onClick={handleLogout}
                >
                    <LogOut className="mr-3 size-4" />
                    <span className="font-semibold text-xs text-left">Keluar Sesi</span>
                </Link>
            </DropdownMenuItem>
        </>
    );
}
