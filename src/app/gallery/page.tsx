import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import { mockGalleryItems } from "@/data/mock-gallery";
import { mockGuideProfile } from "@/data/mock-data";
import { Sparkles, MessageCircle } from "lucide-react";
import { getGeneralConsultationUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Galeri Foto Tur Bali — Dokumentasi Nyata Liburan Bersama Gede",
  description:
    "Lihat galeri foto dokumentasi asli tur privat di Bali bersama Gede Sudiartana. Keindahan pura sakral, lanskap alam, dan senyum bahagia para tamu.",
  keywords: [
    "Galeri Foto Bali",
    "Dokumentasi Tour Bali",
    "Foto Spot Wisata Bali",
    "Gede Bali Guide Gallery",
    "Pura Ulun Danu Foto",
    "Tegalalang Rice Terrace",
    "Spot Foto Estetik Bali",
  ],
  alternates: {
    canonical: "https://gedebaliguide.com/gallery",
  },
  openGraph: {
    title: "Galeri Foto Tur Bali — Dokumentasi Nyata Bersama Gede Sudiartana",
    description:
      "Potret autentik momen liburan privat keluarga & pasangan di Bali. Spot terbaik bebas kerumunan dipandu guide resmi HPI.",
    url: "https://gedebaliguide.com/gallery",
    siteName: "Gede Bali Guide",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&auto=format&fit=crop&q=80",
        width: 1200,
        height: 630,
        alt: "Galeri Foto Tur Privat Bali Bersama Gede",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Galeri Foto Tur Bali — Gede Bali Guide",
    description:
      "Potret autentik momen liburan privat keluarga di Bali dipandu Bli Gede.",
    images: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&auto=format&fit=crop&q=80",
    ],
  },
};

export default function GalleryPage() {
  const waUrl = getGeneralConsultationUrl("gallery");

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
      name: mockGuideProfile.name,
      jobTitle: "Licensed Bali Tour Guide (HPI Bali)",
    },
    image: mockGalleryItems.map((item) => ({
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
    <div className="flex min-h-screen flex-col bg-[#fafaf9] text-stone-900 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(galleryJsonLd) }}
      />
      <Navbar />

      <main className="flex-1">
        {/* Gallery Hero Header */}
        <section className="bg-gradient-to-b from-stone-100/70 via-[#fafaf9] to-[#fafaf9] pt-10 pb-6 md:pt-16 md:pb-8 border-b border-stone-200/60">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
            {/* Breadcrumb */}
            <nav className="flex items-center justify-center gap-2 text-xs text-stone-500 font-medium mb-2">
              <Link href="/" className="hover:text-blue-700 transition-colors">
                Beranda
              </Link>
              <span>/</span>
              <span className="text-stone-800 font-semibold">Galeri Dokumentasi</span>
            </nav>

            <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 border border-amber-200/80 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-800">
              <Sparkles className="h-3.5 w-3.5 text-amber-600" />
              <span>Dokumentasi Nyata Tamu & Pemandangan Bali</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-900 leading-tight max-w-4xl mx-auto">
              Setiap Sudut Bali Menyimpan Cerita & Kehangatan
            </h1>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-sans max-w-2xl mx-auto">
              Jelajahi potret asli perjalanan bersama Bli Gede. Dari kemegahan pura sakral, sejuknya air terjun tersembunyi, hingga tawa bahagia keluarga saat menikmati liburan privat tanpa dikejar waktu.
            </p>
          </div>
        </section>

        {/* Gallery Grid & Lightbox Component */}
        <GalleryGrid initialItems={mockGalleryItems} />

        {/* Bottom Direct CTA */}
        <section className="bg-stone-900 text-white py-16">
          <div className="mx-auto max-w-4xl px-4 text-center space-y-6">
            <h2 className="font-serif text-2xl sm:text-4xl font-bold">
              Tertarik Mengunjungi Spot Foto di Atas?
            </h2>
            <p className="text-sm sm:text-base text-stone-300 max-w-xl mx-auto">
              Beri tahu Bli Gede tempat-tempat yang paling menarik perhatian Anda. Bli Gede akan menyusun rute paling efisien dan membantu mengambil foto terbaik Anda di sana.
            </p>
            <div className="pt-2">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full bg-emerald-600 px-8 py-4 text-base font-bold text-white shadow-xl hover:bg-emerald-500 transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
                <span>Konsultasi Rute Foto via WhatsApp</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
