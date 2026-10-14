import { getFirestoreDocument, setFirestoreDocument } from "@/lib/firestore/rest-client";
import {
  AboutPageContent,
  BilingualAboutPageContent,
  ButtonData,
  MediaSectionData,
  MediaItem,
  MediaMode,
  SingleImageTemplate,
  MultiImageTemplate,
} from "@/types";
import { ButtonVariant } from "@/lib/button-variants";

/**
 * Fallback data default yang identik dan berstandar Luxury Travel Editorial
 * bila koneksi jaringan / Firestore mengalami kendala saat build atau SSR.
 */
export const defaultAboutPageContent: AboutPageContent = {
  hero: {
    badge: "PEMANDU LOKAL INDEPENDEN BALI",
    title: "Mengenal Bli Gede, Sahabat Lokal & Penjaga Cerita Bali Anda",
    introText:
      "Om Swastyastu. Selamat datang di Bali. Saya Gede Sudiartana, pemandu wisata independen berlisensi resmi HPI Bali. Saya percaya perjalanan terbaik bukan tentang mengejar sebanyak mungkin destinasi dalam sehari, melainkan tentang merasakan kedamaian pulau ini secara santai bersama orang-orang terdekat Anda.",
    profileImage: {
      url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80",
      publicId: "profiles/bli_gede_portrait",
      alt: "Potret Bli Gede Sudiartana - Pemandu Wisata Resmi HPI Bali",
    },
    media: {
      mode: "single",
      singleTemplate: "classic-editorial",
      multiTemplate: "stacked-deck",
      images: [
        {
          id: "hero-img-1",
          url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80",
          publicId: "profiles/bli_gede_portrait",
          alt: "Potret Bli Gede Sudiartana - Pemandu Wisata Resmi HPI Bali",
          caption: "Gede Sudiartana — Lahir, tumbuh, dan mendedikasikan hidup memperkenalkan keaslian Bali.",
        },
        {
          id: "hero-img-2",
          url: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop&q=80",
          publicId: "about/bali_temple_atmosphere",
          alt: "Pura Sakral & Tradisi Bali",
          caption: "Harmoni alam dan budaya sakral warisan leluhur Bali.",
        },
        {
          id: "hero-img-3",
          url: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&auto=format&fit=crop&q=80",
          publicId: "about/jatiluwih_rice_terrace",
          alt: "Jatiluwih UNESCO Rice Terrace",
          caption: "Bentang sawah berundak Jatiluwih di kaki Gunung Batukaru.",
        },
      ],
      caption: "Gede Sudiartana — Lahir, tumbuh, dan mendedikasikan hidup memperkenalkan keaslian Bali.",
    },
    imageCaption:
      "Gede Sudiartana — Lahir, tumbuh, dan mendedikasikan hidup memperkenalkan keaslian Bali.",
    stats: [
      { id: "stat-1", value: "10+ Tahun", label: "Pengalaman Memandu" },
      { id: "stat-2", value: "1.200+", label: "Tamu Terpandu" },
      { id: "stat-3", value: "5.0 Bintang", label: "Ulasan Sempurna" },
      { id: "stat-4", value: "100% Privat", label: "Fleksibel & Santai" },
    ],
    ctaPrimary: "Konsultasi Bersama Gede",
    ctaPrimaryVariant: "ocean-blue-solid",
    ctaSecondary: "Lihat Pilihan Tur",
    ctaSecondaryVariant: "neutral-outline",
  },
  story: {
    sectionTag: "KISAH DI BALIK KEMUDI",
    title: "Bukan Sekadar Mengemudi, Melainkan Menghubungkan Anda dengan Jiwa Bali",
    paragraphs: [
      "Saya lahir dan dibesarkan di Gianyar, di tengah keluarga yang lekat dengan tradisi gamelan dan ukiran kayu. Sejak kanak-kanak, aroma dupa upacara, suara kidung suci di pura desa, dan hamparan sawah basah adalah denyut hidup harian saya. Bagi saya, keindahan Bali bukan sekadar bentang alam visual, melainkan sebuah filosofi hidup Tri Hita Karana yang nyata terjaga.",
      "Selama lebih dari satu dekade bekerja di industri pariwisata, saya sempat menyaksikan bagaimana wisata massal sering kali tergesa-gesa: tamu diburu-buru dari satu gerbang pura ke pura lain, dipaksa mampir ke toko oleh-oleh demi komisi agen, hingga kehilangan esensi relaksasi yang sesungguhnya. Itulah alasan utama saya memilih melangkah mandiri sebagai pemandu independen.",
      "Dengan memandu secara langsung tanpa perantara calo atau target kuota rombongan besar, saya dapat memberikan perhatian penuh kepada setiap keluarga atau pasangan yang berlibur. Rute bisa beradaptasi saat cuaca berubah atau saat anak-anak merasa lelah, dan kita bisa berhenti kapan pun Anda melihat sudut Bali yang memikat hati.",
    ],
    quote:
      "Bagi saya, setiap tamu bukan sekadar transaksi perjalanan, melainkan keluarga yang sedang berkunjung ke rumah saya di Bali.",
    quoteAuthor: "Gede Sudiartana",
    storyImage: {
      url: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1000&auto=format&fit=crop&q=80",
      publicId: "about/bali_temple_atmosphere",
      alt: "Suasana Pura Sakral dan Kedamaian Alam Pedesaan Bali",
    },
    media: {
      mode: "single",
      singleTemplate: "classic-editorial",
      multiTemplate: "stacked-deck",
      images: [
        {
          id: "story-img-1",
          url: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1000&auto=format&fit=crop&q=80",
          publicId: "about/bali_temple_atmosphere",
          alt: "Suasana Pura Sakral dan Kedamaian Alam Pedesaan Bali",
          caption: "Suasana Pura Sakral dan Kedamaian Alam Pedesaan Bali",
        },
        {
          id: "story-img-2",
          url: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=1000&auto=format&fit=crop&q=80",
          publicId: "about/uluwatu_cliff",
          alt: "Tebing Karst Uluwatu",
          caption: "Pesona tebing karst megah menghadap Samudra Hindia.",
        },
      ],
      caption: "Suasana Pura Sakral dan Kedamaian Alam Pedesaan Bali",
    },
  },
  guidingStyle: {
    sectionTag: "PENGALAMAN BERSAMA GEDE",
    title: "Bagaimana Hari Anda Berjalan Bersama Bli Gede",
    subtitle:
      "Tiga pilar kenyamanan yang memastikan liburan Anda mengalir tenang, berkesan, dan tanpa rasa tergesa-gesa.",
    pillars: [
      {
        id: "pillar-1",
        icon: "Clock",
        title: "Waktu Milik Anda Sepenuhnya",
        description:
          "Tidak ada peluit buru-buru. Jika Anda ingin duduk lebih lama menikmati kopi hangat di terasering sawah atau menunggu matahari terbenam sempurna di tebing Uluwatu, jadwal akan selalu menyesuaikan tempo langkah Anda.",
      },
      {
        id: "pillar-2",
        icon: "Compass",
        title: "Kisah Budaya yang Hidup",
        description:
          "Penjelasan adat istiadat, makna filosofi canang sari harian, hingga etika sakral memasuki pura diceritakan secara santai dan mendalam layaknya Anda sedang berbincang dengan sahabat karib lokal.",
      },
      {
        id: "pillar-3",
        icon: "Camera",
        title: "Dokumentasi & Sudut Pandang Terbaik",
        description:
          "Paham titik foto terindah yang bebas kerumunan orang banyak, serta dengan senang hati membantu mengabadikan momen kebersamaan keluarga Anda dengan komposisi yang apik dan natural.",
      },
    ],
  },
  trustStrip: [
    {
      id: "trust-1",
      icon: "Award",
      title: "Lisensi Resmi HPI Bali",
      description:
        "No. Reg: HPI-BALI-2015-8849 — Terdaftar resmi, berwawasan budaya terverifikasi, dan legal memandu di seluruh pura sakral.",
    },
    {
      id: "trust-2",
      icon: "ShieldCheck",
      title: "Armada Mobil Ber-AC Privat",
      description:
        "Unit kendaraan keluarga bersih, wangi, dingin, dan terawat khusus untuk kenyamanan rombongan Anda tanpa digabung orang asing.",
    },
    {
      id: "trust-3",
      icon: "Sparkles",
      title: "Transparansi Mutlak",
      description:
        "Tanpa biaya titipan tersembunyi, tanpa paksaan belanja toko suvenir komisi, dan pelunasan fleksibel langsung di hari tur.",
    },
  ],
  cta: {
    title: "Punya Rencana Liburan atau Rute Impian Sendiri di Bali?",
    subtitle:
      "Mari diskusikan santai di WhatsApp. Bli Gede siap memberikan saran rute terbaik yang efisien, nyaman, dan ramah untuk seluruh keluarga.",
    buttonText: "Kirim Pesan ke Bli Gede",
    buttonVariant: "sunset-amber-solid",
  },
};

