import React from "react";
import type { Metadata } from "next";
import ToursPageClient from "@/components/tours/ToursPageClient";
import { getActiveToursSortedByPopularity } from "@/lib/services/tour-service";

export const metadata: Metadata = {
  title: "Katalog Tur Privat Bali — Pilihan Rute Fleksibel & Mobil Ber-AC",
  description:
    "Pilihan paket tur privat lengkap di Bali bersama Gede Sudiartana. Mulai dari Ubud, Uluwatu, Bedugul, Kintamani, hingga Nusa Penida. Mobil ber-AC nyaman & tanpa komisi perantara.",
  keywords: [
    "Katalog Tour Bali",
    "Paket Wisata Privat Bali",
    "Tour Ubud Privat",
    "Tour Uluwatu Kecak",
    "Sewa Mobil Bali dengan Driver Guide",
    "Paket Liburan Keluarga Bali",
    "Bali Tour Packages",
  ],
  alternates: {
    canonical: "https://gedebaliguide.com/tours",
  },
  openGraph: {
    title: "Katalog Tur Privat Bali — Gede Bali Guide",
    description:
      "Pilihan rute wisata privat terbaik di Bali bersama pramuwisata berlisensi resmi HPI. Jadwal santai dan fleksibel tanpa belanja paksa.",
    url: "https://gedebaliguide.com/tours",
    siteName: "Gede Bali Guide",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&auto=format&fit=crop&q=80",
        width: 1200,
        height: 630,
        alt: "Katalog Tur Privat Gede Bali Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Katalog Tur Privat Bali — Gede Bali Guide",
    description:
      "Paket tur privat lengkap di Bali bersama Bli Gede. Mobil ber-AC nyaman & tanpa perantara.",
    images: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&auto=format&fit=crop&q=80",
    ],
  },
};

export default async function ToursPage() {
  // Ambil data tur aktif secara live dari Firestore
  const tours = await getActiveToursSortedByPopularity();

  const catalogJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Katalog Tur Privat Bali — Gede Bali Guide",
    description:
      "Daftar pilihan paket tur privat fleksibel di Bali bersama pemandu wisata berlisensi resmi HPI Gede Sudiartana.",
    url: "https://gedebaliguide.com/tours",
    numberOfItems: tours.length,
    itemListElement: tours.map((tour, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "TouristTrip",
        name: tour.name,
        description: tour.description,
        url: `https://gedebaliguide.com/tours/${tour.slug}`,
        touristType: ["Family", "Couple", "Solo Traveler"],
        offers: {
          "@type": "Offer",
          price: tour.price,
          priceCurrency: "IDR",
          availability: "https://schema.org/InStock",
        },
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(catalogJsonLd) }}
      />
      <ToursPageClient tours={tours} />
    </>
  );
}
