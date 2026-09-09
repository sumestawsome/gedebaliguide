import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Sparkles, MessageCircle, Phone, Mail, MapPin, Clock, ShieldCheck, Send } from "lucide-react";
import { mockGuideProfile } from "@/data/mock-data";
import { getGeneralConsultationUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Kontak & Konsultasi Tur — Gede Bali Guide",
  description:
    "Hubungi Gede Sudiartana langsung via WhatsApp atau formulir pesan untuk konsultasi rute tur privat di Bali tanpa biaya calo.",
};

export default function ContactPage() {
  const waUrl = getGeneralConsultationUrl("contact");

  return (
    <div className="flex min-h-screen flex-col bg-[#fafaf9] text-stone-900 font-sans">
      <Navbar />

      <main className="flex-1 pb-20">
        {/* Header Banner */}
        <section className="bg-gradient-to-b from-stone-100/70 via-[#fafaf9] to-[#fafaf9] border-b border-stone-200/70 pt-10 pb-8 md:pt-16 md:pb-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
            {/* Breadcrumb */}
            <nav className="flex items-center justify-center gap-2 text-xs text-stone-500 font-medium mb-2">
              <Link href="/" className="hover:text-blue-700 transition-colors">
                Beranda
              </Link>
              <span>/</span>
              <span className="text-stone-800 font-semibold">Kontak & Reservasi</span>
            </nav>

            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200/80 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-800">
              <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
              <span>Komunikasi Langsung Tanpa Perantara</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-900 leading-tight max-w-4xl mx-auto">
              Mari Bicarakan Rencana Liburan Impian Anda di Bali
            </h1>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-sans max-w-2xl mx-auto">
              Punya pertanyaan khusus mengenai destinasi, ingin mengatur rute sesuai tempo rombongan, atau butuh jemputan bandara? Bli Gede siap merespon pesan Anda secara hangat.
            </p>
          </div>
        </section>

        {/* 2-Column Contact Container */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 md:pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Direct Info & WhatsApp Funnel */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-3xl border border-stone-200 bg-white p-7 sm:p-8 shadow-sm space-y-6">
                <div className="space-y-2">
                  <span className="text-xs uppercase tracking-wider font-bold text-blue-700">
                    Jalur Komunikasi Utama
                  </span>
                  <h2 className="font-serif text-2xl font-bold text-stone-900">
                    Respon Tercepat via WhatsApp
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    Cara termudah dan paling direkomendasikan. Anda langsung terhubung ke ponsel pribadi Bli Gede tanpa harus menunggu balasan email.
                  </p>
                </div>

                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 rounded-2xl bg-emerald-600 px-6 py-4 text-sm sm:text-base font-bold text-white shadow-lg shadow-emerald-600/30 hover:bg-emerald-500 transition-all"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>Chat WhatsApp Langsung</span>
                </a>

                {/* Direct Details */}
                <div className="pt-6 border-t border-stone-100 space-y-4 text-xs sm:text-sm">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-700 shrink-0">
                      <Phone className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="block text-stone-400 text-xs">Telepon / WhatsApp</span>
                      <span className="font-bold text-stone-900">{mockGuideProfile.phone}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-700 shrink-0">
                      <Mail className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="block text-stone-400 text-xs">Email Korespondensi</span>
                      <span className="font-bold text-stone-900">{mockGuideProfile.email}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 shrink-0">
                      <Clock className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="block text-stone-400 text-xs">Jam Layanan Konsultasi</span>
                      <span className="font-bold text-stone-900">07:00 - 22:00 WITA (Setiap Hari)</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-50 text-purple-700 shrink-0">
                      <ShieldCheck className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="block text-stone-400 text-xs">Lisensi Resmi HPI Bali</span>
                      <span className="font-bold text-stone-900">No. {mockGuideProfile.licenseNumber}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Fallback Message Form */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-stone-200 bg-white p-7 sm:p-8 shadow-sm space-y-6">
                <div className="space-y-1">
                  <h2 className="font-serif text-2xl font-bold text-stone-900">
                    Kirim Pesan Alternatif
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    Lebih nyaman mengirimkan detail tertulis? Silakan isi form di bawah. Bli Gede akan membalas ke email atau nomor WhatsApp Anda.
                  </p>
                </div>

                {/* Form Framework */}
                <form className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-stone-700">Nama Lengkap *</label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: Budi Santoso"
                        className="w-full rounded-xl border border-stone-300 px-4 py-3 text-xs sm:text-sm text-stone-900 focus:border-blue-700 focus:outline-hidden"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-stone-700">Nomor WhatsApp *</label>
                      <input
                        type="tel"
                        required
                        placeholder="Contoh: 0812-3456-7890"
                        className="w-full rounded-xl border border-stone-300 px-4 py-3 text-xs sm:text-sm text-stone-900 focus:border-blue-700 focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-stone-700">Email Anda</label>
                      <input
                        type="email"
                        placeholder="Contoh: budi@gmail.com"
                        className="w-full rounded-xl border border-stone-300 px-4 py-3 text-xs sm:text-sm text-stone-900 focus:border-blue-700 focus:outline-hidden"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-stone-700">Rencana Tanggal Tour</label>
                      <input
                        type="date"
                        className="w-full rounded-xl border border-stone-300 px-4 py-3 text-xs sm:text-sm text-stone-900 focus:border-blue-700 focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-stone-700">Pesan / Rencana Liburan *</label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Ceritakan berapa jumlah rombongan, destinasi yang ingin dikunjungi, atau lokasi hotel tempat menginap..."
                      className="w-full rounded-xl border border-stone-300 px-4 py-3 text-xs sm:text-sm text-stone-900 focus:border-blue-700 focus:outline-hidden"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 py-3.5 text-sm font-semibold text-white shadow-md hover:bg-blue-800 transition-colors"
                  >
                    <Send className="h-4 w-4" />
                    <span>Kirim Pesan ke Bli Gede</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
