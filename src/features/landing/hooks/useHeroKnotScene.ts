import { useEffect, type RefObject } from 'react';

import {
  prefersReducedMotion,
  scheduleVisibleIdleWork,
} from '@/features/landing/utils/performance';

export const useHeroKnotScene = (containerRef: RefObject<HTMLDivElement | null>) => {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    let isDisposed = false;
    let frameId = 0;
    let observer: IntersectionObserver | undefined;
    let resizeObserver: ResizeObserver | undefined;
    let removeResizeListener: (() => void) | undefined;
    let cleanupScene: (() => void) | undefined;

    const initScene = async () => {
      const [
        { Scene },
        { PerspectiveCamera },
        { WebGLRenderer },
        { TorusKnotGeometry },
        { MeshBasicMaterial },
        { Mesh },
      ] = await Promise.all([
        import('three/src/scenes/Scene.js'),
        import('three/src/cameras/PerspectiveCamera.js'),
        import('three/src/renderers/WebGLRenderer.js'),
        import('three/src/geometries/TorusKnotGeometry.js'),
        import('three/src/materials/MeshBasicMaterial.js'),
        import('three/src/objects/Mesh.js'),
      ]);

      if (isDisposed) {
        return;
      }

      container.innerHTML = '';

      const width = Math.max(container.clientWidth, 1);
      const height = Math.max(container.clientHeight, 1);
      const shouldReduceMotion = prefersReducedMotion();

      const scene = new Scene();
      const camera = new PerspectiveCamera(75, width / height, 0.1, 1000);

      const renderer = new WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      const geometry = new TorusKnotGeometry(12, 3.5, 120, 32);
      const material = new MeshBasicMaterial({
        color: 0x2d6a4f,
        wireframe: true,
        transparent: true,
        opacity: 0.24,
      });

      const mesh = new Mesh(geometry, material);
      scene.add(mesh);

      camera.position.z = 35;
      mesh.position.x = window.innerWidth > 1024 ? -10 : 0;

      let isInViewport = true;
      let isPageVisible = !document.hidden;

      const renderFrame = () => {
        frameId = 0;

        if (!isInViewport || !isPageVisible || isDisposed) {
          return;
        }

        if (!shouldReduceMotion) {
          mesh.rotation.x += 0.0005;
          mesh.rotation.y += 0.001;
        }

        renderer.render(scene, camera);

        if (!shouldReduceMotion) {
          frameId = window.requestAnimationFrame(renderFrame);
        }
      };

      const ensureAnimationState = () => {
        const shouldAnimate =
          isInViewport && isPageVisible && !isDisposed && !shouldReduceMotion;

        if (shouldAnimate && frameId === 0) {
          frameId = window.requestAnimationFrame(renderFrame);
          return;
        }

        if (!shouldAnimate && frameId !== 0) {
          window.cancelAnimationFrame(frameId);
          frameId = 0;
        }

        if (shouldReduceMotion) {
          renderer.render(scene, camera);
        }
      };

      const handleResize = () => {
        if (!container.isConnected) {
          return;
        }

        const nextWidth = Math.max(container.clientWidth, 1);
        const nextHeight = Math.max(container.clientHeight, 1);

        camera.aspect = nextWidth / nextHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(nextWidth, nextHeight);
        mesh.position.x = window.innerWidth > 1024 ? -10 : 0;
        renderer.render(scene, camera);
      };

      const handleVisibilityChange = () => {
        isPageVisible = !document.hidden;
        ensureAnimationState();
      };

      observer = new IntersectionObserver(
        (entries) => {
          isInViewport = entries[0]?.isIntersecting ?? true;
          ensureAnimationState();
        },
        { threshold: 0.05 },
      );

      observer.observe(container);

      if (typeof globalThis.ResizeObserver === 'function') {
        resizeObserver = new globalThis.ResizeObserver(handleResize);
        resizeObserver.observe(container);
      } else {
        globalThis.addEventListener('resize', handleResize, { passive: true });
        removeResizeListener = () => {
          globalThis.removeEventListener('resize', handleResize);
        };
      }

      document.addEventListener('visibilitychange', handleVisibilityChange);
      renderer.render(scene, camera);
      ensureAnimationState();

      cleanupScene = () => {
        resizeObserver?.disconnect();
        removeResizeListener?.();
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        observer?.disconnect();

        if (frameId !== 0) {
          window.cancelAnimationFrame(frameId);
          frameId = 0;
        }

        geometry.dispose();
        material.dispose();
        renderer.dispose();

        if (renderer.domElement.parentNode === container) {
          container.removeChild(renderer.domElement);
        }
      };
    };

    const cancelDeferredInit = scheduleVisibleIdleWork(container, () => {
      void initScene();
    });

    return () => {
      isDisposed = true;
      cancelDeferredInit();
      cleanupScene?.();
      container.innerHTML = '';
    };
  }, [containerRef]);
};
