import { getFirestoreDocument, setFirestoreDocument } from "@/lib/firestore/rest-client";
import {
  HomePageContent,
  BilingualHomePageContent,
  MediaSectionData,
  HomeContentSchema,
} from "@/types";
import { ButtonVariant } from "@/lib/button-variants";
import { normalizeMediaData } from "@/lib/services/about-service";
import { mockGuideProfile, mockTrustItems } from "@/data/mock-data";
import { getWhatsAppConfig } from "@/lib/services/whatsapp-config-service";
import { getActiveFeaturedTours } from "@/lib/services/tour-service";
import { getPopularDestinations } from "@/lib/services/destination-service";
import { getFeaturedFiveStarReviews } from "@/lib/services/review-service";

export const defaultHeroMedia: MediaSectionData = {
  mode: "multi",
  singleTemplate: "classic-editorial",
  multiTemplate: "stacked-deck",
  images: [
    {
      id: "hero-slide-1",
      url: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1000&auto=format&fit=crop&q=85",
      alt: "Pura Ulun Danu Beratan, Bedugul",
      caption: "📍 Ulun Danu Beratan, Bedugul",
    },
    {
      id: "hero-slide-2",
      url: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=1000&auto=format&fit=crop&q=85",
      alt: "Pantai Melasti & Tebing Ungasan",
      caption: "📍 Pantai Melasti, Ungasan",
    },
    {
      id: "hero-slide-3",
      url: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=1000&auto=format&fit=crop&q=85",
      alt: "Terasering Tegalalang, Ubud",
      caption: "📍 Terasering Tegalalang, Ubud",
    },
  ],
  caption: "Pemandangan & Destinasi Ikonik Bali Bersama Bli Gede",
};

