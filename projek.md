# Audit Arsitektur, Deteksi Teknologi, & Ekstraksi Teknis: Gede Bali Guide

Dokumen ini merupakan hasil audit teknis mendalam (*deep architectural extraction*) atas repositori **Gede Bali Guide**. Seluruh temuan, struktur direktori, diagram alir, bedah berkas per lapisan, dan panduan modifikasi disusun untuk referensi komprehensif bagi pengembang perangkat lunak, arsitek sistem, maupun pemangku kepentingan teknis.

---

# 1. Identitas Proyek & Profil Tech Stack (Auto-Detected)

### 1.1 Identitas & Profil Proyek
* **Nama / Judul Proyek**: `gede-bali-guide` (Gede Bali Guide)
* **Domain / Karakter Aplikasi**: Portal Portofolio & Sistem Reservasi Wisata Privat (Bespoke Private Tour Portfolio & Direct Booking System)
* **Profil Entitas Bisnis**: Layanan pemandu wisata privat dan supir pribadi independen resmi berlisensi HPI Bali (Himpunan Pramuwisata Indonesia DPD Bali, No. Lisensi: `HPI-BALI-2015-8849`) atas nama **Gede Sudiartana**.
* **Strategi Konversi**: *Direct-to-WhatsApp Funnel* dengan pelacakan prospek non-blocking (*zero middleman / zero commission model*). Tidak menggunakan payment gateway kartu kredit konvensional, melainkan kalkulasi harga instan dan deep-linking WhatsApp interaktif berbudaya lokal (*"Om Swastyastu"*).

### 1.2 Tipe Arsitektur
* **Paradigma Arsitektur**: **Hybrid Modern Web Application** (Next.js App Router).
  * **Server-Side Rendering (SSR) & Incremental Static Regeneration (ISR)**: Komponen halaman publik menggunakan ISR (`revalidate = 60`) untuk performa tinggi dan caching terdistribusi di CDN/Edge.
  * **Client-Side Interactivity**: Komponen interaktif (Filter katalog, Lightbox modal galeri, accordion FAQ, form dinamis, floating widget) diisolasi dengan `"use client"`.
  * **Direct Server-to-Cloud REST API Integration**: Server components terhubung ke Google Firestore REST API v1 tanpa overhead client SDK yang berat, lengkap dengan graceful fallback ke *in-memory mock dataset*.
  * **Headless Content & Asset Management**: Cloudinary untuk kompresi dan transformasi on-the-fly media WebP/AVIF.

### 1.3 Daftar Teknologi Utama

| Kategori | Teknologi | Versi | Keterangan & Peran |
| :--- | :--- | :--- | :--- |
| **Runtime & Core** | **Node.js** | `>=20.x` | Runtime JavaScript server-side |
| **Bahasa Pemrograman** | **TypeScript** | `^5.x` | Static typing ketat di seluruh layer komponen, service, dan schema |
| **Framework Web** | **Next.js (App Router)** | `16.3.4` | Framework full-stack React dengan arsitektur server/client components, ISR, dan API routes |
| **Library UI Utama** | **React** | `19.2.8` | Engine rendering antarmuka reaktif |
| **Styling & Design System** | **Tailwind CSS (v4)** | `^4.x` | Utility-first CSS menggunakan engine baru `@tailwindcss/postcss` dan deklarasi `@theme inline` |
| **Tipografi & Ikon** | **Google Fonts & Lucide React** | `1.43.0` | Font Serif editorial (*Libre Baskerville*), Sans (*Inter*), serta 40+ ikon vektor Lucide |
| **Animasi & Interaksi** | **Framer Motion** | `^13.2.0` | Animasi transisi fluid, accordion spring physics, dan layout animation |
| **Database & Backend** | **Google Cloud Firestore (Firebase)** | `^12.19.0` (Client) / `^14.4.0` (Admin) | Database dokumen NoSQL cloud untuk data tur, destinasi, ulasan, lead prospek, dan konfigurasi |
| **REST Data Bridge** | **Firestore REST API v1** | Native Fetch | Adapter ringan pada Server Components tanpa inisialisasi cold-start berat |
| **Media Hosting & Optimasi** | **Cloudinary & next-cloudinary** | `^2.11.0` / `^6.19.3` | Pengelolaan aset gambar, auto-format WebP, responsive dynamic resizing |
| **SEO & Rich Snippets** | **Schema.org JSON-LD** | Native Next.js | Metadata terstruktur: `TouristTrip`, `ItemList`, `Person`, `ImageGallery`, `ContactPage`, `FAQPage`, `BreadcrumbList` |

---

# 2. Peta Pohon Direktori (Directory Tree)

Visualisasi hierarki repositori inti (folder sistem/build seperti `node_modules/`, `.next/`, `.git/` diabaikan sesuai aturan audit):

