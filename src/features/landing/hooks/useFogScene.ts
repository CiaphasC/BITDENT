import { useEffect, type RefObject } from 'react';

import {
  prefersReducedMotion,
  scheduleVisibleIdleWork,
} from '@/features/landing/utils/performance';

interface FogMotionData {
  phaseRot: number;
  phaseX: number;
  phaseY: number;
  speed: number;
}

export const useFogScene = (containerRef: RefObject<HTMLDivElement | null>) => {
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
        { CanvasTexture },
        { PlaneGeometry },
        { MeshBasicMaterial },
        { Mesh },
        { DoubleSide, NormalBlending },
      ] = await Promise.all([
        import('three/src/scenes/Scene.js'),
        import('three/src/cameras/PerspectiveCamera.js'),
        import('three/src/renderers/WebGLRenderer.js'),
        import('three/src/textures/CanvasTexture.js'),
        import('three/src/geometries/PlaneGeometry.js'),
        import('three/src/materials/MeshBasicMaterial.js'),
        import('three/src/objects/Mesh.js'),
        import('three/src/constants.js'),
      ]);

      if (isDisposed) {
        return;
      }

      container.innerHTML = '';

      const width = Math.max(container.clientWidth, 1);
      const height = Math.max(container.clientHeight, 1);
      const shouldReduceMotion = prefersReducedMotion();

      const scene = new Scene();
      const camera = new PerspectiveCamera(60, width / height, 1, 1000);
      camera.position.z = 400;

      const renderer = new WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const context = canvas.getContext('2d');

      if (!context) {
        renderer.dispose();
        return;
      }

      const gradient = context.createRadialGradient(256, 256, 0, 256, 256, 256);
      gradient.addColorStop(0, 'rgba(45, 106, 79, 0.44)');
      gradient.addColorStop(0.4, 'rgba(45, 106, 79, 0.13)');
      gradient.addColorStop(1, 'rgba(45, 106, 79, 0)');
      context.fillStyle = gradient;
      context.fillRect(0, 0, 512, 512);

      const texture = new CanvasTexture(canvas);
      const fogGeometry = new PlaneGeometry(1, 1);
      const fogMaterial = new MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0.38,
        depthWrite: false,
        blending: NormalBlending,
        side: DoubleSide,
      });

      const fogMeshes: Array<InstanceType<typeof Mesh>> = [];
      const fogCount = 6;

      for (let index = 0; index < fogCount; index += 1) {
        const mesh = new Mesh(fogGeometry, fogMaterial);

        const scaleX = 800 + Math.random() * 800;
        const scaleY = 500 + Math.random() * 500;
        mesh.scale.set(scaleX, scaleY, 1);

        mesh.position.set(
          (Math.random() - 0.5) * 1000,
          (Math.random() - 0.5) * 400,
          (Math.random() - 0.5) * 100,
        );

        mesh.rotation.z = Math.random() * Math.PI * 2;
        mesh.userData = {
          phaseX: Math.random() * Math.PI * 2,
          phaseY: Math.random() * Math.PI * 2,
          phaseRot: Math.random() * Math.PI * 2,
          speed: 0.0012 + Math.random() * 0.0008,
        } satisfies FogMotionData;

        scene.add(mesh);
        fogMeshes.push(mesh);
      }

      let isInViewport = true;
      let isPageVisible = !document.hidden;
      let time = 0;

      const renderFrame = () => {
        frameId = 0;

        if (!isInViewport || !isPageVisible || isDisposed) {
          return;
        }

        time += 1;

        if (!shouldReduceMotion) {
          fogMeshes.forEach((mesh) => {
            const { phaseX, phaseY, phaseRot, speed } = mesh.userData as FogMotionData;

            mesh.position.x += Math.sin(time * speed + phaseX) * 0.4;
            mesh.position.y += Math.cos(time * speed * 0.8 + phaseY) * 0.2;
            mesh.rotation.z += Math.sin(time * speed * 0.5 + phaseRot) * 0.002;
          });
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

        texture.dispose();
        fogGeometry.dispose();
        fogMaterial.dispose();
        renderer.dispose();

        if (renderer.domElement.parentNode === container) {
          container.removeChild(renderer.domElement);
        }
      };
    };

    const cancelDeferredInit = scheduleVisibleIdleWork(container, () => {
      void initScene();
    }, '300px 0px');

    return () => {
      isDisposed = true;
      cancelDeferredInit();
      cleanupScene?.();
      container.innerHTML = '';
    };
  }, [containerRef]);
};
