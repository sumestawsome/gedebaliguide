import type { Metadata } from "next";
import { AdminProvider, AdminNavbar } from "@/components/admin";

export const metadata: Metadata = {
  title: "Admin Panel — Gede Bali Guide",
  description: "Panel Kontrol Administrator Gede Bali Guide",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminProvider>
      <div className="min-h-screen bg-[#FEFDFB] text-[#08090A] flex flex-col font-sans selection:bg-[#EBF5FB] selection:text-[#1878B8]">
        <AdminNavbar />
        <div className="flex-1 flex flex-col">{children}</div>
      </div>
    </AdminProvider>
  );
}
