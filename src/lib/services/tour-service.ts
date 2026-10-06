import { queryFirestoreCollection } from "@/lib/firestore/rest-client";
import { mockAllTours } from "@/data/mock-data";
import { Tour } from "@/types";
import { FirestoreTourDocument, mapFirestoreDocToTour } from "@/lib/schemas/tour-schema";

export interface TourFilterOptions {
  category?: string;
  area?: string;
  featured?: boolean;
}

/**
 * Mengambil data seluruh paket tur aktif dari koleksi Firestore 'tours'
 * dengan filter isActive == true dan fallback ke mock data jika koneksi gagal.
 */
async function fetchActiveToursFromFirestore(): Promise<Tour[]> {
  try {
    const rawDocs = await queryFirestoreCollection<FirestoreTourDocument>(
      "tours",
      "isActive",
      true
    );

    if (rawDocs && rawDocs.length > 0) {
      const seenSlugs = new Set<string>();
      const tours: Tour[] = [];
      for (const doc of rawDocs) {
        if (doc.slug && !seenSlugs.has(doc.slug)) {
          seenSlugs.add(doc.slug);
          tours.push(mapFirestoreDocToTour(doc));
        }
      }
      if (tours.length > 0) {
        return tours;
      }
    }
  } catch (error) {
    console.warn("Gagal mengambil data tur dari Firestore, menggunakan fallback mock:", error);
  }

  return mockAllTours.filter((tour) => tour.isActive);
}

/**
 * Retrieves active tours sorted by popularity:
 * 1. Featured tours first
 * 2. Higher ratings (descending)
 * 3. Higher review counts (descending)
 */
export async function getActiveToursSortedByPopularity(
  options: TourFilterOptions = {}
): Promise<Tour[]> {
  const { category, area, featured } = options;

  const allActiveTours = await fetchActiveToursFromFirestore();
  let tours = allActiveTours;

  if (category && category !== "all") {
    tours = tours.filter((tour) => tour.category === category);
  }

  if (area && area !== "all") {
    tours = tours.filter((tour) => tour.area.toLowerCase() === area.toLowerCase());
  }

  if (featured !== undefined) {
    tours = tours.filter((tour) => tour.featured === featured);
  }

  // Sort: featured first, then rating descending, then review count descending
  return [...tours].sort((a, b) => {
    if (a.featured !== b.featured) {
      return a.featured ? -1 : 1;
    }
    if (b.rating !== a.rating) {
      return b.rating - a.rating;
    }
    return b.reviewCount - a.reviewCount;
  });
}

/**
 * Retrieves a single active tour by its unique slug from Firestore.
 */
export async function getActiveTourBySlug(slug: string): Promise<Tour | null> {
  const allActiveTours = await fetchActiveToursFromFirestore();
  const tour = allActiveTours.find((t) => t.slug === slug && t.isActive);
  return tour || null;
}

/**
 * Server function to retrieve active featured tours for Home page.
 * Filter: isActive === true && featured === true
 * Sort: rating descending, reviewCount descending
 */
export async function getActiveFeaturedTours(limitCount: number = 3): Promise<Tour[]> {
  const allActiveTours = await fetchActiveToursFromFirestore();
  const featuredTours = allActiveTours.filter(
    (tour) => tour.isActive && tour.featured
  );

  const sorted = [...featuredTours].sort((a, b) => {
    if (b.rating !== a.rating) {
      return b.rating - a.rating;
    }
    return b.reviewCount - a.reviewCount;
  });

  return limitCount > 0 ? sorted.slice(0, limitCount) : sorted;
}
