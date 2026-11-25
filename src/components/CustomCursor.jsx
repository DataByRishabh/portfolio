import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const [hoveringInteractive, setHoveringInteractive] = useState(false);
  const [clicking, setClicking] = useState(false);

  useEffect(() => {
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    setEnabled(true);
    document.body.classList.add('custom-cursor-active');

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let rafId = null;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      const target = e.target;
      const isInteractive = Boolean(
        target &&
          target.closest(
            'a, button, [role="button"], input, select, textarea, [data-cursor-hover]'
          )
      );
      setHoveringInteractive(isInteractive);
    };

    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }
      rafId = requestAnimationFrame(animateRing);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    rafId = requestAnimationFrame(animateRing);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 z-[9999] pointer-events-none -ml-4 -mt-4 w-8 h-8 rounded-full border transition-[width,height,margin,border-color,background-color] duration-200 ${
          hoveringInteractive
            ? 'w-11 h-11 -ml-[22px] -mt-[22px] border-[#FF8C59] bg-[#FF8C59]/12 shadow-[0_0_20px_rgba(255,140,89,0.45)]'
            : 'border-[#FF8C59]/70 bg-[#FF8C59]/5'
        } ${clicking ? 'scale-75' : 'scale-100'}`}
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 z-[9999] pointer-events-none -ml-1.5 -mt-1.5 w-3 h-3 rounded-full bg-[#FF8C59] shadow-[0_0_14px_rgba(255,140,89,0.9)] transition-transform duration-75 ${
          clicking ? 'scale-125' : 'scale-100'
        }`}
      />
    </>
  );
}
