import { useCallback, useEffect, useState } from 'react';

export const useAutoSlider = (totalSlides: number, intervalMs = 6000) => {
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
    if (totalSlides <= 1) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setCurrentIndex((previousIndex) => (previousIndex + 1) % totalSlides);
    }, intervalMs);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [currentIndex, intervalMs, totalSlides]);

  return {
    currentIndex,
    next,
    previous,
    goTo,
  };
};
