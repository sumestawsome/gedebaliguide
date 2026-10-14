import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import {
  getBilingualHomePageContent,
  saveBilingualHomePageContent,
} from "@/lib/services/home-service";
import { BilingualHomePageContent, HomePageContent } from "@/types";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const bilingualData = await getBilingualHomePageContent();
    const lang = request.nextUrl.searchParams.get("lang") as "id" | "en" | null;

    if (lang === "id" || lang === "en") {
      return NextResponse.json(
        {
          success: true,
          lang,
          data: bilingualData[lang],
          updatedAt: bilingualData.updatedAt,
        },
        { status: 200 }
      );
    }

    return NextResponse.json({ success: true, data: bilingualData }, { status: 200 });
  } catch (error: any) {
    console.error("Error GET /api/admin/home:", error);
    return NextResponse.json(
      { success: false, error: "Gagal mengambil data halaman Beranda dari Firestore" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: any = await request.json();

    if (!body) {
      return NextResponse.json(
        { success: false, error: "Payload permintaan kosong." },
        { status: 400 }
      );
    }

    let saveResult: { success: boolean; error?: string; data?: any };

    // Format dwibahasa { id: HomePageContent, en: HomePageContent, ... }
    if (body.id && body.en) {
      const bilingualPayload: BilingualHomePageContent = {
        id: body.id,
        en: body.en,
        ctaPrimaryVariant: body.ctaPrimaryVariant || body.id.hero?.ctaPrimaryVariant,
        ctaSecondaryVariant: body.ctaSecondaryVariant || body.id.hero?.ctaSecondaryVariant,
        ctaBannerVariant:
          body.ctaBannerVariant || body.buttonVariant || body.id.cta?.buttonVariant,
        heroMedia: body.heroMedia || body.id.hero?.media || body.en.hero?.media,
      };
      saveResult = await saveBilingualHomePageContent(bilingualPayload);
    } else {
      return NextResponse.json(
        {
          success: false,
          error: "Format data tidak valid. Sertakan { id, en } untuk kedua bahasa.",
        },
        { status: 400 }
      );
    }

    if (!saveResult.success) {
      return NextResponse.json(
        { success: false, error: saveResult.error || "Gagal menyimpan data ke Firestore." },
        { status: 500 }
      );
    }

    // Revalidasi ISR halaman publik / dan halaman admin /admin/home
    try {
      revalidatePath("/");
      revalidatePath("/admin/home");
      revalidatePath("/admin");
    } catch (revalidateErr) {
      console.warn("Revalidasi path warning:", revalidateErr);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Perubahan berhasil disimpan ke Cloud Firestore ('settings/home_page')!",
        data: saveResult.data,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error POST /api/admin/home:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Terjadi kesalahan server saat memproses data." },
      { status: 500 }
    );
  }
}
