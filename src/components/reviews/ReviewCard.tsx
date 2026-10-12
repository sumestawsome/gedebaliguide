"use client";

import React from "react";
import { Star, Quote, CheckCircle2 } from "lucide-react";

export interface ReviewCardData {
  id?: string;
  rating?: number;
  text?: string;
  content?: string;
  author?: string;
  authorName?: string;
  origin?: string;
  authorOrigin?: string;
  tourType?: string;
  tourName?: string;
  dateOfTrip?: string;
}

interface ReviewCardProps {
  review: ReviewCardData;
  index?: number;
  className?: string;
}

export default function ReviewCard({
  review,
  index = 0,
  className = "",
}: ReviewCardProps) {
  const rating = review.rating || 5;
  const rawText = review.text || review.content || "";
  // Strip outer quotes if already present to prevent duplicate quotation marks
  const cleanText = rawText.replace(/^[“"']+|[”"']+$/g, "").trim();
  const author = review.author || review.authorName || "Tamu Terverifikasi";
  const origin = review.origin || review.authorOrigin || "Wisatawan";
  const tourName = review.tourType || review.tourName || "Tur Privat Bali";

  // Pola Ritme 3 Warna Sekuensial (1-2-3):
  // 1: Biru Samudra (var(--brand-blue) / bg-[var(--brand-blue-light)])
  // 2: Hijau Bali (var(--brand-green) / bg-[var(--brand-green-light)])
  // 3: Oranye Sunset (var(--brand-accent) / bg-[var(--brand-accent-light)])
  const rhythmIndex = index % 3;

  const badgeClass =
    rhythmIndex === 0
      ? "bg-[var(--brand-blue-light)] text-[var(--brand-blue)]"
      : rhythmIndex === 1
      ? "bg-[var(--brand-green-light)] text-[var(--brand-green)]"
      : "bg-[var(--brand-accent-light)] text-[var(--brand-accent)]";

  const hoverBorderClass =
    rhythmIndex === 0
      ? "hover:border-[var(--brand-blue)]"
      : rhythmIndex === 1
      ? "hover:border-[var(--brand-green)]"
      : "hover:border-[var(--brand-accent)]";

  const quoteBgClass =
    rhythmIndex === 0
      ? "bg-[var(--brand-blue-light)] text-[var(--brand-blue)]"
      : rhythmIndex === 1
      ? "bg-[var(--brand-green-light)] text-[var(--brand-green)]"
      : "bg-[var(--brand-accent-light)] text-[var(--brand-accent)]";

  return (
    <article
      className={`bg-[var(--canvas)] border border-[var(--border)] rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:-translate-y-1 hover:shadow-md transition-all duration-200 ${hoverBorderClass} ${className}`}
    >
      <div>
        {/* Header Kartu: Bintang 5.0 (var(--brand-accent)) & Ikon Kutipan (Quote) */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className="h-4 w-4 fill-[var(--brand-accent)] text-[var(--brand-accent)]"
                />
              ))}
            </div>
            <span className="text-xs font-bold text-[var(--text-primary)] tracking-tight">
              {rating.toFixed(1)}
            </span>
          </div>

          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors shrink-0 ${quoteBgClass}`}
            aria-hidden="true"
          >
            <Quote className="h-3.5 w-3.5" />
          </div>
        </div>

        {/* Teks Kutipan Ulasan */}
        <blockquote className="text-sm sm:text-[15px] text-[var(--text-primary)] leading-relaxed italic mb-5 font-sans">
          &ldquo;{cleanText}&rdquo;
        </blockquote>
      </div>

      {/* Bagian Bawah: Data Tamu & Badge Paket Tur dengan Ritme 3 Warna */}
      <div className="pt-4 border-t border-[var(--border)] flex flex-col sm:flex-row sm:items-end justify-between gap-3 mt-auto">
        <div className="min-w-0">
          <div className="font-bold text-sm text-[var(--text-primary)] flex items-center gap-1.5">
            <span className="truncate">{author}</span>
            <span title="Ulasan Terverifikasi" className="inline-flex shrink-0">
              <CheckCircle2 className="h-3.5 w-3.5 text-[var(--brand-green)]" />
            </span>
          </div>
          <div className="text-xs text-[var(--text-muted)] mt-0.5 truncate">
            {origin}
            {review.dateOfTrip && ` • ${review.dateOfTrip}`}
          </div>
        </div>

        {tourName && (
          <span
            className={`px-2.5 py-1 rounded-md text-[11px] font-semibold shrink-0 max-w-[190px] truncate ${badgeClass}`}
            title={tourName}
          >
            {tourName}
          </span>
        )}
      </div>
    </article>
  );
}
