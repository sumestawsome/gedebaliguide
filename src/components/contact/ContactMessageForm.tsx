"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, MessageCircle, RefreshCw, Sparkles, AlertCircle, Calendar, Users, Compass } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export default function ContactMessageForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState("2");
  const [tourPreference, setTourPreference] = useState("ubud");
  const [message, setMessage] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState<{
    name: string;
    phone: string;
    tour: string;
    date: string;
    guests: string;
    message: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate mock network latency
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSubmittedData({
      name,
      phone,
      tour: tourPreference,
      date,
      guests,
      message,
    });
    setIsLoading(false);
    setIsSuccess(true);
  };

  const handleReset = () => {
    setName("");
    setPhone("");
    setEmail("");
    setDate("");
    setGuests("2");
    setTourPreference("ubud");
    setMessage("");
    setIsSuccess(false);
    setSubmittedData(null);
  };

  const getTourLabel = (val: string) => {
    switch (val) {
      case "ubud":
        return "Ubud Cultural, Rice Terrace & Secret Waterfall";
      case "uluwatu":
        return "Uluwatu Cliff Sunset & Kecak Fire Dance";
      case "bedugul":
        return "Bedugul Ulun Danu & Jatiluwih UNESCO Rice Terrace";
      case "kintamani":
        return "Kintamani Batur Volcano & Coffee Plantation";
      case "lempuyang":
        return "East Bali Lempuyang Gate of Heaven & Tirta Gangga";
      case "nusa-penida":
        return "Nusa Penida Island Tour & Snorkeling Adventure";
      default:
        return "Rute Kustom Pilihan Sendiri";
    }
  };

  const waFollowUpUrl = submittedData
    ? buildWhatsAppUrl({
        guestName: submittedData.name,
        tourName: getTourLabel(submittedData.tour),
        tripDate: submittedData.date,
        guestCount: parseInt(submittedData.guests, 10) || 2,
        customNote: submittedData.message,
        source: "custom_itinerary",
      })
    : "#";

  return (
    <div className="rounded-3xl border border-stone-200 bg-white p-5 sm:p-8 md:p-9 shadow-sm">
      <AnimatePresence mode="wait">
        {isSuccess && submittedData ? (
          /* Mock Success State */
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="py-6 text-center space-y-6"
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-xs">
              <CheckCircle2 className="h-10 w-10" />
            </div>

            <div className="space-y-2 max-w-md mx-auto">
              <span className="text-xs uppercase tracking-wider font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Pesan Berhasil Terkirim
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                Matur Suksema, {submittedData.name}!
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Detail permintaan liburan privat Anda telah kami terima. Bli Gede akan segera meninjau dan merespon ke nomor WhatsApp <strong>{submittedData.phone}</strong> dalam kurun waktu kurang dari 2 jam.
              </p>
            </div>

            {/* Summary Box */}
            <div className="rounded-2xl bg-stone-50 border border-stone-200/80 p-4 text-left text-xs space-y-2 max-w-md mx-auto">
              <div className="flex justify-between py-1 border-b border-stone-200/60">
                <span className="text-stone-500">Pilihan Rute:</span>
                <span className="font-semibold text-stone-900 truncate max-w-[220px]">
                  {getTourLabel(submittedData.tour)}
                </span>
              </div>
              {submittedData.date && (
                <div className="flex justify-between py-1 border-b border-stone-200/60">
                  <span className="text-stone-500">Rencana Tanggal:</span>
                  <span className="font-semibold text-stone-900">{submittedData.date}</span>
                </div>
              )}
              <div className="flex justify-between py-1 border-b border-stone-200/60">
                <span className="text-stone-500">Jumlah Tamu:</span>
                <span className="font-semibold text-stone-900">{submittedData.guests} Orang</span>
              </div>
              {submittedData.message && (
                <div className="pt-1">
                  <span className="text-stone-500 block mb-1">Catatan Tambahan:</span>
                  <p className="text-stone-700 italic bg-white p-2.5 rounded-lg border border-stone-200/60">
                    &ldquo;{submittedData.message}&rdquo;
                  </p>
                </div>
              )}
            </div>

            {/* Instant Follow-Up Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 max-w-md mx-auto">
              <a
                href={waFollowUpUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-emerald-600/30 hover:bg-emerald-500 transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Teruskan ke WhatsApp Sekarang</span>
              </a>

              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-stone-300 bg-white px-5 py-3.5 text-xs font-semibold text-stone-700 hover:bg-stone-50 transition-colors"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span>Kirim Pesan Lain</span>
              </button>
            </div>
          </motion.div>
        ) : (
          /* Form State */
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-200 px-3 py-0.5 text-xs font-semibold text-blue-800">
                <Sparkles className="h-3.5 w-3.5 text-blue-600" />
                <span>Formulir Pesan Alternatif</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                Kirim Rencana Liburan Anda
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
                Isi rincian perjalanan Anda di bawah ini. Bli Gede akan membalas dengan saran jadwal dan konfirmasi ketersediaan armada.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Row 1: Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-700">
                    Nama Lengkap *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Contoh: Sarah & Michael"
                    className="w-full rounded-xl border border-stone-300 px-4 py-3 text-base sm:text-sm text-stone-900 focus:border-blue-700 focus:outline-hidden transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-700">
                    Nomor WhatsApp / Telepon *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Contoh: 0812-3456-7890"
                    className="w-full rounded-xl border border-stone-300 px-4 py-3 text-base sm:text-sm text-stone-900 focus:border-blue-700 focus:outline-hidden transition-colors"
                  />
                </div>
              </div>

              {/* Row 2: Email & Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-700">
                    Alamat Email (Opsional)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Contoh: sarah@gmail.com"
                    className="w-full rounded-xl border border-stone-300 px-4 py-3 text-base sm:text-sm text-stone-900 focus:border-blue-700 focus:outline-hidden transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-stone-500" />
                    <span>Rencana Tanggal Tur</span>
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full rounded-xl border border-stone-300 px-4 py-3 text-base sm:text-sm text-stone-900 focus:border-blue-700 focus:outline-hidden transition-colors"
                  />
                </div>
              </div>

              {/* Row 3: Guests Count & Tour Preference */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5 text-stone-500" />
                    <span>Jumlah Anggota Rombongan</span>
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full rounded-xl border border-stone-300 px-4 py-3 text-base sm:text-sm text-stone-900 bg-white focus:border-blue-700 focus:outline-hidden transition-colors"
                  >
                    <option value="1">1 Orang (Solo Traveler)</option>
                    <option value="2">2 Orang (Pasangan / Teman)</option>
                    <option value="3">3 - 4 Orang (Keluarga Kecil)</option>
                    <option value="5">5 - 6 Orang (Keluarga Besar / MPV)</option>
                    <option value="7">7+ Orang (Grup / Butuh HiAce)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                    <Compass className="h-3.5 w-3.5 text-stone-500" />
                    <span>Pilihan Rute / Paket Tur</span>
                  </label>
                  <select
                    value={tourPreference}
                    onChange={(e) => setTourPreference(e.target.value)}
                    className="w-full rounded-xl border border-stone-300 px-4 py-3 text-base sm:text-sm text-stone-900 bg-white focus:border-blue-700 focus:outline-hidden transition-colors"
                  >
                    <option value="ubud">Ubud Cultural, Rice Terrace & Waterfall</option>
                    <option value="uluwatu">Uluwatu Sunset & Kecak Fire Dance</option>
                    <option value="bedugul">Bedugul Ulun Danu & Jatiluwih UNESCO</option>
                    <option value="kintamani">Kintamani Volcano & Coffee Plantation</option>
                    <option value="lempuyang">Lempuyang Gate of Heaven & East Bali</option>
                    <option value="nusa-penida">Nusa Penida Snorkeling Adventure</option>
                    <option value="custom">Rute Kustom Sesuai Request Saya</option>
                  </select>
                </div>
              </div>

              {/* Row 4: Message */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-700">
                  Pesan & Catatan Khusus *
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ceritakan preferensi Anda: lokasi hotel penjemputan, ada anak kecil/lansia, atau tempat khusus yang ingin dikunjungi..."
                  className="w-full rounded-xl border border-stone-300 px-4 py-3 text-base sm:text-sm text-stone-900 focus:border-blue-700 focus:outline-hidden transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 py-3.5 text-sm sm:text-base font-semibold text-white shadow-md hover:bg-blue-800 disabled:opacity-75 transition-all active:scale-[0.99]"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>Sedang Mengirim Pesan...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Kirim Pesan ke Bli Gede</span>
                  </>
                )}
              </button>

              <p className="text-[11px] text-stone-400 text-center">
                Data Anda aman dan hanya digunakan Bli Gede untuk merespon rencana tur privat Anda.
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
