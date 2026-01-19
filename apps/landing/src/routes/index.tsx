import { createFileRoute } from '@tanstack/react-router';
import { CTASection } from '../components/sections/CTA/CTASection';
import { FAQSection } from '../components/sections/FAQ/FAQSection';
import { HeroSection } from '../components/sections/Hero/HeroSection';
import { Footer } from '../components/sections/Layout/Footer';
import { Header } from '../components/sections/Layout/Header';
import { ServicesSection } from '../components/sections/Services/ServicesSection';
import { TestimonialsSection } from '../components/sections/Testimonials/TestimonialsSection';

export const Route = createFileRoute('/')({
  component: LandingPage,
});

function LandingPage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
