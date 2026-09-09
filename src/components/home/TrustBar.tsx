"use client";

import React from "react";
import Link from "next/link";
import { Award, ShieldCheck, Car, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { mockTrustItems, mockGuideProfile } from "@/data/mock-data";
import { TrustItemConfig, TrustItem } from "@/types";

interface TrustBarProps {
  items?: (TrustItemConfig | TrustItem)[];
}

export default function TrustBar({ items }: TrustBarProps = {}) {
  const trustList = items && items.length > 0 ? items : mockTrustItems;

  const getItemExtras = (id: string, iconName: string) => {
    if (id === "license" || iconName === "ShieldCheck") {
      return {
        badge: `No. ${mockGuideProfile.licenseNumber}`,
        badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
        linkUrl: "/about#kredensial-hpi",
        linkText: "Lihat Kredensial HPI",
      };
    }
    if (id === "vehicle" || iconName === "Car") {
      return {
        badge: "Toyota Veloz & Innova AC Dingin",
        badgeColor: "bg-amber-50 text-amber-800 border-amber-200",
        linkUrl: "/about#standar-armada",
        linkText: "Lihat Standar Armada",
      };
    }
    return {
      badge: "Sejak 2015 • 1.200+ Tamu",
      badgeColor: "bg-blue-50 text-blue-800 border-blue-200",
      linkUrl: "/about",
      linkText: "Baca Profil Bli Gede",
    };
  };

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
        {/* 3 Main Trust Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-stone-200">
          {trustList.map((item, idx) => {
            const config = getIconConfig(item.icon);
            const extras = getItemExtras(item.id, item.icon);

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
                <div className="space-y-2 min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span
                      className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${config.tagColor}`}
                    >
                      {config.tag}
                    </span>
                    <span
                      className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-semibold ${extras.badgeColor}`}
                    >
                      {extras.badge}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-900 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {item.description}
                  </p>

                  <Link
                    href={extras.linkUrl}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 hover:text-blue-800 transition-colors pt-1 group"
                  >
                    <span>{extras.linkText}</span>
                    <ArrowRight className="h-3 w-3 transform group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Micro Guarantee Bar */}
        <div className="mt-8 pt-5 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-600 font-medium">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>Lisensi Resmi HPI Bali No. {mockGuideProfile.licenseNumber}</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>Mobil MPV Ber-AC Dingin & Bebas Asap Rokok</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>100% Tur Privat Bebas Toko Komisi</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>Air Mineral Dingin & Pengisi Daya HP Gratis</span>
          </div>
        </div>
      </div>
    </section>
  );
}
