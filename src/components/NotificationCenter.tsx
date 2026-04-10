'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Bell, Zap, CheckCircle, AlertCircle, Info, Filter, Check } from 'lucide-react';

interface INotification {
  id: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: Date | number;
}

export function NotificationCenter({ _userId }: { _userId?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<INotification[]>(() => [
    { id: '1', title: 'Application Submitted', message: 'Applied to Senior Frontend Engineer at TechPulse', type: 'SUCCESS', isRead: false, createdAt: new Date() },
    { id: '2', title: 'Agent Feedback', message: 'Your resume has been optimized for the Fintech Role.', type: 'AGENT', isRead: false, createdAt: new Date(Date.now() - 3600000) },
    { id: '3', title: 'New Job Match', message: 'A 92% match was found on LinkedIn: Staff Engineer.', type: 'INFO', isRead: false, createdAt: new Date(Date.now() - 7200000) },
  ]);
  const [filterType, setFilterType] = useState<string | null>(null);
  const router = useRouter();

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({...n, isRead: true})));
  };

  const handleNotificationClick = (n: INotification) => {
    setNotifications(prev => prev.map(prevN => prevN.id === n.id ? { ...prevN, isRead: true } : prevN));
    setIsOpen(false);
    
    if (n.type === 'SUCCESS' || n.type === 'INFO') {
      router.push('/jobs');
    } else if (n.type === 'AGENT') {
      router.push('/resume');
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const displayedNotifications = filterType ? notifications.filter(n => n.type === filterType) : notifications;

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
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#ef4444] rounded-full border-2 border-sidebar-bg" />
        )}
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-80 bg-sidebar-bg border border-border-color rounded-xl shadow-2xl z-50 overflow-hidden">
            <div className="p-4 border-b border-border-color flex flex-col gap-4 bg-card-surface">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Notification Agent</span>
                <button 
                  onClick={() => setNotifications([])}
                  className="text-[9px] font-bold text-text-hint hover:text-text-primary uppercase tracking-tighter"
                >
                  Clear All
                </button>
              </div>
              <div className="flex items-center justify-between mt-1 pt-1">
                <div className="relative group">
                  <button className="flex items-center gap-2 px-3 py-1.5 border border-border-color rounded-lg text-xs font-bold text-text-primary hover:bg-[#1a1a28] transition-colors">
                    <Filter size={14} />
                    Filters
                  </button>
                  <div className="absolute top-full mt-1 left-0 w-32 bg-[#1a1a28] border border-border-color rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20">
                    {['ALL', 'SUCCESS', 'AGENT', 'INFO'].map(type => (
                      <button 
                        key={type}
                        onClick={() => setFilterType(type === 'ALL' ? null : type)}
                        className={`w-full text-left px-3 py-2 text-[11px] font-bold transition-colors ${filterType === type || (type === 'ALL' && !filterType) ? 'text-accent-primary bg-[#2a2a40]' : 'text-text-muted hover:text-text-primary hover:bg-[#2a2a40]'}`}
                      >
                        {type === 'ALL' ? 'All Types' : type}
                      </button>
                    ))}
                  </div>
                </div>
                <button 
                  onClick={markAllRead}
                  className="flex items-center gap-1.5 text-[13px] font-bold text-[#6366f1] hover:text-accent-primary transition-colors pr-1"
                >
                  <Check size={16} />
                  Mark all read
                </button>
              </div>
            </div>
            
            <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
              {displayedNotifications.length > 0 ? (
                displayedNotifications.map((n) => (
                  <button 
                    key={n.id} 
                    onClick={() => handleNotificationClick(n)}
                    className={`w-full text-left p-4 border-b border-border-color/50 hover:bg-[#1a1a28] transition-colors group block ${!n.isRead ? 'bg-[#1a1a28]/40' : ''}`}
                  >
                    <div className="flex gap-3 relative">
                      {!n.isRead && (
                        <div className="absolute top-1.5 -left-1.5 w-1.5 h-1.5 bg-accent-primary rounded-full shadow-[0_0_8px_rgba(79,107,237,0.8)]" />
                      )}
                      <div className="mt-0.5">{getIcon(n.type)}</div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-text-primary mb-1">{n.title}</h4>
                        <p className="text-[12px] text-text-muted leading-snug">{n.message}</p>
                        <span className="text-[10px] text-text-hint mt-2 block italic">
                          {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  </button>
                ))
              ) : (
                <div className="p-8 text-center flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-input-bg flex items-center justify-center text-text-hint">
                    <Bell size={24} />
                  </div>
                  <p className="text-xs text-text-muted">No new activity found.</p>
                </div>
              )}
            </div>
            
            <div className="p-3 bg-card-surface border-t border-border-color">
              <button 
                onClick={() => {
                  setIsOpen(false);
                  alert('Full Activity Log interface is arriving in the next major build!');
                }}
                className="w-full py-1.5 text-[10px] font-bold text-text-muted hover:text-accent-primary uppercase tracking-widest transition-colors"
              >
                View Full Activity Log
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
