import { Link } from '@inertiajs/react';
import { School, Sparkles } from 'lucide-react';
import type { AuthLayoutProps } from '@/types';

export default function AuthSplitLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <div className="relative grid min-h-screen flex-col items-center justify-center px-8 sm:px-0 lg:max-w-none lg:grid-cols-2 lg:px-0 bg-[#FDFDFC] dark:bg-[#050505]">
            {/* Left Side: Visual/Branding */}
            <div className="relative hidden h-full flex-col bg-muted p-12 text-white lg:flex overflow-hidden">
                {/* Vibrant Gradient Background */}
                <div className="absolute inset-0 bg-[#003366]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-from),transparent_50%)] from-blue-400/20" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,var(--tw-gradient-from),transparent_50%)] from-indigo-500/30" />
                
                {/* Decorative Elements */}
                <svg className="absolute top-0 right-0 w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0 100 C 20 0, 50 0, 100 100 Z" fill="white" fillOpacity="0.1" />
                </svg>

                <div className="relative z-20 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#003366] shadow-xl">
                        <School className="size-6" />
                    </div>
                    <span className="text-xl font-black tracking-tight uppercase">Ruang Karya</span>
                </div>

                <div className="relative z-20 mt-auto">
                    <div className="flex items-center gap-2 text-blue-300 font-bold text-xs uppercase tracking-[0.2em] mb-6">
                        <Sparkles className="size-4" /> Student Excellence
                    </div>
                    <blockquote className="space-y-4">
                        <p className="text-4xl font-serif italic leading-tight text-white/90">
                            &ldquo;Tempat di mana setiap inspirasi menemukan bentuknya, dan setiap bakat menemukan panggungnya.&rdquo;
                        </p>
                        <footer className="flex items-center gap-3">
                            <div className="h-px w-8 bg-blue-400/50" />
                            <div className="text-sm font-medium text-blue-200">GamadiBramanta</div>
                        </footer>
                    </blockquote>
                </div>

                {/* Bottom decorative bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-blue-400 via-indigo-500 to-purple-500" />
            </div>

            {/* Right Side: Form */}
            <div className="w-full lg:p-8 flex items-center justify-center">
                <div className="mx-auto flex w-full flex-col justify-center space-y-8 sm:w-100">
                    <div className="flex flex-col items-center gap-4 lg:hidden mb-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#003366] text-white shadow-lg shadow-blue-500/20">
                            <School className="size-7" />
                        </div>
                        <h2 className="text-xl font-black tracking-tight uppercase text-[#003366]">Ruang Karya</h2>
                    </div>

                    <div className="flex flex-col gap-2 text-left sm:text-center">
                        <h1 className="text-3xl font-black tracking-tight text-[#1b1b18] dark:text-[#EDEDEC]">{title}</h1>
                        <p className="text-muted-foreground font-medium">
                            {description}
                        </p>
                    </div>

                    <div className="bg-white dark:bg-[#161615] p-2 rounded-[2.5rem]">
                        <div className="bg-gray-50/50 dark:bg-white/5 p-8 rounded-4xl border border-gray-100 dark:border-white/5">
                            {children}
                        </div>
                    </div>

                    <p className="px-8 text-center text-xs text-muted-foreground leading-relaxed">
                        Dengan melanjutkan, Anda menyetujui <br />
                        <Link href="#" className="underline underline-offset-4 hover:text-blue-600 font-bold transition-colors">Syarat & Ketentuan</Link> Ruang Karya.
                    </p>
                </div>
            </div>
        </div>
    );
}
