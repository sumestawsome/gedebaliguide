"use client";

import React from "react";
import { ShieldCheck, Award, FileCheck, CheckCircle, AlertCircle, HelpCircle } from "lucide-react";
import { mockGuideProfile } from "@/data/mock-data";

export default function AboutCredentials() {
  const credentialPoints = [
    {
      title: "Lisensi Resmi HPI DPD Bali",
      subtitle: `Nomor Registrasi: ${mockGuideProfile.licenseNumber}`,
      description:
        "Tersertifikasi resmi oleh Himpunan Pramuwisata Indonesia (HPI) Provinsi Bali dan terdaftar di Dinas Pariwisata Bali, menjamin integritas dan kompetensi kepanduan.",
      icon: <Award className="h-5 w-5 text-emerald-600" />,
    },
    {
      title: "Hak Akses Pemandu Pura Utama",
      subtitle: "Besakih, Lempuyang, Tirta Empul, Tanah Lot",
      description:
        "Hanya pramuwisata berlisensi resmi yang diizinkan mendampingi tamu masuk ke pelataran pura dan menjelaskan tata cara persembahyangan sesuai adat Bali.",
      icon: <FileCheck className="h-5 w-5 text-blue-700" />,
    },
    {
      title: "Standar Keselamatan & First Aid",
      subtitle: "Emergency Response & Defensive Driving",
      description:
        "Telah mengikuti pelatihan berkendara defensif aman pariwisata serta pertolongan pertama dasar untuk kenyamanan lansia, anak-anak, dan keluarga Anda.",
      icon: <ShieldCheck className="h-5 w-5 text-emerald-600" />,
    },
    {
      title: "Komunikasi Dua Bahasa",
      subtitle: "Bahasa Indonesia & Fluent English",
      description:
        "Fasih berkomunikasi dalam Bahasa Indonesia dan Bahasa Inggris untuk menjelaskan sejarah, humor lokal, maupun berdiskusi santai sepanjang perjalanan.",
      icon: <CheckCircle className="h-5 w-5 text-amber-600" />,
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-stone-50/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Digital Credential Card */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative rounded-3xl bg-white p-6 sm:p-8 shadow-xl border border-stone-200">
              {/* Header Card */}
              <div className="flex items-center justify-between pb-5 border-b border-stone-100">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-600 text-white font-bold shadow-xs">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-serif text-base font-bold text-stone-900">
                      HPI DPD BALI
                    </h3>
                    <p className="text-[11px] text-stone-500 uppercase tracking-wider font-semibold">
                      Kartu Tanda Anggota Resmi
                    </p>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800">
                  AKTIF
                </span>
              </div>

              {/* Credential Details Table */}
              <div className="py-5 space-y-3.5 text-xs sm:text-sm">
                <div className="flex justify-between items-center py-1 border-b border-stone-100">
                  <span className="text-stone-500">Nama Pramuwisata:</span>
                  <span className="font-bold text-stone-900">{mockGuideProfile.name}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-stone-100">
                  <span className="text-stone-500">No. Registrasi Lisensi:</span>
                  <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    {mockGuideProfile.licenseNumber}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-stone-100">
                  <span className="text-stone-500">Klasifikasi:</span>
                  <span className="font-semibold text-stone-800">Pemandu Wisata Umum (Umum & Budaya)</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-stone-100">
                  <span className="text-stone-500">Wilayah Tugas:</span>
                  <span className="font-semibold text-stone-800">Seluruh Provinsi Bali</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-stone-100">
                  <span className="text-stone-500">Pengalaman Lapangan:</span>
                  <span className="font-semibold text-stone-800">{mockGuideProfile.experienceYears}+ Tahun (Sejak 2015)</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-stone-500">Status Verifikasi:</span>
                  <span className="inline-flex items-center gap-1 font-bold text-emerald-700">
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                    Terdaftar di Dinas Pariwisata
                  </span>
                </div>
              </div>

              {/* Note below card */}
              <div className="mt-4 rounded-xl bg-amber-50/80 p-3.5 text-xs text-amber-900 border border-amber-200/80 leading-relaxed">
                <strong>Catatan Wisatawan:</strong> Anda berhak meminta pemandu wisata menunjukkan kartu lisensi fisik resmi saat hari penjemputan untuk keamanan dan kenyamanan liburan Anda.
              </div>
            </div>
          </div>

          {/* Right Column: Why License Matters */}
          <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-200 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-blue-800">
              <ShieldCheck className="h-3.5 w-3.5 text-blue-600" />
              <span>Transparansi & Kredibilitas</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 leading-tight">
              Mengapa Lisensi Resmi HPI Sangat Krusial untuk Liburan Anda di Bali?
            </h2>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-sans">
              Banyak jasa transportasi di internet mengaku sebagai &ldquo;guide&rdquo; padahal hanya berperan sebagai pengemudi biasa tanpa pemahaman norma pura dan budaya Bali. Bersama Bli Gede, Anda mendapatkan jaminan legalitas dan kedalaman cerita:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {credentialPoints.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl bg-white p-4 sm:p-5 border border-stone-200/80 shadow-xs space-y-2"
                >
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <h4 className="font-serif text-base font-bold text-stone-900">
                      {item.title}
                    </h4>
                  </div>
                  <span className="block text-[11px] font-semibold text-blue-700">
                    {item.subtitle}
                  </span>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
