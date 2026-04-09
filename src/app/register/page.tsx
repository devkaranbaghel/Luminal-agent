'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useLuminal';
import Link from 'next/link';
import { Orbit } from 'lucide-react';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { register, loading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register({ email, password, name });
    } catch (error) {
      // Error handled by global API interceptor toast
      console.error('Registration failed:', error);
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

        <h1 className="text-2xl font-bold mb-2">Deploy Your Agent</h1>
        <p className="text-text-muted text-sm mb-8">Set up your profile to start autonomous applications.</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-bold text-text-hint uppercase tracking-widest">Full Name</label>
            <input 
              type="text" 
              required
              className="input-field w-full bg-sidebar-bg" 
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

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
            {loading ? 'Deploying...' : 'Create Account'}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-text-muted">
          Already have an account?{' '}
          <Link href="/login" className="text-accent-primary font-bold hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
