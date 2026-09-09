"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MapPin, Eye, Camera, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { GalleryItem } from "@/types";
import GalleryLightbox from "@/components/gallery/GalleryLightbox";

interface GalleryGridProps {
  initialItems: GalleryItem[];
}

export default function GalleryGrid({ initialItems }: GalleryGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const categories = [
    { id: "all", label: "Semua Foto", count: initialItems.length },
    {
      id: "culture",
      label: "Budaya & Pura",
      count: initialItems.filter((i) => i.category === "culture").length,
    },
    {
      id: "nature",
      label: "Alam & Air Terjun",
      count: initialItems.filter((i) => i.category === "nature").length,
    },
    {
      id: "guests",
      label: "Momen Tamu",
      count: initialItems.filter((i) => i.category === "guests").length,
    },
    {
      id: "activity",
      label: "Aktivitas Seru",
      count: initialItems.filter((i) => i.category === "activity").length,
    },
  ];

  const filteredItems =
    selectedCategory === "all"
      ? initialItems
      : initialItems.filter((item) => item.category === selectedCategory);

  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`inline-flex items-center gap-2 rounded-full px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold transition-all ${
                selectedCategory === cat.id
                  ? "bg-stone-900 text-white shadow-md scale-105"
                  : "bg-white text-stone-600 border border-stone-200/80 hover:bg-stone-100 hover:text-stone-900"
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`rounded-full px-1.5 py-0.2 text-[11px] ${
                  selectedCategory === cat.id
                    ? "bg-white/20 text-white"
                    : "bg-stone-100 text-stone-500"
                }`}
              >
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
                onClick={() => setActiveItem(item)}
                className="group relative cursor-pointer overflow-hidden rounded-3xl bg-stone-200 shadow-sm border border-stone-200/80 hover:shadow-xl transition-all duration-300 aspect-[4/3]"
              >
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                {/* Top Location Tag */}
                <div className="absolute top-3.5 left-3.5 rounded-full bg-stone-900/80 backdrop-blur-xs px-2.5 py-0.5 text-[10px] font-semibold text-amber-300 border border-white/10 flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-amber-400" />
                  <span>{item.location}</span>
                </div>

                {/* Eye Icon Hover Indicator */}
                <div className="absolute top-3.5 right-3.5 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-xs text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Eye className="h-4 w-4" />
                </div>

                {/* Bottom Content on Image */}
                <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
                  <h3 className="font-serif text-base sm:text-lg font-bold leading-snug drop-shadow-xs">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-stone-300 line-clamp-1 mt-0.5">
                    {item.caption}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredItems.length === 0 && (
          <div className="py-20 text-center space-y-3">
            <Camera className="h-10 w-10 text-stone-300 mx-auto" />
            <p className="text-stone-500 font-medium">
              Belum ada foto untuk kategori ini.
            </p>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <GalleryLightbox
        item={activeItem}
        items={filteredItems}
        onClose={() => setActiveItem(null)}
        onNavigate={(newItem) => setActiveItem(newItem)}
      />
    </section>
  );
}
