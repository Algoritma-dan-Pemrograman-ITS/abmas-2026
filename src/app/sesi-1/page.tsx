import type { Metadata } from "next";
import { DocArticle } from "@/components/doc-article";
import { H2 } from "@/components/content";
import { Callout } from "@/components/callout";
import { CaseActivity, type Case } from "@/components/case-activity";

export const metadata: Metadata = {
  title: "Sesi 1: Mengenal LLM & AI dalam Pendidikan",
};

const cases: Case[] = [
  {
    text: "Membuat 20 soal matematika kelas 7.",
    category: "bisa",
    explanation:
      "LLM sangat baik untuk tugas generatif seperti membuat variasi soal. Tetap perlu dicek guru untuk akurasi angka dan tingkat kesulitan.",
  },
  {
    text: "Menentukan apakah seorang siswa mengalami masalah psikologis.",
    category: "tidak-bisa",
    explanation:
      "Ini keputusan yang membutuhkan penilaian profesional (guru BK/psikolog) berdasarkan observasi langsung, bukan sekadar pola teks. Risiko salah diagnosis sangat tinggi.",
  },
  {
    text: "Meringkas artikel jurnal pendidikan menjadi poin-poin utama.",
    category: "bisa",
    explanation:
      "Meringkas adalah kekuatan utama LLM. Guru tetap perlu memverifikasi apakah poin penting tidak terlewat atau disalahartikan.",
  },
  {
    text: "Memutuskan nilai akhir rapor seorang siswa.",
    category: "tidak-bisa",
    explanation:
      "Nilai akhir menyangkut keadilan, konteks personal siswa, dan tanggung jawab profesional guru, bukan keputusan yang boleh diserahkan ke AI.",
  },
  {
    text: "Memberikan lima ide kegiatan pembuka kelas yang menarik.",
    category: "bisa",
    explanation:
      "Brainstorming ide adalah use-case ideal LLM: cepat menghasilkan banyak opsi untuk dipilih dan disesuaikan guru.",
  },
  {
    text: "Menilai apakah sebuah esai siswa hasil karya sendiri atau hasil AI.",
    category: "ambigu",
    explanation:
      "LLM bisa memberi indikasi awal (gaya bahasa, pola tertentu), tapi hasilnya tidak akurat 100% dan tidak boleh jadi bukti tunggal untuk menuduh siswa. Perlu dikombinasikan dengan pertimbangan guru.",
  },
  {
    text: "Menerjemahkan materi ajar ke bahasa Inggris sederhana untuk siswa kelas bilingual.",
    category: "bisa",
    explanation:
      "LLM cukup andal untuk terjemahan umum, tapi guru tetap perlu mengecek istilah khusus mata pelajaran agar tidak keliru makna.",
  },
  {
    text: "Menentukan apakah orang tua siswa perlu dipanggil terkait masalah perilaku anak di sekolah.",
    category: "tidak-bisa",
    explanation:
      "Ini keputusan yang membutuhkan konteks sosial-emosional mendalam dan hubungan personal, bukan sesuatu yang bisa diserahkan ke pola teks AI.",
  },
  {
    text: "Menyusun draf rubrik penilaian proyek kelompok.",
    category: "ambigu",
    explanation:
      "LLM bisa membantu membuat draf awal rubrik, tapi guru tetap harus menyesuaikan dengan tujuan pembelajaran spesifik dan konteks kelas, jangan dipakai mentah-mentah.",
  },
  {
    text: "Membuat variasi kalimat pembuka surat izin orang tua.",
    category: "bisa",
    explanation:
      "Tugas administratif ringan seperti ini sangat cocok untuk LLM, menghemat waktu guru secara signifikan.",
  },
];

