'use client';

import { useEffect, useState } from 'react';
import { Download, X, Globe } from 'lucide-react';

export default function InstallPopup() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Check if the app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
       return;
    }

    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Only show if the user hasn't dismissed it in this session
      const dismissed = sessionStorage.getItem('pwa_popup_dismissed');
      if (!dismissed) {
        setShowPopup(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setShowPopup(false);
    }
    setDeferredPrompt(null);
  };

  const handleContinueClick = () => {
    setShowPopup(false);
    sessionStorage.setItem('pwa_popup_dismissed', 'true');
  };

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-md p-6 animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-md rounded-[40px] p-8 shadow-[0_24px_48px_rgba(0,0,0,0.15)] transform animate-in slide-in-from-bottom-10 duration-500 border-2 border-[#F3F0FF] relative">
        <button 
          onClick={handleContinueClick}
          className="absolute top-6 right-6 text-[#9CA3AF] hover:text-[#1F2937] transition-colors"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-gradient-to-tr from-[#91A7FF] via-[#D1B3FF] to-[#F1F3FD] rounded-3xl flex items-center justify-center mb-8 shadow-inner shadow-white/50 relative">
             <div className="absolute inset-0 rounded-3xl bg-white/20 backdrop-blur-[2px] border border-white/40" />
             <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg relative z-10">
                <svg className="w-8 h-8 text-[#845EF7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
             </div>
          </div>

          <h3 className="text-3xl font-black text-[#1F2937] tracking-tight mb-3">Install Klyr App</h3>
          <p className="text-[#6B7280] text-lg font-medium leading-7 mb-10 px-4">
            Get the full native experience with offline access and desktop shortcuts.
          </p>

          <div className="w-full flex flex-col gap-4">
            <button
               onClick={handleInstallClick}
               className="w-full py-5 bg-gradient-to-r from-[#B197FC] to-[#91A7FF] text-white font-black text-lg rounded-2xl shadow-[0_12px_24px_rgba(151,130,255,0.25)] flex items-center justify-center gap-3 active:scale-95 transition-all"
            >
              <Download size={24} />
              Install Now
            </button>
            <button
               onClick={handleContinueClick}
               className="w-full py-5 text-[#845EF7] font-black text-lg rounded-2xl border-2 border-[#F3F4F6] hover:bg-[#F9FAFB] transition-all flex items-center justify-center gap-3"
            >
              <Globe size={24} />
              Continue in browser
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
