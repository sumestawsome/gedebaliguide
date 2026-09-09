import { NextRequest, NextResponse } from "next/server";
import { getActiveTourBySlug } from "@/lib/services/tour-service";

interface RouteProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function GET(request: NextRequest, { params }: RouteProps) {
  try {
    const { slug } = await params;
    const tour = await getActiveTourBySlug(slug);

    if (!tour) {
      return NextResponse.json(
        {
          success: false,
          error: `Paket tur dengan slug '${slug}' tidak ditemukan atau sedang tidak aktif.`,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: tour,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
      }
    );
  } catch (error) {
    console.error("Error querying tour by slug:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Gagal mengambil data detail paket tur",
      },
      { status: 500 }
    );
  }
}
