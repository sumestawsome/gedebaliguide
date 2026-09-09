"use client";

import React, { useState } from "react";
import { MessageCircle, Globe, Check, Copy, ExternalLink, Sparkles, ShieldCheck } from "lucide-react";
import { mockGuideProfile } from "@/data/mock-data";
import { getGeneralConsultationUrl } from "@/lib/whatsapp";

function InstagramIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export default function ContactSocialCta() {
  const [copied, setCopied] = useState(false);
  const waUrl = getGeneralConsultationUrl("contact");

  const socialLinks = [
    {
      name: "Instagram",
      handle: "@gedebaliguide",
      url: "https://instagram.com/gedebaliguide",
      desc: "Story harian & dokumentasi visual liburan tamu",
      icon: InstagramIcon,
      color: "hover:text-pink-600 hover:border-pink-300",
      bgColor: "bg-pink-50 text-pink-700",
    },
    {
      name: "Facebook",
      handle: "Gede Bali Guide - Private Tours",
      url: "https://facebook.com/gedebaliguide",
      desc: "Komunitas wisatawan & update rute wisata terbaru",
      icon: FacebookIcon,
      color: "hover:text-blue-600 hover:border-blue-300",
      bgColor: "bg-blue-50 text-blue-700",
    },
    {
      name: "Google Maps & Review",
      handle: "Gede Bali Guide Ubud",
      url: "https://maps.google.com/?q=Gede+Bali+Guide",
      desc: "Titik temu, ulasan bintang 5 & navigasi rute",
      icon: Globe,
      color: "hover:text-emerald-600 hover:border-emerald-300",
      bgColor: "bg-emerald-50 text-emerald-700",
    },
  ];

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(mockGuideProfile.phone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="mt-12 space-y-8">
      {/* Big High-Converting WhatsApp Funnel Card */}
      <div className="rounded-3xl bg-gradient-to-br from-stone-900 via-stone-900 to-stone-950 p-6 sm:p-8 md:p-10 text-white shadow-xl relative overflow-hidden">
        {/* Glow decorative spheres */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 h-64 w-64 rounded-full bg-blue-500/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center md:text-left max-w-xl">
            {/* Status indicator */}
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1 text-xs font-semibold text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>Online Sekarang • Respon Rata-rata &lt; 15 Menit</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Konsultasi Langsung dengan Bli Gede
            </h3>

            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">
              Kirimkan pertanyaan tentang destinasi atau rencana tanggal liburan Anda. Bli Gede akan menyusun jadwal yang efisien dan nyaman untuk keluarga Anda.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-stone-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                <span>Tanpa Biaya Konsultasi</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                <span>Rute Bebas Toko Komisi</span>
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0 w-full sm:w-auto">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 rounded-2xl bg-emerald-600 px-7 py-4 text-sm sm:text-base font-bold text-white shadow-xl shadow-emerald-600/30 hover:bg-emerald-500 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <MessageCircle className="h-5 w-5" />
              <span>Buka Chat WhatsApp</span>
            </a>

            <button
              onClick={handleCopyPhone}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-stone-700 bg-stone-800/80 px-5 py-3 text-xs font-semibold text-stone-300 hover:bg-stone-700 hover:text-white transition-colors"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-emerald-400" />
                  <span className="text-emerald-400">Nomor Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>Salin Nomor: {mockGuideProfile.phone}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Social Media Channels Grid */}
      <div>
        <div className="mb-4">
          <h4 className="font-serif text-lg font-bold text-stone-900">
            Kunjungi Saluran Dokumentasi & Sosial Media Bli Gede
          </h4>
          <p className="text-xs text-stone-500">
            Lihat suasana tur terbaru dan dokumentasi wisatawan setiap minggunya.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {socialLinks.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <a
                key={idx}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex items-start gap-4 rounded-2xl border border-stone-200 bg-white p-5 shadow-2xs hover:shadow-md transition-all ${item.color}`}
              >
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${item.bgColor}`}>
                  <IconComp className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-sm font-bold text-stone-900 group-hover:text-current transition-colors">
                      {item.name}
                    </span>
                    <ExternalLink className="h-3.5 w-3.5 text-stone-400 group-hover:text-current transition-colors" />
                  </div>
                  <span className="block text-xs font-semibold text-blue-700 truncate">
                    {item.handle}
                  </span>
                  <p className="text-[11px] text-stone-500 leading-snug">
                    {item.desc}
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
