"use client";

import React, { useState } from "react";
import { MessageCircle, ShieldCheck, Users, Calendar, Clock, CheckCircle2, Car, User, FileText, Eye, HelpCircle } from "lucide-react";
import { Tour } from "@/types";
import { buildWhatsAppUrl, formatWhatsAppMessage, getDirectQuestionUrl } from "@/lib/whatsapp";
import { mockGuideProfile } from "@/data/mock-data";

interface TourBookingCardProps {
  tour: Tour;
}

export default function TourBookingCard({ tour }: TourBookingCardProps) {
  const [guestName, setGuestName] = useState("");
  const [tripDate, setTripDate] = useState("");
  const [guestCount, setGuestCount] = useState(tour.minimumGuests || 2);
  const [customNote, setCustomNote] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const estimatedTotal =
    tour.priceType === "per_person"
      ? tour.price * guestCount
      : guestCount > tour.maximumGuests
      ? tour.price * Math.ceil(guestCount / tour.maximumGuests)
      : tour.price;

  const messageOptions = {
    tourName: tour.name,
    tourSlug: tour.slug,
    guestName: guestName.trim() || undefined,
    tripDate: tripDate || undefined,
    guestCount: guestCount || undefined,
    pickupLocation: customNote.trim() || undefined,
    priceFormatted: formatPrice(estimatedTotal),
    source: "tour_detail" as const,
  };

  const dynamicWaUrl = buildWhatsAppUrl(messageOptions);
  const livePreviewText = formatWhatsAppMessage(messageOptions);

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
            {tour.priceType === "per_person" ? "/ orang" : "/ mobil (rombongan)"}
          </span>
        </div>
        <p className="text-xs text-emerald-700 font-medium mt-1">
          ✓ Sudah termasuk mobil ber-AC, BBM, supir/guide, dan parkir
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
            Min. {tour.minimumGuests} – Maks. {tour.maximumGuests} Tamu
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

      {/* Mini Booking Form */}
      <div className="space-y-3.5">
        <p className="text-xs font-bold uppercase tracking-wider text-stone-400">
          Form Pemesanan Cepat:
        </p>

        {/* Guest Name */}
        <div>
          <label htmlFor="guestName" className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1">
            <User className="h-3.5 w-3.5 text-stone-400" />
            Nama Pemesan (Opsional):
          </label>
          <input
            id="guestName"
            type="text"
            placeholder="Contoh: Budi Santoso"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            className="w-full rounded-xl border border-stone-300 bg-white px-3.5 py-2.5 text-xs text-stone-800 placeholder:text-stone-400 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
          />
        </div>

        {/* Trip Date with Quick Select Pills */}
        <div>
          <label htmlFor="tripDate" className="block text-xs font-semibold text-stone-700 mb-1 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 text-stone-400" />
              Rencana Tanggal Tur:
            </span>
            <span className="text-[10px] text-stone-400 font-normal">Bisa diubah nanti</span>
          </label>
          <div className="flex items-center gap-1.5 mb-2">
            <button
              type="button"
              onClick={() => {
                const d = new Date();
                d.setDate(d.getDate() + 1);
                setTripDate(d.toISOString().split("T")[0]);
              }}
              className="rounded-lg border border-stone-200 bg-stone-50 hover:bg-stone-100 px-2 py-1 text-[11px] font-medium text-stone-700 transition-colors"
            >
              + Besok
            </button>
            <button
              type="button"
              onClick={() => {
                const d = new Date();
                d.setDate(d.getDate() + 2);
                setTripDate(d.toISOString().split("T")[0]);
              }}
              className="rounded-lg border border-stone-200 bg-stone-50 hover:bg-stone-100 px-2 py-1 text-[11px] font-medium text-stone-700 transition-colors"
            >
              + Lusa
            </button>
            <button
              type="button"
              onClick={() => {
                const d = new Date();
                d.setDate(d.getDate() + 7);
                setTripDate(d.toISOString().split("T")[0]);
              }}
              className="rounded-lg border border-stone-200 bg-stone-50 hover:bg-stone-100 px-2 py-1 text-[11px] font-medium text-stone-700 transition-colors"
            >
              + 1 Minggu Lagi
            </button>
          </div>
          <input
            id="tripDate"
            type="date"
            min={today}
            value={tripDate}
            onChange={(e) => setTripDate(e.target.value)}
            className="w-full rounded-xl border border-stone-300 bg-white px-3.5 py-2.5 text-xs text-stone-800 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
          />
        </div>

        {/* Guest Count */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="guestCount" className="text-xs font-semibold text-stone-700 flex items-center gap-1">
              <Users className="h-3.5 w-3.5 text-stone-400" />
              Jumlah Peserta Tur:
            </label>
            <span className="text-[11px] font-semibold text-blue-700">
              Est. Total: {formatPrice(estimatedTotal)}
            </span>
          </div>
          <select
            id="guestCount"
            value={guestCount}
            onChange={(e) => setGuestCount(Number(e.target.value))}
            className="w-full rounded-xl border border-stone-300 bg-white px-3.5 py-2.5 text-xs text-stone-800 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
          >
            {Array.from({ length: Math.max(tour.maximumGuests, 8) }, (_, i) => i + 1).map((num) => (
              <option key={num} value={num}>
                {num} Tamu {num > tour.maximumGuests ? `(Perlu ${Math.ceil(num / tour.maximumGuests)} armada mobil)` : `(Kapasitas 1 mobil)`}
              </option>
            ))}
          </select>
        </div>

        {/* Custom Notes / Hotel Pickup with Area Pills */}
        <div>
          <label htmlFor="customNote" className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1">
            <FileText className="h-3.5 w-3.5 text-stone-400" />
            Hotel Penjemputan / Catatan Khusus:
          </label>
          <div className="flex flex-wrap gap-1 mb-2">
            {["Kuta / Seminyak", "Nusa Dua / Jimbaran", "Sanur", "Ubud", "Canggu"].map((area) => (
              <button
                key={area}
                type="button"
                onClick={() => {
                  setCustomNote((prev) =>
                    prev ? `${prev}, Area ${area}` : `Jemput di area ${area}`
                  );
                }}
                className="rounded-lg border border-stone-200 bg-stone-50 hover:bg-blue-50 hover:border-blue-200 px-2 py-0.5 text-[10px] text-stone-600 hover:text-blue-700 transition-colors"
              >
                + {area}
              </button>
            ))}
          </div>
          <textarea
            id="customNote"
            rows={2}
            placeholder="Contoh: Jemput di The Westin Resort Nusa Dua jam 08:30"
            value={customNote}
            onChange={(e) => setCustomNote(e.target.value)}
            className="w-full rounded-xl border border-stone-300 bg-white px-3.5 py-2 text-xs text-stone-800 placeholder:text-stone-400 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 resize-none"
          />
        </div>

        {/* Live WhatsApp Message Preview Toggle */}
        <div className="pt-1">
          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-700 hover:text-blue-800 cursor-pointer"
          >
            <Eye className="h-3.5 w-3.5" />
            <span>{showPreview ? "Sembunyikan Draf Pesan WhatsApp" : "Lihat Draf Pesan WhatsApp"}</span>
          </button>

          {showPreview && (
            <div className="mt-2 rounded-xl bg-emerald-50/70 border border-emerald-200 p-3 text-[11px] text-stone-700 whitespace-pre-line font-mono leading-relaxed">
              {livePreviewText}
            </div>
          )}
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
          <span>Kirim Pemesanan ke WhatsApp</span>
        </a>

        {/* Secondary: Direct question button */}
        <a
          href={getDirectQuestionUrl(tour.name)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-stone-300 bg-stone-50/80 px-4 py-3 text-xs font-bold text-stone-700 hover:bg-stone-100 hover:border-stone-400 hover:text-stone-900 active:scale-[0.98] transition-all"
        >
          <HelpCircle className="h-4 w-4 text-blue-700" />
          <span>Tanya / Diskusi Tur Langsung</span>
        </a>

        <div className="pt-2 space-y-1 text-center">
          <p className="text-[11px] text-emerald-800 font-semibold flex items-center justify-center gap-1">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>Tanpa DP • Bayar Saat Tur Selesai</span>
          </p>
          <p className="text-[10px] text-stone-400">
            Reschedule & pembatalan fleksibel tanpa denda
          </p>
        </div>
      </div>

      {/* Host Credentials */}
      <div className="pt-4 border-t border-stone-100 flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-800 font-serif font-bold text-base">
          G
        </div>
        <div className="text-xs min-w-0">
          <p className="font-bold text-stone-900 truncate">{mockGuideProfile.name}</p>
          <p className="text-stone-500 truncate">Pramuwisata Resmi HPI Bali No. {mockGuideProfile.licenseNumber}</p>
        </div>
      </div>
    </div>
  );
}
