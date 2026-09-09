import { mockGuideProfile } from "@/data/mock-data";

export interface WhatsAppMessageOptions {
  tourName?: string;
  tourSlug?: string;
  guestName?: string;
  guestCount?: number;
  tripDate?: string;
  pickupLocation?: string;
  hotelName?: string;
  customNote?: string;
  priceFormatted?: string;
  source?:
    | "hero"
    | "floating"
    | "navbar"
    | "tour_card"
    | "tour_detail"
    | "custom_itinerary"
    | "footer"
    | "about_hero"
    | "about_cta"
    | "about"
    | "reviews"
    | "gallery"
    | "faq"
    | "contact"
    | "pricing_banner";
  phoneNumber?: string;
}

/**
 * Normalizes a phone number to standard international format without '+' or spaces.
 * E.g., "+62 812-3456-7890" becomes "6281234567890", "081234567890" becomes "6281234567890"
 */
export function normalizePhoneNumber(phone: string): string {
  if (!phone) return "6281234567890";
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("0")) {
    return "62" + digits.slice(1);
  }
  return digits;
}

/**
 * Generates formatted, polite Indonesian message text for Gede Bali Guide WhatsApp chat.
 * Tailored to Bali cultural warmth ("Om Swastyastu / Halo Bli Gede").
 */
export function formatWhatsAppMessage(options: WhatsAppMessageOptions = {}): string {
  const {
    tourName,
    guestName,
    guestCount,
    tripDate,
    pickupLocation,
    hotelName,
    customNote,
    priceFormatted,
    source,
  } = options;

  // 1. Specific Tour Booking / Inquiry
  if (tourName) {
    const greeting = guestName?.trim()
      ? `Om Swastyastu / Halo Bli Gede, saya *${guestName.trim()}*.`
      : `Om Swastyastu / Halo Bli Gede,`;

    let msg = `${greeting}\nSaya tertarik memesan paket tur privat:\n⭐ *${tourName}*`;

    const details: string[] = [];

    if (tripDate) {
      details.push(`• Rencana Tanggal: ${tripDate}`);
    }
    if (guestCount && guestCount > 0) {
      details.push(`• Jumlah Tamu: ${guestCount} orang`);
    }
    const pickup = pickupLocation || hotelName;
    if (pickup?.trim()) {
      details.push(`• Lokasi Penjemputan / Hotel: ${pickup.trim()}`);
    }
    if (priceFormatted) {
      details.push(`• Estimasi Biaya: ${priceFormatted}`);
    }
    if (customNote?.trim()) {
      details.push(`• Catatan Khusus: ${customNote.trim()}`);
    }

    if (details.length > 0) {
      msg += `\n\nDetail Rencana Perjalanan:\n${details.join("\n")}`;
    }

    msg += `\n\nApakah slot jadwal untuk tanggal tersebut masih tersedia ya Bli? Suksema (Terima kasih)!`;
    return msg;
  }

  // 2. Custom Itinerary Request
  if (source === "custom_itinerary" || customNote?.toLowerCase().includes("custom")) {
    const greeting = guestName?.trim()
      ? `Om Swastyastu / Halo Bli Gede, saya *${guestName.trim()}*.`
      : `Om Swastyastu / Halo Bli Gede,`;

    let msg = `${greeting}\nSaya ingin merancang *Custom Itinerary* liburan privat ke Bali bersama keluarga/rombongan.`;

    const details: string[] = [];
    if (tripDate) {
      details.push(`• Rencana Tanggal: ${tripDate}`);
    }
    if (guestCount && guestCount > 0) {
      details.push(`• Jumlah Tamu: ${guestCount} orang`);
    }
    if (customNote?.trim()) {
      details.push(`• Keinginan / Destinasi Impian:\n${customNote.trim()}`);
    }

    if (details.length > 0) {
      msg += `\n\nDetail Rencana Kami:\n${details.join("\n")}`;
    }

    msg += `\n\nMohon masukan rekomendasi rute paling nyaman dan estimasi biayanya ya Bli. Suksema!`;
    return msg;
  }

  // 3. General Consultation Fallback
  return `Om Swastyastu / Halo Bli Gede, saya menemukan kontak Anda dari website Gede Bali Guide dan ingin konsultasi seputar tur privat di Bali. Mohon info ketersediaan jadwal ya Bli. Suksema!`;
}

/**
 * Builds the complete wa.me deep link URL with properly encoded message.
 */
export function buildWhatsAppUrl(options: WhatsAppMessageOptions = {}): string {
  const targetPhone = normalizePhoneNumber(
    options.phoneNumber || mockGuideProfile.whatsappNumber || "6281234567890"
  );
  const text = formatWhatsAppMessage(options);
  return `https://wa.me/${targetPhone}?text=${encodeURIComponent(text)}`;
}

/**
 * Quick helper for specific tour booking inquiry
 */
export function getTourInquiryUrl(
  tourName: string,
  guestCount?: number,
  tripDate?: string,
  customNote?: string,
  pickupLocation?: string
): string {
  return buildWhatsAppUrl({
    tourName,
    guestCount,
    tripDate,
    customNote,
    pickupLocation,
    source: "tour_card",
  });
}

/**
 * Quick helper for tour booking with full options
 */
export function getTourBookingUrl(options: WhatsAppMessageOptions): string {
  return buildWhatsAppUrl({
    ...options,
    source: options.source || "tour_detail",
  });
}

/**
 * Quick helper for custom itinerary planning
 */
export function getCustomItineraryUrl(
  customNote?: string,
  guestCount?: number,
  tripDate?: string
): string {
  return buildWhatsAppUrl({
    source: "custom_itinerary",
    customNote,
    guestCount,
    tripDate,
  });
}

/**
 * Quick helper for direct question regarding a specific tour
 */
export function getDirectQuestionUrl(tourName: string, question?: string): string {
  return buildWhatsAppUrl({
    tourName,
    customNote: question || "Saya ingin tanya-tanya dan diskusi terlebih dahulu mengenai rute tur ini",
    source: "tour_detail",
  });
}

/**
 * Quick helper for general consultation URL
 */
export function getGeneralConsultationUrl(
  source: WhatsAppMessageOptions["source"] = "hero"
): string {
  return buildWhatsAppUrl({ source });
}

/**
 * Quick helper to open WhatsApp chat directly without pre-filled message
 */
export function getDirectChatUrl(phoneNumber?: string): string {
  const targetPhone = normalizePhoneNumber(
    phoneNumber || mockGuideProfile.whatsappNumber || "6281234567890"
  );
  return `https://wa.me/${targetPhone}`;
}

/**
 * Creates live preview data (both formatted text and WhatsApp link)
 */
export function createWhatsAppPreview(options: WhatsAppMessageOptions): {
  text: string;
  url: string;
} {
  return {
    text: formatWhatsAppMessage(options),
    url: buildWhatsAppUrl(options),
  };
}

