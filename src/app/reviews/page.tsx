import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import ReviewsFilterableList from "@/components/reviews/ReviewsFilterableList";
import { mockReviews, mockGuideProfile } from "@/data/mock-data";
import { Star, CheckCircle2, ChevronRight, MessageCircle, Sparkles, Award, ShieldCheck, HeartHandshake } from "lucide-react";
import { getGeneralConsultationUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Ulasan & Testimoni Tamu Bintang 5 — Gede Bali Guide",
  description:
    "Kumpulan cerita & ulasan bintang 5 dari wisatawan nyata yang menjelajahi Bali bersama Gede Sudiartana, private tour guide berlisensi resmi HPI Bali.",
  keywords: [
    "Ulasan Tour Guide Bali",
    "Testimoni Gede Bali Guide",
    "Review Private Tour Bali",
    "Pemandu Wisata Bali Terbaik",
    "Liburan Bali Rekomendasi",
    "Ulasan Sewa Mobil Bali Supir",
  ],
  alternates: {
    canonical: "https://gedebaliguide.com/reviews",
  },
  openGraph: {
    title: "Ulasan & Testimoni Tamu Bintang 5 — Gede Bali Guide",
    description:
      "Baca pengalaman berkesan wisatawan keluarga, pasangan, dan pelancong dunia bersama Gede Sudiartana di Bali. 100% tur privat tanpa toko komisi.",
    url: "https://gedebaliguide.com/reviews",
    siteName: "Gede Bali Guide",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&auto=format&fit=crop&q=80",
        width: 1200,
        height: 630,
        alt: "Ulasan Bintang 5 Gede Bali Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ulasan & Testimoni Tamu Bintang 5 — Gede Bali Guide",
    description:
      "Pengalaman nyata berlibur di Bali bersama Bli Gede Sudiartana, tour guide resmi HPI Bali.",
    images: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&auto=format&fit=crop&q=80",
    ],
  },
};

export default function ReviewsPage() {
  const waUrl = getGeneralConsultationUrl("reviews");
  const approvedReviews = mockReviews.filter((r) => r.isApproved);
  const averageRating = (
    approvedReviews.reduce((acc, r) => acc + r.rating, 0) / approvedReviews.length
  ).toFixed(1);

  const reviewsJsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": "https://gedebaliguide.com/#organization",
    name: "Gede Bali Guide",
    url: "https://gedebaliguide.com",
    telephone: mockGuideProfile.phone,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: averageRating,
      reviewCount: "48",
      bestRating: "5",
      worstRating: "1",
    },
    review: approvedReviews.map((r) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: r.authorName,
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.rating.toString(),
        bestRating: "5",
      },
      reviewBody: r.content,
    })),
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#fafaf9] text-stone-900 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsJsonLd) }}
      />

      <main className="flex-1 pb-20">
        {/* Breadcrumb Navigation */}
        <div className="border-b border-stone-200/80 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3.5">
            <nav className="flex items-center gap-2 text-xs font-medium text-stone-500">
              <Link href="/" className="hover:text-[#1878B8] transition-colors">
                Beranda
              </Link>
              <ChevronRight className="h-3.5 w-3.5 text-stone-400" />
              <span className="text-stone-900 font-semibold">Ulasan Tamu</span>
            </nav>
          </div>
        </div>

        {/* Hero Header */}
        <section className="bg-gradient-to-b from-stone-100/60 via-[#fafaf9] to-[#fafaf9] border-b border-stone-200/70 py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#E8F7F1] border border-[#0C8C5E]/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#006B49]">
                  <Sparkles className="h-3.5 w-3.5 text-[#0C8C5E]" />
                  <span>Testimoni Autentik & Terverifikasi</span>
                </div>
                <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-900 leading-tight">
                  Cerita Liburan Nyata Bersama Bli Gede
                </h1>
                <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-2xl font-sans">
                  Kenyamanan, kehangatan keluarga, dan wawasan budaya tanpa komisi calo adalah janji kami. Simak apa kata para tamu yang telah mempercayakan perjalanan mereka di Pulau Dewata.
                </p>
              </div>

              {/* Rating Summary Card */}
              <div className="lg:col-span-5">
                <div className="rounded-3xl border border-stone-200/90 bg-white p-6 sm:p-7 shadow-lg flex flex-col sm:flex-row items-center gap-6">
                  <div className="text-center sm:border-r border-stone-100 sm:pr-6 shrink-0">
                    <span className="font-serif text-5xl font-bold text-stone-900">{averageRating}</span>
                    <div className="flex items-center gap-1 justify-center mt-2">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="h-4 w-4 fill-[#E67E22] text-[#E67E22]" />
                      ))}
                    </div>
                    <span className="block text-[11px] text-stone-400 mt-1 font-semibold uppercase tracking-wider">
                      Skor Sempurna
                    </span>
                  </div>

                  <div className="text-xs space-y-2 flex-1">
                    <p className="font-bold text-stone-900 text-sm">100% Tamu Puas & Merekomendasikan</p>
                    <p className="text-stone-500 leading-relaxed">
                      Diambil dari {approvedReviews.length} ulasan terverifikasi wisatawan keluarga, pasangan, dan solo traveler.
                    </p>
                    <div className="pt-1 flex items-center gap-2 text-[#0C8C5E] font-semibold">
                      <ShieldCheck className="h-4 w-4 shrink-0" />
                      <span>Lisensi Resmi HPI Bali Terverifikasi</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filterable Reviews Grid */}
        <ReviewsFilterableList initialReviews={approvedReviews} />

        {/* Bottom Direct CTA */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10">
          <div className="rounded-3xl bg-stone-900 text-white p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
            <div className="space-y-2 max-w-xl text-center md:text-left">
              <span className="text-xs uppercase tracking-wider text-[#E67E22] font-semibold">
                Rute Eksklusif Keluarga Anda
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold">
                Ingin Merasakan Pengalaman Liburan Menyenangkan yang Sama?
              </h2>
              <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                Rencanakan waktu liburan privat Anda di Bali bersama Bli Gede. Rute fleksibel, mobil ber-AC nyaman, dan tanpa paksaan belanja.
              </p>
            </div>

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 rounded-2xl bg-[#E67E22] hover:bg-[#D35400] px-7 py-4 text-sm sm:text-base font-bold text-white shadow-xl shadow-[#E67E22]/30 active:scale-95 transition-all shrink-0 cursor-pointer"
            >
              <MessageCircle className="h-5 w-5" />
              <span>Konsultasi Tur via WhatsApp</span>
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
