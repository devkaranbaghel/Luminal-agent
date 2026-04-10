import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';

export function useAuth() {
  const [user, setUser] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (credentials: unknown) => {
    setLoading(true);
    try {
      const res = await api.post('/auth/login', credentials) as unknown;
      const { user, accessToken, refreshToken } = res.data;
      
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      
      setUser(user);
      router.push('/tracker');
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: unknown) => {
    setLoading(true);
    try {
      const res = await api.post('/auth/register', data) as unknown;
      const { user, accessToken, refreshToken } = res.data;
      
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      
      setUser(user);
      router.push('/tracker');
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
    router.push('/login');
  };

  return { user, loading, login, register, logout, isAuthenticated: !!user };
}

export function useAutomation() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMatches = async () => {
    setLoading(true);
    try {
      const res = await api.get('/automation/matches') as unknown;
      setMatches(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const apply = async (jobId: string, title: string, company: string) => {
    try {
      await api.post('/automation/apply', { title, company });
      return true;
    } catch (_error) {
      return false;
    }
  };

  return { matches, loading, fetchMatches, apply };
}
