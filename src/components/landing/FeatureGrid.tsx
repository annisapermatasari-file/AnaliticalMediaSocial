import { Download, Gift, Percent, Repeat } from 'lucide-react';

const features = [
  {
    icon: Percent,
    title: 'Komisi Hingga 50%',
    description: 'Semakin tinggi tier kamu, semakin besar komisi tiap penjualan — dari 20% di Bronze sampai 50% di Gold.',
    accent: 'from-teal-400 to-teal-600',
  },
  {
    icon: Repeat,
    title: 'Upgrade Tier Tanpa Bayar',
    description: 'Naik tier otomatis lewat akumulasi poin dari rekrutmen & penjualan — tidak perlu bayar tunai lagi.',
    accent: 'from-orange-300 to-orange-500',
  },
  {
    icon: Download,
    title: 'Aset Siap Jual',
    description: 'File siap cetak untuk semua tier, plus akses file mentahan Canva/PSD khusus tier Gold.',
    accent: 'from-teal-400 to-teal-600',
  },
  {
    icon: Gift,
    title: 'Sistem Referral Otomatis',
    description: 'Ajak reseller baru pakai link unikmu, poin rekrutmen masuk otomatis ke akunmu.',
    accent: 'from-orange-300 to-orange-500',
  },
];

export default function FeatureGrid() {
  return (
    <section id="fitur" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-xl text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-teal-600">Kenapa AsetDigital</span>
        <h2 className="mt-2 text-2xl font-extrabold text-ink sm:text-3xl">
          Semua yang kamu butuhkan untuk mulai jualan
        </h2>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {features.map(({ icon: Icon, title, description, accent }) => (
          <div
            key={title}
            className="rounded-2xl bg-white p-5 shadow-card transition-all hover:-translate-y-1 hover:shadow-card-lg"
          >
            <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${accent} text-white shadow-card`}>
              <Icon size={20} />
            </div>
            <h3 className="mt-4 text-sm font-bold text-ink">{title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-light">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
