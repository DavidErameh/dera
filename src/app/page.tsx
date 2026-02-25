import { Hero } from '@/components/sections/Hero';
import { ProblemSection } from '@/components/sections/ProblemSection';
import { WorkflowSection } from '@/components/sections/WorkflowSection';
import { USPSection } from '@/components/sections/USPSection';
import { StatsSection } from '@/components/sections/StatsSection';
import { ComplianceSection } from '@/components/sections/ComplianceSection';
import { CTASection } from '@/components/sections/CTASection';
import { Footer } from '@/components/layout/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <ProblemSection />
      <WorkflowSection />
      <USPSection />
      <StatsSection />
      <ComplianceSection />
      <CTASection />
      <Footer />
    </main>
  );
}

