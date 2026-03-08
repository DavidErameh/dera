"use client";

import { useState, useEffect } from "react";
import { Hero } from "@/components/sections/Hero";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { NetworkSection } from "@/components/sections/NetworkSection";
import { WorkflowSection } from "@/components/sections/WorkflowSection";
import { WhoSection } from "@/components/sections/WhoSection";
import { USPSection } from "@/components/sections/USPSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { MarketSection } from "@/components/sections/MarketSection";
import { CTASection } from "@/components/sections/CTASection";
import { Footer } from "@/components/layout/Footer";
import { DemoModal } from "@/components/demo/DemoModal";
import { RequestDemoModal } from "@/components/demo/RequestDemoModal";

export default function Home() {
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [isRequestDemoOpen, setIsRequestDemoOpen] = useState(false);

  useEffect(() => {
    const handleOpenDemo = () => setIsDemoOpen(true);
    window.addEventListener("openDemo", handleOpenDemo);
    return () => window.removeEventListener("openDemo", handleOpenDemo);
  }, []);

  useEffect(() => {
    const handleOpenRequestDemo = () => setIsRequestDemoOpen(true);
    window.addEventListener("openRequestDemo", handleOpenRequestDemo);
    return () => window.removeEventListener("openRequestDemo", handleOpenRequestDemo);
  }, []);

  return (
    <main className="min-h-screen">
      <Hero />
      <ProblemSection />
      <NetworkSection />
      <WorkflowSection />
      <WhoSection />
      <USPSection />
      <StatsSection />
      <MarketSection />
      <CTASection />
      <Footer />
      <DemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
      <RequestDemoModal isOpen={isRequestDemoOpen} onClose={() => setIsRequestDemoOpen(false)} />
    </main>
  );
}
