'use client';

import { useState } from 'react';
import { CircleDollarSign, Sparkles, Send } from 'lucide-react';
import { currentUser, payouts as initialPayouts, pointLogs, transactions } from '@/src/lib/mockData';
import { formatCurrency, formatDateTime, formatNumber } from '@/src/lib/utils';
import { useDashboardStore } from '@/src/lib/store';
import type { Payout, PayoutStatus } from '@/src/types';

const statusStyles: Record<PayoutStatus, string> = {
  requested: 'bg-orange-100 text-orange-600',
  processing: 'bg-orange-100 text-orange-600',
  completed: 'bg-teal-100 text-teal-700',
  rejected: 'bg-red-100 text-red-600',
};

const paymentStatusStyles: Record<string, string> = {
  paid: 'bg-teal-100 text-teal-700',
  pending: 'bg-orange-100 text-orange-600',
  failed: 'bg-red-100 text-red-600',
};

export default function WalletPage() {
  const [amount, setAmount] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [payoutList, setPayoutList] = useState<Payout[]>(initialPayouts);
  const showToast = useDashboardStore((s) => s.showToast);

  const totalPoints = pointLogs.reduce((sum, log) => sum + log.points, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numericAmount = Number(amount);

    if (numericAmount > currentUser.commissionBalance) {
      setFormError(`Saldo tidak cukup. Saldo kamu ${formatCurrency(currentUser.commissionBalance)}.`);
      return;
    }

    const newPayout: Payout = {
      id: Date.now(),
      userId: currentUser.id,
      amount: numericAmount,
      bankName,
      accountNumber,
      status: 'requested',
      createdAt: new Date().toISOString(),
    };

    setPayoutList((prev) => [newPayout, ...prev]);
    setFormError(null);
    showToast(`Pengajuan pencairan ${formatCurrency(numericAmount)} berhasil dikirim!`);
    setAmount('');
    setBankName('');
    setAccountNumber('');
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-card">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
            <CircleDollarSign size={22} />
          </div>
          <div>
            <p className="text-xs font-medium text-ink-light">Saldo Komisi</p>
            <p className="text-lg font-bold text-ink">{formatCurrency(currentUser.commissionBalance)}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-card">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-100 text-teal-700">
            <Sparkles size={22} />
          </div>
          <div>
            <p className="text-xs font-medium text-ink-light">Total Poin</p>
            <p className="text-lg font-bold text-ink">{formatNumber(totalPoints)} Poin</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="rounded-2xl bg-white p-5 shadow-card xl:col-span-2">
          <h3 className="text-base font-bold text-ink">Riwayat Transaksi</h3>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[500px] text-left text-sm">
              <thead>
                <tr className="border-b border-teal-100 text-xs font-semibold uppercase text-ink-light">
                  <th className="py-2 pr-3">Kode</th>
                  <th className="py-2 pr-3">Tipe</th>
                  <th className="py-2 pr-3">Nominal</th>
                  <th className="py-2 pr-3">Komisi</th>
                  <th className="py-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-teal-50">
                {transactions.map((trx) => (
                  <tr key={trx.id}>
                    <td className="py-2.5 pr-3 font-medium text-ink">{trx.transactionCode}</td>
                    <td className="py-2.5 pr-3 capitalize text-ink-light">{trx.type}</td>
                    <td className="py-2.5 pr-3 text-ink-light">{formatCurrency(trx.amount)}</td>
                    <td className="py-2.5 pr-3 font-semibold text-teal-600">
                      {formatCurrency(trx.commissionEarned)}
                    </td>
                    <td className="py-2.5">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[11px] font-semibold capitalize ${paymentStatusStyles[trx.paymentStatus]}`}
                      >
                        {trx.paymentStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 rounded-2xl bg-white p-5 shadow-card"
        >
          <h3 className="text-base font-bold text-ink">Ajukan Pencairan</h3>
          <label className="text-xs font-semibold text-ink-light">
            Nominal
            <input
              required
              type="number"
              min={50000}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Rp 50.000"
              className="mt-1 w-full rounded-lg border border-teal-100 px-3 py-2 text-sm text-ink outline-none focus:border-teal-400"
            />
          </label>
          <label className="text-xs font-semibold text-ink-light">
            Nama Bank
            <input
              required
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              placeholder="BCA"
              className="mt-1 w-full rounded-lg border border-teal-100 px-3 py-2 text-sm text-ink outline-none focus:border-teal-400"
            />
          </label>
          <label className="text-xs font-semibold text-ink-light">
            Nomor Rekening
            <input
              required
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="1234567890"
              className="mt-1 w-full rounded-lg border border-teal-100 px-3 py-2 text-sm text-ink outline-none focus:border-teal-400"
            />
          </label>
          <button
            type="submit"
            className="mt-1 flex items-center justify-center gap-1.5 rounded-lg bg-teal-600 px-3 py-2.5 text-sm font-semibold text-white hover:bg-teal-700"
          >
            <Send size={15} /> Ajukan Sekarang
          </button>
          {formError && (
            <p className="text-center text-xs font-medium text-red-600">{formError}</p>
          )}
        </form>
      </div>

      <div className="rounded-2xl bg-white p-5 shadow-card">
        <h3 className="text-base font-bold text-ink">Riwayat Pencairan</h3>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[500px] text-left text-sm">
            <thead>
              <tr className="border-b border-teal-100 text-xs font-semibold uppercase text-ink-light">
                <th className="py-2 pr-3">Tanggal</th>
                <th className="py-2 pr-3">Nominal</th>
                <th className="py-2 pr-3">Bank</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-teal-50">
              {payoutList.map((payout) => (
                <tr key={payout.id}>
                  <td className="py-2.5 pr-3 text-ink-light">{formatDateTime(payout.createdAt)}</td>
                  <td className="py-2.5 pr-3 font-medium text-ink">{formatCurrency(payout.amount)}</td>
                  <td className="py-2.5 pr-3 text-ink-light">
                    {payout.bankName} · {payout.accountNumber}
                  </td>
                  <td className="py-2.5">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[11px] font-semibold capitalize ${statusStyles[payout.status]}`}
                    >
                      {payout.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-5 shadow-card">
        <h3 className="text-base font-bold text-ink">Riwayat Poin</h3>
        <ul className="mt-3 divide-y divide-teal-50">
          {pointLogs.map((log) => (
            <li key={log.id} className="flex items-center justify-between py-2.5 text-sm">
              <div>
                <p className="font-medium text-ink">{log.description}</p>
                <p className="text-xs text-ink-light">{formatDateTime(log.createdAt)}</p>
              </div>
              <span className="shrink-0 font-semibold text-teal-600">+{formatNumber(log.points)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
