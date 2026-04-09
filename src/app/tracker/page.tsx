'use client';

import { TopNav } from '@/components/layout/TopNav';
import { LeftSidebar } from '@/components/layout/LeftSidebar';
import { 
  FileText, 
  ClipboardList, 
  MessageSquare, 
  Video, 
  TrendingUp,
  LayoutGrid,
  List,
  MoreVertical
} from 'lucide-react';
import { useState } from 'react';

const kanbanColumns = [
  {
    id: 'pending',
    label: 'PENDING',
    count: 12,
    cards: [
      { id: '1', title: 'Senior UX Designer', company: 'Linear', date: 'Oct 24', salary: '$160k-$210k', match: 88, status: 'amber' },
      { id: '2', title: 'Product Architect', company: 'Vercel', date: 'Oct 22', salary: '$180k-$230k', match: 92, status: 'amber' }
    ]
  },
  {
    id: 'applied',
    label: 'APPLIED',
    count: 24,
    accent: '#7C6FFF',
    cards: [
      { id: '3', title: 'Frontend Lead', company: 'Stripe', date: 'Oct 20', salary: '$190k-$240k', match: 98, status: 'blue' }
    ]
  },
  {
    id: 'response',
    label: 'RESPONSE',
    count: 8,
    cards: [
      { id: '4', title: 'Design Systems Eng', company: 'Figma', date: 'Oct 25', salary: '$175k-$215k', match: 95, status: 'teal' }
    ]
  },
  {
    id: 'interview',
    label: 'INTERVIEW',
    count: 3,
    accent: '#8b5cf6',
    cards: [
      { id: '5', title: 'Creative Technologist', company: 'Apple', date: 'Oct 30', salary: '$200k+', match: 91, status: 'purple' }
    ]
  }
];

const platformPerformance = [
  { name: 'LinkedIn', percentage: 82, color: 'bg-teal-500' },
  { name: 'Indeed', percentage: 45, color: 'bg-orange-500' },
  { name: 'Naukri', percentage: 64, color: 'bg-orange-500' },
  { name: 'Direct Company', percentage: 94, color: 'bg-green-500' },
];