export default function Sesi1Page() {
  return (
    <DocArticle
      href="/sesi-1"
      eyebrow="Sesi 1"
      title="Mengenal LLM & AI dalam Pendidikan"
      lead="Panduan santai untuk Bapak/Ibu Guru yang penasaran (atau masih ragu-ragu) soal ChatGPT, Gemini, dan teman-temannya."
    >
      <p>
        Setiap hari kita sudah memakai AI tanpa sadar &mdash; dari rekomendasi
        video sampai autocorrect di HP. Sesi ini mengajak Bapak/Ibu Guru
        berkenalan lebih dekat dengan salah satu jenis AI yang paling sering
        dibicarakan belakangan ini: <strong>Large Language Model</strong>{" "}
        (LLM).
      </p>

      <H2>Apa itu AI?</H2>
      <Callout type="note">
        AI bukan robot yang berpikir seperti manusia. AI adalah program yang
        belajar dari data untuk mengenali pola.
      </Callout>
      <p>
        Kita sudah memakai AI setiap hari tanpa sadar, misalnya:
      </p>
      <ul>
        <li>Rekomendasi video di YouTube.</li>
        <li>Filter spam di email.</li>
        <li>Face unlock di HP.</li>
        <li>Petunjuk arah tercepat di Google Maps.</li>
        <li>Keyboard prediktif yang menebak kata berikutnya saat kita mengetik.</li>
      </ul>
      <p>
        Bedanya dengan software biasa: software biasa mengikuti aturan yang
        ditulis programmer secara eksplisit (jika A maka B), sedangkan AI
        belajar sendiri dari banyak contoh data untuk mengenali pola, lalu
        memakai pola itu pada situasi baru yang belum pernah dilihat persis
        sama.
      </p>

      <H2>Apa itu Generative AI?</H2>
      <p>
        <strong>Generative AI</strong> adalah AI yang bisa{" "}
        <em>menghasilkan konten baru</em> &mdash; bukan sekadar mengklasifikasi
        atau merekomendasikan sesuatu yang sudah ada. Ada empat jenis output
        yang umum:
      </p>
      <ul>
        <li>
          <strong>Teks</strong> &mdash; misalnya ChatGPT atau Claude.
        </li>
        <li>
          <strong>Gambar</strong> &mdash; misalnya Midjourney.
        </li>
        <li>
          <strong>Audio</strong> &mdash; misalnya narasi atau musik buatan AI.
        </li>
        <li>
          <strong>Video</strong> &mdash; klip pendek yang dihasilkan dari
          deskripsi teks.
        </li>
      </ul>
      <p>Beberapa contoh penggunaan di pendidikan:</p>
      <ul>
        <li>Membuat ilustrasi sederhana untuk materi ajar.</li>
        <li>Menghasilkan narasi audio untuk bahan belajar mandiri siswa.</li>
        <li>Membuat variasi soal dan aktivitas kelas dengan cepat.</li>
      </ul>

      <H2>Apa itu LLM?</H2>
      <p>
        <strong>Large Language Model</strong> adalah jenis AI generatif yang
        khusus bekerja dengan bahasa. Cara kerjanya bisa dibayangkan seperti{" "}
        <strong>keyboard prediktif di HP, tapi jauh lebih pintar</strong>: LLM
        memprediksi kata paling mungkin berikutnya, satu per satu, berdasarkan
        pola bahasa yang sudah dipelajarinya dari sangat banyak teks.
      </p>
      <p>
        Contoh LLM yang mungkin sudah pernah Bapak/Ibu coba: ChatGPT (dibuat
        OpenAI), Gemini (Google), Claude (Anthropic), dan Copilot
        (Microsoft/GitHub).
      </p>

      <H2>Kemampuan LLM</H2>
      <p>
        LLM cukup andal untuk tujuh jenis pekerjaan berikut: menulis,
        meringkas, menjelaskan, brainstorming, membuat soal, membuat materi,
        dan memberikan alternatif ide.
      </p>
      <Callout type="tip" title="Draf awal, bukan hasil akhir">
        LLM paling efektif dipakai untuk menghasilkan <strong>draf awal</strong>{" "}
        yang cepat, bukan hasil akhir yang langsung dipakai. Bapak/Ibu Guru
        tetap perlu membaca, memeriksa, dan menyesuaikannya.
      </Callout>

      <H2>Keterbatasan LLM</H2>
      <ul>
        <li>
          <strong>Hallucination</strong> &mdash; LLM bisa &ldquo;mengarang&rdquo;
          jawaban yang terdengar meyakinkan padahal salah.
        </li>
        <li>
          <strong>Bias</strong> &mdash; jawaban bisa condong ke pola tertentu
          yang ada di data latihannya.
        </li>
        <li>
          <strong>Informasi yang salah</strong> &mdash; terutama untuk hal-hal
          yang sangat spesifik atau terbaru.
        </li>
        <li>
          <strong>Tidak selalu memahami konteks</strong> &mdash; terutama
          konteks personal siswa atau kondisi kelas yang tidak dijelaskan.
        </li>
        <li>
          <strong>Tidak menggantikan judgment guru</strong> &mdash; keputusan
          pedagogis dan etis tetap ada di tangan manusia.
        </li>
      </ul>

      <H2>Aktivitas: Bisa atau Tidak Bisa?</H2>
      <p>
        Untuk setiap kasus di bawah, pilih apakah menurut Bapak/Ibu tugas
        tersebut cocok diserahkan ke LLM (&ldquo;Bisa&rdquo;) atau tidak
        (&ldquo;Tidak Bisa&rdquo;). Beberapa kasus memang ambigu &mdash; itu
        wajar, dan justru bagus untuk bahan diskusi.
      </p>
      <CaseActivity cases={cases} />

      <H2>Ringkasan</H2>
      <ul>
        <li>AI belajar mengenali pola dari data, bukan berpikir seperti manusia.</li>
        <li>Generative AI menghasilkan konten baru: teks, gambar, audio, video.</li>
        <li>LLM bekerja dengan memprediksi kata berikutnya, seperti keyboard prediktif yang jauh lebih pintar.</li>
        <li>LLM andal untuk tugas menulis, meringkas, menjelaskan, dan brainstorming.</li>
        <li>LLM punya keterbatasan: hallucination, bias, dan kurang memahami konteks personal.</li>
        <li>Keputusan pedagogis tetap ada di tangan guru.</li>
      </ul>
      <blockquote>
        <p>
          LLM adalah alat bantu berpikir, bukan pengganti judgment profesional
          guru.
        </p>
      </blockquote>
    </DocArticle>
  );
}
