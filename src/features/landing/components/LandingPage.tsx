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
        className="btn-luxury group fixed right-4 z-[70] flex h-14 w-14 items-center justify-center rounded-2xl border border-midnight-900/70 bg-pearl/85 text-midnight-900 shadow-[0_16px_30px_-14px_rgba(13,17,23,0.45)] backdrop-blur-xl transition-all duration-300 active:scale-95 md:hidden"
        href="#agendar"
        style={{ bottom: 'calc(1rem + env(safe-area-inset-bottom, 0px))' }}
      >
        <WhatsAppIcon className="h-6 w-6 transition-colors duration-500 group-hover:text-white" />
      </a>
    </>
  );
};
