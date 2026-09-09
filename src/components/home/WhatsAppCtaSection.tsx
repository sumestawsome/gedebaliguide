import React from "react";
import { MessageCircle, ShieldCheck, CheckCircle2 } from "lucide-react";
import { mockGuideProfile } from "@/data/mock-data";

export default function WhatsAppCtaSection() {
  return (
    <section className="bg-stone-900 py-16 md:py-20 relative overflow-hidden">
      {/* Decorative background gradients */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-12 -ml-12 h-96 w-96 rounded-full bg-emerald-600/20 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center text-white space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-400">
          <ShieldCheck className="h-4 w-4" />
          <span>Respon Cepat & Konsultasi Rute Gratis</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-stone-100 max-w-3xl mx-auto leading-tight">
          Ingin Itinerary Khusus Sesuai Selera Anda? Ngobrol Langsung dengan Gede
        </h2>

        <p className="max-w-2xl mx-auto text-sm sm:text-base text-stone-400 leading-relaxed">
          Tidak perlu bingung menyusun jadwal. Ceritakan tempat impian yang ingin Anda kunjungi di Bali, berapa hari waktu liburan Anda, dan siapa saja yang ikut. Bli Gede akan bantu menyusun rute terbaik tanpa komisi perantara.
        </p>

        {/* Benefits checklist */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-2 text-xs sm:text-sm text-stone-300">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            Tanpa pembayaran online / Tanpa DP ribet
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            Mobil ber-AC dingin & privat (hanya rombongan Anda)
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            Jadwal fleksibel & santai
          </span>
        </div>

        {/* Big WhatsApp Button */}
        <div className="pt-4">
          <a
            href={`https://wa.me/${mockGuideProfile.whatsappNumber}?text=Halo%20Bli%20Gede,%20saya%20ingin%20konsultasi%20jadwal%20dan%20rencana%20liburan%20privat%20ke%20Bali.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full bg-emerald-600 px-8 py-4 text-base sm:text-lg font-bold text-white shadow-xl hover:bg-emerald-500 hover:shadow-2xl transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <MessageCircle className="h-6 w-6" />
            <span>Chat WhatsApp dengan Gede Sekarang</span>
          </a>
        </div>
      </div>
    </section>
  );
}
