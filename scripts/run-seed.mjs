import { readFileSync, existsSync } from "fs";
import { resolve, join } from "path";
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// 1. Membaca variabel environment dari .env.local jika ada
function loadEnv() {
  const envPath = resolve(process.cwd(), ".env.local");
  if (existsSync(envPath)) {
    const content = readFileSync(envPath, "utf-8");
    content.split("\n").forEach((line) => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith("#")) {
        const eqIdx = trimmed.indexOf("=");
        if (eqIdx > 0) {
          const key = trimmed.slice(0, eqIdx).trim();
          let val = trimmed.slice(eqIdx + 1).trim();
          if (
            (val.startsWith('"') && val.endsWith('"')) ||
            (val.startsWith("'") && val.endsWith("'"))
          ) {
            val = val.slice(1, -1);
          }
          if (!process.env[key]) {
            process.env[key] = val;
          }
        }
      }
    });
  }
}

loadEnv();

const projectId =
  process.env.FIREBASE_PROJECT_ID ||
  process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
  "bali-tour-portfolio";

console.log(`=======================================================`);
console.log(`🚀 INISIALISASI MIGRASI SEED FIRESTORE: ${projectId}`);
console.log(`=======================================================`);

// Helper konversi nilai JavaScript ke format Firestore REST API
function toFirestoreValue(val) {
  if (val === null || val === undefined) return { nullValue: null };
  if (typeof val === "boolean") return { booleanValue: val };
  if (typeof val === "number") {
    if (Number.isInteger(val)) return { integerValue: val.toString() };
    return { doubleValue: val };
  }
  if (typeof val === "string") return { stringValue: val };
  if (Array.isArray(val)) {
    return { arrayValue: { values: val.map(toFirestoreValue) } };
  }
  if (typeof val === "object") {
    const fields = {};
    for (const [k, v] of Object.entries(val)) {
      if (v !== undefined) fields[k] = toFirestoreValue(v);
    }
    return { mapValue: { fields } };
  }
  return { stringValue: String(val) };
}

function toFirestoreFields(obj) {
  const fields = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v !== undefined) fields[k] = toFirestoreValue(v);
  }
  return fields;
}

// Mode eksekusi autentikasi
let adminDb = null;
let restAccessToken = null;

const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY
  ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
  : undefined;

if (clientEmail && privateKey) {
  console.log(`[Mode] Menggunakan Firebase Admin SDK via Service Account (${clientEmail})`);
  let app =
    getApps().length > 0
      ? getApps()[0]
      : initializeApp({
        credential: cert({ projectId, clientEmail, privateKey }),
        projectId,
      });
  adminDb = getFirestore(app);
} else {
  console.log(`[Mode] Menggunakan Firebase CLI OAuth Token...`);
  const configPath = join(
    process.env.USERPROFILE || process.env.HOME || "",
    ".config",
    "configstore",
    "firebase-tools.json"
  );
  if (existsSync(configPath)) {
    const configData = JSON.parse(readFileSync(configPath, "utf-8"));
    if (configData.tokens?.access_token) {
      restAccessToken = configData.tokens.access_token;
      console.log(`[Auth] Berhasil memuat token Firebase CLI untuk akun: ${configData.user?.email || "User"}`);
    }
  }

  if (!restAccessToken) {
    throw new Error(
      "Gagal mendapatkan token autentikasi. Pastikan Anda sudah login via 'npx firebase-tools login' atau menyetel Service Account di .env.local."
    );
  }
}

// Fungsi abstrak write dokumen ke Firestore
async function setDoc(collectionName, docId, data) {
  if (adminDb) {
    await adminDb.collection(collectionName).doc(docId).set(data, { merge: true });
  } else {
    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/${collectionName}/${encodeURIComponent(
      docId
    )}`;
    const res = await fetch(url, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${restAccessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fields: toFirestoreFields(data) }),
    });
    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Gagal menulis dokumen ${collectionName}/${docId}: ${res.status} ${errText}`);
    }
  }
}

// ===================================================================
// A. DATA TEMA ('settings/theme')
// ===================================================================
const themeSettingsData = {
  activePreset: "bali-editorial",
  typography: {
    headingFont: "Libre Baskerville",
    bodyFont: "Inter",
  },
  presets: [
    {
      id: "bali-editorial",
      name: "Bali Editorial",
      colors: {
        brand: "#1878B8",
        trust: "#1878B8",
        secondary: "#0C8C5E",
        accent: "#E67E22",
        canvas: "#FEFDFB",
        surface: "#FFFFFF",
        textPrimary: "#08090A",
        textMuted: "#5E6965",
      },
    },
    {
      id: "tropical-nature",
      name: "Tropical Nature",
      colors: {
        brand: "#15803D",
        accent: "#F59E0B",
        trust: "#0284C7",
        canvas: "#F0FDF4",
        surface: "#FFFFFF",
        textPrimary: "#14532D",
        textMuted: "#4B5563",
      },
    },
    {
      id: "ocean-luxury",
      name: "Ocean Luxury",
      colors: {
        brand: "#0369A1",
        accent: "#D97706",
        trust: "#0D9488",
        canvas: "#F8FAFC",
        surface: "#FFFFFF",
        textPrimary: "#0F172A",
        textMuted: "#64748B",
      },
    },
    {
      id: "warm-sunset",
      name: "Warm Sunset",
      colors: {
        brand: "#C2410C",
        accent: "#047857",
        trust: "#0369A1",
        canvas: "#FFFBEB",
        surface: "#FFFFFF",
        textPrimary: "#451A03",
        textMuted: "#78716C",
      },
    },
    {
      id: "modern-minimalist",
      name: "Modern Minimalist",
      colors: {
        brand: "#18181B",
        accent: "#EA580C",
        trust: "#2563EB",
        canvas: "#FAFAFA",
        surface: "#FFFFFF",
        textPrimary: "#09090B",
        textMuted: "#71717A",
      },
    },
  ],
};

