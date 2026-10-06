import { getFirestoreDocument } from "@/lib/firestore/rest-client";
import { AboutPageContent } from "@/types";

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
    imageCaption:
      "Gede Sudiartana — Lahir, tumbuh, dan mendedikasikan hidup memperkenalkan keaslian Bali.",
    stats: [
      { id: "stat-1", value: "10+ Tahun", label: "Pengalaman Memandu" },
      { id: "stat-2", value: "1.200+", label: "Tamu Terpandu" },
      { id: "stat-3", value: "5.0 Bintang", label: "Ulasan Sempurna" },
      { id: "stat-4", value: "100% Privat", label: "Fleksibel & Santai" },
    ],
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
  },
};

/**
 * Mengambil konten lengkap halaman About dari dokumen Firestore 'settings/about_page'
 * dengan fallback aman ke defaultAboutPageContent.
 */
export async function getAboutPageContent(): Promise<AboutPageContent> {
  try {
    const firestoreDoc = await getFirestoreDocument<AboutPageContent>("settings/about_page");

    if (firestoreDoc && firestoreDoc.hero && firestoreDoc.story) {
      return {
        hero: {
          badge: firestoreDoc.hero.badge || defaultAboutPageContent.hero.badge,
          title: firestoreDoc.hero.title || defaultAboutPageContent.hero.title,
          introText: firestoreDoc.hero.introText || defaultAboutPageContent.hero.introText,
          profileImage: {
            url:
              firestoreDoc.hero.profileImage?.url ||
              defaultAboutPageContent.hero.profileImage.url,
            publicId:
              firestoreDoc.hero.profileImage?.publicId ||
              defaultAboutPageContent.hero.profileImage.publicId,
            alt:
              firestoreDoc.hero.profileImage?.alt ||
              defaultAboutPageContent.hero.profileImage.alt,
          },
          imageCaption:
            firestoreDoc.hero.imageCaption || defaultAboutPageContent.hero.imageCaption,
          stats:
            Array.isArray(firestoreDoc.hero.stats) && firestoreDoc.hero.stats.length > 0
              ? firestoreDoc.hero.stats
              : defaultAboutPageContent.hero.stats,
        },
        story: {
          sectionTag: firestoreDoc.story.sectionTag || defaultAboutPageContent.story.sectionTag,
          title: firestoreDoc.story.title || defaultAboutPageContent.story.title,
          paragraphs:
            Array.isArray(firestoreDoc.story.paragraphs) && firestoreDoc.story.paragraphs.length > 0
              ? firestoreDoc.story.paragraphs
              : defaultAboutPageContent.story.paragraphs,
          quote: firestoreDoc.story.quote || defaultAboutPageContent.story.quote,
          quoteAuthor: firestoreDoc.story.quoteAuthor || defaultAboutPageContent.story.quoteAuthor,
          storyImage: {
            url:
              firestoreDoc.story.storyImage?.url ||
              defaultAboutPageContent.story.storyImage.url,
            publicId:
              firestoreDoc.story.storyImage?.publicId ||
              defaultAboutPageContent.story.storyImage.publicId,
            alt:
              firestoreDoc.story.storyImage?.alt ||
              defaultAboutPageContent.story.storyImage.alt,
          },
        },
        guidingStyle: {
          sectionTag:
            firestoreDoc.guidingStyle?.sectionTag ||
            defaultAboutPageContent.guidingStyle.sectionTag,
          title:
            firestoreDoc.guidingStyle?.title ||
            defaultAboutPageContent.guidingStyle.title,
          subtitle:
            firestoreDoc.guidingStyle?.subtitle ||
            defaultAboutPageContent.guidingStyle.subtitle,
          pillars:
            Array.isArray(firestoreDoc.guidingStyle?.pillars) &&
            firestoreDoc.guidingStyle.pillars.length > 0
              ? firestoreDoc.guidingStyle.pillars
              : defaultAboutPageContent.guidingStyle.pillars,
        },
        trustStrip:
          Array.isArray(firestoreDoc.trustStrip) && firestoreDoc.trustStrip.length > 0
            ? firestoreDoc.trustStrip
            : defaultAboutPageContent.trustStrip,
        cta: {
          title: firestoreDoc.cta?.title || defaultAboutPageContent.cta.title,
          subtitle: firestoreDoc.cta?.subtitle || defaultAboutPageContent.cta.subtitle,
          buttonText: firestoreDoc.cta?.buttonText || defaultAboutPageContent.cta.buttonText,
        },
        updatedAt: firestoreDoc.updatedAt,
      };
    }
  } catch (error) {
    console.warn("Gagal mengambil 'settings/about_page' dari Firestore, menggunakan fallback:", error);
  }

  return defaultAboutPageContent;
}
