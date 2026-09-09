import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { mockAllTours } from "@/data/mock-data";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/common/FloatingWhatsApp";
import TourItinerary from "@/components/tours/TourItinerary";
import TourInclusions from "@/components/tours/TourInclusions";
import TourMap from "@/components/tours/TourMap";
import TourBookingCard from "@/components/tours/TourBookingCard";
import { Clock, Users, Star, ChevronRight, ShieldCheck, Sparkles, MapPin } from "lucide-react";

interface TourDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return mockAllTours.map((tour) => ({
    slug: tour.slug,
  }));
}

export async function generateMetadata({ params }: TourDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tour = mockAllTours.find((t) => t.slug === slug && t.isActive);

  if (!tour) {
    return {
      title: "Tur Tidak Ditemukan — Gede Bali Guide",
    };
  }

  return {
    title: `${tour.name} — Gede Bali Guide`,
    description: `${tour.tagline} Tur privat ber-AC bersama tour guide resmi HPI Bali.`,
    openGraph: {
      title: `${tour.name} — Gede Bali Guide`,
      description: tour.tagline,
      images: [
        {
          url: tour.coverImage,
          width: 1200,
          height: 630,
          alt: tour.name,
        },
      ],
    },
  };
}

export default async function TourDetailPage({ params }: TourDetailPageProps) {
  const { slug } = await params;
  const tour = mockAllTours.find((t) => t.slug === slug && t.isActive);

  if (!tour) {
    notFound();
  }

  // JSON-LD TouristTrip Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tour.name,
    description: tour.description,
    touristType: ["Family", "Couple", "Solo Traveler"],
    offers: {
      "@type": "Offer",
      price: tour.price,
      priceCurrency: tour.currency,
      availability: "https://schema.org/InStock",
      validFrom: "2025-01-01",
    },
    itinerary: tour.itinerary?.map((item) => ({
      "@type": "ListItem",
      name: item.title,
      description: item.description,
    })),
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#fafaf9] text-stone-900 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      <main className="flex-1 pb-24">
        {/* Breadcrumb Navigation */}
        <div className="border-b border-stone-200/80 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3.5">
            <nav className="flex items-center gap-2 text-xs font-medium text-stone-500 overflow-x-auto">
              <Link href="/" className="hover:text-blue-700 transition-colors">
                Beranda
              </Link>
              <ChevronRight className="h-3.5 w-3.5 text-stone-400 shrink-0" />
              <Link href="/tours" className="hover:text-blue-700 transition-colors">
                Katalog Tur
              </Link>
              <ChevronRight className="h-3.5 w-3.5 text-stone-400 shrink-0" />
              <span className="text-stone-900 font-semibold truncate">{tour.name}</span>
            </nav>
          </div>
        </div>

        {/* Content Section */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
            {/* Left Column: Tour Details */}
            <div className="lg:col-span-8 space-y-10">
              {/* Header Info */}
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-stone-900 px-3 py-1 text-xs font-semibold text-white">
                    {tour.area}
                  </span>
                  {tour.featured && (
                    <span className="flex items-center gap-1 rounded-full bg-amber-500 px-3 py-1 text-xs font-bold text-white shadow-xs">
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>Paket Populer</span>
                    </span>
                  )}
                  <div className="flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-200 px-3 py-1 text-xs font-bold text-amber-900">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    <span>{tour.rating.toFixed(1)}</span>
                    <span className="text-stone-500 font-normal">({tour.reviewCount} ulasan tamu)</span>
                  </div>
                </div>

                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 leading-tight">
                  {tour.name}
                </h1>

                <p className="text-base sm:text-lg text-stone-600 leading-relaxed font-sans">
                  {tour.tagline}
                </p>
              </div>

              {/* Cover Image */}
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-stone-200/90 bg-stone-100 shadow-xl">
                <Image
                  src={tour.coverImage}
                  alt={tour.name}
                  fill
                  priority
                  sizes="(max-width: 1200px) 100vw, 800px"
                  className="object-cover"
                />
              </div>

              {/* Description & Overview */}
              <div className="space-y-4">
                <h3 className="font-serif text-2xl font-bold text-stone-900">
                  Tentang Tur Ini
                </h3>
                <p className="text-stone-700 leading-relaxed font-sans text-sm sm:text-base">
                  {tour.description}
                </p>
              </div>

              {/* Highlights List */}
              <div className="space-y-4 rounded-3xl bg-stone-100/60 p-6 sm:p-8 border border-stone-200/70">
                <h3 className="font-serif text-xl font-bold text-stone-900">
                  Sorotan Destinasi Utama
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {tour.highlights.map((hl, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-sm font-medium text-stone-800">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-800 shrink-0">
                        <MapPin className="h-3.5 w-3.5" />
                      </div>
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chronological Itinerary */}
              <TourItinerary itinerary={tour.itinerary} />

              {/* Inclusions & Exclusions */}
              <TourInclusions includes={tour.includes} excludes={tour.excludes} />

              {/* Map & Pickup */}
              <TourMap
                area={tour.area}
                mapEmbedUrl={tour.mapEmbedUrl}
                pickupLocation={tour.pickupLocation}
              />
            </div>

            {/* Right Column: Sticky Booking & WhatsApp Card */}
            <div className="lg:col-span-4">
              <TourBookingCard tour={tour} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
