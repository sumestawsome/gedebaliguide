import React from "react";
import { Check, X, ShieldCheck } from "lucide-react";

interface TourInclusionsProps {
  includes: string[];
  excludes: string[];
}

export default function TourInclusions({ includes, excludes }: TourInclusionsProps) {
  return (
    <div className="space-y-6">
      <div className="border-b border-stone-200 pb-3">
        <h3 className="font-serif text-2xl font-bold text-stone-900">
          Fasilitas & Ketentuan
        </h3>
        <p className="text-xs sm:text-sm text-stone-500 mt-1">
          Transparan tanpa biaya tersembunyi. Ketahui apa saja yang sudah termasuk dan yang disiapkan sendiri.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sudah Termasuk */}
        <div className="rounded-3xl border border-emerald-200/80 bg-emerald-50/40 p-6 space-y-4">
          <div className="flex items-center gap-2 text-emerald-800 font-serif font-bold text-lg">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600 text-white">
              <Check className="h-4 w-4" />
            </div>
            <span>Sudah Termasuk</span>
          </div>

          <ul className="space-y-2.5 text-xs sm:text-sm text-stone-700">
            {includes.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Belum Termasuk */}
        <div className="rounded-3xl border border-stone-200 bg-stone-50/60 p-6 space-y-4">
          <div className="flex items-center gap-2 text-stone-800 font-serif font-bold text-lg">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-stone-300 text-stone-700">
              <X className="h-4 w-4" />
            </div>
            <span>Belum Termasuk</span>
          </div>

          <ul className="space-y-2.5 text-xs sm:text-sm text-stone-600">
            {excludes.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <X className="h-4 w-4 text-stone-400 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