// ===================================================================
// B. DATA PROFIL LENGKAP BLI GEDE ('settings/guide_profile')
// ===================================================================
const guideProfileData = {
  name: "Gede Sudiartana",
  licenseNumber: "HPI-BALI-2015-8849",
  role: "Pemandu Wisata Resmi Himpunan Pramuwisata Indonesia (HPI)",
  email: "halo@gedebaliguide.com",
  phone: "+62 812-3456-7890",
  avatarUrl:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80",
  avatarPublicId: "gede-bali/profile/avatar",
  operatingHours: "07.00 – 22.00 WITA (Setiap Hari)",
  bioShort:
    "Pemandu wisata privat profesional berlisensi resmi HPI Bali. Memandu liburan keluarga, pasangan, dan grup kecil dengan keramahan autentik Bali, kenyamanan mobil ber-AC, dan rute fleksibel tanpa komisi perantara.",
  bioLong:
    "Lahir dan dibesarkan di Bali dengan tradisi spiritual dan keramahan Pulau Dewata. Lebih dari 10 tahun memandu wisatawan dari seluruh penjuru dunia dengan kenyamanan mobil privat, jadwal fleksibel, dan cerita budaya yang mendalam tanpa perantara calo.",
  stats: {
    experienceYears: 10,
    guestsGuided: 1200,
    rating: 5.0,
    satisfactionPercent: 100,
  },
  socialLinks: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
  },
};

// Data WhatsApp Config
const whatsappConfigData = {
  phoneNumber: "+62 812-3456-7890",
  normalizedNumber: "6281234567890",
  defaultGreeting: "Halo Bli Gede, saya tertarik untuk konsultasi tur privat di Bali.",
  serviceHours: "07:00 - 22:00 WITA",
  responseTimeText: "Respon Cepat via WhatsApp",
  isActive: true,
};

