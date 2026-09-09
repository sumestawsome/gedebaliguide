import {
  mockGuideProfile,
  mockTrustItems,
} from "@/data/mock-data";
import { HomeContentSchema } from "@/types";
import { getWhatsAppConfig } from "@/lib/services/whatsapp-config-service";
import { getActiveFeaturedTours } from "@/lib/services/tour-service";
import { getPopularDestinations } from "@/lib/services/destination-service";
import { getFeaturedFiveStarReviews } from "@/lib/services/review-service";

/**
 * Service to aggregate and return unified home content.
 * Follows the HomeContentSchema structure and provides safe fallback defaults.
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
