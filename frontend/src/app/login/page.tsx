'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

export default function LoginPage() {
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('123456');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const res = await api.post('/login', { email, password });
      // Store token (mock)
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      router.push('/dashboard');
    } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to login');
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white px-8 pt-12">
      {/* Top Decor */}
      <div className="absolute top-4 left-4">
        <div className="w-12 h-12 bg-[#845EF7] rounded-full flex items-center justify-center shadow-lg transform rotate-[-10deg]">
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
          </svg>
        </div>
      </div>

      <main className="flex-1 mt-12">
        <h1 className="text-4xl font-black text-[#1F2937] tracking-tight">Welcome back</h1>
        <p className="text-[#6B7280] mt-3 text-lg font-medium">Sign in to access your digital identity</p>

        {/* Mock Login Hint */}
        <div className="mt-8 p-4 bg-[#F3E8FF] rounded-2xl border border-[#D8B4FE] flex items-center gap-3">
          <div className="w-6 h-6 bg-[#845EF7] rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-sm font-bold text-[#6B21A8]">
            MOCK LOGIN - Use: <span className="text-[#845EF7]">test@example.com / 123456</span>
          </p>
        </div>

        {error && (
            <div className="mt-6 p-4 bg-red-50 text-red-500 text-sm font-bold rounded-xl border border-red-100 flex items-center gap-2">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                {error}
            </div>
        )}

        <form onSubmit={handleLogin} className="mt-10 space-y-8">
          <div className="space-y-3">
            <label className="text-sm font-bold text-[#374151] ml-1">Email or phone</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-[#845EF7] opacity-60 group-focus-within:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <input 
                type="text" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="test@example.com"
                className="w-full pl-14 pr-5 py-5 rounded-2xl bg-[#F9FAFB] border-2 border-[#F3F4F6] focus:border-[#845EF7] focus:bg-white outline-none transition-all placeholder:text-[#9CA3AF] text-[#1F2937]"
              />
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-[#374151] ml-1">Password</label>
              <Link href="#" className="text-sm font-bold text-[#845EF7] hover:underline">Forgot password?</Link>
            </div>
            <div className="relative group">
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-[#845EF7] opacity-60 group-focus-within:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input 
                type={showPassword ? "text" : "password"} 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-14 pr-14 py-5 rounded-2xl bg-[#F9FAFB] border-2 border-[#F3F4F6] focus:border-[#845EF7] focus:bg-white outline-none transition-all placeholder:text-[#9CA3AF] text-[#1F2937]"
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-5 flex items-center text-[#9CA3AF] hover:text-[#845EF7] transition-colors"
              >
                <svg className="w-5 h-4" color="#9f9f9f" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full py-5 bg-gradient-to-r from-[#B197FC] to-[#91A7FF] text-white font-black text-lg rounded-2xl shadow-[0_12px_24px_rgba(151,71,255,0.25)] flex items-center justify-center active:scale-95 transition-all disabled:opacity-70"
          >
            {isLoading ? (
              <svg className="animate-spin h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : 'Sign In'}
          </button>
        </form>

        <div className="relative my-10 flex items-center">
            <div className="flex-grow border-t border-[#F3F4F6]"></div>
            <span className="flex-shrink mx-4 text-xs font-bold text-[#9CA3AF] uppercase tracking-widest">or continue with</span>
            <div className="flex-grow border-t border-[#F3F4F6]"></div>
        </div>

        <button className="w-full py-5 border-2 border-[#F3F4F6] rounded-2xl flex items-center justify-center gap-4 text-[#374151] font-bold hover:bg-[#F9FAFB] transition-colors">
            <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
        </button>

        <div className="mt-10 flex flex-col items-center gap-6 pb-12">
            <div className="flex gap-6">
                <button className="w-16 h-16 rounded-3xl border-2 border-[#F3F4F6] flex items-center justify-center text-[#845EF7] hover:border-[#845EF7] transition-colors">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
                <button className="w-16 h-16 rounded-3xl border-2 border-[#F3F4F6] flex items-center justify-center text-[#845EF7] hover:border-[#845EF7] transition-colors">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A10.003 10.003 0 0012 20c4.083 0 7.723-2.43 9.388-5.938a1.999 1.999 0 00-1.1-2.585l-1.006-.335m-11.97-.335l1.006.335A10.007 10.007 0 0012 10.03V5a3 3 0 00-6 0v2.97c0 1.31-.32 2.564-.89 3.665l-.054.09m15.83 2.13l1.006.335m-15.83-2.13l-1.006-.335A9.999 9.999 0 0112 10.03v-4.97" />
                    </svg>
                </button>
            </div>
            <p className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider">Quick access</p>
            
            <p className="mt-4 text-[#4B5563] font-medium">
                Do not have an account? <Link href="#" className="text-[#845EF7] font-black">Create one</Link>
            </p>
        </div>
      </main>
    </div>
  );
}