// ===================================================================
// C. DATA HALAMAN ABOUT ('settings/about_page')
// ===================================================================
const aboutPageData = {
  hero: {
    badge: "Pemandu Lokal Bali",
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

const aboutPageDataEn = {
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
    imageCaption:
      "Gede Sudiartana — Born, raised, and dedicating his life to sharing the authentic heart of Bali.",
    stats: [
      { id: "stat-1", value: "10+ Years", label: "Guiding Experience" },
      { id: "stat-2", value: "1,200+", label: "Happy Guests" },
      { id: "stat-3", value: "5.0 Stars", label: "Flawless Rating" },
      { id: "stat-4", value: "100% Private", label: "Relaxed & Flexible" },
    ],
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
      publicId: "about/bali_temple_atmosphere",
      alt: "Sacred Balinese Temple and Peaceful Rural Countryside",
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
  },
};


// ===================================================================
// D. 15 TANYA JAWAB LENGKAP ('faqs')
// ===================================================================
const faqsData = [
  // 1. Pemesanan & Biaya
  {
    id: "faq-1",
    question: "Bagaimana sistem pembayarannya?",
    answer:
      "Sangat mudah dan aman tanpa risiko. Anda tidak perlu membayar uang muka (DP) atau memasukkan kartu kredit saat reservasi. Pembayaran dilakukan langsung kepada Bli Gede di akhir perjalanan wisata setelah tur selesai dinikmati, baik secara tunai (Rupiah) maupun transfer bank/QRIS.",
    category: "Pemesanan & Biaya",
    sortOrder: 1,
    isActive: true,
  },
  {
    id: "faq-2",
    question: "Apakah ada biaya tersembunyi atau tip wajib?",
    answer:
      "Sama sekali tidak ada biaya tersembunyi. Harga sewa yang tertera sudah all-in mencakup mobil privat ber-AC, bahan bakar minyak (BBM), biaya parkir di semua objek wisata, dan jasa pemandu Bli Gede. Pemberian tip sepenuhnya sukarela atas keikhlasan tamu.",
    category: "Pemesanan & Biaya",
    sortOrder: 2,
    isActive: true,
  },
  {
    id: "faq-3",
    question: "Bagaimana kebijakan pembatalan jadwal tur?",
    answer:
      "Kebijakan pembatalan sangat fleksibel tanpa denda. Jika rencana liburan Anda mendadak berubah atau ada kendala kesehatan, cukup beri tahu Bli Gede via WhatsApp minimal 24 jam sebelum jadwal penjemputan untuk penjadwalan ulang atau pembatalan.",
    category: "Pemesanan & Biaya",
    sortOrder: 3,
    isActive: true,
  },
  {
    id: "faq-4",
    question: "Apakah harga tur dihitung per orang atau per mobil?",
    answer:
      "Seluruh tarif paket tur privat kami dihitung per mobil (kapasitas hingga 5 orang penumpang), bukan per orang. Sistem ini jauh lebih hemat dan eksklusif, terutama untuk liburan keluarga, pasangan honeymoon, atau rombongan sahabat.",
    category: "Pemesanan & Biaya",
    sortOrder: 4,
    isActive: true,
  },

  // 2. Rute & Fleksibilitas
  {
    id: "faq-5",
    question: "Apakah rute tur dan destinasi bisa diatur sesuai selera kami?",
    answer:
      "100% fleksibel! Anda bebas menukar, menambah, atau mengurangi destinasi wisata yang searah dalam rute harian. Bli Gede akan dengan senang hati membantu menyusun efisiensi waktu perjalanan agar liburan Anda santai dan menyenangkan.",
    category: "Rute & Fleksibilitas",
    sortOrder: 5,
    isActive: true,
  },
  {
    id: "faq-6",
    question: "Bagaimana jika cuaca hujan saat tur berlangsung?",
    answer:
      "Bila cuaca di lokasi tertentu kurang bersahabat, Bli Gede yang memahami seluk-beluk pulau Bali akan segera menyarankan rute alternatif yang tetap seru, seperti wisata pura berarsitektur indoor, museum seni, atau santai di kafe panorama.",
    category: "Rute & Fleksibilitas",
    sortOrder: 6,
    isActive: true,
  },
  {
    id: "faq-7",
    question: "Berapa jam durasi tur harian?",
    answer:
      "Durasi tur standar adalah 8 hingga 10 jam (Full Day Tour). Waktu dihitung santai sejak penjemputan di hotel hingga pengantaran kembali, sehingga Anda tidak perlu merasa terburu-buru di setiap objek wisata.",
    category: "Rute & Fleksibilitas",
    sortOrder: 7,
    isActive: true,
  },
  {
    id: "faq-8",
    question: "Apakah bisa request mampir ke tempat makan lokal atau toko oleh-oleh tertentu?",
    answer:
      "Tentu saja bisa. Anda bebas memilih tempat makan halal, kafe estetik, warung kuliner khas Bali, maupun pasar seni lokal. Bli Gede tidak pernah memaksakan tamu untuk berbelanja di toko suvenir komisi.",
    category: "Rute & Fleksibilitas",
    sortOrder: 8,
    isActive: true,
  },

  // 3. Armada Mobil
  {
    id: "faq-9",
    question: "Kendaraan apa yang digunakan selama tur?",
    answer:
      "Kami mengoperasikan armada mobil MPV keluarga modern seperti Toyota Avanza, Veloz, atau Innova. Seluruh unit selalu dalam kondisi prima, sejuk ber-AC dingin, bersih higienis, wangi terawat, dan diservis berkala di bengkel resmi.",
    category: "Armada Mobil",
    sortOrder: 9,
    isActive: true,
  },
  {
    id: "faq-10",
    question: "Berapa kapasitas maksimal penumpang dan koper?",
    answer:
      "Kapasitas ideal adalah 1 hingga 5 penumpang dewasa demi ruang kaki yang leluasa. Bila membawa koper (misalnya penjemputan bandara), mobil muat 4 penumpang plus 3–4 koper ukuran sedang.",
    category: "Armada Mobil",
    sortOrder: 10,
    isActive: true,
  },
  {
    id: "faq-11",
    question: "Apakah tersedia kursi bayi (car seat) atau fasilitas khusus?",
    answer:
      "Kami dapat menyediakan car seat anak / kursi bayi atau fasilitas tambahan khusus sesuai ketersediaan. Mohon informasikan kepada Bli Gede saat reservasi agar dapat dipersiapkan sebelum penjemputan.",
    category: "Armada Mobil",
    sortOrder: 11,
    isActive: true,
  },

  // 4. Budaya & Lisensi HPI
  {
    id: "faq-12",
    question: "Apa keuntungan menggunakan pemandu berlisensi resmi HPI Bali?",
    answer:
      "Pemandu resmi Himpunan Pramuwisata Indonesia (HPI Bali No. 2015-8849) memiliki sertifikasi kompetensi pariwisata legal, wawasan sejarah dan budaya yang valid, etika profesionalitas tinggi, serta menjamin keamanan dan kenyamanan hukum selama di Bali.",
    category: "Budaya & Lisensi HPI",
    sortOrder: 12,
    isActive: true,
  },
  {
    id: "faq-13",
    question: "Apakah tamu wajib memakai pakaian adat saat masuk pura?",
    answer:
      "Untuk menghormati kesucian pura adat Bali, tamu diwajibkan mengenakan kain sarung (kamben) dan selendang (senteng). Bli Gede sudah menyediakan sarung dan selendang bersih secara cuma-cuma di dalam mobil untuk kenyamanan Anda.",
    category: "Budaya & Lisensi HPI",
    sortOrder: 13,
    isActive: true,
  },
  {
    id: "faq-14",
    question: "Bahasa apa saja yang dikuasai Bli Gede?",
    answer:
      "Bli Gede fasih berbahasa Indonesia dan menguasai Bahasa Inggris percakapan aktif, sehingga sangat komunikatif mendampingi wisatawan domestik maupun tamu mancanegara.",
    category: "Budaya & Lisensi HPI",
    sortOrder: 14,
    isActive: true,
  },
  {
    id: "faq-15",
    question: "Apakah Bli Gede mendampingi tamu masuk ke dalam area objek wisata?",
    answer:
      "Ya, Bli Gede siap mendampingi Anda masuk ke dalam area pura dan objek wisata untuk menceritakan sejarah, filosofi budaya, serta dengan senang hati membantu mengambil foto dan video momen terbaik Anda.",
    category: "Budaya & Lisensi HPI",
    sortOrder: 15,
    isActive: true,
  },
];

// ===================================================================
// E. 6 DATA PAKET TUR LENGKAP ('tours')
// ===================================================================
const toursData = [
  {
    id: "tour-1",
    slug: "ubud-cultural-heritage-waterfall",
    name: "Ubud Cultural Heritage & Sacred Waterfall Tour",
    tagline: "Eksplorasi mahakarya seni, terasering sawah hijau, dan air terjun alami Ubud.",
    description:
      "Menjelajahi jantung kebudayaan Bali di Ubud. Saksikan keindahan pura kuno Tirta Empul, berjalan di pematang terasering sawah Tegalalang, segarnya percikan air terjun Tibumana, dan interaksi hangat bersama komunitas seniman lokal.",
    category: "culture",
    area: "Ubud",
    duration: "8 - 10 Jam",
    price: 0,
    priceType: "per_group",
    currency: "IDR",
    minimumGuests: 1,
    maximumGuests: 5,
    coverImage:
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=1200&auto=format&fit=crop&q=85",
    galleryImages: [
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=1200&auto=format&fit=crop&q=85",
      "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=1200&auto=format&fit=crop&q=85",
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&auto=format&fit=crop&q=85",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&auto=format&fit=crop&q=85",
    ],
    highlights: [
      "Terasering Sawah Tegalalang",
      "Pura Tirta Empul Tampaksiring",
      "Air Terjun Tibumana",
      "Hutan Monyet Sacred Monkey Forest",
    ],
    includes: [
      "Unit mobil privat ber-AC dingin",
      "Driver & Guide resmi berlisensi HPI",
      "BBM (Bensin) & semua biaya parkir",
      "Peminjaman kain adat & sarung untuk masuk pura",
      "Air mineral botol dingin",
    ],
    excludes: [
      "Tiket masuk objek wisata",
      "Makan siang / malam",
      "Pengeluaran pribadi",
    ],
    pickupLocation: "Lobby Hotel / Villa di seluruh area Bali Selatan & Ubud",
    itinerary: [
      {
        time: "08:30",
        title: "Penjemputan di Hotel / Villa",
        description:
          "Bli Gede menjemput Anda tepat waktu dengan armada mobil privat ber-AC yang bersih dan sejuk.",
      },
      {
        time: "09:30 - 11:30",
        title: "Sacred Monkey Forest Sanctuary",
        description:
          "Menyusuri hutan lindung asri di pusat Ubud yang dihuni ratusan kera ekor panjang dan candi kuno peninggalan abad ke-14.",
      },
      {
        time: "12:00 - 13:30",
        title: "Makan Siang di Tepi Sawah Tegalalang",
        description:
          "Menikmati kuliner lezat khas Bali dengan pemandangan undakan sawah hijau yang memukau mata.",
      },
      {
        time: "14:00 - 15:30",
        title: "Pura Tirta Empul Tampaksiring",
        description:
          "Merasakan kesakralan pura peninggalan Dinasti Warmadewa dengan mata air suci yang digunakan untuk tradisi melukat.",
      },
      {
        time: "16:00 - 17:30",
        title: "Air Terjun Tersembunyi Tibumana",
        description:
          "Berjalan santai melewati pepohonan tropis menuju air terjun jernih dengan suasana hening dan damai.",
      },
      {
        time: "17:30 - 19:00",
        title: "Perjalanan Kembali ke Hotel",
        description:
          "Perjalanan santai kembali ke penginapan Anda sambil beristirahat nyaman di dalam mobil ber-AC.",
      },
    ],
    featured: true,
    isActive: true,
    rating: 5.0,
    reviewCount: 48,
  },
  {
    id: "tour-2",
    slug: "uluwatu-cliff-sunset-kecak-dance",
    name: "Uluwatu Sunset Cliff, Melasti Beach & Tari Kecak",
    tagline: "Pesona tebing kapur megah, pasir putih pantai selatan, dan magisnya tari Kecak api.",
    description:
      "Menikmati pesona pantai selatan Bali di Pantai Melasti, dilanjutkan menuju tebing sakral Pura Luhur Uluwatu setinggi 70 meter di atas Samudra Hindia saat matahari terbenam dengan pertunjukan legendaris Tari Kecak dan santap malam seafood Jimbaran.",
    category: "adventure",
    area: "Uluwatu",
    duration: "8 - 9 Jam",
    price: 0,
    priceType: "per_group",
    currency: "IDR",
    minimumGuests: 1,
    maximumGuests: 5,
    coverImage:
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=1200&auto=format&fit=crop&q=85",
    galleryImages: [
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=1200&auto=format&fit=crop&q=85",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format&fit=crop&q=85",
      "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=1200&auto=format&fit=crop&q=85",
      "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=1200&auto=format&fit=crop&q=85",
    ],
    highlights: [
      "Tebing Pura Uluwatu Cliff",
      "Pertunjukan Tari Kecak & Api Sunset",
      "Pantai Melasti Ungasan",
      "Dinner Seafood Pantai Jimbaran (Opsional)",
    ],
    includes: [
      "Unit mobil privat ber-AC dingin",
      "Driver & Guide resmi berlisensi HPI",
      "BBM (Bensin) & semua biaya parkir",
      "Peminjaman kain adat & sarung untuk masuk pura",
      "Air mineral botol dingin",
    ],
    excludes: [
      "Tiket masuk objek wisata & tiket Tari Kecak",
      "Makan siang / malam",
      "Pengeluaran pribadi",
    ],
    pickupLocation: "Lobby Hotel / Villa di area Kuta, Seminyak, Canggu, Sanur, Jimbaran, Nusa Dua",
    itinerary: [
      {
        time: "12:00",
        title: "Penjemputan di Hotel / Villa",
        description: "Penjemputan santai di lobi hotel ber-AC menuju pesisir selatan Bali.",
      },
      {
        time: "14:30 · Pantai Melasti Ungasan",
        title: "Pantai Melasti Ungasan",
        description:
          "Eksplorasi tebing kapur spektakuler dan pantai pasir putih jernih di Bali Selatan.",
      },
      {
        time: "16:30 · Pura Luhur Uluwatu Cliff",
        title: "Pura Luhur Uluwatu Cliff",
        description:
          "Mengagumi pura sakral di atas tebing karang setinggi 70 meter menghadap Samudra Hindia.",
      },
      {
        time: "18:00 · Tari Kecak & Api Sunset",
        title: "Tari Kecak & Api Sunset",
        description:
          "Menyaksikan drama tari Ramayana berlatar matahari terbenam magis di panggung terbuka tebing Uluwatu.",
      },
      {
        time: "19:30 · Dinner Seafood Jimbaran (Opsional)",
        title: "Dinner Seafood Jimbaran (Opsional)",
        description:
          "Menikmati santap malam boga bahari khas Bali di tepi pantai Jimbaran.",
      },
      {
        time: "21:00 - 21:45",
        title: "Kembali ke Hotel",
        description:
          "Perjalanan kembali ke penginapan Anda dengan aman dan nyaman bersama Bli Gede.",
      },
    ],
    featured: true,
    isActive: true,
    rating: 5.0,
    reviewCount: 62,
  },
  {
    id: "tour-3",
    slug: "bedugul-ulun-danu-jatiluwih-unesco",
    name: "Bedugul Ulun Danu & Jatiluwih UNESCO Rice Terrace",
    tagline: "Hawa sejuk pegunungan, pura terapung Danau Beratan, dan lanskap sawah warisan dunia.",
    description:
      "Jelajahi keindahan dataran tinggi Bali bagian tengah. Mengunjungi Pura Ulun Danu Beratan yang ikonik di tepi danau, Handara Gate yang legendaris, serta panorama spektakuler sawah terasering Jatiluwih yang diakui UNESCO.",
    category: "nature",
    area: "Bedugul",
    duration: "10 Jam",
    price: 0,
    priceType: "per_group",
    currency: "IDR",
    minimumGuests: 1,
    maximumGuests: 5,
    coverImage:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&auto=format&fit=crop&q=85",
    galleryImages: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&auto=format&fit=crop&q=85",
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=1200&auto=format&fit=crop&q=85",
      "https://images.unsplash.com/photo-1570789210967-2cac24afeb00?w=1200&auto=format&fit=crop&q=85",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&auto=format&fit=crop&q=85",
    ],
    highlights: [
      "Pura Ulun Danu Beratan",
      "Jatiluwih Rice Terrace (UNESCO)",
      "Gerbang Ikonik Handara",
      "Perkebunan Kopi Luwak Tradisional",
    ],
    includes: [
      "Unit mobil privat ber-AC dingin",
      "Driver & Guide resmi berlisensi HPI",
      "BBM (Bensin) & semua biaya parkir",
      "Peminjaman kain adat & sarung untuk masuk pura",
      "Air mineral botol dingin",
    ],
    excludes: [
      "Tiket masuk objek wisata",
      "Makan siang / malam",
      "Pengeluaran pribadi",
    ],
    pickupLocation: "Lobby Hotel / Villa di seluruh area Bali Selatan & Ubud",
    itinerary: [
      {
        time: "08:00",
        title: "Penjemputan Hotel",
        description: "Perjalanan santai menuju kawasan pegunungan sejuk Bedugul.",
      },
      {
        time: "10:00 - 11:30",
        title: "Pura Ulun Danu Danau Beratan",
        description: "Pura terapung ikonik yang menghiasi uang kertas Rp50.000 dengan panorama danau asri.",
      },
      {
        time: "12:00 - 12:45",
        title: "Gerbang Megah Handara Gate",
        description: "Spot foto arsitektur khas Bali dengan latar perbukitan hijau berkabut.",
      },
      {
        time: "13:30 - 15:30",
        title: "Jatiluwih Rice Terrace (UNESCO)",
        description: "Makan siang dengan pemandangan sawah terluas di Bali serta jalan santai di pematang sawah.",
      },
      {
        time: "16:00 - 18:00",
        title: "Perjalanan Kembali ke Hotel",
        description: "Perjalanan santai kembali ke penginapan dengan aman.",
      },
    ],
    featured: true,
    isActive: true,
    rating: 5.0,
    reviewCount: 39,
  },
  {
    id: "tour-4",
    slug: "kintamani-volcano-batur-sunrise-jeep",
    name: "Kintamani Sunrise Jeep 4WD & Pemandian Air Panas Batur",
    tagline: "Sambut fajar spektakuler dari kaldera Gunung Batur dan relaksasi di kolam air panas alami.",
    description:
      "Petualangan fajar menyaksikan matahari terbit di atas lautan awan Gunung Batur menggunakan mobil jeep terbuka 4WD legendaris, disusul relaksasi di Toya Devasya Hot Spring dengan panorama danau Batur.",
    category: "adventure",
    area: "Kintamani",
    duration: "9 Jam",
    price: 0,
    priceType: "per_group",
    currency: "IDR",
    minimumGuests: 1,
    maximumGuests: 4,
    coverImage:
      "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?w=1200&auto=format&fit=crop&q=85",
    galleryImages: [
      "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?w=1200&auto=format&fit=crop&q=85",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&auto=format&fit=crop&q=85",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=1200&auto=format&fit=crop&q=85",
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&auto=format&fit=crop&q=85",
    ],
    highlights: ["Sunrise Gunung Batur", "Black Lava Jeep 4WD Tour", "Pemandian Air Panas Alami Batur", "Kopi Kintamani di Tebing"],
    includes: [
      "Unit mobil privat ber-AC dingin jemput hotel",
      "Driver & Guide resmi berlisensi HPI",
      "BBM (Bensin) & semua biaya parkir",
      "Air mineral botol dingin",
    ],
    excludes: [
      "Sewa Jeep 4WD lokal",
      "Tiket pemandian air panas alami",
      "Makan pagi / siang",
      "Pengeluaran pribadi",
    ],
    pickupLocation: "Lobby Hotel / Villa di Bali Selatan & Ubud (Penjemputan Dini Hari)",
    itinerary: [
      {
        time: "03:00 - 03:30",
        title: "Penjemputan Dini Hari di Hotel",
        description: "Bli Gede menjemput Anda untuk memulai perjalanan menuju kaki Gunung Batur.",
      },
      {
        time: "05:00 - 07:00",
        title: "Sunrise Point Gunung Batur dengan Jeep 4WD",
        description: "Menyaksikan lautan awan dan matahari terbit spektakuler dari kaldera purba.",
      },
      {
        time: "07:30 - 08:30",
        title: "Eksplorasi Black Lava & Black Sand",
        description: "Berkeliling hamparan batu lava hitam legendaris letusan masa lampau.",
      },
      {
        time: "09:00 - 11:00",
        title: "Relaksasi Pemandian Air Panas Alami Batur",
        description: "Berendam di kolam air belerang hangat dengan view Danau Batur yang menenangkan.",
      },
      {
        time: "11:30 - 13:00",
        title: "Makan Siang & Menikmati Kopi Kintamani",
        description: "Istirahat santai di kafe tebing Kintamani sebelum kembali ke hotel.",
      },
    ],
    featured: false,
    isActive: true,
    rating: 5.0,
    reviewCount: 29,
  },
  {
    id: "tour-5",
    slug: "nusa-penida-west-coastal-escape",
    name: "Nusa Penida West Coast: Kelingking & Broken Beach",
    tagline: "Eksplorasi tebing dinosaurus Kelingking, Broken Beach, dan keajaiban Angel's Billabong.",
    description:
      "Tur sehari menyeberang pulau menuju surga Nusa Penida. Mengunjungi pantai T-Rex Kelingking yang spektakuler dari puncak tebing, kolam alami Angel's Billabong, dan Crystal Bay yang tenang.",
    category: "nature",
    area: "Nusa Penida",
    duration: "11 Jam",
    price: 0,
    priceType: "per_group",
    currency: "IDR",
    minimumGuests: 1,
    maximumGuests: 5,
    coverImage:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format&fit=crop&q=85",
    galleryImages: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format&fit=crop&q=85",
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=1200&auto=format&fit=crop&q=85",
      "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=1200&auto=format&fit=crop&q=85",
      "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=1200&auto=format&fit=crop&q=85",
    ],
    highlights: ["Kelingking Beach T-Rex", "Broken Beach", "Angel's Billabong", "Crystal Bay Sunset"],
    includes: [
      "Antar-jemput hotel ke Pelabuhan Sanur",
      "Mobil privat ber-AC di Nusa Penida",
      "Driver & Guide lokal berpengalaman",
      "BBM & Parkir seluruh spot",
      "Air mineral botol dingin",
    ],
    excludes: [
      "Tiket Fastboat PP Sanur-Penida",
      "Tiket retribusi pulau",
      "Makan siang",
      "Pengeluaran pribadi",
    ],
    pickupLocation: "Lobby Hotel / Villa di Bali Selatan & Pelabuhan Sanur",
    itinerary: [
      {
        time: "06:30",
        title: "Penjemputan Menuju Pelabuhan Sanur",
        description: "Diantar menuju pelabuhan Sanur untuk naik fastboat ke Nusa Penida.",
      },
      {
        time: "08:30 - 10:30",
        title: "Angel's Billabong & Broken Beach",
        description: "Menyaksikan tebing berlubang alami raksasa dan kolam laguna samudra.",
      },
      {
        time: "11:30 - 13:30",
        title: "Tebing Ikonik Pantai Kelingking (T-Rex)",
        description: "Spot pemandangan paling spektakuler di Nusa Penida dan makan siang lokal.",
      },
      {
        time: "14:30 - 16:00",
        title: "Pantai Crystal Bay",
        description: "Santai di bawah pohon kelapa dan berenang di pantai berpasir putih.",
      },
      {
        time: "16:30 - 18:30",
        title: "Fastboat Kembali ke Sanur & Hotel",
        description: "Menyeberang kembali ke pulau Bali dan diantar selamat sampai penginapan.",
      },
    ],
    featured: false,
    isActive: true,
    rating: 5.0,
    reviewCount: 34,
  },
  {
    id: "tour-6",
    slug: "lempuyang-gates-of-heaven-tirta-gangga",
    name: "Lempuyang Gate of Heaven & Istana Air Tirta Gangga",
    tagline: "Foto ikonik gerbang surga berlatar Gunung Agung dan ketenangan istana air kerajaan Karangasem.",
    description:
      "Jelajah Bali Timur yang sakral dan memukau. Mengabadikan momen magis di Pura Penataran Agung Lempuyang, berjalan di atas kolam teratai istana air Tirta Gangga, dan menjelajahi istana peristirahatan raja Taman Ujung.",
    category: "heritage",
    area: "Bali Timur",
    duration: "10 - 11 Jam",
    price: 0,
    priceType: "per_group",
    currency: "IDR",
    minimumGuests: 1,
    maximumGuests: 5,
    coverImage:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&auto=format&fit=crop&q=85",
    galleryImages: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&auto=format&fit=crop&q=85",
      "https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=1200&auto=format&fit=crop&q=85",
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=1200&auto=format&fit=crop&q=85",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format&fit=crop&q=85",
    ],
    highlights: ["Pura Lempuyang (Gate of Heaven)", "Tirta Gangga Water Palace", "Taman Ujung Sukasada", "Pantai Pasir Putih Virgin Beach"],
    includes: [
      "Unit mobil privat ber-AC dingin",
      "Driver & Guide resmi berlisensi HPI",
      "BBM (Bensin) & semua biaya parkir",
      "Peminjaman kain adat & sarung untuk masuk pura",
      "Air mineral botol dingin",
    ],
    excludes: [
      "Tiket masuk pura & istana",
      "Sewa kain sarung",
      "Makan siang",
      "Pengeluaran pribadi",
    ],
    pickupLocation: "Lobby Hotel / Villa di seluruh area Bali Selatan & Ubud",
    itinerary: [
      {
        time: "06:00",
        title: "Penjemputan Pagi di Hotel",
        description: "Memulai perjalanan pagi ke Bali Timur agar tiba sebelum antrean ramai.",
      },
      {
        time: "08:30 - 11:00",
        title: "Pura Penataran Agung Lempuyang (Gate of Heaven)",
        description: "Mengabadikan foto ikonik di gerbang candi berlatar kemegahan Gunung Agung.",
      },
      {
        time: "12:00 - 13:30",
        title: "Istana Air Tirta Gangga",
        description: "Makan siang dan menikmati keindahan kolam ikan koi serta air mancur bersejarah.",
      },
      {
        time: "14:30 - 16:00",
        title: "Taman Ujung Water Palace",
        description: "Menjelajahi arsitektur megah perpaduan Bali dan Eropa di tepi laut Karangasem.",
      },
      {
        time: "16:30 - 18:30",
        title: "Perjalanan Kembali ke Hotel",
        description: "Kembali ke hotel Anda dengan santai.",
      },
    ],
    featured: false,
    isActive: true,
    rating: 5.0,
    reviewCount: 26,
  },
];

