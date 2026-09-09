"use client";

import React, { useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ChevronLeft, ChevronRight, MapPin, MessageCircle, Compass, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { GalleryItem } from "@/types";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

interface GalleryLightboxProps {
  item: GalleryItem | null;
  items: GalleryItem[];
  onClose: () => void;
  onNavigate: (newItem: GalleryItem) => void;
}

export default function GalleryLightbox({
  item,
  items,
  onClose,
  onNavigate,
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
      document.body.style.overflow = "auto";
    };
  }, [item, handlePrev, handleNext, onClose]);

  if (!item) return null;

  const waSpotUrl = buildWhatsAppUrl({
    source: "gallery",
    customNote: `Saya tertarik berkunjung ke spot foto *${item.title}* (${item.location}). Apakah bisa dimasukkan dalam rute liburan privat kami?`,
  });

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-stone-950/90 backdrop-blur-md">
        {/* Backdrop click to close */}
        <div className="absolute inset-0" onClick={onClose} />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="relative z-10 w-full max-w-5xl max-h-[92vh] flex flex-col md:flex-row rounded-3xl overflow-hidden bg-stone-900 border border-white/10 shadow-2xl text-white"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Tutup foto"
            className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-stone-900/80 text-white hover:bg-white/20 transition-colors border border-white/20 shadow-md"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Left / Top: High-Res Image with Prev/Next Controls */}
          <div className="relative w-full md:w-3/5 bg-stone-950 aspect-[4/3] md:aspect-auto flex items-center justify-center overflow-hidden">
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-contain"
            />

            {/* Navigation Arrows */}
            <button
              onClick={handlePrev}
              aria-label="Foto sebelumnya"
              className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-stone-900/70 text-white hover:bg-stone-900 transition-colors border border-white/15"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              onClick={handleNext}
              aria-label="Foto selanjutnya"
              className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-stone-900/70 text-white hover:bg-stone-900 transition-colors border border-white/15"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Counter */}
            <div className="absolute bottom-3 left-3 rounded-full bg-stone-900/80 px-3 py-1 text-xs font-medium text-stone-300 border border-white/10">
              {currentIndex + 1} / {totalCount}
            </div>
          </div>

          {/* Right / Bottom: Details & Direct WhatsApp Actions */}
          <div className="w-full md:w-2/5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[45vh] md:max-h-[85vh] bg-stone-900/95 space-y-6">
            <div className="space-y-4">
              {/* Location Tag */}
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-300 border border-amber-500/30">
                  <MapPin className="h-3.5 w-3.5 text-amber-400" />
                  <span>{item.location}</span>
                </span>
                <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] uppercase tracking-wider text-stone-300">
                  {item.category === "culture" ? "Budaya & Pura" : item.category === "nature" ? "Alam" : item.category === "guests" ? "Momen Tamu" : "Aktivitas"}
                </span>
              </div>

              {/* Title & Caption */}
              <div className="space-y-2.5">
                <h3 className="font-serif text-2xl font-bold text-white leading-snug">
                  {item.title}
                </h3>
                <p className="text-sm text-stone-300 font-sans leading-relaxed">
                  {item.caption}
                </p>
              </div>

              <div className="pt-2 text-xs text-stone-400 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                <span>Foto autentik dokumentasi tur bersama Bli Gede Sudiartana</span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-4 border-t border-stone-800">
              <a
                href={waSpotUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 rounded-xl bg-emerald-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-600/30 hover:bg-emerald-500 transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Tanya Rute Spot Ini via WhatsApp</span>
              </a>

              {item.tourSlug && (
                <Link
                  href={`/tours/${item.tourSlug}`}
                  onClick={onClose}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-stone-700 bg-stone-800/80 px-5 py-3 text-xs font-semibold text-stone-200 hover:bg-stone-700 hover:text-white transition-colors"
                >
                  <Compass className="h-4 w-4 text-blue-400" />
                  <span>Lihat Paket Tur Terkait</span>
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