```text
gede-bali-guide/
├── public/                               # Aset statis publik (ikon, logo, dan manifest)
├── scripts/                              # Script CLI utilitas migrasi & sinkronisasi
│   ├── run-seed.mjs                      # Migrasi batch & seeding data mock ke Firestore REST/Admin
│   └── sync-theme.mjs                    # Utilitas sinkronisasi token tema dan styling warna
├── src/                                  # Direktori sumber kode utama aplikasi
│   ├── app/                              # Next.js 16 App Router (Rute halaman, layout, & endpoint API)
│   │   ├── about/                        # Halaman Profil, Kredibilitas HPI, & Armada Kendaraan
│   │   │   └── page.tsx                  # Server Component dengan ISR & Schema.org Person JSON-LD
│   │   ├── api/                          # REST API Endpoints internal (Route Handlers)
│   │   │   ├── cloudinary/sign/          # Endpoint tanda tangan upload aman media Cloudinary
│   │   │   ├── destinations/             # API data destinasi wisata unggulan
│   │   │   ├── home/                     # API konfigurasi dinamis halaman beranda
│   │   │   ├── leads/                    # API penampung lead prospek klik WhatsApp & form kontak
│   │   │   ├── reviews/                  # API data ulasan tamu dan submisi review baru
│   │   │   ├── seed/tours/               # HTTP trigger untuk migrasi koleksi tur ke database
│   │   │   ├── tours/                    # API katalog tur utama & filter parameter
│   │   │   │   ├── featured/             # API paket tur pilihan beranda
│   │   │   │   └── [slug]/               # API detail tur spesifik berdasarkan parameter slug
│   │   │   └── whatsapp-config/          # API runtime konfigurasi nomor & jam operasional WhatsApp
│   │   ├── contact/                      # Halaman Kontak, Formulir Reservasi, & Peta Komunikasi
│   │   │   └── page.tsx                  # Server Component + ContactPage JSON-LD
│   │   ├── faq/                          # Halaman Tanya Jawab Interaktif
│   │   │   └── page.tsx                  # Server Component + FAQPage JSON-LD
│   │   ├── gallery/                      # Halaman Galeri Foto & Dokumentasi Tur
│   │   │   └── page.tsx                  # Server Component + ImageGallery JSON-LD
│   │   ├── reviews/                      # Halaman Ulasan & Testimoni Bintang 5
│   │   │   └── page.tsx                  # Server Component + AggregateRating & Review JSON-LD
│   │   ├── tours/                        # Halaman Katalog dan Eksplorasi Rute Tur
│   │   │   ├── [slug]/                   # Rute Dinamis Detail Tur Privat
│   │   │   │   └── page.tsx              # Server Component (generateStaticParams + TouristTrip JSON-LD)
│   │   │   └── page.tsx                  # Server Component Katalog + ItemList JSON-LD
│   │   ├── favicon.ico                   # Favicon browser resmi
│   │   ├── globals.css                   # Master Tailwind v4 CSS, variabel warna ritme, & font binding
│   │   ├── layout.tsx                    # Root Layout aplikasi (HTML skeleton, font, Navbar, Floating WA)
│   │   ├── not-found.tsx                 # Halaman penanganan 404 berestetika editorial Bali
│   │   └── page.tsx                      # Halaman Utama (Beranda) dengan dukungan Dwibahasa ID & EN
│   ├── components/                       # Komponen UI Modular dan Reusable
│   │   ├── about/                        # Bagian-bagian modular halaman About (Hero, Story, Fleet, dll.)
│   │   ├── common/                       # Komponen utilitas global (Floating WhatsApp widget)
│   │   ├── contact/                      # Komponen form reservasi dan kartu info kontak
│   │   ├── faq/                          # Komponen accordion FAQ beranimasi dengan pencarian
│   │   ├── gallery/                      # Komponen grid galeri foto dan modal lightbox interaktif
│   │   ├── home/                         # Komponen modular seksi beranda (Hero, Trust, Tours, Review)
│   │   ├── layout/                       # Komponen tata letak global (Navbar dwibahasa & Footer)
│   │   ├── reviews/                      # Komponen daftar review dengan filter kategori & rating
│   │   ├── tours/                        # Komponen katalog, kartu tur, sticky booking card, itinerary
│   │   └── CloudinaryTest.tsx            # Komponen pengujian konektivitas rendering gambar Cloudinary
│   ├── data/                             # In-memory Mock Data & Resilient Fallback Layer
│   │   ├── mock-data.ts                  # Mock data profil guide, paket tur lengkap, destinasi, dan review
│   │   ├── mock-faq.ts                   # Mock data 12 pertanyaan umum terorganisir per 4 kategori
│   │   └── mock-gallery.ts               # Mock data 12 foto dokumentasi resolusi tinggi dan metadata
│   ├── lib/                              # Logika Bisnis, Akses Database, & Integrasi Pihak Ketiga
│   │   ├── firestore/                    # Adapter koneksi Firestore NoSQL
│   │   │   ├── collections.ts            # Konstanta nama koleksi dan dokumen Firestore
│   │   │   ├── rest-client.ts            # REST API v1 Client ringan untuk Next.js server components
│   │   │   └── seed-tours.ts             # Logika seeder koleksi tur ke database
│   │   ├── schemas/                      # Validasi dan transformasi skema dokumen
│   │   │   ├── home-schema.ts            # Tipe dan mapper dokumen konfigurasi beranda
│   │   │   └── tour-schema.ts            # Tipe dan mapper dokumen paket tur Firestore
│   │   ├── services/                     # Abstraksi Service Layer (Data Access Object / DAO)
│   │   │   ├── about-service.ts          # Layanan pengambilan konten profil dan halaman about
│   │   │   ├── destination-service.ts    # Layanan query data destinasi wisata
│   │   │   ├── faq-service.ts            # Layanan query tanya jawab aktif
│   │   │   ├── gallery-service.ts        # Layanan query item galeri dokumentasi
│   │   │   ├── home-service.ts           # Layanan query data terpadu beranda
│   │   │   ├── lead-service.ts           # Layanan pencatatan prospek ke Firestore
│   │   │   ├── review-service.ts         # Layanan query ulasan terverifikasi
│   │   │   ├── theme-service.ts          # Layanan konfigurasi palet tema visual
│   │   │   ├── tour-service.ts           # Layanan query tur aktif, sorting popularitas, & slug lookup
│   │   │   └── whatsapp-config-service.ts# Layanan konfigurasi nomor & pesan default WhatsApp
│   │   ├── cloudinary.ts                 # Inisialisasi Cloudinary SDK & utilitas auto-webp upload
│   │   ├── firebase-admin.ts             # Inisialisasi Firebase Admin SDK singleton (server credential)
│   │   ├── firebase.ts                   # Inisialisasi Firebase Web Client SDK singleton
│   │   ├── lead-tracker.ts               # Pelacak klik WhatsApp non-blocking (sendBeacon / fetch keepalive)
│   │   └── whatsapp.ts                   # Generator deep-link wa.me dan formatter salam budaya Bali
│   └── types/                            # Definisi Tipe Global TypeScript
│       └── index.ts                      # Master interface (Tour, GuideProfile, Review, Lead, FAQ, dll.)
├── .env.example                          # Template konfigurasi variabel lingkungan lokal/produksi
├── firebase.json                         # Konfigurasi deploy Firestore rules & indexes
├── firestore.indexes.json                # Definisi index gabungan Firestore untuk query berfilter
├── firestore.rules                       # Aturan keamanan akses Firestore (RBAC & public read control)
├── next.config.ts                        # Konfigurasi Next.js (remote patterns gambar Unsplash/Cloudinary)
├── package.json                          # Manifest dependensi proyek dan script npm
├── postcss.config.mjs                    # Konfigurasi build pipeline CSS (@tailwindcss/postcss)
└── tsconfig.json                         # Konfigurasi kompilasi TypeScript dan path alias (`@/*`)
```

---

# 3. Arsitektur Navigasi, Rute, & Aliran Aplikasi

### 3.1 Mekanisme Routing (Next.js 16 App Router)
Aplikasi menggunakan **File-System Based Routing** di dalam direktori `src/app`. Seluruh rute publik diakses secara langsung tanpa reload halaman (*client-side transitions* melalui komponen `next/link`), dengan skema rute sebagai berikut:

```
[ Root: / ] (src/app/page.tsx)
   │
   ├── [ /tours ] (src/app/tours/page.tsx) ────────► [ /tours/[slug] ] (src/app/tours/[slug]/page.tsx)
   │
   ├── [ /about ] (src/app/about/page.tsx)
   │
   ├── [ /gallery ] (src/app/gallery/page.tsx)
   │
   ├── [ /reviews ] (src/app/reviews/page.tsx)
   │
   ├── [ /faq ] (src/app/faq/page.tsx)
   │
   ├── [ /contact ] (src/app/contact/page.tsx)
   │
   └── [ Fallback: 404 ] (src/app/not-found.tsx)
```

### 3.2 Pembagian Tampilan & Struktur Tata Letak (Layout Hierarchy)
Struktur visual dibungkus secara global pada [src/app/layout.tsx](file:///d:/Download/client/src/app/layout.tsx):
1. **Root Skeleton**: Memuat tag `<html>` dengan injeksi variabel font Google (*Libre Baskerville* untuk heading dan *Inter* untuk teks isi), seleksi teks aksen emas (`selection:bg-amber-100`), dan warna kanvas krem hangat (`#FEFDFB`).
2. **Global Navigation Bar (`<Navbar />`)**:
   * Header sticky pada bagian atas layar dengan efek kaca buram (*glassmorphism*).
   * Menampilkan logo resmi, badge lisensi HPI, menu navigasi desktop, tombol pemilih bahasa (ID/EN) yang memicu `CustomEvent` (`appLanguageChange`), serta tombol CTA langsung ke WhatsApp.
   * Drawer navigasi mobile responsif menggunakan React Portal (`createPortal`) ke `document.body` agar tidak terpotong oleh overflow kontainer induk.
3. **Children Container**: Slot konten rute spesifik yang dirender di antara header dan footer.
4. **Global Floating WhatsApp Widget (`<FloatingWhatsApp />`)**:
   * Tombol melayang di pojok kanan bawah dengan efek radar berdenyut (*pulse radar effect*).
   * Dilengkapi balon sapa (*speech bubble tooltip*) yang muncul otomatis dan menghilang setelah 3 detik.
   * Menyesuaikan teks bantuan berdasarkan rute aktif (misal: saat membuka `/tours/[slug]`, tooltip berubah menawarkan konsultasi khusus rute tur tersebut).
   * Otomatis tersembunyi jika pengguna membuka drawer menu mobile.
5. **Global Footer (`<Footer />`)**:
   * Menampilkan kredensial legal HPI Bali, tautan cepat, jaminan 100% tur privat tanpa toko komisi, dan integrasi WhatsApp.

### 3.3 Sistem API Rute Internal (Route Handlers)
Endpoint backend serverless terletak pada `src/app/api/*`:
* `GET /api/tours`: Mengambil daftar tur dengan filter query parameter `category`, `area`, dan `featured`.
* `GET /api/tours/[slug]`: Mengambil data detail satu tur berdasarkan slug.
* `POST /api/leads`: Menyimpan data prospek (nama, nomor WA, catatan tur, halaman sumber) ke koleksi `leads` Firestore.
* `GET /api/destinations`, `GET /api/reviews`, `GET /api/home`, `GET /api/whatsapp-config`: Menyediakan data publik dinamis untuk klien web maupun aplikasi pihak ketiga.
* `POST /api/cloudinary/sign`: Menghasilkan tanda tangan enkripsi SHA-1 untuk unggahan langsung dari klien ke Cloudinary.

---

# 4. Bedah Detail Berkas per Lapisan (File-by-File Breakdown)

## 4.1 Lapisan Konfigurasi & Lingkungan

### 1. `package.json`
* **Lokasi**: [package.json](file:///d:/Download/client/package.json)
* **Tanggung Jawab Utama**: Menentukan identitas proyek, script automasi pengembang, dependensi runtime, dan dev-dependencies.
* **Keterhubungan**: Dibaca oleh npm/pnpm/yarn, Next.js build compiler, ESLint, dan TypeScript engine.
* **Snippet Kunci**:
```json
"dependencies": {
  "cloudinary": "^2.11.0",
  "firebase": "^12.19.0",
  "firebase-admin": "^14.4.0",
  "framer-motion": "^13.2.0",
  "lucide-react": "^1.43.0",
  "next": "16.3.4",
  "next-cloudinary": "^6.19.3",
  "react": "19.2.8",
  "react-dom": "19.2.8"
}
```

### 2. `next.config.ts`
* **Lokasi**: [next.config.ts](file:///d:/Download/client/next.config.ts)
* **Tanggung Jawab Utama**: Konfigurasi optimasi engine Next.js, terutama whitelist host gambar remote untuk komponen `<Image />`.
* **Keterhubungan**: Mengizinkan pemuatan gambar berkecepatan tinggi dari `images.unsplash.com` dan `res.cloudinary.com`.
* **Snippet Kunci**:
```typescript
images: {
  remotePatterns: [
    { protocol: "https", hostname: "images.unsplash.com" },
    { protocol: "https", hostname: "res.cloudinary.com" },
  ],
}
```

### 3. `src/app/globals.css`
* **Lokasi**: [src/app/globals.css](file:///d:/Download/client/src/app/globals.css)
* **Tanggung Jawab Utama**: Menetapkan sistem tema terpadu Tailwind CSS v4, variabel warna CSS kustom, dan binding tipografi.
* **Keterhubungan**: Diimpor oleh `layout.tsx` untuk menyuntikkan styling global ke seluruh aplikasi.
* **Snippet Kunci**:
```css
@import "tailwindcss";

:root {
  --background: #fefdfb;
  --foreground: #121715;
  --color-canvas: #fefdfb;
  --color-surface: #ffffff;
  --color-border: #ebe9e6;
  --color-brand: #1878b8;       /* Primary Ocean Blue (60%) */
  --color-secondary: #0c8c5e;   /* Bali Emerald Green (30%) */
  --color-accent: #e67e22;      /* Sunset Amber (10%) */
}
```

### 4. `firestore.rules` & `firestore.indexes.json`
* **Lokasi**: [firestore.rules](file:///d:/Download/client/firestore.rules) & [firestore.indexes.json](file:///d:/Download/client/firestore.indexes.json)
* **Tanggung Jawab Utama**: Mengatur perizinan keamanan database granular (*Role-Based Security Rules*) dan optimasi komposit index Firestore.
* **Keterhubungan**: Divalidasi oleh engine Firebase Cloud Firestore saat klien atau server melakukan query.
* **Snippet Kunci**:
```javascript
// Membuka akses baca publik hanya untuk konten aktif/terverifikasi
match /tours/{tourId} {
  allow read: if resource.data.isActive == true || isAdmin();
  allow write: if isAdmin();
}
match /leads/{leadId} {
  allow create: if request.resource.data.phone != null &&
    (request.resource.data.guestName != null || request.resource.data.name != null);
  allow read, update, delete: if isAdmin();
}
```

---

## 4.2 Lapisan Rute Halaman (App Pages)

### 1. `src/app/page.tsx` (Beranda / Landing Page)
* **Lokasi**: [src/app/page.tsx](file:///d:/Download/client/src/app/page.tsx)
* **Tanggung Jawab Utama**: Halaman etalase utama yang merangkum proposisi nilai pemandu wisata, kredensial lisensi HPI, trust bar, paket tur unggulan, destinasi, testimoni tamu, dan formulir konsultasi cepat dalam 2 bahasa (Indonesia & Inggris).
* **Fungsi / State Kunci**:
  * `language`: State `"id" | "en"` yang tersinkronisasi via `localStorage` dan event listener `appLanguageChange`.
  * `featuredTours`: Mengambil data paket tur unggulan via `getActiveFeaturedTours()`.
  * `reviews`: Mengambil ulasan bintang lima via `getFeaturedFiveStarReviews()`.
  * `faqs`: Mengambil daftar tanya jawab teratas via `getActiveFaqs()`.
* **Keterhubungan**: Mengimpor fungsi dari `tour-service`, `review-service`, `faq-service`, serta utilitas `lead-tracker`.
* **Snippet Kunci**:
```typescript
const [language, setLanguage] = useState<"id" | "en">("id");
useEffect(() => {
  const handleLang = (e: Event) => {
    const detail = (e as CustomEvent).detail;
    if (detail?.lang === "id" || detail?.lang === "en") setLanguage(detail.lang);
  };
  window.addEventListener("appLanguageChange", handleLang);
  return () => window.removeEventListener("appLanguageChange", handleLang);
}, []);
```

### 2. `src/app/tours/page.tsx` & `src/app/tours/[slug]/page.tsx`
* **Lokasi**: [src/app/tours/page.tsx](file:///d:/Download/client/src/app/tours/page.tsx) & [src/app/tours/[slug]/page.tsx](file:///d:/Download/client/src/app/tours/%5Bslug%5D/page.tsx)
* **Tanggung Jawab Utama**:
  * `tours/page.tsx`: Server Component untuk katalog tur lengkap, menyuntikkan schema `ItemList` untuk SEO Google, lalu mendelegasikan rendering katalog ke `ToursPageClient`.
  * `tours/[slug]/page.tsx`: Server Component untuk halaman detail tur spesifik. Mengimplementasikan `generateStaticParams()` untuk pra-render statis, `generateMetadata()` untuk OpenGraph dinamis, dan injeksi schema `TouristTrip` & `BreadcrumbList`.
* **Keterhubungan**: Berinteraksi dengan `tour-service.ts` (`getActiveToursSortedByPopularity`, `getActiveTourBySlug`), dan memanggil komponen `TourDetailClient`.
* **Snippet Kunci**:
```typescript
export async function generateStaticParams() {
  return mockAllTours.map((tour) => ({ slug: tour.slug }));
}
export async function generateMetadata({ params }: TourDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tour = await getActiveTourBySlug(slug);
  return {
    title: `${tour.name} — Tur Privat Bali | Gede Bali Guide`,
    description: `${tour.tagline}. Paket tur privat ber-AC bersama Gede Sudiartana...`,
    openGraph: { images: [{ url: tour.coverImage }] }
  };
}
```

### 3. `src/app/about/page.tsx`
* **Lokasi**: [src/app/about/page.tsx](file:///d:/Download/client/src/app/about/page.tsx)
* **Tanggung Jawab Utama**: Menampilkan biografi lengkap Gede Sudiartana, verifikasi sertifikat HPI Bali, armada mobil ber-AC, dan perbandingan keuntungan memesan tur privat langsung vs agen perantara.
* **Keterhubungan**: Mengambil data terpusat via `getAboutPageContent()` dari `about-service.ts` dan menyuntikkan schema `Person` Schema.org.

### 4. `src/app/gallery/page.tsx` & `src/app/reviews/page.tsx` & `src/app/faq/page.tsx` & `src/app/contact/page.tsx`
* **Lokasi**: Masing-masing di sub-folder `src/app/*`
* **Tanggung Jawab Utama**:
  * `gallery/page.tsx`: Memuat data galeri aktif (`gallery-service.ts`) dan menyajikan schema `ImageGallery`.
  * `reviews/page.tsx`: Menghitung skor rata-rata ulasan secara dinamis dan menyajikan schema `AggregateRating`.
  * `faq/page.tsx`: Menyajikan daftar tanya jawab terstruktur dengan schema `FAQPage` untuk Google Rich Search.
  * `contact/page.tsx`: Menampilkan formulir kirim pesan dan kartu jalur komunikasi WhatsApp langsung.

---

## 4.3 Lapisan UI & Komponen Reusable

### 1. `src/components/common/FloatingWhatsApp.tsx`
* **Lokasi**: [src/components/common/FloatingWhatsApp.tsx](file:///d:/Download/client/src/components/common/FloatingWhatsApp.tsx)
* **Tanggung Jawab Utama**: Tombol mengambang konversi WhatsApp dengan kecerdasan kontekstual.
* **Logika Kunci**:
  * Menggunakan `usePathname()` untuk menentukan pesan tooltip bantuan.
  * Menyimpan status dismiss ke `sessionStorage` (`wa_tooltip_dismissed`).
  * Menerapkan listener event `mobileMenuChange` agar otomatis menyembunyikan tombol saat menu laci mobile sedang terbuka.
  * Memanggil `handleWhatsAppClick()` untuk tracking data lead sebelum membuka tautan WhatsApp di tab baru.

### 2. `src/components/tours/TourBookingCard.tsx`
* **Lokasi**: [src/components/tours/TourBookingCard.tsx](file:///d:/Download/client/src/components/tours/TourBookingCard.tsx)
* **Tanggung Jawab Utama**: Komponen sticky booking card di halaman detail tur.
* **Fungsi / State Kunci**:
  * `guestName`, `tripDate`, `guestCount`, `customNote`.
  * Menghitung `estimatedTotal` secara otomatis (apakah tarif *per group* atau *per person*, serta penyesuaian jika tamu melebihi kapasitas mobil maks 5 orang).
  * Menghasilkan teks pesan WhatsApp dan URL dinamis melalui `buildWhatsAppUrl()` dan `formatWhatsAppMessage()`.
  * Dilengkapi tombol pratinjau pesan (*Live Message Preview Modal/Drawer*).
* **Snippet Kunci**:
```typescript
const estimatedTotal =
  tour.priceType === "per_person"
    ? tour.price * guestCount
    : guestCount > tour.maximumGuests
    ? tour.price * Math.ceil(guestCount / tour.maximumGuests)
    : tour.price;
```

### 3. `src/components/tours/ToursCatalog.tsx`
* **Lokasi**: [src/components/tours/ToursCatalog.tsx](file:///d:/Download/client/src/components/tours/ToursCatalog.tsx)
* **Tanggung Jawab Utama**: Mesin pencarian dan penyaringan paket tur di sisi klien (*Client-Side Filtering & Search Engine*).
* **Fungsi / State Kunci**:
  * `searchQuery`: Pencarian teks bebas (mencocokkan nama tur, tagline, deskripsi, dan rute highlight).
  * `selectedCategory`: Filter kategori (*Culture, Nature, Adventure, Heritage*).
  * `selectedArea`: Filter wilayah (*Ubud, Bedugul, Uluwatu, Kintamani, Nusa Penida, Bali Timur*).
  * `sortBy`: Pengurutan berdasarkan popularitas, harga termurah, harga tertinggi, dan durasi.

### 4. `src/components/gallery/GalleryLightbox.tsx`
* **Lokasi**: [src/components/gallery/GalleryLightbox.tsx](file:///d:/Download/client/src/components/gallery/GalleryLightbox.tsx)
* **Tanggung Jawab Utama**: Penampil foto modal resolusi tinggi layar penuh dengan kontrol keyboard (*ArrowLeft*, *ArrowRight*, *Escape*) dan tombol konsultasi rute lokasi foto langsung ke WhatsApp.

### 5. `src/components/faq/FaqAccordion.tsx`
* **Lokasi**: [src/components/faq/FaqAccordion.tsx](file:///d:/Download/client/src/components/faq/FaqAccordion.tsx)
* **Tanggung Jawab Utama**: Accordion pertanyaan interaktif dengan animasi halus Framer Motion, filter tab kategori, pencarian kata kunci instan, dan tombol *Expand All* / *Collapse All*.

---

## 4.4 Lapisan Logika Bisnis, Service, & Data Access

### 1. `src/lib/firestore/rest-client.ts`
* **Lokasi**: [src/lib/firestore/rest-client.ts](file:///d:/Download/client/src/lib/firestore/rest-client.ts)
* **Tanggung Jawab Utama**: Driver REST API v1 ringan ke Google Firestore. Menghindari latensi cold-start SDK client di Next.js Server Components.
* **Fungsi Kunci**:
  * `parseFirestoreValue(val)`: Mengonversi format type Firestore REST (`stringValue`, `integerValue`, `booleanValue`, `arrayValue`, `mapValue`) ke objek JavaScript standar.
  * `queryFirestoreCollection<T>(collectionId, filterField, filterValue)`: Mengeksekusi `runQuery` Firestore dengan HTTP POST dan mengaktifkan ISR caching (`next: { revalidate: 60 }`).
  * `getFirestoreDocument<T>(documentPath)`: Mengambil satu dokumen spesifik berdasarkan path dokumen.
* **Snippet Kunci**:
```typescript
export async function queryFirestoreCollection<T = any>(
  collectionId: string,
  filterField = "isActive",
  filterValue = true
): Promise<T[]> {
  const url = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents:runQuery`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      structuredQuery: {
        from: [{ collectionId }],
        where: {
          fieldFilter: {
            field: { fieldPath: filterField },
            op: "EQUAL",
            value: { booleanValue: filterValue },
          },
        },
      },
    }),
    next: { revalidate: 60 },
  });
  const rows = await res.json();
  return rows.filter((r: any) => r.document).map((r: any) => parseFirestoreDoc<T>(r.document));
}
```

### 2. `src/lib/services/tour-service.ts`
* **Lokasi**: [src/lib/services/tour-service.ts](file:///d:/Download/client/src/lib/services/tour-service.ts)
* **Tanggung Jawab Utama**: Mengelola seluruh logika bisnis katalog tur, pengurutan algoritma popularitas, filtering, serta mekanisme fail-safe fallback ke `mockAllTours`.
* **Fungsi Kunci**:
  * `fetchActiveToursFromFirestore()`: Query data cloud dengan deduplikasi slug dan fallback otomatis jika Firestore offline/kosong.
  * `getActiveToursSortedByPopularity(options)`: Mengurutkan tur dengan prioritas: (1) Featured Tours, (2) Rating tertinggi, (3) Jumlah ulasan terbanyak.
  * `getActiveTourBySlug(slug)`: Pencarian detail satu tur berdasarkan slug unik.
  * `getActiveFeaturedTours(limit)`: Mengambil subset tur unggulan berperingkat tertinggi untuk Beranda.

### 3. `src/lib/whatsapp.ts`
* **Lokasi**: [src/lib/whatsapp.ts](file:///d:/Download/client/src/lib/whatsapp.ts)
* **Tanggung Jawab Utama**: Mesin pembuat pesan (*message builder*) dan tautan deep-link `wa.me`.
* **Fungsi Kunci**:
  * `normalizePhoneNumber(phone)`: Menstandarkan format nomor Indonesia ke standar internasional tanpa tanda tambah (misal `081234567890` -> `6281234567890`).
  * `formatWhatsAppMessage(options)`: Menyusun kalimat santun khas Bali yang memuat sapaan budaya (*"Om Swastyastu / Halo Bli Gede"*), identitas tamu, nama tur, tanggal rencana, jumlah rombongan, lokasi penjemputan, estimasi tarif, dan salam penutup (*"Suksema"*).
  * `buildWhatsAppUrl(options)`: Mengonversi pesan menjadi URL `https://wa.me/...` ter-encode URI secara aman.

### 4. `src/lib/lead-tracker.ts`
* **Lokasi**: [src/lib/lead-tracker.ts](file:///d:/Download/client/src/lib/lead-tracker.ts)
* **Tanggung Jawab Utama**: Melakukan pelacakan prospek saat pengunjung menekan tombol WhatsApp tanpa mengorbankan kecepatan transisi (*zero delay*).
* **Fungsi Kunci**:
  * `handleWhatsAppClick(sourcePage, tourName, customMessage)`: Menggunakan `navigator.sendBeacon` (atau `fetch` dengan opsi `keepalive: true`) ke `/api/leads` secara asinkron di background, lalu segera membuka WhatsApp di tab baru (`window.open`).

### 5. `src/lib/cloudinary.ts`
* **Lokasi**: [src/lib/cloudinary.ts](file:///d:/Download/client/src/lib/cloudinary.ts)
* **Tanggung Jawab Utama**: Inisialisasi SDK Cloudinary dan fungsi utilitas `uploadImage` dengan kompresi otomatis (`quality: 'auto'`, `format: 'webp'`).

---

## 4.5 Lapisan Tipe Data & Mock Seed

### 1. `src/types/index.ts`
* **Lokasi**: [src/types/index.ts](file:///d:/Download/client/src/types/index.ts)
* **Tanggung Jawab Utama**: Kontrak data terpusat (*Single Source of Truth*) yang mendefinisikan struktur model:
  * `Tour`: Properti paket tur (slug, kategori, durasi, harga, kapasitas tamu, gambar, highlights, includes/excludes, itinerary).
  * `GuideProfile` & `FullGuideProfile`: Biodata pemandu, lisensi HPI, jam operasional, kontak.
  * `Review`: Struktur ulasan tamu terverifikasi bintang 1-5.
  * `Lead`: Entitas prospek pelanggan yang masuk dari website.
  * `FAQItem`: Struktur pertanyaan dan jawaban tanya jawab.
  * `GalleryItem`: Metadata gambar foto dokumentasi tur.
  * `Destination`: Data daya tarik wisata dan spot unggulan.

### 2. `scripts/run-seed.mjs`
* **Lokasi**: [scripts/run-seed.mjs](file:///d:/Download/client/scripts/run-seed.mjs)
* **Tanggung Jawab Utama**: Script otomasi pengembang mandiri (*Node.js CLI runner*) untuk mengunggah seluruh data inisial (`tours`, `destinations`, `reviews`, `gallery_images`, `faqs`, `settings/home_config`, `settings/about_page`) ke Firestore baik via Firebase Admin SDK maupun REST API.

---

# 5. Alur Kerja Fitur-Fitur Kunci (Feature Workflows)

```
[ Pengunjung Membuka Web ]
        │
        ├──► 1. Eksplorasi Katalog & Filter (ToursCatalog)
        │         │
        │         ▼
        ├──► 2. Buka Detail Tur (/tours/[slug])
        │         │  Kalkulasi Estimasi Harga Instan (TourBookingCard)
        │         │
        │         ▼
        ├──► 3. Klik "Pesan via WhatsApp"
        │         │
        │         ├─► [Background Process] Kirim Beacon ke /api/leads (Lead Tracking)
        │         │
        │         └─► [Foreground Process] Buka wa.me dengan Pesan Budaya Terformat ("Om Swastyastu")
        │
        └──► 4. Alternatif: Formulir Kontak Langsung (/contact)
                  │
                  └─► Validasi & Submisi Lead ke Firestore Database
```

### 5.1 Alur 1: Eksplorasi Katalog & Filter Rute Tur
1. **Trigger Pengguna**: Pengguna mengunjungi `/tours`.
2. **Server Rendering**: `src/app/tours/page.tsx` memanggil `getActiveToursSortedByPopularity()`.
3. **Dual-Source Retrieval**: Sistem memeriksa data Firestore melalui REST API. Jika tersedia, data di-parse; jika koneksi database gagal atau kosong, sistem mengambil data `mockAllTours` secara instan.
4. **Client Interactivity**: Data dioper ke `ToursCatalog.tsx`. Pengguna mengetik di search bar atau mengklik pill filter (*Ubud*, *Uluwatu*, *Budaya*, *Alam*).
5. **Realtime Filtering**: Komponen menghitung subset tur secara reaktif melalui React `useMemo` tanpa request ulang ke server.

### 5.2 Alur 2: Detail Tur & Direct Booking WhatsApp
1. **Trigger Pengguna**: Pengguna mengklik salah satu kartu tur dan diarahkan ke `/tours/[slug]`.
2. **Static Generation**: Next.js merender halaman berdasarkan `generateStaticParams()`.
3. **Interaksi Booking**: Pengguna mengubah jumlah tamu di `TourBookingCard.tsx`.
4. **Kalkulasi Dinamis**: Sistem mengecek `tour.priceType`:
   * Jika `per_group` dan jumlah tamu $\le 5$, tarif tetap (misal Rp 650.000 / mobil).
   * Jika jumlah tamu $> 5$, sistem menghitung kelipatan kebutuhan armada: $\text{Tarif} \times \lceil \frac{\text{Tamu}}{5} \rceil$.
5. **Konversi WhatsApp**: Saat tombol "Pesan via WhatsApp" diklik:
   * `formatWhatsAppMessage()` merangkai pesan terstruktur dengan sapaan khas Bali.
   * `handleWhatsAppClick()` mencatat prospek di latar belakang via `navigator.sendBeacon('/api/leads')`.
   * Pengguna diarahkan ke aplikasi WhatsApp dengan pesan yang sudah terisi rapi siap kirim.

### 5.3 Alur 3: Penanganan Submisi Formulir Kontak Alternatif
1. **Trigger Pengguna**: Pengguna memilih mengisi formulir manual di `/contact`.
2. **Input Data**: Pengguna mengisi nama, nomor telepon/WA, preferensi tur, tanggal rencana, dan jumlah tamu.
3. **Submisi**: Event `onSubmit` memanggil endpoint backend `POST /api/leads`.
4. **Pemrosesan Server**: Endpoint `/api/leads` memvalidasi input wajib (`guestName` dan `phone`), lalu mengeksekusi `createLead()` di `lead-service.ts`.
5. **Penyimpanan Firestore**: Data prospek disimpan ke koleksi `leads` dengan status `"new"` dan timestamp ISO.
6. **Respon Klien**: Tampilan beralih ke kartu status sukses dengan opsi tombol konfirmasi lanjutan langsung ke WhatsApp Bli Gede.

### 5.4 Alur 4: Beralih Bahasa (ID / EN) Realtime
1. **Trigger Pengguna**: Pengguna mengklik tombol "ID" atau "EN" di Navbar.
2. **State & LocalStorage**: Navbar memperbarui state internal dan menulis ke `localStorage.setItem("app_lang", newLang)`.
3. **Custom Event Broadcast**: Navbar memancarkan event `new CustomEvent("appLanguageChange", { detail: { lang: newLang } })`.
4. **Reaktivitas Komponen**: Halaman Beranda (`page.tsx`) dan komponen yang mendengarkan event tersebut langsung memperbarui kamus teks tanpa reload halaman.

---

# 6. Panduan Modifikasi Pengembang (Developer Quick-Reference / Cheat Sheet)

Tabel panduan praktis bagi pengembang yang akan melakukan pemeliharaan, penambahan fitur, atau modifikasi konten:

| Kebutuhan Modifikasi | Berkas Target Utama | Petunjuk Eksekusi Singkat |
| :--- | :--- | :--- |
| **Menambah Rute Halaman Baru** | `src/app/<nama-rute>/page.tsx` | Buat folder rute baru di bawah `src/app/`. Ekspor default React Server Component dan sertakan objek `metadata: Metadata`. |
| **Menambah Paket Tur Baru (Offline/Mock)** | [src/data/mock-data.ts](file:///d:/Download/client/src/data/mock-data.ts) | Tambahkan entri objek baru ke array `mockAllTours` sesuai interface `Tour` di `src/types/index.ts`. Pastikan nilai `slug` unik. |
| **Menambah Paket Tur Baru (Database Live)** | Koleksi Firestore `tours` atau jalankan `npm run seed` | Tambahkan dokumen di koleksi `tours` dengan atribut `isActive: true`, `slug`, `price`, `coverImage`, dll., atau perbarui script seeder di [scripts/run-seed.mjs](file:///d:/Download/client/scripts/run-seed.mjs). |
| **Mengubah Nomor WhatsApp / Kontak Pemandu** | [src/data/mock-data.ts](file:///d:/Download/client/src/data/mock-data.ts) & [src/lib/lead-tracker.ts](file:///d:/Download/client/src/lib/lead-tracker.ts) | Perbarui atribut `phone` dan `whatsappNumber` pada `mockGuideProfile` di `mock-data.ts` serta variabel `targetPhone` di `lead-tracker.ts`. |
| **Mengubah Format Pesan Default WhatsApp** | [src/lib/whatsapp.ts](file:///d:/Download/client/src/lib/whatsapp.ts) | Modifikasi fungsi `formatWhatsAppMessage()`. Sesuaikan template salam, rincian biaya, atau salam penutup budaya. |
| **Mengubah Palet Warna & Tema Desain** | [src/app/globals.css](file:///d:/Download/client/src/app/globals.css) & [DESIGN_GUIDE.md](file:///d:/Download/client/DESIGN_GUIDE.md) | Ubah nilai variabel CSS `:root` (`--color-brand`, `--color-secondary`, `--color-accent`) pada baris 9–16 di `globals.css`. |
| **Menambah Pertanyaan FAQ Baru** | [src/data/mock-faq.ts](file:///d:/Download/client/src/data/mock-faq.ts) | Tambahkan objek baru ke array `mockFaqItems` dengan atribut `question`, `answer`, `category`, dan `sortOrder`. |
| **Menambah Foto Galeri Dokumentasi** | [src/data/mock-gallery.ts](file:///d:/Download/client/src/data/mock-gallery.ts) | Tambahkan item baru ke array `mockGalleryItems` dengan URL foto, judul spot, kategori, dan lokasi di Bali. |
| **Mengubah Konfigurasi Cloudinary** | [.env.local](file:///d:/Download/client/.env.local) & [src/lib/cloudinary.ts](file:///d:/Download/client/src/lib/cloudinary.ts) | Set nilai `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, dan `CLOUDINARY_API_SECRET` di `.env.local`. |
| **Menyesuaikan Aturan Akses Database** | [firestore.rules](file:///d:/Download/client/firestore.rules) | Perbarui match rules untuk koleksi target, lalu deploy menggunakan perintah `firebase deploy --only firestore:rules`. |
| **Menjalankan Server Pengembangan Lokal** | Terminal / CLI | Jalankan `npm run dev` pada terminal, kemudian buka browser di `http://localhost:3000`. |
