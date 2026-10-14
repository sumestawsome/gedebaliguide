"use client";

import React from "react";
import { Save, Loader2 } from "lucide-react";

export interface AdminSaveBarProps {
  isSaving: boolean;
  hasUnsavedChanges: boolean;
  lastSavedTime: string | null;
  saveStatus?: { type: "idle" | "success" | "error"; message?: string };
  onSave: () => void;
  lang?: "id" | "en";
}

/**
 * Floating / Sticky Save Action Bar untuk mode Admin:
 * - Mobile (< 640px): Ramping menempel di bawah (compact sticky bottom bar), status ringkas, tombol cepat.
 * - Desktop (>= 640px): Floating card dengan rincian waktu penyimpanan lengkap dan feedback visual.
 */
export default function AdminSaveBar({
  isSaving,
  hasUnsavedChanges,
  lastSavedTime,
  onSave,
  lang = "id",
}: AdminSaveBarProps) {
  return (
    <aside
      aria-label="Admin Save Action Bar"
      className="fixed bottom-0 sm:bottom-6 inset-x-0 z-40 w-full sm:max-w-2xl sm:mx-auto px-0 sm:px-4"
    >
      <div className="bg-white/95 backdrop-blur-xl border-t sm:border border-[#EBE9E6] shadow-2xl rounded-none sm:rounded-2xl px-3 py-2 sm:p-4 flex items-center justify-between gap-2 sm:gap-3">
        {/* Status Kiri */}
        <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
          <div
            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full shrink-0 ${
              hasUnsavedChanges
                ? "bg-amber-500 animate-pulse ring-2 ring-amber-500/20"
                : "bg-[#0C8C5E]"
            }`}
          />
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-bold text-[#08090A] truncate">
              {hasUnsavedChanges
                ? "Ada Perubahan"
                : "Semua Tersimpan"}
            </span>
            <span className="hidden sm:inline text-[11px] text-[#5E6965] truncate">
              {lastSavedTime
                ? `Terakhir disimpan pukul ${lastSavedTime} WITA`
                : `Mode Edit: ${lang.toUpperCase()}`}
            </span>
          </div>
        </div>

        {/* Tombol Simpan Kanan */}
        <button
          type="button"
          onClick={onSave}
          disabled={isSaving}
          className={`h-9 sm:h-11 px-3 sm:px-5 rounded-xl text-xs font-bold flex items-center gap-1.5 sm:gap-2 transition-all duration-200 cursor-pointer shadow-xs disabled:opacity-60 disabled:cursor-not-allowed shrink-0 ${
            hasUnsavedChanges
              ? "bg-[#1878B8] hover:bg-[#0F4C81] text-white ring-2 ring-[#1878B8]/30 scale-102"
              : "bg-[#FAF8F5] hover:bg-[#FAF8F5]/80 text-[#5E6965] border border-[#D3D8D6]"
          }`}
        >
          {isSaving ? (
            <>
              <Loader2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin text-white" />
              <span className="sm:hidden">Menyimpan...</span>
              <span className="hidden sm:inline">Menyimpan ke Cloud Firestore...</span>
            </>
          ) : (
            <>
              <Save className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="sm:hidden">Simpan</span>
              <span className="hidden sm:inline">Simpan Perubahan ke Firestore</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
