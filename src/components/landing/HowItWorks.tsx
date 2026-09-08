import { Link2, LogIn, Share2, Wallet2 } from 'lucide-react';

const steps = [
  { icon: LogIn, title: 'Daftar dengan Google', description: 'Satu klik pakai akun Google, langsung dapat akses dashboard reseller.' },
  { icon: Link2, title: 'Pilih Tier & Produk', description: 'Mulai dari Bronze gratis, pilih produk printable yang mau kamu jual.' },
  { icon: Share2, title: 'Bagikan Link Afiliasi', description: 'Generate link afiliasi tiap produk, sebar ke media sosial atau grup kamu.' },
  { icon: Wallet2, title: 'Cuan Masuk Otomatis', description: 'Setiap transaksi lewat linkmu, komisi langsung tercatat di dompetmu.' },
];

export default function HowItWorks() {
  return (
    <section id="cara-kerja" className="bg-surface-alt py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-600">Cara Kerja</span>
          <h2 className="mt-2 text-2xl font-extrabold text-ink sm:text-3xl">Mulai jualan dalam 4 langkah</h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ icon: Icon, title, description }, idx) => (
            <div key={title} className="relative rounded-2xl bg-white p-5 shadow-card">
              <span className="absolute -top-3 left-5 flex h-7 w-7 items-center justify-center rounded-full bg-orange-500 text-xs font-extrabold text-white shadow-card">
                {idx + 1}
              </span>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-100 text-teal-700">
                <Icon size={20} />
              </div>
              <h3 className="mt-4 text-sm font-bold text-ink">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-light">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
