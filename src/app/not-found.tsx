"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function NotFound() {
  const [language, setLanguage] = useState<"id" | "en">("id");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("app_lang");
      if (saved === "id" || saved === "en") setLanguage(saved);
    } catch {}
    const handleLang = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.lang === "id" || detail?.lang === "en") {
        setLanguage(detail.lang);
      }
    };
    window.addEventListener("appLanguageChange", handleLang);
    return () => window.removeEventListener("appLanguageChange", handleLang);
  }, []);

  const generalWhatsappUrl =
    "https://wa.me/6281234567890?text=Halo%20Bli%20Gede%2C%20saya%20ingin%20konsultasi%20tur%20Bali";

  const isId = language === "id";

  return (
    <div className="min-h-screen bg-[#FEFDFB] text-[#121715] flex flex-col font-sans selection:bg-amber-100 selection:text-amber-900">
      {/* ========================================================
          BAGIAN TENGAH (404 Fallback Editorial)
          ======================================================== */}
      <main className="flex-1 flex items-center justify-center py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          {/* Badge Ornamen Tropis */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F7F1] text-[#006B49] text-xs font-semibold border border-[#0C8C5E]/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#0C8C5E] animate-pulse" />
            <span>{isId ? "Mode Demo Pratinjau" : "Preview Demo Mode"}</span>
          </div>

          {/* Judul Editorial */}
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#08090A] font-normal leading-tight tracking-tight mb-5">
            {isId
              ? "Om Swastyastu! Halaman Sedang Disiapkan"
              : "Om Swastyastu! Page Under Preparation"}
          </h1>

          {/* Keterangan */}
          <p className="text-[#5E6965] text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-10">
            {isId
              ? "Fitur dan halaman ini masih dalam tahap penataan untuk pratinjau klien. Bli Gede sedang merapikan informasi lengkap agar pengalaman liburan Anda semakin berkesan. Silakan kembali ke beranda untuk melihat tampilan beranda utama."
              : "This feature and section are currently in preparation for client preview. Bli Gede is refining the full content to ensure a remarkable holiday experience. Please return to the homepage to explore the main landing page."}
          </p>

          {/* 2 Tombol Aksi */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/coming-soon"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#E67E22] hover:bg-[#D35400] text-white font-bold text-sm sm:text-base shadow-[0_4px_16px_rgba(230,126,34,0.3)] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 text-center"
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
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
              <span>{isId ? "Chat via WhatsApp" : "Chat on WhatsApp"}</span>
            </Link>

            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white hover:bg-[#FAF8F5] text-[#08090A] border border-[#CFCDCA] font-semibold text-sm sm:text-base transition-colors text-center"
            >
              <span>{isId ? "Kembali ke Beranda" : "Back to Home"}</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </main>

      {/* ========================================================
          FOOTER LENGKAP (Konsisten dengan Landing Page)
          ======================================================== */}
      <footer className="bg-[#08090A] text-white pt-14 pb-8 px-4 sm:px-6 lg:px-8 mt-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-white/10">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0C8C5E] to-[#006B49] flex items-center justify-center text-white">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </div>
              <span className="font-bold text-lg tracking-tight">Gede Bali Guide</span>
            </div>
            <p className="text-[#969E9B] text-xs sm:text-sm leading-relaxed max-w-sm mb-4">
              {isId
                ? "Pemandu tur privat berlisensi resmi HPI Bali (No. HPI-BALI-2015-8849). Menyajikan pengalaman liburan autentik, nyaman, dan ramah dengan rute fleksibel di seluruh penjuru pulau dewata."
                : "Official licensed private tour guide by HPI Bali (No. HPI-BALI-2015-8849). Delivering authentic, comfortable, and tailored Balinese holiday journeys across the island of gods."}
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-xs text-[#1878B8]">
              <span className="w-2 h-2 rounded-full bg-[#1878B8]" />
              Terdaftar Resmi di HPI Bali
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="font-semibold text-sm mb-4 tracking-wide uppercase text-white/80">
              {isId ? "Navigasi Cepat" : "Quick Links"}
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#969E9B]">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  {isId ? "Beranda" : "Home"}
                </Link>
              </li>
              <li>
                <Link href="/coming-soon" className="hover:text-white transition-colors">
                  {isId ? "Katalog Paket Tur" : "Tour Packages"}
                </Link>
              </li>
              <li>
                <Link href="/coming-soon" className="hover:text-white transition-colors">
                  {isId ? "Tentang Gede & Lisensi HPI" : "About Gede & License"}
                </Link>
              </li>
              <li>
                <Link href="/coming-soon" className="hover:text-white transition-colors">
                  {isId ? "Galeri Wisata" : "Photo Gallery"}
                </Link>
              </li>
              <li>
                <Link href="/coming-soon" className="hover:text-white transition-colors">
                  {isId ? "Ulasan Tamu (Rating 5.0)" : "Guest Reviews (5.0)"}
                </Link>
              </li>
              <li>
                <Link href="/coming-soon" className="hover:text-white transition-colors">
                  {isId ? "Pertanyaan Umum (FAQ)" : "FAQ"}
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <div className="font-semibold text-sm mb-4 tracking-wide uppercase text-white/80">
              {isId ? "Hubungi Langsung" : "Direct Contact"}
            </div>
            <div className="space-y-2.5 text-xs sm:text-sm text-[#969E9B]">
              <div className="flex items-start gap-2.5">
                <span className="text-white font-medium">WhatsApp:</span>
                <Link
                  href="/coming-soon"
                  className="text-[#E67E22] hover:underline"
                >
                  +62 812-3456-7890
                </Link>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-white font-medium">{isId ? "Wilayah:" : "Area:"}</span>
                <span>Denpasar, Badung, Gianyar, Tabanan, Buleleng</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-white font-medium">{isId ? "Operasional:" : "Hours:"}</span>
                <span>07.00 - 22.00 WITA</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#717D79]">
          <div>© 2026 Gede Bali Guide (Gede Sudiartana). All rights reserved.</div>
          <div className="font-mono text-[11px]">Lisensi: HPI-BALI-2015-8849</div>
        </div>
      </footer>
    </div>
  );
}
