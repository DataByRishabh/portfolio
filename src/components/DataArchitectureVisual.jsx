import React from 'react';
import { ArrowRight, Cpu, Database, GitBranch } from 'lucide-react';

export default function DataArchitectureVisual({ type }) {
  if (type === 'vyronix-pipeline') {
    return (
      <div className="border border-[rgba(204,220,245,0.16)] bg-[#070709] p-5 sm:p-6">
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-[rgba(204,220,245,0.1)]">
          <span className="eyebrow text-[#FF8C59] flex items-center gap-2">
            <Cpu className="w-3.5 h-3.5" />
            AI Decision &amp; Telemetry Flow
          </span>
          <span className="font-pixel text-[11px] text-[#AAA9A4]">
            PRANA ENGINE
          </span>
        </div>

        <div className="space-y-3">
          <div className="p-3.5 border border-[rgba(204,220,245,0.12)] bg-[#0B0B0E]">
            <span className="eyebrow text-[#AAA9A4] block mb-1">
              01 · Input Features
            </span>
            <p className="font-mono-code text-xs text-[#F1EEE8]">
              user_goal · split_days · recovery_score · volume_history
            </p>
          </div>

          <div className="flex justify-center">
            <ArrowRight className="w-4 h-4 text-[#FF8C59] rotate-90" />
          </div>

          <div className="p-3.5 border border-[rgba(255,140,89,0.35)] bg-[rgba(255,140,89,0.05)]">
            <span className="eyebrow text-[#FF8C59] block mb-1">
              02 · LLM &amp; Rule Logic
            </span>
            <p className="font-mono-code text-xs text-[#F1EEE8]">
              Structured Prompting → Progressive Overload Calculation
            </p>
          </div>

          <div className="flex justify-center">
            <ArrowRight className="w-4 h-4 text-[#FF8C59] rotate-90" />
          </div>

          <div className="p-3.5 border border-[rgba(204,220,245,0.12)] bg-[#0B0B0E]">
            <span className="eyebrow text-[#AAA9A4] block mb-1">
              03 · Tracked Output Metrics
            </span>
            <div className="grid grid-cols-3 gap-2 mt-2 text-center">
              <div className="p-2 bg-[#050507] border border-[rgba(204,220,245,0.1)]">
                <div className="font-mono-code text-xs text-[#FF8C59]">Sets/Rep</div>
                <div className="text-[10px] text-[#AAA9A4]">Target</div>
              </div>
              <div className="p-2 bg-[#050507] border border-[rgba(204,220,245,0.1)]">
                <div className="font-mono-code text-xs text-[#F1EEE8]">Kcal</div>
                <div className="text-[10px] text-[#AAA9A4]">Burn Est.</div>
              </div>
              <div className="p-2 bg-[#050507] border border-[rgba(204,220,245,0.1)]">
                <div className="font-mono-code text-xs text-[#F1EEE8]">Volume</div>
                <div className="text-[10px] text-[#AAA9A4]">Weekly</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-[rgba(204,220,245,0.16)] bg-[#070709] p-5 sm:p-6">
      <div className="flex items-center justify-between pb-4 mb-5 border-b border-[rgba(204,220,245,0.1)]">
        <span className="eyebrow text-[#FF8C59] flex items-center gap-2">
          <Database className="w-3.5 h-3.5" />
          Relational Data Schema (ERD)
        </span>
        <span className="font-pixel text-[11px] text-[#AAA9A4]">
          NORMALIZED
        </span>
      </div>

      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 border border-[rgba(204,220,245,0.14)] bg-[#0B0B0E]">
            <span className="eyebrow text-[#FF8C59] block mb-1.5">
              Patients_Dim
            </span>
            <ul className="font-mono-code text-[11px] text-[#AAA9A4] space-y-1">
              <li>
                <span className="text-[#F1EEE8]">PK</span> patient_id
              </li>
              <li>full_name</li>
              <li>age_group</li>
            </ul>
          </div>

          <div className="p-3 border border-[rgba(204,220,245,0.14)] bg-[#0B0B0E]">
            <span className="eyebrow text-[#FF8C59] block mb-1.5">
              Doctors_Dim
            </span>
            <ul className="font-mono-code text-[11px] text-[#AAA9A4] space-y-1">
              <li>
                <span className="text-[#F1EEE8]">PK</span> doctor_id
              </li>
              <li>department</li>
              <li>slot_status</li>
            </ul>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 text-[#FF8C59] py-1">
          <GitBranch className="w-4 h-4" />
          <span className="eyebrow">1 : Many Foreign Key Joins</span>
        </div>

        <div className="p-3.5 border border-[rgba(255,140,89,0.35)] bg-[rgba(255,140,89,0.05)]">
          <span className="eyebrow text-[#FF8C59] block mb-1.5">
            Appointments_Fact
          </span>
          <p className="font-mono-code text-[11px] text-[#F1EEE8] leading-relaxed">
            PK appointment_id · FK patient_id · FK doctor_id · visit_date · triage_status
          </p>
        </div>
      </div>
    </div>
  );
}
