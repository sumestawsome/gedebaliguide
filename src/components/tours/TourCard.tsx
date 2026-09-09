"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, Users, Star, ArrowRight, MessageCircle, Check, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Tour } from "@/types";
import { getTourInquiryUrl } from "@/lib/whatsapp";

interface TourCardProps {
  tour: Tour;
  priority?: boolean;
}

export default function TourCard({ tour, priority = false }: TourCardProps) {
  const waUrl = getTourInquiryUrl(tour.name);

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
        return "Budaya";
      case "adventure":
        return "Petualangan";
      case "nature":
        return "Alam";
      case "honeymoon":
        return "Romantis";
      case "heritage":
        return "Warisan Sejarah";
      default:
        return "Tur Privat";
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col h-full overflow-hidden rounded-3xl border border-stone-200/90 bg-white shadow-md hover:shadow-2xl transition-all duration-300 group"
    >
      {/* Cover Image */}
      <Link
        href={`/tours/${tour.slug}`}
        className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100 block"
      >
        <Image
          src={tour.coverImage}
          alt={tour.name}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-black/20" />

        {/* Badges: Area & Popular */}
        <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
          <span className="rounded-full bg-stone-900/80 backdrop-blur-md px-3 py-1 text-xs font-semibold text-white border border-white/20">
            {tour.area}
          </span>
          {tour.featured && (
            <span className="flex items-center gap-1 rounded-full bg-amber-500 px-2.5 py-1 text-[11px] font-bold text-white shadow-sm">
              <Sparkles className="h-3 w-3" />
              <span>Populer</span>
            </span>
          )}
        </div>

        {/* Rating Badge */}
        <div className="absolute top-3.5 right-3.5 flex items-center gap-1 rounded-full bg-white/95 backdrop-blur-md px-2.5 py-1 text-xs font-bold text-stone-900 shadow-md">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          <span>{tour.rating.toFixed(1)}</span>
          <span className="text-[10px] text-stone-500 font-normal">
            ({tour.reviewCount})
          </span>
        </div>

        {/* Category on Image */}
        <div className="absolute bottom-3 left-3.5 text-xs font-semibold text-amber-200">
          {getCategoryLabel(tour.category)}
        </div>

        {/* Quick WhatsApp Inquiry Action on Image */}
        <div
          onClick={(e) => {
            e.preventDefault();
            window.open(waUrl, "_blank", "noopener,noreferrer");
          }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              window.open(waUrl, "_blank", "noopener,noreferrer");
            }
          }}
          aria-label={`Chat WhatsApp cepat untuk tur ${tour.name}`}
          title="Tanya ketersediaan tur via WhatsApp"
          className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg hover:bg-emerald-500 hover:scale-110 active:scale-95 transition-all cursor-pointer z-10"
        >
          <MessageCircle className="h-4 w-4" />
        </div>
      </Link>

      {/* Card Content */}
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        {/* Meta: Duration & Capacity */}
        <div className="flex items-center gap-3.5 text-xs font-medium text-stone-500 mb-2.5">
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-blue-700" />
            {tour.duration}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5 text-blue-700" />
            Maks {tour.maximumGuests} Tamu
          </span>
        </div>

        {/* Title */}
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 leading-snug group-hover:text-blue-700 transition-colors">
          <Link href={`/tours/${tour.slug}`}>
            {tour.name}
          </Link>
        </h3>

        {/* Tagline */}
        <p className="mt-2 text-sm text-stone-600 line-clamp-2 leading-relaxed">
          {tour.tagline}
        </p>

        {/* Highlights Spot Tags */}
        <div className="mt-4 pt-3 border-t border-stone-100">
          <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-wide mb-1.5">
            Spot Dikunjungi:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {tour.highlights.slice(0, 3).map((hl, i) => (
              <span
                key={i}
                className="rounded-lg bg-stone-100 border border-stone-200/70 px-2.5 py-0.5 text-xs text-stone-700 font-medium"
              >
                {hl}
              </span>
            ))}
          </div>
        </div>

        {/* Guaranteed Inclusions */}
        <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-700 font-medium">
          <Check className="h-3.5 w-3.5 shrink-0" />
          <span>Mobil Ber-AC, Driver Guide, BBM & Parkir</span>
        </div>

        {/* Pricing & Actions */}
        <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between gap-3 mt-auto">
          <div>
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="block text-[10px] font-semibold uppercase tracking-wider text-stone-400">
                Harga Langsung
              </span>
              <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1 py-0.2 rounded border border-emerald-200/80">
                Tanpa Calo
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
                {formatPrice(tour.price)}
              </span>
              <span className="text-xs text-stone-500 font-medium">
                {tour.priceType === "per_person" ? "/ orang" : "/ mobil"}
              </span>
            </div>
            <span className="block text-[10px] text-stone-400 font-medium">
              Tanpa DP • Bayar Saat Tur
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Direct WhatsApp CTA */}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Pesan ${tour.name} via WhatsApp`}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-3 py-2 sm:px-3.5 sm:py-2.5 text-xs font-bold text-white shadow-xs hover:bg-emerald-700 active:scale-95 transition-all shrink-0"
            >
              <MessageCircle className="h-4 w-4 shrink-0" />
              <span>Pesan WA</span>
            </a>

            {/* View Detail Button */}
            <Link
              href={`/tours/${tour.slug}`}
              className="inline-flex items-center justify-center gap-1 rounded-xl bg-stone-900 px-3 py-2 sm:px-3.5 sm:py-2.5 text-xs font-semibold text-white hover:bg-blue-700 active:scale-95 transition-all shrink-0"
            >
              <span>Detail</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
