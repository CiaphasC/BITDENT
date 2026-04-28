export const scheduleIdleWork = (callback: () => void, timeout = 1200) => {
  const requestIdleCallback = globalThis.requestIdleCallback;
  const cancelIdleCallback = globalThis.cancelIdleCallback;

  if (typeof requestIdleCallback === 'function' && typeof cancelIdleCallback === 'function') {
    const handle = requestIdleCallback(() => {
      callback();
    }, { timeout });
    return () => {
      cancelIdleCallback(handle);
    };
  }

  const handle = globalThis.setTimeout(callback, 1);
  return () => {
    globalThis.clearTimeout(handle);
  };
};

export const scheduleVisibleIdleWork = (
  element: Element,
  callback: () => void,
  rootMargin = '200px 0px',
) => {
  let cancelIdleWork: (() => void) | undefined;

  const runCallback = () => {
    cancelIdleWork = scheduleIdleWork(callback);
  };

  if (!('IntersectionObserver' in window)) {
    runCallback();
    return () => {
      cancelIdleWork?.();
    };
  }

  const observer = new IntersectionObserver(
    (entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) {
        return;
      }

      observer.disconnect();
      runCallback();
    },
    { rootMargin, threshold: 0.01 },
  );

  observer.observe(element);

  return () => {
    observer.disconnect();
    cancelIdleWork?.();
  };
};

export const prefersReducedMotion = () =>
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

export const getScenePixelRatio = () => Math.min(window.devicePixelRatio || 1, 1.5);
