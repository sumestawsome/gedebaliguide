import { mockGuideProfile } from "@/data/mock-data";
import { WhatsAppConfig } from "@/types";
import { normalizePhoneNumber } from "@/lib/whatsapp";

// In-memory runtime cache for WhatsApp configuration
let currentWhatsAppConfig: WhatsAppConfig = {
  phoneNumber: mockGuideProfile.whatsappNumber || "+62 812-3456-7890",
  normalizedNumber: normalizePhoneNumber(mockGuideProfile.whatsappNumber || "+62 812-3456-7890"),
  defaultGreeting: "Halo Bli Gede, saya menemukan kontak Anda dari website Gede Bali Guide.",
  serviceHours: "07:00 - 22:00 WITA",
  responseTimeText: "Biasanya membalas dalam beberapa menit",
  consultationButtonText: "Konsultasi Tur via WhatsApp",
  directBookingNotes: "Tanpa kartu kredit • Tanpa biaya perantara marketplace",
  isActive: true,
};

/**
 * Validates Indonesian phone numbers.
 * Supports +62..., 62..., or 08... with 9 to 15 digits.
 */
export function validatePhoneNumber(phone: string): { isValid: boolean; message?: string } {
  if (!phone || typeof phone !== "string") {
    return { isValid: false, message: "Nomor WhatsApp wajib diisi." };
  }

  const clean = phone.replace(/[\s\-\+\(\)]/g, "");
  if (!/^\d{9,15}$/.test(clean)) {
    return { isValid: false, message: "Format nomor tidak valid. Masukkan 9-15 digit angka." };
  }

  if (!clean.startsWith("62") && !clean.startsWith("08")) {
    return {
      isValid: false,
      message: "Nomor harus berawalan kode negara Indonesia (+62) atau awalan 08.",
    };
  }

  return { isValid: true };
}

/**
 * Gets the current WhatsApp configuration.
 */
export async function getWhatsAppConfig(): Promise<WhatsAppConfig> {
  return { ...currentWhatsAppConfig };
}

/**
 * Updates and saves WhatsApp configuration.
 */
export async function saveWhatsAppConfig(
  updates: Partial<WhatsAppConfig>
): Promise<{ success: boolean; config?: WhatsAppConfig; error?: string }> {
  if (updates.phoneNumber) {
    const validation = validatePhoneNumber(updates.phoneNumber);
    if (!validation.isValid) {
      return { success: false, error: validation.message };
    }
  }

  const normalized = updates.phoneNumber
    ? normalizePhoneNumber(updates.phoneNumber)
    : currentWhatsAppConfig.normalizedNumber;

  currentWhatsAppConfig = {
    ...currentWhatsAppConfig,
    ...updates,
    normalizedNumber: normalized,
  };

  return { success: true, config: { ...currentWhatsAppConfig } };
}
