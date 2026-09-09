import { NextRequest, NextResponse } from "next/server";
import { getWhatsAppConfig, saveWhatsAppConfig } from "@/lib/services/whatsapp-config-service";

export async function GET() {
  try {
    const config = await getWhatsAppConfig();
    return NextResponse.json({ success: true, data: config }, { status: 200 });
  } catch (error) {
    console.error("Error fetching WhatsApp config:", error);
    return NextResponse.json(
      { success: false, error: "Gagal mengambil konfigurasi WhatsApp" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = await saveWhatsAppConfig(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Konfigurasi nomor WhatsApp Bli Gede berhasil disimpan.",
        data: result.config,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving WhatsApp config:", error);
    return NextResponse.json(
      { success: false, error: "Terjadi kesalahan saat menyimpan konfigurasi" },
      { status: 500 }
    );
  }
}
