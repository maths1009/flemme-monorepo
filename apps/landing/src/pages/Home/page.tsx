import { lazy, Suspense } from 'react';
import { HeroSection } from './components/Hero/HeroSection';

const ServicesSection = lazy(() =>
  import('./components/Services/ServicesSection').then(module => ({
    default: module.ServicesSection,
  })),
);
const TestimonialsSection = lazy(() =>
  import('./components/Testimonials/TestimonialsSection').then(module => ({
    default: module.TestimonialsSection,
  })),
);
const FaqSection = lazy(() =>
  import('./components/FAQ/FAQSection').then(module => ({
    default: module.FaqSection,
  })),
);

function HomePage() {
  return (
    <>
      <HeroSection />
      <Suspense fallback={<div className="min-h-screen bg-brand-yellow" />}>
        <ServicesSection />
        <TestimonialsSection />
        <FaqSection />
      </Suspense>
    </>
  );
}

export { HomePage };
