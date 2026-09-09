"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MessageCircle, Menu, X, Phone, ShieldCheck } from "lucide-react";
import { mockGuideProfile } from "@/data/mock-data";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-200/80 bg-[#fafaf9]/90 backdrop-blur-md transition-all">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-700 text-stone-50 font-serif font-bold text-lg shadow-sm">
            G
          </div>
          <div>
            <span className="block font-serif text-lg sm:text-xl font-bold tracking-tight text-stone-900 group-hover:text-blue-700 transition-colors">
              {mockGuideProfile.name}
            </span>
            <span className="flex items-center gap-1 text-[11px] font-medium tracking-wide uppercase text-stone-500">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 inline" /> HPI Bali Licensed Guide
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600">
          <Link href="/" className="text-stone-900 font-semibold hover:text-blue-700 transition-colors">
            Beranda
          </Link>
          <Link href="/tours" className="hover:text-blue-700 transition-colors">
            Katalog Tur
          </Link>
          <Link href="/about" className="hover:text-blue-700 transition-colors">
            Tentang Gede
          </Link>
          <Link href="/gallery" className="hover:text-blue-700 transition-colors">
            Galeri
          </Link>
          <Link href="/reviews" className="hover:text-blue-700 transition-colors">
            Ulasan
          </Link>
          <Link href="/faq" className="hover:text-blue-700 transition-colors">
            FAQ
          </Link>
          <Link href="/contact" className="hover:text-blue-700 transition-colors">
            Kontak
          </Link>
        </nav>

        {/* WhatsApp CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={`https://wa.me/${mockGuideProfile.whatsappNumber}?text=Halo%20Bli%20Gede,%20saya%20tertarik%20untuk%20konsultasi%20tur%20privat%20di%20Bali.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 transition-all active:scale-95"
          >
            <MessageCircle className="h-4 w-4" />
            <span>Chat WhatsApp</span>
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-lg p-2 text-stone-600 hover:bg-stone-200/60 focus:outline-none"
            aria-expanded={mobileMenuOpen}
            aria-label="Buka menu navigasi"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile nav menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-stone-200 bg-[#fafaf9] px-4 pt-2 pb-6 space-y-3">
          <div className="flex flex-col space-y-2 text-base font-medium text-stone-700">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-md px-3 py-2 text-stone-900 bg-stone-200/50"
            >
              Beranda
            </Link>
            <Link
              href="/tours"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-md px-3 py-2 hover:bg-stone-100"
            >
              Katalog Tur
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-md px-3 py-2 hover:bg-stone-100"
            >
              Tentang Gede
            </Link>
            <Link
              href="/gallery"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-md px-3 py-2 hover:bg-stone-100"
            >
              Galeri
            </Link>
            <Link
              href="/reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-md px-3 py-2 hover:bg-stone-100"
            >
              Ulasan Tamu
            </Link>
            <Link
              href="/faq"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-md px-3 py-2 hover:bg-stone-100"
            >
              FAQ
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-md px-3 py-2 hover:bg-stone-100"
            >
              Kontak
            </Link>
          </div>
          <div className="pt-2 border-t border-stone-200">
            <a
              href={`https://wa.me/${mockGuideProfile.whatsappNumber}?text=Halo%20Bli%20Gede,%20saya%20tertarik%20untuk%20konsultasi%20tur%20privat%20di%20Bali.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Tanya via WhatsApp Langsung</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
