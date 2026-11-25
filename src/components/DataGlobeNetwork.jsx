import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUpRight, Award, Cpu, FolderKanban, Globe2, Sparkles } from 'lucide-react';
import {
  capabilities,
  certifications,
  profileData,
  projects,
} from '../data/portfolioData';

const CATEGORY_COLORS = {
  Project: '#FF8C59',
  Skill: '#F1EEE8',
  Achievement: '#6EE7B7',
};

function buildGlobeNodes() {
  const raw = [
    ...projects.map((p) => ({
      id: `proj-${p.id}`,
      type: 'Project',
      label: p.title.split('—')[0].split('–')[0].trim(),
      subtitle: p.subtitle,
      description: p.description,
      tags: p.tags.slice(0, 4),
      link: p.link,
      linkLabel: p.linkLabel,
    })),
    ...capabilities.map((c) => ({
      id: `skill-${c.id}`,
      type: 'Skill',
      label: c.title,
      subtitle: c.tagline,
      description: c.details,
      tags: c.skills.slice(0, 4),
    })),
    ...certifications.slice(0, 4).map((cert) => ({
      id: `ach-${cert.id}`,
      type: 'Achievement',
      label: cert.title,
      subtitle: `${cert.issuer} · ${cert.date}`,
      description: cert.detail,
      tags: [cert.folderTag, cert.date],
    })),
  ];

  // Fibonacci sphere distribution for even 3D placement
  const n = raw.length;
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  return raw.map((item, i) => {
    const y = 1 - (i / Math.max(1, n - 1)) * 2;
    const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = goldenAngle * i;
    return {
      ...item,
      x3d: Math.cos(theta) * radiusAtY,
      y3d: y,
      z3d: Math.sin(theta) * radiusAtY,
    };
  });
}

