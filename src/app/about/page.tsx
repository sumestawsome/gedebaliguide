import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AboutHero from "@/components/about/AboutHero";
import AboutStory from "@/components/about/AboutStory";
import AboutCredentials from "@/components/about/AboutCredentials";
import AboutVehicleFleet from "@/components/about/AboutVehicleFleet";
import AboutComparison from "@/components/about/AboutComparison";
import AboutCta from "@/components/about/AboutCta";
import { mockGuideProfile } from "@/data/mock-data";

export const metadata: Metadata = {
  title: "Tentang Gede Sudiartana — Tour Guide Resmi Berlisensi HPI Bali",
  description:
    "Profil Gede Sudiartana, tour guide privat resmi berlisensi HPI Bali. 10+ tahun pengalaman, armada mobil ber-AC nyaman, rute santai & wawasan budaya autentik.",
  keywords: [
    "Tentang Gede Bali Guide",
    "Gede Sudiartana",
    "Tour Guide Resmi HPI Bali",
    "Lisensi HPI Bali",
    "Pemandu Wisata Privat Bali",
    "Sewa Mobil Ber-AC Bali",
    "Tour Guide Ubud",
  ],
  alternates: {
    canonical: "https://gedebaliguide.com/about",
  },
  openGraph: {
    title: "Tentang Gede Sudiartana — Tour Guide Resmi Berlisensi HPI Bali",
    description:
      "Kenali Gede Sudiartana, private tour guide resmi berlisensi HPI Bali. Wawasan budaya mendalam, armada mobil MPV nyaman, dan tanpa komisi toko oleh-oleh.",
    url: "https://gedebaliguide.com/about",
    siteName: "Gede Bali Guide",
    locale: "id_ID",
    type: "profile",
    images: [
      {
        url: mockGuideProfile.avatarUrl,
        width: 800,
        height: 800,
        alt: "Profil Gede Sudiartana - Tour Guide HPI Bali",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tentang Gede Sudiartana — Tour Guide Resmi Berlisensi HPI Bali",
    description:
      "Kenali Gede Sudiartana, private tour guide resmi berlisensi HPI Bali. Wawasan budaya mendalam & armada mobil MPV nyaman.",
    images: [mockGuideProfile.avatarUrl],
  },
};

export default function AboutPage() {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://gedebaliguide.com/about#person",
    name: mockGuideProfile.name,
    jobTitle: "Licensed Tour Guide (HPI Bali)",
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Pramuwisata Resmi",
      recognizedBy: {
        "@type": "Organization",
        name: "Himpunan Pramuwisata Indonesia (HPI) DPD Bali",
      },
      identifier: mockGuideProfile.licenseNumber,
    },
    worksFor: {
      "@type": "TravelAgency",
      name: "Gede Bali Guide",
      url: "https://gedebaliguide.com",
    },
    image: mockGuideProfile.avatarUrl,
    description:
      "Private tour guide berlisensi resmi HPI Bali berpengalaman lebih dari 10 tahun memandu wisatawan dengan mobil ber-AC nyaman dan wawasan budaya autentik.",
    telephone: mockGuideProfile.phone,
    email: mockGuideProfile.email,
    knowsAbout: [
      "Bali Culture and History",
      "Balinese Temples",
      "Private Tour Itinerary Planning",
      "Tri Hita Karana",
      "Balinese Cuisine",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ubud, Gianyar",
      addressRegion: "Bali",
      addressCountry: "ID",
    },
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#fafaf9] text-stone-900 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <Navbar />
      <main className="flex-1">
        <AboutHero />
        <AboutStory />
        <AboutCredentials />
        <AboutVehicleFleet />
        <AboutComparison />
        <AboutCta />
      </main>
      <Footer />
    </div>
  );
}
