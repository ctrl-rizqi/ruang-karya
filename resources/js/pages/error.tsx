import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface Props {
    status: number;
}

export default function ErrorPage({ status }: Props) {
    const title = {
        503: '503: Service Unavailable',
        500: '500: Server Error',
        404: '404: Page Not Found',
        403: '403: Akses Ditolak',
    }[status];

    const description = {
        503: 'Maaf, sedang ada pemeliharaan. Silakan coba lagi nanti.',
        500: 'Aduh, terjadi kesalahan pada server kami.',
        404: 'Maaf, halaman yang Anda cari tidak dapat ditemukan.',
        403: 'Maaf, Anda tidak memiliki izin untuk mengakses halaman ini.',
    }[status];

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
            <Head title={title || 'Error'} />

            <div className="mx-auto max-w-md text-center px-4">
                <div className="mb-8 flex justify-center">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400">
                        {status === 403 ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinelinejoin="round">
                                <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                            </svg>
                        ) : status === 404 ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinelinejoin="round">
                                <circle cx="12" cy="12" r="10"/>
                                <path d="M16 16s-1.5-2-4-2-4 2-4 2"/>
                                <line x1="9" x2="9.01" y1="9" y2="9"/>
                                <line x1="15" x2="15.01" y1="9" y2="9"/>
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinelinejoin="round">
                                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
                                <line x1="12" x2="12" y1="9" y2="13"/>
                                <line x1="12" x2="12.01" y1="17" y2="17"/>
                            </svg>
                        )}
                    </div>
                </div>

                <h1 className="mb-2 text-4xl font-bold tracking-tight">{title}</h1>
                <p className="mb-8 text-lg text-gray-500 dark:text-gray-400">
                    {description}
                </p>

                <Button asChild size="lg">
                    <a href="/">Kembali ke Beranda</a>
                </Button>
            </div>
        </div>
    );
}
