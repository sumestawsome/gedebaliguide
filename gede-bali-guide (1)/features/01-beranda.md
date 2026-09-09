# Beranda

Halaman pembuka yang langsung menampilkan tur andalan, kepercayaan, dan ajakan mengobrol dengan Gede.

## Spesifikasi

### Tujuan
Beranda menjadi halaman pembuka yang membuat calon tamu langsung merasa diterima, percaya pada kredibilitas Gede, dan menemukan tur yang menarik untuk dipesan via WhatsApp.

### Selesai bila
- Pengunjung membuka `/` dan langsung melihat sapaan hangat, foto Bali asli, serta ajakan utama tanpa perlu menggulir jauh.
- Halaman menampilkan, secara berurutan: kepercayaan sekilas, tur/destinasi pilihan, testimoni singkat, dan ajakan WhatsApp.
- Setiap CTA di beranda mengarah ke chat WhatsApp Gede dengan pesan awal yang relevan.
- Seluruh bagian tetap rapi dan cepat diakses di perangkat mobile, serta kontennya bersumber dari data yang bisa dikelola admin.

## Sub-fitur: Sapaan & Foto Utama

Menampilkan foto Bali asli dan sapaan hangat agar wisatawan langsung merasa diterima.

### Tujuan
Menampilkan sapaan hangat dan foto utama Bali asli agar wisatawan langsung merasa diterima dan tertarik menjelajah.

### Selesai bila
- Bagian atas beranda memuat sapaan personal singkat yang menyebut nama Gede dan foto utama bernuansa Bali/tur.
- Foto tampil baik di layar HP maupun desktop, dengan teks sapaan yang tetap terbaca jelas.
- Sapaan menggambarkan bahwa tur dipandu langsung oleh pribadi Gede, bukan agen atau marketplace.

## Sub-fitur: Kepercayaan Sekilas

Memperlihatkan pengalaman, lisensi HPI, dan kendaraan AC agar langsung percaya.

### Tujuan
Menampilkan kredibilitas singkat—pengalaman, lisensi HPI Bali, dan kendaraan ber-AC—agar calon tamu percaya sejak awal.

### Selesai bila
- Tepat di bawah hero terdapat bagian kepercayaan yang memuat tiga hal: pengalaman memandu, lisensi HPI resmi, dan standar armada ber-AC.
- Informasi ini ringkas dan mudah dipindai tanpa harus membuka halaman lain.
- Tata letaknya stabil dan tidak terpotong saat dilihat di perangkat mobile.

## Sub-fitur: Tur & Destinasi Pilihan

Menyorot beberapa tur favorit dan destinasi populer agar pengunjung cepat menemukan yang cocok.

### Tujuan
Menyorot tur favorit dan destinasi populer di beranda supaya pengunjung cepat menemukan pilihan yang cocok.

### Selesai bila
- Bagian tur unggulan menampilkan beberapa tur pilihan aktif dengan nama, durasi, area, harga, dan tautan ke detail tur atau WhatsApp.
- Bagian destinasi populer menampilkan tempat-tempat menarik yang sedang disorot dan dapat diklik untuk melihat tur terkait.
- Jika admin belum memiliki data unggulan/destinasi, area ini tidak menampilkan kesalahan atau item kosong yang mengganggu.

## Sub-fitur: Testimoni Singkat

Menampilkan kesan tamu sebelumnya sebagai bukti sosial di halaman depan.

### Tujuan
Menampilkan kesan tamu sebelumnya sebagai bukti sosial agar calon tamu lebih yakin memesan tur bersama Gede.

### Selesai bila
- Beranda menampilkan 1–3 testimoni bintang lima yang sudah disetujui publik, lengkap dengan nama tamu dan asal/kesan singkat.
- Testimoni mudah dibedakan sebagai ulasan asli, misal melalui bintang dan/atau kutipan, serta tidak tercampur dengan bagian lain.
- Jika belum ada testimoni yang layak tampil, bagian ini tersembunyi atau tidak menunjukkan konten kosong yang janggal.

## Sub-fitur: Ajakan WhatsApp

Memberi tombol hijau di bagian beranda untuk langsung tanya atau pesan ke Gede.

### Tujuan
Memberi ajakan langsung mengobrol atau memesan via WhatsApp dari beranda, tanpa hambatan formulir.

### Selesai bila
- Terdapat tombol hijau WhatsApp dengan teks ajakan yang jelas, seperti Tanya via WhatsApp atau Pesan Langsung, di area yang mudah terlihat.
- Klik tombol membuka WhatsApp Gede dengan pesan awal yang relevan dan tanpa perlu mengisi data terlebih dahulu.
- Tombol tersebut tersedia di beranda dan konsisten dengan tombol WhatsApp mengambang di semua halaman publik.

## Task

### 1. Buat kerangka halaman beranda dengan data tiruan

### 2. Buat util tautan WhatsApp dengan pesan awal

### 3. Buat hero sapaan Gede dengan foto Bali

### 4. Buat bar kepercayaan pengalaman lisensi armada

### 5. Buat seksi tur unggulan dengan kartu tur

### 6. Buat seksi destinasi populer tertaut tur

### 7. Buat seksi testimoni singkat bintang lima

### 8. Buat state kosong dan sembunyikan testimoni

### 9. Buat CTA WhatsApp hijau dan tombol melayang

### 10. Sambungkan seluruh CTA ke WhatsApp prefilled

### 11. Pastikan seluruh seksi beranda mobile responsive

### 12. Rancang skema data untuk konten beranda

### 13. Sediakan API untuk konten beranda terpadu

### 14. Simpan konfigurasi nomor WhatsApp Gede
