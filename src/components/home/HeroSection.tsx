"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Compass, Star, Sparkles, ShieldCheck, MapPin, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { mockGuideProfile } from "@/data/mock-data";
import { HeroConfig, WhatsAppConfig } from "@/types";
import { getGeneralConsultationUrl } from "@/lib/whatsapp";

interface HeroSectionProps {
  heroConfig?: HeroConfig;
  whatsAppConfig?: WhatsAppConfig;
}

export default function HeroSection({ heroConfig, whatsAppConfig }: HeroSectionProps = {}) {
  const waUrl = getGeneralConsultationUrl("hero");
  const guideName = heroConfig?.guideName || mockGuideProfile.name;
  const badgeText = heroConfig?.badgeText || "Tour Guide Resmi Berlisensi HPI Bali • Tanpa Biaya Calo";
  const greeting = heroConfig?.greeting || "Om Swastyastu!";
  const welcomeText = heroConfig?.welcomeText || "Selamat Datang di Bali";
  const description = heroConfig?.description || mockGuideProfile.bio;
  const avatarUrl = heroConfig?.avatarUrl || mockGuideProfile.avatarUrl;
  const licenseNumber = heroConfig?.licenseNumber || mockGuideProfile.licenseNumber;
  const experienceYears = heroConfig?.experienceYears || mockGuideProfile.experienceYears;
  const featureChecklist = heroConfig?.featureChecklist || [
    "100% Tur Privat (Hanya Rombongan Anda)",
    "Mobil MPV/SUV Ber-AC Dingin & Terawat",
    "Rute Fleksibel & Bebas Request Spot Foto",
    "Tanpa Kewajiban Belanja Toko Oleh-Oleh",
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#fafaf9] via-stone-100/50 to-[#fafaf9] pt-8 pb-16 md:pt-14 md:pb-24 lg:pt-16 lg:pb-28">
      {/* Subtle decorative background circles */}
      <div className="absolute top-0 right-1/4 -z-10 h-72 w-72 rounded-full bg-amber-100/40 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-10 -z-10 h-80 w-80 rounded-full bg-blue-100/30 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Sapaan & Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-6 lg:col-span-7"
          >
            {/* Trust Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/80 bg-amber-50/90 px-4 py-1.5 text-xs font-semibold text-amber-900 shadow-sm backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-amber-600 animate-pulse" />
              <span>{badgeText}</span>
            </div>

            {/* Sapaan Personal */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm sm:text-base font-semibold text-blue-800">
                <span>{greeting}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                <span>{welcomeText}</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-900 leading-[1.14]">
                Jelajahi Pesona Asli Bali Bersama{" "}
                <span className="relative inline-block text-blue-700 italic">
                  {guideName}
                  <svg
                    className="absolute -bottom-1.5 left-0 w-full text-amber-400"
                    height="8"
                    viewBox="0 0 100 8"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0,5 Q25,0 50,5 T100,5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    />
                  </svg>
                </span>
              </h1>
            </div>

            {/* Sapaan & Nilai Tambah */}
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl font-sans">
              {description}
            </p>

            {/* Feature Highlights Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs sm:text-sm text-stone-700 font-medium">
              {featureChecklist.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-3">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-emerald-600 px-6 py-4 text-base font-bold text-white shadow-lg shadow-emerald-700/20 hover:bg-emerald-700 hover:shadow-xl transition-all active:scale-[0.98]"
              >
                <MessageCircle className="h-5 w-5" />
                <span>Tanya Ketersediaan via WhatsApp</span>
              </a>

              <Link
                href="/tours"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-stone-300 bg-white px-6 py-4 text-base font-semibold text-stone-800 shadow-sm hover:bg-stone-50 hover:border-stone-400 transition-all active:scale-[0.98]"
              >
                <Compass className="h-5 w-5 text-blue-700" />
                <span>Lihat Katalog Tur Pilihan</span>
              </Link>
            </div>

            {/* Social Proof Bar */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-3 border-t border-stone-200">
              <div className="flex items-center gap-2">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-sm font-bold text-stone-900">5.0 / 5.0</span>
              </div>
              <span className="text-stone-300 hidden sm:inline">•</span>
              <span className="text-xs sm:text-sm text-stone-600">
                Dipercaya ratusan keluarga & solo traveler sejak 2015
              </span>
            </div>
          </motion.div>

          {/* Right Column: Authentic Bali Visual Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="relative lg:col-span-5"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Decorative Frame Glow */}
              <div className="absolute -inset-2.5 rounded-3xl bg-gradient-to-tr from-amber-300/30 via-blue-400/20 to-emerald-300/30 blur-xl opacity-70" />

              {/* Main Image Container */}
              <div className="relative overflow-hidden rounded-3xl border-2 border-white bg-stone-900 shadow-2xl">
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=900&auto=format&fit=crop&q=85"
                    alt="Pemandangan Pura Ulun Danu Beratan Bali - Tur bersama Gede Sudiartana"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />

                  {/* Shading Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/25 to-stone-950/10" />

                  {/* Top Floating Badge: Location Tag */}
                  <div className="absolute top-4 left-4 flex items-center gap-1.5 rounded-full bg-stone-900/80 px-3 py-1 text-xs font-medium text-white backdrop-blur-md border border-white/20">
                    <MapPin className="h-3 w-3 text-amber-400" />
                    <span>Bali, Indonesia</span>
                  </div>

                  {/* Top Floating Badge: HPI Badge */}
                  <div className="absolute top-4 right-4 flex items-center gap-1 rounded-full bg-emerald-700/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md shadow-md">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>Lisensi HPI</span>
                  </div>

                  {/* Bottom Personal Identity Card */}
                  <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/95 p-4 shadow-xl backdrop-blur-md border border-stone-200">
                    <div className="flex items-center gap-3.5">
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-blue-600 shadow-md">
                        <Image
                          src={avatarUrl}
                          alt={`Foto Profil ${guideName}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-serif text-base font-bold text-stone-900 truncate">
                            {guideName}
                          </h3>
                          <ShieldCheck className="h-4 w-4 text-blue-600 shrink-0" />
                        </div>
                        <p className="text-xs text-stone-500 truncate">
                          Licensed Bali Tour Guide (HPI Bali)
                        </p>
                        <p className="text-[11px] font-semibold text-emerald-700 pt-0.5">
                          No. Lisensi: {licenseNumber}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Years Experience Floating Tag */}
              <div className="absolute -bottom-3 -right-2 rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-white shadow-lg sm:block border-2 border-white">
                Pengalaman {experienceYears}+ Tahun
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
