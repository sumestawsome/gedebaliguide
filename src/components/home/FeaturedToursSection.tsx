import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, Users, Star, ArrowRight, MessageCircle } from "lucide-react";
import { mockFeaturedTours } from "@/data/mock-data";
import { getTourInquiryUrl } from "@/lib/whatsapp";

export default function FeaturedToursSection() {
  if (!mockFeaturedTours || mockFeaturedTours.length === 0) {
    return null;
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-700">
              Katalog Tur Pilihan
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-900">
              Paket Tur Privat Terfavorit di Bali
            </h2>
            <p className="text-stone-600 text-sm sm:text-base">
              Setiap tur dirancang fleksibel dan eksklusif untuk grup Anda. Waktu penjemputan, durasi tiap spot, dan restoran dapat disesuaikan.
            </p>
          </div>
          <Link
            href="/tours"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-800 group"
          >
            <span>Lihat Semua Paket Tur</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Tour Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockFeaturedTours.map((tour) => (
            <article
              key={tour.id}
              className="flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              {/* Tour Image */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100">
                <Image
                  src={tour.coverImage}
                  alt={tour.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 rounded-full bg-stone-900/80 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                  {tour.area}
                </div>
                <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-bold text-stone-900 shadow-sm">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  <span>{tour.rating}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-3 text-xs text-stone-500 mb-2">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {tour.duration}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" />
                    Hingga {tour.maximumGuests} Tamu
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-stone-900 leading-snug group-hover:text-blue-700 transition-colors">
                  <Link href={`/tours/${tour.slug}`}>
                    {tour.name}
                  </Link>
                </h3>

                <p className="mt-2 text-sm text-stone-600 line-clamp-2 leading-relaxed">
                  {tour.tagline}
                </p>

                {/* Highlights tags */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {tour.highlights.slice(0, 3).map((hl, i) => (
                    <span
                      key={i}
                      className="rounded-md bg-stone-100 px-2 py-0.5 text-[11px] font-medium text-stone-600"
                    >
                      {hl}
                    </span>
                  ))}
                </div>

                {/* Price & CTA */}
                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between mt-auto">
                  <div>
                    <span className="block text-[11px] uppercase tracking-wide text-stone-400">
                      Mulai Dari
                    </span>
                    <span className="font-serif text-lg font-bold text-stone-900">
                      {formatPrice(tour.price)}
                    </span>
                    <span className="text-[11px] text-stone-500 ml-1">/ mobil</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={getTourInquiryUrl(tour.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Pesan via WhatsApp"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white transition-colors"
                    >
                      <MessageCircle className="h-4 w-4" />
                    </a>
                    <Link
                      href={`/tours/${tour.slug}`}
                      className="inline-flex items-center gap-1 rounded-lg bg-stone-900 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition-colors"
                    >
                      <span>Detail</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
