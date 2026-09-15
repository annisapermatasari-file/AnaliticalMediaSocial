import { Check, Crown } from 'lucide-react';
import { tiers } from '@/src/lib/mockData';
import { formatCurrency, formatNumber } from '@/src/lib/utils';
import GoogleSignInButton from './GoogleSignInButton';

export default function TierPricing() {
  return (
    <section id="tier" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-xl text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-teal-600">Tier & Komisi</span>
        <h2 className="mt-2 text-2xl font-extrabold text-ink sm:text-3xl">Pilih tier sesuai targetmu</h2>
        <p className="mt-2 text-sm text-ink-light">
          Semua tier bisa upgrade otomatis lewat poin — tanpa bayar tunai lagi.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {tiers.map((tier) => {
          const isGold = tier.name === 'Gold';
          return (
            <div
              key={tier.id}
              className={`relative flex flex-col rounded-3xl p-6 ${
                isGold
                  ? 'bg-gradient-to-br from-teal-700 to-teal-800 text-white shadow-card-lg ring-2 ring-orange-400'
                  : 'bg-white text-ink shadow-card'
              }`}
            >
              {isGold && (
                <span className="absolute -top-3 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-orange-500 px-3 py-1 text-[11px] font-bold text-white shadow-card">
                  <Crown size={12} /> Paling Populer
                </span>
              )}
              <span
                className={`w-fit rounded-full px-3 py-1 text-xs font-bold ${
                  isGold ? 'bg-white/15 text-white' : 'bg-teal-100 text-teal-700'
                }`}
              >
                {tier.name}
              </span>
              <p className="mt-4 text-3xl font-extrabold">{formatCurrency(tier.price)}</p>
              <p className={`text-xs ${isGold ? 'text-teal-100/80' : 'text-ink-light'}`}>sekali daftar tier</p>

              <ul className="mt-5 space-y-2.5 text-sm">
                <li className="flex items-center gap-2">
                  <Check size={15} className={isGold ? 'text-orange-300' : 'text-teal-600'} />
                  Komisi penjualan {Math.round(tier.commissionRate * 100)}%
                </li>
                <li className="flex items-center gap-2">
                  <Check size={15} className={isGold ? 'text-orange-300' : 'text-teal-600'} />
                  {tier.recruitmentPoints} poin per rekrutmen
                </li>
                {tier.upgradePointsRequired > 0 && (
                  <li className="flex items-center gap-2">
                    <Check size={15} className={isGold ? 'text-orange-300' : 'text-teal-600'} />
                    Syarat upgrade {formatNumber(tier.upgradePointsRequired)} poin
                  </li>
                )}
                {tier.perks.map((perk) => (
                  <li key={perk} className="flex items-center gap-2">
                    <Check size={15} className={isGold ? 'text-orange-300' : 'text-teal-600'} />
                    {perk}
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <GoogleSignInButton
                  label="Mulai Sekarang"
                  variant={isGold ? 'onDark' : 'onLight'}
                  fullWidth
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