export const defaultHomePageContent: HomePageContent = {
  hero: {
    badge: "Pemandu Lokal Resmi HPI",
    greeting: "“Om Swastyastu! Selamat Datang di Bali”",
    headlineLead: "Jelajahi Pesona Asli Bali Bersama ",
    name: "Gede Sudiartana",
    description:
      "Pemandu lokal ramah berlisensi resmi HPI Bali dengan pengalaman 10+ tahun. Nikmati perjalanan privat santai dengan armada mobil ber-AC bersih, rute fleksibel murni eksplorasi budaya dan panorama alam tanpa paksaan belanja oleh-oleh.",
    btnWa: "Konsultasi via WhatsApp",
    btnCatalog: "Lihat Katalog Tur",
    ctaPrimaryVariant: "ocean-blue-solid",
    ctaSecondaryVariant: "neutral-outline",
    media: defaultHeroMedia,
  },
  trustBar: [
    { id: "tb-1", title: "100% Tur Privat", desc: "Tanpa digabung peserta lain" },
    { id: "tb-2", title: "Armada Mobil Ber-AC", desc: "Bersih, sejuk & wangi terawat" },
    { id: "tb-3", title: "Bebas Request Spot Foto", desc: "Berhenti kapan saja sesuka hati" },
    { id: "tb-4", title: "Rating 5.0 / 5.0", desc: "Dipercaya 1.200+ wisatawan" },
  ],
  pillars: {
    tag: "Jaminan Kenyamanan Anda",
    title: "Tiga Pilar Utama Layanan",
    subtitle:
      "Komitmen profesionalitas untuk memastikan liburan Bali Anda berkesan, aman, dan sarat wawasan budaya luhur.",
    items: [
      {
        id: "pillar-1",
        title: "10+ Tahun Pengalaman",
        desc: "Menguasai rute terbaik bebas macet, estimasi waktu ideal di setiap pura dan atraksi, serta spot foto tersembunyi agar momen Anda santai tanpa terburu-buru.",
      },
      {
        id: "pillar-2",
        title: "Lisensi Resmi HPI Bali",
        desc: "Wawasan budaya autentik, tata krama pura, dan kisah sejarah Bali yang valid langsung dari pemandu bersertifikasi resmi Himpunan Pramuwisata Indonesia (No. HPI-BALI-2015-8849).",
      },
      {
        id: "pillar-3",
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
    btnAllTours: "Lihat Semua Paket Tur →",
  },
  regions: {
    tag: "Destinasi Utama",
    title: "Wilayah Populer Eksplorasi",
    subtitle:
      "Rute dapat digabungkan atau disesuaikan dengan lokasi penginapan dan preferensi rombongan Anda.",
    items: [
      {
        id: "reg-1",
        badge: "Budaya & Alam",
        title: "Ubud & Gianyar",
        desc: "Pusat kesenian tradisional, pura suci berwibawa, sawah bertingkat hijau asri, serta lembah air terjun tropis alami.",
        image:
          "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop&q=80",
        regionQuery: "ubud",
      },
      {
        id: "reg-2",
        badge: "Pantai & Tebing",
        title: "Uluwatu & Jimbaran",
        desc: "Tebing kapur dramatis menjorok ke samudra lepas, pantai pasir putih tersembunyi, sunset legendaris, dan hidangan laut segar.",
        image:
          "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=800&auto=format&fit=crop&q=80",
        regionQuery: "uluwatu",
      },
      {
        id: "reg-3",
        badge: "Sejuk Pegunungan",
        title: "Bedugul & Jatiluwih",
        desc: "Udara dingin menyegarkan, pura danau berkabut yang menentramkan jiwa, serta keagungan sawah terasering warisan UNESCO.",
        image:
          "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&auto=format&fit=crop&q=80",
        regionQuery: "bedugul",
      },
      {
        id: "reg-4",
        badge: "Panorama Kaldera",
        title: "Kintamani & Batur",
        desc: "Pemandangan megah Gunung dan Danau Batur, kafe estetik di atas awan, serta desa kuno yang kaya tradisi asli Bali.",
        image:
          "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?w=800&auto=format&fit=crop&q=80",
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
  },
  faq: {
    tag: "Bantuan & Informasi",
    title: "Pertanyaan yang Sering Diajukan",
    subtitle:
      "Informasi lengkap dan transparan untuk kenyamanan perencanaan liburan Anda di Pulau Dewata.",
    btnAllFaq: "Lihat Semua Tanya Jawab (15 Pertanyaan Lengkap) →",
  },
  cta: {
    title: "Ingin Rute Khusus Sesuai Selera Anda?",
    desc: "Punya destinasi impian sendiri, kebutuhan durasi berbeda, atau perlu penjemputan khusus bandara dan hotel? Konsultasikan rencana perjalanan Anda bersama Bli Gede secara gratis tanpa komitmen.",
    btn: "Konsultasi Rute Gratis via WhatsApp",
    buttonVariant: "sunset-amber-solid",
  },
};

export const defaultHomePageContentEn: HomePageContent = {
  hero: {
    badge: "Official HPI Licensed Local Guide",
    greeting: "“Om Swastyastu! Welcome to Bali”",
    headlineLead: "Discover Authentic Bali with ",
    name: "Gede Sudiartana",
    description:
      "Friendly local guide officially licensed by HPI Bali with 10+ years of experience. Enjoy a relaxed private journey in a clean air-conditioned car, with flexible itineraries focused purely on culture and nature without forced shopping stops.",
    btnWa: "Consult via WhatsApp",
    btnCatalog: "View Tour Packages",
    ctaPrimaryVariant: "ocean-blue-solid",
    ctaSecondaryVariant: "neutral-outline",
    media: defaultHeroMedia,
  },
  trustBar: [
    { id: "tb-1", title: "100% Private Tours", desc: "Never shared with strangers" },
    { id: "tb-2", title: "Air-Conditioned Fleet", desc: "Clean, cool & well-maintained" },
    { id: "tb-3", title: "Flexible Photo Stops", desc: "Stop anytime at your own pace" },
    { id: "tb-4", title: "5.0 / 5.0 Rating", desc: "Trusted by 1,200+ travelers" },
  ],
  pillars: {
    tag: "Your Peace of Mind",
    title: "Three Pillars of Our Service",
    subtitle:
      "Professional commitment to ensure your Balinese holiday is memorable, safe, and rich in cultural wisdom.",
    items: [
      {
        id: "pillar-1",
        title: "10+ Years of Experience",
        desc: "Mastering the best traffic-free routes, optimal timing for every temple and attraction, and secret photo viewpoints for an unhurried, peaceful trip.",
      },
      {
        id: "pillar-2",
        title: "Licensed by HPI Bali",
        desc: "Authentic cultural stories, sacred temple etiquette, and verified historical insights from an officially certified guide (License No. HPI-BALI-2015-8849).",
      },
      {
        id: "pillar-3",
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
    btnAllTours: "View All Tour Packages →",
  },
  regions: {
    tag: "Main Destinations",
    title: "Popular Exploration Regions",
    subtitle:
      "Routes can be tailored or customized to your hotel location and party preferences.",
    items: [
      {
        id: "reg-1",
        badge: "Culture & Nature",
        title: "Ubud & Gianyar",
        desc: "Traditional arts epicenter, regal holy temples, lush terraced rice fields, and pristine tropical waterfall canyons.",
        image:
          "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop&q=80",
        regionQuery: "ubud",
      },
      {
        id: "reg-2",
        badge: "Cliffs & Coast",
        title: "Uluwatu & Jimbaran",
        desc: "Dramatic limestone cliffs jutting over the Indian Ocean, hidden white sand coves, legendary sunset views, and fresh seafood.",
        image:
          "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=800&auto=format&fit=crop&q=80",
        regionQuery: "uluwatu",
      },
      {
        id: "reg-3",
        badge: "Mountain Breeze",
        title: "Bedugul & Jatiluwih",
        desc: "Refreshing mountain air, misty lake shrine serenity, and UNESCO-honored emerald stepped rice terraces.",
        image:
          "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&auto=format&fit=crop&q=80",
        regionQuery: "bedugul",
      },
      {
        id: "reg-4",
        badge: "Caldera Panorama",
        title: "Kintamani & Batur",
        desc: "Majestic Mount and Lake Batur vistas, aesthetic clouds-level cafes, and ancient villages steeped in heritage.",
        image:
          "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?w=800&auto=format&fit=crop&q=80",
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
  },
  faq: {
    tag: "Help & Information",
    title: "Frequently Asked Questions",
    subtitle:
      "Clear and transparent details to help you plan an effortless holiday in Bali.",
    btnAllFaq: "View All FAQs (15 Complete Questions) →",
  },
  cta: {
    title: "Want a Custom Itinerary Tailored to You?",
    desc: "Have your own bucket-list spots, unique trip durations, or need dedicated airport and inter-hotel transfers? Chat with Bli Gede for free, no-obligation itinerary advice.",
    btn: "Free WhatsApp Consultation",
    buttonVariant: "sunset-amber-solid",
  },
};

export const defaultBilingualHomePageContent: BilingualHomePageContent = {
  id: defaultHomePageContent,
  en: defaultHomePageContentEn,
  ctaPrimaryVariant: "ocean-blue-solid",
  ctaSecondaryVariant: "neutral-outline",
  ctaBannerVariant: "sunset-amber-solid",
  heroMedia: defaultHeroMedia,
};

/**
 * Normalisasi data seksi Home agar selalu kompatibel dan tidak memicu error undefined
 */
export function normalizeHomeSection(
  raw: any,
  fallback: HomePageContent
): HomePageContent {
  if (!raw) return fallback;

  const heroMedia = normalizeMediaData(
    raw.hero?.media || raw.heroMedia,
    defaultHeroMedia.images[0]
  );

  return {
    hero: {
      badge: raw.hero?.badge || fallback.hero.badge,
      greeting: raw.hero?.greeting || fallback.hero.greeting,
      headlineLead: raw.hero?.headlineLead || fallback.hero.headlineLead,
      name: raw.hero?.name || fallback.hero.name,
      description: raw.hero?.description || fallback.hero.description,
      btnWa: raw.hero?.btnWa || fallback.hero.btnWa,
      btnCatalog: raw.hero?.btnCatalog || fallback.hero.btnCatalog,
      ctaPrimaryVariant:
        raw.hero?.ctaPrimaryVariant ||
        fallback.hero.ctaPrimaryVariant ||
        "ocean-blue-solid",
      ctaSecondaryVariant:
        raw.hero?.ctaSecondaryVariant ||
        fallback.hero.ctaSecondaryVariant ||
        "neutral-outline",
      media: heroMedia,
    },
    trustBar:
      Array.isArray(raw.trustBar) && raw.trustBar.length > 0
        ? raw.trustBar
        : fallback.trustBar,
    pillars: {
      tag: raw.pillars?.tag || fallback.pillars.tag,
      title: raw.pillars?.title || fallback.pillars.title,
      subtitle: raw.pillars?.subtitle || fallback.pillars.subtitle,
      items:
        Array.isArray(raw.pillars?.items) && raw.pillars.items.length > 0
          ? raw.pillars.items
          : fallback.pillars.items,
    },
    tours: {
      tag: raw.tours?.tag || fallback.tours.tag,
      title: raw.tours?.title || fallback.tours.title,
      subtitle: raw.tours?.subtitle || fallback.tours.subtitle,
      btnAllTours: raw.tours?.btnAllTours || fallback.tours.btnAllTours,
    },
    regions: {
      tag: raw.regions?.tag || fallback.regions.tag,
      title: raw.regions?.title || fallback.regions.title,
      subtitle: raw.regions?.subtitle || fallback.regions.subtitle,
      items:
        Array.isArray(raw.regions?.items) && raw.regions.items.length > 0
          ? raw.regions.items
          : fallback.regions.items,
    },
    reviews: {
      tag: raw.reviews?.tag || fallback.reviews.tag,
      title: raw.reviews?.title || fallback.reviews.title,
      subtitle: raw.reviews?.subtitle || fallback.reviews.subtitle,
      btnAllReviews: raw.reviews?.btnAllReviews || fallback.reviews.btnAllReviews,
    },
    faq: {
      tag: raw.faq?.tag || fallback.faq.tag,
      title: raw.faq?.title || fallback.faq.title,
      subtitle: raw.faq?.subtitle || fallback.faq.subtitle,
      btnAllFaq: raw.faq?.btnAllFaq || fallback.faq.btnAllFaq,
    },
    cta: {
      title: raw.cta?.title || fallback.cta.title,
      desc: raw.cta?.desc || fallback.cta.desc,
      btn: raw.cta?.btn || fallback.cta.btn,
      buttonVariant:
        raw.cta?.buttonVariant || fallback.cta.buttonVariant || "sunset-amber-solid",
    },
    updatedAt: raw.updatedAt,
  };
}

/**
 * Mengambil konten dwibahasa Beranda dari dokumen Firestore 'settings/home_page'
 */
export async function getBilingualHomePageContent(): Promise<BilingualHomePageContent> {
  try {
    const doc = await getFirestoreDocument<any>("settings/home_page");
    if (doc) {
      const globalCtaPrimaryVariant: ButtonVariant =
        doc.ctaPrimaryVariant ||
        doc.hero?.ctaPrimaryVariant ||
        doc.id?.hero?.ctaPrimaryVariant ||
        doc.en?.hero?.ctaPrimaryVariant ||
        "ocean-blue-solid";

      const globalCtaSecondaryVariant: ButtonVariant =
        doc.ctaSecondaryVariant ||
        doc.hero?.ctaSecondaryVariant ||
        doc.id?.hero?.ctaSecondaryVariant ||
        doc.en?.hero?.ctaSecondaryVariant ||
        "neutral-outline";

      const globalCtaBannerVariant: ButtonVariant =
        doc.ctaBannerVariant ||
        doc.buttonVariant ||
        doc.cta?.buttonVariant ||
        doc.id?.cta?.buttonVariant ||
        doc.en?.cta?.buttonVariant ||
        "sunset-amber-solid";

      const globalHeroMedia = normalizeMediaData(
        doc.heroMedia || doc.id?.hero?.media || doc.en?.hero?.media,
        defaultHeroMedia.images[0]
      );

      const idContent = normalizeHomeSection(doc.id, defaultHomePageContent);
      const enContent = normalizeHomeSection(doc.en, defaultHomePageContentEn);

      // Sinkronkan nilai desain global ke kedua cabang
      idContent.hero.ctaPrimaryVariant = globalCtaPrimaryVariant;
      enContent.hero.ctaPrimaryVariant = globalCtaPrimaryVariant;

      idContent.hero.ctaSecondaryVariant = globalCtaSecondaryVariant;
      enContent.hero.ctaSecondaryVariant = globalCtaSecondaryVariant;

      idContent.cta.buttonVariant = globalCtaBannerVariant;
      enContent.cta.buttonVariant = globalCtaBannerVariant;

      idContent.hero.media = globalHeroMedia;
      enContent.hero.media = globalHeroMedia;

      return {
        id: idContent,
        en: enContent,
        ctaPrimaryVariant: globalCtaPrimaryVariant,
        ctaSecondaryVariant: globalCtaSecondaryVariant,
        ctaBannerVariant: globalCtaBannerVariant,
        heroMedia: globalHeroMedia,
        updatedAt: doc.updatedAt,
      };
    }
  } catch (error) {
    console.warn("Gagal mengambil bilingual 'settings/home_page':", error);
  }
  return defaultBilingualHomePageContent;
}

/**
 * Menyimpan data dwibahasa Beranda ke Cloud Firestore 'settings/home_page'
 */
export async function saveBilingualHomePageContent(
  bilingual: BilingualHomePageContent
): Promise<{ success: boolean; error?: string; data?: BilingualHomePageContent }> {
  try {
    const now = new Date().toISOString();

    const ctaPrimaryVariant: ButtonVariant =
      bilingual.ctaPrimaryVariant ||
      bilingual.id?.hero?.ctaPrimaryVariant ||
      bilingual.en?.hero?.ctaPrimaryVariant ||
      "ocean-blue-solid";

    const ctaSecondaryVariant: ButtonVariant =
      bilingual.ctaSecondaryVariant ||
      bilingual.id?.hero?.ctaSecondaryVariant ||
      bilingual.en?.hero?.ctaSecondaryVariant ||
      "neutral-outline";

    const ctaBannerVariant: ButtonVariant =
      bilingual.ctaBannerVariant ||
      bilingual.id?.cta?.buttonVariant ||
      bilingual.en?.cta?.buttonVariant ||
      "sunset-amber-solid";

    const heroMedia: MediaSectionData = normalizeMediaData(
      bilingual.heroMedia || bilingual.id?.hero?.media || bilingual.en?.hero?.media,
      defaultHeroMedia.images[0]
    );

    const synchronizedId = {
      ...bilingual.id,
      hero: {
        ...bilingual.id.hero,
        ctaPrimaryVariant,
        ctaSecondaryVariant,
        media: heroMedia,
      },
      cta: {
        ...bilingual.id.cta,
        buttonVariant: ctaBannerVariant,
      },
    };

    const synchronizedEn = {
      ...bilingual.en,
      hero: {
        ...bilingual.en.hero,
        ctaPrimaryVariant,
        ctaSecondaryVariant,
        media: heroMedia,
      },
      cta: {
        ...bilingual.en.cta,
        buttonVariant: ctaBannerVariant,
      },
    };

    const payload = {
      id: synchronizedId,
      en: synchronizedEn,
      ctaPrimaryVariant,
      ctaSecondaryVariant,
      ctaBannerVariant,
      heroMedia,
      updatedAt: now,
    };

    const isOk = await setFirestoreDocument("settings/home_page", payload);
    if (!isOk) {
      throw new Error("Gagal menyimpan dokumen 'settings/home_page' ke Firestore.");
    }

    return {
      success: true,
      data: payload,
    };
  } catch (error: any) {
    console.error("Error saveBilingualHomePageContent:", error);
    return {
      success: false,
      error: error?.message || "Gagal menyimpan data beranda ke Firestore.",
    };
  }
}

/**
 * Mengambil konten Beranda spesifik bahasa untuk halaman publik
 */
export async function getHomePageContent(
  lang: "id" | "en" = "id"
): Promise<HomePageContent> {
  const bilingual = await getBilingualHomePageContent();
  const selected = bilingual[lang] || bilingual.id || defaultHomePageContent;
  return {
    ...selected,
    id: bilingual.id,
    en: bilingual.en,
    updatedAt: bilingual.updatedAt,
  };
}

/**
 * Backward compatibility: getUnifiedHomeContent
 */
export async function getUnifiedHomeContent(): Promise<HomeContentSchema> {
  const [whatsAppConfig, activeFeaturedTours, activeDestinations, approvedReviews] =
    await Promise.all([
      getWhatsAppConfig(),
      getActiveFeaturedTours(6),
      getPopularDestinations(4),
      getFeaturedFiveStarReviews(3),
    ]);

  return {
    hero: {
      badgeText: "Tour Guide Resmi Berlisensi HPI Bali • Tanpa Biaya Calo",
      greeting: "Om Swastyastu!",
      welcomeText: "Selamat Datang di Bali",
      guideName: mockGuideProfile.name,
      tagline: mockGuideProfile.greeting,
      description: mockGuideProfile.bio,
      featureChecklist: [
        "100% Tur Privat (Hanya Rombongan Anda)",
        "Mobil MPV/SUV Ber-AC Dingin & Terawat",
        "Rute Fleksibel & Bebas Request Spot Foto",
        "Tanpa Kewajiban Belanja Toko Oleh-Oleh",
      ],
      heroImageUrl:
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&auto=format&fit=crop&q=80",
      avatarUrl: mockGuideProfile.avatarUrl,
      licenseNumber: mockGuideProfile.licenseNumber,
      experienceYears: mockGuideProfile.experienceYears,
    },
    trustItems: mockTrustItems.map((item, idx) => ({
      ...item,
      tag: idx === 0 ? "Berpengalaman" : idx === 1 ? "Terverifikasi HPI" : "Standar VIP",
      order: idx + 1,
    })),
    whatsApp: whatsAppConfig,
    directBooking: {
      headline: "Ingin Rute Khusus Sesuai Selera Anda?",
      subheadline:
        "Ceritakan tempat impian yang ingin Anda kunjungi di Bali. Bli Gede akan membantu merancang jadwal yang santai, nyaman, dan efisien untuk Anda dan keluarga.",
      benefits: [
        {
          id: "benefit-1",
          icon: "CheckCircle2",
          text: "Tanpa Biaya Calo & Tanpa DP Online",
        },
        {
          id: "benefit-2",
          icon: "Car",
          text: "Armada Mobil Privat Ber-AC Dingin",
        },
        {
          id: "benefit-3",
          icon: "Clock",
          text: "Waktu Penjemputan Fleksibel",
        },
      ],
      ctaButtonText: "Chat WhatsApp dengan Gede Sekarang",
      noteText: "Biasanya membalas dalam beberapa menit • Jam layanan 07:00 - 22:00 WITA",
    },
    featuredTours: activeFeaturedTours,
    destinations: activeDestinations,
    testimonials: approvedReviews,
    meta: {
      lastUpdated: new Date().toISOString(),
      version: "1.0.0",
    },
  };
}
