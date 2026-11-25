import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, User } from 'lucide-react';

const ALPHABET_POOL = 'RISHABHDATABI01SQLPOWERDAXAI';

export default function AsciiPortrait({ motionEnabled }) {
  const [asciiMode, setAsciiMode] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [imgError, setImgError] = useState(false);
  const canvasRef = useRef(null);
  const pointerRef = useRef({ x: -999, y: -999 });

  useEffect(() => {
    if (!asciiMode && !hovering) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const cols = 26;
    const rows = 32;
    const cellW = canvas.width / cols;
    const cellH = canvas.height / rows;

    let frameId;
    let tick = 0;

    const renderMatrix = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (asciiMode) {
        ctx.fillStyle = '#070709';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      ctx.font = '500 11px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const px = pointerRef.current.x;
      const py = pointerRef.current.y;
      const lensRadius = 92;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const cx = c * cellW + cellW / 2;
          const cy = r * cellH + cellH / 2;

          const dist = Math.hypot(cx - px, cy - py);
          const inLens = hovering && dist < lensRadius;

          if (!asciiMode && !inLens) continue;

          // Silhouette mask: oval head + shoulders shape
          const nx = (c - cols / 2) / (cols / 2);
          const ny = (r - rows / 2) / (rows / 2);
          const inHead =
            nx * nx * 2.1 + (ny + 0.25) * (ny + 0.25) * 1.9 < 0.42;
          const inShoulders =
            ny > 0.22 && Math.abs(nx) < 0.72 - (ny - 0.22) * 0.2;
          const isSubject = inHead || inShoulders;

          const charIndex =
            (r * 7 + c * 3 + (motionEnabled ? Math.floor(tick / 5) : 0)) %
            ALPHABET_POOL.length;
          const ch = ALPHABET_POOL[charIndex];

          if (!asciiMode && inLens) {
            const falloff = 1 - dist / lensRadius;
            ctx.fillStyle = `rgba(10, 10, 12, ${0.88 * falloff})`;
            ctx.fillRect(c * cellW, r * cellH, cellW + 0.5, cellH + 0.5);

            const isAccent = (r + c + Math.floor(tick / 4)) % 7 === 0;
            ctx.fillStyle = isAccent
              ? `rgba(255, 140, 89, ${Math.min(1, falloff * 1.3)})`
              : `rgba(241, 238, 232, ${Math.min(0.95, falloff * 1.2)})`;
            ctx.fillText(ch, cx, cy);
          } else if (asciiMode) {
            if (isSubject) {
              const highlight = (r + c + Math.floor(tick / 4)) % 11 === 0;
              ctx.fillStyle = highlight
                ? '#FF8C59'
                : `rgba(241, 238, 232, ${0.55 + ((r * c) % 5) * 0.09})`;
            } else {
              ctx.fillStyle = 'rgba(170, 169, 164, 0.14)';
            }
            ctx.fillText(ch, cx, cy);
          }
        }
      }

      if (motionEnabled && (asciiMode || hovering)) {
        tick++;
        frameId = requestAnimationFrame(renderMatrix);
      }
    };

    renderMatrix();
    return () => {
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [asciiMode, hovering, motionEnabled]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const scaleX = 340 / rect.width;
    const scaleY = 425 / rect.height;
    pointerRef.current = {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  return (
    <div className="relative w-full max-w-[340px] mx-auto select-none">
      <button
        type="button"
        onClick={() => setAsciiMode((prev) => !prev)}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => {
          setHovering(false);
          pointerRef.current = { x: -999, y: -999 };
        }}
        onMouseMove={handleMouseMove}
        aria-label="Toggle portrait between photo and alphabet matrix"
        className="w-full text-left group relative block overflow-hidden border border-[rgba(204,220,245,0.2)] bg-[#0A0A0C] transition-all duration-500 hover:border-[#FF8C59] cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FF8C59]"
      >
        {/* Portrait Layer */}
        <div
          className={`relative aspect-[4/5] w-full transition-all duration-700 ease-out ${
            asciiMode
              ? 'opacity-0 scale-105 pointer-events-none'
              : 'opacity-100 scale-100'
          }`}
        >
          {!imgError ? (
            <img
              src="images/portrait.jpg"
              alt="Rishabh Sonawane Portrait"
              width={340}
              height={425}
              fetchPriority="high"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover object-top grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-[#141418] via-[#0B0B0D] to-[#050506] relative overflow-hidden p-6">
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 50% 35%, rgba(255,140,89,0.28), transparent 60%)',
                }}
              />
              <div className="w-28 h-28 rounded-full border border-[rgba(204,220,245,0.22)] flex items-center justify-center mb-5 bg-[#0E0E12] relative z-10 group-hover:border-[#FF8C59] transition-colors duration-500">
                <User className="w-12 h-12 text-[#AAA9A4] group-hover:text-[#FF8C59] transition-colors duration-500" />
              </div>
              <span className="eyebrow text-[#F1EEE8] relative z-10 text-center">
                Portrait Frame Ready
              </span>
              <span className="text-[11px] text-[#AAA9A4] mt-1.5 text-center relative z-10 max-w-[210px]">
                Hover for <span className="font-pixel text-[#FF8C59]">Alphabet Lens</span> · Click to morph full frame
              </span>
            </div>
          )}
        </div>

        {/* Real-Time Cursor Lens + Full Alphabet Matrix Canvas */}
        <canvas
          ref={canvasRef}
          width={340}
          height={425}
          className="absolute inset-0 w-full h-full block pointer-events-none"
        />

        {/* Bottom Interactive Pill */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between px-3 py-2 bg-black/85 backdrop-blur-md border border-[rgba(204,220,245,0.16)]">
          <span className="eyebrow text-[#F1EEE8] flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-[#FF8C59]" />
            {asciiMode ? 'Alphabet Matrix' : 'Hover / Click → Alphabets'}
          </span>
          <span className="font-pixel text-xs text-[#FF8C59]">
            {asciiMode ? 'PHOTO' : 'A–Z'}
          </span>
        </div>
      </button>
    </div>
  );
}
