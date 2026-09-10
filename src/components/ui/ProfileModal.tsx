'use client';

import { X, Mail, Crown, Calendar, Link as LinkIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { currentUser, tiers } from '@/src/lib/mockData';
import { formatDate } from '@/src/lib/utils';
import { useDashboardStore } from '@/src/lib/store';

export default function ProfileModal() {
  const { data: session } = useSession();
  const profileOpen = useDashboardStore((s) => s.profileOpen);
  const onClose = useDashboardStore((s) => s.closeProfile);
  const tier = tiers.find((t) => t.id === currentUser.tierId);

  if (!profileOpen) return null;

  const displayName = session?.user?.name ?? currentUser.name;
  const displayEmail = session?.user?.email ?? currentUser.email;
  const avatarImage = session?.user?.image ?? undefined;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-night-900/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-card-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gradient-to-br from-teal-700 to-teal-800 px-5 pb-14 pt-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-white">Profil Saya</p>
            <button onClick={onClose} className="text-white/70 hover:text-white" aria-label="Tutup">
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="px-5 pb-5">
          <div className="-mt-10 mb-3 flex justify-center">
            {avatarImage ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={avatarImage}
                alt={displayName}
                className="h-20 w-20 rounded-full border-4 border-white object-cover shadow-card"
              />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-orange-300 to-orange-500 text-2xl font-bold text-white shadow-card">
                {displayName.charAt(0)}
              </div>
            )}
          </div>

          <h3 className="text-center text-base font-bold text-ink">{displayName}</h3>
          <p className="text-center text-xs text-ink-light">{displayEmail}</p>

          <div className="mt-4 space-y-2.5 border-t border-teal-900/5 pt-4">
            <div className="flex items-center gap-2.5 text-sm">
              <Crown size={15} className="text-orange-500" />
              <span className="text-ink-light">Tier saat ini</span>
              <span className="ml-auto font-semibold text-ink">{tier?.name}</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm">
              <LinkIcon size={15} className="text-teal-600" />
              <span className="text-ink-light">Kode referral</span>
              <span className="ml-auto font-semibold text-ink">{currentUser.referralCode}</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm">
              <Mail size={15} className="text-ink-light" />
              <span className="text-ink-light">Email</span>
              <span className="ml-auto truncate font-semibold text-ink">{displayEmail}</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm">
              <Calendar size={15} className="text-ink-light" />
              <span className="text-ink-light">Bergabung</span>
              <span className="ml-auto font-semibold text-ink">{formatDate(currentUser.createdAt)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
