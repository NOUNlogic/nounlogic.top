'use client';

import React, { useRef, useEffect, useState, ReactNode } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollTriggeredSceneProps {
  children: ReactNode;
  className?: string;
  sceneColor?: string;
  particleDensity?: number;
  beforeEnterColor?: string;
  afterExitColor?: string;
  transitionDuration?: number;
}

const ScrollTriggeredScene: React.FC<ScrollTriggeredSceneProps> = ({
  children,
  className = '',
  sceneColor = '#0a0a18',
  particleDensity = 50,
  beforeEnterColor = '#000000',
  afterExitColor = '#000000',
  transitionDuration = 1.5,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    // Three.js setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(sceneColor);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
    });
    rendererRef.current = renderer;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create particle system
    const particleCount = particleDensity * 100;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 20;
      positions[i + 1] = (Math.random() - 0.5) * 20;
      positions[i + 2] = (Math.random() - 0.5) * 20 - 5;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.05,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Scroll animation setup
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.5,
        onEnter: () => {
          gsap.to(scene.background as THREE.Color, {
            r: new THREE.Color(sceneColor).r,
            g: new THREE.Color(sceneColor).g,
            b: new THREE.Color(sceneColor).b,
            duration: transitionDuration / 2,
          });
          setIsVisible(true);
        },
        onLeave: () => {
          gsap.to(scene.background as THREE.Color, {
            r: new THREE.Color(afterExitColor).r,
            g: new THREE.Color(afterExitColor).g,
            b: new THREE.Color(afterExitColor).b,
            duration: transitionDuration / 2,
          });
          setIsVisible(false);
        },
        onEnterBack: () => {
          gsap.to(scene.background as THREE.Color, {
            r: new THREE.Color(sceneColor).r,
            g: new THREE.Color(sceneColor).g,
            b: new THREE.Color(sceneColor).b,
            duration: transitionDuration / 2,
          });
          setIsVisible(true);
        },
        onLeaveBack: () => {
          gsap.to(scene.background as THREE.Color, {
            r: new THREE.Color(beforeEnterColor).r,
            g: new THREE.Color(beforeEnterColor).g,
            b: new THREE.Color(beforeEnterColor).b,
            duration: transitionDuration / 2,
          });
          setIsVisible(false);
        },
      },
    });

    // Create camera movement animation
    tl.fromTo(
      camera.position,
      { z: 20 },
      { z: 5, duration: 1, ease: 'power2.inOut' },
      0
    )
      .fromTo(
        particles.rotation,
        { y: 0 },
        { y: Math.PI * 2, duration: 2, ease: 'none' },
        0
      )
      .fromTo(
        particleMaterial,
        { opacity: 0.1 },
        { opacity: 0.8, duration: 1, ease: 'power2.inOut' },
        0
      );

    // Initial scene color
    scene.background = new THREE.Color(beforeEnterColor);

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      particles.rotation.y += 0.001;
      particles.rotation.x += 0.0005;
      
      // Subtle mouse-based movement
      particles.rotation.y += mouseX * 0.0003;
      particles.rotation.x += mouseY * 0.0003;
      
      renderer.render(scene, camera);
    };
    animate();

    // Clean up
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      ScrollTrigger.getAll().forEach(trigger => trigger.kill(true));
      if (tl) tl.kill();
      
      // Dispose resources
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, [sceneColor, particleDensity, beforeEnterColor, afterExitColor, transitionDuration]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-[-1] pointer-events-none"
      />
      <div className={`relative z-10 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        {children}
      </div>
    </div>
  );
};

export default ScrollTriggeredScene;
