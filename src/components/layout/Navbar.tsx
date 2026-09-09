"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle, Menu, X, ShieldCheck, Compass, UserCheck, Camera, Star, HelpCircle, Mail } from "lucide-react";
import { mockGuideProfile } from "@/data/mock-data";
import { getGeneralConsultationUrl } from "@/lib/whatsapp";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const waUrl = getGeneralConsultationUrl("navbar");

  const navItems = [
    { href: "/", label: "Beranda", icon: null },
    { href: "/tours", label: "Katalog Tur", icon: Compass },
    { href: "/about", label: "Tentang Gede", icon: UserCheck, desc: "Profil & Lisensi HPI" },
    { href: "/gallery", label: "Galeri", icon: Camera, desc: "Dokumentasi Foto" },
    { href: "/reviews", label: "Ulasan", icon: Star, desc: "Testimoni Bintang 5" },
    { href: "/faq", label: "FAQ", icon: HelpCircle },
    { href: "/contact", label: "Kontak", icon: Mail },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-200/80 bg-[#fafaf9]/90 backdrop-blur-md transition-all">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Brand Logo */}
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
        <nav className="hidden md:flex items-center gap-6 lg:gap-7 text-sm font-medium text-stone-600">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative py-1 transition-colors ${
                  active
                    ? "font-bold text-blue-700"
                    : "hover:text-blue-700 text-stone-600"
                }`}
              >
                <span>{item.label}</span>
                {active && (
                  <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-blue-600" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop WhatsApp CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 transition-all active:scale-95"
          >
            <MessageCircle className="h-4 w-4" />
            <span>Chat WhatsApp</span>
          </a>
        </div>

        {/* Mobile menu toggle button */}
        <div className="flex md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-lg p-2 text-stone-600 hover:bg-stone-200/60 focus:outline-hidden"
            aria-expanded={mobileMenuOpen}
            aria-label="Buka menu navigasi"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile nav menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-stone-200 bg-[#fafaf9] px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-1 text-sm font-medium text-stone-800">
            {navItems.map((item) => {
              const active = isActive(item.href);
              const IconComponent = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 transition-colors ${
                    active
                      ? "bg-blue-50 text-blue-800 font-bold border-l-4 border-blue-600"
                      : "hover:bg-stone-100 text-stone-700"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {IconComponent && <IconComponent className={`h-4 w-4 ${active ? "text-blue-700" : "text-stone-400"}`} />}
                    <span>{item.label}</span>
                  </div>
                  {item.desc && (
                    <span className="text-[11px] text-stone-400 font-normal">
                      {item.desc}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-stone-200">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3.5 text-sm font-bold text-white shadow-md hover:bg-emerald-500 active:scale-[0.98] transition-all"
            >
              <MessageCircle className="h-5 w-5" />
              <span>Tanya via WhatsApp Langsung</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
