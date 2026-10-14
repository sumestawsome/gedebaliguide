"use client";

import React, { useRef, useEffect } from "react";

export interface EditableTextProps {
  value: string;
  onChange: (val: string) => void;
  className?: string;
  placeholder?: string;
  multiline?: boolean;
  as?: React.ElementType;
  label?: string;
}

/**
 * Komponen pembungkus teks untuk In-Place Inline Editing yang presisi
 * Menggunakan contentEditable dengan sinkronisasi halus tanpa jump cursor.
 */
export default function EditableText({
  value,
  onChange,
  className = "",
  placeholder = "Ketik teks...",
  multiline = false,
  as: Component = "span",
  label,
}: EditableTextProps) {
  const contentRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (contentRef.current && contentRef.current.innerText !== value) {
      contentRef.current.innerText = value || "";
    }
  }, [value]);

  return (
    <Component
      ref={contentRef}
      contentEditable
      suppressContentEditableWarning
      onBlur={(e: React.FocusEvent<HTMLElement>) => {
        const text = e.currentTarget.innerText.trim();
        if (text !== value) {
          onChange(text);
        }
      }}
      onKeyDown={(e: React.KeyboardEvent<HTMLElement>) => {
        if (!multiline && e.key === "Enter") {
          e.preventDefault();
          e.currentTarget.blur();
        }
      }}
      className={`group/edit relative cursor-text transition-all duration-200 outline-hidden rounded-md px-1 -mx-1 border border-transparent hover:border-dashed hover:border-[#1878B8] hover:bg-[#1878B8]/5 focus:border-solid focus:border-[#1878B8] focus:bg-white/90 focus:ring-2 focus:ring-[#1878B8]/20 ${className}`}
      title={label || "Klik untuk mengedit langsung di tempat"}
      data-placeholder={placeholder}
    />
  );
}
