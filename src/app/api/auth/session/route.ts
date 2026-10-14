import { NextRequest, NextResponse } from "next/server";
import {
  createSessionToken,
  verifySessionToken,
  isEmailWhitelisted,
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE,
} from "@/lib/auth/session";
import { adminAuth } from "@/lib/firebase-admin";

export const dynamic = "force-dynamic";

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
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
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

    // 1. Coba verifikasi dengan Firebase Admin SDK jika service account tersedia
    try {
      const decoded = await adminAuth.verifyIdToken(idToken);
      verifiedEmail = decoded.email;
      verifiedName = decoded.name;
      verifiedPicture = decoded.picture;
    } catch {
      // 2. Fallback: Verifikasi langsung ke Google OAuth2 TokenInfo API
      try {
        const googleRes = await fetch(
          `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(idToken)}`
        );
        if (googleRes.ok) {
          const googleData = await googleRes.json();
          // Pastikan email terverifikasi oleh Google
          if (googleData.email && (googleData.email_verified === "true" || googleData.email_verified === true)) {
            verifiedEmail = googleData.email;
            verifiedName = googleData.name || body?.fallbackName;
            verifiedPicture = googleData.picture || body?.fallbackPicture;
          }
        }
      } catch (googleErr) {
        console.error("Gagal verifikasi via Google tokeninfo:", googleErr);
      }
    }

    // Jika kedua metode gagal mendapatkan email yang terverifikasi
    if (!verifiedEmail) {
      return NextResponse.json(
        {
          success: false,
          error: "ID Token tidak valid atau sesi Google telah kedaluwarsa. Silakan login kembali.",
        },
        { status: 401 }
      );
    }

    // 3. Validasi Whitelist Email Admin
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

    // 4. Buat Token Sesi HMAC-SHA256
    const sessionToken = await createSessionToken({
      email: verifiedEmail,
      name: verifiedName || verifiedEmail.split("@")[0],
      picture: verifiedPicture,
    });

    // 5. Siapkan respons dengan Set-Cookie HTTP-only
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
    console.error("Error POST /api/auth/session:", error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Terjadi kesalahan internal saat memproses autentikasi sesi.",
      },
      { status: 500 }
    );
  }
}
