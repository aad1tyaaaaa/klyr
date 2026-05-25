'use client';

import { useState } from 'react';
import Link from 'next/link';
import BottomNav from '@/components/BottomNav';
import { 
  Compass, 
  Sparkles, 
  TrendingUp, 
  ArrowRight,
  Briefcase,
  GraduationCap,
  Heart
} from 'lucide-react';

const recommendations = [
  {
    category: 'Career Path',
    title: 'Masters in Data Science',
    description: 'Based on your B.E Electronics from VIT, you are eligible for priority admission.',
    issuer: 'Stanford University Online',
    icon: <GraduationCap size={24} className="text-[#845EF7]" />,
    tag: 'Priority Access',
    color: 'bg-[#F3F0FF]'
  },
  {
    category: 'Finance',
    title: 'HDFC Priority Credit Card',
    description: 'Your trust score of 92% pre-qualifies you for the Infinia card with No Join fee.',
    issuer: 'HDFC Bank',
    icon: <TrendingUp size={24} className="text-[#339AF0]" />,
    tag: 'Pre-Approved',
    color: 'bg-[#E7F5FF]'
  },
  {
    category: 'Wellness',
    title: 'Premium Health Insurance',
    description: 'Verified Apollo health report gives you a 15% discount on yearly premiums.',
    issuer: 'Star Health',
    icon: <Heart size={24} className="text-[#FF8787]" />,
    tag: '15% Off',
    color: 'bg-[#FFF5F5]'
  }
];

export default function DiscoverPage() {
  return (
    <div className="min-h-screen bg-[#FBFAFF] pb-32">
       {/* Header */}
       <header className="px-6 pt-10 flex items-center justify-between sticky top-0 bg-[#FBFAFF]/90 backdrop-blur-xl z-30 pb-6">
        <h1 className="text-3xl font-black text-[#1F2937] tracking-tight">Discover</h1>
        <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#845EF7] shadow-sm border border-[#F3F4F6]">
            <Compass size={24} />
        </button>
      </header>

      <main className="px-6 space-y-8">
        {/* Banner */}
        <div className="bg-gradient-to-r from-[#845EF7] to-[#B197FC] rounded-[40px] p-8 text-white relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-16 translate-x-16" />
            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                    <Sparkles size={20} className="text-[#D1B3FF]" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#D1B3FF]">AI Personalized</span>
                </div>
                <h2 className="text-2xl font-black leading-tight mb-4 pr-12">New opportunities unlocked by your credentials</h2>
                <button className="px-6 py-2.5 bg-white text-[#845EF7] font-black text-xs rounded-full shadow-lg active:scale-95 transition-all">
                    Explore All
                </button>
            </div>
            <div className="absolute right-8 bottom-8 opacity-20">
                <Compass size={80} />
            </div>
        </div>

        {/* Section Title */}
        <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-[#1F2937]">Recommended for You</h3>
            <span className="text-xs font-bold text-[#9CA3AF]">Based on 7 Docs</span>
        </div>

        {/* Recommendations List */}
        <div className="space-y-6">
            {recommendations.map((rec, i) => (
                <div key={i} className="bg-white rounded-[40px] p-8 shadow-sm border-2 border-[#F3F0FF] relative group hover:border-[#845EF7] transition-all transform hover:translate-y-[-4px]">
                    <div className="flex items-start justify-between mb-6">
                        <div className={`w-14 h-14 rounded-2xl ${rec.color} flex items-center justify-center`}>
                            {rec.icon}
                        </div>
                        <div className="px-3 py-1 bg-[#F3F0FF] rounded-full">
                            <span className="text-[10px] font-black text-[#845EF7] uppercase tracking-wider">{rec.tag}</span>
                        </div>
                    </div>

                    <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest mb-1">{rec.category}</p>
                    <h4 className="text-2xl font-black text-[#1F2937] leading-tight mb-3">{rec.title}</h4>
                    <p className="text-[#6B7280] text-sm leading-relaxed mb-6">{rec.description}</p>
                    
                    <div className="flex items-center justify-between pt-6 border-t border-[#F3F4F6]">
                        <span className="text-sm font-extrabold text-[#1F2937]">{rec.issuer}</span>
                        <button className="text-[#845EF7] flex items-center gap-1.5 font-black text-sm group-hover:underline">
                            Details <ArrowRight size={18} strokeWidth={3} />
                        </button>
                    </div>
                </div>
            ))}
        </div>

        {/* Categories Grid */}
        <section className="pt-4">
             <h3 className="text-xl font-black text-[#1F2937] mb-6">Explore Industries</h3>
             <div className="grid grid-cols-2 gap-4">
                {[
                    { name: 'Education', count: '124', icon: <GraduationCap size={24} /> },
                    { name: 'Finance', count: '89', icon: <TrendingUp size={24} /> },
                    { name: 'Jobs', count: '240', icon: <Briefcase size={24} /> },
                    { name: 'Health', count: '56', icon: <Heart size={24} /> },
                ].map((cat, i) => (
                    <div key={i} className="bg-white p-6 rounded-[32px] border-2 border-[#F3F4F6] hover:border-[#845EF7] transition-all group">
                        <div className="w-12 h-12 bg-[#F9FAFB] rounded-2xl flex items-center justify-center text-[#9CA3AF] group-hover:bg-[#F3F0FF] group-hover:text-[#845EF7] transition-colors mb-4">
                            {cat.icon}
                        </div>
                        <h5 className="font-black text-[#1F2937] mb-0.5">{cat.name}</h5>
                        <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest">{cat.count} Programs</p>
                    </div>
                ))}
             </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
