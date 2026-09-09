"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, HeartHandshake, Compass, Ban, Camera, Clock, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutStory() {
  const coreValues = [
    {
      icon: <Sparkles className="h-6 w-6 text-blue-700" />,
      title: "Wawasan Budaya Autentik",
      description:
        "Saya tidak hanya mengantar Anda dari titik A ke titik B. Di setiap pura dan desa adat, saya ceritakan makna filosofis sesajen, sejarah leluhur, dan etika sakral Bali dengan bahasa yang santai dan mudah dipahami.",
    },
    {
      icon: <Ban className="h-6 w-6 text-red-600" />,
      title: "100% Bebas Toko Komisi",
      description:
        "Banyak tur murah memaksa tamu mampir ke toko oleh-oleh atau galeri rekanan demi komisi. Bersama saya, waktu liburan 100% milik Anda. Kita hanya mengunjungi tempat yang memang Anda inginkan.",
    },
    {
      icon: <Clock className="h-6 w-6 text-emerald-600" />,
      title: "Tempo Santai & Fleksibel",
      description:
        "Tidak ada bunyi peluit atau batasan waktu kaku. Suka dengan suasana satu pura dan ingin duduk lebih lama menikmati semilir angin? Anda dan keluarga yang memegang kendali jadwal perjalanan.",
    },
    {
      icon: <Camera className="h-6 w-6 text-amber-600" />,
      title: "Bantuan Dokumentasi Foto & Video",
      description:
        "Sebagai pemandu lokal berpengalaman, saya tahu sudut-sudut terbaik untuk berfoto bebas kerumunan. Saya siap membantu mengambil foto rombongan berkualitas tinggi agar memori liburan Anda abadi.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white border-y border-stone-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 border border-amber-200 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-800">
              <HeartHandshake className="h-3.5 w-3.5 text-amber-600" />
              <span>Kisah & Komitmen Pelayanan</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 leading-tight">
              Bukan Sekadar Mengemudi, Melainkan Menghubungkan Anda dengan Jiwa Bali
            </h2>

            <div className="space-y-4 text-stone-600 font-sans leading-relaxed text-sm sm:text-base">
              <p>
                Saya Gede Sudiartana, dibesarkan di tengah keluarga pengrajin dan seniman Bali. Sejak kecil, saya diajarkan nilai kearifan leluhur <em>Tri Hita Karana</em> — keharmonisan hidup antara manusia dengan Sang Pencipta, sesama manusia, dan alam semesta.
              </p>
              <p>
                Ketika memulai karir di industri pariwisata pada tahun 2015, saya melihat banyak wisatawan yang merasa kelelahan karena harus mengikuti jadwal tur rombongan besar yang terburu-buru, atau dipaksa mampir ke toko komisi yang tidak mereka minati.
              </p>
              <p className="font-medium text-stone-800">
                Itulah alasan saya mendirikan layanan pemandu privat mandiri ini: memberikan alternatif perjalanan yang hangat, jujur, transparan, dan berkelas privat murni bagi Anda yang mengutamakan ketenangan dan keaslian Bali.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-stone-100 aspect-[4/3]">
              <Image
                src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=900&auto=format&fit=crop&q=80"
                alt="Pemandangan budaya Bali bersama Gede"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-300">
                  Filosofi Tri Hita Karana
                </span>
                <p className="font-serif text-base sm:text-lg italic font-normal text-stone-100">
                  &ldquo;Menyambut tamu bukan sekadar transaksi bisnis, melainkan menjalin persaudaraan baru di Pulau Dewata.&rdquo;
                </p>
                <p className="text-xs text-stone-300">— Bli Gede Sudiartana</p>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Core Pillars */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-stone-900">
            Empat Janji Pelayanan Terbaik Bli Gede
          </h3>
          <p className="text-stone-600 text-sm sm:text-base">
            Standar integritas dan kenyamanan yang Anda rasakan sejak penjemputan pertama hingga kembali ke hotel.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreValues.map((value, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="rounded-2xl border border-stone-200/80 bg-stone-50/50 p-6 flex flex-col justify-between hover:shadow-md hover:border-amber-200 transition-all"
            >
              <div className="space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-xs border border-stone-200">
                  {value.icon}
                </div>
                <h4 className="font-serif text-lg font-bold text-stone-900">
                  {value.title}
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
