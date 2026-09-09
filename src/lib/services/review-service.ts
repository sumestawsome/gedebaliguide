import { mockReviews } from "@/data/mock-data";
import { Review } from "@/types";

/**
 * Server function to fetch featured 5-star testimonials for the Home page.
 * Filter: isApproved === true, rating === 5, featured === true
 */
export async function getFeaturedFiveStarReviews(limitCount: number = 3): Promise<Review[]> {
  const filtered = mockReviews.filter(
    (review) => review.isApproved && review.rating === 5 && review.featured
  );

  return limitCount > 0 ? filtered.slice(0, limitCount) : filtered;
}

/**
 * Server function to fetch all approved reviews.
 */
export async function getAllApprovedReviews(): Promise<Review[]> {
  return mockReviews.filter((review) => review.isApproved);
}
