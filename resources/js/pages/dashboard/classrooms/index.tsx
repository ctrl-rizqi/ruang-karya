import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { 
    Edit, 
    Plus, 
    Search, 
    Trash2, 
    School,
    X,
    Save,
    ChevronRight
} from 'lucide-react';
import { useState, type ChangeEvent, type MouseEvent } from 'react';
import InputError from '@/components/input-error';

type Classroom = {
    id: number;
    name: string;
    created_at: string;
};

type Props = {
    classrooms: {
        data: Classroom[];
        links: any[];
    };
    filters: {
        search: string;
    };
    status?: string;
};

export default function ClassroomIndex({ classrooms, filters, status }: Props) {
    const [editingId, setEditingId] = useState<number | null>(null);
    
    const createForm = useForm({
        name: '',
    });

    const editForm = useForm({
        name: '',
    });

    const searchForm = useForm({
        search: filters.search ?? '',
    });

    const handleSearch = (e: ChangeEvent) => {
        e.preventDefault();
        searchForm.get('/dashboard/classrooms', {
            preserveState: true,
            replace: true,
        });
    };

    const handleCreate = (e: ChangeEvent) => {
        e.preventDefault();
        createForm.post('/dashboard/classrooms', {
            onSuccess: () => createForm.reset(),
        });
    };

    const startEditing = (classroom: Classroom) => {
        setEditingId(classroom.id);
        editForm.setData('name', classroom.name);
    };

    const cancelEditing = () => {
        setEditingId(null);
        editForm.reset();
    };

    const handleUpdate = (e: MouseEvent<HTMLButtonElement>, id: number) => {
        e.preventDefault();
        editForm.put(`/dashboard/classrooms/${id}`, {
            onSuccess: () => setEditingId(null),
        });
    };

    const handleDelete = (id: number, name: string) => {
        if (confirm(`Hapus kelas ${name}?`)) {
            router.delete(`/dashboard/classrooms/${id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Dashboard', href: '/dashboard' }, { title: 'Manajemen Kelas', href: '/dashboard/classrooms' }]}>
            <Head title="Manajemen Kelas" />

            <div className="p-6 max-w-5xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div>
                        <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-[0.2em] mb-2">
                            <School className="size-4" /> Academic Setup
                        </div>
                        <h1 className="text-3xl font-black tracking-tight">Manajemen Kelas</h1>
                        <p className="text-muted-foreground mt-1 text-sm font-medium">Tambah dan kelola daftar kelas untuk siswa.</p>
                    </div>
                </div>

                {status === 'classroom-created' && (
                    <div className="mb-6 p-4 rounded-xl bg-green-50 text-green-600 border border-green-100 text-sm font-bold uppercase tracking-widest animate-in fade-in">
                        Kelas berhasil ditambahkan!
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Create Form */}
                    <div className="lg:col-span-4">
                        <Card className="border-none shadow-sm bg-white dark:bg-[#161615] rounded-[2rem] sticky top-24">
                            <CardContent className="p-8">
                                <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                                    <Plus className="size-5 text-blue-600" /> Tambah Kelas
                                </h2>
                                <form onSubmit={handleCreate} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Nama Kelas</Label>
                                        <Input 
                                            id="name"
                                            placeholder="Contoh: X RPL 1"
                                            className="h-12 rounded-xl bg-gray-50/50 border-transparent focus:bg-white"
                                            value={createForm.data.name}
                                            onChange={e => createForm.setData('name', e.target.value)}
                                        />
                                        <InputError message={createForm.errors.name} />
                                    </div>
                                    <Button 
                                        disabled={createForm.processing}
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-12 shadow-lg shadow-blue-500/20 font-bold uppercase tracking-widest text-[10px]"
                                    >
                                        {createForm.processing ? 'Proses...' : 'Simpan Kelas'}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    {/* List */}
                    <div className="lg:col-span-8 space-y-6">
                        <div className="flex gap-2 mb-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                                <form onSubmit={handleSearch}>
                                    <Input 
                                        placeholder="Cari kelas..." 
                                        className="pl-10 h-11 rounded-xl bg-white dark:bg-[#161615] border-gray-100 dark:border-white/5"
                                        value={searchForm.data.search}
                                        onChange={e => searchForm.setData('search', e.target.value)}
                                    />
                                </form>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-[#161615] rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-sm overflow-hidden">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-gray-50 dark:border-white/5 bg-gray-50/30 dark:bg-white/5">
                                        <th className="px-8 py-5 text-left font-bold uppercase tracking-[0.2em] text-[10px] text-muted-foreground">Nama Kelas</th>
                                        <th className="px-8 py-5 text-right font-bold uppercase tracking-[0.2em] text-[10px] text-muted-foreground">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50 dark:divide-white/5">
                                    {classrooms.data.length === 0 ? (
                                        <tr>
                                            <td colSpan={2} className="px-8 py-12 text-center text-muted-foreground italic">Belum ada data kelas.</td>
                                        </tr>
                                    ) : (
                                        classrooms.data.map((classroom) => (
                                            <tr key={classroom.id} className="group hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors">
                                                <td className="px-8 py-4">
                                                    {editingId === classroom.id ? (
                                                        <div className="flex items-center gap-2">
                                                            <Input 
                                                                className="h-9 rounded-lg"
                                                                value={editForm.data.name}
                                                                onChange={e => editForm.setData('name', e.target.value)}
                                                                autoFocus
                                                            />
                                                            <InputError message={editForm.errors.name} />
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center gap-3">
                                                            <div className="size-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                                                                {classroom.name.charAt(0)}
                                                            </div>
                                                            <span className="font-bold">{classroom.name}</span>
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-8 py-4 text-right">
                                                    {editingId === classroom.id ? (
                                                        <div className="flex items-center justify-end gap-2">
                                                            <Button 
                                                                size="sm" 
                                                                className="h-8 rounded-lg bg-green-600 hover:bg-green-700"
                                                                onClick={(e) => handleUpdate(e, classroom.id)}
                                                                disabled={editForm.processing}
                                                            >
                                                                <Save className="size-3 mr-1" /> Save
                                                            </Button>
                                                            <Button 
                                                                size="sm" 
                                                                variant="ghost" 
                                                                className="h-8 rounded-lg"
                                                                onClick={cancelEditing}
                                                            >
                                                                <X className="size-3 mr-1" /> Batal
                                                            </Button>
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <Button 
                                                                size="icon" 
                                                                variant="ghost" 
                                                                className="size-8 rounded-lg hover:bg-blue-50 hover:text-blue-600"
                                                                onClick={() => startEditing(classroom)}
                                                            >
                                                                <Edit className="size-3.5" />
                                                            </Button>
                                                            <Button 
                                                                size="icon" 
                                                                variant="ghost" 
                                                                className="size-8 rounded-lg hover:bg-rose-50 hover:text-rose-600"
                                                                onClick={() => handleDelete(classroom.id, classroom.name)}
                                                            >
                                                                <Trash2 className="size-3.5" />
                                                            </Button>
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
