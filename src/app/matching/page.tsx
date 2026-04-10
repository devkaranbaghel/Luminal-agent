'use client';

import { TopNav } from '@/components/layout/TopNav';
import { LeftSidebar } from '@/components/layout/LeftSidebar';
import { 
  ChevronDown, 
  X, 
  RotateCcw, 
  Sparkles, 
   
  
  _Info
} from 'lucide-react';
import { useState } from 'react';

const matchedJobs = [
  {
    id: '1',
    score: 94,
    title: 'Staff Frontend Engineer',
    company: 'Notion',
    location: 'San Francisco (Hybrid)',
    matched: ['React', 'TypeScript', 'Next.js', 'GraphQL'],
    missing: ['Ruby on Rails']
  },
  {
    id: '2',
    score: 88,
    title: 'Senior Product Engineer',
    company: 'Stripe',
    location: 'New York, NY',
    matched: ['TypeScript', 'React', 'API Design'],
    missing: ['Go', 'PostgreSQL']
  },
  {
    id: '3',
    score: 85,
    title: 'Framework Engineer',
    company: 'Vercel',
    location: 'Remote',
    matched: ['Next.js', 'React', 'V8'],
    missing: ['Rust', 'Edge Computing']
  },
  {
    id: '4',
    score: 82,
    title: 'Frontend Lead Checkout',
    company: 'Shopify',
    location: 'Remote',
    matched: ['React', 'TypeScript', 'A/B Testing'],
    missing: ['Remix', 'Hydrogen']
  },
  {
    id: '5',
    score: 88,
    title: 'Fullstack Engineer AI',
    company: 'Airtable',
    location: 'SF, CA',
    matched: ['React', 'Node.js', 'SQL'],
    missing: ['Python', 'LLM Ops'],
    hasSuggestion: true
  }
];

