"use client";

import React from "react";
import { Check, X, ShieldCheck, Info, Car, Fuel, MapPin, Sparkles, AlertCircle } from "lucide-react";

interface TourInclusionsProps {
  includes: string[];
  excludes: string[];
}

export default function TourInclusions({ includes, excludes }: TourInclusionsProps) {
  return (
    <div className="space-y-6">
      <div className="border-b border-stone-200/80 pb-4">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-0.5 text-xs font-bold uppercase tracking-wider text-emerald-800 mb-2">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
          <span>Transparansi Biaya 100%</span>
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
          Fasilitas & Ketentuan Layanan
        </h3>
        <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed font-sans">
          Semua komponen harga kami cantumkan secara transparan tanpa biaya tersembunyi. Anda mengetahui pasti apa saja yang sudah ditanggung dan apa yang disiapkan mandiri.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Kolom 1: Sudah Termasuk (Inclusions) */}
        <div className="rounded-3xl border border-emerald-200/90 bg-emerald-50/40 p-5 sm:p-7 space-y-4 shadow-xs">
          <div className="flex items-center gap-2.5 text-emerald-950 font-serif font-bold text-lg sm:text-xl border-b border-emerald-200/60 pb-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600 text-white shadow-xs">
              <Check className="h-4 w-4" />
            </div>
            <span>Sudah Termasuk (Inclusions)</span>
          </div>

          <ul className="space-y-3 text-xs sm:text-sm text-stone-800">
            {includes && includes.length > 0 ? (
              includes.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 mt-0.5">
                    <Check className="h-3 w-3" />
                  </div>
                  <span className="font-medium leading-relaxed">{item}</span>
                </li>
              ))
            ) : (
              <li className="text-stone-500 italic">Informasi fasilitas belum diatur.</li>
            )}
          </ul>
        </div>

        {/* Kolom 2: Belum Termasuk (Exclusions) */}
        <div className="rounded-3xl border border-stone-200/90 bg-stone-50/70 p-5 sm:p-7 space-y-4 shadow-xs">
          <div className="flex items-center gap-2.5 text-stone-900 font-serif font-bold text-lg sm:text-xl border-b border-stone-200/60 pb-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-stone-300 text-stone-700 shadow-xs">
              <X className="h-4 w-4" />
            </div>
            <span>Belum Termasuk (Exclusions)</span>
          </div>

          <ul className="space-y-3 text-xs sm:text-sm text-stone-600">
            {excludes && excludes.length > 0 ? (
              excludes.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-stone-200 text-stone-500 mt-0.5">
                    <X className="h-3 w-3" />
                  </div>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))
            ) : (
              <li className="text-stone-500 italic">Tidak ada pengecualian khusus.</li>
            )}
          </ul>
        </div>
      </div>

      {/* Practical Advice Note */}
      <div className="flex items-start gap-3 rounded-2xl bg-blue-50/80 border border-blue-200/70 p-4 sm:p-4.5 text-xs sm:text-sm text-blue-950">
        <Info className="h-5 w-5 text-blue-700 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <p className="font-bold">Kemudahan Pembelian Tiket & Kuliner:</p>
          <p className="leading-relaxed text-blue-900">
            Bli Gede dapat membantu Anda membeli tiket masuk objek wisata langsung di loket resmi tanpa biaya calo dan tanpa antre lama, serta merekomendasikan kuliner halal atau ramah anak sesuai selera rombongan.
          </p>
        </div>
      </div>
    </div>
  );
}