// ===================================================================
// E. 12 FOTO DOKUMENTASI GALERI ('gallery_images')
// ===================================================================
const galleryImagesData = [
  {
    id: "gal-1",
    title: "Pura Ulun Danu Beratan",
    category: "culture",
    location: "Danau Beratan, Bedugul",
    imageUrl:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&auto=format&fit=crop&q=85",
    caption:
      "Keindahan pura terapung ikonik di tengah sejuknya kabut Danau Beratan Bedugul. Tempat terbaik untuk foto panorama hening khas pegunungan Bali.",
    alt: "Pura Ulun Danu Beratan di Danau Beratan Bedugul Bali",
    tourSlug: "bedugul-ulun-danu-jatiluwih-unesco",
    sortOrder: 1,
    featured: true,
    isActive: true,
  },
  {
    id: "gal-2",
    title: "Terasering Sawah Tegalalang",
    category: "nature",
    location: "Tegalalang, Ubud",
    imageUrl:
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=1200&auto=format&fit=crop&q=85",
    caption:
      "Sistem irigasi tradisional Subak yang diakui UNESCO. Pagi hari adalah waktu terbaik berjalan di pematang sawah sebelum terik matahari.",
    alt: "Pemandangan terasering sawah hijau Tegalalang Ubud",
    tourSlug: "ubud-cultural-heritage-waterfall",
    sortOrder: 2,
    featured: true,
    isActive: true,
  },
  {
    id: "gal-3",
    title: "Tari Kecak Sunset Uluwatu",
    category: "culture",
    location: "Pura Luhur Uluwatu",
    imageUrl:
      "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=1200&auto=format&fit=crop&q=85",
    caption:
      "Dramatisasi kisah Ramayana berlatar samudera Hindia dan matahari terbenam keemasan. Bli Gede membantu reservasi tiket agar dapat posisi duduk terbaik.",
    alt: "Pertunjukan tari Kecak di tebing Pura Uluwatu saat senja",
    tourSlug: "uluwatu-cliff-sunset-kecak-dance",
    sortOrder: 3,
    featured: true,
    isActive: true,
  },
  {
    id: "gal-4",
    title: "Air Terjun Tersembunyi Tibumana",
    category: "nature",
    location: "Bangli, Gianyar",
    imageUrl:
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=1200&auto=format&fit=crop&q=85",
    caption:
      "Air terjun alami dengan kolam air jernih yang tenang. Rute jalan setapaknya teduh dan aman untuk anak-anak maupun orang tua.",
    alt: "Air Terjun Tibumana dengan kolam alami di Bangli Gianyar",
    tourSlug: "ubud-cultural-heritage-waterfall",
    sortOrder: 4,
    featured: true,
    isActive: true,
  },
  {
    id: "gal-5",
    title: "Momen Ceria Bersama Rombongan Tamu",
    category: "guests",
    location: "Ubud Art Market",
    imageUrl:
      "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=1200&auto=format&fit=crop&q=85",
    caption:
      "Senyum bahagia keluarga tamu saat berbelanja kerajinan tangan lokal di Ubud tanpa tergesa-gesa. Bli Gede membantu tawar-menawar harga yang wajar.",
    alt: "Keluarga wisatawan ceria berbelanja kerajinan di Ubud",
    tourSlug: "ubud-cultural-heritage-waterfall",
    sortOrder: 5,
    featured: true,
    isActive: true,
  },
  {
    id: "gal-6",
    title: "Panorama Kaldera Gunung Batur",
    category: "nature",
    location: "Kintamani, Bangli",
    imageUrl:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&auto=format&fit=crop&q=85",
    caption:
      "Makan siang santai dengan latar pemandangan Gunung Batur dan danau kawah yang memukau di ketinggian 1.500 mdpl.",
    alt: "Panorama kaldera dan danau kawah Gunung Batur Kintamani",
    sortOrder: 6,
    featured: false,
    isActive: true,
  },
  {
    id: "gal-7",
    title: "Ritual Tradisi Melukat Suci",
    category: "culture",
    location: "Pura Tirta Empul, Tampaksiring",
    imageUrl:
      "https://images.unsplash.com/photo-1570789210967-2cac24afeb00?w=1200&auto=format&fit=crop&q=85",
    caption:
      "Pengalaman pembersihan diri secara spiritual dengan air mata air alami. Bli Gede memandu tata krama dan etika persembahyangan yang benar.",
    alt: "Ritual pembersihan diri melukat di pancuran suci Pura Tirta Empul",
    tourSlug: "ubud-cultural-heritage-waterfall",
    sortOrder: 7,
    featured: false,
    isActive: true,
  },
  {
    id: "gal-8",
    title: "Sunset Magis di Pura Tanah Lot",
    category: "culture",
    location: "Tanah Lot, Tabanan",
    imageUrl:
      "https://images.unsplash.com/photo-1505995433366-e12047f3f144?w=1200&auto=format&fit=crop&q=85",
    caption:
      "Siluet pura karang legendaris yang diterpa deburan ombak saat langit senja berubah warna jingga keemasan.",
    alt: "Siluet Pura Tanah Lot berlatar matahari terbenam jingga keemasan",
    sortOrder: 8,
    featured: true,
    isActive: true,
  },
  {
    id: "gal-9",
    title: "Momen Pasangan Honeymoon di Pantai Melasti",
    category: "guests",
    location: "Pantai Melasti, Ungasan",
    imageUrl:
      "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=1200&auto=format&fit=crop&q=85",
    caption:
      "Sesi foto kenangan romantis di antara dinding tebing kapur putih megah Melasti sebelum menikmati makan malam seafood.",
    alt: "Momen romantis pasangan berlibur di Pantai Melasti Bali",
    sortOrder: 9,
    featured: false,
    isActive: true,
  },
  {
    id: "gal-10",
    title: "Petualangan Seru Snorkeling & Nusa Penida",
    category: "activity",
    location: "Crystal Bay, Nusa Penida",
    imageUrl:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&auto=format&fit=crop&q=85",
    caption:
      "Keseruan melihat terumbu karang warna-warni dan ikan pari manta di perairan Nusa Penida dengan pendampingan instruktur berlisensi.",
    alt: "Petualangan snorkeling menikmati biota laut Nusa Penida Bali",
    sortOrder: 10,
    featured: false,
    isActive: true,
  },
  {
    id: "gal-11",
    title: "Belajar Membuat Canang Sari Tradisional",
    category: "culture",
    location: "Desa Adat Penglipuran",
    imageUrl:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&auto=format&fit=crop&q=85",
    caption:
      "Tamu diajak merangkai daun kelapa dan bunga harum untuk sesajen Canang Sari langsung di pekarangan rumah warga lokal Penglipuran.",
    alt: "Belajar membuat sesajen canang sari di Desa Penglipuran",
    sortOrder: 11,
    featured: false,
    isActive: true,
  },
  {
    id: "gal-12",
    title: "Perjalanan Nyaman Armada Mobil Ber-AC",
    category: "guests",
    location: "Rute Pedesaan Jatiluwih",
    imageUrl:
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=1200&auto=format&fit=crop&q=85",
    caption:
      "Keluarga beristirahat nyaman di kabin mobil ber-AC dingin setelah seharian berkeliling melihat keajaiban sawah terasering Jatiluwih.",
    alt: "Kenyamanan armada mobil ber-AC melintasi rute pedesaan Bali",
    sortOrder: 12,
    featured: false,
    isActive: true,
  },
];

