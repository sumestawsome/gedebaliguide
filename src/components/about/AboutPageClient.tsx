"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Clock,
  Compass,
  Camera,
  Award,
  ShieldCheck,
  Sparkles,
  Heart,
  Car,
  ChevronRight,
  ArrowLeft,
  MessageCircle,
} from "lucide-react";
import Footer from "@/components/layout/Footer";
import { AboutPageContent, StatItem, PillarItem, TrustItem } from "@/types";
import { handleWhatsAppClick } from "@/lib/lead-tracker";
import { getButtonVariantClasses } from "@/lib/button-variants";
import MediaRenderer from "@/components/common/MediaRenderer";

interface AboutPageClientProps {
  initialContent: AboutPageContent;
}

export default function AboutPageClient({ initialContent }: AboutPageClientProps) {
  const [lang, setLang] = useState<"id" | "en">("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("app_lang");
      if (saved === "id" || saved === "en") {
        setLang(saved);
      } else {
        setLang("en");
      }
    } catch { }
    const handleLang = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.lang === "id" || detail?.lang === "en") {
        setLang(detail.lang);
      }
    };
    window.addEventListener("appLanguageChange", handleLang);
    return () => window.removeEventListener("appLanguageChange", handleLang);
  }, []);

  // Dynamic icon mapper for Lucide icons
  const renderIcon = (iconName: string, className = "w-6 h-6 text-[#0C8C5E]") => {
    switch (iconName.toLowerCase()) {
      case "clock":
        return <Clock className={className} />;
      case "compass":
        return <Compass className={className} />;
      case "camera":
        return <Camera className={className} />;
      case "award":
        return <Award className={className} />;
      case "shieldcheck":
      case "shield":
        return <ShieldCheck className={className} />;
      case "sparkles":
        return <Sparkles className={className} />;
      case "heart":
        return <Heart className={className} />;
      case "car":
        return <Car className={className} />;
      default:
        return <Sparkles className={className} />;
    }
  };

  // English fallback translations for full bilingual experience
  const contentEn = {
    breadcrumbHome: "Home",
    breadcrumbCurrent: "About Gede",
    backHome: "Back to Home",
    hero: {
      badge: "Local Guide in Bali",
      title: "Meet Bli Gede, Your Local Friend & Keeper of Bali's Stories",
      introText:
        "Om Swastyastu. Welcome to Bali. I'm Gede Sudiartana, an officially licensed independent HPI Bali tour guide. I believe the best journeys are not about rushing through a dozen checklist spots a day, but about slowing down, discovering true serenity, and experiencing the authentic soul of our island at your family's own gentle rhythm.",
      imageCaption:
        "Gede Sudiartana — Born, raised, and dedicating his life to sharing the authentic heart of Bali.",
      stats: [
        { id: "stat-1", value: "10+ Years", label: "Guiding Experience" },
        { id: "stat-2", value: "1,200+", label: "Happy Guests" },
        { id: "stat-3", value: "5.0 Stars", label: "Flawless Rating" },
        { id: "stat-4", value: "100% Private", label: "Relaxed & Flexible" },
      ],
      ctaPrimary: "Consult with Bli Gede",
      ctaSecondary: "Explore Tour Packages",
    },
    story: {
      sectionTag: "THE STORY BEHIND THE WHEEL",
      title: "Beyond Just Driving — Connecting You to the Soul of Bali",
      paragraphs: [
        "I was born and raised in Gianyar, surrounded by a close-knit Balinese family deeply rooted in gamelan music, stone carving, and temple traditions. Since childhood, the fragrance of ceremonial incense, morning chants, and lush terraced fields have formed the heartbeat of my daily life. To me, Bali is never just scenic landscapes; it is a living philosophy of harmony known as Tri Hita Karana.",
        "Over a decade in the tourism industry, I saw how mass commercial tours often strip away that magic: guests hurried from gate to gate on rigid countdowns, forced stops at souvenir shops for kickbacks, leaving travelers exhausted rather than rejuvenated. That is why I chose to guide independently.",
        "By guiding directly without brokers or high-volume agency quotas, I dedicate my full personal attention to every family or couple. We adjust naturally if the weather turns or children need a breather, and we pause whenever you spot a quiet scene that takes your breath away.",
      ],
      quote:
        "To me, every traveler is never a mere business transaction, but a dear friend visiting my home in Bali.",
      quoteAuthor: "Gede Sudiartana",
    },
    guidingStyle: {
      sectionTag: "THE EXPERIENCE WITH GEDE",
      title: "How Your Day Unfolds with Bli Gede",
      subtitle:
        "Three pillars of comfort and hospitality ensuring your Bali holiday feels unhurried, enriching, and peaceful.",
      pillars: [
        {
          id: "pillar-1",
          icon: "Clock",
          title: "Your Time Belongs to You",
          description:
            "No hurried whistles or rigid schedules. Whether you wish to linger over warm coffee amidst rice terraces or await the sunset along Uluwatu's cliffs, the day adapts to your tempo.",
        },
        {
          id: "pillar-2",
          icon: "Compass",
          title: "Living Cultural Stories",
          description:
            "Explanations of temple etiquette, sacred offerings, and folklore are shared warmly and naturally, just like chatting with an old local friend.",
        },
        {
          id: "pillar-3",
          icon: "Camera",
          title: "Best Photo Perspectives",
          description:
            "Deep knowledge of hidden vantage points away from tourist crowds, with friendly help to capture candid family memories with natural framing.",
        },
      ],
    },
    trustStrip: [
      {
        id: "trust-1",
        icon: "Award",
        title: "Licensed HPI Guide",
        description:
          "Reg. No: HPI-BALI-2015-8849 — Officially verified cultural knowledge, accredited legal guiding across sacred temples.",
      },
      {
        id: "trust-2",
        icon: "ShieldCheck",
        title: "Private A/C Vehicle",
        description:
          "Clean, fresh, cool family MPV reserved exclusively for your party with zero stranger sharing.",
      },
      {
        id: "trust-3",
        icon: "Sparkles",
        title: "Absolute Transparency",
        description:
          "No hidden booking surcharges, no mandatory retail detours, and flexible final payment directly on tour day.",
      },
    ],
    cta: {
      title: "Have a Custom Holiday Itinerary or Dream Route in Bali?",
      subtitle:
        "Let's discuss it casually on WhatsApp. Bli Gede is happy to recommend the most enjoyable and comfortable route for your family.",
      buttonText: "Chat with Bli Gede on WhatsApp",
    },
  };

  const isEn = lang === "en";
  const enResolved = initialContent.en || contentEn;
  const idResolved = initialContent.id || initialContent;

  // Data resolution with live Firestore primary and bilingual fallback
  const heroData = {
    badge: isEn ? (enResolved.hero?.badge || contentEn.hero.badge) : (idResolved.hero?.badge || initialContent.hero.badge),
    title: isEn ? (enResolved.hero?.title || contentEn.hero.title) : (idResolved.hero?.title || initialContent.hero.title),
    introText: isEn ? (enResolved.hero?.introText || contentEn.hero.introText) : (idResolved.hero?.introText || initialContent.hero.introText),
    profileImage: (isEn ? (enResolved as any).hero?.profileImage : (idResolved as any).hero?.profileImage) || initialContent.hero.profileImage,
    imageCaption: isEn ? (enResolved.hero?.imageCaption || contentEn.hero.imageCaption) : (idResolved.hero?.imageCaption || initialContent.hero.imageCaption),
    stats: ((isEn ? (enResolved as any).hero?.stats : (idResolved as any).hero?.stats) || initialContent.hero.stats) as StatItem[],
    ctaPrimary: isEn
      ? (enResolved.hero as any)?.ctaPrimary || contentEn.hero.ctaPrimary
      : (idResolved.hero?.ctaPrimary || initialContent.hero.ctaPrimary || "Konsultasi Bersama Gede"),
    ctaPrimaryVariant:
      (initialContent as any).ctaPrimaryVariant ||
      (enResolved.hero as any)?.ctaPrimaryVariant ||
      (idResolved.hero as any)?.ctaPrimaryVariant ||
      initialContent.hero.ctaPrimaryVariant ||
      "ocean-blue-solid",
    ctaSecondary: isEn
      ? (enResolved.hero as any)?.ctaSecondary || contentEn.hero.ctaSecondary
      : (idResolved.hero?.ctaSecondary || initialContent.hero.ctaSecondary || "Lihat Pilihan Tur"),
    ctaSecondaryVariant:
      (initialContent as any).ctaSecondaryVariant ||
      (enResolved.hero as any)?.ctaSecondaryVariant ||
      (idResolved.hero as any)?.ctaSecondaryVariant ||
      initialContent.hero.ctaSecondaryVariant ||
      "neutral-outline",
    media:
      (initialContent as any).heroMedia ||
      (isEn ? (enResolved as any).hero?.media : (idResolved as any).hero?.media) ||
      initialContent.hero.media,
  };

  const storyData = {
    sectionTag: isEn ? (enResolved.story?.sectionTag || contentEn.story.sectionTag) : (idResolved.story?.sectionTag || initialContent.story.sectionTag),
    title: isEn ? (enResolved.story?.title || contentEn.story.title) : (idResolved.story?.title || initialContent.story.title),
    paragraphs: isEn ? (enResolved.story?.paragraphs || contentEn.story.paragraphs) : (idResolved.story?.paragraphs || initialContent.story.paragraphs),
    quote: isEn ? (enResolved.story?.quote || contentEn.story.quote) : (idResolved.story?.quote || initialContent.story.quote),
    quoteAuthor: isEn ? (enResolved.story?.quoteAuthor || contentEn.story.quoteAuthor) : (idResolved.story?.quoteAuthor || initialContent.story.quoteAuthor),
    storyImage: (isEn ? (enResolved as any).story?.storyImage : (idResolved as any).story?.storyImage) || initialContent.story.storyImage,
    media:
      (initialContent as any).storyMedia ||
      (isEn ? (enResolved as any).story?.media : (idResolved as any).story?.media) ||
      initialContent.story.media,
  };


  const guidingStyleData = {
    sectionTag: isEn ? (enResolved.guidingStyle?.sectionTag || contentEn.guidingStyle.sectionTag) : (idResolved.guidingStyle?.sectionTag || initialContent.guidingStyle.sectionTag),
    title: isEn ? (enResolved.guidingStyle?.title || contentEn.guidingStyle.title) : (idResolved.guidingStyle?.title || initialContent.guidingStyle.title),
    subtitle: isEn ? (enResolved.guidingStyle?.subtitle || contentEn.guidingStyle.subtitle) : (idResolved.guidingStyle?.subtitle || initialContent.guidingStyle.subtitle),
    pillars: ((isEn ? (enResolved as any).guidingStyle?.pillars : (idResolved as any).guidingStyle?.pillars) || initialContent.guidingStyle.pillars) as PillarItem[],
  };

  const trustStripData = ((isEn ? (enResolved as any).trustStrip : (idResolved as any).trustStrip) || initialContent.trustStrip) as TrustItem[];

  const ctaData = {
    title: isEn ? (enResolved.cta?.title || contentEn.cta.title) : (idResolved.cta?.title || initialContent.cta.title),
    subtitle: isEn ? (enResolved.cta?.subtitle || contentEn.cta.subtitle) : (idResolved.cta?.subtitle || initialContent.cta.subtitle),
    buttonText: isEn ? (enResolved.cta?.buttonText || contentEn.cta.buttonText) : (idResolved.cta?.buttonText || initialContent.cta.buttonText),
    buttonVariant:
      (initialContent as any).buttonVariant ||
      (enResolved.cta as any)?.buttonVariant ||
      (idResolved.cta as any)?.buttonVariant ||
      initialContent.cta.buttonVariant ||
      "sunset-amber-solid",
  };


  return (
    <div className="flex min-h-screen flex-col bg-[#FEFDFB] text-[#08090A] font-sans selection:bg-[#EBF5FB] selection:text-[#1878B8]">
      <main className="flex-1">
        {/* ========================================================
            BREADCRUMB RINGKAS (Mobile & Desktop)
            ======================================================== */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
          {/* Mobile Back Button (< 768px) */}
          <div className="md:hidden">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5E6965] hover:text-[#1878B8] py-1 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{isEn ? contentEn.backHome : "Kembali ke Beranda"}</span>
            </Link>
          </div>

          {/* Desktop Breadcrumb (>= 768px) */}
          <nav aria-label="Breadcrumb" className="hidden md:flex items-center gap-2 text-xs font-medium text-[#5E6965]">
            <Link href="/" className="hover:text-[#1878B8] transition-colors">
              {isEn ? contentEn.breadcrumbHome : "Beranda"}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#CFCDCA]" />
            <span className="text-[#08090A] font-semibold">
              {isEn ? contentEn.breadcrumbCurrent : "Tentang Gede"}
            </span>
          </nav>
        </div>

        {/* ========================================================
            SEKSI 1: HERO PORTRAIT & SAPAAN
            ======================================================== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-16 lg:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Kolom Kiri: Teks Profil Editorial & Statistik */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8">
              {/* Aksen Teks Editorial Bersih Tanpa Shape */}
              <div className="mb-2">
                <span className="font-serif italic text-base sm:text-lg text-[#1878B8] font-normal tracking-wide">
                  “{heroData.badge}”
                </span>
              </div>

              {/* Headline Utama (Libre Baskerville) */}
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#08090A] leading-[1.2] tracking-tight">
                {heroData.title}
              </h1>

              {/* Paragraf Pengantar yang Personal & Ramah */}
              <p className="text-base sm:text-lg text-[#37413C] leading-relaxed">
                {heroData.introText}
              </p>

              {/* Baris Statistik Minimalis (Render Dinamis hero.stats .map) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-2 pb-2">
                {heroData.stats.map((stat) => (
                  <div
                    key={stat.id}
                    className="p-3.5 sm:p-4 rounded-2xl bg-[#FAF8F5] border border-[#EBE9E6]/70 transition-transform duration-200 hover:-translate-y-0.5"
                  >
                    <div className="text-2xl sm:text-3xl font-bold text-[#E67E22] tracking-tight">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm text-[#5E6965] font-medium mt-1 leading-snug">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Tombol CTA (Dinamis Varian dari State/Firestore) */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => handleWhatsAppClick("Konsultasi Profil Gede")}
                  className={`inline-flex items-center justify-center gap-2 h-11 px-5 py-2.5 rounded-xl font-medium text-sm transition-all cursor-pointer ${getButtonVariantClasses(
                    heroData.ctaPrimaryVariant,
                    "ocean-blue-solid"
                  )}`}
                >
                  <MessageCircle className="w-4.5 h-4.5" />
                  <span>{heroData.ctaPrimary}</span>
                </button>
                <Link
                  href="/tours"
                  className={`inline-flex items-center justify-center gap-2 h-11 px-5 py-2.5 rounded-xl font-medium text-sm transition-colors text-center ${getButtonVariantClasses(
                    heroData.ctaSecondaryVariant,
                    "neutral-outline"
                  )}`}
                >
                  <span>{heroData.ctaSecondary}</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Kolom Kanan: Media Dinamis (Single / Multi Template) Bli Gede */}
            <div className="lg:col-span-5">
              <MediaRenderer
                media={heroData.media}
                fallbackImage={{
                  url: heroData.profileImage.url,
                  alt: heroData.profileImage.alt,
                  caption: heroData.imageCaption,
                }}
                aspectRatio="aspect-[4/5]"
                priority
              />
            </div>
          </div>
        </section>

        {/* ========================================================
            SEKSI 2: KISAH DI BALIK KEMUDI (Clean White bg-white)
            ======================================================== */}
        <section className="bg-white border-y border-[#EBE9E6] py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Kolom Teks: Narasi Mengalir & Pull Quote */}
              <div className="lg:col-span-7 space-y-6 sm:space-y-8 order-2 lg:order-1">
                <div className="space-y-2 mb-4">
                  <span className="font-serif italic text-base sm:text-lg text-[#1878B8] font-normal tracking-wide block">
                    “{storyData.sectionTag}”
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#08090A] leading-tight">
                    {storyData.title}
                  </h2>
                </div>

                {/* Looping Narasi Paragraf */}
                <div className="space-y-4 text-base sm:text-lg text-[#37413C] leading-relaxed">
                  {storyData.paragraphs.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>

                {/* Pull-Quote Elegan dengan Aksen Hijau Bali Green */}
                <div className="border-l-4 border-[#0C8C5E] pl-6 py-3 bg-[#E8F6F0]/50 rounded-r-2xl">
                  <p className="font-serif italic text-lg sm:text-xl text-[#08090A] leading-snug">
                    &ldquo;{storyData.quote}&rdquo;
                  </p>
                  <span className="block mt-2 text-xs sm:text-sm font-semibold text-[#0C8C5E]">
                    — {storyData.quoteAuthor}
                  </span>
                </div>
              </div>

              {/* Kolom Visual: Media Dinamis (Single / Multi Template) Suasana Cerita */}
              <div className="lg:col-span-5 order-1 lg:order-2">
                <MediaRenderer
                  media={storyData.media}
                  fallbackImage={{
                    url: storyData.storyImage.url,
                    alt: storyData.storyImage.alt,
                    caption: storyData.storyImage.alt,
                  }}
                  aspectRatio="aspect-[4/5]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            SEKSI 3: BAGAIMANA HARI ANDA BERJALAN BERSAMA GEDE (Warm Cream bg-[#FEFDFB])
            Pola Ritme 3 Warna: 1 Biru Samudra, 2 Hijau Bali, 3 Oranye Sunset
            ======================================================== */}
        <section className="bg-[#FEFDFB] py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center space-y-2 mb-12 sm:mb-16">
              <span className="font-serif italic text-base sm:text-lg text-[#1878B8] font-normal tracking-wide block mb-2">
                “{guidingStyleData.sectionTag}”
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#08090A] leading-tight mb-3">
                {guidingStyleData.title}
              </h2>
              <p className="text-sm sm:text-base text-[#5E6965] leading-relaxed font-sans">
                {guidingStyleData.subtitle}
              </p>
            </div>

            {/* 3 Esai Singkat dengan Tata Letak Editorial Lega (Pola Ritme 3 Warna) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {guidingStyleData.pillars.map((pillar, idx) => {
                const iconBoxBg =
                  idx === 0
                    ? "bg-[#EBF5FB] text-[#1878B8]"
                    : idx === 1
                      ? "bg-[#E8F6F0] text-[#0C8C5E]"
                      : "bg-[#FDF3E6] text-[#E67E22]";
                const iconColor =
                  idx === 0
                    ? "w-6 h-6 text-[#1878B8]"
                    : idx === 1
                      ? "w-6 h-6 text-[#0C8C5E]"
                      : "w-6 h-6 text-[#E67E22]";
                const hoverBorder =
                  idx === 0
                    ? "hover:border-[#1878B8]"
                    : idx === 1
                      ? "hover:border-[#0C8C5E]"
                      : "hover:border-[#E67E22]";

                return (
                  <div
                    key={pillar.id}
                    className={`group relative p-6 sm:p-8 rounded-2xl bg-white border border-[#EBE9E6] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between ${hoverBorder}`}
                  >
                    <div className="space-y-4">
                      {/* Icon Header */}
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 ${iconBoxBg}`}>
                        {renderIcon(pillar.icon, iconColor)}
                      </div>

                      <h3 className="font-serif text-xl font-bold text-[#08090A] leading-snug">
                        {pillar.title}
                      </h3>

                      <p className="text-sm sm:text-base text-[#5E6965] leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================
            SEKSI 4: STANDAR KENYAMANAN & KEPASTIAN (Clean White bg-white)
            Pola Ritme 3 Warna: 1 Biru Samudra, 2 Hijau Bali, 3 Oranye Sunset
            ======================================================== */}
        <section className="bg-white border-y border-[#EBE9E6] py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {trustStripData.map((item, idx) => {
                const iconBoxBg =
                  idx === 0
                    ? "bg-[#EBF5FB] text-[#1878B8]"
                    : idx === 1
                      ? "bg-[#E8F6F0] text-[#0C8C5E]"
                      : "bg-[#FDF3E6] text-[#E67E22]";
                const iconColor =
                  idx === 0
                    ? "w-5 h-5 text-[#1878B8]"
                    : idx === 1
                      ? "w-5 h-5 text-[#0C8C5E]"
                      : "w-5 h-5 text-[#E67E22]";

                return (
                  <div
                    key={item.id}
                    className="flex items-start gap-4 p-5 sm:p-6 rounded-2xl bg-[#FEFDFB] border border-[#EBE9E6]/80 shadow-xs"
                  >
                    <div className={`p-2.5 rounded-xl shrink-0 ${iconBoxBg}`}>
                      {renderIcon(item.icon, iconColor)}
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-sm sm:text-base text-[#08090A]">
                        {item.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-[#5E6965] leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================
            SEKSI 5: BOTTOM CTA BANNER (Gradien Biru Samudra Elegan)
            bg-gradient-to-r from-[#0F4C81] to-[#1878B8] text-white
            ======================================================== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 w-full max-w-full box-border">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0F4C81] to-[#1878B8] text-white p-5 sm:p-12 lg:p-16 text-center shadow-xl w-full max-w-full box-border">
            {/* Soft decorative background circles */}
            <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full bg-[#E67E22]/20 blur-2xl pointer-events-none" />

            <div className="relative max-w-2xl mx-auto space-y-4 w-full">
              <span className="inline-block px-3 py-1 rounded-full bg-white/15 text-xs font-semibold tracking-wider uppercase text-white/90 border border-white/20">
                {isEn ? "Direct Local Consultation" : "Konsultasi Rute Langsung"}
              </span>

              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal leading-tight">
                {ctaData.title}
              </h2>

              <p className="text-sm sm:text-base text-white/90 leading-relaxed max-w-xl mx-auto">
                {ctaData.subtitle}
              </p>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => handleWhatsAppClick("Konsultasi Profil Gede")}
                  className={`inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl font-medium text-sm transition-all cursor-pointer ${getButtonVariantClasses(
                    ctaData.buttonVariant,
                    "sunset-amber-solid"
                  )}`}
                >
                  <MessageCircle className="w-4.5 h-4.5" />
                  <span>{ctaData.buttonText}</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
