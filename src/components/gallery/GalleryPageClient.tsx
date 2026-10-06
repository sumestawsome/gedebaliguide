"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronRight, MessageCircle, Compass, Sparkles } from "lucide-react";
import Footer from "@/components/layout/Footer";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import { GalleryItem } from "@/types";
import { handleWhatsAppClick } from "@/lib/lead-tracker";

interface GalleryPageClientProps {
  initialItems: GalleryItem[];
}

export default function GalleryPageClient({ initialItems }: GalleryPageClientProps) {
  const [lang, setLang] = useState<"id" | "en">("id");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("app_lang");
      if (saved === "id" || saved === "en") setLang(saved);
    } catch {}
    const handleLang = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.lang === "id" || detail?.lang === "en") {
        setLang(detail.lang);
      }
    };
    window.addEventListener("appLanguageChange", handleLang);
    return () => window.removeEventListener("appLanguageChange", handleLang);
  }, []);

  const isEn = lang === "en";

  const content = {
    id: {
      backHome: "Kembali ke Beranda",
      breadcrumbHome: "Beranda",
      breadcrumbCurrent: "Galeri Perjalanan",
      badge: "DOKUMENTASI ASLI PERJALANAN",
      title: "Setiap Sudut Bali Menyimpan Cerita & Kehangatan",
      subtitle:
        "Jelajahi potret asli perjalanan bersama Bli Gede. Dari kemegahan pura sakral, sejuknya air terjun tersembunyi, hingga tawa bahagia keluarga saat menikmati liburan privat tanpa dikejar waktu.",
      bottomSection: {
        badge: "DOKUMENTASI TANPA BIAYA TAMBAHAN",
        title: "Ingin Mengabadikan Momen Liburan Seindah Ini di Bali?",
        subtitle:
          "Semua paket tur privat bersama Bli Gede sudah termasuk pendampingan dokumentasi foto & video di spot terbaik tanpa biaya fotografer tambahan.",
        btnWa: "Konsultasi via WhatsApp",
        btnTours: "Lihat Pilihan Rute Tur",
      },
    },
    en: {
      backHome: "Back to Home",
      breadcrumbHome: "Home",
      breadcrumbCurrent: "Travel Gallery",
      badge: "AUTHENTIC TRAVEL DOCUMENTATION",
      title: "Every Corner of Bali Holds a Story & Warmth",
      subtitle:
        "Explore real moments captured while traveling with Bli Gede. From grand sacred temples, tranquil hidden waterfalls, to joyful family laughter on an unhurried private holiday.",
      bottomSection: {
        badge: "COMPLIMENTARY PHOTO ASSISTANCE",
        title: "Want to Capture Holiday Moments This Beautiful in Bali?",
        subtitle:
          "All private tour packages with Bli Gede include friendly photo & video documentation assistance at the best spots without extra photographer fees.",
        btnWa: "Consult via WhatsApp",
        btnTours: "Explore Tour Itineraries",
      },
    },
  };

  const t = content[lang];

  return (
    <div className="flex min-h-screen flex-col bg-[#FEFDFB] text-[#08090A] font-sans selection:bg-amber-100 selection:text-amber-900">
      <main className="flex-1">
        {/* ========================================================
            2. HEADER EDITORIAL BERSIH & HANGAT
            ======================================================== */}
        <section className="pt-6 sm:pt-10 pb-4 sm:pb-8 border-b border-[#EBE9E6]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb Responsif */}
            <div className="mb-6 sm:mb-8">
              {/* Mobile (< 768px): Tombol ringkas "← Kembali ke Beranda" */}
              <div className="md:hidden">
                <Link
                  href="/"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5E6965] hover:text-[#0C8C5E] py-1 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>{t.backHome}</span>
                </Link>
              </div>

              {/* Desktop (>= 768px): Beranda / Galeri Perjalanan */}
              <nav aria-label="Breadcrumb" className="hidden md:flex items-center gap-2 text-xs font-medium text-[#5E6965]">
                <Link href="/" className="hover:text-[#0C8C5E] transition-colors">
                  {t.breadcrumbHome}
                </Link>
                <ChevronRight className="w-3.5 h-3.5 text-[#CFCDCA]" />
                <span className="text-[#08090A] font-semibold">
                  {t.breadcrumbCurrent}
                </span>
              </nav>
            </div>

            {/* Header Content */}
            <div className="max-w-3xl space-y-4">
              {/* Badge Tipis Hijau #0C8C5E */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#E8F6F0] text-[#0C8C5E] border border-[#0C8C5E]/20">
                <Sparkles className="w-3.5 h-3.5 text-[#0C8C5E]" />
                <span>{t.badge}</span>
              </div>

              {/* Headline Display (Libre Baskerville) */}
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#08090A] leading-tight tracking-tight">
                {t.title}
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base lg:text-lg text-[#5E6965] leading-relaxed">
                {t.subtitle}
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================
            3 & 4 & 5. FILTER TABS & KISI FOTO EDITORIAL & LIGHTBOX
            ======================================================== */}
        <GalleryGrid initialItems={initialItems} lang={lang} />

        {/* ========================================================
            6. SEKSI BAWAH: AJAKAN DOKUMENTASI LIBURAN
            ======================================================== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="relative overflow-hidden rounded-3xl bg-[#FAF8F5] border border-[#EBE9E6] p-8 sm:p-12 lg:p-16 text-center shadow-xs">
            {/* Soft decorative background circles */}
            <div className="absolute -top-20 -left-20 w-60 h-60 rounded-full bg-[#0C8C5E]/5 blur-2xl pointer-events-none" />
            <div className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-[#E67E22]/5 blur-2xl pointer-events-none" />

            <div className="relative max-w-2xl mx-auto space-y-4">
              <span className="inline-block px-3 py-1 rounded-full bg-[#E8F6F0] text-[#0C8C5E] text-xs font-semibold tracking-wider uppercase border border-[#0C8C5E]/20">
                {t.bottomSection.badge}
              </span>

              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#08090A] leading-tight">
                {t.bottomSection.title}
              </h2>

              <p className="text-sm sm:text-base text-[#5E6965] leading-relaxed max-w-xl mx-auto">
                {t.bottomSection.subtitle}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
                <button
                  type="button"
                  onClick={() =>
                    handleWhatsAppClick(
                      "/gallery",
                      "Konsultasi Dokumentasi Liburan",
                      isEn
                        ? "Hello Bli Gede, I'm interested in holiday photo documentation in Bali. Could you please share recommendations and your availability?"
                        : "Halo Bli Gede, saya tertarik dengan paket tur privat dan dokumentasi foto di Bali. Boleh minta info ketersediaan jadwal dan rekomendasinya?"
                    )
                  }
                  className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-[#E67E22] hover:bg-[#D35400] text-white font-semibold text-base shadow-[0_4px_14px_rgba(230,126,34,0.28)] transition-all cursor-pointer transform hover:scale-[1.02]"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>{t.bottomSection.btnWa}</span>
                </button>

                <Link
                  href="/tours"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl border border-[#EBE9E6] text-[#08090A] hover:text-[#0C8C5E] hover:bg-white font-semibold text-base transition-colors bg-white/70"
                >
                  <Compass className="w-4 h-4" />
                  <span>{t.bottomSection.btnTours}</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