/**
 * Mengambil konten halaman About dari dokumen Firestore 'settings/about_page'
 * dengan skema murni dwibahasa (en dan id).
 */
export async function getAboutPageContent(lang: "id" | "en" = "id"): Promise<AboutPageContent> {
  const bilingual = await getBilingualAboutPageContent();
  const selected = bilingual[lang] || bilingual.id || defaultAboutPageContent;
  return {
    ...selected,
    id: bilingual.id,
    en: bilingual.en,
    updatedAt: bilingual.updatedAt,
  };
}


export const defaultAboutPageContentEn: AboutPageContent = {
  hero: {
    badge: "Local Guide in Bali",
    title: "Meet Bli Gede, Your Local Friend & Keeper of Bali's Stories",
    introText:
      "Om Swastyastu. Welcome to Bali. I'm Gede Sudiartana, an officially licensed independent HPI Bali tour guide. I believe the best journeys are not about rushing through a dozen checklist spots a day, but about slowing down, discovering true serenity, and experiencing the authentic soul of our island at your family's own gentle rhythm.",
    profileImage: {
      url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80",
      publicId: "profiles/bli_gede_portrait",
      alt: "Portrait of Bli Gede Sudiartana - Official HPI Bali Tour Guide",
    },
    media: {
      mode: "single",
      singleTemplate: "classic-editorial",
      multiTemplate: "stacked-deck",
      images: [
        {
          id: "hero-en-1",
          url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80",
          publicId: "profiles/bli_gede_portrait",
          alt: "Portrait of Bli Gede Sudiartana - Official HPI Bali Tour Guide",
          caption: "Gede Sudiartana — Born, raised, and dedicating his life to sharing the authentic heart of Bali.",
        },
        {
          id: "hero-en-2",
          url: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop&q=80",
          publicId: "about/bali_temple_atmosphere",
          alt: "Sacred Temple in Bali",
          caption: "Timeless spiritual serenity across ancient Balinese shrines.",
        },
        {
          id: "hero-en-3",
          url: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&auto=format&fit=crop&q=80",
          publicId: "about/jatiluwih_rice_terrace",
          alt: "Jatiluwih Rice Terrace",
          caption: "Breathtaking emerald terraces carved into the slopes of Mount Batukaru.",
        },
      ],
      caption: "Gede Sudiartana — Born, raised, and dedicating his life to sharing the authentic heart of Bali.",
    },
    imageCaption:
      "Gede Sudiartana — Born, raised, and dedicating his life to sharing the authentic heart of Bali.",
    stats: [
      { id: "stat-1", value: "10+ Years", label: "Guiding Experience" },
      { id: "stat-2", value: "1,200+", label: "Happy Guests" },
      { id: "stat-3", value: "5.0 Stars", label: "Flawless Rating" },
      { id: "stat-4", value: "100% Private", label: "Relaxed & Flexible" },
    ],
    ctaPrimary: "Consult with Bli Gede",
    ctaPrimaryVariant: "ocean-blue-solid",
    ctaSecondary: "Explore Tour Packages",
    ctaSecondaryVariant: "neutral-outline",
  },
  story: {
    sectionTag: "THE STORY BEHIND THE WHEEL",
    title: "Beyond Just Driving — Connecting You to the Soul of Bali",
    paragraphs: [
      "I was born and raised in Gianyar, surrounded by a close-knit Balinese family deeply rooted in gamelan music, stone carving, and temple traditions. Since childhood, the fragrance of ceremonial incense, morning chants, and lush terraced fields have formed the heartbeat of my daily life. To me, Bali is never just scenic landscapes; it is a living philosophy of harmony known as Tri Hita Karana.",
      "Over a decade in the tourism industry, I saw how mass commercial tours often strip away that magic: guests hurried from gate to gate on rigid countdowns, forced stops at souvenir shops for kickbacks, leaving travelers exhausted rather than rejuvenated. That is why I chose to guide independently.",
      "By guiding directly without brokers or high-volume agency quotas, I dedicate my full personal attention to every family or couple. We adjust naturally if the weather turns or children need a breather, and we pause whenever you spot a quiet scene that takes your breath away.",
    ],
    quote:
      "To me, every traveler is never a mere business transaction, but a dear friend visiting my home in Bali.",
    quoteAuthor: "Gede Sudiartana",
    storyImage: {
      url: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1000&auto=format&fit=crop&q=80",
      publicId: "stories/bali_temple_culture",
      alt: "Cultural atmosphere and temples of Bali",
    },
    media: {
      mode: "single",
      singleTemplate: "classic-editorial",
      multiTemplate: "stacked-deck",
      images: [
        {
          id: "story-en-1",
          url: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1000&auto=format&fit=crop&q=80",
          publicId: "stories/bali_temple_culture",
          alt: "Cultural atmosphere and temples of Bali",
          caption: "Cultural atmosphere and temples of Bali",
        },
        {
          id: "story-en-2",
          url: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=1000&auto=format&fit=crop&q=80",
          publicId: "about/uluwatu_cliff",
          alt: "Uluwatu Sunset Ocean Cliff",
          caption: "Sunset at the dramatic limestone cliffs of southern Bali.",
        },
      ],
      caption: "Cultural atmosphere and temples of Bali",
    },
  },
  guidingStyle: {
    sectionTag: "THE EXPERIENCE WITH GEDE",
    title: "How Your Day Unfolds with Bli Gede",
    subtitle:
      "Three pillars of comfort and hospitality ensuring your Bali holiday feels unhurried, enriching, and peaceful.",
    pillars: [
      {
        id: "pillar-1",
        icon: "Clock",
        title: "Your Time Belongs to You",
        description:
          "No hurried whistles or rigid schedules. Whether you wish to linger over warm coffee amidst rice terraces or await the sunset along Uluwatu's cliffs, the day adapts to your tempo.",
      },
      {
        id: "pillar-2",
        icon: "Compass",
        title: "Living Cultural Stories",
        description:
          "Explanations of temple etiquette, sacred offerings, and folklore are shared warmly and naturally, just like chatting with an old local friend.",
      },
      {
        id: "pillar-3",
        icon: "Camera",
        title: "Best Photo Perspectives",
        description:
          "Deep knowledge of hidden vantage points away from tourist crowds, with friendly help to capture candid family memories with natural framing.",
      },
    ],
  },
  trustStrip: [
    {
      id: "trust-1",
      icon: "Award",
      title: "Licensed HPI Guide",
      description:
        "Reg. No: HPI-BALI-2015-8849 — Officially verified cultural knowledge, accredited legal guiding across sacred temples.",
    },
    {
      id: "trust-2",
      icon: "ShieldCheck",
      title: "Private A/C Vehicle",
      description:
        "Clean, fresh, cool family MPV reserved exclusively for your party with zero stranger sharing.",
    },
    {
      id: "trust-3",
      icon: "Sparkles",
      title: "Absolute Transparency",
      description:
        "No hidden booking surcharges, no mandatory retail detours, and flexible final payment directly on tour day.",
    },
  ],
    cta: {
      title: "Have a Custom Holiday Itinerary or Dream Route in Bali?",
      subtitle:
        "Let's discuss it casually on WhatsApp. Bli Gede is happy to recommend the most enjoyable and comfortable route for your family.",
      buttonText: "Chat with Bli Gede on WhatsApp",
      buttonVariant: "sunset-amber-solid",
    },
  };

  export const defaultBilingualAboutPageContent: BilingualAboutPageContent = {
    id: defaultAboutPageContent,
    en: defaultAboutPageContentEn,
    ctaPrimaryVariant: "ocean-blue-solid",
    ctaSecondaryVariant: "neutral-outline",
    buttonVariant: "sunset-amber-solid",
    heroMedia: defaultAboutPageContent.hero.media,
    storyMedia: defaultAboutPageContent.story.media,
  };

  /**
   * Normalisasi data media (kompatibel penuh dengan data lama string / profileImage tunggal)
   */
  export function normalizeMediaData(
    raw: any,
    fallbackSingle?: { url: string; alt?: string; caption?: string; publicId?: string }
  ): MediaSectionData {
    const defaultSingle: MediaItem = {
      id: "img-default-1",
      url:
        fallbackSingle?.url ||
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80",
      alt: fallbackSingle?.alt || "Foto Bli Gede",
      caption: fallbackSingle?.caption || "",
      publicId: fallbackSingle?.publicId || "",
    };

    if (!raw) {
      return {
        mode: "single",
        singleTemplate: "classic-editorial",
        multiTemplate: "stacked-deck",
        images: [defaultSingle],
        caption: defaultSingle.caption,
      };
    }

    // Jika data lama adalah string URL murni
    if (typeof raw === "string") {
      return {
        mode: "single",
        singleTemplate: "classic-editorial",
        multiTemplate: "stacked-deck",
        images: [{ id: "img-str-1", url: raw, alt: defaultSingle.alt, caption: defaultSingle.caption }],
        caption: defaultSingle.caption,
      };
    }

    // Jika data lama adalah objek gambar tunggal { url, alt, publicId }
    if (raw.url && !Array.isArray(raw.images)) {
      return {
        mode: "single",
        singleTemplate: "classic-editorial",
        multiTemplate: "stacked-deck",
        images: [
          {
            id: "img-legacy-1",
            url: raw.url,
            alt: raw.alt || defaultSingle.alt,
            caption: raw.caption || defaultSingle.caption,
            publicId: raw.publicId || defaultSingle.publicId,
          },
        ],
        caption: raw.caption || defaultSingle.caption,
      };
    }

    // Jika sudah berupa objek MediaSectionData
    const mode: MediaMode = raw.mode === "multi" ? "multi" : "single";

    const validSingleTemplates: SingleImageTemplate[] = [
      "classic-editorial",
      "ambient-glow",
      "polaroid-frame",
    ];
    const singleTemplate: SingleImageTemplate = validSingleTemplates.includes(raw.singleTemplate)
      ? raw.singleTemplate
      : "classic-editorial";

    const validMultiTemplates: MultiImageTemplate[] = [
      "stacked-deck",
      "editorial-bento",
      "smooth-slider",
    ];
    const multiTemplate: MultiImageTemplate = validMultiTemplates.includes(raw.multiTemplate)
      ? raw.multiTemplate
      : "stacked-deck";

    let images: MediaItem[] = [];
    if (Array.isArray(raw.images) && raw.images.length > 0) {
      images = raw.images
        .filter((img: any) => img && (typeof img === "string" || img.url))
        .map((img: any, idx: number) => {
          if (typeof img === "string") {
            return { id: `img-${idx}`, url: img, alt: `Foto ${idx + 1}` };
          }
          return {
            id: img.id || `img-${idx}`,
            url: img.url,
            alt: img.alt || `Foto ${idx + 1}`,
            caption: img.caption || "",
            publicId: img.publicId || "",
          };
        });
    }

    if (images.length === 0) {
      images = [defaultSingle];
    }

    return {
      mode,
      singleTemplate,
      multiTemplate,
      images,
      caption: raw.caption || images[0]?.caption || defaultSingle.caption,
    };
  }

  export function normalizeAboutSection(raw: any, fallback: AboutPageContent): AboutPageContent {
    if (!raw) return fallback;

    const heroMedia = normalizeMediaData(
      raw.hero?.media || raw.heroMedia,
      raw.hero?.profileImage || fallback.hero.profileImage
    );

    const storyMedia = normalizeMediaData(
      raw.story?.media || raw.storyMedia,
      raw.story?.storyImage || fallback.story.storyImage
    );

    return {
      hero: {
        badge: raw.hero?.badge || fallback.hero.badge,
        title: raw.hero?.title || fallback.hero.title,
        introText: raw.hero?.introText || fallback.hero.introText,
        profileImage: {
          url: heroMedia.images[0]?.url || raw.hero?.profileImage?.url || fallback.hero.profileImage.url,
          publicId: heroMedia.images[0]?.publicId || raw.hero?.profileImage?.publicId || fallback.hero.profileImage.publicId,
          alt: heroMedia.images[0]?.alt || raw.hero?.profileImage?.alt || fallback.hero.profileImage.alt,
        },
        media: heroMedia,
        imageCaption: raw.hero?.imageCaption || heroMedia.caption || fallback.hero.imageCaption,
        stats:
          Array.isArray(raw.hero?.stats) && raw.hero.stats.length > 0
            ? raw.hero.stats
            : fallback.hero.stats,
        ctaPrimary: raw.hero?.ctaPrimary || fallback.hero.ctaPrimary,
        ctaPrimaryVariant:
          raw.hero?.ctaPrimaryVariant || fallback.hero.ctaPrimaryVariant || "ocean-blue-solid",
        ctaSecondary: raw.hero?.ctaSecondary || fallback.hero.ctaSecondary,
        ctaSecondaryVariant:
          raw.hero?.ctaSecondaryVariant || fallback.hero.ctaSecondaryVariant || "neutral-outline",
      },
      story: {
        sectionTag: raw.story?.sectionTag || fallback.story.sectionTag,
        title: raw.story?.title || fallback.story.title,
        paragraphs:
          Array.isArray(raw.story?.paragraphs) && raw.story.paragraphs.length > 0
            ? raw.story.paragraphs
            : fallback.story.paragraphs,
        quote: raw.story?.quote || fallback.story.quote,
        quoteAuthor: raw.story?.quoteAuthor || fallback.story.quoteAuthor,
        storyImage: {
          url: storyMedia.images[0]?.url || raw.story?.storyImage?.url || fallback.story.storyImage.url,
          publicId: storyMedia.images[0]?.publicId || raw.story?.storyImage?.publicId || fallback.story.storyImage.publicId,
          alt: storyMedia.images[0]?.alt || raw.story?.storyImage?.alt || fallback.story.storyImage.alt,
        },
        media: storyMedia,
      },
      guidingStyle: {
        sectionTag: raw.guidingStyle?.sectionTag || fallback.guidingStyle.sectionTag,
        title: raw.guidingStyle?.title || fallback.guidingStyle.title,
        subtitle: raw.guidingStyle?.subtitle || fallback.guidingStyle.subtitle,
        pillars:
          Array.isArray(raw.guidingStyle?.pillars) && raw.guidingStyle.pillars.length > 0
            ? raw.guidingStyle.pillars
            : fallback.guidingStyle.pillars,
      },
      trustStrip:
        Array.isArray(raw.trustStrip) && raw.trustStrip.length > 0
          ? raw.trustStrip
          : fallback.trustStrip,
      cta: {
        title: raw.cta?.title || fallback.cta.title,
        subtitle: raw.cta?.subtitle || fallback.cta.subtitle,
        buttonText: raw.cta?.buttonText || fallback.cta.buttonText,
        buttonVariant:
          raw.cta?.buttonVariant || fallback.cta.buttonVariant || "sunset-amber-solid",
      },
      updatedAt: raw.updatedAt,
    };
  }

