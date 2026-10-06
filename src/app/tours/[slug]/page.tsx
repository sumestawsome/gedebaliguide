import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { mockAllTours } from "@/data/mock-data";
import { getActiveTourBySlug } from "@/lib/services/tour-service";
import TourDetailClient from "@/components/tours/TourDetailClient";

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

  // JSON-LD TouristTrip & BreadcrumbList Schema Graph
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TouristTrip",
        "@id": `https://gedebaliguide.com/tours/${tour.slug}#trip`,
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
          priceValidUntil: "2026-12-31",
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
      },
      {
        "@type": "BreadcrumbList",
        "@id": `https://gedebaliguide.com/tours/${tour.slug}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Beranda",
            item: "https://gedebaliguide.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Katalog Tur",
            item: "https://gedebaliguide.com/tours",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: tour.name,
            item: `https://gedebaliguide.com/tours/${tour.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TourDetailClient tour={tour} />
    </>
  );
}
