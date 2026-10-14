"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  MapPin,
  Clock,
  Car,
  ShieldCheck,
  Star,
  ChevronDown,
  Info,
  ExternalLink,
  Loader2,
} from "lucide-react";
import {
  HomePageContent,
  BilingualHomePageContent,
  ButtonVariant,
  MediaSectionData,
  Tour,
  Review,
  FAQItem,
} from "@/types";
import {
  defaultHomePageContent,
  defaultHomePageContentEn,
  defaultBilingualHomePageContent,
  defaultHeroMedia,
} from "@/lib/services/home-service";
import {
  useAdminContext,
  EditableText,
  EditableButton,
  EditableMediaSection,
  AdminSaveBar,
} from "@/components/admin";
import ReviewCard from "@/components/reviews/ReviewCard";
import { mockPopularDestinations, mockAllTours } from "@/data/mock-data";
import { getActiveFeaturedTours } from "@/lib/services/tour-service";
import { getFeaturedFiveStarReviews } from "@/lib/services/review-service";
import { getActiveFaqs } from "@/lib/services/faq-service";
import { toast } from "sonner";

export default function AdminHomeInlineEditorPage() {
  const {
    lang,
    hasUnsavedChanges,
    setHasUnsavedChanges,
    isSaving,
    setIsSaving,
    lastSavedTime,
    setLastSavedTime,
  } = useAdminContext();

  const [bilingual, setBilingual] = useState<BilingualHomePageContent>(
    defaultBilingualHomePageContent
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Live preview data dari katalog Firestore
  const [firestoreTours, setFirestoreTours] = useState<Tour[] | null>(null);
  const [firestoreReviews, setFirestoreReviews] = useState<Review[] | null>(null);
  const [firestoreFaqs, setFirestoreFaqs] = useState<FAQItem[] | null>(null);

  // Ambil data beranda dwibahasa dari Cloud Firestore
  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const res = await fetch("/api/admin/home", { cache: "no-store" });
        const json = await res.json();
        if (json.success && json.data) {
          const loaded: BilingualHomePageContent = {
            id: json.data.id || defaultHomePageContent,
            en: json.data.en || defaultHomePageContentEn,
            ctaPrimaryVariant: json.data.ctaPrimaryVariant || "ocean-blue-solid",
            ctaSecondaryVariant: json.data.ctaSecondaryVariant || "neutral-outline",
            ctaBannerVariant: json.data.ctaBannerVariant || "sunset-amber-solid",
            heroMedia: json.data.heroMedia || json.data.id?.hero?.media || defaultHeroMedia,
            updatedAt: json.data.updatedAt,
          };
          setBilingual(loaded);
          if (json.data.updatedAt) {
            setLastSavedTime(new Date(json.data.updatedAt).toLocaleTimeString("id-ID"));
          }
        }
      } catch (err) {
        console.error("Gagal memuat data dwibahasa Beranda dari Firestore:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [setLastSavedTime]);

  // Ambil data pendukung katalog live untuk pratinjau kartu tur, ulasan, & FAQ
  useEffect(() => {
    let isMounted = true;
    async function loadCatalogData() {
      try {
        const [tours, reviews, faqs] = await Promise.all([
          getActiveFeaturedTours(3),
          getFeaturedFiveStarReviews(3),
          getActiveFaqs(),
        ]);
        if (isMounted) {
          if (tours && tours.length > 0) setFirestoreTours(tours);
          if (reviews && reviews.length > 0) setFirestoreReviews(reviews);
          if (faqs && faqs.length > 0) setFirestoreFaqs(faqs.slice(0, 4));
        }
      } catch (err) {
        console.warn("Katalog live tidak dapat dimuat untuk pratinjau editor:", err);
      }
    }
    loadCatalogData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Konten aktif berdasarkan toggle bahasa global di AdminNavbar
  const activeContent: HomePageContent = bilingual[lang] || defaultHomePageContent;

  // Fungsi pembaruan data teks spesifik bahasa aktif (Lokal)
  const updateActiveContent = (updater: (prev: HomePageContent) => HomePageContent) => {
    setBilingual((prev) => ({
      ...prev,
      [lang]: updater(prev[lang] || defaultHomePageContent),
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
        ctaBannerVariant:
          buttonKey === "ctaBanner"
            ? newVariant
            : prev.ctaBannerVariant || prev.id.cta.buttonVariant,
      };
    });
    setHasUnsavedChanges(true);
  };

  // Fungsi pembaruan media Hero secara GLOBAL (sinkron untuk ID & EN)
  const updateHeroMediaGlobal = (updatedMedia: MediaSectionData) => {
    setBilingual((prev) => {
      const nextId = {
        ...prev.id,
        hero: {
          ...prev.id.hero,
          media: updatedMedia,
        },
      };

      const nextEn = {
        ...prev.en,
        hero: {
          ...prev.en.hero,
          media: updatedMedia,
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

  // Simpan seluruh data dwibahasa ke Cloud Firestore
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

    const ctaBannerVariant =
      bilingual.ctaBannerVariant ||
      bilingual.id?.cta?.buttonVariant ||
      bilingual.en?.cta?.buttonVariant ||
      "sunset-amber-solid";

    const heroMedia =
      bilingual.heroMedia ||
      bilingual.id?.hero?.media ||
      defaultHeroMedia;

    const savePromise = (async () => {
      const res = await fetch("/api/admin/home", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: bilingual.id,
          en: bilingual.en,
          ctaPrimaryVariant,
          ctaSecondaryVariant,
          ctaBannerVariant,
          heroMedia,
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
      loading: "Menyimpan perubahan Beranda ke Firestore...",
      success: "Perubahan Beranda berhasil disimpan!",
      error: (err) => err?.message || "Gagal menyimpan ke Firestore.",
    });

    try {
      await savePromise;
    } catch {
      // Toast error sudah ditangani
    } finally {
      setIsSaving(false);
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-[#1878B8]" />
        <p className="text-sm font-medium text-[#5E6965]">
          Memuat Visual Editor Beranda...
        </p>
      </div>
    );
  }

  const currentHeroMedia =
    bilingual.heroMedia || activeContent.hero.media || defaultHeroMedia;

  return (
    <div className="min-h-screen bg-[var(--canvas)] text-[var(--text-primary)] flex flex-col font-sans selection:bg-[var(--brand-blue-light)] selection:text-[var(--brand-blue)] pb-28">
      {/* Banner Notifikasi Mode Visual Editor */}
      <div className="bg-[#EBF5FB] border-b border-[#1878B8]/20 px-4 py-2 text-center text-xs text-[#0F4C81] flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-[#1878B8] shrink-0" />
        <span>
          <strong>Visual Editor Beranda Aktif ({lang.toUpperCase()})</strong> — Klik langsung pada teks atau tombol untuk mengubah konten. Seluruh perubahan tata letak dan varian warna tersinkronisasi.
        </span>
      </div>

      {/* ========================================================
          SEKSI 1: HERO SECTION
          ======================================================== */}
      <section
        id="beranda"
        className="relative overflow-hidden bg-[var(--canvas)] pt-8 pb-12 sm:pt-12 sm:pb-16 lg:pt-16 lg:pb-20 border-b border-[var(--border)]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Kolom Teks Kiri */}
            <div className="lg:col-span-7 flex flex-col justify-center text-left">
              <div className="mb-4 sm:mb-5">
                <span className="font-serif italic text-base sm:text-lg text-[var(--brand-blue)] font-normal tracking-wide">
                  <EditableText
                    value={activeContent.hero.greeting}
                    onChange={(val) =>
                      updateActiveContent((prev) => ({
                        ...prev,
                        hero: { ...prev.hero, greeting: val },
                      }))
                    }
                    placeholder="Sapaan pembuka..."
                    label="Edit Sapaan Pembuka Hero"
                  />
                </span>
              </div>

              {/* H1 Headline Editorial */}
              <h1 className="font-serif text-3xl sm:text-4xl md:text-[2.75rem] leading-[1.2] tracking-[-0.025em] text-[var(--text-primary)] font-normal mb-5">
                <EditableText
                  value={activeContent.hero.headlineLead}
                  onChange={(val) =>
                    updateActiveContent((prev) => ({
                      ...prev,
                      hero: { ...prev.hero, headlineLead: val },
                    }))
                  }
                  placeholder="Awalan judul..."
                  label="Edit Awalan Judul"
                />
                <span className="text-[var(--brand-blue)] font-semibold underline decoration-[var(--brand-blue)]/25 underline-offset-8">
                  <EditableText
                    value={activeContent.hero.name}
                    onChange={(val) =>
                      updateActiveContent((prev) => ({
                        ...prev,
                        hero: { ...prev.hero, name: val },
                      }))
                    }
                    placeholder="Nama pemandu..."
                    label="Edit Nama Pemandu"
                  />
                </span>
              </h1>

              {/* Deskripsi Hero */}
              <div className="text-[var(--text-muted)] text-base sm:text-[17px] leading-relaxed mb-8 max-w-xl">
                <EditableText
                  value={activeContent.hero.description}
                  onChange={(val) =>
                    updateActiveContent((prev) => ({
                      ...prev,
                      hero: { ...prev.hero, description: val },
                    }))
                  }
                  multiline={true}
                  placeholder="Deskripsi singkat layanan..."
                  label="Edit Deskripsi Hero"
                />
              </div>

              {/* 2 Tombol CTA Berdampingan dengan EditableButton */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4">
                <EditableButton
                  value={activeContent.hero.btnWa}
                  onChange={(newText) =>
                    updateActiveContent((prev) => ({
                      ...prev,
                      hero: { ...prev.hero, btnWa: newText },
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
                  placeholder="Teks Tombol WA..."
                  label="Atur Tombol WhatsApp Hero"
                  icon={
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    </svg>
                  }
                />

                <EditableButton
                  value={activeContent.hero.btnCatalog}
                  onChange={(newText) =>
                    updateActiveContent((prev) => ({
                      ...prev,
                      hero: { ...prev.hero, btnCatalog: newText },
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
                  placeholder="Teks Tombol Katalog..."
                  label="Atur Tombol Katalog Hero"
                  rightIcon={
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  }
                />
              </div>
            </div>

            {/* Kolom Visual Kanan: EditableMediaSection (Default: Stacked Deck Carousel) */}
            <div className="lg:col-span-5 w-full flex flex-col items-center justify-center">
              <EditableMediaSection
                media={currentHeroMedia}
                onChange={updateHeroMediaGlobal}
                aspectRatio="aspect-[4/5]"
                label="Atur Slideshow Foto Hero"
                priority={true}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SEKSI 2: BAR KEPERCAYAAN / TRUST BAR
          ======================================================== */}
      <section
        className="bg-white border-b border-[var(--border)] py-6 px-4 sm:px-6 lg:px-8"
        aria-label="Keunggulan Layanan"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
          {/* Item 1 - Biru Samudra */}
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[var(--brand-blue-light)] text-[var(--brand-blue)] flex items-center justify-center shrink-0">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div>
              <div className="font-bold text-sm text-[var(--text-primary)] leading-tight">
                <EditableText
                  value={activeContent.trustBar[0]?.title || ""}
                  onChange={(val) =>
                    updateActiveContent((prev) => {
                      const updated = [...prev.trustBar];
                      if (updated[0]) updated[0] = { ...updated[0], title: val };
                      return { ...prev, trustBar: updated };
                    })
                  }
                  placeholder="Judul trust..."
                  label="Edit Judul Keunggulan 1"
                />
              </div>
              <div className="text-xs text-[var(--text-muted)] mt-0.5">
                <EditableText
                  value={activeContent.trustBar[0]?.desc || ""}
                  onChange={(val) =>
                    updateActiveContent((prev) => {
                      const updated = [...prev.trustBar];
                      if (updated[0]) updated[0] = { ...updated[0], desc: val };
                      return { ...prev, trustBar: updated };
                    })
                  }
                  placeholder="Keterangan..."
                  label="Edit Keterangan Keunggulan 1"
                />
              </div>
            </div>
          </div>

          {/* Item 2 - Hijau Bali */}
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[var(--brand-green-light)] text-[var(--brand-green)] flex items-center justify-center shrink-0">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="1" y="3" width="15" height="13" />
                <polygon points="16 8 20 8 23 11 23 16 16 8" />
                <circle cx="5.5" cy="18.5" r="2.5" />
                <circle cx="18.5" cy="18.5" r="2.5" />
              </svg>
            </div>
            <div>
              <div className="font-bold text-sm text-[var(--text-primary)] leading-tight">
                <EditableText
                  value={activeContent.trustBar[1]?.title || ""}
                  onChange={(val) =>
                    updateActiveContent((prev) => {
                      const updated = [...prev.trustBar];
                      if (updated[1]) updated[1] = { ...updated[1], title: val };
                      return { ...prev, trustBar: updated };
                    })
                  }
                  placeholder="Judul trust..."
                  label="Edit Judul Keunggulan 2"
                />
              </div>
              <div className="text-xs text-[var(--text-muted)] mt-0.5">
                <EditableText
                  value={activeContent.trustBar[1]?.desc || ""}
                  onChange={(val) =>
                    updateActiveContent((prev) => {
                      const updated = [...prev.trustBar];
                      if (updated[1]) updated[1] = { ...updated[1], desc: val };
                      return { ...prev, trustBar: updated };
                    })
                  }
                  placeholder="Keterangan..."
                  label="Edit Keterangan Keunggulan 2"
                />
              </div>
            </div>
          </div>

          {/* Item 3 - Oranye Sunset */}
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[var(--brand-accent-light)] text-[var(--brand-accent)] flex items-center justify-center shrink-0">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
            </div>
            <div>
              <div className="font-bold text-sm text-[var(--text-primary)] leading-tight">
                <EditableText
                  value={activeContent.trustBar[2]?.title || ""}
                  onChange={(val) =>
                    updateActiveContent((prev) => {
                      const updated = [...prev.trustBar];
                      if (updated[2]) updated[2] = { ...updated[2], title: val };
                      return { ...prev, trustBar: updated };
                    })
                  }
                  placeholder="Judul trust..."
                  label="Edit Judul Keunggulan 3"
                />
              </div>
              <div className="text-xs text-[var(--text-muted)] mt-0.5">
                <EditableText
                  value={activeContent.trustBar[2]?.desc || ""}
                  onChange={(val) =>
                    updateActiveContent((prev) => {
                      const updated = [...prev.trustBar];
                      if (updated[2]) updated[2] = { ...updated[2], desc: val };
                      return { ...prev, trustBar: updated };
                    })
                  }
                  placeholder="Keterangan..."
                  label="Edit Keterangan Keunggulan 3"
                />
              </div>
            </div>
          </div>

          {/* Item 4 - Kembali ke Biru Samudra */}
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[var(--brand-blue-light)] text-[var(--brand-blue)] flex items-center justify-center shrink-0">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="none"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
            <div>
              <div className="font-bold text-sm text-[var(--text-primary)] leading-tight">
                <EditableText
                  value={activeContent.trustBar[3]?.title || ""}
                  onChange={(val) =>
                    updateActiveContent((prev) => {
                      const updated = [...prev.trustBar];
                      if (updated[3]) updated[3] = { ...updated[3], title: val };
                      return { ...prev, trustBar: updated };
                    })
                  }
                  placeholder="Judul trust..."
                  label="Edit Judul Keunggulan 4"
                />
              </div>
              <div className="text-xs text-[var(--text-muted)] mt-0.5">
                <EditableText
                  value={activeContent.trustBar[3]?.desc || ""}
                  onChange={(val) =>
                    updateActiveContent((prev) => {
                      const updated = [...prev.trustBar];
                      if (updated[3]) updated[3] = { ...updated[3], desc: val };
                      return { ...prev, trustBar: updated };
                    })
                  }
                  placeholder="Keterangan..."
                  label="Edit Keterangan Keunggulan 4"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SEKSI 3: KATALOG PAKET TUR FAVORIT
          ======================================================== */}
      <section
        id="katalog"
        className="bg-[var(--canvas)] py-16 sm:py-20 pb-20 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full"
      >
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-serif italic text-base sm:text-lg text-[var(--brand-blue)] block mb-2 font-normal tracking-wide">
            “
            <EditableText
              value={activeContent.tours.tag}
              onChange={(val) =>
                updateActiveContent((prev) => ({
                  ...prev,
                  tours: { ...prev.tours, tag: val },
                }))
              }
              placeholder="Tag seksi..."
              label="Edit Tag Seksi Tur"
            />
            ”
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[var(--text-primary)] font-normal mb-3">
            <EditableText
              value={activeContent.tours.title}
              onChange={(val) =>
                updateActiveContent((prev) => ({
                  ...prev,
                  tours: { ...prev.tours, title: val },
                }))
              }
              placeholder="Judul seksi..."
              label="Edit Judul Seksi Tur"
            />
          </h2>
          <div className="text-[var(--text-muted)] text-sm sm:text-base leading-relaxed">
            <EditableText
              value={activeContent.tours.subtitle}
              onChange={(val) =>
                updateActiveContent((prev) => ({
                  ...prev,
                  tours: { ...prev.tours, subtitle: val },
                }))
              }
              multiline={true}
              placeholder="Deskripsi seksi..."
              label="Edit Deskripsi Seksi Tur"
            />
          </div>
        </div>

        {/* Live Catalog Preview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {(() => {
            const orderedFirestoreTours =
              firestoreTours && firestoreTours.length > 0
                ? [...firestoreTours].sort((a, b) => {
                    const getOrder = (item: any) => {
                      const text = (item.name || item.slug || item.id || "").toLowerCase();
                      if (text.includes("uluwatu")) return 0;
                      if (text.includes("ubud")) return 1;
                      if (text.includes("bedugul")) return 2;
                      return 3;
                    };
                    return getOrder(a) - getOrder(b);
                  })
                : null;

            const toursList =
              orderedFirestoreTours && orderedFirestoreTours.length > 0
                ? orderedFirestoreTours.map((ft, idx) => ({
                    badge:
                      idx === 0
                        ? lang === "id" ? "Sunset Terbaik" : "Sunset Classic"
                        : idx === 1
                        ? lang === "id" ? "Favorit Budaya" : "Cultural Highlights"
                        : lang === "id" ? "Warisan UNESCO" : "UNESCO Heritage",
                    title: ft.name,
                    duration: ft.duration,
                    highlights:
                      ft.highlights && ft.highlights.length > 0
                        ? ft.highlights.slice(0, 5)
                        : [
                            lang === "id" ? "Mobil Ber-AC Dingin & Bersih" : "Clean A/C Private Car",
                            lang === "id" ? "Pemandu Lokal Resmi HPI" : "Licensed Balinese HPI Guide",
                            lang === "id" ? "Jadwal Fleksibel Santai" : "Flexible Relaxed Pacing",
                            lang === "id" ? "Bebas Request Spot Foto" : "Free Photo Requests",
                            lang === "id" ? "Tanpa Komisi Toko Oleh-Oleh" : "No Commission Tourist Shops",
                          ],
                  }))
                : [
                    {
                      badge: lang === "id" ? "Sunset Terbaik" : "Sunset Classic",
                      title: "Uluwatu Sunset Cliff, Melasti & Tari Kecak",
                      duration: "Half / Full Day (7 - 9 Jam) · Sore Romantis",
                      highlights: [
                        "Pantai Pasir Putih & Tebing Karang Melasti",
                        "Pura Luhur Uluwatu di Atas Tebing Samudra Hindia",
                        "Magis Pertunjukan Tari Kecak & Api saat Senja",
                        "Makan Malam Romantis Seafood Jimbaran Bay",
                        "Penjemputan & Pengantaran Kembali ke Hotel",
                      ],
                    },
                    {
                      badge: lang === "id" ? "Favorit Budaya" : "Cultural Highlights",
                      title: "Ubud Cultural, Rice Terrace & Secret Waterfall",
                      duration: "Full Day (8 - 10 Jam) · Rute Fleksibel",
                      highlights: [
                        "Hutan Monyet Ubud (Sacred Monkey Forest)",
                        "Terasering Sawah Tegalalang & Ayunan Foto",
                        "Pura Tirta Empul (Ritual Penyucian Melukat)",
                        "Air Terjun Eksotis Kanto Lampo",
                        "Perkebunan Kopi Luwak Tradisional",
                      ],
                    },
                    {
                      badge: lang === "id" ? "Warisan UNESCO" : "UNESCO Heritage",
                      title: "Bedugul Ulun Danu & Jatiluwih Rice Terrace",
                      duration: "Full Day (9 - 10 Jam) · Sejuk & Alami",
                      highlights: [
                        "Pura Ulun Danu Beratan (Pura Danau Ikonik)",
                        "Lanskap Terasering Sawah Jatiluwih UNESCO",
                        "Gerbang Ikonik Handara Gate",
                        "Pasar Buah & Rempah Segar Candikuning",
                        "Danau Kembar Buyan & Tamblingan View",
                      ],
                    },
                  ];

            return toursList.map((tour, index) => {
              const isThirdCard = index === 2;
              const badgeColorClass =
                index === 0
                  ? "bg-[var(--brand-blue-light)] text-[var(--brand-blue)]"
                  : index === 1
                  ? "bg-[var(--brand-green-light)] text-[var(--brand-green)]"
                  : "bg-[var(--brand-accent-light)] text-[var(--brand-accent)]";

              const hoverBorderClass =
                index === 0
                  ? "hover:border-[var(--brand-blue)]"
                  : index === 1
                  ? "hover:border-[var(--brand-green)]"
                  : "hover:border-[var(--brand-accent)]";

              const accentColorClass =
                index === 0
                  ? "text-[var(--brand-blue)]"
                  : index === 1
                  ? "text-[var(--brand-green)]"
                  : "text-[var(--brand-accent)]";

              const ctaButtonClass =
                index === 0
                  ? "bg-[var(--brand-blue)] text-white shadow-[0_2px_8px_rgba(24,120,184,0.25)]"
                  : index === 1
                  ? "bg-[var(--brand-green)] text-white shadow-[0_2px_8px_rgba(12,140,94,0.25)]"
                  : "bg-[var(--brand-accent)] text-white shadow-[0_2px_8px_rgba(230,126,34,0.25)]";

              return (
                <article
                  key={index}
                  className={`bg-white border border-[var(--border)] rounded-2xl flex flex-col justify-between overflow-hidden shadow-[0_4px_20px_rgba(24,120,184,0.06)] hover:-translate-y-1.5 hover:shadow-[0_12px_36px_rgba(0,0,0,0.08)] transition-all duration-200 ${hoverBorderClass} ${
                    isThirdCard ? "md:col-span-2 lg:col-span-1" : ""
                  }`}
                >
                  <div>
                    {/* Header Kartu */}
                    <div className="p-6 pb-5 border-b border-[var(--border)]">
                      <div className="flex items-center mb-3">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${badgeColorClass}`}
                        >
                          {tour.badge}
                        </span>
                      </div>
                      <h3 className="font-bold text-lg text-[var(--text-primary)] mb-4 leading-snug">
                        {tour.title}
                      </h3>
                      <div className="flex flex-col">
                        <span className="text-base sm:text-lg font-bold text-[var(--text-primary)] tracking-tight">
                          {lang === "id" ? "Tarif Fleksibel / Hubungi WA" : "Price on Request / Rates via WA"}
                        </span>
                        <span className="text-[12px] sm:text-[13px] text-[var(--text-muted)] mt-0.5">
                          {lang === "id" ? "Konsultasi rute langsung gratis" : "Free custom itinerary consultation"}
                        </span>
                      </div>
                    </div>

                    {/* Isi Rute & Highlight */}
                    <div className="p-6">
                      <div className={`flex items-center gap-1.5 text-xs font-semibold ${accentColorClass} mb-4`}>
                        <Clock className="w-3.5 h-3.5" />
                        <span>{tour.duration}</span>
                      </div>

                      <ul className="space-y-2.5 text-xs sm:text-[13px] text-[#121715]">
                        {tour.highlights.map((item, hIdx) => (
                          <li key={hIdx} className="flex items-start gap-2">
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              className={`${accentColorClass} shrink-0 mt-0.5`}
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Tombol Pesan via WhatsApp */}
                  <div className="p-5 pt-4 border-t border-[#EBE9E6] bg-[#FAF8F5]">
                    <div
                      className={`w-full flex items-center justify-center gap-2 h-11 px-5 py-2.5 rounded-xl font-medium text-sm ${ctaButtonClass} opacity-90`}
                    >
                      <span>{lang === "id" ? "Pesan via WhatsApp" : "Book via WhatsApp"}</span>
                    </div>
                  </div>
                </article>
              );
            });
          })()}
        </div>

        {/* Tombol Sekunder di Bawah Grid Paket Tur */}
        <div className="mt-10 sm:mt-12 text-center">
          <div className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl bg-white text-[#1878B8] border border-[#1878B8] font-medium text-sm shadow-xs">
            <EditableText
              value={activeContent.tours.btnAllTours}
              onChange={(val) =>
                updateActiveContent((prev) => ({
                  ...prev,
                  tours: { ...prev.tours, btnAllTours: val },
                }))
              }
              placeholder="Teks tombol..."
              label="Edit Teks Tombol Semua Tur"
            />
          </div>
        </div>
      </section>

      {/* ========================================================
          SEKSI 4: WHY CHOOSE US / TIGA PILAR UTAMA LAYANAN
          ======================================================== */}
      <section
        id="tentang"
        className="bg-white border-y border-[#EBE9E6] py-16 sm:py-20 px-4 sm:px-6 lg:px-8 w-full"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="font-serif italic text-base sm:text-lg text-[#0C8C5E] block mb-2 font-normal tracking-wide">
              “
              <EditableText
                value={activeContent.pillars.tag}
                onChange={(val) =>
                  updateActiveContent((prev) => ({
                    ...prev,
                    pillars: { ...prev.pillars, tag: val },
                  }))
                }
                placeholder="Tag seksi..."
                label="Edit Tag Seksi Pilar"
              />
              ”
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#08090A] font-normal mb-3">
              <EditableText
                value={activeContent.pillars.title}
                onChange={(val) =>
                  updateActiveContent((prev) => ({
                    ...prev,
                    pillars: { ...prev.pillars, title: val },
                  }))
                }
                placeholder="Judul seksi..."
                label="Edit Judul Seksi Pilar"
              />
            </h2>
            <div className="text-[#5E6965] text-sm sm:text-base leading-relaxed">
              <EditableText
                value={activeContent.pillars.subtitle}
                onChange={(val) =>
                  updateActiveContent((prev) => ({
                    ...prev,
                    pillars: { ...prev.pillars, subtitle: val },
                  }))
                }
                multiline={true}
                placeholder="Deskripsi seksi..."
                label="Edit Deskripsi Seksi Pilar"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
            {/* Pilar 1 - Biru Samudra */}
            <article className="bg-[#FEFDFB] border border-[#EBE9E6] rounded-2xl p-7 sm:p-8 shadow-xs hover:-translate-y-1 transition-all duration-200 hover:border-[#1878B8]">
              <div className="w-12 h-12 rounded-xl bg-[#EBF5FB] text-[#1878B8] flex items-center justify-center mb-5">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-[#08090A] mb-2.5">
                <EditableText
                  value={activeContent.pillars.items[0]?.title || ""}
                  onChange={(val) =>
                    updateActiveContent((prev) => {
                      const updated = [...prev.pillars.items];
                      if (updated[0]) updated[0] = { ...updated[0], title: val };
                      return {
                        ...prev,
                        pillars: { ...prev.pillars, items: updated },
                      };
                    })
                  }
                  placeholder="Judul pilar 1..."
                  label="Edit Judul Pilar 1"
                />
              </h3>
              <div className="text-sm text-[#5E6965] leading-relaxed">
                <EditableText
                  value={activeContent.pillars.items[0]?.desc || ""}
                  onChange={(val) =>
                    updateActiveContent((prev) => {
                      const updated = [...prev.pillars.items];
                      if (updated[0]) updated[0] = { ...updated[0], desc: val };
                      return {
                        ...prev,
                        pillars: { ...prev.pillars, items: updated },
                      };
                    })
                  }
                  multiline={true}
                  placeholder="Deskripsi pilar 1..."
                  label="Edit Deskripsi Pilar 1"
                />
              </div>
            </article>

            {/* Pilar 2 - Hijau Bali */}
            <article className="bg-[#FEFDFB] border border-[#EBE9E6] rounded-2xl p-7 sm:p-8 shadow-xs hover:-translate-y-1 transition-all duration-200 hover:border-[#0C8C5E]">
              <div className="w-12 h-12 rounded-xl bg-[#E8F6F0] text-[#0C8C5E] flex items-center justify-center mb-5">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-[#08090A] mb-2.5">
                <EditableText
                  value={activeContent.pillars.items[1]?.title || ""}
                  onChange={(val) =>
                    updateActiveContent((prev) => {
                      const updated = [...prev.pillars.items];
                      if (updated[1]) updated[1] = { ...updated[1], title: val };
                      return {
                        ...prev,
                        pillars: { ...prev.pillars, items: updated },
                      };
                    })
                  }
                  placeholder="Judul pilar 2..."
                  label="Edit Judul Pilar 2"
                />
              </h3>
              <div className="text-sm text-[#5E6965] leading-relaxed">
                <EditableText
                  value={activeContent.pillars.items[1]?.desc || ""}
                  onChange={(val) =>
                    updateActiveContent((prev) => {
                      const updated = [...prev.pillars.items];
                      if (updated[1]) updated[1] = { ...updated[1], desc: val };
                      return {
                        ...prev,
                        pillars: { ...prev.pillars, items: updated },
                      };
                    })
                  }
                  multiline={true}
                  placeholder="Deskripsi pilar 2..."
                  label="Edit Deskripsi Pilar 2"
                />
              </div>
            </article>

            {/* Pilar 3 - Oranye Sunset */}
            <article className="bg-[#FEFDFB] border border-[#EBE9E6] rounded-2xl p-7 sm:p-8 shadow-xs hover:-translate-y-1 transition-all duration-200 hover:border-[#E67E22]">
              <div className="w-12 h-12 rounded-xl bg-[#FDF3E6] text-[#E67E22] flex items-center justify-center mb-5">
                <Car className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-[#08090A] mb-2.5">
                <EditableText
                  value={activeContent.pillars.items[2]?.title || ""}
                  onChange={(val) =>
                    updateActiveContent((prev) => {
                      const updated = [...prev.pillars.items];
                      if (updated[2]) updated[2] = { ...updated[2], title: val };
                      return {
                        ...prev,
                        pillars: { ...prev.pillars, items: updated },
                      };
                    })
                  }
                  placeholder="Judul pilar 3..."
                  label="Edit Judul Pilar 3"
                />
              </h3>
              <div className="text-sm text-[#5E6965] leading-relaxed">
                <EditableText
                  value={activeContent.pillars.items[2]?.desc || ""}
                  onChange={(val) =>
                    updateActiveContent((prev) => {
                      const updated = [...prev.pillars.items];
                      if (updated[2]) updated[2] = { ...updated[2], desc: val };
                      return {
                        ...prev,
                        pillars: { ...prev.pillars, items: updated },
                      };
                    })
                  }
                  multiline={true}
                  placeholder="Deskripsi pilar 3..."
                  label="Edit Deskripsi Pilar 3"
                />
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ========================================================
          SEKSI 5: WILAYAH POPULER EKSPLORASI (DESTINASI)
          ======================================================== */}
      <section className="bg-[var(--canvas)] py-16 sm:py-20 px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="font-serif italic text-base sm:text-lg text-[var(--brand-blue)] block mb-2 font-normal tracking-wide">
              “
              <EditableText
                value={activeContent.regions.tag}
                onChange={(val) =>
                  updateActiveContent((prev) => ({
                    ...prev,
                    regions: { ...prev.regions, tag: val },
                  }))
                }
                placeholder="Tag seksi..."
                label="Edit Tag Seksi Destinasi"
              />
              ”
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[var(--text-primary)] font-normal mb-3">
              <EditableText
                value={activeContent.regions.title}
                onChange={(val) =>
                  updateActiveContent((prev) => ({
                    ...prev,
                    regions: { ...prev.regions, title: val },
                  }))
                }
                placeholder="Judul seksi..."
                label="Edit Judul Seksi Destinasi"
              />
            </h2>
            <div className="text-[var(--text-muted)] text-sm sm:text-base leading-relaxed">
              <EditableText
                value={activeContent.regions.subtitle}
                onChange={(val) =>
                  updateActiveContent((prev) => ({
                    ...prev,
                    regions: { ...prev.regions, subtitle: val },
                  }))
                }
                multiline={true}
                placeholder="Deskripsi seksi..."
                label="Edit Deskripsi Seksi Destinasi"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {mockPopularDestinations.map((dest, idx) => {
              const linkedTour = mockAllTours.find(
                (t) =>
                  t.slug === dest.tourSlug ||
                  (dest.tourSlugs && dest.tourSlugs.includes(t.slug))
              );

              const coverImage =
                linkedTour?.coverImage ||
                dest.coverImage ||
                dest.imageUrl ||
                "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop&q=80";

              const description =
                lang === "en"
                  ? idx === 0
                    ? "Cultural heartland, sacred temples, lush emerald rice terraces, and hidden tropical waterfalls."
                    : idx === 1
                    ? "Dramatic limestone sea cliffs, secluded white sand beaches, legendary sunsets, and fresh seafood."
                    : idx === 2
                    ? "Refreshing mountain highlands, misty lake temples, and grand UNESCO World Heritage rice terraces."
                    : "Majestic caldera vistas of Mount and Lake Batur, floating cafes, and ancient indigenous villages."
                  : dest.description || linkedTour?.description || "";

              const rhythmIndex = idx % 3;
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

              const linkTextClass =
                rhythmIndex === 0
                  ? "text-[var(--brand-blue)]"
                  : rhythmIndex === 1
                  ? "text-[var(--brand-green)]"
                  : "text-[var(--brand-accent)]";

              return (
                <div
                  key={dest.id || idx}
                  className={`group bg-white border border-[var(--border)] rounded-2xl overflow-hidden flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-300 shadow-xs hover:shadow-xl ${hoverBorderClass}`}
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--surface-alt)]">
                    <Image
                      src={coverImage}
                      alt={dest.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3 z-10">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold shadow-xs ${badgeClass}`}>
                        {dest.badge || "Destinasi Pilihan"}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
                    <div>
                      <h3 className="font-serif font-bold text-lg text-[var(--text-primary)] mb-2 leading-snug">
                        {dest.name}
                      </h3>
                      <p className="text-xs sm:text-[13px] text-[var(--text-muted)] leading-relaxed line-clamp-3">
                        {description}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-[var(--border)] flex items-center justify-between text-xs font-semibold">
                      <span className={linkTextClass}>
                        {lang === "id" ? "Eksplorasi Tur" : "Explore Tours"}
                      </span>
                      <div className="w-7 h-7 rounded-full bg-[var(--surface-alt)] text-[var(--text-muted)] flex items-center justify-center">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="7" y1="17" x2="17" y2="7" />
                          <polyline points="7 7 17 7 17 17" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================
          SEKSI 6: ULASAN WISATAWAN / TESTIMONI
          ======================================================== */}
      <section
        id="ulasan"
        className="bg-white border-y border-[#EBE9E6] py-16 sm:py-20 px-4 sm:px-6 lg:px-8 w-full"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="font-serif italic text-base sm:text-lg text-[#0C8C5E] block mb-2 font-normal tracking-wide">
              “
              <EditableText
                value={activeContent.reviews.tag}
                onChange={(val) =>
                  updateActiveContent((prev) => ({
                    ...prev,
                    reviews: { ...prev.reviews, tag: val },
                  }))
                }
                placeholder="Tag seksi..."
                label="Edit Tag Seksi Ulasan"
              />
              ”
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#08090A] font-normal mb-3">
              <EditableText
                value={activeContent.reviews.title}
                onChange={(val) =>
                  updateActiveContent((prev) => ({
                    ...prev,
                    reviews: { ...prev.reviews, title: val },
                  }))
                }
                placeholder="Judul seksi..."
                label="Edit Judul Seksi Ulasan"
              />
            </h2>
            <div className="text-[#5E6965] text-sm sm:text-base leading-relaxed">
              <EditableText
                value={activeContent.reviews.subtitle}
                onChange={(val) =>
                  updateActiveContent((prev) => ({
                    ...prev,
                    reviews: { ...prev.reviews, subtitle: val },
                  }))
                }
                multiline={true}
                placeholder="Deskripsi seksi..."
                label="Edit Deskripsi Seksi Ulasan"
              />
            </div>
          </div>

          {/* Grid Kartu Ulasan */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
            {(() => {
              const reviewsList =
                lang === "id" && firestoreReviews && firestoreReviews.length > 0
                  ? firestoreReviews.map((fr) => ({
                      rating: fr.rating || 5,
                      text: `“${fr.content}”`,
                      author: fr.authorName,
                      origin: fr.authorOrigin,
                      tourType: fr.tourName || "Tur Privat",
                    }))
                  : [
                      {
                        rating: 5,
                        text: "“Gede made our Bali holiday completely unforgettable. As a family with two kids, his patience, warm stories about Balinese culture, and comfortable car were top-tier. No tourist traps at all!”",
                        author: "Sarah & Mark",
                        origin: "Sydney, Australia",
                        tourType: "Family Tour",
                      },
                      {
                        rating: 5,
                        text: "“Sangat puas dengan pelayanan Bli Gede. Mobilnya bersih dan wangi, rutenya sangat santai bisa request berhenti kapan saja untuk foto anak-anak. Paham sekali spot-spot makan halal yang enak di Bali!”",
                        author: "Keluarga Budi Santoso",
                        origin: "Jakarta, Indonesia",
                        tourType: "Liburan Keluarga",
                      },
                      {
                        rating: 5,
                        text: "“Le meilleur guide de Bali! Gede est passionné par la culture balinaise, très ponctuel et extrêmement prudent sur la route. Nous recommandons à 100%.”",
                        author: "Jean-Paul & Claire",
                        origin: "Lyon, Prancis",
                        tourType: "Couple Explorer",
                      },
                    ];

              return reviewsList.map((rev, idx) => (
                <ReviewCard
                  key={idx}
                  review={rev}
                  index={idx}
                  className="h-full"
                />
              ));
            })()}
          </div>

          {/* Tombol Sekunder di Bawah Ulasan */}
          <div className="mt-10 sm:mt-12 text-center">
            <div className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl bg-white text-[#1878B8] border border-[#1878B8] font-medium text-sm shadow-xs">
              <EditableText
                value={activeContent.reviews.btnAllReviews}
                onChange={(val) =>
                  updateActiveContent((prev) => ({
                    ...prev,
                    reviews: { ...prev.reviews, btnAllReviews: val },
                  }))
                }
                placeholder="Teks tombol..."
                label="Edit Teks Tombol Semua Ulasan"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SEKSI 7: PERTANYAAN YANG SERING DIAJUKAN / FAQ
          ======================================================== */}
      <section
        id="faq"
        className="bg-[#FEFDFB] py-16 sm:py-20 px-4 sm:px-6 lg:px-8 w-full"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="font-serif italic text-base sm:text-lg text-[#1878B8] block mb-2 font-normal tracking-wide">
              “
              <EditableText
                value={activeContent.faq.tag}
                onChange={(val) =>
                  updateActiveContent((prev) => ({
                    ...prev,
                    faq: { ...prev.faq, tag: val },
                  }))
                }
                placeholder="Tag seksi..."
                label="Edit Tag Seksi FAQ"
              />
              ”
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#08090A] font-normal mb-3">
              <EditableText
                value={activeContent.faq.title}
                onChange={(val) =>
                  updateActiveContent((prev) => ({
                    ...prev,
                    faq: { ...prev.faq, title: val },
                  }))
                }
                placeholder="Judul seksi..."
                label="Edit Judul Seksi FAQ"
              />
            </h2>
            <div className="text-[#5E6965] text-sm sm:text-base leading-relaxed">
              <EditableText
                value={activeContent.faq.subtitle}
                onChange={(val) =>
                  updateActiveContent((prev) => ({
                    ...prev,
                    faq: { ...prev.faq, subtitle: val },
                  }))
                }
                multiline={true}
                placeholder="Deskripsi seksi..."
                label="Edit Deskripsi Seksi FAQ"
              />
            </div>
          </div>

          <div className="space-y-4">
            {(() => {
              const faqList =
                lang === "id" && firestoreFaqs && firestoreFaqs.length > 0
                  ? firestoreFaqs.map((ff) => ({
                      q: ff.question,
                      a: ff.answer,
                    }))
                  : [
                      {
                        q: "Bagaimana sistem pembayaran turnya?",
                        a: "Sangat mudah dan aman tanpa risiko. Anda tidak perlu membayar uang muka (DP) atau memasukkan kartu kredit saat reservasi. Pembayaran dilakukan secara langsung kepada Bli Gede di akhir perjalanan wisata setelah tur selesai dinikmati, baik secara tunai (Rupiah) maupun transfer bank/QRIS.",
                      },
                      {
                        q: "Apakah rute perjalanan bisa kami atur sendiri?",
                        a: "Sangat bisa! Seluruh tur kami bersifat 100% privat. Anda memiliki fleksibilitas penuh untuk menentukan jam penjemputan, memodifikasi urutan destinasi, atau menambahkan spot wisata baru yang ingin dikunjungi sepanjang masih satu arah rute perjalanan.",
                      },
                      {
                        q: "Fasilitas apa saja yang sudah termasuk dalam harga sewa mobil?",
                        a: "Tarif per mobil sudah mencakup sewa armada pribadi ber-AC sejuk (kapasitas s.d. 5 penumpang), bahan bakar (BBM), jasa pemandu wisata berlisensi resmi HPI Bali, air mineral dingin selama perjalanan, dan biaya parkir standar di tempat wisata.",
                      },
                      {
                        q: "Apakah melayani penjemputan di bandara atau hotel luar Denpasar?",
                        a: "Ya! Penjemputan dan pengantaran kembali sudah termasuk tanpa biaya tambahan untuk area Kuta, Seminyak, Legian, Canggu, Sanur, Nusa Dua, Jimbaran, dan Ubud.",
                      },
                    ];

              return faqList.map((item, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={index}
                    className={`border rounded-2xl overflow-hidden shadow-xs transition-all duration-200 ${
                      isOpen
                        ? "bg-[#EAF5FC] border-[#1878B8]/30 shadow-xs"
                        : "bg-white hover:bg-[#EAF5FC]/50 border-[#EBE9E6]"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(index)}
                      aria-expanded={isOpen}
                      className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer transition-colors"
                    >
                      <span className="font-bold text-base sm:text-lg text-[#08090A] pr-2">
                        {item.q}
                      </span>
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                          isOpen
                            ? "bg-[#1878B8] text-white rotate-180"
                            : "bg-[#EBF5FB] text-[#1878B8]"
                        }`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-[15px] text-[#5E6965] leading-relaxed border-t border-[#1878B8]/15">
                        <p>{item.a}</p>
                      </div>
                    )}
                  </div>
                );
              });
            })()}
          </div>

          {/* Tombol Sekunder di Bawah FAQ */}
          <div className="mt-10 sm:mt-12 text-center">
            <div className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl bg-white text-[#1878B8] border border-[#1878B8] font-medium text-sm shadow-xs">
              <EditableText
                value={activeContent.faq.btnAllFaq}
                onChange={(val) =>
                  updateActiveContent((prev) => ({
                    ...prev,
                    faq: { ...prev.faq, btnAllFaq: val },
                  }))
                }
                placeholder="Teks tombol..."
                label="Edit Teks Tombol Semua FAQ"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SEKSI 8: BOTTOM CTA BANNER
          ======================================================== */}
      <section
        id="kontak"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16 sm:my-20 w-full"
      >
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0F4C81] to-[#1878B8] text-white p-8 sm:p-12 lg:p-14 shadow-xl flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="max-w-2xl relative z-10">
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal leading-tight mb-4">
              <EditableText
                value={activeContent.cta.title}
                onChange={(val) =>
                  updateActiveContent((prev) => ({
                    ...prev,
                    cta: { ...prev.cta, title: val },
                  }))
                }
                placeholder="Judul CTA banner..."
                label="Edit Judul Banner CTA"
              />
            </h2>
            <div className="text-sm sm:text-base text-white/90 leading-relaxed">
              <EditableText
                value={activeContent.cta.desc}
                onChange={(val) =>
                  updateActiveContent((prev) => ({
                    ...prev,
                    cta: { ...prev.cta, desc: val },
                  }))
                }
                multiline={true}
                placeholder="Deskripsi ajakan CTA..."
                label="Edit Deskripsi Banner CTA"
              />
            </div>
          </div>

          <div className="relative z-10 shrink-0">
            <EditableButton
              value={activeContent.cta.btn}
              onChange={(newText) =>
                updateActiveContent((prev) => ({
                  ...prev,
                  cta: { ...prev.cta, btn: newText },
                }))
              }
              variant={
                bilingual.ctaBannerVariant ||
                activeContent.cta.buttonVariant ||
                "sunset-amber-solid"
              }
              onVariantChange={(newVariant) =>
                updateButtonVariantGlobal("ctaBanner", newVariant)
              }
              defaultVariant="sunset-amber-solid"
              placeholder="Teks Tombol CTA..."
              label="Atur Tombol CTA Bawah"
              icon={
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              }
            />
          </div>

          <div
            className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#E67E22]/20 blur-3xl pointer-events-none"
            aria-hidden="true"
          />
        </div>
      </section>

      {/* Admin Floating Save Bar */}
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
