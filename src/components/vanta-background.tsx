"use client";

import { useState, useEffect, useRef } from 'react';

// Make sure to add the VANTA and THREE types to your global scope or import them if you have type definitions
declare global {
  interface Window {
    VANTA: any;
    THREE: any;
  }
}

export function VantaBackground() {
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const vantaRef = useRef(null);

  useEffect(() => {
    if (window.VANTA && !vantaEffect) {
      setVantaEffect(
        window.VANTA.NET({
          el: vantaRef.current,
          THREE: window.THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: true,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0xd8e3f2,
          backgroundColor: 0x0,
          points: 20.0,
          maxDistance: 10.0,
          spacing: 12.0,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return <div ref={vantaRef} id="vanta-bg" className="fixed top-0 left-0 w-full h-full z-0" />;
}
