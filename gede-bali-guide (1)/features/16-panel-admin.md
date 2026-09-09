# Panel Admin

Area khusus pemilik untuk mengelola konten tur, galeri, ulasan, serta melihat lead yang masuk.

## Spesifikasi

### Tujuan
Area khusus yang hanya bisa diakses Gede untuk mengelola konten tur, galeri foto, ulasan tamu, dan melihat catatan calon tamu yang menekan WhatsApp atau mengirim mini-form, sehingga seluruh konten website dapat diperbarui tanpa bantuan teknis.

### Selesai bila
- Ada halaman panel admin yang hanya bisa dibuka setelah login; pengguna lain tidak bisa mengakses isinya.
- Gede bisa menambah, mengubah, dan menonaktifkan paket tur; perubahan itu terlihat di katalog dan halaman detail tur publik.
- Gede bisa mengunggah dan menghapus foto galeri; foto yang aktif tampil di halaman galeri publik.
- Ulasan baru tidak tampil di situs publik sebelum disetujui Gede; Gede bisa menyetujui atau menolaknya.
- Setiap klik tombol WhatsApp atau pengiriman mini-form tercatat sebagai lead dan bisa dilihat/diubah statusnya di panel.

## Sub-fitur: Login admin

Gerbang aman agar hanya Gede yang bisa masuk ke panel pengelolaan.

### Tujuan
Gerbang aman berupa halaman masuk khusus agar hanya Gede yang dapat membuka dan menggunakan panel pengelolaan.

### Selesai bila
- Ada halaman masuk khusus; hanya alamat email Gede yang terdaftar sebagai admin yang bisa masuk, sedangkan pengguna lain ditolak.
- Saat belum login dan mencoba membuka panel, pengunjung otomatis diarahkan ke halaman masuk.
- Setelah login berhasil, Gede masuk ke panel; tersedia tombol keluar untuk mengakhiri sesi.

## Sub-fitur: Kelola paket tur

Menambah, mengubah, dan menonaktifkan tur di katalog.

### Tujuan
Memungkinkan Gede menambah, mengubah, dan menonaktifkan paket tur yang tampil di katalog dan halaman detail tur.

### Selesai bila
- Panel menampilkan daftar semua tur, termasuk tur aktif dan nonaktif, dengan status yang jelas serta tombol untuk menambah tur baru.
- Formulir tambah/edit dapat mengisi informasi utama tur seperti nama, kategori, area, durasi, harga, deskripsi, itinerary, fasilitas, dan status tampil/nonaktif.
- Setelah disimpan, katalog publik dan halaman detail tur menampilkan data terbaru; tur yang dinonaktifkan tidak muncul di situs publik tetapi tetap tersimpan di panel.

## Sub-fitur: Kelola galeri

Mengunggah dan menghapus foto dokumentasi untuk galeri publik.

### Tujuan
Memungkinkan Gede mengunggah dan menghapus foto dokumentasi agar galeri publik selalu menampilkan gambar yang sesuai.

### Selesai bila
- Panel galeri menampilkan foto-foto yang sudah tersimpan beserta statusnya dan tombol untuk mengunggah foto baru.
- Saat menambahkan atau mengedit foto, Gede bisa mengisi judul/keterangan/lokasi lalu menyimpannya; foto yang aktif langsung tampil di galeri publik.
- Foto yang dihapus atau dinonaktifkan tidak lagi muncul di halaman galeri publik.

## Sub-fitur: Moderasi ulasan

Menyetujui atau menolak ulasan sebelum tampil ke publik.

### Tujuan
Menjadi gerbang penyaringan agar hanya ulasan yang disetujui Gede yang tampil di halaman Reviews dan bagian testimoni.

### Selesai bila
- Panel menampilkan daftar ulasan baru dengan status “perlu disetujui”, beserta isi, nama tamu, asal, dan rating.
- Gede dapat menyetujui ulasan agar tampil publik atau menolaknya; ulasan yang ditolak tidak pernah muncul di situs.
- Ulasan yang sudah disetujui dapat diubah statusnya menjadi tidak tampil bila diperlukan.

## Sub-fitur: Lihat log lead

Mencatat dan menampilkan klik WhatsApp atau pengiriman mini-form dari pengunjung.

### Tujuan
Mencatat dan menampilkan jejak minat calon tamu dari klik WhatsApp atau pengiriman mini-form, agar Gede bisa menindaklanjuti dengan mudah.

### Selesai bila
- Setiap interaksi tombol WhatsApp atau pengiriman mini-form tercatat otomatis dengan data tur, tanggal, jumlah tamu, dan halaman asal.
- Panel menampilkan daftar lead dengan status “baru” dan pilihan untuk menandai sudah dihubungi atau sudah menjadi pelanggan.
- Gede dapat melihat detail isi pesan/draf WhatsApp dan data pendukung lain dari setiap lead.

## Task

### 1. Bangun kerangka panel admin dengan mock auth

### 2. Buat halaman login admin dengan data tiruan

### 3. Buat daftar tur admin dengan data tiruan

### 4. Buat form tambah/edit tur dengan data tiruan

### 5. Buat halaman galeri admin dengan data tiruan

### 6. Buat halaman moderasi ulasan dengan data tiruan

### 7. Buat halaman log lead dan status tiruan

### 8. Terapkan autentikasi admin dengan allowlist email

### 9. Proteksi route admin dan sediakan logout

### 10. Buat CRUD tur dan revalidasi katalog

### 11. Siapkan unggah/hapus foto Cloudinary

### 12. Buat API galeri dan revalidasi publik

### 13. Buat API moderasi ulasan dan revalidasi publik

### 14. Buat endpoint catat lead WhatsApp/mini-form

### 15. Buat API daftar detail dan status lead
