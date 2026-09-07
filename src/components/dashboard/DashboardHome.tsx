import WelcomeBanner from '@/src/components/dashboard/WelcomeBanner';
import StatsCards from '@/src/components/dashboard/StatsCards';
import OnboardingChecklist from '@/src/components/dashboard/OnboardingChecklist';
import ReferralTierWidget from '@/src/components/dashboard/ReferralTierWidget';
import ProductCatalog from '@/src/components/catalog/ProductCatalog';
import FAQSection from '@/src/components/faq/FAQSection';

export default function DashboardHome() {
  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
      <div className="space-y-6 xl:col-span-2">
        <WelcomeBanner />
        <StatsCards />
        <OnboardingChecklist />
        <ReferralTierWidget />
      </div>
      <div className="space-y-6">
        <ProductCatalog compact />
        <FAQSection />
      </div>
    </div>
  );
}
