import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import TrustBar from "@/components/home/TrustBar";
import FeaturedToursSection from "@/components/home/FeaturedToursSection";
import DestinationsSection from "@/components/home/DestinationsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import WhatsAppCtaSection from "@/components/home/WhatsAppCtaSection";
import FloatingWhatsApp from "@/components/common/FloatingWhatsApp";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#fafaf9] text-stone-900 font-sans">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <TrustBar />
        <FeaturedToursSection />
        <DestinationsSection />
        <TestimonialsSection />
        <WhatsAppCtaSection />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
