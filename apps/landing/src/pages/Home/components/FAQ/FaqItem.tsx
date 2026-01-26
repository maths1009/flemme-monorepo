import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { FaqQuestion } from './FAQSection';

function FaqItem({ item, isOpen, onToggle }: { item: FaqQuestion; isOpen: boolean; onToggle: () => void }) {
  return (
    <motion.div
      className={cn(
        'group overflow-hidden rounded-xl border-2 border-black bg-service-bg-pink shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all',
        isOpen
          ? 'shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] translate-x-[2px] translate-y-[2px]'
          : 'hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]',
      )}
      initial={false}
    >
      <button className="flex w-full items-center justify-between p-6 text-left" onClick={onToggle} type="button">
        <span className="text-xl text-black/80 group-hover:text-black">{item.question}</span>
        <ChevronDown className={cn('h-6 w-6 text-black transition-transform duration-300', isOpen && 'rotate-180')} />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            animate="open"
            exit="collapsed"
            initial="collapsed"
            key="content"
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
            variants={{
              collapsed: { height: 0, opacity: 0 },
              open: { height: 'auto', opacity: 1 },
            }}
          >
            <div className="px-6 pb-6 pt-0">
              <div className="h-px w-full bg-black/10 mb-4" />
              <p className="text-lg font-medium leading-relaxed text-black/80">{item.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export { FaqItem };
