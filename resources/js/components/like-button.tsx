import { Link, router, usePage } from '@inertiajs/react';
import { Heart } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type LikeButtonProps = {
    karyaId: number;
    likesCount: number;
    isLiked: boolean;
    only?: string[];
    className?: string;
};

export function LikeButton({
    karyaId,
    likesCount,
    isLiked,
    only,
    className,
}: LikeButtonProps) {
    const [processing, setProcessing] = useState(false);
    const { auth } = usePage().props as {
        auth?: {
            user?: { id: number } | null;
        };
    };

    if (!auth?.user) {
        return (
            <Button
                asChild
                variant="outline"
                size="sm"
                className={cn('rounded-xl', className)}
            >
                <Link href="/login">
                    <Heart className="mr-2 size-4" /> {likesCount}
                </Link>
            </Button>
        );
    }

    const toggleLike = () => {
        if (processing) {
            return;
        }

        setProcessing(true);

        router.post(
            `/karya/${karyaId}/like`,
            {},
            {
                preserveScroll: true,
                only,
                onFinish: () => setProcessing(false),
            },
        );
    };

    return (
        <Button
            type="button"
            variant={isLiked ? 'default' : 'outline'}
            size="sm"
            onClick={toggleLike}
            disabled={processing}
            className={cn(
                'rounded-xl',
                isLiked &&
                    'border-rose-500 bg-rose-500 text-white hover:bg-rose-600',
                className,
            )}
        >
            <Heart className={cn('mr-2 size-4', isLiked && 'fill-current')} />
            {likesCount}
        </Button>
    );
}
