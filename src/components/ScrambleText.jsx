import React, { useEffect, useRef, useState } from 'react';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%';

export default function ScrambleText({
  text,
  className = '',
  triggerOnHover = true,
  triggerOnView = true,
  motionEnabled = true,
}) {
  const [display, setDisplay] = useState(text);
  const frameRef = useRef(null);
  const elRef = useRef(null);

  const runScramble = () => {
    if (!motionEnabled) {
      setDisplay(text);
      return;
    }
    if (frameRef.current) cancelAnimationFrame(frameRef.current);

    let iteration = 0;
    const step = () => {
      setDisplay(
        text
          .split('')
          .map((char, idx) => {
            if (char === ' ') return ' ';
            if (idx < iteration) return text[idx];
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join('')
      );

      iteration += 0.55;
      if (iteration < text.length) {
        frameRef.current = requestAnimationFrame(step);
      } else {
        setDisplay(text);
      }
    };

    frameRef.current = requestAnimationFrame(step);
  };

  useEffect(() => {
    if (!triggerOnView || !motionEnabled) return;
    const el = elRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          runScramble();
          observer.unobserve(el);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [text, motionEnabled]);

  return (
    <span
      ref={elRef}
      onMouseEnter={triggerOnHover ? runScramble : undefined}
      className={className}
    >
      {display}
    </span>
  );
}
