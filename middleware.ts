import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken, SESSION_COOKIE_NAME } from "@/lib/auth/session";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Seluruh rute otentikasi API dilewatkan tanpa pencegatan
  if (pathname.startsWith("/api/auth/")) {
    return NextResponse.next();
  }

  const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const sessionUser = await verifySessionToken(sessionCookie);
  const isAuthenticated = Boolean(sessionUser);

  // 2. Tangani rute halaman Login: /admin/login
  if (pathname === "/admin/login") {
    if (isAuthenticated) {
      // Jika sudah login, redirect langsung ke halaman utama admin (Editor Beranda)
      return NextResponse.redirect(new URL("/admin/home", request.url));
    }
    // Jika belum login, izinkan akses ke halaman login
    return NextResponse.next();
  }

  // 3. Tangani rute root Admin: /admin
  if (pathname === "/admin") {
    if (!isAuthenticated) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("redirect", "/admin/home");
      return NextResponse.redirect(loginUrl);
    }
    // Jika sudah login, redirect default ke /admin/home
    return NextResponse.redirect(new URL("/admin/home", request.url));
  }

  // 4. Tangani rute halaman Admin lainnya: /admin/* (misal: /admin/home, /admin/about, dll.)
  if (pathname.startsWith("/admin/")) {
    if (!isAuthenticated) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  // 5. Tangani rute REST API Admin: /api/admin/*
  if (pathname.startsWith("/api/admin/")) {
    if (!isAuthenticated) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized: Akses ditolak. Sesi admin tidak valid atau telah kedaluwarsa.",
        },
        { status: 401 }
      );
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*", "/api/auth/:path*"],
};
