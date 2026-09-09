import { NextRequest, NextResponse } from "next/server";
import { getFeaturedFiveStarReviews, getAllApprovedReviews } from "@/lib/services/review-service";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get("featured");
    const ratingParam = searchParams.get("rating");
    const limitParam = searchParams.get("limit");
    const limitCount = limitParam ? parseInt(limitParam, 10) : 3;

    if (featured === "true" && (ratingParam === "5" || !ratingParam)) {
      const reviews = await getFeaturedFiveStarReviews(limitCount);
      return NextResponse.json(
        { success: true, count: reviews.length, data: reviews },
        {
          status: 200,
          headers: {
            "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
          },
        }
      );
    }

    const reviews = await getAllApprovedReviews();
    return NextResponse.json(
      { success: true, count: reviews.length, data: reviews },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { success: false, error: "Gagal mengambil ulasan tamu" },
      { status: 500 }
    );
  }
}
