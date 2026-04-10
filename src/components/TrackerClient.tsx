'use client';

import { useState } from 'react';
import { 
  FileText, 
  ClipboardList, 
  MessageSquare, 
  Video, 
  LayoutGrid,
  List,
  MoreVertical
} from 'lucide-react';

export function TrackerClient({ applications }: { applications: unknown[] }) {
  const [view, setView] = useState<'kanban' | 'table'>('kanban');

  // Group applications by status
  const columns = [
    { id: 'QUEUED', label: 'PENDING', accent: '#f59e0b' },
    { id: 'APPLIED', label: 'APPLIED', accent: '#7C6FFF' },
    { id: 'RESPONSE', label: 'RESPONSE', accent: '#14b8a6' },
    { id: 'INTERVIEW', label: 'INTERVIEW', accent: '#8b5cf6' }
  ];

  const grouped = columns.map(col => ({
    ...col,
    cards: applications.filter(app => app.status === col.id)
  }));

  const stats = [
    { label: 'Total Applications', value: applications.length, icon: FileText, change: '+0', changeColor: 'text-text-muted' },
    { label: 'Pending', value: applications.filter(a => a.status === 'QUEUED').length, icon: ClipboardList, change: '0%', changeColor: 'text-text-muted' },
    { label: 'Responses', value: applications.filter(a => a.status === 'RESPONSE').length, icon: MessageSquare, change: '+0', changeColor: 'text-text-muted' },
    { label: 'Interviews', value: applications.filter(a => a.status === 'INTERVIEW').length, icon: Video, change: '+0', changeColor: 'text-text-muted' }
  ];

  return (
    <main className="pl-[220px] pt-[52px] pb-24 min-h-screen">
      <div className="max-w-[1400px] mx-auto p-8">
        
        {/* Top Stats Row */}
        <div className="grid grid-cols-4 gap-4 mb-10">
          {stats.map((stat, i) => (
            <div key={i} className="bg-card-surface border border-border-color p-5 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-text-muted uppercase tracking-wider">{stat.label}</span>
                <stat.icon size={18} className="text-text-hint" />
              </div>
              <div className="flex items-end gap-3">
                <span className="text-36px font-bold leading-none">{stat.value}</span>
                <span className={`text-[12px] font-bold ${stat.changeColor} pb-1`}>
                  {stat.change}
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

          {view === 'kanban' ? (
            <div className="grid grid-cols-4 gap-4 items-start">
              {grouped.map((col) => (
                <div key={col.id} className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 px-1">
                    <span className="text-[11px] font-bold text-text-muted uppercase tracking-widest">{col.label}</span>
                    <span className="bg-[#1a1a28] text-[10px] font-bold px-1.5 py-0.5 rounded text-text-hint">{col.cards.length}</span>
                  </div>
                  <div className="flex flex-col gap-3">
                    {col.cards.map((card) => (
                      <div 
                        key={card.id} 
                        className={`bg-[#1a1a28] border border-[#2a2a40] p-4 rounded-lg relative overflow-hidden group hover:border-[#3a3a50] transition-all cursor-pointer shadow-lg`}
                      >
                        <div 
                          className="absolute left-0 top-0 bottom-0 w-1" 
                          style={{ backgroundColor: col.accent }}
                        />
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider bg-accent-primary/10 text-accent-primary">
                            {card.status}
                          </span>
                          <button className="text-text-hint opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreVertical size={14} />
                          </button>
                        </div>
                        <h4 className="text-[15px] font-bold mb-1">{card.jobTitle}</h4>
                        <div className="text-xs text-text-muted mb-4">
                          {card.company} · {new Date(card.createdAt).toLocaleDateString()}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-medium text-text-hint">{card.location || 'Remote'}</span>
                          <span className="bg-[#1e1040] text-[#a89eff] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#3a2e80]">
                            Live
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-card-surface border border-border-color rounded-xl overflow-hidden">
               <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-border-color bg-sidebar-bg/50">
                      <th className="p-4 text-[10px] font-bold text-text-hint uppercase tracking-wider">Job Title</th>
                      <th className="p-4 text-[10px] font-bold text-text-hint uppercase tracking-wider">Company</th>
                      <th className="p-4 text-[10px] font-bold text-text-hint uppercase tracking-wider">Platform</th>
                      <th className="p-4 text-[10px] font-bold text-text-hint uppercase tracking-wider">Status</th>
                      <th className="p-4 text-[10px] font-bold text-text-hint uppercase tracking-wider">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-color">
                    {applications.map((app) => (
                      <tr key={app.id} className="hover:bg-[#1a1a28] transition-colors">
                        <td className="p-4 text-sm font-bold text-text-primary">{app.jobTitle}</td>
                        <td className="p-4 text-sm text-text-muted">{app.company}</td>
                        <td className="p-4 text-xs text-text-hint uppercase font-bold tracking-widest">{app.job?.platform || 'WEB'}</td>
                        <td className="p-4">
                           <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                             app.status === 'APPLIED' ? 'bg-blue-500/10 text-blue-500' :
                             app.status === 'QUEUED' ? 'bg-amber-500/10 text-amber-500' :
                             app.status === 'INTERVIEW' ? 'bg-purple-500/10 text-purple-500' :
                             'bg-teal-500/10 text-teal-500'
                           }`}>
                             {app.status}
                           </span>
                        </td>
                        <td className="p-4 text-[12px] text-text-hint">
                          {new Date(app.createdAt).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                    {applications.length === 0 && (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-text-muted italic">No applications tracked yet.</td>
                      </tr>
                    )}
                  </tbody>
               </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
