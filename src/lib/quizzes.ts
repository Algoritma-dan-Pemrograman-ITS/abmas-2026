/**
 * Mini-quiz data for each training session ("sesi"), sourced from the
 * corresponding `src-materi/Sesi-*.md` file. Rendered with the <Quiz>
 * component at the end of each session page.
 */

export type QuizQuestion = {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
};

export const sesi1Quiz: QuizQuestion[] = [
  {
    question: "Apa yang membedakan AI dari software biasa?",
    options: [
      "AI selalu terhubung ke internet, software biasa tidak",
      "AI belajar mengenali pola dari data, software biasa mengikuti aturan eksplisit yang ditulis programmer",
      "AI hanya bisa dipakai di HP, software biasa hanya di komputer",
      "Tidak ada bedanya, keduanya sama saja",
    ],
    answer: 1,
    explanation:
      "Software biasa mengikuti aturan \"jika A maka B\" yang ditulis eksplisit. AI belajar dari banyak contoh data untuk mengenali pola, lalu menerapkannya pada situasi baru.",
  },
  {
    question:
      "ChatGPT, Gemini, Claude, dan Copilot adalah contoh dari jenis AI apa?",
    options: [
      "Large Language Model (LLM), sejenis Generative AI",
      "Software akuntansi",
      "Sistem operasi",
      "Antivirus",
    ],
    answer: 0,
    explanation:
      "Keempatnya adalah LLM (Large Language Model), yaitu AI generatif yang khusus bekerja dengan bahasa.",
  },
  {
    question: "Secara sederhana, bagaimana cara kerja LLM menyusun jawaban?",
    options: [
      "Mencari jawaban persis dari database yang sudah tersimpan",
      "Memprediksi satu kata paling mungkin berikutnya, berulang kali, berdasarkan pola bahasa yang dipelajarinya",
      "Bertanya ke manusia secara langsung setiap kali menjawab",
      "Menerjemahkan pertanyaan ke bahasa mesin lalu menjalankannya sebagai kode",
    ],
    answer: 1,
    explanation:
      "LLM bekerja seperti keyboard prediktif yang jauh lebih pintar: memprediksi kata paling mungkin berikutnya satu per satu, lalu mengulangi proses itu sampai jawabannya selesai.",
  },
  {
    question:
      "Seorang guru meminta AI menjelaskan sebuah peristiwa sejarah, lengkap dengan nama ahli dan judul buku sebagai sumber. Ternyata nama ahli dan buku itu tidak pernah ada. Ini contoh keterbatasan LLM yang disebut apa?",
    options: ["Bias", "Hallucination", "Lag jaringan", "Bug software"],
    answer: 1,
    explanation:
      "Hallucination adalah saat LLM \"mengarang\" jawaban yang terdengar meyakinkan (termasuk nama, kutipan, atau referensi) padahal salah atau tidak pernah ada.",
  },
  {
    question: "Sikap yang paling tepat saat memakai LLM untuk membuat materi ajar adalah…",
    options: [
      "Langsung dipakai apa adanya karena AI jarang salah",
      "Tidak dipakai sama sekali karena berisiko",
      "Dipakai untuk draf awal, lalu tetap dibaca, diperiksa, dan disesuaikan guru",
      "Dipakai hanya jika siswa tidak tahu",
    ],
    answer: 2,
    explanation:
      "LLM paling efektif untuk menghasilkan draf awal yang cepat, bukan hasil akhir. Keputusan pedagogis dan pemeriksaan akurasi tetap ada di tangan guru.",
  },
];

export const sesi2Quiz: QuizQuestion[] = [
  {
    question:
      "Dalam konteks pendidikan, LLM sebaiknya dipandang sebagai apa?",
    options: [
      "Pengganti guru di kelas",
      "Asisten yang membantu membuat draf dan ide",
      "Penentu nilai akhir siswa",
      "Sumber kebenaran mutlak yang tidak perlu dicek",
    ],
    answer: 1,
    explanation:
      "LLM membantu mengembangkan ide dan membuat draf, tetapi guru tetap yang memahami kondisi siswa, menentukan tujuan pembelajaran, dan mengambil keputusan pedagogis.",
  },
  {
    question: "Prompt manakah yang paling mungkin memberikan hasil terarah?",
    options: [
      "“Buatkan soal tentang ekosistem.”",
      "“Buatkan materi.”",
      "“Saya mengajar IPA kelas 7 dengan materi ekosistem. Buatkan 5 soal pilihan ganda tingkat kesulitan sedang, sertakan kunci jawaban dan alasan singkat.”",
      "“Bantu saya mengajar.”",
    ],
    answer: 2,
    explanation:
      "Prompt yang menyertakan konteks (mapel, kelas, topik), tugas, kriteria (jumlah soal, tingkat kesulitan), dan format output menghasilkan jawaban yang jauh lebih terarah.",
  },
  {
    question:
      "Materi yang ditujukan untuk siswa yang sudah menguasai konsep dasar dan butuh tantangan tambahan disebut versi…",
    options: ["Remedial", "Reguler", "Pengayaan", "Mendasar"],
    answer: 2,
    explanation:
      "Versi pengayaan diberikan pada siswa yang sudah memahami materi dasar, berisi analisis lebih mendalam, studi kasus, atau soal HOTS.",
  },
  {
    question:
      "Kenapa guru tetap perlu membandingkan rangkuman buatan LLM dengan materi sumber aslinya?",
    options: [
      "Karena LLM tidak bisa merangkum sama sekali",
      "Supaya tidak ada konsep penting yang hilang atau berubah makna",
      "Karena rangkuman LLM selalu terlalu panjang",
      "Karena itu wajib secara hukum",
    ],
    answer: 1,
    explanation:
      "LLM dapat melewatkan atau menyederhanakan konsep penting saat merangkum, jadi hasilnya tetap perlu diverifikasi terhadap materi sumber.",
  },
];

