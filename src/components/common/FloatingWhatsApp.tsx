"use client";

import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { mockGuideProfile } from "@/data/mock-data";

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end gap-3">
      {/* Mini greeting bubble */}
      {showTooltip && (
        <div className="relative hidden sm:flex items-center gap-2 rounded-2xl bg-white p-3.5 shadow-2xl border border-stone-200 text-xs text-stone-800 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute -top-2 -left-2 flex h-5 w-5 items-center justify-center rounded-full bg-stone-200 text-stone-600 hover:bg-stone-300"
            aria-label="Tutup pesan"
          >
            <X className="h-3 w-3" />
          </button>
          <div>
            <p className="font-semibold text-stone-900">Ada pertanyaan seputar Bali?</p>
            <p className="text-stone-500">Ngobrol langsung dengan Bli Gede</p>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={`https://wa.me/${mockGuideProfile.whatsappNumber}?text=Halo%20Bli%20Gede,%20saya%20tertarik%20untuk%20konsultasi%20tur%20privat%20di%20Bali.`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat WhatsApp dengan Gede"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-white shadow-xl hover:bg-emerald-500 hover:scale-110 active:scale-95 transition-all duration-200"
      >
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white"></span>
        </span>
        <MessageCircle className="h-7 w-7" />
      </a>
    </div>
  );
}
