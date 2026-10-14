"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  MapPin,
  Sparkles,
  Layers,
  Camera,
} from "lucide-react";
import { MediaSectionData, MediaItem } from "@/types";

export interface MediaRendererProps {
  media?: MediaSectionData;
  fallbackImage?: {
    url: string;
    alt: string;
    caption?: string;
  };
  aspectRatio?: string;
  className?: string;
  priority?: boolean;
}

export default function MediaRenderer({
  media,
  fallbackImage,
  aspectRatio = "aspect-[4/5]",
  className = "",
  priority = false,
}: MediaRendererProps) {
  // Pastikan ada setidaknya satu foto valid
  const defaultImages: MediaItem[] = [
    {
      id: "fallback-1",
      url:
        fallbackImage?.url ||
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80",
      alt: fallbackImage?.alt || "Foto Bli Gede",
      caption: fallbackImage?.caption || "",
    },
  ];

  const mode = media?.mode || "single";
  const singleTemplate = media?.singleTemplate || "classic-editorial";
  const multiTemplate = media?.multiTemplate || "stacked-deck";
  const rawImages = media?.images && media.images.length > 0 ? media.images : defaultImages;
  const images = rawImages.filter((img) => img && img.url);

  // Active slide index untuk slider & deck carousel
  const [currentIndex, setCurrentIndex] = useState(0);

  // Swipe support
  const touchStartXRef = useRef(0);
  const touchEndXRef = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndXRef.current = e.changedTouches[0].screenX;
    const diff = touchStartXRef.current - touchEndXRef.current;
    if (diff > 45) {
      handleNext();
    } else if (diff < -45) {
      handlePrev();
    }
  };

  const handleNext = () => {
    if (images.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    if (images.length <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Safe active image
  const activeImage = images[currentIndex] || images[0] || defaultImages[0];
  const activeCaption = activeImage.caption || media?.caption || fallbackImage?.caption;

  // =========================================================================
  // TEMPLATE 1A: CLASSIC EDITORIAL CARD (Single)
  // =========================================================================
  if (mode === "single" && singleTemplate === "classic-editorial") {
    return (
      <div className={`relative mx-auto max-w-md lg:max-w-none ${className}`}>
        {/* Soft Ambient Shadow Blur */}
        <div className="absolute -inset-2 rounded-[32px] bg-gradient-to-tr from-[#0C8C5E]/15 to-[#E67E22]/15 blur-xl -z-10" />

        <div className="overflow-hidden rounded-3xl bg-white border border-[#EBE9E6] shadow-xl shadow-stone-200/50 group/img">
          <div className={`relative w-full overflow-hidden bg-stone-100 ${aspectRatio}`}>
            <Image
              src={activeImage.url}
              alt={activeImage.alt || "Foto"}
              fill
              priority={priority}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 500px"
              className="object-cover object-center transition-transform duration-700 ease-out group-hover/img:scale-105"
            />
          </div>

          {activeCaption && (
            <div className="p-4 sm:p-5 bg-white border-t border-[#EBE9E6]/60">
              <p className="text-xs sm:text-sm text-[#5E6965] italic leading-relaxed text-center">
                &ldquo;{activeCaption}&rdquo;
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // =========================================================================
  // TEMPLATE 1B: AMBIENT LAYERED GLOW (Single)
  // =========================================================================
  if (mode === "single" && singleTemplate === "ambient-glow") {
    return (
      <div className={`relative mx-auto max-w-md lg:max-w-none pt-2 sm:pt-4 pr-2 sm:pr-4 ${className}`}>
        {/* Warm Cream Offset Layer Box di Belakang */}
        <div className="absolute inset-0 translate-x-3 translate-y-3 sm:translate-x-5 sm:translate-y-5 rounded-3xl bg-[#FAF8F5] border border-[#EBE9E6] shadow-lg -z-10 transition-transform duration-500" />
        {/* Ambient Warm Color Glow */}
        <div className="absolute -inset-3 rounded-[36px] bg-gradient-to-br from-[#1878B8]/10 via-[#0C8C5E]/10 to-[#E67E22]/15 blur-2xl -z-20" />

        <div className="overflow-hidden rounded-3xl bg-white border border-[#EBE9E6] shadow-2xl group/img">
          <div className={`relative w-full overflow-hidden bg-stone-100 ${aspectRatio}`}>
            <Image
              src={activeImage.url}
              alt={activeImage.alt || "Foto"}
              fill
              priority={priority}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 500px"
              className="object-cover object-center transition-transform duration-700 ease-out group-hover/img:scale-105"
            />
            {/* Minimalist Location Tag Pill */}
            <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full border border-white/20 shadow-md flex items-center gap-1.5 pointer-events-none">
              <MapPin className="w-3 h-3 text-[#E67E22]" />
              <span className="font-medium truncate max-w-[200px]">
                {activeImage.alt || "Bali, Indonesia"}
              </span>
            </div>
          </div>

          {activeCaption && (
            <div className="p-4 sm:p-5 bg-white border-t border-[#EBE9E6]/60">
              <p className="text-xs sm:text-sm text-[#5E6965] italic leading-relaxed text-center">
                &ldquo;{activeCaption}&rdquo;
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // =========================================================================
  // TEMPLATE 1C: POLAROID TRAVEL FRAME (Single)
  // =========================================================================
  if (mode === "single" && singleTemplate === "polaroid-frame") {
    return (
      <div className={`relative mx-auto max-w-md lg:max-w-none ${className}`}>
        {/* Polaroid Card Body */}
        <div className="relative bg-white p-3.5 pb-8 sm:p-5 sm:pb-10 rounded-2xl sm:rounded-3xl border border-[#EBE9E6] shadow-[0_20px_45px_-10px_rgba(0,0,0,0.12)] rotate-[-1.5deg] hover:rotate-0 transition-transform duration-500 ease-out group/polaroid">
          {/* Foto di dalam frame polaroid */}
          <div className={`relative w-full overflow-hidden rounded-xl bg-stone-100 ${aspectRatio}`}>
            <Image
              src={activeImage.url}
              alt={activeImage.alt || "Foto Polaroid"}
              fill
              priority={priority}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 500px"
              className="object-cover object-center transition-transform duration-700 group-hover/polaroid:scale-105"
            />
            {/* Stamp Badge Lisensi HPI Bali */}
            <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full border border-[#0C8C5E]/30 shadow-sm flex items-center gap-1 text-[11px] font-bold text-[#0C8C5E]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>HPI Bali Verified</span>
            </div>
          </div>

          {/* Area Keterangan Tangan / Jurnal Travel */}
          <div className="mt-4 px-2 text-center">
            <p className="font-serif italic text-xs sm:text-sm text-[#08090A] leading-relaxed">
              &ldquo;{activeCaption || activeImage.alt || "Dokumentasi Perjalanan Autentik Bali"}&rdquo;
            </p>
            <div className="mt-2 flex items-center justify-center gap-2 text-[10px] uppercase font-bold tracking-widest text-[#5E6965]/70">
              <span>Gede Sudiartana</span>
              <span>•</span>
              <span>Gianyar, Bali</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // TEMPLATE 2A: STACKED DECK CAROUSEL (Multi)
  // =========================================================================
  if (mode === "multi" && multiTemplate === "stacked-deck") {
    const total = images.length;

    return (
      <div className={`relative w-full flex flex-col items-center justify-center ${className}`}>
        {/* Frame Tumpukan Kartu */}
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className={`relative w-full max-w-[320px] sm:max-w-[360px] md:max-w-[380px] lg:max-w-[400px] ${aspectRatio} mx-auto select-none flex items-center justify-center`}
        >
          {images.map((slide, idx) => {
            const offset = (idx - currentIndex + total) % total;
            let stackClasses = "";
            let isInteractive = false;

            if (offset === 0) {
              // Kartu Utama Depan
              stackClasses =
                "z-20 translate-x-0 rotate-0 scale-100 opacity-100 border-[5px] sm:border-[6px] border-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] pointer-events-auto";
            } else if (offset === 1) {
              // Kartu Miring Kanan
              stackClasses =
                "z-10 translate-x-6 sm:translate-x-9 rotate-6 scale-90 opacity-70 border-4 border-white/90 shadow-[0_12px_30px_rgba(0,0,0,0.08)] cursor-pointer hover:opacity-90 pointer-events-auto";
              isInteractive = true;
            } else if (offset === total - 1 || offset === 2) {
              // Kartu Miring Kiri
              stackClasses =
                "z-10 -translate-x-6 sm:-translate-x-9 -rotate-6 scale-90 opacity-70 border-4 border-white/90 shadow-[0_12px_30px_rgba(0,0,0,0.08)] cursor-pointer hover:opacity-90 pointer-events-auto";
              isInteractive = true;
            } else {
              // Kartu di balik tumpukan tersembunyi
              stackClasses = "z-0 scale-75 opacity-0 pointer-events-none";
            }

            return (
              <div
                key={slide.id || idx}
                onClick={isInteractive ? () => setCurrentIndex(idx) : undefined}
                className={`absolute inset-0 w-full h-full rounded-[2rem] overflow-hidden bg-stone-900 transition-all duration-700 ease-in-out transform-gpu origin-center ${stackClasses}`}
              >
                <Image
                  src={slide.url}
                  alt={slide.alt || "Foto Galeri"}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover object-center pointer-events-none"
                  priority={priority && idx === 0}
                />

                {/* Shading Bawah */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Tag Keterangan di Kartu Aktif */}
                {offset === 0 && (
                  <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-white z-30 pointer-events-none">
                    <div className="bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-xs font-medium flex items-center gap-1.5 shadow-md truncate">
                      <MapPin className="w-3 h-3 text-[#E67E22] shrink-0" />
                      <span className="truncate">{slide.alt || "Bali Experience"}</span>
                    </div>
                    <span className="text-[11px] font-semibold bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
                      {idx + 1} / {total}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Indikator Titik Carousel di Bawah Frame */}
        {total > 1 && (
          <div className="flex items-center gap-2 mt-5">
            {images.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                onClick={() => setCurrentIndex(dotIdx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  dotIdx === currentIndex
                    ? "w-7 bg-[#1878B8]"
                    : "w-2 bg-[#D3D8D6] hover:bg-[#1878B8]/50"
                }`}
                title={`Pindah ke foto ${dotIdx + 1}`}
              />
            ))}
          </div>
        )}

        {/* Caption Teks */}
        {activeCaption && (
          <p className="text-xs sm:text-sm text-[#5E6965] italic text-center mt-3 max-w-sm">
            &ldquo;{activeCaption}&rdquo;
          </p>
        )}
      </div>
    );
  }

  // =========================================================================
  // TEMPLATE 2B: EDITORIAL BENTO COLLAGE (Multi)
  // =========================================================================
  if (mode === "multi" && multiTemplate === "editorial-bento") {
    const mainImg = images[0] || defaultImages[0];
    const subImg1 = images[1] || images[0] || defaultImages[0];
    const subImg2 = images[2] || images[0] || defaultImages[0];
    const hasMore = images.length > 3;

    return (
      <div className={`w-full max-w-xl mx-auto ${className}`}>
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4 items-stretch">
          {/* Foto Besar Utama (Kolom Kiri 7 span) */}
          <div
            onClick={() => setCurrentIndex(0)}
            className="sm:col-span-7 relative rounded-3xl overflow-hidden border border-[#EBE9E6] shadow-xl aspect-[4/5] sm:aspect-auto sm:min-h-[360px] group/bento cursor-pointer"
          >
            <Image
              src={mainImg.url}
              alt={mainImg.alt || "Foto Utama"}
              fill
              priority={priority}
              sizes="(max-width: 640px) 100vw, 350px"
              className="object-cover object-center transition-transform duration-700 group-hover/bento:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
              <span className="text-white text-xs font-semibold drop-shadow-sm truncate">
                {mainImg.alt || "Spot Utama"}
              </span>
            </div>
          </div>

          {/* Kolom Kanan: 2 Foto Pendukung Bertumpuk (5 span) */}
          <div className="sm:col-span-5 grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-4">
            {/* Foto Pendukung 1 */}
            <div
              onClick={() => setCurrentIndex(1 % images.length)}
              className="relative rounded-2xl overflow-hidden border border-[#EBE9E6] shadow-md aspect-square sm:aspect-auto sm:h-[172px] group/sub1 cursor-pointer"
            >
              <Image
                src={subImg1.url}
                alt={subImg1.alt || "Foto 2"}
                fill
                sizes="(max-width: 640px) 50vw, 200px"
                className="object-cover object-center transition-transform duration-500 group-hover/sub1:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-3">
                <span className="text-white text-[11px] font-medium drop-shadow-sm truncate">
                  {subImg1.alt}
                </span>
              </div>
            </div>

            {/* Foto Pendukung 2 */}
            <div
              onClick={() => setCurrentIndex(2 % images.length)}
              className="relative rounded-2xl overflow-hidden border border-[#EBE9E6] shadow-md aspect-square sm:aspect-auto sm:h-[172px] group/sub2 cursor-pointer"
            >
              <Image
                src={subImg2.url}
                alt={subImg2.alt || "Foto 3"}
                fill
                sizes="(max-width: 640px) 50vw, 200px"
                className="object-cover object-center transition-transform duration-500 group-hover/sub2:scale-105"
              />
              {hasMore ? (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex flex-col items-center justify-center text-white p-2 text-center">
                  <span className="text-base sm:text-lg font-bold">+{images.length - 2}</span>
                  <span className="text-[10px] font-medium">Foto Lainnya</span>
                </div>
              ) : (
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-3">
                  <span className="text-white text-[11px] font-medium drop-shadow-sm truncate">
                    {subImg2.alt}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Caption Bento */}
        {activeCaption && (
          <p className="text-xs sm:text-sm text-[#5E6965] italic text-center mt-3">
            &ldquo;{activeCaption}&rdquo;
          </p>
        )}
      </div>
    );
  }

  // =========================================================================
  // TEMPLATE 2C: SMOOTH SWIPE SLIDER (Multi)
  // =========================================================================
  if (mode === "multi" && multiTemplate === "smooth-slider") {
    return (
      <div className={`w-full max-w-md mx-auto ${className}`}>
        {/* Frame Slider Utama */}
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className={`relative w-full rounded-3xl overflow-hidden border border-[#EBE9E6] shadow-xl bg-stone-100 ${aspectRatio} group/slider`}
        >
          <Image
            src={activeImage.url}
            alt={activeImage.alt || "Slide Foto"}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, 450px"
            className="object-cover object-center transition-all duration-500"
          />

          {/* Shading */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

          {/* Floating Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#08090A] shadow-md flex items-center justify-center border border-[#EBE9E6] opacity-90 hover:opacity-100 transition-all cursor-pointer z-20"
                aria-label="Foto Sebelumnya"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#08090A] shadow-md flex items-center justify-center border border-[#EBE9E6] opacity-90 hover:opacity-100 transition-all cursor-pointer z-20"
                aria-label="Foto Selanjutnya"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Badges di Atas & Bawah Slider */}
          <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-full border border-white/20 z-10 pointer-events-none">
            {currentIndex + 1} / {images.length}
          </div>

          <div className="absolute bottom-4 left-4 right-4 text-white z-10 pointer-events-none">
            <span className="text-xs sm:text-sm font-semibold drop-shadow-md truncate block">
              {activeImage.alt || "Dokumentasi Tur"}
            </span>
          </div>
        </div>

        {/* Thumbnail Navigation Row */}
        {images.length > 1 && (
          <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1 scrollbar-none justify-center">
            {images.map((img, thumbIdx) => (
              <button
                key={img.id || thumbIdx}
                type="button"
                onClick={() => setCurrentIndex(thumbIdx)}
                className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                  thumbIdx === currentIndex
                    ? "border-[#1878B8] ring-2 ring-[#1878B8]/30 scale-105 shadow-xs"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
                title={img.alt || `Pilih foto ${thumbIdx + 1}`}
              >
                <Image
                  src={img.url}
                  alt={img.alt || `Thumbnail ${thumbIdx + 1}`}
                  fill
                  sizes="60px"
                  className="object-cover object-center"
                />
              </button>
            ))}
          </div>
        )}

        {/* Caption */}
        {activeCaption && (
          <p className="text-xs sm:text-sm text-[#5E6965] italic text-center mt-3">
            &ldquo;{activeCaption}&rdquo;
          </p>
        )}
      </div>
    );
  }

  // Fallback default
  return (
    <div className={`relative mx-auto max-w-md ${aspectRatio} rounded-3xl overflow-hidden border border-[#EBE9E6] bg-stone-100 ${className}`}>
      <Image
        src={activeImage.url}
        alt={activeImage.alt || "Foto"}
        fill
        className="object-cover object-center"
      />
    </div>
  );
}
