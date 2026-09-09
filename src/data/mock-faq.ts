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
      "Pemesanan dilakukan langsung via WhatsApp tanpa perantara marketplace pihak ketiga. Cukup klik tombol 'Chat WhatsApp' di website ini (pesan sudah terisi otomatis dengan nama rute pilihan, tanggal, dan jumlah rombongan Anda). Bli Gede akan segera merespons konfirmasi ketersediaan jadwal dalam kurun waktu kurang dari 2 jam.",
  },
  {
    id: "faq-2",
    category: "booking",
    question: "Apakah saya harus membayar uang muka (DP) terlebih dahulu?",
    answer:
      "Tidak wajib untuk sebagian besar paket tur darat privat di Bali. Anda bisa melakukan pembayaran penuh secara tunai (Cash) atau transfer saat bertemu langsung dengan Bli Gede di hari penjemputan. Kami mengutamakan rasa saling percaya dan kemudahan bagi para tamu.",
  },
  {
    id: "faq-3",
    category: "booking",
    question: "Metode pembayaran apa saja yang dapat diterima?",
    answer:
      "Kami menerima pembayaran Tunai Rupiah (IDR), scan QRIS (GoPay, OVO, Dana, BCA, Livin Mandiri), serta transfer bank lokal (BCA / Mandiri). Untuk wisatawan mancanegara, pembayaran tunai dalam mata uang asing (USD, AUD, EUR, SGD) juga dapat diterima berdasarkan kurs resmi yang berlaku di hari tur.",
  },
  {
    id: "faq-4",
    category: "booking",
    question: "Bagaimana jika saya perlu membatalkan (cancel) atau mengubah jadwal (reschedule)?",
    answer:
      "Sangat fleksibel dan tanpa denda! Jika ada perubahan tiket pesawat, urusan mendadak, atau kondisi kesehatan yang kurang baik, Anda cukup mengabari Bli Gede lewat WhatsApp minimal 12 hingga 24 jam sebelum waktu penjemputan. Kami akan mengatur ulang tanggal sesuai jadwal yang tersedia tanpa hangusnya biaya apa pun.",
  },
  {
    id: "faq-5",
    category: "booking",
    question: "Apakah Bli Gede menerima pemesanan mendadak (last-minute booking)?",
    answer:
      "Ya, kami menerima pemesanan H-1 bahkan di hari yang sama (same-day), asalkan jadwal Bli Gede dan armada mobil sedang tidak bertugas melayani tamu lain. Segera hubungi via WhatsApp untuk mengecek ketersediaan hari ini.",
  },
  {
    id: "faq-6",
    category: "booking",
    question: "Apakah bisa langsung dijemput di Bandara Ngurah Rai (DPS) lalu langsung mulai tur?",
    answer:
      "Bisa sekali! Bli Gede sering melayani tamu yang mendarat pagi hari di Bandara Internasional I Gusti Ngurah Rai (DPS). Bli Gede akan menunggu di area kedatangan dengan papan nama (name sign), koper dan bagasi dimasukkan aman ke dalam mobil, dan Anda bisa langsung memulai wisata tanpa membuang waktu santai di hotel.",
  },
  {
    id: "faq-7",
    category: "booking",
    question: "Berapa durasi jam tur harian dan bagaimana perhitungan overtime?",
    answer:
      "Standar tur harian berdurasi 10 hingga 11 jam penuh (misal: pukul 08.30 hingga 18.30 atau 19.30). Jika Anda ingin menikmati makan malam santai atau menonton pertunjukan tari tambahan sehingga melebihi durasi standar, biaya overtime sangat terjangkau yaitu Rp50.000 per jam, tanpa biaya tersembunyi.",
  },
  {
    id: "faq-8",
    category: "booking",
    question: "Fasilitas apa saja yang sudah termasuk dalam harga tur harian?",
    answer:
      "Harga paket sudah mencakup: unit mobil ber-AC dingin dan bersih, bahan bakar minyak (BBM), jasa pengemudi sekaligus pemandu berlisensi resmi HPI (Bli Gede), biaya parkir di semua objek wisata, tiket tol Bali Mandara (jika melintas), serta air mineral botol dingin gratis setiap hari tur. Tidak termasuk: tiket masuk objek wisata dan biaya makan siang pribadi tamu.",
  },
  {
    id: "faq-9",
    category: "booking",
    question: "Bagaimana kebijakan untuk anak-anak, balita, dan ketersediaan baby car seat?",
    answer:
      "Anak-anak di bawah usia 5 tahun tidak dikenakan biaya tambahan selama kapasitas kursi mobil masih mencukupi. Untuk kenyamanan keluarga dengan balita, kami dapat menyediakan baby car seat (kursi pengaman bayi) secara gratis dengan konfirmasi terlebih dahulu saat pemesanan.",
  },
  {
    id: "faq-10",
    category: "routes",
    question: "Apakah rute tur dan jadwal bisa diubah sesuai keinginan kami (custom itinerary)?",
    answer:
      "Tentu saja! Keunggulan utama tur privat bersama Bli Gede adalah fleksibilitas 100%. Anda tidak terikat jadwal kaku seperti tur rombongan bus. Ingin berlama-lama memotret di sawah Tegalalang, berhenti santai minum kelapa muda di tepi bukit, atau menggabungkan objek wisata dari rute berbeda? Bli Gede siap mengatur susunan rute yang paling searah dan efisien waktu.",
  },
  {
    id: "faq-11",
    category: "routes",
    question: "Bagaimana jika cuaca hujan atau mendung di hari tur?",
    answer:
      "Bli Gede selalu memantau radar cuaca BMKG dan satelit harian Bali. Jika salah satu destinasi pegunungan diguyur hujan lebat, Bli Gede akan secara proaktif menawarkan rute alternatif terbaik (misalnya: museum seni ber-AC, galeri perak celuk, pura beratap, pertunjukan tari budaya, atau kafe berpanorama estetik) agar liburan Anda tetap berkesan.",
  },
  {
    id: "faq-12",
    category: "vehicle",
    question: "Apakah armada mobil digabung dengan wisatawan lain?",
    answer:
      "Sama sekali tidak pernah digabung. Setiap pemesanan adalah 100% Tur Privat murni. Seluruh kabin mobil ber-AC dingin hanya diisi oleh rombongan keluarga atau pasangan Anda sendiri demi privasi, ketenangan, dan kenyamanan optimal.",
  },
  {
    id: "faq-13",
    category: "vehicle",
    question: "Bagaimana standar kebersihan armada mobil yang digunakan?",
    answer:
      "Armada kami (Toyota Avanza Veloz untuk 1-4 tamu atau Toyota Innova Reborn untuk kenyamanan ekstra) selalu dicuci luar-dalam sebelum menjemput Anda. Dilengkapi AC double blower yang dingin, kabin harum segar tanpa bau rokok (100% non-smoking car), serta soket fast-charging untuk smartphone Anda.",
  },
  {
    id: "faq-14",
    category: "culture",
    question: "Apakah ada kewajiban belanja di toko suvenir / oleh-oleh rekanan?",
    answer:
      "Sama sekali TIDAK ADA. Bli Gede memegang teguh komitmen integritas 'No Forced Shopping' (Bebas Belanja Paksa). Kami tidak akan pernah mengarahkan Anda ke galeri perak atau toko kopi rekanan hanya demi mengejar komisi perantara. Seluruh waktu tur sepenuhnya milik Anda untuk menikmati destinasi wisata pilihan.",
  },
  {
    id: "faq-15",
    category: "culture",
    question: "Apakah Bli Gede memiliki lisensi resmi pramuwisata di Bali?",
    answer:
      "Ya, Gede Sudiartana mengantongi lisensi resmi Himpunan Pramuwisata Indonesia (HPI) DPD Bali dengan No. Registrasi HPI-BALI-2015-8849 yang terdaftar aktif di Dinas Pariwisata Provinsi Bali, serta memiliki hak dan kualifikasi resmi memandu di seluruh pura sakral utama Pulau Dewata.",
  },
];
