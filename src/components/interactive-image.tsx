
"use client";

import Image from 'next/image';
import React, { useRef, useState } from 'react';

interface InteractiveImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export function InteractiveImage({ src, alt, width, height }: InteractiveImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [styles, setStyles] = useState({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { currentTarget, clientX, clientY } = e;
    const { top, left, width, height } = currentTarget.getBoundingClientRect();

    const x = clientX - left;
    const y = clientY - top;

    const xRotation = 20 * ((y - height / 2) / height);
    const yRotation = -20 * ((x - width / 2) / width);

    const glowX = (x / width) * 100;
    const glowY = (y / height) * 100;

    const newStyles = {
      transform: `rotateX(${xRotation}deg) rotateY(${yRotation}deg) translateZ(50px)`,
      '--glow-x': `${glowX}%`,
      '--glow-y': `${glowY}%`,
    };
    setStyles(newStyles);
  };

  const handleMouseLeave = () => {
    setStyles({
      transform: 'rotateX(0deg) rotateY(0deg) translateZ(0px)',
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative transition-transform duration-100 ease-out"
      style={{ transformStyle: 'preserve-3d', ...styles } as React.CSSProperties}
    >
      <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl -translate-z-10"></div>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        data-ai-hint="luxury watch"
        className="rounded-full object-cover z-10 shadow-2xl shadow-primary/20 transition-all duration-300 ease-out"
        style={{
            boxShadow: `
                0px 0px 5px rgba(255, 255, 255, 0.1),
                0px 5px 30px rgba(0, 0, 0, 0.6)
            `,
        }}
        priority
      />
      <div
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -translate-z-10"
        style={{
          background: `radial-gradient(circle at var(--glow-x) var(--glow-y), rgba(255,255,255,0.15), transparent 50%)`,
        } as React.CSSProperties}
      />
    </div>
  );
}
