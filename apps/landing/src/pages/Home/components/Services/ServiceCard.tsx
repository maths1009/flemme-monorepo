import { createContext } from '@radix-ui/react-context';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type ThemeColor = 'green' | 'blue' | 'pink';

interface ServiceCardContextType {
  theme: ThemeColor;
}

const [ServiceCardContextProvider, useServiceCardContext] = createContext<ServiceCardContextType>('ServiceCardContext');

interface ServiceCardProps {
  children: ReactNode;
  theme: ThemeColor;
  className?: string;
}

function ServiceCard({ children, theme, className }: ServiceCardProps) {
  return (
    <ServiceCardContextProvider theme={theme}>
      <div className={cn('w-full overflow-hidden', className)}>
        <motion.div
          className="grid w-full grid-cols-1 md:grid-cols-2"
          initial={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          viewport={{ margin: '-100px', once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          {children}
        </motion.div>
      </div>
    </ServiceCardContextProvider>
  );
}

//######################
// Visual
//######################

interface VisualProps {
  children: ReactNode;
  className?: string;
}

const VisualNAME = 'ServiceCardVisual';

function Visual({ children, className }: VisualProps) {
  const context = useServiceCardContext(VisualNAME);

  const bgColors = {
    blue: 'bg-service-blue',
    green: 'bg-service-green',
    pink: 'bg-service-pink',
  };

  return (
    <div
      className={cn(
        'relative hidden h-[300px] w-full flex-1 items-end justify-center md:flex md:h-auto',
        bgColors[context.theme],
        className,
      )}
    >
      <motion.div
        className="relative z-10 flex h-full w-full items-end justify-center [&>img]:absolute [&>img]:-bottom-[15%] [&>img]:h-[85%] [&>img]:w-auto [&>img]:object-contain"
        whileHover={{ rotate: 2, scale: 1.05 }}
      >
        {children}
      </motion.div>
    </div>
  );
}

Visual.displayName = VisualNAME;
ServiceCard.Visual = Visual;

//######################
// Content
//######################

interface ContentProps {
  label?: string;
  title: string;
  description: string;
  className?: string;
}

const ContentNAME = 'ServiceCardContent';

function Content({ label, title, description, className }: ContentProps) {
  const context = useServiceCardContext(ContentNAME);

  const bgColors = {
    blue: 'bg-service-bg-blue',
    green: 'bg-service-bg-green',
    pink: 'bg-service-bg-pink',
  };

  return (
    <div className={cn('flex flex-1 flex-col justify-center p-8 md:p-16', bgColors[context.theme], className)}>
      {label && <span className="mb-4 text-xs font-bold uppercase tracking-widest text-black/60">{label}</span>}
      <h2 className="mb-6 font-serif text-4xl font-black leading-tight text-brand-black md:text-5xl lg:text-6xl">
        {title}
      </h2>
      <p className="max-w-md text-lg font-medium leading-relaxed text-brand-black/90">{description}</p>
    </div>
  );
}

Content.displayName = ContentNAME;
ServiceCard.Content = Content;

export { ServiceCard };
