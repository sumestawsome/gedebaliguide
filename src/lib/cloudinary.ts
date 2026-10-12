import { v2 as cloudinary, type UploadApiResponse, type UploadApiErrorResponse } from 'cloudinary';

/**
 * Memastikan konfigurasi Cloudinary diinisialisasi dengan variabel lingkungan terbaru.
 */
export function initCloudinary() {
  if (process.env.CLOUDINARY_URL) {
    try {
      const parsed = new URL(process.env.CLOUDINARY_URL);
      const apiKey = parsed.username;
      const apiSecret = parsed.password;
      const cloudName = parsed.hostname;
      if (cloudName && apiKey && apiSecret) {
        cloudinary.config({
          cloud_name: cloudName,
          api_key: apiKey,
          api_secret: apiSecret,
          secure: true,
        });
        return { cloudName, apiKey, apiSecret };
      }
    } catch {
      // lanjut ke pembacaan variabel individu
    }
  }

  const cloudName =
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
    process.env.CLOUDINARY_CLOUD_NAME ||
    'fns5cvwr';
  const apiKey = process.env.CLOUDINARY_API_KEY || '743211187931999';
  const apiSecret = process.env.CLOUDINARY_API_SECRET || 'NTynslpcc-bjlxkxKrwWBe5ChbY';

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });

  return { cloudName, apiKey, apiSecret };
}

// Inisialisasi awal
initCloudinary();

/**
 * Mengunggah Buffer biner langsung ke Cloudinary via stream.
 * Metode ini jauh lebih cepat dan hemat memori daripada Base64 string,
 * sehingga mencegah error "Request Timeout" pada file foto besar.
 *
 * @param buffer Data Buffer biner gambar.
 * @param folder Nama folder target di Cloudinary (misal 'gede-bali/about').
 * @param publicId Nama opsional file publik.
 */
export async function uploadBuffer(
  buffer: Buffer,
  folder = 'gede-bali/about',
  publicId?: string
): Promise<UploadApiResponse> {
  initCloudinary();

  return new Promise((resolve, reject) => {
    const uploadOptions: Record<string, any> = {
      folder,
      resource_type: 'image',
      format: 'webp',
      transformation: [{ quality: 'auto:good', fetch_format: 'auto' }],
      timeout: 120000, // 120 detik timeout untuk koneksi lambat/file besar
    };

    if (publicId) {
      uploadOptions.public_id = publicId;
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      uploadOptions,
      (error?: UploadApiErrorResponse, result?: UploadApiResponse) => {
        if (error || !result) {
          const errMsg = error?.message || 'Upload ke Cloudinary gagal tanpa hasil yang valid.';
          console.error('[Cloudinary uploadBuffer Error]:', error);
          reject(new Error(errMsg));
        } else {
          resolve(result);
        }
      }
    );

    uploadStream.on('error', (streamErr) => {
      console.error('[Cloudinary Stream Error]:', streamErr);
      reject(streamErr);
    });

    uploadStream.end(buffer);
  });
}

/**
 * Mengunggah gambar ke Cloudinary di folder tertentu dengan auto-format (WebP) dan kompresi kualitas otomatis.
 * @param fileUri Path lokal, Base64 data URI, atau URL gambar yang akan diunggah.
 * @param folder Nama folder target di Cloudinary (misal 'gede-bali/about').
 */
export async function uploadImage(
  fileUri: string,
  folder = 'gede-bali/about'
): Promise<UploadApiResponse> {
  initCloudinary();

  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      fileUri,
      {
        folder,
        resource_type: 'image',
        format: 'webp',
        transformation: [{ quality: 'auto:good', fetch_format: 'auto' }],
        timeout: 120000, // 120 detik timeout
      },
      (error?: UploadApiErrorResponse, result?: UploadApiResponse) => {
        if (error || !result) {
          const errMsg = error?.message || 'Upload ke Cloudinary gagal tanpa hasil yang valid.';
          console.error('[Cloudinary uploadImage Error]:', error);
          reject(new Error(errMsg));
        } else {
          resolve(result);
        }
      }
    );
  });
}

export { cloudinary };
export default cloudinary;
