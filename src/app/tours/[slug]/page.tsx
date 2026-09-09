import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { mockAllTours } from "@/data/mock-data";
import { getActiveTourBySlug } from "@/lib/services/tour-service";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TourItinerary from "@/components/tours/TourItinerary";
import TourInclusions from "@/components/tours/TourInclusions";
import TourMap from "@/components/tours/TourMap";
import TourHighlights from "@/components/tours/TourHighlights";
import TourBookingCard from "@/components/tours/TourBookingCard";
import { Clock, Users, Star, ChevronRight, ShieldCheck, Sparkles, MapPin, MessageCircle, HelpCircle } from "lucide-react";
import { getDirectQuestionUrl } from "@/lib/whatsapp";

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
  const tour = await getActiveTourBySlug(slug);

  if (!tour) {
    return {
      title: "Tur Tidak Ditemukan — Gede Bali Guide",
      description: "Halaman paket tur tidak ditemukan di Gede Bali Guide.",
    };
  }

  const title = `${tour.name} — Tur Privat Bali | Gede Bali Guide`;
  const description = `${tour.tagline}. Paket tur privat ber-AC bersama Gede Sudiartana, pemandu wisata resmi HPI Bali. Reservasi via WhatsApp.`.slice(0, 160);

  return {
    title,
    description,
    keywords: [
      tour.name,
      `Tur ${tour.area}`,
      "Paket Wisata Bali",
      "Tour Guide Bali",
      "Sewa Mobil Bali Supir",
      "Gede Sudiartana",
      "HPI Bali",
      tour.category,
    ],
    alternates: {
      canonical: `https://gedebaliguide.com/tours/${tour.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://gedebaliguide.com/tours/${tour.slug}`,
      siteName: "Gede Bali Guide",
      locale: "id_ID",
      type: "website",
      images: [
        {
          url: tour.coverImage,
          width: 1200,
          height: 630,
          alt: tour.name,
        },
        ...(tour.galleryImages?.map((img) => ({
          url: img,
          width: 1200,
          height: 800,
          alt: `${tour.name} - Galeri`,
        })) || []),
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [tour.coverImage],
    },
  };
}

export default async function TourDetailPage({ params }: TourDetailPageProps) {
  const { slug } = await params;
  const tour = await getActiveTourBySlug(slug);

  if (!tour) {
    notFound();
  }

  // JSON-LD TouristTrip Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tour.name,
    description: tour.description,
    touristType: ["Family", "Couple", "Solo Traveler", "Small Group"],
    provider: {
      "@type": "Person",
      name: "Gede Sudiartana",
      jobTitle: "Licensed Tour Guide (HPI Bali)",
      telephone: "+6281234567890",
      url: "https://gedebaliguide.com",
    },
    offers: {
      "@type": "Offer",
      name: tour.name,
      price: tour.price,
      priceCurrency: tour.currency || "IDR",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: tour.price,
        priceCurrency: tour.currency || "IDR",
        unitText: tour.priceType === "per_group" ? "per mobil/grup (maks 5-6 tamu)" : "per orang",
      },
      availability: "https://schema.org/InStock",
      url: `https://gedebaliguide.com/tours/${tour.slug}`,
      validFrom: "2025-01-01",
    },
    itinerary: {
      "@type": "ItemList",
      numberOfItems: tour.itinerary?.length || 0,
      itemListElement: tour.itinerary?.map((item, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        name: `${item.time} — ${item.title}`,
        description: item.description,
      })),
    },
    image: [tour.coverImage, ...(tour.galleryImages || [])],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: tour.rating || 5.0,
      reviewCount: tour.reviewCount || 10,
      bestRating: "5",
      worstRating: "1",
    },
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

                {/* Key Specifications Grid: Harga per-satuan & Kuota Tamu */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-5 border-y border-stone-200/80 bg-stone-50/70 rounded-2xl px-4 sm:px-6">
                  <div className="space-y-0.5">
                    <span className="block text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                      Biaya Sewa
                    </span>
                    <p className="font-serif text-base sm:text-lg font-bold text-stone-900">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: tour.currency || "IDR",
                        maximumFractionDigits: 0,
                      }).format(tour.price)}
                    </p>
                    <span className="text-[11px] text-stone-500 font-medium">
                      {tour.priceType === "per_person" ? "per orang" : "per mobil (rombongan)"}
                    </span>
                  </div>

                  <div className="space-y-0.5">
                    <span className="block text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                      Kuota Tamu
                    </span>
                    <p className="font-serif text-base sm:text-lg font-bold text-stone-900">
                      {tour.minimumGuests} – {tour.maximumGuests} Tamu
                    </p>
                    <span className="text-[11px] text-stone-500">
                      Min. {tour.minimumGuests} / Maks. {tour.maximumGuests} orang
                    </span>
                  </div>

                  <div className="space-y-0.5">
                    <span className="block text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                      Durasi Tur
                    </span>
                    <p className="font-serif text-base sm:text-lg font-bold text-stone-900">
                      {tour.duration}
                    </p>
                    <span className="text-[11px] text-stone-500">
                      Jadwal santai
                    </span>
                  </div>

                  <div className="space-y-0.5">
                    <span className="block text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                      Tipe Layanan
                    </span>
                    <p className="font-serif text-base sm:text-lg font-bold text-blue-700">
                      100% Privat
                    </p>
                    <span className="text-[11px] text-emerald-700 font-medium">
                      Khusus grup Anda
                    </span>
                  </div>
                </div>
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

              {/* Tour Experience & Destination Highlights */}
              <TourHighlights
                highlights={tour.highlights}
                area={tour.area}
                duration={tour.duration}
              />

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

              {/* Direct Question Section */}
              <div className="rounded-3xl border border-blue-200/80 bg-gradient-to-br from-blue-50/70 to-indigo-50/40 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="space-y-1.5 max-w-lg">
                  <div className="flex items-center gap-2 text-xs font-bold text-blue-800 uppercase tracking-wider">
                    <HelpCircle className="h-4 w-4 text-blue-700" />
                    <span>Ada Pertanyaan Seputar Tur Ini?</span>
                  </div>
                  <h4 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
                    Ingin Menyesuaikan Rute atau Jadwal?
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    Bli Gede siap membantu merancang rute paling nyaman sesuai keinginan keluarga atau rombongan Anda. Konsultasi 100% gratis dan ramah.
                  </p>
                </div>

                <a
                  href={getDirectQuestionUrl(tour.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl bg-blue-700 px-5 py-3.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-blue-700/20 hover:bg-blue-800 active:scale-95 transition-all shrink-0"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Tanya Langsung ke Bli Gede</span>
                </a>
              </div>
            </div>

            {/* Right Column: Sticky Booking & WhatsApp Card */}
            <div className="lg:col-span-4">
              <TourBookingCard tour={tour} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
