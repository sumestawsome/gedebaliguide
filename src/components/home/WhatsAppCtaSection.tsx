"use client";

import React from "react";
import { MessageCircle, CheckCircle2, Clock, Car, Sparkles } from "lucide-react";
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
  const ctaButtonText = directBooking?.ctaButtonText || "Konsultasi Rute Gratis via WhatsApp";
  const noteText =
    directBooking?.noteText ||
    `Biasanya membalas dalam beberapa menit • Jam layanan ${whatsApp?.serviceHours || "07:00 - 22:00 WITA"}`;

  return (
    <section className="bg-gradient-to-r from-[#0F4C81] to-[#1878B8] py-16 md:py-24 relative overflow-hidden text-white">
      {/* Decorative background glows */}
      <div className="absolute top-0 right-10 -mt-20 h-96 w-96 rounded-full bg-[#E67E22]/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 -mb-20 h-96 w-96 rounded-full bg-white/10 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-8">
        {/* Reassurance pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-xs"
        >
          <Sparkles className="h-3.5 w-3.5 text-[#E67E22]" />
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
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-white leading-tight">
            {headline}
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-white/90 leading-relaxed font-sans max-w-2xl mx-auto">
            {subheadline}
          </p>
        </motion.div>

        {/* Benefits checklist */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 pt-2 text-xs sm:text-sm text-white/90"
        >
          <span className="flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-3.5 py-1.5">
            <CheckCircle2 className="h-4 w-4 text-[#E67E22]" />
            <span>Tanpa Biaya Calo & Tanpa DP Online</span>
          </span>
          <span className="flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-3.5 py-1.5">
            <Car className="h-4 w-4 text-[#E67E22]" />
            <span>Armada Mobil Privat Ber-AC Dingin</span>
          </span>
          <span className="flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-3.5 py-1.5">
            <Clock className="h-4 w-4 text-[#E67E22]" />
            <span>Waktu Penjemputan Fleksibel</span>
          </span>
        </motion.div>

        {/* Standardized Button Size: h-11 px-6 rounded-xl Sunset Orange */}
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
            className="inline-flex items-center justify-center gap-2.5 h-11 px-6 rounded-xl bg-[#E67E22] hover:bg-[#D35400] text-white text-sm font-medium shadow-[0_4px_16px_rgba(230,126,34,0.3)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <MessageCircle className="h-4.5 w-4.5" />
            <span>{ctaButtonText}</span>
          </a>
          <p className="mt-3 text-xs text-white/70">
            {noteText}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
