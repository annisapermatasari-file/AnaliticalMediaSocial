'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
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
      <h3 className="text-base font-bold text-ink sm:text-lg">Sistem Referral & Tier</h3>

      <div className="mt-3 flex gap-1 rounded-xl bg-surface-alt p-1">
        {(['Kamu', 'Silver', 'Gold'] as const).map((label) => {
          const isKamu = label === 'Kamu';
          const active = isKamu ? currentTier.name === selectedTier : label === selectedTier;
          const value: TierName = isKamu ? currentTier.name : (label as TierName);
          return (
            <button
              key={label}
              onClick={() => setSelectedTier(value)}
              className={`flex-1 rounded-lg py-1.5 text-xs font-semibold transition-colors sm:text-sm ${
                active ? 'bg-white text-teal-700 shadow-card' : 'text-ink-light hover:text-ink'
              }`}
            >
              {isKamu ? `Kamu (${currentTier.name})` : label}
            </button>
          );
        })}
      </div>

      <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-ink-light">
        Link Referral Kamu
      </p>
      <div className="mt-1.5 flex items-center gap-2 rounded-xl border border-teal-100 bg-surface p-2">
        <input
          readOnly
          value={referralLink}
          className="min-w-0 flex-1 truncate bg-transparent px-2 text-sm text-ink outline-none"
        />
        <button
          onClick={handleCopy}
          className="flex shrink-0 items-center gap-1.5 rounded-lg bg-teal-500 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-teal-600"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? 'Tersalin' : 'Copy'}
        </button>
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-ink-light">Progress Tier {selectedTier}</span>
        </div>
        <div className="mt-2 flex items-center gap-3">
          <div className="relative h-16 w-16 shrink-0">
            <svg viewBox="0 0 36 36" className="h-16 w-16 -rotate-90">
              <circle cx="18" cy="18" r="15.5" fill="none" stroke="#eaf6f1" strokeWidth="4" />
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
            <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-ink">
              {progressPct}%
            </span>
          </div>
          <div>
            <p className="text-xs text-ink-light">Next Level</p>
            <p className="text-base font-bold text-ink">{selectedTier}</p>
            <p className="text-xs font-medium text-ink-light">
              ({formatNumber(currentUser.accumulatedPoints)}/{formatNumber(targetTier.upgradePointsRequired)} Poin)
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-light">
          Poin Riwayat
        </p>
        <ul className="space-y-2">
          {pointLogs.slice(0, 3).map((log) => (
            <li key={log.id} className="flex items-center justify-between text-sm">
              <span className="truncate pr-2 text-ink-light">{log.description}</span>
              <span className="shrink-0 font-semibold text-teal-600">+{formatNumber(log.points)} Poin</span>
            </li>
          ))}
        </ul>
        <p className="mt-2 text-[11px] text-ink-light/70">
          Terakhir diperbarui {formatDate(pointLogs[0].createdAt)}
        </p>
      </div>
    </div>
  );
}
