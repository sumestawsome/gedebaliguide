# Pesan WhatsApp

Alur langsung ke chat WhatsApp dengan pesan yang sudah berisi tur pilihan, tanggal, dan jumlah tamu.

## Spesifikasi

### Tujuan
Membuat pengunjung dapat langsung menghubungi Gede melalui WhatsApp dengan pesan yang sudah terisi sesuai konteks (nama tur, tanggal, jumlah tamu), sehingga pemesanan atau pertanyaan terjadi tanpa perantara dan tanpa pembayaran online.

### Selesai bila
- Di semua halaman publik tersedia tombol WhatsApp hijau yang jelas dan selalu terlihat, terutama saat diakses dari HP.
- Setiap CTA chat yang terkait tur menghasilkan alur ke WhatsApp Gede dengan pesan otomatis berisi nama tur.
- Pada alur pemesanan tur, pengunjung dapat memilih tanggal dan jumlah tamu sebelum diarahkan ke chat WhatsApp.
- Pengunjung yang belum ingin mengisi data tetap dapat membuka chat WhatsApp langsung tanpa hambatan.
- Tidak ada payment gateway; seluruh kesepakatan dan transaksi berlanjut melalui chat WhatsApp.

## Sub-fitur: Tombol WhatsApp Mengambang

Menampilkan tombol hijau di pojok layar pada semua halaman publik agar mudah dihubungi.

### Tujuan
Memberi pengunjung akses cepat untuk menghubungi Gede lewat WhatsApp dari mana pun di website.

### Selesai bila
- Tombol bulat hijau dengan ikon WhatsApp tampil mengambang di pojok bawah layar pada semua halaman publik dan tetap terlihat saat pengguna menggulir di HP.
- Tombol dapat dikenali sebagai ajakan chat; saat diklik, WhatsApp Gede terbuka dengan sapaan umum tanpa meminta data tur, tanggal, atau jumlah tamu.
- Tombol tidak menghalangi konten utama dan tidak perlu muncul di area panel admin.

## Sub-fitur: Pesan Otomatis untuk Tur

Saat pengunjung mengklik CTA di sebuah tur, WhatsApp terbuka dengan pesan berisi nama tur.

### Tujuan
Saat pengunjung menekan CTA pada sebuah tur, WhatsApp langsung terbuka dengan pesan yang menyebutkan tur yang dipilih.

### Selesai bila
- Tombol CTA di kartu tur dan halaman detail tur mengarah ke chat WhatsApp Gede dengan pesan otomatis yang sudah berisi nama tur.
- Pesan yang terbentuk dapat dilihat dan diedit pengunjung di WhatsApp sebelum dikirim, bukan terkirim otomatis.
- Jika pengunjung berasal dari halaman detail tur, nama tur yang tercantum sama dengan tur yang sedang dilihat.

## Sub-fitur: Isi Tanggal & Jumlah Tamu

Form singkat untuk memilih tanggal dan jumlah tamu, lalu mengarahkannya ke chat Gede.

### Tujuan
Membantu pengunjung menyampaikan kebutuhan pemesanannya dengan memilih tanggal dan jumlah tamu sebelum melanjutkan ke chat WhatsApp.

### Selesai bila
- Di halaman detail tur tersedia form singkat berisi pilihan tanggal, isian jumlah tamu, dan tombol CTA ke WhatsApp.
- Setelah form diisi lalu tombol ditekan, WhatsApp Gede terbuka dengan pesan yang memuat nama tur, tanggal, dan jumlah tamu sesuai pilihan pengunjung.
- Pengunjung tidak perlu membuat akun atau membayar daring; bila tanggal atau jumlah tamu belum diisi, muncul pesan singkat yang memintanya melengkapi.

## Sub-fitur: Langsung Tanya Tanpa Isi Form

Pengunjung yang ingin bertanya dulu tetap bisa membuka chat WhatsApp tanpa mengisi data.

### Tujuan
Menghilangkan hambatan bagi pengunjung yang belum siap memesan dengan menyediakan jalur chat WhatsApp langsung tanpa formulir.

### Selesai bila
- Selain CTA pemesanan, tersedia pilihan bertanya langsung ke WhatsApp yang tidak menampilkan form tanggal maupun jumlah tamu.
- Tombol WhatsApp mengambang membuka chat dengan sapaan umum sehingga pengunjung bisa langsung mengetik pertanyaan bebas.
- Pengunjung tetap sampai ke chat Gede tanpa diwajibkan memilih tur, mengisi data, atau melalui langkah tambahan.

## Task

### 1. Siapkan halaman detail tur dengan data tiruan

### 2. Buat helper tautan WhatsApp dan pesan otomatis

### 3. Buat tombol WhatsApp mengambang pada layout publik

### 4. Buat CTA WhatsApp otomatis pada komponen tur

### 5. Buat form tanggal dan jumlah tamu WhatsApp

### 6. Buat tombol tanya langsung di detail tur
