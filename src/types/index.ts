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

export type { ButtonVariant } from "@/lib/button-variants";

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
  variant: import("@/lib/button-variants").ButtonVariant; // Bersifat global untuk ID & EN
  url?: string;
}

export type MediaMode = "single" | "multi";

export type SingleImageTemplate =
  | "classic-editorial" // 1. Satu kartu vertikal proporsional (rasio 4:5), sudut membulat, label caption minimalis
  | "ambient-glow"      // 2. Foto utama dengan aksen kotak bayangan hangat bertumpuk di belakangnya
  | "polaroid-frame";   // 3. Foto berbingkai putih jurnal perjalanan otentik & badge lisensi HPI

export type MultiImageTemplate =
  | "stacked-deck"      // 1. Kartu bertumpuk interaktif dengan efek rotasi miring & indikator titik
  | "editorial-bento"   // 2. Kolase bergaya majalah: 1 foto utama besar + 2 foto pendukung
  | "smooth-slider";    // 3. Slider geser horizontal touch-friendly dengan navigasi panah & thumbnail

export interface MediaItem {
  id?: string;
  url: string;
  alt: string;
  caption?: string;
  publicId?: string;
}

export interface MediaSectionData {
  mode: MediaMode;
  singleTemplate: SingleImageTemplate;
  multiTemplate: MultiImageTemplate;
  images: MediaItem[];
  caption?: string;
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
    media?: MediaSectionData;
    imageCaption: string;
    stats: StatItem[];
    ctaPrimary?: string;
    ctaPrimaryVariant?: import("@/lib/button-variants").ButtonVariant;
    ctaSecondary?: string;
    ctaSecondaryVariant?: import("@/lib/button-variants").ButtonVariant;
    ctaPrimaryButton?: ButtonData;
    ctaSecondaryButton?: ButtonData;
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
    media?: MediaSectionData;
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
    buttonVariant?: import("@/lib/button-variants").ButtonVariant;
    button?: ButtonData;
  };
  id?: AboutPageContent;
  en?: AboutPageContent;
  updatedAt?: string;
}

export interface BilingualAboutPageContent {
  id: AboutPageContent;
  en: AboutPageContent;
  ctaPrimaryVariant?: import("@/lib/button-variants").ButtonVariant;
  ctaSecondaryVariant?: import("@/lib/button-variants").ButtonVariant;
  buttonVariant?: import("@/lib/button-variants").ButtonVariant;
  heroMedia?: MediaSectionData;
  storyMedia?: MediaSectionData;
  updatedAt?: string;
}

export interface HomeTrustItem {
  id?: string;
  title: string;
  desc: string;
}

export interface HomePillarItem {
  id?: string;
  title: string;
  desc: string;
}

export interface HomeRegionItem {
  id?: string;
  badge: string;
  title: string;
  desc: string;
  image: string;
  regionQuery: string;
}

export interface HomePageContent {
  hero: {
    badge: string;
    greeting: string;
    headlineLead: string;
    name: string;
    description: string;
    btnWa: string;
    btnCatalog: string;
    ctaPrimaryVariant?: import("@/lib/button-variants").ButtonVariant;
    ctaSecondaryVariant?: import("@/lib/button-variants").ButtonVariant;
    media?: MediaSectionData;
  };
  trustBar: HomeTrustItem[];
  pillars: {
    tag: string;
    title: string;
    subtitle: string;
    items: HomePillarItem[];
  };
  tours: {
    tag: string;
    title: string;
    subtitle: string;
    btnAllTours: string;
  };
  regions: {
    tag: string;
    title: string;
    subtitle: string;
    items: HomeRegionItem[];
  };
  reviews: {
    tag: string;
    title: string;
    subtitle: string;
    btnAllReviews: string;
  };
  faq: {
    tag: string;
    title: string;
    subtitle: string;
    btnAllFaq: string;
  };
  cta: {
    title: string;
    desc: string;
    btn: string;
    buttonVariant?: import("@/lib/button-variants").ButtonVariant;
  };
  id?: HomePageContent;
  en?: HomePageContent;
  updatedAt?: string;
}

export interface BilingualHomePageContent {
  id: HomePageContent;
  en: HomePageContent;
  ctaPrimaryVariant?: import("@/lib/button-variants").ButtonVariant;
  ctaSecondaryVariant?: import("@/lib/button-variants").ButtonVariant;
  ctaBannerVariant?: import("@/lib/button-variants").ButtonVariant;
  heroMedia?: MediaSectionData;
  updatedAt?: string;
}

export * from "@/lib/schemas/home-schema";
export * from "@/lib/schemas/tour-schema";

