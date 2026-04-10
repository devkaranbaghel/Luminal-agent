'use client';

import { useState } from 'react';
import { User, Code2, Briefcase, Plus, X, Sparkles, MessageCircle } from 'lucide-react';
import { saveProfile } from '@/app/actions/profile';

export function ProfileForm({ initialProfile, userEmail }: { initialProfile: unknown, userEmail: string }) {
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  
  const [formData, setFormData] = useState({
    fullName: initialProfile?.fullName || initialProfile?.user?.name || '',
    email: initialProfile?.email || userEmail || '',
    headline: initialProfile?.headline || '',
    githubUrl: initialProfile?.githubUrl || '',
    portfolioUrl: initialProfile?.portfolioUrl || '',
    skills: initialProfile?.skills?.length ? initialProfile.skills.map((s: { name: string }) => s.name) : ['React', 'Node.js'],
    experience: initialProfile?.experience || [],
    education: initialProfile?.education || [],
    projects: initialProfile?.projects || [],
    certificates: initialProfile?.certificates || []
  });

  const [newSkill, setNewSkill] = useState("");

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveProfile(formData);
      setSuccessMsg("Profile saved successfully!");
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (e: unknown) {
      alert("Error saving: " + e.message);
    }
    setIsSaving(false);
  };

  const addSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.trim()) return;
    if (!formData.skills.includes(newSkill.trim())) {
      setFormData({ ...formData, skills: [...formData.skills, newSkill.trim()] });
    }
    setNewSkill("");
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData({ ...formData, skills: formData.skills.filter(s => s !== skillToRemove) });
  };

  const addExperience = () => {
    setFormData({ ...formData, experience: [...formData.experience, { title: '', company: '', period: '', description: '' }] });
  };

  const updateExperience = (index: number, field: string, value: string) => {
    const nextExp = [...formData.experience];
    nextExp[index] = { ...nextExp[index], [field]: value };
    setFormData({ ...formData, experience: nextExp });
  };

  const removeExperience = (index: number) => {
    setFormData({ ...formData, experience: formData.experience.filter((_: unknown, i: number) => i !== index) });
  };

  const addProject = () => {
    setFormData({ ...formData, projects: [...formData.projects, { name: '', description: '', link: '' }] });
  };

  const updateProject = (index: number, field: string, value: string) => {
    const nextProj = [...formData.projects];
    nextProj[index] = { ...nextProj[index], [field]: value };
    setFormData({ ...formData, projects: nextProj });
  };

  const addEducation = () => {
    setFormData({ ...formData, education: [...formData.education, { school: '', degree: '', period: '' }] });
  };

  const updateEducation = (index: number, field: string, value: string) => {
    const nextEdu = [...formData.education];
    nextEdu[index] = { ...nextEdu[index], [field]: value };
    setFormData({ ...formData, education: nextEdu });
  };

  return (
    <>
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
                value={formData.fullName}
                onChange={e => setFormData({...formData, fullName: e.target.value})}
                className="input-field"
                placeholder="John Doe"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-text-muted uppercase">Email</label>
              <input 
                type="email" 
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                className="input-field"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 mb-4">
            <label className="text-xs font-medium text-text-muted uppercase">Headline</label>
            <input 
              type="text" 
              value={formData.headline}
              onChange={e => setFormData({...formData, headline: e.target.value})}
              className="input-field"
              placeholder="e.g. Senior Software Engineer"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-text-muted uppercase">GitHub URL</label>
              <input 
                type="text" 
                value={formData.githubUrl}
                onChange={e => setFormData({...formData, githubUrl: e.target.value})}
                className="input-field"
                placeholder="https://github.com/..."
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-text-muted uppercase">Portfolio/Portfolio</label>
              <input 
                type="text" 
                value={formData.portfolioUrl}
                onChange={e => setFormData({...formData, portfolioUrl: e.target.value})}
                className="input-field"
                placeholder="https://yourwork.com"
              />
            </div>
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
                strokeDashoffset={2 * Math.PI * 60 * (1 - ((initialProfile?.atsScore || 50) / 100))}
                strokeLinecap="round"
                className="text-accent-primary"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-28px font-bold text-text-primary leading-none">{initialProfile?.atsScore || 50}%</span>
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

          <div className="flex flex-wrap gap-3 mb-4">
            {formData.skills.map((skill: string) => (
              <div key={skill} className="skill-pill group">
                {skill}
                <button 
                  onClick={() => removeSkill(skill)}
                  className="hover:text-white transition-colors"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
          
          <form onSubmit={addSkill} className="flex items-center gap-2 max-w-[300px]">
             <input 
               type="text" 
               value={newSkill}
               onChange={e => setNewSkill(e.target.value)}
               placeholder="React, AWS, etc..."
               className="input-field !h-8 text-sm"
             />
             <button type="submit" className="px-3 h-8 border border-dashed border-[#3a2a60] text-text-muted rounded-full text-xs hover:border-accent-primary hover:text-text-primary transition-colors flex items-center gap-1 shrink-0">
                <Plus size={12} />
                Add
             </button>
          </form>
        </div>

        {/* Experience Section */}
        <div className="col-span-12 glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Briefcase size={20} className="text-accent-primary" />
              <h2 className="text-lg font-semibold text-text-primary">Experience</h2>
            </div>
            <button onClick={addExperience} className="text-xs font-bold text-accent-primary hover:underline flex items-center gap-1">
              <Plus size={14} /> Add Role
            </button>
          </div>

          <div className="flex flex-col gap-6">
            {formData.experience.map((exp: unknown, i: number) => (
              <div key={i} className="bg-[#1a1a28]/40 border border-border-color p-4 rounded-xl relative">
                <button onClick={() => removeExperience(i)} className="absolute top-4 right-4 text-text-muted hover:text-red-500">
                  <X size={16} />
                </button>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <input placeholder="Job Title" value={exp.title} onChange={e => updateExperience(i, 'title', e.target.value)} className="input-field" />
                  <input placeholder="Company" value={exp.company} onChange={e => updateExperience(i, 'company', e.target.value)} className="input-field" />
                  <input placeholder="Period (e.g. 2021 - Present)" value={exp.period} onChange={e => updateExperience(i, 'period', e.target.value)} className="input-field" />
                </div>
                <textarea 
                  placeholder="Key Responsibilities & Achievements" 
                  value={exp.description} 
                  onChange={e => updateExperience(i, 'description', e.target.value)}
                  className="input-field w-full h-24 resize-none py-3"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Projects & Education */}
        <div className="col-span-6 glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Code2 size={20} className="text-accent-primary" />
              <h2 className="text-lg font-semibold text-text-primary">Projects</h2>
            </div>
            <button onClick={addProject} className="text-xs font-bold text-accent-primary hover:underline flex items-center gap-1">
              <Plus size={14} /> Add
            </button>
          </div>
          <div className="flex flex-col gap-4">
            {formData.projects.map((p: unknown, i: number) => (
              <div key={i} className="flex flex-col gap-2 p-3 bg-sidebar-bg/50 border border-border-color rounded-lg">
                <input placeholder="Project Name" value={p.name} onChange={e => updateProject(i, 'name', e.target.value)} className="input-field !h-9 text-sm" />
                <input placeholder="Link" value={p.link} onChange={e => updateProject(i, 'link', e.target.value)} className="input-field !h-9 text-sm" />
                <textarea placeholder="Brief summary" value={p.description} onChange={e => updateProject(i, 'description', e.target.value)} className="input-field !h-16 text-[12px] py-2" />
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-6 glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Sparkles size={20} className="text-accent-primary" />
              <h2 className="text-lg font-semibold text-text-primary">Education</h2>
            </div>
            <button onClick={addEducation} className="text-xs font-bold text-accent-primary hover:underline flex items-center gap-1">
              <Plus size={14} /> Add
            </button>
          </div>
          <div className="flex flex-col gap-4">
            {formData.education.map((e: unknown, i: number) => (
              <div key={i} className="flex flex-col gap-2 p-3 bg-sidebar-bg/50 border border-border-color rounded-lg">
                <input placeholder="School/University" value={e.school} onChange={e => updateEducation(i, 'school', e.target.value)} className="input-field !h-9 text-sm" />
                <input placeholder="Degree" value={e.degree} onChange={e => updateEducation(i, 'degree', e.target.value)} className="input-field !h-9 text-sm" />
                <input placeholder="Period" value={e.period} onChange={e => updateEducation(i, 'period', e.target.value)} className="input-field !h-9 text-sm" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM CTA */}
      <div className="fixed bottom-0 left-[220px] right-[320px] p-6 pointer-events-none z-40">
        <div className="max-w-[1000px] mx-auto pointer-events-auto flex flex-col items-center">
          {successMsg && (
            <div className="mb-4 px-4 py-2 rounded-full bg-green-500/20 text-green-400 font-bold text-sm border border-green-500/30">
              {successMsg}
            </div>
          )}
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="w-full h-14 rounded-xl bg-gradient-to-r from-[#5b4fd4] to-[#7C6FFF] text-white font-bold text-lg flex items-center justify-center gap-3 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50">
            <Sparkles size={20} />
            {isSaving ? "Saving to Registry..." : "Save Profile Configuration"}
          </button>
        </div>
      </div>

      {/* Floating Buttons */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="w-14 h-14 rounded-full bg-accent-primary text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform">
          <MessageCircle size={28} />
        </button>
      </div>
    </>
  );
}
