"use client";

import { useImageSequence } from "@/app/hooks/useImageSequence";
import ScrollCanvas from "@/app/components/landing/ScrollCanvas";
import LoadingScreen from "@/app/components/landing/LoadingScreen";
import Navbar from "@/app/components/landing/Navbar";
import HeroOverlay from "@/app/components/landing/HeroOverlay";
import ProblemSection from "@/app/components/landing/ProblemSection";
import FeaturesSection from "@/app/components/landing/FeaturesSection";
import DashboardPreview from "@/app/components/landing/DashboardPreview";
import HowItWorks from "@/app/components/landing/HowItWorks";
import CTASection from "@/app/components/landing/CTASection";
import Footer from "@/app/components/landing/Footer";

export default function Home() {
  const { images, progress, isLoaded } = useImageSequence();

  return (
    <>
      {/* Fixed canvas background — persists through all sections */}
      <ScrollCanvas images={images} isLoaded={isLoaded} />

      {/* Loading overlay — fades out when frames are ready */}
      <LoadingScreen progress={progress} isLoaded={isLoaded} />

      {/* Fixed navbar */}
      <Navbar />

      {/* Scrollable content — each section snaps into view.
          CSS scroll-snap-type: y mandatory on html handles the snapping.
          Each section is 100svh tall via the .snap-section class. */}
      <main id="scroll-content" className="relative z-10">
        <HeroOverlay />
        <ProblemSection />
        <FeaturesSection />
        <HowItWorks />
        <DashboardPreview />
        <CTASection />
        <Footer />
      </main>
    </>
  );
}
