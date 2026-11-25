import React, { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Check,
  ChevronDown,
  Copy,
  FileText,
  Github,
  Linkedin,
  Mail,
  Menu,
  Sparkles,
  X,
} from 'lucide-react';
import AsciiPortrait from './components/AsciiPortrait';
import CredentialsVault from './components/CredentialsVault';
import CustomCursor from './components/CustomCursor';
import DataArchitectureVisual from './components/DataArchitectureVisual';
import DataGlobeNetwork from './components/DataGlobeNetwork';
import DataWorkbench from './components/DataWorkbench';
import LivingDataUniverse from './components/LivingDataUniverse';
import ModelTrainingPipeline from './components/ModelTrainingPipeline';
import ParticleNameReveal from './components/ParticleNameReveal';
import PortfolioAssistant from './components/PortfolioAssistant';
import ResumeModal from './components/ResumeModal';
import ScrambleText from './components/ScrambleText';
import TiltCard from './components/TiltCard';
import {
  capabilities,
  certifications,
  creativeHabits,
  journey,
  profileData,
  projects,
} from './data/portfolioData';

function Reveal({ children, className = '', delayClass = '' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal-block ${delayClass} ${
        visible ? 'reveal-visible' : 'reveal-hidden'
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default function App() {
  const motionEnabled = true;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  const [openCapability, setOpenCapability] = useState('bi-dax');
  const [selectedProjectModal, setSelectedProjectModal] = useState(null);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [identityLayer, setIdentityLayer] = useState('portrait');
  const [journeyProgress, setJourneyProgress] = useState(0);
  const rootRef = useRef(null);
  const heroRef = useRef(null);
  const journeyRef = useRef(null);

  // Lenis Smooth Inertia Scroll — deferred after initial paint for 0ms TBT
  useEffect(() => {
    if (!motionEnabled) return;
    let lenis = null;
    let rafId = null;

    const timer = setTimeout(() => {
      lenis = new Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      const raf = (time) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    }, 1200);

    return () => {
      clearTimeout(timer);
      if (rafId) cancelAnimationFrame(rafId);
      if (lenis) lenis.destroy();
    };
  }, [motionEnabled]);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setScrollProgress((scrollTop / docHeight) * 100);
      }
      const vh = window.innerHeight || 800;
      if (heroRef.current) {
        const p = Math.min(1, Math.max(0, scrollTop / vh));
        heroRef.current.style.setProperty('--hero-p', p.toFixed(4));
      }
      if (journeyRef.current) {
        const jRect = journeyRef.current.getBoundingClientRect();
        const jp = Math.min(
          1,
          Math.max(0, (vh * 0.78 - jRect.top) / Math.max(1, jRect.height * 0.75))
        );
        setJourneyProgress(jp);
      }
      // Page-wide scroll scrubbing for all [data-scroll-card] sections
      if (motionEnabled) {
        const cards = document.querySelectorAll('[data-scroll-card]');
        cards.forEach((el) => {
          const rect = el.getBoundingClientRect();
          const progress = Math.min(
            1,
            Math.max(0, (vh - rect.top) / (vh + rect.height))
          );
          el.style.setProperty('--card-p', progress.toFixed(4));
        });
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [motionEnabled]);

  const handleMouseMove = (e) => {
    if (!motionEnabled || !rootRef.current) return;
    rootRef.current.style.setProperty('--mouse-x', `${e.clientX}px`);
    rootRef.current.style.setProperty('--mouse-y', `${e.clientY}px`);
  };

  const filterTabs = [
    { id: 'All', label: 'All Projects', count: projects.length },
    {
      id: 'Data Science',
      label: 'Data Science',
      count: projects.filter((p) => p.category === 'Data Science').length,
    },
    {
      id: 'SaaS & Web Apps',
      label: 'SaaS & Web Apps',
      count: projects.filter((p) => p.category === 'SaaS & Web Apps').length,
    },
    {
      id: 'Hardware',
      label: 'Hardware',
      count: projects.filter((p) => p.category === 'Hardware').length,
    },
  ];

  const visibleProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2400);
  };

  return (
    <div
      ref={rootRef}
      onMouseMove={handleMouseMove}
      className={`min-h-screen bg-[#030303] text-[#F1EEE8] relative ${
        motionEnabled ? 'motion-enabled' : ''
      }`}
    >
      {/* Custom Colored Cursor */}
      <CustomCursor />

      {/* Mouse Spotlight */}
      {motionEnabled && <div className="cursor-spotlight" aria-hidden="true" />}

      {/* Living Data Universe: Magnetic Particles + Click Ripples + Data Trail */}
      <LivingDataUniverse motionEnabled={motionEnabled} />

      {/* Scroll Progress Bar */}
      <div
        className="scroll-progress"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Ambient Spotlight */}
      <div className="scene-backdrop" />

      {/* Floating Frosted-Glass Pill Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6">
        <nav
          aria-label="Primary Navigation"
          className="editorial-nav flex items-center justify-between gap-2 sm:gap-4 min-w-0"
        >
          <a
            href="#top"
            className="flex items-center gap-2 sm:gap-3 text-sm font-semibold tracking-tight text-[#F1EEE8] hover:opacity-90 transition-opacity min-w-0"
          >
            <span className="text-[#FF8C59] font-serif-display text-xl sm:text-2xl italic -skew-x-12 leading-none shrink-0">
              //
            </span>
            <span className="tracking-[-0.3px] truncate">{profileData.name}</span>
            <span className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FF8C59]/10 border border-[#FF8C59]/25 font-mono-code text-[9px] uppercase tracking-wider text-[#FF8C59] shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF8C59] animate-pulse" />
              Data Science
            </span>
          </a>

          <div className="hidden md:flex items-center gap-1 bg-white/[0.03] border border-white/[0.06] rounded-full p-1 text-xs text-[#AAA9A4]">
            <a
              href="#work"
              className="px-3.5 py-1.5 rounded-full hover:bg-white/[0.07] hover:text-[#F1EEE8] transition-all"
            >
              Work
            </a>
            <a
              href="#credentials"
              className="px-3.5 py-1.5 rounded-full hover:bg-white/[0.07] hover:text-[#F1EEE8] transition-all"
            >
              Research &amp; Certs
            </a>
            <a
              href="#capabilities"
              className="px-3.5 py-1.5 rounded-full hover:bg-white/[0.07] hover:text-[#F1EEE8] transition-all"
            >
              Capabilities
            </a>
            <a
              href="#journey"
              className="px-3.5 py-1.5 rounded-full hover:bg-white/[0.07] hover:text-[#F1EEE8] transition-all"
            >
              Journey
            </a>
            <button
              type="button"
              onClick={() => setResumeOpen(true)}
              className="px-3.5 py-1.5 rounded-full hover:bg-white/[0.07] hover:text-[#FF8C59] transition-all cursor-pointer"
            >
              Resume
            </button>
          </div>

          <div className="hidden md:flex items-center shrink-0">
            <a
              href="#contact"
              className="rounded-full px-5 py-2.5 inline-flex items-center gap-2 text-xs font-semibold bg-[#F1EEE8] text-[#030303] hover:bg-[#FF8C59] transition-colors"
            >
              <span>Let&apos;s talk</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden p-2 rounded-full text-[#F1EEE8] hover:text-[#FF8C59] shrink-0"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </nav>

        {mobileMenuOpen && (
          <div className="md:hidden mt-2 rounded-2xl bg-[#0B0B0E]/95 backdrop-blur-xl border border-[rgba(204,220,245,0.16)] px-5 py-4 flex flex-col gap-3 text-sm text-[#D8D5CE] shadow-2xl">
            <a
              href="#work"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#FF8C59]"
            >
              Work
            </a>
            <a
              href="#credentials"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#FF8C59]"
            >
              Research &amp; Certs
            </a>
            <a
              href="#capabilities"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#FF8C59]"
            >
              Capabilities
            </a>
            <a
              href="#journey"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#FF8C59]"
            >
              Journey
            </a>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setResumeOpen(true);
              }}
              className="py-1 text-left text-[#FF8C59] cursor-pointer"
            >
              Resume (PDF)
            </button>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-1 py-2.5 px-4 rounded-full bg-[#F1EEE8] text-[#030303] text-xs font-semibold text-center"
            >
              Let&apos;s talk
            </a>
          </div>
        )}
      </header>

      <main id="top" className="relative z-10">
        {/* LAPZ-STYLE STICKY SCROLL-ZOOM HERO WRAPPER (lg+ only so mobile & tablet flow cleanly) */}
        <div ref={heroRef} className="relative lg:h-[145vh]">
          <section className="lg:sticky lg:top-0 lg:min-h-screen flex flex-col justify-between pt-24 pb-8 gutter-box border-b border-[rgba(204,220,245,0.14)] overflow-hidden bg-[#030303]">
          <div className="artifact-rings" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>

          {/* Hero Top Metadata */}
          <div className="flex flex-wrap items-center justify-between gap-4 relative z-10">
            <div className="eyebrow text-[#AAA9A4] flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF8C59] animate-pulse" />
              <span>{profileData.role}</span>
            </div>
            <div className="eyebrow text-[#AAA9A4]">
              {profileData.location}
            </div>
          </div>

          {/* Center Editorial Grid: Giant Typography + Interactive Portrait */}
          <div className="my-auto py-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            <div className="lg:col-span-7 hero-text-parallax">
              <p className="font-pixel text-sm text-[#FF8C59] mb-4 tracking-wide">
                <ScrambleText
                  text={profileData.availability}
                  motionEnabled={motionEnabled}
                />
              </p>

              <ParticleNameReveal motionEnabled={motionEnabled} />

              <p className="font-serif-display text-2xl sm:text-4xl text-[#F1EEE8] leading-tight mb-5">
                Turning raw data into{' '}
                <em className="italic text-[#FF8C59] font-serif-display">
                  clear decisions
                </em>{' '}
                &amp; AI-powered products.
              </p>

              <p className="text-sm sm:text-base text-[#AAA9A4] max-w-xl leading-relaxed mb-8">
                {profileData.subheadline}
              </p>

              <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2.5 sm:gap-3.5">
                <a
                  href="#work"
                  className="col-span-2 sm:col-span-1 inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-[#F1EEE8] text-[#030303] text-xs font-semibold uppercase tracking-wider hover:bg-[#FF8C59] transition-colors"
                >
                  Explore Selected Work
                  <ArrowDownRight className="w-4 h-4" />
                </a>

                <button
                  type="button"
                  onClick={() => setResumeOpen(true)}
                  className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-3 rounded-full border border-[#FF8C59]/60 bg-[#FF8C59]/10 text-[11px] sm:text-xs font-semibold text-[#FF8C59] hover:bg-[#FF8C59] hover:text-[#030303] transition-colors cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                  <span>Resume (PDF)</span>
                </button>

                <a
                  href={profileData.githubAnalytics}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-3 rounded-full border border-[rgba(204,220,245,0.2)] text-[11px] sm:text-xs text-[#F1EEE8] hover:border-[#FF8C59] hover:text-[#FF8C59] transition-colors"
                >
                  <Github className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                  <span className="truncate">Data GitHub</span>
                </a>

                <a
                  href={profileData.githubDev}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-3 rounded-full border border-[rgba(204,220,245,0.14)] text-[11px] sm:text-xs text-[#AAA9A4] hover:border-[#FF8C59] hover:text-[#FF8C59] transition-colors"
                >
                  <Github className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                  <span className="truncate">AI &amp; SaaS GitHub</span>
                </a>

                <a
                  href={profileData.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-3 rounded-full border border-[rgba(204,220,245,0.2)] text-[11px] sm:text-xs text-[#F1EEE8] hover:border-[#FF8C59] hover:text-[#FF8C59] transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>

            {/* Holographic 3D Identity Card + Alphabet Matrix */}
            <div className="lg:col-span-5 hero-portrait-parallax">
              <TiltCard
                motionEnabled={motionEnabled}
                maxTilt={7}
                className="max-w-[340px] mx-auto rounded-2xl"
              >
                <div className="mb-2.5 flex items-center justify-center gap-1.5">
                  {[
                    { id: 'portrait', label: 'Identity' },
                    { id: 'education', label: 'Edu' },
                    { id: 'skills', label: 'Stack' },
                    { id: 'goals', label: 'Goals' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setIdentityLayer(tab.id)}
                      className={`px-2.5 py-1 rounded-full font-mono-code text-[10px] uppercase tracking-wider border transition-colors cursor-pointer ${
                        identityLayer === tab.id
                          ? 'bg-[#FF8C59] text-[#030303] border-[#FF8C59] font-semibold'
                          : 'bg-[#0A0A0C]/90 text-[#AAA9A4] border-[rgba(204,220,245,0.16)] hover:border-[#FF8C59]/60 hover:text-[#F1EEE8]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {identityLayer === 'portrait' ? (
                  <AsciiPortrait motionEnabled={motionEnabled} />
                ) : (
                  <div className="w-full aspect-[4/5] border border-[rgba(204,220,245,0.2)] bg-gradient-to-b from-[#0E0E13] via-[#08080A] to-[#050507] p-6 flex flex-col justify-between relative overflow-hidden">
                    <div
                      className="absolute inset-0 opacity-25 pointer-events-none"
                      style={{
                        background:
                          'radial-gradient(circle at 80% 18%, rgba(255,140,89,0.28), transparent 55%)',
                      }}
                    />
                    <div className="relative z-10">
                      <span className="eyebrow text-[#FF8C59] block mb-2">
                        Holographic Layer · {identityLayer}
                      </span>
                      {identityLayer === 'education' && (
                        <>
                          <h3 className="font-serif-display text-3xl text-[#F1EEE8] mb-3">
                            B.Tech Data Science
                          </h3>
                          <p className="text-sm text-[#AAA9A4] leading-relaxed mb-4">
                            St. John College of Engineering &amp; Management
                            (2025–2029), Palghar.
                          </p>
                          <div className="space-y-2 text-xs font-mono-code text-[#D8D5CE]">
                            <div className="p-2.5 border border-white/10 bg-white/[0.02]">
                              MAT Journal Publication (2026)
                            </div>
                            <div className="p-2.5 border border-white/10 bg-white/[0.02]">
                              Anveshnam Workshop · 3rd Prize
                            </div>
                          </div>
                        </>
                      )}
                      {identityLayer === 'skills' && (
                        <>
                          <h3 className="font-serif-display text-3xl text-[#F1EEE8] mb-3">
                            Core Stack
                          </h3>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {[
                              'Power BI',
                              'DAX',
                              'Power Query',
                              'Data Modeling',
                              'SQL',
                              'C / C++',
                              'Statistical ML',
                              'Prompt Logic',
                            ].map((s) => (
                              <span
                                key={s}
                                className="eyebrow px-2.5 py-1 border border-[#FF8C59]/35 bg-[#FF8C59]/10 text-[#FF8C59]"
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                        </>
                      )}
                      {identityLayer === 'goals' && (
                        <>
                          <h3 className="font-serif-display text-3xl text-[#F1EEE8] mb-3">
                            2026 Focus
                          </h3>
                          <p className="text-sm text-[#AAA9A4] leading-relaxed mb-4">
                            Seeking Data Analytics internships, BI dashboard
                            collaborations, and applied ML research projects.
                          </p>
                          <div className="p-3 border border-[#FF8C59]/30 bg-[#FF8C59]/10 font-mono-code text-xs text-[#FF8C59]">
                            Status: Open to Internships &amp; Data Roles
                          </div>
                        </>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => setIdentityLayer('portrait')}
                      className="relative z-10 w-full py-2 border border-[rgba(204,220,245,0.18)] font-mono-code text-[10px] uppercase tracking-wider text-[#AAA9A4] hover:border-[#FF8C59] hover:text-[#FF8C59] transition-colors cursor-pointer"
                    >
                      ← Back to Portrait Lens
                    </button>
                  </div>
                )}
              </TiltCard>
            </div>
          </div>

          {/* Hero Bottom Metadata Strip */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[rgba(204,220,245,0.1)] relative z-10">
            <span className="eyebrow text-[#AAA9A4]">
              POWER BI · DAX · SQL · C / C++ · LLMS
            </span>
            <span className="eyebrow text-[#AAA9A4]">
              SCROLL TO EXPLORE ↓
            </span>
          </div>
          </section>
        </div>

        {/* REACH / IMPACT STRIP (Slides up over pinned Hero) */}
        <section className="relative z-20 gutter-box border-b border-[rgba(204,220,245,0.14)] bg-[#070707]">
          <Reveal>
            <div className="grid grid-cols-2 lg:grid-cols-4 border-l border-r border-[rgba(204,220,245,0.1)] lg:border-0">
              {profileData.metrics.map((item, idx) => (
                <div
                  key={idx}
                  className="py-7 px-4 sm:py-10 sm:px-8 border-b border-r lg:border-b-0 border-[rgba(204,220,245,0.12)] lg:last:border-r-0"
                >
                  <span className="eyebrow text-[#AAA9A4] block mb-2.5 sm:mb-3">
                    {item.eyebrow}
                  </span>
                  <strong className="font-serif-display text-4xl sm:text-6xl font-normal text-[#F1EEE8] block leading-none mb-2">
                    {item.value}
                    {item.accent && (
                      <span className="text-[#FF8C59]">{item.accent}</span>
                    )}
                  </strong>
                  <span className="text-xs sm:text-sm text-[#AAA9A4] block leading-snug">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* SELECTED WORK (Editorial Browser-Framed Showcase) */}
        {/* SELECTED WORK (Collapsible Projects Dropdown) */}
        <section
          id="work"
          className="gutter-box py-20 border-b border-[rgba(204,220,245,0.14)]"
        >
          <Reveal>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8">
              <div>
                <span className="eyebrow text-[#FF8C59] block mb-3">
                  <ScrambleText
                    text="01 / Selected Work"
                    motionEnabled={motionEnabled}
                  />
                </span>
                <h2 className="font-serif-display text-5xl sm:text-7xl text-[#F1EEE8] leading-[0.98]">
                  Ideas are a start.
                  <br />
                  <span className="italic text-[#AAA9A4]">This is the work.</span>
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setProjectsOpen((prev) => !prev)}
                aria-expanded={projectsOpen}
                className={`group inline-flex items-center justify-between gap-5 px-6 py-4 rounded-2xl border transition-all duration-300 cursor-pointer text-left ${
                  projectsOpen
                    ? 'border-[rgba(255,140,89,0.45)] bg-[#0E0E13] hover:border-[#FF8C59]'
                    : 'border-[#FF8C59] bg-[#FF8C59]/12 shadow-[0_0_30px_rgba(255,140,89,0.22)] hover:bg-[#FF8C59]/20'
                }`}
              >
                <div>
                  <span className="eyebrow text-[#FF8C59] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#FF8C59] animate-pulse" />
                    {projectsOpen
                      ? `Showing 0${projects.length} Projects`
                      : `View All 0${projects.length} Projects`}
                  </span>
                  <span className="text-xs text-[#D4D2CC] mt-1 block">
                    {projectsOpen
                      ? 'Hover cards for 3D tilt · Click to collapse'
                      : 'Click to reveal live builds & interactive case studies'}
                  </span>
                </div>
                <span
                  className={`w-9 h-9 rounded-full border flex items-center justify-center transition-transform duration-300 ${
                    projectsOpen
                      ? 'rotate-180 bg-[#FF8C59] text-[#030303] border-[#FF8C59]'
                      : 'bg-[#FF8C59] text-[#030303] border-[#FF8C59] group-hover:scale-105'
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </span>
              </button>
            </div>
          </Reveal>

          {projectsOpen && (
            <div className="pt-8 border-t border-[rgba(204,220,245,0.14)]">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
                <div className="flex flex-wrap items-center gap-2">
                  {filterTabs.map((tab) => {
                    const isActive = activeFilter === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveFilter(tab.id)}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-200 cursor-pointer ${
                          isActive
                            ? 'bg-[#FF8C59] text-[#030303] font-semibold'
                            : 'bg-[#0C0C0F] border border-[rgba(204,220,245,0.16)] text-[#AAA9A4] hover:border-[#FF8C59] hover:text-[#F1EEE8]'
                        }`}
                      >
                        <span>{tab.label}</span>
                        <span
                          className={`font-mono-code text-[10px] ${
                            isActive ? 'text-[#030303]/80' : 'text-[#FF8C59]'
                          }`}
                        >
                          0{tab.count}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <span className="eyebrow text-[#AAA9A4]">
                  Hover on cards to tilt &amp; inspect
                </span>
              </div>

              <div className="space-y-24">
            {visibleProjects.map((project, idx) => {
              const domainLabel =
                project.id === 'ecommerce-powerbi'
                  ? 'DataByRishabh / powerbi-analytics-portfolio'
                  : project.id === 'batman-robotics'
                  ? 'SJCEM · Hardware & Robotics Build'
                  : project.id === 'vyronix-gym-app'
                  ? 'vyronix-web.vercel.app'
                  : 'github.com / risdev18 / relief-hoapilal';

              return (
                <Reveal key={project.id} delayClass={`delay-step-${(idx % 3) + 1}`}>
                  <article
                    data-scroll-card
                    className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center"
                  >
                    {/* Left: Sleek Browser-Framed Visual with 3D Perspective Tilt */}
                    <div className="lg:col-span-6 scroll-depth-visual">
                      <TiltCard
                        motionEnabled={motionEnabled}
                        maxTilt={6}
                        className="rounded-2xl"
                      >
                        <div
                          onClick={() =>
                            project.daxSnippet
                              ? setSelectedProjectModal(project)
                              : window.open(project.link, '_blank', 'noreferrer')
                          }
                          className="relative rounded-2xl border border-[rgba(204,220,245,0.16)] bg-[#0A0A0D] overflow-hidden cursor-pointer group shadow-2xl hover:border-[#FF8C59]/60 transition-colors duration-300"
                        >
                        <div className="flex items-center justify-between px-4 py-3 border-b border-[rgba(204,220,245,0.1)] bg-[#0E0E12]">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#FF8C59]/60" />
                            <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                            <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                          </div>
                          <span className="font-mono-code text-[10px] text-[#AAA9A4] truncate max-w-[240px]">
                            {domainLabel}
                          </span>
                          <span className="eyebrow text-[#FF8C59] text-[9px]">
                            {project.category}
                          </span>
                        </div>

                        <div className="relative overflow-hidden bg-[#050507]">
                          <img
                            src={project.image}
                            alt={project.title}
                            width={900}
                            height={512}
                            loading="lazy"
                            className="w-full aspect-[16/10] object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
                          />
                        </div>

                        <div className="absolute bottom-4 right-4 w-11 h-11 rounded-full bg-[#FF8C59] text-[#030303] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <ArrowUpRight className="w-4 h-4" />
                        </div>
                      </div>
                      </TiltCard>
                    </div>

                    {/* Right: Clean Editorial Story + Bold Tactile Buttons */}
                    <div className="lg:col-span-6 scroll-depth-story">
                      <div className="flex flex-wrap items-center gap-3 mb-5">
                        <span className="eyebrow text-[#AAA9A4]">
                          0{idx + 1}
                        </span>
                        <span className="eyebrow px-3 py-1 rounded-md bg-[#FF8C59]/10 border border-[#FF8C59]/30 text-[#FF8C59]">
                          {project.category}
                        </span>
                        <span className="eyebrow text-[#AAA9A4]">
                          {project.badge}
                        </span>
                      </div>

                      <h3 className="font-serif-display text-4xl sm:text-5xl text-[#F1EEE8] leading-[1.06] mb-4">
                        {project.title}
                      </h3>

                      <p className="text-sm sm:text-base text-[#AAA9A4] leading-relaxed mb-7 max-w-lg">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-8">
                        {project.tags.slice(0, 4).map((tag) => (
                          <span
                            key={tag}
                            className="eyebrow px-2.5 py-1 border border-[rgba(204,220,245,0.14)] bg-white/[0.02] text-[#AAA9A4]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-wrap items-center gap-3.5">
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#F1EEE8] text-[#030303] text-xs font-semibold uppercase tracking-wider hover:bg-[#FF8C59] transition-all duration-300 shadow-md"
                        >
                          <span>{project.linkLabel}</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </a>

                        {project.daxSnippet && (
                          <button
                            type="button"
                            onClick={() => setSelectedProjectModal(project)}
                            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full border border-[#FF8C59]/50 bg-[#FF8C59]/10 text-xs font-semibold uppercase tracking-wider text-[#FF8C59] hover:bg-[#FF8C59] hover:text-[#030303] transition-all duration-300 cursor-pointer"
                          >
                            <BarChart3 className="w-4 h-4" />
                            <span>Inspect KPIs &amp; DAX</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
              </div>
            </div>
          )}
        </section>

        {/* RESEARCH PUBLICATION & CREDENTIALS (Right after Selected Work!) */}
        <section
          id="credentials"
          className="gutter-box py-24 border-b border-[rgba(204,220,245,0.14)] bg-[#060608]"
        >
          <Reveal className="mb-20">
            <span className="eyebrow text-[#FF8C59] block mb-3">
              02 / Published Research Paper
            </span>
            <h2 className="font-serif-display text-4xl sm:text-5xl text-[#F1EEE8] mb-8">
              Journal{' '}
              <span className="italic text-[#AAA9A4]">Publication</span>
            </h2>

            <div
              data-scroll-card
              className="surface-card p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-7 scroll-depth-story">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="eyebrow px-3 py-1 border border-[rgba(255,140,89,0.35)] text-[#FF8C59]">
                    MAT Journals · Vol. 12, Issue 1 (2026)
                  </span>
                  <span className="eyebrow text-[#AAA9A4]">
                    e-ISSN: 2581-7647
                  </span>
                </div>

                <h3 className="font-serif-display text-3xl sm:text-4xl text-[#F1EEE8] leading-snug mb-4">
                  Statistical Machine Learning-based Odometry Correction for
                  Cost-effective Indoor Robot Localization
                </h3>

                <p className="text-sm text-[#AAA9A4] leading-relaxed mb-6">
                  Presented at the National Level Anveshnam Workshop (3rd Prize)
                  and published in the Journal of Statistics and Mathematical
                  Engineering. Replaces expensive 3D LiDAR with Statistical
                  Machine Learning, Gaussian noise modeling, Fisher&apos;s
                  Kurtosis, and ArUco vision resets.
                </p>

                <div className="flex flex-wrap gap-2">
                  {[
                    'Statistical Machine Learning',
                    'Gaussian Noise Modeling',
                    "Fisher's Kurtosis",
                    'ArUco Vision Resets',
                    'MSE Benchmarking',
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="eyebrow px-2.5 py-1 border border-[rgba(204,220,245,0.14)] text-[#AAA9A4]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 scroll-depth-visual">
                <div className="border border-[rgba(204,220,245,0.16)] bg-[#050507] p-2">
                  <img
                    src="images/certs/cert-mat-publication.jpg"
                    alt="MAT Journals Certificate of Publication"
                    width={900}
                    height={630}
                    loading="lazy"
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delayClass="delay-step-2">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <span className="eyebrow text-[#FF8C59] block mb-3">
                  <ScrambleText
                    text="03 / Credentials"
                    motionEnabled={motionEnabled}
                  />
                </span>
                <h2 className="font-serif-display text-4xl sm:text-5xl text-[#F1EEE8]">
                  Certifications
                </h2>
              </div>
              <span className="eyebrow text-[#AAA9A4]">
                Hover to preview · Click to expand
              </span>
            </div>

            <CredentialsVault certifications={certifications} />
          </Reveal>
        </section>

        {/* INTERACTIVE 3D KNOWLEDGE GLOBE (Below Certifications) */}
        <section
          id="explore-ai"
          className="gutter-box py-20 border-b border-[rgba(204,220,245,0.14)] bg-[#040406]"
        >
          <Reveal>
            <DataGlobeNetwork
              onSelectProject={(proj) => setSelectedProjectModal(proj)}
            />
          </Reveal>
        </section>

        {/* CAPABILITIES */}
        <section
          id="capabilities"
          className="gutter-box py-24 border-b border-[rgba(204,220,245,0.14)]"
        >
          <Reveal>
            <div className="mb-12">
              <span className="eyebrow text-[#FF8C59] block mb-3">
                <ScrambleText
                  text="02 / Capabilities"
                  motionEnabled={motionEnabled}
                />
              </span>
              <h2 className="font-serif-display text-4xl sm:text-6xl text-[#F1EEE8]">
                What I{' '}
                <span className="font-pixel text-3xl sm:text-5xl text-[#FF8C59] font-normal">
                  Work With
                </span>
              </h2>
            </div>
          </Reveal>

          <div className="divide-y divide-[rgba(204,220,245,0.14)] border-y border-[rgba(204,220,245,0.14)]">
            {capabilities.map((cap) => {
              const isOpen = openCapability === cap.id;
              return (
                <div key={cap.id}>
                  <button
                    onClick={() => setOpenCapability(isOpen ? null : cap.id)}
                    className="w-full py-7 flex items-center justify-between text-left cursor-pointer group"
                  >
                    <div className="flex items-baseline gap-6">
                      <span className="eyebrow text-[#FF8C59]">
                        {cap.number}
                      </span>
                      <div>
                        <h3 className="font-serif-display text-2xl sm:text-4xl text-[#F1EEE8] group-hover:text-[#FF8C59] transition-colors">
                          {cap.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#AAA9A4] mt-1">
                          {cap.tagline}
                        </p>
                      </div>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-[#AAA9A4] transition-transform duration-300 shrink-0 ${
                        isOpen ? 'rotate-180 text-[#FF8C59]' : ''
                      }`}
                    />
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-500 ease-out ${
                      isOpen ? 'max-h-96 opacity-100 pb-8' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="pl-11 pr-4">
                      <p className="text-sm text-[#D8D5CE] leading-relaxed mb-5 max-w-3xl">
                        {cap.details}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {cap.skills.map((skill) => (
                          <span
                            key={skill}
                            className="eyebrow px-3 py-1 border border-[rgba(255,140,89,0.3)] text-[#FF8C59]"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <Reveal className="mt-14">
            <ModelTrainingPipeline motionEnabled={motionEnabled} />
            <DataWorkbench />
          </Reveal>
        </section>

        {/* CREATIVE HABITS & CRAFT */}
        <section
          id="habits"
          className="gutter-box py-24 border-b border-[rgba(204,220,245,0.14)] bg-[#060607]"
        >
          <Reveal>
            <div className="mb-12">
              <span className="eyebrow text-[#FF8C59] block mb-3">
                <ScrambleText
                  text="03 / Creative Habits"
                  motionEnabled={motionEnabled}
                />
              </span>
              <h2 className="font-serif-display text-4xl sm:text-6xl text-[#F1EEE8]">
                How I{' '}
                <span className="font-pixel text-3xl sm:text-5xl text-[#FF8C59] font-normal">
                  Approach Craft
                </span>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {creativeHabits.map((habit, idx) => (
              <Reveal
                key={habit.index}
                delayClass={`delay-step-${idx + 1}`}
                className="h-full"
              >
                <div className="surface-card p-6 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="eyebrow text-[#FF8C59]">
                        {habit.index}
                      </span>
                      <span className="eyebrow text-[#AAA9A4] border border-[rgba(204,220,245,0.12)] px-2.5 py-0.5">
                        {habit.tag}
                      </span>
                    </div>
                    <h3 className="font-serif-display text-2xl text-[#F1EEE8] mb-3">
                      {habit.title}
                    </h3>
                    <p className="text-sm text-[#AAA9A4] leading-relaxed">
                      {habit.detail}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* EDUCATION & JOURNEY (Self-Drawing Scroll Timeline) */}
        <section
          id="journey"
          ref={journeyRef}
          className="gutter-box py-24 border-b border-[rgba(204,220,245,0.14)]"
        >
          <Reveal>
            <span className="eyebrow text-[#FF8C59] block mb-3">
              06 / Background
            </span>
            <h2 className="font-serif-display text-4xl sm:text-5xl text-[#F1EEE8] mb-10">
              Education &amp;{' '}
              <span className="italic text-[#AAA9A4]">Journey</span>
            </h2>

            {/* Self-drawing horizontal timeline track */}
            <div className="relative h-px bg-[rgba(204,220,245,0.14)] mb-10">
              <div
                className="absolute top-0 left-0 h-[2px] -translate-y-1/2 bg-[#FF8C59] shadow-[0_0_12px_rgba(255,140,89,0.7)] transition-[width] duration-150 ease-out"
                style={{
                  width: `${
                    motionEnabled ? Math.round(journeyProgress * 100) : 100
                  }%`,
                }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {journey.map((item, idx) => {
                const threshold = idx / Math.max(1, journey.length);
                const isActive = !motionEnabled || journeyProgress >= threshold;
                return (
                  <div
                    key={idx}
                    className={`relative pt-4 transition-all duration-500 ${
                      isActive ? 'opacity-100' : 'opacity-45'
                    }`}
                  >
                    <div
                      className={`w-2.5 h-2.5 rounded-full mb-4 transition-all duration-500 ${
                        isActive
                          ? 'bg-[#FF8C59] shadow-[0_0_12px_rgba(255,140,89,0.85)] scale-110'
                          : 'bg-[#26262b] border border-[rgba(204,220,245,0.2)]'
                      }`}
                    />
                    <span className="eyebrow text-[#FF8C59] block mb-2">
                      {item.period}
                    </span>
                    <h3 className="text-lg font-medium text-[#F1EEE8] mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#FF8C59]/90 mb-3">
                      {item.place}
                    </p>
                    <p className="text-sm text-[#AAA9A4]/90 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </section>

        {/* CONTACT / EDITORIAL FOOTER */}
        <section id="contact" className="gutter-box py-24">
          <Reveal>
            <div className="max-w-4xl">
              <span className="eyebrow text-[#FF8C59] block mb-4">
                06 / Get In Touch
              </span>
              <h2 className="font-serif-display text-5xl sm:text-7xl md:text-8xl text-[#F1EEE8] leading-[0.98] mb-6">
                Let&apos;s turn data into{' '}
                <span className="italic text-[#FF8C59]">impact.</span>
              </h2>
              <p className="text-base text-[#AAA9A4] max-w-xl mb-10">
                Open to Data Analytics internships, Power BI collaborations, and
                AI-driven student projects. Reach out directly anytime.
              </p>

              <div className="flex flex-wrap items-center gap-4 mb-16">
                <a
                  href={`mailto:${profileData.email}`}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#F1EEE8] text-[#030303] text-xs font-semibold uppercase tracking-wider hover:bg-[#FF8C59] transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Email Me
                </a>

                <button
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-2.5 px-5 py-3.5 rounded-full border border-[rgba(204,220,245,0.2)] text-xs text-[#F1EEE8] hover:border-[#FF8C59] transition-colors cursor-pointer"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-4 h-4 text-[#FF8C59]" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      {profileData.email}
                    </>
                  )}
                </button>
              </div>
            </div>
          </Reveal>

          <footer className="pt-8 border-t border-[rgba(204,220,245,0.14)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <span className="eyebrow text-[#AAA9A4]">
              © {new Date().getFullYear()} {profileData.name} · Palghar, India
            </span>
            <div className="flex items-center gap-6 text-xs text-[#AAA9A4]">
              <a
                href={profileData.linkedin}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#FF8C59] transition-colors"
              >
                LinkedIn
              </a>
              <a
                href={profileData.githubAnalytics}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#FF8C59] transition-colors"
              >
                GitHub · Data Science &amp; BI
              </a>
              <a
                href={profileData.githubDev}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#FF8C59] transition-colors"
              >
                GitHub · AI &amp; SaaS Experiments
              </a>
            </div>
          </footer>
        </section>
      </main>

      {/* FLOATING BOTTOM-RIGHT RISBOT CHATBOT */}
      <PortfolioAssistant />

      {/* ATS-READY RESUME MODAL */}
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />

      {/* POWER BI CASE STUDY MODAL */}
      {selectedProjectModal && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedProjectModal(null)}
        >
          <div
            className="surface-card max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 mb-5">
              <div>
                <span className="eyebrow text-[#FF8C59]">
                  Dashboard Architecture
                </span>
                <h3 className="font-serif-display text-3xl text-[#F1EEE8] mt-1">
                  {selectedProjectModal.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedProjectModal(null)}
                aria-label="Close Modal"
                className="p-2 border border-[rgba(204,220,245,0.16)] text-[#AAA9A4] hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {selectedProjectModal.image && (
              <img
                src={selectedProjectModal.image}
                alt={selectedProjectModal.title}
                className="w-full h-52 object-cover border border-[rgba(204,220,245,0.14)] mb-5"
              />
            )}

            <div className="mb-5">
              <h4 className="eyebrow text-[#AAA9A4] mb-2">Key DAX Measures</h4>
              <pre className="p-4 bg-[#030303] border border-[rgba(204,220,245,0.14)] text-xs font-mono-code text-[#FF8C59] overflow-x-auto leading-relaxed">
                {selectedProjectModal.daxSnippet}
              </pre>
            </div>

            <div className="mb-6">
              <h4 className="eyebrow text-[#AAA9A4] mb-2">
                Tracked Business KPIs
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                {[
                  { k: 'Total Revenue', v: '3.35M' },
                  { k: 'Net Profit', v: '1.26M' },
                  { k: 'Profit Margin', v: '35.83%' },
                  { k: 'Total Orders', v: '1,425' },
                  { k: 'AVG Order Value', v: '₹2,347.58' },
                  { k: 'Total Customers', v: '300' },
                ].map((kpi) => (
                  <div
                    key={kpi.k}
                    className="px-3 py-2.5 border border-[rgba(204,220,245,0.14)] bg-[#030303]"
                  >
                    <div className="font-mono-code text-sm text-[#FF8C59]">
                      {kpi.v}
                    </div>
                    <div className="text-[11px] text-[#AAA9A4] mt-0.5">
                      {kpi.k}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setSelectedProjectModal(null)}
                className="px-4 py-2 border border-[rgba(204,220,245,0.16)] text-xs text-[#AAA9A4] hover:text-white cursor-pointer"
              >
                Close
              </button>
              <a
                href={selectedProjectModal.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-5 py-2 bg-[#F1EEE8] text-[#030303] text-xs font-semibold hover:bg-[#FF8C59] transition-colors"
              >
                Open Power BI Repository
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
