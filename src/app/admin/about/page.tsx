"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Save,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
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
  Pencil,
  Upload,
  Globe,
  Database,
  X,
  Plus,
  Trash2,
} from "lucide-react";
import Footer from "@/components/layout/Footer";
import {
  AboutPageContent,
  BilingualAboutPageContent,
  StatItem,
  PillarItem,
  TrustItem,
} from "@/types";
import {
  defaultAboutPageContent,
  defaultAboutPageContentEn,
  defaultBilingualAboutPageContent,
} from "@/lib/services/about-service";

/**
 * Komponen pembungkus teks untuk In-Place Inline Editing yang presisi
 * Menggunakan contentEditable dengan sinkronisasi halus tanpa jump cursor.
 */
function InlineEditable({
  value,
  onChange,
  className = "",
  placeholder = "Ketik teks...",
  multiline = false,
  as: Component = "span",
}: {
  value: string;
  onChange: (val: string) => void;
  className?: string;
  placeholder?: string;
  multiline?: boolean;
  as?: React.ElementType;
}) {
  const contentRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (contentRef.current && contentRef.current.innerText !== value) {
      contentRef.current.innerText = value || "";
    }
  }, [value]);

  return (
    <Component
      ref={contentRef}
      contentEditable
      suppressContentEditableWarning
      onBlur={(e: React.FocusEvent<HTMLElement>) => {
        const text = e.currentTarget.innerText.trim();
        if (text !== value) {
          onChange(text);
        }
      }}
      onKeyDown={(e: React.KeyboardEvent<HTMLElement>) => {
        if (!multiline && e.key === "Enter") {
          e.preventDefault();
          e.currentTarget.blur();
        }
      }}
      className={`group/edit relative cursor-text transition-all duration-200 outline-hidden rounded-md px-1 -mx-1 border border-transparent hover:border-dashed hover:border-[#1878B8] hover:bg-[#1878B8]/5 focus:border-solid focus:border-[#1878B8] focus:bg-white/90 focus:ring-2 focus:ring-[#1878B8]/20 ${className}`}
      title="Klik untuk mengedit langsung di tempat"
      data-placeholder={placeholder}
    />
  );
}

