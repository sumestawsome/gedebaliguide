import { NextRequest, NextResponse } from "next/server";
import { uploadBuffer, uploadImage, initCloudinary } from "@/lib/cloudinary";

export const dynamic = "force-dynamic";
export const maxDuration = 60; // Izinkan eksekusi hingga 60 detik

export async function POST(request: NextRequest) {
  try {
    // 1. Verifikasi kelengkapan kredensial Cloudinary
    const { cloudName, apiKey, apiSecret } = initCloudinary();
    if (!cloudName || !apiKey || !apiSecret) {
      return NextResponse.json(
        {
          success: false,
          error: "Konfigurasi Cloudinary tidak lengkap. Pastikan NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, dan CLOUDINARY_API_SECRET sudah disetel di .env.local.",
        },
        { status: 500 }
      );
    }

    const contentType = request.headers.get("content-type") || "";
    let folder = "gede-bali/about";
    let uploadResult: any = null;

    // 2. Penanganan FormData (File Biner Langsung via Stream)
    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const file = formData.get("file") as File | null;
      const folderParam = formData.get("folder") as string | null;

      if (folderParam) folder = folderParam;

      if (!file) {
        return NextResponse.json(
          { success: false, error: "Berkas gambar tidak ditemukan dalam formulir permintaan." },
          { status: 400 }
        );
      }

      // Validasi tipe berkas
      if (!file.type.startsWith("image/")) {
        return NextResponse.json(
          { success: false, error: `Tipe berkas tidak didukung (${file.type}). Harap unggah file gambar.` },
          { status: 400 }
        );
      }

      // Batasi ukuran file hingga 15MB
      if (file.size > 15 * 1024 * 1024) {
        return NextResponse.json(
          { success: false, error: "Ukuran berkas terlalu besar. Batas maksimal adalah 15MB." },
          { status: 400 }
        );
      }

      // Konversi ArrayBuffer ke Node.js Buffer biner
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Unggah via stream buffer biner langsung ke Cloudinary (mencegah timeout base64)
      uploadResult = await uploadBuffer(buffer, folder);
    } else {
      // 3. Penanganan JSON (URL gambar eksternal atau string)
      const body = await request.json();
      if (!body.image) {
        return NextResponse.json(
          { success: false, error: "Parameter 'image' (URL gambar) wajib disertakan." },
          { status: 400 }
        );
      }

      let targetImageUrl = String(body.image).trim();
      // Auto-prefix HTTPS jika belum ada protokol
      if (!/^https?:\/\//i.test(targetImageUrl)) {
        targetImageUrl = `https://${targetImageUrl}`;
      }

      // Deteksi & konversi cerdas tautan halaman web Unsplash ke direct image CDN
      const unsplashPageMatch = targetImageUrl.match(
        /(?:https?:\/\/)?(?:www\.)?unsplash\.com\/(?:[a-z]{2}\/)?(?:photos|foto)\/([a-zA-Z0-9_\-\.]+)/i
      );
      if (unsplashPageMatch && unsplashPageMatch[1]) {
        const slugOrId = unsplashPageMatch[1];
        let photoId = slugOrId;
        if (slugOrId.includes("photo-")) {
          photoId = slugOrId.substring(slugOrId.indexOf("photo-"));
          targetImageUrl = `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=1600&q=80`;
        } else {
          const parts = slugOrId.split("-");
          const lastPart = parts[parts.length - 1];
          if (lastPart && lastPart.length >= 8) {
            photoId = lastPart;
          }
          targetImageUrl = `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=1600&q=80`;
        }
      }

      if (body.folder) folder = body.folder;
      uploadResult = await uploadImage(targetImageUrl, folder);
    }

    // Pastikan URL aman berformat HTTPS
    const secureUrl = uploadResult.secure_url || uploadResult.url?.replace(/^http:\/\//i, "https://");

    return NextResponse.json({
      success: true,
      url: secureUrl,
      publicId: uploadResult.public_id,
      format: uploadResult.format,
      width: uploadResult.width,
      height: uploadResult.height,
      bytes: uploadResult.bytes,
    });
  } catch (error: any) {
    console.error("[POST /api/cloudinary/upload Error]:", error);

    const errorMessage = error?.message || "Terjadi kesalahan internal saat mengunggah gambar.";
    const isTimeout =
      errorMessage.toLowerCase().includes("timeout") ||
      errorMessage.toLowerCase().includes("timed out") ||
      error?.http_code === 499;

    return NextResponse.json(
      {
        success: false,
        error: isTimeout
          ? "Waktu unggah ke Cloudinary habis (Request Timeout). Koneksi internet sedang lambat atau berkas terlalu besar. Silakan coba lagi."
          : errorMessage,
      },
      { status: isTimeout ? 504 : 500 }
    );
  }
}