export async function getBilingualAboutPageContent(): Promise<BilingualAboutPageContent> {
  try {
    const doc = await getFirestoreDocument<any>("settings/about_page");
    if (doc) {
      const globalCtaPrimaryVariant: ButtonVariant =
        doc.ctaPrimaryVariant ||
        doc.hero?.ctaPrimaryVariant ||
        doc.id?.hero?.ctaPrimaryVariant ||
        doc.en?.hero?.ctaPrimaryVariant ||
        "ocean-blue-solid";

      const globalCtaSecondaryVariant: ButtonVariant =
        doc.ctaSecondaryVariant ||
        doc.hero?.ctaSecondaryVariant ||
        doc.id?.hero?.ctaSecondaryVariant ||
        doc.en?.hero?.ctaSecondaryVariant ||
        "neutral-outline";

      const globalButtonVariant: ButtonVariant =
        doc.buttonVariant ||
        doc.cta?.buttonVariant ||
        doc.id?.cta?.buttonVariant ||
        doc.en?.cta?.buttonVariant ||
        "sunset-amber-solid";

      // Global Media Data
      const globalHeroMedia = normalizeMediaData(
        doc.heroMedia || doc.id?.hero?.media || doc.en?.hero?.media,
        defaultAboutPageContent.hero.profileImage
      );

      const globalStoryMedia = normalizeMediaData(
        doc.storyMedia || doc.id?.story?.media || doc.en?.story?.media,
        defaultAboutPageContent.story.storyImage
      );

      const idContent = normalizeAboutSection(doc.id, defaultAboutPageContent);
      const enContent = normalizeAboutSection(doc.en, defaultAboutPageContentEn);

      // Sinkronkan varian dan media ke kedua cabang bahasa
      idContent.hero.ctaPrimaryVariant = globalCtaPrimaryVariant;
      enContent.hero.ctaPrimaryVariant = globalCtaPrimaryVariant;

      idContent.hero.ctaSecondaryVariant = globalCtaSecondaryVariant;
      enContent.hero.ctaSecondaryVariant = globalCtaSecondaryVariant;

      idContent.cta.buttonVariant = globalButtonVariant;
      enContent.cta.buttonVariant = globalButtonVariant;

      idContent.hero.media = globalHeroMedia;
      enContent.hero.media = globalHeroMedia;

      idContent.story.media = globalStoryMedia;
      enContent.story.media = globalStoryMedia;

      const ctaPrimaryButton: ButtonData = {
        text: {
          id: idContent.hero.ctaPrimary || defaultAboutPageContent.hero.ctaPrimary || "",
          en: enContent.hero.ctaPrimary || defaultAboutPageContentEn.hero.ctaPrimary || "",
        },
        variant: globalCtaPrimaryVariant,
        url: "/whatsapp",
      };
      idContent.hero.ctaPrimaryButton = ctaPrimaryButton;
      enContent.hero.ctaPrimaryButton = ctaPrimaryButton;

      const ctaSecondaryButton: ButtonData = {
        text: {
          id: idContent.hero.ctaSecondary || defaultAboutPageContent.hero.ctaSecondary || "",
          en: enContent.hero.ctaSecondary || defaultAboutPageContentEn.hero.ctaSecondary || "",
        },
        variant: globalCtaSecondaryVariant,
        url: "/tours",
      };
      idContent.hero.ctaSecondaryButton = ctaSecondaryButton;
      enContent.hero.ctaSecondaryButton = ctaSecondaryButton;

      const ctaBannerButton: ButtonData = {
        text: {
          id: idContent.cta.buttonText || defaultAboutPageContent.cta.buttonText,
          en: enContent.cta.buttonText || defaultAboutPageContentEn.cta.buttonText,
        },
        variant: globalButtonVariant,
        url: "/whatsapp",
      };
      idContent.cta.button = ctaBannerButton;
      enContent.cta.button = ctaBannerButton;

      return {
        id: idContent,
        en: enContent,
        ctaPrimaryVariant: globalCtaPrimaryVariant,
        ctaSecondaryVariant: globalCtaSecondaryVariant,
        buttonVariant: globalButtonVariant,
        heroMedia: globalHeroMedia,
        storyMedia: globalStoryMedia,
        updatedAt: doc.updatedAt,
      };
    }
  } catch (error) {
    console.warn("Gagal mengambil bilingual 'settings/about_page':", error);
  }
  return defaultBilingualAboutPageContent;
}

