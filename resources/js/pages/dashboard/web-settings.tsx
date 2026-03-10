import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Globe, Image as ImageIcon, Save, Sparkles, Upload } from 'lucide-react';
import type { FormEvent } from 'react';

type WebSettingProps = {
    webSetting: {
        site_title: string;
        site_logo_url: string | null;
        site_tagline: string | null;
        site_description: string | null;
    };
    status?: string;
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

export default function WebSettings({ webSetting, status }: WebSettingProps) {
    const { data, setData, post, processing, errors, transform } = useForm({
        site_title: webSetting.site_title,
        site_logo: null as File | null,
        site_tagline: webSetting.site_tagline ?? '',
        site_description: webSetting.site_description ?? '',
        _method: 'PATCH', // Spoofing for multipart/form-data with PATCH
    });

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        // Use post with _method spoofing because PATCH doesn't support files in some environments/configurations
        post('/dashboard/web-settings', {
            forceFormData: true,
            onSuccess: () => {
                // Handle success if needed
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Web Settings" />

            <div className="mx-auto max-w-4xl p-6 lg:p-10">
                <div className="mb-10">
                    <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-[0.2em] mb-3">
                        <Globe className="size-4" /> System Configuration
                    </div>
                    <h1 className="text-3xl font-black tracking-tight">Pengaturan Website</h1>
                    <p className="text-muted-foreground mt-1">Kelola identitas visual dan informasi global aplikasi Ruang Karya.</p>
                </div>

                {status === 'web-settings-updated' && (
                    <div className="mb-8 p-4 rounded-2xl bg-green-50 dark:bg-green-900/20 text-green-600 border border-green-100 dark:border-green-900/30 flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                        <Sparkles className="size-5" />
                        <span className="text-sm font-bold uppercase tracking-wider">Pengaturan berhasil diperbarui!</span>
                    </div>
                )}

                <form onSubmit={submit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-8 space-y-8">
                        <Card className="border-none shadow-sm bg-white dark:bg-[#161615] rounded-[2.5rem]">
                            <CardHeader className="px-8 pt-8">
                                <CardTitle className="text-lg font-bold flex items-center gap-2">
                                    <Sparkles className="size-5 text-blue-600" /> Identitas Dasar
                                </CardTitle>
                                <CardDescription>Tentukan judul dan tagline yang akan muncul di seluruh halaman.</CardDescription>
                            </CardHeader>
                            <CardContent className="p-8 pt-4 space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="site_title" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Judul Website</Label>
                                    <Input
                                        id="site_title"
                                        className="h-12 rounded-xl bg-gray-50/50 border-transparent focus:bg-white transition-all font-bold"
                                        placeholder="Contoh: Ruang Karya SMA 1"
                                        value={data.site_title}
                                        onChange={(e) => setData('site_title', e.target.value)}
                                    />
                                    <InputError message={errors.site_title} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="site_tagline" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Tagline / Slogan</Label>
                                    <Input
                                        id="site_tagline"
                                        className="h-12 rounded-xl bg-gray-50/50 border-transparent focus:bg-white transition-all"
                                        placeholder="Contoh: Wadah Kreativitas Tanpa Batas"
                                        value={data.site_tagline}
                                        onChange={(e) => setData('site_tagline', e.target.value)}
                                    />
                                    <InputError message={errors.site_tagline} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="site_description" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Deskripsi Global</Label>
                                    <textarea
                                        id="site_description"
                                        className="min-h-32 w-full rounded-2xl bg-gray-50/50 border-none focus:bg-white transition-all p-4 text-sm resize-none leading-relaxed"
                                        placeholder="Jelaskan secara singkat tentang platform ini..."
                                        value={data.site_description}
                                        onChange={(e) => setData('site_description', e.target.value)}
                                    />
                                    <InputError message={errors.site_description} />
                                </div>
                            </CardContent>
                        </Card>

                        <div className="flex justify-end">
                            <Button 
                                disabled={processing} 
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl h-14 px-10 shadow-xl shadow-blue-500/20 transition-all hover:scale-105 active:scale-95"
                            >
                                {processing ? 'Menyimpan...' : (
                                    <span className="flex items-center gap-2 uppercase tracking-widest text-xs font-bold">
                                        <Save className="size-4" /> Simpan Pengaturan
                                    </span>
                                )}
                            </Button>
                        </div>
                    </div>

                    <div className="lg:col-span-4 space-y-8">
                        <Card className="border-none shadow-sm bg-white dark:bg-[#161615] rounded-[2.5rem] overflow-hidden">
                            <CardHeader className="p-8 pb-4">
                                <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                                    <ImageIcon className="size-4 text-blue-600" /> Logo Situs
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-8 pt-0 space-y-6">
                                <div className="flex flex-col items-center gap-6">
                                    <div className="relative group">
                                        <div className="size-32 rounded-[2rem] bg-gray-50 dark:bg-white/5 border-2 border-dashed border-gray-200 dark:border-white/10 flex items-center justify-center overflow-hidden">
                                            {webSetting.site_logo_url ? (
                                                <img src={webSetting.site_logo_url} alt="Logo Preview" className="size-full object-contain p-4" />
                                            ) : (
                                                <ImageIcon className="size-10 text-gray-300" />
                                            )}
                                        </div>
                                        <div className="absolute inset-0 bg-blue-600/80 text-white flex items-center justify-center rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                            <Upload className="size-6" />
                                        </div>
                                        <input 
                                            type="file" 
                                            className="absolute inset-0 opacity-0 cursor-pointer" 
                                            onChange={(e) => setData('site_logo', e.target.files ? e.target.files[0] : null)}
                                            accept="image/*"
                                        />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Preview Logo</p>
                                        <p className="text-[9px] text-gray-400">PNG, JPG up to 2MB</p>
                                    </div>
                                    <InputError message={errors.site_logo} />
                                </div>
                            </CardContent>
                        </Card>

                        <div className="p-8 bg-blue-600 rounded-[2.5rem] text-white shadow-xl shadow-blue-500/20">
                            <h3 className="font-bold text-sm uppercase tracking-widest mb-3 flex items-center gap-2">
                                <Sparkles className="size-4" /> Tips Branding
                            </h3>
                            <p className="text-xs text-blue-100 leading-relaxed">
                                Gunakan logo dengan format transparan (PNG) dan rasio kotak (1:1) untuk hasil tampilan terbaik di semua halaman.
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
