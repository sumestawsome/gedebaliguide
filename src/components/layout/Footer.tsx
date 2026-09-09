import React from "react";
import Link from "next/link";
import { MessageCircle, ShieldCheck, MapPin, Mail, Phone, Heart } from "lucide-react";
import { mockGuideProfile } from "@/data/mock-data";
import { getGeneralConsultationUrl } from "@/lib/whatsapp";

export default function Footer() {
  const waUrl = getGeneralConsultationUrl("footer");
  return (
    <footer className="border-t border-stone-200 bg-stone-900 text-stone-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Bio & License */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="font-serif text-2xl font-bold text-stone-100">
                {mockGuideProfile.name}
              </span>
            </div>
            <p className="text-sm text-stone-400 max-w-md leading-relaxed">
              Pemandu wisata privat profesional berlisensi resmi HPI Bali. Memandu liburan keluarga, pasangan, dan grup kecil dengan keramahan autentik Bali, kenyamanan mobil ber-AC, dan rute fleksibel tanpa komisi perantara.
            </p>
            <div className="flex items-center gap-2 text-xs text-stone-400">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>Lisensi No: <strong className="text-stone-200">{mockGuideProfile.licenseNumber}</strong> (Himpunan Pramuwisata Indonesia)</span>
            </div>
          </div>

          {/* Col 2: Navigasi Cepat */}
          <div>
            <h4 className="font-serif text-base font-semibold text-stone-100 mb-4">Navigasi</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/tours" className="hover:text-amber-400 transition-colors">
                  Paket Tur Populer
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-400 transition-colors">
                  Profil & Lisensi Gede
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-amber-400 transition-colors">
                  Dokumentasi Galeri
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="hover:text-amber-400 transition-colors">
                  Testimoni Tamu
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-amber-400 transition-colors">
                  Tanya Jawab (FAQ)
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-400 transition-colors">
                  Hubungi Gede
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Kontak Langsung */}
          <div>
            <h4 className="font-serif text-base font-semibold text-stone-100 mb-4">Kontak Langsung</h4>
            <ul className="space-y-3 text-sm text-stone-400">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-amber-400 shrink-0" />
                <span>Denpasar & Seluruh Wilayah Bali</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-amber-400 shrink-0" />
                <a href={`tel:${mockGuideProfile.phone}`} className="hover:text-stone-200">
                  {mockGuideProfile.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-amber-400 shrink-0" />
                <a href={`mailto:${mockGuideProfile.email}`} className="hover:text-stone-200">
                  {mockGuideProfile.email}
                </a>
              </li>
              <li className="pt-2">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-emerald-700 transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Kirim Pesan WhatsApp</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-stone-800 pt-6 text-center text-xs text-stone-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Gede Bali Guide. Seluruh hak cipta dilindungi.</p>
          <p className="flex items-center justify-center gap-1">
            Dibuat dengan rasa cinta untuk pariwisata Bali yang autentik & berkelanjutan.
          </p>
        </div>
      </div>
    </footer>
  );
}
