'use client';

import { useMemo, useState } from 'react';
import { CheckCircle2, Circle, PencilLine, PlayCircle } from 'lucide-react';
import { onboardingProgress as initialProgress } from '@/src/lib/mockData';

const steps = [
  { key: 'profileCompleted', label: 'Lengkapi Profil' },
  { key: 'videoWatched', label: 'Tonton Video Panduan' },
  { key: 'materialDownloaded', label: 'Unduh Bahan Promosi' },
  { key: 'mayarLinkCreated', label: 'Bikin Link Mayar' },
  { key: 'firstShareDone', label: 'Sebar Link' },
] as const;

export default function OnboardingChecklist() {
  const [progress, setProgress] = useState(initialProgress);
  const doneCount = useMemo(
    () => steps.filter((s) => progress[s.key]).length,
    [progress]
  );

  const toggleStep = (key: (typeof steps)[number]['key']) => {
    setProgress((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="rounded-2xl bg-white p-5 shadow-card sm:p-6">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-ink sm:text-lg">Onboarding Checklist</h3>
          <p className="text-sm text-ink-light">Langkah Pertama Menuju Penjualan Perdana</p>
        </div>
        <PencilLine className="shrink-0 text-orange-400" size={28} strokeWidth={1.5} />
      </div>

      <div className="mb-4">
        <div className="h-2 w-full overflow-hidden rounded-full bg-surface-alt">
          <div
            className="h-full rounded-full bg-gradient-to-r from-teal-400 to-teal-600 transition-all"
            style={{ width: `${(doneCount / steps.length) * 100}%` }}
          />
        </div>
        <p className="mt-1.5 text-xs font-medium text-ink-light">{doneCount}/{steps.length} Selesai</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <ul className="space-y-3">
          {steps.map((step) => {
            const done = progress[step.key];
            return (
              <li key={step.key}>
                <button
                  onClick={() => toggleStep(step.key)}
                  className="flex w-full items-center gap-2.5 text-left"
                >
                  {done ? (
                    <CheckCircle2 className="shrink-0 text-teal-600" size={20} />
                  ) : (
                    <Circle className="shrink-0 text-ink-light/50" size={20} />
                  )}
                  <span className={`text-sm ${done ? 'text-ink-light line-through' : 'font-medium text-ink'}`}>
                    {step.label}
                  </span>
                  {done && (
                    <span className="ml-auto text-xs font-semibold text-teal-600">(Done)</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-teal-600 to-teal-800">
          <button
            className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-teal-700 transition-transform hover:scale-105"
            aria-label="Putar video panduan"
          >
            <PlayCircle size={32} />
          </button>
          <span className="absolute bottom-2 left-2 right-2 rounded-lg bg-black/40 px-2 py-1 text-xs font-medium text-white">
            Video Panduan Jualan Dasar · 5 Menit
          </span>
        </div>
      </div>
    </div>
  );
}
