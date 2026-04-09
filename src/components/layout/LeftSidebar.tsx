'use client';

import { 
  Rocket, 
  Wifi, 
  BarChart2, 
  Send, 
  Calendar, 
  Plus, 
  Settings, 
  HelpCircle,
  LogOut
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

const sidebarItems = [
  { name: 'Tracker', icon: Rocket, href: '/tracker' },
  { name: 'Pipeline', icon: Send, href: '/pipeline' },
  { name: 'Scraping', icon: Wifi, href: '/scraping' },
  { name: 'Matching', icon: BarChart2, href: '/matching' },
  { name: 'Applying', icon: Send, href: '/applying' },
  { name: 'Interview', icon: Calendar, href: '/interview' },
];

export function LeftSidebar({ activeItem }: { activeItem?: string }) {
  const pathname = usePathname();

  const isItemActive = (item: typeof sidebarItems[0]) => {
    if (activeItem) return activeItem === item.name;
    return pathname === item.href;
  };

  return (
    <aside className="w-[220px] bg-sidebar-bg border-r border-border-color h-[calc(100vh-52px)] fixed top-[52px] left-0 flex flex-col p-4">
      {/* Agent Card */}
      <div className="glass-card p-3 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-accent-primary flex items-center justify-center">
            <Rocket className="text-white" size={20} />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-text-primary">Luminal AI</span>
            <span className="text-[10px] text-text-muted uppercase">Agent v2.4</span>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <div className="pulsing-dot" />
          <span className="text-[10px] font-bold text-text-muted">AGENT ACTIVE</span>
        </div>
      </div>

      <nav className="flex-1 flex flex-col gap-1">
        {sidebarItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group ${
              isItemActive(item)
                ? 'bg-[rgba(124,111,255,0.12)] border-l-3 border-accent-primary' 
                : 'hover:bg-card-surface border-l-3 border-transparent'
            }`}
          >
            <item.icon 
              size={20} 
              className={isItemActive(item) ? 'text-accent-primary' : 'text-text-muted group-hover:text-text-primary'} 
            />
            <span className={`text-sm ${isItemActive(item) ? 'text-text-primary font-medium' : 'text-text-muted group-hover:text-text-primary'}`}>
              {item.name}
            </span>
          </Link>
        ))}
      </nav>

      <div className="mt-auto flex flex-col gap-4">
        <button className="w-full h-10 bg-accent-primary hover:opacity-90 text-white rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-opacity">
          <Plus size={18} />
          New Search
        </button>

        <div className="flex flex-col gap-2">
          <Link href="/settings" className="flex items-center gap-3 px-3 py-1.5 text-text-muted hover:text-text-primary transition-colors">
            <Settings size={18} />
            <span className="text-sm">Settings</span>
          </Link>
          <Link href="/support" className="flex items-center gap-3 px-3 py-1.5 text-text-muted hover:text-text-primary transition-colors">
            <HelpCircle size={18} />
            <span className="text-sm">Support</span>
          </Link>
          <button 
            onClick={() => signOut()}
            className="flex items-center gap-3 px-3 py-1.5 text-text-muted hover:text-red-400 transition-colors w-full text-left"
          >
            <LogOut size={18} />
            <span className="text-sm">Log Out</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
