"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, Users, Star, ArrowRight, MessageCircle, Sparkles, Check, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { mockFeaturedTours } from "@/data/mock-data";
import { getTourInquiryUrl } from "@/lib/whatsapp";

export default function FeaturedToursSection() {
  const activeFeaturedTours = mockFeaturedTours.filter(
    (tour) => tour.isActive && tour.featured
  );

  if (!activeFeaturedTours || activeFeaturedTours.length === 0) {
    return null;
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "culture":
        return "Budaya & Tradisi";
      case "adventure":
        return "Petualangan & Sunset";
      case "nature":
        return "Alam & Pegunungan";
      case "honeymoon":
        return "Romantis & Pasangan";
      default:
        return "Tur Eksklusif";
    }
  };

  return (
    <section className="py-16 md:py-24 bg-[#fafaf9]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-200/80 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-blue-800">
              <Sparkles className="h-3.5 w-3.5 text-blue-600" />
              <span>Paket Tur Privat Terfavorit</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 leading-tight">
              Pilihan Tur Eksklusif di Bali Tanpa Ribet
            </h2>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-sans">
              Setiap tur 100% privat khusus rombongan Anda. Harga per mobil transparan mencakup bensin, parkir, dan didampingi Bli Gede sebagai tour guide berlisensi.
            </p>
          </div>

          <Link
            href="/tours"
            className="inline-flex items-center gap-2 rounded-xl border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-stone-800 shadow-xs hover:bg-stone-50 hover:border-stone-400 transition-all group shrink-0"
          >
            <span>Lihat Semua Katalog Tur</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 text-blue-700" />
          </Link>
        </div>

        {/* Tour Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeFeaturedTours.map((tour, index) => {
            const waInquiryUrl = getTourInquiryUrl(tour.name);

            return (
              <motion.article
                key={tour.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col overflow-hidden rounded-3xl border border-stone-200/90 bg-white shadow-md hover:shadow-2xl transition-all duration-300 group"
              >
                {/* Tour Cover Image Container */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100">
                  <Image
                    src={tour.coverImage}
                    alt={tour.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Gradient bottom overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-black/20" />

                  {/* Area Badge */}
                  <div className="absolute top-3.5 left-3.5 rounded-full bg-stone-900/80 backdrop-blur-md px-3 py-1 text-xs font-semibold text-white border border-white/20">
                    {tour.area}
                  </div>

                  {/* Rating Badge */}
                  <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur-md px-2.5 py-1 text-xs font-bold text-stone-900 shadow-md">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    <span>{tour.rating.toFixed(1)}</span>
                    <span className="text-[10px] text-stone-500 font-normal">
                      ({tour.reviewCount})
                    </span>
                  </div>

                  {/* Category Pill on Image Bottom */}
                  <div className="absolute bottom-3 left-3.5 text-xs font-medium text-amber-200">
                    {getCategoryLabel(tour.category)}
                  </div>
                </div>

                {/* Card Body */}
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  {/* Meta Specs: Duration & Guests */}
                  <div className="flex items-center gap-4 text-xs font-medium text-stone-500 mb-3">
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-blue-700" />
                      {tour.duration}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5 text-blue-700" />
                      Maks {tour.maximumGuests} Tamu / Mobil
                    </span>
                  </div>

                  {/* Tour Title */}
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 leading-snug group-hover:text-blue-700 transition-colors">
                    <Link href={`/tours/${tour.slug}`}>
                      {tour.name}
                    </Link>
                  </h3>

                  {/* Tagline */}
                  <p className="mt-2.5 text-sm text-stone-600 line-clamp-2 leading-relaxed">
                    {tour.tagline}
                  </p>

                  {/* Highlights Spot Tags */}
                  <div className="mt-4 pt-3 border-t border-stone-100">
                    <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-wide mb-2">
                      Spot Sorotan:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {tour.highlights.slice(0, 3).map((hl, i) => (
                        <span
                          key={i}
                          className="rounded-lg bg-stone-100/90 border border-stone-200/60 px-2.5 py-1 text-xs text-stone-700 font-medium"
                        >
                          {hl}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Key inclusions */}
                  <div className="mt-4 space-y-1 text-xs text-stone-500">
                    <div className="flex items-center gap-1.5 text-emerald-700">
                      <Check className="h-3.5 w-3.5 shrink-0" />
                      <span>Mobil Ber-AC, Driver Guide, BBM & Parkir</span>
                    </div>
                  </div>

                  {/* Pricing and CTAs */}
                  <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between gap-3 mt-auto">
                    <div>
                      <span className="block text-[11px] font-semibold uppercase tracking-wider text-stone-400">
                        Harga Sewa Tur
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
                          {formatPrice(tour.price)}
                        </span>
                        <span className="text-xs text-stone-500 font-medium">
                          / mobil
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {/* Direct WhatsApp CTA */}
                      <a
                        href={waInquiryUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Pesan ${tour.name} via WhatsApp`}
                        className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-3 py-2 sm:px-3.5 sm:py-2.5 text-xs font-bold text-white shadow-xs hover:bg-emerald-700 transition-all active:scale-95 shrink-0"
                      >
                        <MessageCircle className="h-4 w-4 shrink-0" />
                        <span>Pesan WA</span>
                      </a>

                      {/* Detail Tour Button */}
                      <Link
                        href={`/tours/${tour.slug}`}
                        className="inline-flex items-center gap-1 rounded-xl bg-stone-900 px-3 py-2.5 text-xs font-semibold text-white hover:bg-blue-700 transition-all"
                      >
                        <span>Detail</span>
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
