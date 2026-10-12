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

/**
 * Mengonversi nilai JS ke format representasi tipe data Firestore REST API v1.
 */
export function toFirestoreValue(val: any): any {
  if (val === null || val === undefined) return { nullValue: null };
  if (typeof val === "boolean") return { booleanValue: val };
  if (typeof val === "number") {
    if (Number.isInteger(val)) return { integerValue: val.toString() };
    return { doubleValue: val };
  }
  if (typeof val === "string") return { stringValue: val };
  if (Array.isArray(val)) {
    return { arrayValue: { values: val.map(toFirestoreValue) } };
  }
  if (typeof val === "object") {
    const fields: Record<string, any> = {};
    for (const [k, v] of Object.entries(val)) {
      if (v !== undefined) fields[k] = toFirestoreValue(v);
    }
    return { mapValue: { fields } };
  }
  return { stringValue: String(val) };
}

/**
 * Mengonversi objek JavaScript biasa ke map fields Firestore REST API.
 */
export function toFirestoreFields(obj: Record<string, any>): Record<string, any> {
  const fields: Record<string, any> = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v !== undefined) fields[k] = toFirestoreValue(v);
  }
  return fields;
}

/**
 * Menyimpan/memperbarui satu dokumen spesifik di Firestore REST API v1.
 */
export async function setFirestoreDocument(
  documentPath: string,
  data: Record<string, any>
): Promise<boolean> {
  try {
    const url = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/${documentPath}`;
    const res = await fetch(url, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fields: toFirestoreFields(data) }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error(`Gagal menulis dokumen ${documentPath}:`, res.status, errText);
      return false;
    }

    return true;
  } catch (err) {
    console.error(`Error setFirestoreDocument untuk ${documentPath}:`, err);
    return false;
  }
}

