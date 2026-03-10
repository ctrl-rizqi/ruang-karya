import { Link, usePage } from '@inertiajs/react';
import {
    BookOpen,
    FolderGit2,
    LayoutGrid,
    UserCircle2,
    Users,
    WalletCards,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import type { NavItem } from '@/types';
import type { Auth } from '@/types/auth';

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: FolderGit2,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    const { auth } = usePage<{ auth: Auth }>().props;
    const isGuru = auth.user.role === 'GURU';

    const mainNavItems: NavItem[] = isGuru
        ? [
              {
                  title: 'Dashboard',
                  href: dashboard(),
                  icon: LayoutGrid,
              },
              {
                  title: 'Users',
                  href: '/dashboard/users',
                  icon: Users,
                  matchSubpaths: true,
              },
          ]
        : [
              {
                  title: 'Beranda Siswa',
                  href: '/siswa',
                  icon: LayoutGrid,
              },
              {
                  title: 'Profil Saya',
                  href: '/siswa/profile',
                  icon: UserCircle2,
                  matchSubpaths: true,
              },
              {
                  title: 'Karya Saya',
                  href: '/siswa/karya',
                  icon: WalletCards,
                  matchSubpaths: true,
              },
              {
                  title: 'Profil Siswa',
                  href: '/siswa/profiles',
                  icon: Users,
                  matchSubpaths: true,
              },
          ];

    const homeHref = isGuru ? dashboard() : '/siswa';

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={homeHref} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
