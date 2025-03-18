'use client';

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

interface TransitionProps {
  isActive: boolean;
  onComplete?: () => void;
  duration?: number;
  color?: string;
  type?: 'cube' | 'sphere' | 'particles' | 'portal';
}

const ThreeSceneTransition: React.FC<TransitionProps> = ({
  isActive,
  onComplete,
  duration = 1.2,
  color = '#000000',
  type = 'cube',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });
    rendererRef.current = renderer;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    
    // Create transition object based on type
    let transitionObject: THREE.Object3D;
    
    switch (type) {
      case 'sphere':
        const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
        const sphereMaterial = new THREE.MeshBasicMaterial({
          color: new THREE.Color(color),
          side: THREE.DoubleSide,
        });
        transitionObject = new THREE.Mesh(sphereGeometry, sphereMaterial);
        break;
        
      case 'particles':
        const particlesGeometry = new THREE.BufferGeometry();
        const particleCount = 2000;
        const posArray = new Float32Array(particleCount * 3);
        
        for (let i = 0; i < particleCount * 3; i++) {
          posArray[i] = (Math.random() - 0.5) * 5;
        }
        
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        
        const particlesMaterial = new THREE.PointsMaterial({
          color: new THREE.Color(color),
          size: 0.05,
        });
        
        transitionObject = new THREE.Points(particlesGeometry, particlesMaterial);
        break;
        
      case 'portal':
        const ringGeometry = new THREE.RingGeometry(0.5, 2, 32);
        const ringMaterial = new THREE.MeshBasicMaterial({
          color: new THREE.Color(color),
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.8,
        });
        transitionObject = new THREE.Mesh(ringGeometry, ringMaterial);
        break;
        
      case 'cube':
      default:
        const cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
        const cubeMaterial = new THREE.MeshBasicMaterial({
          color: new THREE.Color(color),
        });
        transitionObject = new THREE.Mesh(cubeGeometry, cubeMaterial);
        break;
    }
    
    // Add transition object to scene
    scene.add(transitionObject);
    
    // Initial state
    gsap.set(transitionObject.scale, { x: 0, y: 0, z: 0 });
    
    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      if (transitionObject) {
        transitionObject.rotation.x += 0.01;
        transitionObject.rotation.y += 0.01;
      }
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      // Cleanup based on type
      switch (type) {
        case 'sphere':
          (transitionObject as THREE.Mesh).geometry.dispose();
          ((transitionObject as THREE.Mesh).material as THREE.Material).dispose();
          break;
        case 'particles':
          (transitionObject as THREE.Points).geometry.dispose();
          ((transitionObject as THREE.Points).material as THREE.Material).dispose();
          break;
        case 'portal':
        case 'cube':
        default:
          (transitionObject as THREE.Mesh).geometry.dispose();
          ((transitionObject as THREE.Mesh).material as THREE.Material).dispose();
          break;
      }
      
      scene.remove(transitionObject);
      renderer.dispose();
    };
  }, [color, type]);
  
  // Handle transition animation
  useEffect(() => {
    if (!sceneRef.current) return;
    
    const transitionObject = sceneRef.current.children[0];
    
    if (isActive) {
      // Scale up animation
      gsap.to(transitionObject.scale, {
        x: 10,
        y: 10,
        z: 10,
        duration: duration,
        ease: 'power2.inOut',
        onComplete: () => {
          if (onComplete) onComplete();
        }
      });
    } else {
      // Scale down animation
      gsap.to(transitionObject.scale, {
        x: 0,
        y: 0,
        z: 0,
        duration: duration,
        ease: 'power2.inOut',
      });
    }
  }, [isActive, duration, onComplete]);
  
  return (
    <div 
      ref={containerRef} 
      className={`fixed inset-0 z-50 pointer-events-none transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}
    />
  );
};

export default ThreeSceneTransition;
