import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Pastikan konfigurasi Cloudinary diinisialisasi
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function POST(request: Request) {
  try {
    const apiSecret = process.env.CLOUDINARY_API_SECRET;
    if (!apiSecret) {
      return NextResponse.json(
        { error: 'CLOUDINARY_API_SECRET belum dikonfigurasi di environment server.' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { paramsToSign } = body;

    if (!paramsToSign || typeof paramsToSign !== 'object') {
      return NextResponse.json(
        { error: 'Parameter paramsToSign diperlukan untuk membuat signature.' },
        { status: 400 }
      );
    }

    const signature = cloudinary.utils.api_sign_request(paramsToSign, apiSecret);

    return NextResponse.json({ signature });
  } catch (error) {
    console.error('Error generating Cloudinary signature:', error);
    return NextResponse.json(
      { error: 'Gagal membuat signature Cloudinary.' },
      { status: 500 }
    );
  }
}
