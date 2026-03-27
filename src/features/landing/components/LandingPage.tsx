import { BenefitsSection } from '@/features/landing/components/BenefitsSection';
import { CtaSection } from '@/features/landing/components/CtaSection';
import { FocusSection } from '@/features/landing/components/FocusSection';
import { FooterSection } from '@/features/landing/components/FooterSection';
import { HeroSection } from '@/features/landing/components/HeroSection';
import { NavBar } from '@/features/landing/components/NavBar';
import { TestimonialsSection } from '@/features/landing/components/TestimonialsSection';
import { useLandingAnimations } from '@/features/landing/hooks/useLandingAnimations';
import { useScrollProgress } from '@/features/landing/hooks/useScrollProgress';
import { WhatsAppIcon } from '@/shared/ui/icons';

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

      <a
        aria-label="WhatsApp"
        className="fixed right-4 z-[70] flex h-14 w-14 items-center justify-center rounded-full border border-white/35 bg-verde-500 text-white shadow-premium transition-transform duration-300 hover:scale-105 active:scale-95 md:hidden"
        href="#agendar"
        style={{ bottom: 'calc(1rem + env(safe-area-inset-bottom, 0px))' }}
      >
        <WhatsAppIcon className="h-7 w-7" />
      </a>
    </>
  );
};
