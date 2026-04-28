import { useEffect, type RefObject } from 'react';

export const useScrollProgress = (progressRef: RefObject<HTMLDivElement | null>) => {
  useEffect(() => {
    let frameId = 0;

    const updateProgress = () => {
      frameId = 0;

      const progressBar = progressRef.current;
      if (!progressBar) {
        return;
      }

      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const fullHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const value = fullHeight > 0 ? (winScroll / fullHeight) * 100 : 0;

      progressBar.style.transform = `scaleX(${value / 100})`;
    };

    const requestProgressUpdate = () => {
      if (frameId !== 0) {
        return;
      }

      frameId = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener('scroll', requestProgressUpdate, { passive: true });
    window.addEventListener('resize', requestProgressUpdate, { passive: true });

    return () => {
      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId);
      }

      window.removeEventListener('scroll', requestProgressUpdate);
      window.removeEventListener('resize', requestProgressUpdate);
    };
  }, [progressRef]);
};
