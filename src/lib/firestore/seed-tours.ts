import { mockAllTours } from "@/data/mock-data";
import { FirestoreTourDocument, validateTourDocument } from "@/lib/schemas/tour-schema";

/**
 * Transforms mock tours into standardized Firestore document seeds
 * with createdAt, updatedAt, and strict typing.
 */
export const firestoreTourSeeds: FirestoreTourDocument[] = mockAllTours.map((tour, index) => {
  const now = new Date().toISOString();
  return {
    id: tour.id,
    slug: tour.slug,
    name: tour.name,
    tagline: tour.tagline,
    description: tour.description,
    category: tour.category,
    area: tour.area,
    duration: tour.duration,
    price: tour.price,
    priceType: tour.priceType,
    currency: tour.currency || "IDR",
    minimumGuests: tour.minimumGuests,
    maximumGuests: tour.maximumGuests,
    coverImage: tour.coverImage,
    galleryImages: tour.galleryImages || [],
    highlights: tour.highlights || [],
    includes: tour.includes || [],
    excludes: tour.excludes || [],
    itinerary: tour.itinerary || [],
    mapEmbedUrl: tour.mapEmbedUrl,
    pickupLocation: tour.pickupLocation,
    featured: tour.featured,
    isActive: tour.isActive,
    rating: tour.rating,
    reviewCount: tour.reviewCount,
    order: index + 1,
    createdAt: now,
    updatedAt: now,
  };
});

/**
 * Validates all tour seeds against the Firestore Tour schema.
 */
export function validateAllTourSeeds(): {
  total: number;
  validCount: number;
  invalidCount: number;
  results: Array<{ slug: string; isValid: boolean; errors: string[] }>;
} {
  const results = firestoreTourSeeds.map((seed) => {
    const val = validateTourDocument(seed);
    return {
      slug: seed.slug,
      isValid: val.isValid,
      errors: val.errors,
    };
  });

  const validCount = results.filter((r) => r.isValid).length;
  const invalidCount = results.length - validCount;

  return {
    total: firestoreTourSeeds.length,
    validCount,
    invalidCount,
    results,
  };
}
