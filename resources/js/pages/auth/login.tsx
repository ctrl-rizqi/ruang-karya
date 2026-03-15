import { Form, Head, Link } from '@inertiajs/react';
import { UserRound, Lock, LogIn, ArrowRight } from 'lucide-react';
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
                                <Label
                                    htmlFor="nisn"
                                    className="ml-1 text-xs font-bold tracking-widest text-muted-foreground uppercase"
                                >
                                    Username / Nomor Identitas
                                </Label>
                                <div className="relative">
                                    <UserRound className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        id="nisn"
                                        type="text"
                                        name="nisn"
                                        required
                                        autoFocus
                                        autoComplete="username"
                                        placeholder="Contoh: 1234567890"
                                        className="h-12 rounded-xl border-gray-100 bg-white pl-10 transition-all focus:border-blue-600 dark:border-white/5 dark:bg-[#0a0a0a]"
                                    />
                                </div>
                                <InputError message={errors.nisn} />
                            </div>

                            <div className="space-y-2">
                                <div className="ml-1 flex items-center justify-between">
                                    <Label
                                        htmlFor="password"
                                        title="Password"
                                        className="text-xs font-bold tracking-widest text-muted-foreground uppercase"
                                    >
                                        Password
                                    </Label>
                                    {canResetPassword && (
                                        <TextLink
                                            href={request()}
                                            className="text-[10px] font-bold tracking-widest text-blue-600 uppercase hover:text-blue-700"
                                        >
                                            Lupa Password?
                                        </TextLink>
                                    )}
                                </div>
                                <div className="relative">
                                    <Lock className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        id="password"
                                        type="password"
                                        name="password"
                                        required
                                        autoComplete="current-password"
                                        placeholder="••••••••"
                                        className="h-12 rounded-xl border-gray-100 bg-white pl-10 transition-all focus:border-blue-600 dark:border-white/5 dark:bg-[#0a0a0a]"
                                    />
                                </div>
                                <InputError message={errors.password} />
                            </div>

                            <div className="ml-1 flex items-center space-x-3">
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    className="rounded-md border-gray-200 text-blue-600 focus:ring-blue-500/20"
                                />
                                <Label
                                    htmlFor="remember"
                                    className="cursor-pointer text-sm font-medium text-muted-foreground"
                                >
                                    Ingat saya di perangkat ini
                                </Label>
                            </div>

                            <Button
                                type="submit"
                                className="mt-2 h-12 w-full rounded-xl bg-blue-600 text-xs font-bold tracking-widest text-white uppercase shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02] hover:bg-blue-700 active:scale-[0.98]"
                                disabled={processing}
                                data-test="login-button"
                            >
                                {processing ? (
                                    <Spinner className="mr-2" />
                                ) : (
                                    <LogIn className="mr-2 size-4" />
                                )}
                                Masuk Sekarang
                            </Button>
                        </div>

                        {canRegister && (
                            <div className="pt-2 text-center text-sm font-medium text-muted-foreground">
                                Belum punya akun?{' '}
                                <Link
                                    href={register()}
                                    className="group mt-2 flex items-center justify-center gap-1 font-bold text-blue-600 hover:text-blue-700"
                                >
                                    Daftar Siswa Baru{' '}
                                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </div>
                        )}
                    </>
                )}
            </Form>

            {status && (
                <div className="mt-6 rounded-xl border border-green-100 bg-green-50 p-4 text-center text-sm font-bold text-green-600 dark:border-green-900/30 dark:bg-green-900/20">
                    {status}
                </div>
            )}
        </AuthLayout>
    );
}
