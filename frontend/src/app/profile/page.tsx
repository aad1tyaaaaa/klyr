'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import BottomNav from '@/components/BottomNav';
import api from '@/lib/api';
import { 
  User, 
  Shield, 
  Bell, 
  HelpCircle, 
  ChevronRight,
  UserCircle
} from 'lucide-react';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get('/dashboard-data');
        setUser(res.data);
      } catch (err) {
        console.error('Error fetching user:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (isLoading || !user) {
    return (
        <div className="min-h-screen bg-[#FBFAFF] flex items-center justify-center p-6">
            <div className="w-12 h-12 border-4 border-[#B197FC] border-t-transparent rounded-full animate-spin" />
        </div>
    );
  }

  const menuItems = [
    { name: 'Edit Profile', icon: <User className="text-[#845EF7]" size={24} /> },
    { name: 'Privacy & Security', icon: <Shield className="text-[#845EF7]" size={24} /> },
    { name: 'Notifications', icon: <Bell className="text-[#845EF7]" size={24} /> },
    { name: 'Help & Support', icon: <HelpCircle className="text-[#845EF7]" size={24} /> },
  ];

  return (
    <div className="min-h-screen bg-[#FBFAFF] pb-32">
       {/* Header */}
       <header className="px-6 pt-10 flex items-center justify-between sticky top-0 bg-[#FBFAFF]/90 backdrop-blur-xl z-30 pb-6">
        <h1 className="text-3xl font-black text-[#1F2937] tracking-tight">Profile</h1>
      </header>

      <main className="px-6 space-y-8">
        {/* Profile Info Card */}
        <div className="bg-white rounded-[40px] p-10 shadow-[0_20px_60px_-15px_rgba(151,130,255,0.1)] border-2 border-[#F3F0FF] relative overflow-hidden text-center group">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#B197FC] to-[#91A7FF]" />
            
            {/* Avatar */}
            <div className="mx-auto w-24 h-24 rounded-full bg-gradient-to-tr from-[#91A7FF] to-[#D1B3FF] flex items-center justify-center text-white text-3xl font-black shadow-lg mb-6 ring-4 ring-white border-2 border-white/20">
                AS
            </div>

            <h2 className="text-3xl font-black text-[#1F2937] tracking-tight mb-1">{user.name} Sharma</h2>
            <p className="text-[#9CA3AF] font-bold text-sm mb-6 uppercase tracking-wider">{user.email}</p>

            <div className="inline-flex items-center gap-2 px-6 py-2 bg-[#EBFAEA] rounded-full">
                <div className="w-5 h-5 bg-[#40C057] rounded-full flex items-center justify-center text-white text-[10px]">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7"/></svg>
                </div>
                <span className="text-[#2F9E44] font-black text-xs uppercase tracking-widest">Trust Score: {user.trustScore}%</span>
            </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4">
            {[
                { label: 'Credentials', value: '7' },
                { label: 'Verified', value: '5' },
                { label: 'Shared', value: '4' }
            ].map((stat, i) => (
                <div key={i} className="bg-white rounded-[32px] p-5 shadow-sm border-2 border-[#F3F0FF] text-center flex flex-col items-center justify-center">
                    <span className="text-3xl font-black text-[#1F2937] mb-0.5">{stat.value}</span>
                    <span className="text-[10px] font-black text-[#9CA3AF] uppercase tracking-widest leading-none">{stat.label}</span>
                </div>
            ))}
        </div>

        {/* Menu Items */}
        <div className="space-y-4">
            {menuItems.map((item, i) => (
                <button key={i} className="w-full bg-white rounded-[28px] p-6 shadow-sm border-2 border-[#F3F0FF] flex items-center justify-between group hover:border-[#B197FC] transition-all active:scale-[0.98]">
                    <div className="flex items-center gap-5">
                        <div className="w-12 h-12 rounded-2xl bg-[#F3F0FF] flex items-center justify-center group-hover:bg-[#B197FC] group-hover:text-white transition-colors">
                            {item.icon}
                        </div>
                        <span className="text-lg font-black text-[#374151] tracking-tight">{item.name}</span>
                    </div>
                    <ChevronRight className="text-[#9CA3AF] group-hover:text-[#B197FC] transition-colors" size={24} strokeWidth={3} />
                </button>
            ))}
        </div>

        {/* Sign Out */}
        <div className="pt-4 flex justify-center">
            <button 
                onClick={() => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    window.location.href = '/login';
                }}
                className="text-[#845EF7] font-black text-sm uppercase tracking-widest hover:underline"
            >
                Sign Out
            </button>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
