'use client';

import { TopNav } from '@/components/layout/TopNav';
import { LeftSidebar } from '@/components/layout/LeftSidebar';
import { 
  Search, 
  MapPin, 
  Clock, 
  DollarSign, 
  ChevronDown, 
  Plus, 
  AlertTriangle,
  Briefcase
} from 'lucide-react';
import { useState } from 'react';

const jobMatches = [
  {
    id: '1',
    title: 'Senior Product Designer',
    company: 'Google',
    score: 98,
    location: 'Mountain View, CA',
    salary: '$185k – $240k',
    posted: '2h ago',
    platform: 'LINKEDIN',
    description: 'We are looking for a visionary product designer to lead the evolution of our core search experience...',
    skills: [
      { name: 'Figma', matched: true },
      { name: 'Design Systems', matched: true },
      { name: 'Prototyping', matched: true },
      { name: 'Framer', matched: false }
    ],
    status: 'MATCHED'
  },
  {
    id: '2',
    title: 'Staff UX Researcher',
    company: 'Flipkart',
    score: 84,
    location: 'Bangalore, IN',
    salary: '₹45L - ₹65L',
    posted: '5h ago',
    platform: 'INDEED',
    description: 'Join Flipkart as a Staff UX Researcher to dive deep into user behavior and drive product strategy with data...',
    skills: [
      { name: 'User Interviews', matched: true },
      { name: 'SQL', matched: true },
      { name: 'Cognitive Walkthrough', matched: true }
    ],
    status: 'APPLIED'
  },
  {
    id: '3',
    title: 'UX Architect Payments',
    company: 'Razorpay',
    score: 92,
    location: 'Remote, IN',
    salary: '₹55L - ₹80L',
    posted: '1d ago',
    platform: 'NAUKRI',
    description: 'Razorpay is looking for a UX Architect to scale our payments infrastructure and simplify complex checkouts...',
    skills: [
      { name: 'IA', matched: true },
      { name: 'Fintech', matched: true },
      { name: 'Scaling', matched: true }
    ],
    status: 'MATCHED'
  },
  {
    id: '4',
    title: 'Principal UX Designer Azure',
    company: 'Microsoft',
    score: 78,
    location: 'Redmond, WA',
    salary: '$190k – $275k',
    posted: '3h ago',
    platform: 'LINKEDIN',
    description: 'Azure Core is hiring a Principal UX Designer to architect the next-gen cloud management experience...',
    skills: [
      { name: 'B2B SaaS', matched: true },
      { name: 'Information Arch', matched: true },
      { name: 'Azure SDK', matched: false }
    ],
    status: 'MATCHED'
  }
];

const stats = [
  { label: 'TOTAL MATCHES', value: '24' },
  { label: 'AUTO APPLIED', value: '12' },
  { label: 'SAVED', value: '5' },
  { label: 'INTERVIEWS', value: '2' },
];

