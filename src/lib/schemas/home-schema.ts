import { Tour, Destination, Review, TrustItem, GuideProfile } from "@/types";

export interface HeroConfig {
  badgeText: string;
  greeting: string;
  welcomeText: string;
  guideName: string;
  tagline: string;
  description: string;
  featureChecklist: string[];
  heroImageUrl: string;
  avatarUrl: string;
  licenseNumber: string;
  experienceYears: number;
}

export interface TrustItemConfig extends TrustItem {
  tag?: string;
  order?: number;
}

export interface WhatsAppConfig {
  phoneNumber: string;
  normalizedNumber: string;
  defaultGreeting: string;
  serviceHours: string;
  responseTimeText: string;
  consultationButtonText: string;
  directBookingNotes: string;
  isActive: boolean;
}

export interface DirectBookingReasonConfig {
  headline: string;
  subheadline: string;
  benefits: {
    id: string;
    icon: string;
    text: string;
  }[];
  ctaButtonText: string;
  noteText: string;
}

export interface HomeContentSchema {
  hero: HeroConfig;
  trustItems: TrustItemConfig[];
  whatsApp: WhatsAppConfig;
  directBooking: DirectBookingReasonConfig;
  featuredTours: Tour[];
  destinations: Destination[];
  testimonials: Review[];
  meta: {
    lastUpdated: string;
    version: string;
  };
}

/**
 * Validates whether a given raw object satisfies the HomeContentSchema structure.
 */
export function isValidHomeContent(data: unknown): data is HomeContentSchema {
  if (!data || typeof data !== "object") return false;
  const c = data as Record<string, unknown>;
  return (
    typeof c.hero === "object" &&
    c.hero !== null &&
    Array.isArray(c.trustItems) &&
    typeof c.whatsApp === "object" &&
    c.whatsApp !== null &&
    Array.isArray(c.featuredTours) &&
    Array.isArray(c.destinations) &&
    Array.isArray(c.testimonials)
  );
}
