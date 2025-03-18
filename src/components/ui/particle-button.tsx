'use client';

import React, { useState, useRef, useEffect } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  speedX: number;
  speedY: number;
  alpha: number;
}

interface ParticleButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  particleCount?: number;
  particleColors?: string[];
}

const ParticleButton: React.FC<ParticleButtonProps> = ({
  children,
  onClick,
  className = '',
  particleCount = 20,
  particleColors = ['#ff0066', '#00ffff', '#ffff00', '#00ff00']
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) onClick();
    
    // Get button position for particle origin
    if (buttonRef.current && canvasRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      createParticles(x, y);
      setIsAnimating(true);
    }
  };

  const createParticles = (x: number, y: number) => {
    particlesRef.current = [];
    
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2; // random angle in radians
      const speed = 1 + Math.random() * 5; // random speed
      
      particlesRef.current.push({
        x,
        y,
        size: 2 + Math.random() * 4,
        color: particleColors[Math.floor(Math.random() * particleColors.length)],
        speedX: Math.cos(angle) * speed,
        speedY: Math.sin(angle) * speed,
        alpha: 1
      });
    }
  };

  useEffect(() => {
    if (!isAnimating) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      let stillAlive = false;
      
      particlesRef.current.forEach((particle) => {
        if (particle.alpha <= 0) return;
        
        stillAlive = true;
        particle.alpha -= 0.02;
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.speedY += 0.1; // gravity
        
        ctx.save();
        ctx.globalAlpha = particle.alpha;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      
      if (stillAlive) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
      }
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isAnimating]);

  useEffect(() => {
    const resizeCanvas = () => {
      if (canvasRef.current && buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        canvasRef.current.width = rect.width;
        canvasRef.current.height = rect.height;
      }
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className="relative inline-block">
      <button
        ref={buttonRef}
        onClick={handleClick}
        className={`relative z-10 ${className}`}
      >
        {children}
      </button>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-20"
      />
    </div>
  );
};

export default ParticleButton;
