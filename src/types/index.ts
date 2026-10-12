export interface GuideProfile {
  name: string;
  title: string;
  licenseNumber: string;
  experienceYears: number;
  phone: string;
  whatsappNumber: string;
  email: string;
  bio: string;
  avatarUrl: string;
  greeting: string;
}

export interface TrustItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface ItineraryItem {
  time: string;
  title: string;
  description: string;
}

export interface Tour {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: "culture" | "nature" | "adventure" | "honeymoon" | "heritage";
  area: string;
  duration: string;
  price: number;
  priceType: "per_person" | "per_group";
  currency: string;
  minimumGuests: number;
  maximumGuests: number;
  coverImage: string;
  galleryImages: string[];
  highlights: string[];
  includes: string[];
  excludes: string[];
  itinerary?: ItineraryItem[];
  mapEmbedUrl?: string;
  pickupLocation?: string;
  featured: boolean;
  isActive: boolean;
  rating: number;
  reviewCount: number;
}

export interface Destination {
  id: string;
  name: string;
  area: string;
  badge?: string;
  description: string;
  imageUrl: string;
  coverImage?: string;
  colorVariant?: "blue" | "green" | "orange" | string;
  highlightSpot: string;
  tourSlug?: string;
  tourSlugs?: string[];
}

export interface Review {
  id: string;
  tourId?: string;
  tourSlug?: string;
  tourName?: string;
  areaId?: string;
  authorName: string;
  authorOrigin: string;
  rating: number;
  content: string;
  dateOfTrip: string;
  isApproved: boolean;
  featured: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: "culture" | "nature" | "guests" | "activity" | string;
  location: string;
  imageUrl: string;
  caption: string;
  alt?: string;
  sortOrder?: number;
  tourSlug?: string;
  featured?: boolean;
}

export interface ThemeColorPalette {
  brand: string;
  accent: string;
  trust: string;
  secondary?: string;
  canvas: string;
  surface: string;
  textPrimary: string;
  textMuted: string;
}

export interface ThemePreset {
  id: string;
  name: string;
  colors: ThemeColorPalette;
}

export interface ThemeSettings {
  activePreset: string;
  presets: ThemePreset[];
  typography: {
    headingFont: string;
    bodyFont: string;
  };
  updatedAt?: string;
}

export interface FullGuideProfile {
  name: string;
  licenseNumber: string;
  role: string;
  email: string;
  phone: string;
  avatarUrl: string;
  avatarPublicId?: string;
  operatingHours: string;
  bioShort: string;
  bioLong: string;
  stats: {
    experienceYears: number;
    guestsGuided: number;
    rating: number;
    satisfactionPercent: number;
  };
  socialLinks: {
    instagram?: string;
    facebook?: string;
  };
  updatedAt?: string;
}

export interface Lead {
  id?: string;
  guestName: string;
  phone: string;
  email?: string;
  tripDate?: string;
  guestCount?: number;
  selectedTour?: string;
  notes?: string;
  sourcePage?: string;
  leadType: "whatsapp" | "contact_form";
  status: "new" | "contacted" | "converted";
  createdAt: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "Pemesanan & Biaya" | "Rute & Fleksibilitas" | "Armada Mobil" | "Budaya & Lisensi HPI" | string;
  sortOrder: number;
  isActive: boolean;
  updatedAt?: string;
}

export interface StatItem {
  id: string;
  value: string;
  label: string;
}

export interface PillarItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface AboutPageContent {
  hero: {
    badge: string;
    title: string;
    introText: string;
    profileImage: {
      url: string;
      publicId: string;
      alt: string;
    };
    imageCaption: string;
    stats: StatItem[];
  };
  story: {
    sectionTag: string;
    title: string;
    paragraphs: string[];
    quote: string;
    quoteAuthor: string;
    storyImage: {
      url: string;
      publicId: string;
      alt: string;
    };
  };
  guidingStyle: {
    sectionTag: string;
    title: string;
    subtitle: string;
    pillars: PillarItem[];
  };
  trustStrip: TrustItem[];
  cta: {
    title: string;
    subtitle: string;
    buttonText: string;
  };
  id?: AboutPageContent;
  en?: AboutPageContent;
  updatedAt?: string;
}

export interface BilingualAboutPageContent {
  id: AboutPageContent;
  en: AboutPageContent;
  updatedAt?: string;
}

export * from "@/lib/schemas/home-schema";
export * from "@/lib/schemas/tour-schema";

