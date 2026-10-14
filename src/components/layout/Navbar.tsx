"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { handleWhatsAppClick } from "@/lib/lead-tracker";

interface NavbarProps {
  currentLang?: "id" | "en";
  onLanguageChange?: (lang: "id" | "en") => void;
}

export default function Navbar({ currentLang, onLanguageChange }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [internalLang, setInternalLang] = useState<"id" | "en">("en");
  const pathname = usePathname();

  const lang = currentLang !== undefined ? currentLang : internalLang;

  useEffect(() => {
    try {
      const saved = localStorage.getItem("app_lang");
      if (saved === "id" || saved === "en") {
        setInternalLang(saved);
      } else {
        setInternalLang("en");
      }
    } catch {}
  }, []);

  const handleLangToggle = (newLang: "id" | "en") => {
    if (onLanguageChange) {
      onLanguageChange(newLang);
    } else {
      setInternalLang(newLang);
      try {
        localStorage.setItem("app_lang", newLang);
      } catch {}
    }
    // Broadcast language change to listening page components
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("appLanguageChange", { detail: { lang: newLang } }));
    }
  };

  useEffect(() => {
    if (currentLang !== undefined) {
      setInternalLang(currentLang);
    }
  }, [currentLang]);

  // Close mobile dropdown automatically on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Notify listeners (e.g., floating widgets) about mobile dropdown state
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("mobileMenuChange", { detail: { open: mobileMenuOpen } }));
    }
  }, [mobileMenuOpen]);

  // Sembunyikan Navbar publik pada rute panel admin (/admin/*)
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const navLabels = {
    id: {
      home: "Beranda",
      tours: "Katalog Tur",
      about: "Tentang Gede",
      gallery: "Galeri",
      whatsapp: "WhatsApp",
      consultWa: "Konsultasi via WhatsApp",
      drawerTitle: "Menu Navigasi",
    },
    en: {
      home: "Home",
      tours: "Tour Catalog",
      about: "About Gede",
      gallery: "Gallery",
      whatsapp: "WhatsApp",
      consultWa: "WhatsApp Consultation",
      drawerTitle: "Navigation Menu",
    },
  };

  const t = navLabels[lang];

  const navItems = [
    { href: "/", label: t.home },
    { href: "/tours", label: t.tours },
    { href: "/about", label: t.about },
    { href: "/gallery", label: t.gallery },
  ];

  const isCurrentActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[var(--canvas)]/95 backdrop-blur-md border-b border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between gap-4">
        {/* Brand Logo & Title */}
        <Link
          href="/"
          className="flex items-center gap-2.5 sm:gap-3 no-underline text-[var(--text-primary)] group shrink-0 min-w-0"
        >
          <div className="relative w-9 h-9 sm:w-10 sm:h-10 transition-transform duration-200 group-hover:scale-105 shrink-0">
            <Image
              src="/assets/gede-logo.svg"
              alt="Gede Bali Guide Logo"
              width={40}
              height={40}
              priority
              className="w-full h-full object-contain"
            />
          </div>
          <div className="whitespace-nowrap min-w-0 flex flex-col justify-center">
            <span className="block font-bold text-sm sm:text-base md:text-lg leading-tight tracking-tight text-[var(--text-primary)] whitespace-nowrap">
              Gede Bali Guide
            </span>
            <span className="block text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[var(--brand-blue)] whitespace-nowrap">
              Private Tour Specialist
            </span>
          </div>
        </Link>

        {/* 4 Menu Utama (Desktop & Tablet >= 768px) */}
        <nav
          aria-label="Menu Utama"
          className="hidden md:flex items-center gap-1 lg:gap-2"
        >
          {navItems.map((item) => {
            const active = isCurrentActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3.5 py-2 rounded-lg text-xs lg:text-sm transition-colors ${
                  active
                    ? "text-[var(--brand-blue)] bg-[var(--brand-blue-light)] font-semibold"
                    : "text-[var(--text-muted)] hover:text-[var(--brand-blue)] hover:bg-[var(--brand-blue-light)] font-medium"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Header Actions (Language Switcher + WhatsApp CTA + Hamburger) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Pemilih Bahasa Desktop [ ID | EN ] */}
          <div className="hidden sm:inline-flex items-center rounded-lg border border-[var(--border)] p-0.5 bg-[var(--surface-alt)] text-xs font-semibold">
            <button
              type="button"
              onClick={() => handleLangToggle("id")}
              className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                lang === "id"
                  ? "bg-white text-[var(--brand-blue)] shadow-xs font-bold"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              }`}
            >
              ID
            </button>
            <span className="text-[var(--border)] text-[10px] mx-0.5">|</span>
            <button
              type="button"
              onClick={() => handleLangToggle("en")}
              className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                lang === "en"
                  ? "bg-white text-[var(--brand-blue)] shadow-xs font-bold"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              }`}
            >
              EN
            </button>
          </div>

          {/* Direct WhatsApp CTA Button (Desktop >= 768px) - Standar Ukuran h-11 */}
          <button
            type="button"
            onClick={() => handleWhatsAppClick("Navbar CTA")}
            className="hidden md:flex items-center gap-2 h-11 px-5 py-2.5 rounded-xl bg-[var(--brand-green)] hover:opacity-95 text-white text-sm font-medium shadow-[0_2px_8px_rgba(12,140,94,0.25)] transition-all cursor-pointer shrink-0"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
            <span>{t.whatsapp}</span>
          </button>

          {/* Hamburger / Close Button (HANYA di Mobile < 768px) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Tutup Menu Navigasi" : "Buka Menu Navigasi"}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg text-[var(--text-primary)] hover:bg-[var(--surface-alt)] transition-colors cursor-pointer border border-[var(--border)]"
          >
            {mobileMenuOpen ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* ========================================================
          MOBILE DROPDOWN (SUMESTAWSOME STYLE)
          Kontainer mengambang tepat di bawah header, tanpa menutupi seluruh layar
          ======================================================== */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-[var(--canvas)] border-b border-[var(--border)] shadow-xl z-50 px-4 pt-3 pb-6 space-y-2 transition-all duration-200">
          {/* Mobile Drawer Brand Header - Single line, no wrap */}
          <div className="flex items-center gap-2.5 px-3 py-2 border-b border-[var(--border)] mb-1">
            <div className="relative w-7 h-7 shrink-0">
              <Image
                src="/assets/gede-logo.svg"
                alt="Gede Bali Guide"
                width={28}
                height={28}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="whitespace-nowrap min-w-0">
              <span className="block font-bold text-sm text-[var(--text-primary)] whitespace-nowrap leading-none">
                Gede Bali Guide
              </span>
              <span className="block text-[10px] font-semibold uppercase tracking-wider text-[var(--brand-blue)] whitespace-nowrap mt-0.5">
                Gede Sudiartana
              </span>
            </div>
          </div>

          <nav aria-label="Menu Mobile" className="space-y-1">
            {navItems.map((item) => {
              const active = isCurrentActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block font-sans text-base font-medium py-3 px-4 rounded-xl transition-colors ${
                    active
                      ? "bg-[var(--brand-blue-light)] text-[var(--brand-blue)] font-semibold"
                      : "text-[var(--text-muted)] hover:text-[var(--brand-blue)] hover:bg-[var(--brand-blue-light)]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Area Bawah: Bahasa & Tombol WhatsApp Seragam h-11 */}
          <div className="pt-3 border-t border-[var(--border)] space-y-3">
            <div className="flex items-center justify-between px-2">
              <span className="text-sm font-medium text-[var(--text-muted)]">
                {lang === "id" ? "Bahasa" : "Language"}
              </span>
              <div className="inline-flex items-center rounded-xl border border-[var(--border)] p-0.5 bg-[var(--surface-alt)] text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => handleLangToggle("id")}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    lang === "id"
                      ? "bg-white text-[var(--brand-blue)] shadow-xs font-bold"
                      : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  ID
                </button>
                <span className="text-[var(--border)] text-[10px] mx-1">|</span>
                <button
                  type="button"
                  onClick={() => handleLangToggle("en")}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    lang === "en"
                      ? "bg-white text-[var(--brand-blue)] shadow-xs font-bold"
                      : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  EN
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                handleWhatsAppClick("Mobile Dropdown CTA");
              }}
              className="w-full h-11 flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--brand-green)] hover:opacity-95 text-white font-medium text-sm shadow-[0_2px_8px_rgba(12,140,94,0.25)] transition-all cursor-pointer"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
              <span>{t.consultWa}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
