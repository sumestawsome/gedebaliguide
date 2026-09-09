"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowUpRight, MessageCircle, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { mockPopularDestinations } from "@/data/mock-data";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export default function DestinationsSection() {
  if (!mockPopularDestinations || mockPopularDestinations.length === 0) {
    return null;
  }

  return (
    <section className="bg-stone-100/60 py-16 md:py-24 border-y border-stone-200/80 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 border border-amber-200/80 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-800">
            <Sparkles className="h-3.5 w-3.5 text-amber-600" />
            <span>Destinasi Ikonik</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 leading-tight">
            Wilayah Populer yang Wajib Anda Kunjungi
          </h2>

          <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-sans">
            Setiap penjuru Bali menyimpan pesona yang berbeda. Pilih destinasi yang ingin Anda jelajahi, dan Bli Gede siap mengantar rombongan Anda dengan rute paling efisien.
          </p>
        </div>

        {/* Grid Destinations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockPopularDestinations.map((dest, index) => {
            const targetUrl = dest.tourSlug ? `/tours/${dest.tourSlug}` : `/tours`;
            const waDestUrl = buildWhatsAppUrl({
              customNote: `Saya tertarik mengunjungi destinasi ${dest.name} (${dest.area}). Spot yang ingin dikunjungi: ${dest.highlightSpot}.`,
              source: "custom_itinerary",
            });

            return (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="flex flex-col h-full"
              >
                <div className="group relative flex flex-col h-full overflow-hidden rounded-3xl bg-white shadow-sm border border-stone-200/80 hover:shadow-xl hover:border-amber-300/80 transition-all duration-300">
                  {/* Image Frame */}
                  <Link href={targetUrl} className="relative aspect-[4/3] w-full overflow-hidden bg-stone-200 block">
                    <Image
                      src={dest.imageUrl}
                      alt={`Pemandangan ${dest.name}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />

                    {/* Area tag on top */}
                    <div className="absolute top-3 left-3 rounded-full bg-stone-900/80 backdrop-blur-xs px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-300 border border-white/10">
                      {dest.area}
                    </div>

                    {/* Bottom Title on Image */}
                    <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
                      <h3 className="font-serif text-lg sm:text-xl font-bold leading-tight flex items-center justify-between">
                        <span>{dest.name}</span>
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 backdrop-blur-xs group-hover:bg-amber-500 group-hover:text-white transition-colors">
                          <ArrowUpRight className="h-4 w-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </div>
                      </h3>
                    </div>
                  </Link>

                  {/* Info card footer */}
                  <div className="p-5 flex flex-col flex-1 justify-between bg-white space-y-3">
                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                      {dest.description}
                    </p>

                    <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1 font-medium text-stone-700 truncate mr-2">
                        <MapPin className="h-3.5 w-3.5 text-blue-700 shrink-0" />
                        <span className="truncate">{dest.highlightSpot}</span>
                      </span>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <a
                          href={waDestUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={`Tanya tur ${dest.name} via WhatsApp`}
                          aria-label={`Tanya tur ${dest.name} via WhatsApp`}
                          className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white transition-colors"
                        >
                          <MessageCircle className="h-4 w-4" />
                        </a>
                        <Link
                          href={targetUrl}
                          className="text-[11px] font-bold text-blue-700 hover:text-amber-600 transition-colors py-1 px-1.5"
                        >
                          Detail →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
