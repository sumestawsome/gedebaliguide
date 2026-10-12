"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUp } from "lucide-react";
import { handleWhatsAppClick } from "@/lib/lead-tracker";
import { getActiveFeaturedTours } from "@/lib/services/tour-service";
import { getFeaturedFiveStarReviews } from "@/lib/services/review-service";
import { getActiveFaqs } from "@/lib/services/faq-service";
import { Tour, Review, FAQItem } from "@/types";
import ReviewCard from "@/components/reviews/ReviewCard";
import { mockPopularDestinations, mockAllTours } from "@/data/mock-data";

// -------------------------------------------------------------
// Kamus Konten Dwibahasa (ID & EN)
// -------------------------------------------------------------
const CONTENT = {
  id: {
    nav: {
      home: "Beranda",
      tours: "Katalog Tur",
      about: "Tentang Gede",
      gallery: "Galeri",
      reviews: "Ulasan Tamu",
      faq: "FAQ",
      contact: "Kontak",
      whatsapp: "WhatsApp",
      drawerTitle: "Menu Navigasi",
      languageLabel: "Bahasa",
      consultWa: "Konsultasi via WhatsApp",
    },
    hero: {
      badge: "Pemandu Lokal Resmi HPI",
      greeting: "“Om Swastyastu! Selamat Datang di Bali”",
      headlineLead: "Jelajahi Pesona Asli Bali Bersama ",
      name: "Gede Sudiartana",
      description:
        "Pemandu lokal ramah berlisensi resmi HPI Bali dengan pengalaman 10+ tahun. Nikmati perjalanan privat santai dengan armada mobil ber-AC bersih, rute fleksibel murni eksplorasi budaya dan panorama alam tanpa paksaan belanja oleh-oleh.",
      btnWa: "Konsultasi via WhatsApp",
      btnCatalog: "Lihat Katalog Tur",
    },
    trustBar: [
      {
        title: "100% Tur Privat",
        desc: "Tanpa digabung peserta lain",
      },
      {
        title: "Armada Mobil Ber-AC",
        desc: "Bersih, sejuk & wangi terawat",
      },
      {
        title: "Bebas Request Spot Foto",
        desc: "Berhenti kapan saja sesuka hati",
      },
      {
        title: "Rating 5.0 / 5.0",
        desc: "Dipercaya 1.200+ wisatawan",
      },
    ],
    pillars: {
      tag: "Jaminan Kenyamanan Anda",
      title: "Tiga Pilar Utama Layanan",
      subtitle:
        "Komitmen profesionalitas untuk memastikan liburan Bali Anda berkesan, aman, dan sarat wawasan budaya luhur.",
      items: [
        {
          title: "10+ Tahun Pengalaman",
          desc: "Menguasai rute terbaik bebas macet, estimasi waktu ideal di setiap pura dan atraksi, serta spot foto tersembunyi agar momen Anda santai tanpa terburu-buru.",
        },
        {
          title: "Lisensi Resmi HPI Bali",
          desc: "Wawasan budaya autentik, tata krama pura, dan kisah sejarah Bali yang valid langsung dari pemandu bersertifikasi resmi Himpunan Pramuwisata Indonesia (No. HPI-BALI-2015-8849).",
        },
        {
          title: "Armada Mobil Nyaman Ber-AC",
          desc: "Kendaraan MPV/SUV bersih, sejuk, wangi, terawat dengan servis berkala demi kenyamanan maksimal seluruh keluarga, termasuk anak-anak dan lansia.",
        },
      ],
    },
    tours: {
      tag: "Pilihan Terpopuler",
      title: "Katalog Paket Tur Favorit",
      subtitle:
        "Pilihan rute fleksibel 100% privat, sudah termasuk kendaraan ber-AC, bahan bakar, dan pendampingan pemandu lokal ramah.",
      priceUnit: "rute fleksibel · kapasitas s.d. 5 orang",
      btnBook: "Pesan via WhatsApp",
      btnAllTours: "Lihat Semua Paket Tur →",
      items: [
        {
          badge: "Sunset Terbaik",
          title: "Uluwatu Sunset Cliff, Melasti & Tari Kecak",
          price: "",
          duration: "Half / Full Day (7 - 9 Jam) · Sore Romantis",
          highlights: [
            "Pantai Pasir Putih & Tebing Karang Melasti",
            "Pura Luhur Uluwatu di Atas Tebing Samudra Hindia",
            "Magis Pertunjukan Tari Kecak & Api saat Senja",
            "Makan Malam Romantis Seafood Jimbaran Bay",
            "Penjemputan & Pengantaran Kembali ke Hotel",
          ],
          waMessage:
            "Halo Bli Gede, saya tertarik dengan Paket Uluwatu Sunset Cliff & Tari Kecak",
        },
        {
          badge: "Favorit Budaya",
          title: "Ubud Cultural, Rice Terrace & Secret Waterfall",
          price: "",
          duration: "Full Day (8 - 10 Jam) · Rute Fleksibel",
          highlights: [
            "Hutan Monyet Ubud (Sacred Monkey Forest)",
            "Terasering Sawah Tegalalang & Ayunan Foto",
            "Pura Tirta Empul (Ritual Penyucian Melukat)",
            "Air Terjun Eksotis Kanto Lampo",
            "Perkebunan Kopi Luwak Tradisional",
          ],
          waMessage:
            "Halo Bli Gede, saya tertarik dengan Paket Ubud Cultural, Rice Terrace & Secret Waterfall",
        },
        {
          badge: "Warisan UNESCO",
          title: "Bedugul Ulun Danu & Jatiluwih Rice Terrace",
          price: "",
          duration: "Full Day (9 - 10 Jam) · Sejuk & Alami",
          highlights: [
            "Pura Ulun Danu Beratan (Pura Danau Ikonik)",
            "Lanskap Terasering Sawah Jatiluwih UNESCO",
            "Gerbang Ikonik Handara Gate",
            "Pasar Buah & Rempah Segar Candikuning",
            "Danau Kembar Buyan & Tamblingan View",
          ],
          waMessage:
            "Halo Bli Gede, saya tertarik dengan Paket Bedugul Ulun Danu & Jatiluwih",
        },
      ],
    },
    regions: {
      tag: "Destinasi Utama",
      title: "Wilayah Populer Eksplorasi",
      subtitle:
        "Rute dapat digabungkan atau disesuaikan dengan lokasi penginapan dan preferensi rombongan Anda.",
      items: [
        {
          badge: "Budaya & Alam",
          title: "Ubud & Gianyar",
          desc: "Pusat kesenian tradisional, pura suci berwibawa, sawah bertingkat hijau asri, serta lembah air terjun tropis alami.",
          image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop&q=80",
          regionQuery: "ubud",
        },
        {
          badge: "Pantai & Tebing",
          title: "Uluwatu & Jimbaran",
          desc: "Tebing kapur dramatis menjorok ke samudra lepas, pantai pasir putih tersembunyi, sunset legendaris, dan hidangan laut segar.",
          image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=800&auto=format&fit=crop&q=80",
          regionQuery: "uluwatu",
        },
        {
          badge: "Sejuk Pegunungan",
          title: "Bedugul & Jatiluwih",
          desc: "Udara dingin menyegarkan, pura danau berkabut yang menentramkan jiwa, serta keagungan sawah terasering warisan UNESCO.",
          image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&auto=format&fit=crop&q=80",
          regionQuery: "bedugul",
        },
        {
          badge: "Panorama Kaldera",
          title: "Kintamani & Batur",
          desc: "Pemandangan megah Gunung dan Danau Batur, kafe estetik di atas awan, serta desa kuno yang kaya tradisi asli Bali.",
          image: "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?w=800&auto=format&fit=crop&q=80",
          regionQuery: "kintamani",
        },
      ],
    },
    reviews: {
      tag: "Testimoni Asli",
      title: "Ulasan Wisatawan",
      subtitle:
        "Cerita nyata dari tamu domestik dan mancanegara yang telah menjelajah Bali bersama Gede Sudiartana.",
      btnAllReviews: "Lihat Semua Ulasan Tamu →",
      items: [
        {
          rating: 5,
          text: "“Gede made our Bali holiday completely unforgettable. As a family with two kids, his patience, warm stories about Balinese culture, and comfortable car were top-tier. No tourist traps at all!”",
          author: "Sarah & Mark",
          origin: "Sydney, Australia",
          tourType: "Family Tour",
        },
        {
          rating: 5,
          text: "“Sangat puas dengan pelayanan Bli Gede. Mobilnya bersih dan wangi, rutenya sangat santai bisa request berhenti kapan saja untuk foto anak-anak. Paham sekali spot-spot makan halal yang enak di Bali!”",
          author: "Keluarga Budi Santoso",
          origin: "Jakarta, Indonesia",
          tourType: "Liburan Keluarga",
        },
        {
          rating: 5,
          text: "“Le meilleur guide de Bali! Gede est passionné par la culture balinaise, très ponctuel et extrêmement prudent sur la route. Nous recommandons à 100%.”",
          author: "Jean-Paul & Claire",
          origin: "Lyon, Prancis",
          tourType: "Couple Explorer",
        },
      ],
    },
    faq: {
      tag: "Bantuan & Informasi",
      title: "Pertanyaan yang Sering Diajukan",
      subtitle:
        "Informasi lengkap dan transparan untuk kenyamanan perencanaan liburan Anda di Pulau Dewata.",
      btnAllFaq: "Lihat Semua Tanya Jawab (15 Pertanyaan Lengkap) →",
      items: [
        {
          q: "Bagaimana sistem pembayaran turnya?",
          a: "Sangat mudah dan aman tanpa risiko. Anda tidak perlu membayar uang muka (DP) atau memasukkan kartu kredit saat reservasi. Pembayaran dilakukan secara langsung kepada Bli Gede di akhir perjalanan wisata setelah tur selesai dinikmati, baik secara tunai (Rupiah) maupun transfer bank/QRIS.",
        },
        {
          q: "Apakah rute perjalanan bisa kami atur sendiri?",
          a: "Sangat bisa! Seluruh tur kami bersifat 100% privat. Anda memiliki fleksibilitas penuh untuk menentukan jam penjemputan, memodifikasi urutan destinasi, atau menambahkan spot wisata baru yang ingin dikunjungi sepanjang masih satu arah rute perjalanan.",
        },
        {
          q: "Fasilitas apa saja yang sudah termasuk dalam harga sewa mobil?",
          a: "Tarif per mobil sudah mencakup sewa armada pribadi ber-AC sejuk (kapasitas s.d. 5 penumpang), bahan bakar (BBM), jasa pemandu wisata berlisensi resmi HPI Bali, air mineral dingin selama perjalanan, dan biaya parkir standar di tempat wisata. (Tiket masuk objek wisata dan pengeluaran pribadi dibayar terpisah di lokasi).",
        },
        {
          q: "Apakah melayani penjemputan di bandara atau hotel luar Denpasar?",
          a: "Ya! Penjemputan dan pengantaran kembali sudah termasuk tanpa biaya tambahan untuk area Kuta, Seminyak, Legian, Canggu, Sanur, Nusa Dua, Jimbaran, dan Ubud. Untuk penjemputan area jauh (seperti Amed, Lovina, atau Candidasa), silakan hubungi kami untuk penyesuaian rute yang nyaman.",
        },
      ],
    },
    cta: {
      title: "Ingin Rute Khusus Sesuai Selera Anda?",
      desc: "Punya destinasi impian sendiri, kebutuhan durasi berbeda, atau perlu penjemputan khusus bandara dan hotel? Konsultasikan rencana perjalanan Anda bersama Bli Gede secara gratis tanpa komitmen.",
      btn: "Konsultasi Rute Gratis via WhatsApp",
    },
    footer: {
      bio: "Pemandu tur privat berlisensi resmi HPI Bali (No. HPI-BALI-2015-8849). Menyajikan pengalaman liburan autentik, nyaman, dan ramah dengan rute fleksibel di seluruh penjuru pulau dewata.",
      hpiBadge: "Terdaftar Resmi di HPI Bali",
      quickLinks: "Navigasi Cepat",
      directContact: "Hubungi Langsung",
      areaLabel: "Wilayah:",
      areaValue: "Denpasar, Badung, Gianyar, Tabanan, Buleleng",
      hoursLabel: "Operasional:",
      hoursValue: "07.00 - 22.00 WITA",
      copyright: "© 2026 Gede Bali Guide (Gede Sudiartana). All rights reserved.",
      license: "Lisensi: HPI-BALI-2015-8849",
    },
  },
  en: {
    nav: {
      home: "Home",
      tours: "Tour Packages",
      about: "About Gede",
      gallery: "Gallery",
      reviews: "Reviews",
      faq: "FAQ",
      contact: "Contact",
      whatsapp: "WhatsApp",
      drawerTitle: "Navigation Menu",
      languageLabel: "Language",
      consultWa: "Consult via WhatsApp",
    },
    hero: {
      badge: "Official HPI Licensed Local Guide",
      greeting: "“Om Swastyastu! Welcome to Bali”",
      headlineLead: "Discover Authentic Bali with ",
      name: "Gede Sudiartana",
      description:
        "Friendly local guide officially licensed by HPI Bali with 10+ years of experience. Enjoy a relaxed private journey in a clean air-conditioned car, with flexible itineraries focused purely on culture and nature without forced shopping stops.",
      btnWa: "Consult via WhatsApp",
      btnCatalog: "View Tour Packages",
    },
    trustBar: [
      {
        title: "100% Private Tours",
        desc: "Never shared with strangers",
      },
      {
        title: "Air-Conditioned Fleet",
        desc: "Clean, cool & well-maintained",
      },
      {
        title: "Flexible Photo Stops",
        desc: "Stop anytime at your own pace",
      },
      {
        title: "5.0 / 5.0 Rating",
        desc: "Trusted by 1,200+ travelers",
      },
    ],
    pillars: {
      tag: "Your Peace of Mind",
      title: "Three Pillars of Our Service",
      subtitle:
        "Professional commitment to ensure your Balinese holiday is memorable, safe, and rich in cultural wisdom.",
      items: [
        {
          title: "10+ Years of Experience",
          desc: "Mastering the best traffic-free routes, optimal timing for every temple and attraction, and secret photo viewpoints for an unhurried, peaceful trip.",
        },
        {
          title: "Licensed by HPI Bali",
          desc: "Authentic cultural stories, sacred temple etiquette, and verified historical insights from an officially certified guide (License No. HPI-BALI-2015-8849).",
        },
        {
          title: "Comfortable Air-Con Fleet",
          desc: "Clean, fresh, and regularly serviced private MPV/SUV vehicles for maximum comfort for families, toddlers, and senior travelers.",
        },
      ],
    },
    tours: {
      tag: "Most Popular Choices",
      title: "Featured Tour Packages",
      subtitle:
        "Flexible 100% private itineraries, including private AC vehicle, fuel, and friendly licensed local guide services.",
      priceUnit: "flexible route · up to 5 guests",
      btnBook: "Book via WhatsApp",
      btnAllTours: "View All Tour Packages →",
      items: [
        {
          badge: "Sunset Classic",
          title: "Uluwatu Sunset Cliff, Melasti & Kecak Fire Dance",
          price: "",
          duration: "Half / Full Day (7 - 9 Hours) · Romantic Sunset",
          highlights: [
            "Melasti White Sand Beach & Limestone Cliffs",
            "Uluwatu Cliff Temple overlooking Indian Ocean",
            "Magical Kecak & Fire Dance at Sunset",
            "Romantic Jimbaran Bay Seafood Candlelit Dinner",
            "Complimentary Hotel Pick-up & Drop-off",
          ],
          waMessage:
            "Hi Gede, I am interested in booking the Uluwatu Sunset Cliff & Kecak tour",
        },
        {
          badge: "Cultural Favorite",
          title: "Ubud Cultural, Rice Terrace & Secret Waterfall",
          price: "",
          duration: "Full Day (8 - 10 Hours) · Flexible Itinerary",
          highlights: [
            "Ubud Sacred Monkey Forest Sanctuary",
            "Tegalalang Rice Terrace & Jungle Swings",
            "Tirta Empul Holy Water Purification Temple",
            "Scenic Kanto Lampo Waterfall",
            "Traditional Balinese Luwak Coffee Plantation",
          ],
          waMessage:
            "Hi Gede, I am interested in booking the Ubud Cultural, Rice Terrace & Secret Waterfall tour",
        },
        {
          badge: "UNESCO Heritage",
          title: "Bedugul Ulun Danu & Jatiluwih Rice Terrace",
          price: "",
          duration: "Full Day (9 - 10 Hours) · Cool Mountain Breeze",
          highlights: [
            "Ulun Danu Beratan Iconic Floating Temple",
            "Jatiluwih UNESCO World Heritage Rice Terraces",
            "Handara Gate Iconic Landmark",
            "Candikuning Fresh Fruit & Spices Market",
            "Twin Lakes (Buyan & Tamblingan) Scenic Viewpoint",
          ],
          waMessage:
            "Hi Gede, I am interested in booking the Bedugul Ulun Danu & Jatiluwih tour",
        },
      ],
    },
    regions: {
      tag: "Key Destinations",
      title: "Popular Regions to Explore",
      subtitle:
        "Routes can be combined or custom-tailored to your hotel location and group preferences.",
      items: [
        {
          badge: "Culture & Nature",
          title: "Ubud & Gianyar",
          desc: "Heart of Balinese arts, spiritual temples, lush emerald terraces, and refreshing tropical waterfall gorges.",
          image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop&q=80",
          regionQuery: "ubud",
        },
        {
          badge: "Beaches & Cliffs",
          title: "Uluwatu & Jimbaran",
          desc: "Dramatic limestone ocean cliffs, secluded turquoise bays, legendary sunsets, and oceanfront fresh seafood.",
          image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=800&auto=format&fit=crop&q=80",
          regionQuery: "uluwatu",
        },
        {
          badge: "Cool Highlands",
          title: "Bedugul & Jatiluwih",
          desc: "Refreshing mountain climate, serene mist-kissed lake shrines, and majestic UNESCO terraced landscapes.",
          image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&auto=format&fit=crop&q=80",
          regionQuery: "bedugul",
        },
        {
          badge: "Caldera Panorama",
          title: "Kintamani & Batur",
          desc: "Awe-inspiring vistas of Mount Batur and its crater lake, trendy hilltop cafes above the clouds, and ancient villages.",
          image: "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?w=800&auto=format&fit=crop&q=80",
          regionQuery: "kintamani",
        },
      ],
    },
    reviews: {
      tag: "Verified Experiences",
      title: "Guest Reviews",
      subtitle:
        "Real testimonials from domestic and international travelers who explored Bali with Gede Sudiartana.",
      btnAllReviews: "View All Guest Reviews →",
      items: [
        {
          rating: 5,
          text: "“Gede made our Bali holiday completely unforgettable. As a family with two kids, his patience, warm stories about Balinese culture, and comfortable car were top-tier. No tourist traps at all!”",
          author: "Sarah & Mark",
          origin: "Sydney, Australia",
          tourType: "Family Tour",
        },
        {
          rating: 5,
          text: "“Extremely satisfied with Bli Gede's service. The car was spotless, the schedule was relaxed, and we could stop anytime for photos with the kids. He also knows fantastic local halal dining spots!”",
          author: "Budi Santoso Family",
          origin: "Jakarta, Indonesia",
          tourType: "Family Vacation",
        },
        {
          rating: 5,
          text: "“Le meilleur guide de Bali! Gede est passionné par la culture balinaise, très ponctuel et extrêmement prudent sur la route. Nous recommandons à 100%.”",
          author: "Jean-Paul & Claire",
          origin: "Lyon, France",
          tourType: "Couple Explorer",
        },
      ],
    },
    faq: {
      tag: "Help & Information",
      title: "Frequently Asked Questions",
      subtitle:
        "Clear and transparent details to help you plan an effortless holiday in Bali.",
      btnAllFaq: "View All FAQs (15 Complete Questions) →",
      items: [
        {
          q: "How does the tour payment work?",
          a: "It's 100% risk-free. No advance deposit (DP) or credit card is required to reserve. You simply pay directly to Bli Gede at the end of the tour in cash (IDR) or via bank transfer/QRIS once you are satisfied.",
        },
        {
          q: "Can we customize our own itinerary?",
          a: "Absolutely! All our tours are 100% private. You have full freedom to set your preferred pick-up time, adjust destination order, or add new stops along the same direction.",
        },
        {
          q: "What is included in the private car tour price?",
          a: "The rate includes a comfortable air-conditioned private car (up to 5 guests), fuel, licensed HPI Balinese driver-guide, chilled bottled mineral water, and standard parking fees. (Attraction entry tickets and personal meals are paid separately at each spot).",
        },
        {
          q: "Do you provide airport and outer-region hotel pick-up?",
          a: "Yes! Pick-up and drop-off are included at no extra charge across Kuta, Seminyak, Legian, Canggu, Sanur, Nusa Dua, Jimbaran, and Ubud. For distant areas like Amed, Lovina, or Candidasa, please reach out for customized arrangements.",
        },
      ],
    },
    cta: {
      title: "Want a Custom Itinerary Tailored to You?",
      desc: "Have your own bucket-list spots, unique trip durations, or need dedicated airport and inter-hotel transfers? Chat with Bli Gede for free, no-obligation itinerary advice.",
      btn: "Free WhatsApp Consultation",
    },
    footer: {
      bio: "Officially licensed private tour guide by HPI Bali (License No. HPI-BALI-2015-8849). Delivering authentic, comfortable, and tailored Balinese holiday journeys across the island of gods.",
      hpiBadge: "Officially Certified HPI Bali Guide",
      quickLinks: "Quick Links",
      directContact: "Direct Contact",
      areaLabel: "Area Covered:",
      areaValue: "Denpasar, Badung, Gianyar, Tabanan, Buleleng",
      hoursLabel: "Operating Hours:",
      hoursValue: "07:00 - 22:00 WITA (GMT+8)",
      copyright: "© 2026 Gede Bali Guide (Gede Sudiartana). All rights reserved.",
      license: "License: HPI-BALI-2015-8849",
    },
  },
};

