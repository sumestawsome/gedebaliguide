const PROJECT_ID =
  process.env.FIREBASE_PROJECT_ID ||
  process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
  "bali-tour-portfolio";

export function parseFirestoreValue(val: any): any {
  if (!val) return null;
  if ("stringValue" in val) return val.stringValue;
  if ("booleanValue" in val) return val.booleanValue;
  if ("integerValue" in val) return parseInt(val.integerValue, 10);
  if ("doubleValue" in val) return parseFloat(val.doubleValue);
  if ("arrayValue" in val) {
    return (val.arrayValue.values || []).map(parseFirestoreValue);
  }
  if ("mapValue" in val) {
    const res: Record<string, any> = {};
    for (const [k, v] of Object.entries(val.mapValue.fields || {})) {
      res[k] = parseFirestoreValue(v);
    }
    return res;
  }
  return null;
}

export function parseFirestoreDoc<T = any>(doc: any): T {
  const fields = doc.fields || {};
  const res: Record<string, any> = {
    id: doc.name ? doc.name.split("/").pop() : "",
  };
  for (const [k, v] of Object.entries(fields)) {
    res[k] = parseFirestoreValue(v);
  }
  return res as T;
}

/**
 * Melakukan query ke Firestore REST API v1 secara aman di Next.js server components
 * tanpa memicu error otentikasi client SDK.
 */
export async function queryFirestoreCollection<T = any>(
  collectionId: string,
  filterField = "isActive",
  filterValue = true
): Promise<T[]> {
  try {
    const url = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents:runQuery`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        structuredQuery: {
          from: [{ collectionId }],
          where: {
            fieldFilter: {
              field: { fieldPath: filterField },
              op: "EQUAL",
              value: { booleanValue: filterValue },
            },
          },
        },
      }),
      // Revalidasi ISR setiap 60 detik
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.warn(`Firestore REST query warning untuk ${collectionId}:`, res.status);
      return [];
    }

    const rows = await res.json();
    if (!Array.isArray(rows)) return [];

    return rows
      .filter((r) => r.document)
      .map((r) => parseFirestoreDoc<T>(r.document));
  } catch (err) {
    console.warn(`Firestore REST fetch error untuk ${collectionId}:`, err);
    return [];
  }
}

/**
 * Mengambil satu dokumen spesifik dari Firestore REST API v1 berdasarkan path dokumen,
 * misal 'settings/about_page' atau 'settings/guide_profile'.
 */
export async function getFirestoreDocument<T = any>(documentPath: string): Promise<T | null> {
  try {
    const url = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/${documentPath}`;
    const res = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      if (res.status !== 404) {
        console.warn(`Firestore REST getDocument warning untuk ${documentPath}:`, res.status);
      }
      return null;
    }

    const doc = await res.json();
    if (!doc || !doc.fields) return null;
    return parseFirestoreDoc<T>(doc);
  } catch (err) {
    console.warn(`Firestore REST getDocument error untuk ${documentPath}:`, err);
    return null;
  }
}
