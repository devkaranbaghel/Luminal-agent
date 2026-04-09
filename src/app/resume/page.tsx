'use client';

import { TopNav } from '@/components/layout/TopNav';
import { LeftSidebar } from '@/components/layout/LeftSidebar';
import { 
  Download, 
  Copy, 
  Edit3, 
  Share2, 
  MapPin, 
  Mail, 
  Link as LinkIcon, 
  Plus, 
  Zap, 
  Key, 
  AlertCircle 
} from 'lucide-react';
import { useState } from 'react';

export default function ResumePage() {
  const [activeVersion, setActiveVersion] = useState('v1.2-Master');

  const versions = [
    { id: 'v1.2-Master', label: 'v1.2-Master', type: 'master' },
    { id: 'v1.1-Fintech', label: 'v1.1-Fintech Focus', type: 'focus' },
    { id: 'v1.0-Generic', label: 'v1.0-Generic', type: 'generic' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      {/* Note: LeftSidebar highlight forced to 'Matching' per requirements */}
      <LeftSidebar activeItem="Matching" />

      <main className="pl-[220px] pt-[52px] pb-24 min-h-screen">
        <div className="max-w-[1400px] mx-auto p-8 flex gap-8">
          
          {/* LEFT COLUMN - Resume Preview (55%) */}
          <div className="w-[55%] flex flex-col gap-4">
            {/* Action Bar */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button className="h-10 px-4 bg-[#ef4444] text-white rounded-lg flex items-center gap-2 text-sm font-bold hover:bg-red-600 transition-colors">
                  <Download size={18} />
                  Download PDF
                </button>
                <button className="h-10 px-4 border border-border-color text-text-primary rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-card-surface transition-colors">
                  <Copy size={18} />
                  Copy
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 text-text-muted hover:text-text-primary transition-colors">
                  <Edit3 size={20} />
                </button>
                <button className="p-2 text-text-muted hover:text-text-primary transition-colors">
                  <Share2 size={20} />
                </button>
              </div>
            </div>

            {/* Resume Paper (A4 Style) */}
            <div className="bg-white rounded-lg shadow-2xl p-10 min-h-[1000px] relative overflow-hidden text-black font-sans">
              {/* Watermark */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] rotate-[-45deg] select-none">
                <span className="text-9xl font-bold">JobAgent</span>
              </div>

              {/* Header */}
              <div className="relative z-10 mb-8">
                <h1 className="text-3xl font-bold mb-1">Arjun Sharma</h1>
                <h2 className="text-lg font-medium text-[#4F6BED] mb-4">Full Stack Developer</h2>
                
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1.5">
                    <Mail size={14} />
                    <span>arjun.sharma@example.com</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin size={14} />
                    <span>San Francisco, CA</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <LinkIcon size={14} />
                    <span>github.com/asharma</span>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="relative z-10 mb-8">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-bold text-teal-600 tracking-widest">PROFESSIONAL SUMMARY</span>
                  <div className="flex-1 h-[1px] bg-gray-200" />
                </div>
                <p className="text-sm leading-relaxed text-gray-800">
                  Highly skilled Full Stack Developer with 5+ years of experience in building scalable web applications. Expert in React, Node.js, and cloud architectures. Proven track record of improving deployment efficiency and system performance. Passionate about creating seamless user experiences and robust backend systems.
                </p>
              </div>

              {/* Skills */}
              <div className="relative z-10 mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-bold text-teal-600 tracking-widest uppercase">Technical Skills</span>
                  <div className="flex-1 h-[1px] bg-gray-200" />
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xs font-bold text-gray-400 uppercase mb-3">Frontend</h3>
                    <div className="flex flex-wrap gap-2">
                      {['React', 'Next.js', 'TypeScript', 'Tailwind CSS'].map(skill => (
                        <span key={skill} className="px-2 py-0.5 border border-gray-200 rounded text-[11px] text-gray-700">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-gray-400 uppercase mb-3">Backend</h3>
                    <div className="flex flex-wrap gap-2">
                      {['Node.js', 'Express', 'PostgreSQL', 'Redis'].map(skill => (
                        <span key={skill} className="px-2 py-0.5 border border-gray-200 rounded text-[11px] text-gray-700">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Experience */}
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-bold text-teal-600 tracking-widest uppercase">Work Experience</span>
                  <div className="flex-1 h-[1px] bg-gray-200" />
                </div>
                <div className="mb-6">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-bold text-[15px]">TechPulse Systems</h3>
                    <span className="text-xs text-gray-500 italic">2021 — PRESENT</span>
                  </div>
                  <div className="text-[#4F6BED] text-sm font-semibold mb-2">Senior Full Stack Engineer</div>
                  <ul className="list-disc list-outside ml-4 space-y-1.5">
                    <li className="text-sm text-gray-800">Led the migration of micro-services to a serverless architecture, improving deployment times by 40%.</li>
                    <li className="text-sm text-gray-800">Architected a real-time data flow system using Redis and WebSockets, handling 10k+ concurrent users.</li>
                    <li className="text-sm text-gray-800">Mentored a team of 5 junior developers, improving code quality scores by 25%.</li>
                  </ul>
                </div>
                <div>
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-bold text-[15px]">DataFlow Inc.</h3>
                    <span className="text-xs text-gray-500 italic">2018 — 2021</span>
                  </div>
                  <div className="text-[#4F6BED] text-sm font-semibold mb-2">Build & Release Engineer</div>
                  <ul className="list-disc list-outside ml-4 space-y-1.5">
                    <li className="text-sm text-gray-800">Spearheaded the integration of CI/CD pipelines, reducing manual deployment errors by 60%.</li>
                    <li className="text-sm text-gray-800">Developed internal tools for automated testing, saving 200+ developer hours monthly.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Versions Footer */}
            <div className="flex items-center gap-3 mt-4">
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Versions:</span>
              <div className="flex items-center gap-2">
                {versions.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setActiveVersion(v.id)}
                    className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all ${
                      activeVersion === v.id
                        ? 'bg-accent-primary text-white'
                        : 'bg-input-bg text-text-muted hover:text-text-primary'
                    }`}
                  >
                    {v.label}
                  </button>
                ))}
                <button className="w-6 h-6 rounded-full bg-input-bg border border-input-border flex items-center justify-center text-text-muted hover:text-text-primary transition-colors">
                  <Plus size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - Stats & Recommendations (43%) */}
          <div className="w-[43%] flex flex-col gap-6">
            
            {/* Card 1 - ATS Intelligence */}
            <div className="glass-card p-6">
              <div className="flex items-center gap-2 mb-8">
                <Zap size={20} className="text-teal-400" />
                <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider">ATS Intelligence</h3>
              </div>
              
              <div className="flex flex-col items-center mb-8">
                <div className="relative w-[160px] h-[160px]">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="currentColor"
                      strokeWidth="10"
                      fill="transparent"
                      className="text-[#1a1a28]"
                    />
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="currentColor"
                      strokeWidth="10"
                      fill="transparent"
                      strokeDasharray={2 * Math.PI * 70}
                      strokeDashoffset={2 * Math.PI * 70 * (1 - 0.87)}
                      strokeLinecap="round"
                      className="text-[#22c55e]"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold text-text-primary">87</span>
                    <span className="text-[10px] font-bold text-text-muted uppercase mt-1">Match Score</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-[#22c55e]">92%</div>
                  <div className="text-[10px] text-text-hint font-bold uppercase">Role</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-[#22c55e]">100%</div>
                  <div className="text-[10px] text-text-hint font-bold uppercase">Format</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-amber-500">74%</div>
                  <div className="text-[10px] text-text-hint font-bold uppercase">Read</div>
                </div>
              </div>
            </div>

            {/* Card 2 - Keyword Density */}
            <div className="glass-card p-6">
              <div className="flex items-center gap-2 mb-6">
                <Key size={18} className="text-accent-primary" />
                <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider">Keyword Density</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="text-[10px] font-bold text-text-muted uppercase mb-3">Detected Keywords</div>
                  <div className="flex flex-wrap gap-2">
                    {['React ✓', 'Node.js ✓', 'CI/CD ✓'].map(kw => (
                      <span key={kw} className="px-3 py-1 bg-[#1e293b] text-[#22c55e] border border-[#22c55e]/20 rounded-full text-[11px] font-semibold">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-[10px] font-bold text-text-muted uppercase mb-3">Missing / Critical</div>
                  <div className="flex flex-wrap gap-2">
                    {['Docker !', 'Kubernetes !'].map(kw => (
                      <span key={kw} className="px-3 py-1 bg-[#332a1a] text-amber-500 border border-amber-500/20 rounded-full text-[11px] font-semibold">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3 - AI Recommendations */}
            <div className="glass-card p-6 flex-1">
              <div className="flex items-center gap-2 mb-6">
                <AlertCircle size={18} className="text-amber-500" />
                <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider">AI Recommendations</h3>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="shrink-0 pt-1">
                    <span className="px-1.5 py-0.5 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded text-[9px] font-bold">HIGH PRIORITY</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-text-primary mb-1">Strengthen Action Verbs</h4>
                    <p className="text-xs text-text-muted leading-relaxed">
                      Change "Helped build" to "Architected" or "Spearheaded" to demonstrate leadership and technical ownership.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="shrink-0 pt-1">
                    <span className="px-1.5 py-0.5 bg-gray-500/10 text-gray-500 border border-gray-500/20 rounded text-[9px] font-bold uppercase">Medium</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-text-primary mb-1">Quantify Achievements</h4>
                    <p className="text-xs text-text-muted leading-relaxed">
                      Include specific percentages or metrics for your role at DataFlow Inc to show measurable impact.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
