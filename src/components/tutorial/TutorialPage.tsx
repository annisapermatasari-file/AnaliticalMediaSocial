import { PlayCircle } from 'lucide-react';

const videos = [
  { title: 'Video Panduan Jualan Dasar', duration: '5 Menit', gradient: 'from-teal-600 to-teal-800' },
  { title: 'Cara Membuat Link Mayar', duration: '4 Menit', gradient: 'from-orange-400 to-orange-600' },
  { title: 'Strategi Sebar Link di Sosial Media', duration: '7 Menit', gradient: 'from-teal-500 to-emerald-600' },
  { title: 'Tips Upgrade Tier Lebih Cepat', duration: '6 Menit', gradient: 'from-indigo-400 to-purple-600' },
];

export default function TutorialPage() {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-card sm:p-6">
      <h3 className="text-base font-bold text-ink sm:text-lg">Tutorial Video</h3>
      <p className="mt-1 text-sm text-ink-light">
        Kumpulan video panduan singkat untuk membantumu memulai dan mengembangkan bisnis reseller.
      </p>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {videos.map((video) => (
          <div key={video.title} className="overflow-hidden rounded-xl bg-surface-alt">
            <div className={`relative flex aspect-video items-center justify-center bg-gradient-to-br ${video.gradient}`}>
              <button
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-teal-700 transition-transform hover:scale-105"
                aria-label={`Putar ${video.title}`}
              >
                <PlayCircle size={26} />
              </button>
              <span className="absolute bottom-2 right-2 rounded bg-black/50 px-1.5 py-0.5 text-[11px] font-medium text-white">
                {video.duration}
              </span>
            </div>
            <div className="p-3">
              <p className="text-sm font-semibold text-ink">{video.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
