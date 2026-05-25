'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import BottomNav from '@/components/BottomNav';
import api from '@/lib/api';

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [activities, setActivities] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, activityRes] = await Promise.all([
          api.get('/dashboard-data'),
          api.get('/activities')
        ]);
        setUser(userRes.data);
        setActivities(activityRes.data);
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const actions = [
    { name: 'Upload', iconColor: 'text-[#B197FC]', bgColor: 'bg-[#F3F0FF]', path: '/upload' },
    { name: 'Share', iconColor: 'text-[#339AF0]', bgColor: 'bg-[#E7F5FF]', path: '/share' },
    { name: 'Timeline', iconColor: 'text-[#FF8787]', bgColor: 'bg-[#FFF5F5]', path: '/timeline' },
    { name: 'Scan', iconColor: 'text-[#FF922B]', bgColor: 'bg-[#FFF4E6]', path: '/scan' },
  ];

  if (isLoading || !user) {
      return (
          <div className="min-h-screen bg-[#FBFAFF] flex items-center justify-center p-6">
              <div className="w-12 h-12 border-4 border-[#B197FC] border-t-transparent rounded-full animate-spin" />
          </div>
      );
  }

  return (
    <div className="min-h-screen bg-[#FBFAFF] pb-32">
      {/* Header */}
      <header className="px-6 pt-8 flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-lg font-medium text-[#7E7E7E]">Good morning,</p>
          <div className="flex items-center gap-2">
            <h1 className="text-4xl font-extrabold text-[#1F2937] tracking-tight">
              {user.name} 👋
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-4 relative">
             <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#4B5563] shadow-sm border border-[#F3F4F6]">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <div className="absolute top-1 right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white" />
             </button>
        </div>
      </header>

      <main className="px-6 mt-8 space-y-8">
        {/* Your Identity Card */}
        <div className="bg-white rounded-[40px] p-8 shadow-[0_20px_60px_-15px_rgba(151,130,255,0.12)] border border-[#F3F0FF] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-[#F3F0FF] to-transparent opacity-40 rounded-bl-full transform translate-x-12 translate-y-[-12px]" />
            <div className="flex items-center gap-2 mb-6">
                <span className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider">Your Identity</span>
                <svg className="w-4 h-4 text-[#845EF7]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
            </div>
            
            <h2 className="text-5xl font-black text-[#1F2937] tracking-tight mb-8">
                7 Credentials
            </h2>
            
            <div className="flex gap-3 mb-10">
                <div className="px-4 py-2 bg-[#EBFAEA] rounded-full flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#2F9E44]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm font-bold text-[#2F9E44]">5 Verified</span>
                </div>
                <div className="px-4 py-2 bg-[#FFF9DB] rounded-full flex items-center gap-2">
                    <span className="text-lg">⏳</span>
                    <span className="text-sm font-bold text-[#744210]">2 Pending</span>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4 border-t border-[#F3F4F6] pt-6">
                <div className="space-y-1">
                    <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider">Last verified</p>
                    <p className="text-sm font-extrabold text-[#1F2937]">{user.lastVerified}</p>
                </div>
                <div className="space-y-1">
                    <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider">Trust score</p>
                    <p className="text-sm font-extrabold text-[#1F2937]">{user.trustScore}%</p>
                </div>
                <div className="space-y-1">
                    <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider">Shared</p>
                    <p className="text-sm font-extrabold text-[#1F2937]">{user.sharedCount} times</p>
                </div>
            </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-4 gap-4">
            {actions.map((action) => (
                <Link key={action.name} href={action.path} className="flex flex-col items-center gap-3 group">
                    <div className={`w-full aspect-square rounded-[32px] ${action.bgColor} flex items-center justify-center transform group-hover:scale-110 transition-transform shadow-sm`}>
                        {action.name === 'Upload' && <svg className={`w-8 h-8 ${action.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>}
                        {action.name === 'Share' && <svg className={`w-8 h-8 ${action.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"/></svg>}
                        {action.name === 'Timeline' && <svg className={`w-8 h-8 ${action.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4"/></svg>}
                        {action.name === 'Scan' && <svg className={`w-8 h-8 ${action.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"/></svg>}
                    </div>
                    <span className="text-xs font-bold text-[#6B7280] tracking-tight lowercase">{action.name}</span>
                </Link>
            ))}
        </div>

        {/* Career Insight Card (Static as per image) */}
        <div className="bg-white rounded-[40px] p-8 border-2 border-[#F3F0FF] shadow-sm relative group overflow-hidden">
            <button className="absolute top-6 right-6 text-[#9CA3AF] hover:text-[#4B5563]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#91A7FF] via-[#D1B3FF] to-[#F1F3FD]" />
                <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-black uppercase tracking-[0.14em] text-[#B197FC]">Career Insight</span>
                    <div className="w-2.5 h-2.5 bg-[#40C057] rounded-full border-2 border-white shadow-sm" />
                </div>
            </div>
            <h3 className="text-2xl font-black text-[#1F2937] leading-tight mb-3">You are eligible for 3 job programs</h3>
            <p className="text-[#6B7280] text-sm leading-6">Based on your B.E Electronics degree and your 6-month internship at Tata Consultancy Services.</p>
            
            <div className="flex gap-4 mt-8">
                <button className="flex-1 py-4 px-6 bg-[#F3F0FF] text-[#845EF7] font-extrabold text-sm rounded-2xl hover:bg-[#EBD9FF] transition-colors flex items-center justify-center gap-2">
                    View Programs <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                </button>
                <button className="py-4 px-6 border-2 border-[#F3F4F6] text-[#6B7280] font-extrabold text-sm rounded-2xl hover:bg-[#F9FAFB] transition-colors">Why this?</button>
            </div>
        </div>

        {/* Recent Activity Section (Dynamic from activities table) */}
        <section className="mt-12 pb-12">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-black text-[#1F2937]">Recent Activity</h3>
                <Link href="#" className="text-sm font-bold text-[#B197FC] tracking-tight">See all</Link>
            </div>
            
            <div className="space-y-4">
                {activities.map((activity, i) => (
                    <div key={i} className="bg-white rounded-[32px] p-6 flex items-center justify-between border border-[#F3F0FF] shadow-sm group hover:border-[#B197FC] transition-colors">
                        <div className="flex items-center gap-5">
                            <div className={`w-14 h-14 rounded-2xl ${activity.bgColor} flex items-center justify-center text-2xl`}>
                                {activity.icon}
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <h4 className="text-lg font-black text-[#1F2937] tracking-tight">{activity.title}</h4>
                                <p className="text-xs font-bold text-[#9CA3AF] tracking-tight">{activity.subtitle}</p>
                            </div>
                        </div>
                        <div className="px-3.5 py-1.5 bg-[#EBFAEA] rounded-full text-[10px] font-black text-[#2F9E44] uppercase tracking-wider">
                            {activity.status}
                        </div>
                    </div>
                ))}
            </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
