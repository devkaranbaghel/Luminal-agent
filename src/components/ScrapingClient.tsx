'use client';

import { useState } from 'react';
import { 
  Link as LinkIcon, 
  Search, 
  Globe, 
  Terminal as TerminalIcon, 
  Filter as FilterIcon,
  Zap
} from 'lucide-react';
import { updateScrapingFilters } from '@/app/actions/scraping';
import { useRouter } from 'next/navigation';

export function ScrapingClient({ initialFilter, logs, discoveries }: { initialFilter: any, logs: any[], discoveries: any[] }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    keywords: initialFilter?.keywords || 'React, TypeScript, Node.js',
    location: initialFilter?.location || 'Remote / India',
    jobTypes: initialFilter?.jobTypes || 'Full-time',
    minSalary: initialFilter?.minSalary || 2800000
  });

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      await updateScrapingFilters(formData);
      router.refresh();
    } catch (e) {
      alert("Failed to update filters");
    } finally {
      setIsUpdating(false);
    }
  };

  const platforms = [
    { id: 'linkedin', name: 'LinkedIn', icon: LinkIcon, lastScan: '2 min ago', status: 'Scanning...', progress: 60, active: true },
    { id: 'indeed', name: 'Indeed', icon: Search, lastScan: '4 min ago', status: 'Querying...', progress: 40, active: true },
    { id: 'glassdoor', name: 'Glassdoor', icon: Globe, lastScan: '12 min ago', status: 'Idle', progress: 0, active: false }
  ];

  return (
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
              <div className="flex items-center gap-1.5 mb-3">
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
            </div>
            <div className="p-4 bg-[#060610] font-mono text-[12px] leading-[1.8] h-[400px] overflow-y-auto custom-scrollbar">
              {logs.length === 0 ? (
                <div className="text-text-hint italic">Initializing agent logs...</div>
              ) : (
                logs.map((log, i) => (
                  <div key={i} className="flex gap-3">
                    <span className={`shrink-0 font-bold ${log.level === 'SUCCESS' ? 'text-green-400' : 'text-text-muted'}`}>[{log.level}]</span>
                    <span className="text-white">{log.message}</span>
                  </div>
                ))
              )}
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
                  value={formData.keywords}
                  onChange={e => setFormData({...formData, keywords: e.target.value})}
                  className="input-field bg-sidebar-bg w-full"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-text-hint uppercase tracking-wider">Location</label>
                <input 
                  type="text" 
                  value={formData.location}
                  onChange={e => setFormData({...formData, location: e.target.value})}
                  className="input-field bg-sidebar-bg w-full"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-text-hint uppercase tracking-wider">Job Type</label>
                <select 
                  className="input-field bg-sidebar-bg w-full"
                  value={formData.jobTypes}
                  onChange={e => setFormData({...formData, jobTypes: e.target.value})}
                >
                  <option>Full-time</option>
                  <option>Contract</option>
                  <option>Freelance</option>
                </select>
              </div>

              <button 
                onClick={handleUpdate}
                disabled={isUpdating}
                className="w-full bg-[#1e1040] border border-[#5b4fd4] text-[#a89eff] text-xs font-bold py-2.5 rounded-lg hover:bg-opacity-80 transition-all mt-2 disabled:opacity-50"
              >
                {isUpdating ? 'Updating...' : 'Update Filters'}
              </button>
            </div>
          </div>
        </div>

        {/* Recent Discoveries */}
        <div className="bg-card-surface border border-border-color rounded-xl overflow-hidden">
          <div className="p-4 border-b border-border-color flex items-center justify-between">
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Recent Discoveries</span>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border-color bg-sidebar-bg/50">
                <th className="p-4 text-[10px] font-bold text-text-hint uppercase tracking-wider">Job Title</th>
                <th className="p-4 text-[10px] font-bold text-text-hint uppercase tracking-wider">Company</th>
                <th className="p-4 text-[10px] font-bold text-text-hint uppercase tracking-wider">Match</th>
                <th className="p-4 text-[10px] font-bold text-text-hint uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-color">
              {discoveries.map((job, i) => (
                <tr key={i} className={`group transition-colors hover:bg-[#1a1a28]`}>
                  <td className="p-4">
                    <span className="text-sm font-bold text-text-primary">{job.title}</span>
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
                    <span className={`text-xs font-bold text-status-green`}>
                      {job.matchScore || 0}%
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="px-3 py-1 bg-input-bg border border-border-color text-text-primary text-[10px] font-bold rounded">
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
  );
}
