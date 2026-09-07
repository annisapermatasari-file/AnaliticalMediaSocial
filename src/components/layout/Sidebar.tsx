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
          className="fixed inset-0 z-30 bg-ink/40 lg:hidden"
          onClick={closeSidebar}
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col bg-white transition-transform duration-200 ease-in-out lg:static lg:z-auto lg:translate-x-0 lg:border-r lg:border-teal-100 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-6">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-500 text-white">
              <Sparkles size={20} />
            </div>
            <span className="text-lg font-bold text-ink">AsetDigital</span>
          </div>
          <button
            className="rounded-lg p-1 text-ink-light hover:bg-surface-alt lg:hidden"
            onClick={closeSidebar}
            aria-label="Tutup menu"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-4">
          {navItems.map(({ key, label, icon: Icon }) => {
            const active = activeNav === key;
            return (
              <button
                key={key}
                onClick={() => setActiveNav(key)}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? 'bg-teal-500 text-white shadow-card'
                    : 'text-ink-light hover:bg-surface-alt hover:text-ink'
                }`}
              >
                <Icon size={18} />
                {label}
              </button>
            );
          })}
        </nav>

        <div className="m-4 rounded-2xl bg-gradient-to-br from-teal-100 to-mint p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-lg font-bold text-teal-700">
              {currentUser.name.charAt(0)}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-ink">{currentUser.name}</p>
              <span className="mt-0.5 inline-block rounded-full bg-white px-2 py-0.5 text-[11px] font-semibold text-teal-700">
                {tier?.name} Reseller
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
