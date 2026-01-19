import { SectionTitle } from '../../common/SectionTitle';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../ui/Accordion';

export function FAQSection() {
  return (
    <section className="bg-brand-yellow px-4 py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        <SectionTitle
          description="Tout ce que vous devez savoir avant de commencer à ne rien faire."
          label="FAQ"
          title="Questions Fréquentes"
        />

        <Accordion className="space-y-4">
          <AccordionItem
            className="bg-[#fca3b1] border-2 border-black rounded-2xl shadow-[4px_4px_0px_#000]"
            value="item-1"
          >
            <AccordionTrigger className="text-left text-lg font-bold">Comment gagne-t-on des points ?</AccordionTrigger>
            <AccordionContent className="text-base text-black/80">
              C'est simple : ouvrez l'application, verrouillez votre téléphone, et faites autre chose (ou rien du tout).
              Plus le temps passe, plus vous cumulez de points.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            className="bg-[#fca3b1] border-2 border-black rounded-2xl shadow-[4px_4px_0px_#000]"
            value="item-2"
          >
            <AccordionTrigger className="text-left text-lg font-bold">Est-ce que c'est gratuit ?</AccordionTrigger>
            <AccordionContent className="text-base text-black/80">
              Oui, 100% gratuit. Nous ne vendons pas vos données. Nous avons des partenariats avec des marques qui
              veulent vous récompenser de prendre du temps pour vous.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            className="bg-[#fca3b1] border-2 border-black rounded-2xl shadow-[4px_4px_0px_#000]"
            value="item-3"
          >
            <AccordionTrigger className="text-left text-lg font-bold">Je peux tricher ?</AccordionTrigger>
            <AccordionContent className="text-base text-black/80">
              On a des algorithmes anti-triche assez costauds. Si vous essayez de simuler de l'inactivité tout en
              utilisant votre téléphone, on le saura. Soyez honnête dans votre flemme.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}
