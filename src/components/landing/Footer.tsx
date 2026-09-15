import { Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-teal-900/5 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-teal-500 to-teal-700 text-white">
            <Sparkles size={15} strokeWidth={2.5} />
          </div>
          <span className="text-sm font-extrabold text-ink">AsetDigital</span>
        </div>
        <p className="text-xs text-ink-light">
          © {new Date().getFullYear()} AsetDigital. Platform reseller aset digital printable.
        </p>
      </div>
    </footer>
  );
}
