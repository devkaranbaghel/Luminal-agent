'use client';

import { TopNav } from '@/components/layout/TopNav';
import { LeftSidebar } from '@/components/layout/LeftSidebar';
import { 
  Plus, 
  Grid, 
  Send, 
  Users, 
  CheckCircle2, 
  
  GripVertical
} from 'lucide-react';

const pipelineStats = [
  { label: 'TOTAL TRACKED', value: '38', icon: Grid },
  { label: 'APPLIED', value: '14', icon: Send },
  { label: 'IN INTERVIEW', value: '4', icon: Users },
  { label: 'OFFERS', value: '1', icon: CheckCircle2 },
];

const pipelineColumns = [
  {
    id: 'discovered',
    label: 'Discovered',
    color: '#9ca3af',
    count: 3,
    jobs: [
      { id: '1', company: 'LINEAR', title: 'Product Designer', date: 'Oct 24', score: 85 },
      { id: '2', company: 'VERCEL', title: 'Frontend Engineer', date: 'Oct 23', score: 92 },
    ]
  },
  {
    id: 'applied',
    label: 'Applied',
    color: '#7C6FFF',
    count: 2,
    jobs: [
      { id: '3', company: 'STRIPE', title: 'UX Researcher', date: 'Oct 20', status: 'Email Sent' },
      { id: '4', company: 'AIRBNB', title: 'Staff UI Engineer', date: 'Oct 18', status: 'Portal Sync' },
    ]
  },
  {
    id: 'screening',
    label: 'Screening',
    color: '#f59e0b',
    count: 2,
    jobs: [
      { id: '5', company: 'FIGMA', title: 'Senior Designer', date: 'Oct 15', status: 'Recruiter Call' },
      { id: '6', company: 'NOTION', title: 'Product Lead', date: 'Oct 12', status: 'Take-home' },
    ]
  },
  {
    id: 'interview',
    label: 'Interview',
    color: '#f97316',
    count: 3,
    jobs: [
      { id: '7', company: 'APPLE', title: 'Human Interface Designer', date: 'Tomorrow', status: 'Tomorrow', isAmber: true },
      { id: '8', company: 'DISCORD', title: 'Design Specialist', date: 'Oct 28', status: 'Oct 28' },
    ]
  }
];

export default function PipelinePage() {
  return (
    <div className="min-h-screen bg-background text-text-primary">
      {/* TopNav should have Jobs tab active */}
      <TopNav />
      {/* LeftSidebar should have Pipeline item active */}
      <LeftSidebar activeItem="Pipeline" />

      <main className="pl-[220px] pt-[52px] pb-24 min-h-screen">
        <div className="max-w-[1400px] mx-auto p-8">
          
          {/* Header */}
          <div className="flex items-start gap-4 mb-10 border-l-4 border-accent-primary pl-4">
            <div>
              <h1 className="text-28px font-bold">Pipeline</h1>
              <p className="text-sm text-text-muted mt-1">Your active job application pipeline</p>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-4 gap-4 mb-10">
            {pipelineStats.map((stat, i) => (
              <div key={i} className="bg-card-surface border border-border-color p-5 rounded-xl flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-2">{stat.label}</div>
                  <div className="text-36px font-bold leading-none">{stat.value}</div>
                </div>
                <stat.icon size={24} className="text-[#3a2e80]" />
              </div>
            ))}
          </div>

          {/* Kanban Board */}
          <div className="overflow-x-auto pb-4 custom-scrollbar">
            <div className="flex gap-4 min-w-max">
              {pipelineColumns.map((col) => (
                <div key={col.id} className="w-[280px] flex flex-col gap-4">
                  <div className="flex items-center justify-between px-1">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: col.color }} />
                      <span className="text-sm font-bold text-text-primary">{col.label}</span>
                    </div>
                    <span className="bg-input-bg text-text-hint text-[10px] font-bold px-1.5 py-0.5 rounded-full">{col.count}</span>
                  </div>

                  <div className="flex flex-col gap-3 h-full min-h-[500px]">
                    {col.jobs.map((job: unknown) => (
                      <div key={job.id} className="bg-card-surface border border-border-color p-4 rounded-lg group hover:border-[#3a2e80] transition-all cursor-grab active:cursor-grabbing">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">{job.company}</span>
                          <GripVertical size={14} className="text-text-hint opacity-40" />
                        </div>
                        <h4 className="text-[16px] font-medium leading-tight mb-4">{job.title}</h4>
                        <div className="flex items-center justify-between">
                          <div className="px-2 py-0.5 bg-input-bg text-text-hint text-[10px] rounded uppercase font-medium">
                            {job.date}
                          </div>
                          
                          {job.score && (
                            <div className="px-2 py-0.5 bg-[#1e1040] text-[#a89eff] text-[10px] rounded-full border border-[#3a2e80] font-bold">
                              {job.score}% Match
                            </div>
                          )}
                          
                          {job.status && !job.score && (
                            <div className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                job.isAmber ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : 'bg-input-bg text-text-muted'
                            }`}>
                              {job.status}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>

      {/* Floating Add Job Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button className="h-12 px-6 rounded-full bg-accent-primary text-white font-bold flex items-center gap-2 shadow-2xl hover:scale-105 active:scale-95 transition-all">
          <Plus size={20} />
          Add Job
        </button>
      </div>
    </div>
  );
}
