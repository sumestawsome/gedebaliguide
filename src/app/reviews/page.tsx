import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { mockReviews, mockGuideProfile } from "@/data/mock-data";
import { Star, Quote, CheckCircle2, ChevronRight, MessageCircle, Sparkles, HeartHandshake } from "lucide-react";
import { getGeneralConsultationUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Ulasan & Testimoni Tamu — Gede Bali Guide",
  description:
    "Baca cerita dan ulasan bintang 5 dari wisatawan yang telah menjelajahi Bali bersama Gede Sudiartana, tour guide resmi HPI Bali.",
};

export default function ReviewsPage() {
  const waUrl = getGeneralConsultationUrl("navbar");
  const approvedReviews = mockReviews.filter((r) => r.isApproved);
  const averageRating = (
    approvedReviews.reduce((acc, r) => acc + r.rating, 0) / approvedReviews.length
  ).toFixed(1);

  return (
    <div className="flex min-h-screen flex-col bg-[#fafaf9] text-stone-900 font-sans">
      <Navbar />

      <main className="flex-1 pb-24">
        {/* Breadcrumb Navigation */}
        <div className="border-b border-stone-200/80 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3.5">
            <nav className="flex items-center gap-2 text-xs font-medium text-stone-500">
              <Link href="/" className="hover:text-blue-700 transition-colors">
                Beranda
              </Link>
              <ChevronRight className="h-3.5 w-3.5 text-stone-400" />
              <span className="text-stone-900 font-semibold">Ulasan Tamu</span>
            </nav>
          </div>
        </div>

        {/* Hero Header */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-200/80 pb-10">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200/80 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-800">
                <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
                <span>Testimoni Autentik Wisatawan</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-stone-900">
                Ulasan & Cerita Tamu Liburan
              </h1>
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                Kepuasan dan kenyamanan keluarga Anda adalah prioritas utama Bli Gede. Baca pengalaman nyata tamu kami selama berlibur di Pulau Dewata.
              </p>
            </div>

            {/* Rating Summary Card */}
            <div className="rounded-3xl border border-stone-200/90 bg-white p-6 shadow-sm flex items-center gap-5 shrink-0">
              <div className="text-center border-r border-stone-100 pr-5">
                <span className="font-serif text-4xl font-bold text-stone-900">{averageRating}</span>
                <div className="flex items-center gap-0.5 justify-center mt-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
              <div className="text-xs space-y-1">
                <p className="font-bold text-stone-900">100% Ulasan Positif</p>
                <p className="text-stone-500">Berdasarkan {approvedReviews.length} testimoni terverifikasi</p>
                <p className="text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Guide Resmi HPI Bali
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews Grid */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {approvedReviews.map((review) => (
              <article
                key={review.id}
                className="relative flex flex-col justify-between rounded-3xl border border-stone-200/90 bg-white p-7 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                      ))}
                      <span className="ml-1 text-xs font-bold text-stone-800">
                        {review.rating}.0
                      </span>
                    </div>

                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-100 text-stone-400">
                      <Quote className="h-3.5 w-3.5" />
                    </div>
                  </div>

                  <blockquote className="text-sm text-stone-700 leading-relaxed italic mb-6 font-sans">
                    &ldquo;{review.content}&rdquo;
                  </blockquote>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-end justify-between gap-3 mt-auto">
                  <div>
                    <h3 className="font-serif text-base font-bold text-stone-900 flex items-center gap-1.5">
                      <span>{review.authorName}</span>
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                    </h3>
                    <p className="text-xs text-stone-500 mt-0.5">
                      {review.authorOrigin} {review.dateOfTrip && `• ${review.dateOfTrip}`}
                    </p>
                  </div>

                  {review.tourName && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-md shrink-0">
                      {review.tourName}
                    </span>
                  )}
                </div>
              </article>
            ))}
          </div>

          {/* Bottom Consultation Banner */}
          <div className="mt-16 rounded-3xl bg-stone-900 text-white p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
            <div className="space-y-2 max-w-xl text-center md:text-left">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold">
                Ingin Merasakan Pengalaman Liburan Serupa?
              </h2>
              <p className="text-stone-300 text-sm leading-relaxed">
                Rencanakan waktu liburan privat Anda di Bali bersama Bli Gede. Fleksibel, santai, dan tanpa paksaan belanja.
              </p>
            </div>

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 rounded-2xl bg-emerald-600 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-700/30 hover:bg-emerald-700 active:scale-95 transition-all shrink-0"
            >
              <MessageCircle className="h-5 w-5" />
              <span>Konsultasi Tur via WhatsApp</span>
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
