"use client";

import React, { useState, useMemo } from "react";
import { Tour } from "@/types";
import TourCard from "./TourCard";
import { Search, SlidersHorizontal, RotateCcw, MessageCircle, Sparkles } from "lucide-react";
import { handleWhatsAppClick } from "@/lib/lead-tracker";

interface ToursCatalogProps {
  initialTours?: Tour[];
  lang?: "id" | "en";
}

type SortOption = "popular" | "price_asc" | "price_desc" | "duration";

export default function ToursCatalog({
  initialTours = [],
  lang = "id",
}: ToursCatalogProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedArea, setSelectedArea] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortOption>("popular");

  const dictionary = {
    id: {
      searchPlaceholder: "Cari paket tur (contoh: Ubud, Kecak Uluwatu, Melukat)...",
      sortLabel: "Urutkan:",
      sortOptions: {
        popular: "Paling Populer",
        price_asc: "Harga Terendah",
        price_desc: "Harga Tertinggi",
        duration: "Durasi Tur",
      },
      categories: [
        { id: "all", label: "Semua Kategori" },
        { id: "culture", label: "Budaya" },
        { id: "nature", label: "Alam & Hutan" },
        { id: "adventure", label: "Petualangan" },
        { id: "heritage", label: "Warisan Sejarah" },
      ],
      areas: [
        { id: "all", label: "Semua Wilayah" },
        { id: "ubud", label: "Ubud" },
        { id: "bedugul", label: "Bedugul" },
        { id: "uluwatu", label: "Uluwatu" },
        { id: "bali timur", label: "Bali Timur" },
        { id: "kintamani", label: "Kintamani" },
        { id: "nusa penida", label: "Nusa Penida" },
      ],
      counter: (count: number, total: number) =>
        `Menampilkan ${count} dari ${total} paket tur privat`,
      resetFilter: "Reset Filter",
      emptyTitle: "Tidak Ditemukan Paket Tur yang Cocok",
      emptyDesc:
        "Coba gunakan kata kunci lain, atau ceritakan destinasi impian Anda agar Bli Gede bisa merancang rute khusus untuk Anda.",
      emptyBtnWa: "Konsultasi Custom Itinerary via WhatsApp",
    },
    en: {
      searchPlaceholder: "Search tour packages (e.g. Ubud, Kecak, Waterfalls)...",
      sortLabel: "Sort by:",
      sortOptions: {
        popular: "Most Popular",
        price_asc: "Lowest Price",
        price_desc: "Highest Price",
        duration: "Tour Duration",
      },
      categories: [
        { id: "all", label: "All Categories" },
        { id: "culture", label: "Culture" },
        { id: "nature", label: "Nature & Forest" },
        { id: "adventure", label: "Adventure" },
        { id: "heritage", label: "Heritage" },
      ],
      areas: [
        { id: "all", label: "All Regions" },
        { id: "ubud", label: "Ubud" },
        { id: "bedugul", label: "Bedugul" },
        { id: "uluwatu", label: "Uluwatu" },
        { id: "bali timur", label: "East Bali" },
        { id: "kintamani", label: "Kintamani" },
        { id: "nusa penida", label: "Nusa Penida" },
      ],
      counter: (count: number, total: number) =>
        `Showing ${count} of ${total} private tour packages`,
      resetFilter: "Reset Filters",
      emptyTitle: "No Matching Tour Packages Found",
      emptyDesc:
        "Try adjusting your search criteria, or chat with Bli Gede directly to craft a personalized custom itinerary.",
      emptyBtnWa: "Request Custom Itinerary via WhatsApp",
    },
  };

  const t = dictionary[lang];

  // Filtered & Sorted Tours
  const filteredTours = useMemo(() => {
    const list = initialTours.filter((tour) => {
      // Filter status
      if (!tour.isActive) return false;

      // Filter category
      const matchCategory =
        selectedCategory === "all" || tour.category === selectedCategory;

      // Filter area
      const matchArea =
        selectedArea === "all" ||
        tour.area.toLowerCase().includes(selectedArea.toLowerCase());

      // Filter search
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        q === "" ||
        tour.name.toLowerCase().includes(q) ||
        tour.tagline.toLowerCase().includes(q) ||
        tour.description.toLowerCase().includes(q) ||
        tour.area.toLowerCase().includes(q) ||
        (tour.highlights &&
          tour.highlights.some((hl) => hl.toLowerCase().includes(q)));

      return matchCategory && matchArea && matchSearch;
    });

    // Sorting
    return list.sort((a, b) => {
      if (sortBy === "popular") {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return (b.rating || 5) - (a.rating || 5);
      }
      if (sortBy === "price_asc") {
        return a.price - b.price;
      }
      if (sortBy === "price_desc") {
        return b.price - a.price;
      }
      if (sortBy === "duration") {
        return a.duration.localeCompare(b.duration);
      }
      return 0;
    });
  }, [initialTours, selectedCategory, selectedArea, searchQuery, sortBy]);

  const isFiltered =
    searchQuery.trim() !== "" ||
    selectedCategory !== "all" ||
    selectedArea !== "all" ||
    sortBy !== "popular";

  const handleReset = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedArea("all");
    setSortBy("popular");
  };

  return (
    <div className="space-y-8 sm:space-y-10">
      {/* ========================================================
          KONTROL PENCARIAN & FILTER TERPADU (RESPONSIF DESKTOP & MOBILE)
          ======================================================== */}
      <div className="bg-white border border-[#EBE9E6] rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-7 shadow-[0_4px_20px_rgba(12,140,94,0.05)] space-y-4 sm:space-y-5">
        {/* DESKTOP LAYOUT (>= 1024px) */}
        <div className="hidden lg:block space-y-4">
          {/* Baris 1: Search Bar Membentang Luas (Kiri) + Dropdown Sort (Kanan) */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-[#5E6965] pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full pl-10 pr-9 py-3 rounded-xl bg-[#FEFDFB] border border-[#EBE9E6] text-sm text-[#08090A] placeholder-[#5E6965] focus:outline-none focus:border-[#1878B8] focus:ring-2 focus:ring-[#1878B8]/20 transition-all font-sans"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5E6965] hover:text-[#08090A] p-1 cursor-pointer"
                  aria-label="Hapus pencarian"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Dropdown Sort Desktop */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-semibold text-[#5E6965]">
                {t.sortLabel}
              </span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="appearance-none bg-[#FEFDFB] border border-[#EBE9E6] rounded-xl px-4 py-3 pr-9 text-sm font-semibold text-[#08090A] focus:outline-none focus:border-[#0C8C5E] cursor-pointer"
                  aria-label={t.sortLabel}
                >
                  <option value="popular">{t.sortOptions.popular}</option>
                  <option value="price_asc">{t.sortOptions.price_asc}</option>
                  <option value="price_desc">{t.sortOptions.price_desc}</option>
                  <option value="duration">{t.sortOptions.duration}</option>
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#5E6965]">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Baris 2: Tab Pills Kategori Wisata Netral (Kiri) + Dropdown Wilayah (Kanan) */}
          <div className="flex items-center justify-between gap-4 pt-1">
            {/* Tab Pills Kategori Wisata */}
            <div className="flex items-center gap-2 flex-wrap">
              {t.categories.map((cat) => {
                const active = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      active
                        ? cat.id === "all"
                          ? "bg-[#1878B8] text-white shadow-xs"
                          : "bg-[#0C8C5E] text-white shadow-xs"
                        : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Dropdown Wilayah Desktop */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-semibold text-[#5E6965]">
                {lang === "id" ? "Wilayah:" : "Region:"}
              </span>
              <div className="relative">
                <select
                  value={selectedArea}
                  onChange={(e) => setSelectedArea(e.target.value)}
                  className="appearance-none bg-[#FEFDFB] border border-[#EBE9E6] rounded-xl px-4 py-2 pr-9 text-xs font-semibold text-[#08090A] focus:outline-none focus:border-[#1878B8] cursor-pointer"
                  aria-label={lang === "id" ? "Pilih Wilayah" : "Select Region"}
                >
                  {t.areas.map((area) => (
                    <option key={area.id} value={area.id}>
                      {area.label}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#5E6965]">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE & TABLET LAYOUT (< 1024px) */}
        <div className="block lg:hidden space-y-3">
          {/* Mobile Baris 1: Search Bar Penuh */}
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-[#5E6965] pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-[#FEFDFB] border border-[#EBE9E6] text-xs sm:text-sm text-[#08090A] placeholder-[#5E6965] focus:outline-none focus:border-[#1878B8] focus:ring-2 focus:ring-[#1878B8]/20 transition-all font-sans"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5E6965] hover:text-[#08090A] p-1 cursor-pointer"
                aria-label="Hapus pencarian"
              >
                ✕
              </button>
            )}
          </div>

          {/* Mobile Baris 2: 2 Dropdown Select Sejajar (Dropdown Kategori di kiri, Dropdown Wilayah di kanan) */}
          <div className="grid grid-cols-2 gap-2.5">
            {/* Dropdown Kategori */}
            <div className="relative w-full">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full appearance-none bg-[#FEFDFB] border border-[#EBE9E6] rounded-xl px-3 py-2.5 pr-8 text-xs font-semibold text-[#08090A] focus:outline-none focus:border-[#1878B8] cursor-pointer truncate"
                aria-label={lang === "id" ? "Pilih Kategori" : "Select Category"}
              >
                {t.categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#5E6965]">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </div>

            {/* Dropdown Wilayah */}
            <div className="relative w-full">
              <select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="w-full appearance-none bg-[#FEFDFB] border border-[#EBE9E6] rounded-xl px-3 py-2.5 pr-8 text-xs font-semibold text-[#08090A] focus:outline-none focus:border-[#1878B8] cursor-pointer truncate"
                aria-label={lang === "id" ? "Pilih Wilayah" : "Select Region"}
              >
                {t.areas.map((area) => (
                  <option key={area.id} value={area.id}>
                    {area.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#5E6965]">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Baris Bawah: Counter Dinamis & Tombol Reset Filter / Urutan Mobile */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#EBE9E6] text-xs text-[#5E6965]">
          <span className="font-medium">
            {t.counter(filteredTours.length, initialTours.length)}
          </span>

          <div className="flex items-center gap-3">
            {/* Sort Dropdown Ringkas Khusus Mobile */}
            <div className="lg:hidden flex items-center gap-1.5">
              <span className="text-[11px] font-semibold text-[#5E6965]">
                {t.sortLabel}
              </span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="appearance-none bg-[#FEFDFB] border border-[#EBE9E6] rounded-lg px-2.5 py-1.5 pr-7 text-xs font-semibold text-[#08090A] focus:outline-none focus:border-[#0C8C5E] cursor-pointer"
                  aria-label={t.sortLabel}
                >
                  <option value="popular">{t.sortOptions.popular}</option>
                  <option value="price_asc">{t.sortOptions.price_asc}</option>
                  <option value="price_desc">{t.sortOptions.price_desc}</option>
                  <option value="duration">{t.sortOptions.duration}</option>
                </select>
                <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[#5E6965]">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </div>
            </div>

            {isFiltered && (
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 text-[#E67E22] hover:text-[#D35400] font-semibold cursor-pointer transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>{t.resetFilter}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ========================================================
          RESPONSIVE GRID KARTU PAKET TUR
          - Mobile (< 768px): 1 kolom
          - Tablet (768px - 1023px): WAJIB 2 kolom (md:grid-cols-2)
          - Desktop (>= 1024px): 3 kolom (lg:grid-cols-3)
          ======================================================== */}
      {filteredTours.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredTours.map((tour, index) => (
            <TourCard
              key={tour.id || tour.slug || index}
              tour={tour}
              priority={index < 3}
              lang={lang}
            />
          ))}
        </div>
      ) : (
        /* Empty State yang Hangat */
        <div className="text-center py-16 px-6 bg-white border border-[#EBE9E6] rounded-3xl max-w-2xl mx-auto shadow-xs">
          <div className="w-12 h-12 rounded-full bg-[#FFF5EB] text-[#E67E22] flex items-center justify-center mx-auto mb-4">
            <Sparkles className="h-6 w-6" />
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#08090A] mb-2">
            {t.emptyTitle}
          </h3>
          <p className="text-xs sm:text-sm text-[#5E6965] leading-relaxed max-w-md mx-auto mb-6">
            {t.emptyDesc}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="px-5 py-2.5 rounded-xl border border-[#CFCDCA] text-xs sm:text-sm font-semibold text-[#08090A] hover:bg-[#FAF8F5] transition-colors cursor-pointer w-full sm:w-auto"
            >
              {t.resetFilter}
            </button>
            <button
              type="button"
              onClick={() =>
                handleWhatsAppClick(
                  "/tours - Empty State",
                  undefined,
                  `Halo Bli Gede, saya mencari paket tur dengan kriteria khusus (${searchQuery || selectedCategory}). Apakah bisa request rute kustom?`
                )
              }
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#E67E22] hover:bg-[#D35400] text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors cursor-pointer w-full sm:w-auto"
            >
              <MessageCircle className="h-4 w-4" />
              <span>{t.emptyBtnWa}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
