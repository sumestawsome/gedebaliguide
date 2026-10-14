"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Upload,
  X,
  Loader2,
  AlertCircle,
  AlertTriangle,
  Sparkles,
  CheckCircle2,
  Image as ImageIcon,
  Link as LinkIcon,
} from "lucide-react";
import { toast } from "sonner";

export interface CloudinaryUploadModalProps {
  isOpen: boolean;
  title: string;
  initialUrl: string;
  initialAlt: string;
  initialCaption?: string;
  showCaption?: boolean;
  folder?: string;
  onClose: () => void;
  onApply: (data: {
    url: string;
    alt: string;
    caption?: string;
    publicId?: string;
  }) => void;
}

/**
 * Deteksi cerdas tautan halaman web Unsplash (bukan direct image CDN)
 * Contoh halaman: https://unsplash.com/photos/bali-temple-pYomR6K2_yA
 * atau: https://unsplash.com/photos/photo-1537996194471-e657df975ab4
 */
function detectUnsplashPage(inputUrl: string): {
  isPage: boolean;
  convertedUrl?: string;
} {
  const trimmed = (inputUrl || "").trim();
  if (!trimmed) return { isPage: false };

  // Jika sudah direct images.unsplash.com, maka sudah benar
  if (trimmed.includes("images.unsplash.com")) {
    return { isPage: false };
  }

  const match = trimmed.match(
    /(?:https?:\/\/)?(?:www\.)?unsplash\.com\/(?:[a-z]{2}\/)?(?:photos|foto)\/([a-zA-Z0-9_\-\.]+)/i
  );

  if (match && match[1]) {
    const slugOrId = match[1];

    if (slugOrId.includes("photo-")) {
      const photoId = slugOrId.substring(slugOrId.indexOf("photo-"));
      return {
        isPage: true,
        convertedUrl: `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=1600&q=80`,
      };
    }

    const parts = slugOrId.split("-");
    const lastPart = parts[parts.length - 1];
    const photoId = lastPart && lastPart.length >= 8 ? lastPart : slugOrId;

    return {
      isPage: true,
      convertedUrl: `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=1600&q=80`,
    };
  }

  return { isPage: false };
}

