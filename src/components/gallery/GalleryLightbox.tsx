"use client";

import React, { useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ChevronLeft, ChevronRight, MapPin, MessageCircle, Compass, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { GalleryItem } from "@/types";
import { handleWhatsAppClick } from "@/lib/lead-tracker";

interface GalleryLightboxProps {
  item: GalleryItem | null;
  items: GalleryItem[];
  onClose: () => void;
  onNavigate: (newItem: GalleryItem) => void;
  lang?: "id" | "en";
}

export default function GalleryLightbox({
  item,
  items,
  onClose,
  onNavigate,
  lang = "id",
}: GalleryLightboxProps) {
  const currentIndex = item ? items.findIndex((i) => i.id === item.id) : -1;
  const totalCount = items.length;

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      onNavigate(items[currentIndex - 1]);
    } else {
      onNavigate(items[totalCount - 1]);
    }
  }, [currentIndex, items, totalCount, onNavigate]);

  const handleNext = useCallback(() => {
    if (currentIndex < totalCount - 1) {
      onNavigate(items[currentIndex + 1]);
    } else {
      onNavigate(items[0]);
    }
  }, [currentIndex, items, totalCount, onNavigate]);

  // Keyboard navigation
  useEffect(() => {
    if (!item) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    // Prevent background scrolling while modal is open
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [item, handlePrev, handleNext, onClose]);

  if (!item) return null;

  const isEn = lang === "en";

  const getCategoryLabel = (cat: string) => {
    const c = (cat || "").toLowerCase();
    if (c.includes("budaya") || c.includes("culture") || c.includes("pura")) {
      return isEn ? "Culture & Temples" : "Budaya & Pura";
    }
    if (c.includes("alam") || c.includes("nature") || c.includes("terjun")) {
      return isEn ? "Nature & Waterfalls" : "Alam & Air Terjun";
    }
    if (c.includes("tamu") || c.includes("guests") || c.includes("momen")) {
      return isEn ? "Guest Moments" : "Momen Tamu";
    }
    if (c.includes("aktivitas") || c.includes("activity") || c.includes("seru")) {
      return isEn ? "Exciting Activities" : "Aktivitas Seru";
    }
    return cat;
  };

  const handleDirectWhatsApp = () => {
    const customMsg = isEn
      ? `Hello Bli Gede, I'm interested in visiting *${item.title}* (${item.location}) after seeing it in your website gallery. Could we include this spot in our private tour itinerary?`
      : `Halo Bli Gede, saya tertarik mengunjungi *${item.title}* (${item.location}) setelah melihat galerinya di website. Apakah spot ini bisa dimasukkan ke dalam paket tur saya?`;

    handleWhatsAppClick("/gallery", `Tanya Spot: ${item.title}`, customMsg);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md">
        {/* Backdrop click to close */}
        <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 10 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative z-10 w-full max-w-5xl max-h-[92vh] flex flex-col md:flex-row rounded-3xl overflow-hidden bg-[#121715] border border-white/10 shadow-2xl text-white"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label={isEn ? "Close dialog" : "Tutup foto"}
            className="absolute top-4 right-4 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white hover:bg-[#E67E22] transition-colors border border-white/20 shadow-md cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Left / Top: High-Res Image with Prev/Next Controls */}
          <div className="relative w-full md:w-3/5 bg-black/95 aspect-[4/3] md:aspect-auto flex items-center justify-center overflow-hidden">
            <Image
              src={item.imageUrl}
              alt={item.alt || item.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-contain"
            />

            {/* Navigation Arrows */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label={isEn ? "Previous photo" : "Foto sebelumnya"}
              className="absolute left-3 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-black/60 text-white hover:bg-white/20 transition-all border border-white/15 cursor-pointer backdrop-blur-sm"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              aria-label={isEn ? "Next photo" : "Foto selanjutnya"}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-black/60 text-white hover:bg-white/20 transition-all border border-white/15 cursor-pointer backdrop-blur-sm"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Counter */}
            <div className="absolute bottom-3 left-3 rounded-full bg-black/70 px-3.5 py-1 text-xs font-medium text-stone-300 border border-white/10 backdrop-blur-sm">
              {currentIndex + 1} / {totalCount}
            </div>
          </div>

          {/* Right / Bottom: Details & High-Conversion WhatsApp CTA */}
          <div className="w-full md:w-2/5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[45vh] md:max-h-[85vh] bg-[#121715]/95 space-y-6">
            <div className="space-y-4">
              {/* Badge Kategori & Lokasi */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1878B8]/20 px-3 py-1 text-xs font-semibold text-[#80C5F6] border border-[#1878B8]/30">
                  <MapPin className="h-3.5 w-3.5 text-[#60B3F0]" />
                  <span>{item.location}</span>
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-stone-300">
                  {getCategoryLabel(item.category)}
                </span>
              </div>

              {/* Judul Foto (Libre Baskerville) */}
              <div className="space-y-3">
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-snug">
                  {item.title}
                </h3>
                {/* Narasi / Caption Lengkap */}
                <p className="text-sm sm:text-base text-stone-300 font-sans leading-relaxed">
                  {item.caption}
                </p>
              </div>

              {/* Note Dokumentasi Asli */}
              <div className="pt-2 text-xs text-stone-400 flex items-center gap-1.5 border-t border-white/10">
                <Sparkles className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                <span>
                  {isEn
                    ? "Authentic tour documentation guided by Bli Gede Sudiartana"
                    : "Foto asli dokumentasi tur bersama Bli Gede Sudiartana"}
                </span>
              </div>
            </div>

            {/* Actions & WhatsApp Conversion Button */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={handleDirectWhatsApp}
                className="w-full flex items-center justify-center gap-2.5 rounded-xl bg-[#E67E22] hover:bg-[#D35400] px-5 py-3.5 text-sm sm:text-base font-semibold text-white shadow-lg shadow-[#E67E22]/30 transition-all cursor-pointer transform hover:scale-[1.02]"
              >
                <MessageCircle className="h-5 w-5" />
                <span>
                  {isEn
                    ? "Plan Tour to This Spot via WhatsApp"
                    : "Rencanakan Tur ke Tempat Ini via WhatsApp"}
                </span>
              </button>

              {item.tourSlug && (
                <Link
                  href={`/tours/${item.tourSlug}`}
                  onClick={onClose}
                  className="w-full flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-xs sm:text-sm font-semibold text-stone-200 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <Compass className="h-4 w-4 text-[#60B3F0]" />
                  <span>
                    {isEn ? "View Related Tour Package" : "Lihat Paket Tur Terkait"}
                  </span>
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
