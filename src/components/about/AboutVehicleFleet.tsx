"use client";

import React from "react";
import Image from "next/image";
import { Car, Wind, Sparkles, BatteryCharging, Shield, Check, Droplets, Umbrella, Baby } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutVehicleFleet() {
  const fleetFeatures = [
    {
      icon: <Wind className="h-5 w-5 text-blue-600" />,
      title: "AC Double Blower Dingin & Segar",
      desc: "Menjamin seluruh baris penumpang tetap sejuk di tengah hangatnya iklim tropis Bali. Kabin selalu bebas asap rokok.",
    },
    {
      icon: <BatteryCharging className="h-5 w-5 text-amber-600" />,
      title: "Fast Charger Smartphone di Kabin",
      desc: "Tersedia kabel multi-port (Type-C, iPhone Lightning) di baris depan & tengah agar baterai ponsel Anda selalu siap memotret.",
    },
    {
      icon: <Droplets className="h-5 w-5 text-blue-700" />,
      title: "Air Mineral Dingin & Tisu Higienis",
      desc: "Gratis botol air mineral dingin setiap hari tur untuk menjaga hidrasi Anda dan keluarga selama bertamasya.",
    },
    {
      icon: <Umbrella className="h-5 w-5 text-emerald-600" />,
      title: "Payung Besar & Kotak P3K",
      desc: "Siap siaga menghadapi cuaca tropis Bali yang dinamis, mulai dari terik siang hari hingga rintik hujan pegunungan.",
    },
    {
      icon: <Baby className="h-5 w-5 text-purple-600" />,
      title: "Baby Car Seat (Permintaan Khusus)",
      desc: "Membawa balita? Kami sediakan kursi anak yang aman dan nyaman (harap beri tahu saat konsultasi via WhatsApp).",
    },
    {
      icon: <Shield className="h-5 w-5 text-emerald-700" />,
      title: "Servis Berkala Resmi Astra",
      desc: "Kondisi rem, ban, suspensi, dan mesin selalu dicek ketat sebelum melibas rute tanjakan seperti Kintamani atau Bedugul.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white border-b border-stone-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-200 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-blue-800">
            <Car className="h-3.5 w-3.5 text-blue-600" />
            <span>Standar Kendaraan Pariwisata</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 leading-tight">
            Armada Mobil MPV Privat Ber-AC Dingin & Terawat Maksimal
          </h2>

          <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-sans">
            Kenyamanan di jalan adalah kunci liburan yang menyenangkan. Kami memastikan armada mobil yang Anda tumpangi selalu harum, higienis, ber-AC dingin, dan 100% privat khusus rombongan Anda.
          </p>
        </div>

        {/* Visual Showcase + Features */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Vehicle Image & Capacity Specs */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-stone-200 aspect-[16/10] bg-stone-900">
              <Image
                src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=900&auto=format&fit=crop&q=80"
                alt="Interior dan armada mobil privat wisata Bali Bli Gede"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
                      Tipe Armada Utama
                    </span>
                    <h4 className="font-serif text-lg font-bold">
                      Toyota Avanza Veloz / Innova Reborn
                    </h4>
                  </div>
                  <span className="rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold">
                    100% Privat
                  </span>
                </div>
              </div>
            </div>

            {/* Capacity Highlights */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="rounded-2xl bg-stone-50 border border-stone-200/80 p-3.5">
                <span className="block font-serif text-lg font-bold text-stone-900">1 - 5 Tamu</span>
                <span className="text-[11px] text-stone-500 font-medium">Kapasitas Nyaman</span>
              </div>
              <div className="rounded-2xl bg-stone-50 border border-stone-200/80 p-3.5">
                <span className="block font-serif text-lg font-bold text-stone-900">3 Koper Besar</span>
                <span className="text-[11px] text-stone-500 font-medium">Ruang Bagasi Belakang</span>
              </div>
              <div className="rounded-2xl bg-stone-50 border border-stone-200/80 p-3.5">
                <span className="block font-serif text-lg font-bold text-stone-900">Bebas Rokok</span>
                <span className="text-[11px] text-stone-500 font-medium">100% Non-Smoking Car</span>
              </div>
            </div>
          </div>

          {/* Right Column: 6 Features Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {fleetFeatures.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.06 }}
                className="rounded-2xl border border-stone-200/80 bg-stone-50/50 p-4 space-y-2 hover:bg-stone-50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-2xs border border-stone-200">
                    {item.icon}
                  </div>
                  <h4 className="font-serif text-sm font-bold text-stone-900 leading-tight">
                    {item.title}
                  </h4>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed pl-1">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
