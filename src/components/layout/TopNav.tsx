'use client';

import { Moon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { NotificationCenter } from '../NotificationCenter';

const navTabs = [
  { name: 'Profile', href: '/profile' },
  { name: 'Resume', href: '/resume' },
  { name: 'Jobs', href: '/jobs' },
  { name: 'Tracker', href: '/tracker' },
  { name: 'Notifications', href: '/notifications' },
];

export function TopNav() {
  const pathname = usePathname();
  const { data: session } = useSession();
  
  // Calculate Initials
  const name = session?.user?.name || session?.user?.email || '?';
  const initials = name !== '?' ? name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : '?';

  return (
    <nav className="h-[52px] bg-sidebar-bg border-b border-border-color flex items-center justify-between px-6 fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center gap-2">
        <span className="text-accent-primary font-bold text-lg">Luminal Agent</span>
      </div>

      <div className="flex items-center gap-8">
        {navTabs.map((tab) => (
          <Link
            key={tab.name}
            href={tab.href}
            className={`text-sm font-medium transition-colors relative h-[52px] flex items-center gap-2 ${
              pathname === tab.href ? 'text-accent-primary' : 'text-text-muted hover:text-text-primary'
            }`}
          >
            {tab.name}
            {tab.name === 'Notifications' && (
              <span className="px-1.5 py-0.5 bg-accent-primary text-white text-[9px] font-bold rounded-full">8 UNREAD</span>
            )}
            {pathname === tab.href && (
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent-primary" />
            )}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <NotificationCenter userId={(session?.user as unknown)?.id} />
        <button className="text-text-muted hover:text-text-primary transition-colors">
          <Moon size={20} />
        </button>
        {session?.user ? (
          <div className="w-8 h-8 rounded-full bg-[#2a1f5e] flex items-center justify-center text-xs font-semibold text-text-primary cursor-pointer hover:ring-2 ring-accent-primary transition-all">
            {initials}
          </div>
        ) : (
          <Link href="/login" className="text-xs font-bold text-accent-primary hover:underline">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
