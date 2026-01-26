import { Link } from '@tanstack/react-router';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/Button';

export function Header() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, 'change', latest => {
    setIsScrolled(latest > 20);
  });

  return (
    <motion.header
      animate={{
        backdropFilter: isScrolled ? 'blur(12px)' : 'blur(0px)',
        backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0)',
        borderBottom: isScrolled ? '2px solid black' : '0px solid transparent',
        paddingBottom: isScrolled ? '1rem' : '1.5rem',
        paddingTop: isScrolled ? '1rem' : '1.5rem',
      }}
      className="fixed top-0 z-[100] flex w-full max-w-[1400px] items-center justify-between px-4 py-6 md:px-8"
      initial={false}
    >
      <Link className="text-2xl font-black uppercase tracking-tighter text-black no-underline md:text-3xl" to="/">
        FLEMME
      </Link>
      <div className="flex items-center gap-4 md:gap-8">
        <Link
          className="text-xs font-bold uppercase tracking-wide text-black hover:underline md:text-sm"
          hash="faq"
          onClick={() => {
            const element = document.getElementById('faq');
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          to="/"
        >
          FAQ
        </Link>
        <Button variant="primary">INSCRIS TOI</Button>
      </div>
    </motion.header>
  );
}
