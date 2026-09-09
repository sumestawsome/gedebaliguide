import { NextRequest, NextResponse } from "next/server";
import { getPopularDestinations, getDestinationsByArea } from "@/lib/services/destination-service";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const area = searchParams.get("area");
    const limit = searchParams.get("limit");
    const limitCount = limit ? parseInt(limit, 10) : undefined;

    let destinations;
    if (area) {
      destinations = await getDestinationsByArea(area);
      if (limitCount && limitCount > 0) {
        destinations = destinations.slice(0, limitCount);
      }
    } else {
      destinations = await getPopularDestinations(limitCount);
    }

    return NextResponse.json({
      success: true,
      count: destinations.length,
      data: destinations,
    });
  } catch (error) {
    console.error("Error fetching destinations:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch destinations",
      },
      { status: 500 }
    );
  }
}
