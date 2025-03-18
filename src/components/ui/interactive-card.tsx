'use client';

import React, { useState, useRef, useEffect, ReactNode } from 'react';

interface InteractiveCardProps {
  children: ReactNode;
  className?: string;
  depth?: number;
  maxRotation?: number;
  glare?: boolean;
  backgroundColor?: string;
}

const InteractiveCard: React.FC<InteractiveCardProps> = ({
  children,
  className = '',
  depth = 40,
  maxRotation = 12,
  glare = true,
  backgroundColor = 'rgba(255, 255, 255, 0.05)',
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    const rotateY = (mouseX / (rect.width / 2)) * maxRotation;
    const rotateX = -((mouseY / (rect.height / 2)) * maxRotation);

    // Calculate position offset based on depth
    const moveX = (mouseX / rect.width) * depth;
    const moveY = (mouseY / rect.height) * depth;

    // Calculate glare position
    const glareX = ((mouseX + rect.width / 2) / rect.width) * 100;
    const glareY = ((mouseY + rect.height / 2) / rect.height) * 100;

    setRotation({ x: rotateX, y: rotateY });
    setPosition({ x: moveX, y: moveY });
    setGlarePosition({ x: glareX, y: glareY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
    setPosition({ x: 0, y: 0 });
    setGlarePosition({ x: 50, y: 50 });
  };

  // Return card to original position when not hovered
  useEffect(() => {
    if (!isHovered) {
      const timeout = setTimeout(() => {
        setRotation({ x: 0, y: 0 });
        setPosition({ x: 0, y: 0 });
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [isHovered]);

  return (
    <div
      ref={cardRef}
      className={`relative transition-transform duration-200 ease-out ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) translateZ(10px) translateX(${position.x}px) translateY(${position.y}px)`,
        backgroundColor,
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
      }}
    >
      {glare && (
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden rounded-[inherit] z-10"
          style={{ opacity: isHovered ? 0.15 : 0, transition: 'opacity 0.3s ease-out' }}
        >
          <div
            className="absolute inset-0 w-[200%] h-[200%]"
            style={{
              background: 'radial-gradient(circle at center, rgba(255,255,255,0.8) 0%, transparent 50%)',
              left: `${glarePosition.x - 50}%`,
              top: `${glarePosition.y - 50}%`,
            }}
          />
        </div>
      )}
      {children}
    </div>
  );
};

export default InteractiveCard;
