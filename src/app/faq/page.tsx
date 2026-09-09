import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { HelpCircle, Sparkles, MessageCircle, ChevronRight } from "lucide-react";
import { getGeneralConsultationUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Tanya Jawab (FAQ) — Gede Bali Guide",
  description:
    "Pertanyaan umum seputar tur privat di Bali bersama Gede Sudiartana: cara pemesanan, sistem pembayaran, armada mobil, dan fleksibilitas rute.",
};

export default function FaqPage() {
  const waUrl = getGeneralConsultationUrl("faq");

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
              <span className="text-stone-800 font-semibold">Tanya Jawab (FAQ)</span>
            </nav>

            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-200/80 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-blue-800">
              <HelpCircle className="h-3.5 w-3.5 text-blue-600" />
              <span>Panduan Lengkap Calon Wisatawan</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-900 leading-tight max-w-4xl mx-auto">
              Pertanyaan yang Sering Diajukan Wisatawan
            </h1>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-sans max-w-2xl mx-auto">
              Semua hal penting mengenai sistem pemesanan tanpa perantara, kenyamanan mobil, hingga fleksibilitas waktu kami rangkum di sini.
            </p>
          </div>
        </section>

        {/* FAQ List Container */}
        <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12 md:pt-16">
          <div className="space-y-4">
            {/* Initial Accordion items framework */}
            <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs space-y-2">
              <h3 className="font-serif text-lg font-bold text-stone-900">
                Bagaimana cara memesan paket tur bersama Bli Gede?
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Pemesanan sangat mudah dan langsung: cukup klik tombol WhatsApp di website ini. Anda akan langsung terhubung ke chat pribadi Bli Gede untuk mencocokkan tanggal, jumlah peserta, dan rute impian Anda.
              </p>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs space-y-2">
              <h3 className="font-serif text-lg font-bold text-stone-900">
                Apakah harus membayar uang muka (DP) terlebih dahulu?
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Untuk sebagian besar tur darat privat, Anda tidak diwajibkan membayar DP. Pembayaran dapat dilakukan tunai atau transfer langsung saat bertemu Bli Gede di hari penjemputan.
              </p>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs space-y-2">
              <h3 className="font-serif text-lg font-bold text-stone-900">
                Apakah rute turnya bisa diubah di tengah jalan?
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Tentu saja! Karena ini adalah tur 100% privat, Anda memegang kendali penuh atas tempo perjalanan. Jika Anda ingin berlama-lama di satu tempat atau melewati destinasi tertentu, cukup diskusikan dengan Bli Gede.
              </p>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs space-y-2">
              <h3 className="font-serif text-lg font-bold text-stone-900">
                Apakah mobil digabung dengan wisatawan lain?
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Sama sekali tidak. Seluruh armada mobil privat Bli Gede ber-AC dingin dan hanya diisi oleh rombongan keluarga atau teman Anda sendiri demi kenyamanan dan privasi maksimal.
              </p>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs space-y-2">
              <h3 className="font-serif text-lg font-bold text-stone-900">
                Apakah ada kewajiban belanja di toko oleh-oleh tertentu?
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Tidak ada komisi toko belanja sama sekali. Bli Gede tidak akan pernah memaksa Anda mengunjungi toko rekanan atau galeri tertentu. Waktu liburan 100% untuk kenikmatan Anda.
              </p>
            </div>
          </div>

          {/* Still Have Questions CTA */}
          <div className="mt-14 rounded-3xl bg-stone-900 text-white p-8 text-center space-y-5 shadow-xl">
            <h3 className="font-serif text-2xl font-bold">
              Punya Pertanyaan Lain yang Belum Terjawab?
            </h3>
            <p className="text-sm text-stone-300 max-w-md mx-auto leading-relaxed">
              Jangan sungkan untuk bertanya langsung kepada Bli Gede lewat WhatsApp. Konsultasi bebas biaya dan ramah.
            </p>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-2xl bg-emerald-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg hover:bg-emerald-500 transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
              <span>Tanya Bli Gede via WhatsApp</span>
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
