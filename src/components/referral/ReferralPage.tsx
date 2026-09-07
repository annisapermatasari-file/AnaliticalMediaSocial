'use client';

import ReferralTierWidget from '@/src/components/dashboard/ReferralTierWidget';
import { referredMembers, tiers } from '@/src/lib/mockData';
import { formatDate, formatNumber } from '@/src/lib/utils';

export default function ReferralPage() {
  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
      <div className="xl:col-span-2">
        <div className="rounded-2xl bg-white p-5 shadow-card sm:p-6">
          <h3 className="text-base font-bold text-ink sm:text-lg">Jaringan Referral Kamu</h3>
          <p className="mt-1 text-sm text-ink-light">
            Setiap reseller baru yang bergabung lewat link kamu akan menambah poin secara otomatis.
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[500px] text-left text-sm">
              <thead>
                <tr className="border-b border-teal-100 text-xs font-semibold uppercase text-ink-light">
                  <th className="py-2 pr-3">Nama</th>
                  <th className="py-2 pr-3">Tier</th>
                  <th className="py-2 pr-3">Bergabung</th>
                  <th className="py-2">Poin Dihasilkan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-teal-50">
                {referredMembers.map((member) => (
                  <tr key={member.id}>
                    <td className="flex items-center gap-2 py-2.5 pr-3 font-medium text-ink">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-teal-100 text-xs font-bold text-teal-700">
                        {member.name.charAt(0)}
                      </span>
                      {member.name}
                    </td>
                    <td className="py-2.5 pr-3">
                      <span className="rounded-full bg-surface-alt px-2 py-0.5 text-[11px] font-semibold text-ink-light">
                        {member.tierName}
                      </span>
                    </td>
                    <td className="py-2.5 pr-3 text-ink-light">{formatDate(member.joinedAt)}</td>
                    <td className="py-2.5 font-semibold text-teal-600">
                      +{formatNumber(member.pointsGenerated)} Poin
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {tiers.map((tier) => (
            <div key={tier.id} className="rounded-2xl bg-white p-5 shadow-card">
              <span className="rounded-full bg-teal-100 px-2 py-0.5 text-[11px] font-semibold text-teal-700">
                {tier.name}
              </span>
              <p className="mt-2 text-lg font-bold text-ink">
                {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(tier.price)}
              </p>
              <ul className="mt-3 space-y-1.5 text-sm text-ink-light">
                <li>Komisi {Math.round(tier.commissionRate * 100)}%</li>
                <li>Poin Rekrutmen {tier.recruitmentPoints}</li>
                {tier.upgradePointsRequired > 0 && <li>Syarat {formatNumber(tier.upgradePointsRequired)} Poin</li>}
              </ul>
              <ul className="mt-3 space-y-1 border-t border-teal-50 pt-3 text-xs text-ink-light">
                {tier.perks.map((perk) => (
                  <li key={perk}>• {perk}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div>
        <ReferralTierWidget />
      </div>
    </div>
  );
}