/**
 * Menyimpan data dwibahasa secara murni (id, en, dan updatedAt)
 * serta menyimpan pilihan varian gaya tombol dan template media sebagai nilai global.
 */
export async function saveBilingualAboutPageContent(
  bilingual: BilingualAboutPageContent
): Promise<{ success: boolean; error?: string; data?: BilingualAboutPageContent }> {
  try {
    const now = new Date().toISOString();

    const ctaPrimaryVariant: ButtonVariant =
      bilingual.ctaPrimaryVariant ||
      bilingual.id?.hero?.ctaPrimaryVariant ||
      bilingual.en?.hero?.ctaPrimaryVariant ||
      "ocean-blue-solid";

    const ctaSecondaryVariant: ButtonVariant =
      bilingual.ctaSecondaryVariant ||
      bilingual.id?.hero?.ctaSecondaryVariant ||
      bilingual.en?.hero?.ctaSecondaryVariant ||
      "neutral-outline";

    const buttonVariant: ButtonVariant =
      bilingual.buttonVariant ||
      bilingual.id?.cta?.buttonVariant ||
      bilingual.en?.cta?.buttonVariant ||
      "sunset-amber-solid";

    const heroMedia: MediaSectionData = normalizeMediaData(
      bilingual.heroMedia || bilingual.id?.hero?.media || bilingual.en?.hero?.media,
      defaultAboutPageContent.hero.profileImage
    );

    const storyMedia: MediaSectionData = normalizeMediaData(
      bilingual.storyMedia || bilingual.id?.story?.media || bilingual.en?.story?.media,
      defaultAboutPageContent.story.storyImage
    );

    const synchronizedId = {
      ...bilingual.id,
      hero: {
        ...bilingual.id.hero,
        ctaPrimaryVariant,
        ctaSecondaryVariant,
        media: heroMedia,
        profileImage: {
          url: heroMedia.images[0]?.url || bilingual.id.hero.profileImage.url,
          alt: heroMedia.images[0]?.alt || bilingual.id.hero.profileImage.alt,
          publicId: heroMedia.images[0]?.publicId || bilingual.id.hero.profileImage.publicId,
        },
      },
      story: {
        ...bilingual.id.story,
        media: storyMedia,
        storyImage: {
          url: storyMedia.images[0]?.url || bilingual.id.story.storyImage.url,
          alt: storyMedia.images[0]?.alt || bilingual.id.story.storyImage.alt,
          publicId: storyMedia.images[0]?.publicId || bilingual.id.story.storyImage.publicId,
        },
      },
      cta: {
        ...bilingual.id.cta,
        buttonVariant,
      },
    };

    const synchronizedEn = {
      ...bilingual.en,
      hero: {
        ...bilingual.en.hero,
        ctaPrimaryVariant,
        ctaSecondaryVariant,
        media: heroMedia,
        profileImage: {
          url: heroMedia.images[0]?.url || bilingual.en.hero.profileImage.url,
          alt: heroMedia.images[0]?.alt || bilingual.en.hero.profileImage.alt,
          publicId: heroMedia.images[0]?.publicId || bilingual.en.hero.profileImage.publicId,
        },
      },
      story: {
        ...bilingual.en.story,
        media: storyMedia,
        storyImage: {
          url: storyMedia.images[0]?.url || bilingual.en.story.storyImage.url,
          alt: storyMedia.images[0]?.alt || bilingual.en.story.storyImage.alt,
          publicId: storyMedia.images[0]?.publicId || bilingual.en.story.storyImage.publicId,
        },
      },
      cta: {
        ...bilingual.en.cta,
        buttonVariant,
      },
    };

    const payload = {
      id: synchronizedId,
      en: synchronizedEn,
      ctaPrimaryVariant,
      ctaSecondaryVariant,
      buttonVariant,
      heroMedia,
      storyMedia,
      updatedAt: now,
    };

    const isSuccess = await setFirestoreDocument("settings/about_page", payload);
    if (!isSuccess) {
      return {
        success: false,
        error: "Gagal menyimpan konten dwibahasa ke Firestore 'settings/about_page'.",
      };
    }

    return {
      success: true,
      data: {
        id: synchronizedId,
        en: synchronizedEn,
        ctaPrimaryVariant,
        ctaSecondaryVariant,
        buttonVariant,
        heroMedia,
        storyMedia,
        updatedAt: now,
      },
    };
  } catch (err: any) {
    console.error("saveBilingualAboutPageContent error:", err);
    return {
      success: false,
      error: err?.message || "Terjadi kesalahan saat menyimpan ke Firestore.",
    };
  }
}


