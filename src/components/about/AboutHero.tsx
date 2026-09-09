"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Award, Star, MessageCircle, HeartHandshake, Compass, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { mockGuideProfile } from "@/data/mock-data";
import { getGeneralConsultationUrl } from "@/lib/whatsapp";

export default function AboutHero() {
  const waUrl = getGeneralConsultationUrl("about_hero");

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#fafaf9] via-stone-100/60 to-[#fafaf9] pt-10 pb-16 md:pt-16 md:pb-24">
      {/* Background ambient accents */}
      <div className="absolute top-0 right-1/4 -z-10 h-72 w-72 rounded-full bg-amber-100/50 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-10 -z-10 h-80 w-80 rounded-full bg-blue-100/40 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-xs text-stone-500 font-medium">
          <Link href="/" className="hover:text-blue-700 transition-colors">
            Beranda
          </Link>
          <span>/</span>
          <span className="text-stone-800 font-semibold">Tentang Gede</span>
        </nav>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Left Column: Story Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6 lg:col-span-7"
          >
            {/* Accreditation Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-50 px-4 py-1.5 text-xs font-semibold text-emerald-900 shadow-xs">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>Pramuwisata Resmi Berlisensi HPI Bali • No. {mockGuideProfile.licenseNumber}</span>
            </div>

            <div className="space-y-3">
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-900 leading-[1.15]">
                Mengenal Bli Gede,{" "}
                <span className="text-blue-700 italic">Sahabat Lokal & Penjaga Cerita</span> Bali Anda
              </h1>
              <p className="text-stone-600 text-base sm:text-lg leading-relaxed font-sans">
                Lahir dan dibesarkan di Bali dengan tradisi spiritual dan keramahan Pulau Dewata. Lebih dari 10 tahun memandu wisatawan dari seluruh penjuru dunia dengan kenyamanan mobil privat, jadwal fleksibel, dan cerita budaya yang mendalam tanpa perantara calo.
              </p>
            </div>

            {/* Key Stats Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-3 border-y border-stone-200/80">
              <div className="space-y-0.5">
                <span className="block font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                  {mockGuideProfile.experienceYears}+
                </span>
                <span className="text-xs text-stone-500 font-medium">Tahun Pengalaman</span>
              </div>
              <div className="space-y-0.5">
                <span className="block font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                  1.200+
                </span>
                <span className="text-xs text-stone-500 font-medium">Tamu Terpandu</span>
              </div>
              <div className="space-y-0.5">
                <span className="block font-serif text-2xl sm:text-3xl font-bold text-stone-900 flex items-center gap-1">
                  5.0 <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                </span>
                <span className="text-xs text-stone-500 font-medium">Ulasan Bintang 5</span>
              </div>
              <div className="space-y-0.5">
                <span className="block font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                  100%
                </span>
                <span className="text-xs text-stone-500 font-medium">Privat & Fleksibel</span>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3.5 pt-2">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-emerald-600 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-500 transition-all hover:scale-[1.01]"
              >
                <MessageCircle className="h-5 w-5" />
                <span>Konsultasi Liburan Bersama Gede</span>
              </a>
              <Link
                href="/tours"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-stone-300 bg-white px-6 py-3.5 text-base font-semibold text-stone-800 hover:bg-stone-50 hover:border-stone-400 transition-all"
              >
                <Compass className="h-5 w-5 text-blue-700" />
                <span>Lihat Pilihan Rute Tur</span>
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Portrait Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative lg:col-span-5"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Decorative Blur Frame */}
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-amber-200/50 via-blue-200/30 to-emerald-200/50 blur-xl opacity-70" />

              <div className="relative overflow-hidden rounded-3xl border-2 border-white bg-stone-900 shadow-2xl">
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=85"
                    alt={`Profil ${mockGuideProfile.name} - Licensed Bali Tour Guide`}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent" />

                  {/* Floating Top Badge */}
                  <div className="absolute top-4 left-4 rounded-full bg-stone-900/80 backdrop-blur-md px-3.5 py-1 text-xs font-semibold text-amber-300 border border-white/20 flex items-center gap-1.5">
                    <Award className="h-3.5 w-3.5" />
                    <span>HPI Bali Certified</span>
                  </div>

                  {/* Overlay Identity Card */}
                  <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/95 p-4 shadow-xl backdrop-blur-md border border-stone-200">
                    <h3 className="font-serif text-lg font-bold text-stone-900">
                      {mockGuideProfile.name}
                    </h3>
                    <p className="text-xs text-stone-600 font-medium">
                      Pemandu Wisata Resmi Himpunan Pramuwisata Indonesia (HPI)
                    </p>
                    <div className="mt-2 pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                      <span className="text-stone-500">ID Lisensi</span>
                      <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        {mockGuideProfile.licenseNumber}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
