"use client";

import React from "react";
import Image from "next/image";
import { Phone, Mail, Clock, MapPin, ShieldCheck, CheckCircle2, Award, Sparkles, MessageCircle } from "lucide-react";
import { mockGuideProfile } from "@/data/mock-data";
import { getGeneralConsultationUrl } from "@/lib/whatsapp";

export default function ContactInfoSection() {
  const waUrl = getGeneralConsultationUrl("contact");

  return (
    <div className="space-y-6">
      {/* Profile Card */}
      <div className="rounded-3xl border border-stone-200 bg-white p-5 sm:p-7 shadow-sm space-y-6">
        <div className="flex items-center gap-3.5 sm:gap-4">
          <div className="relative h-14 w-14 sm:h-16 sm:w-16 shrink-0 overflow-hidden rounded-full border-2 border-[#1878B8] shadow-md">
            <Image
              src={mockGuideProfile.avatarUrl}
              alt={mockGuideProfile.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h3 className="font-serif text-base sm:text-xl font-bold text-stone-900 truncate">
                {mockGuideProfile.name}
              </h3>
              <ShieldCheck className="h-4 w-4 text-[#1878B8] shrink-0" />
            </div>
            <p className="text-xs text-stone-500 truncate">
              Pemandu Wisata Resmi HPI Bali
            </p>
            <p className="text-[11px] font-semibold text-[#0C8C5E] mt-0.5">
              No. Lisensi: {mockGuideProfile.licenseNumber}
            </p>
          </div>
        </div>

        <div className="rounded-2xl bg-amber-50/80 p-3.5 border border-amber-200/80 text-xs text-amber-950 space-y-1">
          <div className="flex items-center gap-1.5 font-bold">
            <Sparkles className="h-3.5 w-3.5 text-amber-600" />
            <span>100% Bebas Konsultasi</span>
          </div>
          <p className="text-[11px] text-amber-900 leading-relaxed">
            Tidak ada komitmen atau biaya apapun untuk konsultasi rute. Ceritakan rencana liburan Anda dengan santai.
          </p>
        </div>

        {/* Direct Contact Points */}
        <div className="space-y-3.5 pt-2 border-t border-stone-100 text-xs sm:text-sm">
          {/* Phone & WhatsApp */}
          <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-stone-50 border border-stone-100">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 shrink-0">
              <Phone className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="block text-[11px] text-stone-500 font-semibold uppercase tracking-wider">
                WhatsApp & Telepon
              </span>
              <a
                href={`tel:${mockGuideProfile.phone}`}
                className="font-bold text-stone-900 hover:text-blue-700 transition-colors block text-sm sm:text-base"
              >
                {mockGuideProfile.phone}
              </a>
              <span className="block text-[11px] text-emerald-700 font-medium mt-0.5">
                Respon Cepat (Online 07:00 - 22:00 WITA)
              </span>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-stone-50 border border-stone-100">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-700 shrink-0">
              <Mail className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="block text-[11px] text-stone-500 font-semibold uppercase tracking-wider">
                Email Korespondensi
              </span>
              <a
                href={`mailto:${mockGuideProfile.email}`}
                className="font-bold text-stone-900 hover:text-blue-700 transition-colors break-all block"
              >
                {mockGuideProfile.email}
              </a>
              <span className="block text-[11px] text-stone-500 font-medium mt-0.5">
                Untuk pertanyaan tertulis atau kebutuhan invoice tur
              </span>
            </div>
          </div>

          {/* Operating Hours */}
          <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-stone-50 border border-stone-100">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700 shrink-0">
              <Clock className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="block text-[11px] text-stone-500 font-semibold uppercase tracking-wider">
                Jam Layanan & Penjemputan
              </span>
              <span className="font-bold text-stone-900">
                07:00 - 22:00 WITA (Setiap Hari)
              </span>
              <span className="block text-[11px] text-stone-500 font-medium mt-0.5">
                Tur subuh sunrise (Kintamani / Lempuyang) dapat diatur sebelumnya
              </span>
            </div>
          </div>

          {/* Area Coverage */}
          <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-stone-50 border border-stone-100">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-700 shrink-0">
              <MapPin className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="block text-[11px] text-stone-500 font-semibold uppercase tracking-wider">
                Area Layanan Penjemputan
              </span>
              <span className="font-bold text-stone-900">
                Seluruh Wilayah Bali
              </span>
              <span className="block text-[11px] text-stone-500 font-medium mt-0.5">
                Ubud, Seminyak, Canggu, Kuta, Sanur, Jimbaran, Nusa Dua, & Bandara DPS
              </span>
            </div>
          </div>
        </div>

        {/* Big WhatsApp Direct Button */}
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2.5 rounded-2xl bg-[#E67E22] hover:bg-[#D35400] px-6 py-4 text-sm sm:text-base font-bold text-white shadow-lg shadow-[#E67E22]/30 transition-all active:scale-[0.98] cursor-pointer"
        >
          <MessageCircle className="h-5 w-5" />
          <span>Chat WhatsApp Sekarang</span>
        </a>
      </div>
    </div>
  );
}
