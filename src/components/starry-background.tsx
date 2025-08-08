
"use client";

import React, { useEffect, useRef } from "react";

const StarryBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = Math.random() * 0.4 - 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.size > 0.2) this.size -= 0.01;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }

      draw() {
        ctx!.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx!.strokeStyle = "rgba(255, 255, 255, 0.1)";
        ctx!.lineWidth = 1;
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx!.closePath();
        ctx!.fill();
      }
    }

    const init = () => {
      particles = [];
      const numberOfParticles = (canvas.width * canvas.height) / 9000;
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
      }
    };

    const handleParticles = () => {
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx!.beginPath();
            ctx!.strokeStyle = `rgba(255, 255, 255, ${1 - distance / 100})`;
            ctx!.lineWidth = 0.5;
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(particles[j].x, particles[j].y);
            ctx!.stroke();
            ctx!.closePath();
          }
        }
      }
    };
    
    const animate = () => {
      ctx!.clearRect(0, 0, canvas.width, canvas.height);
      handleParticles();

      // Parallax effect
      const parallaxX = (mouse.current.x - canvas.width / 2) / 20;
      const parallaxY = (mouse.current.y - canvas.height / 2) / 20;
      ctx!.translate(-parallaxX, -parallaxY);

      animationFrameId = requestAnimationFrame(animate);

      // Reset transform
      ctx!.setTransform(1, 0, 0, 1, 0, 0);
    };
    
    const handleMouseMove = (e: MouseEvent) => {
        mouse.current.x = e.clientX;
        mouse.current.y = e.clientY;
    };

    window.addEventListener("resize", () => {
        resizeCanvas();
        init();
    });
    window.addEventListener("mousemove", handleMouseMove);

    resizeCanvas();
    init();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: -1, backgroundColor: '#000' }}>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default StarryBackground;
