"use client";

import React from "react";
import {
  ShieldCheck,
  BadgePercent,
  Sparkles,
  ShoppingBag,
  MessageCircle,
  CheckCircle2,
  Lock,
} from "lucide-react";
import { getGeneralConsultationUrl } from "@/lib/whatsapp";

export default function DirectPricingBanner() {
  const waUrl = getGeneralConsultationUrl("tour_card");

  const guarantees = [
    {
      icon: <BadgePercent className="h-5 w-5 text-emerald-600" />,
      title: "Hemat 20% - 30% Tanpa Komisi Platform",
      desc: "Harga murni lokal langsung ke guide resmi Anda. Tidak ada potongan komisi calo atau biaya platform marketplace OTA.",
    },
    {
      icon: <Lock className="h-5 w-5 text-blue-600" />,
      title: "Tanpa Uang Muka (Bebas DP)",
      desc: "Cukup konfirmasi jadwal via WhatsApp. Pembayaran penuh dilakukan saat bertemu langsung di hari penjemputan tur.",
    },
    {
      icon: <ShoppingBag className="h-5 w-5 text-amber-600" />,
      title: "100% Bebas Toko Komisi (No Forced Shopping)",
      desc: "Bli Gede tidak akan pernah membawa Anda ke toko suvenir titipan atau galeri calo. Waktu tur sepenuhnya milik Anda.",
    },
    {
      icon: <Sparkles className="h-5 w-5 text-purple-600" />,
      title: "Konsultasi Rute Langsung dengan Pemandu",
      desc: "Berdiskusi langsung dengan Bli Gede tentang kondisi fisik rombongan, ritme tempo liburan, dan spot foto terbaik.",
    },
  ];

  return (
    <div className="rounded-3xl border border-stone-200/90 bg-gradient-to-br from-white via-[#fafaf9] to-stone-50 p-6 sm:p-9 shadow-sm">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-stone-200/80">
        <div className="space-y-1.5 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-0.5 text-xs font-bold uppercase tracking-wider text-emerald-800">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
            <span>Garansi Transparansi Harga</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
            Harga Langsung Tanpa Perantara & Tanpa Biaya Tersembunyi
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
            Dengan memesan langsung melalui website ini, Anda terhubung tanpa pihak ketiga dengan Gede Sudiartana. Seluruh biaya sewa mobil privat, BBM, tol, dan jasa pemandu sudah termasuk.
          </p>
        </div>

        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-emerald-500 transition-all shrink-0 w-full sm:w-auto"
        >
          <MessageCircle className="h-4 w-4" />
          <span>Tanya Harga Paket via WhatsApp</span>
        </a>
      </div>

      {/* 4 Value Propositions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-6">
        {guarantees.map((item, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-stone-200/70 bg-white p-4.5 space-y-2 shadow-2xs hover:border-emerald-200 transition-colors"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-stone-50 border border-stone-100">
              {item.icon}
            </div>
            <h3 className="font-serif text-sm font-bold text-stone-900 leading-snug">
              {item.title}
            </h3>
            <p className="text-[11px] sm:text-xs text-stone-600 leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
