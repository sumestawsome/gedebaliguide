"use client";

import React, { useState, useEffect } from "react";
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
  Loader2,
} from "lucide-react";
import {
  AboutPageContent,
  BilingualAboutPageContent,
  ButtonVariant,
  StatItem,
  PillarItem,
  TrustItem,
  MediaSectionData,
} from "@/types";
import {
  defaultAboutPageContent,
  defaultAboutPageContentEn,
  defaultBilingualAboutPageContent,
} from "@/lib/services/about-service";
import {
  useAdminContext,
  EditableText,
  EditableButton,
  EditableMediaSection,
  AdminSaveBar,
} from "@/components/admin";
import { toast } from "sonner";

export default function AdminAboutInlineEditorPage() {
  const {
    lang,
    hasUnsavedChanges,
    setHasUnsavedChanges,
    isSaving,
    setIsSaving,
    lastSavedTime,
    setLastSavedTime,
  } = useAdminContext();

  const [bilingual, setBilingual] = useState<BilingualAboutPageContent>(
    defaultBilingualAboutPageContent
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Ambil data dwibahasa dari Cloud Firestore
  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const res = await fetch("/api/admin/about", { cache: "no-store" });
        const json = await res.json();
        if (json.success && json.data) {
          const loaded: BilingualAboutPageContent = {
            id: json.data.id || defaultAboutPageContent,
            en: json.data.en || defaultAboutPageContentEn,
            ctaPrimaryVariant: json.data.ctaPrimaryVariant,
            ctaSecondaryVariant: json.data.ctaSecondaryVariant,
            buttonVariant: json.data.buttonVariant,
            heroMedia: json.data.heroMedia || json.data.id?.hero?.media,
            storyMedia: json.data.storyMedia || json.data.id?.story?.media,
            updatedAt: json.data.updatedAt,
          };
          setBilingual(loaded);
          if (json.data.updatedAt) {
            setLastSavedTime(new Date(json.data.updatedAt).toLocaleTimeString("id-ID"));
          }
        }
      } catch (err) {
        console.error("Gagal memuat data dwibahasa Firestore:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [setLastSavedTime]);

  // Konten aktif berdasarkan toggle bahasa global di AdminNavbar
  const activeContent: AboutPageContent = bilingual[lang] || defaultAboutPageContent;

  // Fungsi pembaruan data teks spesifik bahasa aktif (Lokal)
  const updateActiveContent = (updater: (prev: AboutPageContent) => AboutPageContent) => {
    setBilingual((prev) => ({
      ...prev,
      [lang]: updater(prev[lang] || defaultAboutPageContent),
    }));
    setHasUnsavedChanges(true);
  };

  // Fungsi pembaruan varian gaya tombol secara GLOBAL (sinkron 100% untuk ID & EN)
  const updateButtonVariantGlobal = (
    buttonKey: "heroPrimary" | "heroSecondary" | "ctaBanner",
    newVariant: ButtonVariant
  ) => {
    setBilingual((prev) => {
      const nextId = {
        ...prev.id,
        hero: {
          ...prev.id.hero,
          ...(buttonKey === "heroPrimary" ? { ctaPrimaryVariant: newVariant } : {}),
          ...(buttonKey === "heroSecondary" ? { ctaSecondaryVariant: newVariant } : {}),
        },
        cta: {
          ...prev.id.cta,
          ...(buttonKey === "ctaBanner" ? { buttonVariant: newVariant } : {}),
        },
      };

      const nextEn = {
        ...prev.en,
        hero: {
          ...prev.en.hero,
          ...(buttonKey === "heroPrimary" ? { ctaPrimaryVariant: newVariant } : {}),
          ...(buttonKey === "heroSecondary" ? { ctaSecondaryVariant: newVariant } : {}),
        },
        cta: {
          ...prev.en.cta,
          ...(buttonKey === "ctaBanner" ? { buttonVariant: newVariant } : {}),
        },
      };

      return {
        ...prev,
        id: nextId,
        en: nextEn,
        ctaPrimaryVariant:
          buttonKey === "heroPrimary"
            ? newVariant
            : prev.ctaPrimaryVariant || prev.id.hero.ctaPrimaryVariant,
        ctaSecondaryVariant:
          buttonKey === "heroSecondary"
            ? newVariant
            : prev.ctaSecondaryVariant || prev.id.hero.ctaSecondaryVariant,
        buttonVariant:
          buttonKey === "ctaBanner"
            ? newVariant
            : prev.buttonVariant || prev.id.cta.buttonVariant,
      };
    });
    setHasUnsavedChanges(true);
  };

  // Fungsi pembaruan media Hero & Cerita secara GLOBAL (sinkron untuk ID & EN)
  const updateHeroMediaGlobal = (updatedMedia: MediaSectionData) => {
    setBilingual((prev) => {
      const nextId = {
        ...prev.id,
        hero: {
          ...prev.id.hero,
          media: updatedMedia,
          profileImage: {
            url: updatedMedia.images[0]?.url || prev.id.hero.profileImage.url,
            alt: updatedMedia.images[0]?.alt || prev.id.hero.profileImage.alt,
            publicId: updatedMedia.images[0]?.publicId || prev.id.hero.profileImage.publicId,
          },
          imageCaption: updatedMedia.caption || prev.id.hero.imageCaption,
        },
      };

      const nextEn = {
        ...prev.en,
        hero: {
          ...prev.en.hero,
          media: updatedMedia,
          profileImage: {
            url: updatedMedia.images[0]?.url || prev.en.hero.profileImage.url,
            alt: updatedMedia.images[0]?.alt || prev.en.hero.profileImage.alt,
            publicId: updatedMedia.images[0]?.publicId || prev.en.hero.profileImage.publicId,
          },
          imageCaption: updatedMedia.caption || prev.en.hero.imageCaption,
        },
      };

      return {
        ...prev,
        id: nextId,
        en: nextEn,
        heroMedia: updatedMedia,
      };
    });
    setHasUnsavedChanges(true);
  };

  const updateStoryMediaGlobal = (updatedMedia: MediaSectionData) => {
    setBilingual((prev) => {
      const nextId = {
        ...prev.id,
        story: {
          ...prev.id.story,
          media: updatedMedia,
          storyImage: {
            url: updatedMedia.images[0]?.url || prev.id.story.storyImage.url,
            alt: updatedMedia.images[0]?.alt || prev.id.story.storyImage.alt,
            publicId: updatedMedia.images[0]?.publicId || prev.id.story.storyImage.publicId,
          },
        },
      };

      const nextEn = {
        ...prev.en,
        story: {
          ...prev.en.story,
          media: updatedMedia,
          storyImage: {
            url: updatedMedia.images[0]?.url || prev.en.story.storyImage.url,
            alt: updatedMedia.images[0]?.alt || prev.en.story.storyImage.alt,
            publicId: updatedMedia.images[0]?.publicId || prev.en.story.storyImage.publicId,
          },
        },
      };

      return {
        ...prev,
        id: nextId,
        en: nextEn,
        storyMedia: updatedMedia,
      };
    });
    setHasUnsavedChanges(true);
  };

  // Simpan data dwibahasa dan varian gaya global ke Cloud Firestore
  const handleSaveToFirestore = async () => {
    setIsSaving(true);

    const ctaPrimaryVariant =
      bilingual.ctaPrimaryVariant ||
      bilingual.id?.hero?.ctaPrimaryVariant ||
      bilingual.en?.hero?.ctaPrimaryVariant ||
      "ocean-blue-solid";

    const ctaSecondaryVariant =
      bilingual.ctaSecondaryVariant ||
      bilingual.id?.hero?.ctaSecondaryVariant ||
      bilingual.en?.hero?.ctaSecondaryVariant ||
      "neutral-outline";

    const buttonVariant =
      bilingual.buttonVariant ||
      bilingual.id?.cta?.buttonVariant ||
      bilingual.en?.cta?.buttonVariant ||
      "sunset-amber-solid";

    const heroMedia =
      bilingual.heroMedia ||
      bilingual.id?.hero?.media ||
      defaultAboutPageContent.hero.media;

    const storyMedia =
      bilingual.storyMedia ||
      bilingual.id?.story?.media ||
      defaultAboutPageContent.story.media;

    const savePromise = (async () => {
      const res = await fetch("/api/admin/about", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: bilingual.id,
          en: bilingual.en,
          ctaPrimaryVariant,
          ctaSecondaryVariant,
          buttonVariant,
          heroMedia,
          storyMedia,
        }),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error || "Gagal menyimpan ke Cloud Firestore.");
      }

      const now = new Date().toLocaleTimeString("id-ID");
      setLastSavedTime(now);
      setHasUnsavedChanges(false);

      if (json.data) {
        setBilingual(json.data);
      }

      return json;
    })();

    toast.promise(savePromise, {
      loading: "Menyimpan perubahan ke Firestore...",
      success: "Perubahan berhasil disimpan!",
      error: (err: any) =>
        err?.message || "Terjadi kendala saat menyimpan perubahan ke server.",
    });

    try {
      await savePromise;
    } catch (err: any) {
      console.error("Error saving to Firestore:", err);
    } finally {
      setIsSaving(false);
    }
  };

  // Dynamic icon mapper untuk Lucide icons (identik dengan AboutPageClient)
  const renderIcon = (iconName: string, className = "w-6 h-6 text-[#0C8C5E]") => {
    switch ((iconName || "").toLowerCase()) {
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
      case "heart":
        return <Heart className={className} />;
      case "car":
        return <Car className={className} />;
      case "sparkles":
      default:
        return <Sparkles className={className} />;
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#FEFDFB] text-[#08090A] font-sans selection:bg-[#EBF5FB] selection:text-[#1878B8]">
      <main className="flex-1 pb-28 sm:pb-32 w-full max-w-full overflow-x-hidden">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <Loader2 className="w-8 h-8 text-[#1878B8] animate-spin mb-3" />
            <p className="text-sm font-semibold text-[#08090A]">
              Menghubungkan ke Cloud Firestore...
            </p>
            <p className="text-xs text-[#5E6965] mt-1">settings/about_page</p>
          </div>
        ) : (
          <>
            {/* ========================================================
                BREADCRUMB RINGKAS (Mobile & Desktop - 100% IDENTIK PUBLIK)
                ======================================================== */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
              {/* Mobile Back Button (< 768px) */}
              <div className="md:hidden">
                <Link
                  href="/"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5E6965] hover:text-[#1878B8] py-1 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>{lang === "en" ? "Back to Home" : "Kembali ke Beranda"}</span>
                </Link>
              </div>

              {/* Desktop Breadcrumb (>= 768px) */}
              <nav aria-label="Breadcrumb" className="hidden md:flex items-center gap-2 text-xs font-medium text-[#5E6965]">
                <Link href="/" className="hover:text-[#1878B8] transition-colors">
                  {lang === "en" ? "Home" : "Beranda"}
                </Link>
                <ChevronRight className="w-3.5 h-3.5 text-[#CFCDCA]" />
                <span className="text-[#08090A] font-semibold">
                  {lang === "en" ? "About Gede" : "Tentang Gede"}
                </span>
              </nav>
            </div>

            {/* ========================================================
                SEKSI 1: HERO PORTRAIT & SAPAAN (100% IDENTIK DENGAN PUBLIK)
                ======================================================== */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-16 lg:pb-24">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                {/* Kolom Kiri: Teks Profil Editorial & Statistik */}
                <div className="lg:col-span-7 space-y-6 sm:space-y-8">
                  {/* Aksen Teks Editorial Bersih Tanpa Shape */}
                  <div className="mb-2">
                    <span className="font-serif italic text-base sm:text-lg text-[#1878B8] font-normal tracking-wide">
                      “
                      <EditableText
                        value={activeContent.hero.badge}
                        onChange={(val) =>
                          updateActiveContent((prev) => ({
                            ...prev,
                            hero: { ...prev.hero, badge: val },
                          }))
                        }
                        placeholder="Badge Hero..."
                      />
                      ”
                    </span>
                  </div>

                  {/* Headline Utama (Libre Baskerville) */}
                  <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#08090A] leading-[1.2] tracking-tight">
                    <EditableText
                      value={activeContent.hero.title}
                      onChange={(val) =>
                        updateActiveContent((prev) => ({
                          ...prev,
                          hero: { ...prev.hero, title: val },
                        }))
                      }
                      placeholder="Judul Utama Halaman..."
                      multiline
                    />
                  </h1>

                  {/* Paragraf Pengantar yang Personal & Ramah */}
                  <p className="text-base sm:text-lg text-[#37413C] leading-relaxed">
                    <EditableText
                      value={activeContent.hero.introText}
                      onChange={(val) =>
                        updateActiveContent((prev) => ({
                          ...prev,
                          hero: { ...prev.hero, introText: val },
                        }))
                      }
                      placeholder="Paragraf sapaan pembuka..."
                      multiline
                    />
                  </p>

                  {/* Baris Statistik Minimalis (bg-[#FAF8F5] border border-[#EBE9E6]/70) */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-2 pb-2">
                    {activeContent.hero.stats.map((stat, idx) => (
                      <div
                        key={stat.id || idx}
                        className="p-3.5 sm:p-4 rounded-2xl bg-[#FAF8F5] border border-[#EBE9E6]/70 transition-transform duration-200 hover:-translate-y-0.5"
                      >
                        <div className="text-2xl sm:text-3xl font-bold text-[#E67E22] tracking-tight">
                          <EditableText
                            value={stat.value}
                            onChange={(val) =>
                              updateActiveContent((prev) => {
                                const newStats = [...prev.hero.stats];
                                newStats[idx] = { ...newStats[idx], value: val };
                                return {
                                  ...prev,
                                  hero: { ...prev.hero, stats: newStats },
                                };
                              })
                            }
                            placeholder="10+..."
                          />
                        </div>
                        <div className="text-xs sm:text-sm text-[#5E6965] font-medium mt-1 leading-snug">
                          <EditableText
                            value={stat.label}
                            onChange={(val) =>
                              updateActiveContent((prev) => {
                                const newStats = [...prev.hero.stats];
                                newStats[idx] = { ...newStats[idx], label: val };
                                return {
                                  ...prev,
                                  hero: { ...prev.hero, stats: newStats },
                                };
                              })
                            }
                            placeholder="Label statistik..."
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tombol CTA Hero (Dinamis EditableButton dengan Pemilih Varian) */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                    <EditableButton
                      value={
                        activeContent.hero.ctaPrimary ||
                        (lang === "en" ? "Consult with Bli Gede" : "Konsultasi Bersama Gede")
                      }
                      onChange={(val) =>
                        updateActiveContent((prev) => ({
                          ...prev,
                          hero: { ...prev.hero, ctaPrimary: val },
                        }))
                      }
                      variant={
                        bilingual.ctaPrimaryVariant ||
                        activeContent.hero.ctaPrimaryVariant ||
                        "ocean-blue-solid"
                      }
                      onVariantChange={(newVariant) =>
                        updateButtonVariantGlobal("heroPrimary", newVariant)
                      }
                      defaultVariant="ocean-blue-solid"
                      icon={<MessageCircle className="w-4.5 h-4.5" />}
                      placeholder={lang === "en" ? "Consult with Bli Gede..." : "Konsultasi Bersama Gede..."}
                      label="Tombol CTA Utama Hero (Pilihan warna tersinkronisasi global untuk ID & EN)"
                    />
                    <EditableButton
                      value={
                        activeContent.hero.ctaSecondary ||
                        (lang === "en" ? "Explore Tour Packages" : "Lihat Pilihan Tur")
                      }
                      onChange={(val) =>
                        updateActiveContent((prev) => ({
                          ...prev,
                          hero: { ...prev.hero, ctaSecondary: val },
                        }))
                      }
                      variant={
                        bilingual.ctaSecondaryVariant ||
                        activeContent.hero.ctaSecondaryVariant ||
                        "neutral-outline"
                      }
                      onVariantChange={(newVariant) =>
                        updateButtonVariantGlobal("heroSecondary", newVariant)
                      }
                      defaultVariant="neutral-outline"
                      rightIcon={<ChevronRight className="w-4 h-4" />}
                      placeholder={lang === "en" ? "Explore Tour Packages..." : "Lihat Pilihan Tur..."}
                      label="Tombol CTA Sekunder Hero (Pilihan warna tersinkronisasi global untuk ID & EN)"
                    />
                  </div>
                </div>

                {/* Kolom Kanan: Media Dinamis (Single / Multi Template) Bli Gede */}
                <div className="lg:col-span-5">
                  <EditableMediaSection
                    media={
                      activeContent.hero.media ||
                      bilingual.heroMedia ||
                      defaultAboutPageContent.hero.media!
                    }
                    onChange={updateHeroMediaGlobal}
                    aspectRatio="aspect-[4/5]"
                    priority
                    label="Atur Media & Layout Hero"
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
                        “
                        <EditableText
                          value={activeContent.story.sectionTag}
                          onChange={(val) =>
                            updateActiveContent((prev) => ({
                              ...prev,
                              story: { ...prev.story, sectionTag: val },
                            }))
                          }
                          placeholder="Tag seksi cerita..."
                        />
                        ”
                      </span>
                      <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#08090A] leading-tight">
                        <EditableText
                          value={activeContent.story.title}
                          onChange={(val) =>
                            updateActiveContent((prev) => ({
                              ...prev,
                              story: { ...prev.story, title: val },
                            }))
                          }
                          placeholder="Judul Seksi Kisah..."
                          multiline
                        />
                      </h2>
                    </div>

                    {/* Looping Narasi Paragraf */}
                    <div className="space-y-4 text-base sm:text-lg text-[#37413C] leading-relaxed">
                      {activeContent.story.paragraphs.map((paragraph, idx) => (
                        <p key={idx}>
                          <EditableText
                            value={paragraph}
                            onChange={(val) =>
                              updateActiveContent((prev) => {
                                const newP = [...prev.story.paragraphs];
                                newP[idx] = val;
                                return {
                                  ...prev,
                                  story: { ...prev.story, paragraphs: newP },
                                };
                              })
                            }
                            placeholder={`Paragraf kisah ke-${idx + 1}...`}
                            multiline
                          />
                        </p>
                      ))}
                    </div>

                    {/* Pull-Quote Elegan dengan Aksen Hijau Bali Green */}
                    <div className="border-l-4 border-[#0C8C5E] pl-6 py-3 bg-[#E8F6F0]/50 rounded-r-2xl">
                      <p className="font-serif italic text-lg sm:text-xl text-[#08090A] leading-snug">
                        &ldquo;
                        <EditableText
                          value={activeContent.story.quote}
                          onChange={(val) =>
                            updateActiveContent((prev) => ({
                              ...prev,
                              story: { ...prev.story, quote: val },
                            }))
                          }
                          placeholder="Kutipan personal..."
                          multiline
                        />
                        &rdquo;
                      </p>
                      <span className="block mt-2 text-xs sm:text-sm font-semibold text-[#0C8C5E]">
                        —{" "}
                        <EditableText
                          value={activeContent.story.quoteAuthor}
                          onChange={(val) =>
                            updateActiveContent((prev) => ({
                              ...prev,
                              story: { ...prev.story, quoteAuthor: val },
                            }))
                          }
                          placeholder="Nama pembuat kutipan..."
                        />
                      </span>
                    </div>
                  </div>

                  {/* Kolom Visual: Media Dinamis (Single / Multi Template) Suasana Cerita */}
                  <div className="lg:col-span-5 order-1 lg:order-2">
                    <EditableMediaSection
                      media={
                        activeContent.story.media ||
                        bilingual.storyMedia ||
                        defaultAboutPageContent.story.media!
                      }
                      onChange={updateStoryMediaGlobal}
                      aspectRatio="aspect-[4/5]"
                      label="Atur Media & Layout Cerita"
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
                    “
                    <EditableText
                      value={activeContent.guidingStyle.sectionTag}
                      onChange={(val) =>
                        updateActiveContent((prev) => ({
                          ...prev,
                          guidingStyle: { ...prev.guidingStyle, sectionTag: val },
                        }))
                      }
                      placeholder="Tag seksi pilar..."
                    />
                    ”
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#08090A] leading-tight mb-3">
                    <EditableText
                      value={activeContent.guidingStyle.title}
                      onChange={(val) =>
                        updateActiveContent((prev) => ({
                          ...prev,
                          guidingStyle: { ...prev.guidingStyle, title: val },
                        }))
                      }
                      placeholder="Judul Gaya Memandu..."
                    />
                  </h2>
                  <p className="text-sm sm:text-base text-[#5E6965] leading-relaxed font-sans">
                    <EditableText
                      value={activeContent.guidingStyle.subtitle}
                      onChange={(val) =>
                        updateActiveContent((prev) => ({
                          ...prev,
                          guidingStyle: { ...prev.guidingStyle, subtitle: val },
                        }))
                      }
                      placeholder="Subjudul pilar..."
                      multiline
                    />
                  </p>
                </div>

                {/* 3 Esai Singkat dengan Tata Letak Editorial Lega (Pola Ritme 3 Warna) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                  {activeContent.guidingStyle.pillars.map((pillar, idx) => {
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
                    // Kartu kedua ("Kisah Budaya yang Hidup") memiliki aksen garis tepi hijau zamrud (Emerald border)
                    const borderClass =
                      idx === 1
                        ? "border-[#0C8C5E]/40 hover:border-[#0C8C5E] shadow-sm"
                        : idx === 0
                          ? "border-[#EBE9E6] hover:border-[#1878B8]"
                          : "border-[#EBE9E6] hover:border-[#E67E22]";

                    return (
                      <div
                        key={pillar.id || idx}
                        className={`group relative p-6 sm:p-8 rounded-2xl bg-white border shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between ${borderClass}`}
                      >
                        <div className="space-y-4">
                          {/* Icon Header */}
                          <div
                            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 ${iconBoxBg}`}
                          >
                            {renderIcon(pillar.icon, iconColor)}
                          </div>

                          <h3 className="font-serif text-xl font-bold text-[#08090A] leading-snug">
                            <EditableText
                              value={pillar.title}
                              onChange={(val) =>
                                updateActiveContent((prev) => {
                                  const newPillars = [...prev.guidingStyle.pillars];
                                  newPillars[idx] = { ...newPillars[idx], title: val };
                                  return {
                                    ...prev,
                                    guidingStyle: { ...prev.guidingStyle, pillars: newPillars },
                                  };
                                })
                              }
                              placeholder="Judul pilar..."
                            />
                          </h3>

                          <p className="text-sm sm:text-base text-[#5E6965] leading-relaxed">
                            <EditableText
                              value={pillar.description}
                              onChange={(val) =>
                                updateActiveContent((prev) => {
                                  const newPillars = [...prev.guidingStyle.pillars];
                                  newPillars[idx] = { ...newPillars[idx], description: val };
                                  return {
                                    ...prev,
                                    guidingStyle: { ...prev.guidingStyle, pillars: newPillars },
                                  };
                                })
                              }
                              placeholder="Deskripsi pilar..."
                              multiline
                            />
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
                  {activeContent.trustStrip.map((item, idx) => {
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
                        key={item.id || idx}
                        className="flex items-start gap-4 p-5 sm:p-6 rounded-2xl bg-[#FEFDFB] border border-[#EBE9E6]/80 shadow-xs"
                      >
                        <div className={`p-2.5 rounded-xl shrink-0 ${iconBoxBg}`}>
                          {renderIcon(item.icon, iconColor)}
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-bold text-sm sm:text-base text-[#08090A]">
                            <EditableText
                              value={item.title}
                              onChange={(val) =>
                                updateActiveContent((prev) => {
                                  const newTrust = [...prev.trustStrip];
                                  newTrust[idx] = { ...newTrust[idx], title: val };
                                  return { ...prev, trustStrip: newTrust };
                                })
                              }
                              placeholder="Judul trust..."
                            />
                          </h4>
                          <p className="text-xs sm:text-sm text-[#5E6965] leading-relaxed">
                            <EditableText
                              value={item.description}
                              onChange={(val) =>
                                updateActiveContent((prev) => {
                                  const newTrust = [...prev.trustStrip];
                                  newTrust[idx] = { ...newTrust[idx], description: val };
                                  return { ...prev, trustStrip: newTrust };
                                })
                              }
                              placeholder="Deskripsi trust..."
                              multiline
                            />
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
                    {lang === "en" ? "Direct Local Consultation" : "Konsultasi Rute Langsung"}
                  </span>

                  <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal leading-tight">
                    <EditableText
                      value={activeContent.cta.title}
                      onChange={(val) =>
                        updateActiveContent((prev) => ({
                          ...prev,
                          cta: { ...prev.cta, title: val },
                        }))
                      }
                      placeholder="Judul banner CTA..."
                      multiline
                    />
                  </h2>

                  <p className="text-sm sm:text-base text-white/90 leading-relaxed max-w-xl mx-auto">
                    <EditableText
                      value={activeContent.cta.subtitle}
                      onChange={(val) =>
                        updateActiveContent((prev) => ({
                          ...prev,
                          cta: { ...prev.cta, subtitle: val },
                        }))
                      }
                      placeholder="Subjudul banner CTA..."
                      multiline
                    />
                  </p>

                  <div className="pt-4">
                    <EditableButton
                      value={
                        activeContent.cta.buttonText ||
                        (lang === "en" ? "Chat with Bli Gede on WhatsApp" : "Kirim Pesan ke Bli Gede")
                      }
                      onChange={(val) =>
                        updateActiveContent((prev) => ({
                          ...prev,
                          cta: { ...prev.cta, buttonText: val },
                        }))
                      }
                      variant={
                        bilingual.buttonVariant ||
                        activeContent.cta.buttonVariant ||
                        "sunset-amber-solid"
                      }
                      onVariantChange={(newVariant) =>
                        updateButtonVariantGlobal("ctaBanner", newVariant)
                      }
                      defaultVariant="sunset-amber-solid"
                      icon={<MessageCircle className="w-4.5 h-4.5" />}
                      placeholder="Teks tombol WhatsApp..."
                      label="Tombol Banner CTA (Pilihan warna tersinkronisasi global untuk ID & EN)"
                    />
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      {/* Floating Save Action Bar */}
      <AdminSaveBar
        isSaving={isSaving}
        hasUnsavedChanges={hasUnsavedChanges}
        lastSavedTime={lastSavedTime}
        onSave={handleSaveToFirestore}
        lang={lang}
      />
    </div>
  );
}
