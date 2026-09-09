# Pesan WhatsApp

Kemampuan inti untuk memulai obrolan WhatsApp dari mana saja, dengan pesan otomatis berisi tur yang diminati.

## Spesifikasi

### Tujuan
Memberi calon tamu jalur paling cepat untuk bertanya dan memesan langsung ke Gede melalui WhatsApp dengan pesan otomatis yang menyebut tur yang diminati, sehingga pemesanan terjadi tanpa perantara.

### Selesai bila
- Di semua halaman publik tersedia tombol WhatsApp hijau yang selalu terlihat dan dapat dibuka kapan pun.
- Setiap tur di halaman katalog maupun detail menyediakan jalan menuju WhatsApp dengan draf pesan berisi nama tur, tanggal, dan jumlah tamu bila tersedia.
- Pengunjung yang belum siap mengisi tanggal atau jumlah tamu tetap dapat langsung chat ke Gede tanpa hambatan.
- Tidak ada proses pembayaran online; percakapan dan kesepakatan dilakukan di WhatsApp.

## Sub-fitur: Tombol WhatsApp melayang

Tombol hijau selalu terlihat di sudut layar pada setiap halaman sehingga mudah diakses.

### Tujuan
Tombol hijau WhatsApp selalu terlihat di sudut layar pada setiap halaman publik sehingga calon tamu bisa langsung bertanya atau memesan ke Gede dari mana saja.

### Selesai bila
- Tombol hijau dengan ikon WhatsApp muncul di pojok kanan bawah pada semua halaman publik (Home, Katalog Tur, Detail Tur, About, Gallery, Reviews, Contact, dan FAQ).
- Tombol tetap terlihat saat halaman digulir, baik di layar HP maupun desktop.
- Saat diklik, WhatsApp Gede terbuka dengan pesan sapaan umum, tanpa pengunjung harus mengisi formulir apa pun.

## Sub-fitur: Pesan otomatis sesuai halaman

Saat diklik dari tur atau kartu tur, WhatsApp terbuka dengan draf berisi nama tur, tanggal, dan jumlah tamu.

### Tujuan
Saat pengunjung mengeklik CTA dari halaman atau kartu tur, WhatsApp terbuka dengan draf pesan yang menyebut nama tur yang sedang dilihat, sehingga Gede langsung tahu konteksnya.

### Selesai bila
- Klik CTA di halaman Detail Tur membuka WhatsApp dengan pesan berisi nama tur, tanggal, dan jumlah tamu apabila sudah diisi.
- Klik ikon WhatsApp di kartu tur membuka WhatsApp dengan pesan menyebut nama tur tersebut.
- Bila tanggal/jumlah tamu belum diisi, pesan tetap menyebut nama tur dan mengajak Gede berdiskusi tanggal.

## Sub-fitur: Mini-form pemesanan

Formulir kecil untuk memilih tur, tanggal, dan jumlah tamu sebelum pesan dikirim ke WhatsApp.

### Tujuan
Menyediakan formulir singkat di halaman Detail Tur untuk memilih tur, tanggal, dan jumlah tamu yang pesannya langsung diteruskan ke WhatsApp.

### Selesai bila
- Di halaman Detail Tur terdapat mini-form dengan kolom tur yang sudah terisi otomatis, input tanggal, dan input jumlah tamu.
- Tombol pada mini-form membuka WhatsApp dengan pesan yang merangkum nama tur, tanggal, dan jumlah tamu.
- Setelah diklik, calon tamu tercatat di log admin tanpa proses pembayaran.

## Sub-fitur: Akses chat dari kartu tur

Ikon WhatsApp di setiap kartu tur memungkinkan chat instan tanpa perlu masuk halaman detail.

### Tujuan
Memberi ikon WhatsApp pada setiap kartu tur di Katalog dan Home agar pengunjung bisa langsung menanyakan tur itu tanpa membuka halaman detail.

### Selesai bila
- Setiap kartu tur di halaman Katalog dan Home menampilkan ikon WhatsApp yang mudah dikenali, terpisah dari area menuju detail.
- Klik ikon tersebut membuka WhatsApp dengan pesan yang menyebut nama tur, tanpa harus mengisi formulir.
- Ikon tetap berfungsi dan terlihat jelas saat kartu dibuka di perangkat HP.

## Task

### 1. Buat helper prefilled WhatsApp untuk pemesanan tur

### 2. Pasang tombol WhatsApp melayang pada layout publik

### 3. Tambah ikon WhatsApp di kartu tur

### 4. Buat mini-form WhatsApp pada detail tur

### 5. Buat endpoint simpan log lead WhatsApp
