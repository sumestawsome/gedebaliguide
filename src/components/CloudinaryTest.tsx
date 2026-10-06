'use client';

import React from 'react';
import { CldImage } from 'next-cloudinary';

interface CloudinaryTestProps {
  publicId?: string;
  alt?: string;
  width?: number;
  height?: number;
}

/**
 * Komponen uji coba untuk memastikan integrasi Next-Cloudinary dan CldImage
 * berfungsi normal dengan cloud_name yang telah dikonfigurasi.
 */
export function CloudinaryTest({
  publicId = 'sample',
  alt = 'Cloudinary Integration Test Sample',
  width = 600,
  height = 400,
}: CloudinaryTestProps) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'fns5cvwr';

  return (
    <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm max-w-md mx-auto my-4 text-center">
      <h3 className="text-sm font-semibold text-gray-800 mb-1">
        Cloudinary Optimization Test
      </h3>
      <p className="text-xs text-gray-500 mb-3 font-mono">
        Target Cloud: {cloudName}
      </p>
      <div className="relative overflow-hidden rounded-lg aspect-[3/2] bg-gray-100 flex items-center justify-center border border-gray-100">
        <CldImage
          src={publicId}
          width={width}
          height={height}
          alt={alt}
          sizes="(max-width: 768px) 100vw, 600px"
          crop="fill"
          quality="auto"
          format="auto"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
}

export default CloudinaryTest;
