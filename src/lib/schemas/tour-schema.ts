import { Tour, ItineraryItem } from "@/types";

export type TourCategory = "culture" | "nature" | "adventure" | "honeymoon" | "heritage";
export type TourPriceType = "per_person" | "per_group";

/**
 * Represents the exact shape of a Tour document stored in Cloud Firestore:
 * Collection: "tours"
 */
export interface FirestoreTourDocument {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: TourCategory;
  area: string;
  duration: string;
  price: number;
  priceType: TourPriceType;
  currency: string;
  minimumGuests: number;
  maximumGuests: number;
  coverImage: string;
  galleryImages: string[];
  highlights: string[];
  includes: string[];
  excludes: string[];
  itinerary: ItineraryItem[];
  mapEmbedUrl?: string;
  pickupLocation?: string;
  featured: boolean;
  isActive: boolean;
  rating: number;
  reviewCount: number;
  order?: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * Validates whether a raw object conforms to the Firestore Tour schema.
 */
export function validateTourDocument(data: unknown): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!data || typeof data !== "object") {
    return { isValid: false, errors: ["Data tur harus berupa objek valid."] };
  }

  const d = data as Record<string, unknown>;

  if (!d.name || typeof d.name !== "string" || d.name.trim().length === 0) {
    errors.push("Nama tur wajib diisi.");
  }

  if (!d.slug || typeof d.slug !== "string" || !/^[a-z0-9-]+$/.test(d.slug)) {
    errors.push("Slug tur wajib berupa huruf kecil, angka, dan strip (a-z, 0-9, -).");
  }

  if (!d.tagline || typeof d.tagline !== "string") {
    errors.push("Tagline tur wajib diisi.");
  }

  if (!d.description || typeof d.description !== "string") {
    errors.push("Deskripsi tur wajib diisi.");
  }

  const validCategories: TourCategory[] = ["culture", "nature", "adventure", "honeymoon", "heritage"];
  if (!d.category || !validCategories.includes(d.category as TourCategory)) {
    errors.push(`Kategori tur harus salah satu dari: ${validCategories.join(", ")}.`);
  }

  if (!d.area || typeof d.area !== "string") {
    errors.push("Wilayah/Area tur wajib diisi.");
  }

  if (typeof d.price !== "number" || d.price <= 0) {
    errors.push("Harga tur harus berupa angka lebih dari 0.");
  }

  if (d.priceType !== "per_person" && d.priceType !== "per_group") {
    errors.push("Tipe harga harus 'per_person' atau 'per_group'.");
  }

  if (typeof d.minimumGuests !== "number" || d.minimumGuests < 1) {
    errors.push("Jumlah tamu minimum minimal 1 orang.");
  }

  if (typeof d.maximumGuests !== "number" || d.maximumGuests < (d.minimumGuests as number)) {
    errors.push("Jumlah tamu maksimum harus lebih besar atau sama dengan tamu minimum.");
  }

  if (!d.coverImage || typeof d.coverImage !== "string") {
    errors.push("Foto sampul (cover image) wajib ada.");
  }

  if (!Array.isArray(d.highlights) || d.highlights.length === 0) {
    errors.push("Sorotan destinasi (highlights) minimal memiliki 1 item.");
  }

  if (!Array.isArray(d.includes) || d.includes.length === 0) {
    errors.push("Daftar fasilitas termasuk (includes) minimal memiliki 1 item.");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Formats a Firestore document into the application Tour domain model.
 */
export function mapFirestoreDocToTour(doc: FirestoreTourDocument): Tour {
  return {
    id: doc.id,
    slug: doc.slug,
    name: doc.name,
    tagline: doc.tagline,
    description: doc.description,
    category: doc.category,
    area: doc.area,
    duration: doc.duration,
    price: doc.price,
    priceType: doc.priceType,
    currency: doc.currency || "IDR",
    minimumGuests: doc.minimumGuests,
    maximumGuests: doc.maximumGuests,
    coverImage: doc.coverImage,
    galleryImages: doc.galleryImages || [],
    highlights: doc.highlights || [],
    includes: doc.includes || [],
    excludes: doc.excludes || [],
    itinerary: doc.itinerary || [],
    mapEmbedUrl: doc.mapEmbedUrl,
    pickupLocation: doc.pickupLocation,
    featured: doc.featured ?? false,
    isActive: doc.isActive ?? true,
    rating: doc.rating ?? 5.0,
    reviewCount: doc.reviewCount ?? 0,
  };
}
