import React, { useEffect, useRef } from 'react';

const TRAIL_TOKENS = [
  '35.83%',
  '1,425',
  'R²=0.94',
  'μ',
  'Σ',
  '3.35M',
  'DAX',
  'MSE',
  '0.01',
  'ETL',
  'SQL',
];

export default function LivingDataUniverse({ motionEnabled }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!motionEnabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isMobile = width < 768;
    const nodeCount = isMobile ? 42 : 88;
    const connectDist = isMobile ? 110 : 145;
    const magnetDist = 175;

    const nodes = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.42,
      vy: (Math.random() - 0.5) * 0.42,
      r: Math.random() * 1.6 + 0.9,
      accent: Math.random() < 0.24,
    }));

    const ripples = [];
    const trails = [];
    const pointer = { x: -9999, y: -9999, active: false };
    let lastTrailTime = 0;
    let lastTrailX = -9999;
    let lastTrailY = -9999;
    let rafId = null;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.active = true;

      const now = performance.now();
      const moved = Math.hypot(e.clientX - lastTrailX, e.clientY - lastTrailY);
      if (now - lastTrailTime > 95 && moved > 24 && trails.length < 18) {
        lastTrailTime = now;
        lastTrailX = e.clientX;
        lastTrailY = e.clientY;
        trails.push({
          x: e.clientX + (Math.random() - 0.5) * 14,
          y: e.clientY - 8,
          vy: -0.45 - Math.random() * 0.35,
          alpha: 0.72,
          text: TRAIL_TOKENS[Math.floor(Math.random() * TRAIL_TOKENS.length)],
        });
      }
    };

    const handleMouseLeave = () => {
      pointer.active = false;
    };

    const handleClick = (e) => {
      ripples.push({
        x: e.clientX,
        y: e.clientY,
        radius: 6,
        maxRadius: 210,
        alpha: 0.65,
      });

      // Ripple Intelligence: push nearby particles outward gently
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const dx = n.x - e.clientX;
        const dy = n.y - e.clientY;
        const dist = Math.hypot(dx, dy);
        if (dist > 0 && dist < 190) {
          const force = (1 - dist / 190) * 3.2;
          n.vx += (dx / dist) * force;
          n.vy += (dy / dist) * force;
        }
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('click', handleClick);

    const tick = () => {
      ctx.clearRect(0, 0, width, height);

      // Update & draw nodes (#1 Living Data Universe + #11 Magnetic Cursor)
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        if (pointer.active) {
          const dx = pointer.x - n.x;
          const dy = pointer.y - n.y;
          const dist = Math.hypot(dx, dy);
          if (dist > 14 && dist < magnetDist) {
            const pull = (1 - dist / magnetDist) * 0.032;
            n.vx += (dx / dist) * pull;
            n.vy += (dy / dist) * pull;
          }
        }

        // Gentle damping so click impulses settle back to smooth drift
        n.vx *= 0.985;
        n.vy *= 0.985;
        if (Math.abs(n.vx) < 0.12) n.vx += (Math.random() - 0.5) * 0.02;
        if (Math.abs(n.vy) < 0.12) n.vy += (Math.random() - 0.5) * 0.02;

        n.x += n.vx;
        n.y += n.vy;

        if (n.x < -10) n.x = width + 10;
        if (n.x > width + 10) n.x = -10;
        if (n.y < -10) n.y = height + 10;
        if (n.y > height + 10) n.y = -10;

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = n.accent
          ? 'rgba(255, 140, 89, 0.55)'
          : 'rgba(241, 238, 232, 0.25)';
        ctx.fill();
      }

      // Connect nearby nodes & cursor constellation
      ctx.lineWidth = 0.75;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < connectDist) {
            const alpha = (1 - dist / connectDist) * 0.14;
            ctx.strokeStyle =
              a.accent || b.accent
                ? `rgba(255, 140, 89, ${alpha * 1.35})`
                : `rgba(204, 220, 245, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }

        if (pointer.active) {
          const pdx = a.x - pointer.x;
          const pdy = a.y - pointer.y;
          const pdist = Math.hypot(pdx, pdy);
          if (pdist < magnetDist) {
            const alpha = (1 - pdist / magnetDist) * 0.34;
            ctx.strokeStyle = `rgba(255, 140, 89, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(pointer.x, pointer.y);
            ctx.stroke();
          }
        }
      }

      // Draw click ripples (#14 Ripple Intelligence)
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i];
        rp.radius += 5.2;
        rp.alpha *= 0.94;
        if (rp.alpha < 0.02 || rp.radius > rp.maxRadius) {
          ripples.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 140, 89, ${rp.alpha})`;
        ctx.lineWidth = 1.25;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.radius * 0.62, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(241, 238, 232, ${rp.alpha * 0.45})`;
        ctx.lineWidth = 0.75;
        ctx.stroke();
      }

      // Draw numerical cursor trail (#18 Data Trail)
      ctx.font = '500 10px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      for (let i = trails.length - 1; i >= 0; i--) {
        const t = trails[i];
        t.y += t.vy;
        t.alpha -= 0.018;
        if (t.alpha <= 0) {
          trails.splice(i, 1);
          continue;
        }
        ctx.fillStyle = `rgba(255, 140, 89, ${t.alpha})`;
        ctx.fillText(t.text, t.x, t.y);
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleClick);
    };
  }, [motionEnabled]);

  if (!motionEnabled) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 z-[1] pointer-events-none"
    />
  );
}
