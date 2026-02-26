import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

interface HeaderProps {
    title: string;
    onBack?: () => void;
    className?: string;
    sticky?: boolean;
    variant?: 'default' | 'search';
}

export function Header({ title, onBack, className, sticky = false, variant = 'default' }: HeaderProps) {
    const router = useRouter();

    const handleBack = () => {
        if (onBack) {
            onBack();
        } else {
            router.back();
        }
    };

    const isSearch = variant === 'search';

    return (
        <div className={cn(
            "relative flex items-center w-full px-6 py-4",
            isSearch ? "bg-transparent" : "border-b border-gray-100 bg-white",
            sticky && "sticky top-0 z-10",
            className
        )}>
            <button onClick={handleBack} className={cn(
                "z-10 p-2 -ml-2 rounded-full transition-colors",
                isSearch ? "hover:bg-white hover:bg-opacity-10 text-[#1A1A1A]" : "text-[#1A1A1A]"
            )}>
                <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <h1 className={cn(
                    "text-xl font-bold",
                    isSearch ? "text-[#1A1A1A]" : "text-[#1A1A1A]"
                )}>{title}</h1>
            </div>
        </div>
    );
}
