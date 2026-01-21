import { FaqSection } from './components/FAQ/FAQSection';
import { HeroSection } from './components/Hero/HeroSection';
import { ServicesSection } from './components/Services/ServicesSection';
import { TestimonialsSection } from './components/Testimonials/TestimonialsSection';

function LandingPage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <TestimonialsSection />
      <FaqSection />
    </>
  );
}

export { LandingPage };
