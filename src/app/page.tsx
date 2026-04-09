'use client';

import { TopNav } from '@/components/layout/TopNav';
import { LeftSidebar } from '@/components/layout/LeftSidebar';
import { RightSidebar } from '@/components/layout/RightSidebar';
import { 
  User, 
  Code2, 
  Briefcase, 
  Plus, 
  X, 
  Sparkles, 
  MessageCircle 
} from 'lucide-react';
import { useState } from 'react';

export default function ProfilePage() {
  const [skills, setSkills] = useState([
    'TypeScript', 'React.js', 'Node.js', 'AWS Lambda', 'GraphQL', 'Docker'
  ]);

  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      <LeftSidebar />
      <RightSidebar />

      <main className="pl-[220px] pr-[320px] pt-[52px] pb-24 min-h-screen">
        <div className="max-w-[1000px] mx-auto p-8">
          {/* Header */}
          <div className="flex items-start gap-4 mb-10 border-l-4 border-accent-primary pl-4">
            <div>
              <h1 className="text-28px font-bold text-text-primary">Candidate Profile</h1>
              <p className="text-text-muted mt-1">Define your professional identity for the autonomous agent.</p>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {/* Personal Details */}
            <div className="col-span-7 glass-card p-6">
              <div className="flex items-center gap-2 mb-6">
                <User size={20} className="text-accent-primary" />
                <h2 className="text-lg font-semibold text-text-primary">Personal Details</h2>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-medium text-text-muted uppercase">Full Name</label>
                  <input 
                    type="text" 
                    defaultValue="Arjun Sharma" 
                    className="input-field"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-medium text-text-muted uppercase">Email</label>
                  <input 
                    type="email" 
                    defaultValue="arjun.s@techpulse" 
                    className="input-field"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-text-muted uppercase">Headline</label>
                <input 
                  type="text" 
                  defaultValue="Senior Full Stack Engineer | React & Node.js Expert & Cloud Architect" 
                  className="input-field"
                />
              </div>
            </div>

            {/* ATS Readiness */}
            <div className="col-span-5 glass-card p-6 flex flex-col items-center justify-center text-center">
              <div className="relative w-[140px] h-[140px] mb-4">
                {/* SVG Donut Chart */}
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="70"
                    cy="70"
                    r="60"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    className="text-border-color"
                  />
                  <circle
                    cx="70"
                    cy="70"
                    r="60"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={2 * Math.PI * 60}
                    strokeDashoffset={2 * Math.PI * 60 * (1 - 0.87)}
                    strokeLinecap="round"
                    className="text-accent-primary"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-28px font-bold text-text-primary leading-none">87%</span>
                </div>
              </div>
              <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">ATS READINESS</span>
            </div>

            {/* Technical Skills */}
            <div className="col-span-12 glass-card p-6">
              <div className="flex items-center gap-2 mb-6">
                <Code2 size={20} className="text-accent-primary" />
                <h2 className="text-lg font-semibold text-text-primary">Technical Skills</h2>
              </div>

              <div className="flex flex-wrap gap-3">
                {skills.map((skill) => (
                  <div key={skill} className="skill-pill group">
                    {skill}
                    <button 
                      onClick={() => setSkills(skills.filter(s => s !== skill))}
                      className="hover:text-white transition-colors"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
                <button className="px-3 py-1 border border-dashed border-[#3a2a60] text-text-muted rounded-full text-xs hover:border-accent-primary hover:text-text-primary transition-colors flex items-center gap-1">
                  <Plus size={12} />
                  Add Skill
                </button>
              </div>
            </div>

            {/* Work Experience */}
            <div className="col-span-12 glass-card p-6">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <Briefcase size={20} className="text-accent-primary" />
                  <h2 className="text-lg font-semibold text-text-primary">Work Experience</h2>
                </div>
                <button className="text-sm font-medium text-accent-primary hover:underline transition-all">
                  + Add Experience
                </button>
              </div>

              <div className="relative pl-6">
                {/* Visual indicator */}
                <div className="absolute left-0 top-1.5 w-2.5 h-2.5 rounded-full bg-accent-primary" />
                
                <div className="flex items-start justify-between mb-1">
                  <h3 className="text-md font-bold text-text-primary">Senior Software Engineer</h3>
                  <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">2021 — PRESENT</span>
                </div>
                <div className="text-accent-primary text-sm font-medium mb-3">TechPulse Systems</div>
                <p className="text-text-muted text-sm leading-relaxed max-w-3xl">
                  Leading the migration of micro-services to a serverless architecture, improving deployment times by 40% and reducing infrastructure costs by 25%. Mentoring junior engineers and implementing CI/CD best practices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* BOTTOM CTA */}
      <div className="fixed bottom-0 left-[220px] right-[320px] p-6 pointer-events-none">
        <div className="max-w-[1000px] mx-auto pointer-events-auto">
          <button className="w-full h-14 rounded-xl bg-gradient-to-r from-[#5b4fd4] to-[#7C6FFF] text-white font-bold text-lg flex items-center justify-center gap-3 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:scale-[1.01] active:scale-[0.99] transition-all">
            <Sparkles size={20} />
            Generate Resume & Start Applying
          </button>
        </div>
      </div>

      {/* Floating Buttons */}
      <div className="fixed bottom-6 left-6 z-50">
        <button className="h-10 px-6 rounded-full bg-accent-primary text-white text-sm font-bold flex items-center gap-2 shadow-lg hover:opacity-90 transition-opacity">
          <Plus size={18} />
          New Search
        </button>
      </div>

      <div className="fixed bottom-6 right-6 z-50">
        <button className="w-14 h-14 rounded-full bg-accent-primary text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform">
          <MessageCircle size={28} />
        </button>
      </div>
    </div>
  );
}
