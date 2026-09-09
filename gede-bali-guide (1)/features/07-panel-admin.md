# Panel Admin

Area khusus Gede untuk mengelola tur, galeri, ulasan, dan melihat catatan calon tamu.

## Spesifikasi

### Tujuan
Panel admin adalah area pribadi Gede untuk mengelola seluruh isi website—paket tur, galeri, ulasan, dan catatan calon tamu—sehingga pembaruan konten tidak perlu bantuan teknis.

### Selesai bila
- Halaman panel hanya dapat diakses oleh Gede setelah masuk; pengunjung biasa tidak dapat melihat atau mengubah data apa pun.
- Dari panel, Gede dapat menuju ke bagian pengelolaan tur, galeri, ulasan, dan catatan calon tamu.
- Setiap penambahan, penyuntingan, atau penghapusan di panel langsung tercermin di halaman publik sesuai aturan tampil (misalnya tur nonaktif tidak muncul dan ulasan belum disetujui tidak tampil).
- Gede mendapat umpan balik jelas saat data berhasil disimpan, gagal disimpan, atau saat aksi tidak diperbolehkan.

## Sub-fitur: Masuk Khusus Admin

Mengunci halaman panel sehingga hanya Gede yang bisa mengubah isi website.

### Tujuan
Mengunci halaman panel agar hanya Gede, pemilik website, yang bisa masuk dan mengubah isi.

### Selesai bila
- Saat panel dibuka tanpa masuk lebih dulu, Gede diarahkan ke formulir masuk dan isi panel tidak terlihat.
- Login hanya berhasil dengan akun Gede; akun lain atau kata sandi salah menampilkan pesan kesalahan yang jelas.
- Gede dapat keluar lewat tombol Keluar; setelah keluar, panel tertutup dan harus masuk kembali untuk mengaksesnya.

## Sub-fitur: Kelola Paket Tur

Menambah, menyunting, atau menghapus tur beserta harga dan agendanya.

### Tujuan
Membantu Gede menambah, menyunting, dan menghapus paket tur beserta harga dan agendanya.

### Selesai bila
- Gede dapat membuat tur baru dengan mengisi nama, tagline, deskripsi, kategori, area, durasi, harga, jumlah tamu, agenda, hal yang termasuk/tidak termasuk, foto sampul, serta status aktif/unggulan.
- Gede dapat menyunting tur yang sudah ada; setelah disimpan, halaman publik yang menampilkan tur tersebut menunjukkan data terbaru.
- Gede dapat menghapus atau menonaktifkan tur; tur nonaktif tidak muncul di katalog publik dan statusnya tampak jelas di daftar panel.

## Sub-fitur: Kelola Galeri & Ulasan

Mengunggah foto baru dan menyetujui ulasan sebelum tampil ke publik.

### Tujuan
Mengelola koleksi foto galeri dan ulasan tamu agar konten publik selalu segar, rapi, dan terpercaya.

### Selesai bila
- Gede dapat mengunggah foto baru, melengkapi judul/keterangan/lokasi, mengatur urutan, serta menyembunyikan atau menghapus foto; halaman Galeri langsung menampilkan perubahannya.
- Gede dapat melihat ulasan baru yang belum tampil, lalu menyetujui atau menolaknya; hanya ulasan yang disetujui yang muncul di halaman Reviews.
- Gede dapat menyembunyikan ulasan yang sudah tampil bila perlu dan menandai ulasan pilihan untuk ditampilkan di beranda.

## Sub-fitur: Catatan Calon Tamu

Melihat daftar orang yang mengirim pesan lewat WhatsApp agar mudah ditindaklanjuti.

### Tujuan
Memudahkan Gede memantau calon tamu yang sudah menekan tombol WhatsApp atau mini-form pemesanan agar tidak ada yang terlewat.

### Selesai bila
- Setiap calon tamu yang menekan tombol WhatsApp atau mengirim mini-form tercatat sebagai catatan baru di panel.
- Catatan menampilkan tur yang diminati, tanggal rencana, jumlah tamu, isi pesan, halaman asal pengunjung, dan waktu kejadian.
- Gede dapat menandai status tindak lanjut, misalnya baru, sudah dihubungi, atau menjadi pemesanan, dan catatan tetap tersimpan meski tur diubah atau dihapus.

## Task

### 1. Buat mock layout panel admin dan navigasi

### 2. Buat mock proteksi login dan logout admin

### 3. Buat mock notifikasi sukses dan gagal

### 4. Buat mock daftar tur dengan aksi kelola

### 5. Buat mock form tambah dan ubah tur

### 6. Buat mock galeri admin dan aksi urutan

### 7. Buat mock form unggah dan edit foto

### 8. Buat mock halaman moderasi ulasan

### 9. Buat mock halaman catatan calon tamu

### 10. Buat skema Firestore dan aturan keamanan admin

### 11. Siapkan Firebase Auth dan proteksi admin

### 12. Buat service CRUD paket tur ke Firestore

### 13. Buat service kelola galeri dan upload Cloudinary

### 14. Buat service moderasi ulasan untuk publik

### 15. Buat service catatan lead dan status follow-up

### 16. Siapkan query publik dengan filter konten tampil
