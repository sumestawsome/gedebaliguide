import { Lead } from "@/types";

const PROJECT_ID =
  process.env.FIREBASE_PROJECT_ID ||
  process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
  "bali-tour-portfolio";

function toFirestoreValue(val: any): any {
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

function toFirestoreFields(obj: Record<string, any>) {
  const fields: Record<string, any> = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v !== undefined) fields[k] = toFirestoreValue(v);
  }
  return fields;
}

/**
 * Menyimpan data lead / pertanyaan baru ke koleksi 'leads' di Firestore.
 */
export async function createLead(
  data: Omit<Lead, "id" | "createdAt" | "status">
): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    const now = new Date().toISOString();
    const leadPayload: Lead = {
      ...data,
      status: "new",
      createdAt: now,
    };

    const url = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/leads`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: toFirestoreFields(leadPayload),
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Gagal membuat lead di Firestore:", res.status, errText);
      return { success: false, error: `Gagal menyimpan formulir (${res.status})` };
    }

    const resJson = await res.json();
    const docId = resJson.name ? resJson.name.split("/").pop() : undefined;

    return { success: true, id: docId };
  } catch (error: any) {
    console.error("Error pada createLead service:", error);
    return { success: false, error: error.message || "Terjadi kesalahan server" };
  }
}