export default function CloudinaryUploadModal({
  isOpen,
  title,
  initialUrl,
  initialAlt,
  initialCaption = "",
  showCaption = false,
  folder = "gede-bali/about",
  onClose,
  onApply,
}: CloudinaryUploadModalProps) {
  const [url, setUrl] = useState(initialUrl);
  const [alt, setAlt] = useState(initialAlt);
  const [caption, setCaption] = useState(initialCaption);

  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("Mengunggah foto...");
  const [previewError, setPreviewError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sinkronkan state saat modal dibuka dengan prop baru
  useEffect(() => {
    if (isOpen) {
      setUrl(initialUrl || "");
      setAlt(initialAlt || "");
      setCaption(initialCaption || "");
      setPreviewError(false);
      setIsUploading(false);
    }
  }, [isOpen, initialUrl, initialAlt, initialCaption]);

  if (!isOpen) return null;

  // Tangani perubahan URL manual
  const handleUrlChange = (newVal: string) => {
    setUrl(newVal);
    setPreviewError(false);
  };

  // Konversi cerdas Unsplash
  const unsplashInfo = detectUnsplashPage(url);
  const handleConvertUnsplash = (converted: string) => {
    setUrl(converted);
    setPreviewError(false);
    toast.success("Tautan dikonversi ke images.unsplash.com!", {
      description: "Pratinjau gambar siap dimuat.",
    });
  };

  // 1. Upload File Lokal dari Komputer via Form Buffer Stream
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 15 * 1024 * 1024) {
      toast.error("Ukuran Berkas Terlalu Besar", {
        description: "Ukuran foto melebihi batas 15MB. Harap pilih foto yang lebih ringan.",
      });
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Format Berkas Tidak Valid", {
        description: "Harap pilih berkas gambar yang didukung (JPG, PNG, atau WebP).",
      });
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setIsUploading(true);
    setUploadStatus("Mengunggah berkas ke Cloudinary CDN...");

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000);

    const uploadPromise = (async () => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const res = await fetch("/api/cloudinary/upload", {
        method: "POST",
        body: formData,
        signal: controller.signal,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Gagal mengunggah foto ke Cloudinary.");
      }

      const finalUrl = data.url.startsWith("http://")
        ? data.url.replace(/^http:\/\//i, "https://")
        : data.url;

      setUrl(finalUrl);
      setPreviewError(false);
      return data;
    })();

    toast.promise(uploadPromise, {
      loading: "Mengunggah berkas foto ke Cloudinary...",
      success: "Foto berhasil diunggah & dioptimasi ke Cloudinary CDN!",
      error: (err: any) => {
        if (err?.name === "AbortError") {
          return "Waktu unggah habis. Silakan coba kembali.";
        }
        return err?.message || "Terjadi kendala saat mengunggah gambar ke Cloudinary.";
      },
    });

    try {
      await uploadPromise;
    } catch (err: any) {
      console.error("Upload error:", err);
    } finally {
      clearTimeout(timeoutId);
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // 2. Upload Remote URL Langsung ke Cloudinary
  const uploadRemoteUrlToCloudinary = async (
    targetUrl: string
  ): Promise<{ success: boolean; url: string; publicId?: string }> => {
    let cleanUrl = targetUrl.trim();
    if (!/^https?:\/\//i.test(cleanUrl)) {
      cleanUrl = `https://${cleanUrl}`;
    }

    // Jika sudah di res.cloudinary.com, tidak perlu diunggah ulang
    if (cleanUrl.includes("res.cloudinary.com")) {
      return { success: true, url: cleanUrl };
    }

    setIsUploading(true);
    setUploadStatus("Mengunggah URL eksternal ke Cloudinary CDN...");

    const res = await fetch("/api/cloudinary/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        image: cleanUrl,
        folder,
      }),
    });

    const data = await res.json();
    if (res.ok && data.success && data.url) {
      const secureUrl = data.url.startsWith("http://")
        ? data.url.replace(/^http:\/\//i, "https://")
        : data.url;
      return { success: true, url: secureUrl, publicId: data.publicId };
    }

    throw new Error(data.error || "Gagal memproses URL jarak jauh di Cloudinary.");
  };

  // Tombol aksi manual: "Unggah URL Ini ke Cloudinary Sekarang"
  const handleManualUploadRemote = async () => {
    if (!url.trim()) {
      toast.error("Masukkan URL gambar terlebih dahulu.");
      return;
    }

    try {
      const res = await uploadRemoteUrlToCloudinary(url);
      setUrl(res.url);
      setPreviewError(false);
      toast.success("Foto berhasil diunggah & disimpan di Cloudinary CDN!");
    } catch (err: any) {
      console.warn("Gagal mengunggah remote URL:", err);
      toast.error(err?.message || "Gagal mengunggah URL ke Cloudinary.");
    } finally {
      setIsUploading(false);
    }
  };

  // 3. Konfirmasi & Terapkan Foto
  const handleApply = async () => {
    if (!url.trim()) {
      toast.error("Harap pilih atau tempel tautan gambar terlebih dahulu.");
      return;
    }

    let cleanUrl = url.trim();
    if (!/^https?:\/\//i.test(cleanUrl)) {
      cleanUrl = `https://${cleanUrl}`;
    }

    // Jika tautan adalah halaman web Unsplash dan belum dikonversi, konversikan dulu
    if (unsplashInfo.isPage && unsplashInfo.convertedUrl) {
      cleanUrl = unsplashInfo.convertedUrl;
    }

    // Jika URL belum tersimpan di Cloudinary, otomatis unggah ke Cloudinary CDN
    if (!cleanUrl.includes("res.cloudinary.com")) {
      const uploadToastId = toast.loading(
        "Mengunggah & mengoptimasi gambar ke Cloudinary CDN..."
      );
      try {
        const result = await uploadRemoteUrlToCloudinary(cleanUrl);
        toast.success("Gambar berhasil disimpan secara terpusat di Cloudinary!", {
          id: uploadToastId,
        });

        onApply({
          url: result.url,
          alt: alt.trim() || "Foto Bli Gede",
          caption: showCaption ? caption.trim() : undefined,
          publicId: result.publicId,
        });
        onClose();
        return;
      } catch (uploadErr: any) {
        console.warn("Upload remote fallback warning:", uploadErr);
        toast.warning(
          "Unggah ke Cloudinary terkendala, menggunakan URL langsung sebagai cadangan.",
          { id: uploadToastId }
        );
        // Fallback anggun ke URL langsung agar pekerjaan admin tidak terblokir
        onApply({
          url: cleanUrl,
          alt: alt.trim() || "Foto Bli Gede",
          caption: showCaption ? caption.trim() : undefined,
        });
        onClose();
        return;
      } finally {
        setIsUploading(false);
      }
    }

    // Jika sudah di Cloudinary
    onApply({
      url: cleanUrl,
      alt: alt.trim() || "Foto Bli Gede",
      caption: showCaption ? caption.trim() : undefined,
    });
    onClose();
  };

  const isCloudinaryUrl = url.includes("res.cloudinary.com");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl border border-[#EBE9E6] shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="p-5 border-b border-[#EBE9E6] flex items-center justify-between">
          <div>
            <h3 className="font-serif text-lg font-bold text-[#08090A]">{title}</h3>
            <p className="text-xs text-[#5E6965] mt-0.5">
              Mendukung berkas komputer, link Unsplash, maupun CDN eksternal
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-[#5E6965] hover:text-[#08090A] hover:bg-[#FAF8F5] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Pratinjau Foto dengan Penanganan onError Tangguh (HTML img unoptimized) */}
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-stone-100 border border-[#EBE9E6]">
            {url && !previewError ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={url}
                alt={alt || "Pratinjau Foto"}
                onLoad={() => setPreviewError(false)}
                onError={() => setPreviewError(true)}
                className="w-full h-full object-cover object-center"
              />
            ) : previewError ? (
              <div className="w-full h-full flex flex-col items-center justify-center p-5 text-center text-[#5E6965] bg-[#FAF8F5]">
                <AlertCircle className="w-7 h-7 text-[#E67E22] mb-1.5" />
                <p className="text-xs font-bold text-[#08090A]">
                  Pratinjau gambar tidak dapat dimuat
                </p>
                <p className="text-[11px] text-[#5E6965] mt-1 max-w-sm leading-relaxed">
                  Tautan mungkin salah, belum lengkap, atau bukan berkas gambar langsung.
                  Pastikan link merupakan berkas gambar (.jpg, .png, .webp) atau tautan
                  images.unsplash.com yang valid.
                </p>
              </div>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-xs text-[#5E6965] gap-1.5">
                <ImageIcon className="w-8 h-8 text-[#D3D8D6]" />
                <span>Belum ada gambar yang dipilih</span>
              </div>
            )}

            {/* Overlay Loading Unggah */}
            {isUploading && (
              <div className="absolute inset-0 bg-black/55 backdrop-blur-xs flex flex-col items-center justify-center text-white gap-2 z-10">
                <Loader2 className="w-7 h-7 animate-spin text-[#1878B8]" />
                <span className="text-xs font-semibold">{uploadStatus}</span>
              </div>
            )}
          </div>

          {/* Status Cloudinary CDN Badge */}
          {isCloudinaryUrl && (
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#0C8C5E] bg-[#E8F6F0] px-3 py-1.5 rounded-xl border border-[#0C8C5E]/20">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <span>Foto tersimpan & dioptimasi di Cloudinary CDN resmi</span>
            </div>
          )}

          {/* Tombol Unggah File Lokal */}
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
              disabled={isUploading}
              className="w-full h-11 px-4 rounded-xl border-2 border-dashed border-[#1878B8] hover:bg-[#EBF5FB] text-[#1878B8] text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
            >
              <Upload className="w-4 h-4" />
              <span>Unggah Foto dari Komputer (Cloudinary)</span>
            </button>
          </div>

          {/* Input URL Gambar Eksternal */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#08090A] flex items-center gap-1.5">
                <LinkIcon className="w-3.5 h-3.5 text-[#1878B8]" />
                <span>Atau Tempel URL Gambar Eksternal</span>
              </label>
              {url && !isCloudinaryUrl && (
                <button
                  type="button"
                  onClick={handleManualUploadRemote}
                  disabled={isUploading}
                  className="text-[11px] font-semibold text-[#1878B8] hover:underline disabled:opacity-50 cursor-pointer"
                >
                  Unggah ke Cloudinary Sekarang
                </button>
              )}
            </div>
            <input
              type="text"
              value={url}
              onChange={(e) => handleUrlChange(e.target.value)}
              placeholder="https://images.unsplash.com/... atau https://res.cloudinary.com/..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#D3D8D6] text-xs focus:outline-hidden focus:border-[#1878B8] bg-[#FAF8F5]"
            />
          </div>

          {/* Deteksi Cerdas Tautan Halaman Unsplash */}
          {unsplashInfo.isPage && (
            <div className="p-3.5 rounded-2xl bg-[#FFF8EB] border border-[#E67E22]/30 space-y-2 animate-in fade-in duration-200">
              <div className="flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-[#E67E22] shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <p className="font-bold text-[#93480B]">
                    Tautan Halaman Web Unsplash Terdeteksi
                  </p>
                  <p className="text-[#93480B]/90 text-[11px] leading-relaxed">
                    Tautan yang ditempel adalah halaman situs (<code>unsplash.com/photos/...</code>),
                    bukan berkas gambar langsung.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {unsplashInfo.convertedUrl && (
                  <button
                    type="button"
                    onClick={() => handleConvertUnsplash(unsplashInfo.convertedUrl!)}
                    className="h-8 px-3 rounded-lg bg-[#E67E22] hover:bg-[#CF6D17] text-white text-[11px] font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Konversikan Otomatis ke images.unsplash.com</span>
                  </button>
                )}
                <span className="text-[10px] text-[#93480B]/80 italic">
                  Tips: Pada Unsplash, Klik Kanan foto &gt; Pilih &ldquo;Copy Image Address&rdquo;.
                </span>
              </div>
            </div>
          )}

          {/* Input Alt Text */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#08090A]">
              Deskripsi Gambar (Alt Text)
            </label>
            <input
              type="text"
              value={alt}
              onChange={(e) => setAlt(e.target.value)}
              placeholder="Deskripsi foto (misal: Potret Bli Gede di Pura)..."
              className="w-full px-3.5 py-2 rounded-xl border border-[#D3D8D6] text-xs focus:outline-hidden focus:border-[#1878B8] bg-[#FAF8F5]"
            />
          </div>

          {/* Input Caption opsional */}
          {showCaption && (
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#08090A]">
                Teks Caption di Bawah Foto
              </label>
              <input
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Gede Sudiartana — Lahir, tumbuh..."
                className="w-full px-3.5 py-2 rounded-xl border border-[#D3D8D6] text-xs focus:outline-hidden focus:border-[#1878B8] bg-[#FAF8F5]"
              />
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#EBE9E6] flex items-center justify-between bg-[#FAF8F5]">
          <span className="text-[11px] text-[#5E6965]">
            {!isCloudinaryUrl && url.trim()
              ? "URL eksternal akan otomatis diunggah ke Cloudinary CDN"
              : "Foto siap diterapkan"}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isUploading}
              className="h-10 px-4 rounded-xl border border-[#D3D8D6] bg-white text-[#5E6965] hover:text-[#08090A] text-xs font-medium cursor-pointer disabled:opacity-50"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={handleApply}
              disabled={isUploading}
              className="h-10 px-5 rounded-xl bg-[#1878B8] hover:bg-[#0F4C81] text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Memproses...</span>
                </>
              ) : (
                <span>Terapkan Foto</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
