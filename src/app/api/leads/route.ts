import { NextResponse } from "next/server";
import { createLead } from "@/lib/services/lead-service";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      guestName,
      phone,
      email,
      tripDate,
      guestCount,
      selectedTour,
      notes,
      sourcePage,
      leadType,
    } = body;

    // Validasi field wajib
    if (!guestName || !phone) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Nama lengkap (guestName) dan nomor WhatsApp/telepon (phone) wajib diisi.",
        },
        { status: 400 }
      );
    }

    const result = await createLead({
      guestName: String(guestName).trim(),
      phone: String(phone).trim(),
      email: email ? String(email).trim() : undefined,
      tripDate: tripDate ? String(tripDate).trim() : undefined,
      guestCount: guestCount ? Number(guestCount) : undefined,
      selectedTour: selectedTour ? String(selectedTour).trim() : undefined,
      notes: notes ? String(notes).trim() : undefined,
      sourcePage: sourcePage ? String(sourcePage).trim() : "/",
      leadType: leadType === "whatsapp" ? "whatsapp" : "contact_form",
    });

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || "Gagal menyimpan data lead." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Terima kasih! Pesan Anda telah berhasil dikirim ke Bli Gede.",
        id: result.id,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error pada /api/leads:", error);
    return NextResponse.json(
      { success: false, error: "Permintaan tidak dapat diproses." },
      { status: 500 }
    );
  }
}
