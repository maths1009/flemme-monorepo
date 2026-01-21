import { Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';

function NotFound() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-brand-yellow p-4 text-black">
      <div className="absolute inset-0 z-0 flex flex-col justify-between opacity-10">
        {[...Array(5)].map((_, i) => (
          <motion.div
            animate={{ x: [0, -1000] }}
            className="whitespace-nowrap text-9xl font-black uppercase"
            // biome-ignore lint/suspicious/noArrayIndexKey: simple decorative list
            key={i}
            style={{ marginLeft: i % 2 === 0 ? -100 : 0 }}
            transition={{
              duration: 20 + i * 5,
              ease: 'linear',
              repeat: Number.POSITIVE_INFINITY,
            }}
          >
            FLEMME DE CHARGER — ERROR 404 — JE DORS — REVINS PLUS TARD — FLEMME DE CHARGER — ERROR 404 — JE DORS —
            REVINS PLUS TARD
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 mb-8">
        <motion.img
          animate={{
            rotate: [0, -10, 10, 0],
            y: [0, -30, 0],
          }}
          className="h-40 w-40 md:h-56 md:w-56"
          src="/mascot-1.svg"
          transition={{
            duration: 3,
            ease: 'easeInOut',
            repeat: Number.POSITIVE_INFINITY,
          }}
        />
      </div>

      <h1 className="relative z-10 text-9xl font-black">404</h1>

      <motion.p
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 mt-4 text-center text-xl font-bold uppercase tracking-wider md:text-2xl"
        initial={{ opacity: 0, y: 20 }}
        transition={{ delay: 0.2 }}
      >
        Oups... La page a la flemme
      </motion.p>

      <motion.p
        animate={{ opacity: 1 }}
        className="relative z-10 mt-2 text-center text-sm font-medium md:text-base"
        initial={{ opacity: 0 }}
        transition={{ delay: 0.4 }}
      >
        Elle devait être là, mais elle est restée au lit. <br />
        Comme toi visiblement.
      </motion.p>

      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 mt-8"
        initial={{ opacity: 0, y: 20 }}
        transition={{ delay: 0.6 }}
      >
        <Link to="/">
          <Button variant="default">Retourner ne rien faire</Button>
        </Link>
      </motion.div>
    </div>
  );
}

export { NotFound };
