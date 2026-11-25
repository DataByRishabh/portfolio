import React, { useState } from 'react';
import { Database, Terminal } from 'lucide-react';

const TABS = [
  {
    id: 'dax',
    label: 'DAX · Power BI KPIs',
    language: 'Power BI DAX (Production Project)',
    code: `Completed Sales = 
CALCULATE(SUM(OrdersTable[Sales]), OrdersTable[Status] = "Completed")

Profit Margin % = 
DIVIDE([Total Profit], [Completed Sales], 0)

AVG Order Value = 
DIVIDE([Completed Sales], [Completed Orders], 0)`,
    insight:
      'Powers the 6 executive KPI cards in my E-Commerce dashboard: 3.35M Revenue, 1.26M Net Profit, 35.83% Margin, and ₹2,347.58 AOV.',
  },
  {
    id: 'sql',
    label: 'SQL · Practice Queries',
    language: 'SQL (Beginner–Intermediate · Actively Practicing)',
    code: `-- Practicing core aggregations & filtering
SELECT Category,
       COUNT(OrderID) AS Total_Orders,
       SUM(Sales)     AS Total_Sales
FROM OrdersTable
WHERE OrderStatus = 'Completed'
GROUP BY Category
ORDER BY Total_Sales DESC;`,
    insight:
      'Currently solving practice problems covering SELECT, WHERE, GROUP BY, ORDER BY, and basic JOINs.',
  },
];

export default function DataWorkbench() {
  const [activeTab, setActiveTab] = useState('dax');
  const current = TABS.find((t) => t.id === activeTab);

  return (
    <div className="surface-card overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-4 border-b border-[rgba(204,220,245,0.14)] bg-[#070709]">
        <div className="flex items-center gap-2.5">
          <Terminal className="w-4 h-4 text-[#FF8C59]" />
          <span className="eyebrow text-[#F1EEE8]">
            Analytics &amp; Learning Workbench
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-1.5 text-xs font-mono-code transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#FF8C59] text-[#030303] font-semibold'
                  : 'border border-[rgba(204,220,245,0.16)] text-[#AAA9A4] hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 sm:p-8 bg-[#040406]">
        <div className="flex items-center justify-between mb-3">
          <span className="eyebrow text-[#FF8C59]">{current.language}</span>
          <span className="eyebrow text-[#AAA9A4] flex items-center gap-1.5">
            <Database className="w-3 h-3" />
            Honest Skill Snapshot
          </span>
        </div>

        <pre className="p-5 bg-[#09090C] border border-[rgba(204,220,245,0.12)] font-mono-code text-xs sm:text-[13px] text-[#F1EEE8] overflow-x-auto leading-relaxed mb-4">
          <code>{current.code}</code>
        </pre>

        <p className="text-xs sm:text-sm text-[#AAA9A4]">
          <span className="text-[#FF8C59] font-medium">Focus: </span>
          {current.insight}
        </p>
      </div>
    </div>
  );
}
