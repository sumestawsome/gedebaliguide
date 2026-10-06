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
import { AboutPageContent } from "@/types";
import { handleWhatsAppClick } from "@/lib/lead-tracker";

interface AboutPageClientProps {
  initialContent: AboutPageContent;
}

export default function AboutPageClient({ initialContent }: AboutPageClientProps) {
  const [lang, setLang] = useState<"id" | "en">("id");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("app_lang");
      if (saved === "id" || saved === "en") setLang(saved);
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
      badge: "INDEPENDENT LOCAL BALINESE GUIDE",
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

  // Data resolution with live Firestore primary and bilingual fallback
  const heroData = {
    badge: isEn ? contentEn.hero.badge : initialContent.hero.badge,
    title: isEn ? contentEn.hero.title : initialContent.hero.title,
    introText: isEn ? contentEn.hero.introText : initialContent.hero.introText,
    profileImage: initialContent.hero.profileImage,
    imageCaption: isEn ? contentEn.hero.imageCaption : initialContent.hero.imageCaption,
    stats: isEn ? contentEn.hero.stats : initialContent.hero.stats,
    ctaPrimary: isEn ? contentEn.hero.ctaPrimary : "Konsultasi Bersama Gede",
    ctaSecondary: isEn ? contentEn.hero.ctaSecondary : "Lihat Pilihan Tur",
  };

  const storyData = {
    sectionTag: isEn ? contentEn.story.sectionTag : initialContent.story.sectionTag,
    title: isEn ? contentEn.story.title : initialContent.story.title,
    paragraphs: isEn ? contentEn.story.paragraphs : initialContent.story.paragraphs,
    quote: isEn ? contentEn.story.quote : initialContent.story.quote,
    quoteAuthor: isEn ? contentEn.story.quoteAuthor : initialContent.story.quoteAuthor,
    storyImage: initialContent.story.storyImage,
  };

  const guidingStyleData = {
    sectionTag: isEn ? contentEn.guidingStyle.sectionTag : initialContent.guidingStyle.sectionTag,
    title: isEn ? contentEn.guidingStyle.title : initialContent.guidingStyle.title,
    subtitle: isEn ? contentEn.guidingStyle.subtitle : initialContent.guidingStyle.subtitle,
    pillars: isEn ? contentEn.guidingStyle.pillars : initialContent.guidingStyle.pillars,
  };

  const trustStripData = isEn ? contentEn.trustStrip : initialContent.trustStrip;

  const ctaData = {
    title: isEn ? contentEn.cta.title : initialContent.cta.title,
    subtitle: isEn ? contentEn.cta.subtitle : initialContent.cta.subtitle,
    buttonText: isEn ? contentEn.cta.buttonText : initialContent.cta.buttonText,
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#FEFDFB] text-[#08090A] font-sans selection:bg-amber-100 selection:text-amber-900">
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
              {/* Badge Tipis */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#E8F6F0] text-[#0C8C5E] border border-[#0C8C5E]/20">
                <span className="w-2 h-2 rounded-full bg-[#0C8C5E] animate-pulse" />
                <span>{heroData.badge}</span>
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

              {/* Tombol CTA */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => handleWhatsAppClick("Konsultasi Profil Gede")}
                  className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#E67E22] hover:bg-[#D35400] text-white font-semibold text-base shadow-[0_4px_14px_rgba(230,126,34,0.28)] transition-all cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>{heroData.ctaPrimary}</span>
                </button>
                <Link
                  href="/tours"
                  className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-[#EBE9E6] text-[#08090A] hover:text-[#1878B8] hover:bg-[#EBF5FB] font-semibold text-base transition-colors"
                >
                  <span>{heroData.ctaSecondary}</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Kolom Kanan: Kartu Foto Bli Gede (rounded-3xl) & Caption Bersahaja */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Decorative Soft Accent Backdrop */}
                <div className="absolute -inset-2 rounded-[32px] bg-gradient-to-tr from-[#0C8C5E]/15 to-[#E67E22]/15 blur-xl -z-10" />

                <div className="overflow-hidden rounded-3xl bg-white border border-[#EBE9E6] shadow-xl shadow-stone-200/50">
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-stone-100">
                    <Image
                      src={heroData.profileImage.url}
                      alt={heroData.profileImage.alt}
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 500px"
                      className="object-cover object-center transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="p-4 sm:p-5 bg-white border-t border-[#EBE9E6]/60">
                    <p className="text-xs sm:text-sm text-[#5E6965] italic leading-relaxed text-center">
                      &ldquo;{heroData.imageCaption}&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            SEKSI 2: KISAH DI BALIK KEMUDI (THE STORY)
            ======================================================== */}
        <section className="bg-[#FAF8F5] border-y border-[#EBE9E6] py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Kolom Teks: Narasi Mengalir & Pull Quote */}
              <div className="lg:col-span-7 space-y-6 sm:space-y-8 order-2 lg:order-1">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1878B8]">
                    {storyData.sectionTag}
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#08090A] mt-2 leading-tight">
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

              {/* Kolom Visual: Foto Suasana Budaya & Pura Bali */}
              <div className="lg:col-span-5 order-1 lg:order-2">
                <div className="relative rounded-3xl overflow-hidden border border-[#EBE9E6] shadow-xl aspect-[4/5] bg-stone-100">
                  <Image
                    src={storyData.storyImage.url}
                    alt={storyData.storyImage.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 450px"
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-6">
                    <span className="text-white text-xs sm:text-sm font-medium drop-shadow-sm">
                      {storyData.storyImage.alt}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            SEKSI 3: BAGAIMANA HARI ANDA BERJALAN BERSAMA GEDE (THE EXPERIENCE)
            ======================================================== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-12 sm:mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1878B8]">
              {guidingStyleData.sectionTag}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#08090A] leading-tight">
              {guidingStyleData.title}
            </h2>
            <p className="text-sm sm:text-base text-[#5E6965] leading-relaxed">
              {guidingStyleData.subtitle}
            </p>
          </div>

          {/* 3 Esai Singkat dengan Tata Letak Editorial Lega */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {guidingStyleData.pillars.map((pillar, idx) => (
              <div
                key={pillar.id}
                className="group relative p-6 sm:p-8 rounded-2xl bg-white border border-[#EBE9E6] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Icon Header */}
                  <div className="w-12 h-12 rounded-xl bg-[#E8F6F0] flex items-center justify-center transition-transform group-hover:scale-105">
                    {renderIcon(pillar.icon)}
                  </div>

                  <span className="text-xs font-mono font-semibold text-[#5E6965]">
                    0{idx + 1}
                  </span>

                  <h3 className="font-serif text-xl font-bold text-[#08090A] leading-snug">
                    {pillar.title}
                  </h3>

                  <p className="text-sm sm:text-base text-[#5E6965] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================
            SEKSI 4: STANDAR KENYAMANAN & KEPASTIAN (SUBTLE TRUST STRIP)
            ======================================================== */}
        <section className="bg-[#FAF8F5] border-t border-[#EBE9E6] py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {trustStripData.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-4 p-5 sm:p-6 rounded-2xl bg-white border border-[#EBE9E6]/80 shadow-xs"
                >
                  <div className="p-2.5 rounded-xl bg-[#E8F6F0] shrink-0">
                    {renderIcon(item.icon, "w-5 h-5 text-[#0C8C5E]")}
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
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================
            SEKSI 5: BOTTOM CTA BANNER
            ======================================================== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0C8C5E] to-[#006B49] text-white p-8 sm:p-12 lg:p-16 text-center shadow-xl shadow-[#0C8C5E]/20">
            {/* Soft decorative background circles */}
            <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full bg-amber-400/15 blur-2xl pointer-events-none" />

            <div className="relative max-w-2xl mx-auto space-y-4">
              <span className="inline-block px-3 py-1 rounded-full bg-white/15 text-xs font-semibold tracking-wider uppercase text-amber-200 border border-white/20">
                {isEn ? "Direct Local Consultation" : "Konsultasi Rute Langsung"}
              </span>

              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
                {ctaData.title}
              </h2>

              <p className="text-sm sm:text-base text-emerald-50 leading-relaxed max-w-xl mx-auto">
                {ctaData.subtitle}
              </p>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => handleWhatsAppClick("Konsultasi Profil Gede")}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[#E67E22] hover:bg-[#D35400] text-white font-semibold text-base shadow-[0_4px_16px_rgba(230,126,34,0.35)] transition-all transform hover:scale-[1.02] cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5" />
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
