import { v2 as cloudinary, type UploadApiResponse, type UploadApiErrorResponse } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

/**
 * Mengunggah gambar ke Cloudinary di folder tertentu dengan auto-format (WebP) dan kompresi kualitas otomatis.
 * @param fileUri Path lokal, Base64 data URI, atau URL gambar yang akan diunggah.
 * @param folder Nama folder target di Cloudinary (misal 'gede-bali/tours' atau 'gede-bali/gallery').
 */
export async function uploadImage(
  fileUri: string,
  folder: string
): Promise<UploadApiResponse> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      fileUri,
      {
        folder,
        resource_type: 'image',
        format: 'webp',
        transformation: [
          { quality: 'auto', fetch_format: 'auto' },
        ],
      },
      (error?: UploadApiErrorResponse, result?: UploadApiResponse) => {
        if (error || !result) {
          reject(error || new Error('Upload ke Cloudinary gagal tanpa hasil yang valid.'));
        } else {
          resolve(result);
        }
      }
    );
  });
}

export { cloudinary };
export default cloudinary;
