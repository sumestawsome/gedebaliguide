/**
 * Definisi Preset Varian Gaya Tombol Resmi Gede Bali Guide
 * Berdasarkan sistem desain Luxury Travel Editorial (globals.css & DESIGN_GUIDE.md).
 */

export type ButtonVariant =
  | "ocean-blue-solid"
  | "ocean-blue-outline"
  | "sunset-amber-solid"
  | "sunset-amber-outline"
  | "bali-emerald-solid"
  | "bali-emerald-outline"
  | "neutral-outline";

export interface ButtonPreset {
  id: ButtonVariant;
  name: string;
  description: string;
  colorHex: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder?: string;
  classes: string;
}

export const BUTTON_PRESETS: ButtonPreset[] = [
  {
    id: "ocean-blue-solid",
    name: "Ocean Blue Solid",
    description: "Latar biru laut, teks putih",
    colorHex: "#1878B8",
    badgeBg: "bg-[#1878B8]",
    badgeText: "text-white",
    classes:
      "bg-[#1878B8] hover:bg-[#0F4C81] text-white shadow-[0_2px_8px_rgba(24,120,184,0.25)] border border-transparent",
  },
  {
    id: "ocean-blue-outline",
    name: "Ocean Blue Outline",
    description: "Latar putih, garis batas biru laut, teks biru laut",
    colorHex: "#1878B8",
    badgeBg: "bg-white",
    badgeText: "text-[#1878B8]",
    badgeBorder: "border-2 border-[#1878B8]",
    classes:
      "border-2 border-[#1878B8] bg-white hover:bg-[#EBF5FB] text-[#1878B8] shadow-xs",
  },
  {
    id: "sunset-amber-solid",
    name: "Sunset Amber Solid",
    description: "Latar oranye senja, teks putih",
    colorHex: "#E67E22",
    badgeBg: "bg-[#E67E22]",
    badgeText: "text-white",
    classes:
      "bg-[#E67E22] hover:bg-[#D35400] text-white shadow-[0_4px_16px_rgba(230,126,34,0.3)] border border-transparent",
  },
  {
    id: "sunset-amber-outline",
    name: "Sunset Amber Outline",
    description: "Latar putih, border oranye senja, teks oranye",
    colorHex: "#E67E22",
    badgeBg: "bg-white",
    badgeText: "text-[#E67E22]",
    badgeBorder: "border-2 border-[#E67E22]",
    classes:
      "border-2 border-[#E67E22] bg-white hover:bg-[#FDF3E6] text-[#E67E22] shadow-xs",
  },
  {
    id: "bali-emerald-solid",
    name: "Bali Emerald Solid",
    description: "Latar hijau zamrud, teks putih",
    colorHex: "#0C8C5E",
    badgeBg: "bg-[#0C8C5E]",
    badgeText: "text-white",
    classes:
      "bg-[#0C8C5E] hover:bg-[#09734C] text-white shadow-[0_2px_8px_rgba(12,140,94,0.25)] border border-transparent",
  },
  {
    id: "bali-emerald-outline",
    name: "Bali Emerald Outline",
    description: "Latar putih, border hijau zamrud, teks hijau",
    colorHex: "#0C8C5E",
    badgeBg: "bg-white",
    badgeText: "text-[#0C8C5E]",
    badgeBorder: "border-2 border-[#0C8C5E]",
    classes:
      "border-2 border-[#0C8C5E] bg-white hover:bg-[#E8F6F0] text-[#0C8C5E] shadow-xs",
  },
  {
    id: "neutral-outline",
    name: "Neutral Outline",
    description: "Latar putih, border hairline tipis, teks abu gelap",
    colorHex: "#D3D8D6",
    badgeBg: "bg-white",
    badgeText: "text-[#08090A]",
    badgeBorder: "border border-[#D3D8D6]",
    classes:
      "border border-[#D3D8D6] bg-white hover:bg-[#FAF8F5] text-[#08090A] shadow-xs",
  },
];

/**
 * Mengembalikan class CSS Tailwind yang sesuai berdasarkan nama varian
 */
export function getButtonVariantClasses(
  variant?: ButtonVariant | string | null,
  fallback: ButtonVariant = "ocean-blue-solid"
): string {
  const match = BUTTON_PRESETS.find((p) => p.id === variant);
  if (match) return match.classes;

  const fallbackMatch = BUTTON_PRESETS.find((p) => p.id === fallback);
  return fallbackMatch ? fallbackMatch.classes : BUTTON_PRESETS[0].classes;
}

/**
 * Struktur objek data tombol tunggal:
 * - Atribut Dwibahasa: Teks tombol per-bahasa (ID & EN).
 * - Atribut Global: Varian gaya desain & URL tujuan (bersama untuk ID & EN).
 */
export interface ButtonData {
  text: {
    id: string;
    en: string;
  };
  variant: ButtonVariant; // Bersifat global untuk ID & EN
  url?: string;
}

/**
 * Normalisasi data tombol: mengangkat variant ke level global dan memisahkan teks ID/EN
 */
export function normalizeButtonData(
  rawButton: any,
  fallbackText: { id: string; en: string },
  fallbackVariant: ButtonVariant,
  fallbackUrl?: string
): ButtonData {
  // Ambil variant dari level global atau angkat dari salah satu cabang bahasa jika tersimpan lokal
  const variant: ButtonVariant =
    rawButton?.variant ||
    rawButton?.id?.variant ||
    rawButton?.en?.variant ||
    fallbackVariant;

  const textId =
    rawButton?.text?.id ||
    rawButton?.id?.text ||
    (typeof rawButton?.text === "string" ? rawButton.text : "") ||
    rawButton?.id ||
    fallbackText.id;

  const textEn =
    rawButton?.text?.en ||
    rawButton?.en?.text ||
    fallbackText.en;

  const url = rawButton?.url || fallbackUrl || "";

  return {
    text: {
      id: textId,
      en: textEn,
    },
    variant,
    url,
  };
}

