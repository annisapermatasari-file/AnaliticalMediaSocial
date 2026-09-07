import { PencilLine } from 'lucide-react';
import { currentUser } from '@/src/lib/mockData';

export default function WelcomeBanner() {
  const firstName = currentUser.name.split(' ')[0];
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-mint to-teal-200 p-6 sm:p-8">
      <div className="relative z-10 max-w-md">
        <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">
          Welcome back, {firstName}!
        </h2>
        <p className="mt-1 text-sm font-medium text-ink-light sm:text-base">
          Ayo mulai berjualan hari ini!
        </p>
      </div>
      <PencilLine
        className="absolute -bottom-4 right-4 text-teal-700/30 sm:right-8"
        size={96}
        strokeWidth={1.5}
      />
    </div>
  );
}
