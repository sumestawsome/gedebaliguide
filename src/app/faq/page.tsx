import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import { ArrowLeft, ChevronRight, HelpCircle, MessageCircle } from "lucide-react";
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
    <div className="flex min-h-screen flex-col bg-[#FEFDFB] text-[#08090A] font-sans selection:bg-[#EBF5FB] selection:text-[#1878B8]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <main className="flex-1 pb-28 sm:pb-20">
        {/* Breadcrumb Navigation Responsif */}
        <div className="border-b border-[#EBE9E6] bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3.5">
            {/* Mobile (< 768px) */}
            <div className="md:hidden">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5E6965] hover:text-[#1878B8] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Kembali ke Beranda</span>
              </Link>
            </div>

            {/* Desktop (>= 768px) */}
            <nav aria-label="Breadcrumb" className="hidden md:flex items-center gap-2 text-xs font-medium text-[#5E6965]">
              <Link href="/" className="hover:text-[#1878B8] transition-colors">
                Beranda
              </Link>
              <ChevronRight className="h-3.5 w-3.5 text-[#CFCDCA]" />
              <span className="text-[#08090A] font-semibold">Tanya Jawab (FAQ)</span>
            </nav>
          </div>
        </div>

        {/* Header Banner */}
        <section className="bg-gradient-to-b from-[#FAF8F5] via-[#FEFDFB] to-[#FEFDFB] border-b border-[#EBE9E6] py-10 md:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-3.5 sm:space-y-4">
            <div className="mb-2">
              <span className="font-serif italic text-base sm:text-lg text-[#1878B8] font-normal tracking-wide block">
                “Panduan Lengkap Calon Wisatawan”
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-[-0.03em] text-[#08090A] leading-tight max-w-4xl mx-auto">
              Pertanyaan yang Sering Diajukan Wisatawan
            </h1>

            <p className="text-[#5E6965] text-xs sm:text-sm md:text-base leading-relaxed font-sans max-w-2xl mx-auto">
              Semua hal penting mengenai sistem pemesanan tanpa perantara, kenyamanan armada mobil ber-AC, hingga fleksibilitas waktu kami rangkum secara transparan.
            </p>
          </div>
        </section>

        {/* FAQ List Container */}
        <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 md:pt-16">
          <FaqAccordion />

          {/* Still Have Questions CTA */}
          <div className="mt-12 sm:mt-14 rounded-3xl bg-gradient-to-r from-[#0F4C81] to-[#1878B8] text-white p-6 sm:p-8 md:p-10 text-center space-y-4 sm:space-y-5 shadow-xl">
            <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-normal leading-tight">
              Punya Pertanyaan Lain yang Belum Tercantum?
            </h3>
            <p className="text-xs sm:text-sm text-white/90 max-w-md mx-auto leading-relaxed">
              Jangan sungkan untuk bertanya langsung kepada Bli Gede lewat WhatsApp. Konsultasi bebas biaya, santai, dan ramah.
            </p>
            <div className="pt-2">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl bg-[#E67E22] hover:bg-[#D35400] text-sm sm:text-base font-semibold text-white shadow-[0_4px_16px_rgba(230,126,34,0.3)] transition-all cursor-pointer"
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
