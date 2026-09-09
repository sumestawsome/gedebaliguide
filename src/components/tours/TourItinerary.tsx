import React from "react";
import { Clock, CheckCircle2 } from "lucide-react";
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
        <h3 className="font-serif text-2xl font-bold text-stone-900">
          Rencana Perjalanan (Itinerary)
        </h3>
        <p className="text-xs sm:text-sm text-stone-500 mt-1">
          Jadwal fleksibel & santai. Waktu dapat disesuaikan dengan ritme rombongan Anda.
        </p>
      </div>

      <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-2 sm:before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-200">
        {itinerary.map((item, idx) => (
          <div key={idx} className="relative group">
            {/* Timeline Dot */}
            <div className="absolute -left-6 sm:-left-8 top-1 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-blue-700 text-white shadow-xs ring-4 ring-white">
              <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-white" />
            </div>

            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md">
                <Clock className="h-3 w-3" />
                <span>{item.time}</span>
              </div>

              <h4 className="font-serif text-base sm:text-lg font-bold text-stone-900 leading-snug">
                {item.title}
              </h4>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
