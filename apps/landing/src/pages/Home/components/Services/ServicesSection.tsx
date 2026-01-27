import { SERVICES_DATA } from '@/data/services';
import { ServiceCard } from './ServiceCard';

function ServicesSection() {
  return (
    <section className="grid w-full grid-cols-1 gap-0">
      {SERVICES_DATA.map(service => (
        <ServiceCard key={service.id} theme={service.theme}>
          {service.imagePosition === 'items-end' ? (
            <>
              <ServiceCard.Visual className="items-end">
                <img alt={service.imageAlt} src={service.image} />
              </ServiceCard.Visual>
              <ServiceCard.Content description={service.description} label={service.label} title={service.title} />
            </>
          ) : (
            <>
              <ServiceCard.Content description={service.description} label={service.label} title={service.title} />
              <ServiceCard.Visual className="items-center">
                <img alt={service.imageAlt} src={service.image} />
              </ServiceCard.Visual>
            </>
          )}
        </ServiceCard>
      ))}
    </section>
  );
}

export { ServicesSection };
