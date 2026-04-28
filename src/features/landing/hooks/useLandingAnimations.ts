import { useEffect } from 'react';

import { prefersReducedMotion } from '@/features/landing/utils/performance';

const REVEAL_SELECTOR = '.animate-reveal, .scroll-reveal';
const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export const useLandingAnimations = () => {
  useEffect(() => {
    const revealElements = Array.from(
      document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR),
    );

    if (prefersReducedMotion()) {
      revealElements.forEach((element) => {
        element.classList.add('reveal-visible');
      });
      return;
    }

    const heroRevealElements = revealElements.filter((element) =>
      element.classList.contains('animate-reveal'),
    );
    const scrollRevealElements = revealElements.filter((element) =>
      element.classList.contains('scroll-reveal'),
    );

    heroRevealElements.forEach((element, index) => {
      element.style.setProperty('--reveal-delay', `${index * 80}ms`);
    });

    let heroRevealFrame = window.requestAnimationFrame(() => {
      heroRevealFrame = 0;
      heroRevealElements.forEach((element) => {
        element.classList.add('reveal-visible');
      });
    });

    let revealObserver: IntersectionObserver | undefined;

    if ('IntersectionObserver' in window) {
      revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
              return;
            }

            entry.target.classList.add('reveal-visible');
            revealObserver?.unobserve(entry.target);
          });
        },
        { rootMargin: '0px 0px -10% 0px', threshold: 0.1 },
      );

      scrollRevealElements.forEach((element) => {
        revealObserver?.observe(element);
      });
    } else {
      scrollRevealElements.forEach((element) => {
        element.classList.add('reveal-visible');
      });
    }

    const videoParallax = document.querySelector<HTMLElement>('#video-parallax');
    const videoSection = document.querySelector<HTMLElement>('#video');
    let parallaxFrame = 0;
    let isParallaxActive = true;
    let isVideoNearViewport = true;
    let parallaxObserver: IntersectionObserver | undefined;

    const updateParallax = () => {
      parallaxFrame = 0;

      if (!isParallaxActive || !videoParallax || !videoSection) {
        return;
      }

      const rect = videoSection.getBoundingClientRect();
      const scrollRange = window.innerHeight + rect.height;
      const progress = scrollRange > 0 ? (window.innerHeight - rect.top) / scrollRange : 0;
      const yPercent = clamp(progress, 0, 1) * 25;

      videoParallax.style.transform = `translate3d(0, ${yPercent}%, 0)`;
    };

    const requestParallaxUpdate = () => {
      if (!isVideoNearViewport || parallaxFrame !== 0) {
        return;
      }

      parallaxFrame = window.requestAnimationFrame(updateParallax);
    };

    if (videoParallax && videoSection) {
      if ('IntersectionObserver' in window) {
        parallaxObserver = new IntersectionObserver(
          (entries) => {
            isVideoNearViewport = entries[0]?.isIntersecting ?? true;
            requestParallaxUpdate();
          },
          { rootMargin: '25% 0px', threshold: 0 },
        );
        parallaxObserver.observe(videoSection);
      }

      window.addEventListener('scroll', requestParallaxUpdate, { passive: true });
      window.addEventListener('resize', requestParallaxUpdate, { passive: true });
      requestParallaxUpdate();
    }

    return () => {
      revealObserver?.disconnect();
      parallaxObserver?.disconnect();
      isParallaxActive = false;

      if (heroRevealFrame !== 0) {
        window.cancelAnimationFrame(heroRevealFrame);
      }

      if (parallaxFrame !== 0) {
        window.cancelAnimationFrame(parallaxFrame);
      }

      window.removeEventListener('scroll', requestParallaxUpdate);
      window.removeEventListener('resize', requestParallaxUpdate);
      videoParallax?.style.removeProperty('transform');
    };
  }, []);
};