const DESTINATION_SLIDES = [
  {
    id: 1,
    title: "Pura Ulun Danu Beratan, Bedugul",
    tag: "📍 Ulun Danu Beratan, Bedugul",
    imageUrl:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1000&auto=format&fit=crop&q=85",
  },
  {
    id: 2,
    title: "Pantai Melasti & Tebing Ungasan",
    tag: "📍 Pantai Melasti, Ungasan",
    imageUrl:
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=1000&auto=format&fit=crop&q=85",
  },
  {
    id: 3,
    title: "Terasering Tegalalang, Ubud",
    tag: "📍 Terasering Tegalalang, Ubud",
    imageUrl:
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=1000&auto=format&fit=crop&q=85",
  },
];

export default function HomePage() {
  const [lang, setLang] = useState<"id" | "en">("en");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const touchStartXRef = useRef<number>(0);
  const touchEndXRef = useRef<number>(0);

  // Live Data dari Cloud Firestore
  const [firestoreTours, setFirestoreTours] = useState<Tour[] | null>(null);
  const [firestoreReviews, setFirestoreReviews] = useState<Review[] | null>(null);
  const [firestoreFaqs, setFirestoreFaqs] = useState<FAQItem[] | null>(null);

  const t = CONTENT[lang];

  // Mengambil 3 Tur Unggulan, 3 Ulasan Tamu, dan 4 FAQ dari Firestore
  useEffect(() => {
    let isMounted = true;
    async function loadFirestoreData() {
      try {
        const [tours, reviews, faqs] = await Promise.all([
          getActiveFeaturedTours(3),
          getFeaturedFiveStarReviews(3),
          getActiveFaqs(),
        ]);
        if (isMounted) {
          if (tours && tours.length > 0) setFirestoreTours(tours);
          if (reviews && reviews.length > 0) setFirestoreReviews(reviews);
          if (faqs && faqs.length > 0) setFirestoreFaqs(faqs.slice(0, 4));
        }
      } catch (err) {
        console.warn("Gagal memuat live data Firestore di HomePage:", err);
      }
    }
    loadFirestoreData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Auto-slide effect every 4.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % DESTINATION_SLIDES.length);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  // Sync language with global Navbar
  useEffect(() => {
    try {
      const saved = localStorage.getItem("app_lang");
      if (saved === "id" || saved === "en") {
        setLang(saved);
      } else {
        setLang("en");
      }
    } catch {}
    const handleLang = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.lang === "id" || detail?.lang === "en") {
        setLang(detail.lang);
      }
    };
    window.addEventListener("appLanguageChange", handleLang);
    return () => window.removeEventListener("appLanguageChange", handleLang);
  }, []);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndXRef.current = e.changedTouches[0].screenX;
    const diff = touchStartXRef.current - touchEndXRef.current;
    if (diff > 45) {
      setCurrentSlide((prev) => (prev + 1) % DESTINATION_SLIDES.length);
    } else if (diff < -45) {
      setCurrentSlide(
        (prev) => (prev - 1 + DESTINATION_SLIDES.length) % DESTINATION_SLIDES.length
      );
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="min-h-screen bg-[var(--canvas)] text-[var(--text-primary)] flex flex-col font-sans selection:bg-[var(--brand-blue-light)] selection:text-[var(--brand-blue)]">
      {/* ========================================================
          SEKSI 1: HERO SECTION (Warm Cream bg-[var(--canvas)])
          ======================================================== */}
      <section
        id="beranda"
        className="relative overflow-hidden bg-[var(--canvas)] pt-8 pb-12 sm:pt-12 sm:pb-16 lg:pt-16 lg:pb-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Kolom Teks Kiri */}
            <div className="lg:col-span-7 flex flex-col justify-center text-left">
              <div className="mb-4 sm:mb-5">
                <span className="font-serif italic text-base sm:text-lg text-[var(--brand-blue)] font-normal tracking-wide">
                  {lang === "id" ? "“Om Swastyastu! Selamat Datang di Bali”" : "“Om Swastyastu! Welcome to Bali”"}
                </span>
              </div>

              {/* H1 Headline Editorial - Skala Proporsional & Elegan */}
              <h1 className="font-serif text-3xl sm:text-4xl md:text-[2.75rem] leading-[1.2] tracking-[-0.025em] text-[var(--text-primary)] font-normal mb-5">
                {t.hero.headlineLead}
                <span className="text-[var(--brand-blue)] font-semibold underline decoration-[var(--brand-blue)]/25 underline-offset-8">
                  {t.hero.name}
                </span>
              </h1>

              {/* Deskripsi Ringkas */}
              <p className="text-[var(--text-muted)] text-base sm:text-[17px] leading-relaxed mb-8 max-w-xl">
                {t.hero.description}
              </p>

              {/* 2 Tombol CTA Berdampingan (Standarisasi Ukuran h-11, Primary Biru Samudra) */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4">
                <button
                  type="button"
                  onClick={() => handleWhatsAppClick("Hero Section CTA")}
                  className="inline-flex items-center justify-center gap-2 h-11 px-5 py-2.5 rounded-xl bg-[var(--brand-blue)] hover:bg-[#0F4C81] hover:opacity-95 text-white font-medium text-sm shadow-[0_2px_8px_rgba(24,120,184,0.25)] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 text-center cursor-pointer"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                  <span>{t.hero.btnWa}</span>
                </button>

                <Link
                  href="/tours"
                  className="inline-flex items-center justify-center gap-2 h-11 px-5 py-2.5 rounded-xl bg-white hover:bg-[var(--surface-alt)] text-[var(--text-primary)] border border-[var(--border)] font-medium text-sm transition-colors text-center"
                >
                  <span>{t.hero.btnCatalog}</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Kolom Visual Kanan: Slideshow Kartu Bertumpuk 3 Lapis (Stacked Card Gallery Slideshow) */}
            <div className="lg:col-span-5 w-full flex flex-col items-center justify-center">
              <div
                id="hero-slideshow-frame"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                className="relative w-full max-w-[320px] sm:max-w-[360px] md:max-w-[380px] lg:max-w-[400px] aspect-[4/5] mx-auto select-none flex items-center justify-center"
              >
                {DESTINATION_SLIDES.map((slide, idx) => {
                  // offset 0: Kartu Depan (Active Main Card)
                  // offset 1: Kartu Belakang Kanan (Next Card Stack)
                  // offset 2: Kartu Belakang Kiri (Previous Card Stack)
                  const offset = (idx - currentSlide + DESTINATION_SLIDES.length) % DESTINATION_SLIDES.length;

                  let stackClasses = "";
                  let isInteractive = false;

                  if (offset === 0) {
                    // Kartu Depan (Active Main Card): Tengah depan, bingkai putih tebal, luxury shadow
                    stackClasses =
                      "z-20 translate-x-0 rotate-0 scale-100 opacity-100 border-[6px] border-white shadow-[0_20px_50px_rgba(0,0,0,0.12)] pointer-events-auto";
                  } else if (offset === 1) {
                    // Kartu Belakang Kanan (Next Card Stack): Miring kanan (rotate-6), scale-85, opacity-65
                    stackClasses =
                      "z-10 translate-x-7 sm:translate-x-10 rotate-6 scale-85 opacity-65 border-4 border-white/90 shadow-[0_12px_30px_rgba(0,0,0,0.08)] cursor-pointer hover:opacity-85 pointer-events-auto";
                    isInteractive = true;
                  } else {
                    // Kartu Belakang Kiri (Previous Card Stack): Miring kiri (-rotate-6), scale-85, opacity-65
                    stackClasses =
                      "z-10 -translate-x-7 sm:-translate-x-10 -rotate-6 scale-85 opacity-65 border-4 border-white/90 shadow-[0_12px_30px_rgba(0,0,0,0.08)] cursor-pointer hover:opacity-85 pointer-events-auto";
                    isInteractive = true;
                  }

                  return (
                    <div
                      key={slide.id}
                      onClick={isInteractive ? () => setCurrentSlide(idx) : undefined}
                      className={`absolute inset-0 w-full h-full rounded-[2rem] overflow-hidden bg-stone-900 transition-all duration-700 ease-in-out transform-gpu origin-center ${stackClasses}`}
                    >
                      {/* Foto Destinasi */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={slide.imageUrl}
                        alt={slide.title}
                        className="w-full h-full object-cover object-center pointer-events-none"
                        loading={idx === 0 ? "eager" : "lazy"}
                      />

                      {/* Shading Halus di Bagian Bawah Foto */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                      {/* Floating Glassmorphism Tag Lokasi di Pojok Kiri Bawah (Khusus Kartu Depan Aktif) */}
                      {offset === 0 && (
                        <div className="absolute bottom-5 left-5 right-auto bg-black/60 backdrop-blur-md text-white text-xs font-medium px-3.5 py-1.5 rounded-full border border-white/20 shadow-lg flex items-center gap-1.5 pointer-events-none transition-all duration-500 z-30">
                          {/* Location Pin Icon Aksen */}
                          <svg
                            width="13"
                            height="13"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            stroke="none"
                            className="text-[var(--brand-accent)] shrink-0"
                          >
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z" />
                          </svg>
                          <span className="truncate tracking-wide text-white font-medium">
                            {slide.tag.replace(/^📍\s*/, "")}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* 3 Indikator Navigasi Titik/Garis Berbentuk Pil (Dash Indicators / Dots) */}
              <div
                className="relative z-30 flex items-center justify-center gap-2 mt-7 pt-1"
                role="tablist"
                aria-label="Slideshow Indikator"
              >
                {DESTINATION_SLIDES.map((slide, idx) => {
                  const isActive = idx === currentSlide;
                  return (
                    <button
                      key={slide.id}
                      type="button"
                      onClick={() => setCurrentSlide(idx)}
                      role="tab"
                      aria-selected={isActive}
                      aria-label={`Slide ${idx + 1}: ${slide.title}`}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        isActive
                          ? "w-8 bg-[var(--brand-blue)]"
                          : "w-2 bg-gray-300 hover:bg-gray-400"
                      }`}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SEKSI 2: BAR KEPERCAYAAN / TRUST BAR (Clean White bg-white)
          Pola Ritme 3 Warna: 1 Biru Samudra, 2 Hijau Bali, 3 Oranye Sunset, 4 Biru Samudra
          ======================================================== */}
      <section
        className="bg-white border-y border-[var(--border)] py-6 px-4 sm:px-6 lg:px-8"
        aria-label="Keunggulan Layanan"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
          {/* Item 1 - Biru Samudra */}
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[var(--brand-blue-light)] text-[var(--brand-blue)] flex items-center justify-center shrink-0">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div>
              <div className="font-bold text-sm text-[var(--text-primary)] leading-tight">
                {t.trustBar[0].title}
              </div>
              <div className="text-xs text-[var(--text-muted)] mt-0.5">
                {t.trustBar[0].desc}
              </div>
            </div>
          </div>

          {/* Item 2 - Hijau Bali */}
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[var(--brand-green-light)] text-[var(--brand-green)] flex items-center justify-center shrink-0">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="1" y="3" width="15" height="13" />
                <polygon points="16 8 20 8 23 11 23 16 16 8" />
                <circle cx="5.5" cy="18.5" r="2.5" />
                <circle cx="18.5" cy="18.5" r="2.5" />
              </svg>
            </div>
            <div>
              <div className="font-bold text-sm text-[var(--text-primary)] leading-tight">
                {t.trustBar[1].title}
              </div>
              <div className="text-xs text-[var(--text-muted)] mt-0.5">
                {t.trustBar[1].desc}
              </div>
            </div>
          </div>

          {/* Item 3 - Oranye Sunset */}
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[var(--brand-accent-light)] text-[var(--brand-accent)] flex items-center justify-center shrink-0">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
            </div>
            <div>
              <div className="font-bold text-sm text-[var(--text-primary)] leading-tight">
                {t.trustBar[2].title}
              </div>
              <div className="text-xs text-[var(--text-muted)] mt-0.5">
                {t.trustBar[2].desc}
              </div>
            </div>
          </div>

          {/* Item 4 - Kembali ke Biru Samudra (Pola Ritme Berulang) */}
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[var(--brand-blue-light)] text-[var(--brand-blue)] flex items-center justify-center shrink-0">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="none"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
            <div>
              <div className="font-bold text-sm text-[var(--text-primary)] leading-tight">
                {t.trustBar[3].title}
              </div>
              <div className="text-xs text-[var(--text-muted)] mt-0.5">
                {t.trustBar[3].desc}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SEKSI 3: KATALOG PAKET TUR FAVORIT (Warm Cream bg-[#FEFDFB])
          Pola Ritme 3 Warna untuk Badge & Hover Aksen: 1 Biru Samudra, 2 Hijau Bali, 3 Oranye Sunset
          Standarisasi Tombol Booking: h-11 px-5 py-2.5 rounded-xl
          ======================================================== */}
      <section
        id="katalog"
        className="bg-[var(--canvas)] py-16 sm:py-20 pb-20 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full"
      >
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-serif italic text-base sm:text-lg text-[var(--brand-blue)] block mb-2 font-normal tracking-wide">
            “{t.tours.tag}”
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[var(--text-primary)] font-normal mb-3">
            {t.tours.title}
          </h2>
          <p className="text-[var(--text-muted)] text-sm sm:text-base leading-relaxed">
            {t.tours.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {(() => {
            const orderedFirestoreTours =
              firestoreTours && firestoreTours.length > 0
                ? [...firestoreTours].sort((a, b) => {
                    const getOrder = (item: any) => {
                      const text = (item.name || item.slug || item.id || "").toLowerCase();
                      if (text.includes("uluwatu")) return 0;
                      if (text.includes("ubud")) return 1;
                      if (text.includes("bedugul")) return 2;
                      return 3;
                    };
                    return getOrder(a) - getOrder(b);
                  })
                : null;

            const toursList =
              orderedFirestoreTours && orderedFirestoreTours.length > 0
                ? orderedFirestoreTours.map((ft, idx) => {
                    const hasValidPrice = Boolean(ft.price && ft.price > 0);
                    const priceFormatted = hasValidPrice
                      ? lang === "en"
                        ? `IDR ${ft.price.toLocaleString("en-US")} (~$${Math.round(ft.price / 15500)} USD)`
                        : `Rp ${Number(ft.price).toLocaleString("id-ID")}`
                      : null;
                    return {
                      badge:
                        idx === 0
                          ? (lang === "id" ? "Sunset Terbaik" : "Sunset Classic")
                          : idx === 1
                          ? (lang === "id" ? "Favorit Budaya" : "Cultural Highlights")
                          : (lang === "id" ? "Warisan UNESCO" : "UNESCO Heritage"),
                      title: ft.name,
                      hasPrice: hasValidPrice,
                      price: priceFormatted,
                      duration: ft.duration,
                      highlights:
                        ft.highlights && ft.highlights.length > 0
                          ? ft.highlights.slice(0, 5)
                          : [
                              lang === "id" ? "Mobil Ber-AC Dingin & Bersih" : "Clean A/C Private Car",
                              lang === "id" ? "Pemandu Lokal Resmi HPI" : "Licensed Balinese HPI Guide",
                              lang === "id" ? "Jadwal Fleksibel Santai" : "Flexible Relaxed Pacing",
                              lang === "id" ? "Bebas Request Spot Foto" : "Free Photo Requests",
                              lang === "id" ? "Tanpa Komisi Toko Oleh-Oleh" : "No Commission Tourist Shops",
                            ],
                    };
                  })
                : t.tours.items.map((item) => ({
                    ...item,
                    hasPrice: true,
                  }));

            return toursList.map((tour, index) => {
              const isThirdCard = index === 2;
              // Pola Ritme 3 Warna (1-2-3):
              // Kartu 1 (Kiri - Uluwatu Sunset Cliff): Biru Samudra (#1878B8 / bg-[#EBF5FB]), CTA #1878B8 (hover #0F4C81)
              // Kartu 2 (Tengah - Ubud Cultural Heritage): Hijau Bali (#0C8C5E / bg-[#E8F6F0]), CTA #0C8C5E (hover #09734C)
              // Kartu 3 (Kanan - Bedugul Ulun Danu): Oranye Sunset (#E67E22 / bg-[#FDF3E6]), CTA #E67E22 (hover #D35400)
              const badgeColorClass =
                index === 0
                  ? "bg-[var(--brand-blue-light)] text-[var(--brand-blue)]"
                  : index === 1
                  ? "bg-[var(--brand-green-light)] text-[var(--brand-green)]"
                  : "bg-[var(--brand-accent-light)] text-[var(--brand-accent)]";

              const hoverBorderClass =
                index === 0
                  ? "hover:border-[var(--brand-blue)]"
                  : index === 1
                  ? "hover:border-[var(--brand-green)]"
                  : "hover:border-[var(--brand-accent)]";

              const accentColorClass =
                index === 0
                  ? "text-[var(--brand-blue)]"
                  : index === 1
                  ? "text-[var(--brand-green)]"
                  : "text-[var(--brand-accent)]";

              const ctaButtonClass =
                index === 0
                  ? "bg-[var(--brand-blue)] hover:bg-[#0F4C81] text-white shadow-[0_2px_8px_rgba(24,120,184,0.25)]"
                  : index === 1
                  ? "bg-[var(--brand-green)] hover:bg-[#09734C] text-white shadow-[0_2px_8px_rgba(12,140,94,0.25)]"
                  : "bg-[var(--brand-accent)] hover:bg-[#D35400] text-white shadow-[0_2px_8px_rgba(230,126,34,0.25)]";

              return (
                <article
                  key={index}
                  className={`bg-white border border-[var(--border)] rounded-2xl flex flex-col justify-between overflow-hidden shadow-[0_4px_20px_rgba(24,120,184,0.06)] hover:-translate-y-1.5 hover:shadow-[0_12px_36px_rgba(0,0,0,0.08)] transition-all duration-200 ${hoverBorderClass} ${
                    isThirdCard ? "md:col-span-2 lg:col-span-1" : ""
                  }`}
                >
                  <div>
                    {/* Header Kartu */}
                    <div className="p-6 pb-5 border-b border-[var(--border)]">
                      <div className="flex items-center mb-3">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${badgeColorClass}`}
                        >
                          {tour.badge}
                        </span>
                      </div>
                      <h3 className="font-bold text-lg text-[var(--text-primary)] mb-4 leading-snug">
                        {tour.title}
                      </h3>
                      {/* Penataan Tarif Bersih (Price on Request) - Warna Netral var(--text-primary) */}
                      <div className="flex flex-col">
                        <span className="text-base sm:text-lg font-bold text-[var(--text-primary)] tracking-tight">
                          {lang === "id" ? "Tarif Fleksibel / Hubungi WA" : "Price on Request / Rates via WA"}
                        </span>
                        <span className="text-[12px] sm:text-[13px] text-[var(--text-muted)] mt-0.5">
                          {lang === "id" ? "Konsultasi rute langsung gratis" : "Free custom itinerary consultation"}
                        </span>
                      </div>
                    </div>

                    {/* Isi Rute & Highlight */}
                    <div className="p-6">
                      <div className={`flex items-center gap-1.5 text-xs font-semibold ${accentColorClass} mb-4`}>
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                        <span>{tour.duration}</span>
                      </div>

                      <ul className="space-y-2.5 text-xs sm:text-[13px] text-[#121715]">
                        {tour.highlights.map((item, hIdx) => (
                          <li key={hIdx} className="flex items-start gap-2">
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              className={`${accentColorClass} shrink-0 mt-0.5`}
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Tombol Pesan via WhatsApp - CTA sesuai Ritme 3 Warna */}
                  <div className="p-5 pt-4 border-t border-[#EBE9E6] bg-[#FAF8F5]">
                    <button
                      type="button"
                      onClick={() => handleWhatsAppClick(`Kartu Tur: ${tour.title}`, tour.title)}
                      className={`w-full flex items-center justify-center gap-2 h-11 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer ${ctaButtonClass}`}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                      </svg>
                      <span>{t.tours.btnBook}</span>
                    </button>
                  </div>
                </article>
              );
            });
          })()}
        </div>

        {/* Tombol Sekunder di Bawah Grid Paket Tur -> href="/tours" (Standar Ukuran h-11, Biru Samudra) */}
        <div className="mt-10 sm:mt-12 text-center">
          <Link
            href="/tours"
            className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl bg-white hover:bg-[#EBF5FB] text-[#1878B8] border border-[#1878B8] font-medium text-sm shadow-xs transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>{t.tours.btnAllTours}</span>
          </Link>
        </div>
      </section>

      {/* ========================================================
          SEKSI 4: WHY CHOOSE US / TIGA PILAR UTAMA LAYANAN (Clean White bg-white)
          Pola Ritme 3 Warna: 1 Biru Samudra, 2 Hijau Bali, 3 Oranye Sunset
          ======================================================== */}
      <section
        id="tentang"
        className="bg-white border-y border-[#EBE9E6] py-16 sm:py-20 px-4 sm:px-6 lg:px-8 w-full"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="font-serif italic text-base sm:text-lg text-[#0C8C5E] block mb-2 font-normal tracking-wide">
              “{t.pillars.tag}”
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#08090A] font-normal mb-3">
              {t.pillars.title}
            </h2>
            <p className="text-[#5E6965] text-sm sm:text-base leading-relaxed">
              {t.pillars.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
            {/* Pilar 1 - Biru Samudra */}
            <article className="bg-[#FEFDFB] border border-[#EBE9E6] rounded-2xl p-7 sm:p-8 shadow-xs hover:-translate-y-1 transition-all duration-200 hover:border-[#1878B8]">
              <div className="w-12 h-12 rounded-xl bg-[#EBF5FB] text-[#1878B8] flex items-center justify-center mb-5">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <h3 className="font-bold text-lg text-[#08090A] mb-2.5">
                {t.pillars.items[0].title}
              </h3>
              <p className="text-sm text-[#5E6965] leading-relaxed">
                {t.pillars.items[0].desc}
              </p>
            </article>

            {/* Pilar 2 - Hijau Bali */}
            <article className="bg-[#FEFDFB] border border-[#EBE9E6] rounded-2xl p-7 sm:p-8 shadow-xs hover:-translate-y-1 transition-all duration-200 hover:border-[#0C8C5E]">
              <div className="w-12 h-12 rounded-xl bg-[#E8F6F0] text-[#0C8C5E] flex items-center justify-center mb-5">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg text-[#08090A] mb-2.5">
                {t.pillars.items[1].title}
              </h3>
              <p className="text-sm text-[#5E6965] leading-relaxed">
                {t.pillars.items[1].desc}
              </p>
            </article>

            {/* Pilar 3 - Oranye Sunset */}
            <article className="bg-[#FEFDFB] border border-[#EBE9E6] rounded-2xl p-7 sm:p-8 shadow-xs hover:-translate-y-1 transition-all duration-200 hover:border-[#E67E22]">
              <div className="w-12 h-12 rounded-xl bg-[#FDF3E6] text-[#E67E22] flex items-center justify-center mb-5">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="1" y="3" width="15" height="13" />
                  <polygon points="16 8 20 8 23 11 23 16 16 8" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
              </div>
              <h3 className="font-bold text-lg text-[#08090A] mb-2.5">
                {t.pillars.items[2].title}
              </h3>
              <p className="text-sm text-[#5E6965] leading-relaxed">
                {t.pillars.items[2].desc}
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ========================================================
          SEKSI 5: WILAYAH POPULER EKSPLORASI (Warm Cream bg-[var(--canvas)])
          Pola Ritme 3 Warna: 1 Biru Samudra, 2 Hijau Bali, 3 Oranye Sunset, 4 Biru Samudra
          ======================================================== */}
      <section className="bg-[var(--canvas)] py-16 sm:py-20 px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="font-serif italic text-base sm:text-lg text-[var(--brand-blue)] block mb-2 font-normal tracking-wide">
              “{t.regions.tag}”
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[var(--text-primary)] font-normal mb-3">
              {t.regions.title}
            </h2>
            <p className="text-[var(--text-muted)] text-sm sm:text-base leading-relaxed">
              {t.regions.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {(() => {
              // Koneksi Data Dinamis dari mockPopularDestinations & relasi mockAllTours
              const dynamicRegions = mockPopularDestinations.map((dest, idx) => {
                const linkedTour = mockAllTours.find(
                  (t) =>
                    t.slug === dest.tourSlug ||
                    (dest.tourSlugs && dest.tourSlugs.includes(t.slug))
                );

                const regionQuery =
                  idx === 0
                    ? "ubud"
                    : idx === 1
                    ? "uluwatu"
                    : idx === 2
                    ? "bedugul"
                    : "kintamani";

                const coverImage =
                  linkedTour?.coverImage ||
                  dest.coverImage ||
                  dest.imageUrl ||
                  "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop&q=80";

                const description =
                  lang === "en"
                    ? idx === 0
                      ? "Cultural heartland, sacred temples, lush emerald rice terraces, and hidden tropical waterfalls."
                      : idx === 1
                      ? "Dramatic limestone sea cliffs, secluded white sand beaches, legendary sunsets, and fresh seafood."
                      : idx === 2
                      ? "Refreshing mountain highlands, misty lake temples, and grand UNESCO World Heritage rice terraces."
                      : "Majestic caldera vistas of Mount and Lake Batur, floating cafes, and ancient indigenous villages."
                    : dest.description || linkedTour?.description || "";

                return {
                  id: dest.id,
                  locationName: dest.name,
                  badge: dest.badge || "Destinasi Pilihan",
                  description,
                  coverImage,
                  regionSlug: regionQuery,
                };
              });

              return dynamicRegions.map((region, idx) => {
                // Pola Ritme 3 Warna Sekuensial (1-2-3, berulang ke 1):
                // 1. Ubud (Biru Samudra): var(--brand-blue) / bg-[var(--brand-blue-light)], hover:border-[var(--brand-blue)], hover judul var(--brand-blue)
                // 2. Uluwatu (Hijau Bali): var(--brand-green) / bg-[var(--brand-green-light)], hover:border-[var(--brand-green)], hover judul var(--brand-green)
                // 3. Bedugul (Oranye Sunset): var(--brand-accent) / bg-[var(--brand-accent-light)], hover:border-[var(--brand-accent)], hover judul var(--brand-accent)
                // 4. Kintamani: Berulang ke Biru Samudra
                const rhythmIndex = idx % 3;

                const badgeClass =
                  rhythmIndex === 0
                    ? "bg-[var(--brand-blue-light)] text-[var(--brand-blue)]"
                    : rhythmIndex === 1
                    ? "bg-[var(--brand-green-light)] text-[var(--brand-green)]"
                    : "bg-[var(--brand-accent-light)] text-[var(--brand-accent)]";

                const hoverBorderClass =
                  rhythmIndex === 0
                    ? "hover:border-[var(--brand-blue)]"
                    : rhythmIndex === 1
                    ? "hover:border-[var(--brand-green)]"
                    : "hover:border-[var(--brand-accent)]";

                // Perbaikan Hover Judul: Pola Ritme 3 Warna Sekuensial
                const titleHoverClass =
                  rhythmIndex === 0
                    ? "group-hover:text-[var(--brand-blue)]"
                    : rhythmIndex === 1
                    ? "group-hover:text-[var(--brand-green)]"
                    : "group-hover:text-[var(--brand-accent)]";

                const linkTextClass =
                  rhythmIndex === 0
                    ? "text-[var(--brand-blue)] group-hover:text-[var(--brand-blue)]"
                    : rhythmIndex === 1
                    ? "text-[var(--brand-green)] group-hover:text-[var(--brand-green)]"
                    : "text-[var(--brand-accent)] group-hover:text-[var(--brand-accent)]";

                const arrowBgClass =
                  rhythmIndex === 0
                    ? "group-hover:bg-[var(--brand-blue)] group-hover:text-white"
                    : rhythmIndex === 1
                    ? "group-hover:bg-[var(--brand-green)] group-hover:text-white"
                    : "group-hover:bg-[var(--brand-accent)] group-hover:text-white";

                return (
                  <Link
                    key={region.id || idx}
                    href={`/tours?region=${region.regionSlug}`}
                    className={`group bg-white border border-[var(--border)] rounded-2xl overflow-hidden flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-300 shadow-xs hover:shadow-xl ${hoverBorderClass}`}
                  >
                    {/* Foto Sampul Destinasi Dinamis (Aspect 16:9 / 4:3 dengan Soft Rounded) */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--surface-alt)]">
                      <Image
                        src={region.coverImage}
                        alt={region.locationName}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                      {/* Tag Badge di atas foto sesuai Ritme 3 Warna */}
                      <div className="absolute top-3 left-3 z-10">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold shadow-xs ${badgeClass}`}
                        >
                          {region.badge}
                        </span>
                      </div>
                    </div>

                    {/* Konten Kartu */}
                    <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
                      <div>
                        {/* Judul Wilayah: font-serif, normal unhovered text-[var(--text-primary)], hover ritme 3 warna */}
                        <h3
                          className={`font-serif font-bold text-lg text-[var(--text-primary)] mb-2 leading-snug transition-colors ${titleHoverClass}`}
                        >
                          {region.locationName}
                        </h3>
                        <p className="text-xs sm:text-[13px] text-[var(--text-muted)] leading-relaxed line-clamp-3">
                          {region.description}
                        </p>
                      </div>

                      <div className="pt-4 mt-4 border-t border-[var(--border)] flex items-center justify-between text-xs font-semibold">
                        <span className={`transition-colors ${linkTextClass}`}>
                          {lang === "id" ? "Eksplorasi Tur" : "Explore Tours"}
                        </span>
                        <div
                          className={`w-7 h-7 rounded-full bg-[var(--surface-alt)] text-[var(--text-muted)] flex items-center justify-center transition-all ${arrowBgClass}`}
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                          >
                            <line x1="7" y1="17" x2="17" y2="7" />
                            <polyline points="7 7 17 7 17 17" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              });
            })()}
          </div>
        </div>
      </section>

      {/* ========================================================
          SEKSI 6: ULASAN WISATAWAN / TESTIMONI (Clean White bg-white)
          Pola Ritme 3 Warna: 1 Biru Samudra, 2 Hijau Bali, 3 Oranye Sunset
          Standarisasi Tombol Sekunder: h-11 px-6 rounded-xl
          ======================================================== */}
      <section
        id="ulasan"
        className="bg-white border-y border-[#EBE9E6] py-16 sm:py-20 px-4 sm:px-6 lg:px-8 w-full"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="font-serif italic text-base sm:text-lg text-[#0C8C5E] block mb-2 font-normal tracking-wide">
              “{t.reviews.tag}”
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#08090A] font-normal mb-3">
              {t.reviews.title}
            </h2>
            <p className="text-[#5E6965] text-sm sm:text-base leading-relaxed">
              {t.reviews.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
            {(() => {
              const reviewsList =
                lang === "id" && firestoreReviews && firestoreReviews.length > 0
                  ? firestoreReviews.map((fr) => ({
                      rating: fr.rating || 5,
                      text: `“${fr.content}”`,
                      author: fr.authorName,
                      origin: fr.authorOrigin,
                      tourType: fr.tourName || "Tur Privat",
                    }))
                  : t.reviews.items;

              return reviewsList.map((rev, idx) => (
                <ReviewCard
                  key={idx}
                  review={rev}
                  index={idx}
                  className="h-full"
                />
              ));
            })()}
          </div>

          {/* Tombol Sekunder di Bawah Ulasan -> href="/reviews" (Standar Ukuran h-11) */}
          <div className="mt-10 sm:mt-12 text-center">
            <Link
              href="/reviews"
              className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl bg-white hover:bg-[#EBF5FB] text-[#1878B8] border border-[#1878B8] font-medium text-sm shadow-xs transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>{t.reviews.btnAllReviews}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================
          SEKSI 7: PERTANYAAN YANG SERING DIAJUKAN / FAQ (Warm Cream bg-[#FEFDFB])
          Standarisasi Tombol Sekunder: h-11 px-6 rounded-xl
          ======================================================== */}
      <section
        id="faq"
        className="bg-[#FEFDFB] py-16 sm:py-20 px-4 sm:px-6 lg:px-8 w-full"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="font-serif italic text-base sm:text-lg text-[#1878B8] block mb-2 font-normal tracking-wide">
              “{t.faq.tag}”
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#08090A] font-normal mb-3">
              {t.faq.title}
            </h2>
            <p className="text-[#5E6965] text-sm sm:text-base leading-relaxed">
              {t.faq.subtitle}
            </p>
          </div>

          <div className="space-y-4">
            {(() => {
              const faqList =
                lang === "id" && firestoreFaqs && firestoreFaqs.length > 0
                  ? firestoreFaqs.map((ff) => ({
                      q: ff.question,
                      a: ff.answer,
                    }))
                  : t.faq.items;

              return faqList.map((item, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={index}
                    className={`border rounded-2xl overflow-hidden shadow-xs transition-all duration-200 ${
                      isOpen
                        ? "bg-[#EAF5FC] border-[#1878B8]/30 shadow-xs"
                        : "bg-white hover:bg-[#EAF5FC]/50 border-[#EBE9E6]"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(index)}
                      aria-expanded={isOpen}
                      className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer transition-colors"
                    >
                      <span className="font-bold text-base sm:text-lg text-[#08090A] pr-2">
                        {item.q}
                      </span>
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                          isOpen
                            ? "bg-[#1878B8] text-white rotate-180"
                            : "bg-[#EBF5FB] text-[#1878B8]"
                        }`}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-[15px] text-[#5E6965] leading-relaxed border-t border-[#1878B8]/15">
                        <p>{item.a}</p>
                      </div>
                    )}
                  </div>
                );
              });
            })()}
          </div>

          {/* Tombol Sekunder di Bawah FAQ -> href="/faq" (Standar Ukuran h-11) */}
          <div className="mt-10 sm:mt-12 text-center">
            <Link
              href="/faq"
              className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl bg-white hover:bg-[#EBF5FB] text-[#1878B8] border border-[#1878B8] font-medium text-sm shadow-xs transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>{t.faq.btnAllFaq}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================
          SEKSI 8: BOTTOM CTA BANNER (Gradien Biru Samudra Elegan)
          bg-gradient-to-r from-[#0F4C81] to-[#1878B8] text-white
          Standarisasi Tombol WhatsApp Aksi Khusus: h-11 px-5 py-2.5 bg-[#E67E22]
          ======================================================== */}
      <section
        id="kontak"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16 sm:my-20 w-full"
      >
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0F4C81] to-[#1878B8] text-white p-8 sm:p-12 lg:p-14 shadow-xl flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="max-w-2xl relative z-10">
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal leading-tight mb-4">
              {t.cta.title}
            </h2>
            <p className="text-sm sm:text-base text-white/90 leading-relaxed">
              {t.cta.desc}
            </p>
          </div>

          <div className="relative z-10 shrink-0">
            <button
              type="button"
              onClick={() =>
                handleWhatsAppClick(
                  "Bottom CTA Banner",
                  undefined,
                  "Halo Bli Gede, saya ingin konsultasi gratis rute custom itinerary untuk liburan privat di Bali."
                )
              }
              className="inline-flex items-center justify-center gap-2 h-11 px-5 py-2.5 rounded-xl bg-[#E67E22] hover:bg-[#D35400] text-white font-medium text-sm shadow-[0_4px_16px_rgba(230,126,34,0.3)] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
              <span>{t.cta.btn}</span>
            </button>
          </div>

          <div
            className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#E67E22]/20 blur-3xl pointer-events-none"
            aria-hidden="true"
          />
        </div>
      </section>

      {/* ========================================================
          SEKSI 9: FOOTER LENGKAP
          ======================================================== */}
      <footer className="bg-[#08090A] text-white pt-14 pb-12 px-4 sm:px-6 lg:px-8 mt-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-white/10">
          {/* Kolom 1: Profil Brand & Lisensi */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-4">
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 shrink-0">
              <Image
                src="/assets/gede-logo-white.svg"
                alt="Gede Bali Guide Logo"
                width={40}
                height={40}
                className="w-full h-full object-contain"
              />
            </div>
              <span className="font-bold text-lg tracking-tight">Gede Bali Guide</span>
            </div>
            <p className="text-[#969E9B] text-xs sm:text-sm leading-relaxed max-w-sm mb-4">
              {t.footer.bio}
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-xs text-[#1878B8]">
              <span className="w-2 h-2 rounded-full bg-[#1878B8]" />
              {t.footer.hpiBadge}
            </div>
          </div>

          {/* Kolom 2: Navigasi Cepat */}
          <div className="md:col-span-3">
            <div className="font-semibold text-sm mb-4 tracking-wide uppercase text-white/80">
              {t.footer.quickLinks}
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#969E9B]">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  {t.nav.home}
                </Link>
              </li>
              <li>
                <Link href="/tours" className="hover:text-white transition-colors">
                  {t.nav.tours}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-white transition-colors">
                  {t.nav.gallery}
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="hover:text-white transition-colors">
                  {t.nav.reviews}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  {t.nav.faq}
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Kontak Langsung */}
          <div className="md:col-span-4">
            <div className="font-semibold text-sm mb-4 tracking-wide uppercase text-white/80">
              {t.footer.directContact}
            </div>
            <div className="space-y-2.5 text-xs sm:text-sm text-[#969E9B]">
              <div className="flex items-start gap-2.5">
                <span className="text-white font-medium">WhatsApp:</span>
                <a
                  href="https://wa.me/6281234567890"
                  onClick={(e) => {
                    e.preventDefault();
                    handleWhatsAppClick("Footer Direct Contact");
                  }}
                  className="text-[#E67E22] hover:underline cursor-pointer"
                >
                  +62 812-3456-7890
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-white font-medium">{t.footer.areaLabel}</span>
                <span>{t.footer.areaValue}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-white font-medium">{t.footer.hoursLabel}</span>
                <span>{t.footer.hoursValue}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#717D79]">
          <div>{t.footer.copyright}</div>
          <div className="flex items-center gap-4">
            <div className="font-mono text-[11px]">{t.footer.license}</div>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors cursor-pointer"
              aria-label="Back to Top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
