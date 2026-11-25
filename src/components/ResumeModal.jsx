import React from 'react';
import { Download, Printer, X } from 'lucide-react';

export default function ResumeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-start justify-center p-3 sm:p-6 overflow-y-auto print:p-0 print:bg-white print:static"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[820px] my-4 print:my-0 print:max-w-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Action Bar (Hidden when printing) */}
        <div className="flex items-center justify-between mb-3 px-4 py-3 bg-[#0E0E12] border border-[rgba(204,220,245,0.18)] rounded-xl print:hidden">
          <span className="eyebrow text-[#FF8C59]">
            ATS-Ready Academic &amp; Data Science Resume
          </span>
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF8C59] text-[#030303] text-xs font-semibold hover:bg-[#F1EEE8] transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              Save as PDF / Print
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close Resume"
              className="p-2 rounded-full border border-white/15 text-[#AAA9A4] hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Crisp White Paper Resume Sheet (Exact Template Style) */}
        <div
          id="printable-resume"
          className="bg-white text-[#111111] px-8 sm:px-12 py-10 shadow-2xl print:shadow-none print:px-8 print:py-6"
          style={{ fontFamily: 'Georgia, "Times New Roman", Times, serif' }}
        >
          {/* Centered Header */}
          <header className="text-center pb-4 border-b border-[#222222]">
            <h1 className="text-[22px] sm:text-[24px] font-bold tracking-tight text-[#111111]">
              Rishabh Sonawane, B.Tech Data Science Student
            </h1>
            <p className="text-[12px] text-[#333333] mt-1.5 leading-relaxed">
              Palghar, Maharashtra, India · rishabhsonawane333@gmail.com
              <br />
              linkedin.com/in/rishabh-sonawane-554014387 · github.com/DataByRishabh
            </p>
          </header>

          {/* Metadata Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 py-2.5 border-b-[1.5px] border-[#111111] text-[11px]">
            <div className="text-[#555555]">Location</div>
            <div className="text-[#111111]">Palghar, Maharashtra, India</div>
            <div className="text-[#555555]">Focus Area</div>
            <div className="text-[#111111]">Data Science · BI · AI</div>
          </div>

          {/* PROFILE */}
          <section className="grid grid-cols-1 sm:grid-cols-12 gap-3 py-4 border-b-[1.5px] border-[#111111]">
            <div className="sm:col-span-3">
              <h2 className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#111111]">
                PROFILE
              </h2>
            </div>
            <div className="sm:col-span-9 text-[12px] leading-[1.55] text-[#222222]">
              B.Tech Data Science student (2025–2029) focused on Business
              Intelligence, Data Analytics, and AI/ML exploration. Experienced in
              building executive Power BI dashboards with DAX and relational data
              modeling, practicing SQL queries (beginner–intermediate), and
              co-authoring peer-reviewed academic research.
            </div>
          </section>

          {/* RESEARCH & PROJECTS */}
          <section className="py-4 border-b-[1.5px] border-[#111111]">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#111111] mb-3">
              RESEARCH &amp; PROJECTS
            </h2>

            <div className="space-y-4">
              {/* Item 1: Research Paper */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                <div className="sm:col-span-3 text-[11px] text-[#444444]">
                  Apr 2026
                </div>
                <div className="sm:col-span-9">
                  <div className="flex flex-wrap justify-between items-baseline gap-1">
                    <h3 className="text-[13px] font-bold text-[#111111]">
                      Published Research — MAT Journals
                    </h3>
                    <span className="text-[11px] italic text-[#444444]">
                      Vol. 12, Issue 1 · SJCEM
                    </span>
                  </div>
                  <ul className="list-disc pl-4 mt-1 space-y-0.5 text-[11.5px] leading-[1.45] text-[#222222]">
                    <li>
                      Co-authored published paper: <em>&ldquo;Statistical Machine Learning-based Odometry Correction for Cost-effective Indoor Robot Localization&rdquo;</em> (e-ISSN: 2581-7647).
                    </li>
                    <li>
                      Team won 3rd Prize at the National Level Anveshnam Workshop (SJCEM) for cost-effective indoor robot localization.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Item 2: Power BI */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                <div className="sm:col-span-3 text-[11px] text-[#444444]">
                  2025 – 2026
                </div>
                <div className="sm:col-span-9">
                  <div className="flex flex-wrap justify-between items-baseline gap-1">
                    <h3 className="text-[13px] font-bold text-[#111111]">
                      E-Commerce Sales &amp; Business Performance — Power BI
                    </h3>
                    <span className="text-[11px] italic text-[#444444]">
                      github.com/DataByRishabh
                    </span>
                  </div>
                  <ul className="list-disc pl-4 mt-1 space-y-0.5 text-[11.5px] leading-[1.45] text-[#222222]">
                    <li>
                      Built an interactive Power BI dashboard tracking 3.35M Total Revenue, 1.26M Net Profit, 35.83% Profit Margin, 1,425 Orders, ₹2,347.58 AOV, and 300 Customers.
                    </li>
                    <li>
                      Modeled relational table links across OrdersTable, ProductsTable, and DateTable with custom DAX measures and Category/Date slicers.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Item 3: Hardware */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                <div className="sm:col-span-3 text-[11px] text-[#444444]">
                  2026
                </div>
                <div className="sm:col-span-9">
                  <div className="flex flex-wrap justify-between items-baseline gap-1">
                    <h3 className="text-[13px] font-bold text-[#111111]">
                      Autonomous Robotics Car — Hardware Engineering
                    </h3>
                    <span className="text-[11px] italic text-[#444444]">
                      SJCEM Team Build
                    </span>
                  </div>
                  <ul className="list-disc pl-4 mt-1 space-y-0.5 text-[11.5px] leading-[1.45] text-[#222222]">
                    <li>
                      Engineered a three-wheel robotic chassis with dual DC geared motors, dual servo motors, and a custom OLED display.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Item 4: AI Concepts */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                <div className="sm:col-span-3 text-[11px] text-[#444444]">
                  2026
                </div>
                <div className="sm:col-span-9">
                  <div className="flex flex-wrap justify-between items-baseline gap-1">
                    <h3 className="text-[13px] font-bold text-[#111111]">
                      AI-Assisted Product Concepts — Vyronix &amp; Relief Hospital
                    </h3>
                    <span className="text-[11px] italic text-[#444444]">
                      github.com/risdev18
                    </span>
                  </div>
                  <ul className="list-disc pl-4 mt-1 space-y-0.5 text-[11.5px] leading-[1.45] text-[#222222]">
                    <li>
                      Designed fitness telemetry flows (Vyronix) and normalized healthcare data schemas (Relief Hospital) using AI-assisted workflows (Antigravity).
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* EDUCATION */}
          <section className="py-4 border-b-[1.5px] border-[#111111]">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#111111] mb-3">
              EDUCATION
            </h2>

            <div className="space-y-2.5 text-[12px]">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                <div className="sm:col-span-3 text-[11px] text-[#444444]">
                  2025 – 2029
                </div>
                <div className="sm:col-span-9 flex flex-wrap justify-between gap-1">
                  <span className="font-bold text-[#111111]">
                    B.Tech in Data Science
                  </span>
                  <span className="text-[#333333]">
                    St. John College of Engineering and Management
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                <div className="sm:col-span-3 text-[11px] text-[#444444]">
                  HSC
                </div>
                <div className="sm:col-span-9 flex flex-wrap justify-between gap-1">
                  <span className="font-bold text-[#111111]">
                    Higher Secondary Certificate (HSC)
                  </span>
                  <span className="text-[#333333]">AECS-1, Tarapur</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                <div className="sm:col-span-3 text-[11px] text-[#444444]">
                  SSC
                </div>
                <div className="sm:col-span-9 flex flex-wrap justify-between gap-1">
                  <span className="font-bold text-[#111111]">
                    Secondary School Certificate (SSC)
                  </span>
                  <span className="text-[#333333]">Don Bosco School, Boisar</span>
                </div>
              </div>
            </div>
          </section>

          {/* SKILLS */}
          <section className="py-4 border-b-[1.5px] border-[#111111]">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#111111] mb-2.5">
              SKILLS &amp; CERTIFICATIONS
            </h2>

            <div className="space-y-1.5 text-[11.5px]">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                <div className="sm:col-span-3 text-[10.5px] font-semibold uppercase text-[#444444]">
                  BI &amp; ANALYTICS:
                </div>
                <div className="sm:col-span-9 text-[#222222]">
                  Microsoft Power BI Desktop, DAX, Data Modeling, Power Query, KPI Design
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                <div className="sm:col-span-3 text-[10.5px] font-semibold uppercase text-[#444444]">
                  DATA &amp; CODE:
                </div>
                <div className="sm:col-span-9 text-[#222222]">
                  SQL (Beginner–Intermediate), C, C++
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                <div className="sm:col-span-3 text-[10.5px] font-semibold uppercase text-[#444444]">
                  CERTIFICATIONS:
                </div>
                <div className="sm:col-span-9 text-[#222222]">
                  AI Skills Passport (EY &amp; Microsoft), Data Analyst 101 (Microsoft &amp; Simplilearn), LLM For Young Developers (IndiaAI &amp; Meta), Python for Prompt Engineering
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                <div className="sm:col-span-3 text-[10.5px] font-semibold uppercase text-[#444444]">
                  DIGITAL &amp; MEDIA:
                </div>
                <div className="sm:col-span-9 text-[#222222]">
                  YouTube Content Strategy, Channel Management, Audience Analytics
                </div>
              </div>
            </div>
          </section>

          {/* LANGUAGES */}
          <section className="pt-3 grid grid-cols-1 sm:grid-cols-12 gap-2 text-[11.5px]">
            <div className="sm:col-span-3">
              <h2 className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#111111]">
                LANGUAGES
              </h2>
            </div>
            <div className="sm:col-span-9 grid grid-cols-3 gap-4 text-[#222222]">
              <div>
                <span className="font-semibold">English</span> · Fluent
              </div>
              <div>
                <span className="font-semibold">Hindi</span> · Fluent
              </div>
              <div>
                <span className="font-semibold">Marathi</span> · Native
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
