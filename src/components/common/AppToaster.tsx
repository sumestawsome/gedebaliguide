"use client";

import React from "react";
import { Toaster as SonnerToaster } from "sonner";
import { CheckCircle2, AlertCircle, AlertTriangle, Info, Loader2 } from "lucide-react";

/**
 * Global Sonner Toaster configured to match Gede Bali Guide Design System:
 * - Desktop: Top-right floating below the navbar (offset top 80px, right 24px)
 * - Mobile: Top-center floating below the header (offset top 76px)
 * - Visuals: Soft rounded cards (rounded-2xl), subtle shadow, Inter typography,
 *   Bali Emerald (#0C8C5E) for success, Ocean Blue (#1878B8) for actions/loading,
 *   Sunset Amber (#E67E22) for warnings.
 */
export default function AppToaster() {
  return (
    <SonnerToaster
      position="top-right"
      offset={{ top: "80px", right: "24px" }}
      mobileOffset={{ top: "76px", left: "16px", right: "16px" }}
      duration={3500}
      visibleToasts={4}
      expand={false}
      icons={{
        success: <CheckCircle2 className="w-4 h-4 text-[#0C8C5E] shrink-0" />,
        error: <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />,
        warning: <AlertTriangle className="w-4 h-4 text-[#E67E22] shrink-0" />,
        info: <Info className="w-4 h-4 text-[#1878B8] shrink-0" />,
        loading: <Loader2 className="w-4 h-4 text-[#1878B8] animate-spin shrink-0" />,
      }}
      toastOptions={{
        className:
          "group !bg-white !text-[#08090A] !border !border-[#EBE9E6] !shadow-[0_12px_32px_-4px_rgba(0,0,0,0.08),0_4px_8px_-2px_rgba(0,0,0,0.03)] !rounded-2xl !p-3.5 !font-sans",
        classNames: {
          title: "!text-xs sm:!text-sm !font-semibold !text-[#08090A] !leading-snug",
          description: "!text-xs !text-[#5E6965] !leading-relaxed !mt-1",
          actionButton:
            "!bg-[#1878B8] hover:!bg-[#0F4C81] !text-white !text-xs !font-semibold !px-3 !py-1.5 !rounded-xl !transition-all !cursor-pointer !shadow-xs",
          cancelButton:
            "!bg-white hover:!bg-[#FAF8F5] !text-[#5E6965] hover:!text-[#08090A] !border !border-[#EBE9E6] !text-xs !font-semibold !px-3 !py-1.5 !rounded-xl !transition-all !cursor-pointer",
          success: "!border-[#0C8C5E]/25",
          error: "!border-red-200",
          warning: "!border-[#E67E22]/25",
          info: "!border-[#1878B8]/25",
        },
      }}
    />
  );
}
