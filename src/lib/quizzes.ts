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
      "Apa prinsip paling sederhana soal privasi saat menggunakan AI?",
    options: [
      "Semua data boleh dimasukkan asal AI-nya gratis",
      "Jangan memasukkan data pribadi atau dokumen sensitif hanya karena AI bisa memprosesnya",
      "Data siswa boleh dimasukkan asal disimpan di HP pribadi guru",
      "Privasi hanya berlaku untuk data guru, bukan siswa",
    ],
    answer: 1,
    explanation:
      "Kemampuan AI untuk memproses data bukan alasan untuk memasukkannya. Tanyakan dulu apakah data itu benar-benar dibutuhkan.",
  },
  {
    question:
      "Menghapus nama siswa dari data yang dikirim ke AI otomatis membuat data tersebut anonim. Benar atau salah?",
    options: [
      "Benar, tanpa nama data selalu aman",
      "Salah — kombinasi info lain (kelas, nilai, kondisi khusus) masih bisa membuat identitas mudah ditebak",
      "Benar, selama nomor induk siswa juga dihapus",
      "Tidak relevan, anonimisasi tidak penting",
    ],
    answer: 1,
    explanation:
      "Jika hanya ada satu siswa dengan kombinasi ciri tertentu di suatu kelas, ia tetap bisa dikenali walau namanya sudah dihapus. Anonimisasi mengurangi risiko, bukan jaminan mutlak.",
  },
  {
    question:
      "Pendekatan mana yang paling cocok ketika tujuan tugas adalah mengukur kemampuan argumentasi siswa TANPA bantuan AI?",
    options: ["AI Prohibited", "AI Assisted", "AI Integrated", "AI Unlimited"],
    answer: 0,
    explanation:
      "AI Prohibited cocok saat yang ingin diukur adalah kemampuan siswa sendiri. Pertanyaan intinya: kemampuan siapa yang sebenarnya sedang dinilai?",
  },
  {
    question: "Apa prinsip utama yang menutup sesi ini?",
    options: [
      "AI selalu benar sehingga tidak perlu diverifikasi",
      "AI sebagai asisten, manusia sebagai pengambil keputusan",
      "Semakin banyak AI digunakan, semakin baik hasilnya",
      "Guru tidak perlu ikut campur jika siswa memakai AI",
    ],
    answer: 1,
    explanation:
      "AI dapat membantu menyusun, merangkum, dan memberi alternatif — tetapi keputusan pendidikan tetap membutuhkan judgment manusia.",
  },
];
