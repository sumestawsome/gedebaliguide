import { mockPopularDestinations } from "@/data/mock-data";
import { Destination } from "@/types";

/**
 * Server function to fetch popular destinations for the Home page & explore sections.
 * Returns curated destinations with optional limit.
 */
export async function getPopularDestinations(limitCount?: number): Promise<Destination[]> {
  const destinations = [...mockPopularDestinations];
  if (limitCount && limitCount > 0) {
    return destinations.slice(0, limitCount);
  }
  return destinations;
}

/**
 * Server function to get destinations filtered by area (e.g. "Bali Tengah", "Bali Selatan").
 */
export async function getDestinationsByArea(area: string): Promise<Destination[]> {
  const lower = area.toLowerCase().trim();
  return mockPopularDestinations.filter(
    (d) => d.area.toLowerCase().includes(lower)
  );
}

/**
 * Server function to find a specific destination by its ID.
 */
export async function getDestinationById(id: string): Promise<Destination | null> {
  const destination = mockPopularDestinations.find((d) => d.id === id);
  return destination || null;
}
