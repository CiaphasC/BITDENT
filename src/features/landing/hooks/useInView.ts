import { useEffect, useState, type RefObject } from 'react';

interface UseInViewOptions {
  rootMargin?: string;
  threshold?: number;
}

export const useInView = (
  elementRef: RefObject<Element | null>,
  { rootMargin = '0px', threshold = 0 }: UseInViewOptions = {},
) => {
  const [isInView, setIsInView] = useState(true);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || !('IntersectionObserver' in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        setIsInView(entries[0]?.isIntersecting ?? true);
      },
      { rootMargin, threshold },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [elementRef, rootMargin, threshold]);

  return isInView;
};
