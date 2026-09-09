"use client";

import React, { useState, useMemo } from "react";
import { Tour } from "@/types";
import { mockAllTours } from "@/data/mock-data";
import TourCard from "./TourCard";
import { Filter, X, RotateCcw, MapPin, Tag, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ToursCatalogProps {
  initialTours?: Tour[];
}

export default function ToursCatalog({ initialTours = mockAllTours }: ToursCatalogProps) {
  const [selectedArea, setSelectedArea] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const activeTours = useMemo(() => {
    return initialTours.filter((tour) => tour.isActive);
  }, [initialTours]);

  // Extract unique areas and categories
  const areas = useMemo(() => {
    const set = new Set<string>();
    activeTours.forEach((t) => {
      if (t.area) set.add(t.area);
    });
    return Array.from(set);
  }, [activeTours]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    activeTours.forEach((t) => {
      if (t.category) set.add(t.category);
    });
    return Array.from(set);
  }, [activeTours]);

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case "culture":
        return "Budaya";
      case "adventure":
        return "Petualangan";
      case "nature":
        return "Alam & Hutan";
      case "heritage":
        return "Warisan Sejarah";
      case "honeymoon":
        return "Romantis";
      default:
        return cat;
    }
  };

  // Filtered & Sorted tours (tur populer selalu di atas tur lainnya)
  const filteredTours = useMemo(() => {
    const list = activeTours.filter((tour) => {
      const matchArea =
        selectedArea === "all" ||
        tour.area.toLowerCase() === selectedArea.toLowerCase();
      const matchCategory =
        selectedCategory === "all" || tour.category === selectedCategory;
      return matchArea && matchCategory;
    });

    // Urutkan: tur yang ditandai populer (featured === true) tampil lebih dulu
    return list.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0; // Pertahankan urutan asli
    });
  }, [activeTours, selectedArea, selectedCategory]);

  const isFilterActive = selectedArea !== "all" || selectedCategory !== "all";

  const resetFilters = () => {
    setSelectedArea("all");
    setSelectedCategory("all");
  };

  return (
    <div className="space-y-8">
      {/* Filter Bar Controls */}
      <div className="rounded-3xl border border-stone-200/80 bg-white p-5 sm:p-7 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
          <div className="flex items-center gap-2 text-sm font-bold text-stone-900">
            <Filter className="h-4 w-4 text-blue-700" />
            <span>Saring Pilihan Tur</span>
            <span className="ml-1 text-xs font-normal text-stone-500">
              (Menampilkan {filteredTours.length} dari {activeTours.length} tur)
            </span>
          </div>

          {isFilterActive && (
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 transition-colors self-start sm:self-auto cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Hapus Semua Filter</span>
            </button>
          )}
        </div>

        {/* Filter Rows */}
        <div className="space-y-4 text-xs sm:text-sm">
          {/* Category Filter */}
          <div className="space-y-2">
            <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[11px] text-stone-500">
              <Tag className="h-3.5 w-3.5 text-stone-400" />
              Kategori Wisata
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setSelectedCategory("all")}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                  selectedCategory === "all"
                    ? "bg-blue-700 text-white shadow-xs"
                    : "bg-stone-100 text-stone-700 hover:bg-stone-200/70"
                }`}
              >
                Semua Kategori
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-xl px-3.5 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-blue-700 text-white shadow-xs"
                      : "bg-stone-100 text-stone-700 hover:bg-stone-200/70"
                  }`}
                >
                  {getCategoryLabel(cat)}
                </button>
              ))}
            </div>
          </div>

          {/* Area Filter */}
          <div className="space-y-2 pt-2 border-t border-stone-100">
            <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[11px] text-stone-500">
              <MapPin className="h-3.5 w-3.5 text-stone-400" />
              Wilayah / Destinasi
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setSelectedArea("all")}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                  selectedArea === "all"
                    ? "bg-stone-900 text-white shadow-xs"
                    : "bg-stone-100 text-stone-700 hover:bg-stone-200/70"
                }`}
              >
                Semua Wilayah
              </button>
              {areas.map((area) => (
                <button
                  key={area}
                  type="button"
                  onClick={() => setSelectedArea(area)}
                  className={`rounded-xl px-3.5 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                    selectedArea.toLowerCase() === area.toLowerCase()
                      ? "bg-stone-900 text-white shadow-xs"
                      : "bg-stone-100 text-stone-700 hover:bg-stone-200/70"
                  }`}
                >
                  {area}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tours Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredTours.map((tour, index) => (
            <TourCard key={tour.id} tour={tour} priority={index < 3} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
