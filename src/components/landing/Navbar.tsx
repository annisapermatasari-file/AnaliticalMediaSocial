'use client';

import { useState } from 'react';
import { Menu, Sparkles, X } from 'lucide-react';
import GoogleSignInButton from './GoogleSignInButton';

const links = [
  { href: '#fitur', label: 'Fitur' },
  { href: '#cara-kerja', label: 'Cara Kerja' },
  { href: '#tier', label: 'Tier & Komisi' },
  { href: '#faq', label: 'FAQ' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-teal-900/5 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 text-white shadow-card">
            <Sparkles size={18} strokeWidth={2.5} />
          </div>
          <span className="text-lg font-extrabold tracking-tight text-ink">AsetDigital</span>
        </div>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-ink-light transition-colors hover:text-teal-700"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <GoogleSignInButton label="Masuk / Daftar" variant="onLight" />
        </div>

        <button
          className="rounded-lg p-2 text-ink-light hover:bg-surface-alt lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Buka menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-teal-900/5 bg-white px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-semibold text-ink-light hover:bg-surface-alt hover:text-ink"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-3">
            <GoogleSignInButton label="Masuk / Daftar" variant="onLight" fullWidth />
          </div>
        </div>
      )}
    </header>
  );
}
