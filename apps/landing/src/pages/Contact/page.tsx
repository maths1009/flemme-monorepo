import type { SubmitEvent } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/Button';
import { Container } from '@/components/Container';
import { TextArea } from '@/components/TextArea';
import { TextField } from '@/components/TextField';

function ContactPage() {
  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const isEmail = email?.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

    if (isEmail) {
      toast.success('Demande envoyée !', {
        description: "Merci de nous avoir contactés. On te répond dès qu'on a fini notre sieste (ou presque) !",
      });
      e.currentTarget.reset();
    } else {
      toast.error('Email invalide');
    }
  };

  return (
    <main className="relative min-h-[80vh] py-20 overflow-hidden">
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `
                radial-gradient(#000 1px, transparent 1px)
            `,
          backgroundSize: '20px 20px',
        }}
      />

      <Container className="relative z-10">
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-16">
            <h1 className="mb-6 font-serif text-5xl font-black leading-tight md:text-7xl">
              Besoin de <br />
              <span className="text-brand-orange">nous parler ?</span>
            </h1>
            <p className="text-xl font-medium text-brand-black/70">
              Une question, un bug ou juste envie de nous dire à quel point tu es flemmi ? On est là.
            </p>
          </div>

          <div className="rounded-2xl border-2 border-black bg-white p-6 shadow-[8px_8px_0px_#000] md:p-12">
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold uppercase tracking-widest text-brand-black/60" htmlFor="name">
                    Ton petit nom
                  </label>
                  <TextField className="h-auto">
                    <TextField.Input id="name" name="name" placeholder="JEAN FLEMME" required type="text" />
                  </TextField>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold uppercase tracking-widest text-brand-black/60" htmlFor="email">
                    Ton email
                  </label>
                  <TextField className="h-auto">
                    <TextField.Input id="email" name="email" placeholder="JEAN@FLEMME.FR" required type="email" />
                  </TextField>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold uppercase tracking-widest text-brand-black/60" htmlFor="subject">
                  Le sujet
                </label>
                <TextField className="h-auto">
                  <TextField.Input
                    id="subject"
                    name="subject"
                    placeholder="C'EST QUOI LE PROBLÈME ?"
                    required
                    type="text"
                  />
                </TextField>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold uppercase tracking-widest text-brand-black/60" htmlFor="message">
                  Ton message
                </label>
                <TextArea className="h-auto">
                  <TextArea.Input
                    id="message"
                    name="message"
                    placeholder="DIS-NOUS TOUT, ON T'ÉCOUTE (D'UNE OREILLE)..."
                    required
                  />
                </TextArea>
              </div>

              <div className="mt-4 flex justify-center md:justify-end">
                <Button className="w-full md:w-auto uppercase" size="lg" type="submit" variant="cta">
                  Envoyer ma bafouille
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </main>
  );
}

export { ContactPage };
