'use client';

import { signIn } from 'next-auth/react';

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 3l5.7-5.7C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="m6.3 14.7 6.6 4.8C14.6 15.9 18.9 13 24 13c3.1 0 5.8 1.1 8 3l5.7-5.7C34.6 6.1 29.6 4 24 4c-7.7 0-14.4 4.3-17.7 10.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.5 0 10.4-1.9 14.3-5.1l-6.6-5.6C29.6 35.1 26.9 36 24 36c-5.3 0-9.7-3.1-11.3-7.9l-6.6 5.1C9.5 39.7 16.2 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.4-2.4 4.4-4.6 5.8l6.6 5.6C40.9 36.6 44 30.9 44 24c0-1.3-.1-2.7-.4-3.5z"
      />
    </svg>
  );
}

const variants = {
  onDark: 'bg-white text-teal-800 shadow-card-lg hover:-translate-y-0.5',
  onLight: 'bg-teal-600 text-white shadow-card hover:bg-teal-700',
  ghost: 'border border-white/25 bg-white/10 text-white hover:bg-white/15',
};

export default function GoogleSignInButton({
  label = 'Daftar dengan Google',
  variant = 'onDark',
  fullWidth = false,
}: {
  label?: string;
  variant?: keyof typeof variants;
  fullWidth?: boolean;
}) {
  return (
    <button
      onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
      className={`flex items-center justify-center gap-2.5 rounded-xl px-5 py-3 text-sm font-bold transition-all active:scale-[0.98] ${
        fullWidth ? 'w-full' : ''
      } ${variants[variant]}`}
    >
      <GoogleIcon />
      {label}
    </button>
  );
}
