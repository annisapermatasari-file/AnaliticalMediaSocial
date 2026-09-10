'use client';

import { ArrowRight, PencilLine } from 'lucide-react';
import { currentUser } from '@/src/lib/mockData';
import { useDashboardStore } from '@/src/lib/store';

export default function WelcomeBanner() {
  const firstName = currentUser.name.split(' ')[0];
  const setActiveNav = useDashboardStore((s) => s.setActiveNav);
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-800 via-teal-700 to-teal-600 p-6 sm:p-9">
      <div className="pointer-events-none absolute -right-10 -top-16 h-56 w-56 rounded-full bg-mint/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 right-24 h-40 w-40 rounded-full bg-orange-400/20 blur-3xl" />

      <div className="relative z-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-md">
          <span className="inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white/90 ring-1 ring-white/20">
            Semangat pagi, {firstName}! 🌱
          </span>
          <h2 className="mt-3 text-2xl font-extrabold leading-tight text-white sm:text-3xl">
            Welcome back, {firstName}!
          </h2>
          <p className="mt-1.5 text-sm font-medium text-teal-50/90 sm:text-base">
            Ayo mulai berjualan hari ini — kamu tinggal selangkah lagi menuju target bulan ini.
          </p>
        </div>
        <button
          onClick={() => setActiveNav('catalog')}
          className="group flex shrink-0 items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-teal-700 shadow-card-lg transition-transform hover:-translate-y-0.5"
        >
          Mulai Jualan
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      <PencilLine
        className="pointer-events-none absolute -bottom-6 right-4 text-white/10 sm:right-10"
        size={110}
        strokeWidth={1.2}
      />
    </div>
  );
}
