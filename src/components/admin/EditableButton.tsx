"use client";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Palette, Check, Sparkles, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ButtonVariant,
  BUTTON_PRESETS,
  getButtonVariantClasses,
} from "@/lib/button-variants";

export interface EditableButtonProps {
  /** Nilai teks tombol */
  value: string;
  /** Callback saat teks tombol diubah */
  onChange: (newText: string) => void;
  /** Varian gaya tombol saat ini */
  variant?: ButtonVariant;
  /** Callback saat varian tombol diubah */
  onVariantChange?: (newVariant: ButtonVariant) => void;
  /** Varian default jika belum ada yang terpilih */
  defaultVariant?: ButtonVariant;
  /** Ikon kiri opsional */
  icon?: React.ReactNode;
  /** Ikon kanan opsional */
  rightIcon?: React.ReactNode;
  /** Placeholder teks saat kosong */
  placeholder?: string;
  /** ClassName kustom opsional untuk tombol */
  className?: string;
  /** Label keterangan untuk tooltip */
  label?: string;
}

/**
 * Komponen EditableButton untuk mode Admin:
 * - Menggabungkan inline text editor (klik langsung teks untuk mengedit).
 * - Floating trigger pill untuk membuka popover pemilih varian gaya/warna tombol resmi.
 * - Render Popover menggunakan React Portal (ke document.body) untuk menghindari clipping dari overflow-hidden.
 * - Auto-detect ruang layar (buka ke atas jika ruang bawah tidak mencukupi).
 * - Real-time preview perubahan gaya dan sinkronisasi ke state editor.
 */
