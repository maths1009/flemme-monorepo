import { motion } from 'framer-motion';

export function HeroBanner() {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="relative z-30 flex w-full flex-col items-center justify-between border-t-[3px] border-black bg-brand-yellow px-4 py-3 md:flex-row md:px-8"
      initial={{ opacity: 0, y: 100 }}
      transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
    >
      <img alt="double eyes" className="hidden md:block" height="80" src="/double-eyes.svg" width="120" />
      <p className="text-center text-xs font-bold uppercase tracking-wider text-black md:text-base">
        ON S'OCCUPE DE TOUT, MÊME DE TA GRAND MÈRE
      </p>

      <div className="flex items-center gap-2 md:gap-4">
        <motion.svg
          aria-label="TikTok"
          className="h-5 w-5 cursor-pointer text-black md:h-6 md:w-6"
          fill="none"
          onClick={() => window.open('https://www.tiktok.com/@flemmeapp', '_blank')}
          role="img"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          whileHover={{ rotate: 5, scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
        </motion.svg>
        <motion.svg
          aria-label="Instagram"
          className="h-5 w-5 cursor-pointer text-black md:h-6 md:w-6"
          fill="none"
          onClick={() => window.open('https://www.instagram.com/flemmeapp/', '_blank')}
          role="img"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          whileHover={{ rotate: -5, scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <rect height="20" rx="5" ry="5" width="20" x="2" y="2" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </motion.svg>
        <motion.svg
          aria-label="LinkedIn"
          className="h-5 w-5 cursor-pointer text-black md:h-6 md:w-6"
          fill="none"
          onClick={() => window.open('https://www.linkedin.com/company/flemme/about/', '_blank')}
          role="img"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          whileHover={{ rotate: 5, scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect height="12" width="4" x="2" y="9" />
          <circle cx="4" cy="4" r="2" />
        </motion.svg>
      </div>
    </motion.div>
  );
}
