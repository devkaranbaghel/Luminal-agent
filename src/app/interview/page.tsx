'use client';

import { TopNav } from '@/components/layout/TopNav';
import { LeftSidebar } from '@/components/layout/LeftSidebar';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  Play, 
  Video, 
  Star, 
  ArrowRight,
  ExternalLink,
  Info,
  Smartphone,
  CheckCircle2,
  Clock,
  MoreVertical
} from 'lucide-react';
import { useState } from 'react';

const scheduledInterviews = [
  { company: 'Stripe', role: 'Senior Frontend Engineer', date: 'April 07', time: '2:00 PM', icon: Smartphone },
  { company: 'Airbnb', role: 'Staff Product Designer', date: 'April 10', time: '11:30 AM', icon: Smartphone },
  { company: 'Vercel', role: 'Framework Engineer', date: 'April 15', time: '9:00 AM', icon: Smartphone },
];

const prepQuestions = [
  { id: '1', question: 'Explain idempotency in payment APIs.', difficulty: 'Hard', category: 'System Design' },
  { id: '2', question: 'How do you handle race conditions in distributed ledgers?', difficulty: 'Expert', category: 'Architecture' },
  { id: '3', question: 'Tell me about a time you disagreed with a PM.', difficulty: 'Medium', category: 'Behavioral' },
  { id: '4', question: 'Optimize this React component rendering a large list.', difficulty: 'Hard', category: 'Frontend' },
  { id: '5', question: 'Why do you want to work on payment infrastructure?', difficulty: 'Low', category: 'Culture' },
];

