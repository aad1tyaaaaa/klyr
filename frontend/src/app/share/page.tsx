'use client';

import { useState } from 'react';
import Link from 'next/link';
import BottomNav from '@/components/BottomNav';
import { 
  QrCode, 
  Share2, 
  Clock, 
  CheckSquare, 
  ChevronRight,
  ArrowLeft
} from 'lucide-react';

const shareHistory = [
  { recipient: 'HDFC Bank', date: 'Oct 12, 2024', status: 'Active', docs: '3 documents' },
  { recipient: 'Stanford University', date: 'Sep 28, 2024', status: 'Expired', docs: '1 document' },
  { recipient: 'Tata Consultancy Services', date: 'Sep 24, 2024', status: 'Expired', docs: '2 documents' },
];

export default function SharePage() {
  const [selectedDocs, setSelectedDocs] = useState<string[]>([]);
  const [activeStep, setActiveStep] = useState(1); // 1: Select, 2: QR

  const docsToShare = [
    { id: '1', title: 'Aadhaar Card', type: 'Identity' },
    { id: '2', title: 'VIT B.E Degree', type: 'Education' },
    { id: '3', title: 'Salary Slip July', type: 'Finance' },
    { id: '4', title: 'PAN Card', type: 'Finance' },
  ];

  const handleToggle = (id: string) => {
    setSelectedDocs(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <div className="min-h-screen bg-[#FBFAFF] pb-32">
       {/* Header */}
       <header className="px-6 pt-10 flex items-center justify-between sticky top-0 bg-[#FBFAFF]/90 backdrop-blur-xl z-30 pb-6">
        <h1 className="text-3xl font-black text-[#1F2937] tracking-tight">Sharing Hub</h1>
        <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#845EF7] shadow-sm border border-[#F3F4F6]">
            <Share2 size={24} />
        </button>
      </header>

      <main className="px-6 space-y-8">
        {activeStep === 1 ? (
          <>
            {/* Step Indicators */}
            <div className="flex items-center gap-2">
                <div className="h-2 flex-1 bg-[#845EF7] rounded-full" />
                <div className="h-2 flex-1 bg-[#F3F0FF] rounded-full" />
            </div>

            <div className="space-y-4">
               <h3 className="text-2xl font-black text-[#1F2937]">Select documents to share</h3>
               <p className="text-[#9CA3AF] font-bold text-sm">You control exactly what data is visible.</p>
            </div>

            <div className="space-y-4">
                {docsToShare.map((doc) => (
                    <button 
                        key={doc.id}
                        onClick={() => handleToggle(doc.id)}
                        className={`w-full p-6 bg-white rounded-[32px] border-2 flex items-center justify-between transition-all active:scale-95 ${
                            selectedDocs.includes(doc.id) ? 'border-[#845EF7] shadow-lg shadow-[#845EF7]/5 scale-[1.02]' : 'border-[#F3F0FF]'
                        }`}
                    >
                        <div className="flex items-center gap-6">
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${selectedDocs.includes(doc.id) ? 'bg-[#845EF7] text-white' : 'bg-[#F3F0FF] text-[#845EF7]'}`}>
                                <CheckSquare size={24} />
                            </div>
                            <div className="text-left">
                                <h4 className="font-black text-lg text-[#1F2937] leading-none mb-1">{doc.title}</h4>
                                <span className="text-[10px] font-black text-[#9CA3AF] uppercase tracking-widest">{doc.type}</span>
                            </div>
                        </div>
                        {selectedDocs.includes(doc.id) && <div className="w-6 h-6 bg-[#845EF7] rounded-full flex items-center justify-center text-white"><CheckSquare size={14} /></div>}
                    </button>
                ))}
            </div>

            {selectedDocs.length > 0 && (
                <button 
                  onClick={() => setActiveStep(2)}
                  className="w-full py-6 bg-gradient-to-r from-[#B197FC] to-[#91A7FF] text-white font-black text-xl rounded-2xl shadow-xl shadow-[#845EF7]/20 flex items-center justify-center gap-3 active:scale-95 transition-all mt-8"
                >
                  Generate Share Key <ArrowLeft className="rotate-180" size={24} />
                </button>
            )}

            {/* Recent History */}
            <div className="pt-8 space-y-6">
                 <h3 className="text-xl font-black text-[#374151]">Active Shares</h3>
                 <div className="space-y-4">
                    {shareHistory.map((item, i) => (
                        <div key={i} className="flex items-center justify-between bg-white p-6 rounded-3xl border border-[#F3F0FF]">
                            <div className="flex flex-col">
                                <span className="font-black text-[#1F2937]">{item.recipient}</span>
                                <span className="text-xs font-bold text-[#9CA3AF]">{item.docs}</span>
                            </div>
                            <div className={`px-4 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest ${item.status === 'Active' ? 'bg-[#EBFAEA] text-[#2F9E44]' : 'bg-gray-100 text-gray-400'}`}>
                                {item.status}
                            </div>
                        </div>
                    ))}
                 </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-12 animate-in slide-in-from-right-10 pt-12">
              <button 
                onClick={() => setActiveStep(1)}
                className="self-start text-[#845EF7] font-black flex items-center gap-2 hover:underline"
              >
                  <ArrowLeft size={20} /> Back to selection
              </button>

              <div className="w-full max-w-sm bg-white rounded-[60px] p-12 shadow-2xl border-2 border-[#F3F0FF] flex flex-col items-center space-y-8 text-center">
                  <div className="w-full aspect-square bg-[#FBFAFF] rounded-[40px] border-2 border-[#F3F0FF] p-8 flex items-center justify-center relative group">
                      <div className="absolute inset-0 border-2 border-[#B197FC] rounded-[40px] animate-pulse opacity-20" />
                      <QrCode size={200} className="text-[#1F2937]" strokeWidth={1} />
                  </div>
                  <div className="space-y-2">
                       <h3 className="text-2xl font-black text-[#1F2937]">Verify One-Time Access</h3>
                       <p className="text-[#9CA3AF] font-bold text-sm">Expires in <strong>04:59</strong> minutes</p>
                  </div>
              </div>

              <div className="w-full grid grid-cols-2 gap-4 pb-12">
                   <div className="bg-[#FFF4E6] p-6 rounded-[32px] flex flex-col items-center gap-2">
                        <Clock size={32} className="text-[#D9480F]" />
                        <span className="text-[10px] font-black text-[#D9480F] uppercase tracking-widest">Temporary Access</span>
                   </div>
                   <div className="bg-[#F3F0FF] p-6 rounded-[32px] flex flex-col items-center gap-2">
                        <Share2 size={32} className="text-[#845EF7]" />
                        <span className="text-[10px] font-black text-[#845EF7] uppercase tracking-widest">Share Link</span>
                   </div>
              </div>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
