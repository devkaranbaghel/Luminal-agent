'use client';

import { CheckCircle2, Circle, Loader2, Settings } from 'lucide-react';

const pipelineSteps = [
  { id: 1, label: 'Profile Agent', status: 'completed', description: 'Identity verified and prepped' },
  { id: 2, label: 'Resume Agent', status: 'completed', description: 'ATS optimization complete' },
  { id: 3, label: 'Job Finder', status: 'active', description: 'Scanning LinkedIn, Indeed, Glassdoor...', progress: 65 },
  { id: 4, label: 'Auto Apply', status: 'waiting', description: 'Waiting for job matches' },
  { id: 5, label: 'Notification Agent', status: 'waiting', description: 'Ready to alert' },
];

export function RightSidebar() {
  return (
    <aside className="w-[320px] bg-sidebar-bg border-l border-border-color h-[calc(100vh-52px)] fixed top-[52px] right-0 flex flex-col p-5 overflow-y-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-status-green" />
          <span className="text-sm font-semibold text-text-primary">Luminal AI</span>
        </div>
        <div className="px-2 py-1 bg-input-bg rounded border border-input-border">
          <span className="text-[10px] font-mono text-accent-primary">v2.4.0-STABLE</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-6">Agent Pipeline</h3>
        
        <div className="flex flex-col gap-8 relative">
          {/* Connecting Line */}
          <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-border-color" />

          {pipelineSteps.map((step) => (
            <div key={step.id} className="relative pl-9 flex flex-col gap-1">
              <div className="absolute left-0 top-0.5 z-10">
                {step.status === 'completed' && (
                  <CheckCircle2 size={24} className="text-accent-primary bg-sidebar-bg rounded-full" />
                )}
                {step.status === 'active' && (
                  <div className="w-6 h-6 rounded-full border-2 border-accent-primary flex items-center justify-center bg-sidebar-bg">
                    <Loader2 size={14} className="text-accent-primary animate-spin" />
                  </div>
                )}
                {step.status === 'waiting' && (
                  <Circle size={24} className="text-text-hint bg-sidebar-bg rounded-full" />
                )}
              </div>
              
              <span className={`text-sm font-semibold ${step.status === 'waiting' ? 'text-text-muted' : 'text-text-primary'}`}>
                {step.label}
              </span>
              <span className="text-xs text-text-muted">
                {step.description}
              </span>

              {step.status === 'active' && step.progress && (
                <div className="mt-2 w-full h-1.5 bg-input-bg rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-accent-primary rounded-full transition-all duration-500" 
                    style={{ width: `${step.progress}%` }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-4">
        <button className="w-full h-10 bg-input-bg border border-input-border rounded-lg flex items-center justify-center gap-2 text-sm font-medium text-text-primary hover:border-accent-primary transition-colors">
          <Settings size={18} />
          Agent Preferences
        </button>

        <div className="p-4 glass-card">
          <span className="text-[10px] font-bold text-text-muted uppercase">Weekly Volume</span>
          <div className="flex items-end justify-between mt-2">
            <span className="text-32px font-bold text-text-primary leading-none">142</span>
            {/* Simple Sparkline Placeholder */}
            <div className="flex items-end gap-1 h-8">
              {[40, 60, 45, 80, 55, 90, 75].map((h, i) => (
                <div 
                  key={i} 
                  className="w-1 bg-accent-primary rounded-t" 
                  style={{ height: `${h}%`, opacity: 0.3 + (i * 0.1) }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
