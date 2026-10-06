/**
 * Firestore Collection and Document Constants for Gede Bali Guide
 */
export const FIRESTORE_COLLECTIONS = {
  SETTINGS: "settings",
  TOURS: "tours",
  DESTINATIONS: "destinations",
  REVIEWS: "reviews",
  LEADS: "leads",
  GALLERY: "gallery",
  FAQS: "faqs",
} as const;

export const FIRESTORE_DOCS = {
  HOME_CONFIG: "home_config",
  GUIDE_PROFILE: "guide_profile",
  ABOUT_PAGE: "about_page",
  WHATSAPP_CONFIG: "whatsapp_config",
  DIRECT_BOOKING: "direct_booking",
} as const;

export interface FirestoreHomeCollectionsStructure {
  // Settings Collection (/settings/home_config)
  settings: {
    home_config: {
      hero: {
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
      };
      trustItems: Array<{
        id: string;
        title: string;
        description: string;
        icon: string;
        tag: string;
        order: number;
      }>;
      updatedAt: string;
    };
    whatsapp_config: {
      phoneNumber: string;
      normalizedNumber: string;
      defaultGreeting: string;
      serviceHours: string;
      responseTimeText: string;
      isActive: boolean;
      updatedAt: string;
    };
  };

  // Tours Collection (/tours/{tourId})
  tours: {
    slug: string; // Indexed (unique)
    name: string;
    tagline: string;
    description: string;
    category: string; // Indexed
    area: string; // Indexed
    duration: string;
    price: number;
    priceType: string;
    currency: string;
    minimumGuests: number;
    maximumGuests: number;
    coverImage: string;
    galleryImages: string[];
    highlights: string[];
    includes: string[];
    excludes: string[];
    featured: boolean; // Indexed for Home query
    isActive: boolean; // Indexed for Home query
    rating: number; // Indexed
    reviewCount: number;
    createdAt: string;
    updatedAt: string;
  };

  // Destinations Collection (/destinations/{destinationId})
  destinations: {
    id: string;
    name: string;
    area: string;
    description: string;
    imageUrl: string;
    highlightSpot: string;
    tourSlug?: string;
    order: number; // Indexed
    isActive: boolean; // Indexed
    createdAt: string;
    updatedAt: string;
  };

  // Reviews Collection (/reviews/{reviewId})
  reviews: {
    id: string;
    authorName: string;
    authorOrigin: string;
    rating: number;
    content: string;
    tourName?: string;
    tourSlug?: string;
    dateOfTrip: string;
    isApproved: boolean; // Indexed (only approved reviews shown on Home)
    featured: boolean; // Indexed (featured testimonials on Home)
    createdAt: string;
    updatedAt: string;
  };
}
