import { NextResponse } from "next/server";
import { getUnifiedHomeContent } from "@/lib/services/home-service";

export async function GET() {
  try {
    const data = await getUnifiedHomeContent();
    return NextResponse.json(
      {
        success: true,
        data,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching unified home content:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Gagal mengambil data konten beranda terpadu",
      },
      { status: 500 }
    );
  }
}
