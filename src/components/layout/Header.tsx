'use client';

import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { Bell, Menu, ChevronDown, LogOut, UserCircle, Search, Check } from 'lucide-react';
import { useDashboardStore } from '@/src/lib/store';
import { currentUser, tiers } from '@/src/lib/mockData';
import { formatDateTime } from '@/src/lib/utils';
import type { NavKey } from '@/src/types';

const titles: Record<NavKey, { title: string; subtitle: string }> = {
  dashboard: { title: 'Dashboard', subtitle: 'Ayo mulai berjualan hari ini!' },
  catalog: { title: 'Katalog Produk Printable', subtitle: 'Pilih aset untuk kamu jual kembali' },
  referral: { title: 'Sistem Referral & Tier', subtitle: 'Ajak reseller baru dan naikkan tiermu' },
  wallet: { title: 'Dompet & Poin', subtitle: 'Kelola komisi dan riwayat poinmu' },
  tutorial: { title: 'Tutorial Video', subtitle: 'Panduan cepat untuk memulai jualan' },
  help: { title: 'Bantuan & FAQ', subtitle: 'Temukan jawaban atas pertanyaanmu' },
};

const initialNotifications = [
  { id: 1, text: 'Selamat! Kamu mendapat +50 poin dari onboarding checklist.', time: '2026-09-04T08:05:00Z', read: false },
  { id: 2, text: 'Reseller baru bergabung lewat link kamu: Salsa Amelia.', time: '2026-09-01T09:05:00Z', read: false },
  { id: 3, text: 'Komisi Rp7.000 dari penjualan Weekly Business Stats Tracker sudah masuk.', time: '2026-09-01T09:20:00Z', read: false },
  { id: 4, text: 'Pengajuan pencairan Rp500.000 sedang diproses.', time: '2026-09-05T10:00:00Z', read: true },
];

export default function Header() {
  const { activeNav, toggleSidebar, setActiveNav, searchQuery, setSearchQuery, showToast, openProfile } =
    useDashboardStore();
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  const tier = tiers.find((t) => t.id === currentUser.tierId);
  const { title, subtitle } = titles[activeNav];

  const displayName = session?.user?.name ?? currentUser.name;
  const displayEmail = session?.user?.email ?? currentUser.email;
  const avatarImage = session?.user?.image ?? undefined;
  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setActiveNav('catalog');
    showToast(`Menampilkan hasil pencarian untuk "${searchQuery}"`);
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

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

      <form
        onSubmit={handleSearchSubmit}
        className="hidden flex-1 max-w-xs items-center gap-2 rounded-full bg-surface-alt px-4 py-2 lg:flex"
      >
        <Search size={16} className="text-ink-light/60" />
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari produk..."
          className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink-light/50"
        />
      </form>

      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <div className="relative">
          <button
            onClick={() => {
              setNotifOpen((v) => !v);
              setMenuOpen(false);
            }}
            className="relative rounded-full p-2.5 text-ink-light hover:bg-surface-alt"
            aria-label="Notifikasi"
          >
            <Bell size={19} />
            {unreadCount > 0 && (
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-orange-500 ring-2 ring-white" />
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 mt-2 w-80 overflow-hidden rounded-2xl border border-teal-900/5 bg-white shadow-card-lg">
              <div className="flex items-center justify-between border-b border-teal-900/5 px-4 py-3">
                <p className="text-sm font-bold text-ink">Notifikasi</p>
                <button onClick={markAllRead} className="flex items-center gap-1 text-xs font-semibold text-teal-600 hover:text-teal-700">
                  <Check size={12} /> Tandai dibaca
                </button>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`border-b border-teal-900/5 px-4 py-3 text-sm last:border-0 ${n.read ? 'bg-white' : 'bg-teal-50/50'}`}
                  >
                    <p className="text-ink">{n.text}</p>
                    <p className="mt-1 text-[11px] text-ink-light">{formatDateTime(n.time)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => {
              setMenuOpen((v) => !v);
              setNotifOpen(false);
            }}
            className="flex items-center gap-2 rounded-full py-1 pl-1 pr-2 hover:bg-surface-alt"
          >
            {avatarImage ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={avatarImage} alt={displayName} className="h-8 w-8 rounded-full object-cover" />
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-teal-600 text-sm font-semibold text-white">
                {displayName.charAt(0)}
              </div>
            )}
            <span className="hidden text-sm font-medium text-ink sm:block">
              {displayName.split(' ')[0]}
            </span>
            <ChevronDown size={16} className="hidden text-ink-light sm:block" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-teal-900/5 bg-white p-2 shadow-card-lg">
              <div className="border-b border-teal-900/5 px-3 py-2">
                <p className="text-sm font-semibold text-ink">{displayName}</p>
                <p className="truncate text-xs text-ink-light">{displayEmail}</p>
                <span className="mt-1.5 inline-block rounded-full bg-teal-100 px-2 py-0.5 text-[11px] font-semibold text-teal-700">
                  {tier?.name} Reseller
                </span>
              </div>
              <button
                onClick={() => {
                  openProfile();
                  setMenuOpen(false);
                }}
                className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-ink-light hover:bg-surface-alt"
              >
                <UserCircle size={16} /> Profil Saya
              </button>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-orange-600 hover:bg-orange-50"
              >
                <LogOut size={16} /> Keluar
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
