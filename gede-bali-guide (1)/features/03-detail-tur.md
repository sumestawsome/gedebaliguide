# Detail Tur

Halaman lengkap satu paket tur yang memuat agenda, hal yang termasuk, lokasi, dan harga sebagai dasar memesan.

## Spesifikasi

### Tujuan
Memberikan calon tamu gambaran lengkap dan meyakinkan tentang satu paket tur—agenda, fasilitas, lokasi, harga, dan kuota—sehingga ia siap memesan langsung melalui WhatsApp.

### Selesai bila
- Setiap tur di katalog dapat dibuka ke halaman detailnya sendiri dan menampilkan informasi inti: nama, tagline, deskripsi, area, durasi, foto sampul, dan peta.
- Halaman menampilkan rencana perjalanan bertahap, daftar yang termasuk/tidak termasuk, harga beserta kuota tamu minimum dan maksimum.
- Terdapat ajakan/CTA WhatsApp yang jelas di halaman; saat diklik, muncul draf pesan berisi nama tur dan pengguna dapat mengisi tanggal serta jumlah tamu sebelum diarahkan ke chat WhatsApp.
- Informasi yang ditampilkan sesuai dengan data tur yang dikelola admin dan tidak menampilkan tur yang berstatus nonaktif.
- Judul halaman dan ringkasannya unik serta menggambarkan tur tersebut agar mudah dikenali di hasil pencarian.

## Sub-fitur: Rencana Perjalanan

Menampilkan agenda tur bertahap dari awal sampai akhir sesuai durasi paket.

### Tujuan
Menampilkan agenda tur secara bertahap dari awal sampai akhir agar calon tamu dapat membayangkan jalannya tur sesuai durasi paket.

### Selesai bila
- Halaman menampilkan daftar agenda dalam urutan kronologis (dari penjemputan hingga tur selesai) lengkap dengan waktu, judul tahap, dan keterangan singkat.
- Setiap tahap mudah dipindai dan diberi label waktu yang jelas, misalnya jam dan aktivitas.
- Jika paket tur tidak memiliki agenda, area ini tidak menampilkan bagian kosong yang membingungkan.

## Sub-fitur: Termasuk & Tidak Termasuk

Menjelaskan apa saja yang sudah tersedia dan yang perlu disiapkan tamu.

### Tujuan
Menjelaskan batas fasilitas paket secara transparan, yaitu apa saja yang sudah tersedia untuk tamu dan apa saja yang perlu disiapkan atau dibayar sendiri.

### Selesai bila
- Halaman menampilkan dua daftar terpisah dengan judul yang jelas: “Sudah Termasuk” dan “Tidak Termasuk”.
- Setiap fasilitas ditampilkan sebagai butir singkat yang mudah dibaca, dengan tanda visual yang membedakan daftar termasuk dan tidak termasuk.
- Informasi yang tampil selalu mengikuti data paket tur yang dikelola admin, termasuk saat data diubah.

## Sub-fitur: Lokasi di Peta

Menyematkan peta untuk menunjukkan area tur atau titik penjemputan.

### Tujuan
Memberikan orientasi lokasi kepada calon tamu melalui peta, sehingga mereka tahu area tur atau titik penjemputan yang ditawarkan.

### Selesai bila
- Halaman menampilkan peta/area lokasi tur atau titik penjemputan sesuai data paket, dengan label lokasi yang mudah dipahami.
- Peta tidak memperlambat tampilan utama halaman dan tetap rapi saat dibuka di ponsel.
- Jika lokasi atau tautan peta belum tersedia, halaman menampilkan keterangan area secara tekstual tanpa membuat bagian ini terlihat rusak.

## Sub-fitur: Detail Harga & Kuota

Menjelaskan harga per orang atau kelompok dan jumlah tamu minimum atau maksimum.

### Tujuan
Menjelaskan harga dan kuota secara gamblang agar calon tamu tahu besaran biaya serta jumlah orang minimum/maksimum sebelum menghubungi Gede.

### Selesai bila
- Harga ditampilkan dengan angka yang jelas, mata uang yang benar, dan keterangan dasar penentuan harga: “per orang” atau “per grup/rombongan”.
- Jumlah tamu minimum dan maksimum ditampilkan dengan label yang mudah dipahami, misalnya “Min. 2 tamu” dan “Maks. 6 tamu”.
- Informasi harga dan kuota yang tampil selalu sesuai dengan data paket tur yang dikelola admin.

## Task

### 1. Buat halaman detail tur dari data tiruan

### 2. Buat agenda perjalanan urut waktu

### 3. Buat daftar termasuk dan tidak termasuk

### 4. Sematkan peta lokasi dengan fallback area

### 5. Tampilkan harga per-satuan dan kuota tamu

### 6. Buat CTA WhatsApp dengan mini-form pemesanan

### 7. Tambahkan generateMetadata dan JSON-LD TouristTrip

### 8. Buat skema Firestore untuk paket tur

### 9. Buat query tur aktif berdasarkan slug

### 10. Sediakan seed data contoh tur Firestore
