"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, Users, Star, ArrowRight, MapPin } from "lucide-react";
import { Tour } from "@/types";
import { handleWhatsAppClick } from "@/lib/lead-tracker";

interface TourCardProps {
  tour: Tour;
  priority?: boolean;
  lang?: "id" | "en";
}

export default function TourCard({
  tour,
  priority = false,
  lang = "en",
}: TourCardProps) {
  const formatPrice = (price: number) => {
    if (lang === "en") {
      const approxUsd = Math.round(price / 15500);
      return `IDR ${price.toLocaleString("en-US")} (~$${approxUsd} USD)`;
    }
    return `Rp ${Number(price).toLocaleString("id-ID")}`;
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, { id: string; en: string }> = {
      culture: { id: "Budaya", en: "Culture" },
      nature: { id: "Alam & Hutan", en: "Nature" },
      adventure: { id: "Petualangan", en: "Adventure" },
      heritage: { id: "Warisan Sejarah", en: "Heritage" },
      honeymoon: { id: "Romantis", en: "Romantic" },
    };
    return labels[category]?.[lang] || (lang === "id" ? "Tur Privat" : "Private Tour");
  };

  const labels = {
    id: {
      maxGuests: `Maks ${tour.maximumGuests || 5} Tamu`,
      spotsTitle: "Spot Utama:",
      priceUnit: "per mobil · kapasitas s.d. 5 tamu",
      noDpNotice: "Tanpa DP • Pembayaran saat Tur Selesai",
      priceOnRequest: "Tarif Fleksibel / Hubungi WA",
      customRouteNotice: "Rute disesuaikan dengan permintaan Anda",
      freeConsultNotice: "Konsultasi Rute Gratis",
      btnWa: "Pesan via WhatsApp",
      btnConsult: "Konsultasi via WA",
      btnDetail: "Lihat Rute",
      reviewsCount: "ulasan",
    },
    en: {
      maxGuests: `Up to ${tour.maximumGuests || 5} Guests`,
      spotsTitle: "Key Highlights:",
      priceUnit: "per private car · up to 5 guests",
      noDpNotice: "No Deposit • Pay at End of Tour",
      priceOnRequest: "Price on Request / Rates via WA",
      customRouteNotice: "Custom route tailored to your request",
      freeConsultNotice: "Free Itinerary Advice",
      btnWa: "Book via WhatsApp",
      btnConsult: "Consult via WhatsApp",
      btnDetail: "View Route",
      reviewsCount: "reviews",
    },
  };

  const t = labels[lang];

  return (
    <article className="group bg-white border border-[#EBE9E6] rounded-2xl flex flex-col justify-between overflow-hidden shadow-[0_4px_20px_rgba(12,140,94,0.06)] hover:-translate-y-1.5 hover:shadow-[0_12px_36px_rgba(0,0,0,0.08)] transition-all duration-300">
      <div>
        {/* Thumbnail Foto Arched/Rounded dengan Hover Zoom */}
        <Link
          href={`/tours/${tour.slug}`}
          className="relative aspect-[16/10] w-full overflow-hidden bg-[#FAF8F5] block cursor-pointer"
        >
          <Image
            src={tour.coverImage}
            alt={tour.name}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

          {/* Kiri Atas Foto: HANYA Badge Kategori dengan backdrop-blur */}
          <div className="absolute top-3.5 left-3.5 z-10">
            <span className="rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-xs font-medium text-white shadow-xs">
              {getCategoryLabel(tour.category)}
            </span>
          </div>

          {/* Kanan Atas Foto: HANYA Badge Rating Bintang */}
          <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur-md px-2.5 py-1 text-xs font-bold text-[#08090A] shadow-xs z-10">
            <Star className="h-3.5 w-3.5 fill-[#E67E22] text-[#E67E22]" />
            <span>{(tour.rating || 5.0).toFixed(1)}</span>
            <span className="text-[10px] text-[#5E6965] font-normal">
              ({tour.reviewCount || 48} {t.reviewsCount})
            </span>
          </div>
        </Link>

        {/* Konten Kartu */}
        <div className="p-5 sm:p-6 pb-4">
          {/* Baris Meta Rapi: Durasi, Kapasitas, & Nama Wilayah */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 text-xs font-semibold text-[#1878B8] mb-2.5">
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 text-[#1878B8] shrink-0" />
              <span>{tour.duration}</span>
            </span>
            <span className="text-[#CFCDCA] select-none">·</span>
            <span className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5 text-[#1878B8] shrink-0" />
              <span>{t.maxGuests}</span>
            </span>
            {tour.area && (
              <>
                <span className="text-[#CFCDCA] select-none">·</span>
                <span className="flex items-center gap-1 text-[#1878B8]">
                  <MapPin className="h-3.5 w-3.5 text-[#1878B8] shrink-0" />
                  <span>{tour.area}</span>
                </span>
              </>
            )}
          </div>

          {/* Judul Tur (Libre Baskerville / Inter Semibold) */}
          <h3 className="font-serif text-lg sm:text-xl font-bold text-[#08090A] leading-snug group-hover:text-[#1878B8] transition-colors mb-2">
            <Link href={`/tours/${tour.slug}`}>{tour.name}</Link>
          </h3>

          {/* Tagline / Cuplikan Deskripsi */}
          <p className="text-xs sm:text-sm text-[#5E6965] line-clamp-2 leading-relaxed mb-4">
            {tour.tagline || tour.description}
          </p>

          {/* Cuplikan Spot Destinasi Utama (Maksimal 3 Spot) */}
          {tour.highlights && tour.highlights.length > 0 && (
            <div className="pt-3 border-t border-[#EBE9E6]">
              <span className="block text-[11px] font-semibold text-[#5E6965] uppercase tracking-wider mb-2">
                {t.spotsTitle}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {tour.highlights.slice(0, 3).map((spot, sIdx) => (
                  <span
                    key={sIdx}
                    className="inline-block rounded-md bg-[#FAF8F5] border border-[#EBE9E6] px-2.5 py-1 text-[11px] sm:text-xs text-[#121715] font-medium"
                  >
                    {spot}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bagian Bawah: Harga Bertingkat & Tombol Aksi */}
      <div className="p-5 sm:p-6 pt-4 border-t border-[#EBE9E6] bg-[#FAF8F5]">
        {/* Format Tarif Halus Tanpa Angka */}
        <div className="mb-4 space-y-1">
          <span className="inline-block text-base sm:text-lg font-bold text-[#121715] tracking-tight">
            {t.priceOnRequest}
          </span>
          <span className="block text-xs text-[#5E6965] font-medium">
            {t.customRouteNotice}
          </span>
          <span className="block text-[11px] text-[#0C8C5E] font-semibold mt-0.5">
            ✓ {t.freeConsultNotice}
          </span>
        </div>

        {/* 2 Tombol Aksi Berdampingan */}
        <div className="grid grid-cols-2 gap-2.5">
          {/* Tombol Pesan via WhatsApp */}
          <button
            type="button"
            onClick={() => handleWhatsAppClick("/tours", tour.name)}
            className="w-full h-11 flex items-center justify-center gap-1.5 px-3 rounded-xl bg-[#0C8C5E] hover:bg-[#09734C] text-white font-medium text-xs sm:text-sm shadow-xs transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
            <span className="truncate">
              {t.btnWa}
            </span>
          </button>

          {/* Tombol Detail Rute */}
          <Link
            href={`/tours/${tour.slug}`}
            className="w-full h-11 flex items-center justify-center gap-1.5 px-3 rounded-xl bg-white hover:bg-[#FAF8F5] text-[#08090A] border border-[#CFCDCA] font-medium text-xs sm:text-sm transition-colors text-center"
          >
            <span>{t.btnDetail}</span>
            <ArrowRight className="h-3.5 w-3.5 text-[#5E6965]" />
          </Link>
        </div>
      </div>
    </article>
  );
}
