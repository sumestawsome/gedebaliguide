import React from "react";
import Link from "next/link";
import { Star, Quote, ArrowRight, CheckCircle2 } from "lucide-react";
import { mockReviews } from "@/data/mock-data";

export default function TestimonialsSection() {
  const approvedFeaturedReviews = mockReviews.filter(
    (r) => r.isApproved && r.featured
  );

  if (!approvedFeaturedReviews || approvedFeaturedReviews.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
              Bukti Kredibilitas
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-900">
              Apa Kata Tamu yang Pernah Dipandu Gede?
            </h2>
            <p className="text-stone-600 text-sm sm:text-base">
              Kisah nyata dan kepuasan dari wisatawan domestik maupun mancanegara yang menikmati liburan bebas repot di Bali.
            </p>
          </div>
          <Link
            href="/reviews"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-800 group"
          >
            <span>Baca Seluruh Ulasan</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {approvedFeaturedReviews.map((review) => (
            <div
              key={review.id}
              className="relative flex flex-col justify-between rounded-2xl border border-stone-200 bg-white p-7 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Quote Icon */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex text-amber-400">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <Quote className="h-6 w-6 text-stone-300" />
              </div>

              {/* Content */}
              <blockquote className="text-sm text-stone-700 leading-relaxed italic mb-6">
                &ldquo;{review.content}&rdquo;
              </blockquote>

              {/* Author Info */}
              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-base font-bold text-stone-900 flex items-center gap-1.5">
                    <span>{review.authorName}</span>
                    <span title="Tamu Terverifikasi" className="inline-flex items-center">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 inline" />
                    </span>
                  </h4>
                  <p className="text-xs text-stone-500">
                    {review.authorOrigin} {review.dateOfTrip && `• ${review.dateOfTrip}`}
                  </p>
                </div>
                {review.tourName && (
                  <span className="text-[10px] uppercase font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                    {review.tourName}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
