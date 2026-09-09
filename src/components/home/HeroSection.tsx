import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, ShieldCheck, Compass, Star, Sparkles } from "lucide-react";
import { mockGuideProfile } from "@/data/mock-data";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#fafaf9] via-stone-100/60 to-[#fafaf9] py-12 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* Text Content */}
          <div className="space-y-6 lg:col-span-7">
            {/* Trust Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50/80 px-3.5 py-1.5 text-xs font-semibold text-amber-900 shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-amber-600" />
              <span>Pemandu Privat Resmi HPI Bali • Tanpa Perantara</span>
            </div>

            {/* Headline */}
            <div className="space-y-3">
              <p className="text-base sm:text-lg font-medium text-blue-800">
                Om Swastyastu, selamat datang!
              </p>
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-900 leading-[1.15]">
                Jelajahi Bali Autentik Bersama{" "}
                <span className="text-blue-700 italic underline decoration-amber-400 decoration-wavy decoration-2 underline-offset-4">
                  Gede Sudiartana
                </span>
              </h1>
            </div>

            {/* Subheading / Value Proposition */}
            <p className="max-w-2xl text-base sm:text-lg text-stone-600 leading-relaxed">
              Dapatkan pengalaman liburan Bali yang intim, personal, dan tanpa terburu-buru. Dipandu langsung oleh Gede—bukan calo atau agen—dengan armada mobil ber-AC nyaman, pengetahuan budaya mendalam, dan fleksibilitas penuh sesuai ritme Anda.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <a
                href={`https://wa.me/${mockGuideProfile.whatsappNumber}?text=Halo%20Bli%20Gede,%20saya%20tertarik%20untuk%20konsultasi%20tur%20privat%20di%20Bali.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-emerald-600 px-6 py-3.5 text-base font-semibold text-white shadow-md hover:bg-emerald-700 hover:shadow-lg transition-all active:scale-[0.98]"
              >
                <MessageCircle className="h-5 w-5" />
                <span>Konsultasi Tur via WhatsApp</span>
              </a>

              <Link
                href="/tours"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-stone-300 bg-white px-6 py-3.5 text-base font-semibold text-stone-700 shadow-sm hover:bg-stone-50 hover:border-stone-400 transition-all"
              >
                <Compass className="h-5 w-5 text-blue-700" />
                <span>Lihat Pilihan Tur</span>
              </Link>
            </div>

            {/* Quick stats / social proof */}
            <div className="flex items-center gap-6 pt-4 border-t border-stone-200/80">
              <div className="flex items-center gap-1.5">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-sm font-bold text-stone-900">5.0</span>
                <span className="text-xs text-stone-500">(150+ ulasan bintang lima)</span>
              </div>
              <div className="hidden sm:block h-4 w-px bg-stone-300" />
              <div className="text-xs text-stone-600 hidden sm:block">
                <span className="font-semibold text-stone-900">100% Fleksibel:</span> Bebas sesuaikan destinasi
              </div>
            </div>
          </div>

          {/* Hero Visual Card */}
          <div className="relative lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative glow */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-amber-200/40 via-blue-200/30 to-emerald-200/40 blur-xl" />

              {/* Main Image Container */}
              <div className="relative overflow-hidden rounded-3xl border border-stone-200/80 bg-stone-900 shadow-2xl">
                {/* Visual Bali Tour Image */}
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=900&auto=format&fit=crop&q=85"
                    alt="Pemandangan Pura dan alam Bali bersama Gede Bali Guide"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                  {/* Gradient Overlay for text contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent" />

                  {/* Floating card on image: Gede Sudiartana Profile */}
                  <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/95 p-4 backdrop-blur-md shadow-lg border border-stone-200">
                    <div className="flex items-center gap-3.5">
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-blue-600">
                        <Image
                          src={mockGuideProfile.avatarUrl}
                          alt={mockGuideProfile.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-serif text-base font-bold text-stone-900 truncate">
                            {mockGuideProfile.name}
                          </h3>
                          <ShieldCheck className="h-4 w-4 text-blue-600 shrink-0" />
                        </div>
                        <p className="text-xs text-stone-500 truncate">
                          {mockGuideProfile.title}
                        </p>
                        <p className="text-[11px] font-semibold text-emerald-700">
                          Siap memandu perjalanan privat Anda
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Badge Floating */}
              <div className="absolute -top-3 -right-3 rounded-xl bg-amber-500 px-3.5 py-1.5 text-xs font-bold text-white shadow-md sm:block">
                10+ Tahun di Bali
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
