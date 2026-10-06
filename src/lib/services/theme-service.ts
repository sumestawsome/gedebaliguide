import { getFirestoreDocument } from "@/lib/firestore/rest-client";
import { ThemeSettings } from "@/types";

export const defaultThemeSettings: ThemeSettings = {
  activePreset: "bali-editorial",
  typography: {
    headingFont: "Libre Baskerville",
    bodyFont: "Inter",
  },
  presets: [
    {
      id: "bali-editorial",
      name: "Bali Editorial",
      colors: {
        brand: "#1878B8",
        trust: "#1878B8",
        secondary: "#0C8C5E",
        accent: "#E67E22",
        canvas: "#FEFDFB",
        surface: "#FFFFFF",
        textPrimary: "#08090A",
        textMuted: "#5E6965",
      },
    },
  ],
};

export async function getThemeSettings(): Promise<ThemeSettings> {
  try {
    const doc = await getFirestoreDocument<ThemeSettings>("settings/theme");
    if (doc && doc.presets && doc.presets.length > 0) {
      return doc;
    }
    return defaultThemeSettings;
  } catch (err) {
    console.warn("Gagal memuat theme settings dari Firestore, fallback ke default:", err);
    return defaultThemeSettings;
  }
}
