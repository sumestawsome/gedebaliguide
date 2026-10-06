import { queryFirestoreCollection } from "@/lib/firestore/rest-client";
import { mockReviews } from "@/data/mock-data";
import { Review } from "@/types";

/**
 * Server function to fetch featured 5-star testimonials for the Home page.
 * Reads from Firestore collection 'reviews' where isApproved == true, rating == 5.
 * Fallback to mockReviews if connection fails or is empty.
 */
export async function getFeaturedFiveStarReviews(limitCount: number = 3): Promise<Review[]> {
  try {
    const rawDocs = await queryFirestoreCollection<Review>("reviews", "isApproved", true);
    if (rawDocs && rawDocs.length > 0) {
      const fiveStarReviews = rawDocs.filter((review) => review.rating === 5);
      const featured = fiveStarReviews.filter((r) => r.featured);
      const candidates = featured.length > 0 ? featured : fiveStarReviews;
      return limitCount > 0 ? candidates.slice(0, limitCount) : candidates;
    }
  } catch (error) {
    console.warn("Gagal mengambil reviews dari Firestore, menggunakan fallback mock:", error);
  }

  const filtered = mockReviews.filter(
    (review) => review.isApproved && review.rating === 5 && review.featured
  );

  return limitCount > 0 ? filtered.slice(0, limitCount) : filtered;
}

/**
 * Server function to fetch all approved reviews from Firestore.
 */
export async function getAllApprovedReviews(): Promise<Review[]> {
  try {
    const rawDocs = await queryFirestoreCollection<Review>("reviews", "isApproved", true);
    if (rawDocs && rawDocs.length > 0) {
      return rawDocs;
    }
  } catch (error) {
    console.warn("Gagal mengambil all approved reviews dari Firestore, fallback ke mock:", error);
  }

  return mockReviews.filter((review) => review.isApproved);
}

