"use client";

import React from "react";
import {
  BadgePercent,
  Lock,
  ShoppingBag,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { handleWhatsAppClick } from "@/lib/lead-tracker";

interface DirectPricingBannerProps {
  lang?: "id" | "en";
}

export default function DirectPricingBanner({ lang = "id" }: DirectPricingBannerProps) {
  const content = {
    id: {
      badge: "Garansi Transparansi Harga",
      title: "Nilai Terbaik Tanpa Biaya Calo & Tanpa Uang Muka",
      subtitle:
        "Dengan memesan langsung melalui situs resmi ini, Anda terhubung langsung dengan Bli Gede tanpa potongan pihak ketiga atau biaya marketplace.",
      guarantees: [
        {
          icon: <BadgePercent className="h-5 w-5 text-[#0C8C5E]" />,
          title: "Hemat 20% – 30% Tanpa Komisi Platform",
          desc: "Tarif transparan murni lokal langsung ke pemandu Anda. Bebas biaya layanan marketplace OTA dan calo.",
        },
        {
          icon: <Lock className="h-5 w-5 text-[#1878B8]" />,
          title: "Tanpa Uang Muka (Bebas DP)",
          desc: "Cukup konfirmasi jadwal via WhatsApp. Pembayaran dilakukan secara tunai atau transfer saat hari tur selesai.",
        },
        {
          icon: <ShoppingBag className="h-5 w-5 text-[#E67E22]" />,
          title: "100% Bebas Toko Komisi (No Forced Shopping)",
          desc: "Bli Gede tidak akan pernah membawa Anda ke toko komisi atau suvenir titipan. Waktu liburan murni milik Anda.",
        },
        {
          icon: <Sparkles className="h-5 w-5 text-[#0C8C5E]" />,
          title: "Konsultasi Rute Langsung dengan Bli Gede",
          desc: "Bebas berdiskusi tentang preferensi keluarga, lansia, anak-anak, dan rekomendasi spot foto terbaik bebas macet.",
        },
      ],
      ctaTitle: "Punya Rencana Rute Sendiri atau Ingin Custom Itinerary?",
      ctaDesc:
        "Ceritakan destinasi impian Anda di Bali, Bli Gede siap menyusun rute paling nyaman, santai, dan efisien untuk keluarga Anda.",
      ctaBtn: "Konsultasi Rute Gratis via WhatsApp",
    },
    en: {
      badge: "Transparent Pricing Guarantee",
      title: "Best Value Without Middlemen & Zero Advance Deposit",
      subtitle:
        "Booking directly through this official site connects you straight to Bli Gede without marketplace commissions or hidden agency fees.",
      guarantees: [
        {
          icon: <BadgePercent className="h-5 w-5 text-[#0C8C5E]" />,
          title: "Save 20% – 30% No OTA Commissions",
          desc: "Authentic local rates paid directly to your licensed guide. No intermediary markups or booking platform fees.",
        },
        {
          icon: <Lock className="h-5 w-5 text-[#1878B8]" />,
          title: "Zero Advance Deposit (Pay on Day)",
          desc: "Simply confirm via WhatsApp. Settle payment in cash (IDR) or card transfer only after the tour concludes safely.",
        },
        {
          icon: <ShoppingBag className="h-5 w-5 text-[#E67E22]" />,
          title: "100% Free from Commission Shops",
          desc: "Zero forced stops at overpriced souvenir stores or tourist traps. Your precious holiday time is 100% yours.",
        },
        {
          icon: <Sparkles className="h-5 w-5 text-[#0C8C5E]" />,
          title: "Direct Consultation with Bli Gede",
          desc: "Discuss group pacing, child-friendly routes, or secret photography spots with your guide before arriving.",
        },
      ],
      ctaTitle: "Want a Tailor-Made Custom Tour Route?",
      ctaDesc:
        "Have your own bucket-list locations or special pace requirements? Chat directly with Bli Gede for a relaxed, custom itinerary.",
      ctaBtn: "Free WhatsApp Itinerary Advice",
    },
  };

  const t = content[lang];

  return (
    <div className="space-y-8 sm:space-y-10">
      {/* 4 Value Propositions Grid */}
      <div className="rounded-3xl border border-[#EBE9E6] bg-white p-6 sm:p-9 shadow-[0_4px_20px_rgba(12,140,94,0.05)]">
        <div className="max-w-2xl mb-8">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#E8F7F1] border border-[#0C8C5E]/20 px-3 py-1 text-xs font-semibold text-[#006B49] mb-3">
            <CheckCircle2 className="h-3.5 w-3.5 text-[#0C8C5E]" />
            <span>{t.badge}</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#08090A] leading-tight mb-2">
            {t.title}
          </h2>
          <p className="text-xs sm:text-sm text-[#5E6965] leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {t.guarantees.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-[#EBE9E6] bg-[#FEFDFB] p-5 space-y-2.5 hover:border-[#0C8C5E]/40 hover:-translate-y-1 transition-all duration-200"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-[#EBE9E6] shadow-xs">
                {item.icon}
              </div>
              <h3 className="font-bold text-sm text-[#08090A] leading-snug">
                {item.title}
              </h3>
              <p className="text-xs text-[#5E6965] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Banner CTA WhatsApp Sekunder di Bawahnya */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0F4C81] to-[#1878B8] text-white p-8 sm:p-10 lg:p-12 shadow-xl flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="max-w-2xl relative z-10">
          <h3 className="font-serif text-2xl sm:text-3xl font-normal leading-tight mb-3">
            {t.ctaTitle}
          </h3>
          <p className="text-sm text-white/90 leading-relaxed">
            {t.ctaDesc}
          </p>
        </div>

        <div className="relative z-10 shrink-0">
          <button
            type="button"
            onClick={() =>
              handleWhatsAppClick(
                "/tours - Bottom Banner",
                undefined,
                lang === "id"
                  ? "Halo Bli Gede, saya ingin konsultasi gratis rute custom itinerary untuk liburan privat di Bali."
                  : "Hello Bli Gede, I'd like to consult with you about custom private tour routes in Bali."
              )
            }
            className="inline-flex items-center justify-center gap-2 h-11 px-5 py-2.5 rounded-xl bg-[#E67E22] hover:bg-[#D35400] text-white font-medium text-sm shadow-[0_4px_16px_rgba(230,126,34,0.3)] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer w-full sm:w-auto"
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
            <span>{t.ctaBtn}</span>
          </button>
        </div>

        {/* Subtle Decorative Glow */}
        <div
          className="absolute -right-16 -bottom-16 w-64 h-64 rounded-full bg-[#E67E22]/20 blur-3xl pointer-events-none"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
