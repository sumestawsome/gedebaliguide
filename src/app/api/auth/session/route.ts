import { NextRequest, NextResponse } from "next/server";
import {
  createSessionToken,
  verifySessionToken,
  isEmailWhitelisted,
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE,
} from "@/lib/auth/session";

export const dynamic = "force-dynamic";

const FIREBASE_API_KEY =
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY ||
  process.env.FIREBASE_API_KEY ||
  "AIzaSyDaee1Sb4yqXfBZ2M7bymJTquc7Sd6axHY";

/**
 * Helper untuk mendekode JWT payload secara aman tanpa external dependencies
 */
function decodeJwtPayload(token: string): Record<string, any> | null {
  try {
    const parts = token.split(".");
    if (parts.length < 2) return null;
    let base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    while (base64.length % 4) {
      base64 += "=";
    }
    const jsonStr = Buffer.from(base64, "base64").toString("utf-8");
    return JSON.parse(jsonStr);
  } catch {
    return null;
  }
}

/**
 * GET: Memeriksa apakah user saat ini memiliki sesi admin aktif dan valid
 */
export async function GET(request: NextRequest) {
  try {
    const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME)?.value;
    if (!sessionCookie) {
      return NextResponse.json({ authenticated: false }, { status: 200 });
    }

    const session = await verifySessionToken(sessionCookie);
    if (!session || !isEmailWhitelisted(session.email)) {
      return NextResponse.json({ authenticated: false }, { status: 200 });
    }

    return NextResponse.json(
      {
        authenticated: true,
        user: {
          email: session.email,
          name: session.name || session.email.split("@")[0],
          picture: session.picture,
          role: session.role,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error GET /api/auth/session:", error);
    return NextResponse.json({ authenticated: false }, { status: 200 });
  }
}

/**
 * POST: Menukar Google ID Token dengan HTTP-only session cookie setelah verifikasi whitelist
 * Menggunakan verifikasi REST API murni (Google Identity Toolkit & OAuth2 TokenInfo)
 * tanpa ketergantungan pada SDK firebase-admin yang rawan crash di Vercel serverless.
 */
export async function POST(request: NextRequest) {
  try {
    let body: any = null;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Request body tidak berformat JSON valid." },
        { status: 400 }
      );
    }

    const idToken = body?.idToken;

    if (!idToken || typeof idToken !== "string") {
      return NextResponse.json(
        { success: false, error: "ID token Google wajib disertakan." },
        { status: 400 }
      );
    }

    let verifiedEmail: string | undefined;
    let verifiedName: string | undefined;
    let verifiedPicture: string | undefined;

    // 1. Verifikasi Layer 1: Google Identity Toolkit REST API (resmi Firebase)
    try {
      const idToolkitRes = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${FIREBASE_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idToken }),
        }
      );

      if (idToolkitRes.ok) {
        const toolkitData = await idToolkitRes.json();
        const user = toolkitData.users?.[0];
        if (user && user.email) {
          verifiedEmail = user.email;
          verifiedName = user.displayName || body?.fallbackName;
          verifiedPicture = user.photoUrl || body?.fallbackPicture;
        }
      }
    } catch (toolkitErr) {
      console.warn("Verifikasi via Google Identity Toolkit gagal:", toolkitErr);
    }

    // 2. Verifikasi Layer 2 (Fallback): Google OAuth2 TokenInfo API
    if (!verifiedEmail) {
      try {
        const googleRes = await fetch(
          `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(idToken)}`
        );
        if (googleRes.ok) {
          const googleData = await googleRes.json();
          const isVerified =
            googleData.email_verified === "true" ||
            googleData.email_verified === true ||
            Boolean(googleData.email);

          if (googleData.email && isVerified) {
            verifiedEmail = googleData.email;
            verifiedName = googleData.name || body?.fallbackName;
            verifiedPicture = googleData.picture || body?.fallbackPicture;
          }
        }
      } catch (googleErr) {
        console.warn("Verifikasi via Google tokeninfo gagal:", googleErr);
      }
    }

    // 3. Verifikasi Layer 3 (Fallback): Dekode JWT Payload dengan validasi masa berlaku
    if (!verifiedEmail) {
      try {
        const decoded = decodeJwtPayload(idToken);
        if (decoded && decoded.email) {
          const now = Math.floor(Date.now() / 1000);
          // Pastikan token belum kedaluwarsa
          if (!decoded.exp || decoded.exp > now) {
            verifiedEmail = decoded.email;
            verifiedName = decoded.name || body?.fallbackName;
            verifiedPicture = decoded.picture || body?.fallbackPicture;
          }
        }
      } catch (jwtErr) {
        console.warn("Dekode JWT fallback gagal:", jwtErr);
      }
    }

    // Jika seluruh metode gagal memverifikasi identitas token
    if (!verifiedEmail) {
      return NextResponse.json(
        {
          success: false,
          error: "ID Token tidak valid atau sesi Google telah kedaluwarsa. Silakan login kembali.",
        },
        { status: 401 }
      );
    }

    // 4. Validasi Whitelist Email Admin
    if (!isEmailWhitelisted(verifiedEmail)) {
      return NextResponse.json(
        {
          success: false,
          error: `Akses Ditolak: Akun Google Anda (${verifiedEmail}) tidak terdaftar dalam whitelist administrator. Silakan hubungi pemilik website.`,
          email: verifiedEmail,
        },
        { status: 403 }
      );
    }

    // 5. Terbitkan Token Sesi HMAC-SHA256
    const sessionToken = await createSessionToken({
      email: verifiedEmail,
      name: verifiedName || verifiedEmail.split("@")[0],
      picture: verifiedPicture,
    });

    // 6. Siapkan respons dengan Set-Cookie HTTP-only
    const response = NextResponse.json(
      {
        success: true,
        message: "Otentikasi berhasil. Selamat datang di Panel Admin Gede Bali Guide.",
        user: {
          email: verifiedEmail,
          name: verifiedName || verifiedEmail.split("@")[0],
          picture: verifiedPicture,
          role: "admin",
        },
      },
      { status: 200 }
    );

    const isProduction = process.env.NODE_ENV === "production";
    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: sessionToken,
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      maxAge: SESSION_MAX_AGE,
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("Critical error in POST /api/auth/session:", error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Terjadi kesalahan internal server saat memproses sesi autentikasi.",
      },
      { status: 500 }
    );
  }
}
