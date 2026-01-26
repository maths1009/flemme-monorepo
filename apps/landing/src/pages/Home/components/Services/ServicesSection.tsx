import { ServiceCard } from './ServiceCard';

function ServicesSection() {
  return (
    <section className="grid w-full grid-cols-1 gap-0">
      <ServiceCard theme="green">
        <ServiceCard.Visual className="items-end">
          <img alt="Mascotte verte" src="/mascot-1.svg" />
        </ServiceCard.Visual>
        <ServiceCard.Content
          description="Courses, ménage, promenade de chien... On gère tout pendant que vous perfectionnez l'art de la sieste. Le multitâche ? C'est notre sport préféré !"
          label="PLUS D'EXCUSES !"
          title="On fait tout... sauf votre jogging."
        />
      </ServiceCard>

      <ServiceCard theme="blue">
        <ServiceCard.Content
          description="Confiez-nous vos corvées et concentrez-vous sur l'essentiel : binge-watcher votre série préférée sans interruption. Vous le méritez."
          label="PROFITEZ SANS CULPABILITÉ"
          title="La flemme ? force sous-estimée."
        />
        <ServiceCard.Visual className="items-center">
          <img alt="Mascotte blob violet" src="/mascot-3.svg" />
        </ServiceCard.Visual>
      </ServiceCard>

      <ServiceCard theme="pink">
        <ServiceCard.Visual className="items-end">
          <img alt="Mascotte triangle rose" src="/mascot-4.svg" />
        </ServiceCard.Visual>
        <ServiceCard.Content
          description="Nos agents secrets du quotidien sont prêts à affronter les pires missions : du frigo vide au linge en otage dans le panier."
          label="EXPERTS CERTIFIÉS EN 'MISSION IMPOSSIBLE'"
          title="Vos tâches, notre aventure !"
        />
      </ServiceCard>
    </section>
  );
}

export { ServicesSection };
