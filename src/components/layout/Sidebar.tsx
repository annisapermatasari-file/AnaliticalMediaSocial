'use client';

import {
  LayoutDashboard,
  Package,
  Users,
  Wallet,
  PlayCircle,
  HelpCircle,
  Sparkles,
  X,
  ChevronRight,
} from 'lucide-react';
import { useDashboardStore } from '@/src/lib/store';
import { currentUser, tiers } from '@/src/lib/mockData';
import type { NavKey } from '@/src/types';

const navItems: { key: NavKey; label: string; icon: typeof LayoutDashboard }[] = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'catalog', label: 'Katalog Produk', icon: Package },
  { key: 'referral', label: 'Sistem Referral', icon: Users },
  { key: 'wallet', label: 'Dompet & Poin', icon: Wallet },
  { key: 'tutorial', label: 'Tutorial Video', icon: PlayCircle },
  { key: 'help', label: 'Bantuan', icon: HelpCircle },
];

export default function Sidebar() {
  const { activeNav, setActiveNav, sidebarOpen, closeSidebar } = useDashboardStore();
  const tier = tiers.find((t) => t.id === currentUser.tierId);

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-night-900/60 backdrop-blur-sm lg:hidden"
          onClick={closeSidebar}
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col bg-gradient-to-b from-night-900 via-night-800 to-night-900 transition-transform duration-200 ease-in-out lg:static lg:z-auto lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-teal-300 to-teal-600 text-night-900 shadow-glow">
              <Sparkles size={18} strokeWidth={2.5} />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">AsetDigital</span>
          </div>
          <button
            className="rounded-lg p-1 text-teal-100/60 hover:bg-white/5 lg:hidden"
            onClick={closeSidebar}
            aria-label="Tutup menu"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-4">
          <p className="px-4 pb-2 pt-2 text-[11px] font-semibold uppercase tracking-wider text-teal-100/30">
            Menu Utama
          </p>
          {navItems.map(({ key, label, icon: Icon }) => {
            const active = activeNav === key;
            return (
              <button
                key={key}
                onClick={() => setActiveNav(key)}
                className={`group relative flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                  active
                    ? 'bg-gradient-to-r from-teal-500/90 to-teal-600/90 text-white shadow-glow'
                    : 'text-teal-100/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                {active && (
                  <span className="absolute -left-4 h-6 w-1 rounded-r-full bg-orange-400" />
                )}
                <Icon size={18} strokeWidth={active ? 2.25 : 2} />
                {label}
                {active && <ChevronRight size={15} className="ml-auto opacity-70" />}
              </button>
            );
          })}
        </nav>

        <div className="m-4 overflow-hidden rounded-2xl bg-white/[0.06] p-4 ring-1 ring-white/10">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange-300 to-orange-500 text-base font-bold text-white shadow-card">
              {currentUser.name.charAt(0)}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">{currentUser.name}</p>
              <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-teal-400/15 px-2 py-0.5 text-[11px] font-semibold text-teal-300">
                <Sparkles size={10} /> {tier?.name} Reseller
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
