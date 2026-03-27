import { BenefitsSection } from '@/features/landing/components/BenefitsSection';
import { CtaSection } from '@/features/landing/components/CtaSection';
import { FocusSection } from '@/features/landing/components/FocusSection';
import { FooterSection } from '@/features/landing/components/FooterSection';
import { HeroSection } from '@/features/landing/components/HeroSection';
import { NavBar } from '@/features/landing/components/NavBar';
import { TestimonialsSection } from '@/features/landing/components/TestimonialsSection';
import { useLandingAnimations } from '@/features/landing/hooks/useLandingAnimations';
import { useScrollProgress } from '@/features/landing/hooks/useScrollProgress';

export const LandingPage = () => {
  const scrollProgress = useScrollProgress();

  useLandingAnimations();

  return (
    <>
      <div
        className="fixed top-0 left-0 z-[60] h-[2px] bg-verde-500 transition-all duration-300"
        id="scroll-progress"
        style={{ width: `${scrollProgress}%` }}
      />

      <NavBar />
      <HeroSection />
      <BenefitsSection />
      <FocusSection />
      <TestimonialsSection />
      <CtaSection />
      <FooterSection />
    </>
  );
};
