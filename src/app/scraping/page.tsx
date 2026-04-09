'use client';

import { TopNav } from '@/components/layout/TopNav';
import { LeftSidebar } from '@/components/layout/LeftSidebar';
import { 
  Asterisk, 
  Search, 
  Link as LinkIcon, 
  Globe, 
  Terminal as TerminalIcon, 
  Filter as FilterIcon,
  ChevronRight,
  Zap,
  Play,
  RotateCcw
} from 'lucide-react';
import { useState, useEffect } from 'react';

const platforms = [
  { id: 'linkedin', name: 'LinkedIn', icon: LinkIcon, lastScan: '2 min ago', status: 'Scanning for "Lead React"...', progress: 60, active: true },
  { id: 'indeed', name: 'Indeed', icon: Search, lastScan: '4 min ago', status: 'Querying API...', progress: 40, active: true },
  { id: 'glassdoor', name: 'Glassdoor', icon: Globe, lastScan: '12 min ago', status: 'Idle', progress: 0, active: false }
];

const logs = [
  { level: 'SUCCESS', message: 'Found 12 results on LinkedIn for "Staff Engineer"', color: 'text-green-400' },
  { level: 'FETCH', message: 'Requesting Glassdoor endpoint /v2/jobs?q=react...', color: 'text-text-muted' },
  { level: 'INFO', message: 'Parsed: Frontend Dev at Stripe (Match 94%)', color: 'text-white' },
  { level: 'INFO', message: 'Parsed: UI Architect at Airbnb (Match 88%)', color: 'text-white' },
  { level: 'SKIP', message: 'Already applied: Senior React Lead at Meta', color: 'text-amber-400' },
  { level: 'SUCCESS', message: 'Fetched 3 new valid entries from Indeed', color: 'text-green-400' },
  { level: 'INFO', message: 'Rotating proxy... US-EAST-1 established', color: 'text-white' },
  { level: 'INFO', message: 'Parsed: Product Engineer at Linear (Match 91%)', color: 'text-white' },
  { level: 'ERROR', message: 'Glassdoor rate limit exceeded. Retrying in 60s...', color: 'text-red-400' },
  { level: 'FETCH', message: 'Scanning niche boards... YCombinator Jobs...', color: 'text-text-muted' },
  { level: 'INFO', message: 'Found: Early Hire at Vercel (Match 98%)', color: 'text-white' },
  { level: 'SUCCESS', message: '1 entry added to Recent Discoveries', color: 'text-green-400' }
];

const discoveries = [
  { title: 'Lead Frontend Architect', skills: 'Node.js, React, GraphQL', company: 'Stripe', source: 'LinkedIn', posted: '2h ago', score: '98%', status: 'green' },
  { title: 'Senior Software Engineer', skills: 'Next.js, TypeScript', company: 'Vercel', source: 'LinkedIn', posted: '4h ago', score: '94%', status: 'green' },
  { title: 'Product Engineer (Growth)', skills: 'React, Fullstack', company: 'Linear', source: 'LinkedIn', posted: '8h ago', score: '78%', status: 'amber' },
  { title: 'Frontend Dev - UI Components', skills: 'Tailwind, React', company: 'Figma', source: 'Glassdoor', posted: '1d ago', score: '65%', status: 'amber' },
  { title: 'Staff React Specialist', skills: 'React, Next, AWS', company: 'Airbnb', source: 'Indeed', posted: '1d ago', score: '91%', status: 'green' }
];

