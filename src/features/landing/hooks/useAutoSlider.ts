import { useCallback, useEffect, useState } from 'react';

export const useAutoSlider = (
  totalSlides: number,
  intervalMs = 6000,
  isEnabled = true,
) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = useCallback(() => {
    setCurrentIndex((previousIndex) =>
      totalSlides <= 0 ? 0 : (previousIndex + 1) % totalSlides,
    );
  }, [totalSlides]);

  const previous = useCallback(() => {
    setCurrentIndex((previousIndex) =>
      totalSlides <= 0 ? 0 : (previousIndex - 1 + totalSlides) % totalSlides,
    );
  }, [totalSlides]);

  const goTo = useCallback(
    (index: number) => {
      setCurrentIndex(() => {
        if (totalSlides <= 0) {
          return 0;
        }

        return ((index % totalSlides) + totalSlides) % totalSlides;
      });
    },
    [totalSlides],
  );

  useEffect(() => {
    if (totalSlides <= 1 || !isEnabled) {
      return;
    }

    let intervalId = 0;

    const clearSliderInterval = () => {
      if (intervalId !== 0) {
        window.clearInterval(intervalId);
        intervalId = 0;
      }
    };

    const startSliderInterval = () => {
      clearSliderInterval();

      if (document.hidden) {
        return;
      }

      intervalId = window.setInterval(() => {
        setCurrentIndex((previousIndex) => (previousIndex + 1) % totalSlides);
      }, intervalMs);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearSliderInterval();
        return;
      }

      startSliderInterval();
    };

    startSliderInterval();
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearSliderInterval();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [intervalMs, isEnabled, totalSlides]);

  return {
    currentIndex,
    next,
    previous,
    goTo,
  };
};
