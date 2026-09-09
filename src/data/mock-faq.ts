export interface FaqItem {
  id: string;
  category: "booking" | "vehicle" | "routes" | "culture";
  question: string;
  answer: string;
}

export const mockFaqItems: FaqItem[] = [
  {
    id: "faq-1",
    category: "booking",
    question: "Bagaimana cara memesan paket tur privat bersama Bli Gede?",
    answer:
      "Pemesanan dilakukan langsung via WhatsApp tanpa perlu mendaftar di marketplace pihak ketiga. Cukup klik tombol 'Chat WhatsApp', sebutkan perkiraan tanggal liburan, jumlah anggota rombongan, dan tempat yang ingin dikunjungi. Bli Gede akan segera mengonfirmasi ketersediaan jadwal dan menyusun rute terbaik.",
  },
  {
    id: "faq-2",
    category: "booking",
    question: "Apakah saya harus membayar uang muka (DP) terlebih dahulu?",
    answer:
      "Tidak wajib untuk sebagian besar tur darat privat di Bali. Anda bisa melakukan pembayaran penuh secara tunai (Cash) atau transfer saat bertemu langsung dengan Bli Gede di hari penjemputan. Kami mengutamakan rasa saling percaya dan kemudahan bagi tamu.",
  },
  {
    id: "faq-3",
    category: "routes",
    question: "Apakah rute tur dan jadwal bisa diubah sesuai keinginan kami?",
    answer:
      "Tentu saja! Keunggulan utama tur privat bersama Bli Gede adalah fleksibilitas 100%. Anda tidak terikat jadwal kaku seperti tur rombongan bus. Ingin berlama-lama memotret di sawah Tegalalang, berhenti santai minum kopi kelapa, atau melewati objek wisata tertentu? Semua bisa disesuaikan di jalan.",
  },
  {
    id: "faq-4",
    category: "vehicle",
    question: "Apakah armada mobil digabung dengan wisatawan lain?",
    answer:
      "Sama sekali tidak digabung. Setiap pemesanan adalah 100% Tur Privat murni. Seluruh kabin mobil ber-AC dingin hanya diisi oleh rombongan keluarga atau pasangan Anda sendiri demi privasi, ketenangan, dan kenyamanan optimal.",
  },
  {
    id: "faq-5",
    category: "culture",
    question: "Apakah ada kewajiban belanja di toko suvenir / oleh-oleh rekanan?",
    answer:
      "Sama sekali TIDAK ADA. Bli Gede memegang teguh komitmen integritas bebas toko komisi (No Forced Shopping). Kami tidak akan mengarahkan Anda ke galeri perak atau toko kopi rekanan hanya untuk mengejar komisi calo. Seluruh waktu tur adalah untuk kesenangan destinasi Anda.",
  },
  {
    id: "faq-6",
    category: "booking",
    question: "Fasilitas apa saja yang sudah termasuk dalam harga tur harian?",
    answer:
      "Harga paket sudah mencakup: unit mobil ber-AC dingin dan bersih, bahan bakar minyak (BBM), jasa pemandu berlisensi resmi (Bli Gede), biaya parkir di semua lokasi, serta air mineral botol dingin gratis setiap hari tur.",
  },
  {
    id: "faq-7",
    category: "vehicle",
    question: "Bagaimana standar kebersihan armada mobil yang digunakan?",
    answer:
      "Armada kami (Toyota Avanza Veloz / Innova Reborn) selalu dibersihkan dan dicuci setiap hari sebelum menjemput tamu. Dilengkapi AC double blower yang dingin, kabin wangi segar bebas asap rokok (100% non-smoking), serta soket charger smartphone multi-port.",
  },
  {
    id: "faq-8",
    category: "culture",
    question: "Apakah Bli Gede memiliki lisensi resmi pramuwisata di Bali?",
    answer:
      "Ya, Gede Sudiartana mengantongi lisensi resmi Himpunan Pramuwisata Indonesia (HPI) DPD Bali dengan No. Registrasi HPI-BALI-2015-8849 yang terdaftar aktif di Dinas Pariwisata Provinsi Bali, serta berhak memandu di seluruh pura sakral utama Pulau Dewata.",
  },
  {
    id: "faq-9",
    category: "routes",
    question: "Bagaimana jika cuaca hujan atau mendung di hari tur?",
    answer:
      "Bli Gede memantau radar cuaca harian Bali. Jika salah satu destinasi pegunungan diguyur hujan lebat, Bli Gede akan menawarkan alternatif rute terbaik (misal: museum seni indoor, galeri perak tradisional, pertunjukan tari budaya, atau kafe estetik beratap) agar Anda tetap nyaman bertamasya.",
  },
];