export const sesi3Quiz: QuizQuestion[] = [
  {
    question:
      "Komponen mana dalam struktur ROLE + CONTEXT + TASK + CONSTRAINT + OUTPUT yang menjawab pertanyaan “untuk siapa dan dalam kondisi apa tugas ini dilakukan?”",
    options: ["ROLE", "CONTEXT", "TASK", "OUTPUT"],
    answer: 1,
    explanation:
      "CONTEXT menjelaskan situasi yang sedang dihadapi — jenjang, kelas, materi, atau kondisi siswa — bukan tugas atau aturannya.",
  },
  {
    question: "Prompt mana yang TASK-nya paling jelas?",
    options: [
      "“Materi tentang ekosistem.”",
      "“Ekosistem itu penting.”",
      "“Buatkan rangkuman materi tentang ekosistem.”",
      "“Kelas saya sedang belajar ekosistem.”",
    ],
    answer: 2,
    explanation:
      "TASK harus memakai kata kerja yang jelas tentang tindakan yang diminta — “buatkan rangkuman” memberi tahu AI persis apa yang harus dilakukan.",
  },
  {
    question:
      "Proses “Minta → Lihat Hasil → Periksa → Perbaiki → Coba Lagi” disebut apa?",
    options: [
      "Zero-shot prompting",
      "Iterative prompting",
      "Fine-tuning",
      "Role playing",
    ],
    answer: 1,
    explanation:
      "Iterative prompting adalah proses memperbaiki hasil AI secara bertahap berdasarkan apa yang masih kurang dari jawaban sebelumnya, tanpa harus mengulang seluruh instruksi dari awal.",
  },
  {
    question:
      "“Jelaskan secara rinci dalam minimal 500 kata, tetapi jangan melebihi 100 kata” adalah contoh kesalahan prompt jenis apa?",
    options: [
      "Batasan tidak diberikan",
      "Bentuk output tidak ditentukan",
      "Instruksi saling bertentangan",
      "Konteks tidak jelas",
    ],
    answer: 2,
    explanation:
      "Kedua batasan panjang tersebut tidak mungkin dipenuhi bersamaan. Sebelum mengirim prompt, periksa apakah semua instruksi bisa dilakukan sekaligus.",
  },
];

export const sesi6Quiz: QuizQuestion[] = [
  {
    question:
      "Seorang guru ingin meminta AI menentukan siswa yang perlu dipanggil berdasarkan tabel berisi nama, nilai, absensi, dan catatan perilaku. Apa langkah paling tepat?",
    options: [
      "Tempelkan semua data agar rekomendasi AI lebih lengkap",
      "Jangan tempelkan data tersebut; gunakan pertimbangan guru dan, bila perlu, ringkasan kondisi kelas untuk meminta ide bantuan belajar",
      "Ganti nama siswa dengan nomor lalu kirim semua detail lainnya",
      "Minta AI memilih tiga siswa, lalu guru cukup menyetujui hasilnya",
    ],
    answer: 1,
    explanation:
      "Data pribadi dan catatan perilaku tidak perlu ditempelkan untuk meminta ide pembelajaran. AI juga tidak boleh mengambil keputusan tentang siswa; keadaan kelas dan keputusan tetap pada guru.",
  },
  {
    question:
      "Menghapus nama siswa dari data yang dikirim ke AI otomatis membuat data tersebut aman. Benar atau salah?",
    options: [
      "Benar, tanpa nama data selalu aman",
      "Salah — kombinasi info lain (kelas, nilai, kondisi khusus) masih bisa membuat identitas mudah ditebak",
      "Benar, selama nomor induk siswa juga dihapus",
      "Tidak relevan, mengurangi data pengenal tidak penting",
    ],
    answer: 1,
    explanation:
      "Jika hanya ada satu siswa dengan gabungan ciri tertentu di kelas, ia tetap bisa dikenali walau namanya sudah dihapus. Mengurangi data pengenal menurunkan risiko, tetapi bukan jaminan mutlak.",
  },
  {
    question:
      "Untuk tugas pengembangan ide proyek, guru mengizinkan AI untuk brainstorming, tetapi siswa harus mencatat bagian yang dibantu AI dan memperlihatkan revisinya. Pendekatan ini adalah…",
    options: [
      "AI tidak boleh digunakan",
      "AI sebagai alat bantu",
      "AI sebagai bagian pembelajaran",
      "AI boleh digunakan tanpa batas",
    ],
    answer: 1,
    explanation:
      "Pada pilihan ini, AI dapat membantu sebagian proses, sedangkan siswa tetap mengambil keputusan dan bertanggung jawab atas karya akhirnya. Catatan penggunaan AI membuat prosesnya terbuka dan jelas.",
  },
  {
    question:
      "AI menyarankan bahwa siswa dari kelompok tertentu ‘biasanya kurang cocok’ untuk aktivitas presentasi. Apa respons guru yang paling tepat?",
    options: [
      "Gunakan saran itu karena AI memiliki banyak data",
      "Tolak anggapan yang menyamaratakan itu, lalu periksa kebutuhan setiap siswa berdasarkan keadaan kelas",
      "Minta AI mengulang saran yang sama dengan bahasa lebih halus",
      "Buat aturan bahwa kelompok tersebut tidak boleh presentasi",
    ],
    answer: 1,
    explanation:
      "Jawaban AI dapat membawa anggapan yang tidak adil atau menyamaratakan. Guru perlu memeriksa kesesuaiannya dengan keadaan kelas, lalu mengambil keputusan berdasarkan kebutuhan siswa yang nyata.",
  },
];
