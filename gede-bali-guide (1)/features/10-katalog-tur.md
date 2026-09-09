# Katalog Tur

Menelusuri semua paket tur privat beserta harga jujur dan filter agar wisatawan cepat mendapat tur yang cocok.

## Spesifikasi

### Tujuan
Menjadikan katalog tur privat sebagai tempat wisatawan membandingkan semua pilihan Gede secara cepat, dengan harga jujur, lalu melanjutkan ke detail tur atau obrolan WhatsApp.

### Selesai bila
- Halaman katalog menampilkan semua tur aktif dalam bentuk kartu yang berisi nama, area, durasi, kategori, dan harga final.
- Pengunjung bisa mempersempit daftar lewat filter kategori/area dan kotak pencarian, termasuk menggabungkan keduanya.
- Harga yang tertera jelas satuannya dan disertai keterangan bahwa itu harga langsung tanpa biaya perantara.
- Setiap kartu memberi jalan menuju halaman detail tur serta tombol ajakan untuk memesan/bertanya via WhatsApp.
- Saat tidak ada tur yang cocok, muncul pesan ramah beserta cara menghapus pencarian/filter.

## Sub-fitur: Daftar semua tur

Menampilkan seluruh tur privat dalam kartu dengan harga dan durasi yang jelas.

### Tujuan
Menampilkan seluruh tur privat Gede dalam kartu yang mudah dipindai agar wisatawan cepat menemukan kandidat tur.

### Selesai bila
- Seluruh tur berstatus aktif muncul di katalog; tidak ada tur aktif yang disembunyikan tanpa alasan.
- Setiap kartu menampilkan informasi sekilas: nama tur, area, durasi, kategori, harga, dan deskripsi singkat.
- Kartu tertata rapi di layar HP maupun desktop, dan mengeklik kartu membuka halaman detail tur.

## Sub-fitur: Filter kategori & area

Menyaring daftar berdasarkan jenis tur atau wilayah Bali supaya mudah dipersempit.

### Tujuan
Menyaring daftar tur berdasarkan kategori kegiatan atau wilayah Bali agar wisatawan hanya melihat tur yang sesuai minatnya.

### Selesai bila
- Tersedia dua kontrol filter: kategori tur (misalnya budaya, alam, bulan madu) dan area/wilayah Bali (misalnya Ubud, Uluwatu, Bedugul).
- Memilih satu atau kedua filter akan memperbarui daftar secara langsung hanya dengan tur yang cocok.
- Filter yang sedang aktif terlihat jelas dan dapat dihapus/direset untuk kembali ke semua tur.

## Sub-fitur: Pencarian cepat

Memungkinkan pengunjung mencari langsung nama tur atau area dari kotak pencarian.

### Tujuan
Memberikan kotak pencarian cepat agar wisatawan bisa menemukan tur berdasarkan nama atau area tanpa harus menelusuri satu per satu.

### Selesai bila
- Kotak pencarian tersedia di halaman katalog dengan teks contoh Cari nama tur atau area….
- Saat pengunjung mengetik kata kunci, daftar tur menyaring hasil yang cocok dengan nama tur atau area.
- Pencarian bisa dipakai bersamaan dengan filter kategori/area; jika tidak ada hasil, muncul pesan Tidak ditemukan tur yang cocok dan tombol untuk membersihkan pencarian/filter.

## Sub-fitur: Harga transparan

Menampilkan harga final tanpa biaya perantara sesuai kebutuhan direct booking.

### Tujuan
Menampilkan harga tur secara transparan dan final agar wisatawan paham biaya sebenarnya dan yakin memesan langsung tanpa perantara.

### Selesai bila
- Setiap kartu tur menampilkan angka harga dengan satuan yang jelas, misalnya Rp1.500.000 per grup atau Rp750.000 per orang.
- Di dekat daftar tur terdapat keterangan singkat bahwa harga adalah harga langsung dari Gede tanpa komisi perantara.
- Harga di kartu sama dengan yang tertera di halaman detail tur, dan tombol pemesanan mengarah ke WhatsApp tanpa proses pembayaran online.

## Task

### 1. Bangun halaman katalog tur dengan data tiruan

### 2. Buat kartu tur menuju detail dan WA

### 3. Implementasikan filter kategori dan area

### 4. Gabungkan pencarian cepat dengan filter katalog

### 5. Buat pesan kosong dan tombol reset

### 6. Tampilkan keterangan harga langsung tanpa perantara

### 7. Buat skema koleksi Firestore untuk data tur

### 8. Buat API endpoint daftar tur aktif

### 9. Buat seed data tur aktif untuk pengembangan

### 10. Atur keamanan Firestore agar tur dapat dibaca publik
