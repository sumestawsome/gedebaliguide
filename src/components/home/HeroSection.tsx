"use client";

import React from "react";
import Link from "next/link";
import { MessageCircle, Compass, Star, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { mockGuideProfile } from "@/data/mock-data";
import { HeroConfig, WhatsAppConfig } from "@/types";
import { getGeneralConsultationUrl } from "@/lib/whatsapp";

const DESTINATION_SLIDES = [
  {
    id: 1,
    title: "Pura Ulun Danu Beratan, Bedugul",
    tag: "📍 Ulun Danu Beratan, Bedugul",
    imageUrl:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1000&auto=format&fit=crop&q=85",
  },
  {
    id: 2,
    title: "Pantai Melasti & Tebing Ungasan",
    tag: "📍 Pantai Melasti, Ungasan",
    imageUrl:
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=1000&auto=format&fit=crop&q=85",
  },
  {
    id: 3,
    title: "Terasering Tegalalang, Ubud",
    tag: "📍 Terasering Tegalalang, Ubud",
    imageUrl:
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=1000&auto=format&fit=crop&q=85",
  },
];

interface HeroSectionProps {
  heroConfig?: HeroConfig;
  whatsAppConfig?: WhatsAppConfig;
}

export default function HeroSection({ heroConfig }: HeroSectionProps = {}) {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % DESTINATION_SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const waUrl = getGeneralConsultationUrl("hero");
  const guideName = heroConfig?.guideName || mockGuideProfile.name;
  const description = heroConfig?.description || mockGuideProfile.bio;
  const featureChecklist = heroConfig?.featureChecklist || [
    "100% Tur Privat (Hanya Rombongan Anda)",
    "Mobil MPV/SUV Ber-AC Dingin & Terawat",
    "Rute Fleksibel & Bebas Request Spot Foto",
    "Tanpa Kewajiban Belanja Toko Oleh-Oleh",
  ];

  return (
    <section className="relative overflow-hidden bg-[var(--canvas)] pt-8 pb-16 md:pt-14 md:pb-24 lg:pt-16 lg:pb-28">
      {/* Subtle decorative background circles */}
      <div className="absolute top-0 right-1/4 -z-10 h-72 w-72 rounded-full bg-[var(--brand-blue-light)]/60 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-10 -z-10 h-80 w-80 rounded-full bg-[var(--brand-green-light)]/50 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Sapaan & Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-6 lg:col-span-7"
          >
            {/* Sapaan Personal */}
            <div className="mb-4">
              <p className="font-serif italic text-base sm:text-lg text-[var(--brand-blue)] font-normal tracking-wide">
                “Om Swastyastu! Welcome to Bali”
              </p>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-[2.75rem] leading-[1.2] tracking-[-0.025em] text-[var(--text-primary)] font-normal mb-5">
              Jelajahi Pesona Asli Bali Bersama{" "}
              <span className="text-[var(--brand-blue)] font-semibold underline decoration-[var(--brand-blue)]/25 underline-offset-8">
                {guideName}
              </span>
            </h1>

            {/* Sapaan & Nilai Tambah */}
            <p className="text-base sm:text-[17px] text-[var(--text-muted)] leading-relaxed max-w-2xl font-sans">
              {description}
            </p>

            {/* Feature Highlights Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs sm:text-sm text-[var(--text-primary)] font-medium">
              {featureChecklist.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-[var(--brand-green)] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons (Standarisasi Ukuran h-11, Primary Biru Samudra) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-3">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 h-11 px-5 py-2.5 rounded-xl bg-[var(--brand-blue)] hover:bg-[#0F4C81] text-white font-medium text-sm shadow-[0_2px_8px_rgba(24,120,184,0.25)] transition-all cursor-pointer"
              >
                <MessageCircle className="h-4.5 w-4.5" />
                <span>Tanya Ketersediaan via WhatsApp</span>
              </a>

              <Link
                href="/tours"
                className="inline-flex items-center justify-center gap-2 h-11 px-5 py-2.5 rounded-xl border border-[var(--border)] bg-white hover:bg-[var(--surface-alt)] text-[var(--text-primary)] font-medium text-sm transition-colors text-center"
              >
                <Compass className="h-4.5 w-4.5 text-[var(--brand-blue)]" />
                <span>Lihat Katalog Tur Pilihan</span>
              </Link>
            </div>

            {/* Social Proof Bar */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-3 border-t border-[var(--border)]">
              <div className="flex items-center gap-2">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-sm font-bold text-[var(--text-primary)]">5.0 / 5.0</span>
              </div>
              <span className="text-stone-300 hidden sm:inline">•</span>
              <span className="text-xs sm:text-sm text-[var(--text-muted)]">
                Dipercaya ratusan keluarga & solo traveler sejak 2015
              </span>
            </div>
          </motion.div>

          {/* Kolom Visual Kanan: Slideshow Kartu Bertumpuk 3 Lapis (Stacked Card Gallery Slideshow) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="lg:col-span-5 w-full flex flex-col items-center justify-center relative"
          >
            {/* Frame Slideshow dengan Rasio 4:5 */}
            <div
              id="hero-slideshow-frame"
              className="relative w-full max-w-[320px] sm:max-w-[360px] md:max-w-[380px] lg:max-w-[400px] aspect-[4/5] mx-auto select-none flex items-center justify-center"
            >
              {DESTINATION_SLIDES.map((slide, idx) => {
                // offset 0: Kartu Depan (Active Main Card)
                // offset 1: Kartu Belakang Kanan (Next Card Stack)
                // offset 2: Kartu Belakang Kiri (Previous Card Stack)
                const offset = (idx - currentSlide + DESTINATION_SLIDES.length) % DESTINATION_SLIDES.length;

                let stackClasses = "";
                let isInteractive = false;

                if (offset === 0) {
                  // Kartu Depan (Active Main Card): Tengah depan, bingkai putih tebal, luxury shadow
                  stackClasses =
                    "z-20 translate-x-0 rotate-0 scale-100 opacity-100 border-[6px] border-white shadow-[0_20px_50px_rgba(0,0,0,0.12)] pointer-events-auto";
                } else if (offset === 1) {
                  // Kartu Belakang Kanan (Next Card Stack): Miring kanan (rotate-6), scale-85, opacity-65
                  stackClasses =
                    "z-10 translate-x-7 sm:translate-x-10 rotate-6 scale-85 opacity-65 border-4 border-white/90 shadow-[0_12px_30px_rgba(0,0,0,0.08)] cursor-pointer hover:opacity-85 pointer-events-auto";
                  isInteractive = true;
                } else {
                  // Kartu Belakang Kiri (Previous Card Stack): Miring kiri (-rotate-6), scale-85, opacity-65
                  stackClasses =
                    "z-10 -translate-x-7 sm:-translate-x-10 -rotate-6 scale-85 opacity-65 border-4 border-white/90 shadow-[0_12px_30px_rgba(0,0,0,0.08)] cursor-pointer hover:opacity-85 pointer-events-auto";
                  isInteractive = true;
                }

                return (
                  <div
                    key={slide.id}
                    onClick={isInteractive ? () => setCurrentSlide(idx) : undefined}
                    className={`absolute inset-0 w-full h-full rounded-[2rem] overflow-hidden bg-stone-900 transition-all duration-700 ease-in-out transform-gpu origin-center ${stackClasses}`}
                  >
                    {/* Foto Destinasi */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={slide.imageUrl}
                      alt={slide.title}
                      className="w-full h-full object-cover object-center pointer-events-none"
                      loading={idx === 0 ? "eager" : "lazy"}
                    />

                    {/* Shading Halus di Bagian Bawah Foto */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                    {/* Floating Glassmorphism Tag Lokasi di Pojok Kiri Bawah (Khusus Kartu Depan Aktif) */}
                    {offset === 0 && (
                      <div className="absolute bottom-5 left-5 right-auto bg-black/60 backdrop-blur-md text-white text-xs font-medium px-3.5 py-1.5 rounded-full border border-white/20 shadow-lg flex items-center gap-1.5 pointer-events-none transition-all duration-500 z-30">
                        {/* Location Pin Icon Aksen */}
                        <svg
                          width="13"
                          height="13"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          stroke="none"
                          className="text-[var(--brand-accent)] shrink-0"
                        >
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z" />
                        </svg>
                        <span className="truncate tracking-wide text-white font-medium">
                          {slide.tag.replace(/^📍\s*/, "")}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* 3 Indikator Navigasi Titik/Garis Berbentuk Pil (Dash Indicators / Dots) */}
            <div
              className="relative z-30 flex items-center justify-center gap-2 mt-7 pt-1"
              role="tablist"
              aria-label="Slideshow Indikator"
            >
              {DESTINATION_SLIDES.map((slide, idx) => {
                const isActive = idx === currentSlide;
                return (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setCurrentSlide(idx)}
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Slide ${idx + 1}: ${slide.title}`}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "w-8 bg-[var(--brand-blue)]"
                        : "w-2 bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
