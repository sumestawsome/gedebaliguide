import React from "react";
import { Check, X, ShieldCheck, Info } from "lucide-react";

interface TourInclusionsProps {
  includes: string[];
  excludes: string[];
}

export default function TourInclusions({ includes, excludes }: TourInclusionsProps) {
  return (
    <div className="space-y-6">
      <div className="border-b border-stone-200 pb-3">
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
          Fasilitas & Ketentuan Layanan
        </h3>
        <p className="text-xs sm:text-sm text-stone-600 mt-1">
          Transparan dan jelas tanpa biaya tersembunyi. Anda mengetahui pasti apa saja yang sudah ditanggung dan apa yang perlu disiapkan sendiri.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Kolom 1: Sudah Termasuk */}
        <div className="rounded-3xl border border-emerald-200/90 bg-emerald-50/50 p-6 sm:p-7 space-y-4 shadow-xs">
          <div className="flex items-center gap-2.5 text-emerald-900 font-serif font-bold text-lg sm:text-xl">
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

        {/* Kolom 2: Belum Termasuk */}
        <div className="rounded-3xl border border-stone-200/90 bg-stone-50/70 p-6 sm:p-7 space-y-4 shadow-xs">
          <div className="flex items-center gap-2.5 text-stone-900 font-serif font-bold text-lg sm:text-xl">
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

      {/* Helpful note */}
      <div className="flex items-start gap-3 rounded-2xl bg-blue-50/80 border border-blue-200/70 p-4 text-xs sm:text-sm text-blue-900">
        <Info className="h-5 w-5 text-blue-700 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Catatan praktis:</strong> Bli Gede dapat membantu Anda membeli tiket masuk objek wisata langsung di lokasi tanpa antre panjang, serta merekomendasikan tempat makan siang halal atau sesuai preferensi kuliner keluarga Anda.
        </p>
      </div>
    </div>
  );
}
