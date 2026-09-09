# Jelajahi Tur

Tempat melihat semua paket tur dan mempersempit pilihan dengan penyaring sehingga mudah menemukan tur yang diinginkan.

## Spesifikasi

### Tujuan
Menampilkan semua paket tur privat Gede dalam satu halaman katalog yang dapat disaring, sehingga calon tamu dapat membandingkan dan menemukan tur yang sesuai dengan cepat.

### Selesai bila
- Semua tur yang berstatus aktif tampil sebagai kartu; tiap kartu menampilkan nama tur, durasi, area, harga, dan bisa diklik menuju halaman detail tur.
- Tersedia penyaring Area dan Kategori; saat diubah, daftar kartu langsung menyesuaikan dan ada cara mudah untuk menghapus penyaring.
- Tur yang ditandai populer tampil di urutan lebih awal daripada tur biasa, dan urutan ini tetap berlaku setelah penyaring diterapkan.
- Jika tidak ada tur yang cocok dengan kombinasi penyaring, muncul pesan yang menjelaskan sekaligus ajakan untuk menghapus penyaring.

## Sub-fitur: Daftar Semua Tur

Menampilkan kartu tiap tur berisi nama, durasi, area, dan harga agar bisa dibandingkan.

### Tujuan
Menampilkan seluruh paket tur yang aktif sebagai kartu berisi informasi inti agar calon tamu mudah membandingkan pilihan.

### Selesai bila
- Setiap tur aktif tampil sebagai kartu yang memuat nama tur, durasi, area, dan harga dengan satuan jelas (per orang atau per grup).
- Kartu dapat diklik dan membawa pengunjung ke halaman detail tur yang sesuai.
- Harga ditampilkan dengan format yang konsisten di semua kartu, misalnya Rp1.250.000 per grup atau Rp850.000 per orang.

## Sub-fitur: Filter Area & Kategori

Menyaring tur berdasarkan area atau jenis kegiatan supaya cepat menemukan yang sesuai.

### Tujuan
Menyediakan penyaring berdasarkan area dan kategori agar pengunjung cepat menemukan tur yang sesuai minatnya.

### Selesai bila
- Tersedia dua kontrol penyaring, yaitu Area dan Kategori, dengan pilihan yang berasal dari data tur yang tersedia.
- Saat penyaring diubah, daftar kartu langsung diperbarui hanya menampilkan tur yang cocok; tur yang tidak cocok disembunyikan, dan ada cara mudah untuk menghapus semua penyaring.
- Penyaring tetap mudah digunakan di layar HP dan tidak menghalangi daftar tur.

## Sub-fitur: Urutan Tur Populer

Menampilkan tur yang paling diminati lebih dulu sebagai referensi pengunjung.

### Tujuan
Menampilkan tur yang paling populer lebih dulu sebagai referensi pilihan terbaik bagi pengunjung.

### Selesai bila
- Saat halaman katalog dibuka, semua tur yang ditandai populer tampil sebelum tur yang tidak populer.
- Urutan antar-tur populer mengikuti urutan yang telah diatur dalam data.
- Setelah penyaring area atau kategori diterapkan, tur populer yang lolos penyaring tetap muncul lebih dulu daripada tur biasa.

## Task

### 1. Buat halaman katalog tur dengan mock data

### 2. Terapkan filter Area dan Kategori

### 3. Urutkan tur populer di atas tur lainnya

### 4. Tambah tombol reset dan pesan tidak ada

### 5. Buat API tur aktif terurut populer
