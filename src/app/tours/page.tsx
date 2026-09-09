import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/common/FloatingWhatsApp";
import ToursCatalog from "@/components/tours/ToursCatalog";
import { Compass, Sparkles, ShieldCheck, Car, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Katalog Tur Privat Bali — Gede Bali Guide",
  description:
    "Pilihan paket tur privat lengkap di Bali bersama Gede Sudiartana. Mulai dari Ubud, Uluwatu, Bedugul, Kintamani, hingga Nusa Penida. Mobil ber-AC nyaman & tanpa komisi perantara.",
};

export default function ToursPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#fafaf9] text-stone-900 font-sans">
      <Navbar />

      <main className="flex-1 pb-20">
        {/* Header Hero Banner */}
        <section className="relative overflow-hidden bg-gradient-to-b from-stone-100 via-[#fafaf9] to-[#fafaf9] pt-12 pb-14 border-b border-stone-200/70">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-200/80 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-blue-800">
                <Compass className="h-3.5 w-3.5 text-blue-600" />
                <span>Katalog Tur Eksklusif Bali</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-stone-900 leading-tight">
                Pilih Perjalanan Impian Anda di Pulau Dewata
              </h1>

              <p className="text-base sm:text-lg text-stone-600 leading-relaxed font-sans">
                Setiap rute di bawah ini dirancang fleksibel dengan kenyamanan maksimal. Semua paket mencakup mobil privat ber-AC, BBM, biaya parkir, dan pendampingan pemandu berlisensi resmi HPI Bali.
              </p>

              {/* Guarantee badges */}
              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-semibold text-stone-700">
                <span className="flex items-center gap-1.5 bg-white border border-stone-200 rounded-lg px-3 py-1.5 shadow-xs">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Lisensi Resmi HPI Bali</span>
                </span>
                <span className="flex items-center gap-1.5 bg-white border border-stone-200 rounded-lg px-3 py-1.5 shadow-xs">
                  <Car className="h-3.5 w-3.5 text-amber-600" />
                  <span>100% Mobil Ber-AC Privat</span>
                </span>
                <span className="flex items-center gap-1.5 bg-white border border-stone-200 rounded-lg px-3 py-1.5 shadow-xs">
                  <Clock className="h-3.5 w-3.5 text-blue-700" />
                  <span>Jadwal Fleksibel & Santai</span>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Catalog Section */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10">
          <ToursCatalog />
        </section>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
