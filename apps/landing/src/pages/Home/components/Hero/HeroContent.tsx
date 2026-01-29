import { motion } from 'framer-motion';

export function HeroContent() {
  return (
    <div className="relative z-20 flex h-full w-full flex-col items-center justify-end pb-[40px]">
      <div className="inline-flex flex-col items-start leading-none">
        <motion.h2
          animate={{ opacity: 1, y: 0 }}
          className="font-serif text-[clamp(3rem,8vw,8rem)] italic text-black translate-x-1"
          initial={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          T'as
        </motion.h2>
        <motion.h1
          animate={{ opacity: 1, scaleY: 1.1, y: 0 }}
          className="text-[clamp(3.5rem,14vw,24rem)] font-black uppercase leading-[0.8] tracking-tighter text-black origin-bottom text-left"
          initial={{ opacity: 0, scaleY: 1.5, y: 100 }}
          transition={{
            damping: 20,
            delay: 0.4,
            duration: 1,
            stiffness: 100,
            type: 'spring',
          }}
        >
          LA FLEMME ?
        </motion.h1>
      </div>

      <motion.img
        alt="Mascotte Flemme"
        className="absolute bottom-[-10%] left-1/2 -z-10 h-[50vh] w-[80vw] -translate-x-1/2 origin-bottom object-contain object-bottom md:h-[75vh] md:w-[75vh] lg:h-[85vh] lg:w-[85vh]"
        loading="eager"
        src="/mascot-2.svg"
        whileInView={{
          transition: {
            delay: 1.3,
            duration: 6,
            ease: 'easeInOut',
            repeat: Infinity,
          },
          y: [0, -20, 0],
        }}
      />
    </div>
  );
}
