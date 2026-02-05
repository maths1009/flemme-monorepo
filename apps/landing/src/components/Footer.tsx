import { toast } from 'sonner';
import { Button } from '@/components/Button';
import { TextField } from '@/components/TextField';

interface StoreButton {
  icon: React.ReactNode;
  label: string;
}

function StoreButton({ icon, label }: StoreButton) {
  return (
    <button
      className="flex items-center gap-3 rounded-xl border border-white/20 bg-black/40 px-6 py-3 text-left transition-all hover:bg-black/60 hover:scale-105 active:scale-95"
      type="button"
    >
      <div className="h-8 w-8 flex-shrink-0 [&>img]:h-full [&>img]:w-full [&>img]:object-contain">{icon}</div>
      <div className="flex flex-col leading-none">
        <span className="text-[10px] uppercase text-white/60">Download on the</span>
        <span className="text-lg font-bold text-white">{label}</span>
      </div>
    </button>
  );
}

function Footer() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const isEmail = email?.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    if (isEmail) {
      toast.info("C'est fait.", {
        description: 'Tu es inscrit ! Bienvenue dans le club des pros de la détente !',
      });
      e.currentTarget.reset();
    } else {
      toast.error('Email invalide');
    }
  };

  return (
    <footer className="relative w-full overflow-hidden bg-[#1a1a1a] py-18 text-white">
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
                linear-gradient(45deg, #000 25%, transparent 25%), 
                linear-gradient(-45deg, #000 25%, transparent 25%), 
                linear-gradient(45deg, transparent 75%, #000 75%), 
                linear-gradient(-45deg, transparent 75%, #000 75%)
            `,
          backgroundPosition: '0 0, 0 30px, 30px -30px, -30px 0px',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 font-serif text-5xl font-black leading-tight md:text-7xl">
            Prêt à dire adieu aux <br />
            <span className="text-white">corvées ?</span>
          </h2>
          <p className="mb-12 text-xl font-medium text-white/80">Rejoignez le club des pros de la détente !</p>

          <form
            className="mx-auto mb-16 flex max-w-md flex-col items-stretch gap-4 md:flex-row"
            onSubmit={handleSubmit}
          >
            <TextField className="h-auto">
              <TextField.Input name="email" placeholder="TON EMAIL" required type="email" />
            </TextField>
            <Button className="uppercase h-auto" size="lg" type="submit" variant="cta">
              Inscris toi
            </Button>
          </form>

          <div className="mb-24 flex flex-col items-center justify-center gap-2">
            <span className="text-sm font-bold uppercase tracking-widest text-white/50">Coming soon...</span>
            <div className="flex flex-wrap justify-center gap-4">
              <StoreButton icon={<img alt="apple icon" src="/apple.svg" />} label="App Store" />
              <StoreButton icon={<img alt="google icon" src="/google.svg" />} label="Google Play" />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 border-t border-white/10 pt-8 text-sm font-bold text-white/40 md:justify-end md:gap-8">
          <a className="hover:text-white transition-colors" href="/team">
            L'équipe
          </a>
          <a className="hover:text-white transition-colors" href="/mentions-legales">
            Mentions légales
          </a>
          <a className="hover:text-white transition-colors" href="/cgv">
            CGV
          </a>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
