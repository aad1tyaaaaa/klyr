'use client';

import { useState } from 'react';
import Link from 'next/link';
import BottomNav from '@/components/BottomNav';
import { 
  Briefcase, 
  ArrowLeft, 
  Star, 
  MapPin, 
  Clock,
  ChevronRight
} from 'lucide-react';

const programs = [
  {
    title: 'Embedded Systems Engineer',
    company: 'Tesla India',
    location: 'Bangalore, KA',
    type: 'Full-time',
    match: '98% Match',
    description: 'Based on your B.E Electronics and TCS Internship experience.',
    logo: '⚡'
  },
  {
    title: 'Graduate Trainee - Electronics',
    company: 'Reliance Industries',
    location: 'Mumbai, MH',
    type: 'Full-time',
    match: '95% Match',
    description: 'Priority hiring for VIT graduates with verified credentials.',
    logo: '🔷'
  },
  {
    title: 'Systems Validation Intern',
    company: 'Intel Corporation',
    location: 'Remote',
    type: 'Internship',
    match: '92% Match',
    description: 'AWS Cloud certification makes you a top candidate.',
    logo: '🔹'
  }
];

export default function ProgramsPage() {
  return (
    <div className="min-h-screen bg-[#FBFAFF] pb-32">
       {/* Header */}
       <header className="px-6 pt-10 flex items-center justify-between sticky top-0 bg-[#FBFAFF]/90 backdrop-blur-xl z-30 pb-6">
        <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-[#1F2937] active:scale-95 transition-transform"><ArrowLeft size={32} /></Link>
            <h1 className="text-3xl font-black text-[#1F2937] tracking-tight">Your Programs</h1>
        </div>
      </header>

      <main className="px-6 mt-8 space-y-8">
        <div className="bg-[#EBFAEA] p-8 rounded-[40px] flex items-center gap-6">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-[#2F9E44] shadow-sm shrink-0">
                <Star size={32} className="fill-[#2F9E44]" />
            </div>
            <div>
               <h4 className="font-black text-[#2F9E44] mb-1">Elite Candidate Status</h4>
               <p className="text-[11px] font-bold text-[#2F9E44] opacity-80 leading-relaxed uppercase tracking-widest">Verified credentials have boosted your discoverability by 4.2x.</p>
            </div>
        </div>

        <div className="space-y-6">
            {programs.map((job, i) => (
                <div key={i} className="bg-white rounded-[40px] p-8 shadow-sm border-2 border-[#F3F0FF] relative group hover:border-[#845EF7] transition-all transform hover:translate-y-[-2px]">
                    <div className="flex items-start justify-between mb-8">
                        <div className="w-16 h-16 bg-[#F8F9FA] rounded-[24px] flex items-center justify-center text-4xl shadow-inner border border-[#F1F3F5]">
                            {job.logo}
                        </div>
                        <div className="px-4 py-2 bg-[#F3F0FF] rounded-full">
                            <span className="text-[10px] font-black text-[#845EF7] uppercase tracking-widest">{job.match}</span>
                        </div>
                    </div>

                    <h3 className="text-2xl font-black text-[#1F2937] leading-tight mb-2 pr-12">{job.title}</h3>
                    <p className="text-lg font-bold text-[#4B5563] mb-6">{job.company}</p>
                    
                    <div className="flex flex-wrap gap-3 mb-8">
                        <div className="px-3 py-1 bg-gray-100 rounded-lg flex items-center gap-2">
                             <MapPin size={14} className="text-gray-400" />
                             <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{job.location}</span>
                        </div>
                        <div className="px-3 py-1 bg-gray-100 rounded-lg flex items-center gap-2">
                             <Clock size={14} className="text-gray-400" />
                             <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{job.type}</span>
                        </div>
                    </div>

                    <p className="text-[#6B7280] text-sm leading-relaxed mb-8">{job.description}</p>
                    
                    <button className="w-full py-5 bg-[#845EF7] text-white font-black rounded-2xl shadow-lg shadow-[#845EF7]/20 flex items-center justify-center gap-3 active:scale-95 transition-all">
                        Apply with Klyr <ChevronRight size={20} strokeWidth={3} />
                    </button>
                </div>
            ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
