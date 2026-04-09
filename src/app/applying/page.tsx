'use client';

import { TopNav } from '@/components/layout/TopNav';
import { LeftSidebar } from '@/components/layout/LeftSidebar';
import { 
  Settings, 
  RotateCcw, 
  Pause, 
  Play, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Sparkles,
  ArrowRight,
  Loader2
} from 'lucide-react';
import { useState } from 'react';

const queueItems = [
  {
    id: '1',
    company: 'Stripe',
    initial: 'S',
    logoColor: 'bg-[#635bff]',
    title: 'Senior Frontend Engineer',
    status: 'SUBMITTING',
    statusLabel: 'Filling form...',
    progress: 68,
    badgeColor: 'bg-[#1a2040] border-[#4F6BED] text-[#a0b0f0]'
  },
  {
    id: '2',
    company: 'Notion',
    initial: 'N',
    logoColor: 'bg-black',
    title: 'Product Designer',
    status: 'SUBMITTED',
    statusLabel: '2m ago',
    progress: 100,
    badgeColor: 'bg-[#0a2a0a] border-[#22c55e] text-[#22c55e]'
  },
  {
    id: '3',
    company: 'Vercel',
    initial: '▲',
    logoColor: 'bg-black',
    title: 'Frontend Engineer',
    status: 'PENDING',
    progress: 0,
    badgeColor: 'bg-input-bg border-border-color text-text-muted'
  },
  {
    id: '4',
    company: 'Airbnb',
    initial: 'A',
    logoColor: 'bg-[#FF5A5F]',
    title: 'Staff UI Engineer',
    status: 'PENDING',
    progress: 0,
    badgeColor: 'bg-input-bg border-border-color text-text-muted'
  },
  {
    id: '5',
    company: 'Figma',
    initial: 'F',
    logoColor: 'bg-[#F24E1E]',
    title: 'Senior Designer',
    status: 'FAILED',
    statusLabel: 'Failed ✕',
    progress: 40,
    badgeColor: 'bg-[#2a0a0a] border-[#e05050] text-[#e05050]',
    hasRetry: true
  }
];

