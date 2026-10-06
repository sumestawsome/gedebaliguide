"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MapPin, Maximize2, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { GalleryItem } from "@/types";
import GalleryLightbox from "@/components/gallery/GalleryLightbox";

interface GalleryGridProps {
  initialItems: GalleryItem[];
  lang?: "id" | "en";
}

export default function GalleryGrid({ initialItems, lang = "id" }: GalleryGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const isEn = lang === "en";

  const isMatchCategory = (cat: string, targetId: string) => {
    if (targetId === "all") return true;
    const c = (cat || "").toLowerCase();
    if (targetId === "culture")
      return c === "culture" || c.includes("budaya") || c.includes("pura");
    if (targetId === "nature")
      return c === "nature" || c.includes("alam") || c.includes("terjun");
    if (targetId === "guests")
      return c === "guests" || c.includes("tamu") || c.includes("momen");
    if (targetId === "activity")
      return c === "activity" || c.includes("aktivitas") || c.includes("seru");
    return c === targetId.toLowerCase();
  };

  const categories = [
    {
      id: "all",
      label: isEn ? "All Photos" : "Semua Foto",
      count: initialItems.length,
    },
    {
      id: "culture",
      label: isEn ? "Culture & Temples" : "Budaya & Pura",
      count: initialItems.filter((i) => isMatchCategory(i.category, "culture")).length,
    },
    {
      id: "nature",
      label: isEn ? "Nature & Waterfalls" : "Alam & Air Terjun",
      count: initialItems.filter((i) => isMatchCategory(i.category, "nature")).length,
    },
    {
      id: "guests",
      label: isEn ? "Guest Moments" : "Momen Tamu",
      count: initialItems.filter((i) => isMatchCategory(i.category, "guests")).length,
    },
    {
      id: "activity",
      label: isEn ? "Exciting Activities" : "Aktivitas Seru",
      count: initialItems.filter((i) => isMatchCategory(i.category, "activity")).length,
    },
  ];

  const filteredItems =
    selectedCategory === "all"
      ? initialItems
      : initialItems.filter((item) => isMatchCategory(item.category, selectedCategory));

  // Variasi aspect ratio editorial majalah (pola potret 4:5 dan lanskap 16:10)
  const getAspectRatioClass = (index: number) => {
    return index % 2 === 0 ? "aspect-[4/5]" : "aspect-[16/10]";
  };

  return (
    <section className="py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ========================================================
            3. FILTER TAB KATEGORI YANG RAMPING & ELEGAN
            ======================================================== */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 mb-8 sm:mb-12 gap-2.5 sm:gap-3 no-scrollbar">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-semibold transition-all cursor-pointer shrink-0 ${
                  isActive
                    ? cat.id === "nature" || cat.id === "culture"
                      ? "bg-[#0C8C5E] text-white shadow-sm"
                      : "bg-[#1878B8] text-white shadow-sm"
                    : "bg-[#F4F1EA] text-[#5E6965] hover:bg-[#EBE7DE] hover:text-[#1F2B26]"
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
                    isActive ? "bg-white/20 text-white" : "bg-[#E6E1D6] text-[#5E6965]"
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ========================================================
            4. KISI FOTO EDITORIAL (TRUE MASONRY COLUMNS)
            ======================================================== */}
        <motion.div
          layout
          className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          <AnimatePresence>
            {filteredItems.map((item, index) => {
              const aspectClass = getAspectRatioClass(index);
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: index * 0.03 }}
                  onClick={() => setActiveItem(item)}
                  className={`break-inside-avoid inline-block w-full mb-6 group relative overflow-hidden rounded-2xl bg-stone-100 border border-[#EBE9E6] shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer ${aspectClass}`}
                >
                  {/* Foto Utama dengan transisi zoom halus */}
                  <Image
                    src={item.imageUrl}
                    alt={item.alt || item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Tag Lokasi di Sudut Kiri Atas (Backdrop-blur) */}
                  <div className="absolute top-3.5 left-3.5 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-[#08090A] bg-white/85 backdrop-blur-md border border-white/40 shadow-xs">
                      <MapPin className="w-3.5 h-3.5 text-[#1878B8]" />
                      <span className="line-clamp-1">{item.location}</span>
                    </span>
                  </div>

                  {/* Indikator Klik: Ikon Zoom / Expand di Sudut Kanan Atas */}
                  <div className="absolute top-3.5 right-3.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-md text-white flex items-center justify-center shadow-md">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Scrim Gradien Gelap di Bagian Bawah */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent flex flex-col justify-end p-5 sm:p-6 text-white transition-opacity duration-300">
                    <div className="space-y-1.5 transform transition-transform duration-300 group-hover:-translate-y-1">
                      <h3 className="font-serif text-lg sm:text-xl font-bold leading-snug drop-shadow-sm text-white">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-stone-200 line-clamp-2 leading-relaxed font-sans drop-shadow-xs">
                        {item.caption}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty state jika filter tidak ada data */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <p className="text-[#5E6965] text-base">
              {isEn
                ? "No photos found in this category."
                : "Tidak ada foto dalam kategori ini."}
            </p>
          </div>
        )}
      </div>

      {/* ========================================================
          5. MODAL LIGHTBOX INTERAKTIF
          ======================================================== */}
      {activeItem && (
        <GalleryLightbox
          item={activeItem}
          items={filteredItems}
          onClose={() => setActiveItem(null)}
          onNavigate={(newItem) => setActiveItem(newItem)}
          lang={lang}
        />
      )}
    </section>
  );
}
