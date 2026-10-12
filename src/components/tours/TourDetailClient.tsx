"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Clock,
  Users,
  Star,
  ShieldCheck,
  MapPin,
  Check,
  X,
  Calendar,
  User,
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  MessageCircle,
  Car,
  Camera,
  Sparkles,
  HeartHandshake,
  Compass,
  FileText,
} from "lucide-react";
import { Tour, Review } from "@/types";
import Footer from "@/components/layout/Footer";
import { handleWhatsAppClick } from "@/lib/lead-tracker";
import { mockReviews } from "@/data/mock-data";

interface TourDetailClientProps {
  tour: Tour;
}

export default function TourDetailClient({ tour }: TourDetailClientProps) {
  const [lang, setLang] = useState<"id" | "en">("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("app_lang");
      if (saved === "id" || saved === "en") {
        setLang(saved);
      } else {
        setLang("en");
      }
    } catch {}
    const handleLang = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.lang === "id" || detail?.lang === "en") {
        setLang(detail.lang);
      }
    };
    window.addEventListener("appLanguageChange", handleLang);
    return () => window.removeEventListener("appLanguageChange", handleLang);
  }, []);

  const [currentPhotoIdx, setCurrentPhotoIdx] = useState(0);

  // Form State
  const [tripDate, setTripDate] = useState("");
  const [guestCount, setGuestCount] = useState<number>(tour.minimumGuests || 2);
  const [hotelLocation, setHotelLocation] = useState("");

  const today = new Date().toISOString().split("T")[0];

  // Gallery Photos (gabungkan cover dan galleryImages unik)
  const photos = useMemo(() => {
    const list = [tour.coverImage, ...(tour.galleryImages || [])];
    return Array.from(new Set(list.filter(Boolean)));
  }, [tour.coverImage, tour.galleryImages]);

  // Ulasan Relevan untuk Tur Ini (Filter berdasarkan slug atau nama, fallback ke review bintang 5)
  const relevantReviews = useMemo(() => {
    const matched = mockReviews.filter(
      (r) =>
        r.tourName?.toLowerCase().includes(tour.area.toLowerCase()) ||
        r.tourName?.toLowerCase().includes(tour.name.toLowerCase()) ||
        tour.name.toLowerCase().includes((r.tourName || "").toLowerCase())
    );
    if (matched.length >= 2) return matched.slice(0, 2);
    return mockReviews.slice(0, 2);
  }, [tour.area, tour.name]);

  const dictionary = {
    id: {
      backToCatalog: "Kembali ke Katalog Tur",
      breadcrumbHome: "Beranda",
      breadcrumbCatalog: "Katalog Tur",
      exclusiveBadge: "PAKET TUR PRIVAT EKSKLUSIF",
      feeLabel: tour.price && tour.price > 0 ? "Biaya Sewa" : "Tarif Tur",
      feeUnit: tour.price && tour.price > 0 ? (tour.priceType === "per_person" ? "per orang" : "per mobil (maks 5 tamu)") : "fleksibel via WhatsApp",
      quotaLabel: "Kuota Tamu",
      quotaValue: `${tour.minimumGuests || 1} – ${tour.maximumGuests || 5} Tamu`,
      quotaDesc: "Rombongan privat",
      durationLabel: "Durasi Tur",
      durationDesc: "Jadwal santai",
      standardLabel: "Standar Layanan",
      standardValue: "100% Privat",
      standardDesc: "Mobil dingin ber-AC",
      aboutKicker: "Cerita & Nuansa",
      aboutTitle: "Tentang Perjalanan Ini",
      itineraryKicker: "Rencana Perjalanan",
      itineraryTitle: "Sorotan Destinasi & Rencana Perjalanan",
      itinerarySubtitle:
        "Rute disusun santai dan fleksibel, murni menikmati keindahan budaya dan alam Bali tanpa paksaan mampir belanja oleh-oleh.",
      whyKicker: "Keistimewaan Layanan",
      whyTitle: "Mengapa Tur Ini Istimewa Bersama Bli Gede?",
      whyFeatures: [
        {
          title: "Spot Foto Golden Hour",
          desc: "Bli Gede memahami sudut pencahayaan dan waktu terbaik di setiap destinasi agar momen liburan Anda terabadikan sempurna.",
          icon: Camera,
        },
        {
          title: "Pemandu Berlisensi Resmi HPI",
          desc: "Terdaftar legal di Himpunan Pramuwisata Indonesia (No. HPI-BALI-2015-8849) dengan wawasan sejarah dan tradisi Bali yang mendalam.",
          icon: ShieldCheck,
        },
        {
          title: "Armada Mobil Bersih Ber-AC",
          desc: "Mobil pribadi terawat, kabin wangi sejuk, bahan bakar, biaya parkir, serta air mineral dingin selalu tersedia di dalam mobil.",
          icon: Car,
        },
        {
          title: "Rute Santai & Bebas Atur",
          desc: "Perjalanan 100% privat khusus keluarga atau pasangan Anda. Bebas berhenti sejenak untuk beristirahat atau mampir ke tempat favorit.",
          icon: Compass,
        },
      ],
      facilitiesKicker: "Transparansi Layanan",
      facilitiesTitle: "Fasilitas & Ketentuan Layanan",
      facilitiesSubtitle:
        "Semua komponen harga kami cantumkan secara transparan tanpa biaya tersembunyi demi kenyamanan Anda.",
      inclusionsTitle: "Sudah Termasuk (Inclusions)",
      exclusionsTitle: "Belum Termasuk (Exclusions)",
      reviewsKicker: "Kata Wisatawan",
      reviewsTitle: "Ulasan Wisatawan untuk Paket Ini",
      reviewsSubtitle: "Pengalaman nyata wisatawan yang telah menjelajahi rute ini bersama Bli Gede.",
      seeAllReviews: "Lihat Semua Ulasan Tamu →",
      bookingCardTitle: "Form Reservasi Cepat",
      bookingCardSubtitle: "Langsung terhubung dengan Bli Gede tanpa perantara",
      fieldDate: "Pilih Tanggal Tur:",
      fieldGuests: "Jumlah Tamu:",
      fieldHotel: "Nama Hotel / Area Penjemputan:",
      hotelPlaceholder: "Contoh: Kuta, Seminyak, Ubud, dll.",
      btnBookWa: "Pesan via WhatsApp Langsung",
      peaceOfMindTitle: "Jaminan Ketenangan Reservasi:",
      peaceOfMind1: "Tanpa Uang Muka (Bebas DP) · Bayar setelah tur selesai",
      peaceOfMind2: "Bebas ubah jadwal jika rencana perjalanan berubah",
      guestReviewsSuffix: "ulasan wisatawan",
      usdApprox: (idr: number) => `IDR ${idr.toLocaleString("en-US")} (~$${Math.round(idr / 15500)} USD)`,
    },
    en: {
      backToCatalog: "Back to Tour Packages",
      breadcrumbHome: "Home",
      breadcrumbCatalog: "Tour Packages",
      exclusiveBadge: "EXCLUSIVE PRIVATE TOUR",
      feeLabel: tour.price && tour.price > 0 ? "Tour Price" : "Tour Rates",
      feeUnit: tour.price && tour.price > 0 ? (tour.priceType === "per_person" ? "per guest" : "per private car (up to 5 guests)") : "flexible via WhatsApp",
      quotaLabel: "Guest Capacity",
      quotaValue: `${tour.minimumGuests || 1} – ${tour.maximumGuests || 5} Guests`,
      quotaDesc: "Private group only",
      durationLabel: "Tour Duration",
      durationDesc: "Relaxed pacing",
      standardLabel: "Service Standard",
      standardValue: "100% Private",
      standardDesc: "Air-conditioned car",
      aboutKicker: "Story & Character",
      aboutTitle: "About This Experience",
      itineraryKicker: "Curated Itinerary",
      itineraryTitle: "Destination Highlights & Itinerary",
      itinerarySubtitle:
        "Thoughtfully planned with relaxed pacing, focused purely on Balinese culture and natural beauty without mandatory souvenir stops.",
      whyKicker: "Signature Hospitality",
      whyTitle: "Why Tour with Bli Gede?",
      whyFeatures: [
        {
          title: "Golden Hour Photo Spots",
          desc: "Bli Gede knows the ideal lighting angles and best timing so your precious holiday memories are captured beautifully.",
          icon: Camera,
        },
        {
          title: "Officially Licensed HPI Guide",
          desc: "Certified by the Indonesian Tour Guides Association (License No. HPI-BALI-2015-8849) sharing authentic historical insights.",
          icon: ShieldCheck,
        },
        {
          title: "Clean Air-Conditioned Car",
          desc: "Well-maintained private vehicle, chilled AC, fuel, all parking fees, and cold bottled mineral water included.",
          icon: Car,
        },
        {
          title: "Flexible & Stress-Free",
          desc: "100% private for your party. Pause whenever you wish to stretch, snap photos, or savor a relaxing coffee.",
          icon: Compass,
        },
      ],
      facilitiesKicker: "Transparent Inclusions",
      facilitiesTitle: "Inclusions & Service Terms",
      facilitiesSubtitle:
        "Transparent pricing with zero hidden fees, so you know exactly what is covered in your tour.",
      inclusionsTitle: "Included (Inclusions)",
      exclusionsTitle: "Not Included (Exclusions)",
      reviewsKicker: "Guest Experiences",
      reviewsTitle: "Guest Reviews for This Tour",
      reviewsSubtitle: "Real experiences from travelers who explored this exact route with Bli Gede.",
      seeAllReviews: "View All Guest Reviews →",
      bookingCardTitle: "Quick Booking Request",
      bookingCardSubtitle: "Connect directly with Bli Gede without agency fees",
      fieldDate: "Select Tour Date:",
      fieldGuests: "Number of Guests:",
      fieldHotel: "Hotel / Pick-Up Location:",
      hotelPlaceholder: "e.g. Kuta, Seminyak, Ubud, Nusa Dua",
      btnBookWa: "Book Directly via WhatsApp",
      peaceOfMindTitle: "Guaranteed Peace of Mind:",
      peaceOfMind1: "Zero Deposit Required · Pay cash/QRIS after your tour",
      peaceOfMind2: "Free date rescheduling if your plans change",
      guestReviewsSuffix: "guest reviews",
      usdApprox: (idr: number) => `IDR ${idr.toLocaleString("en-US")} (~$${Math.round(idr / 15500)} USD)`,
    },
  };

  const t = dictionary[lang];

  // Helper Format Harga
  const formatDisplayPrice = (price: number) => {
    if (!price || price <= 0) {
      return lang === "en" ? "Price on Request" : "Tarif via WA";
    }
    if (lang === "en") {
      return t.usdApprox(price);
    }
    return `Rp ${Number(price).toLocaleString("id-ID")}`;
  };

  // Handle Action Booking via WhatsApp Lead Tracker
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let customMsg = "";
    if (lang === "en") {
      customMsg = `Hello Bli Gede, I would like to book the *${tour.name}* on ${
        tripDate ? tripDate : "(date to be confirmed)"
      } for ${guestCount} guest(s). Pick-up at: ${
        hotelLocation.trim() ? hotelLocation.trim() : "(hotel to be informed)"
      }. Please let me know your availability. Thank you!`;
    } else {
      customMsg = `Halo Bli Gede, saya ingin reservasi paket *${tour.name}* untuk tanggal ${
        tripDate ? tripDate : "(jadwal menyusul)"
      } dengan rombongan ${guestCount} orang. Penjemputan di: ${
        hotelLocation.trim() ? hotelLocation.trim() : "(hotel menyusul)"
      }. Mohon info ketersediaan jadwalnya ya Bli. Suksema!`;
    }

    handleWhatsAppClick(`Tour Detail Sticky Form (${tour.slug})`, tour.name, customMsg);
  };

  return (
    <div className="min-h-screen bg-[#FEFDFB] text-[#121715] flex flex-col font-sans selection:bg-[#EBF5FB] selection:text-[#1878B8]">
      <main className="flex-1 pb-20 sm:pb-24">
        {/* ========================================================
            1. BREADCRUMB RESPONSIF (FIX CLIPPING DI MOBILE)
            - Mobile (< 768px): "← Kembali ke Katalog Tur" (Href="/tours")
            - Desktop & Tablet (>= 768px): Beranda / Katalog Tur / [Nama Tur]
            ======================================================== */}
        <div className="border-b border-[#EBE9E6] bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
            {/* Tampilan Mobile (< 768px) */}
            <div className="md:hidden">
              <Link
                href="/tours"
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#5E6965] hover:text-[#1878B8] transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>{t.backToCatalog}</span>
              </Link>
            </div>

            {/* Tampilan Desktop & Tablet (>= 768px) */}
            <nav
              aria-label="Breadcrumb"
              className="hidden md:flex items-center gap-2 text-xs font-medium text-[#5E6965]"
            >
              <Link href="/" className="hover:text-[#1878B8] transition-colors">
                {t.breadcrumbHome}
              </Link>
              <span className="text-[#CFCDCA]">/</span>
              <Link href="/tours" className="hover:text-[#1878B8] transition-colors">
                {t.breadcrumbCatalog}
              </Link>
              <span className="text-[#CFCDCA]">/</span>
              <span className="font-semibold text-[#08090A] truncate max-w-md">
                {tour.name}
              </span>
            </nav>
          </div>
        </div>

        {/* ========================================================
            2. LAYOUT UTAMA EDITORIAL (2 KOLOM DESKTOP, 1 KOLOM MOBILE)
            ======================================================== */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* ========================================================
                KOLOM KIRI: KONTEN UTAMA TUR (COL-SPAN-8)
                ======================================================== */}
            <div className="lg:col-span-8 space-y-8 sm:space-y-10">
              
              {/* Header Info: Badge, Judul, Tagline */}
              <div className="space-y-3.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#E8F6F0] text-[#0C8C5E]">
                    {t.exclusiveBadge}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#EBF5FB] text-[#1878B8]">
                    📍 {tour.area}
                  </span>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF8F5] text-xs font-semibold text-[#08090A]">
                    <Star className="h-3.5 w-3.5 fill-[#E67E22] text-[#E67E22]" />
                    <span>{(tour.rating || 5.0).toFixed(1)}</span>
                    <span className="text-[#5E6965] font-normal">
                      ({tour.reviewCount || 48} {t.guestReviewsSuffix})
                    </span>
                  </div>
                </div>

                <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#08090A] leading-tight">
                  {tour.name}
                </h1>

                <p className="text-sm sm:text-base text-[#5E6965] leading-relaxed">
                  {tour.tagline}
                </p>

                {/* Kartu Ringkasan 4 Kolom */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl bg-white border border-[#EBE9E6] shadow-[0_4px_20px_rgba(12,140,94,0.04)]">
                  {/* Biaya Sewa */}
                  <div className="space-y-1 border-r border-[#EBE9E6]/80 pr-2 sm:pr-3">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-[#5E6965]">
                      {t.feeLabel}
                    </span>
                    <p className="font-serif text-sm sm:text-base font-bold text-[#E67E22] truncate">
                      {formatDisplayPrice(tour.price)}
                    </p>
                    <span className="block text-[11px] text-[#5E6965] leading-tight">
                      {t.feeUnit}
                    </span>
                  </div>

                  {/* Kuota Tamu */}
                  <div className="space-y-1 sm:border-r border-[#EBE9E6]/80 pr-2 sm:pr-3">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-[#5E6965]">
                      {t.quotaLabel}
                    </span>
                    <p className="font-serif text-sm sm:text-base font-bold text-[#08090A]">
                      {t.quotaValue}
                    </p>
                    <span className="block text-[11px] text-[#5E6965] leading-tight">
                      {t.quotaDesc}
                    </span>
                  </div>

                  {/* Durasi Tur */}
                  <div className="space-y-1 border-r border-[#EBE9E6]/80 pr-2 sm:pr-3">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-[#5E6965]">
                      {t.durationLabel}
                    </span>
                    <p className="font-serif text-sm sm:text-base font-bold text-[#08090A]">
                      {tour.duration}
                    </p>
                    <span className="block text-[11px] text-[#5E6965] leading-tight">
                      {t.durationDesc}
                    </span>
                  </div>

                  {/* Standar Layanan */}
                  <div className="space-y-1">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-[#5E6965]">
                      {t.standardLabel}
                    </span>
                    <p className="font-serif text-sm sm:text-base font-bold text-[#0C8C5E]">
                      {t.standardValue}
                    </p>
                    <span className="block text-[11px] text-[#0C8C5E] font-medium leading-tight">
                      {t.standardDesc}
                    </span>
                  </div>
                </div>
              </div>

              {/* ========================================================
                  HERO IMAGE / SLIDESHOW INTERAKTIF MULTI-FOTO
                  ======================================================== */}
              <div className="space-y-3">
                <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-[#EBE9E6] bg-[#FAF8F5] shadow-lg group">
                  <Image
                    src={photos[currentPhotoIdx] || tour.coverImage}
                    alt={`${tour.name} - Foto ${currentPhotoIdx + 1}`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 800px"
                    className="object-cover transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />

                  {/* Navigasi Prev & Next Foto */}
                  {photos.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          setCurrentPhotoIdx((prev) => (prev === 0 ? photos.length - 1 : prev - 1))
                        }
                        aria-label="Foto Sebelumnya"
                        className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/85 hover:bg-white text-[#08090A] backdrop-blur-md flex items-center justify-center shadow-md transition-transform active:scale-95 cursor-pointer z-10"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setCurrentPhotoIdx((prev) => (prev === photos.length - 1 ? 0 : prev + 1))
                        }
                        aria-label="Foto Selanjutnya"
                        className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/85 hover:bg-white text-[#08090A] backdrop-blur-md flex items-center justify-center shadow-md transition-transform active:scale-95 cursor-pointer z-10"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </>
                  )}

                  {/* Indikator Hitungan Foto di Kanan Bawah */}
                  <div className="absolute bottom-3.5 right-3.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-semibold">
                    {currentPhotoIdx + 1} / {photos.length}
                  </div>
                </div>

                {/* Thumbnail Strip Minimalis */}
                {photos.length > 1 && (
                  <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
                    {photos.map((imgUrl, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setCurrentPhotoIdx(idx)}
                        className={`relative w-20 sm:w-24 aspect-[16/10] rounded-xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                          currentPhotoIdx === idx
                            ? "border-[#0C8C5E] ring-2 ring-[#0C8C5E]/30 scale-102"
                            : "border-[#EBE9E6] opacity-70 hover:opacity-100"
                        }`}
                      >
                        <Image
                          src={imgUrl}
                          alt={`Thumbnail ${idx + 1}`}
                          fill
                          sizes="96px"
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* ========================================================
                  SEKSI: TENTANG PERJALANAN INI
                  ======================================================== */}
              <div className="space-y-3 pt-2">
                <div>
                  <span className="font-serif italic text-base sm:text-lg text-[#1878B8] font-normal tracking-wide block mb-1">
                    “{t.aboutKicker}”
                  </span>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#08090A]">
                    {t.aboutTitle}
                  </h2>
                </div>
                <div className="text-sm sm:text-base text-[#5E6965] leading-relaxed space-y-3">
                  <p>{tour.description}</p>
                </div>
              </div>

              {/* ========================================================
                  SEKSI: SOROTAN DESTINASI & TIMELINE ITINERARY
                  ======================================================== */}
              <div className="space-y-5 pt-4 border-t border-[#EBE9E6]">
                <div>
                  <span className="font-serif italic text-base sm:text-lg text-[#0C8C5E] font-normal tracking-wide block mb-1">
                    “{t.itineraryKicker}”
                  </span>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#08090A]">
                    {t.itineraryTitle}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#5E6965] mt-1">
                    {t.itinerarySubtitle}
                  </p>
                </div>

                {/* Timeline Bertahap (01, 02, 03, 04, ...) */}
                {tour.itinerary && tour.itinerary.length > 0 ? (
                  <div className="relative border-l-2 border-[#0C8C5E]/20 ml-3.5 sm:ml-4 pl-5 sm:pl-7 space-y-6 sm:space-y-7 py-2">
                    {tour.itinerary.map((item, idx) => (
                      <div key={idx} className="relative group">
                        {/* Dot / Nomor Titik */}
                        <div className="absolute -left-[31px] sm:-left-[39px] top-0 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-[#0C8C5E] text-white text-xs font-bold shadow-xs">
                          {String(idx + 1).padStart(2, "0")}
                        </div>

                        {/* Konten Timeline */}
                        <div className="bg-white border border-[#EBE9E6] p-4 sm:p-5 rounded-2xl shadow-xs group-hover:border-[#0C8C5E]/40 transition-colors">
                          <div className="flex flex-wrap items-center gap-2 mb-1.5">
                            <span className="px-2.5 py-0.5 rounded-md bg-[#F2FAF6] text-[#0C8C5E] text-xs font-bold">
                              {item.time}
                            </span>
                            <h3 className="font-serif text-base sm:text-lg font-bold text-[#08090A]">
                              {item.title}
                            </h3>
                          </div>
                          <p className="text-xs sm:text-sm text-[#5E6965] leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-[#5E6965] italic">
                    {lang === "id"
                      ? "Rencana perjalanan fleksibel dan dapat disesuaikan langsung dengan Bli Gede."
                      : "Flexible itinerary custom-tailored directly with Bli Gede."}
                  </p>
                )}
              </div>

              {/* ========================================================
                  SEKSI: MENGAPA TUR INI ISTIMEWA BERSAMA BLI GEDE
                  (4 KARTU FITUR STANDAR LAYANAN DENGAN RITME 3 WARNA)
                  ======================================================== */}
              <div className="space-y-4 pt-4 border-t border-[#EBE9E6]">
                <div>
                  <span className="font-serif italic text-base sm:text-lg text-[#1878B8] font-normal tracking-wide block mb-1">
                    “{t.whyKicker}”
                  </span>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#08090A]">
                    {t.whyTitle}
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {t.whyFeatures.map((feat, fIdx) => {
                    const IconComp = feat.icon;
                    const rhythmStyles = [
                      {
                        iconBg: "bg-[#EBF5FB] text-[#1878B8]",
                        borderHover: "hover:border-[#1878B8]",
                      },
                      {
                        iconBg: "bg-[#E8F6F0] text-[#0C8C5E]",
                        borderHover: "hover:border-[#0C8C5E]",
                      },
                      {
                        iconBg: "bg-[#FDF3E6] text-[#E67E22]",
                        borderHover: "hover:border-[#E67E22]",
                      },
                    ];
                    const rhythm = rhythmStyles[fIdx % 3];
                    return (
                      <div
                        key={fIdx}
                        className={`bg-white border border-[#EBE9E6] rounded-2xl p-5 shadow-xs space-y-2.5 transition-all duration-200 hover:-translate-y-0.5 ${rhythm.borderHover}`}
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${rhythm.iconBg}`}>
                          <IconComp className="h-5 w-5" />
                        </div>
                        <h3 className="font-bold text-sm sm:text-base text-[#08090A]">
                          {feat.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#5E6965] leading-relaxed">
                          {feat.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* ========================================================
                  SEKSI: FASILITAS & KETENTUAN LAYANAN (INCLUSIONS & EXCLUSIONS)
                  ======================================================== */}
              <div className="space-y-4 pt-4 border-t border-[#EBE9E6]">
                <div>
                  <span className="font-serif italic text-base sm:text-lg text-[#0C8C5E] font-normal tracking-wide block mb-1">
                    “{t.facilitiesKicker}”
                  </span>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#08090A]">
                    {t.facilitiesTitle}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#5E6965] mt-1">
                    {t.facilitiesSubtitle}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {/* Kolom Sudah Termasuk (Inclusions) */}
                  <div className="bg-[#F2FAF6]/70 border border-[#0C8C5E]/20 rounded-2xl p-5 sm:p-6 space-y-3.5">
                    <div className="flex items-center gap-2 text-[#0C8C5E] font-serif font-bold text-base sm:text-lg border-b border-[#0C8C5E]/15 pb-2.5">
                      <div className="w-6 h-6 rounded-full bg-[#0C8C5E] text-white flex items-center justify-center shrink-0">
                        <Check className="h-3.5 w-3.5" />
                      </div>
                      <span>{t.inclusionsTitle}</span>
                    </div>

                    <ul className="space-y-2.5 text-xs sm:text-sm text-[#121715]">
                      {tour.includes && tour.includes.length > 0 ? (
                        tour.includes.map((inc, iIdx) => (
                          <li key={iIdx} className="flex items-start gap-2.5">
                            <Check className="h-4 w-4 text-[#0C8C5E] shrink-0 mt-0.5" />
                            <span className="leading-relaxed font-medium">{inc}</span>
                          </li>
                        ))
                      ) : (
                        <li className="text-[#5E6965] italic">Fasilitas privat ber-AC.</li>
                      )}
                    </ul>
                  </div>

                  {/* Kolom Belum Termasuk (Exclusions) */}
                  <div className="bg-[#FAF8F5] border border-[#EBE9E6] rounded-2xl p-5 sm:p-6 space-y-3.5">
                    <div className="flex items-center gap-2 text-[#5E6965] font-serif font-bold text-base sm:text-lg border-b border-[#EBE9E6] pb-2.5">
                      <div className="w-6 h-6 rounded-full bg-neutral-300 text-neutral-700 flex items-center justify-center shrink-0">
                        <X className="h-3.5 w-3.5" />
                      </div>
                      <span>{t.exclusionsTitle}</span>
                    </div>

                    <ul className="space-y-2.5 text-xs sm:text-sm text-[#5E6965]">
                      {tour.excludes && tour.excludes.length > 0 ? (
                        tour.excludes.map((exc, eIdx) => (
                          <li key={eIdx} className="flex items-start gap-2.5">
                            <X className="h-4 w-4 text-neutral-400 shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{exc}</span>
                          </li>
                        ))
                      ) : (
                        <li className="text-[#5E6965] italic">Tiket dan pengeluaran pribadi.</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>

              {/* ========================================================
                  SEKSI: ULASAN WISATAWAN KHUSUS PAKET INI (2 ULASAN)
                  ======================================================== */}
              <div className="space-y-4 pt-4 border-t border-[#EBE9E6]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="font-serif italic text-base sm:text-lg text-[#1878B8] font-normal tracking-wide block mb-1">
                      “{t.reviewsKicker}”
                    </span>
                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#08090A]">
                      {t.reviewsTitle}
                    </h2>
                    <p className="text-xs sm:text-sm text-[#5E6965] mt-1">
                      {t.reviewsSubtitle}
                    </p>
                  </div>
                  <Link
                    href="/reviews"
                    className="text-xs sm:text-sm font-semibold text-[#0C8C5E] hover:underline shrink-0"
                  >
                    {t.seeAllReviews}
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {relevantReviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="bg-white border border-[#EBE9E6] rounded-2xl p-5 shadow-xs space-y-3 flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-1">
                          {[...Array(rev.rating || 5)].map((_, starIdx) => (
                            <Star
                              key={starIdx}
                              className="h-4 w-4 fill-[#E67E22] text-[#E67E22]"
                            />
                          ))}
                        </div>
                        <p className="text-xs sm:text-sm text-[#08090A] leading-relaxed italic">
                          “{rev.content}”
                        </p>
                      </div>

                      <div className="pt-3 border-t border-[#EBE9E6]/70 flex items-center justify-between text-xs">
                        <span className="font-bold text-[#08090A]">{rev.authorName}</span>
                        <span className="text-[#5E6965]">{rev.authorOrigin}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ========================================================
                KOLOM KANAN: STICKY BOOKING MINI-FORM (COL-SPAN-4)
                ======================================================== */}
            <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
              <div className="bg-white border border-[#EBE9E6] rounded-3xl p-6 sm:p-7 shadow-[0_8px_30px_rgba(12,140,94,0.08)] space-y-5">
                
                {/* Header Kartu Booking */}
                <div className="border-b border-[#EBE9E6] pb-4 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#0C8C5E]">
                    {t.bookingCardTitle}
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-serif text-2xl sm:text-3xl font-bold text-[#E67E22]">
                      {formatDisplayPrice(tour.price)}
                    </span>
                  </div>
                  <p className="text-xs text-[#5E6965]">{t.feeUnit}</p>
                </div>

                {/* Formulir Pemesanan Cepat */}
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  {/* Tanggal Tur */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="tripDate"
                      className="block text-xs font-semibold text-[#08090A]"
                    >
                      {t.fieldDate}
                    </label>
                    <div className="relative">
                      <input
                        id="tripDate"
                        type="date"
                        min={today}
                        value={tripDate}
                        onChange={(e) => setTripDate(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#EBE9E6] bg-[#FEFDFB] text-xs sm:text-sm text-[#08090A] focus:outline-none focus:border-[#0C8C5E] focus:ring-1 focus:ring-[#0C8C5E] cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Jumlah Tamu */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="guestCount"
                      className="block text-xs font-semibold text-[#08090A]"
                    >
                      {t.fieldGuests}
                    </label>
                    <select
                      id="guestCount"
                      value={guestCount}
                      onChange={(e) => setGuestCount(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#EBE9E6] bg-[#FEFDFB] text-xs sm:text-sm text-[#08090A] focus:outline-none focus:border-[#0C8C5E] focus:ring-1 focus:ring-[#0C8C5E] cursor-pointer"
                    >
                      {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>
                          {num} {lang === "id" ? "Tamu / Penumpang" : "Guest(s)"}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Hotel / Area Penjemputan */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="hotelLocation"
                      className="block text-xs font-semibold text-[#08090A]"
                    >
                      {t.fieldHotel}
                    </label>
                    <input
                      id="hotelLocation"
                      type="text"
                      value={hotelLocation}
                      onChange={(e) => setHotelLocation(e.target.value)}
                      placeholder={t.hotelPlaceholder}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#EBE9E6] bg-[#FEFDFB] text-xs sm:text-sm text-[#08090A] placeholder-[#5E6965] focus:outline-none focus:border-[#0C8C5E] focus:ring-1 focus:ring-[#0C8C5E]"
                    />
                  </div>

                  {/* Tombol Pesan via WhatsApp Langsung */}
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[#E67E22] hover:bg-[#D35400] text-white font-semibold text-sm shadow-[0_4px_14px_rgba(230,126,34,0.28)] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                  >
                    <MessageCircle className="h-4 w-4 shrink-0" />
                    <span>{t.btnBookWa}</span>
                  </button>
                </form>

                {/* Catatan Ketenangan & Transparansi */}
                <div className="pt-4 border-t border-[#EBE9E6] space-y-2 text-xs text-[#5E6965]">
                  <span className="block font-semibold text-[#08090A]">
                    {t.peaceOfMindTitle}
                  </span>
                  <div className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-[#0C8C5E] shrink-0 mt-0.5" />
                    <p>{t.peaceOfMind1}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-[#0C8C5E] shrink-0 mt-0.5" />
                    <p>{t.peaceOfMind2}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
