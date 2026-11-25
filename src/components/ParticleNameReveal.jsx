import React, { useEffect, useRef, useState } from 'react';

export default function ParticleNameReveal({ motionEnabled }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [settled, setSettled] = useState(!motionEnabled);
  const [replayKey, setReplayKey] = useState(0);

  useEffect(() => {
    if (!motionEnabled) {
      setSettled(true);
      return;
    }

    setSettled(false);
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) {
      setSettled(true);
      return;
    }

    const rect = container.getBoundingClientRect();
    const width = Math.max(280, Math.floor(rect.width));
    const height = Math.max(96, Math.floor(rect.height));
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    // Offscreen sample of "RISHABH" / "SONAWANE."
    const off = document.createElement('canvas');
    off.width = width;
    off.height = height;
    const octx = off.getContext('2d');

    const fontSize = Math.min(72, Math.max(36, Math.floor(width / 8.2)));
    const lineHeight = fontSize * 0.96;
    octx.fillStyle = '#F1EEE8';
    octx.font = `800 ${fontSize}px "Syne", sans-serif`;
    octx.textBaseline = 'top';
    octx.fillText('RISHABH', 0, 2);
    octx.fillText('SONAWANE.', 0, lineHeight + 2);

    const imgData = octx.getImageData(0, 0, width, height).data;
    const step = width < 480 ? 4 : 3;
    const particles = [];

    for (let y = 0; y < height; y += step) {
      for (let x = 0; x < width; x += step) {
        const idx = (y * width + x) * 4;
        if (imgData[idx + 3] > 140) {
          const isDot = x > width * 0.56 && y > lineHeight;
          particles.push({
            tx: x,
            ty: y,
            x: x + (Math.random() - 0.5) * 260,
            y: y + (Math.random() - 0.5) * 180,
            size: Math.random() * 1.4 + 1.0,
            accent: isDot || Math.random() < 0.14,
          });
        }
      }
    }

    let rafId = null;
    const start = performance.now();
    const duration = 1150;

    const animate = (now) => {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / duration);
      const ease = 1 - Math.pow(1 - t, 3);

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const cx = p.x + (p.tx - p.x) * ease;
        const cy = p.y + (p.ty - p.y) * ease;
        ctx.fillStyle = p.accent ? '#FF8C59' : '#F1EEE8';
        ctx.fillRect(cx, cy, p.size, p.size);
      }

      if (t < 1) {
        rafId = requestAnimationFrame(animate);
      } else {
        setSettled(true);
      }
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [motionEnabled, replayKey]);

  return (
    <div
      ref={containerRef}
      onClick={() => motionEnabled && setReplayKey((k) => k + 1)}
      title={motionEnabled ? 'Click to replay particle formation' : undefined}
      className="relative mb-5 cursor-pointer select-none"
    >
      <h1
        className={`font-syne text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-[-0.03em] leading-[0.95] text-[#F1EEE8] transition-opacity duration-300 ${
          settled ? 'opacity-100' : 'opacity-0'
        }`}
      >
        RISHABH
        <br />
        SONAWANE<span className="text-[#FF8C59]">.</span>
      </h1>

      {motionEnabled && !settled && (
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="absolute inset-0 w-full h-full pointer-events-none"
        />
      )}
    </div>
  );
}
