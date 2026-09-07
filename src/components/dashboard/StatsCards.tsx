import { Wallet, CircleDollarSign, Sparkles, UserPlus } from 'lucide-react';
import { currentUser, pointLogs } from '@/src/lib/mockData';
import { formatCurrency, formatNumber } from '@/src/lib/utils';

const newReferralsCount = 3;
const totalPoints = pointLogs.reduce((sum, log) => sum + log.points, 0);

const stats = [
  {
    label: 'Total Penjualan',
    value: formatCurrency(currentUser.totalSales),
    icon: Wallet,
    iconBg: 'bg-teal-100 text-teal-700',
  },
  {
    label: 'Komisi Cair',
    value: formatCurrency(currentUser.commissionBalance),
    icon: CircleDollarSign,
    iconBg: 'bg-orange-100 text-orange-600',
  },
  {
    label: 'Total Poin',
    value: `${formatNumber(totalPoints)} Poin`,
    icon: Sparkles,
    iconBg: 'bg-teal-100 text-teal-700',
  },
  {
    label: 'Referral Baru',
    value: `${newReferralsCount} Orang`,
    icon: UserPlus,
    iconBg: 'bg-orange-100 text-orange-600',
  },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4">
      {stats.map(({ label, value, icon: Icon, iconBg }) => (
        <div
          key={label}
          className="flex items-center gap-3 rounded-2xl bg-white p-5 shadow-card"
        >
          <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconBg}`}>
            <Icon size={22} />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium text-ink-light">{label}</p>
            <p className="whitespace-nowrap text-base font-bold text-ink sm:text-lg">{value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