export default function AdminAboutInlineEditorPage() {
  const [bilingual, setBilingual] = useState<BilingualAboutPageContent>(
    defaultBilingualAboutPageContent
  );
  const [lang, setLang] = useState<"id" | "en">("id");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<{
    type: "idle" | "success" | "error";
    message?: string;
  }>({ type: "idle" });

  // State Modal Upload Foto Cloudinary
  const [imageModal, setImageModal] = useState<{
    isOpen: boolean;
    target: "profile" | "story";
    title: string;
    url: string;
    alt: string;
    caption?: string;
  }>({
    isOpen: false,
    target: "profile",
    title: "",
    url: "",
    alt: "",
    caption: "",
  });
  const [isUploadingImage, setIsUploadingImage] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
  }, []);

  // Konten aktif berdasarkan toggle bahasa
  const activeContent: AboutPageContent = bilingual[lang] || defaultAboutPageContent;

  // Fungsi pembaruan data spesifik bahasa aktif
  const updateActiveContent = (updater: (prev: AboutPageContent) => AboutPageContent) => {
    setBilingual((prev) => ({
      ...prev,
      [lang]: updater(prev[lang] || defaultAboutPageContent),
    }));
    setHasUnsavedChanges(true);
  };

  // Simpan data bahasa aktif ke Cloud Firestore (skema murni dwibahasa tanpa root fields)
  const handleSaveToFirestore = async () => {
    setIsSaving(true);
    setSaveStatus({ type: "idle" });

    try {
      const res = await fetch("/api/admin/about", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lang,
          data: activeContent,
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

      setSaveStatus({
        type: "success",
        message: `Perubahan konten bahasa ${lang.toUpperCase()} berhasil disimpan ke Cloud Firestore ('settings/about_page')!`,
      });

      setTimeout(() => {
        setSaveStatus((prev) => (prev.type === "success" ? { type: "idle" } : prev));
      }, 4000);
    } catch (err: any) {
      console.error("Error saving to Firestore:", err);
      setSaveStatus({
        type: "error",
        message: err?.message || "Terjadi kesalahan saat menyimpan data.",
      });
    } finally {
      setIsSaving(false);
    }
  };


  // Trigger Modal Ganti Foto
  const openImageModal = (target: "profile" | "story") => {
    setUploadError(null);
    setUploadSuccess(null);
    if (target === "profile") {
      setImageModal({
        isOpen: true,
        target: "profile",
        title: "Ganti Foto Potret Profil Bli Gede",
        url: activeContent.hero.profileImage.url,
        alt: activeContent.hero.profileImage.alt,
        caption: activeContent.hero.imageCaption,
      });
    } else {
      setImageModal({
        isOpen: true,
        target: "story",
        title: "Ganti Foto Suasana Cerita & Pura Bali",
        url: activeContent.story.storyImage.url,
        alt: activeContent.story.storyImage.alt,
      });
    }
  };

  // Upload gambar ke Cloudinary via API /api/cloudinary/upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validasi ukuran file di sisi browser (maksimal 15MB)
    if (file.size > 15 * 1024 * 1024) {
      setUploadError("Ukuran berkas terlalu besar (maksimal 15MB). Harap gunakan foto yang lebih ringan.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    // Validasi format file
    if (!file.type.startsWith("image/")) {
      setUploadError("Format berkas tidak valid. Harap pilih file gambar (JPG, PNG, atau WebP).");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setIsUploadingImage(true);
    setUploadError(null);
    setUploadSuccess(null);

    // Timeout proteksi 60 detik di sisi browser
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "gede-bali/about");

      const res = await fetch("/api/cloudinary/upload", {
        method: "POST",
        body: formData,
        signal: controller.signal,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Gagal mengunggah foto ke Cloudinary.");
      }

      // Pastikan URL aman berformat HTTPS
      const finalUrl = data.url.startsWith("http://")
        ? data.url.replace(/^http:\/\//i, "https://")
        : data.url;

      // Update URL pratinjau di modal & beri feedback
      setImageModal((prev) => ({
        ...prev,
        url: finalUrl,
      }));
      setUploadSuccess("Foto berhasil diunggah ke Cloudinary! Klik 'Terapkan Foto' untuk memasangnya di halaman.");
    } catch (err: any) {
      console.error("Upload error:", err);
      if (err.name === "AbortError") {
        setUploadError(
          "Waktu unggah habis (Request Timeout). Koneksi internet lambat atau berkas terlalu besar. Silakan coba kembali."
        );
      } else {
        setUploadError(err?.message || "Gagal mengunggah gambar ke Cloudinary.");
      }
    } finally {
      clearTimeout(timeoutId);
      setIsUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };


  // Terapkan perubahan foto ke konten aktif
  const applyImageChanges = () => {
    if (imageModal.target === "profile") {
      updateActiveContent((prev) => ({
        ...prev,
        hero: {
          ...prev.hero,
          profileImage: {
            ...prev.hero.profileImage,
            url: imageModal.url,
            alt: imageModal.alt,
          },
          imageCaption: imageModal.caption || prev.hero.imageCaption,
        },
      }));
    } else {
      updateActiveContent((prev) => ({
        ...prev,
        story: {
          ...prev.story,
          storyImage: {
            ...prev.story.storyImage,
            url: imageModal.url,
            alt: imageModal.alt,
          },
        },
      }));
    }
    setImageModal((prev) => ({ ...prev, isOpen: false }));
    setUploadSuccess(null);
    setSaveStatus({
      type: "success",
      message: "Foto berhasil diperbarui di tampilan! Klik 'Simpan Perubahan ke Firestore' untuk mempublikasikan.",
    });
  };

  // Helper render ikon Lucide
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
    <div className="flex min-h-screen flex-col bg-[#FEFDFB] text-[#08090A] font-sans selection:bg-[#EBF5FB] selection:text-[#1878B8] pb-24">
      {/* ========================================================
          STICKY TOP CONTROL BAR (ADMIN & BILINGUAL TOGGLE)
          ======================================================== */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#EBE9E6] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
          {/* Sisi Kiri: Breadcrumb & Indikator Inline Mode */}
          <div className="flex items-center gap-3">
            <Link
              href="/about"
              className="p-1.5 rounded-xl text-[#5E6965] hover:text-[#1878B8] hover:bg-[#EBF5FB] transition-colors"
              title="Kembali ke Beranda"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#1878B8] uppercase tracking-wider">
                Visual Editor
              </span>
              <span className="text-xs text-[#CFCDCA]">•</span>
              <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#EBF5FB] text-[#1878B8] text-[11px] font-semibold border border-[#1878B8]/20">
                <Pencil className="w-3 h-3" />
                <span>Klik Elemen untuk Edit Langsung</span>
              </div>
            </div>
          </div>

          {/* Sisi Tengah / Kanan: Pengalih Bahasa [ EN | ID ] */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-[#FAF8F5] p-1 rounded-xl border border-[#EBE9E6]">
              <span className="text-[11px] font-semibold text-[#5E6965] px-2 flex items-center gap-1">
                <Globe className="w-3 h-3 text-[#1878B8]" />
                <span className="hidden sm:inline">Bahasa:</span>
              </span>
              <button
                type="button"
                onClick={() => setLang("id")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  lang === "id"
                    ? "bg-[#1878B8] text-white shadow-xs"
                    : "text-[#5E6965] hover:text-[#08090A]"
                }`}
              >
                🇮🇩 ID (Indonesia)
              </button>
              <button
                type="button"
                onClick={() => setLang("en")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  lang === "en"
                    ? "bg-[#1878B8] text-white shadow-xs"
                    : "text-[#5E6965] hover:text-[#08090A]"
                }`}
              >
                🇬🇧 EN (English)
              </button>
            </div>

            <Link
              href="/about"
              target="_blank"
              className="hidden md:inline-flex items-center gap-1.5 h-9 px-3 rounded-xl border border-[#D3D8D6] bg-white text-[#5E6965] hover:text-[#1878B8] hover:bg-[#FAF8F5] text-xs font-medium transition-colors"
              title="Lihat Tampilan Publik Halaman /about"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Lihat Publik</span>
            </Link>
          </div>
        </div>

        {/* Notifikasi Status Simpan Bar */}
        {saveStatus.type !== "idle" && (
          <div
            className={`border-t px-4 py-2 text-xs flex items-center justify-between ${
              saveStatus.type === "success"
                ? "bg-[#E8F6F0] border-[#0C8C5E]/30 text-[#0C8C5E]"
                : "bg-red-50 border-red-200 text-red-700"
            }`}
          >
            <div className="max-w-7xl mx-auto w-full flex items-center gap-2">
              {saveStatus.type === "success" ? (
                <CheckCircle2 className="w-4 h-4 shrink-0 text-[#0C8C5E]" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              )}
              <span className="font-medium">{saveStatus.message}</span>
            </div>
          </div>
        )}
      </header>

      {/* ========================================================
          HALAMAN UTAMA: 100% REPLIKASI /about DENGAN IN-PLACE EDITING
          ======================================================== */}
      <main className="flex-1">
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
            {/* Breadcrumb Ringkas */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
              <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-medium text-[#5E6965]">
                <Link href="/" className="hover:text-[#1878B8] transition-colors">
                  {lang === "en" ? "Home" : "Beranda"}
                </Link>
                <ChevronRight className="w-3.5 h-3.5 text-[#CFCDCA]" />
                <span className="text-[#08090A] font-semibold">
                  {lang === "en" ? "About Gede" : "Tentang Gede"}
                </span>
                <span className="ml-2 text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-sm bg-[#FAF8F5] border border-[#EBE9E6] text-[#5E6965]">
                  Mode: {lang.toUpperCase()}
                </span>
              </nav>
            </div>

            {/* ========================================================
                SEKSI 1: HERO PORTRAIT & SAPAAN (IN-PLACE EDITABLE)
                ======================================================== */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-16 lg:pb-24">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                {/* Kolom Kiri: Teks Profil Editorial & Statistik */}
                <div className="lg:col-span-7 space-y-6 sm:space-y-8">
                  {/* Badge Hero Editable */}
                  <div className="mb-2">
                    <span className="font-serif italic text-base sm:text-lg text-[#1878B8] font-normal tracking-wide inline-flex items-center">
                      “
                      <InlineEditable
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

                  {/* Headline Utama Editable (Libre Baskerville) */}
                  <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#08090A] leading-[1.2] tracking-tight">
                    <InlineEditable
                      value={activeContent.hero.title}
                      onChange={(val) =>
                        updateActiveContent((prev) => ({
                          ...prev,
                          hero: { ...prev.hero, title: val },
                        }))
                      }
                      placeholder="Judul Headline..."
                      multiline
                    />
                  </h1>

                  {/* Paragraf Pengantar Editable */}
                  <p className="text-base sm:text-lg text-[#37413C] leading-relaxed">
                    <InlineEditable
                      value={activeContent.hero.introText}
                      onChange={(val) =>
                        updateActiveContent((prev) => ({
                          ...prev,
                          hero: { ...prev.hero, introText: val },
                        }))
                      }
                      placeholder="Paragraf pengantar sapaan..."
                      multiline
                    />
                  </p>

                  {/* Baris Statistik Dinamis (Editable) */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-2 pb-2">
                    {activeContent.hero.stats.map((stat, idx) => (
                      <div
                        key={stat.id || idx}
                        className="p-3.5 sm:p-4 rounded-2xl bg-[#FAF8F5] border border-[#EBE9E6]/70 transition-transform duration-200 hover:-translate-y-0.5 group"
                      >
                        <div className="text-2xl sm:text-3xl font-bold text-[#E67E22] tracking-tight">
                          <InlineEditable
                            value={stat.value}
                            onChange={(val) =>
                              updateActiveContent((prev) => {
                                const next = [...prev.hero.stats];
                                next[idx] = { ...next[idx], value: val };
                                return { ...prev, hero: { ...prev.hero, stats: next } };
                              })
                            }
                            placeholder="10+ Tahun"
                          />
                        </div>
                        <div className="text-xs sm:text-sm text-[#5E6965] font-medium mt-1 leading-snug">
                          <InlineEditable
                            value={stat.label}
                            onChange={(val) =>
                              updateActiveContent((prev) => {
                                const next = [...prev.hero.stats];
                                next[idx] = { ...next[idx], label: val };
                                return { ...prev, hero: { ...prev.hero, stats: next } };
                              })
                            }
                            placeholder="Keterangan..."
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tombol Interaktif WhatsApp & Jelajah Tur */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                    <div className="inline-flex items-center justify-center gap-2 h-11 px-5 py-2.5 rounded-xl bg-[#1878B8] text-white font-medium text-sm shadow-[0_2px_8px_rgba(24,120,184,0.25)] select-none">
                      <MessageCircle className="w-4.5 h-4.5" />
                      <span>{lang === "en" ? "Consult with Bli Gede" : "Konsultasi Bersama Gede"}</span>
                    </div>
                    <div className="inline-flex items-center justify-center gap-2 h-11 px-5 py-2.5 rounded-xl border border-[#D3D8D6] bg-white text-[#08090A] font-medium text-sm select-none">
                      <span>{lang === "en" ? "Explore Tour Packages" : "Lihat Pilihan Tur"}</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Kolom Kanan: Foto Profil Bli Gede (Interactive Click to Upload) */}
                <div className="lg:col-span-5">
                  <div className="relative mx-auto max-w-md lg:max-w-none">
                    <div className="absolute -inset-2 rounded-[32px] bg-gradient-to-tr from-[#0C8C5E]/15 to-[#E67E22]/15 blur-xl -z-10" />

                    <div
                      onClick={() => openImageModal("profile")}
                      className="group relative overflow-hidden rounded-3xl bg-white border border-[#EBE9E6] shadow-xl shadow-stone-200/50 cursor-pointer hover:border-[#1878B8] transition-all"
                      title="Klik untuk mengganti foto profil ini (Cloudinary)"
                    >
                      {/* Hover Overlay Penanda Ganti Foto */}
                      <div className="absolute inset-0 bg-[#0F4C81]/70 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity z-20 flex flex-col items-center justify-center text-white gap-2 p-4 text-center">
                        <div className="p-3 rounded-full bg-white/20 border border-white/30">
                          <Camera className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-sm font-semibold">
                          Klik untuk Ganti Foto (Cloudinary)
                        </span>
                        <span className="text-xs text-white/80">
                          Unggah dari komputer atau masukkan link foto
                        </span>
                      </div>

                      <div className="relative aspect-[4/5] w-full overflow-hidden bg-stone-100">
                        <Image
                          src={activeContent.hero.profileImage.url}
                          alt={activeContent.hero.profileImage.alt}
                          fill
                          priority
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 500px"
                          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      {/* Caption Foto Editable */}
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="p-4 sm:p-5 bg-white border-t border-[#EBE9E6]/60 text-center"
                      >
                        <p className="text-xs sm:text-sm text-[#5E6965] italic leading-relaxed">
                          &ldquo;
                          <InlineEditable
                            value={activeContent.hero.imageCaption}
                            onChange={(val) =>
                              updateActiveContent((prev) => ({
                                ...prev,
                                hero: { ...prev.hero, imageCaption: val },
                              }))
                            }
                            placeholder="Caption foto..."
                          />
                          &rdquo;
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ========================================================
                SEKSI 2: KISAH DI BALIK KEMUDI (IN-PLACE EDITABLE)
                ======================================================== */}
            <section className="bg-white border-y border-[#EBE9E6] py-16 sm:py-24">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                  {/* Kolom Teks Narasi & Pull-Quote */}
                  <div className="lg:col-span-7 space-y-6 sm:space-y-8 order-2 lg:order-1">
                    <div className="space-y-2 mb-4">
                      <span className="font-serif italic text-base sm:text-lg text-[#1878B8] font-normal tracking-wide block">
                        “
                        <InlineEditable
                          value={activeContent.story.sectionTag}
                          onChange={(val) =>
                            updateActiveContent((prev) => ({
                              ...prev,
                              story: { ...prev.story, sectionTag: val },
                            }))
                          }
                          placeholder="Tag Seksi..."
                        />
                        ”
                      </span>
                      <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#08090A] leading-tight">
                        <InlineEditable
                          value={activeContent.story.title}
                          onChange={(val) =>
                            updateActiveContent((prev) => ({
                              ...prev,
                              story: { ...prev.story, title: val },
                            }))
                          }
                          placeholder="Judul Kisah..."
                          multiline
                        />
                      </h2>
                    </div>

                    {/* Looping Paragraf Narasi Editable */}
                    <div className="space-y-4 text-base sm:text-lg text-[#37413C] leading-relaxed">
                      {activeContent.story.paragraphs.map((paragraph, idx) => (
                        <div key={idx} className="relative group/p flex items-start gap-2">
                          <div className="flex-1">
                            <InlineEditable
                              value={paragraph}
                              onChange={(val) =>
                                updateActiveContent((prev) => {
                                  const next = [...prev.story.paragraphs];
                                  next[idx] = val;
                                  return { ...prev, story: { ...prev.story, paragraphs: next } };
                                })
                              }
                              placeholder={`Paragraf ${idx + 1}...`}
                              multiline
                              as="p"
                            />
                          </div>
                          {activeContent.story.paragraphs.length > 1 && (
                            <button
                              type="button"
                              onClick={() =>
                                updateActiveContent((prev) => ({
                                  ...prev,
                                  story: {
                                    ...prev.story,
                                    paragraphs: prev.story.paragraphs.filter((_, i) => i !== idx),
                                  },
                                }))
                              }
                              className="opacity-0 group-hover/p:opacity-100 p-1 text-red-500 hover:text-red-700 transition-opacity"
                              title="Hapus paragraf ini"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      ))}

                      <button
                        type="button"
                        onClick={() =>
                          updateActiveContent((prev) => ({
                            ...prev,
                            story: {
                              ...prev.story,
                              paragraphs: [...prev.story.paragraphs, ""],
                            },
                          }))
                        }
                        className="inline-flex items-center gap-1.5 text-xs text-[#1878B8] font-semibold hover:underline pt-1 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Tambah Paragraf Baru</span>
                      </button>
                    </div>

                    {/* Pull-Quote Elegan Editable */}
                    <div className="border-l-4 border-[#0C8C5E] pl-6 py-3 bg-[#E8F6F0]/50 rounded-r-2xl">
                      <p className="font-serif italic text-lg sm:text-xl text-[#08090A] leading-snug">
                        &ldquo;
                        <InlineEditable
                          value={activeContent.story.quote}
                          onChange={(val) =>
                            updateActiveContent((prev) => ({
                              ...prev,
                              story: { ...prev.story, quote: val },
                            }))
                          }
                          placeholder="Kutipan kalimat..."
                          multiline
                        />
                        &rdquo;
                      </p>
                      <span className="block mt-2 text-xs sm:text-sm font-semibold text-[#0C8C5E]">
                        —{" "}
                        <InlineEditable
                          value={activeContent.story.quoteAuthor}
                          onChange={(val) =>
                            updateActiveContent((prev) => ({
                              ...prev,
                              story: { ...prev.story, quoteAuthor: val },
                            }))
                          }
                          placeholder="Penulis Kutipan..."
                        />
                      </span>
                    </div>
                  </div>

                  {/* Kolom Visual: Foto Budaya (Click to Upload) */}
                  <div className="lg:col-span-5 order-1 lg:order-2">
                    <div
                      onClick={() => openImageModal("story")}
                      className="group relative rounded-3xl overflow-hidden border border-[#EBE9E6] shadow-xl aspect-[4/5] bg-stone-100 cursor-pointer hover:border-[#1878B8] transition-all"
                      title="Klik untuk mengganti foto kisah ini (Cloudinary)"
                    >
                      <div className="absolute inset-0 bg-[#0F4C81]/70 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity z-20 flex flex-col items-center justify-center text-white gap-2 p-4 text-center">
                        <div className="p-3 rounded-full bg-white/20 border border-white/30">
                          <Camera className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-sm font-semibold">
                          Klik untuk Ganti Foto (Cloudinary)
                        </span>
                        <span className="text-xs text-white/80">
                          Unggah dari komputer atau ganti URL
                        </span>
                      </div>

                      <Image
                        src={activeContent.story.storyImage.url}
                        alt={activeContent.story.storyImage.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 450px"
                        className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-6 z-10">
                        <span className="text-white text-xs sm:text-sm font-medium drop-shadow-sm">
                          {activeContent.story.storyImage.alt}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ========================================================
                SEKSI 3: BAGAIMANA HARI ANDA BERJALAN BERSAMA GEDE
                (Pola Ritme 3 Warna: Biru Samudra, Hijau Bali, Oranye Sunset)
                ======================================================== */}
            <section className="bg-[#FEFDFB] py-16 sm:py-24">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto text-center space-y-2 mb-12 sm:mb-16">
                  <span className="font-serif italic text-base sm:text-lg text-[#1878B8] font-normal tracking-wide block mb-2">
                    “
                    <InlineEditable
                      value={activeContent.guidingStyle.sectionTag}
                      onChange={(val) =>
                        updateActiveContent((prev) => ({
                          ...prev,
                          guidingStyle: { ...prev.guidingStyle, sectionTag: val },
                        }))
                      }
                      placeholder="Tag Seksi..."
                    />
                    ”
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#08090A] leading-tight mb-3">
                    <InlineEditable
                      value={activeContent.guidingStyle.title}
                      onChange={(val) =>
                        updateActiveContent((prev) => ({
                          ...prev,
                          guidingStyle: { ...prev.guidingStyle, title: val },
                        }))
                      }
                      placeholder="Judul Seksi..."
                      multiline
                    />
                  </h2>
                  <p className="text-sm sm:text-base text-[#5E6965] leading-relaxed font-sans">
                    <InlineEditable
                      value={activeContent.guidingStyle.subtitle}
                      onChange={(val) =>
                        updateActiveContent((prev) => ({
                          ...prev,
                          guidingStyle: { ...prev.guidingStyle, subtitle: val },
                        }))
                      }
                      placeholder="Subjudul..."
                      multiline
                    />
                  </p>
                </div>

                {/* 3 Pilar Layanan (In-Place Editable) */}
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
                    const hoverBorder =
                      idx === 0
                        ? "hover:border-[#1878B8]"
                        : idx === 1
                        ? "hover:border-[#0C8C5E]"
                        : "hover:border-[#E67E22]";

                    return (
                      <div
                        key={pillar.id || idx}
                        className={`group relative p-6 sm:p-8 rounded-2xl bg-white border border-[#EBE9E6] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between ${hoverBorder}`}
                      >
                        <div className="space-y-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 ${iconBoxBg}`}>
                            {renderIcon(pillar.icon, iconColor)}
                          </div>

                          <h3 className="font-serif text-xl font-bold text-[#08090A] leading-snug">
                            <InlineEditable
                              value={pillar.title}
                              onChange={(val) =>
                                updateActiveContent((prev) => {
                                  const next = [...prev.guidingStyle.pillars];
                                  next[idx] = { ...next[idx], title: val };
                                  return {
                                    ...prev,
                                    guidingStyle: { ...prev.guidingStyle, pillars: next },
                                  };
                                })
                              }
                              placeholder="Judul Pilar..."
                            />
                          </h3>

                          <p className="text-sm sm:text-base text-[#5E6965] leading-relaxed">
                            <InlineEditable
                              value={pillar.description}
                              onChange={(val) =>
                                updateActiveContent((prev) => {
                                  const next = [...prev.guidingStyle.pillars];
                                  next[idx] = { ...next[idx], description: val };
                                  return {
                                    ...prev,
                                    guidingStyle: { ...prev.guidingStyle, pillars: next },
                                  };
                                })
                              }
                              placeholder="Keterangan pilar..."
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
                SEKSI 4: STANDAR KENYAMANAN & KEPASTIAN (TRUST STRIP)
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
                        <div className="space-y-1 flex-1">
                          <h4 className="font-bold text-sm sm:text-base text-[#08090A]">
                            <InlineEditable
                              value={item.title}
                              onChange={(val) =>
                                updateActiveContent((prev) => {
                                  const next = [...prev.trustStrip];
                                  next[idx] = { ...next[idx], title: val };
                                  return { ...prev, trustStrip: next };
                                })
                              }
                              placeholder="Judul Kepercayaan..."
                            />
                          </h4>
                          <p className="text-xs sm:text-sm text-[#5E6965] leading-relaxed">
                            <InlineEditable
                              value={item.description}
                              onChange={(val) =>
                                updateActiveContent((prev) => {
                                  const next = [...prev.trustStrip];
                                  next[idx] = { ...next[idx], description: val };
                                  return { ...prev, trustStrip: next };
                                })
                              }
                              placeholder="Deskripsi..."
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
                SEKSI 5: BOTTOM CTA BANNER (IN-PLACE EDITABLE)
                ======================================================== */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0F4C81] to-[#1878B8] text-white p-8 sm:p-12 lg:p-16 text-center shadow-xl">
                <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
                <div className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full bg-[#E67E22]/20 blur-2xl pointer-events-none" />

                <div className="relative max-w-2xl mx-auto space-y-4">
                  <span className="inline-block px-3 py-1 rounded-full bg-white/15 text-xs font-semibold tracking-wider uppercase text-white/90 border border-white/20">
                    {lang === "en" ? "Direct Local Consultation" : "Konsultasi Rute Langsung"}
                  </span>

                  <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal leading-tight">
                    <InlineEditable
                      value={activeContent.cta.title}
                      onChange={(val) =>
                        updateActiveContent((prev) => ({
                          ...prev,
                          cta: { ...prev.cta, title: val },
                        }))
                      }
                      placeholder="Judul Banner CTA..."
                      multiline
                    />
                  </h2>

                  <p className="text-sm sm:text-base text-white/90 leading-relaxed max-w-xl mx-auto">
                    <InlineEditable
                      value={activeContent.cta.subtitle}
                      onChange={(val) =>
                        updateActiveContent((prev) => ({
                          ...prev,
                          cta: { ...prev.cta, subtitle: val },
                        }))
                      }
                      placeholder="Subjudul Banner CTA..."
                      multiline
                    />
                  </p>

                  <div className="pt-4">
                    <div className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl bg-[#E67E22] text-white font-medium text-sm shadow-[0_4px_16px_rgba(230,126,34,0.3)]">
                      <MessageCircle className="w-4.5 h-4.5" />
                      <InlineEditable
                        value={activeContent.cta.buttonText}
                        onChange={(val) =>
                          updateActiveContent((prev) => ({
                            ...prev,
                            cta: { ...prev.cta, buttonText: val },
                          }))
                        }
                        placeholder="Teks Tombol..."
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      <Footer />

      {/* ========================================================
          FLOATING ACTION BAR DI BAGIAN BAWAH LAYAR (STICKY BAR)
          ======================================================== */}
      <aside aria-label="Floating Control Bar" className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-3xl">
        <div className="bg-white/95 backdrop-blur-md border border-[#EBE9E6] shadow-2xl rounded-2xl p-2.5 sm:p-3 px-4 sm:px-5 flex flex-wrap items-center justify-between gap-3">
          {/* Status Penyimpanan */}
          <div className="flex items-center gap-2">
            {hasUnsavedChanges ? (
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-[#E67E22] text-xs font-semibold border border-amber-200">
                <span className="w-2 h-2 rounded-full bg-[#E67E22] animate-pulse" />
                <span>Ada Perubahan Belum Disimpan</span>
              </span>
            ) : (
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E8F6F0] text-[#0C8C5E] text-xs font-semibold border border-[#0C8C5E]/20">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>
                  {lastSavedTime ? `Tersimpan (${lastSavedTime})` : "Tersimpan di Cloud Firestore"}
                </span>
              </span>
            )}
          </div>

          {/* Quick Toggle Bahasa di Floating Bar */}
          <div className="hidden sm:flex items-center gap-1 bg-[#FAF8F5] p-1 rounded-xl border border-[#EBE9E6]">
            <button
              type="button"
              onClick={() => setLang("id")}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                lang === "id" ? "bg-[#1878B8] text-white" : "text-[#5E6965]"
              }`}
            >
              ID
            </button>
            <button
              type="button"
              onClick={() => setLang("en")}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                lang === "en" ? "bg-[#1878B8] text-white" : "text-[#5E6965]"
              }`}
            >
              EN
            </button>
          </div>

          {/* Tombol Utama Simpan Perubahan */}
          <div className="flex items-center gap-2">
            <Link
              href="/about"
              target="_blank"
              className="p-2.5 rounded-xl border border-[#D3D8D6] bg-white text-[#5E6965] hover:text-[#1878B8] transition-colors"
              title="Lihat Halaman Publik"
            >
              <ExternalLink className="w-4 h-4" />
            </Link>

            <button
              type="button"
              onClick={handleSaveToFirestore}
              disabled={isSaving}
              className="inline-flex items-center justify-center gap-2 h-11 px-5 sm:px-6 rounded-xl bg-[#1878B8] hover:bg-[#0F4C81] text-white text-xs sm:text-sm font-semibold shadow-[0_2px_12px_rgba(24,120,184,0.35)] transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Menyimpan ke Firestore...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Simpan Perubahan ke Firestore</span>
                </>
              )}
            </button>
          </div>
        </div>
      </aside>

      {/* ========================================================
          MODAL UPLOAD GAMBAR INTERAKTIF (CLOUDINARY)
          ======================================================== */}
      {imageModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl border border-[#EBE9E6] shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-5 border-b border-[#EBE9E6] flex items-center justify-between">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#08090A]">
                  {imageModal.title}
                </h3>
                <p className="text-xs text-[#5E6965] mt-0.5">
                  Terintegrasi langsung dengan Cloudinary CDN (WebP otomatis)
                </p>
              </div>
              <button
                type="button"
                onClick={() => setImageModal((prev) => ({ ...prev, isOpen: false }))}
                className="p-1.5 rounded-full text-[#5E6965] hover:text-[#08090A] hover:bg-[#FAF8F5]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-4">
              {/* Pratinjau Foto */}
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-stone-100 border border-[#EBE9E6]">
                {imageModal.url ? (
                  <Image
                    src={imageModal.url}
                    alt={imageModal.alt || "Pratinjau Foto"}
                    fill
                    className="object-cover object-center"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-[#5E6965]">
                    Belum ada gambar
                  </div>
                )}
                {isUploadingImage && (
                  <div className="absolute inset-0 bg-black/50 backdrop-blur-xs flex flex-col items-center justify-center text-white gap-2">
                    <Loader2 className="w-7 h-7 animate-spin text-[#1878B8]" />
                    <span className="text-xs font-semibold">Mengunggah ke Cloudinary...</span>
                  </div>
                )}
              </div>

              {/* Error Alert */}
              {uploadError && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{uploadError}</span>
                </div>
              )}

              {/* Success Alert */}
              {uploadSuccess && (
                <div className="p-3 rounded-xl bg-[#E8F6F0] border border-[#0C8C5E]/30 text-[#0C8C5E] text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-[#0C8C5E]" />
                  <span>{uploadSuccess}</span>
                </div>
              )}

              {/* Tombol Upload File Komputer */}
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploadingImage}
                  className="w-full h-11 px-4 rounded-xl border-2 border-dashed border-[#1878B8] hover:bg-[#EBF5FB] text-[#1878B8] text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
                >
                  <Upload className="w-4 h-4" />
                  <span>Unggah Foto dari Komputer (Cloudinary)</span>
                </button>
              </div>

              {/* Input URL Gambar Manual */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#08090A]">
                  Atau Tempel URL Gambar
                </label>
                <input
                  type="text"
                  value={imageModal.url}
                  onChange={(e) =>
                    setImageModal((prev) => ({ ...prev, url: e.target.value }))
                  }
                  placeholder="https://images.unsplash.com/... atau https://res.cloudinary.com/..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D3D8D6] text-xs focus:outline-hidden focus:border-[#1878B8] bg-[#FAF8F5]"
                />
              </div>

              {/* Input Alt Text */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#08090A]">
                  Deskripsi Gambar (Alt Text)
                </label>
                <input
                  type="text"
                  value={imageModal.alt}
                  onChange={(e) =>
                    setImageModal((prev) => ({ ...prev, alt: e.target.value }))
                  }
                  placeholder="Deskripsi foto..."
                  className="w-full px-3.5 py-2 rounded-xl border border-[#D3D8D6] text-xs focus:outline-hidden focus:border-[#1878B8] bg-[#FAF8F5]"
                />
              </div>

              {/* Input Caption (Khusus Profil) */}
              {imageModal.target === "profile" && (
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#08090A]">
                    Teks Caption di Bawah Foto
                  </label>
                  <input
                    type="text"
                    value={imageModal.caption || ""}
                    onChange={(e) =>
                      setImageModal((prev) => ({ ...prev, caption: e.target.value }))
                    }
                    placeholder="Gede Sudiartana — Lahir, tumbuh..."
                    className="w-full px-3.5 py-2 rounded-xl border border-[#D3D8D6] text-xs focus:outline-hidden focus:border-[#1878B8] bg-[#FAF8F5]"
                  />
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-[#EBE9E6] flex items-center justify-end gap-2 bg-[#FAF8F5]">
              <button
                type="button"
                onClick={() => setImageModal((prev) => ({ ...prev, isOpen: false }))}
                className="h-10 px-4 rounded-xl border border-[#D3D8D6] bg-white text-[#5E6965] hover:text-[#08090A] text-xs font-medium cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={applyImageChanges}
                className="h-10 px-5 rounded-xl bg-[#1878B8] hover:bg-[#0F4C81] text-white text-xs font-semibold shadow-xs cursor-pointer"
              >
                Terapkan Foto
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
