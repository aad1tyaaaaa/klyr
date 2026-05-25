'use client';

import { useState } from 'react';
import Link from 'next/link';
import BottomNav from '@/components/BottomNav';
import { Calendar, Award, Briefcase, Heart, Cpu, ArrowRight } from 'lucide-react';

const years = ['2020', '2021', '2022', '2023', '2024'];

const eventsByYear: Record<string, any[]> = {
  '2020': [
    { type: 'Education', title: 'Enrolled, B.E Electronics', issuer: 'VIT University', date: 'Aug 2020', status: 'Verified', icon: <Calendar size={18} /> }
  ],
  '2021': [
    { type: 'Achievement', title: 'Hackathon Winner', issuer: 'Smart India Hackathon', date: 'Sep 2021', status: 'Pending', icon: <Award size={18} /> }
  ],
  '2022': [
    { type: 'Employment', title: 'Internship', issuer: 'Tata Consultancy Services', date: 'Jan 2022 – Jun 2022', status: 'Verified', icon: <Briefcase size={18} /> }
  ],
  '2023': [
    { type: 'Health', title: 'Health Report Uploaded', issuer: 'Apollo Hospital', date: 'Jan 2023', status: 'Verified', icon: <Heart size={18} /> },
    { type: 'Insight', ai: true, title: 'Your last health check was 14 months ago. Consider uploading an updated report for insurance benefits.', action: 'Upload Report' }
  ],
  '2024': [
    { type: 'Education', title: 'Graduated, B.E Electronics', issuer: 'VIT University', date: 'Jun 2024', status: 'Verified', icon: <Calendar size={18} /> },
    { type: 'Insight', ai: true, title: 'Based on your degree and internship at TCS, you qualify for 3 embedded systems roles. Tap to view.', action: 'View Opportunities' },
    { type: 'Employment', title: 'Joined Full Stack Engineer', issuer: 'Startup XYZ', date: 'Jul 2024 – Present', status: 'Pending', icon: <Briefcase size={18} /> },
    { type: 'Education', title: 'Certificate, AWS Cloud Practitioner', issuer: 'Amazon Web Services', date: 'Aug 2024', status: 'Verified', icon: <Award size={18} /> }
  ]
};

export default function TimelinePage() {
  const [activeYear, setActiveYear] = useState('2024');

  return (
    <div className="min-h-screen bg-[#FBFAFF] pb-32">
       {/* LifeGraph Header */}
       <header className="px-6 pt-10 flex items-center justify-between sticky top-0 bg-[#FBFAFF]/90 backdrop-blur-xl z-30 pb-6">
        <h1 className="text-3xl font-black text-[#1F2937] tracking-tight">LifeGraph</h1>
        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#91A7FF] via-[#D1B3FF] to-[#F1F3FD] relative">
             <div className="absolute inset-0 rounded-full border-2 border-white/50" />
        </div>
      </header>

      {/* Years Selector */}
      <div className="px-6 flex gap-4 overflow-x-auto no-scrollbar pb-6 mt-2">
        {years.map((year) => (
          <button 
            key={year}
            onClick={() => setActiveYear(year)}
            className={`px-8 py-3 rounded-full text-sm font-black transition-all whitespace-nowrap border-2 ${
              activeYear === year 
                ? 'bg-[#B197FC] text-white border-[#B197FC] shadow-[0_8px_20px_rgba(151,130,255,0.3)] scale-105' 
                : 'bg-white text-[#9CA3AF] border-[#F3F4F6] hover:border-[#B197FC] hover:text-[#845EF7]'
            }`}
          >
            {year}
          </button>
        ))}
      </div>

      <main className="px-6 mt-6 space-y-6">
        {eventsByYear[activeYear]?.map((event, idx) => {
          if (event.ai) {
                return (
                    <div key={idx} className="bg-gradient-to-br from-[#F3F0FF] to-[#FFFFFF] rounded-[40px] p-8 border-2 border-[#F3F0FF] shadow-sm relative group overflow-hidden">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#91A7FF] via-[#D1B3FF] to-[#F1F3FD]" />
                            <span className="text-[10px] font-black uppercase tracking-[0.14em] text-[#B197FC]">Klyr AI</span>
                        </div>
                        <p className="text-[#4B5563] text-lg font-bold leading-7 mb-6">{event.title}</p>
                        <button className="text-[#845EF7] text-sm font-black tracking-tight hover:underline flex items-center gap-1.5 active:translate-x-1 transition-transform">
                            {event.action} <ArrowRight size={16} strokeWidth={3} />
                        </button>
                    </div>
                );
          }

          return (
            <div key={idx} className="flex gap-6 relative group">
                {/* Connector Line */}
                <div className="absolute left-[13px] top-[30px] bottom-[-30px] w-0.5 bg-gradient-to-b from-[#B197FC] to-transparent opacity-20 group-last:hidden" />
                
                {/* Node */}
                <div className={`w-7 h-7 rounded-full bg-white border-4 ${event.type === 'Education' ? 'border-[#91A7FF]' : event.type === 'Achievement' ? 'border-[#FF8787]' : 'border-[#B197FC]'} shadow-sm relative z-10 shrink-0 mt-1`} />

                <div className="bg-white rounded-[40px] p-8 border-2 border-[#F3F0FF] shadow-sm flex-1 relative transform transition-all group-hover:scale-[1.02] active:scale-[0.98]">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="px-3 py-1.5 bg-[#F3F0FF] rounded-full flex items-center gap-2">
                            <span className="text-[#845EF7]">{event.icon}</span>
                            <span className="text-[10px] font-black uppercase tracking-wider text-[#845EF7]">{event.type}</span>
                        </div>
                    </div>

                    <h3 className="text-xl font-black text-[#1F2937] leading-tight mb-2">{event.title}</h3>
                    <p className="text-[#6B7280] font-bold text-sm mb-1">{event.issuer}</p>
                    <p className="text-[#9CA3AF] text-xs font-bold mb-6">{event.date}</p>

                    <div className={`px-4 py-1.5 rounded-full w-fit text-[10px] font-black uppercase tracking-widest ${event.status === 'Verified' ? 'bg-[#EBFAEA] text-[#2F9E44]' : 'bg-[#FFF9DB] text-[#E67E22]'}`}>
                        {event.status}
                    </div>
                </div>
            </div>
          );
        })}
      </main>

      <BottomNav />
    </div>
  );
}
