import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Sparkles, MessageCircle, Phone, Mail, MapPin, Clock, ShieldCheck, Send } from "lucide-react";
import ContactInfoSection from "@/components/contact/ContactInfoSection";
import ContactSocialCta from "@/components/contact/ContactSocialCta";
import { mockGuideProfile } from "@/data/mock-data";
import { getGeneralConsultationUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Kontak Bli Gede — Reservasi & Konsultasi Tur Privat Bali",
  description:
    "Hubungi Gede Sudiartana via WhatsApp atau formulir pesan untuk konsultasi rute liburan privat di Bali. Respon ramah, cepat, & tanpa komisi perantara.",
  keywords: [
    "Kontak Tour Guide Bali",
    "WhatsApp Gede Bali Guide",
    "Reservasi Tour Bali",
    "Konsultasi Wisata Bali",
    "Gede Sudiartana Kontak",
    "Nomor Telepon Guide Bali",
  ],
  alternates: {
    canonical: "https://gedebaliguide.com/contact",
  },
  openGraph: {
    title: "Kontak Bli Gede — Reservasi & Konsultasi Tur Privat Bali",
    description:
      "Hubungi Gede Sudiartana langsung via WhatsApp untuk konsultasi rute liburan privat keluarga di Bali. Tanpa biaya calo.",
    url: "https://gedebaliguide.com/contact",
    siteName: "Gede Bali Guide",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&auto=format&fit=crop&q=80",
        width: 1200,
        height: 630,
        alt: "Kontak Bli Gede Bali Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kontak Bli Gede — Reservasi & Konsultasi Tur Privat Bali",
    description:
      "Konsultasi rute liburan privat di Bali langsung via WhatsApp Bli Gede.",
    images: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&auto=format&fit=crop&q=80",
    ],
  },
};

export default function ContactPage() {
  const waUrl = getGeneralConsultationUrl("contact");

  const contactJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": "https://gedebaliguide.com/contact#contactpage",
    name: "Kontak Gede Bali Guide",
    description:
      "Layanan kontak langsung dan reservasi tur privat di Bali bersama pramuwisata berlisensi resmi HPI Gede Sudiartana.",
    url: "https://gedebaliguide.com/contact",
    mainEntity: {
      "@type": "Person",
      name: mockGuideProfile.name,
      jobTitle: "Licensed Bali Tour Guide (HPI Bali)",
      telephone: mockGuideProfile.phone,
      email: mockGuideProfile.email,
      contactPoint: {
        "@type": "ContactPoint",
        telephone: mockGuideProfile.phone,
        contactType: "customer service",
        availableLanguage: ["Indonesian", "English"],
        areaServed: "ID",
      },
    },
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#fafaf9] text-stone-900 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
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
            <div className="lg:col-span-5">
              <ContactInfoSection />
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

          {/* WhatsApp Direct Funnel & Social Media Channels */}
          <ContactSocialCta />
        </section>
      </main>

      <Footer />
    </div>
  );
}
