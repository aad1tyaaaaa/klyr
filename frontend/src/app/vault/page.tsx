'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import BottomNav from '@/components/BottomNav';
import api from '@/lib/api';
import { Search, Plus } from 'lucide-react';

const categories = ['All', 'Education', 'Employment', 'Identity', 'Finance', 'Health'];

export default function VaultPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [credentials, setCredentials] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCredentials = async () => {
      setIsLoading(true);
      try {
        // Fetch from backend (will need to seed these new categories too)
        const res = await api.get('/credentials', {
           params: { type: activeCategory === 'All' ? undefined : activeCategory }
        });
        setCredentials(res.data);
      } catch (err) {
        console.error('Error fetching credentials:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCredentials();
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-[#FBFAFF] pb-32">
       {/* Header */}
       <header className="px-6 pt-10 flex items-center justify-between sticky top-0 bg-[#FBFAFF]/90 backdrop-blur-xl z-30 pb-6">
        <h1 className="text-3xl font-black text-[#1F2937] tracking-tight">Credential Vault</h1>
        <button className="text-[#9CA3AF] hover:text-[#4B5563] w-12 h-12 flex items-center justify-center">
            <Search size={28} />
        </button>
      </header>

      {/* Categories */}
      <div className="px-6 flex gap-3 overflow-x-auto no-scrollbar pb-6 mt-2">
        {categories.map((cat) => (
          <button 
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-8 py-3 rounded-full text-sm font-black transition-all whitespace-nowrap shadow-sm border-2 ${
              activeCategory === cat 
                ? 'bg-[#B197FC] text-white border-[#B197FC] shadow-[0_8px_20px_rgba(151,130,255,0.3)] scale-105' 
                : 'bg-white text-[#9CA3AF] border-[#F3F4F6] hover:border-[#B197FC] hover:text-[#845EF7]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <main className="px-6 mt-6 min-h-[400px]">
        {isLoading ? (
            <div className="flex items-center justify-center pt-20">
                <div className="w-12 h-12 border-4 border-[#B197FC] border-t-transparent rounded-full animate-spin" />
            </div>
        ) : (
            <div className="grid grid-cols-2 gap-6">
                {credentials.map((cred) => (
                <div key={cred.id} className="bg-white rounded-[40px] p-6 shadow-[0_8px_24px_rgba(0,0,0,0.04)] border-2 border-[#F3F0FF] relative group hover:border-[#B197FC] transform hover:translate-y-[-4px] transition-all flex flex-col h-[320px]">
                    {/* Top Badge */}
                    <div className="absolute top-4 right-4 translate-x-1 translate-y-[-1px]">
                        {cred.status === 'Pending' ? (
                            <div className="w-9 h-9 bg-[#FFF9DB] rounded-full flex items-center justify-center text-[#E67E22] border-2 border-white shadow-sm ring-4 ring-[#FBFAFF]">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                            </div>
                        ) : (
                            <div className="w-9 h-9 bg-[#40C057] rounded-full flex items-center justify-center text-white border-2 border-white shadow-sm ring-4 ring-[#FBFAFF]">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>
                            </div>
                        )}
                    </div>

                    <div className={`w-18 h-18 rounded-[28px] ${cred.color || 'bg-[#F3F0FF]'} flex items-center justify-center text-4xl mb-6 shadow-sm`}>
                        {cred.icon}
                    </div>

                    <h3 className="text-xl font-black text-[#1F2937] leading-tight tracking-tight mb-2 pr-6 line-clamp-2">{cred.title}</h3>
                    <p className="text-sm font-extrabold text-[#9CA3AF] mb-auto leading-relaxed">{cred.issuer}</p>

                    <div className="mt-4 pt-4 border-t border-[#F3F4F6] flex flex-col gap-3">
                        {cred.expiry && (
                            <div className="px-3 py-1.5 bg-[#FFF4E6] rounded-full w-fit flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 bg-[#D9480F] rounded-full" />
                                <span className="text-[10px] font-black text-[#D9480F] uppercase tracking-wider whitespace-nowrap">Exp: {cred.expiry}</span>
                            </div>
                        )}
                        <button className="text-[#845EF7] text-sm font-black tracking-tight hover:underline flex items-center gap-1.5 active:translate-x-1 transition-transform">
                            View Details <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                        </button>
                    </div>
                </div>
                ))}

                {credentials.length === 0 && (
                    <div className="col-span-2 flex flex-col items-center justify-center pt-24 space-y-4">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                            <Plus size={32} className="text-gray-300" />
                        </div>
                        <p className="text-lg font-bold text-[#9CA3AF] italic">No {activeCategory} documents yet</p>
                    </div>
                )}
            </div>
        )}
      </main>

      {/* FAB */}
      <button className="fixed bottom-28 right-8 w-20 h-20 rounded-full bg-gradient-to-tr from-[#91A7FF] to-[#D1B3FF] flex items-center justify-center text-white shadow-[0_12px_36px_rgba(151,130,255,0.4)] active:scale-95 transition-transform z-40 ring-8 ring-white/30 border-2 border-white/50">
        <Plus size={40} strokeWidth={3} />
      </button>

      <BottomNav />
    </div>
  );
}
