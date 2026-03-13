import { usePage } from '@inertiajs/react';
import AppLogoIcon from '@/components/app-logo-icon';

type SharedProps = {
    webSetting?: {
        site_title: string;
        site_logo_url: string | null;
    };
};

export default function AppLogo() {
    const { webSetting } = usePage<SharedProps>().props;

    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground overflow-hidden">
                {webSetting?.site_logo_url ? (
                    <img src={webSetting.site_logo_url} alt={webSetting?.site_title ?? ''} className="size-full object-cover" />
                ) : (
                    <AppLogoIcon className="size-5 fill-current text-white dark:text-black" />
                )}
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold">
                    {webSetting?.site_title ?? 'Ruang Karya'}
                </span>
            </div>
        </>
    );
}
