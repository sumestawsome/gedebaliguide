import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowUpRight } from "lucide-react";
import { mockPopularDestinations } from "@/data/mock-data";

export default function DestinationsSection() {
  if (!mockPopularDestinations || mockPopularDestinations.length === 0) {
    return null;
  }

  return (
    <section className="bg-stone-100/70 py-16 md:py-24 border-y border-stone-200/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">
            Jelajah Wilayah
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-900">
            Destinasi Populer di Pulau Dewata
          </h2>
          <p className="text-stone-600 text-sm sm:text-base">
            Dari ketenangan sawah terasering di Ubud hingga deburan ombak tebing karang Uluwatu, setiap penjuru Bali memiliki keajaiban tersendiri.
          </p>
        </div>

        {/* Grid Destinations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockPopularDestinations.map((dest) => (
            <Link
              key={dest.id}
              href="/tours"
              className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm border border-stone-200/80 hover:shadow-xl transition-all duration-300"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-200">
                <Image
                  src={dest.imageUrl}
                  alt={dest.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[11px] font-medium tracking-wide uppercase text-amber-300">
                    {dest.area}
                  </span>
                  <h3 className="font-serif text-lg font-bold leading-tight flex items-center justify-between">
                    <span>{dest.name}</span>
                    <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-0.5" />
                  </h3>
                </div>
              </div>

              {/* Info footer */}
              <div className="p-4 bg-white">
                <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                  {dest.description}
                </p>
                <div className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-blue-700">
                  <MapPin className="h-3 w-3" />
                  <span>Spot: {dest.highlightSpot}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
