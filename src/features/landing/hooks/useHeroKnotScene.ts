import { useEffect, type RefObject } from 'react';
import * as THREE from 'three';

export const useHeroKnotScene = (containerRef: RefObject<HTMLDivElement | null>) => {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    container.innerHTML = '';

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000,
    );

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
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

    let frameId = 0;

    const animate = () => {
      frameId = window.requestAnimationFrame(animate);
      mesh.rotation.x += 0.0005;
      mesh.rotation.y += 0.001;
      renderer.render(scene, camera);
    };

    const handleResize = () => {
      if (!container.isConnected) {
        return;
      }

      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
      mesh.position.x = window.innerWidth > 1024 ? -10 : 0;
    };

    animate();
    window.addEventListener('resize', handleResize);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();

      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [containerRef]);
};
