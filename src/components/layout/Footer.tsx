"use client";

import React from "react";
import Link from "next/link";
import { handleWhatsAppClick } from "@/lib/lead-tracker";

export default function Footer() {
  return (
    <footer className="bg-[#08090A] text-white pt-14 pb-12 px-4 sm:px-6 lg:px-8 mt-auto border-t border-white/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-white/10">
        {/* Kolom 1: Profil Brand & Lisensi */}
        <div className="md:col-span-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#1878B8] to-[#0F4C81] flex items-center justify-center text-white shadow-xs">
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
                <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
                <path d="M12 6v6l4 2" />
              </svg>
            </div>
            <div className="font-serif font-bold text-lg text-white tracking-tight">
              Gede Bali Guide
            </div>
          </div>
          <p className="text-xs sm:text-sm text-[#969E9B] leading-relaxed mb-4 max-w-sm">
            Pemandu wisata privat profesional berlisensi resmi HPI Bali (No. Lisensi: HPI-BALI-2015-8849). Menyajikan liburan keluarga dan pasangan dengan kenyamanan mobil ber-AC, rute fleksibel, dan tanpa komisi toko oleh-oleh.
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-[#1878B8]">
            <span className="w-2 h-2 rounded-full bg-[#1878B8]" />
            <span className="font-medium text-white/90">
              Pemandu Wisata Resmi Bersertifikat HPI Bali
            </span>
          </div>
        </div>

        {/* Kolom 2: Tautan Cepat */}
        <div className="md:col-span-3">
          <div className="font-semibold text-sm mb-4 tracking-wide uppercase text-white/80">
            Tautan Cepat
          </div>
          <ul className="space-y-2.5 text-xs sm:text-sm text-[#969E9B]">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Beranda
              </Link>
            </li>
            <li>
              <Link href="/tours" className="hover:text-white transition-colors">
                Katalog Tur
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white transition-colors">
                Tentang Gede
              </Link>
            </li>
            <li>
              <Link href="/gallery" className="hover:text-white transition-colors">
                Galeri
              </Link>
            </li>
            <li>
              <Link href="/reviews" className="hover:text-white transition-colors">
                Ulasan Tamu
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-white transition-colors">
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        {/* Kolom 3: Kontak Langsung */}
        <div className="md:col-span-4">
          <div className="font-semibold text-sm mb-4 tracking-wide uppercase text-white/80">
            Kontak Langsung
          </div>
          <div className="space-y-2.5 text-xs sm:text-sm text-[#969E9B]">
            <div className="flex items-start gap-2.5">
              <span className="text-white font-medium">WhatsApp:</span>
              <a
                href="https://wa.me/6281234567890"
                onClick={(e) => {
                  e.preventDefault();
                  handleWhatsAppClick("Footer Direct Contact");
                }}
                className="text-[#E67E22] hover:underline cursor-pointer"
              >
                +62 812-3456-7890
              </a>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="text-white font-medium">Wilayah Layanan:</span>
              <span>Denpasar, Badung, Gianyar, Tabanan, Buleleng</span>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="text-white font-medium">Jam Operasional:</span>
              <span>07:00 – 22:00 WITA (GMT+8)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#717D79]">
        <div>© 2026 Gede Bali Guide (Gede Sudiartana). Seluruh hak cipta dilindungi.</div>
        <div className="font-mono text-[11px]">No. Lisensi: HPI-BALI-2015-8849</div>
      </div>
    </footer>
  );
}
