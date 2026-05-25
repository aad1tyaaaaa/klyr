'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import BottomNav from '@/components/BottomNav';
import { 
  Scan, 
  X, 
  ShieldCheck, 
  CheckCircle,
  HelpCircle,
  Zap
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ScanPage() {
  const [isScanning, setIsScanning] = useState(true);
  const [scanResult, setScanResult] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    // Simulate finding a QR code after 4 seconds
    const timer = setTimeout(() => {
      setIsScanning(false);
      setScanResult({
        name: 'Aaditya Sharma',
        type: 'Verified Identity',
        score: 92,
        docs: ['Bachelor of Engineering', 'Aadhaar Card'],
        verifiedAt: 'Now'
      });
    }, 4500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
       {/* Simulated Camera Feed */}
       <div className="absolute inset-0 bg-[#0A0A0A] flex items-center justify-center">
            {isScanning ? (
                <>
                    <div className="w-[80%] aspect-square border-4 border-[#845EF7]/40 rounded-[60px] relative overflow-hidden group">
                        {/* Scanning Bar Animation */}
                        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#845EF7] to-[#B197FC] shadow-[0_0_20px_#845EF7] animate-[scan_3s_ease-in-out_infinite]" />
                        <div className="absolute inset-0 bg-gradient-to-br from-[#845EF7]/5 via-transparent to-transparent opacity-20" />
                    </div>
                </>
            ) : (
                <div className="absolute inset-0 bg-white animate-in fade-in duration-700 flex flex-col items-center justify-center px-10">
                    <div className="w-40 h-40 bg-[#EBFAEA] rounded-full flex items-center justify-center text-[#2F9E44] mb-12 shadow-xl animate-bounce">
                        <ShieldCheck size={80} strokeWidth={2.5} />
                    </div>
                    
                    <div className="text-center space-y-6">
                        <div className="space-y-2">
                            <h2 className="text-4xl font-black text-[#1F2937] tracking-tighter">Verified Identity</h2>
                            <p className="text-[#9CA3AF] font-bold text-lg">{scanResult?.name}</p>
                        </div>

                        <div className="inline-flex items-center gap-3 px-8 py-3 bg-[#845EF7] rounded-full shadow-lg shadow-[#845EF7]/30">
                            <Zap size={24} className="text-[#D1B3FF] fill-[#D1B3FF]" />
                            <span className="text-white font-black text-lg">Trust Score: {scanResult?.score}%</span>
                        </div>

                        <div className="pt-12 text-left w-full space-y-6">
                             <h4 className="font-black text-[#374151] uppercase tracking-widest text-xs">Shared Documents</h4>
                             <div className="grid grid-cols-1 gap-4 w-full">
                                {scanResult?.docs.map((doc: string, i: number) => (
                                    <div key={i} className="bg-[#F8F9FA] p-6 rounded-3xl flex items-center justify-between border-2 border-[#F1F3F5]">
                                        <span className="font-extrabold text-[#495057]">{doc}</span>
                                        <CheckCircle size={24} className="text-[#40C057] fill-[#40C057] text-white" />
                                    </div>
                                ))}
                             </div>
                        </div>

                        <button 
                            onClick={() => router.push('/dashboard')}
                            className="w-full py-6 mt-12 bg-[#343A40] text-white font-bold rounded-3xl active:scale-95 transition-all text-xl"
                        >
                            Done
                        </button>
                    </div>
                </div>
            )}
       </div>

       {/* Top Overlay */}
       <header className="absolute top-0 left-0 right-0 px-8 py-12 flex items-center justify-between z-50">
           <Link href="/dashboard" className="w-16 h-16 bg-white/20 backdrop-blur-3xl rounded-[24px] flex items-center justify-center text-white border border-white/20">
                <X size={32} />
           </Link>
           <div className="w-16 h-16 bg-white/10 backdrop-blur-3xl rounded-[24px] flex items-center justify-center text-white border border-white/20">
                <HelpCircle size={32} />
           </div>
       </header>

       {/* Bottom Overlay Instructions */}
       {isScanning && (
           <footer className="absolute bottom-12 left-0 right-0 px-12 z-50 animate-in fade-in slide-in-from-bottom-10 delay-300">
               <div className="bg-white/10 backdrop-blur-3xl rounded-[40px] p-8 border border-white/10 text-center space-y-4">
                   <div className="flex items-center justify-center gap-2 mb-2">
                       <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                       <span className="text-white text-xs font-black uppercase tracking-[0.2em] opacity-80">Searching for QR Code</span>
                   </div>
                   <h3 className="text-white text-2xl font-black leading-tight">Align any Klyr QR code to verify identity</h3>
                   <p className="text-white/40 text-sm font-bold">Verification happens peer-to-peer and is end-to-end encrypted.</p>
               </div>
           </footer>
       )}

       <style>{`
          @keyframes scan {
              0% { top: 0; }
              50% { top: 100%; }
              100% { top: 0; }
          }
       `}</style>
    </div>
  );
}
