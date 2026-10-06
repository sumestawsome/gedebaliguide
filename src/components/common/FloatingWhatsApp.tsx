"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { MessageCircle, X, Sparkles, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getGeneralConsultationUrl } from "@/lib/whatsapp";
import { handleWhatsAppClick } from "@/lib/lead-tracker";

export default function FloatingWhatsApp() {
  const pathname = usePathname();
  const [showTooltip, setShowTooltip] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleMenuChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ open?: boolean }>;
      setIsMobileMenuOpen(!!customEvent.detail?.open);
    };

    window.addEventListener("mobileMenuChange", handleMenuChange);
    return () => {
      window.removeEventListener("mobileMenuChange", handleMenuChange);
    };
  }, []);

  useEffect(() => {
    setMounted(true);
    try {
      const isDismissed = sessionStorage.getItem("wa_tooltip_dismissed");
      if (!isDismissed) {
        setShowTooltip(true);
        // Otomatis menghilang (fade-out/hidden) setelah 3000ms (3 detik)
        const autoHideTimer = setTimeout(() => {
          setShowTooltip(false);
        }, 3000);
        return () => clearTimeout(autoHideTimer);
      }
    } catch {
      setShowTooltip(true);
      const autoHideTimer = setTimeout(() => {
        setShowTooltip(false);
      }, 3000);
      return () => clearTimeout(autoHideTimer);
    }
  }, []);

  const handleDismissTooltip = () => {
    setShowTooltip(false);
    try {
      sessionStorage.setItem("wa_tooltip_dismissed", "true");
    } catch {
      // ignore storage errors
    }
  };

  // Hide on admin routes or when mobile drawer menu is open
  if (pathname?.startsWith("/admin") || isMobileMenuOpen) {
    return null;
  }

  // Contextual helper copy based on active route
  const getContextualCopy = () => {
    if (pathname?.startsWith("/tours/")) {
      return {
        title: "Ingin Tanya Tur Ini?",
        desc: "Konsultasikan rute, jadwal, atau custom request langsung dengan Bli Gede.",
      };
    }
    if (pathname === "/tours") {
      return {
        title: "Bingung Pilih Rute?",
        desc: "Chat Bli Gede untuk rekomendasi tur privat sesuai minat Anda.",
      };
    }
    if (pathname === "/contact" || pathname === "/faq") {
      return {
        title: "Respon Lebih Cepat",
        desc: "Butuh jawaban segera? Bli Gede online dan siap membalas di WhatsApp.",
      };
    }
    return {
      title: "Konsultasi Tur Gratis",
      desc: "Punya rencana liburan ke Bali? Chat langsung dengan Bli Gede ya!",
    };
  };

  const copy = getContextualCopy();
  const waUrl = getGeneralConsultationUrl("floating");

  if (!mounted) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2.5">
      {/* Mini greeting tooltip speech bubble */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.92 }}
            transition={{ duration: 0.25 }}
            className="relative max-w-xs rounded-2xl bg-white p-3.5 shadow-2xl border border-stone-200 text-stone-800"
          >
            {/* Close button */}
            <button
              type="button"
              onClick={handleDismissTooltip}
              className="absolute -top-2 -left-2 flex h-5 w-5 items-center justify-center rounded-full bg-stone-100 text-stone-500 hover:bg-stone-200 border border-stone-200 transition-colors shadow-xs cursor-pointer"
              aria-label="Tutup pesan bantuan"
            >
              <X className="h-3 w-3" />
            </button>

            <div className="flex items-start gap-2.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#E8F7F1] text-[#006B49] font-bold text-xs">
                <MessageCircle className="h-4.5 w-4.5" />
              </div>
              <div className="space-y-0.5 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-stone-900">
                  <span>{copy.title}</span>
                  <Sparkles className="h-3 w-3 text-[#E67E22] shrink-0" />
                </div>
                <p className="text-stone-600 leading-snug">
                  {copy.desc}
                </p>
                <div className="pt-1 flex items-center gap-1 text-[10px] font-semibold text-[#0C8C5E]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0C8C5E] animate-pulse" />
                  <span>Online • Respon Cepat</span>
                </div>
              </div>
            </div>

            {/* Triangle pointer */}
            <div className="absolute -bottom-1.5 right-6 h-3 w-3 rotate-45 bg-white border-b border-r border-stone-200" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button
        type="button"
        onClick={() => handleWhatsAppClick(`Floating Widget (${pathname || "/"})`)}
        aria-label="Chat WhatsApp dengan Gede Sudiartana"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="group relative flex h-14 w-14 sm:h-15 sm:w-15 items-center justify-center rounded-full bg-[#0C8C5E] hover:bg-[#006B49] text-white shadow-xl shadow-[#0C8C5E]/30 transition-colors focus:outline-none focus:ring-4 focus:ring-[#0C8C5E]/40 cursor-pointer"
      >
        {/* Radar ping animation */}
        <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0C8C5E] opacity-80" />
          <span className="relative inline-flex rounded-full h-4 w-4 bg-[#0C8C5E] border-2 border-white" />
        </span>

        <MessageCircle className="h-7 w-7 transition-transform group-hover:rotate-12" />

        {/* Hover label for desktop */}
        <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-lg bg-stone-900 px-3 py-1.5 text-xs font-semibold text-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity md:block">
          Tanya via WhatsApp
        </span>
      </motion.button>
    </div>
  );
}
