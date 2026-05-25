'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', path: '/dashboard', icon: (active: boolean) => (
      <svg className={`w-7 h-7 ${active ? 'text-[#845EF7]' : 'text-[#9CA3AF]'}`} fill={active ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    )},
    { name: 'Vault', path: '/vault', icon: (active: boolean) => (
      <svg className={`w-7 h-7 ${active ? 'text-[#845EF7]' : 'text-[#9CA3AF]'}`} fill={active ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    )},
    { name: 'Timeline', path: '/timeline', icon: (active: boolean) => (
      <svg className={`w-7 h-7 ${active ? 'text-[#845EF7]' : 'text-[#9CA3AF]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
      </svg>
    )},
    { name: 'Profile', path: '/profile', icon: (active: boolean) => (
      <svg className={`w-7 h-7 ${active ? 'text-[#845EF7]' : 'text-[#9CA3AF]'}`} fill={active ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    )},
    { name: 'index', path: '/index', icon: (active: boolean) => (
      <svg className={`w-7 h-7 ${active ? 'text-[#845EF7]' : 'text-[#9CA3AF]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
      </svg>
    )},
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 h-24 bg-white/90 backdrop-blur-xl border-t border-[#F3F4F6] flex items-center justify-around px-2 z-50">
      {navItems.map((item) => {
        const isActive = pathname === item.path;
        return (
          <Link key={item.path} href={item.path} className="flex flex-col items-center gap-1.5 transition-all">
            {item.icon(isActive)}
            <span className={`text-[11px] font-bold tracking-tight ${isActive ? 'text-[#845EF7]' : 'text-[#9CA3AF]'}`}>
              {item.name}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
