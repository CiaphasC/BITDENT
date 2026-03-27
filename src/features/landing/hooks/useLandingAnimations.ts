import { useEffect } from 'react';

let isScrollPluginRegistered = false;

export const useLandingAnimations = () => {
  useEffect(() => {
    let cleanup: (() => void) | undefined;
    let isDisposed = false;

    const initAnimations = async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);

      if (isDisposed) {
        return;
      }

      if (!isScrollPluginRegistered) {
        gsap.registerPlugin(ScrollTrigger);
        isScrollPluginRegistered = true;
      }

      const context = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>('.animate-reveal').forEach((element, index) => {
          gsap.fromTo(
            element,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, delay: index * 0.1, ease: 'power3.out' },
          );
        });

        gsap.utils.toArray<HTMLElement>('.scroll-reveal').forEach((element) => {
          gsap.fromTo(
            element,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: element,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            },
          );
        });

        const videoParallax = document.querySelector<HTMLElement>('#video-parallax');
        const videoSection = document.querySelector<HTMLElement>('#video');

        if (videoParallax && videoSection) {
          gsap.fromTo(
            videoParallax,
            { y: '0%' },
            {
              y: '25%',
              ease: 'none',
              scrollTrigger: {
                trigger: videoSection,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            },
          );
        }
      }, document.body);

      cleanup = () => {
        context.revert();
      };
    };

    void initAnimations();

    return () => {
      isDisposed = true;
      cleanup?.();
    };
  }, []);
};
