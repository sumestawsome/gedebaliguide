import type { Metadata } from "next";
import { Libre_Baskerville, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import FloatingWhatsApp from "@/components/common/FloatingWhatsApp";

const libreBaskerville = Libre_Baskerville({
  weight: ["400", "700"],
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gedebaliguide.com"),
  title: "Gede Bali Guide — Private Tour Guide Berlisensi HPI Bali",
  description:
    "Jelajahi keindahan autentik Bali bersama Gede Sudiartana, private tour guide resmi HPI Bali. Pengalaman 10+ tahun, armada mobil ber-AC, dan konsultasi langsung via WhatsApp.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${libreBaskerville.variable} ${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased selection:bg-amber-100 selection:text-amber-900 bg-[#FEFDFB] text-[#121715]">
        <Navbar />
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
