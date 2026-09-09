import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import TrustBar from "@/components/home/TrustBar";
import FeaturedToursSection from "@/components/home/FeaturedToursSection";
import DestinationsSection from "@/components/home/DestinationsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import WhatsAppCtaSection from "@/components/home/WhatsAppCtaSection";
import { mockGuideProfile } from "@/data/mock-data";
import { getUnifiedHomeContent } from "@/lib/services/home-service";

export const metadata: Metadata = {
  title: "Gede Bali Guide — Private Tour Guide Berlisensi HPI Bali",
  description:
    "Jelajahi keindahan autentik Bali bersama Gede Sudiartana, private tour guide resmi HPI Bali. Mobil ber-AC terawat, rute santai fleksibel & tanpa biaya perantara.",
  keywords: [
    "Tour Guide Bali",
    "Private Tour Guide Bali",
    "Gede Bali Guide",
    "Gede Sudiartana",
    "Sewa Mobil Bali Supir",
    "Paket Wisata Bali",
    "HPI Bali",
    "Tour Bali Keluarga",
  ],
  alternates: {
    canonical: "https://gedebaliguide.com",
  },
  openGraph: {
    title: "Gede Bali Guide — Private Tour Guide Berlisensi HPI Bali",
    description:
      "Jelajahi keindahan autentik Bali bersama Gede Sudiartana, private tour guide resmi HPI Bali. Mobil ber-AC terawat, rute santai fleksibel & tanpa biaya perantara.",
    url: "https://gedebaliguide.com",
    siteName: "Gede Bali Guide",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&auto=format&fit=crop&q=80",
        width: 1200,
        height: 630,
        alt: "Gede Bali Guide - Private Tour Guide Bali",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gede Bali Guide — Private Tour Guide Berlisensi HPI Bali",
    description:
      "Jelajahi keindahan autentik Bali bersama Gede Sudiartana, private tour guide resmi HPI Bali. Rute santai & fleksibel.",
    images: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&auto=format&fit=crop&q=80",
    ],
  },
};

export default async function HomePage() {
  const homeData = await getUnifiedHomeContent();

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": "https://gedebaliguide.com/#organization",
    name: "Gede Bali Guide",
    alternateName: `Private Tour Guide Bali - ${homeData.hero.guideName}`,
    description:
      "Layanan pemandu wisata privat resmi berlisensi HPI Bali berpengalaman lebih dari 10 tahun dengan armada mobil ber-AC nyaman.",
    url: "https://gedebaliguide.com",
    telephone: homeData.whatsApp.phoneNumber || "+6281234567890",
    priceRange: "Rp 500.000 - Rp 950.000",
    image: homeData.hero.heroImageUrl || "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&auto=format&fit=crop&q=80",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Jl. Raya Ubud No. 88",
      addressLocality: "Ubud, Gianyar",
      addressRegion: "Bali",
      postalCode: "80571",
      addressCountry: "ID",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -8.506854,
      longitude: 115.260846,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "06:00",
      closes: "22:00",
    },
    founder: {
      "@type": "Person",
      name: homeData.hero.guideName,
      jobTitle: "Licensed Bali Tour Guide (HPI Bali)",
      licenseNumber: homeData.hero.licenseNumber,
      url: "https://gedebaliguide.com/about",
    },
    areaServed: [
      "Bali",
      "Ubud",
      "Uluwatu",
      "Bedugul",
      "Kintamani",
      "Nusa Penida",
      "Canggu",
      "Seminyak",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "48",
      bestRating: "5",
      worstRating: "1",
    },
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#fafaf9] text-stone-900 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <Navbar />
      <main className="flex-1">
        <HeroSection
          heroConfig={homeData.hero}
          whatsAppConfig={homeData.whatsApp}
        />
        <TrustBar items={homeData.trustItems} />
        <FeaturedToursSection initialTours={homeData.featuredTours} />
        <DestinationsSection initialDestinations={homeData.destinations} />
        <TestimonialsSection reviews={homeData.testimonials} />
        <WhatsAppCtaSection
          directBooking={homeData.directBooking}
          whatsApp={homeData.whatsApp}
        />
      </main>
      <Footer />
    </div>
  );
}
