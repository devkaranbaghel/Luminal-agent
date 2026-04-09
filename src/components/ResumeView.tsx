'use client';

import { TopNav } from '@/components/layout/TopNav';
import { LeftSidebar } from '@/components/layout/LeftSidebar';
import { 
  Download, Copy, Edit3, Share2, MapPin, Mail, Link as LinkIcon, Plus, Zap, Key, AlertCircle 
} from 'lucide-react';
import { useState } from 'react';

// Added a `@media print` style block to ensure ONLY the resume is printed into a pristine PDF!
const printStyles = `
  @media print {
    body * {
      visibility: hidden;
    }
    #resume-paper, #resume-paper * {
      visibility: visible;
    }
    #resume-paper {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      box-shadow: none !important;
      margin: 0 !important;
      padding: 0 !important;
    }
  }
`;

export default function ResumeView({ userData }: { userData: any }) {
  const [activeVersion, setActiveVersion] = useState('v1.2-Master');

  const versions = [
    { id: 'v1.2-Master', label: 'v1.2-Master', type: 'master' },
    { id: 'v1.1-Fintech', label: 'v1.1-Fintech Focus', type: 'focus' },
    { id: 'v1.0-Generic', label: 'v1.0-Generic', type: 'generic' },
  ];

  // Fallbacks if data is empty
  const name = userData?.name || 'Arjun Sharma';
  const email = userData?.email || 'arjun.sharma@example.com';
  const headline = userData?.profile?.headline || 'Full Stack Developer';
  const skills = userData?.profile?.skills?.length > 0 ? userData.profile.skills.map((s: any) => s.name) : ['React', 'Next.js', 'Node.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL'];
  const experiences = userData?.profile?.experience?.length > 0 ? userData.profile.experience : [];
  const education = userData?.profile?.education?.length > 0 ? userData.profile.education : [];
  const projects = userData?.profile?.projects?.length > 0 ? userData.profile.projects : [];
  const certificates = userData?.profile?.certificates?.length > 0 ? userData.profile.certificates : [];
  const githubUrl = userData?.profile?.githubUrl || '';
  const portfolioUrl = userData?.profile?.portfolioUrl || '';

  const handleDownloadPdf = () => {
    // Triggers the native browser print, which allows Saving as PDF cleanly.
    window.print();
  };

  return (
    <div className="min-h-screen bg-background">
      <style>{printStyles}</style>
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
                <button 
                  onClick={handleDownloadPdf}
                  className="h-10 px-4 bg-[#ef4444] text-white rounded-lg flex items-center gap-2 text-sm font-bold hover:bg-red-600 transition-colors">
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
            <div id="resume-paper" className="bg-white rounded-lg shadow-2xl p-10 min-h-[1000px] relative overflow-hidden text-black font-sans">
              {/* Watermark */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] rotate-[-45deg] select-none">
                <span className="text-9xl font-bold">JobAgent</span>
              </div>

              {/* Header */}
              <div className="relative z-10 mb-8">
                <h1 className="text-3xl font-bold mb-1">{name}</h1>
                <h2 className="text-lg font-medium text-[#4F6BED] mb-4">{headline}</h2>
                
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1.5">
                    <Mail size={14} />
                    <span>{email}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin size={14} />
                    <span>{userData?.location || 'San Francisco, CA'}</span>
                  </div>
                  {githubUrl && (
                    <div className="flex items-center gap-1.5">
                      <LinkIcon size={14} />
                      <span>{githubUrl.replace('https://', '')}</span>
                    </div>
                  )}
                  {portfolioUrl && (
                    <div className="flex items-center gap-1.5">
                      <LinkIcon size={14} />
                      <span>{portfolioUrl.replace('https://', '')}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Summary */}
              <div className="relative z-10 mb-8">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-bold text-teal-600 tracking-widest">PROFESSIONAL SUMMARY</span>
                  <div className="flex-1 h-[1px] bg-gray-200" />
                </div>
                <p className="text-sm leading-relaxed text-gray-800">
                  Highly skilled professional with experience in building scalable solutions. Proven track record of improving deployment efficiency and system performance. Passionate about creating seamless user experiences and robust backend systems based on dynamic database generation!
                </p>
              </div>

              {/* Skills */}
              <div className="relative z-10 mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-bold text-teal-600 tracking-widest uppercase">Technical Skills</span>
                  <div className="flex-1 h-[1px] bg-gray-200" />
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div className="col-span-2">
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill: string, i: number) => (
                        <span key={i} className="px-2 py-0.5 border border-gray-200 rounded text-[11px] text-gray-700">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Experience */}
              <div className="relative z-10">
                <div className="flex flex-col gap-6">
                  {experiences.map((exp: any, i: number) => (
                    <div key={i}>
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="font-bold text-[15px]">{exp.company}</h3>
                        <span className="text-xs text-gray-500 italic">{exp.period}</span>
                      </div>
                      <div className="text-[#4F6BED] text-sm font-semibold mb-2">{exp.title}</div>
                      <ul className="list-disc list-outside ml-4 space-y-1.5">
                        <li className="text-sm text-gray-800">{exp.description}</li>
                      </ul>
                    </div>
                  ))}
                  {experiences.length === 0 && <p className="text-xs text-gray-400 italic">No experience listed.</p>}
                </div>
              </div>

              {/* Education & Projects */}
              <div className="relative z-10 grid grid-cols-2 gap-8 mt-8">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-bold text-teal-600 tracking-widest uppercase">Education</span>
                    <div className="flex-1 h-[1px] bg-gray-200" />
                  </div>
                  {education.map((edu: any, i: number) => (
                    <div key={i} className="mb-4">
                      <h4 className="font-bold text-sm">{edu.school}</h4>
                      <p className="text-xs text-gray-700">{edu.degree}</p>
                      <p className="text-[10px] text-gray-500 italic">{edu.period}</p>
                    </div>
                  ))}
                  {education.length === 0 && <p className="text-xs text-gray-400 italic">No education listed.</p>}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-bold text-teal-600 tracking-widest uppercase">Projects</span>
                    <div className="flex-1 h-[1px] bg-gray-200" />
                  </div>
                  {projects.map((p: any, i: number) => (
                    <div key={i} className="mb-4">
                      <h4 className="font-bold text-sm">{p.name}</h4>
                      <p className="text-xs text-gray-800 line-clamp-2">{p.description}</p>
                      {p.link && <p className="text-[10px] text-blue-600 truncate">{p.link}</p>}
                    </div>
                  ))}
                  {projects.length === 0 && <p className="text-xs text-gray-400 italic">No projects listed.</p>}
                </div>
              </div>

              {/* Certificates */}
              {certificates.length > 0 && (
                <div className="relative z-10 mt-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-bold text-teal-600 tracking-widest uppercase">Certifications</span>
                    <div className="flex-1 h-[1px] bg-gray-200" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {certificates.map((c: any, i: number) => (
                      <div key={i}>
                        <h4 className="font-bold text-xs">{c.name}</h4>
                        <p className="text-[10px] text-gray-600">{c.issuer} · {c.date}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
                    <span className="text-4xl font-bold text-text-primary">{userData?.profile?.atsScore || 0}</span>
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
                      Change passive phrases like "Helped build" to stronger verbs like "Architected" or "Spearheaded".
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="shrink-0 pt-1">
                    <span className="px-1.5 py-0.5 bg-gray-500/10 text-gray-500 border border-gray-500/20 rounded text-[9px] font-bold uppercase">Medium</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-text-primary mb-1">Add Quantitative Metrics</h4>
                    <p className="text-xs text-text-muted leading-relaxed">
                      Include specific metrics (%, hours, $) for your roles to show measurable impact.
                    </p>
                  </div>
                </div>
                
                {userData?.profile?.skills?.length < 5 && (
                  <div className="flex gap-4">
                    <div className="shrink-0 pt-1">
                      <span className="px-1.5 py-0.5 bg-blue-500/10 text-blue-500 border border-blue-500/20 rounded text-[9px] font-bold uppercase">TIP</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-text-primary mb-1">Expand Skillset</h4>
                      <p className="text-xs text-text-muted leading-relaxed">
                        Add more niche technical skills from your Projects to increase keyword alignment.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
