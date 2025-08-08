
"use client";

import React, { useEffect, useState, useRef } from 'react';

const colors = ['#ffffff', '#a0c8ff', '#fff9c4'];

const isMobile = () => {
  if (typeof window === 'undefined') return false;
  return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

const StarryBackground = () => {
  const [stars, setStars] = useState<{ id: number; top: number; left: number; size: number; twinkleDuration: number; delay: number; color: string; blur: number; }[]>([]);
  const [shootingStars, setShootingStars] = useState<{ id: number; top: number; left: number; duration: number; }[]>([]);
  const starsRef = useRef<HTMLDivElement>(null);
  const swirlRef = useRef<HTMLDivElement>(null);
  const mobile = isMobile();

  useEffect(() => {
    const starCount = mobile ? 100 : 200; // fewer stars on mobile
    const newStars = [];
    for (let i = 0; i < starCount; i++) {
      newStars.push({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: (Math.random() * 1.5 + 0.5) * (mobile ? 0.7 : 1), // smaller on mobile
        twinkleDuration: Math.random() * 5 + 3,
        delay: Math.random() * 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        blur: Math.random() > 0.7 ? (Math.random() * 1.5 + 0.5) * (mobile ? 0.6 : 1) : 0,
      });
    }
    setStars(newStars);
  }, [mobile]);

  useEffect(() => {
    const interval = setInterval(() => {
      const startFromLeft = Math.random() > 0.5;
      const star = {
        id: Date.now(),
        top: startFromLeft ? Math.random() * 50 : 0,
        left: startFromLeft ? 0 : Math.random() * 50,
        duration: Math.random() * 1 + 0.8,
      };
      setShootingStars((prev) => [...prev, star]);
      setTimeout(() => {
        setShootingStars((prev) => prev.filter((s) => s.id !== star.id));
      }, (star.duration + 0.3) * 1000);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  // Parallax mouse movement effect only on non-mobile
  useEffect(() => {
    if (mobile) return; // skip mouse parallax on mobile

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 20; // reduce intensity a bit
      const y = (e.clientY / innerHeight - 0.5) * 20;

      if (starsRef.current) {
        starsRef.current.style.transform = `translate3d(${x * 0.25}px, ${y * 0.25}px, 0) translateY(var(--scroll-stars, 0px))`;
      }
      if (swirlRef.current) {
        swirlRef.current.style.transform = `translate3d(${x * 0.1}px, ${y * 0.1}px, 0) translateY(var(--scroll-swirl, 0px)) rotate(calc(var(--swirl-rotation, 0deg)))`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mobile]);

  // Scroll-based vertical parallax (both mobile & desktop)
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // reduced parallax intensity on mobile
      const starsSpeed = mobile ? 0.15 : 0.3;
      const swirlSpeed = mobile ? 0.08 : 0.15;

      const starsOffset = scrollY * starsSpeed;
      const swirlOffset = scrollY * swirlSpeed;

      if (starsRef.current) {
        starsRef.current.style.setProperty('--scroll-stars', `${starsOffset}px`);
      }
      if (swirlRef.current) {
        swirlRef.current.style.setProperty('--scroll-swirl', `${swirlOffset}px`);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobile]);

  // Slow swirl rotation stored in CSS variable
  useEffect(() => {
    let rotation = 0;
    const interval = setInterval(() => {
      rotation = (rotation + 0.1) % 360;
      if (swirlRef.current) {
        swirlRef.current.style.setProperty('--swirl-rotation', `${rotation}deg`);
      }
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style jsx>{`
        .background {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: radial-gradient(
              circle at 20% 30%,
              #0b0c10 0%,
              #000000 70%,
              #000000 100%
            ),
            radial-gradient(
              circle at 80% 80%,
              #1a1a2e 0%,
              #000000 60%,
              #000000 100%
            );
          overflow: hidden;
          z-index: -1;
        }
        .swirl {
          content: '';
          position: absolute;
          width: 150%;
          height: 150%;
          top: -25%;
          left: -25%;
          background: radial-gradient(circle at 40% 50%, rgba(255 255 255 / 0.08), transparent 70%),
            radial-gradient(circle at 60% 60%, rgba(173 216 230 / 0.1), transparent 50%),
            radial-gradient(circle at 50% 40%, rgba(255 255 255 / 0.05), transparent 60%);
          filter: blur(60px);
          animation: swirl 120s linear infinite;
          pointer-events: none;
          z-index: -1;
          will-change: transform;
        }
        @keyframes swirl {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        .stars {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          will-change: transform;
        }
        .star {
          position: absolute;
          border-radius: 50%;
          opacity: 0.8;
          animation-name: twinkle;
          animation-iteration-count: infinite;
          animation-direction: alternate;
          filter: drop-shadow(0 0 3px currentColor);
        }
        @keyframes twinkle {
          from {
            opacity: 0.1;
          }
          to {
            opacity: 1;
          }
        }
        .shooting-star {
          position: absolute;
          width: 120px;
          height: 3px;
          background: linear-gradient(90deg, white, transparent);
          border-radius: 50%;
          filter: drop-shadow(0 0 8px white);
          animation-fill-mode: forwards;
          animation-timing-function: ease-out;
          animation-name: shooting;
          will-change: transform, opacity;
        }
        .shooting-star::before {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          background: inherit;
          filter: blur(5px);
          opacity: 0.6;
          border-radius: inherit;
          left: -20px;
          top: 0;
        }
        @keyframes shooting {
          0% {
            transform: translate(0, 0) rotate(45deg);
            opacity: 1;
          }
          100% {
            transform: translate(350px, 350px) rotate(45deg);
            opacity: 0;
          }
        }
      `}</style>

      <div className="background">
        <div ref={swirlRef} className="swirl" />
        <div ref={starsRef} className="stars">
          {stars.map((star) => (
            <div
              key={star.id}
              className="star"
              style={{
                top: `${star.top}vh`,
                left: `${star.left}vw`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                animationDuration: `${star.twinkleDuration}s`,
                animationDelay: `${star.delay}s`,
                color: star.color,
                filter: star.blur
                  ? `drop-shadow(0 0 3px ${star.color}) blur(${star.blur}px)`
                  : `drop-shadow(0 0 3px ${star.color})`,
              }}
            />
          ))}
        </div>

        {shootingStars.map((star) => (
          <div
            key={star.id}
            className="shooting-star"
            style={{
              top: `${star.top}vh`,
              left: `${star.left}vw`,
              animationDuration: `${star.duration}s`,
            }}
          />
        ))}
      </div>
    </>
  );
};

export default StarryBackground;
