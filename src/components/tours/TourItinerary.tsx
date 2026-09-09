import React from "react";
import { Clock, MapPin, Compass, CheckCircle2 } from "lucide-react";
import { ItineraryItem } from "@/types";

interface TourItineraryProps {
  itinerary?: ItineraryItem[];
}

export default function TourItinerary({ itinerary }: TourItineraryProps) {
  if (!itinerary || itinerary.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-stone-200 pb-3">
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
          Rencana Perjalanan (Itinerary)
        </h3>
        <p className="text-xs sm:text-sm text-stone-600 mt-1">
          Jadwal bertahap yang fleksibel & santai. Waktu dan durasi tiap spot dapat disesuaikan dengan preferensi rombongan Anda.
        </p>
      </div>

      <div className="relative pl-6 sm:pl-9 space-y-8 before:absolute before:left-2.5 sm:before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-blue-600 before:via-stone-300 before:to-emerald-600">
        {itinerary.map((item, idx) => (
          <div key={idx} className="relative group">
            {/* Timeline Dot with Step Number */}
            <div className="absolute -left-6 sm:-left-9 top-0.5 flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-blue-700 text-white shadow-sm ring-4 ring-white text-[11px] font-bold">
              {idx + 1}
            </div>

            <div className="space-y-1.5 rounded-2xl bg-white border border-stone-200/80 p-4 sm:p-5 shadow-xs hover:shadow-md transition-shadow">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded-md">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{item.time}</span>
                </span>
                <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
                  Tahap {idx + 1}
                </span>
              </div>

              <h4 className="font-serif text-base sm:text-lg font-bold text-stone-900 leading-snug">
                {item.title}
              </h4>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
