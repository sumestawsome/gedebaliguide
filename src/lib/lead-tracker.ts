/**
 * Utility untuk melacak interaksi WhatsApp pengunjung ke koleksi 'leads' di Firestore
 * dan membuka tautan WhatsApp secara mulus di tab baru.
 */

export interface LeadTrackingParams {
  sourcePage: string;
  tourName?: string;
  customMessage?: string;
  customPhone?: string;
}

export function handleWhatsAppClick(
  sourcePage: string,
  tourName?: string,
  customMessage?: string
): void {
  const targetPhone = "6281234567890";

  // Susun teks pesan WhatsApp
  let text = customMessage;
  if (!text) {
    if (tourName && tourName.trim() !== "") {
      text = `Halo Bli Gede, saya tertarik dengan Paket *${tourName}*. Mohon info ketersediaan jadwal dan rekomendasinya ya Bli. Suksema!`;
    } else {
      text = "Halo Bli Gede, saya ingin konsultasi seputar paket tur privat di Bali. Mohon info ketersediaan jadwal ya Bli. Suksema!";
    }
  }

  const waUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(text)}`;

  // Kirim data lead ke API route /api/leads secara non-blocking
  try {
    const leadPayload = {
      guestName: "Pengunjung Web",
      phone: "WhatsApp Direct",
      selectedTour: tourName || "Konsultasi Umum",
      notes: `Mengklik tombol WhatsApp dari ${sourcePage}: "${text.slice(0, 80)}..."`,
      leadType: "whatsapp",
      sourcePage: sourcePage || "/",
    };

    // Gunakan navigator.sendBeacon jika didukung untuk kehandalan ekstra, atau fallback ke fetch non-blocking
    if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
      const blob = new Blob([JSON.stringify(leadPayload)], {
        type: "application/json",
      });
      navigator.sendBeacon("/api/leads", blob);
    } else {
      fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadPayload),
        keepalive: true,
      }).catch((err) => {
        console.warn("Log lead warning:", err);
      });
    }
  } catch (error) {
    console.warn("Gagal mengirim lead tracking:", error);
  }

  // Buka tab baru ke WhatsApp
  if (typeof window !== "undefined") {
    window.open(waUrl, "_blank", "noopener,noreferrer");
  }
}
