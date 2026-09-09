"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Search,
  X,
  CreditCard,
  MapPin,
  Car,
  ShieldCheck,
  HelpCircle,
  MessageCircle,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { mockFaqItems, FaqItem } from "@/data/mock-faq";
import { getGeneralConsultationUrl } from "@/lib/whatsapp";
import Link from "next/link";

type CategoryKey = "all" | "booking" | "routes" | "vehicle" | "culture";

interface CategoryTab {
  key: CategoryKey;
  label: string;
  icon: React.ReactNode;
}

const categories: CategoryTab[] = [
  { key: "all", label: "Semua Tanya Jawab", icon: <HelpCircle className="h-4 w-4" /> },
  { key: "booking", label: "Pemesanan & Biaya", icon: <CreditCard className="h-4 w-4" /> },
  { key: "routes", label: "Rute & Fleksibilitas", icon: <MapPin className="h-4 w-4" /> },
  { key: "vehicle", label: "Armada Mobil", icon: <Car className="h-4 w-4" /> },
  { key: "culture", label: "Budaya & Lisensi HPI", icon: <ShieldCheck className="h-4 w-4" /> },
];

export default function FaqAccordion() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("all");
  const [searchQuery, setSearchQuery] = useState("");
  // Track open items; default the first item to open
  const [openItemIds, setOpenItemIds] = useState<string[]>(["faq-1"]);

  const toggleItem = (id: string) => {
    setOpenItemIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const expandAll = () => {
    setOpenItemIds(filteredItems.map((item) => item.id));
  };

  const collapseAll = () => {
    setOpenItemIds([]);
  };

  // Filtered items
  const filteredItems = useMemo(() => {
    return mockFaqItems.filter((item) => {
      const matchCategory =
        activeCategory === "all" || item.category === activeCategory;
      const matchQuery =
        searchQuery.trim() === "" ||
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchQuery;
    });
  }, [activeCategory, searchQuery]);

  const getCategoryBadge = (category: FaqItem["category"]) => {
    switch (category) {
      case "booking":
        return {
          label: "Pemesanan & Biaya",
          color: "bg-emerald-50 text-emerald-800 border-emerald-200/80",
          dotColor: "bg-emerald-500",
        };
      case "routes":
        return {
          label: "Rute & Fleksibilitas",
          color: "bg-blue-50 text-blue-800 border-blue-200/80",
          dotColor: "bg-blue-500",
        };
      case "vehicle":
        return {
          label: "Armada Mobil",
          color: "bg-amber-50 text-amber-800 border-amber-200/80",
          dotColor: "bg-amber-500",
        };
      case "culture":
        return {
          label: "Lisensi & Integritas",
          color: "bg-purple-50 text-purple-800 border-purple-200/80",
          dotColor: "bg-purple-500",
        };
    }
  };

  const waAskUrl = getGeneralConsultationUrl("faq");

  return (
    <div className="space-y-8">
      {/* Search & Category Filter Controls */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari pertanyaan... misal: DP, rute, mobil, jam jemput"
            className="w-full rounded-2xl border border-stone-300 bg-white pl-12 pr-10 py-3.5 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:border-blue-700 focus:outline-hidden focus:ring-2 focus:ring-blue-100 transition-all shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-stone-700 rounded-full"
              aria-label="Hapus pencarian"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {categories.map((cat) => {
            const count =
              cat.key === "all"
                ? mockFaqItems.length
                : mockFaqItems.filter((item) => item.category === cat.key).length;
            const isActive = activeCategory === cat.key;

            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-blue-700 text-white shadow-md shadow-blue-700/20"
                    : "bg-white text-stone-600 border border-stone-200 hover:border-stone-300 hover:bg-stone-50"
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
                <span
                  className={`text-[11px] px-1.5 py-0.5 rounded-full font-bold ${
                    isActive ? "bg-white/20 text-white" : "bg-stone-100 text-stone-500"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Status bar & Expand/Collapse Toggle */}
        <div className="flex items-center justify-between text-xs text-stone-500 px-1 pt-2">
          <span>
            Menampilkan <strong>{filteredItems.length}</strong> pertanyaan
            {searchQuery && (
              <>
                {" "}
                untuk kata kunci &ldquo;<strong>{searchQuery}</strong>&rdquo;
              </>
            )}
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={expandAll}
              className="font-medium text-blue-700 hover:underline hover:text-blue-800"
            >
              Buka Semua
            </button>
            <span>•</span>
            <button
              onClick={collapseAll}
              className="font-medium text-stone-500 hover:underline hover:text-stone-700"
            >
              Tutup Semua
            </button>
          </div>
        </div>
      </div>

      {/* Accordion Items List */}
      {filteredItems.length > 0 ? (
        <div className="space-y-3.5">
          {filteredItems.map((item, index) => {
            const isOpen = openItemIds.includes(item.id);
            const badge = getCategoryBadge(item.category);

            return (
              <div
                key={item.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden bg-white ${
                  isOpen
                    ? "border-blue-300 shadow-md ring-1 ring-blue-100"
                    : "border-stone-200/80 shadow-xs hover:border-stone-300"
                }`}
              >
                {/* Accordion Trigger Header */}
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 select-none focus:outline-hidden"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${badge.color}`}
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${badge.dotColor}`} />
                        {badge.label}
                      </span>
                      <span className="text-[11px] text-stone-400 font-mono">
                        #{String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <h3 className="font-serif text-base sm:text-lg font-bold text-stone-900 leading-snug">
                      {item.question}
                    </h3>
                  </div>

                  <div
                    className={`shrink-0 mt-2 h-8 w-8 rounded-full flex items-center justify-center transition-transform duration-200 ${
                      isOpen
                        ? "bg-blue-50 text-blue-700 rotate-180"
                        : "bg-stone-100 text-stone-500 hover:bg-stone-200"
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>

                {/* Animated Accordion Body */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-stone-100 space-y-4">
                        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
                          {item.answer}
                        </p>

                        {/* Interactive Contextual Hint based on Category */}
                        {item.category === "booking" && (
                          <div className="rounded-xl bg-emerald-50/70 border border-emerald-200/60 p-3.5 flex items-center justify-between gap-3 text-xs">
                            <span className="text-emerald-800">
                              Ingin booking untuk tanggal liburan mendatang?
                            </span>
                            <Link
                              href="/contact"
                              className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-900 hover:underline shrink-0"
                            >
                              <span>Buka Form Booking</span>
                              <ExternalLink className="h-3 w-3" />
                            </Link>
                          </div>
                        )}

                        {item.category === "routes" && (
                          <div className="rounded-xl bg-blue-50/70 border border-blue-200/60 p-3.5 flex items-center justify-between gap-3 text-xs">
                            <span className="text-blue-800">
                              Lihat contoh rute privat populer yang bisa Anda sesuaikan.
                            </span>
                            <Link
                              href="/tours"
                              className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 hover:text-blue-900 hover:underline shrink-0"
                            >
                              <span>Jelajahi Paket Tur</span>
                              <ExternalLink className="h-3 w-3" />
                            </Link>
                          </div>
                        )}

                        {item.category === "vehicle" && (
                          <div className="rounded-xl bg-amber-50/70 border border-amber-200/60 p-3.5 flex items-center justify-between gap-3 text-xs">
                            <span className="text-amber-800">
                              Lihat detail standar armada Avanza & Innova Reborn Bli Gede.
                            </span>
                            <Link
                              href="/about#standar-armada"
                              className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 hover:text-amber-900 hover:underline shrink-0"
                            >
                              <span>Lihat Spesifikasi Armada</span>
                              <ExternalLink className="h-3 w-3" />
                            </Link>
                          </div>
                        )}

                        {item.category === "culture" && (
                          <div className="rounded-xl bg-purple-50/70 border border-purple-200/60 p-3.5 flex items-center justify-between gap-3 text-xs">
                            <span className="text-purple-800">
                              Verifikasi nomor lisensi resmi HPI DPD Bali Gede Sudiartana.
                            </span>
                            <Link
                              href="/about#kredensial-hpi"
                              className="inline-flex items-center gap-1 text-xs font-bold text-purple-700 hover:text-purple-900 hover:underline shrink-0"
                            >
                              <span>Cek Kredensial HPI</span>
                              <ExternalLink className="h-3 w-3" />
                            </Link>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="rounded-3xl border border-stone-200 bg-white p-10 text-center space-y-4">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-stone-100 text-stone-400">
            <Search className="h-7 w-7" />
          </div>
          <div className="space-y-1 max-w-md mx-auto">
            <h3 className="font-serif text-xl font-bold text-stone-900">
              Tidak Ada Pertanyaan yang Cocok
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
              Kami tidak menemukan jawaban untuk kata kunci &ldquo;{searchQuery}&rdquo;. Tanyakan pertanyaan spesifik Anda langsung kepada Bli Gede.
            </p>
          </div>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("all");
              }}
              className="rounded-xl border border-stone-300 px-4 py-2.5 text-xs font-semibold text-stone-700 hover:bg-stone-50 transition-colors"
            >
              Reset Pencarian
            </button>
            <a
              href={waAskUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-emerald-500 transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Tanya Bli Gede Sekarang</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
