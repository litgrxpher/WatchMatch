"use client";

import React, { useEffect, useState, useRef } from "react";

type Star = {
  id: number;
  top: number;
  left: number;
  size: number;
  twinkleDuration: number;
  delay: number;
  color: string;
  blur: number;
};

const colors = ["#ffffff", "#a0c8ff", "#fff9c4"];

const isMobile = () => {
  if (typeof window === "undefined") return false;
  return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

const StarryBackground = () => {
  const [stars, setStars] = useState<Star[]>([]);
  const starsRef = useRef<HTMLDivElement>(null);
  const mobile = isMobile();

  // Generate stars
  useEffect(() => {
    const starCount = mobile ? 100 : 200;
    const newStars: Star[] = [];
    for (let i = 0; i < starCount; i++) {
      newStars.push({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: (Math.random() * 1.5 + 0.5) * (mobile ? 0.7 : 1),
        twinkleDuration: Math.random() * 5 + 3,
        delay: Math.random() * 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        blur: Math.random() > 0.7 ? (Math.random() * 1.5 + 0.5) * (mobile ? 0.6 : 1) : 0,
      });
    }
    setStars(newStars);
  }, [mobile]);

  // Mouse parallax for desktop
  useEffect(() => {
    if (mobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 20;
      const y = (e.clientY / innerHeight - 0.5) * 20;

      if (starsRef.current) {
        starsRef.current.style.transform = `translate3d(${x * 0.25}px, ${y * 0.25}px, 0)`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mobile]);


  return (
    <>
      <style jsx>{`
        .background {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: #000;
          overflow: hidden;
          z-index: -1;
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
      `}</style>

      <div className="background">
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
      </div>
    </>
  );
};

export default StarryBackground;
