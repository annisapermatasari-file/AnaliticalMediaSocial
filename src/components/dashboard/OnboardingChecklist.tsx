'use client';

import { useMemo, useState } from 'react';
import { Check, PlayCircle, Sparkle } from 'lucide-react';
import { onboardingProgress as initialProgress } from '@/src/lib/mockData';
import { useDashboardStore } from '@/src/lib/store';

const guideVideoUrl = '/assets/products/tracker-social-media/video-tutorial.mp4';

const steps = [
  { key: 'profileCompleted', label: 'Lengkapi Profil' },
  { key: 'videoWatched', label: 'Tonton Video Panduan' },
  { key: 'materialDownloaded', label: 'Unduh Bahan Promosi' },
  { key: 'mayarLinkCreated', label: 'Bikin Link Mayar' },
  { key: 'firstShareDone', label: 'Sebar Link' },
] as const;

export default function OnboardingChecklist() {
  const [progress, setProgress] = useState(initialProgress);
  const openVideo = useDashboardStore((s) => s.openVideo);
  const doneCount = useMemo(
    () => steps.filter((s) => progress[s.key]).length,
    [progress]
  );

  const toggleStep = (key: (typeof steps)[number]['key']) => {
    setProgress((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handlePlayGuide = () => {
    openVideo(guideVideoUrl, 'Video Panduan Jualan Dasar');
    setProgress((prev) => ({ ...prev, videoWatched: true }));
  };

  return (
    <div className="rounded-2xl bg-white p-5 shadow-card sm:p-6">
      <div className="mb-5 flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
              <Sparkle size={15} />
            </span>
            <h3 className="text-base font-bold text-ink sm:text-lg">Onboarding Checklist</h3>
          </div>
          <p className="mt-1 text-sm text-ink-light">Langkah Pertama Menuju Penjualan Perdana</p>
        </div>
        <div className="flex shrink-0 flex-col items-end">
          <span className="text-lg font-extrabold text-teal-600">{doneCount}/{steps.length}</span>
          <span className="text-[11px] font-medium text-ink-light">Selesai</span>
        </div>
      </div>

      <div className="mb-5 h-1.5 w-full overflow-hidden rounded-full bg-surface-alt">
        <div
          className="h-full rounded-full bg-gradient-to-r from-teal-400 via-teal-500 to-orange-400 transition-all duration-500"
          style={{ width: `${(doneCount / steps.length) * 100}%` }}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <ul className="space-y-1">
          {steps.map((step, idx) => {
            const done = progress[step.key];
            const isLast = idx === steps.length - 1;
            return (
              <li key={step.key} className="relative">
                {!isLast && (
                  <span
                    className={`absolute left-[13px] top-7 h-full w-0.5 ${done ? 'bg-teal-300' : 'bg-surface-alt'}`}
                  />
                )}
                <button
                  onClick={() => toggleStep(step.key)}
                  className="relative flex w-full items-center gap-3 rounded-lg px-1 py-1.5 text-left hover:bg-surface-alt/60"
                >
                  <span
                    className={`flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                      done
                        ? 'border-teal-500 bg-teal-500 text-white'
                        : 'border-surface-alt bg-white text-transparent'
                    }`}
                  >
                    <Check size={14} strokeWidth={3} />
                  </span>
                  <span className={`text-sm ${done ? 'text-ink-light line-through' : 'font-semibold text-ink'}`}>
                    {step.label}
                  </span>
                  {done && (
                    <span className="ml-auto shrink-0 text-[11px] font-bold text-teal-600">Done</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-teal-700 via-teal-800 to-night-800">
          <div className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-teal-400/20 blur-2xl" />
          <button
            onClick={handlePlayGuide}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-teal-700 shadow-card-lg transition-transform hover:scale-105"
            aria-label="Putar video panduan"
          >
            <PlayCircle size={30} />
          </button>
          <span className="absolute bottom-3 left-3 right-3 rounded-lg bg-black/40 px-2.5 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
            Video Panduan Jualan Dasar · 5 Menit
          </span>
        </div>
      </div>
    </div>
  );
}
