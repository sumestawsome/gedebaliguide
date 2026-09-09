import { NextRequest, NextResponse } from "next/server";
import { getActiveToursSortedByPopularity } from "@/lib/services/tour-service";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || undefined;
    const area = searchParams.get("area") || undefined;
    const featuredParam = searchParams.get("featured");
    const featured =
      featuredParam !== null ? featuredParam === "true" || featuredParam === "1" : undefined;

    const tours = await getActiveToursSortedByPopularity({
      category,
      area,
      featured,
    });

    return NextResponse.json(
      {
        success: true,
        count: tours.length,
        data: tours,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching active tours:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Gagal mengambil daftar paket tur aktif",
      },
      { status: 500 }
    );
  }
}