export default function InterviewDashboard() {
  const [activeTab, setActiveTab] = useState('Questions');

  return (
    <div className="min-h-screen bg-background text-text-primary">
      <TopNav />
      {/* Sidebar with Interview active */}
      <LeftSidebar activeItem="Interview" />

      <main className="pl-[220px] pt-[52px] pb-24 min-h-screen">
        <div className="max-w-[1400px] mx-auto p-8">
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-28px font-bold">Interview Dashboard</h1>
            <p className="text-sm text-text-muted mt-1">Upcoming interviews and AI prep coach</p>
          </div>

          <div className="grid grid-cols-12 gap-4">
            
            {/* COLUMN 1: Calendar + Scheduled (28%) */}
            <div className="col-span-3 flex flex-col gap-4">
              
              {/* Mini Calendar */}
              <div className="bg-card-surface border border-border-color rounded-xl p-4">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-bold uppercase tracking-wider">April 2025</span>
                  <div className="flex gap-2 text-text-muted">
                    <ChevronLeft size={16} className="cursor-pointer hover:text-white" />
                    <ChevronRight size={16} className="cursor-pointer hover:text-white" />
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-y-2 text-center">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, ix) => (
                    <span key={`${day}-${ix}`} className="text-[10px] font-bold text-text-hint">{day}</span>
                  ))}
                  {[30, 31, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19].map((date, i) => (
                    <div key={i} className="flex items-center justify-center h-7 w-7 text-[11px] mx-auto">
                      {date === 7 ? (
                        <span className="bg-accent-primary text-white w-6 h-6 flex items-center justify-center rounded-full font-bold">7</span>
                      ) : date === 10 ? (
                        <span className="border border-blue-500 text-blue-500 w-6 h-6 flex items-center justify-center rounded-full font-bold">10</span>
                      ) : date === 15 ? (
                        <span className="bg-input-bg text-text-muted w-6 h-6 flex items-center justify-center rounded-full font-bold">15</span>
                      ) : (
                        <span className="text-text-muted">{date}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Scheduled Section */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 border-l-2 border-accent-primary pl-2 mb-2">
                  <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Scheduled</span>
                </div>
                {scheduledInterviews.map((interview, i) => (
                  <div key={i} className="bg-card-surface border border-border-color p-4 rounded-xl">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-input-bg flex items-center justify-center">
                        <Smartphone size={16} className="text-text-muted" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold truncate">{interview.company}</h4>
                        <p className="text-[11px] text-text-muted truncate">{interview.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-text-hint mb-4">
                      <CalendarIcon size={14} />
                      <span>{interview.date}, {interview.time}</span>
                    </div>
                    <button className="w-full py-2 bg-[#1a1a28] border border-border-color rounded-lg text-xs font-bold text-text-primary flex items-center justify-center gap-2 hover:border-accent-primary transition-all">
                      <CalendarIcon size={14} />
                      Add to Cal
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* COLUMN 2: AI Prep Coach (44%) */}
            <div className="col-span-6 bg-card-surface border border-border-color rounded-xl p-5 flex flex-col">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-lg bg-[#635bff] flex items-center justify-center shrink-0">
                  <span className="text-white font-bold text-xl">S</span>
                </div>
                <div>
                  <h2 className="text-[17px] font-bold">Preparing for: Stripe</h2>
                  <p className="text-xs text-text-muted">Session #4 • Technical Depth Focus</p>
                </div>
                <button className="ml-auto text-text-hint">
                  <MoreVertical size={18} />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-border-color mb-6">
                {['Questions', 'Research', 'Tips'].map((tab) => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 text-sm font-medium transition-all relative ${
                      activeTab === tab ? 'text-accent-primary' : 'text-text-muted hover:text-text-primary'
                    }`}
                  >
                    {tab}
                    {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-primary" />}
                  </button>
                ))}
              </div>

              {/* Questions List */}
              <div className="flex flex-col gap-2 overflow-y-auto max-h-[460px] no-scrollbar flex-1 mb-6">
                {prepQuestions.map((q) => (
                  <div key={q.id} className="bg-[#1a1a28] p-3.5 rounded-lg flex items-center gap-4 group hover:bg-[#20202a] transition-all">
                    <button className="w-8 h-8 rounded-full bg-[#2a1f5e] border border-accent-primary flex items-center justify-center shrink-0 text-accent-primary hover:scale-110 transition-transform">
                      <Play size={14} fill="currentColor" />
                    </button>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium leading-tight mb-1.5">{q.question}</p>
                      <span className="text-[10px] font-mono text-text-hint uppercase tracking-wider">Difficulty: {q.difficulty} • {q.category}</span>
                    </div>
                    <button className="px-4 py-1.5 border border-[#2a2a40] text-accent-primary text-xs font-bold rounded-full hover:border-accent-primary transition-all whitespace-nowrap">
                      Practice
                    </button>
                  </div>
                ))}
              </div>

              {/* Start Mock Interview */}
              <button className="w-full h-13 bg-gradient-to-br from-[#5b4fd4] to-[#8b7fff] text-white font-bold text-base rounded-xl flex items-center justify-center gap-3 shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all shrink-0">
                <Video size={20} />
                Start Mock Interview
              </button>
            </div>

            {/* COLUMN 3: Company Intel (28%) */}
            <div className="col-span-3 bg-card-surface border-l-[3px] border-accent-primary rounded-r-xl flex flex-col">
              <div className="p-4 flex flex-col gap-6">
                <div className="border-b border-border-color pb-3 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-text-hint uppercase tracking-[0.2em]">Company Intel:</span>
                    <h3 className="text-sm font-bold text-white mt-0.5">STRIPE</h3>
                  </div>
                  <ExternalLink size={14} className="text-text-hint cursor-pointer" />
                </div>

                <div>
                  <p className="text-[13px] text-text-muted leading-relaxed">
                    Stripe is a financial infrastructure platform for businesses. Millions of companies—from the world’s largest to new series A—use Stripe.
                  </p>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-text-hint uppercase tracking-wider block mb-3">Tech Stack</span>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'Go', 'Ruby', 'AWS', 'Kafka'].map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-[#1a1a28] border border-border-color text-[11px] text-text-muted rounded font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold text-text-hint uppercase tracking-wider">Style</span>
                    <span className="text-sm font-bold white mt-1">Technical + System Design</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-text-hint uppercase tracking-wider block">Glassdoor</span>
                    <span className="text-sm font-bold text-amber-400 mt-1">4.3 ★</span>
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-text-hint uppercase tracking-wider block mb-3">Typical Process</span>
                  <div className="space-y-2.5">
                    {[
                      { step: '01', label: 'Recruiter Screen', time: '(30m)' },
                      { step: '02', label: 'Technical Phone Interview', time: '(1h)' },
                      { step: '03', label: 'Virtual Onsite', time: '(4-5 rounds)' },
                      { step: '04', label: 'Hiring Manager Chat', time: '(Final)' },
                    ].map((item) => (
                      <div key={item.step} className="flex gap-3 text-[13px] text-text-muted">
                        <span className="text-accent-primary font-bold">{item.step}</span>
                        <span>{item.label} <span className="text-text-hint text-[11px]">{item.time}</span></span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-border-color pt-4 flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <h4 className="text-[13px] font-bold leading-tight group-hover:text-accent-primary cursor-pointer">Stripe expands presence in EU with new crypto-payment...</h4>
                    <span className="text-[10px] text-text-hint">2 days ago • TechCrunch</span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <h4 className="text-[13px] font-bold leading-tight group-hover:text-accent-primary cursor-pointer">New checkout automation features powered by LLMs...</h4>
                    <span className="text-[10px] text-text-hint">1 week ago • Company Blog</span>
                  </div>
                </div>
              </div>

              <div className="mt-auto bg-[#0d0d14] border-t border-border-color p-3.5 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-status-green pulsing-dot" />
                <span className="text-[11px] font-bold text-[#22c55e] uppercase tracking-wider">AI Coach Online</span>
              </div>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}
