import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

interface HeaderProps {
    title: string;
    onBack?: () => void;
    className?: string;
    sticky?: boolean;
}

export function Header({ title, onBack, className, sticky = false }: HeaderProps) {
    const router = useRouter();

    const handleBack = () => {
        if (onBack) {
            onBack();
        } else {
            router.back();
        }
    };

    return (
        <div className={cn(
            "relative flex items-center w-full px-6 py-4 border-b border-gray-100 bg-white",
            sticky && "sticky top-0 z-10",
            className
        )}>
            <button onClick={handleBack} className="z-10 p-2 -ml-2">
                <ArrowLeft className="w-6 h-6 text-[#1A1A1A]" />
            </button>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <h1 className="text-xl font-bold text-[#1A1A1A]">{title}</h1>
            </div>
        </div>
    );
}
