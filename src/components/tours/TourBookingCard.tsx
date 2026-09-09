"use client";

import React, { useState } from "react";
import { MessageCircle, ShieldCheck, Users, Calendar, Clock, CheckCircle2, Car } from "lucide-react";
import { Tour } from "@/types";
import { getTourInquiryUrl, buildWhatsAppUrl } from "@/lib/whatsapp";
import { mockGuideProfile } from "@/data/mock-data";

interface TourBookingCardProps {
  tour: Tour;
}

export default function TourBookingCard({ tour }: TourBookingCardProps) {
  const [tripDate, setTripDate] = useState("");
  const [guestCount, setGuestCount] = useState(tour.minimumGuests || 2);
  const [customNote, setCustomNote] = useState("");

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const dynamicWaUrl = buildWhatsAppUrl({
    tourName: tour.name,
    tripDate: tripDate || undefined,
    guestCount: guestCount || undefined,
    customNote: customNote || undefined,
    source: "tour_detail",
  });

  return (
    <div className="sticky top-24 rounded-3xl border border-stone-200/90 bg-white p-6 sm:p-7 shadow-xl space-y-6">
      {/* Price Header */}
      <div className="border-b border-stone-100 pb-5">
        <span className="block text-[11px] font-semibold uppercase tracking-wider text-stone-400">
          Harga Sewa Tur Privat
        </span>
        <div className="flex items-baseline gap-1 mt-1">
          <span className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
            {formatPrice(tour.price)}
          </span>
          <span className="text-sm font-medium text-stone-500">
            {tour.priceType === "per_person" ? "/ orang" : "/ mobil (maks 5 tamu)"}
          </span>
        </div>
        <p className="text-xs text-emerald-700 font-medium mt-1">
          ✓ Sudah termasuk mobil, BBM, supir/guide, dan parkir
        </p>
      </div>

      {/* Quota & Capacity Info */}
      <div className="rounded-2xl bg-stone-50 p-3.5 space-y-2 border border-stone-200/60 text-xs">
        <div className="flex items-center justify-between text-stone-700">
          <span className="flex items-center gap-1.5 font-medium">
            <Users className="h-4 w-4 text-blue-700" />
            Kapasitas Rombongan:
          </span>
          <span className="font-bold text-stone-900">
            {tour.minimumGuests} – {tour.maximumGuests} Tamu / Mobil
          </span>
        </div>
        <div className="flex items-center justify-between text-stone-700">
          <span className="flex items-center gap-1.5 font-medium">
            <Clock className="h-4 w-4 text-blue-700" />
            Durasi Tur:
          </span>
          <span className="font-bold text-stone-900">{tour.duration}</span>
        </div>
      </div>

      {/* Mini Booking Input Fields */}
      <div className="space-y-4">
        <div>
          <label htmlFor="tripDate" className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5 text-stone-400" />
            Rencana Tanggal Tur (Opsional):
          </label>
          <input
            id="tripDate"
            type="date"
            value={tripDate}
            onChange={(e) => setTripDate(e.target.value)}
            className="w-full rounded-xl border border-stone-300 bg-white px-3.5 py-2.5 text-xs text-stone-800 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
          />
        </div>

        <div>
          <label htmlFor="guestCount" className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1">
            <Users className="h-3.5 w-3.5 text-stone-400" />
            Jumlah Tamu:
          </label>
          <select
            id="guestCount"
            value={guestCount}
            onChange={(e) => setGuestCount(Number(e.target.value))}
            className="w-full rounded-xl border border-stone-300 bg-white px-3.5 py-2.5 text-xs text-stone-800 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
          >
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <option key={num} value={num}>
                {num} Orang {num > 5 ? "(Butuh 2 mobil)" : ""}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main WhatsApp Booking CTA */}
      <div className="space-y-2 pt-2">
        <a
          href={dynamicWaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2.5 rounded-2xl bg-emerald-600 px-6 py-4 text-base font-bold text-white shadow-lg shadow-emerald-700/25 hover:bg-emerald-700 active:scale-[0.98] transition-all"
        >
          <MessageCircle className="h-5 w-5" />
          <span>Pesan Tur via WhatsApp</span>
        </a>

        <p className="text-center text-[11px] text-stone-500">
          Tanpa pembayaran online • Chat langsung dengan Bli Gede
        </p>
      </div>

      {/* Host Credentials */}
      <div className="pt-4 border-t border-stone-100 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-800 font-serif font-bold text-base">
          G
        </div>
        <div className="text-xs">
          <p className="font-bold text-stone-900">{mockGuideProfile.name}</p>
          <p className="text-stone-500">Lisensi Resmi HPI No. {mockGuideProfile.licenseNumber}</p>
        </div>
      </div>
    </div>
  );
}
