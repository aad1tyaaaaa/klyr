'use client';

import { useState } from 'react';
import Link from 'next/link';
import BottomNav from '@/components/BottomNav';
import { 
  Upload, 
  Camera, 
  FileText, 
  ShieldCheck, 
  X,
  CheckCircle,
  Clock
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    setIsUploading(true);
    // Simulate high-speed verification
    setTimeout(() => {
      setIsUploading(false);
      setIsSuccess(true);
      // Wait a bit then redirect to vault
      setTimeout(() => router.push('/vault'), 2500);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#FBFAFF] pb-32">
       {/* Header */}
       <header className="px-6 pt-10 flex items-center justify-between sticky top-0 bg-[#FBFAFF]/90 backdrop-blur-xl z-30 pb-6">
        <h1 className="text-3xl font-black text-[#1F2937] tracking-tight">Add Document</h1>
        <Link href="/dashboard" className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#9CA3AF] shadow-sm border border-[#F3F4F6]">
            <X size={24} />
        </Link>
      </header>

      <main className="px-6 mt-8">
        {!isSuccess ? (
          <div className="space-y-12 flex flex-col items-center">
            {/* Empty State / Upload Area */}
            <div className="w-full aspect-[4/5] bg-white rounded-[40px] border-4 border-dashed border-[#F3F0FF] p-12 flex flex-col items-center justify-center text-center relative overflow-hidden group hover:border-[#B197FC] transition-all cursor-pointer">
               {isUploading && (
                  <div className="absolute inset-0 bg-[#845EF7]/10 backdrop-blur-[4px] z-20 flex flex-col items-center justify-center space-y-4">
                      <div className="w-16 h-16 border-4 border-[#845EF7] border-t-transparent rounded-full animate-spin" />
                      <p className="text-[#845EF7] font-black text-lg tracking-tight uppercase">Encrypting Document...</p>
                  </div>
               )}

               <div className="relative z-10 space-y-6">
                  <div className="w-24 h-24 bg-[#F3F0FF] rounded-full flex items-center justify-center text-[#845EF7] mx-auto group-hover:bg-[#845EF7] group-hover:text-white transition-colors duration-500">
                    <FileText size={48} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-[#1F2937]">Select a document</h3>
                    <p className="text-[#9CA3AF] font-bold text-sm px-4">PDF, JPG or PNG. Supported size up to 10MB.</p>
                  </div>
                  <input 
                    type="file" 
                    onChange={handleFileChange} 
                    className="absolute inset-0 opacity-0 cursor-pointer" 
                  />
               </div>
            </div>

            {/* Quick Actions */}
            <div className="w-full flex gap-4">
               <button className="flex-1 py-5 bg-[#F3F0FF] text-[#845EF7] font-black rounded-3xl flex items-center justify-center gap-3 active:scale-95 transition-all">
                  <Camera size={24} /> Take Photo
               </button>
               <button className="flex-1 py-5 bg-[#E7F5FF] text-[#339AF0] font-black rounded-3xl flex items-center justify-center gap-3 active:scale-95 transition-all">
                  <Upload size={24} /> Dropbox/Drive
               </button>
            </div>

            {/* Privacy Shield */}
            <div className="w-full bg-[#EBFAEA] p-8 rounded-[40px] flex items-center gap-6">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-[#2F9E44] shadow-sm shrink-0">
                    <ShieldCheck size={32} />
                </div>
                <div>
                   <h4 className="font-black text-[#2F9E44] mb-1">AES-256 Encrypted</h4>
                   <p className="text-[11px] font-bold text-[#2F9E44] opacity-80 leading-relaxed uppercase tracking-wider">Your documents are encrypted end-to-end and never stored in plain text.</p>
                </div>
            </div>

            {/* Upload Button */}
            {file && !isUploading && (
                <button 
                  onClick={handleUpload}
                  className="w-full py-6 bg-gradient-to-r from-[#B197FC] to-[#91A7FF] text-white font-black text-xl rounded-3xl shadow-[0_12px_24px_rgba(151,130,255,0.3)] animate-in fade-in slide-in-from-bottom-5"
                >
                  Upload {file.name}
                </button>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[60vh] space-y-8 animate-in zoom-in-95 duration-500">
              <div className="w-32 h-32 bg-[#40C057] rounded-full flex items-center justify-center text-white text-5xl shadow-xl animate-pulse">
                  <CheckCircle size={64} strokeWidth={3} />
              </div>
              <div className="text-center space-y-3">
                  <h3 className="text-4xl font-black text-[#1F2937] tracking-tight">Success!</h3>
                  <p className="text-lg font-bold text-[#9CA3AF]">Your document is being processed.</p>
              </div>
              <div className="flex items-center gap-3 px-6 py-2 bg-[#F3F0FF] rounded-full">
                  <Clock size={20} className="text-[#845EF7]" />
                  <span className="text-[#845EF7] font-black text-xs uppercase tracking-widest">Verification Status: Pending</span>
              </div>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