export default function JobsPage() {
  const [search, setSearch] = useState('');

  const getPlatformClass = (platform: string) => {
    switch (platform) {
      case 'LINKEDIN': return 'bg-blue-900/40 text-blue-400 border-blue-400/20';
      case 'INDEED': return 'bg-orange-900/40 text-orange-400 border-orange-400/20';
      case 'NAUKRI': return 'bg-green-900/40 text-green-400 border-green-400/20';
      default: return 'bg-gray-800 text-gray-400 border-gray-400/20';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      {/* Ensure Jobs tab is active in TopNav via logic in that component */}
      <LeftSidebar activeItem="Matching" />

      <main className="pl-[220px] pt-[52px] pb-24 min-h-screen">
        <div className="max-w-[1240px] mx-auto p-8">
          
          {/* Header Row */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-[28px] font-bold text-text-primary">Job Matches</h1>
              <p className="text-text-muted mt-1">Discover your high-affinity roles curated by Luminal AI.</p>
            </div>
            <div className="flex gap-3">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-[#1a1a28] border border-border-color rounded-lg px-5 py-2 min-w-[110px]">
                  <div className="text-[22px] font-bold text-text-primary leading-tight">{stat.value}</div>
                  <div className="text-[10px] font-bold text-text-muted uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Search + Filter Bar */}
          <div className="bg-card-surface border border-border-color p-3.5 rounded-xl mb-8 flex items-center justify-between gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-hint" size={18} />
              <input 
                type="text" 
                placeholder="Search roles, skills, or companies..."
                className="w-full pl-11 pr-4 py-2.5 bg-[#1a1a28] border border-[#2a2a40] text-text-primary rounded-lg outline-none focus:border-accent-primary transition-colors text-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              {['All Platforms', 'Job Type', 'Score 80%+', 'Salary'].map((filter) => (
                <button 
                  key={filter}
                  className="px-4 py-2.5 bg-[#1a1a28] border border-[#2a2a40] text-text-primary text-xs font-medium rounded-lg flex items-center gap-2 hover:border-accent-primary transition-colors whitespace-nowrap"
                >
                  {filter}
                  <ChevronDown size={14} className="text-text-hint" />
                </button>
              ))}
            </div>
          </div>

          {/* Jobs Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {jobMatches.map((job) => (
              <div key={job.id} className="bg-card-surface border border-border-color rounded-xl p-5 relative group hover:border-[#3a2e80] transition-colors">
                
                {job.status === 'APPLIED' && (
                  <div className="absolute top-0 right-0 px-3 py-1 bg-teal-500 text-white text-[10px] font-bold rounded-tr-xl rounded-bl-xl uppercase tracking-wider">
                    Applied
                  </div>
                )}

                {/* Top Row */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#1a1a28] border border-border-color flex items-center justify-center shrink-0">
                      <Briefcase size={20} className="text-text-muted" />
                    </div>
                    <div>
                      <h3 className="text-[17px] font-bold text-text-primary leading-tight">{job.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-text-muted">{job.company}</span>
                        <span className={`px-2 py-0.5 border rounded text-[9px] font-bold tracking-wider ${getPlatformClass(job.platform)}`}>
                          {job.platform}
                        </span>
                        <span className="text-text-hint">·</span>
                        <span className="text-xs text-text-muted">{job.posted}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-teal-500">{job.score}% MATCH SCORE</div>
                    <div className="w-full h-1 bg-border-color rounded-full mt-1.5 overflow-hidden">
                      <div 
                        className="h-full bg-teal-500 rounded-full" 
                        style={{ width: `${job.score}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Info Row */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="flex items-center gap-1.5 text-[12px] text-text-muted">
                    <MapPin size={14} className="text-text-hint" />
                    <span className="truncate">{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[12px] text-text-muted">
                    <Clock size={14} className="text-text-hint" />
                    <span>{job.posted}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[12px] text-text-muted">
                    <DollarSign size={14} className="text-text-hint" />
                    <span className="truncate">{job.salary}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-text-muted line-clamp-2 mb-5 leading-relaxed">
                  {job.description}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {job.skills.map((skill) => (
                    <div 
                      key={skill.name}
                      className={`px-3 py-1 rounded-full text-[10px] font-bold border flex items-center gap-1.5 ${
                        skill.matched 
                          ? 'bg-[#1e1040] border-[#3a2e80] text-[#a89eff]' 
                          : 'bg-amber-900/20 border-amber-500/20 text-amber-500'
                      }`}
                    >
                      {!skill.matched && <AlertTriangle size={10} />}
                      {skill.name}
                    </div>
                  ))}
                </div>

                {/* Action Row */}
                <div className="flex items-center justify-between pt-4 border-t border-border-color">
                  {job.status === 'APPLIED' ? (
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Application Sent</span>
                      <button className="text-xs font-bold text-accent-primary hover:underline">Follow Up</button>
                    </div>
                  ) : (
                    <button className="flex-1 bg-accent-primary hover:bg-opacity-90 text-white text-xs font-bold py-2.5 rounded-lg transition-all mr-6">
                      Auto Apply
                    </button>
                  )}
                  <button className="text-xs font-bold text-text-primary hover:text-accent-primary transition-colors whitespace-nowrap">
                    View Details
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      </main>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button className="w-14 h-14 rounded-full bg-accent-primary text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all">
          <Plus size={32} />
        </button>
      </div>
    </div>
  );
}
