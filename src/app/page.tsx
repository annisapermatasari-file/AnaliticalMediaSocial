import Navbar from '@/src/components/landing/Navbar';
import Hero from '@/src/components/landing/Hero';
import FeatureGrid from '@/src/components/landing/FeatureGrid';
import HowItWorks from '@/src/components/landing/HowItWorks';
import TierPricing from '@/src/components/landing/TierPricing';
import LandingFaq from '@/src/components/landing/LandingFaq';
import CtaBanner from '@/src/components/landing/CtaBanner';
import Footer from '@/src/components/landing/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <Hero />
      <FeatureGrid />
      <HowItWorks />
      <TierPricing />
      <LandingFaq />
      <CtaBanner />
      <Footer />
    </div>
  );
}
