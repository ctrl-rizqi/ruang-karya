import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';

type WebSettingProps = {
    webSetting: {
        site_title: string;
        site_logo_url: string | null;
        site_tagline: string | null;
        site_description: string | null;
    };
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
    },
    {
        title: 'Web Settings',
        href: '/dashboard/web-settings',
    },
];

export default function WebSettings({ webSetting }: WebSettingProps) {
    const form = useForm({
        site_title: webSetting.site_title,
        site_logo_url: webSetting.site_logo_url ?? '',
        site_tagline: webSetting.site_tagline ?? '',
        site_description: webSetting.site_description ?? '',
    });

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        form.patch('/dashboard/web-settings');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Web Settings" />

            <div className="p-4">
                <section className="mx-auto max-w-3xl rounded-xl border border-sidebar-border/70 p-6 dark:border-sidebar-border">
                    <h1 className="text-lg font-semibold">Pengaturan Web</h1>
                    <p className="mt-2 mb-6 text-sm text-muted-foreground">
                        Atur title, logo, tagline, dan deskripsi website.
                    </p>

                    <form className="grid gap-4" onSubmit={submit}>
                        <div className="grid gap-2">
                            <Label htmlFor="site_title">Site Title</Label>
                            <Input
                                id="site_title"
                                value={form.data.site_title}
                                onChange={(event) =>
                                    form.setData(
                                        'site_title',
                                        event.target.value,
                                    )
                                }
                            />
                            <InputError message={form.errors.site_title} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="site_logo_url">Logo URL</Label>
                            <Input
                                id="site_logo_url"
                                type="url"
                                value={form.data.site_logo_url}
                                onChange={(event) =>
                                    form.setData(
                                        'site_logo_url',
                                        event.target.value,
                                    )
                                }
                            />
                            <InputError message={form.errors.site_logo_url} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="site_tagline">Tagline</Label>
                            <Input
                                id="site_tagline"
                                value={form.data.site_tagline}
                                onChange={(event) =>
                                    form.setData(
                                        'site_tagline',
                                        event.target.value,
                                    )
                                }
                            />
                            <InputError message={form.errors.site_tagline} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="site_description">Deskripsi</Label>
                            <textarea
                                className="min-h-28 rounded-md border border-input bg-transparent px-3 py-2 text-sm outline-none"
                                id="site_description"
                                value={form.data.site_description}
                                onChange={(event) =>
                                    form.setData(
                                        'site_description',
                                        event.target.value,
                                    )
                                }
                            />
                            <InputError
                                message={form.errors.site_description}
                            />
                        </div>

                        <div>
                            <Button disabled={form.processing} type="submit">
                                Simpan Pengaturan
                            </Button>
                        </div>
                    </form>
                </section>
            </div>
        </AppLayout>
    );
}
