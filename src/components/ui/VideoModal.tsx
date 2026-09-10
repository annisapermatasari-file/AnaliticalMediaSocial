'use client';

import { X } from 'lucide-react';
import { useDashboardStore } from '@/src/lib/store';

export default function VideoModal() {
  const { videoModalUrl, videoModalTitle, closeVideo } = useDashboardStore();

  if (!videoModalUrl) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-night-900/70 p-4 backdrop-blur-sm"
      onClick={closeVideo}
    >
      <div
        className="w-full max-w-2xl overflow-hidden rounded-2xl bg-ink shadow-card-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <p className="truncate text-sm font-semibold text-white">{videoModalTitle}</p>
          <button onClick={closeVideo} className="text-white/60 hover:text-white" aria-label="Tutup">
            <X size={18} />
          </button>
        </div>
        <video
          key={videoModalUrl}
          src={videoModalUrl}
          controls
          autoPlay
          className="aspect-video w-full bg-black"
        />
      </div>
    </div>
  );
}
