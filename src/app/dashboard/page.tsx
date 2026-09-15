'use client';

import Sidebar from '@/src/components/layout/Sidebar';
import Header from '@/src/components/layout/Header';
import DashboardHome from '@/src/components/dashboard/DashboardHome';
import ProductCatalog from '@/src/components/catalog/ProductCatalog';
import ReferralPage from '@/src/components/referral/ReferralPage';
import WalletPage from '@/src/components/wallet/WalletPage';
import TutorialPage from '@/src/components/tutorial/TutorialPage';
import FAQSection from '@/src/components/faq/FAQSection';
import Toast from '@/src/components/ui/Toast';
import VideoModal from '@/src/components/ui/VideoModal';
import ProfileModal from '@/src/components/ui/ProfileModal';
import { useDashboardStore } from '@/src/lib/store';

export default function DashboardPage() {
  const activeNav = useDashboardStore((s) => s.activeNav);

  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header />
        <main className="flex-1 p-4 sm:p-6">
          {activeNav === 'dashboard' && <DashboardHome />}
          {activeNav === 'catalog' && <ProductCatalog />}
          {activeNav === 'referral' && <ReferralPage />}
          {activeNav === 'wallet' && <WalletPage />}
          {activeNav === 'tutorial' && <TutorialPage />}
          {activeNav === 'help' && <FAQSection />}
        </main>
      </div>
      <Toast />
      <VideoModal />
      <ProfileModal />
    </div>
  );
}
