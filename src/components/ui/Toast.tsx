'use client';

import { CheckCircle2, X } from 'lucide-react';
import { useDashboardStore } from '@/src/lib/store';

export default function Toast() {
  const { toast, clearToast } = useDashboardStore();

  if (!toast) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 rounded-xl bg-ink px-4 py-3 text-sm font-medium text-white shadow-card-lg">
      <CheckCircle2 size={16} className="shrink-0 text-teal-400" />
      <span>{toast}</span>
      <button onClick={clearToast} className="ml-1 text-white/60 hover:text-white" aria-label="Tutup">
        <X size={14} />
      </button>
    </div>
  );
}
