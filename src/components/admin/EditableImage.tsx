"use client";

import React from "react";
import Image from "next/image";
import { Camera, Pencil } from "lucide-react";

export interface EditableImageProps {
  src: string;
  alt: string;
  caption?: string;
  aspectRatio?: string;
  className?: string;
  imageClassName?: string;
  onOpenModal: () => void;
  label?: string;
  priority?: boolean;
  sizes?: string;
}

/**
 * Komponen gambar visual yang dapat diklik untuk memicu modal upload Cloudinary.
 * Menampilkan hover visual cue berupa dashed border & badge "Ganti Foto".
 */
export default function EditableImage({
  src,
  alt,
  caption,
  aspectRatio = "aspect-4/5",
  className = "",
  imageClassName = "object-cover object-center",
  onOpenModal,
  label = "Ganti Foto",
  priority = false,
  sizes = "(max-width: 1024px) 100vw, 50vw",
}: EditableImageProps) {
  return (
    <div
      onClick={onOpenModal}
      className={`group/img relative cursor-pointer overflow-hidden rounded-3xl border border-transparent hover:border-dashed hover:border-[#1878B8] transition-all duration-300 ${aspectRatio} ${className}`}
      title={label}
    >
      {src ? (
        <Image
          src={src}
          alt={alt || "Foto"}
          fill
          priority={priority}
          sizes={sizes}
          className={`transition-transform duration-500 group-hover/img:scale-105 ${imageClassName}`}
        />
      ) : (
        <div className="w-full h-full bg-stone-100 flex items-center justify-center text-xs text-[#5E6965]">
          Pilih Foto
        </div>
      )}

      {/* Hover Overlay Visual Cue */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-2 p-4 text-white">
        <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 shadow-lg group-hover/img:scale-110 transition-transform">
          <Camera className="w-5 h-5 text-white" />
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1878B8] text-white text-xs font-semibold shadow-md">
          <Pencil className="w-3 h-3" />
          <span>{label}</span>
        </span>
      </div>
    </div>
  );
}
