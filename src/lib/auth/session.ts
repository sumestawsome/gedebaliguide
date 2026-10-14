/**
 * Helper session token berbasis Web Crypto API (HMAC-SHA256).
 * Berjalan secara universal di Node.js Runtime dan Edge Middleware Next.js
 * tanpa dependensi eksternal.
 */

const SESSION_SECRET =
  process.env.SESSION_SECRET ||
  process.env.ADMIN_SESSION_SECRET ||
  "gede-bali-guide-secure-admin-session-salt-2026-key";

export interface AdminSessionUser {
  email: string;
  name?: string;
  picture?: string;
  role: "admin";
  exp: number; // unix timestamp in seconds
}

export const SESSION_COOKIE_NAME = "admin_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 hari dalam detik

// Helper konversi base64url
function base64UrlEncode(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlDecode(str: string): string {
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) {
    base64 += "=";
  }
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new TextDecoder().decode(bytes);
}

async function getHmacKey(): Promise<CryptoKey> {
  const enc = new TextEncoder();
  return await crypto.subtle.importKey(
    "raw",
    enc.encode(SESSION_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

/**
 * Membuat session token bertanda tangan HMAC-SHA256
 */
export async function createSessionToken(
  user: Omit<AdminSessionUser, "role" | "exp">
): Promise<string> {
  const exp = Math.floor(Date.now() / 1000) + SESSION_MAX_AGE;
  const payload: AdminSessionUser = {
    ...user,
    role: "admin",
    exp,
  };

  const payloadEncoded = base64UrlEncode(JSON.stringify(payload));
  const key = await getHmacKey();
  const signatureBytes = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(payloadEncoded)
  );

  let binarySig = "";
  const bytes = new Uint8Array(signatureBytes);
  for (let i = 0; i < bytes.byteLength; i++) {
    binarySig += String.fromCharCode(bytes[i]);
  }
  const signatureEncoded = btoa(binarySig)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  return `${payloadEncoded}.${signatureEncoded}`;
}

/**
 * Memvalidasi session token
 */
export async function verifySessionToken(
  token: string | undefined | null
): Promise<AdminSessionUser | null> {
  if (!token || typeof token !== "string") return null;

  const parts = token.split(".");
  if (parts.length !== 2) return null;

  const [payloadEncoded, signatureEncoded] = parts;

  try {
    const key = await getHmacKey();

    let base64Sig = signatureEncoded.replace(/-/g, "+").replace(/_/g, "/");
    while (base64Sig.length % 4) {
      base64Sig += "=";
    }
    const binarySig = atob(base64Sig);
    const sigBytes = new Uint8Array(binarySig.length);
    for (let i = 0; i < binarySig.length; i++) {
      sigBytes[i] = binarySig.charCodeAt(i);
    }

    const isValid = await crypto.subtle.verify(
      "HMAC",
      key,
      sigBytes,
      new TextEncoder().encode(payloadEncoded)
    );

    if (!isValid) return null;

    const payloadStr = base64UrlDecode(payloadEncoded);
    const payload: AdminSessionUser = JSON.parse(payloadStr);

    // Cek kadaluarsa
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp < now) return null;

    return payload;
  } catch {
    return null;
  }
}

// Daftar fallback default email admin utama proyek Gede Bali Guide
const DEFAULT_WHITELISTED_EMAILS = [
  "sumestacreative@gmail.com",
  "gedebaliguide@gmail.com",
  "gedesudiartana@gmail.com",
];

/**
 * Helper untuk memeriksa apakah email berada dalam whitelist admin
 */
export function isEmailWhitelisted(email: string | null | undefined): boolean {
  if (!email || typeof email !== "string") return false;
  const normalized = email.trim().toLowerCase();

  const envRaw =
    process.env.ADMIN_ALLOWED_EMAILS ||
    process.env.NEXT_PUBLIC_ADMIN_EMAILS ||
    "";

  const envEmails = envRaw
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  const allowedList = new Set([...DEFAULT_WHITELISTED_EMAILS, ...envEmails]);
  return allowedList.has(normalized);
}
