import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useAnalytics } from '@/providers/AnalyticsProvider';
import { Button } from './Button';

export function CookieBanner() {
  const { consent, isLoading, grantConsent, denyConsent } = useAnalytics();
  const [isFalling, setIsFalling] = useState(false);

  // Show only when loading is done AND consent is not yet given/refused
  const show = !isLoading && consent === null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="fixed bottom-4 right-4 z-50 mx-4 w-full max-w-sm md:bottom-8 md:right-8"
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ bounce: 0.4, duration: 0.4, type: 'spring' }}
        >
          <motion.div
            animate={isFalling ? 'falling' : 'idle'}
            className="absolute -top-16 -right-6 z-[-1] h-28 w-28 cursor-pointer"
            initial="idle"
            onClick={() => setIsFalling(true)}
            variants={{
              falling: { opacity: 0, rotate: 120, transition: { duration: 0.6, ease: 'easeIn' }, y: 200 },
              hover: { rotate: [12, -5, 12, 5, 12], scale: 1.1, transition: { duration: 0.4 } },
              idle: { opacity: 1, rotate: 12, transition: { stiffness: 300, type: 'spring' }, y: 0 },
            }}
            whileHover={!isFalling ? 'hover' : undefined}
          >
            <img alt="Cookie Mascot" className="h-full w-full object-contain" src="/mascot-5.svg" />
          </motion.div>

          <div className="relative overflow-hidden rounded-xl border-2 border-black bg-white p-6 shadow-[4px_4px_0px_#000]">
            <h2 className="mb-2 text-lg font-bold text-black">On respecte ta vie privée</h2>
            <p className="mb-6 text-sm font-medium text-gray-600">
              Nous utilisons des cookies pour analyser notre trafic et améliorer ton expérience. T'es chaud ?
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button className="flex-1" onClick={denyConsent} variant="ghost">
                Pas chaud
              </Button>
              <Button className="flex-1" onClick={grantConsent} variant="primary">
                C'est parti
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
