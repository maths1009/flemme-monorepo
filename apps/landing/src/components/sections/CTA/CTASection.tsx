import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-black px-4 py-20 text-white">
      {/* Checkerboard Pattern Background - Using Tailwind arbitrary values for complex gradient bg */}
      <div
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
              linear-gradient(45deg, #fff 25%, transparent 25%),
              linear-gradient(-45deg, #fff 25%, transparent 25%),
              linear-gradient(45deg, transparent 75%, #fff 75%),
              linear-gradient(-45deg, transparent 75%, #fff 75%)
            `,
          backgroundPosition: '0 0, 0 30px, 30px -30px, -30px 0px',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center gap-8 text-center">
        <h2 className="text-4xl font-black uppercase italic tracking-tighter md:text-6xl text-white">
          Prêt à ne rien faire ?
        </h2>
        <p className="text-lg font-medium text-white/80 md:text-xl">
          Inscrivez-vous pour être prévenu du lancement et recevoir un bonus de départ.
        </p>

        <form className="flex w-full max-w-md flex-col gap-4 md:flex-row">
          <Input
            className="border-white bg-black text-white px-4 placeholder:text-white/50 focus:border-brand-yellow focus:ring-brand-yellow"
            placeholder="votre@email.com"
          />
          <Button className="w-full md:w-auto whitespace-nowrap" variant="cta">
            Je m'inscris
          </Button>
        </form>

        <div className="mt-8 flex flex-col items-center gap-4">
          <span className="text-sm font-bold uppercase tracking-widest text-white/60">Bientôt disponible sur</span>
          <div className="flex gap-4">
            <div className="h-10 w-32 rounded-lg border border-white/20 bg-white/10" />
            <div className="h-10 w-32 rounded-lg border border-white/20 bg-white/10" />
          </div>
        </div>
      </div>
    </section>
  );
}
