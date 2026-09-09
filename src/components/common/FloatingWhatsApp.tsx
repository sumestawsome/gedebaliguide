"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { MessageCircle, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getGeneralConsultationUrl } from "@/lib/whatsapp";

export default function FloatingWhatsApp() {
  const pathname = usePathname();
  const [showTooltip, setShowTooltip] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);
  const waUrl = getGeneralConsultationUrl("floating");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setHasScrolled(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hide on admin routes
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2.5">
      {/* Mini greeting tooltip speech bubble */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.92 }}
            transition={{ duration: 0.25 }}
            className="relative max-w-xs rounded-2xl bg-white p-3.5 shadow-2xl border border-stone-200 text-stone-800"
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setShowTooltip(false)}
              className="absolute -top-2 -left-2 flex h-5 w-5 items-center justify-center rounded-full bg-stone-100 text-stone-500 hover:bg-stone-200 border border-stone-200 transition-colors shadow-xs"
              aria-label="Tutup pesan bantuan"
            >
              <X className="h-3 w-3" />
            </button>

            <div className="flex items-start gap-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs">
                WA
              </div>
              <div className="space-y-0.5 text-xs">
                <p className="font-bold text-stone-900 flex items-center gap-1">
                  <span>Konsultasi Tur Gratis</span>
                  <Sparkles className="h-3 w-3 text-amber-500" />
                </p>
                <p className="text-stone-600 leading-snug">
                  Punya rencana liburan ke Bali? Chat langsung dengan Bli Gede ya!
                </p>
              </div>
            </div>

            {/* Triangle pointer */}
            <div className="absolute -bottom-1.5 right-6 h-3 w-3 rotate-45 bg-white border-b border-r border-stone-200" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat WhatsApp dengan Gede Sudiartana"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="group relative flex h-14 w-14 sm:h-15 sm:w-15 items-center justify-center rounded-full bg-emerald-600 text-white shadow-xl shadow-emerald-700/30 hover:bg-emerald-500 transition-colors focus:outline-none focus:ring-4 focus:ring-emerald-400/40"
      >
        {/* Radar ping animation */}
        <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-80" />
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-400 border-2 border-white" />
        </span>

        <MessageCircle className="h-7 w-7 transition-transform group-hover:rotate-12" />

        {/* Hover label for desktop */}
        <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-lg bg-stone-900 px-3 py-1.5 text-xs font-semibold text-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity md:block">
          Tanya via WhatsApp
        </span>
      </motion.a>
    </div>
  );
}
