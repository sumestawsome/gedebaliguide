import { queryFirestoreCollection } from "@/lib/firestore/rest-client";
import { FAQItem } from "@/types";

/**
 * Mengambil seluruh FAQ yang berstatus isActive == true dari Firestore koleksi 'faqs',
 * diurutkan berdasarkan sortOrder secara ascending.
 */
export async function getActiveFaqs(): Promise<FAQItem[]> {
  try {
    const rawDocs = await queryFirestoreCollection<FAQItem>(
      "faqs",
      "isActive",
      true
    );

    if (rawDocs && rawDocs.length > 0) {
      return rawDocs.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
    }
  } catch (error) {
    console.warn("Koneksi Firestore faqs fallback:", error);
  }

  return [];
}
