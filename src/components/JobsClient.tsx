'use client';

import { useState, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  Clock, 
  DollarSign, 
  ChevronDown, 
  Briefcase,
  AlertTriangle,
  Database
} from 'lucide-react';
import { useAutomation } from '@/hooks/useLuminal';
import { seedDemoData } from '@/app/actions/seed';
import { useRouter } from 'next/navigation';

export function JobsClient({ initialJobs }: { initialJobs: any[] }) {
  const [search, setSearch] = useState('');
  const [jobs, setJobs] = useState(initialJobs);
  const [applyingId, setApplyingId] = useState<string | null>(null);
  const [isSeeding, setIsSeeding] = useState(false);
  const router = useRouter();

  // Sync state when props change (after router.refresh)
  useEffect(() => {
    setJobs(initialJobs);
  }, [initialJobs]);
  
  const { apply } = useAutomation();

  const handleApply = async (job: any) => {
    setApplyingId(job.id);
    const success = await apply(job.id, job.title, job.company);
    
    if (success) {
      setJobs(prev => prev.map(j => j.id === job.id ? { ...j, status: 'APPLIED' } : j));
    } else {
      alert("Failed to auto-apply via API");
    }
    setApplyingId(null);
  };

  const handleSeed = async () => {
    setIsSeeding(true);
    try {
      await seedDemoData();
      router.refresh();
    } catch (e) {
      alert("Seeding failed");
    } finally {
      setIsSeeding(false);
    }
  };

  const getPlatformClass = (platform: string) => {
    switch (platform?.toUpperCase()) {
      case 'LINKEDIN': return 'bg-blue-900/40 text-blue-400 border-blue-400/20';
      case 'INDEED': return 'bg-orange-900/40 text-orange-400 border-orange-400/20';
      case 'NAUKRI': return 'bg-green-900/40 text-green-400 border-green-400/20';
      default: return 'bg-gray-800 text-gray-400 border-gray-400/20';
    }
  };

  const filteredJobs = jobs.filter(j => 
    j.title.toLowerCase().includes(search.toLowerCase()) || 
    j.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="pl-[220px] pt-[52px] pb-24 min-h-screen">
      <div className="max-w-[1240px] mx-auto p-8">
        
        {/* Header Row */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-[28px] font-bold text-text-primary">Job Matches</h1>
            <p className="text-text-muted mt-1">Discover your high-affinity roles curated by Luminal AI.</p>
          </div>
          
          <button 
            onClick={handleSeed}
            disabled={isSeeding}
            className="flex items-center gap-2 px-4 py-2 bg-accent-primary/10 border border-accent-primary/20 text-accent-primary rounded-lg text-sm font-bold hover:bg-accent-primary/20 transition-all disabled:opacity-50"
          >
            <Database size={16} />
            {isSeeding ? 'Seeding...' : 'Seed Demo Data'}
          </button>
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
        {filteredJobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-card-surface border border-dashed border-border-color rounded-xl">
             <Briefcase size={48} className="text-text-hint mb-4" />
             <h3 className="text-lg font-bold text-text-primary">No Jobs Found</h3>
             <p className="text-text-muted text-sm">Use the 'Seed Demo Data' button to populate your workspace.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {filteredJobs.map((job) => (
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
                        <span className={`px-2 py-0.5 border rounded text-[9px] font-bold tracking-wider ${getPlatformClass(job.source)}`}>
                          {job.source || 'WEB'}
                        </span>
                        <span className="text-text-hint">·</span>
                        <span className="text-xs text-text-muted">NEW</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-teal-500">{job.matchScore || 0}% MATCH SCORE</div>
                    <div className="w-full h-1 bg-border-color rounded-full mt-1.5 overflow-hidden">
                      <div 
                        className="h-full bg-teal-500 rounded-full" 
                        style={{ width: `${job.matchScore || 0}%` }}
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
                    <span>RECENT</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[12px] text-text-muted">
                    <DollarSign size={14} className="text-text-hint" />
                    <span className="truncate">N/A</span>
                  </div>
                </div>

                {/* Action Row */}
                <div className="flex items-center justify-between pt-4 border-t border-border-color">
                  {job.status === 'APPLIED' ? (
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Application Sent</span>
                      <button className="text-xs font-bold text-accent-primary hover:underline">Follow Up</button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => handleApply(job)}
                      disabled={applyingId === job.id}
                      className="flex-1 bg-accent-primary hover:bg-opacity-90 text-white text-xs font-bold py-2.5 rounded-lg transition-all mr-6 disabled:opacity-50"
                    >
                      {applyingId === job.id ? 'Starting Application...' : 'Auto Apply'}
                    </button>
                  )}
                  <button className="text-xs font-bold text-text-primary hover:text-accent-primary transition-colors whitespace-nowrap">
                    View Details
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
