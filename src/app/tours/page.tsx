import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ToursCatalog from "@/components/tours/ToursCatalog";
import { Compass, ShieldCheck, Car, Clock } from "lucide-react";
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
    <div className="flex min-h-screen flex-col bg-[#fafaf9] text-stone-900 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(catalogJsonLd) }}
      />
      <Navbar />

      <main className="flex-1 pb-28 sm:pb-20">
        {/* Header Hero Banner */}
        <section className="relative overflow-hidden bg-gradient-to-b from-stone-100 via-[#fafaf9] to-[#fafaf9] pt-8 pb-10 sm:pt-12 sm:pb-14 border-b border-stone-200/70">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-3.5 sm:space-y-4">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-xs text-stone-500 font-medium mb-1">
                <Link href="/" className="hover:text-blue-700 transition-colors">
                  Beranda
                </Link>
                <span>/</span>
                <span className="text-stone-800 font-semibold">Katalog Tur</span>
              </nav>

              <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-200/80 px-3 py-1 sm:px-3.5 sm:py-1 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-blue-800">
                <Compass className="h-3.5 w-3.5 text-blue-600" />
                <span>Katalog Tur Eksklusif Bali</span>
              </div>

              <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 leading-tight">
                Pilih Perjalanan Impian Anda di Pulau Dewata
              </h1>

              <p className="text-xs sm:text-sm md:text-base text-stone-600 leading-relaxed font-sans">
                Setiap rute di bawah ini dirancang fleksibel dengan kenyamanan maksimal. Semua paket mencakup unit mobil privat ber-AC, BBM, biaya parkir, dan pendampingan pemandu berlisensi resmi HPI Bali.
              </p>

              {/* Guarantee badges */}
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-2 text-xs font-semibold text-stone-700">
                <span className="flex items-center gap-1.5 bg-white border border-stone-200 rounded-lg px-2.5 py-1 sm:px-3 sm:py-1.5 shadow-xs">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Lisensi Resmi HPI Bali</span>
                </span>
                <span className="flex items-center gap-1.5 bg-white border border-stone-200 rounded-lg px-2.5 py-1 sm:px-3 sm:py-1.5 shadow-xs">
                  <Car className="h-3.5 w-3.5 text-amber-600" />
                  <span>100% Mobil Ber-AC Privat</span>
                </span>
                <span className="flex items-center gap-1.5 bg-white border border-stone-200 rounded-lg px-2.5 py-1 sm:px-3 sm:py-1.5 shadow-xs">
                  <Clock className="h-3.5 w-3.5 text-blue-700" />
                  <span>Jadwal Fleksibel & Santai</span>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Catalog Section */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10">
          <ToursCatalog initialTours={tours} />
        </section>
      </main>

      <Footer />
    </div>
  );
}
