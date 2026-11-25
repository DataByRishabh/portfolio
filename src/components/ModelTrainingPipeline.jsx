import React, { useEffect, useState } from 'react';
import { Activity, Cpu, Database, Filter, Pause, Play, TrendingUp } from 'lucide-react';

const STAGES = [
  {
    id: 'raw',
    step: '01',
    label: 'Raw Data',
    icon: Database,
    metric: '1,425 Rows · 3 Tables',
    detail:
      'Ingesting raw transaction logs, sensor odometry streams, and multi-source CSVs with schema validation.',
    sample: 'orders_raw.csv → [order_id, sku, qty, price, timestamp]',
  },
  {
    id: 'prep',
    step: '02',
    label: 'Preprocessing',
    icon: Filter,
    metric: '0% Nulls · Normalized',
    detail:
      'Power Query ETL cleaning, Gaussian noise filtering, Fisher’s Kurtosis outlier checks, and relational table joins.',
    sample: 'OrdersTable ⋈ ProductsTable ⋈ DateTable (1:N)',
  },
  {
    id: 'model',
    step: '03',
    label: 'Model & DAX',
    icon: Cpu,
    metric: 'Statistical ML + DAX',
    detail:
      'Statistical ML training and DAX measure evaluation for profit velocity and drift correction.',
    sample: 'Profit Margin % = DIVIDE([Total Profit], [Completed Sales], 0)',
  },
  {
    id: 'predict',
    step: '04',
    label: 'Prediction & KPI',
    icon: TrendingUp,
    metric: '35.83% Margin · 3.35M',
    detail:
      'Actionable executive KPIs and localization predictions surfaced with MSE benchmarking and interactive slicers.',
    sample: 'Output → Revenue: 3.35M | Net Profit: 1.26M | AOV: ₹2,347.58',
  },
];

export default function ModelTrainingPipeline({ motionEnabled = true }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!motionEnabled || !autoPlay) return;
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % STAGES.length);
    }, 2400);
    return () => clearInterval(timer);
  }, [motionEnabled, autoPlay]);

  const active = STAGES[activeIdx];

  return (
    <div className="surface-card rounded-2xl p-6 sm:p-8 mb-16 relative overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-7">
        <div>
          <span className="eyebrow text-[#FF8C59] flex items-center gap-2 mb-1.5">
            <Activity className="w-3.5 h-3.5" />
            Live Pipeline Simulation
          </span>
          <h3 className="font-serif-display text-2xl sm:text-3xl text-[#F1EEE8]">
            Model &amp; Analytics{' '}
            <span className="italic text-[#AAA9A4]">Training Journey</span>
          </h3>
        </div>

        <button
          type="button"
          onClick={() => setAutoPlay((p) => !p)}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-[rgba(204,220,245,0.18)] text-[11px] font-mono-code text-[#AAA9A4] hover:border-[#FF8C59] hover:text-[#FF8C59] transition-colors cursor-pointer"
        >
          {autoPlay ? (
            <>
              <Pause className="w-3 h-3" />
              Auto-Cycle: On
            </>
          ) : (
            <>
              <Play className="w-3 h-3" />
              Auto-Cycle: Off
            </>
          )}
        </button>
      </div>

      {/* 4-Stage Pipeline Nodes + Animated Data Stream */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
        {STAGES.map((stage, idx) => {
          const Icon = stage.icon;
          const isActive = idx === activeIdx;
          const isCompleted = idx < activeIdx;

          return (
            <button
              key={stage.id}
              type="button"
              onClick={() => {
                setActiveIdx(idx);
                setAutoPlay(false);
              }}
              className={`relative text-left p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'bg-[#FF8C59]/10 border-[#FF8C59] shadow-[0_0_24px_rgba(255,140,89,0.18)]'
                  : isCompleted
                  ? 'bg-[#0E0E12] border-[#FF8C59]/35'
                  : 'bg-[#08080A] border-[rgba(204,220,245,0.12)] hover:border-[rgba(204,220,245,0.3)]'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono-code text-[10px] text-[#FF8C59]">
                  {stage.step}
                </span>
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                    isActive
                      ? 'bg-[#FF8C59] text-[#030303]'
                      : 'bg-white/[0.04] text-[#AAA9A4]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div className="text-sm font-semibold text-[#F1EEE8] mb-1">
                {stage.label}
              </div>
              <div className="font-mono-code text-[11px] text-[#AAA9A4]">
                {stage.metric}
              </div>

              {/* Flowing progress bar on active stage */}
              <div className="mt-3 h-0.5 w-full bg-white/[0.06] overflow-hidden rounded-full">
                <div
                  className={`h-full bg-[#FF8C59] transition-all duration-500 ${
                    isActive
                      ? 'w-full pipeline-pulse'
                      : isCompleted
                      ? 'w-full opacity-50'
                      : 'w-0'
                  }`}
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Stage Telemetry Readout */}
      <div className="mt-5 p-4 rounded-xl bg-[#050507] border border-[rgba(204,220,245,0.12)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="max-w-xl">
          <span className="eyebrow text-[#FF8C59] block mb-1">
            Stage {active.step} · {active.label}
          </span>
          <p className="text-xs sm:text-sm text-[#D8D5CE] leading-relaxed">
            {active.detail}
          </p>
        </div>
        <code className="px-3.5 py-2 rounded-lg bg-[#0C0C10] border border-[rgba(255,140,89,0.22)] font-mono-code text-[11px] text-[#FF8C59] whitespace-nowrap overflow-x-auto">
          {active.sample}
        </code>
      </div>
    </div>
  );
}
