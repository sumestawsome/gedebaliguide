import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import {
  getBilingualAboutPageContent,
  saveBilingualAboutPageContent,
  saveAboutLanguageContent,
} from "@/lib/services/about-service";
import { BilingualAboutPageContent, AboutPageContent } from "@/types";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const bilingualData = await getBilingualAboutPageContent();
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
    console.error("Error GET /api/admin/about:", error);
    return NextResponse.json(
      { success: false, error: "Gagal mengambil data halaman About dari Firestore" },
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

    // Kasus 1: Menyimpan cabang bahasa tertentu { lang: 'en' | 'id', data: AboutPageContent }
    if (body.lang && (body.lang === "id" || body.lang === "en") && body.data) {
      saveResult = await saveAboutLanguageContent(body.lang, body.data as AboutPageContent);
    }
    // Kasus 2: Menyimpan seluruh cabang dwibahasa { id: AboutPageContent, en: AboutPageContent }
    else if (body.id && body.en) {
      const bilingualPayload: BilingualAboutPageContent = {
        id: body.id,
        en: body.en,
      };
      saveResult = await saveBilingualAboutPageContent(bilingualPayload);
    }
    // Kasus 3: Payload single language legacy (simpan ke cabang 'id' tanpa menyentuh root)
    else if (body.hero && body.story) {
      saveResult = await saveAboutLanguageContent("id", body as AboutPageContent);
    } else {
      return NextResponse.json(
        {
          success: false,
          error:
            "Format data tidak valid. Sertakan { lang, data } untuk bahasa aktif, atau { id, en } untuk kedua bahasa.",
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

    // Revalidasi ISR halaman publik /about dan halaman admin /admin/about
    try {
      revalidatePath("/about");
      revalidatePath("/admin/about");
    } catch (revalidateErr) {
      console.warn("Revalidasi path warning:", revalidateErr);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Perubahan berhasil disimpan ke Cloud Firestore ('settings/about_page')!",
        data: saveResult.data,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error POST /api/admin/about:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Terjadi kesalahan server saat memproses data." },
      { status: 500 }
    );
  }
}
