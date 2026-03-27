import { useEffect, useState } from 'react';

export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const fullHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const value = fullHeight > 0 ? (winScroll / fullHeight) * 100 : 0;
      setProgress(value);
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateProgress);
    };
  }, []);

  return progress;
};