export default function ScrapingPage() {
  const [isLive, setIsLive] = useState(true);

  return (
    <div className="min-h-screen bg-background text-text-primary">
      <TopNav />
      <LeftSidebar activeItem="Scraping" />

      <main className="pl-[220px] pt-[52px] pb-24 min-h-screen">
        <div className="max-w-[1400px] mx-auto p-8">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-start gap-4 border-l-4 border-accent-primary pl-4">
              <div>
                <h1 className="text-28px font-bold">Scraping Agent</h1>
                <p className="text-sm text-text-muted mt-1">Scanning live job boards in real-time</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="pulsing-dot" />
              <div className="px-3 py-1 bg-[#0a2a0a] border border-[#22c55e] rounded-full flex items-center gap-2">
                <span className="text-[#22c55e] text-[10px] font-bold tracking-widest uppercase">Live</span>
              </div>
            </div>
          </div>

          {/* Platform Cards */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            {platforms.map((p) => (
              <div key={p.id} className="bg-card-surface border border-border-color p-[18px] rounded-xl">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <p.icon size={18} className="text-text-muted" />
                    <span className="text-sm font-bold">{p.name}</span>
                  </div>
                  <span className="text-[10px] text-text-hint uppercase font-bold tracking-wider">Last: {p.lastScan}</span>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-1.5 h-1.5 rounded-full ${p.active ? 'bg-status-green pulsing-dot' : 'bg-text-hint'}`} />
                  <span className={`text-[11px] font-medium ${p.active ? 'text-text-muted' : 'text-text-hint'}`}>
                    {p.status}
                  </span>
                </div>
                <div className="w-full h-1 bg-input-bg rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-accent-primary rounded-full transition-all duration-1000" 
                    style={{ width: `${p.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-12 gap-6 mb-8">
            {/* Live Scan Log */}
            <div className="col-span-8 bg-sidebar-bg border border-border-color rounded-xl overflow-hidden">
              <div className="p-4 border-b border-border-color flex items-center justify-between bg-card-surface">
                <div className="flex items-center gap-2">
                  <TerminalIcon size={14} className="text-text-muted" />
                  <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">▣ Live Scan Log</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="animate-pulse text-[9px] font-bold text-[#22c55e]">↑ LIVE</span>
                </div>
              </div>
              <div className="p-4 bg-[#060610] font-mono text-[12px] leading-[1.8] h-[400px] overflow-y-auto custom-scrollbar">
                {logs.map((log, i) => (
                  <div key={i} className="flex gap-3">
                    <span className={`shrink-0 font-bold ${log.color}`}>[{log.level}]</span>
                    <span className={log.level === 'FETCH' ? 'text-text-muted' : 'text-white'}>{log.message}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Scan Filters */}
            <div className="col-span-4 bg-card-surface border border-border-color rounded-xl p-[18px]">
              <div className="flex items-center gap-2 mb-6">
                <FilterIcon size={14} className="text-text-muted" />
                <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">≡ Scan Filters</span>
              </div>
              
              <div className="space-y-5">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-text-hint uppercase tracking-wider">Keywords</label>
                  <input 
                    type="text" 
                    defaultValue="React, TypeScript, Node.js" 
                    className="input-field bg-sidebar-bg w-full"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-text-hint uppercase tracking-wider">Location</label>
                  <select className="input-field bg-sidebar-bg w-full appearance-none">
                    <option>Remote / India</option>
                    <option>United States</option>
                    <option>Europe</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-text-hint uppercase tracking-wider">Job Type</label>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-accent-primary text-white text-[11px] font-bold py-1.5 rounded-lg">Full-time</button>
                    <button className="flex-1 border border-border-color text-text-muted text-[11px] font-bold py-1.5 rounded-lg hover:border-accent-primary transition-colors">Contract</button>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-bold text-text-hint uppercase tracking-wider">Salary Range</label>
                    <span className="text-[10px] font-bold text-text-primary">₹28L – ₹50L+</span>
                  </div>
                  <div className="relative h-1 bg-[#2a2a40] rounded-full">
                    <div className="absolute left-[30%] right-0 h-full bg-accent-primary rounded-full" />
                    <div className="absolute left-[30%] top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-2 border-accent-primary rounded-full cursor-pointer" />
                  </div>
                </div>

                <div className="flex items-center justify-between py-2">
                  <label className="text-[10px] font-bold text-text-hint uppercase tracking-wider">Experience: 5+ Yrs</label>
                  <div className="w-8 h-4 bg-accent-primary rounded-full relative cursor-pointer">
                    <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-white rounded-full" />
                  </div>
                </div>

                <button className="w-full bg-[#1e1040] border border-[#5b4fd4] text-[#a89eff] text-xs font-bold py-2.5 rounded-lg hover:bg-opacity-80 transition-all mt-2">
                  Update Filters
                </button>
              </div>
            </div>
          </div>

          {/* Recent Discoveries */}
          <div className="bg-card-surface border border-border-color rounded-xl overflow-hidden">
            <div className="p-4 border-b border-border-color flex items-center justify-between">
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Recent Discoveries</span>
              <button className="text-[10px] font-bold text-accent-primary hover:underline uppercase tracking-wider">View All Matches</button>
            </div>
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border-color bg-sidebar-bg/50">
                  <th className="p-4 text-[10px] font-bold text-text-hint uppercase tracking-wider">Job Title</th>
                  <th className="p-4 text-[10px] font-bold text-text-hint uppercase tracking-wider">Company</th>
                  <th className="p-4 text-[10px] font-bold text-text-hint uppercase tracking-wider">Source</th>
                  <th className="p-4 text-[10px] font-bold text-text-hint uppercase tracking-wider">Posted</th>
                  <th className="p-4 text-[10px] font-bold text-text-hint uppercase tracking-wider">Match</th>
                  <th className="p-4 text-[10px] font-bold text-text-hint uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-color">
                {discoveries.map((job, i) => (
                  <tr key={i} className={`group transition-colors ${i % 2 === 1 ? 'bg-[#0d0d14]' : 'bg-transparent'} hover:bg-[#1a1a28]`}>
                    <td className="p-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-text-primary">{job.title}</span>
                        <span className="text-[10px] text-text-muted mt-1">{job.skills}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-input-bg flex items-center justify-center">
                          <Zap size={12} className="text-text-hint" />
                        </div>
                        <span className="text-sm text-text-muted">{job.company}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-text-hint">
                        <LinkIcon size={14} />
                      </div>
                    </td>
                    <td className="p-4 text-xs text-text-hint">{job.posted}</td>
                    <td className="p-4">
                      <span className={`text-xs font-bold ${job.status === 'green' ? 'text-status-green' : 'text-amber-500'}`}>
                        {job.score}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button className="px-3 py-1 bg-input-bg border border-border-color text-text-primary text-[10px] font-bold rounded hover:border-accent-primary transition-all">
                        Queue Apply
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </main>
    </div>
  );
}
