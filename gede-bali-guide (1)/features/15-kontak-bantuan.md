# Kontak & Bantuan

Halaman kontak cadangan dan daftar pertanyaan umum yang membantu pengunjung sebelum memesan.

## Spesifikasi

### Tujuan
Memberi pengunjung yang belum siap atau tidak ingin bertanya lewat WhatsApp sebuah kanal kontak bantuan yang jelas, sekaligus menjawab keraguan umum sebelum mereka memesan tur.
### Selesai bila
- Halaman Kontak dan halaman FAQ terbuka dari navigasi utama dan nyaman dipakai di HP maupun desktop.
- Pengunjung punya dua opsi bantuan: mengirim formulir pesan atau menghubungi langsung lewat WhatsApp/email/media sosial.
- Pertanyaan umum seperti harga, durasi, area penjemputan, kapasitas, dan cara pemesanan bisa ditemukan jawabannya dengan mudah.
- Tidak ada pembayaran di alur ini; semua kontak tetap mengarah ke percakapan pribadi dengan Gede.

## Sub-fitur: Formulir pesan cadangan

Formulir kontak sederhana untuk pertanyaan yang tidak ingin lewat WhatsApp.

### Tujuan
Menyediakan formulir cadangan bagi pengunjung yang ingin bertanya tanpa membuka WhatsApp.
### Selesai bila
- Form menampilkan kolom Nama, Email, Nomor WhatsApp (opsional), dan Pesan, dengan kolom yang wajib diisi ditandai jelas.
- Setelah menekan tombol Kirim, pengunjung melihat pesan sukses "Pesan terkirim" dan form kembali kosong.
- Pengunjung yang butuh jawaban cepat tetap diarahkan ke WhatsApp, karena formulir ini bukan untuk keadaan mendesak.

## Sub-fitur: Akordeon FAQ

Pertanyaan yang sering muncul disusun dengan jawaban yang mudah dibuka.

### Tujuan
Menjawab cepat pertanyaan yang sering membuat calon tamu ragu, sehingga mereka terbantu sebelum memutuskan memesan.
### Selesai bila
- Halaman FAQ menampilkan pertanyaan umum dalam bentuk daftar; tiap pertanyaan bisa diketuk dan jawabannya terbuka di tempatnya.
- Jawaban mencakup setidaknya topik harga, durasi tur, area penjemputan, kapasitas tamu, dan cara pemesanan via WhatsApp.
- Akordeon nyaman digunakan di HP: area ketuk cukup besar dan ada indikator yang memperjelas pertanyaan sedang terbuka atau tertutup.

## Sub-fitur: Info kontak langsung

Menampilkan nomor WhatsApp, email, dan media sosial Gede.

### Tujuan
Menampilkan kanal kontak langsung Gede — WhatsApp, email, dan media sosial — supaya pengunjung dapat menghubunginya dengan satu ketukan.
### Selesai bila
- Di halaman Kontak terlihat blok info kontak berisi nomor WhatsApp, alamat email, dan tautan media sosial yang tersedia.
- Mengetuk WhatsApp langsung membuka chat, email membuka aplikasi email, dan media sosial membuka profilnya di tab baru.
- Setiap kontak diberi label dan ikon yang mudah dikenali, serta mudah diketuk dari perangkat HP.

## Task

### 1. Buat rute /contact dengan blok info kontak langsung

### 2. Buat formulir kontak fallback dengan validasi dan status sukses

### 3. Buat rute /faq dengan akordeon pertanyaan umum

### 4. Tambahkan tautan Kontak dan FAQ ke navigasi utama

### 5. Tambahkan metadata dinamis dan FAQPage JSON-LD

### 6. Buat aturan Firestore untuk koleksi contact_messages

### 7. Buat endpoint POST /api/contact dengan validasi dan penyimpanan
