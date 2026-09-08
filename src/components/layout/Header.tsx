'use client';

import { useState } from 'react';
import { Bell, Menu, ChevronDown, LogOut, UserCircle, Search } from 'lucide-react';
import { useDashboardStore } from '@/src/lib/store';
import { currentUser, tiers } from '@/src/lib/mockData';
import type { NavKey } from '@/src/types';

const titles: Record<NavKey, { title: string; subtitle: string }> = {
  dashboard: { title: 'Dashboard', subtitle: 'Ayo mulai berjualan hari ini!' },
  catalog: { title: 'Katalog Produk Printable', subtitle: 'Pilih aset untuk kamu jual kembali' },
  referral: { title: 'Sistem Referral & Tier', subtitle: 'Ajak reseller baru dan naikkan tiermu' },
  wallet: { title: 'Dompet & Poin', subtitle: 'Kelola komisi dan riwayat poinmu' },
  tutorial: { title: 'Tutorial Video', subtitle: 'Panduan cepat untuk memulai jualan' },
  help: { title: 'Bantuan & FAQ', subtitle: 'Temukan jawaban atas pertanyaanmu' },
};

export default function Header() {
  const { activeNav, toggleSidebar } = useDashboardStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const tier = tiers.find((t) => t.id === currentUser.tierId);
  const { title, subtitle } = titles[activeNav];

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-teal-900/5 bg-white/90 px-4 py-4 backdrop-blur-md sm:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <button
          className="rounded-lg p-1.5 text-ink-light hover:bg-surface-alt lg:hidden"
          onClick={toggleSidebar}
          aria-label="Buka menu"
        >
          <Menu size={22} />
        </button>
        <div className="min-w-0">
          <h1 className="truncate text-xl font-extrabold tracking-tight text-ink sm:text-2xl">{title}</h1>
          <p className="hidden text-sm text-ink-light sm:block">{subtitle}</p>
        </div>
      </div>

      <div className="hidden flex-1 max-w-xs items-center gap-2 rounded-full bg-surface-alt px-4 py-2 lg:flex">
        <Search size={16} className="text-ink-light/60" />
        <input
          placeholder="Cari produk, transaksi..."
          className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink-light/50"
        />
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <button
          className="relative rounded-full p-2.5 text-ink-light hover:bg-surface-alt"
          aria-label="Notifikasi"
        >
          <Bell size={19} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-orange-500 ring-2 ring-white" />
        </button>

        <div className="relative">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="flex items-center gap-2 rounded-full py-1 pl-1 pr-2 hover:bg-surface-alt"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-teal-600 text-sm font-semibold text-white">
              {currentUser.name.charAt(0)}
            </div>
            <span className="hidden text-sm font-medium text-ink sm:block">
              {currentUser.name.split(' ')[0]}
            </span>
            <ChevronDown size={16} className="hidden text-ink-light sm:block" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-teal-900/5 bg-white p-2 shadow-card-lg">
              <div className="border-b border-teal-900/5 px-3 py-2">
                <p className="text-sm font-semibold text-ink">{currentUser.name}</p>
                <p className="truncate text-xs text-ink-light">{currentUser.email}</p>
                <span className="mt-1.5 inline-block rounded-full bg-teal-100 px-2 py-0.5 text-[11px] font-semibold text-teal-700">
                  {tier?.name} Reseller
                </span>
              </div>
              <button className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-ink-light hover:bg-surface-alt">
                <UserCircle size={16} /> Profil Saya
              </button>
              <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-orange-600 hover:bg-orange-50">
                <LogOut size={16} /> Keluar
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
