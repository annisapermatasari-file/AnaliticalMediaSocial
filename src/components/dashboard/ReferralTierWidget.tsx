'use client';

import { useState } from 'react';
import { Check, Copy, Crown } from 'lucide-react';
import { currentUser, pointLogs, tiers } from '@/src/lib/mockData';
import { formatDate, formatNumber } from '@/src/lib/utils';
import type { TierName } from '@/src/types';

const referralLink = `platform.com/ref/${currentUser.referralCode}`;

export default function ReferralTierWidget() {
  const [copied, setCopied] = useState(false);
  const [selectedTier, setSelectedTier] = useState<TierName>('Gold');

  const currentTier = tiers.find((t) => t.id === currentUser.tierId)!;
  const targetTier = tiers.find((t) => t.name === selectedTier) ?? tiers[tiers.length - 1];
  const progressPct = Math.min(
    100,
    Math.round((currentUser.accumulatedPoints / targetTier.upgradePointsRequired) * 100)
  );

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="rounded-2xl bg-white p-5 shadow-card sm:p-6">
      <div className="flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-100 text-teal-700">
          <Crown size={15} />
        </span>
        <h3 className="text-base font-bold text-ink sm:text-lg">Sistem Referral & Tier</h3>
      </div>

      {/* Tier tracker */}
      <div className="mt-5 flex items-center">
        {tiers.map((t, idx) => {
          const reached = t.id <= currentTier.id;
          const isLast = idx === tiers.length - 1;
          return (
            <div key={t.id} className={`flex items-center ${isLast ? '' : 'flex-1'}`}>
              <button
                onClick={() => setSelectedTier(t.name)}
                className="flex flex-col items-center gap-1.5"
              >
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold ring-4 transition-colors ${
                    reached
                      ? 'bg-gradient-to-br from-teal-400 to-teal-600 text-white ring-teal-100'
                      : selectedTier === t.name
                        ? 'bg-white text-teal-600 ring-teal-100 border-2 border-teal-400'
                        : 'bg-surface-alt text-ink-light ring-transparent'
                  }`}
                >
                  {reached ? <Check size={16} strokeWidth={3} /> : idx + 1}
                </span>
                <span className={`text-[11px] font-semibold ${selectedTier === t.name ? 'text-teal-700' : 'text-ink-light'}`}>
                  {t.name}
                </span>
              </button>
              {!isLast && (
                <div className="mx-1.5 mb-4 h-0.5 flex-1 rounded-full bg-surface-alt">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r from-teal-400 to-teal-500 transition-all ${
                      t.id < currentTier.id ? 'w-full' : 'w-0'
                    }`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-ink-light">
        Link Referral Kamu
      </p>
      <div className="mt-1.5 flex items-center gap-2 rounded-xl border border-teal-900/8 bg-surface p-2">
        <input
          readOnly
          value={referralLink}
          className="min-w-0 flex-1 truncate bg-transparent px-2 text-sm text-ink outline-none"
        />
        <button
          onClick={handleCopy}
          className="flex shrink-0 items-center gap-1.5 rounded-lg bg-teal-600 px-3 py-1.5 text-xs font-semibold text-white transition-all hover:bg-teal-700 active:scale-95"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? 'Tersalin' : 'Copy'}
        </button>
      </div>

      <div className="mt-5 flex items-center gap-4 rounded-xl bg-gradient-to-br from-surface-alt to-teal-50 p-4">
        <div className="relative h-16 w-16 shrink-0">
          <svg viewBox="0 0 36 36" className="h-16 w-16 -rotate-90">
            <circle cx="18" cy="18" r="15.5" fill="none" stroke="#ffffff" strokeWidth="4" />
            <circle
              cx="18"
              cy="18"
              r="15.5"
              fill="none"
              stroke="#f9700f"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={`${(progressPct / 100) * 97.4} 97.4`}
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-sm font-extrabold text-ink">
            {progressPct}%
          </span>
        </div>
        <div>
          <p className="text-xs font-medium text-ink-light">Menuju Tier</p>
          <p className="text-base font-extrabold text-ink">{selectedTier}</p>
          <p className="text-xs font-semibold text-teal-700">
            {formatNumber(currentUser.accumulatedPoints)}/{formatNumber(targetTier.upgradePointsRequired)} Poin
          </p>
        </div>
      </div>

      <div className="mt-5">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-light">
          Poin Riwayat
        </p>
        <ul className="space-y-2.5">
          {pointLogs.slice(0, 3).map((log) => (
            <li key={log.id} className="flex items-center justify-between text-sm">
              <span className="truncate pr-2 text-ink-light">{log.description}</span>
              <span className="shrink-0 rounded-full bg-teal-50 px-2 py-0.5 text-xs font-bold text-teal-600">
                +{formatNumber(log.points)}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-2.5 text-[11px] text-ink-light/70">
          Terakhir diperbarui {formatDate(pointLogs[0].createdAt)}
        </p>
      </div>
    </div>
  );
}
