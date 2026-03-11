import { Form, Head, Link } from '@inertiajs/react';
import { Mail, Lock, LogIn, ArrowRight } from 'lucide-react';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';

type Props = {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
};

export default function Login({
    status,
    canResetPassword,
    canRegister,
}: Props) {
    return (
        <AuthLayout
            title="Selamat Datang Kembali!"
            description="Masuk ke akun Ruang Karya Anda untuk melanjutkan petualangan kreatif."
        >
            <Head title="Log in" />

            <Form
                {...store.form()}
                resetOnSuccess={['password']}
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-5">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Email Address</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="email"
                                        placeholder="nama@sekolah.sch.id"
                                        className="pl-10 h-12 rounded-xl bg-white dark:bg-[#0a0a0a] border-gray-100 dark:border-white/5 focus:border-blue-600 transition-all"
                                        
                                    />
                                </div>
                                <InputError message={errors.email} />
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between ml-1">
                                    <Label htmlFor="password" title="Password" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Password</Label>
                                    {canResetPassword && (
                                        <TextLink
                                            href={request()}
                                            className="text-[10px] font-bold uppercase tracking-widest text-blue-600 hover:text-blue-700"
                                            tabIndex={5}
                                        >
                                            Lupa Password?
                                        </TextLink>
                                    )}
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                                    <Input
                                        id="password"
                                        type="password"
                                        name="password"
                                        required
                                        tabIndex={2}
                                        autoComplete="current-password"
                                        placeholder="••••••••"
                                        className="pl-10 h-12 rounded-xl bg-white dark:bg-[#0a0a0a] border-gray-100 dark:border-white/5 focus:border-blue-600 transition-all"
                                        
                                    />
                                </div>
                                <InputError message={errors.password} />
                            </div>

                            <div className="flex items-center space-x-3 ml-1">
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    tabIndex={3}
                                    className="rounded-md border-gray-200 text-blue-600 focus:ring-blue-500/20"
                                />
                                <Label htmlFor="remember" className="text-sm font-medium text-muted-foreground cursor-pointer">Ingat saya di perangkat ini</Label>
                            </div>

                            <Button
                                type="submit"
                                className="mt-2 w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold uppercase tracking-widest text-xs shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                                tabIndex={4}
                                disabled={processing}
                                data-test="login-button"
                            >
                                {processing ? <Spinner className="mr-2" /> : <LogIn className="mr-2 size-4" />}
                                Masuk Sekarang
                            </Button>
                        </div>

                        {canRegister && (
                            <div className="text-center text-sm font-medium text-muted-foreground pt-2">
                                Belum punya akun?{' '}
                                <Link 
                                    href={register()} 
                                    className="text-blue-600 hover:text-blue-700 font-bold flex items-center justify-center gap-1 mt-2 group"
                                >
                                    Daftar Siswa Baru <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </div>
                        )}
                    </>
                )}
            </Form>

            {status && (
                <div className="mt-6 p-4 rounded-xl bg-green-50 dark:bg-green-900/20 text-center text-sm font-bold text-green-600 border border-green-100 dark:border-green-900/30">
                    {status}
                </div>
            )}
        </AuthLayout>
    );
}
