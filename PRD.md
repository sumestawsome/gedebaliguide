# Product Requirements Document (PRD): Gede Bali Guide

Dokumen spesifikasi produk dan panduan desain resmi untuk website portofolio tur privat **Gede Bali Guide** (Gede Sudiartana - Licensed Bali Tour Guide & Private Chauffeur).

---

## 1. Brand, Identitas & Kredibilitas
- **Nama Brand**: Gede Bali Guide
- **Nama Pemandu**: Gede Sudiartana
- **Peran**: Licensed Bali Tour Guide & Private Chauffeur
- **Lisensi Resmi**: HPI Bali No. `HPI-BALI-2015-8849` (Himpunan Pramuwisata Indonesia DPD Bali)
- **Pengalaman**: 10+ Tahun memandu wisatawan keluarga, pasangan, dan solo traveler dari berbagai negara sejak 2015.
- **Komitmen Layanan**:
  * 100% Tur Privat (khusus rombongan Anda, tanpa digabung orang asing)
  * Rute santai & fleksibel tanpa terburu-buru
  * Transparansi biaya murni tanpa komisi perantara / calo
  * Tanpa paksaan mampir ke toko komisi oleh-oleh/suvenir

---

## 2. Navigasi & Struktur Halaman
- **Beranda (Home)**: `/`
- **Katalog Tur (Tour Catalog)**: `/tours`
- **Detail Tur (Tour Detail)**: `/tours/[slug]`
- **Tentang Gede (About Gede & HPI License)**: `/about`
- **Galeri Wisata (Moments Gallery)**: `/gallery`
- **Ulasan (Guest Reviews - 5.0 Rating)**: `/reviews`
- **FAQ (Pertanyaan Umum)**: `/faq`
- **Kontak & Konsultasi Rute**: `/contact`
- **Konversi Utama**: Tombol WhatsApp Konsultasi Cepat (`+62 812-3456-7890`)

---

## 3. Design System & Color Palette

### A. Primary Dominant (60%) — Ocean Blue (`#1878B8`)
Biru Samudra melambangkan lautan Bali, keprofesionalan pemandu berlisensi resmi, otoritas, dan rasa percaya yang tinggi.
- **Penerapan Elemen**:
  * Navbar brand logo icon & teks sub-spesialis *"PRIVATE TOUR SPECIALIST"*.
  * Badge sapaan hero pembuka (*"Pemandu Lokal Resmi HPI"*).
  * Tombol utama hero (*"Konsultasi via WhatsApp"*).
  * Teks penegas headline dan display tags seksi.
  * Latar belakang banner CTA bawah (*Bottom Banner*).

### B. Color Rhythm Pattern (Pola Ritme 3 Warna untuk Grid / List Bertingkat)
Untuk menghindari kejenuhan visual dan menciptakan ritme visual editorial yang dinamis, seluruh grid/list bertingkat menerapkan pola urutan:
1. **Entitas 1 (Tema Biru)**: `#1878B8` (latar aksen `bg-blue-50`, border `border-blue-200`, text `#1878B8`).
2. **Entitas 2 (Tema Hijau)**: `#0C8C5E` (latar aksen `bg-emerald-50`, border `border-emerald-200`, text `#0C8C5E`).
3. **Entitas 3 (Tema Oranye)**: `#E67E22` (latar aksen `bg-amber-50`, border `border-amber-200`, text `#E67E22`).

**Contoh Penerapan Ritme**:
- **Trust Bar (4 Item)**:
  - Item 1: Aksen Biru (`#1878B8` / `bg-blue-50`)
  - Item 2: Aksen Hijau (`#0C8C5E` / `bg-emerald-50`)
  - Item 3: Aksen Oranye (`#E67E22` / `bg-amber-50`)
  - Item 4: Aksen Oranye Emas (`#E67E22` / `bg-amber-50`)
- **3 Pilar Layanan**:
  - Pilar 1 (10+ Tahun Pengalaman): Ikon & badge Biru (`#1878B8`)
  - Pilar 2 (Lisensi Resmi HPI Bali): Ikon & badge Hijau (`#0C8C5E`)
  - Pilar 3 (Armada Mobil Ber-AC): Ikon & badge Oranye (`#E67E22`)
- **4 Inspirasi Destinasi**:
  - Kartu 1 (Ubud & Gianyar): Tag Biru (`#1878B8`)
  - Kartu 2 (Uluwatu & Jimbaran): Tag Hijau (`#0C8C5E`)
  - Kartu 3 (Bedugul & Jatiluwih): Tag Oranye (`#E67E22`)
  - Kartu 4 (Kintamani & Batur): Tag Biru (`#1878B8`)
- **3 Kartu Tur Favorit**:
  - Kartu 1 (Uluwatu): Badge & CTA Biru (`#1878B8` hover `#0F4C81`)
  - Kartu 2 (Ubud): Badge & CTA Hijau Bali (`#0C8C5E` hover `#09734C`)
  - Kartu 3 (Bedugul): Badge & CTA Sunset Amber (`#E67E22` hover `#D35400`)

---

## 4. Standar Ukuran Tombol (Button Sizing Standard)
Seluruh tombol aksi utama (*Primary Action*) dan sekunder (*Secondary Action*) wajib menggunakan ukuran proporsional yang seragam:
- **Kelas Dimensi**: `h-11 px-5 py-2.5 text-sm font-medium rounded-xl`
- **Mobile Touch Target**: Minimal 44px tinggi untuk kenyamanan sentuhan jari di layar mobile.
- **Batasan**: Hilangkan tombol berukuran terlalu tinggi/jumbo (`py-4`, `text-lg` berlebihan) agar tampilan website tetap berkelas (*editorial luxury*), ringkas, dan selaras di seluruh halaman.
