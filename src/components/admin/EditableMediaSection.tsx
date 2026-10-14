"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Layers,
  Image as ImageIcon,
  Upload,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  X,
  Check,
  Sparkles,
  Sliders,
  Maximize2,
  LayoutGrid,
} from "lucide-react";
import {
  MediaSectionData,
  MediaItem,
  MediaMode,
  SingleImageTemplate,
  MultiImageTemplate,
} from "@/types";
import MediaRenderer from "@/components/common/MediaRenderer";
import CloudinaryUploadModal from "@/components/admin/CloudinaryUploadModal";
import { toast } from "sonner";

export interface EditableMediaSectionProps {
  media: MediaSectionData;
  onChange: (updated: MediaSectionData) => void;
  aspectRatio?: string;
  className?: string;
  priority?: boolean;
  label?: string;
}

export default function EditableMediaSection({
  media,
  onChange,
  aspectRatio = "aspect-[4/5]",
  className = "",
  priority = false,
  label = "Atur Foto & Tata Letak",
}: EditableMediaSectionProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"template" | "photos">("template");

  // State untuk Cloudinary upload modal
  const [cloudinaryModal, setCloudinaryModal] = useState<{
    isOpen: boolean;
    mode: "replace-single" | "add-multi" | "replace-index";
    targetIndex?: number;
    initialUrl?: string;
    initialAlt?: string;
  }>({
    isOpen: false,
    mode: "replace-single",
  });

  // Handler pergantian mode (single vs multi)
  const handleModeChange = (newMode: MediaMode) => {
    const updated: MediaSectionData = {
      ...media,
      mode: newMode,
    };
    onChange(updated);
    toast.info(`Mode beralih ke: ${newMode === "single" ? "1 Foto" : "Banyak Foto (Galeri)"}`);
  };

  // Handler pergantian template single
  const handleSingleTemplateChange = (tpl: SingleImageTemplate) => {
    const updated: MediaSectionData = {
      ...media,
      singleTemplate: tpl,
    };
    onChange(updated);
    toast.success("Template tata letak diperbarui!");
  };

  // Handler pergantian template multi
  const handleMultiTemplateChange = (tpl: MultiImageTemplate) => {
    const updated: MediaSectionData = {
      ...media,
      multiTemplate: tpl,
    };
    onChange(updated);
    toast.success("Template galeri diperbarui!");
  };

  // Handler trigger upload Cloudinary
  const openCloudinary = (
    mode: "replace-single" | "add-multi" | "replace-index",
    targetIndex?: number
  ) => {
    const targetImage =
      targetIndex !== undefined ? media.images[targetIndex] : media.images[0];

    setCloudinaryModal({
      isOpen: true,
      mode,
      targetIndex,
      initialUrl: targetImage?.url || "",
      initialAlt: targetImage?.alt || "",
    });
  };

  // Handler hasil upload Cloudinary
  const handleCloudinaryApply = (data: {
    url: string;
    alt: string;
    caption?: string;
    publicId?: string;
  }) => {
    if (cloudinaryModal.mode === "replace-single") {
      const newImages: MediaItem[] = [
        {
          id: media.images[0]?.id || "img-1",
          url: data.url,
          alt: data.alt || media.images[0]?.alt || "Foto Bli Gede",
          caption: data.caption || media.caption || "",
          publicId: data.publicId || media.images[0]?.publicId,
        },
        ...media.images.slice(1),
      ];
      onChange({ ...media, images: newImages });
      toast.success("Foto utama berhasil diperbarui!");
    } else if (cloudinaryModal.mode === "add-multi") {
      const newItem: MediaItem = {
        id: `img-${Date.now()}`,
        url: data.url,
        alt: data.alt || `Foto ${media.images.length + 1}`,
        caption: data.caption || "",
        publicId: data.publicId,
      };
      onChange({ ...media, images: [...media.images, newItem] });
      toast.success("Foto baru berhasil ditambahkan ke galeri!");
    } else if (
      cloudinaryModal.mode === "replace-index" &&
      cloudinaryModal.targetIndex !== undefined
    ) {
      const newImages = [...media.images];
      newImages[cloudinaryModal.targetIndex] = {
        ...newImages[cloudinaryModal.targetIndex],
        url: data.url,
        alt: data.alt || newImages[cloudinaryModal.targetIndex].alt,
        publicId: data.publicId || newImages[cloudinaryModal.targetIndex].publicId,
      };
      onChange({ ...media, images: newImages });
      toast.success("Foto berhasil diperbarui!");
    }

    setCloudinaryModal((prev) => ({ ...prev, isOpen: false }));
  };

  // Handler reorder / urutan foto
  const handleMoveImage = (fromIndex: number, direction: "up" | "down") => {
    const toIndex = direction === "up" ? fromIndex - 1 : fromIndex + 1;
    if (toIndex < 0 || toIndex >= media.images.length) return;

    const newImages = [...media.images];
    const [moved] = newImages.splice(fromIndex, 1);
    newImages.splice(toIndex, 0, moved);

    onChange({ ...media, images: newImages });
    toast.info("Urutan foto diperbarui.");
  };

  // Handler hapus foto
  const handleDeleteImage = (index: number) => {
    if (media.images.length <= 1) {
      toast.error("Minimal harus ada 1 foto di dalam daftar.");
      return;
    }
    const newImages = media.images.filter((_, idx) => idx !== index);
    onChange({ ...media, images: newImages });
    toast.success("Foto dihapus dari galeri.");
  };

  // Update caption atau alt teks foto tertentu
  const handleUpdateImageMeta = (index: number, field: "alt" | "caption", value: string) => {
    const newImages = [...media.images];
    newImages[index] = {
      ...newImages[index],
      [field]: value,
    };
    onChange({ ...media, images: newImages });
  };

  return (
    <div className="relative group/media-container">
      {/* Visual Render Komponen Aktif */}
      <MediaRenderer
        media={media}
        aspectRatio={aspectRatio}
        className={className}
        priority={priority}
      />

      {/* Floating Control Pill di atas frame gambar */}
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30">
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 hover:bg-white text-[#08090A] hover:text-[#1878B8] border border-[#EBE9E6] hover:border-[#1878B8] shadow-lg text-xs font-semibold backdrop-blur-md transition-all cursor-pointer group-hover/media-container:scale-102"
          title="Klik untuk memilih mode 1 foto / banyak foto dan template visual"
        >
          <Sliders className="w-3.5 h-3.5 text-[#1878B8]" />
          <span>{label}</span>
          <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-[#0C8C5E]" />
        </button>
      </div>

      {/* Modal / Dialog Pengaturan Media */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl border border-[#EBE9E6] shadow-2xl overflow-hidden font-sans max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-[#EBE9E6] flex items-center justify-between bg-[#FAF8F5]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#1878B8] text-white flex items-center justify-center shadow-xs">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif text-base font-bold text-[#08090A]">
                    Pengaturan Media & Template
                  </h3>
                  <p className="text-[11px] text-[#5E6965]">
                    Pilih antara mode 1 foto atau galeri banyak foto beserta variasi tata letaknya
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-xl text-[#5E6965] hover:text-[#08090A] hover:bg-white border border-transparent hover:border-[#EBE9E6] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6">
              {/* Bagian 1: Pilih Mode Media (Segmented Switcher) */}
              <div>
                <label className="block text-xs font-bold text-[#08090A] mb-2 uppercase tracking-wider">
                  1. Pilih Mode Tampilan Foto
                </label>
                <div className="grid grid-cols-2 gap-3 p-1 rounded-2xl bg-[#FAF8F5] border border-[#EBE9E6]">
                  <button
                    type="button"
                    onClick={() => handleModeChange("single")}
                    className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      media.mode === "single"
                        ? "bg-white text-[#1878B8] shadow-xs border border-[#EBE9E6]"
                        : "text-[#5E6965] hover:text-[#08090A]"
                    }`}
                  >
                    <ImageIcon className="w-4 h-4" />
                    <span>Mode 1 Foto (Tunggal)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleModeChange("multi")}
                    className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      media.mode === "multi"
                        ? "bg-white text-[#1878B8] shadow-xs border border-[#EBE9E6]"
                        : "text-[#5E6965] hover:text-[#08090A]"
                    }`}
                  >
                    <LayoutGrid className="w-4 h-4" />
                    <span>Mode Banyak Foto (Galeri)</span>
                  </button>
                </div>
              </div>

              {/* Bagian 2: Pilihan Template Visual (Menyesuaikan Otomatis dengan Mode Aktif) */}
              <div>
                <label className="block text-xs font-bold text-[#08090A] mb-2 uppercase tracking-wider">
                  2. Pilih Gaya Template Tata Letak (
                  {media.mode === "single" ? "Tampilan Tunggal" : "Tampilan Galeri"})
                </label>

                {media.mode === "single" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* Template 1: Classic Editorial Card */}
                    <button
                      type="button"
                      onClick={() => handleSingleTemplateChange("classic-editorial")}
                      className={`text-left p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                        media.singleTemplate === "classic-editorial"
                          ? "border-[#1878B8] bg-[#EBF5FB]/50 shadow-xs"
                          : "border-[#EBE9E6] hover:border-stone-300 bg-white"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-bold text-[#08090A]">
                            Classic Editorial
                          </span>
                          {media.singleTemplate === "classic-editorial" && (
                            <Check className="w-3.5 h-3.5 text-[#1878B8]" />
                          )}
                        </div>
                        <p className="text-[11px] text-[#5E6965] leading-relaxed">
                          Satu kartu vertikal proporsional (4:5) dengan bayangan lembut dan label
                          minimalis.
                        </p>
                      </div>
                      <span className="mt-3 text-[10px] font-semibold text-[#1878B8] uppercase">
                        Default Standar
                      </span>
                    </button>

                    {/* Template 2: Ambient Layered Glow */}
                    <button
                      type="button"
                      onClick={() => handleSingleTemplateChange("ambient-glow")}
                      className={`text-left p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                        media.singleTemplate === "ambient-glow"
                          ? "border-[#1878B8] bg-[#EBF5FB]/50 shadow-xs"
                          : "border-[#EBE9E6] hover:border-stone-300 bg-white"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-bold text-[#08090A]">
                            Ambient Layer Glow
                          </span>
                          {media.singleTemplate === "ambient-glow" && (
                            <Check className="w-3.5 h-3.5 text-[#1878B8]" />
                          )}
                        </div>
                        <p className="text-[11px] text-[#5E6965] leading-relaxed">
                          Aksen kotak bayangan hangat bertumpuk di belakang foto untuk kedalaman 3D
                          mewah.
                        </p>
                      </div>
                      <span className="mt-3 text-[10px] font-semibold text-[#0C8C5E] uppercase">
                        Efek Kedalaman
                      </span>
                    </button>

                    {/* Template 3: Polaroid Travel Frame */}
                    <button
                      type="button"
                      onClick={() => handleSingleTemplateChange("polaroid-frame")}
                      className={`text-left p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                        media.singleTemplate === "polaroid-frame"
                          ? "border-[#1878B8] bg-[#EBF5FB]/50 shadow-xs"
                          : "border-[#EBE9E6] hover:border-stone-300 bg-white"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-bold text-[#08090A]">
                            Polaroid Travel Frame
                          </span>
                          {media.singleTemplate === "polaroid-frame" && (
                            <Check className="w-3.5 h-3.5 text-[#1878B8]" />
                          )}
                        </div>
                        <p className="text-[11px] text-[#5E6965] leading-relaxed">
                          Bingkai putih jurnal perjalanan otentik dengan badge stempel lisensi HPI
                          Bali.
                        </p>
                      </div>
                      <span className="mt-3 text-[10px] font-semibold text-[#E67E22] uppercase">
                        Jurnal Perjalanan
                      </span>
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* Template 2A: Stacked Deck Carousel */}
                    <button
                      type="button"
                      onClick={() => handleMultiTemplateChange("stacked-deck")}
                      className={`text-left p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                        media.multiTemplate === "stacked-deck"
                          ? "border-[#1878B8] bg-[#EBF5FB]/50 shadow-xs"
                          : "border-[#EBE9E6] hover:border-stone-300 bg-white"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-bold text-[#08090A]">
                            Stacked Deck Carousel
                          </span>
                          {media.multiTemplate === "stacked-deck" && (
                            <Check className="w-3.5 h-3.5 text-[#1878B8]" />
                          )}
                        </div>
                        <p className="text-[11px] text-[#5E6965] leading-relaxed">
                          Kartu bertumpuk ala Beranda dengan efek rotasi miring & indikator titik
                          geser.
                        </p>
                      </div>
                      <span className="mt-3 text-[10px] font-semibold text-[#1878B8] uppercase">
                        Interaktif 3D
                      </span>
                    </button>

                    {/* Template 2B: Editorial Bento Collage */}
                    <button
                      type="button"
                      onClick={() => handleMultiTemplateChange("editorial-bento")}
                      className={`text-left p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                        media.multiTemplate === "editorial-bento"
                          ? "border-[#1878B8] bg-[#EBF5FB]/50 shadow-xs"
                          : "border-[#EBE9E6] hover:border-stone-300 bg-white"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-bold text-[#08090A]">
                            Editorial Bento Collage
                          </span>
                          {media.multiTemplate === "editorial-bento" && (
                            <Check className="w-3.5 h-3.5 text-[#1878B8]" />
                          )}
                        </div>
                        <p className="text-[11px] text-[#5E6965] leading-relaxed">
                          Kolase bergaya majalah: 1 foto utama besar + 2 foto pendukung tersusun
                          rapi.
                        </p>
                      </div>
                      <span className="mt-3 text-[10px] font-semibold text-[#0C8C5E] uppercase">
                        Gaya Majalah
                      </span>
                    </button>

                    {/* Template 2C: Smooth Swipe Slider */}
                    <button
                      type="button"
                      onClick={() => handleMultiTemplateChange("smooth-slider")}
                      className={`text-left p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                        media.multiTemplate === "smooth-slider"
                          ? "border-[#1878B8] bg-[#EBF5FB]/50 shadow-xs"
                          : "border-[#EBE9E6] hover:border-stone-300 bg-white"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-bold text-[#08090A]">
                            Smooth Swipe Slider
                          </span>
                          {media.multiTemplate === "smooth-slider" && (
                            <Check className="w-3.5 h-3.5 text-[#1878B8]" />
                          )}
                        </div>
                        <p className="text-[11px] text-[#5E6965] leading-relaxed">
                          Galeri geser horizontal ramah layar ponsel dengan panah & deretan
                          thumbnail.
                        </p>
                      </div>
                      <span className="mt-3 text-[10px] font-semibold text-[#E67E22] uppercase">
                        Mobile Friendly
                      </span>
                    </button>
                  </div>
                )}
              </div>

              {/* Bagian 3: Manajemen Foto & Upload Cloudinary */}
              <div className="border-t border-[#EBE9E6] pt-5">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs font-bold text-[#08090A] uppercase tracking-wider">
                    3. Manajemen Foto ({media.images.length} Foto Terdaftar)
                  </label>
                  {media.mode === "multi" && (
                    <button
                      type="button"
                      onClick={() => openCloudinary("add-multi")}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1878B8] text-white text-xs font-semibold hover:bg-[#0F4C81] transition-all cursor-pointer shadow-xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Tambah Foto Baru</span>
                    </button>
                  )}
                </div>

                {media.mode === "single" ? (
                  /* Single Mode Photo Box */
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#FAF8F5] border border-[#EBE9E6]">
                    <div className="relative w-20 h-24 rounded-xl overflow-hidden border border-[#D3D8D6] bg-stone-200 shrink-0">
                      <Image
                        src={media.images[0]?.url || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800"}
                        alt={media.images[0]?.alt || "Foto"}
                        fill
                        className="object-cover object-center"
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#08090A]">Foto Utama</span>
                        <button
                          type="button"
                          onClick={() => openCloudinary("replace-single", 0)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-white/80 border border-[#D3D8D6] text-xs font-semibold text-[#1878B8] shadow-xs transition-colors cursor-pointer"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>Ganti Foto Cloudinary</span>
                        </button>
                      </div>
                      <input
                        type="text"
                        value={media.images[0]?.alt || ""}
                        onChange={(e) => handleUpdateImageMeta(0, "alt", e.target.value)}
                        placeholder="Deskripsi alt foto (misal: Potret Bli Gede di Pura)..."
                        className="w-full text-xs px-3 py-1.5 rounded-lg border border-[#EBE9E6] bg-white focus:outline-hidden focus:border-[#1878B8]"
                      />
                    </div>
                  </div>
                ) : (
                  /* Multi Mode Photos List */
                  <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                    {media.images.map((img, idx) => (
                      <div
                        key={img.id || idx}
                        className="flex items-center gap-3 p-3 rounded-2xl bg-[#FAF8F5] border border-[#EBE9E6]"
                      >
                        {/* Nomor Urut & Thumbnail */}
                        <span className="text-xs font-bold text-[#5E6965] w-5 text-center">
                          #{idx + 1}
                        </span>
                        <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-[#D3D8D6] bg-stone-200 shrink-0">
                          <Image
                            src={img.url}
                            alt={img.alt || `Foto ${idx + 1}`}
                            fill
                            className="object-cover object-center"
                          />
                        </div>

                        {/* Input Judul / Alt Teks */}
                        <div className="flex-1">
                          <input
                            type="text"
                            value={img.alt || ""}
                            onChange={(e) => handleUpdateImageMeta(idx, "alt", e.target.value)}
                            placeholder={`Label foto ${idx + 1}...`}
                            className="w-full text-xs px-3 py-1.5 rounded-lg border border-[#EBE9E6] bg-white focus:outline-hidden focus:border-[#1878B8]"
                          />
                        </div>

                        {/* Tombol Reorder & Delete */}
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleMoveImage(idx, "up")}
                            disabled={idx === 0}
                            className="p-1.5 rounded-lg text-[#5E6965] hover:bg-white border border-transparent hover:border-[#EBE9E6] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                            title="Geser ke atas"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleMoveImage(idx, "down")}
                            disabled={idx === media.images.length - 1}
                            className="p-1.5 rounded-lg text-[#5E6965] hover:bg-white border border-transparent hover:border-[#EBE9E6] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                            title="Geser ke bawah"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => openCloudinary("replace-index", idx)}
                            className="p-1.5 rounded-lg text-[#1878B8] hover:bg-white border border-transparent hover:border-[#EBE9E6] cursor-pointer"
                            title="Ganti foto ini"
                          >
                            <Upload className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteImage(idx)}
                            className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 cursor-pointer"
                            title="Hapus foto ini"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-[#EBE9E6] flex items-center justify-between bg-[#FAF8F5]">
              <span className="text-xs text-[#5E6965]">
                Perubahan langsung terlihat di pratinjau halaman
              </span>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-5 py-2 rounded-xl bg-[#1878B8] hover:bg-[#0F4C81] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                Tutup & Terapkan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cloudinary Upload Modal */}
      <CloudinaryUploadModal
        isOpen={cloudinaryModal.isOpen}
        title={
          cloudinaryModal.mode === "add-multi"
            ? "Tambah Foto Baru ke Galeri"
            : "Ganti Foto dengan Cloudinary"
        }
        initialUrl={cloudinaryModal.initialUrl || ""}
        initialAlt={cloudinaryModal.initialAlt || ""}
        onClose={() => setCloudinaryModal((prev) => ({ ...prev, isOpen: false }))}
        onApply={handleCloudinaryApply}
      />
    </div>
  );
}
