'use client';

import { TopNav } from '@/components/layout/TopNav';
import { 
  Calendar, 
  AlertTriangle, 
  Settings, 
  Send, 
  Eye, 
  Layers, 
  User, 
  X, 
  Check, 
  Filter,
  CheckCircle2,
  TrendingUp,
  Clock,
  Zap
} from 'lucide-react';
import { useState } from 'react';

const notifications = [
  {
    id: '1',
    title: 'Interview Scheduled (Flipkart)',
    message: 'Your interview for Senior Product Designer at Flipkart has been confirmed for tomorrow at 2:00 PM IST.',
    time: '10:24 AM',
    type: 'PURPLE',
    icon: Calendar,
    source: 'AUTO-APPLY',
    isRead: false,
    action: 'Add to calendar ↗'
  },
  {
    id: '2',
    title: 'Action Required (Meesho assessment)',
    message: 'Technical assessment required for the Fullstack Developer role. Deadline in 24 hours.',
    time: '08:15 AM',
    type: 'AMBER',
    icon: AlertTriangle,
    source: 'MANUAL MATCH',
    isRead: false,
    button: 'Begin Test'
  },
  {
    id: '3',
    title: 'Resume Agent Update (ATS 87%)',
    message: 'Luminal AI has re-optimized your resume for Fintech roles. Matching score increased from 72% to 87%.',
    time: '04:00 AM',
    type: 'BLUE',
    icon: Settings,
    source: 'SYSTEM',
    isRead: false,
    note: 'Applied to 12 new matches automatically.'
  },
  {
    id: '4',
    title: 'Application Submitted',
    message: 'Successfully applied to Senior Backend Engineer at Groww',
    time: '02:00 PM',
    type: 'GREEN',
    icon: Send,
    source: 'AUTO-APPLY',
    isRead: true
  },
  {
    id: '5',
    title: 'Profile Viewed',
    message: 'A recruiter from Atlassian viewed your profile',
    time: '12:00 PM',
    type: 'TEAL',
    icon: Eye,
    source: 'PLATFORM',
    isRead: true
  },
  {
    id: '6',
    title: 'System',
    message: 'AI Agent completed deep scan of 5 new platforms',
    time: '10:00 AM',
    type: 'BLUE',
    icon: Layers,
    source: 'SYSTEM',
    isRead: true
  },
  {
    id: '7',
    title: 'Application Submitted',
    message: 'Successfully applied to Frontend Lead at Vercel',
    time: '08:00 AM',
    type: 'GREEN',
    icon: Send,
    source: 'AUTO-APPLY',
    isRead: true
  },
  {
    id: '8',
    title: 'Profile Viewed',
    message: '3 recruiters viewed your resume in the last 24 hours',
    time: '06:00 AM',
    type: 'TEAL',
    icon: User,
    source: 'STATS',
    isRead: true
  }
];

const yesterdayNotifications = [
  {
    id: '9',
    title: 'Application Successful (Zomato)',
    message: 'Engineering Manager role at Zomato has been moved to shortlisting.',
    time: 'Yesterday',
    type: 'GREEN',
    icon: CheckCircle2,
    source: 'AUTO-APPLY',
    isRead: true
  },
  {
    id: '10',
    title: 'Application Rejected (Adobe)',
    message: 'We regret to inform you that your application for Staff Designer was not chosen.',
    time: 'Yesterday',
    type: 'RED',
    icon: X,
    source: 'AUTO-APPLY',
    isRead: true
  }
];

