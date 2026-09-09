import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { HelpCircle, MessageCircle } from "lucide-react";
import FaqAccordion from "@/components/faq/FaqAccordion";
import { getGeneralConsultationUrl } from "@/lib/whatsapp";
import { mockFaqItems } from "@/data/mock-faq";

export const metadata: Metadata = {
  title: "Tanya Jawab (FAQ) Tur Privat Bali — Gede Bali Guide",
  description:
    "Pertanyaan umum seputar booking tur privat Bali bersama Gede Sudiartana: pemesanan tanpa DP, rute fleksibel, mobil ber-AC, dan pemandu resmi HPI Bali.",
  keywords: [
    "FAQ Tour Bali",
    "Tanya Jawab Wisata Bali",
    "Cara Pesan Tour Guide Bali",
    "Sewa Mobil Bali Fleksibel",
    "HPI Bali Guide FAQ",
    "Paket Liburan Bali Tanpa DP",
  ],
  alternates: {
    canonical: "https://gedebaliguide.com/faq",
  },
  openGraph: {
    title: "Tanya Jawab (FAQ) Tur Privat Bali — Gede Bali Guide",
    description:
      "Informasi lengkap seputar pemesanan tanpa perantara, armada mobil ber-AC, biaya transparan, dan fleksibilitas jadwal tur bersama Bli Gede.",
    url: "https://gedebaliguide.com/faq",
    siteName: "Gede Bali Guide",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&auto=format&fit=crop&q=80",
        width: 1200,
        height: 630,
        alt: "Tanya Jawab FAQ Gede Bali Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tanya Jawab (FAQ) Tur Privat Bali — Gede Bali Guide",
    description:
      "Informasi lengkap cara pesan, sistem pembayaran, dan fleksibilitas rute tur Bali bersama Bli Gede.",
    images: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&auto=format&fit=crop&q=80",
    ],
  },
};

export default function FaqPage() {
  const waUrl = getGeneralConsultationUrl("faq");

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://gedebaliguide.com/faq#faqpage",
    mainEntity: mockFaqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#fafaf9] text-stone-900 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Navbar />

      <main className="flex-1 pb-28 sm:pb-20">
        {/* Header Banner */}
        <section className="bg-gradient-to-b from-stone-100/70 via-[#fafaf9] to-[#fafaf9] border-b border-stone-200/70 pt-8 pb-8 sm:pt-12 sm:pb-10 md:pt-16 md:pb-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-3.5 sm:space-y-4">
            {/* Breadcrumb */}
            <nav className="flex items-center justify-center gap-2 text-xs text-stone-500 font-medium mb-1 sm:mb-2">
              <Link href="/" className="hover:text-blue-700 transition-colors">
                Beranda
              </Link>
              <span>/</span>
              <span className="text-stone-800 font-semibold">Tanya Jawab (FAQ)</span>
            </nav>

            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-200/80 px-3 py-1 sm:px-3.5 sm:py-1 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-blue-800">
              <HelpCircle className="h-3.5 w-3.5 text-blue-600" />
              <span>Panduan Lengkap Calon Wisatawan</span>
            </div>

            <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 leading-tight max-w-4xl mx-auto">
              Pertanyaan yang Sering Diajukan Wisatawan
            </h1>

            <p className="text-stone-600 text-xs sm:text-sm md:text-base leading-relaxed font-sans max-w-2xl mx-auto">
              Semua hal penting mengenai sistem pemesanan tanpa perantara, kenyamanan armada mobil ber-AC, hingga fleksibilitas waktu kami rangkum secara transparan.
            </p>
          </div>
        </section>

        {/* FAQ List Container */}
        <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 md:pt-16">
          <FaqAccordion />

          {/* Still Have Questions CTA */}
          <div className="mt-12 sm:mt-14 rounded-3xl bg-stone-900 text-white p-6 sm:p-8 md:p-10 text-center space-y-4 sm:space-y-5 shadow-xl">
            <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold">
              Punya Pertanyaan Lain yang Belum Tercantum?
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 max-w-md mx-auto leading-relaxed">
              Jangan sungkan untuk bertanya langsung kepada Bli Gede lewat WhatsApp. Konsultasi bebas biaya, santai, dan ramah.
            </p>
            <div className="pt-2">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-2xl bg-emerald-600 px-7 py-3.5 sm:py-4 text-sm sm:text-base font-bold text-white shadow-lg hover:bg-emerald-500 transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
                <span>Tanya Bli Gede via WhatsApp</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
