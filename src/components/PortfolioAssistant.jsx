import React, { useState } from 'react';
import { ArrowUpRight, Bot, MessageSquare, Send, User, X } from 'lucide-react';
import {
  capabilities,
  certifications,
  journey,
  profileData,
  projects,
} from '../data/portfolioData';

const QUICK_PROMPTS = [
  'Show me his best SQL project',
  'Tell me about his Power BI dashboard',
  'What did he publish in MAT Journals?',
  'What are his core skills?',
];

function answerPortfolioQuery(rawQuery) {
  const q = rawQuery.toLowerCase().trim();

  if (q.includes('sql') || q.includes('database') || q.includes('erd') || q.includes('schema')) {
    const relief = projects.find((p) => p.id === 'relief-hospital');
    const ecom = projects.find((p) => p.id === 'ecommerce-powerbi');
    return {
      text: `Rishabh's strongest relational data & SQL-aligned work is **${relief.title}** (${relief.subtitle}), mapping 1-to-Many joins across Patients, Doctors, and Appointments. His **${ecom.title}** project also links OrdersTable, ProductsTable, and DateTable across 1,425 orders.`,
      links: [
        { label: 'Relief Hospital Repo', url: relief.link },
        { label: 'Power BI Analytics Repo', url: ecom.link },
      ],
    };
  }

  if (q.includes('power bi') || q.includes('dax') || q.includes('dashboard') || q.includes('ecommerce') || q.includes('sales')) {
    const ecom = projects.find((p) => p.id === 'ecommerce-powerbi');
    return {
      text: `His flagship BI project is **${ecom.title}** (${ecom.subtitle}). It tracks **3.35M Total Revenue**, **1.26M Net Profit**, **35.83% Margin**, **1,425 Orders**, **₹2,347.58 AOV**, and **300 Customers**.`,
      links: [{ label: ecom.linkLabel, url: ecom.link }],
    };
  }

  if (q.includes('journal') || q.includes('paper') || q.includes('research') || q.includes('mat') || q.includes('publish') || q.includes('prize') || q.includes('achievement')) {
    const mat = certifications[0];
    return {
      text: `Rishabh co-authored **"${mat.title}"** in **MAT Journals (Vol. 12, Issue 1, 2026, e-ISSN: 2581-7647)** and won **3rd Prize at the National Level Anveshnam Workshop (SJCEM)** using Statistical Machine Learning, Gaussian noise modeling, Fisher's Kurtosis, and ArUco vision resets.`,
      links: [],
    };
  }

  if (q.includes('robot') || q.includes('hardware') || q.includes('arduino') || q.includes('batman')) {
    const bot = projects.find((p) => p.id === 'batman-robotics');
    return {
      text: `In hardware engineering, he built the **${bot.title}** with a 4-member team — featuring a three-wheel chassis, dual DC geared motors, dual servo arms, and a custom OLED display.`,
      links: [{ label: bot.linkLabel, url: bot.link }],
    };
  }

  if (q.includes('vyronix') || q.includes('prana') || q.includes('fitness') || q.includes('ai')) {
    const vy = projects.find((p) => p.id === 'vyronix-gym-app');
    return {
      text: `**${vy.title}** uses structured LLM prompt logic to turn fitness goals and recovery inputs into workout volume and calorie telemetry, deployed live on Vercel.`,
      links: [{ label: vy.linkLabel, url: vy.link }],
    };
  }

  if (q.includes('skill') || q.includes('stack') || q.includes('tool') || q.includes('work with') || q.includes('capabilit')) {
    const list = capabilities
      .map((c) => `• **${c.title}**: ${c.skills.join(', ')}`)
      .join('\n');
    return {
      text: `Rishabh's verified stack:\n${list}`,
      links: [],
    };
  }

  if (q.includes('education') || q.includes('college') || q.includes('degree') || q.includes('study') || q.includes('school')) {
    const edu = journey.map((j) => `• **${j.title}** — ${j.place} (${j.period})`).join('\n');
    return {
      text: `Rishabh's academic background:\n${edu}`,
      links: [],
    };
  }

  if (q.includes('contact') || q.includes('hire') || q.includes('intern') || q.includes('email') || q.includes('linkedin')) {
    return {
      text: `${profileData.availability}! Reach Rishabh at **${profileData.email}** or connect via LinkedIn / GitHub.`,
      links: [
        { label: 'LinkedIn', url: profileData.linkedin },
        { label: 'Data Science GitHub', url: profileData.githubAnalytics },
      ],
    };
  }

  return {
    text: `I'm **Risbot**, Rishabh's portfolio assistant! Ask me about his **SQL & Data projects**, **Power BI dashboard**, **MAT Journal paper**, or **Skills**.`,
    links: [{ label: 'Data Science GitHub', url: profileData.githubAnalytics }],
  };
}

