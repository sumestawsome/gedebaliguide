import React from "react";
import type { Metadata } from "next";
import GalleryPageClient from "@/components/gallery/GalleryPageClient";
import { getActiveGalleryImages } from "@/lib/services/gallery-service";
import { mockGuideProfile } from "@/data/mock-data";

// Revalidasi ISR setiap 60 detik
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Galeri Dokumentasi Tur Bali — Potret Autentik Bersama Bli Gede",
  description:
    "Jelajahi galeri foto dokumentasi asli perjalanan wisata privat di Bali bersama Gede Sudiartana. Keindahan pura sakral, air terjun tersembunyi, hingga momen hangat tamu.",
  keywords: [
    "Galeri Foto Bali",
    "Dokumentasi Tour Bali",
    "Foto Spot Wisata Bali",
    "Gede Bali Guide Gallery",
    "Pura Ulun Danu Beratan Foto",
    "Tegalalang Rice Terrace Bali",
    "Spot Foto Estetik Bali",
    "Private Tour Guide Bali",
  ],
  alternates: {
    canonical: "https://gedebaliguide.com/gallery",
  },
  openGraph: {
    title: "Galeri Dokumentasi Tur Bali — Setiap Sudut Bali Menyimpan Cerita",
    description:
      "Potret asli perjalanan wisata privat di Bali bersama pramuwisata resmi HPI Bli Gede. Spot terbaik bebas kerumunan tanpa buru-buru.",
    url: "https://gedebaliguide.com/gallery",
    siteName: "Gede Bali Guide",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&auto=format&fit=crop&q=80",
        width: 1200,
        height: 630,
        alt: "Galeri Dokumentasi Tur Privat Bali Bersama Bli Gede",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Galeri Dokumentasi Tur Bali — Gede Bali Guide",
    description:
      "Potret autentik momen liburan privat keluarga di Bali dipandu Bli Gede.",
    images: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&auto=format&fit=crop&q=80",
    ],
  },
};

export default async function GalleryPage() {
  // Ambil data 12 foto aktif secara dinamis dari Firestore koleksi 'gallery_images'
  const galleryItems = await getActiveGalleryImages();

  const galleryJsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "@id": "https://gedebaliguide.com/gallery#gallery",
    name: "Galeri Dokumentasi Tur Gede Bali Guide",
    description:
      "Koleksi foto autentik perjalanan wisata privat di Bali bersama pramuwisata resmi Bli Gede Sudiartana.",
    url: "https://gedebaliguide.com/gallery",
    author: {
      "@type": "Person",
      name: "Gede Sudiartana",
      jobTitle: "Licensed Bali Tour Guide (HPI Bali)",
      url: "https://gedebaliguide.com/about",
    },
    image: galleryItems.map((item) => ({
      "@type": "ImageObject",
      name: item.title,
      contentUrl: item.imageUrl,
      caption: item.caption,
      contentLocation: {
        "@type": "Place",
        name: item.location,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(galleryJsonLd) }}
      />
      <GalleryPageClient initialItems={galleryItems} />
    </>
  );
}
