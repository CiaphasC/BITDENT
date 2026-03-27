import { useEffect, type RefObject } from 'react';
import * as THREE from 'three';

export const useFogScene = (containerRef: RefObject<HTMLDivElement | null>) => {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    container.innerHTML = '';

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      1,
      1000,
    );
    camera.position.z = 400;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
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
    gradient.addColorStop(0, 'rgba(45, 106, 79, 0.4)');
    gradient.addColorStop(0.4, 'rgba(45, 106, 79, 0.1)');
    gradient.addColorStop(1, 'rgba(45, 106, 79, 0)');
    context.fillStyle = gradient;
    context.fillRect(0, 0, 512, 512);

    const texture = new THREE.CanvasTexture(canvas);
    const fogGeometry = new THREE.PlaneGeometry(1, 1);
    const fogMaterial = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      opacity: 0.35,
      depthWrite: false,
      blending: THREE.NormalBlending,
      side: THREE.DoubleSide,
    });

    const fogMeshes: THREE.Mesh[] = [];
    const fogCount = 6;

    for (let index = 0; index < fogCount; index += 1) {
      const mesh = new THREE.Mesh(fogGeometry, fogMaterial);

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
      };

      scene.add(mesh);
      fogMeshes.push(mesh);
    }

    let frameId = 0;
    let time = 0;

    const animate = () => {
      frameId = window.requestAnimationFrame(animate);
      time += 1;

      fogMeshes.forEach((mesh) => {
        const { phaseX, phaseY, phaseRot, speed } = mesh.userData as {
          phaseX: number;
          phaseY: number;
          phaseRot: number;
          speed: number;
        };

        mesh.position.x += Math.sin(time * speed + phaseX) * 0.4;
        mesh.position.y += Math.cos(time * speed * 0.8 + phaseY) * 0.2;
        mesh.rotation.z += Math.sin(time * speed * 0.5 + phaseRot) * 0.002;
      });

      renderer.render(scene, camera);
    };

    const handleResize = () => {
      if (!container.isConnected) {
        return;
      }

      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    animate();
    window.addEventListener('resize', handleResize);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      texture.dispose();
      fogGeometry.dispose();
      fogMaterial.dispose();
      renderer.dispose();

      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [containerRef]);
};