export default function PortfolioAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: `Hi! I'm **Risbot**. Ask me about ${profileData.name}'s projects, SQL/Power BI work, research, or skills.`,
      links: [],
    },
  ]);

  const sendQuery = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const reply = answerPortfolioQuery(trimmed);
    setMessages((prev) => [
      ...prev,
      { role: 'user', text: trimmed },
      { role: 'assistant', text: reply.text, links: reply.links },
    ]);
    setInput('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendQuery(input);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-3 w-[calc(100vw-2.5rem)] sm:w-[360px] rounded-2xl border border-[rgba(204,220,245,0.2)] bg-[#0A0A0E]/95 backdrop-blur-xl shadow-[0_24px_60px_rgba(0,0,0,0.85)] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="px-4 py-3 border-b border-[rgba(204,220,245,0.14)] bg-[#0E0E13] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-[#FF8C59]/15 border border-[#FF8C59]/45 flex items-center justify-center">
                <Bot className="w-3.5 h-3.5 text-[#FF8C59]" />
              </div>
              <div>
                <div className="text-xs font-semibold text-[#F1EEE8] leading-none">
                  Risbot
                </div>
                <div className="font-mono-code text-[9px] text-[#FF8C59] mt-0.5">
                  Portfolio AI · Online
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close Risbot"
              className="p-1.5 rounded-lg text-[#AAA9A4] hover:text-[#F1EEE8] hover:bg-white/[0.06] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Prompts */}
          <div className="px-3 pt-2.5 pb-1.5 flex flex-wrap gap-1 border-b border-[rgba(204,220,245,0.08)]">
            {QUICK_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => sendQuery(prompt)}
                className="px-2.5 py-1 rounded-full bg-[#060608] border border-[rgba(204,220,245,0.14)] text-[10px] font-mono-code text-[#AAA9A4] hover:border-[#FF8C59] hover:text-[#FF8C59] transition-colors cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Chat Messages */}
          <div className="p-3 space-y-2.5 max-h-[260px] overflow-y-auto">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-2 ${
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-6 h-6 rounded-full bg-[#FF8C59]/15 border border-[#FF8C59]/40 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-3 h-3 text-[#FF8C59]" />
                  </div>
                )}

                <div
                  className={`max-w-[82%] rounded-xl px-3 py-2 text-xs leading-relaxed whitespace-pre-line ${
                    msg.role === 'user'
                      ? 'bg-[#FF8C59] text-[#030303] font-medium'
                      : 'bg-[#060608] border border-[rgba(204,220,245,0.12)] text-[#E6E3DC]'
                  }`}
                >
                  {msg.text.split('**').map((part, i) =>
                    i % 2 === 1 ? (
                      <strong key={i} className="font-semibold text-[#FF8C59]">
                        {part}
                      </strong>
                    ) : (
                      part
                    )
                  )}

                  {msg.links && msg.links.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {msg.links.map((lnk) => (
                        <a
                          key={lnk.url}
                          href={lnk.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/[0.06] border border-[rgba(204,220,245,0.2)] text-[10px] text-[#F1EEE8] hover:border-[#FF8C59] hover:text-[#FF8C59] transition-colors"
                        >
                          {lnk.label}
                          <ArrowUpRight className="w-2.5 h-2.5" />
                        </a>
                      ))}
                    </div>
                  )}
                </div>

                {msg.role === 'user' && (
                  <div className="w-6 h-6 rounded-full bg-white/[0.08] border border-white/15 flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-3 h-3 text-[#F1EEE8]" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="p-2.5 border-t border-[rgba(204,220,245,0.12)] bg-[#0E0E13] flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Risbot..."
              className="flex-1 px-3 py-2 rounded-lg bg-[#050507] border border-[rgba(204,220,245,0.16)] text-xs text-[#F1EEE8] placeholder-[#AAA9A4]/60 focus:outline-none focus:border-[#FF8C59]"
            />
            <button
              type="submit"
              aria-label="Send message to Risbot"
              className="p-2 rounded-lg bg-[#FF8C59] text-[#030303] hover:opacity-90 transition-opacity cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}

      {/* Compact Floating Risbot Pill */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#0D0D12]/95 border border-[#FF8C59]/60 text-xs font-semibold text-[#F1EEE8] shadow-[0_10px_30px_rgba(0,0,0,0.65),0_0_20px_rgba(255,140,89,0.2)] hover:bg-[#FF8C59] hover:text-[#030303] transition-all duration-300 cursor-pointer"
      >
        <MessageSquare className="w-3.5 h-3.5 text-[#FF8C59] group-hover:text-current" />
        <span>Risbot</span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#FF8C59] animate-pulse" />
      </button>
    </div>
  );
}
