import { mockGuideProfile } from "@/data/mock-data";

export interface WhatsAppMessageOptions {
  tourName?: string;
  guestCount?: number;
  tripDate?: string;
  customNote?: string;
  source?: "hero" | "floating" | "navbar" | "tour_card" | "tour_detail" | "custom_itinerary" | "footer";
  phoneNumber?: string;
}

/**
 * Normalizes a phone number to standard international format without '+' or spaces.
 * E.g., "+62 812-3456-7890" becomes "6281234567890"
 */
export function normalizePhoneNumber(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("0")) {
    return "62" + digits.slice(1);
  }
  return digits;
}

/**
 * Generates formatted, polite Indonesian message text for Gede Bali Guide WhatsApp chat.
 */
export function formatWhatsAppMessage(options: WhatsAppMessageOptions): string {
  const { tourName, guestCount, tripDate, customNote, source } = options;

  if (tourName) {
    let msg = `Halo Bli Gede, saya tertarik dengan paket tur *${tourName}*.`;
    const details: string[] = [];

    if (tripDate) {
      details.push(`• Rencana tanggal: ${tripDate}`);
    }
    if (guestCount && guestCount > 0) {
      details.push(`• Jumlah tamu: ${guestCount} orang`);
    }
    if (customNote) {
      details.push(`• Catatan/request: ${customNote}`);
    }

    if (details.length > 0) {
      msg += `\n\nDetail perjalanan:\n${details.join("\n")}`;
    }

    msg += `\n\nBisa tolong info ketersediaan jadwalnya Bli? Suksema (Terima kasih)!`;
    return msg;
  }

  if (source === "custom_itinerary") {
    let msg = `Halo Bli Gede, saya ingin merancang *custom itinerary* liburan privat ke Bali untuk rombongan saya.`;
    if (customNote) {
      msg += `\n\nRencana & preferensi kami:\n${customNote}`;
    }
    msg += `\n\nMohon saran rute dan rekomendasi terbaiknya ya Bli. Terima kasih!`;
    return msg;
  }

  // Default general inquiry
  return `Halo Bli Gede, saya menemukan kontak Anda dari website Gede Bali Guide dan ingin konsultasi seputar tur privat di Bali. Mohon info ketersediaan jadwal ya Bli. Suksema!`;
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
 * Quick helper for general consultation URL
 */
export function getGeneralConsultationUrl(source: WhatsAppMessageOptions["source"] = "hero"): string {
  return buildWhatsAppUrl({ source });
}

/**
 * Quick helper for specific tour booking inquiry
 */
export function getTourInquiryUrl(
  tourName: string,
  guestCount?: number,
  tripDate?: string,
  customNote?: string
): string {
  return buildWhatsAppUrl({
    tourName,
    guestCount,
    tripDate,
    customNote,
    source: "tour_card",
  });
}

/**
 * Quick helper for custom itinerary planning
 */
export function getCustomItineraryUrl(customNote?: string): string {
  return buildWhatsAppUrl({
    source: "custom_itinerary",
    customNote,
  });
}
