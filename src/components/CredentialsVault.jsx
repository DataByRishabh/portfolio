import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Award,
  X,
} from 'lucide-react';

export default function CredentialsVault({ certifications }) {
  const [hoveredCert, setHoveredCert] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const activeCert =
    activeIndex !== null ? certifications[activeIndex] : null;

  const handleNext = (e) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev + 1) % certifications.length);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setActiveIndex(
      (prev) => (prev - 1 + certifications.length) % certifications.length
    );
  };

  return (
    <>
      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Clean Luxury Editorial Rows */}
        <div className="lg:col-span-7 border-t border-[rgba(204,220,245,0.14)]">
          {certifications.map((cert, idx) => {
            const isHovered = hoveredCert?.id === cert.id;
            return (
              <button
                key={cert.id}
                type="button"
                onMouseEnter={() => setHoveredCert(cert)}
                onFocus={() => setHoveredCert(cert)}
                onClick={() => setActiveIndex(idx)}
                className="w-full text-left py-5 px-2 border-b border-[rgba(204,220,245,0.14)] flex items-center justify-between gap-4 group transition-colors hover:bg-white/[0.02] cursor-pointer"
              >
                <div className="flex items-baseline gap-5 min-w-0">
                  <span
                    className={`eyebrow shrink-0 transition-colors ${
                      isHovered ? 'text-[#FF8C59]' : 'text-[#5a5a62]'
                    }`}
                  >
                    {cert.index}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-serif-display text-2xl sm:text-3xl text-[#F1EEE8] group-hover:text-[#FF8C59] transition-colors truncate">
                      {cert.title}
                    </h3>
                    <p className="text-xs text-[#AAA9A4] mt-0.5 truncate">
                      {cert.issuer} · {cert.date}
                    </p>
                  </div>
                </div>

                <span className="eyebrow text-[#AAA9A4] group-hover:text-[#FF8C59] shrink-0 inline-flex items-center gap-1.5 transition-colors">
                  <span className="hidden sm:inline">View</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </button>
            );
          })}
        </div>

        {/* Right: Smooth Hover-Reveal Certificate Stage */}
        <div className="lg:col-span-5 hidden lg:block sticky top-28">
          <div className="border border-[rgba(204,220,245,0.14)] bg-[#08080A] p-4 transition-all duration-500">
            {hoveredCert ? (
              <div
                onClick={() =>
                  setActiveIndex(
                    certifications.findIndex((c) => c.id === hoveredCert.id)
                  )
                }
                className="cursor-pointer group"
              >
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-[rgba(204,220,245,0.1)]">
                  <span className="eyebrow text-[#FF8C59]">
                    {hoveredCert.folderTag}
                  </span>
                  <span className="eyebrow text-[#AAA9A4]">
                    {hoveredCert.date}
                  </span>
                </div>

                {hoveredCert.image ? (
                  <div className="overflow-hidden border border-[rgba(204,220,245,0.12)] bg-[#030303]">
                    <img
                      src={hoveredCert.image}
                      alt={hoveredCert.title}
                      className="w-full h-56 object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                ) : (
                  <div className="h-56 flex flex-col items-center justify-center border border-[rgba(204,220,245,0.12)] bg-[#050507] text-center p-6">
                    <Award className="w-8 h-8 text-[#FF8C59] mb-2" />
                    <p className="text-sm text-[#F1EEE8]">{hoveredCert.title}</p>
                    <p className="text-xs text-[#AAA9A4] mt-1">
                      {hoveredCert.issuer}
                    </p>
                  </div>
                )}

                <p className="text-xs text-[#AAA9A4] mt-3 leading-relaxed">
                  {hoveredCert.detail}
                </p>
              </div>
            ) : (
              <div className="h-72 flex flex-col items-center justify-center text-center p-6">
                <Award className="w-7 h-7 text-[#FF8C59]/70 mb-3" />
                <span className="eyebrow text-[#F1EEE8] block mb-1">
                  Hover Any Credential
                </span>
                <span className="text-xs text-[#AAA9A4] max-w-[220px]">
                  Preview certificates instantly on hover, or click to expand full screen.
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Fullscreen Certificate Lightbox Modal */}
      {activeCert && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveIndex(null)}
        >
          <div
            className="surface-card max-w-3xl w-full p-5 sm:p-8 max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 mb-5">
              <div>
                <span className="eyebrow text-[#FF8C59]">
                  {activeCert.index} · {activeCert.folderTag} · {activeCert.date}
                </span>
                <h3 className="font-serif-display text-2xl sm:text-3xl text-[#F1EEE8] mt-1">
                  {activeCert.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#AAA9A4] mt-1">
                  {activeCert.issuer}
                </p>
              </div>

              <button
                onClick={() => setActiveIndex(null)}
                aria-label="Close Certificate Viewer"
                className="p-2 border border-[rgba(204,220,245,0.18)] text-[#AAA9A4] hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {activeCert.image ? (
              <div className="border border-[rgba(204,220,245,0.16)] bg-[#050507] mb-5 overflow-hidden">
                <img
                  src={activeCert.image}
                  alt={activeCert.title}
                  className="w-full h-auto max-h-[58vh] object-contain mx-auto"
                />
              </div>
            ) : (
              <div className="border border-[rgba(204,220,245,0.16)] bg-[#070709] p-10 text-center mb-5">
                <Award className="w-10 h-10 text-[#FF8C59] mx-auto mb-3" />
                <p className="text-sm text-[#F1EEE8]">
                  {activeCert.title} — {activeCert.issuer}
                </p>
              </div>
            )}

            <p className="text-xs sm:text-sm text-[#D8D5CE] leading-relaxed mb-6">
              {activeCert.detail}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-[rgba(204,220,245,0.12)]">
              <button
                onClick={handlePrev}
                className="inline-flex items-center gap-2 px-4 py-2 border border-[rgba(204,220,245,0.16)] text-xs text-[#F1EEE8] hover:border-[#FF8C59] hover:text-[#FF8C59] transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Previous
              </button>

              <span className="eyebrow text-[#AAA9A4]">
                {activeIndex + 1} / {certifications.length}
              </span>

              <button
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-4 py-2 border border-[rgba(204,220,245,0.16)] text-xs text-[#F1EEE8] hover:border-[#FF8C59] hover:text-[#FF8C59] transition-colors cursor-pointer"
              >
                Next
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
