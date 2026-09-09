"use client";

import React from "react";
import { MessageCircle, ShieldCheck, Sparkles, Clock, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { getGeneralConsultationUrl } from "@/lib/whatsapp";
import { mockGuideProfile } from "@/data/mock-data";

export default function AboutCta() {
  const waUrl = getGeneralConsultationUrl("about_cta");

  return (
    <section className="bg-gradient-to-b from-stone-900 via-stone-900 to-stone-950 py-20 md:py-28 relative overflow-hidden text-white">
      {/* Glow decorations */}
      <div className="absolute top-0 right-1/4 -z-0 h-96 w-96 rounded-full bg-emerald-600/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 -z-0 h-80 w-80 rounded-full bg-blue-600/15 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400"
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span>Konsultasi Bebas Biaya Langsung ke Gede</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="space-y-4 max-w-3xl mx-auto"
        >
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-100 leading-[1.15]">
            Mari Rancang Liburan Bali yang Tenang & Bermakna
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-stone-300 leading-relaxed font-sans max-w-2xl mx-auto">
            Tidak perlu pusing menyusun rute macet atau bingung etika pura. Diskusikan rencana Anda bersama Bli Gede secara santai lewat WhatsApp.
          </p>
        </motion.div>

        {/* Highlight points */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-2 text-xs sm:text-sm text-stone-300">
          <span className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-emerald-400" />
            <span>Tanpa Biaya Admin Marketplace</span>
          </span>
          <span className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>Lisensi Resmi HPI No. {mockGuideProfile.licenseNumber}</span>
          </span>
          <span className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-emerald-400" />
            <span>Respon Cepat 07:00 - 22:00 WITA</span>
          </span>
        </div>

        {/* Big WhatsApp CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="pt-4"
        >
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full bg-emerald-600 px-8 py-4.5 text-base sm:text-lg font-bold text-white shadow-2xl shadow-emerald-600/40 hover:bg-emerald-500 hover:shadow-emerald-500/50 transition-all transform hover:-translate-y-1 active:translate-y-0"
          >
            <MessageCircle className="h-6 w-6 animate-bounce" />
            <span>Chat Langsung dengan Bli Gede</span>
          </a>
          <p className="mt-3 text-xs text-stone-400">
            Nomor Resmi: {mockGuideProfile.phone} • WhatsApp Aktif
          </p>
        </motion.div>
      </div>
    </section>
  );
}
