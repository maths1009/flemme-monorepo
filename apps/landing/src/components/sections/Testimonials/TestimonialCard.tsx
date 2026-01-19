import { Card, CardContent, CardFooter, CardHeader } from '../../ui/Card';

interface TestimonialCardProps {
  author: string;
  role?: string;
  quote: string;
  avatarSrc?: string;
}

export function TestimonialCard({ author, quote, role }: TestimonialCardProps) {
  return (
    <Card className="h-full transition-transform hover:-translate-y-1 hover:shadow-[3px_5px_0px_#000]">
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-black bg-gray-100">
            {/* Avatar placeholder */}
            <div className="h-full w-full bg-slate-200" />
          </div>
          <div>
            <p className="text-sm font-bold text-black">{author}</p>
            {role && <p className="text-xs text-black/60">{role}</p>}
          </div>
        </div>
        <span className="text-4xl font-serif leading-none text-black/20">"</span>
      </CardHeader>
      <CardContent>
        <p className="text-base leading-relaxed text-black/80">{quote}</p>
      </CardContent>
    </Card>
  );
}
