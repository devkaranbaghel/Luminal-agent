'use client';

import { useState, useEffect } from 'react';
import { Bell, Zap, CheckCircle, AlertCircle, Info, X } from 'lucide-react';

export function NotificationCenter({ userId }: { userId?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);

  // Simulation: In a real app, this would be a polling or websocket connection
  useEffect(() => {
    // Initial fetch from DB would happen here
    setNotifications([
      { id: '1', title: 'Application Submitted', message: 'Applied to Senior Frontend Engineer at TechPulse', type: 'SUCCESS', createdAt: new Date() },
      { id: '2', title: 'Agent Feedback', message: 'Your resume has been optimized for the Fintech Role.', type: 'AGENT', createdAt: new Date(Date.now() - 3600000) },
      { id: '3', title: 'New Job Match', message: 'A 92% match was found on LinkedIn: Staff Engineer.', type: 'INFO', createdAt: new Date(Date.now() - 7200000) },
    ]);
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'SUCCESS': return <CheckCircle size={16} className="text-green-400" />;
      case 'AGENT': return <Zap size={16} className="text-accent-primary" />;
      case 'WARNING': return <AlertCircle size={16} className="text-amber-500" />;
      default: return <Info size={16} className="text-blue-400" />;
    }
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`relative p-2 rounded-lg transition-colors ${isOpen ? 'bg-accent-primary/20 text-accent-primary' : 'text-text-muted hover:text-text-primary'}`}
      >
        <Bell size={20} fill={isOpen ? "currentColor" : "none"} />
        {notifications.length > 0 && (
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#ef4444] rounded-full border-2 border-sidebar-bg" />
        )}
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-80 bg-sidebar-bg border border-border-color rounded-xl shadow-2xl z-50 overflow-hidden">
            <div className="p-4 border-b border-border-color flex items-center justify-between bg-card-surface">
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Notification Agent</span>
              <button 
                onClick={() => setNotifications([])}
                className="text-[9px] font-bold text-text-hint hover:text-text-primary uppercase tracking-tighter"
              >
                Clear All
              </button>
            </div>
            
            <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
              {notifications.length > 0 ? (
                notifications.map((n) => (
                  <div key={n.id} className="p-4 border-b border-border-color/50 hover:bg-[#1a1a28] transition-colors group">
                    <div className="flex gap-3">
                      <div className="mt-0.5">{getIcon(n.type)}</div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-text-primary mb-1">{n.title}</h4>
                        <p className="text-[12px] text-text-muted leading-snug">{n.message}</p>
                        <span className="text-[10px] text-text-hint mt-2 block italic">
                          {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-input-bg flex items-center justify-center text-text-hint">
                    <Bell size={24} />
                  </div>
                  <p className="text-xs text-text-muted">No new activity from the agent.</p>
                </div>
              )}
            </div>
            
            <div className="p-3 bg-card-surface border-t border-border-color">
              <button className="w-full py-1.5 text-[10px] font-bold text-text-muted hover:text-accent-primary uppercase tracking-widest transition-colors">
                View Full Activity Log
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
