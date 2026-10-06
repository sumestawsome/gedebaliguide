"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import ToursCatalog from "@/components/tours/ToursCatalog";
import DirectPricingBanner from "@/components/tours/DirectPricingBanner";
import { Tour } from "@/types";

interface ToursPageClientProps {
  tours: Tour[];
}

export default function ToursPageClient({ tours }: ToursPageClientProps) {
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

  const headerContent = {
    id: {
      breadcrumbHome: "Beranda",
      breadcrumbCurrent: "Katalog Tur",
      badge: "Katalog Tur Eksklusif Bali",
      title: "Pilih Perjalanan Impian Anda di Pulau Dewata",
      subtitle:
        "Setiap rute di bawah ini dirancang fleksibel dengan kenyamanan maksimal. Semua paket mencakup unit mobil privat ber-AC, BBM, biaya parkir, dan pendampingan pemandu berlisensi resmi HPI Bali tanpa perantara calo.",
      trustPoints: [
        "✓ Lisensi Resmi HPI Bali",
        "✓ 100% Mobil Ber-AC Privat",
        "✓ Rute Fleksibel & Bebas Request Spot",
      ],
    },
    en: {
      breadcrumbHome: "Home",
      breadcrumbCurrent: "Tour Catalog",
      badge: "Exclusive Bali Tour Catalog",
      title: "Choose Your Dream Journey Across the Island of Gods",
      subtitle:
        "Every private itinerary is crafted with comfort and flexibility. Rates include clean air-conditioned private vehicle, fuel, parking fees, and officially licensed HPI Balinese driver-guide without intermediary commissions.",
      trustPoints: [
        "✓ Licensed HPI Bali Guide",
        "✓ 100% Private A/C Car",
        "✓ Flexible Route & Free Photo Stops",
      ],
    },
  };

  const t = headerContent[lang];

  return (
    <div className="flex min-h-screen flex-col bg-[#FEFDFB] text-[#121715] font-sans selection:bg-amber-100 selection:text-amber-900">
      <main className="flex-1 pb-24 sm:pb-28">
        {/* ========================================================
            2. HEADER KATALOG TUR (Luxury Travel Editorial)
            ======================================================== */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF8F5] via-[#FEFDFB] to-[#FEFDFB] pt-8 pb-10 sm:pt-12 sm:pb-14 border-b border-[#EBE9E6]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-4">
              {/* Breadcrumb Rapi */}
              <nav
                aria-label="Breadcrumb"
                className="flex items-center gap-2 text-xs text-[#5E6965] font-medium"
              >
                <Link
                  href="/"
                  className="hover:text-[#0C8C5E] transition-colors"
                >
                  {t.breadcrumbHome}
                </Link>
                <span className="text-[#CFCDCA]">/</span>
                <span className="text-[#08090A] font-semibold">
                  {t.breadcrumbCurrent}
                </span>
              </nav>

              {/* Badge Tipis Editorial di Atas Judul */}
              <div className="inline-flex items-center gap-2 rounded-full bg-[#E8F7F1] border border-[#0C8C5E]/20 px-3 py-1 text-xs font-semibold text-[#006B49] tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0C8C5E]" />
                <span>{t.badge}</span>
              </div>

              {/* Headline Utama (Libre Baskerville) */}
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-[-0.03em] text-[#08090A] leading-[1.15]">
                {t.title}
              </h1>

              {/* Subtitle Deskriptif yang Hangat */}
              <p className="text-sm sm:text-base text-[#5E6965] leading-relaxed max-w-2xl font-sans">
                {t.subtitle}
              </p>

              {/* Trust Highlights 3 Poin Horizontal yang Bersih */}
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-2 text-xs font-semibold text-[#08090A]">
                {t.trustPoints.map((point, pIdx) => (
                  <span
                    key={pIdx}
                    className="inline-flex items-center gap-1.5 bg-white border border-[#EBE9E6] rounded-lg px-3 py-1.5 shadow-2xs"
                  >
                    <span className="text-[#0C8C5E] font-bold">✓</span>
                    <span>{point.replace("✓ ", "")}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            3 & 4. SEKSI KATALOG: FILTER TERPADU & GRID KARTU TUR
            ======================================================== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 space-y-12 sm:space-y-16">
          <ToursCatalog initialTours={tours} lang={lang} />

          {/* 5. SEKSI BAWAH: GARANSI TRANSPARANSI HARGA */}
          <DirectPricingBanner lang={lang} />
        </section>
      </main>

      <Footer />
    </div>
  );
}
