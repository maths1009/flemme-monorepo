import { cx } from 'class-variance-authority';
import * as React from 'react';

// Simple Accordion Context to manage basic state if needed,
// but for now we'll rely on props or just simple toggles if we want to keep it extremely lightweight.
// To follow standard accessible accordion patterns, usually using Radix UI is best,
// but since the prompt asked for "less code possible" and "optimized", we will build a simple accessible custom one.
// Or we can assume we are just styling divs. Let's make it interactive.

interface AccordionContextValue {
  openItem: string | null;
  setOpenItem: (value: string | null) => void;
}

const AccordionContext = React.createContext<AccordionContextValue | null>(null);

const Accordion = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    const [openItem, setOpenItem] = React.useState<string | null>(null);

    return (
      <AccordionContext.Provider value={{ openItem, setOpenItem }}>
        <div className={cx('flex flex-col gap-4', className)} ref={ref} {...props}>
          {children}
        </div>
      </AccordionContext.Provider>
    );
  },
);
Accordion.displayName = 'Accordion';

interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ className, value, children, ...props }, ref) => (
    <div
      className={cx('overflow-hidden rounded-2xl border-2 border-black bg-white shadow-[2px_4px_0px_#000]', className)}
      data-value={value}
      ref={ref}
      {...props}
    >
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, { value });
        }
        return child;
      })}
    </div>
  ),
);
AccordionItem.displayName = 'AccordionItem';

interface AccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value?: string;
}

const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ className, children, value, onClick, ...props }, ref) => {
    const context = React.useContext(AccordionContext);
    if (!context) throw new Error('AccordionTrigger must be used within Accordion');

    const isOpen = context.openItem === value;

    return (
      <button
        className={cx(
          'flex flex-1 items-center justify-between py-4 font-medium transition-all hover:bg-black/5 [&[data-state=open]>svg]:rotate-180 w-full px-6 text-left text-base',
          className,
        )}
        data-state={isOpen ? 'open' : 'closed'}
        onClick={e => {
          context.setOpenItem(isOpen ? null : value!);
          onClick?.(e);
        }}
        ref={ref}
        {...props}
      >
        {children}
        <svg
          className="h-6 w-6 shrink-0 transition-transform duration-200"
          fill="none"
          height="24"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
    );
  },
);
AccordionTrigger.displayName = 'AccordionTrigger';

interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
}

const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ className, children, value, ...props }, ref) => {
    const context = React.useContext(AccordionContext);
    if (!context) throw new Error('AccordionContent must be used within Accordion');

    const isOpen = context.openItem === value;

    if (!isOpen) return null;

    return (
      <div className={cx('overflow-hidden text-sm transition-all animate-slide-down', className)} ref={ref} {...props}>
        <div className="pb-4 pt-0 px-6 text-base text-black/70">{children}</div>
      </div>
    );
  },
);
AccordionContent.displayName = 'AccordionContent';

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
