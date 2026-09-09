import { NextRequest, NextResponse } from "next/server";
import { getActiveFeaturedTours } from "@/lib/services/tour-service";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limitParam = searchParams.get("limit");
    const limitCount = limitParam ? parseInt(limitParam, 10) : 3;

    const tours = await getActiveFeaturedTours(limitCount);

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
    console.error("Error fetching featured tours:", error);
    return NextResponse.json(
      { success: false, error: "Gagal mengambil daftar tur unggulan aktif" },
      { status: 500 }
    );
  }
}
