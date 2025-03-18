'use client';

import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

interface AnimatedElementProps {
  children: React.ReactNode;
  animation: 
    'fadeIn' | 'fadeInUp' | 'fadeInDown' | 
    'zoomIn' | 'slideInLeft' | 'slideInRight' | 
    'bounce' | 'flip' | 'rotate' | 'rubberBand' | 
    'swing' | 'pulse' | 'wobble' | 'jello' | 
    'heartBeat' | '3dFlip';
  delay?: number;
  threshold?: number;
  className?: string;
  once?: boolean;
  duration?: number;
  stagger?: number;
}

function AnimatedElement({ 
  children, 
  animation, 
  delay = 0, 
  threshold = 0.1, 
  className = '', 
  once = true,
  duration = 0.8,
  stagger = 0
}: AnimatedElementProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Set initial state based on animation type
    switch (animation) {
      case 'fadeIn':
        gsap.set(element, { autoAlpha: 0 });
        break;
      case 'fadeInUp':
        gsap.set(element, { y: 50, autoAlpha: 0 });
        break;
      case 'fadeInDown':
        gsap.set(element, { y: -50, autoAlpha: 0 });
        break;
      case 'zoomIn':
        gsap.set(element, { scale: 0.5, autoAlpha: 0 });
        break;
      case 'slideInLeft':
        gsap.set(element, { x: -100, autoAlpha: 0 });
        break;
      case 'slideInRight':
        gsap.set(element, { x: 100, autoAlpha: 0 });
        break;
      case 'flip':
        gsap.set(element, { rotationY: 180, autoAlpha: 0, perspective: 800 });
        break;
      case 'rotate':
        gsap.set(element, { rotation: 180, autoAlpha: 0, transformOrigin: 'center center' });
        break;
      case '3dFlip':
        gsap.set(element, { 
          rotationX: 90, 
          autoAlpha: 0, 
          perspective: 800,
          transformStyle: 'preserve-3d'
        });
        break;
      default:
        gsap.set(element, { autoAlpha: 0 });
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
            
            const children = element.children;
            const animateElement = stagger > 0 && children.length > 1 
              ? children 
              : element;

            // Apply animation
            switch (animation) {
              case 'fadeIn':
                gsap.to(animateElement, { 
                  duration, 
                  autoAlpha: 1, 
                  delay, 
                  stagger 
                });
                break;
              case 'fadeInUp':
                gsap.to(animateElement, { 
                  duration, 
                  y: 0, 
                  autoAlpha: 1, 
                  ease: 'power2.out', 
                  delay, 
                  stagger 
                });
                break;
              case 'fadeInDown':
                gsap.to(animateElement, { 
                  duration, 
                  y: 0, 
                  autoAlpha: 1, 
                  ease: 'power2.out', 
                  delay, 
                  stagger 
                });
                break;
              case 'zoomIn':
                gsap.to(animateElement, { 
                  duration, 
                  scale: 1, 
                  autoAlpha: 1, 
                  ease: 'back.out(1.7)', 
                  delay, 
                  stagger 
                });
                break;
              case 'slideInLeft':
                gsap.to(animateElement, { 
                  duration, 
                  x: 0, 
                  autoAlpha: 1, 
                  ease: 'power2.out', 
                  delay, 
                  stagger 
                });
                break;
              case 'slideInRight':
                gsap.to(animateElement, { 
                  duration, 
                  x: 0, 
                  autoAlpha: 1, 
                  ease: 'power2.out', 
                  delay, 
                  stagger 
                });
                break;
              case 'bounce':
                gsap.to(animateElement, { 
                  duration, 
                  y: 0, 
                  autoAlpha: 1, 
                  ease: 'bounce.out', 
                  delay, 
                  stagger 
                });
                break;
              case 'flip':
                gsap.to(animateElement, { 
                  duration: duration * 1.2, 
                  rotationY: 0, 
                  autoAlpha: 1, 
                  ease: 'power3.out', 
                  delay, 
                  stagger 
                });
                break;
              case 'rotate':
                gsap.to(animateElement, { 
                  duration: duration * 1.2, 
                  rotation: 0, 
                  autoAlpha: 1, 
                  ease: 'power3.out', 
                  delay, 
                  stagger 
                });
                break;
              case 'rubberBand':
                gsap.to(animateElement, { autoAlpha: 1, delay });
                gsap.fromTo(
                  animateElement, 
                  { scaleX: 1.25, scaleY: 0.75 },
                  { 
                    duration: duration * 1.2, 
                    scaleX: 1, 
                    scaleY: 1, 
                    ease: 'elastic.out(1, 0.3)', 
                    delay: delay + 0.1, 
                    stagger 
                  }
                );
                break;
              case 'swing':
                gsap.to(animateElement, { autoAlpha: 1, delay });
                gsap.fromTo(
                  animateElement, 
                  { rotation: -10, transformOrigin: 'top center' },
                  { 
                    duration: duration * 1.2, 
                    rotation: 0, 
                    ease: 'elastic.out(1, 0.3)', 
                    delay: delay + 0.1, 
                    stagger 
                  }
                );
                break;
              case 'pulse':
                gsap.to(animateElement, { autoAlpha: 1, delay });
                gsap.fromTo(
                  animateElement, 
                  { scale: 1.1 },
                  { 
                    duration: duration * 1.2, 
                    scale: 1, 
                    ease: 'power2.inOut', 
                    repeat: 1, 
                    yoyo: true, 
                    delay: delay + 0.1, 
                    stagger 
                  }
                );
                break;
              case 'wobble':
                gsap.to(animateElement, { autoAlpha: 1, delay });
                const timeline = gsap.timeline({ delay: delay + 0.1 });
                timeline
                  .to(animateElement, { x: -25, rotation: -5, duration: duration / 6 })
                  .to(animateElement, { x: 20, rotation: 3, duration: duration / 6 })
                  .to(animateElement, { x: -15, rotation: -3, duration: duration / 6 })
                  .to(animateElement, { x: 10, rotation: 2, duration: duration / 6 })
                  .to(animateElement, { x: -5, rotation: -1, duration: duration / 6 })
                  .to(animateElement, { x: 0, rotation: 0, duration: duration / 6 });
                break;
              case 'jello':
                gsap.to(animateElement, { autoAlpha: 1, delay });
                const tl = gsap.timeline({ delay: delay + 0.1 });
                tl
                  .to(animateElement, { skewX: -12.5, skewY: -12.5, duration: duration / 7, ease: 'power2.out' })
                  .to(animateElement, { skewX: 6.25, skewY: 6.25, duration: duration / 7, ease: 'power2.out' })
                  .to(animateElement, { skewX: -3.125, skewY: -3.125, duration: duration / 7, ease: 'power2.out' })
                  .to(animateElement, { skewX: 1.5625, skewY: 1.5625, duration: duration / 7, ease: 'power2.out' })
                  .to(animateElement, { skewX: -0.78125, skewY: -0.78125, duration: duration / 7, ease: 'power2.out' })
                  .to(animateElement, { skewX: 0, skewY: 0, duration: duration / 7, ease: 'power2.out' });
                break;
              case 'heartBeat':
                gsap.to(animateElement, { autoAlpha: 1, delay });
                gsap.fromTo(
                  animateElement, 
                  { scale: 1 },
                  { 
                    scale: 1.3, 
                    duration: duration / 4, 
                    ease: 'power2.out', 
                    repeat: 1, 
                    yoyo: true, 
                    repeatDelay: duration / 4, 
                    delay: delay + 0.1, 
                    stagger 
                  }
                );
                break;
              case '3dFlip':
                gsap.to(animateElement, { 
                  duration: duration * 1.3, 
                  rotationX: 0, 
                  autoAlpha: 1, 
                  ease: 'power3.out', 
                  delay, 
                  stagger 
                });
                break;
              default:
                gsap.to(animateElement, { 
                  duration, 
                  autoAlpha: 1, 
                  delay, 
                  stagger 
                });
            }
            
            // Unobserve after animation if once is true
            if (once) {
              observer.unobserve(entry.target);
            }
          } else if (!entry.isIntersecting && !once && isVisible) {
            // Reset if element is not in view and "once" is false
            setIsVisible(false);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [animation, delay, threshold, once, isVisible, duration, stagger]);

  return (
    <div
      ref={ref}
      className={`animated-element ${className}`}
      style={{ opacity: 0, willChange: 'transform, opacity' }}
    >
      {children}
    </div>
  );
}

export default AnimatedElement;
