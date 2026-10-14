"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase";
import {
  ShieldCheck,
  Loader2,
  Lock,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/admin/about";

  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);

    try {
      const auth = getFirebaseAuth();
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });

      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const idToken = await user.getIdToken(true);

      // Kirim ID token ke server untuk validasi whitelist email & penerbitan cookie sesi
      const res = await fetch("/api/auth/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idToken,
          fallbackName: user.displayName,
          fallbackPicture: user.photoURL,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        // Jika ditolak (403 non-whitelist atau 401 token invalid), putuskan koneksi Firebase client
        await signOut(auth);
        throw new Error(data.error || "Akun Google Anda tidak terdaftar dalam whitelist administrator.");
      }

      // Berhasil masuk -> arahkan ke halaman kerja admin
      router.push(redirectPath);
      router.refresh();
    } catch (err: any) {
      console.error("Login error:", err);
      let msg = "Terjadi kendala saat menghubungkan ke akun Google.";
      if (err.code === "auth/popup-closed-by-user") {
        msg = "Jendela login Google ditutup sebelum proses autentikasi selesai.";
      } else if (err.code === "auth/popup-blocked") {
        msg = "Jendela popup login diblokir oleh browser. Izinkan popup untuk melanjutkan.";
      } else if (err?.message) {
        msg = err.message;
      }
      toast.error("Akses Ditolak", { description: msg, duration: 5000 });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-3xl border border-[#EBE9E6] shadow-xl p-8 sm:p-10 relative overflow-hidden">
      {/* Aksen Hiasan Sudut */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#1878B8]/10 via-[#0C8C5E]/5 to-transparent rounded-bl-full pointer-events-none" />

      {/* Logo & Judul Brand */}
      <div className="text-center mb-8 relative">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#EBF5FB] border border-[#1878B8]/20 mb-4 shadow-xs">
          <Lock className="w-7 h-7 text-[#1878B8]" />
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#08090A] tracking-tight">
          Gede Bali Guide
        </h1>
        <p className="text-xs uppercase tracking-widest font-bold text-[#1878B8] mt-1">
          Panel Administrator
        </p>
        <p className="text-xs text-[#5E6965] mt-2 max-w-xs mx-auto leading-relaxed">
          Masuk dengan akun Google terdaftar untuk mengelola konten editorial, tur, dan foto website.
        </p>
      </div>

      {/* Tombol Sign in with Google */}
      <div className="space-y-4">
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className="w-full h-12 px-5 rounded-xl border border-[#D3D8D6] bg-white hover:bg-[#FAF8F5] hover:border-[#1878B8] text-[#08090A] text-sm font-semibold flex items-center justify-center gap-3 transition-all duration-200 shadow-xs cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed group"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin text-[#1878B8]" />
              <span>Memverifikasi Akun...</span>
            </>
          ) : (
            <>
              {/* Ikon Resmi Google */}
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.05h3.9c2.28-2.1 3.64-5.2 3.64-9.14z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.9-3.05c-1.08.72-2.45 1.16-4.03 1.16-3.1 0-5.74-2.1-6.68-4.93H1.21v3.15C3.26 21.43 7.34 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.32 14.27c-.24-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.21C.44 8.11 0 9.99 0 12s.44 3.89 1.21 5.42l4.11-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.77c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.57 1.21 6.58l4.11 3.15c.94-2.83 3.58-4.96 6.68-4.96z"
                />
              </svg>
              <span className="group-hover:text-[#1878B8] transition-colors">
                Sign in with Google
              </span>
            </>
          )}
        </button>
      </div>

      {/* Keterangan Hak Akses & Whitelist */}
      <div className="mt-8 pt-6 border-t border-[#EBE9E6] text-center">
        <div className="flex items-center justify-center gap-1.5 text-xs text-[#5E6965]">
          <Sparkles className="w-3.5 h-3.5 text-[#1878B8]" />
          <span>Hanya email terotorisasi yang dapat mengakses sistem ini.</span>
        </div>
        <p className="text-[11px] text-[#5E6965]/80 mt-1">
          Hubungi Bli Gede atau Web Administrator untuk pendaftaran email.
        </p>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-[#FEFDFB] flex flex-col justify-between text-[#08090A] selection:bg-[#EBF5FB] selection:text-[#1878B8]">
      {/* Top Bar Ringkas */}
      <header className="px-6 py-4 flex items-center justify-between border-b border-[#EBE9E6]">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#5E6965] hover:text-[#1878B8] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Website Publik</span>
        </Link>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#EBF5FB] border border-[#1878B8]/20 text-[11px] font-semibold text-[#1878B8]">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Portal Keamanan Internal</span>
        </div>
      </header>

      {/* Konten Form Login dibungkus Suspense */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 my-8">
        <Suspense
          fallback={
            <div className="w-full max-w-md bg-white rounded-3xl border border-[#EBE9E6] p-12 text-center">
              <Loader2 className="w-8 h-8 animate-spin text-[#1878B8] mx-auto mb-3" />
              <p className="text-xs text-[#5E6965]">Memuat portal masuk...</p>
            </div>
          }
        >
          <AdminLoginForm />
        </Suspense>
      </main>

      {/* Footer Ringkas */}
      <footer className="px-6 py-4 border-t border-[#EBE9E6] text-center text-xs text-[#5E6965]">
        © {new Date().getFullYear()} Gede Bali Guide • Panel Kontrol Terlindungi
      </footer>
    </div>
  );
}
