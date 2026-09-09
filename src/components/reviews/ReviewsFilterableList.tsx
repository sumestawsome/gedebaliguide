"use client";

import React, { useState } from "react";
import { Star, Quote, CheckCircle2, MessageSquarePlus, X, Send, HeartHandshake, Sparkles, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Review } from "@/types";

interface ReviewsFilterableListProps {
  initialReviews: Review[];
}

export default function ReviewsFilterableList({ initialReviews }: ReviewsFilterableListProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  // Form state
  const [formName, setFormName] = useState("");
  const [formOrigin, setFormOrigin] = useState("");
  const [formTour, setFormTour] = useState("");
  const [formRating, setFormRating] = useState(5);
  const [formContent, setFormContent] = useState("");

  const filters = [
    { id: "all", label: "Semua Ulasan", count: initialReviews.length },
    {
      id: "family",
      label: "Wisata Keluarga",
      count: initialReviews.filter(
        (r) =>
          r.content.toLowerCase().includes("keluarga") ||
          r.content.toLowerCase().includes("anak") ||
          r.authorName.toLowerCase().includes("keluarga")
      ).length,
    },
    {
      id: "couple",
      label: "Pasangan & Honeymoon",
      count: initialReviews.filter(
        (r) =>
          r.authorName.includes("&") ||
          r.content.toLowerCase().includes("honeymoon") ||
          r.content.toLowerCase().includes("romantis")
      ).length,
    },
    {
      id: "international",
      label: "Wisatawan Internasional",
      count: initialReviews.filter(
        (r) =>
          !r.authorOrigin.toLowerCase().includes("indonesia") &&
          !r.authorOrigin.toLowerCase().includes("jakarta") &&
          !r.authorOrigin.toLowerCase().includes("surabaya") &&
          !r.authorOrigin.toLowerCase().includes("bandung")
      ).length,
    },
    {
      id: "domestic",
      label: "Wisatawan Domestik",
      count: initialReviews.filter(
        (r) =>
          r.authorOrigin.toLowerCase().includes("indonesia") ||
          r.authorOrigin.toLowerCase().includes("jakarta") ||
          r.authorOrigin.toLowerCase().includes("surabaya") ||
          r.authorOrigin.toLowerCase().includes("bandung")
      ).length,
    },
  ];

  const filteredReviews = initialReviews.filter((r) => {
    if (selectedFilter === "family") {
      return (
        r.content.toLowerCase().includes("keluarga") ||
        r.content.toLowerCase().includes("anak") ||
        r.authorName.toLowerCase().includes("keluarga")
      );
    }
    if (selectedFilter === "couple") {
      return (
        r.authorName.includes("&") ||
        r.content.toLowerCase().includes("honeymoon") ||
        r.content.toLowerCase().includes("romantis")
      );
    }
    if (selectedFilter === "international") {
      return (
        !r.authorOrigin.toLowerCase().includes("indonesia") &&
        !r.authorOrigin.toLowerCase().includes("jakarta") &&
        !r.authorOrigin.toLowerCase().includes("surabaya") &&
        !r.authorOrigin.toLowerCase().includes("bandung")
      );
    }
    if (selectedFilter === "domestic") {
      return (
        r.authorOrigin.toLowerCase().includes("indonesia") ||
        r.authorOrigin.toLowerCase().includes("jakarta") ||
        r.authorOrigin.toLowerCase().includes("surabaya") ||
        r.authorOrigin.toLowerCase().includes("bandung")
      );
    }
    return true;
  });

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setModalOpen(false);
      setFormName("");
      setFormOrigin("");
      setFormTour("");
      setFormRating(5);
      setFormContent("");
    }, 2800);
  };

  return (
    <section className="py-10 md:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Filter Bar & Submit Review Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-stone-200/80">
          <div className="flex flex-wrap items-center gap-2">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFilter(f.id)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all ${
                  selectedFilter === f.id
                    ? "bg-blue-700 text-white shadow-sm"
                    : "bg-white text-stone-600 border border-stone-200/80 hover:bg-stone-100 hover:text-stone-900"
                }`}
              >
                <span>{f.label}</span>
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                    selectedFilter === f.id ? "bg-white/20 text-white" : "bg-stone-100 text-stone-500"
                  }`}
                >
                  {f.count}
                </span>
              </button>
            ))}
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-white border border-stone-300 px-4 py-2.5 text-xs sm:text-sm font-semibold text-stone-800 shadow-xs hover:bg-stone-50 hover:border-stone-400 transition-all shrink-0"
          >
            <MessageSquarePlus className="h-4 w-4 text-emerald-600" />
            <span>Tulis Pengalaman Liburan Anda</span>
          </button>
        </div>

        {/* Reviews Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence>
            {filteredReviews.map((review, idx) => (
              <motion.article
                key={review.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: idx * 0.04 }}
                className="relative flex flex-col justify-between rounded-3xl border border-stone-200/90 bg-white p-7 shadow-xs hover:shadow-xl hover:border-amber-300/70 transition-all duration-300"
              >
                <div>
                  {/* Top Card: Rating & Quote */}
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

                  {/* Review Content */}
                  <blockquote className="text-sm text-stone-700 leading-relaxed italic mb-6 font-sans">
                    &ldquo;{review.content}&rdquo;
                  </blockquote>
                </div>

                {/* Footer Card: Author Details */}
                <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row sm:items-end justify-between gap-3 mt-auto">
                  <div className="min-w-0">
                    <h3 className="font-serif text-base font-bold text-stone-900 flex items-center gap-1.5 truncate">
                      <span className="truncate">{review.authorName}</span>
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                    </h3>
                    <p className="text-xs text-stone-500 mt-0.5 truncate">
                      {review.authorOrigin} {review.dateOfTrip && `• ${review.dateOfTrip}`}
                    </p>
                  </div>

                  {review.tourName && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-md shrink-0 truncate max-w-[180px]">
                      {review.tourName}
                    </span>
                  )}
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredReviews.length === 0 && (
          <div className="py-20 text-center space-y-3">
            <Quote className="h-10 w-10 text-stone-300 mx-auto" />
            <p className="text-stone-500 font-medium">
              Belum ada ulasan untuk kategori ini.
            </p>
          </div>
        )}
      </div>

      {/* Review Submission Modal */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs">
            <div className="absolute inset-0" onClick={() => !submitted && setModalOpen(false)} />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative z-10 w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-stone-200"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              {!submitted && (
                <button
                  onClick={() => setModalOpen(false)}
                  className="absolute top-4 right-4 text-stone-400 hover:text-stone-600 p-1"
                >
                  <X className="h-5 w-5" />
                </button>
              )}

              {submitted ? (
                <div className="py-8 text-center space-y-4">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-stone-900">
                    Matur Suksema!
                  </h3>
                  <p className="text-sm text-stone-600 leading-relaxed max-w-sm mx-auto">
                    Ulasan Anda telah kami terima dengan baik. Setelah proses verifikasi singkat oleh tim Bli Gede, ulasan akan tampil di halaman ini.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <div className="space-y-1">
                    <h3 className="font-serif text-xl font-bold text-stone-900">
                      Bagikan Pengalaman Liburan Anda
                    </h3>
                    <p className="text-xs text-stone-500">
                      Cerita Anda sangat berharga bagi calon wisatawan yang ingin menjelajahi Bali bersama Bli Gede.
                    </p>
                  </div>

                  {/* Rating Selector */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-stone-700">
                      Penilaian Anda (Bintang)
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFormRating(star)}
                          className="p-1 text-amber-400 hover:scale-110 transition-transform"
                        >
                          <Star
                            className={`h-6 w-6 ${
                              star <= formRating
                                ? "fill-amber-400 text-amber-400"
                                : "text-stone-300"
                            }`}
                          />
                        </button>
                      ))}
                      <span className="text-xs font-bold text-stone-700 ml-1">
                        {formRating}.0 / 5.0
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-stone-700">Nama Anda *</label>
                      <input
                        type="text"
                        required
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="Contoh: Keluarga Hendra"
                        className="w-full rounded-xl border border-stone-300 px-3.5 py-2 text-xs text-stone-900 focus:border-blue-700 focus:outline-hidden"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-stone-700">Asal Kota / Negara *</label>
                      <input
                        type="text"
                        required
                        value={formOrigin}
                        onChange={(e) => setFormOrigin(e.target.value)}
                        placeholder="Contoh: Surabaya, Indonesia"
                        className="w-full rounded-xl border border-stone-300 px-3.5 py-2 text-xs text-stone-900 focus:border-blue-700 focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-stone-700">Nama Rute / Tur yang Diikuti</label>
                    <input
                      type="text"
                      value={formTour}
                      onChange={(e) => setFormTour(e.target.value)}
                      placeholder="Contoh: Ubud Waterfall & Rice Terrace"
                      className="w-full rounded-xl border border-stone-300 px-3.5 py-2 text-xs text-stone-900 focus:border-blue-700 focus:outline-hidden"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-stone-700">Isi Ulasan / Cerita *</label>
                    <textarea
                      required
                      rows={4}
                      value={formContent}
                      onChange={(e) => setFormContent(e.target.value)}
                      placeholder="Ceritakan bagaimana pelayanan, kenyamanan armada mobil, dan wawasan Bli Gede selama perjalanan..."
                      className="w-full rounded-xl border border-stone-300 px-3.5 py-2 text-xs text-stone-900 focus:border-blue-700 focus:outline-hidden"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 py-3 text-xs sm:text-sm font-semibold text-white shadow-md hover:bg-blue-800 transition-colors"
                  >
                    <Send className="h-4 w-4" />
                    <span>Kirim Ulasan untuk Moderasi</span>
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
