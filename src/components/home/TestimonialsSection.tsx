"use client";

import React from "react";
import Link from "next/link";
import { Star, Quote, ArrowRight, CheckCircle2, HeartHandshake, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Review } from "@/types";
import { mockReviews } from "@/data/mock-data";

interface TestimonialsSectionProps {
  reviews?: Review[];
}

export default function TestimonialsSection({ reviews = mockReviews }: TestimonialsSectionProps) {
  // Hanya ambil review yang sudah dimoderasi/disetujui dan ditandai featured
  const approvedFeaturedReviews = (reviews || []).filter(
    (r) => r.isApproved && r.featured
  );

  // Jika belum ada testimoni yang layak tampil, seksi ini disembunyikan sepenuhnya
  // agar tidak menunjukkan konten kosong yang janggal bagi calon tamu.
  if (approvedFeaturedReviews.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-24 bg-[#fafaf9] relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200/80 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-800">
              <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
              <span>Testimoni Autentik Tamu</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 leading-tight">
              Cerita Liburan Nyata Bersama Gede
            </h2>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-sans">
              Pengalaman berkesan dari keluarga, pasangan, dan pelancong yang mempercayakan perjalanan mereka di Bali kepada panduan personal Gede.
            </p>
          </div>

          <Link
            href="/reviews"
            className="inline-flex items-center gap-2 rounded-xl border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-stone-800 shadow-xs hover:bg-stone-50 hover:border-stone-400 transition-all group shrink-0"
          >
            <span>Lihat Seluruh Ulasan</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 text-blue-700" />
          </Link>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {approvedFeaturedReviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative flex flex-col justify-between rounded-3xl border border-stone-200/90 bg-white p-7 sm:p-8 shadow-md hover:shadow-xl transition-all duration-300 group"
            >
              {/* Header: Stars & Quote Icon */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="ml-1 text-xs font-bold text-stone-800">
                      5.0
                    </span>
                  </div>

                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-100 text-stone-400 group-hover:bg-amber-100 group-hover:text-amber-700 transition-colors">
                    <Quote className="h-4 w-4" />
                  </div>
                </div>

                {/* Testimonial Quote Text */}
                <blockquote className="text-sm sm:text-base text-stone-700 leading-relaxed italic mb-6 font-sans">
                  &ldquo;{review.content}&rdquo;
                </blockquote>
              </div>

              {/* Footer: Author Info & Verified Badge */}
              <div className="pt-5 border-t border-stone-100 flex items-end justify-between gap-3 mt-auto">
                <div>
                  <h4 className="font-serif text-base sm:text-lg font-bold text-stone-900 flex items-center gap-1.5">
                    <span>{review.authorName}</span>
                    <span title="Tamu Terverifikasi" className="inline-flex items-center">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 inline" />
                    </span>
                  </h4>
                  <p className="text-xs text-stone-500 mt-0.5">
                    {review.authorOrigin} {review.dateOfTrip && `• ${review.dateOfTrip}`}
                  </p>
                </div>

                {review.tourName && (
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-lg shrink-0">
                    {review.tourName}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
