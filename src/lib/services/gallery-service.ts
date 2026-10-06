import { queryFirestoreCollection } from "@/lib/firestore/rest-client";
import { mockGalleryItems } from "@/data/mock-gallery";
import { GalleryItem } from "@/types";

export interface FirestoreGalleryDocument {
  id: string;
  title: string;
  location: string;
  category: string;
  caption: string;
  imageUrl: string;
  cloudinaryPublicId?: string;
  alt?: string;
  sortOrder: number;
  isActive: boolean;
  tourSlug?: string;
  featured?: boolean;
}

/**
 * Mengambil seluruh foto galeri aktif dari Firestore koleksi 'gallery_images',
 * difilter isActive == true dan diurutkan berdasarkan sortOrder secara ascending.
 */
export async function getActiveGalleryImages(): Promise<GalleryItem[]> {
  try {
    const rawDocs = await queryFirestoreCollection<FirestoreGalleryDocument>(
      "gallery_images",
      "isActive",
      true
    );

    if (rawDocs && rawDocs.length > 0) {
      const items: GalleryItem[] = rawDocs.map(
        (data) => ({
          id: data.id,
          title: data.title || "",
          category: data.category || "culture",
          location: data.location || "",
          imageUrl: data.imageUrl || "",
          caption: data.caption || "",
          alt: data.alt || data.title || "",
          tourSlug: data.tourSlug,
          featured: data.featured || false,
          sortOrder: data.sortOrder || 99,
        })
      );

      // Urutkan berdasarkan sortOrder ASC
      return items.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
    }
  } catch (error) {
    console.warn("Koneksi Firestore gallery fallback ke data lokal:", error);
  }

  return mockGalleryItems.map((item, idx) => ({
    ...item,
    alt: item.alt || item.title,
    sortOrder: item.sortOrder || idx + 1,
  }));
}
