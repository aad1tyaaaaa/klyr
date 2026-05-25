import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-[#F0E6FF] overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] bg-gradient-to-br from-[#E0CCFF] via-[#F5EDFF] to-[#EBD9FF] z-0" />
      
      {/* Main Content Area */}
      <div className="flex flex-col items-center justify-center flex-1 w-full max-w-md px-6 z-10">
        
        {/* Glow Element */}
        <div className="relative w-72 h-72 mb-12">
          {/* Outer glow */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#D1B3FF] via-[#F0D5FF] to-[#D6E0FF] opacity-60 blur-2xl animate-pulse" />
          
          {/* Main Circle */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#E6D4FF] via-[#F8F2FF] to-[#DEE8FF] shadow-[0_8px_32px_rgba(151,71,255,0.15)] backdrop-blur-sm border border-white/50 flex flex-col items-center justify-center p-8">
            
            {/* Shield Icon */}
            <div className="absolute top-[-25px] flex items-center justify-center mt-[-10px]">
                <div className="w-16 h-18 bg-[#B197FC] rounded-2xl flex items-center justify-center shadow-lg transform rotate-[-5deg]">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold text-[#1A1A1A] mt-8 tracking-tight">
              Klyr
            </h1>
            <p className="text-[#6B6B6B] mt-3 font-medium text-center">
              Your Digital Continuity Wallet
            </p>
          </div>

          {/* Floater icon (wrench) */}
          <div className="absolute left-[-20px] bottom-1/4 w-12 h-12 bg-[#845EF7] rounded-full flex items-center justify-center shadow-lg border-2 border-white/80">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="w-full max-w-md px-6 pb-12 z-10">
        <Link href="/login" className="block w-full">
          <button className="w-full py-4 px-6 bg-gradient-to-r from-[#B197FC] to-[#91A7FF] text-white font-bold rounded-2xl shadow-[0_8px_16px_rgba(151,71,255,0.2)] hover:shadow-[0_12px_24px_rgba(151,71,255,0.3)] transform transition-active:scale-[0.98]">
            Get Started
          </button>
        </Link>
        <p className="text-center mt-6 text-[#7E7E7E] text-sm font-medium">
          Already have an account? <Link href="/login" className="text-[#845EF7] font-bold hover:underline">Sign In</Link>
        </p>
      </div>

      {/* Decorative Blur Orbs */}
      <div className="absolute top-[20%] right-[-10%] w-64 h-64 bg-[#D1B3FF] rounded-full mix-blend-multiply filter blur-3xl opacity-30 z-0" />
      <div className="absolute bottom-[10%] left-[-10%] w-64 h-64 bg-[#91A7FF] rounded-full mix-blend-multiply filter blur-3xl opacity-30 z-0" />
    </div>
  );
}
