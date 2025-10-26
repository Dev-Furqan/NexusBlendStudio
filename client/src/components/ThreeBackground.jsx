import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function ThreeBackground({ variant = 'particles' }) {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);

  useEffect(() => {
    // Guard against SSR/non-window contexts
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    if (!containerRef.current) return;

    let scene, camera, renderer;
    
    try {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      
      renderer = new THREE.WebGLRenderer({ 
        alpha: true,
        antialias: true 
      });
      
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      containerRef.current.appendChild(renderer.domElement);
    } catch (error) {
      console.warn('WebGL not available, ThreeBackground disabled:', error);
      return; // Gracefully degrade if WebGL isn't supported
    }

    camera.position.z = 5;

    let particles = null;
    let mesh = null;

    // Create geometry based on variant
    if (variant === 'particles') {
      const particlesGeometry = new THREE.BufferGeometry();
      const particlesCount = 5000;
      const posArray = new Float32Array(particlesCount * 3);

      for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
      }

      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.005,
        color: 0x6366f1,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
      });

      particles = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particles);
    } else if (variant === 'geometric') {
      const geometry = new THREE.TorusKnotGeometry(1.5, 0.4, 100, 16);
      const material = new THREE.MeshBasicMaterial({
        color: 0x8b5cf6,
        wireframe: true,
        transparent: true,
        opacity: 0.3,
      });
      mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
    } else {
      // waves variant
      const geometry = new THREE.PlaneGeometry(15, 15, 50, 50);
      const material = new THREE.MeshBasicMaterial({
        color: 0x6366f1,
        wireframe: true,
        transparent: true,
        opacity: 0.2,
      });
      mesh = new THREE.Mesh(geometry, material);
      mesh.rotation.x = -Math.PI / 2.5;
      scene.add(mesh);
    }

    sceneRef.current = { scene, camera, renderer, particles, mesh };

    // Mouse parallax effect
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    let animationId;
    const animate = () => {
      if (!sceneRef.current) return;

      // Smooth camera movement
      camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 0.5 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      if (particles) {
        particles.rotation.y += 0.001;
        particles.rotation.x += 0.0005;
      }

      if (mesh) {
        mesh.rotation.y += 0.005;
        mesh.rotation.x += 0.002;

        // Wave effect for plane geometry
        if (variant === 'waves' && mesh.geometry instanceof THREE.PlaneGeometry) {
          const positions = mesh.geometry.attributes.position;
          const time = Date.now() * 0.001;
          
          for (let i = 0; i < positions.count; i++) {
            const x = positions.getX(i);
            const y = positions.getY(i);
            const wave = Math.sin(x * 0.5 + time) * Math.cos(y * 0.5 + time) * 0.3;
            positions.setZ(i, wave);
          }
          
          positions.needsUpdate = true;
        }
      }

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      
      // Dispose of all Three.js resources
      if (particles) {
        particles.geometry.dispose();
        particles.material.dispose();
        scene.remove(particles);
      }
      
      if (mesh) {
        mesh.geometry.dispose();
        mesh.material.dispose();
        scene.remove(mesh);
      }
      
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      renderer.dispose();
      sceneRef.current = null;
    };
  }, [variant]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 -z-10"
      style={{ background: 'transparent' }}
    />
  );
}