export default function NotificationsPage() {
  const getBorderColor = (type: string) => {
    switch (type) {
      case 'PURPLE': return 'border-l-[#7C6FFF]';
      case 'AMBER': return 'border-l-[#fbbf24]';
      case 'BLUE': return 'border-l-[#3b82f6]';
      case 'GREEN': return 'border-l-[#22c55e]';
      case 'TEAL': return 'border-l-[#14b8a6]';
      case 'RED': return 'border-l-[#ef4444]';
      default: return 'border-l-border-color';
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'PURPLE': return 'text-[#7C6FFF] bg-[#7C6FFF]/10';
      case 'AMBER': return 'text-[#fbbf24] bg-[#fbbf24]/10';
      case 'BLUE': return 'text-[#3b82f6] bg-[#3b82f6]/10';
      case 'GREEN': return 'text-[#22c55e] bg-[#22c55e]/10';
      case 'TEAL': return 'text-[#14b8a6] bg-[#14b8a6]/10';
      case 'RED': return 'text-[#ef4444] bg-[#ef4444]/10';
      default: return 'text-text-muted bg-input-bg';
    }
  };

  return (
    <div className="min-h-screen bg-background text-text-primary">
      <TopNav />

      <main className="max-w-[1400px] mx-auto pt-[52px] pb-24 px-8">
        <div className="flex gap-8 mt-8">
          
          {/* Main Feed (70%) */}
          <div className="w-[70%]">
            <div className="flex items-start justify-between mb-8">
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-[28px] font-bold">Notifications</h1>
                  <span className="px-2 py-0.5 bg-accent-primary text-white text-[11px] font-bold rounded-full">8 UNREAD</span>
                </div>
                <p className="text-sm text-text-muted mt-1">Real-time intelligence from your autonomous job agent.</p>
              </div>
              <div className="flex items-center gap-6">
                <button className="flex items-center gap-2 px-3 py-1.5 border border-border-color rounded-lg text-xs font-bold hover:border-accent-primary transition-colors">
                  <Filter size={14} />
                  Filters
                </button>
                <button className="flex items-center gap-1.5 text-xs font-bold text-accent-primary hover:underline">
                  <Check size={14} />
                  Mark all read
                </button>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-[11px] font-bold text-text-muted uppercase tracking-[0.2em] mb-4">Today</h2>
                <div className="flex flex-col gap-2">
                  {notifications.map((n) => (
                    <div 
                      key={n.id} 
                      className={`bg-card-surface border border-border-color border-l-[3px] p-4 rounded-xl relative transition-all hover:bg-[#1a1a28] ${getBorderColor(n.type)}`}
                    >
                      <div className="flex gap-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${getIconColor(n.type)}`}>
                          <n.icon size={20} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="text-[15px] font-bold">{n.title}</h3>
                            <span className="text-[11px] text-text-muted">{n.time}</span>
                          </div>
                          <p className="text-[13px] text-text-muted leading-relaxed mb-3">{n.message}</p>
                          <div className="flex items-center gap-3">
                            <span className="px-1.5 py-0.5 bg-[#1a1a28] text-text-hint text-[9px] font-bold rounded uppercase tracking-wider">SOURCE: {n.source}</span>
                            {n.action && <button className="text-[12px] font-bold text-[#7C6FFF] hover:underline">{n.action}</button>}
                            {n.button && <button className="px-3 py-1 bg-amber-500 text-black text-[11px] font-bold rounded-md hover:bg-opacity-90 transition-all">{n.button}</button>}
                            {n.note && <span className="text-[11px] italic text-text-muted">{n.note}</span>}
                          </div>
                        </div>
                      </div>
                      {!n.isRead && (
                        <div className="absolute top-4 right-4 w-2 h-2 bg-blue-500 rounded-full" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-[11px] font-bold text-text-muted uppercase tracking-[0.2em] mb-4">Yesterday</h2>
                <div className="flex flex-col gap-2">
                  {yesterdayNotifications.map((n) => (
                    <div 
                      key={n.id} 
                      className={`bg-card-surface border border-border-color border-l-[3px] p-4 rounded-xl relative transition-all hover:bg-[#1a1a28] opacity-80 ${getBorderColor(n.type)}`}
                    >
                      <div className="flex gap-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${getIconColor(n.type)}`}>
                          <n.icon size={20} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="text-[15px] font-bold">{n.title}</h3>
                            <span className="text-[11px] text-text-muted">{n.time}</span>
                          </div>
                          <p className="text-[13px] text-text-muted leading-relaxed mb-3">{n.message}</p>
                          <span className="px-1.5 py-0.5 bg-[#1a1a28] text-text-hint text-[9px] font-bold rounded uppercase tracking-wider">SOURCE: {n.source}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel (28%) */}
          <div className="w-[30%] flex flex-col gap-6">
            
            <div className="bg-card-surface border border-border-color rounded-xl p-6">
              <h3 className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-6">Agent Velocity</h3>
              <div className="flex flex-col items-center mb-6">
                <div className="relative w-24 h-24">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="48" cy="48" r="42" stroke="#1a1a28" strokeWidth="6" fill="transparent" />
                    <circle cx="48" cy="48" r="42" stroke="#7C6FFF" strokeWidth="6" fill="transparent" strokeDasharray="264" strokeDashoffset="66" strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xl font-bold">75%</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-text-muted uppercase mt-2">Match Rate</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-text-muted">Apps Today</span>
                  <span>24</span>
                </div>
                <div className="w-full h-1 bg-[#1a1a28] rounded-full overflow-hidden">
                  <div className="h-full bg-teal-500 rounded-full" style={{ width: '60%' }} />
                </div>
              </div>
            </div>

            <div className="bg-card-surface border border-border-color rounded-xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <Calendar size={16} className="text-text-muted" />
                <h3 className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Upcoming</h3>
              </div>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-accent-primary">OCT 12</span>
                    <span className="px-2 py-0.5 bg-green-500/10 text-green-500 text-[9px] font-bold rounded-full">IN 1D 4H</span>
                  </div>
                  <h4 className="text-sm font-bold">Flipkart Interview</h4>
                  <p className="text-[11px] text-text-muted mt-0.5">Round 1: Design Sync</p>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-accent-primary">OCT 14</span>
                    <span className="px-2 py-0.5 bg-amber-500/10 text-amber-500 text-[9px] font-bold rounded-full">IN 3D 6H</span>
                  </div>
                  <h4 className="text-sm font-bold">Google Coffee Chat</h4>
                  <p className="text-[11px] text-text-muted mt-0.5">Networking: Referral</p>
                </div>
              </div>
            </div>

            <div className="bg-[#0d0d14] border border-border-color rounded-xl p-4 flex items-center gap-3">
              <div className="pulsing-dot" />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold text-text-primary uppercase tracking-wider">Agent Pulse: Active</span>
                  <Zap size={10} className="text-accent-primary fill-accent-primary" />
                </div>
                <p className="text-[10px] text-text-muted mt-0.5">Scanning 42 new job boards...</p>
              </div>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}
