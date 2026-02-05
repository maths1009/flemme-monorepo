import { motion } from 'framer-motion';

import { Container } from '@/components/Container';
import type { User } from '@/data/users';
import { OrgChart } from './components/OrgChart';

interface TeamPageProps {
  users: User[];
}

function TeamPage({ users }: TeamPageProps) {
  return (
    <article className="min-h-screen overflow-x-hidden bg-brand-bg pb-24 pt-24 md:pt-32">
      {/* Hero Section */}
      <Container className="mb-16 text-center md:mb-24" size="default">
        <motion.span
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 inline-block rounded-full bg-brand-yellow px-4 py-2 text-xs font-bold uppercase tracking-widest text-brand-black"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          Notre équipe
        </motion.span>

        <motion.h1
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 font-serif text-5xl font-black leading-tight text-brand-black md:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 30 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          Les visages de la{' '}
          <span className="relative inline-block">
            <span className="relative z-10">flemme</span>
            <motion.span
              animate={{ scaleX: 1 }}
              className="absolute bottom-0 left-0 h-3 w-full origin-left bg-brand-yellow md:h-4"
              initial={{ scaleX: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            />
          </span>
        </motion.h1>

        <motion.p
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-2xl text-lg font-medium text-slate-600 md:text-xl"
          initial={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Découvrez les cerveaux (parfois paresseux) qui travaillent à révolutionner votre quotidien.
        </motion.p>
      </Container>

      {/* Org Chart Section */}
      <Container size="wide">
        <OrgChart users={users} />
      </Container>

      {/* Bottom CTA */}
      <Container className="mt-24 text-center" size="narrow">
        <motion.div
          className="rounded-3xl border-2 border-dashed border-brand-yellow bg-white p-8 md:p-12"
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h2 className="mb-4 font-serif text-3xl font-black text-brand-black md:text-4xl">
            Envie de rejoindre l'aventure ?
          </h2>
          <p className="text-slate-600">
            On cherche toujours des talents passionnés (et un peu flemards sur les bords).
          </p>
        </motion.div>
      </Container>
    </article>
  );
}

export { TeamPage };
