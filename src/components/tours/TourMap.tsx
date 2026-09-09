import React from "react";
import { MapPin, Navigation, ExternalLink, Compass } from "lucide-react";

interface TourMapProps {
  area: string;
  mapEmbedUrl?: string;
  pickupLocation?: string;
}

export default function TourMap({ area, mapEmbedUrl, pickupLocation }: TourMapProps) {
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="border-b border-stone-200 pb-3">
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
          Orientasi Lokasi & Penjemputan
        </h3>
        <p className="text-xs sm:text-sm text-stone-600 mt-1">
          Ketahui rute dan area tur Anda di Bali serta titik penjemputan armada privat.
        </p>
      </div>

      {/* Pickup Location Box */}
      {pickupLocation && (
        <div className="flex items-start gap-3.5 rounded-3xl bg-amber-50/80 border border-amber-200/90 p-5 text-xs sm:text-sm text-amber-950 shadow-xs">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-amber-200/60 text-amber-800">
            <Navigation className="h-4 w-4" />
          </div>
          <div className="space-y-0.5">
            <p className="font-bold text-amber-900">Area Titik Penjemputan Bebas Biaya Tambahan:</p>
            <p className="text-stone-700 leading-relaxed">{pickupLocation}</p>
          </div>
        </div>
      )}

      {/* Map or Fallback Area Card */}
      {mapEmbedUrl ? (
        <div className="space-y-3">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-stone-200/90 bg-stone-100 shadow-md">
            <iframe
              src={mapEmbedUrl}
              title={`Peta Lokasi Tur Wilayah ${area}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full border-0"
              allowFullScreen
            />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-stone-600 px-1">
            <div className="flex items-center gap-1.5 font-medium">
              <MapPin className="h-3.5 w-3.5 text-blue-700 shrink-0" />
              <span>Wilayah Jelajah Utama: <strong className="text-stone-900">{area}, Bali</strong></span>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${area} Bali Tour`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-blue-700 hover:text-blue-800 font-semibold hover:underline"
              >
                <span>Buka di Google Maps</span>
                <ExternalLink className="h-3 w-3" />
              </a>
              <span className="hidden sm:inline text-stone-300">•</span>
              <span className="text-[11px] text-stone-400">
                *Rute aktual fleksibel & disesuaikan kondisi lalu lintas
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-stone-300 bg-stone-50/80 p-8 sm:p-10 text-center space-y-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-800">
            <Compass className="h-6 w-6" />
          </div>
          <div className="space-y-1 max-w-md">
            <h4 className="font-serif text-lg font-bold text-stone-900">
              Wilayah Destinasi: {area}
            </h4>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
              Peta interaktif sedang dipersiapkan untuk tur ini. Rute dan urutan kunjungan objek wisata di area <strong>{area}</strong> akan dikoordinasikan langsung bersama Bli Gede melalui WhatsApp sesuai lokasi hotel Anda.
            </p>
          </div>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${area} Bali`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 hover:underline pt-1"
          >
            <span>Cari Wilayah {area} di Google Maps</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      )}
    </div>
  );
}