export default function MatchingPage() {
  const [minScore, setMinScore] = useState(80);

  return (
    <div className="min-h-screen bg-background text-text-primary">
      <TopNav />
      {/* Matching active in sidebar */}
      <LeftSidebar activeItem="Matching" />

      <main className="pl-[220px] pt-[52px] pb-24 min-h-screen">
        <div className="max-w-[1200px] mx-auto p-8">
          
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-28px font-bold">Job Matches</h1>
                <span className="px-3 py-0.5 bg-[#0a2a0a] border border-[#22c55e] text-[#22c55e] text-[11px] font-bold rounded-full">142 MATCHES FOUND</span>
              </div>
              <p className="text-sm text-text-muted mt-1">AI-ranked by your profile compatibility</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Last Sync: 2 min ago</span>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="bg-card-surface border border-border-color p-[14px] px-[18px] rounded-xl mb-8 flex items-center gap-8">
            <div className="flex items-center gap-4">
              <span className="text-[11px] font-bold text-text-muted uppercase tracking-widest">Min Match Score</span>
              <div className="flex bg-[#1a1a28] p-1 rounded-lg border border-border-color">
                {[60, 70, 80].map((score) => (
                  <button 
                    key={score}
                    onClick={() => setMinScore(score)}
                    className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${
                      minScore === score 
                        ? 'bg-[#2a1f5e] border border-[#7C6FFF] text-white' 
                        : 'text-text-muted hover:text-text-primary'
                    }`}
                  >
                    {score}%+
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[11px] font-bold text-text-muted uppercase tracking-widest">Sort By</span>
              <button className="flex items-center gap-2 text-xs font-bold text-text-primary bg-[#1a1a28] px-3 py-1.5 rounded-lg border border-border-color">
                Compatibility
                <ChevronDown size={14} />
              </button>
            </div>

            <div className="flex items-center gap-3 flex-1 overflow-hidden">
              <span className="text-[11px] font-bold text-text-muted uppercase tracking-widest shrink-0">Required Skills</span>
              <div className="flex gap-2 overflow-x-auto no-scrollbar">
                {['React', 'TypeScript'].map((skill) => (
                  <div key={skill} className="px-3 py-1 bg-[#1e1040] border border-[#3a2e80] text-[#a89eff] text-[11px] font-bold rounded-full flex items-center gap-1.5 whitespace-nowrap">
                    {skill}
                    <X size={10} className="cursor-pointer hover:text-white" />
                  </div>
                ))}
              </div>
            </div>

            <button className="text-[11px] font-bold text-accent-primary hover:underline uppercase tracking-wider shrink-0">
              Reset All Filters
            </button>
          </div>

          {/* Matches List */}
          <div className="flex flex-col gap-3">
            {matchedJobs.map((job) => (
              <div key={job.id} className="bg-card-surface border border-border-color p-5 rounded-xl flex items-center gap-6 relative group hover:border-[#3a2e80] transition-colors">
                
                {/* Left: Progress Ring */}
                <div className="relative w-[60px] h-[60px] shrink-0">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="30" cy="30" r="26" stroke="#1a1a28" strokeWidth="4" fill="transparent" />
                    <circle 
                      cx="30" 
                      cy="30" 
                      r="26" 
                      stroke="#7C6FFF" 
                      strokeWidth="4" 
                      fill="transparent" 
                      strokeDasharray="163" 
                      strokeDashoffset={163 - (163 * job.score / 100)} 
                      strokeLinecap="round" 
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-bold text-text-primary">{job.score}%</span>
                  </div>
                </div>

                {/* Center: Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-[16px] font-bold text-text-primary truncate">{job.title}</h3>
                    <span className="text-text-muted text-xs whitespace-nowrap">
                      • {job.company} • {job.location}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3 mb-2 overflow-hidden">
                    <span className="text-[10px] font-bold text-text-hint uppercase tracking-wider shrink-0">Matched:</span>
                    <div className="flex gap-2 overflow-x-auto no-scrollbar">
                      {job.matched.map((skill) => (
                        <span key={skill} className="px-2 py-0.5 bg-[#0a2a0a] text-[#22c55e] text-[10px] font-bold rounded uppercase whitespace-nowrap">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 overflow-hidden">
                    <span className="text-[10px] font-bold text-text-hint uppercase tracking-wider shrink-0">Missing:</span>
                    <div className="flex gap-2 overflow-x-auto no-scrollbar">
                      {job.missing.map((skill) => (
                        <span key={skill} className="px-2 py-0.5 bg-transparent border border-border-color text-text-muted text-[10px] font-bold rounded uppercase whitespace-nowrap">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex flex-col gap-2 shrink-0">
                  <button className="px-6 py-2 bg-[#1a1a28] border border-border-color text-text-primary text-xs font-bold rounded-lg hover:border-accent-primary transition-all">
                    View Details
                  </button>
                  <button className="px-6 py-2 bg-accent-primary text-white text-xs font-bold rounded-lg hover:bg-opacity-90 transition-all shadow-lg active:scale-95">
                    Auto Apply
                  </button>
                </div>

                {/* AI Suggestion Tooltip */}
                {job.hasSuggestion && (
                  <div className="absolute -bottom-4 right-5 bg-[#1a1535] border border-[#5b4fd4] p-3 rounded-xl shadow-2xl flex items-start gap-2 max-w-[320px] z-10 animate-in fade-in slide-in-from-bottom-2">
                    <Sparkles size={16} className="text-[#a89eff] shrink-0 mt-0.5" />
                    <p className="text-[11px] text-[#e8e8f0] leading-relaxed">
                      <span className="font-bold">AI Suggestion:</span> Updating your &apos;GraphQL&apos; proficiency could unlock 12 new 90%+ matches.
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="mt-12 flex justify-center">
            <button className="flex items-center gap-2 px-8 py-3 bg-transparent border border-border-color text-text-primary text-sm font-bold rounded-xl hover:border-accent-primary transition-all group">
              <RotateCcw size={18} className="text-text-hint group-hover:rotate-180 transition-transform duration-500" />
              Load More Matches
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}