export default function EditableButton({
  value,
  onChange,
  variant,
  onVariantChange,
  defaultVariant = "ocean-blue-solid",
  icon,
  rightIcon,
  placeholder = "Teks Tombol...",
  className = "",
  label,
}: EditableButtonProps) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [coords, setCoords] = useState<{
    top: number;
    left: number;
    openUpwards: boolean;
    width: number;
  }>({
    top: 0,
    left: 0,
    openUpwards: false,
    width: 320,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  const currentVariant = variant || defaultVariant;
  const activePreset =
    BUTTON_PRESETS.find((p) => p.id === currentVariant) || BUTTON_PRESETS[0];

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sinkronisasi teks lokal saat nilai props berubah
  useEffect(() => {
    if (textRef.current && textRef.current.innerText !== value) {
      textRef.current.innerText = value || "";
    }
  }, [value]);

  // Kalkulasi koordinat floating portal popover
  const updatePosition = () => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const popoverWidth = Math.min(320, window.innerWidth - 24);
    const estimatedHeight = 400;

    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    const openUpwards = spaceBelow < estimatedHeight && spaceAbove > spaceBelow;

    let left = rect.right - popoverWidth;
    if (left < 12) left = 12;
    if (left + popoverWidth > window.innerWidth - 12) {
      left = window.innerWidth - popoverWidth - 12;
    }

    let top: number;
    if (openUpwards) {
      top = rect.top - 8;
    } else {
      top = rect.bottom + 8;
    }

    setCoords({
      top,
      left,
      openUpwards,
      width: popoverWidth,
    });
  };

  // Update koordinat saat popover dibuka, scroll, atau resize layar
  useEffect(() => {
    if (!isPopoverOpen) return;

    updatePosition();

    const handleScrollOrResize = () => {
      updatePosition();
    };

    window.addEventListener("scroll", handleScrollOrResize, true);
    window.addEventListener("resize", handleScrollOrResize);

    return () => {
      window.removeEventListener("scroll", handleScrollOrResize, true);
      window.removeEventListener("resize", handleScrollOrResize);
    };
  }, [isPopoverOpen]);

  // Listener outside-click dan Esc untuk menutup popover portal
  useEffect(() => {
    if (!isPopoverOpen) return;

    function handleClickOutside(event: MouseEvent | TouchEvent) {
      const target = event.target as Node;
      if (
        triggerRef.current?.contains(target) ||
        containerRef.current?.contains(target) ||
        popoverRef.current?.contains(target)
      ) {
        return;
      }
      setIsPopoverOpen(false);
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsPopoverOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isPopoverOpen]);

  const variantClasses = getButtonVariantClasses(currentVariant, defaultVariant);
  const isOutline = currentVariant.includes("outline");

  // Styling inline editor adaptif terhadap kontras warna tombol
  const textEditorClasses = isOutline
    ? "outline-hidden rounded px-1.5 py-0.5 -mx-1 transition-all cursor-text hover:bg-black/5 hover:ring-1 hover:ring-black/15 focus:ring-2 focus:ring-[#1878B8] focus:bg-white focus:text-[#08090A]"
    : "outline-hidden rounded px-1.5 py-0.5 -mx-1 transition-all cursor-text hover:bg-white/15 hover:ring-1 hover:ring-white/30 focus:ring-2 focus:ring-white/80 focus:bg-white/20 focus:text-white";

  return (
    <div
      ref={containerRef}
      className="relative inline-flex items-center group/editbtn"
      title={label || "Klik teks untuk mengedit, atau klik ikon palet untuk mengganti varian warna"}
    >
      {/* Tombol Utama dengan Gaya Real-Time */}
      <div
        className={`inline-flex items-center justify-center gap-2 h-11 px-5 py-2.5 rounded-xl font-medium text-sm transition-all relative select-none ${variantClasses} ${className}`}
      >
        {/* Ikon Kiri jika ada */}
        {icon && <span className="shrink-0 pointer-events-none">{icon}</span>}

        {/* Inline Text Editor */}
        <span
          ref={textRef}
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => {
            const newText = e.currentTarget.innerText.trim();
            if (newText !== value) {
              onChange(newText || value);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              e.currentTarget.blur();
            }
          }}
          className={textEditorClasses}
          data-placeholder={placeholder}
        >
          {value}
        </span>

        {/* Ikon Kanan jika ada */}
        {rightIcon && <span className="shrink-0 pointer-events-none">{rightIcon}</span>}
      </div>

      {/* Floating Pill Trigger untuk Popover Pemilih Varian Gaya */}
      {onVariantChange && (
        <button
          ref={triggerRef}
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setIsPopoverOpen((prev) => !prev);
          }}
          title="Ubah gaya dan warna tombol"
          aria-label="Pilih varian gaya tombol"
          className={`absolute -top-3 -right-2.5 z-20 flex items-center gap-1 px-2 py-0.5 rounded-full bg-white text-[#08090A] shadow-md border border-[#EBE9E6] text-[11px] font-semibold hover:bg-[#FAF8F5] hover:scale-105 transition-all cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-[#1878B8] ${
            isPopoverOpen
              ? "ring-2 ring-[#1878B8] bg-[#F4F9FD]"
              : "opacity-90 group-hover/editbtn:opacity-100"
          }`}
        >
          <Palette className="w-3 h-3 text-[#1878B8]" />
          <span className="text-[10px] text-[#5E6965] font-medium hidden sm:inline">
            Gaya
          </span>
          <span
            className="w-2 h-2 rounded-full border border-black/10 shrink-0"
            style={{ backgroundColor: activePreset.colorHex }}
          />
          <ChevronDown
            className={`w-2.5 h-2.5 text-[#5E6965] transition-transform duration-150 ${
              isPopoverOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      )}

      {/* Popover Menu Pilihan Varian Gaya Tombol via React Portal */}
      {mounted &&
        typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {isPopoverOpen && (
              <motion.div
                ref={popoverRef}
                initial={{
                  opacity: 0,
                  scale: 0.95,
                  y: coords.openUpwards ? 8 : -8,
                }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{
                  opacity: 0,
                  scale: 0.95,
                  y: coords.openUpwards ? 8 : -8,
                }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                style={{
                  position: "fixed",
                  top: coords.openUpwards ? undefined : `${coords.top}px`,
                  bottom: coords.openUpwards
                    ? `${Math.max(12, window.innerHeight - coords.top)}px`
                    : undefined,
                  left: `${coords.left}px`,
                  width: `${coords.width}px`,
                  zIndex: 9999,
                }}
                onClick={(e) => e.stopPropagation()}
                className="rounded-2xl bg-white/98 backdrop-blur-md border border-[#EBE9E6] shadow-[0_20px_50px_rgba(0,0,0,0.18)] p-3 text-left font-sans text-xs max-h-[85vh] flex flex-col"
              >
                {/* Header Popover */}
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#F0EFEB] shrink-0">
                  <div className="flex items-center gap-1.5 font-bold text-[#08090A]">
                    <Palette className="w-3.5 h-3.5 text-[#1878B8]" />
                    <span>Pilih Gaya Tombol</span>
                  </div>
                  <span className="text-[10px] text-[#5E6965] uppercase font-mono tracking-wider">
                    Design System
                  </span>
                </div>

                {/* Daftar Preset Varian Resmi */}
                <div className="space-y-1.5 overflow-y-auto pr-1 flex-1 min-h-0">
                  {BUTTON_PRESETS.map((preset) => {
                    const isSelected = preset.id === currentVariant;

                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => {
                          if (onVariantChange) {
                            onVariantChange(preset.id);
                          }
                          setIsPopoverOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 p-2 rounded-xl text-left transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[#EAF5FC] border border-[#1878B8]/30 shadow-xs ring-1 ring-[#1878B8]/20"
                            : "hover:bg-[#FAF8F5] border border-transparent"
                        }`}
                      >
                        {/* Visual Badge Preview */}
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 shadow-xs ${preset.badgeBg} ${preset.badgeText} ${
                            preset.badgeBorder || "border border-transparent"
                          }`}
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                        </div>

                        {/* Informasi Varian */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <span
                              className={`font-bold text-xs truncate ${
                                isSelected ? "text-[#0F4C81]" : "text-[#08090A]"
                              }`}
                            >
                              {preset.name}
                            </span>
                            {isSelected && (
                              <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-[#1878B8] shrink-0">
                                <Check className="w-3 h-3" />
                                Aktif
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-[#5E6965] leading-tight truncate">
                            {preset.description}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Footer Popover */}
                <div className="mt-2.5 pt-2 border-t border-[#F0EFEB] flex items-center justify-between text-[10px] text-[#8C9794] shrink-0">
                  <span>Preview berganti langsung</span>
                  <button
                    type="button"
                    onClick={() => setIsPopoverOpen(false)}
                    className="text-[#1878B8] font-semibold hover:underline cursor-pointer"
                  >
                    Tutup
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
}