async function runSeed() {
  const stats = {
    settingsCount: 0,
    faqsCount: 0,
    toursCount: 0,
    galleryCount: 0,
  };

  try {
    const now = new Date().toISOString();

    // 1. Eksekusi Seed Pengaturan (A: settings/theme, B: settings/guide_profile, settings/whatsapp_config)
    console.log("\n[1/4] Menulis data pengaturan ke koleksi 'settings'...");

    // A: settings/theme
    await setDoc("settings", "theme", {
      ...themeSettingsData,
      updatedAt: now,
    });
    stats.settingsCount++;
    console.log("  ✓ [Setting] settings/theme (5 Preset Warna & Tipografi)");

    // B: settings/guide_profile
    await setDoc("settings", "guide_profile", {
      ...guideProfileData,
      updatedAt: now,
    });
    stats.settingsCount++;
    console.log("  ✓ [Setting] settings/guide_profile (Profil Lengkap & Statistik Bli Gede)");

    // settings/whatsapp_config
    await setDoc("settings", "whatsapp_config", {
      ...whatsappConfigData,
      updatedAt: now,
    });
    stats.settingsCount++;
    console.log("  ✓ [Setting] settings/whatsapp_config");

    // settings/about_page
    await setDoc("settings", "about_page", {
      id: aboutPageData,
      en: aboutPageDataEn,
      updatedAt: now,
    });
    stats.settingsCount++;
    console.log("  ✓ [Setting] settings/about_page (Bilingual Pure Schema id & en)");

    // 2. Eksekusi Seed D: 15 FAQ ('faqs')
    console.log("\n[2/4] Menulis 15 pertanyaan dan jawaban ke koleksi 'faqs'...");
    for (const faq of faqsData) {
      await setDoc("faqs", faq.id, {
        ...faq,
        updatedAt: now,
      });
      stats.faqsCount++;
      console.log(`  ✓ [FAQ ${faq.sortOrder}/15] ${faq.question} (${faq.category})`);
    }

    // 3. Eksekusi Seed: 6 Paket Tur Lengkap ('tours')
    console.log("\n[3/4] Menulis 6 paket tur lengkap ke koleksi 'tours'...");
    for (const tour of toursData) {
      await setDoc("tours", tour.id, {
        ...tour,
        updatedAt: now,
      });
      stats.toursCount++;
      console.log(`  ✓ [Tour] ${tour.name} (${tour.slug}) - ${tour.galleryImages.length} foto, ${tour.itinerary.length} titik rute`);
    }

    // 4. Eksekusi Seed: 12 Foto Galeri Dokumentasi ('gallery_images')
    console.log("\n[4/4] Menulis 12 foto galeri dokumentasi ke koleksi 'gallery_images'...");
    for (const item of galleryImagesData) {
      await setDoc("gallery_images", item.id, {
        ...item,
        updatedAt: now,
      });
      stats.galleryCount++;
      console.log(`  ✓ [Gallery ${item.sortOrder}/12] ${item.title} (${item.category} - ${item.location})`);
    }

    console.log(`\n=======================================================`);
    console.log(`🎉 MIGRASI & SEEDING KE FIRESTORE BERHASIL!`);
    console.log(`=======================================================`);
    console.log(`📊 Ringkasan Dokumen Berhasil Disimpan:`);
    console.log(`   - settings (theme, guide_profile, whatsapp, about) : ${stats.settingsCount} dokumen`);
    console.log(`   - faqs                                             : ${stats.faqsCount} dokumen`);
    console.log(`   - tours                                            : ${stats.toursCount} dokumen`);
    console.log(`   - gallery_images                                   : ${stats.galleryCount} dokumen`);
    console.log(`=======================================================\n`);
  } catch (error) {
    console.error(`\n❌ Gagal menjalankan seeding:`, error.message);
    process.exit(1);
  }
}

runSeed();
