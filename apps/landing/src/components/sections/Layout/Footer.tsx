import { Link } from '@tanstack/react-router';

export function Footer() {
  return (
    <footer className="bg-black py-8 text-white">
      <div className="mx-auto max-w-7xl px-4 flex flex-col items-center gap-6">
        <div className="flex gap-8">
          <Link className="text-sm font-medium hover:underline" to="/">
            Politique de confidentialité
          </Link>
          <Link className="text-sm font-medium hover:underline" to="/">
            Mentions légales
          </Link>
        </div>
        <p className="text-xs text-white/50">© {new Date().getFullYear()} Flemme. Tous droits réservés.</p>
      </div>
    </footer>
  );
}
