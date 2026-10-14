"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAdminContext } from "./AdminContext";
import {
  Globe,
  LogOut,
  ExternalLink,
  Pencil,
  Sparkles,
  User,
  Menu,
  X,
  Compass,
  FileText,
  Home,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";

export default function AdminNavbar() {
  const pathname = usePathname();
  const { lang, setLang, adminUser, hasUnsavedChanges, isSaving, logout } = useAdminContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    toast("Keluar dari Panel Admin?", {
      description: hasUnsavedChanges
        ? "Masih ada perubahan yang belum disimpan. Perubahan tersebut akan hilang jika Anda keluar sekarang."
        : "Anda akan mengakhiri sesi administrator.",
      duration: 8000,
      action: {
        label: "Ya, Keluar",
        onClick: async () => {
          await logout();
        },
      },
      cancel: {
        label: "Batal",
        onClick: () => {},
      },
    });
  };

  // Jangan tampilkan toolbar di halaman login
  if (pathname === "/admin/login") {
    return null;
  }

  const isHomeEditor = pathname === "/admin/home" || pathname === "/admin";
  const isAboutEditor = pathname.startsWith("/admin/about");
  const publicViewHref = isAboutEditor ? "/about" : "/";

  const navLinks = [
    {
      href: "/admin/home",
      label: "Editor Beranda",
      icon: Home,
      active: isHomeEditor,
    },
    {
      href: "/admin/about",
      label: "Editor Tentang",
      icon: FileText,
      active: isAboutEditor,
    },
    {
      href: publicViewHref,
      label: "Lihat Tampilan Publik",
      icon: ExternalLink,
      target: "_blank",
      active: false,
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#EBE9E6] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Sisi Kiri: Brand & Menu Navigasi */}
          <div className="flex items-center gap-6">
            <Link
              href="/admin/home"
              className="flex items-center gap-2 group transition-transform active:scale-95"
            >
              <div className="w-8 h-8 rounded-xl bg-[#1878B8] flex items-center justify-center text-white shadow-xs">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-sm font-bold text-[#08090A] tracking-tight group-hover:text-[#1878B8] transition-colors">
                  Gede Bali Guide
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#1878B8]">
                  Panel Admin
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 bg-[#FAF8F5] p-1 rounded-xl border border-[#EBE9E6]">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    target={link.target}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      link.active
                        ? "bg-white text-[#1878B8] shadow-xs"
                        : "text-[#5E6965] hover:text-[#08090A] hover:bg-white/60"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{link.label}</span>
                    {link.target === "_blank" && (
                      <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Sisi Tengah / Kanan: Global Bilingual Switcher & Profile Actions */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Global Language Switcher */}
            <div className="flex items-center bg-[#FAF8F5] p-1 rounded-xl border border-[#EBE9E6]">
              <span className="text-[11px] font-semibold text-[#5E6965] px-2 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-[#1878B8]" />
                <span className="hidden lg:inline">Bahasa:</span>
              </span>
              <div className="flex items-center p-0.5 rounded-lg bg-white/70 border border-[#EBE9E6]/80">
                <button
                  type="button"
                  onClick={() => setLang("id")}
                  className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                    lang === "id"
                      ? "bg-[#1878B8] text-white shadow-xs"
                      : "text-[#5E6965] hover:text-[#08090A]"
                  }`}
                  title="Beralih ke mode edit Bahasa Indonesia"
                >
                  ID
                </button>
                <button
                  type="button"
                  onClick={() => setLang("en")}
                  className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                    lang === "en"
                      ? "bg-[#1878B8] text-white shadow-xs"
                      : "text-[#5E6965] hover:text-[#08090A]"
                  }`}
                  title="Switch to English editing mode"
                >
                  EN
                </button>
              </div>
            </div>

            {/* Indikator Status Perubahan */}
            <div className="hidden lg:flex items-center">
              {hasUnsavedChanges ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-[11px] font-semibold text-amber-800">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  Ada Perubahan
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E8F6F0] border border-[#0C8C5E]/30 text-[11px] font-semibold text-[#0C8C5E]">
                  <CheckCircle2 className="w-3 h-3" />
                  Tersimpan
                </span>
              )}
            </div>

            {/* Profile Pill & Logout Button */}
            <div className="flex items-center gap-2 pl-2 border-l border-[#EBE9E6]">
              <div
                className="flex items-center gap-2 px-2.5 py-1 rounded-xl bg-[#FAF8F5] border border-[#EBE9E6]"
                title={adminUser?.email || "Admin Terautentikasi"}
              >
                {adminUser?.picture ? (
                  <img
                    src={adminUser.picture}
                    alt={adminUser.name || "Admin"}
                    className="w-6 h-6 rounded-full object-cover border border-[#D3D8D6]"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-[#1878B8]/10 text-[#1878B8] flex items-center justify-center text-xs font-bold">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
                <span className="text-xs font-semibold text-[#08090A] max-w-[120px] truncate">
                  {adminUser?.name || adminUser?.email?.split("@")[0] || "Admin"}
                </span>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="p-2 rounded-xl text-[#5E6965] hover:text-red-700 hover:bg-red-50 transition-colors cursor-pointer"
                title="Keluar dari Panel Admin"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Mobile Menu Controls */}
          <div className="flex items-center gap-2 sm:hidden">
            {/* Segmented Badge Toggle */}
            <div className="flex items-center p-0.5 rounded-lg bg-[#FAF8F5] border border-[#EBE9E6] text-xs font-bold">
              <button
                type="button"
                onClick={() => setLang("id")}
                className={`px-2 py-0.5 rounded-md transition-all cursor-pointer ${
                  lang === "id"
                    ? "bg-[#1878B8] text-white shadow-xs"
                    : "text-[#5E6965] hover:text-[#08090A]"
                }`}
                title="Mode ID"
              >
                ID
              </button>
              <button
                type="button"
                onClick={() => setLang("en")}
                className={`px-2 py-0.5 rounded-md transition-all cursor-pointer ${
                  lang === "en"
                    ? "bg-[#1878B8] text-white shadow-xs"
                    : "text-[#5E6965] hover:text-[#08090A]"
                }`}
                title="Mode EN"
              >
                EN
              </button>
            </div>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-[#5E6965] hover:bg-[#FAF8F5]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-[#EBE9E6] bg-white px-4 py-3 space-y-3">
          <nav className="space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  target={link.target}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold ${
                    link.active
                      ? "bg-[#EBF5FB] text-[#1878B8]"
                      : "text-[#5E6965] hover:bg-[#FAF8F5]"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    <span>{link.label}</span>
                  </div>
                  {link.target === "_blank" && <ExternalLink className="w-3 h-3 opacity-60" />}
                </Link>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-[#EBE9E6] flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-[#5E6965]">
              <User className="w-3.5 h-3.5 text-[#1878B8]" />
              <span className="truncate max-w-[180px]">{adminUser?.email}</span>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-red-700 bg-red-50"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Keluar</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
