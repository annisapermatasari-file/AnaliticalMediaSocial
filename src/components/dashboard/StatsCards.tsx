import { Wallet, CircleDollarSign, Sparkles, UserPlus, ArrowUpRight } from 'lucide-react';
import { currentUser, pointLogs } from '@/src/lib/mockData';
import { formatCurrency, formatNumber } from '@/src/lib/utils';

const newReferralsCount = 3;
const totalPoints = pointLogs.reduce((sum, log) => sum + log.points, 0);

const stats = [
  {
    label: 'Total Penjualan',
    value: formatCurrency(currentUser.totalSales),
    trend: '+12,5%',
    icon: Wallet,
    accent: 'from-teal-400 to-teal-600',
  },
  {
    label: 'Komisi Cair',
    value: formatCurrency(currentUser.commissionBalance),
    trend: '+8,2%',
    icon: CircleDollarSign,
    accent: 'from-orange-300 to-orange-500',
  },
  {
    label: 'Total Poin',
    value: `${formatNumber(totalPoints)} Poin`,
    trend: '+50 Poin',
    icon: Sparkles,
    accent: 'from-teal-400 to-teal-600',
  },
  {
    label: 'Referral Baru',
    value: `${newReferralsCount} Orang`,
    trend: 'Bulan ini',
    icon: UserPlus,
    accent: 'from-orange-300 to-orange-500',
  },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4">
      {stats.map(({ label, value, trend, icon: Icon, accent }) => (
        <div
          key={label}
          className="group relative overflow-hidden rounded-2xl bg-white p-5 shadow-card transition-shadow hover:shadow-card-lg"
        >
          <div className="flex items-start justify-between">
            <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${accent} text-white shadow-card`}>
              <Icon size={20} />
            </div>
            <span className="flex items-center gap-0.5 rounded-full bg-teal-50 px-2 py-1 text-[11px] font-bold text-teal-700">
              <ArrowUpRight size={11} /> {trend}
            </span>
          </div>
          <p className="mt-4 text-xs font-medium text-ink-light">{label}</p>
          <p className="whitespace-nowrap text-xl font-extrabold tracking-tight text-ink">{value}</p>
        </div>
      ))}
    </div>
  );
}
