import { Sparkles, TrendingUp, Users, Wallet } from 'lucide-react';
import GoogleSignInButton from './GoogleSignInButton';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-teal-800 via-teal-700 to-teal-600">
      <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-mint/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-orange-400/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-2 lg:items-center lg:py-28">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold text-white ring-1 ring-white/20">
            <Sparkles size={13} /> Tanpa modal, tanpa stok barang
          </span>
          <h1 className="mt-5 text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
            Jadi Reseller Aset Digital, Cuan Sampai <span className="text-orange-300">50% Komisi</span>
          </h1>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-teal-50/90 sm:text-lg">
            Jual ulang Planner, Template Bisnis, dan Bundle Font premium. Cukup daftar dengan Google, pilih tier,
            bagikan link — komisi otomatis masuk ke dompetmu.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <GoogleSignInButton label="Daftar Gratis dengan Google" />
            <a
              href="#cara-kerja"
              className="flex items-center justify-center rounded-xl border border-white/25 bg-white/10 px-5 py-3 text-sm font-bold text-white hover:bg-white/15"
            >
              Lihat Cara Kerja
            </a>
          </div>

          <p className="mt-4 text-xs text-teal-50/70">
            Gratis mulai dari tier Bronze · Tidak perlu kartu kredit
          </p>
        </div>

        {/* Decorative dashboard preview */}
        <div className="relative">
          <div className="rounded-3xl bg-white/10 p-3 ring-1 ring-white/15 backdrop-blur-sm sm:p-4">
            <div className="rounded-2xl bg-white p-4 shadow-card-lg sm:p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-ink-light">Total Komisi Bulan Ini</p>
                  <p className="text-2xl font-extrabold text-ink">Rp 2.500.000</p>
                </div>
                <span className="flex items-center gap-1 rounded-full bg-teal-50 px-2.5 py-1 text-xs font-bold text-teal-700">
                  <TrendingUp size={13} /> +12,5%
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-surface-alt p-3">
                  <Wallet className="text-teal-600" size={18} />
                  <p className="mt-2 text-[11px] font-medium text-ink-light">Total Poin</p>
                  <p className="text-sm font-bold text-ink">750 Poin</p>
                </div>
                <div className="rounded-xl bg-surface-alt p-3">
                  <Users className="text-orange-500" size={18} />
                  <p className="mt-2 text-[11px] font-medium text-ink-light">Referral Baru</p>
                  <p className="text-sm font-bold text-ink">3 Orang</p>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                {[
                  { label: 'Weekly Business Stats Tracker', amount: 'Rp 7.000', color: 'from-teal-300 to-emerald-400' },
                  { label: 'Line Sheet Catalogue', amount: 'Rp 6.400', color: 'from-rose-200 to-pink-300' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2.5 rounded-lg bg-surface p-2">
                    <div className={`h-8 w-8 shrink-0 rounded-md bg-gradient-to-br ${item.color}`} />
                    <span className="flex-1 truncate text-xs font-medium text-ink">{item.label}</span>
                    <span className="text-xs font-bold text-teal-600">+{item.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute -bottom-5 -left-5 rounded-2xl bg-orange-400 px-4 py-3 shadow-card-lg sm:-left-8">
            <p className="text-[11px] font-semibold text-orange-50">Komisi Gold</p>
            <p className="text-lg font-extrabold text-white">50%</p>
          </div>
        </div>
      </div>
    </section>
  );
}
