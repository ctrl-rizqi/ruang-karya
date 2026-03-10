import { Head } from '@inertiajs/react';

type AboutProps = {
    webSetting: {
        site_title: string;
        site_logo_url: string | null;
        site_tagline: string | null;
        site_description: string | null;
    };
    developer: {
        name: string;
        role: string;
        email: string;
    };
    purpose: string;
    vision: string;
    missions: string[];
};

export default function About({
    webSetting,
    developer,
    purpose,
    vision,
    missions,
}: AboutProps) {
    return (
        <>
            <Head title="Tentang" />

            <main className="mx-auto max-w-5xl space-y-4 p-6">
                <section className="rounded-xl border border-sidebar-border/70 p-6 dark:border-sidebar-border">
                    <h1 className="text-2xl font-semibold">
                        Tentang {webSetting.site_title}
                    </h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        {webSetting.site_tagline ??
                            'Platform portfolio karya siswa.'}
                    </p>
                </section>

                <section className="rounded-xl border border-sidebar-border/70 p-6 dark:border-sidebar-border">
                    <h2 className="text-lg font-semibold">
                        Pengembang (Dummy)
                    </h2>
                    <p className="mt-2 text-sm">Nama: {developer.name}</p>
                    <p className="text-sm">Peran: {developer.role}</p>
                    <p className="text-sm">Email: {developer.email}</p>
                </section>

                <section className="rounded-xl border border-sidebar-border/70 p-6 dark:border-sidebar-border">
                    <h2 className="text-lg font-semibold">Tujuan</h2>
                    <p className="mt-2 text-sm leading-relaxed">{purpose}</p>
                </section>

                <section className="rounded-xl border border-sidebar-border/70 p-6 dark:border-sidebar-border">
                    <h2 className="text-lg font-semibold">Visi</h2>
                    <p className="mt-2 text-sm leading-relaxed">{vision}</p>
                </section>

                <section className="rounded-xl border border-sidebar-border/70 p-6 dark:border-sidebar-border">
                    <h2 className="text-lg font-semibold">Misi</h2>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                        {missions.map((mission) => (
                            <li key={mission}>{mission}</li>
                        ))}
                    </ul>
                </section>
            </main>
        </>
    );
}
