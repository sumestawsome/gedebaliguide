"use client";

import React from "react";
import { Award, ShieldCheck, Car, Sparkles, Check } from "lucide-react";
import { motion } from "framer-motion";
import { mockTrustItems } from "@/data/mock-data";

export default function TrustBar() {
  const getIconConfig = (iconName: string) => {
    switch (iconName) {
      case "Award":
        return {
          icon: <Award className="h-6 w-6 text-blue-700" />,
          bgColor: "bg-blue-50 border-blue-100",
          tag: "Berpengalaman",
          tagColor: "text-blue-700 bg-blue-50/80 border-blue-200",
        };
      case "ShieldCheck":
        return {
          icon: <ShieldCheck className="h-6 w-6 text-emerald-600" />,
          bgColor: "bg-emerald-50 border-emerald-100",
          tag: "Terverifikasi HPI",
          tagColor: "text-emerald-700 bg-emerald-50/80 border-emerald-200",
        };
      case "Car":
        return {
          icon: <Car className="h-6 w-6 text-amber-600" />,
          bgColor: "bg-amber-50 border-amber-100",
          tag: "Standar VIP",
          tagColor: "text-amber-700 bg-amber-50/80 border-amber-200",
        };
      default:
        return {
          icon: <ShieldCheck className="h-6 w-6 text-blue-700" />,
          bgColor: "bg-stone-50 border-stone-100",
          tag: "Jaminan Kualitas",
          tagColor: "text-stone-700 bg-stone-50 border-stone-200",
        };
    }
  };

  return (
    <section className="relative z-20 -mt-6 sm:-mt-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-stone-200/90 bg-white/95 p-6 sm:p-8 shadow-xl shadow-stone-200/60 backdrop-blur-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-stone-200">
          {mockTrustItems.map((item, idx) => {
            const config = getIconConfig(item.icon);
            return (
              <motion.div
                key={item.id}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                className={`flex flex-col sm:flex-row items-start gap-4 ${
                  idx > 0 ? "pt-6 md:pt-0 md:pl-8" : ""
                }`}
              >
                {/* Icon Box */}
                <div
                  className={`flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl border p-3 shadow-xs ${config.bgColor}`}
                >
                  {config.icon}
                </div>

                {/* Text Content */}
                <div className="space-y-1.5 min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${config.tagColor}`}
                    >
                      {config.tag}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-900 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
