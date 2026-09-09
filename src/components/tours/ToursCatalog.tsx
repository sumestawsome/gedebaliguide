"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Tour } from "@/types";
import { mockAllTours } from "@/data/mock-data";
import TourCard from "./TourCard";
import {
  Filter,
  RotateCcw,
  MapPin,
  Tag,
  Compass,
  MessageCircle,
  Search,
  X,
  SlidersHorizontal,
  ArrowUpDown,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

interface ToursCatalogProps {
  initialTours?: Tour[];
}

type SortOption = "popular" | "price_asc" | "price_desc" | "rating";

const quickSuggestions = [
  "Ubud",
  "Kecak Uluwatu",
  "Lempuyang",
  "Kintamani",
  "Bedugul",
  "Nusa Penida",
];

export default function ToursCatalog({ initialTours = mockAllTours }: ToursCatalogProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedArea, setSelectedArea] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortOption>("popular");

  const activeTours = useMemo(() => {
    return initialTours.filter((tour) => tour.isActive);
  }, [initialTours]);

  // Extract unique areas and categories with counts
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

  // Filtered & Sorted tours
  const filteredTours = useMemo(() => {
    const list = activeTours.filter((tour) => {
      const matchArea =
        selectedArea === "all" ||
        tour.area.toLowerCase() === selectedArea.toLowerCase();
      const matchCategory =
        selectedCategory === "all" || tour.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        q === "" ||
        tour.name.toLowerCase().includes(q) ||
        tour.tagline.toLowerCase().includes(q) ||
        tour.area.toLowerCase().includes(q) ||
        tour.highlights.some((h) => h.toLowerCase().includes(q));

      return matchArea && matchCategory && matchSearch;
    });

    // Sorting
    return list.sort((a, b) => {
      if (sortBy === "popular") {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return b.rating - a.rating;
      }
      if (sortBy === "price_asc") {
        return a.price - b.price;
      }
      if (sortBy === "price_desc") {
        return b.price - a.price;
      }
      if (sortBy === "rating") {
        if (b.rating !== a.rating) return b.rating - a.rating;
        return b.reviewCount - a.reviewCount;
      }
      return 0;
    });
  }, [activeTours, selectedArea, selectedCategory, searchQuery, sortBy]);

  const isFilterActive =
    selectedArea !== "all" ||
    selectedCategory !== "all" ||
    searchQuery.trim() !== "" ||
    sortBy !== "popular";

  const resetFilters = () => {
    setSelectedArea("all");
    setSelectedCategory("all");
    setSearchQuery("");
    setSortBy("popular");
  };

  const handleQuickSuggestionClick = (keyword: string) => {
    if (searchQuery.toLowerCase() === keyword.toLowerCase()) {
      setSearchQuery("");
    } else {
      setSearchQuery(keyword);
    }
  };

  const emptyWaUrl = buildWhatsAppUrl({
    customNote: `Halo Bli Gede, saya mencari paket tur dengan kriteria: wilayah ${
      selectedArea !== "all" ? selectedArea : "bebas"
    }, kategori ${
      selectedCategory !== "all" ? getCategoryLabel(selectedCategory) : "bebas"
    }${searchQuery ? `, pencarian "${searchQuery}"` : ""}. Apakah bisa custom itinerary khusus?`,
    source: "custom_itinerary",
  });

  return (
    <div className="space-y-8">
      {/* Filter & Search Bar Controls */}
      <div className="rounded-3xl border border-stone-200/80 bg-white p-5 sm:p-7 shadow-sm space-y-5">
        {/* Top Control Header: Search Bar & Sort Dropdown */}
        <div className="space-y-3 pb-4 border-b border-stone-100">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Keyword Search */}
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari rute tur atau destinasi (misal: Kecak, Ubud, Danau, Air Terjun)..."
                className="w-full rounded-2xl border border-stone-300 bg-stone-50/50 pl-10 pr-9 py-2.5 text-base sm:text-xs text-stone-900 placeholder:text-stone-400 focus:border-blue-700 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-100 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-stone-400 hover:text-stone-700 rounded-full"
                  aria-label="Hapus pencarian"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Sort Selector & Reset Button */}
            <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
              <div className="flex items-center gap-2">
                <ArrowUpDown className="h-3.5 w-3.5 text-stone-500 shrink-0" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  aria-label="Urutkan Tur"
                  className="rounded-xl border border-stone-300 bg-white px-3 py-2 text-xs font-semibold text-stone-700 focus:border-blue-700 focus:outline-hidden cursor-pointer"
                >
                  <option value="popular">Paling Populer</option>
                  <option value="price_asc">Harga: Termurah</option>
                  <option value="price_desc">Harga: Tertinggi</option>
                  <option value="rating">Rating Tertinggi</option>
                </select>
              </div>

              {isFilterActive && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 transition-colors cursor-pointer"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Reset Filter</span>
                  <span className="sm:hidden">Reset</span>
                </button>
              )}
            </div>
          </div>

          {/* Quick Search Suggestions */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1 text-xs">
            <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-amber-500" />
              <span>Pencarian Cepat:</span>
            </span>
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              {quickSuggestions.map((suggestion) => {
                const isActive =
                  searchQuery.toLowerCase() === suggestion.toLowerCase();
                return (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => handleQuickSuggestionClick(suggestion)}
                    className={`rounded-full px-2.5 py-1 text-[11px] font-medium whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? "bg-amber-500 text-white shadow-xs font-bold"
                        : "bg-stone-100 text-stone-600 hover:bg-stone-200/80"
                    }`}
                  >
                    {suggestion}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Filter Rows: Kategori & Wilayah */}
        <div className="space-y-4 text-xs sm:text-sm">
          {/* Category Filter */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[11px] text-stone-500">
                <Tag className="h-3.5 w-3.5 text-stone-400" />
                Kategori Wisata
              </span>
              <span className="text-[11px] text-stone-400">
                {selectedCategory === "all"
                  ? "Semua Kategori"
                  : getCategoryLabel(selectedCategory)}
              </span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 sm:flex-wrap no-scrollbar -mx-2 px-2 sm:mx-0 sm:px-0">
              <button
                type="button"
                onClick={() => setSelectedCategory("all")}
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                  selectedCategory === "all"
                    ? "bg-blue-700 text-white shadow-xs"
                    : "bg-stone-100 text-stone-700 hover:bg-stone-200/70"
                }`}
              >
                <span>Semua Kategori</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    selectedCategory === "all"
                      ? "bg-white/20 text-white"
                      : "bg-stone-200/80 text-stone-600"
                  }`}
                >
                  {activeTours.length}
                </span>
              </button>
              {categories.map((cat) => {
                const count = activeTours.filter((t) => t.category === cat).length;
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                      isSelected
                        ? "bg-blue-700 text-white shadow-xs"
                        : "bg-stone-100 text-stone-700 hover:bg-stone-200/70"
                    }`}
                  >
                    <span>{getCategoryLabel(cat)}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        isSelected
                          ? "bg-white/20 text-white"
                          : "bg-stone-200/80 text-stone-600"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Area Filter */}
          <div className="space-y-2 pt-3 border-t border-stone-100">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[11px] text-stone-500">
                <MapPin className="h-3.5 w-3.5 text-stone-400" />
                Wilayah & Destinasi Bali
              </span>
              <span className="text-[11px] text-stone-400">
                {selectedArea === "all" ? "Semua Wilayah" : selectedArea}
              </span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 sm:flex-wrap no-scrollbar -mx-2 px-2 sm:mx-0 sm:px-0">
              <button
                type="button"
                onClick={() => setSelectedArea("all")}
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                  selectedArea === "all"
                    ? "bg-stone-900 text-white shadow-xs"
                    : "bg-stone-100 text-stone-700 hover:bg-stone-200/70"
                }`}
              >
                <span>Semua Wilayah</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    selectedArea === "all"
                      ? "bg-white/20 text-white"
                      : "bg-stone-200/80 text-stone-600"
                  }`}
                >
                  {activeTours.length}
                </span>
              </button>
              {areas.map((area) => {
                const count = activeTours.filter(
                  (t) => t.area.toLowerCase() === area.toLowerCase()
                ).length;
                const isSelected =
                  selectedArea.toLowerCase() === area.toLowerCase();
                return (
                  <button
                    key={area}
                    type="button"
                    onClick={() => setSelectedArea(area)}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                      isSelected
                        ? "bg-stone-900 text-white shadow-xs"
                        : "bg-stone-100 text-stone-700 hover:bg-stone-200/70"
                    }`}
                  >
                    <span>{area}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        isSelected
                          ? "bg-white/20 text-white"
                          : "bg-stone-200/80 text-stone-600"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Active Filter Badges Bar */}
        {isFilterActive && (
          <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-stone-400 font-semibold text-[11px] uppercase tracking-wider">
              Filter Aktif:
            </span>

            {searchQuery && (
              <span className="inline-flex items-center gap-1 rounded-lg bg-blue-50 text-blue-800 border border-blue-200/80 px-2.5 py-1 text-xs">
                <span>Kata Kunci: &ldquo;{searchQuery}&rdquo;</span>
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="p-0.5 hover:text-blue-950 rounded-full"
                  aria-label="Hapus kata kunci"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}

            {selectedCategory !== "all" && (
              <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200/80 px-2.5 py-1 text-xs">
                <span>Kategori: {getCategoryLabel(selectedCategory)}</span>
                <button
                  type="button"
                  onClick={() => setSelectedCategory("all")}
                  className="p-0.5 hover:text-emerald-950 rounded-full"
                  aria-label="Hapus filter kategori"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}

            {selectedArea !== "all" && (
              <span className="inline-flex items-center gap-1 rounded-lg bg-stone-100 text-stone-800 border border-stone-300 px-2.5 py-1 text-xs">
                <span>Wilayah: {selectedArea}</span>
                <button
                  type="button"
                  onClick={() => setSelectedArea("all")}
                  className="p-0.5 hover:text-stone-950 rounded-full"
                  aria-label="Hapus filter wilayah"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}

            {sortBy !== "popular" && (
              <span className="inline-flex items-center gap-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-1 text-xs">
                <span>
                  Urut:{" "}
                  {sortBy === "price_asc"
                    ? "Harga Termurah"
                    : sortBy === "price_desc"
                    ? "Harga Tertinggi"
                    : "Rating"}
                </span>
                <button
                  type="button"
                  onClick={() => setSortBy("popular")}
                  className="p-0.5 hover:text-amber-950 rounded-full"
                  aria-label="Reset urutan"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
          </div>
        )}

        {/* Results Counter Subtext */}
        <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
          <span>
            Menampilkan <strong>{filteredTours.length}</strong> dari{" "}
            <strong>{activeTours.length}</strong> paket tur privat
          </span>
          {isFilterActive && (
            <span className="text-blue-700 font-medium hidden sm:inline">
              Filter aktif diterapkan
            </span>
          )}
        </div>
      </div>

      {/* Empty State vs Tours Grid */}
      {filteredTours.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-dashed border-stone-300 bg-white p-10 sm:p-14 text-center space-y-5 shadow-xs"
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 border border-amber-200">
            <Compass className="h-8 w-8" />
          </div>

          <div className="space-y-2 max-w-md mx-auto">
            <h3 className="font-serif text-2xl font-bold text-stone-900">
              Tidak Ada Tur yang Sesuai
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
              Kami tidak menemukan paket tur untuk kriteria filter dan pencarian yang Anda tentukan. Ingin menggabungkan rute sesuai keinginan pribadi?
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-blue-800 transition-all cursor-pointer"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Reset Filter & Lihat Semua Tur</span>
            </button>

            <a
              href={emptyWaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 transition-all cursor-pointer"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Tanya Custom Itinerary via WA</span>
            </a>
          </div>
        </motion.div>
      ) : (
        /* Tours Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredTours.map((tour, index) => (
              <TourCard key={tour.id} tour={tour} priority={index < 3} />
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
