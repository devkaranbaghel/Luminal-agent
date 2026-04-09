'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Orbit } from 'lucide-react';
import { api } from '@/lib/api';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // 1. Authenticate with Express Backend to get raw JWT 
      // (This is required because the Scraper/Tracker use api.ts Axios calls to the backend on port 4000!)
      const backendRes = await api.post('/auth/login', { email, password }) as any;
      if (backendRes.data?.accessToken) {
        localStorage.setItem('accessToken', backendRes.data.accessToken);
        localStorage.setItem('refreshToken', backendRes.data.refreshToken);
        localStorage.setItem('user', JSON.stringify(backendRes.data.user));
      }

      // 2. Authenticate with NextAuth to hydrate the Server Session
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        throw new Error("Invalid email or password");
      }

      // Success, native redirect
      router.push('/');
    } catch (error: any) {
      console.error('Login failed:', error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-card-surface border border-border-color rounded-2xl p-8 glass-card">
        <div className="flex items-center gap-2 mb-8 justify-center">
          <div className="w-10 h-10 bg-accent-primary rounded-xl flex items-center justify-center shadow-lg shadow-accent-primary/20">
            <Orbit className="text-white" size={24} />
          </div>
          <span className="text-2xl font-bold tracking-tight">Luminal Agent</span>
        </div>

        <h1 className="text-2xl font-bold mb-2">Welcome Back</h1>
        <p className="text-text-muted text-sm mb-8">Access your autonomous career control center.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-text-hint uppercase tracking-widest">Email Address</label>
            <input 
              type="email" 
              required
              className="input-field w-full bg-sidebar-bg" 
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-text-hint uppercase tracking-widest">Password</label>
            <input 
              type="password" 
              required
              className="input-field w-full bg-sidebar-bg" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-accent-primary text-white font-bold py-3 rounded-xl hover:opacity-90 transition-all disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-text-muted">
          Don't have an account?{' '}
          <Link href="/register" className="text-accent-primary font-bold hover:underline">
            Create Agent
          </Link>
        </p>
      </div>
    </div>
  );
}
