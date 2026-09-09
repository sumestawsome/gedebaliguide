import { mockAllTours } from "@/data/mock-data";
import { Tour } from "@/types";

export interface TourFilterOptions {
  category?: string;
  area?: string;
  featured?: boolean;
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

  let tours = mockAllTours.filter((tour) => tour.isActive);

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
 * Retrieves a single active tour by its unique slug.
 */
export async function getActiveTourBySlug(slug: string): Promise<Tour | null> {
  const tour = mockAllTours.find((t) => t.slug === slug && t.isActive);
  return tour || null;
}

/**
 * Server function to retrieve active featured tours for Home page.
 * Filter: isActive === true && featured === true
 * Sort: rating descending, reviewCount descending
 */
export async function getActiveFeaturedTours(limitCount: number = 3): Promise<Tour[]> {
  const featuredTours = mockAllTours.filter(
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

