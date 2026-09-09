"use client";

import React from "react";
import { MessageCircle, ShieldCheck, CheckCircle2, Clock, Car, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { DirectBookingReasonConfig, WhatsAppConfig } from "@/types";
import { getCustomItineraryUrl, buildWhatsAppUrl } from "@/lib/whatsapp";

interface WhatsAppCtaSectionProps {
  directBooking?: DirectBookingReasonConfig;
  whatsApp?: WhatsAppConfig;
}

export default function WhatsAppCtaSection({ directBooking, whatsApp }: WhatsAppCtaSectionProps = {}) {
  const waUrl = whatsApp
    ? buildWhatsAppUrl({
        phoneNumber: whatsApp.normalizedNumber,
        source: "custom_itinerary",
        customNote: "Halo Bli Gede, saya ingin konsultasi rute khusus untuk liburan keluarga saya di Bali.",
      })
    : getCustomItineraryUrl();

  const headline = directBooking?.headline || "Ingin Rute Khusus Sesuai Selera Anda?";
  const subheadline =
    directBooking?.subheadline ||
    "Ceritakan tempat impian yang ingin Anda kunjungi di Bali. Bli Gede akan membantu merancang jadwal yang santai, nyaman, dan efisien untuk Anda dan keluarga.";
  const ctaButtonText = directBooking?.ctaButtonText || "Chat WhatsApp dengan Gede Sekarang";
  const noteText =
    directBooking?.noteText ||
    `Biasanya membalas dalam beberapa menit • Jam layanan ${whatsApp?.serviceHours || "07:00 - 22:00 WITA"}`;

  return (
    <section className="bg-gradient-to-b from-stone-900 via-stone-900 to-stone-950 py-20 md:py-28 relative overflow-hidden text-white">
      {/* Decorative background glows */}
      <div className="absolute top-0 right-10 -mt-20 h-96 w-96 rounded-full bg-emerald-600/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 -mb-20 h-96 w-96 rounded-full bg-blue-600/15 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-8">
        {/* Reassurance pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400 backdrop-blur-xs"
        >
          <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
          <span>Respon Cepat & Konsultasi Gratis Langsung ke Gede</span>
        </motion.div>

        {/* Big Editorial Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="space-y-4 max-w-3xl mx-auto"
        >
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-100 leading-[1.15]">
            {headline}
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-stone-300 leading-relaxed font-sans max-w-2xl mx-auto">
            {subheadline}
          </p>
        </motion.div>

        {/* Benefits checklist */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 pt-2 text-xs sm:text-sm text-stone-300"
        >
          <span className="flex items-center gap-2 bg-stone-800/60 border border-stone-700/60 rounded-full px-3.5 py-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span>Tanpa Biaya Calo & Tanpa DP Online</span>
          </span>
          <span className="flex items-center gap-2 bg-stone-800/60 border border-stone-700/60 rounded-full px-3.5 py-1.5">
            <Car className="h-4 w-4 text-emerald-400" />
            <span>Armada Mobil Privat Ber-AC Dingin</span>
          </span>
          <span className="flex items-center gap-2 bg-stone-800/60 border border-stone-700/60 rounded-full px-3.5 py-1.5">
            <Clock className="h-4 w-4 text-emerald-400" />
            <span>Waktu Penjemputan Fleksibel</span>
          </span>
        </motion.div>

        {/* Big Bright Green CTA WhatsApp Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="pt-4"
        >
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full bg-emerald-600 px-8 py-4.5 text-base sm:text-lg font-bold text-white shadow-2xl shadow-emerald-600/40 hover:bg-emerald-500 hover:shadow-emerald-500/50 transition-all transform hover:-translate-y-1 active:translate-y-0"
          >
            <MessageCircle className="h-6 w-6 animate-bounce" />
            <span>{ctaButtonText}</span>
          </a>
          <p className="mt-3 text-xs text-stone-400">
            {noteText}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
