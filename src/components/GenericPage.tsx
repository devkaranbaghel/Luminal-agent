'use client';

import { TopNav } from '@/components/layout/TopNav';
import { LeftSidebar } from '@/components/layout/LeftSidebar';
import { RightSidebar } from '@/components/layout/RightSidebar';

interface GenericPageProps {
  title: string;
  subtitle: string;
}

export default function GenericPage({ title, subtitle }: GenericPageProps) {
  return (
    <div className="min-h-screen bg-background text-text-primary">
      <TopNav />
      <LeftSidebar />
      <RightSidebar />

      <main className="pl-[220px] pr-[320px] pt-[52px] min-h-screen">
        <div className="max-w-[1000px] mx-auto p-8">
          <div className="flex items-start gap-4 mb-10 border-l-4 border-accent-primary pl-4">
            <div>
              <h1 className="text-28px font-bold">{title}</h1>
              <p className="text-text-muted mt-1">{subtitle}</p>
            </div>
          </div>
          
          <div className="glass-card p-12 flex flex-col items-center justify-center text-center opacity-50">
            <div className="w-16 h-16 rounded-full bg-input-bg flex items-center justify-center mb-4">
              <div className="w-8 h-8 rounded bg-border-color animate-pulse" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Module Initializing</h2>
            <p className="text-text-muted max-w-sm">
              The {title} module is currently being configured by the Luminal AI agent.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