export default function TrackerPage() {
  const [view, setView] = useState<'kanban' | 'table'>('kanban');

  return (
    <div className="min-h-screen bg-background text-text-primary">
      <TopNav />
      {/* Tracker uses Rocket icon in sidebar */}
      <LeftSidebar activeItem="Tracker" />

      <main className="pl-[220px] pt-[52px] pb-24 min-h-screen">
        <div className="max-w-[1400px] mx-auto p-8">
          
          {/* Top Stats Row */}
          <div className="grid grid-cols-4 gap-4 mb-10">
            {[
              { label: 'Total Applications', value: '142', icon: FileText, change: '+12%', changeColor: 'text-green-500' },
              { label: 'Pending', value: '38', icon: ClipboardList, change: '0%', changeColor: 'text-text-muted' },
              { label: 'Responses', value: '24', icon: MessageSquare, change: '+5%', changeColor: 'text-green-500' },
              { label: 'Interviews', value: '9', icon: Video, change: '+2', changeColor: 'text-green-500' }
            ].map((stat, i) => (
              <div key={i} className="bg-card-surface border border-border-color p-5 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-text-muted uppercase tracking-wider">{stat.label}</span>
                  <stat.icon size={18} className="text-text-hint" />
                </div>
                <div className="flex items-end gap-3">
                  <span className="text-36px font-bold leading-none">{stat.value}</span>
                  <span className={`text-[12px] font-bold ${stat.changeColor} pb-1`}>
                    {stat.change === '+2' ? stat.change : (stat.change.startsWith('↗') ? stat.change : `↗${stat.change}`)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Kanban Section */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-20px font-bold">Application Pipeline</h2>
                <p className="text-sm text-text-muted mt-1">Real-time tracking across 4 key stages</p>
              </div>
              <div className="bg-[#1a1a28] border border-border-color p-1 rounded-lg flex">
                <button 
                  onClick={() => setView('kanban')}
                  className={`px-4 py-1.5 rounded-md text-xs font-bold flex items-center gap-2 transition-all ${view === 'kanban' ? 'bg-border-color text-white' : 'text-text-muted hover:text-text-primary'}`}
                >
                  <LayoutGrid size={14} />
                  Kanban
                </button>
                <button 
                  onClick={() => setView('table')}
                  className={`px-4 py-1.5 rounded-md text-xs font-bold flex items-center gap-2 transition-all ${view === 'table' ? 'bg-border-color text-white' : 'text-text-muted hover:text-text-primary'}`}
                >
                  <List size={14} />
                  Table
                </button>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 items-start">
              {kanbanColumns.map((col) => (
                <div key={col.id} className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 px-1">
                    <span className="text-[11px] font-bold text-text-muted uppercase tracking-widest">{col.label}</span>
                    <span className="bg-[#1a1a28] text-[10px] font-bold px-1.5 py-0.5 rounded text-text-hint">{col.count}</span>
                  </div>
                  <div className="flex flex-col gap-3">
                    {col.cards.map((card) => (
                      <div 
                        key={card.id} 
                        className={`bg-[#1a1a28] border border-[#2a2a40] p-4 rounded-lg relative overflow-hidden group hover:border-[#3a3a50] transition-all cursor-pointer shadow-lg`}
                      >
                        {col.accent && (
                          <div 
                            className="absolute left-0 top-0 bottom-0 w-1" 
                            style={{ backgroundColor: col.accent }}
                          />
                        )}
                        <div className="flex items-center justify-between mb-3">
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${
                            card.status === 'amber' ? 'bg-amber-500/10 text-amber-500' :
                            card.status === 'blue' ? 'bg-blue-500/10 text-blue-500' :
                            card.status === 'teal' ? 'bg-teal-500/10 text-teal-500' :
                            'bg-purple-500/10 text-purple-500'
                          }`}>
                            {col.id}
                          </span>
                          <button className="text-text-hint opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreVertical size={14} />
                          </button>
                        </div>
                        <h4 className="text-[15px] font-bold mb-1">{card.title}</h4>
                        <div className="text-xs text-text-muted mb-4">
                          {card.company} · Applied {card.date}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-medium text-text-hint">{card.salary}</span>
                          <span className="bg-[#1e1040] text-[#a89eff] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#3a2e80]">
                            {card.match}% Match
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Section - Charts */}
          <div className="grid grid-cols-12 gap-6">
            {/* Velocity Chart */}
            <div className="col-span-8 bg-card-surface border border-border-color rounded-xl p-6">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-lg font-bold">Application Velocity</h3>
                  <p className="text-xs text-text-muted">Tracking your volume over time</p>
                </div>
                <div className="px-3 py-1 bg-[#1a1a28] border border-border-color rounded text-[10px] font-bold text-text-muted">
                  LAST 30 DAYS
                </div>
              </div>

              <div className="flex items-end justify-between h-[180px] px-2 mb-2">
                {[12, 18, 15, 22, 10].map((val, i) => (
                  <div key={i} className="flex flex-col items-center gap-3 w-full">
                    <div 
                      className={`w-[60%] rounded-t-md transition-all duration-500 ${i === 4 ? 'bg-accent-primary' : 'bg-[#3a3560]'}`}
                      style={{ height: `${(val / 25) * 100}%` }}
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-between px-2 pt-4 border-t border-border-color text-[10px] font-bold text-text-hint uppercase tracking-wider">
                <span>Oct 01</span>
                <span>Oct 08</span>
                <span>Oct 15</span>
                <span>Oct 22</span>
                <span className="text-accent-primary underline underline-offset-4">Today</span>
              </div>
            </div>

            {/* Distribution & Performance */}
            <div className="col-span-4 flex flex-col gap-6">
              <div className="bg-card-surface border border-border-color rounded-xl p-5">
                <h3 className="text-xs font-bold text-text-primary uppercase tracking-wider mb-6">Status Distribution</h3>
                <div className="flex items-center gap-8">
                  <div className="relative w-28 h-28">
                    {/* Mock Donut */}
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="56" cy="56" r="48" stroke="#1a1a28" strokeWidth="12" fill="transparent" />
                      <circle cx="56" cy="56" r="48" stroke="#7C6FFF" strokeWidth="12" fill="transparent" strokeDasharray="301" strokeDashoffset="90" strokeLinecap="round" />
                      <circle cx="56" cy="56" r="48" stroke="#a89eff" strokeWidth="12" fill="transparent" strokeDasharray="301" strokeDashoffset="250" strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-lg font-bold">142</span>
                      <span className="text-[8px] font-bold text-text-hint uppercase">Total</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    {[
                      { label: 'Applied', value: '70%', color: 'bg-accent-primary' },
                      { label: 'Interviews', value: '15%', color: 'bg-[#a89eff]' },
                      { label: 'Rejected', value: '15%', color: 'bg-[#1a1a28]' }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${item.color}`} />
                        <span className="text-[10px] text-text-muted whitespace-nowrap">{item.label}</span>
                        <span className="text-[10px] font-bold ml-auto">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-card-surface border border-border-color rounded-xl p-5">
                <h3 className="text-xs font-bold text-text-primary uppercase tracking-wider mb-6">Platform Performance</h3>
                <div className="flex flex-col gap-5">
                  {platformPerformance.map((platform) => (
                    <div key={platform.name} className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between text-[11px] font-bold">
                        <span className="text-text-muted">{platform.name}</span>
                        <span>{platform.percentage}%</span>
                      </div>
                      <div className="w-full h-1 bg-[#1a1a28] rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${platform.color}`}
                          style={{ width: `${platform.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
