import { useEffect, type RefObject } from 'react';

export const useHeroKnotScene = (containerRef: RefObject<HTMLDivElement | null>) => {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    let isDisposed = false;
    let frameId = 0;
    let observer: IntersectionObserver | undefined;
    let handleVisibilityChange: (() => void) | undefined;
    let cleanupScene: (() => void) | undefined;

    const initScene = async () => {
      const THREE = await import('three');

      if (isDisposed) {
        return;
      }

      container.innerHTML = '';

      const width = Math.max(container.clientWidth, 1);
      const height = Math.max(container.clientHeight, 1);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      const geometry = new THREE.TorusKnotGeometry(12, 3.5, 120, 32);
      const material = new THREE.MeshBasicMaterial({
        color: 0x2d6a4f,
        wireframe: true,
        transparent: true,
        opacity: 0.24,
      });

      const mesh = new THREE.Mesh(geometry, material);
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

        mesh.rotation.x += 0.0005;
        mesh.rotation.y += 0.001;
        renderer.render(scene, camera);

        frameId = window.requestAnimationFrame(renderFrame);
      };

      const ensureAnimationState = () => {
        const shouldAnimate = isInViewport && isPageVisible && !isDisposed;

        if (shouldAnimate && frameId === 0) {
          frameId = window.requestAnimationFrame(renderFrame);
          return;
        }

        if (!shouldAnimate && frameId !== 0) {
          window.cancelAnimationFrame(frameId);
          frameId = 0;
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
      };

      handleVisibilityChange = () => {
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
      window.addEventListener('resize', handleResize);
      document.addEventListener('visibilitychange', handleVisibilityChange);
      ensureAnimationState();

      cleanupScene = () => {
        window.removeEventListener('resize', handleResize);
        if (handleVisibilityChange) {
          document.removeEventListener('visibilitychange', handleVisibilityChange);
        }

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

    void initScene();

    return () => {
      isDisposed = true;
      cleanupScene?.();
      container.innerHTML = '';
    };
  }, [containerRef]);
};
