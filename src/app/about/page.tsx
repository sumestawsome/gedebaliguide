import React from "react";
import type { Metadata } from "next";
import { getAboutPageContent } from "@/lib/services/about-service";
import AboutPageClient from "@/components/about/AboutPageClient";
import { mockGuideProfile } from "@/data/mock-data";

// Revalidasi ISR setiap 60 detik
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Mengenal Bli Gede — Pemandu Lokal Independen Berlisensi HPI Bali",
  description:
    "Mengenal Gede Sudiartana, private tour guide resmi berlisensi HPI Bali. 10+ tahun pengalaman, mobil privat ber-AC, rute santai tanpa komisi toko oleh-oleh.",
  keywords: [
    "Tentang Gede Bali Guide",
    "Gede Sudiartana",
    "Tour Guide Resmi HPI Bali",
    "Lisensi HPI Bali",
    "Pemandu Wisata Privat Bali",
    "Private Tour Guide Ubud",
    "Sewa Mobil Privat Bali",
  ],
  alternates: {
    canonical: "https://gedebaliguide.com/about",
  },
  openGraph: {
    title: "Mengenal Bli Gede — Sahabat Lokal & Penjaga Cerita Bali Anda",
    description:
      "Kenali Gede Sudiartana, private tour guide resmi berlisensi HPI Bali. Wawasan budaya autentik, kenyamanan mobil privat, dan tanpa komisi toko oleh-oleh.",
    url: "https://gedebaliguide.com/about",
    siteName: "Gede Bali Guide",
    locale: "id_ID",
    type: "profile",
    images: [
      {
        url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80",
        width: 800,
        height: 1000,
        alt: "Profil Gede Sudiartana - Tour Guide HPI Bali",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mengenal Bli Gede — Pemandu Lokal Independen Berlisensi HPI Bali",
    description:
      "Kenali Gede Sudiartana, private tour guide resmi berlisensi HPI Bali. Wawasan budaya mendalam & armada mobil privat ber-AC.",
    images: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80",
    ],
  },
};

export default async function AboutPage() {
  // Fetch live content from Firestore 'settings/about_page'
  const aboutContent = await getAboutPageContent();

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://gedebaliguide.com/about#person",
    name: "Gede Sudiartana",
    jobTitle: "Licensed Private Tour Guide (HPI Bali)",
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Pramuwisata Resmi",
      recognizedBy: {
        "@type": "Organization",
        name: "Himpunan Pramuwisata Indonesia (HPI) DPD Bali",
      },
      identifier: "HPI-BALI-2015-8849",
    },
    worksFor: {
      "@type": "TravelAgency",
      name: "Gede Bali Guide",
      url: "https://gedebaliguide.com",
    },
    image: aboutContent.hero.profileImage.url,
    description:
      aboutContent.hero.introText ||
      "Private tour guide berlisensi resmi HPI Bali berpengalaman lebih dari 10 tahun memandu wisatawan dengan mobil ber-AC nyaman dan wawasan budaya autentik.",
    telephone: mockGuideProfile.phone,
    email: mockGuideProfile.email,
    knowsAbout: [
      "Bali Culture and Living Heritage",
      "Balinese Temples and Sacred Etiquette",
      "Tri Hita Karana Philosophy",
      "Custom Private Itinerary Planning",
      "Scenic Hidden Photography Spots",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ubud, Gianyar",
      addressRegion: "Bali",
      addressCountry: "ID",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <AboutPageClient initialContent={aboutContent} />
    </>
  );
}