export default function DataGlobeNetwork({ onSelectProject }) {
  const nodes = useMemo(() => buildGlobeNodes(), []);
  const canvasRef = useRef(null);
  const rotRef = useRef({ x: 0.25, y: 0.4 });
  const dragRef = useRef({ active: false, lastX: 0, lastY: 0, moved: false });
  const projectedRef = useRef([]);
  const hoveredIdRef = useRef(null);

  const [selectedNode, setSelectedNode] = useState(nodes[0]);
  const [filterType, setFilterType] = useState('All');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let rafId = null;
    const size = 420;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2;
    const radius = 148;

    const projectPoint = (x, y, z, rx, ry) => {
      // Rotate around Y
      const cosY = Math.cos(ry);
      const sinY = Math.sin(ry);
      const x1 = x * cosY - z * sinY;
      const z1 = x * sinY + z * cosY;
      // Rotate around X
      const cosX = Math.cos(rx);
      const sinX = Math.sin(rx);
      const y2 = y * cosX - z1 * sinX;
      const z2 = y * sinX + z1 * cosX;

      const scale = 320 / (320 - z2 * 110);
      return {
        sx: cx + x1 * radius * scale,
        sy: cy + y2 * radius * scale,
        z: z2,
        scale,
      };
    };

    const render = () => {
      ctx.clearRect(0, 0, size, size);

      if (!dragRef.current.active) {
        rotRef.current.y += 0.0038;
      }

      const { x: rx, y: ry } = rotRef.current;

      // Subtle wireframe latitude/longitude rings
      ctx.strokeStyle = 'rgba(204, 220, 245, 0.08)';
      ctx.lineWidth = 0.8;
      for (let lat = -0.6; lat <= 0.6; lat += 0.6) {
        const rLat = Math.sqrt(1 - lat * lat);
        ctx.beginPath();
        for (let a = 0; a <= Math.PI * 2 + 0.1; a += 0.2) {
          const p = projectPoint(Math.cos(a) * rLat, lat, Math.sin(a) * rLat, rx, ry);
          if (a === 0) ctx.moveTo(p.sx, p.sy);
          else ctx.lineTo(p.sx, p.sy);
        }
        ctx.stroke();
      }

      const projected = nodes
        .filter((n) => filterType === 'All' || n.type === filterType)
        .map((n) => {
          const p = projectPoint(n.x3d, n.y3d, n.z3d, rx, ry);
          return { node: n, ...p };
        })
        .sort((a, b) => a.z - b.z);

      projectedRef.current = projected;

      // Connect nearby nodes on the 3D sphere
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const a = projected[i];
          const b = projected[j];
          const dist = Math.hypot(a.sx - b.sx, a.sy - b.sy);
          if (dist < 115) {
            const depthAlpha = ((a.z + b.z + 2) / 4) * 0.24;
            ctx.strokeStyle = `rgba(255, 140, 89, ${Math.max(0.04, depthAlpha)})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(a.sx, a.sy);
            ctx.lineTo(b.sx, b.sy);
            ctx.stroke();
          }
        }
      }

      // Draw nodes back-to-front
      for (let i = 0; i < projected.length; i++) {
        const item = projected[i];
        const isSelected = selectedNode?.id === item.node.id;
        const isHovered = hoveredIdRef.current === item.node.id;
        const depth = (item.z + 1) / 2; // 0..1
        const r = (isSelected ? 7.5 : isHovered ? 6.5 : 4.2) * (0.75 + depth * 0.45);
        const color = CATEGORY_COLORS[item.node.type] || '#FF8C59';

        if (isSelected || isHovered) {
          ctx.beginPath();
          ctx.arc(item.sx, item.sy, r + 6, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 140, 89, 0.18)';
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(item.sx, item.sy, r, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.35 + depth * 0.65;
        ctx.fill();
        ctx.globalAlpha = 1;

        if (depth > 0.48 || isSelected || isHovered) {
          ctx.font = `${isSelected ? '600' : '400'} 10px "JetBrains Mono", monospace`;
          ctx.fillStyle = isSelected ? '#FF8C59' : 'rgba(241, 238, 232, 0.82)';
          ctx.textAlign = 'center';
          const shortLabel =
            item.node.label.length > 18
              ? `${item.node.label.slice(0, 17)}…`
              : item.node.label;
          ctx.fillText(shortLabel, item.sx, item.sy - r - 6);
        }
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [nodes, selectedNode, filterType]);

  const getCanvasPoint = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * 420,
      y: ((e.clientY - rect.top) / rect.height) * 420,
    };
  };

  const handlePointerDown = (e) => {
    dragRef.current = {
      active: true,
      lastX: e.clientX,
      lastY: e.clientY,
      moved: false,
    };
  };

  const handlePointerMove = (e) => {
    if (dragRef.current.active) {
      const dx = e.clientX - dragRef.current.lastX;
      const dy = e.clientY - dragRef.current.lastY;
      if (Math.hypot(dx, dy) > 3) dragRef.current.moved = true;
      rotRef.current.y += dx * 0.008;
      rotRef.current.x = Math.max(-1.1, Math.min(1.1, rotRef.current.x + dy * 0.008));
      dragRef.current.lastX = e.clientX;
      dragRef.current.lastY = e.clientY;
    }

    const pt = getCanvasPoint(e);
    let closest = null;
    let minD = 22;
    for (const item of projectedRef.current) {
      const d = Math.hypot(pt.x - item.sx, pt.y - item.sy);
      if (d < minD) {
        minD = d;
        closest = item.node.id;
      }
    }
    hoveredIdRef.current = closest;
  };

  const handlePointerUp = (e) => {
    const wasDrag = dragRef.current.moved;
    dragRef.current.active = false;
    if (wasDrag) return;

    const pt = getCanvasPoint(e);
    let closest = null;
    let minD = 26;
    for (const item of projectedRef.current) {
      const d = Math.hypot(pt.x - item.sx, pt.y - item.sy);
      if (d < minD) {
        minD = d;
        closest = item.node;
      }
    }
    if (closest) setSelectedNode(closest);
  };

  const TypeIcon =
    selectedNode?.type === 'Project'
      ? FolderKanban
      : selectedNode?.type === 'Skill'
      ? Cpu
      : Award;

  return (
    <div className="surface-card rounded-2xl p-6 sm:p-8 relative overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <span className="eyebrow text-[#FF8C59] flex items-center gap-2 mb-1.5">
            <Globe2 className="w-3.5 h-3.5" />
            3D Interactive Data Network
          </span>
          <h3 className="font-serif-display text-3xl sm:text-4xl text-[#F1EEE8]">
            Explore My{' '}
            <span className="italic text-[#AAA9A4]">Knowledge Globe</span>
          </h3>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {['All', 'Project', 'Skill', 'Achievement'].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setFilterType(type)}
              className={`px-3 py-1.5 rounded-full font-mono-code text-[10px] uppercase tracking-wider border transition-colors cursor-pointer ${
                filterType === type
                  ? 'bg-[#FF8C59] text-[#030303] border-[#FF8C59] font-semibold'
                  : 'bg-[#08080A] text-[#AAA9A4] border-[rgba(204,220,245,0.16)] hover:border-[#FF8C59]/60'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: 3D Rotating Sphere Canvas */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <canvas
            ref={canvasRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={() => {
              dragRef.current.active = false;
              hoveredIdRef.current = null;
            }}
            className="w-full max-w-[380px] aspect-square touch-none select-none"
          />
          <span className="font-mono-code text-[10px] text-[#AAA9A4] tracking-wider uppercase mt-1">
            Drag to rotate 3D globe · Click any node to inspect
          </span>
        </div>

        {/* Right: Futuristic Node Inspector HUD */}
        <div className="lg:col-span-6">
          {selectedNode && (
            <div
              key={selectedNode.id}
              className="p-6 rounded-2xl bg-[#07070A] border border-[#FF8C59]/30 shadow-[0_0_32px_rgba(255,140,89,0.08)] transition-all duration-300"
            >
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="inline-flex items-center gap-2 eyebrow px-3 py-1 rounded-full bg-[#FF8C59]/12 border border-[#FF8C59]/35 text-[#FF8C59]">
                  <TypeIcon className="w-3.5 h-3.5" />
                  {selectedNode.type}
                </span>
                <span className="font-mono-code text-[10px] text-[#AAA9A4]">
                  {profileData.name}
                </span>
              </div>

              <h4 className="font-serif-display text-2xl sm:text-3xl text-[#F1EEE8] leading-snug mb-2">
                {selectedNode.label}
              </h4>
              <p className="font-mono-code text-xs text-[#FF8C59]/90 mb-4">
                {selectedNode.subtitle}
              </p>
              <p className="text-sm text-[#D8D5CE] leading-relaxed mb-5">
                {selectedNode.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {selectedNode.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="eyebrow px-2.5 py-1 border border-[rgba(204,220,245,0.16)] bg-white/[0.02] text-[#AAA9A4]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {selectedNode.link && (
                  <a
                    href={selectedNode.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F1EEE8] text-[#030303] text-xs font-semibold uppercase tracking-wider hover:bg-[#FF8C59] transition-colors"
                  >
                    <span>{selectedNode.linkLabel || 'Open Link'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
                {selectedNode.id === 'proj-ecommerce-powerbi' && onSelectProject && (
                  <button
                    type="button"
                    onClick={() => onSelectProject(projects[0])}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#FF8C59]/50 text-xs text-[#FF8C59] hover:bg-[#FF8C59] hover:text-[#030303] transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Inspect DAX &amp; KPIs
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
