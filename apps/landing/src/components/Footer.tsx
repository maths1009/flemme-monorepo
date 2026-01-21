export function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-[#1a1a1a] py-24 text-white">
      {/* Dark Checkerboard Background Pattern */}
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

          {/* Email Form */}
          <div className="mx-auto mb-16 flex max-w-md flex-col items-stretch gap-4 md:flex-row">
            <input
              className="flex-1 rounded-none border-2 border-white/20 bg-white p-4 font-bold text-black placeholder:text-black/50 focus:border-brand-yellow focus:outline-none"
              placeholder="TON EMAIL"
              type="email"
            />
            <button
              className="group flex items-center justify-center gap-2 border-2 border-brand-yellow bg-brand-yellow px-8 py-4 font-black uppercase text-black transition-transform hover:scale-105 active:scale-95"
              type="button"
            >
              <span>Inscris toi</span>
            </button>
          </div>

          {/* Coming Soon Store Badges */}
          <div className="mb-24 flex flex-col items-center justify-center gap-2">
            <span className="text-sm font-bold uppercase tracking-widest text-white/50">Coming soon...</span>
            <div className="flex flex-wrap justify-center gap-4">
              <StoreButton icon="apple" label="App Store" />
              <StoreButton icon="google" label="Google Play" />
            </div>
          </div>
        </div>

        {/* Bottom Links */}
        <div className="flex justify-end gap-8 border-t border-white/10 pt-8 text-sm font-bold text-white/40">
          <a className="hover:text-white transition-colors" href="/">
            Privacy
          </a>
          <a className="hover:text-white transition-colors" href="/">
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
}

function StoreButton({ icon, label }: { icon: 'apple' | 'google'; label: string }) {
  return (
    <button
      className="flex items-center gap-3 rounded-xl border border-white/20 bg-black/40 px-6 py-3 text-left transition-all hover:bg-black/60 hover:scale-105 active:scale-95"
      type="button"
    >
      {icon === 'apple' ? (
        <svg className="h-8 w-8 fill-white" viewBox="0 0 24 24">
          <title>Apple App Store</title>
          <path d="M17.05 20.28c-.98.95-2.05.8-3.08.3-1.09-.5-2.09-.48-3.24 0-1.44.6-2.2.4-3.05-.4C-1.8 14.28-.2 7.08 6.5 6.78c1.7.0 2.9 1.1 3.8 1.1s2.6-1.1 4.3-1.1c1.8.0 3.2.7 4.1 1.9-3.6 1.8-3 6.6.6 8.2-.8 1.9-1.9 3.8-3.25 3.4zM12.95 5.58c.8-1.0 1.3-2.3 1.2-3.7-1.1.1-2.5.7-3.3 1.7-.8.9-1.4 2.3-1.3 3.6 1.3.1 2.6-.5 3.4-1.6z" />
        </svg>
      ) : (
        <svg className="h-8 w-8" viewBox="0 0 24 24">
          <title>Google Play Store</title>
          <path d="M12.7 12l-5.7-5.7L2 11.3l10.7 0.7z" fill="#EA4335" />
          <path d="M2.5 19.1L12.7 12 7 6.3 2 11.3c-0.2 0.2-0.3 0.5-0.3 0.8s0.1 0.6 0.3 0.8l0.5 6.2z" fill="#FBBC04" />
          <path d="M12.7 12l2.3 2.3c0.9 0.9 2.3 0.9 3.2 0l0.6-0.6L12.7 12z" fill="#4285F4" />
          <path d="M18.8 13.7l-3.8-3.8L12.7 12l5.7 5.7c0.8-0.5 1.7-1.4 1.7-2.6 0-0.5-0.1-1-0.3-1.4z" fill="#34A853" />
        </svg>
      )}
      <div className="flex flex-col leading-none">
        <span className="text-[10px] uppercase text-white/60">Download on the</span>
        <span className="text-lg font-bold text-white">{label}</span>
      </div>
    </button>
  );
}
