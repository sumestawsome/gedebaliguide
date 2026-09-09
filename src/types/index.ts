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
  featured: boolean;
  isActive: boolean;
  rating: number;
  reviewCount: number;
}

export interface Destination {
  id: string;
  name: string;
  area: string;
  description: string;
  imageUrl: string;
  tourSlug?: string;
  highlightSpot: string;
}

export interface Review {
  id: string;
  tourId?: string;
  tourName?: string;
  authorName: string;
  authorOrigin: string;
  rating: number;
  content: string;
  dateOfTrip: string;
  isApproved: boolean;
  featured: boolean;
}