/**
 * Menyimpan pembaruan untuk cabang bahasa tertentu ('en' atau 'id').
 * Membaca data cabang lain dan menuliskan kembali ke dokumen dengan sinkronisasi varian global.
 */
export async function saveAboutLanguageContent(
  lang: "id" | "en",
  content: AboutPageContent
): Promise<{ success: boolean; error?: string; data?: BilingualAboutPageContent }> {
  try {
    const current = await getBilingualAboutPageContent();
    const otherLang = lang === "id" ? "en" : "id";
    const otherContent =
      current[otherLang] || (otherLang === "id" ? defaultAboutPageContent : defaultAboutPageContentEn);

    // Ambil variant yang ada di content dan sinkronkan ke level atas & cabang bahasa lain
    const ctaPrimaryVariant =
      content.hero?.ctaPrimaryVariant || current.ctaPrimaryVariant || "ocean-blue-solid";
    const ctaSecondaryVariant =
      content.hero?.ctaSecondaryVariant || current.ctaSecondaryVariant || "neutral-outline";
    const buttonVariant =
      content.cta?.buttonVariant || current.buttonVariant || "sunset-amber-solid";

    const updatedCurrent = {
      ...content,
      hero: { ...content.hero, ctaPrimaryVariant, ctaSecondaryVariant },
      cta: { ...content.cta, buttonVariant },
    };

    const updatedOther = {
      ...otherContent,
      hero: { ...otherContent.hero, ctaPrimaryVariant, ctaSecondaryVariant },
      cta: { ...otherContent.cta, buttonVariant },
    };

    const updated: BilingualAboutPageContent = {
      id: lang === "id" ? updatedCurrent : updatedOther,
      en: lang === "en" ? updatedCurrent : updatedOther,
      ctaPrimaryVariant,
      ctaSecondaryVariant,
      buttonVariant,
      updatedAt: new Date().toISOString(),
    };

    return await saveBilingualAboutPageContent(updated);
  } catch (error: any) {
    console.error(`Error saveAboutLanguageContent (${lang}):`, error);
    return {
      success: false,
      error: error?.message || `Gagal menyimpan pembaruan untuk bahasa ${lang}.`,
    };
  }
}

/**
 * Menyimpan/memperbarui data konten halaman About ke dokumen Cloud Firestore 'settings/about_page'.
 * Mengarahkan penyimpanan ke cabang bahasa tertentu (default: 'id') tanpa menyisakan field di root level.
 */
export async function saveAboutPageContent(
  content: AboutPageContent,
  lang: "id" | "en" = "id"
): Promise<{ success: boolean; error?: string; data?: any }> {
  return await saveAboutLanguageContent(lang, content);
}


