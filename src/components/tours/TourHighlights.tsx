import React from "react";
import {
  Sparkles,
  Camera,
  MapPin,
  Clock,
  Car,
  HeartHandshake,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

interface TourHighlightsProps {
  highlights: string[];
  area: string;
  duration: string;
}

export default function TourHighlights({
  highlights,
  area,
  duration,
}: TourHighlightsProps) {
  // Experience pillars tailored to Bli Gede's authentic private guiding
  const experiencePillars = [
    {
      icon: Camera,
      title: "Spot Foto & Golden Hour",
      description:
        "Bli Gede paham sudut foto terbaik dan waktu pencahayaan estetik di tiap titik tanpa terburu-buru.",
      tag: "Foto Diabadikan",
      color: "from-amber-500/10 to-orange-500/10 text-amber-700 border-amber-200/80",
    },
    {
      icon: ShieldCheck,
      title: "Pemanduan Lisensi HPI",
      description:
        "Penjelasan mendalam filosofi pura, adat Bali, dan sejarah lokal yang akurat dan berwawasan.",
      tag: "Otentik & Resmi",
      color: "from-blue-500/10 to-indigo-500/10 text-blue-700 border-blue-200/80",
    },
    {
      icon: Car,
      title: "Armada Privat & Dingin",
      description:
        "Mobil MPV/SUV bersih, wangi, ber-AC dingin eksklusif hanya untuk rombongan Anda tanpa tamu lain.",
      tag: "100% Privat",
      color: "from-emerald-500/10 to-teal-500/10 text-emerald-700 border-emerald-200/80",
    },
    {
      icon: HeartHandshake,
      title: "Tempo Santai & Fleksibel",
      description:
        "Durasi " +
        duration +
        " dapat disesuaikan. Mau rehat kopi luwak, toilet stop, atau makan siang santai selalu diakomodasi.",
      tag: "Tanpa Diburu Waktu",
      color: "from-stone-500/10 to-stone-400/10 text-stone-800 border-stone-200/80",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="border-b border-stone-200 pb-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-700">
          <Sparkles className="h-4 w-4 text-amber-500" />
          <span>Pengalaman Terbaik</span>
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
          Sorotan Destinasi & Pengalaman Tur
        </h3>
        <p className="text-xs sm:text-sm text-stone-600 mt-1">
          Kombinasi objek wisata ikonik di wilayah {area} dengan kenyamanan standar pelayanan privat bintang lima.
        </p>
      </div>

      {/* Destination Highlight Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {highlights.map((item, idx) => (
          <div
            key={idx}
            className="group relative flex items-start gap-3.5 rounded-2xl border border-stone-200/80 bg-white p-4 shadow-xs transition-all hover:border-blue-300 hover:shadow-md"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700 font-serif font-bold text-sm border border-blue-200/60 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              0{idx + 1}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                <h4 className="font-serif text-base font-bold text-stone-900 leading-snug">
                  {item}
                </h4>
              </div>
              <p className="text-xs text-stone-500 leading-relaxed font-sans">
                Eksplorasi spot utama dengan waktu luang memadai untuk dokumentasi dan menikmati atmosfer Bali.
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 4 Guiding Pillars / Value Cards */}
      <div className="mt-8 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-serif text-lg font-bold text-stone-900">
            Mengapa Tur Ini Istimewa Bersama Bli Gede?
          </h4>
          <span className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/80">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Jaminan Layanan HPI
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {experiencePillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className={`rounded-2xl border bg-gradient-to-br p-4.5 space-y-2 ${pillar.color}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/90 shadow-2xs">
                      <Icon className="h-4 w-4" />
                    </div>
                    <h5 className="font-serif font-bold text-sm text-stone-900">
                      {pillar.title}
                    </h5>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/80 border border-current/20">
                    {pillar.tag}
                  </span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
