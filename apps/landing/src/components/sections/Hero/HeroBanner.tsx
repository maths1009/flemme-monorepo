import { motion } from 'framer-motion';

export function HeroBanner() {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="relative z-30 flex w-full flex-col items-center justify-between border-t-[3px] border-black bg-brand-yellow px-4 py-3 md:flex-row md:px-8"
      initial={{ opacity: 0, y: 100 }}
      transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
    >
      <div className="hidden items-center gap-2 md:flex">
        <div className="flex -space-x-1">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-black bg-white">
            <div className="h-3 w-3 translate-x-1 rounded-full bg-black" />
          </div>
          <div className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-black bg-white">
            <div className="h-3 w-3 translate-x-1 rounded-full bg-black" />
            <div className="absolute top-0 h-1/2 w-full rounded-t-full border-b-2 border-black bg-brand-yellow" />
          </div>
        </div>
      </div>

      <p className="text-center text-xs font-bold uppercase tracking-wider text-black md:text-base">
        ON S'OCCUPE DE TOUT, MÊME DE TA GRAND MÈRE
      </p>

      <div className="hidden items-center gap-4 md:flex">
        <SocialIcon icon="tiktok" />
        <SocialIcon icon="instagram" />
        <SocialIcon icon="linkedin" />
      </div>
    </motion.div>
  );
}

function SocialIcon({ icon }: { icon: 'tiktok' | 'instagram' | 'linkedin' }) {
  return (
    <a className="flex h-8 w-8 items-center justify-center transition-transform hover:-translate-y-1" href="/">
      {icon === 'tiktok' && (
        <svg
          aria-label="TikTok"
          className="h-6 w-6 text-black"
          fill="none"
          role="img"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
        </svg>
      )}
      {icon === 'instagram' && (
        <svg
          aria-label="Instagram"
          className="h-6 w-6 text-black"
          fill="none"
          role="img"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <rect height="20" rx="5" ry="5" width="20" x="2" y="2" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      )}
      {icon === 'linkedin' && (
        <svg
          aria-label="LinkedIn"
          className="h-6 w-6 text-black"
          fill="none"
          role="img"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect height="12" width="4" x="2" y="9" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      )}
    </a>
  );
}
