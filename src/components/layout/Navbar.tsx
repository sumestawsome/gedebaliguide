"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { handleWhatsAppClick } from "@/lib/lead-tracker";

interface NavbarProps {
  currentLang?: "id" | "en";
  onLanguageChange?: (lang: "id" | "en") => void;
}

export default function Navbar({ currentLang, onLanguageChange }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [internalLang, setInternalLang] = useState<"id" | "en">("id");
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  const lang = currentLang !== undefined ? currentLang : internalLang;

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem("app_lang");
      if (saved === "id" || saved === "en") {
        setInternalLang(saved);
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

  // Prevent background scroll and notify floating widgets when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("mobile-menu-open");
      window.dispatchEvent(new CustomEvent("mobileMenuChange", { detail: { open: true } }));
    } else {
      document.body.style.overflow = "";
      document.body.classList.remove("mobile-menu-open");
      window.dispatchEvent(new CustomEvent("mobileMenuChange", { detail: { open: false } }));
    }
    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("mobile-menu-open");
      window.dispatchEvent(new CustomEvent("mobileMenuChange", { detail: { open: false } }));
    };
  }, [mobileMenuOpen]);

  // Close drawer automatically on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

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
    <>
      <header className="sticky top-0 z-40 bg-[#FEFDFB]/95 backdrop-blur-md border-b border-[#EBE9E6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between gap-4">
          {/* Brand Logo & Title */}
          <Link
            href="/"
            className="flex items-center gap-2.5 sm:gap-3 no-underline text-[#08090A] group shrink-0"
          >
            <div className="w-[38px] h-[38px] rounded-lg bg-gradient-to-br from-[#1878B8] to-[#0F4C81] flex items-center justify-center text-white shadow-[0_2px_8px_rgba(24,120,184,0.3)] transition-transform duration-200 group-hover:scale-105 shrink-0">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
                <path d="M12 6v6l4 2" />
              </svg>
            </div>
            <div className="whitespace-nowrap">
              <span className="block font-bold text-base sm:text-lg leading-tight tracking-tight text-[#08090A]">
                Gede Bali Guide
              </span>
              <span className="block text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#1878B8]">
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
                      ? "text-[#1878B8] bg-[#EBF5FB] font-semibold"
                      : "text-[#5E6965] hover:text-[#1878B8] hover:bg-[#F2FAF6] font-medium"
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
            <div className="hidden sm:inline-flex items-center rounded-lg border border-[#EBE9E6] p-0.5 bg-[#FAF8F5] text-xs font-semibold">
              <button
                type="button"
                onClick={() => handleLangToggle("id")}
                className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                  lang === "id"
                    ? "bg-white text-[#1878B8] shadow-xs font-bold"
                    : "text-[#5E6965] hover:text-[#08090A]"
                }`}
              >
                ID
              </button>
              <span className="text-[#CFCDCA] text-[10px]">|</span>
              <button
                type="button"
                onClick={() => handleLangToggle("en")}
                className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                  lang === "en"
                    ? "bg-white text-[#1878B8] shadow-xs font-bold"
                    : "text-[#5E6965] hover:text-[#08090A]"
                }`}
              >
                EN
              </button>
            </div>

            {/* Direct WhatsApp CTA Button (Desktop >= 768px) */}
            <button
              type="button"
              onClick={() => handleWhatsAppClick("Navbar CTA")}
              className="hidden md:flex items-center gap-2 h-11 px-5 py-2.5 rounded-xl bg-[#0C8C5E] hover:bg-[#09734C] text-white text-sm font-medium shadow-[0_2px_8px_rgba(12,140,94,0.25)] transition-all cursor-pointer shrink-0"
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
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
              <span>{t.whatsapp}</span>
            </button>

            {/* Hamburger Button (HANYA di Mobile < 768px) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Buka Menu Navigasi"
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg text-[#121715] hover:bg-[#FAF8F5] transition-colors cursor-pointer border border-[#EBE9E6]"
            >
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
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================
          MOBILE DRAWER MENGGUNAKAN REACT PORTAL KE DOCUMENT.BODY
          - Level terluar (bebas dari pembatas tinggi header & overflow)
          - Kelas: 'fixed inset-0 z-50 w-screen h-screen bg-[#FEFDFB] flex flex-col justify-between p-6 overflow-y-auto'
          ======================================================== */}
      {mounted &&
        mobileMenuOpen &&
        createPortal(
          <div className="fixed inset-0 z-50 w-screen h-screen bg-[#FEFDFB] flex flex-col justify-between p-6 overflow-y-auto animate-in fade-in duration-150">
            {/* 1. Header Drawer: Logo + Tombol Tutup (X) sejajar di atas */}
            <div className="flex items-center justify-between pb-5 border-b border-[#EBE9E6] shrink-0">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 sm:gap-3 no-underline text-[#08090A] group shrink-0"
              >
                <div className="w-[38px] h-[38px] rounded-lg bg-gradient-to-br from-[#1878B8] to-[#0F4C81] flex items-center justify-center text-white shadow-[0_2px_8px_rgba(24,120,184,0.3)] shrink-0">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                </div>
                <div className="whitespace-nowrap">
                  <span className="block font-bold text-base leading-tight tracking-tight text-[#08090A]">
                    Gede Bali Guide
                  </span>
                  <span className="block text-[10px] font-semibold uppercase tracking-wider text-[#1878B8]">
                    Private Tour Specialist
                  </span>
                </div>
              </Link>

              {/* Tombol Tutup (X) yang nyaman ditekan */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Tutup Menu"
                className="flex items-center justify-center w-10 h-10 rounded-lg text-[#121715] hover:bg-[#FAF8F5] transition-colors cursor-pointer border border-[#EBE9E6]"
              >
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
              </button>
            </div>

            {/* 2. Isi Drawer: 4 Menu Utama font Inter text-base py-3 */}
            <nav className="flex-1 py-6 space-y-1.5 overflow-y-auto">
              {navItems.map((item) => {
                const active = isCurrentActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block font-sans text-base py-3 px-4 rounded-xl transition-colors ${
                      active
                        ? "bg-[#EBF5FB] text-[#1878B8] font-semibold"
                        : "text-[#5E6965] hover:text-[#1878B8] hover:bg-[#F2FAF6] font-medium"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* 3. Penataan Area Bawah: Bahasa & Tombol WhatsApp */}
            <div className="pt-6 pb-2 border-t border-[#EBE9E6] shrink-0 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[#5E6965]">
                  {lang === "id" ? "Bahasa" : "Language"}
                </span>
                <div className="inline-flex items-center rounded-xl border border-[#EBE9E6] p-1 bg-[#FAF8F5] text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => handleLangToggle("id")}
                    className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                      lang === "id"
                        ? "bg-white text-[#1878B8] shadow-xs font-bold"
                        : "text-[#5E6965] hover:text-[#08090A]"
                    }`}
                  >
                    ID
                  </button>
                  <span className="text-[#CFCDCA] text-[10px] mx-1">|</span>
                  <button
                    type="button"
                    onClick={() => handleLangToggle("en")}
                    className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                      lang === "en"
                        ? "bg-white text-[#1878B8] shadow-xs font-bold"
                        : "text-[#5E6965] hover:text-[#08090A]"
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
                  handleWhatsAppClick("Mobile Drawer CTA");
                }}
                className="w-full h-11 flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#0C8C5E] hover:bg-[#09734C] text-white font-medium text-sm shadow-[0_2px_8px_rgba(12,140,94,0.25)] transition-all cursor-pointer"
              >
                <svg
                  width="20"
                  height="20"
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
          </div>,
          document.body
        )}
    </>
  );
}
