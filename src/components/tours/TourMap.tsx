import React from "react";
import { MapPin, Navigation } from "lucide-react";

interface TourMapProps {
  area: string;
  mapEmbedUrl?: string;
  pickupLocation?: string;
}

export default function TourMap({ area, mapEmbedUrl, pickupLocation }: TourMapProps) {
  return (
    <div className="space-y-4">
      <div className="border-b border-stone-200 pb-3">
        <h3 className="font-serif text-2xl font-bold text-stone-900">
          Area & Titik Penjemputan
        </h3>
        <p className="text-xs sm:text-sm text-stone-500 mt-1">
          Penjemputan langsung di lobi hotel atau vila tempat Anda menginap.
        </p>
      </div>

      {/* Pickup info box */}
      {pickupLocation && (
        <div className="flex items-start gap-3 rounded-2xl bg-amber-50/80 border border-amber-200/80 p-4 text-xs sm:text-sm text-amber-900">
          <Navigation className="h-5 w-5 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">Area Penjemputan Gratis:</p>
            <p className="text-amber-800">{pickupLocation}</p>
          </div>
        </div>
      )}

      {/* Map Frame or Fallback */}
      {mapEmbedUrl ? (
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-stone-200 bg-stone-100 shadow-sm">
          <iframe
            src={mapEmbedUrl}
            title={`Peta Lokasi Tur ${area}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full w-full border-0"
            allowFullScreen
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-stone-300 bg-stone-50 p-8 text-center space-y-2">
          <MapPin className="h-8 w-8 text-blue-700" />
          <p className="font-serif text-base font-bold text-stone-900">
            Wilayah Tur: {area}
          </p>
          <p className="text-xs text-stone-500 max-w-sm">
            Titik penjemputan dan rute detail akan dikoordinasikan langsung bersama Bli Gede melalui WhatsApp sesuai lokasi penginapan Anda di Bali.
          </p>
        </div>
      )}
    </div>
  );
}
