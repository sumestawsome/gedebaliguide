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
      <div className="rounded-3xl border border-[#EBE9E6] bg-white p-5 sm:p-7 shadow-xs space-y-6">
        <div className="flex items-center gap-3.5 sm:gap-4">
          <div className="relative h-14 w-14 sm:h-16 sm:w-16 shrink-0 overflow-hidden rounded-full border-2 border-[#1878B8] shadow-xs">
            <Image
              src={mockGuideProfile.avatarUrl}
              alt={mockGuideProfile.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h3 className="font-serif text-base sm:text-xl font-bold text-[#08090A] truncate">
                {mockGuideProfile.name}
              </h3>
              <ShieldCheck className="h-4 w-4 text-[#1878B8] shrink-0" />
            </div>
            <p className="text-xs text-[#5E6965] truncate">
              Pemandu Wisata Resmi HPI Bali
            </p>
            <p className="text-[11px] font-semibold text-[#0C8C5E] mt-0.5">
              No. Lisensi: {mockGuideProfile.licenseNumber}
            </p>
          </div>
        </div>

        <div className="rounded-2xl bg-[#EBF5FB] p-3.5 border border-[#1878B8]/20 text-xs text-[#08090A] space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-[#1878B8]">
            <Sparkles className="h-3.5 w-3.5 text-[#1878B8]" />
            <span>100% Bebas Konsultasi</span>
          </div>
          <p className="text-[11px] text-[#5E6965] leading-relaxed">
            Tidak ada komitmen atau biaya apapun untuk konsultasi rute. Ceritakan rencana liburan Anda dengan santai.
          </p>
        </div>

        {/* Direct Contact Points - Sequential 3-Color Rhythm Pattern */}
        <div className="space-y-3.5 pt-2 border-t border-[#EBE9E6] text-xs sm:text-sm">
          {/* Card 1: WhatsApp & Phone -> Ocean Blue (#1878B8) */}
          <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#FEFDFB] border border-[#EBE9E6] hover:border-[#1878B8] transition-colors">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EBF5FB] text-[#1878B8] shrink-0">
              <Phone className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="block text-[11px] text-[#5E6965] font-semibold uppercase tracking-wider">
                WhatsApp & Telepon
              </span>
              <a
                href={`tel:${mockGuideProfile.phone}`}
                className="font-bold text-[#08090A] hover:text-[#1878B8] transition-colors block text-sm sm:text-base"
              >
                {mockGuideProfile.phone}
              </a>
              <span className="block text-[11px] text-[#0C8C5E] font-medium mt-0.5">
                Respon Cepat (Online 07:00 - 22:00 WITA)
              </span>
            </div>
          </div>

          {/* Card 2: Email -> Bali Green (#0C8C5E) */}
          <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#FEFDFB] border border-[#EBE9E6] hover:border-[#0C8C5E] transition-colors">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F6F0] text-[#0C8C5E] shrink-0">
              <Mail className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="block text-[11px] text-[#5E6965] font-semibold uppercase tracking-wider">
                Email Korespondensi
              </span>
              <a
                href={`mailto:${mockGuideProfile.email}`}
                className="font-bold text-[#08090A] hover:text-[#0C8C5E] transition-colors break-all block"
              >
                {mockGuideProfile.email}
              </a>
              <span className="block text-[11px] text-[#5E6965] font-medium mt-0.5">
                Untuk pertanyaan tertulis atau kebutuhan invoice tur
              </span>
            </div>
          </div>

          {/* Card 3: Operating Hours -> Sunset Amber (#E67E22) */}
          <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#FEFDFB] border border-[#EBE9E6] hover:border-[#E67E22] transition-colors">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FDF3E6] text-[#E67E22] shrink-0">
              <Clock className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="block text-[11px] text-[#5E6965] font-semibold uppercase tracking-wider">
                Jam Layanan & Penjemputan
              </span>
              <span className="font-bold text-[#08090A]">
                07:00 - 22:00 WITA (Setiap Hari)
              </span>
              <span className="block text-[11px] text-[#5E6965] font-medium mt-0.5">
                Tur subuh sunrise (Kintamani / Lempuyang) dapat diatur sebelumnya
              </span>
            </div>
          </div>

          {/* Card 4: Area Coverage -> Loop back to Ocean Blue (#1878B8) */}
          <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#FEFDFB] border border-[#EBE9E6] hover:border-[#1878B8] transition-colors">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EBF5FB] text-[#1878B8] shrink-0">
              <MapPin className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="block text-[11px] text-[#5E6965] font-semibold uppercase tracking-wider">
                Area Layanan Penjemputan
              </span>
              <span className="font-bold text-[#08090A]">
                Seluruh Wilayah Bali
              </span>
              <span className="block text-[11px] text-[#5E6965] font-medium mt-0.5">
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
          className="inline-flex w-full items-center justify-center gap-2 h-11 px-5 py-2.5 rounded-xl bg-[#E67E22] hover:bg-[#D35400] text-sm sm:text-base font-semibold text-white shadow-[0_4px_16px_rgba(230,126,34,0.3)] transition-all cursor-pointer"
        >
          <MessageCircle className="h-5 w-5" />
          <span>Chat WhatsApp Sekarang</span>
        </a>
      </div>
    </div>
  );
}
