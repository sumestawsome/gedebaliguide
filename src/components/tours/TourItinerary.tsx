"use client";

import React, { useState } from "react";
import {
  Clock,
  MapPin,
  Car,
  Utensils,
  Camera,
  Sun,
  Sparkles,
  Info,
  ChevronDown,
  CheckCircle2,
} from "lucide-react";
import { ItineraryItem } from "@/types";

interface TourItineraryProps {
  itinerary?: ItineraryItem[];
}

export default function TourItinerary({ itinerary }: TourItineraryProps) {
  if (!itinerary || itinerary.length === 0) {
    return null;
  }

  const getStepIcon = (title: string, index: number, total: number) => {
    const t = title.toLowerCase();
    if (index === 0 || t.includes("penjemputan") || t.includes("jemput")) {
      return <Car className="h-4 w-4 text-emerald-600" />;
    }
    if (index === total - 1 || t.includes("kembali") || t.includes("hotel")) {
      return <Car className="h-4 w-4 text-blue-600" />;
    }
    if (t.includes("makan") || t.includes("lunch") || t.includes("dinner") || t.includes("santai")) {
      return <Utensils className="h-4 w-4 text-amber-600" />;
    }
    if (t.includes("sunset") || t.includes("matahari") || t.includes("kecak") || t.includes("danau")) {
      return <Sun className="h-4 w-4 text-orange-600" />;
    }
    return <Camera className="h-4 w-4 text-blue-600" />;
  };

  const getGuideTip = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes("monkey")) {
      return "Tips Bli Gede: Amankan kacamata dan perhiasan sebelum memasuki area hutan kera.";
    }
    if (t.includes("rice terrace") || t.includes("tegalalang") || t.includes("jatiluwih")) {
      return "Tips Bli Gede: Gunakan alas kaki yang nyaman untuk berjalan di pematang sawah.";
    }
    if (t.includes("tirta") || t.includes("melukat") || t.includes("pura")) {
      return "Tips Bli Gede: Bli Gede menyediakan sarung dan selendang pura khas Bali gratis untuk tamu.";
    }
    if (t.includes("kecak") || t.includes("uluwatu")) {
      return "Tips Bli Gede: Datang sebelum jam 17:00 untuk mendapatkan spot duduk terbaik menghadap sunset samudra.";
    }
    if (t.includes("air terjun") || t.includes("waterfall")) {
      return "Tips Bli Gede: Siapkan pakaian ganti dan handuk jika ingin berenang atau berfoto dekat aliran air.";
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-stone-200/80 pb-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-200 px-3 py-0.5 text-xs font-bold uppercase tracking-wider text-blue-800">
              <Sparkles className="h-3.5 w-3.5 text-blue-600" />
              <span>Rencana Perjalanan Eksklusif</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              Rencana Perjalanan (Itinerary)
            </h3>
          </div>

          <span className="text-xs font-bold text-stone-500 bg-stone-100 px-3 py-1.5 rounded-xl">
            {itinerary.length} Tahap Destinasi
          </span>
        </div>

        <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed font-sans">
          Jadwal di bawah dirancang fleksibel dan santai. Jam dan tempo kunjungan di setiap destinasi dapat disesuaikan langsung dengan kenyamanan rombongan Anda tanpa terburu-buru.
        </p>
      </div>

      {/* Timeline Roadmap */}
      <div className="relative pl-6 sm:pl-9 space-y-6 before:absolute before:left-2.5 sm:before:left-3.5 before:top-4 before:bottom-4 before:w-0.5 before:bg-gradient-to-b before:from-blue-600 before:via-stone-300 before:to-emerald-600">
        {itinerary.map((item, idx) => {
          const guideTip = getGuideTip(item.title);
          const icon = getStepIcon(item.title, idx, itinerary.length);

          return (
            <div key={idx} className="relative group">
              {/* Timeline Dot with Step Number */}
              <div className="absolute -left-6 sm:-left-9 top-1 flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-blue-700 text-white shadow-sm ring-4 ring-[#fafaf9] text-[11px] font-bold">
                {idx + 1}
              </div>

              <div className="space-y-2 rounded-2xl bg-white border border-stone-200/90 p-4.5 sm:p-5.5 shadow-xs hover:shadow-md transition-shadow">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded-md">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{item.time}</span>
                  </span>

                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
                    {icon}
                    <span>Tahap {idx + 1}</span>
                  </span>
                </div>

                <h4 className="font-serif text-base sm:text-lg font-bold text-stone-900 leading-snug">
                  {item.title}
                </h4>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
                  {item.description}
                </p>

                {/* Optional Guide Insider Tip */}
                {guideTip && (
                  <div className="mt-2 rounded-xl bg-amber-50/70 border border-amber-200/60 p-2.5 text-[11px] sm:text-xs text-amber-900 flex items-start gap-2">
                    <Info className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>{guideTip}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Flexibility Note Banner */}
      <div className="rounded-2xl bg-emerald-50/80 border border-emerald-200/80 p-4 flex items-start gap-3 text-xs text-emerald-900">
        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Fleksibilitas 100%:</strong> Ingin berhenti sejenak untuk memotret sudut pemandangan yang bagus, mencicipi kuliner lokal, atau melewati spot tertentu? Cukup komunikasikan ke Bli Gede di sepanjang jalan.
        </p>
      </div>
    </div>
  );
}
