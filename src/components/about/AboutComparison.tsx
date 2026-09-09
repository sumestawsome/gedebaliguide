"use client";

import React from "react";
import { Check, X, Sparkles } from "lucide-react";

export default function AboutComparison() {
  const comparisons = [
    {
      aspect: "Komunikasi Pra-Perjalanan",
      gede: "Konsultasi langsung via WhatsApp dengan Gede (orang yang sama yang akan menjemput Anda)",
      others: "Chat dengan bot atau staf CS perantara; supir baru diketahui 1 hari sebelum tur",
    },
    {
      aspect: "Fleksibilitas Rute & Waktu",
      gede: "100% Fleksibel. Boleh ubah rute di jalan, berhenti ngopi, atau foto tanpa terburu-buru",
      others: "Jadwal kaku mengikat per menit; biaya tambahan jika melenceng sedikit dari paket",
    },
    {
      aspect: "Kunjungan Toko Komisi",
      gede: "Sama sekali TANPA toko oleh-oleh paksaan. Waktu liburan 100% milik kesenangan Anda",
      others: "Sering diarahkan ke toko kopi luwak/galeri perak rekanan untuk mengejar komisi",
    },
    {
      aspect: "Legalitas & Lisensi",
      gede: "Lisensi Resmi HPI Bali No. 2015-8849. Berhak memandu di pelataran pura sakral",
      others: "Banyak hanya supir sewaan tanpa sertifikasi pramuwisata resmi Dinas Pariwisata",
    },
    {
      aspect: "Bantuan Dokumentasi",
      gede: "Gede siap membantu mengambil foto & video estetik di spot terbaik tanpa biaya ekstra",
      others: "Tamu memotret sendiri atau harus membayar fotografer tambahan",
    },
    {
      aspect: "Harga & Pembayaran",
      gede: "Tanpa biaya potongan komisi 20-30% platform aplikasi. Bayar langsung saat bertemu",
      others: "Potongan biaya aplikasi tinggi, kebijakan refund rumit bila ada kendala cuaca",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-stone-50/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 border border-amber-200 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-800">
            <Sparkles className="h-3.5 w-3.5 text-amber-600" />
            <span>Perbandingan Layanan</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 leading-tight">
            Mengapa Wisatawan Memilih Bli Gede Dibandingkan Marketplace Umum?
          </h2>

          <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-sans">
            Menghilangkan perantara agen korporat berarti Anda mendapatkan harga yang jujur, pelayanan personal yang hangat, dan kepastian siapa yang akan memandu keluarga Anda.
          </p>
        </div>

        {/* Comparison Table for Desktop, Card list for Mobile */}
        <div className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-12 border-b border-stone-200 bg-stone-100/70 p-4 sm:p-5 text-sm font-bold text-stone-900">
            <div className="md:col-span-4 text-stone-600 uppercase text-xs tracking-wider">
              Aspek Layanan
            </div>
            <div className="md:col-span-4 text-emerald-800 flex items-center gap-2 mt-2 md:mt-0 font-serif text-base">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Bersama Bli Gede (Direct)
            </div>
            <div className="md:col-span-4 text-stone-500 flex items-center gap-2 mt-2 md:mt-0 text-xs sm:text-sm">
              <span className="h-2 w-2 rounded-full bg-stone-400" />
              Marketplace Tur Online Massal
            </div>
          </div>

          <div className="divide-y divide-stone-100">
            {comparisons.map((row, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 md:grid-cols-12 p-4 sm:p-5 text-xs sm:text-sm gap-3 items-center hover:bg-stone-50/50 transition-colors"
              >
                <div className="md:col-span-4 font-semibold text-stone-900">
                  {row.aspect}
                </div>
                <div className="md:col-span-4 text-stone-800 flex items-start gap-2.5">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </div>
                  <span className="leading-relaxed">{row.gede}</span>
                </div>
                <div className="md:col-span-4 text-stone-500 flex items-start gap-2.5">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-stone-100 text-stone-400">
                    <X className="h-3.5 w-3.5 stroke-[2.5]" />
                  </div>
                  <span className="leading-relaxed">{row.others}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