export default function ApplyingPage() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className="min-h-screen bg-background text-text-primary">
      <TopNav />
      {/* Sidebar with Applying active */}
      <LeftSidebar activeItem="Applying" />

      <main className="pl-[220px] pt-[52px] pb-24 min-h-screen">
        <div className="max-w-[1200px] mx-auto p-8">
          
          {/* Header */}
          <div className="flex items-start gap-4 mb-8 border-l-4 border-accent-primary pl-4">
            <div>
              <h1 className="text-28px font-bold">Auto Apply Agent</h1>
              <p className="text-sm text-text-muted mt-1">Submitting applications autonomously</p>
            </div>
          </div>

          {/* Agent Control Banner */}
          <div className="bg-card-surface border border-border-color p-4 rounded-xl flex items-center justify-between mb-10 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Loader2 size={24} className="text-accent-primary animate-spin" />
              </div>
              <span className="text-[15px] font-medium text-white">Agent Running — 3 applications in progress</span>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsPaused(!isPaused)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-bold transition-all ${
                  isPaused 
                    ? 'bg-[#1a2e1a] border-[#22c55e] text-[#22c55e]' 
                    : 'bg-[#2a1a00] border-[#e09000] text-[#e09000]'
                }`}
              >
                {isPaused ? <Play size={16} fill="currentColor" /> : <Pause size={16} fill="currentColor" />}
                {isPaused ? 'Resume Agent' : 'Pause Agent'}
              </button>
              <button className="p-2 bg-[#1a1a28] border border-border-color rounded-lg text-text-muted hover:text-white transition-colors">
                <Settings size={20} />
              </button>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Left Queue Section (58%) */}
            <div className="w-[58%]">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold">Queue</h2>
                  <span className="text-sm text-text-muted">(11 pending)</span>
                </div>
                <button className="text-xs font-bold text-text-muted hover:text-accent-primary uppercase tracking-widest transition-colors">
                  Clear queue
                </button>
              </div>

              <div className="flex flex-col gap-2">
                {queueItems.map((item) => (
                  <div key={item.id} className="bg-card-surface border border-border-color p-4 rounded-xl">
                    <div className="flex items-center gap-4 mb-3">
                      <div className={`w-10 h-10 rounded-lg ${item.logoColor} flex items-center justify-center shrink-0 text-white font-bold text-lg`}>
                        {item.initial}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="text-[15px] font-bold truncate">{item.company}</h3>
                          <div className={`px-2 py-0.5 border rounded text-[9px] font-bold uppercase tracking-wider ${item.badgeColor}`}>
                            {item.status}
                          </div>
                        </div>
                        <p className="text-[13px] text-text-muted">{item.title}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] italic text-text-muted">
                        {item.statusLabel || (item.status === 'PENDING' ? 'Waiting in queue...' : '')}
                      </span>
                      {item.hasRetry && (
                        <button className="text-[11px] font-bold text-accent-primary hover:underline">Retry</button>
                      )}
                      {item.statusLabel && !item.hasRetry && (
                        <span className="text-[11px] text-text-hint">{item.statusLabel}</span>
                      )}
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex-1 h-1.5 bg-input-bg rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-1000 ${
                            item.status === 'FAILED' ? 'bg-[#e05050]' : 'bg-accent-primary'
                          }`}
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                      <span className="text-[11px] font-bold text-text-hint shrink-0 w-8 text-right">
                        {item.progress}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Summary Section (40%) */}
            <div className="w-[40%] flex flex-col gap-6">
              
              <div className="bg-card-surface border border-border-color rounded-xl p-6">
                <h3 className="text-sm font-bold mb-6">Today&apos;s summary</h3>
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {[
                    { label: 'Submitted', value: '9', color: 'text-status-green' },
                    { label: 'Pending', value: '11', color: 'text-status-amber' },
                    { label: 'Failed', value: '2', color: 'text-status-red' },
                    { label: 'Success Rate', value: '82%', color: 'text-accent-primary' }
                  ].map((stat, i) => (
                    <div key={i} className="bg-[#1a1a28] p-4 rounded-xl border border-border-color/50">
                      <div className="text-24px font-bold mb-1" style={{ color: stat.color === 'text-status-green' ? '#22c55e' : stat.color === 'text-status-amber' ? '#e09000' : stat.color === 'text-status-red' ? '#e05050' : '#7C6FFF' }}>
                        {stat.value}
                      </div>
                      <div className="text-[10px] font-bold text-text-muted uppercase tracking-wider">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-border-color">
                  <div className="flex items-end justify-between h-24 gap-3 px-2 mb-2">
                    {[8, 12, 6, 15, 9].map((h, i) => (
                      <div key={i} className="flex-1 bg-accent-primary/20 rounded-t-sm relative group cursor-pointer">
                        <div 
                          className="absolute bottom-0 left-0 right-0 bg-accent-primary rounded-t-sm transition-all duration-700 hover:bg-opacity-80" 
                          style={{ height: `${(h / 15) * 100}%` }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between px-2 text-[10px] font-bold text-text-hint tracking-widest pt-2">
                    <span>M</span>
                    <span>T</span>
                    <span>W</span>
                    <span>T</span>
                    <span>F</span>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <button className="text-[11px] font-bold text-accent-primary hover:underline flex items-center gap-1 uppercase tracking-wider">
                      View Full Report
                      <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
              </div>

              {/* AI Boost Card */}
              <div className="bg-card-surface border border-border-color rounded-xl p-5 relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-accent-primary opacity-5 rounded-full blur-2xl group-hover:opacity-10 transition-opacity" />
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-[#1e1040] flex items-center justify-center border border-[#3a2e80]">
                    <Sparkles size={16} className="text-[#a89eff]" />
                  </div>
                  <h3 className="text-[15px] font-bold">Boost Matching</h3>
                </div>
                <p className="text-[13px] text-text-muted leading-relaxed mb-6">
                  Update your skills to increase the autonomous matching rate by up to 24%.
                </p>
                <button className="text-[11px] font-bold text-teal-500 tracking-[0.1em] hover:brightness-110 transition-all uppercase flex items-center gap-2">
                  Enhance Profile
                  <ArrowRight size={14} />
                </button>
              </div>

            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
