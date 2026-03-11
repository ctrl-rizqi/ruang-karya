import { Head, Link, useForm } from '@inertiajs/react';
import { 
    ChevronLeft, 
    FileText, 
    Image as ImageIcon, 
    Layout, 
    Send, 
    Sparkles,
    PlusIcon
} from 'lucide-react';
import type { SubmitEvent } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import StudentLayout from '@/layouts/student-layout';

type StudentKaryaFormProps = {
    mode: 'create' | 'edit';
    karya: {
        id: number;
        title: string;
        description: string | null;
        content: string;
    } | null;
};

export default function StudentKaryaForm({
    mode,
    karya,
}: StudentKaryaFormProps) {
    const isEditMode = mode === 'edit' && karya !== null;

    const form = useForm({
        title: karya?.title ?? '',
        description: karya?.description ?? '',
        content: karya?.content ?? '',
    });

    const submit = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (isEditMode && karya) {
            form.put(`/siswa/karya/${karya.id}`);

            return;
        }

        form.post('/siswa/karya');
    };

    return (
        <StudentLayout>
            <Head title={isEditMode ? 'Edit Karya' : 'Buat Karya Baru'} />

            <div className="mx-auto max-w-4xl px-4 py-8">
                <div className="mb-8">
                    <Button asChild variant="ghost" size="sm" className="mb-4 text-muted-foreground hover:text-foreground group rounded-xl">
                        <Link href="/siswa/karya" className="flex items-center gap-1">
                            <ChevronLeft className="size-4 transition-transform group-hover:-translate-x-1" /> Kembali ke Koleksi
                        </Link>
                    </Button>
                    <div className="flex items-center gap-3">
                        <div className="size-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/20">
                            {isEditMode ? <FileText className="size-6" /> : <PlusIcon className="size-6" />}
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">
                                {isEditMode ? 'Edit Inspirasimu' : 'Posting Inspirasi Baru'}
                            </h1>
                            <p className="text-muted-foreground">Bagikan ide-ide cemerlangmu kepada komunitas.</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <form onSubmit={submit} className="space-y-6">
                            <Card className="border-none shadow-sm bg-white dark:bg-[#161615] rounded-4xl overflow-hidden">
                                <CardHeader className="p-8 pb-4">
                                    <CardTitle className="text-lg font-bold flex items-center gap-2">
                                        <Layout className="size-5 text-blue-600" /> Detail Karya
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-8 pt-0 space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="title" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Judul Karya</Label>
                                        <Input
                                            id="title"
                                            className="h-14 rounded-2xl bg-gray-50/50 border-transparent focus:bg-white text-lg font-bold placeholder:font-normal transition-all"
                                            placeholder="Berikan judul yang menarik..."
                                            value={form.data.title}
                                            onChange={(e) => form.setData('title', e.target.value)}
                                        />
                                        <InputError message={form.errors.title} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="description" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Deskripsi Singkat</Label>
                                        <Input
                                            id="description"
                                            className="h-12 rounded-xl bg-gray-50/50 border-transparent focus:bg-white transition-all"
                                            placeholder="Tentang apa karya ini?"
                                            value={form.data.description}
                                            onChange={(e) => form.setData('description', e.target.value)}
                                        />
                                        <InputError message={form.errors.description} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="content" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Konten / Isi Karya</Label>
                                        <Textarea
                                            id="content"
                                            className="min-h-75 rounded-2xl bg-gray-50/50 border-transparent focus:bg-white transition-all resize-none p-6 leading-relaxed"
                                            placeholder="Tuliskan isi karyamu secara detail di sini..."
                                            value={form.data.content}
                                            onChange={(e) => form.setData('content', e.target.value)}
                                        />
                                        <InputError message={form.errors.content} />
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="flex items-center justify-end gap-4">
                                <Button 
                                    disabled={form.processing} 
                                    type="submit"
                                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl h-14 px-10 shadow-xl shadow-blue-500/20 transition-all hover:scale-105 active:scale-95"
                                >
                                    {form.processing ? 'Sedang Memproses...' : (
                                        <span className="flex items-center gap-2 font-bold uppercase tracking-widest text-xs">
                                            {isEditMode ? 'Simpan Perubahan' : 'Posting Sekarang'} <Send className="size-4" />
                                        </span>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </div>

                    <div className="space-y-6">
                        <Card className="border-none shadow-sm bg-white dark:bg-[#161615] rounded-4xl">
                            <CardHeader className="p-6">
                                <CardTitle className="text-sm font-bold uppercase tracking-widest">Preview Tip</CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 pt-0 space-y-4">
                                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-900/30">
                                    <div className="flex items-center gap-2 text-blue-600 font-bold text-xs mb-2">
                                        <Sparkles className="size-3" /> Tips Menarik
                                    </div>
                                    <p className="text-xs text-blue-900/70 dark:text-blue-100/70 leading-relaxed">
                                        Gunakan judul yang singkat namun padat untuk menarik perhatian teman-temanmu!
                                    </p>
                                </div>
                                <div className="aspect-4/3 bg-gray-50 dark:bg-white/5 rounded-2xl flex flex-col items-center justify-center text-muted-foreground border-2 border-dashed border-gray-100 dark:border-white/10">
                                    <ImageIcon className="size-8 mb-2 opacity-20" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">Thumbnail Preview</span>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="p-6 bg-linear-to-br from-indigo-600 to-purple-700 rounded-4xl text-white shadow-xl">
                            <h3 className="font-bold text-sm uppercase tracking-widest mb-3 flex items-center gap-2">
                                <Sparkles className="size-4" /> Go Viral!
                            </h3>
                            <p className="text-xs text-indigo-100 leading-relaxed">
                                Karya yang informatif dan menginspirasi akan mendapatkan badge 'Merit' dari guru pembimbing.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </StudentLayout>
    );
}