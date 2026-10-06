# Design Guide & UI Kit: Luxury Travel Editorial (Gede Bali Guide)

Dokumen pedoman desain sistem resmi (*Design System & UI Kit*) untuk seluruh pengembangan antarmuka portofolio web **Gede Bali Guide** (halaman beranda, katalog tur, detail tur, tentang kami, galeri, dan kontak).

---

## 1. Filosofi & Karakter Desain (*Design Philosophy*)

* **Tema**: **Luxury Travel Editorial** khas Bali yang hangat, otentik, profesional, dan lapang.
* **Prinsip Utama**:
  1. **Editorial & Bersih**: Mengutamakan perpaduan tipografi serif klasik untuk pesan personal dan sans-serif modern untuk keterbacaan data tur.
  2. **Frameless Visuals**: Menggunakan elemen foto beresolusi tinggi dengan potongan melengkung (*soft arched-top*) terinspirasi dari arsitektur vila tropis Bali, menghindari bingkai kotak putih yang kaku.
  3. **Direct-to-WhatsApp Flow**: Mengarahkan seluruh titik konversi ke tombol interaktif WhatsApp bernuansa *Sunset Amber* yang menonjol dan ramah sentuhan.

---

## 2. Palet Warna Resmi (*Color Tokens*)

Sistem warna dibangun di atas hierarki 3 warna dengan **Biru Samudra (#1878B8)** sebagai warna dominan (60%) dan **Pola Ritme 3 Warna** untuk grid/list:

### A. Primary Dominant (60%) — Ocean Blue (`#1878B8`)
- **Peran**: Menegaskan profesionalitas pemandu berlisensi resmi HPI, rasa percaya tinggi, dan ketenangan lautan Bali.
- **Penerapan**: Ikon navbar brand & sub-spesialis, badge sapaan hero, tombol utama hero, teks penegas headline, dan latar banner CTA bawah.

### B. Color Rhythm Pattern (Pola Ritme Visual Bertingkat)
Pada komponen multi-kartu (Trust Bar, 3 Pilar Layanan, 4 Wilayah Inspirasi, dan 3 Katalog Tur Favorit), terapkan ritme sekuensial:
1. **Entitas 1 (Tema Biru)**: `#1878B8` (aksen `bg-blue-50 text-[#1878B8] border-blue-200`)
2. **Entitas 2 (Tema Hijau)**: `#0C8C5E` (aksen `bg-emerald-50 text-[#0C8C5E] border-emerald-200`)
3. **Entitas 3 (Tema Oranye)**: `#E67E22` (aksen `bg-amber-50 text-[#E67E22] border-amber-200`)

| Token / Variabel | Kode HEX | Peran & Makna | Penerapan Elemen |
| :--- | :--- | :--- | :--- |
| `--color-ocean-blue` | `#1878B8` | **Primary Dominant (60%)**: Lautan Bali, profesionalitas & trust. | Ikon brand, badge sapaan hero, tombol hero, headline, banner CTA. |
| `--color-ocean-blue-dark`| `#0F4C81` | Biru samudra dalam untuk interaksi kontras. | Efek hover tombol hero, gradien banner CTA bawah. |
| `--color-ocean-blue-surface`| `#EAF5FC` | Biru pesisir lembut (*bg-blue-50*). | Background badge hero, entitas ritme 1, container ikon biru. |
| `--color-bali-green` | `#0C8C5E` | **Warna Alam & Trust**: Alam tropis, terasering sawah, lisensi HPI. | Entitas ritme 2, tombol tur ubud, ikon WhatsApp navbar. |
| `--color-bali-green-dark` | `#09734C` | Nuansa hijau hutan rimba Bali. | Efek hover tombol hijau paket Ubud. |
| `--color-bali-green-surface`| `#E8F7F1` | Hijau embun pagi lembut (*bg-emerald-50*). | Background pilar lisensi, badge kategori alam/budaya. |
| `--color-sunset-amber` | `#E67E22` | **Warna Aksen / Focal Point**: Sunset senja Bali & keramahan. | Entitas ritme 3, tombol banner CTA, harga tur, rating ★ 5.0. |
| `--color-sunset-amber-dark`| `#D35400` | Oranye gelap terbakar matahari senja. | Efek hover tombol oranye paket Bedugul & banner CTA. |
| `--color-sunset-amber-surface`| `#FFF5EB`| Latar oranye jingga lembut (*bg-amber-50*). | Background pilar armada, chip highlight sunset. |
| `--color-bg-canvas` | `#FEFDFB` | Latar utama kanvas (*warm cream*). | Latar belakang seluruh halaman (*anti-glare*). |
| `--color-bg-card` | `#FFFFFF` | Latar kartu komponen (*pure white*). | Kartu paket tur, kartu pilar, kartu ulasan. |
| `--color-border-subtle` | `#EBE9E6` | Garis pembatas hairline tipis. | Pemisah seksi, batas kartu paket, garis navigasi. |
| `--color-border-medium` | `#D3D8D6` | Garis pembatas tombol sekunder terdefinisi. | Border tombol sekunder hero & katalog. |
| `--color-text-strong` | `#08090A` | Teks judul utama & display (*near-black*). | Heading display, harga paket, nama pemandu. |
| `--color-text-main` | `#121715` | Teks isi (*body copy*). | Paragraf ulasan, deskripsi paket, rute tur. |
| `--color-text-muted` | `#5E6965` | Teks pendukung (*secondary label*). | Subtitle paket, durasi, keterangan pilar. |

---

## 3. Tipografi (*Typography Scale*)

Kombinasi font dirancang untuk menyajikan nuansa majalah perjalanan mewah (*travel editorial*):

* **Display & Editorial Headings**: `"Libre Baskerville", ui-serif, Georgia, serif`
* **Body & User Interface**: `"Inter", ui-sans-serif, system-ui, sans-serif`
* **Technical & Data**: `"Geist Mono", ui-monospace, monospace`

| Role | Ukuran (Desktop) | Ukuran (Mobile) | Line-Height | Tracking | Penerapan |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Title** | 50px | 34px | 1.1 — 1.15 | `-0.035em` | Judul utama editorial di atas lipatan layar (*above-the-fold*). |
| **Section Title** | 34px | 28px | 1.2 | `-0.02em` | Judul seksi utama (Katalog, Pilar, Wilayah, Ulasan). |
| **Card Title** | 20px | 18px | 1.3 | `-0.01em` | Nama paket tur, nama pilar layanan. |
| **Price Display** | 26px | 24px | 1.1 | `-0.02em` | Angka nominal harga paket tur (`#D35400`). |
| **Body Large** | 17px | 15px | 1.6 | normal | Deskripsi ringkas hero, kutipan ulasan wisatawan. |
| **Body Regular** | 14px | 13px | 1.5 | normal | Detail itinerary rute, teks pilar keunggulan, footer. |
| **Caption / Label**| 12px — 11px | 11px | 1.4 | `+0.04em` | Kicker judul kapital, tanggal, nomor lisensi HPI. |

---

## 4. Spacing, Radius, dan Elevasi (*Elevation*)

### Radius Sudut
* `--radius-sm`: `4px` (tag teknis)
* `--radius-md`: `8px` (tombol, input, container ikon)
* `--radius-lg`: `14px` (kartu paket tur, kartu testimoni)
* `--radius-xl`: `24px` (banner CTA bawah)
* `--radius-arch`: `36px 36px 18px 18px` (*soft arched-top* untuk foto slideshow destinasi tropis)
* `--radius-pill`: `9999px` (badge kategori, floating glass tag, dash indicators)

### Bayangan & Elevasi (*Shadows*)
* `--shadow-soft`: `0 4px 20px rgba(12, 140, 94, 0.06)` (elevasi kartu pasif)
* `--shadow-elevated`: `0 12px 36px rgba(0, 0, 0, 0.08)` (kartu saat di-hover)
* `--shadow-photo`: `0 20px 48px -12px rgba(12, 140, 94, 0.22)` (bayangan mewah foto hero arched)

---

## 5. Komponen UI Kit & Resep Kode (*Component Library*)

### 5.1 Tombol (*Buttons*)
Seluruh tombol aksi utama dan sekunder wajib menggunakan standar ukuran seragam:
- **Kelas Dimensi Standar**: `h-11 px-5 py-2.5 text-sm font-medium rounded-xl` (tinggi konsisten 44px untuk aksesibilitas sentuhan mobile dan estetika editorial rapi tanpa tombol jumbo).

```html
<!-- 1. Tombol Utama Hero / Ocean Blue Dominant (Biru Samudra) -->
<a href="https://wa.me/..." class="inline-flex items-center justify-center gap-2 h-11 px-5 py-2.5 rounded-xl bg-[#1878B8] hover:bg-[#0F4C81] text-white text-sm font-medium transition-all duration-200">
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8..."></path></svg>
  <span>Konsultasi via WhatsApp</span>
</a>

<!-- 2. Tombol Sekunder Bersih (White Surface with Border Medium) -->
<a href="#katalog" class="inline-flex items-center justify-center gap-2 h-11 px-5 py-2.5 rounded-xl bg-white hover:bg-[#FAF8F5] text-[#121715] border border-[#D3D8D6] text-sm font-medium transition-all duration-200">
  <span>Lihat Katalog Tur →</span>
</a>

<!-- 3. Tombol Aksen Focal Point (Sunset Amber pada Banner Bawah & Paket Bedugul) -->
<a href="https://wa.me/..." class="inline-flex items-center justify-center gap-2 h-11 px-5 py-2.5 rounded-xl bg-[#E67E22] hover:bg-[#D35400] text-white text-sm font-medium transition-all duration-200">
  <span>Pesan via WhatsApp</span>
</a>
```

### 5.2 Badges & Chips
```html
<!-- Kategori Budaya / Alam -->
<span class="c-badge c-badge--green">Favorit Budaya</span>

<!-- Kategori Legalitas / Lisensi Resmi -->
<span class="c-badge c-badge--blue">HPI-BALI-2015-8849</span>

<!-- Kategori Sunset / Promo Sorotan -->
<span class="c-badge c-badge--amber">Sunset Terbaik</span>
```

### 5.3 Floating Glassmorphism Tag (Pada Foto Destinasi)
```html
<div class="p-home__slide-tag">
  <span class="p-home__slide-tag-dot"></span>
  <span>📍 Ulun Danu Beratan, Bedugul</span>
</div>
```
*CSS:*
```css
background: rgba(8, 9, 10, 0.62);
backdrop-filter: blur(12px);
-webkit-backdrop-filter: blur(12px);
color: #ffffff;
padding: 8px 16px;
border-radius: var(--radius-pill);
border: 1px solid rgba(255, 255, 255, 0.18);
```

### 5.4 Kartu Paket Tur (*Tour Package Card*)
* **Header**: Judul rute, badge kategori di kanan atas, dan harga tertera besar bernuansa Amber (`Rp 650.000 / mobil`).
* **Body**: Durasi tur berikon jam, daftar rute dengan ikon checklist hijau (`--color-bali-green`).
* **Footer**: Latar abu-abu hangat (`--color-bg-muted`) dengan tombol WhatsApp selebar 100% kartu.

---

## 6. Panduan Tata Letak Responsif (*Responsive Grid Strategy*)

| Breakpoint | Target Layar | Perilaku Layout |
| :--- | :--- | :--- |
| **Desktop** (`> 1024px`) | Laptop, Monitor Besar | - **Hero**: Grid 2 kolom seimbang (teks kiri 1.15fr, foto slideshow kanan 0.85fr).<br>- **Trust Bar**: 4 kolom horizontal sejajar.<br>- **Paket & Ulasan**: Grid 3 kolom seimbang.<br>- **Wilayah**: Grid 4 kolom. |
| **Tablet** (`768px - 1024px`) | iPad, Tablet Portrait | - **Hero**: Kolom bertumpuk elegan dengan foto proporsional di tengah.<br>- **Trust Bar**: Grid 2x2 rapi.<br>- **Paket & Ulasan**: Grid 1 atau 2 kolom dengan jarak sentuh memadai. |
| **Mobile** (`< 768px`) | Smartphone | - **Navbar**: Menu tautan panjang disembunyikan; brand dan tombol WhatsApp tetap menonjol.<br>- **Hero**: Ukuran judul mengecil ke `34px`, tombol WhatsApp melebar penuh (100% width) untuk konversi instan.<br>- **Slideshow**: Mendukung *swipe gesture* (geser sentuh jari ke kiri/kanan) dan auto-slide 4,5 detik.<br>- **Trust Bar**: Tersusun 1 kolom vertikal yang ringkas tanpa memadati layar. |

---

## 7. Standar Aksesibilitas & Interaksi

1. **Kontras Teks**: Seluruh teks putih di atas tombol hijau dan amber telah memenuhi rasio kontras WCAG AA (min. 4.5:1).
2. **Reduced Motion**: Pada perangkat dengan setting `prefers-reduced-motion`, animasi transisi dan efek perpindahan slide diubah ke mode instan.
3. **Touch-friendly**: Seluruh elemen klik (tombol CTA, indikator dash slideshow) memiliki padding dan margin yang ramah jari agar mencegah kesalahan klik (*fat-finger errors*).
